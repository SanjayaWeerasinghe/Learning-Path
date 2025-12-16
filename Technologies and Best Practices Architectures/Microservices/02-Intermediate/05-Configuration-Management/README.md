# Configuration Management

## What is Configuration Management?

Centralized management of configuration data for multiple microservices across different environments (dev, staging, prod).

## Challenges in Microservices

- Multiple services with different configs
- Multiple environments
- Configuration changes without redeployment
- Secret management
- Configuration versioning and rollback

## Configuration Sources

### 1. appsettings.json (Local Files)

```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Server=localhost;Database=ProductDB;"
  },
  "ServiceUrls": {
    "OrderService": "http://localhost:5002"
  },
  "Features": {
    "EnableNewCheckout": false
  }
}
```

```csharp
// Program.cs
builder.Configuration
    .AddJsonFile("appsettings.json", optional: false, reloadOnChange: true)
    .AddJsonFile($"appsettings.{builder.Environment.EnvironmentName}.json", optional: true)
    .AddEnvironmentVariables();

// Usage
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
var orderServiceUrl = builder.Configuration["ServiceUrls:OrderService"];
```

### 2. Environment Variables

```bash
export ConnectionStrings__DefaultConnection="Server=prod-db;Database=ProductDB;"
export ServiceUrls__OrderService="http://order-service"
export Features__EnableNewCheckout="true"
```

```csharp
builder.Configuration.AddEnvironmentVariables();

// Automatically binds environment variables using __ as separator
```

### 3. Consul (Distributed Configuration)

```csharp
// Install: dotnet add package Winton.Extensions.Configuration.Consul

builder.Configuration.AddConsul(
    "myapp/config",
    options =>
    {
        options.ConsulConfigurationOptions = cco =>
        {
            cco.Address = new Uri("http://localhost:8500");
        };
        options.ReloadOnChange = true;
        options.Optional = true;
    });
```

**Consul KV Store:**
```bash
consul kv put myapp/config/ConnectionStrings/DefaultConnection "Server=prod-db;Database=ProductDB;"
consul kv put myapp/config/Features/EnableNewCheckout "true"
```

### 4. Azure App Configuration

```csharp
// Install: dotnet add package Microsoft.Azure.AppConfiguration.AspNetCore

builder.Configuration.AddAzureAppConfiguration(options =>
{
    options.Connect(builder.Configuration["AppConfigConnectionString"])
           .ConfigureRefresh(refresh =>
           {
               refresh.Register("Features:EnableNewCheckout", refreshAll: true)
                      .SetCacheExpiration(TimeSpan.FromSeconds(30));
           })
           .UseFeatureFlags(featureFlagOptions =>
           {
               featureFlagOptions.CacheExpirationInterval = TimeSpan.FromSeconds(30);
           });
});

// Add middleware for dynamic refresh
app.UseAzureAppConfiguration();
```

### 5. AWS Systems Manager Parameter Store

```csharp
// Install: dotnet add package Amazon.Extensions.Configuration.SystemsManager

builder.Configuration.AddSystemsManager("/myapp/");
```

## Strongly-Typed Configuration

```csharp
// Configuration class
public class ServiceUrlsConfiguration
{
    public string OrderService { get; set; }
    public string ProductService { get; set; }
    public string PaymentService { get; set; }
}

public class FeaturesConfiguration
{
    public bool EnableNewCheckout { get; set; }
    public bool EnableRecommendations { get; set; }
}

// Register
builder.Services.Configure<ServiceUrlsConfiguration>(
    builder.Configuration.GetSection("ServiceUrls"));

builder.Services.Configure<FeaturesConfiguration>(
    builder.Configuration.GetSection("Features"));

// Usage
public class OrderService
{
    private readonly ServiceUrlsConfiguration _serviceUrls;
    private readonly FeaturesConfiguration _features;

    public OrderService(
        IOptions<ServiceUrlsConfiguration> serviceUrls,
        IOptions<FeaturesConfiguration> features)
    {
        _serviceUrls = serviceUrls.Value;
        _features = features.Value;
    }

    public async Task CreateOrder()
    {
        if (_features.EnableNewCheckout)
        {
            // Use new checkout flow
        }

        var response = await _httpClient.GetAsync(
            $"{_serviceUrls.OrderService}/api/orders");
    }
}
```

## Secret Management

### 1. User Secrets (Development Only)

```bash
dotnet user-secrets init
dotnet user-secrets set "ConnectionStrings:DefaultConnection" "Server=dev-db;..."
```

```csharp
if (builder.Environment.IsDevelopment())
{
    builder.Configuration.AddUserSecrets<Program>();
}
```

### 2. Azure Key Vault

```csharp
// Install: dotnet add package Azure.Extensions.AspNetCore.Configuration.Secrets

var keyVaultEndpoint = new Uri(builder.Configuration["KeyVaultEndpoint"]);

builder.Configuration.AddAzureKeyVault(
    keyVaultEndpoint,
    new DefaultAzureCredential());
```

```csharp
// Store secret in Key Vault
az keyvault secret set --vault-name "mykeyvault" \
    --name "ConnectionStrings--DefaultConnection" \
    --value "Server=prod-db;..."

// Automatically available in configuration
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
```

### 3. HashiCorp Vault

```csharp
public class VaultConfigurationProvider : ConfigurationProvider
{
    private readonly VaultClient _vaultClient;
    private readonly string _path;

    public override void Load()
    {
        var secrets = _vaultClient.V1.Secrets.KeyValue.V2
            .ReadSecretAsync(_path)
            .GetAwaiter()
            .GetResult();

        foreach (var secret in secrets.Data.Data)
        {
            Data[secret.Key] = secret.Value.ToString();
        }
    }
}
```

### 4. Kubernetes Secrets

```yaml
apiVersion: v1
kind: Secret
metadata:
  name: db-secrets
type: Opaque
data:
  connection-string: U2VydmVyPXByb2QtZGI7Li4u  # Base64 encoded
---
apiVersion: apps/v1
kind: Deployment
metadata:
  name: product-service
spec:
  template:
    spec:
      containers:
        - name: product
          image: product-service:latest
          env:
            - name: ConnectionStrings__DefaultConnection
              valueFrom:
                secretKeyRef:
                  name: db-secrets
                  key: connection-string
```

## Feature Flags

```csharp
// Install: dotnet add package Microsoft.FeatureManagement.AspNetCore

public class FeatureFlags
{
    public const string NewCheckout = "NewCheckout";
    public const string Recommendations = "Recommendations";
}

// appsettings.json
{
  "FeatureManagement": {
    "NewCheckout": true,
    "Recommendations": {
      "EnabledFor": [
        {
          "Name": "Percentage",
          "Parameters": {
            "Value": 50
          }
        }
      ]
    }
  }
}

// Startup
builder.Services.AddFeatureManagement();

// Usage in controller
[ApiController]
[Route("api/[controller]")]
public class OrdersController : ControllerBase
{
    private readonly IFeatureManager _featureManager;

    [HttpPost]
    public async Task<IActionResult> CreateOrder(CreateOrderRequest request)
    {
        if (await _featureManager.IsEnabledAsync(FeatureFlags.NewCheckout))
        {
            return await CreateOrderWithNewFlow(request);
        }

        return await CreateOrderWithOldFlow(request);
    }
}

// Or use filter
[FeatureGate(FeatureFlags.NewCheckout)]
[HttpPost("new")]
public async Task<IActionResult> CreateOrderNew(CreateOrderRequest request)
{
    // Only accessible when feature is enabled
}
```

## Configuration Refresh

```csharp
// With IOptionsSnapshot (refreshes per request)
public class OrderService
{
    private readonly IOptionsSnapshot<FeaturesConfiguration> _features;

    public OrderService(IOptionsSnapshot<FeaturesConfiguration> features)
    {
        _features = features;
    }

    public async Task ProcessOrder()
    {
        // Gets latest configuration value
        if (_features.Value.EnableNewCheckout)
        {
            // ...
        }
    }
}

// With IOptionsMonitor (refreshes on change)
public class OrderService
{
    private readonly IOptionsMonitor<FeaturesConfiguration> _features;

    public OrderService(IOptionsMonitor<FeaturesConfiguration> features)
    {
        _features = features;

        // Subscribe to changes
        _features.OnChange(config =>
        {
            _logger.LogInformation("Configuration changed");
        });
    }

    public async Task ProcessOrder()
    {
        // Always gets current value
        if (_features.CurrentValue.EnableNewCheckout)
        {
            // ...
        }
    }
}
```

## Configuration Validation

```csharp
public class ServiceUrlsConfiguration
{
    [Required]
    [Url]
    public string OrderService { get; set; }

    [Required]
    [Url]
    public string ProductService { get; set; }
}

builder.Services.AddOptions<ServiceUrlsConfiguration>()
    .Bind(builder.Configuration.GetSection("ServiceUrls"))
    .ValidateDataAnnotations()
    .ValidateOnStart();  // Fails fast if invalid
```

## Multi-Environment Configuration

```
appsettings.json              # Base configuration
appsettings.Development.json  # Dev overrides
appsettings.Staging.json      # Staging overrides
appsettings.Production.json   # Prod overrides
```

```csharp
builder.Configuration
    .AddJsonFile("appsettings.json", optional: false, reloadOnChange: true)
    .AddJsonFile($"appsettings.{builder.Environment.EnvironmentName}.json", optional: true)
    .AddEnvironmentVariables();  // Highest priority
```

## Centralized Configuration Pattern

```
┌──────────────────┐
│ Config Server    │
│ (Consul/Azure)   │
└────────┬─────────┘
         │
    ┌────┴────┬─────┬──────┐
    │         │     │      │
┌───▼───┐ ┌──▼──┐ ┌▼───┐ ┌▼────┐
│Service│ │Svc  │ │Svc │ │Svc  │
│   A   │ │  B  │ │ C  │ │  D  │
└───────┘ └─────┘ └────┘ └─────┘
```

## Docker Configuration

```dockerfile
FROM mcr.microsoft.com/dotnet/aspnet:8.0
WORKDIR /app
COPY . .

ENV ASPNETCORE_ENVIRONMENT=Production
ENV ConnectionStrings__DefaultConnection="Server=db;Database=ProductDB"

ENTRYPOINT ["dotnet", "ProductService.dll"]
```

```yaml
# docker-compose.yml
services:
  product-service:
    image: product-service:latest
    environment:
      - ASPNETCORE_ENVIRONMENT=Production
      - ConnectionStrings__DefaultConnection=Server=db;Database=ProductDB;
      - ServiceUrls__OrderService=http://order-service
      - Features__EnableNewCheckout=true
```

## Interview Tips

- Explain centralized vs distributed configuration
- Know secret management tools
- Understand feature flags benefits
- Discuss configuration hierarchy
- Know environment-specific configuration
- Explain dynamic configuration refresh
- Understand configuration validation

## Best Practices

1. **Never hardcode secrets**: Use secret management tools
2. **Use environment variables**: For deployment-specific config
3. **Centralize configuration**: Single source of truth
4. **Version control**: Track configuration changes
5. **Validate on startup**: Fail fast for invalid config
6. **Use feature flags**: Enable/disable features without deployment
7. **Encrypt sensitive data**: At rest and in transit
8. **Audit configuration changes**: Who changed what, when

## Key Takeaways

1. Separate configuration from code
2. Use centralized configuration for microservices
3. Never commit secrets to source control
4. Environment variables override file-based config
5. Feature flags enable gradual rollouts
6. Configuration should be refreshable without restart
7. Validate configuration on startup
