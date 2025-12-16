# Service Discovery

## What is Service Discovery?

Automatic detection of services and their network locations in a microservices architecture where service instances have dynamically assigned IP addresses.

## The Problem

```
❌ Without Service Discovery:
Order Service needs to call Product Service
http://192.168.1.10:5001/api/products  ← Hardcoded!

Problems:
- IPs change in cloud environments
- New instances added/removed dynamically
- Manual configuration error-prone
- No automatic failover
```

## The Solution

```
✅ With Service Discovery:
Order Service → Service Registry → Find "product-service" → Get current instances
```

## Client-Side vs Server-Side Discovery

### Client-Side Discovery
Client queries registry and chooses instance.

```
Client → Registry (Get instances) → Client chooses → Call Service
```

### Server-Side Discovery
Load balancer queries registry.

```
Client → Load Balancer → Registry → Service
```

## Consul Implementation

### Service Registration

```csharp
public class ConsulHostedService : IHostedService
{
    private readonly IConsulClient _consulClient;
    private readonly IConfiguration _configuration;
    private string _registrationId;

    public async Task StartAsync(CancellationToken cancellationToken)
    {
        var serviceName = _configuration["ServiceConfig:ServiceName"];
        var serviceId = $"{serviceName}-{Guid.NewGuid()}";
        var serviceAddress = _configuration["ServiceConfig:ServiceHost"];
        var servicePort = int.Parse(_configuration["ServiceConfig:ServicePort"]);

        var registration = new AgentServiceRegistration
        {
            ID = serviceId,
            Name = serviceName,
            Address = serviceAddress,
            Port = servicePort,
            Tags = new[] { "api", "v1" },
            Check = new AgentServiceCheck
            {
                HTTP = $"http://{serviceAddress}:{servicePort}/health",
                Interval = TimeSpan.FromSeconds(10),
                Timeout = TimeSpan.FromSeconds(5),
                DeregisterCriticalServiceAfter = TimeSpan.FromMinutes(1)
            }
        };

        await _consulClient.Agent.ServiceRegister(registration, cancellationToken);
        _registrationId = serviceId;
    }

    public async Task StopAsync(CancellationToken cancellationToken)
    {
        await _consulClient.Agent.ServiceDeregister(_registrationId, cancellationToken);
    }
}

// Program.cs
builder.Services.AddSingleton<IConsulClient, ConsulClient>(p =>
    new ConsulClient(config =>
    {
        config.Address = new Uri("http://localhost:8500");
    }));

builder.Services.AddHostedService<ConsulHostedService>();
```

### Service Discovery

```csharp
public class ProductServiceClient
{
    private readonly IConsulClient _consulClient;
    private readonly HttpClient _httpClient;

    public async Task<Product> GetProductAsync(int id)
    {
        // Discover service
        var services = await _consulClient.Health.Service("product-service", tag: "", passingOnly: true);

        var service = services.Response
            .OrderBy(_ => Guid.NewGuid())  // Random selection
            .FirstOrDefault();

        if (service == null)
            throw new ServiceUnavailableException("product-service");

        var serviceUri = $"http://{service.Service.Address}:{service.Service.Port}";

        var response = await _httpClient.GetAsync($"{serviceUri}/api/products/{id}");
        response.EnsureSuccessStatusCode();

        return await response.Content.ReadFromJsonAsync<Product>();
    }
}
```

### Load Balancing with Consul

```csharp
public interface ILoadBalancer
{
    ServiceEntry SelectService(IEnumerable<ServiceEntry> services);
}

public class RoundRobinLoadBalancer : ILoadBalancer
{
    private int _index = 0;

    public ServiceEntry SelectService(IEnumerable<ServiceEntry> services)
    {
        var serviceArray = services.ToArray();
        var selected = serviceArray[_index % serviceArray.Length];
        Interlocked.Increment(ref _index);
        return selected;
    }
}

public class RandomLoadBalancer : ILoadBalancer
{
    private readonly Random _random = new Random();

    public ServiceEntry SelectService(IEnumerable<ServiceEntry> services)
    {
        var serviceArray = services.ToArray();
        return serviceArray[_random.Next(serviceArray.Length)];
    }
}

public class ServiceDiscoveryHttpClient
{
    private readonly IConsulClient _consulClient;
    private readonly ILoadBalancer _loadBalancer;
    private readonly HttpClient _httpClient;

    public async Task<HttpResponseMessage> GetAsync(string serviceName, string requestUri)
    {
        var services = await _consulClient.Health.Service(serviceName, "", true);

        var service = _loadBalancer.SelectService(services.Response);

        var baseUrl = $"http://{service.Service.Address}:{service.Service.Port}";

        return await _httpClient.GetAsync($"{baseUrl}{requestUri}");
    }
}
```

## Eureka (Netflix OSS)

### Service Registration

```csharp
// appsettings.json
{
  "Eureka": {
    "Client": {
      "ServiceUrl": "http://localhost:8761/eureka/",
      "ShouldRegisterWithEureka": true,
      "ShouldFetchRegistry": true
    },
    "Instance": {
      "AppName": "product-service",
      "Port": 5001,
      "HostName": "localhost",
      "HealthCheckUrl": "http://localhost:5001/health",
      "StatusPageUrl": "http://localhost:5001/info"
    }
  }
}
```

```csharp
builder.Services.AddServiceDiscovery(options => options.UseEureka());

var app = builder.Build();
app.UseDiscoveryClient();
```

### Service Discovery with Eureka

```csharp
public class ProductServiceClient
{
    private readonly DiscoveryHttpClientHandler _handler;

    public ProductServiceClient(IDiscoveryClient client)
    {
        _handler = new DiscoveryHttpClientHandler(client);
    }

    public async Task<Product> GetProductAsync(int id)
    {
        var client = new HttpClient(_handler, false);

        // Use service name instead of URL
        var response = await client.GetAsync("http://product-service/api/products/{id}");

        return await response.Content.ReadFromJsonAsync<Product>();
    }
}
```

## Kubernetes Service Discovery

Kubernetes has built-in service discovery via DNS:

```yaml
# product-service.yaml
apiVersion: v1
kind: Service
metadata:
  name: product-service
spec:
  selector:
    app: product
  ports:
    - port: 80
      targetPort: 8080
---
apiVersion: apps/v1
kind: Deployment
metadata:
  name: product-deployment
spec:
  replicas: 3
  selector:
    matchLabels:
      app: product
  template:
    metadata:
      labels:
        app: product
    spec:
      containers:
        - name: product
          image: product-service:latest
          ports:
            - containerPort: 8080
```

```csharp
// Services automatically discoverable by DNS name
public class OrderService
{
    public async Task<Product> GetProduct(int id)
    {
        // Kubernetes automatically resolves "product-service" to available pods
        var response = await _httpClient.GetAsync(
            "http://product-service/api/products/{id}");

        return await response.Content.ReadFromJsonAsync<Product>();
    }
}
```

## Health Checks

```csharp
// Basic health check
builder.Services.AddHealthChecks()
    .AddDbContextCheck<ProductDbContext>()
    .AddUrlGroup(new Uri("http://dependency-service/health"), "dependency-check");

app.MapHealthChecks("/health");

// Advanced health check
public class ProductServiceHealthCheck : IHealthCheck
{
    private readonly ProductDbContext _context;
    private readonly IHttpClientFactory _httpClientFactory;

    public async Task<HealthCheckResult> CheckHealthAsync(
        HealthCheckContext context,
        CancellationToken cancellationToken = default)
    {
        var data = new Dictionary<string, object>();

        try
        {
            // Check database
            await _context.Database.CanConnectAsync(cancellationToken);
            data["database"] = "healthy";
        }
        catch (Exception ex)
        {
            return HealthCheckResult.Unhealthy("Database check failed", ex, data);
        }

        try
        {
            // Check dependencies
            var client = _httpClientFactory.CreateClient();
            var response = await client.GetAsync("http://dependency/health");

            if (!response.IsSuccessStatusCode)
            {
                return HealthCheckResult.Degraded("Dependency unhealthy", null, data);
            }

            data["dependency"] = "healthy";
        }
        catch
        {
            data["dependency"] = "unhealthy";
            return HealthCheckResult.Degraded("Dependency unavailable", null, data);
        }

        return HealthCheckResult.Healthy("All checks passed", data);
    }
}
```

## Service Registry Pattern

```csharp
public interface IServiceRegistry
{
    Task RegisterAsync(ServiceRegistration registration);
    Task DeregisterAsync(string serviceId);
    Task<IEnumerable<ServiceInstance>> DiscoverAsync(string serviceName);
}

public class ServiceRegistration
{
    public string ServiceId { get; set; }
    public string ServiceName { get; set; }
    public string Address { get; set; }
    public int Port { get; set; }
    public string[] Tags { get; set; }
    public HealthCheck HealthCheck { get; set; }
}

public class ServiceInstance
{
    public string ServiceId { get; set; }
    public string Address { get; set; }
    public int Port { get; set; }
    public bool IsHealthy { get; set; }
}

public class ConsulServiceRegistry : IServiceRegistry
{
    private readonly IConsulClient _consulClient;

    public async Task RegisterAsync(ServiceRegistration registration)
    {
        var consulRegistration = new AgentServiceRegistration
        {
            ID = registration.ServiceId,
            Name = registration.ServiceName,
            Address = registration.Address,
            Port = registration.Port,
            Tags = registration.Tags,
            Check = new AgentServiceCheck
            {
                HTTP = registration.HealthCheck.Url,
                Interval = registration.HealthCheck.Interval,
                Timeout = registration.HealthCheck.Timeout
            }
        };

        await _consulClient.Agent.ServiceRegister(consulRegistration);
    }

    public async Task DeregisterAsync(string serviceId)
    {
        await _consulClient.Agent.ServiceDeregister(serviceId);
    }

    public async Task<IEnumerable<ServiceInstance>> DiscoverAsync(string serviceName)
    {
        var services = await _consulClient.Health.Service(serviceName, "", true);

        return services.Response.Select(s => new ServiceInstance
        {
            ServiceId = s.Service.ID,
            Address = s.Service.Address,
            Port = s.Service.Port,
            IsHealthy = s.Checks.All(c => c.Status == HealthStatus.Passing)
        });
    }
}
```

## Comparison Table

| Tool | Type | Language | Use Case |
|------|------|----------|----------|
| Consul | Client-side | Go | General purpose, K/V store, service mesh |
| Eureka | Client-side | Java | Spring Cloud, Netflix stack |
| Kubernetes | Server-side | Go | Container orchestration |
| Zookeeper | Client-side | Java | Distributed coordination |
| etcd | Client-side | Go | Key-value store, Kubernetes backend |

## Interview Tips

- Explain client-side vs server-side discovery
- Know health check strategies
- Understand service registry pattern
- Discuss failover and load balancing
- Know tools: Consul, Eureka, Kubernetes
- Explain DNS-based discovery
- Discuss CAP theorem in context of service registry

## Best Practices

1. **Implement health checks**: Don't rely on registration alone
2. **Deregister on shutdown**: Graceful deregistration
3. **Use heartbeats**: Regular health check intervals
4. **Cache service locations**: Reduce registry queries
5. **Handle failures**: Circuit breaker + retry
6. **Monitor registry health**: Registry is critical infrastructure
7. **Use multiple registry nodes**: High availability

## Key Takeaways

1. Service discovery is essential for dynamic cloud environments
2. Health checks prevent routing to unhealthy instances
3. Client-side discovery gives more control
4. Server-side discovery simplifies clients
5. Kubernetes provides built-in service discovery
6. Always implement graceful shutdown
7. Service registry is a single point of failure - make it HA
