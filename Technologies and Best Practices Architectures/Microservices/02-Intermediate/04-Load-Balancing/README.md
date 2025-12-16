# Load Balancing

## What is Load Balancing?

Distributing incoming network traffic across multiple service instances to:
- Improve availability
- Increase throughput
- Prevent overload
- Enable horizontal scaling

## Load Balancing Strategies

### 1. Round Robin
Distribute requests sequentially across instances.

```csharp
public class RoundRobinLoadBalancer
{
    private int _currentIndex = 0;
    private readonly object _lock = new object();

    public ServiceInstance SelectInstance(List<ServiceInstance> instances)
    {
        lock (_lock)
        {
            var instance = instances[_currentIndex % instances.Count];
            _currentIndex++;
            return instance;
        }
    }
}
```

### 2. Least Connections
Send to instance with fewest active connections.

```csharp
public class LeastConnectionLoadBalancer
{
    private readonly ConcurrentDictionary<string, int> _connections = new();

    public ServiceInstance SelectInstance(List<ServiceInstance> instances)
    {
        return instances.OrderBy(i => _connections.GetOrAdd(i.Id, 0)).First();
    }

    public void IncrementConnection(string instanceId)
    {
        _connections.AddOrUpdate(instanceId, 1, (key, val) => val + 1);
    }

    public void DecrementConnection(string instanceId)
    {
        _connections.AddOrUpdate(instanceId, 0, (key, val) => Math.Max(0, val - 1));
    }
}
```

### 3. Weighted Round Robin
Instances with higher capacity get more requests.

```csharp
public class WeightedRoundRobinLoadBalancer
{
    private int _currentIndex = 0;
    private int _currentWeight = 0;

    public ServiceInstance SelectInstance(List<WeightedServiceInstance> instances)
    {
        while (true)
        {
            _currentIndex = (_currentIndex + 1) % instances.Count;

            if (_currentIndex == 0)
            {
                _currentWeight = _currentWeight - 1;
                if (_currentWeight <= 0)
                {
                    _currentWeight = instances.Max(i => i.Weight);
                }
            }

            if (instances[_currentIndex].Weight >= _currentWeight)
            {
                return instances[_currentIndex];
            }
        }
    }
}
```

### 4. Random
Randomly select an instance.

```csharp
public class RandomLoadBalancer
{
    private readonly Random _random = new Random();

    public ServiceInstance SelectInstance(List<ServiceInstance> instances)
    {
        return instances[_random.Next(instances.Count)];
    }
}
```

### 5. IP Hash
Route based on client IP (session affinity).

```csharp
public class IpHashLoadBalancer
{
    public ServiceInstance SelectInstance(List<ServiceInstance> instances, string clientIp)
    {
        var hash = clientIp.GetHashCode();
        var index = Math.Abs(hash % instances.Count);
        return instances[index];
    }
}
```

## Client-Side Load Balancing

```csharp
public interface ILoadBalancedHttpClient
{
    Task<HttpResponseMessage> SendAsync(string serviceName, HttpRequestMessage request);
}

public class LoadBalancedHttpClient : ILoadBalancedHttpClient
{
    private readonly IServiceDiscovery _serviceDiscovery;
    private readonly ILoadBalancer _loadBalancer;
    private readonly HttpClient _httpClient;

    public async Task<HttpResponseMessage> SendAsync(
        string serviceName,
        HttpRequestMessage request)
    {
        var instances = await _serviceDiscovery.GetHealthyInstancesAsync(serviceName);

        if (!instances.Any())
            throw new ServiceUnavailableException(serviceName);

        var selectedInstance = _loadBalancer.SelectInstance(instances);

        request.RequestUri = new Uri(
            $"http://{selectedInstance.Address}:{selectedInstance.Port}{request.RequestUri}");

        return await _httpClient.SendAsync(request);
    }
}

// Usage
public class OrderService
{
    private readonly ILoadBalancedHttpClient _httpClient;

    public async Task<Product> GetProduct(int id)
    {
        var request = new HttpRequestMessage(HttpMethod.Get, $"/api/products/{id}");

        var response = await _httpClient.SendAsync("product-service", request);

        return await response.Content.ReadFromJsonAsync<Product>();
    }
}
```

## Server-Side Load Balancing

### NGINX

```nginx
upstream product_service {
    least_conn;  # Load balancing strategy
    server product-service-1:80;
    server product-service-2:80;
    server product-service-3:80;
}

server {
    listen 80;
    server_name api.example.com;

    location /products/ {
        proxy_pass http://product_service/;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

### HAProxy

```
frontend http_front
    bind *:80
    default_backend product_servers

backend product_servers
    balance roundrobin
    server product1 product-service-1:80 check
    server product2 product-service-2:80 check
    server product3 product-service-3:80 check
```

### Kubernetes Service

```yaml
apiVersion: v1
kind: Service
metadata:
  name: product-service
spec:
  selector:
    app: product
  ports:
    - protocol: TCP
      port: 80
      targetPort: 8080
  type: LoadBalancer  # Cloud provider load balancer
```

## Sticky Sessions (Session Affinity)

```csharp
public class StickySessionLoadBalancer
{
    private readonly ConcurrentDictionary<string, string> _sessionToInstance = new();
    private readonly ILoadBalancer _fallbackBalancer;

    public ServiceInstance SelectInstance(
        List<ServiceInstance> instances,
        string sessionId)
    {
        if (_sessionToInstance.TryGetValue(sessionId, out var instanceId))
        {
            var stickyInstance = instances.FirstOrDefault(i => i.Id == instanceId);
            if (stickyInstance != null)
                return stickyInstance;
        }

        // Session expired or instance unavailable
        var newInstance = _fallbackBalancer.SelectInstance(instances);
        _sessionToInstance[sessionId] = newInstance.Id;

        return newInstance;
    }
}
```

## Health-Aware Load Balancing

```csharp
public class HealthAwareLoadBalancer
{
    private readonly ILoadBalancer _baseBalancer;
    private readonly IHealthChecker _healthChecker;

    public async Task<ServiceInstance> SelectInstanceAsync(
        List<ServiceInstance> instances)
    {
        // Filter healthy instances
        var healthyInstances = new List<ServiceInstance>();

        foreach (var instance in instances)
        {
            if (await _healthChecker.IsHealthyAsync(instance))
            {
                healthyInstances.Add(instance);
            }
        }

        if (!healthyInstances.Any())
            throw new NoHealthyInstancesException();

        return _baseBalancer.SelectInstance(healthyInstances);
    }
}
```

## Load Balancing with Retry

```csharp
public class RetryableLoadBalancedClient
{
    public async Task<HttpResponseMessage> SendWithRetryAsync(
        string serviceName,
        HttpRequestMessage request,
        int maxRetries = 3)
    {
        var instances = await _serviceDiscovery.GetInstancesAsync(serviceName);
        var triedInstances = new HashSet<string>();

        for (int attempt = 0; attempt < maxRetries; attempt++)
        {
            var availableInstances = instances
                .Where(i => !triedInstances.Contains(i.Id))
                .ToList();

            if (!availableInstances.Any())
                break;

            var instance = _loadBalancer.SelectInstance(availableInstances);
            triedInstances.Add(instance.Id);

            try
            {
                var response = await SendToInstanceAsync(instance, request);

                if (response.IsSuccessStatusCode)
                    return response;
            }
            catch (HttpRequestException)
            {
                // Try next instance
                continue;
            }
        }

        throw new AllInstancesFailedException(serviceName);
    }
}
```

## Comparison Table

| Strategy | Pros | Cons | Use Case |
|----------|------|------|----------|
| Round Robin | Simple, fair distribution | Doesn't consider load | Homogeneous instances |
| Least Connections | Adaptive to load | Overhead tracking connections | Long-lived connections |
| Weighted | Handles heterogeneous capacity | Complex configuration | Mixed instance sizes |
| Random | Simple, stateless | May be uneven | Stateless services |
| IP Hash | Session affinity | Uneven distribution | Stateful sessions |

## Interview Tips

- Understand client-side vs server-side load balancing
- Know different algorithms and trade-offs
- Explain session affinity challenges
- Discuss health checking integration
- Know tools: NGINX, HAProxy, Kubernetes, AWS ELB
- Explain how to handle instance failures

## Best Practices

1. **Combine with health checks**: Only route to healthy instances
2. **Implement retry logic**: Handle transient failures
3. **Monitor distribution**: Ensure even load
4. **Use circuit breakers**: Prevent cascading failures
5. **Consider latency**: Route to nearest/fastest instance
6. **Graceful shutdown**: Drain connections before shutdown
7. **Avoid session affinity when possible**: Prefer stateless

## Key Takeaways

1. Load balancing enables horizontal scaling
2. Client-side gives more control, server-side simplifies clients
3. Choose strategy based on workload characteristics
4. Always integrate with health checking
5. Kubernetes provides built-in load balancing
6. Session affinity adds complexity - avoid if possible
7. Monitor and adjust based on actual traffic patterns
