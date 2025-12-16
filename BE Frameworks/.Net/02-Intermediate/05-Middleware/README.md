# Middleware in ASP.NET Core

## Introduction

Middleware is software assembled into an application pipeline to handle requests and responses. Each middleware component can perform operations before and after the next component.

## Middleware Pipeline

```
Request → Middleware 1 → Middleware 2 → Middleware 3 → Response
          ↑              ↑              ↑
          └──────────────┴──────────────┘
```

## Built-in Middleware

### Common Middleware Order
```csharp
var app = builder.Build();

app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseRouting();
app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();

app.Run();
```

## Creating Custom Middleware

### Inline Middleware
```csharp
app.Use(async (context, next) =>
{
    // Before
    Console.WriteLine("Before next middleware");

    await next();

    // After
    Console.WriteLine("After next middleware");
});
```

### Class-Based Middleware
```csharp
public class RequestLoggingMiddleware
{
    private readonly RequestDelegate _next;
    private readonly ILogger<RequestLoggingMiddleware> _logger;

    public RequestLoggingMiddleware(
        RequestDelegate next,
        ILogger<RequestLoggingMiddleware> logger)
    {
        _next = next;
        _logger = logger;
    }

    public async Task InvokeAsync(HttpContext context)
    {
        _logger.LogInformation($"Request: {context.Request.Path}");

        await _next(context);

        _logger.LogInformation($"Response: {context.Response.StatusCode}");
    }
}
```

### Extension Method
```csharp
public static class MiddlewareExtensions
{
    public static IApplicationBuilder UseRequestLogging(
        this IApplicationBuilder builder)
    {
        return builder.UseMiddleware<RequestLoggingMiddleware>();
    }
}

// Usage
app.UseRequestLogging();
```

## Middleware Examples

### Exception Handling
```csharp
app.Use(async (context, next) =>
{
    try
    {
        await next();
    }
    catch (Exception ex)
    {
        context.Response.StatusCode = 500;
        await context.Response.WriteAsync($"Error: {ex.Message}");
    }
});
```

### Request Timing
```csharp
app.Use(async (context, next) =>
{
    var sw = Stopwatch.StartNew();
    await next();
    sw.Stop();

    context.Response.Headers.Add("X-Response-Time",
        $"{sw.ElapsedMilliseconds}ms");
});
```

### Custom Headers
```csharp
app.Use(async (context, next) =>
{
    context.Response.Headers.Add("X-Custom-Header", "MyValue");
    await next();
});
```

## Terminal Middleware

### Run (Terminal)
```csharp
app.Run(async context =>
{
    await context.Response.WriteAsync("Terminal middleware");
});
```

### Map (Branch Pipeline)
```csharp
app.Map("/api", apiApp =>
{
    apiApp.Run(async context =>
    {
        await context.Response.WriteAsync("API endpoint");
    });
});
```

### MapWhen (Conditional Branch)
```csharp
app.MapWhen(
    context => context.Request.Query.ContainsKey("branch"),
    app =>
    {
        app.Run(async context =>
        {
            await context.Response.WriteAsync("Branched");
        });
    });
```

## Practical Tasks

### Task 1: Request Logging
- Create middleware to log all requests
- Log request path, method, timestamp
- Log response status code

### Task 2: Exception Handling
- Create global exception handling middleware
- Return user-friendly error messages
- Log exceptions

### Task 3: Request Timing
- Create middleware to measure request duration
- Add timing header to response
- Log slow requests

### Task 4: Authentication Check
- Create middleware to check authentication
- Redirect unauthenticated users
- Allow public paths

## Best Practices

1. Order middleware correctly
2. Use built-in middleware when possible
3. Keep middleware focused and simple
4. Handle exceptions appropriately
5. Always call next() unless terminal
6. Consider performance impact

## Middleware Order

```csharp
// Correct order
app.UseExceptionHandler();
app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseRouting();
app.UseCors();
app.UseAuthentication();
app.UseAuthorization();
app.UseSession();
app.MapControllers();
```

## Interview Questions

1. What is middleware in ASP.NET Core?
2. Explain the middleware pipeline
3. How do you create custom middleware?
4. Why is middleware order important?
5. What is terminal middleware?
6. Difference between Use, Run, and Map?

## Next Steps

- Learn Entity Framework Core
- Explore authentication and authorization
- Study Web API development
