# Circuit Breakers

## The Problem

Cascading failures in distributed systems:

```
Service A → Service B (down) → Timeout → Service A waits → Resource exhaustion → Service A crashes
```

## Solution: Circuit Breaker Pattern

Prevents cascading failures by "breaking the circuit" when failures exceed threshold.

## Circuit States

### 1. Closed (Normal)
Requests pass through normally.

### 2. Open (Failing)
Requests fail immediately without calling service.

### 3. Half-Open (Testing)
Limited requests allowed to test if service recovered.

```
Closed → [Failures exceed threshold] → Open
Open → [After timeout] → Half-Open
Half-Open → [Success] → Closed
Half-Open → [Failure] → Open
```

## Polly Implementation

### Installation
```bash
dotnet add package Polly
dotnet add package Polly.Extensions.Http
```

### Basic Circuit Breaker
```csharp
var circuitBreakerPolicy = Policy<HttpResponseMessage>
    .Handle<HttpRequestException>()
    .OrResult(r => !r.IsSuccessStatusCode)
    .CircuitBreakerAsync(
        handledEventsAllowedBeforeBreaking: 5,
        durationOfBreak: TimeSpan.FromSeconds(30),
        onBreak: (result, duration) =>
        {
            _logger.LogWarning("Circuit breaker opened for {Duration}s", duration.TotalSeconds);
        },
        onReset: () =>
        {
            _logger.LogInformation("Circuit breaker reset");
        },
        onHalfOpen: () =>
        {
            _logger.LogInformation("Circuit breaker half-open");
        });

builder.Services.AddHttpClient<IProductService, ProductService>()
    .AddPolicyHandler(circuitBreakerPolicy);
```

### Advanced Circuit Breaker
```csharp
var circuitBreakerPolicy = Policy<HttpResponseMessage>
    .Handle<HttpRequestException>()
    .Or<TimeoutException>()
    .OrResult(r => (int)r.StatusCode >= 500) // Server errors only
    .AdvancedCircuitBreakerAsync(
        failureThreshold: 0.5,              // 50% failure rate
        samplingDuration: TimeSpan.FromSeconds(10),
        minimumThroughput: 10,              // At least 10 requests
        durationOfBreak: TimeSpan.FromSeconds(30),
        onBreak: (result, duration, context) =>
        {
            _logger.LogError("Circuit breaker opened. Failure rate exceeded.");
        },
        onReset: (context) =>
        {
            _logger.LogInformation("Circuit breaker reset.");
        });
```

### Combined with Retry
```csharp
var retryPolicy = Policy<HttpResponseMessage>
    .Handle<HttpRequestException>()
    .WaitAndRetryAsync(
        retryCount: 3,
        sleepDurationProvider: retryAttempt => TimeSpan.FromSeconds(Math.Pow(2, retryAttempt)),
        onRetry: (outcome, timespan, retryCount, context) =>
        {
            _logger.LogWarning("Retry {RetryCount} after {Delay}s", retryCount, timespan.TotalSeconds);
        });

var circuitBreakerPolicy = Policy<HttpResponseMessage>
    .Handle<HttpRequestException>()
    .CircuitBreakerAsync(5, TimeSpan.FromSeconds(30));

// Wrap: retry first, then circuit breaker
var policyWrap = Policy.WrapAsync(retryPolicy, circuitBreakerPolicy);

builder.Services.AddHttpClient<IProductService, ProductService>()
    .AddPolicyHandler(policyWrap);
```

### Timeout Policy
```csharp
var timeoutPolicy = Policy.TimeoutAsync<HttpResponseMessage>(
    TimeSpan.FromSeconds(10),
    TimeoutStrategy.Pessimistic,
    onTimeoutAsync: (context, timeout, task) =>
    {
        _logger.LogWarning("Request timeout after {Timeout}s", timeout.TotalSeconds);
        return Task.CompletedTask;
    });
```

### Bulkhead Isolation
Limits concurrent requests to prevent resource exhaustion.

```csharp
var bulkheadPolicy = Policy.BulkheadAsync<HttpResponseMessage>(
    maxParallelization: 10,
    maxQueuingActions: 20,
    onBulkheadRejectedAsync: context =>
    {
        _logger.LogWarning("Bulkhead rejected request");
        return Task.CompletedTask;
    });
```

### Complete Resilience Strategy
```csharp
// 1. Timeout
var timeoutPolicy = Policy.TimeoutAsync<HttpResponseMessage>(10);

// 2. Retry
var retryPolicy = Policy<HttpResponseMessage>
    .Handle<HttpRequestException>()
    .WaitAndRetryAsync(3, retryAttempt => TimeSpan.FromSeconds(Math.Pow(2, retryAttempt)));

// 3. Circuit Breaker
var circuitBreakerPolicy = Policy<HttpResponseMessage>
    .Handle<HttpRequestException>()
    .CircuitBreakerAsync(5, TimeSpan.FromSeconds(30));

// 4. Bulkhead
var bulkheadPolicy = Policy.BulkheadAsync<HttpResponseMessage>(10, 20);

// Combine all policies
var resiliencePolicy = Policy.WrapAsync(
    bulkheadPolicy,
    circuitBreakerPolicy,
    retryPolicy,
    timeoutPolicy);

builder.Services.AddHttpClient<IProductService, ProductService>()
    .AddPolicyHandler(resiliencePolicy);
```

## Fallback Strategies

```csharp
public class ProductService
{
    private readonly HttpClient _httpClient;
    private readonly IMemoryCache _cache;

    public async Task<Product> GetProductAsync(int id)
    {
        var fallbackPolicy = Policy<Product>
            .Handle<BrokenCircuitException>()
            .Or<HttpRequestException>()
            .FallbackAsync(
                fallbackValue: GetProductFromCache(id),
                onFallbackAsync: async (result, context) =>
                {
                    _logger.LogWarning("Using fallback for product {ProductId}", id);
                    await Task.CompletedTask;
                });

        return await fallbackPolicy.ExecuteAsync(async () =>
        {
            var response = await _httpClient.GetAsync($"/api/products/{id}");
            response.EnsureSuccessStatusCode();

            var product = await response.Content.ReadFromJsonAsync<Product>();

            // Cache for fallback
            _cache.Set($"product:{id}", product, TimeSpan.FromMinutes(5));

            return product;
        });
    }

    private Product GetProductFromCache(int id)
    {
        return _cache.Get<Product>($"product:{id}")
            ?? new Product { Id = id, Name = "Unavailable", Price = 0 };
    }
}
```

## Monitoring Circuit Breakers

```csharp
public class CircuitBreakerMetrics
{
    private readonly IMetrics _metrics;

    private void OnBreak(DelegateResult<HttpResponseMessage> result, TimeSpan duration)
    {
        _metrics.Increment("circuit_breaker.opened");
        _logger.LogError("Circuit breaker opened for {Service}", serviceName);

        // Alert on-call engineer
        await _alertService.SendAlertAsync($"Circuit breaker opened for {serviceName}");
    }

    private void OnReset()
    {
        _metrics.Increment("circuit_breaker.closed");
        _logger.LogInformation("Circuit breaker closed for {Service}", serviceName);
    }

    private void OnHalfOpen()
    {
        _metrics.Increment("circuit_breaker.half_open");
    }
}
```

## Health Checks with Circuit Breakers

```csharp
public class ProductServiceHealthCheck : IHealthCheck
{
    private readonly IProductService _productService;

    public async Task<HealthCheckResult> CheckHealthAsync(
        HealthCheckContext context,
        CancellationToken cancellationToken = default)
    {
        try
        {
            await _productService.GetProductAsync(1);
            return HealthCheckResult.Healthy("Product service is accessible");
        }
        catch (BrokenCircuitException)
        {
            return HealthCheckResult.Unhealthy("Circuit breaker is open");
        }
        catch (Exception ex)
        {
            return HealthCheckResult.Degraded("Product service error", ex);
        }
    }
}
```

## Resilience Patterns Comparison

| Pattern | Purpose | When to Use |
|---------|---------|-------------|
| Retry | Handle transient failures | Network glitches, temporary unavailability |
| Circuit Breaker | Prevent cascading failures | Sustained outages |
| Timeout | Prevent hanging | Slow/unresponsive services |
| Bulkhead | Limit concurrent requests | Prevent resource exhaustion |
| Fallback | Provide alternative | Maintain functionality during outage |

## Interview Tips

- Explain circuit breaker states
- Know when to use each resilience pattern
- Discuss retry with exponential backoff
- Understand bulkhead isolation
- Know Polly library
- Explain fallback strategies
- Discuss monitoring and alerting

## Best Practices

1. **Set appropriate thresholds**: Based on service SLA
2. **Monitor circuit state**: Alert when opened
3. **Log circuit events**: Debug production issues
4. **Combine patterns**: Retry + Circuit Breaker + Timeout
5. **Implement fallbacks**: Graceful degradation
6. **Test circuit breaker**: Chaos engineering
7. **Document behavior**: Team awareness

## Common Mistakes

1. Retrying forever
2. Not implementing timeouts
3. Circuit breaker threshold too high/low
4. No fallback strategy
5. Not monitoring circuit state
6. Applying retry after circuit breaker (should be before)

## Key Takeaways

1. Circuit breakers prevent cascading failures
2. Always combine with timeout
3. Use retry for transient failures
4. Bulkhead limits concurrent requests
5. Implement fallback strategies
6. Monitor and alert on circuit state
7. Polly is the standard library for .NET
