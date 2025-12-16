# Configuration in ASP.NET Core

## Introduction

ASP.NET Core provides a flexible configuration system that supports multiple sources including JSON files, environment variables, command-line arguments, and more.

## Configuration Sources

1. appsettings.json
2. appsettings.{Environment}.json
3. User secrets (development)
4. Environment variables
5. Command-line arguments

## appsettings.json

```json
{
  "Logging": {
    "LogLevel": {
      "Default": "Information",
      "Microsoft": "Warning"
    }
  },
  "ConnectionStrings": {
    "DefaultConnection": "Server=localhost;Database=MyDb;"
  },
  "AppSettings": {
    "ApplicationName": "My App",
    "MaxItems": 100
  }
}
```

## Reading Configuration

### Using IConfiguration
```csharp
public class HomeController : Controller
{
    private readonly IConfiguration _configuration;

    public HomeController(IConfiguration configuration)
    {
        _configuration = configuration;
    }

    public IActionResult Index()
    {
        var appName = _configuration["AppSettings:ApplicationName"];
        var connString = _configuration.GetConnectionString("DefaultConnection");
        return View();
    }
}
```

## Options Pattern

### Create Options Class
```csharp
public class AppSettings
{
    public string ApplicationName { get; set; }
    public int MaxItems { get; set; }
}
```

### Register Options
```csharp
builder.Services.Configure<AppSettings>(
    builder.Configuration.GetSection("AppSettings"));
```

### Inject Options
```csharp
public class HomeController : Controller
{
    private readonly AppSettings _settings;

    public HomeController(IOptions<AppSettings> options)
    {
        _settings = options.Value;
    }

    public IActionResult Index()
    {
        var name = _settings.ApplicationName;
        return View();
    }
}
```

## Environment-Specific Configuration

### appsettings.Development.json
```json
{
  "Logging": {
    "LogLevel": {
      "Default": "Debug"
    }
  },
  "ConnectionStrings": {
    "DefaultConnection": "Server=localhost;Database=MyDb_Dev;"
  }
}
```

### appsettings.Production.json
```json
{
  "Logging": {
    "LogLevel": {
      "Default": "Warning"
    }
  },
  "ConnectionStrings": {
    "DefaultConnection": "Server=prod-server;Database=MyDb_Prod;"
  }
}
```

## User Secrets

### Initialize
```bash
dotnet user-secrets init
```

### Set Secret
```bash
dotnet user-secrets set "ApiKey" "my-secret-api-key"
dotnet user-secrets set "ConnectionStrings:SecureDb" "Server=..."
```

### Access in Code
```csharp
var apiKey = _configuration["ApiKey"];
```

## Environment Variables

### Set Environment Variable
```bash
# Windows
set ASPNETCORE_ENVIRONMENT=Production

# Linux/Mac
export ASPNETCORE_ENVIRONMENT=Production
```

### Access in Code
```csharp
var env = builder.Environment.EnvironmentName;

if (builder.Environment.IsDevelopment())
{
    // Development-specific code
}
```

## Practical Tasks

### Task 1: Basic Configuration
- Create appsettings.json
- Read configuration values
- Use in controller

### Task 2: Options Pattern
- Create options class
- Configure options
- Inject and use options

### Task 3: Environment Configuration
- Create environment-specific config files
- Test in different environments
- Use user secrets for sensitive data

### Task 4: Multiple Sources
- Combine multiple configuration sources
- Understand configuration precedence
- Override settings per environment

## Best Practices

1. Use Options pattern for complex configuration
2. Never commit secrets to source control
3. Use user secrets in development
4. Use environment variables in production
5. Validate configuration at startup

## Interview Questions

1. How does configuration work in ASP.NET Core?
2. What is the Options pattern?
3. How do you handle secrets in development?
4. Explain configuration precedence
5. What are user secrets?

## Next Steps

- Learn middleware pipeline
- Explore logging
- Study deployment strategies
