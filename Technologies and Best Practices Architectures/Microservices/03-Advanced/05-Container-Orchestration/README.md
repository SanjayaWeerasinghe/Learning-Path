# Container Orchestration

## What is Container Orchestration?

Automated deployment, scaling, and management of containerized applications.

## Why Kubernetes?

- **Auto-scaling**: Scale pods based on CPU/memory
- **Self-healing**: Restart failed containers
- **Load balancing**: Distribute traffic
- **Rolling updates**: Zero-downtime deployments
- **Service discovery**: Built-in DNS
- **Secret management**: Secure configuration
- **Storage orchestration**: Persistent volumes

## Core Concepts

### Pod
Smallest deployable unit, contains one or more containers.

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: product-service-pod
spec:
  containers:
    - name: product-service
      image: product-service:1.0
      ports:
        - containerPort: 8080
```

### Deployment
Manages replica sets and rolling updates.

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: product-service
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
          image: product-service:1.0
          ports:
            - containerPort: 8080
          env:
            - name: ASPNETCORE_ENVIRONMENT
              value: "Production"
            - name: ConnectionStrings__DefaultConnection
              valueFrom:
                secretKeyRef:
                  name: db-secrets
                  key: connection-string
          resources:
            requests:
              memory: "256Mi"
              cpu: "250m"
            limits:
              memory: "512Mi"
              cpu: "500m"
          livenessProbe:
            httpGet:
              path: /health
              port: 8080
            initialDelaySeconds: 30
            periodSeconds: 10
          readinessProbe:
            httpGet:
              path: /ready
              port: 8080
            initialDelaySeconds: 5
            periodSeconds: 5
```

### Service
Exposes pods to network.

```yaml
apiVersion: v1
kind: Service
metadata:
  name: product-service
spec:
  selector:
    app: product
  type: LoadBalancer
  ports:
    - protocol: TCP
      port: 80
      targetPort: 8080
```

### ConfigMap
Configuration data.

```yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: app-config
data:
  appsettings.json: |
    {
      "Logging": {
        "LogLevel": {
          "Default": "Information"
        }
      },
      "ServiceUrls": {
        "OrderService": "http://order-service"
      }
    }
---
# Use in Deployment
spec:
  containers:
    - name: product
      volumeMounts:
        - name: config
          mountPath: /app/config
  volumes:
    - name: config
      configMap:
        name: app-config
```

### Secret
Sensitive data.

```yaml
apiVersion: v1
kind: Secret
metadata:
  name: db-secrets
type: Opaque
data:
  connection-string: U2VydmVyPW15LWRiOy4uLg==  # Base64 encoded
---
# Use in Deployment
spec:
  containers:
    - name: product
      env:
        - name: ConnectionStrings__DefaultConnection
          valueFrom:
            secretKeyRef:
              name: db-secrets
              key: connection-string
```

### Ingress
HTTP/HTTPS routing.

```yaml
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: api-ingress
  annotations:
    nginx.ingress.kubernetes.io/rewrite-target: /
spec:
  rules:
    - host: api.example.com
      http:
        paths:
          - path: /products
            pathType: Prefix
            backend:
              service:
                name: product-service
                port:
                  number: 80
          - path: /orders
            pathType: Prefix
            backend:
              service:
                name: order-service
                port:
                  number: 80
```

## Complete Microservices Setup

```yaml
# Namespace
apiVersion: v1
kind: Namespace
metadata:
  name: ecommerce

---
# Product Service
apiVersion: apps/v1
kind: Deployment
metadata:
  name: product-service
  namespace: ecommerce
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
          image: myregistry/product-service:1.0
          ports:
            - containerPort: 8080
          env:
            - name: ConnectionStrings__ProductDB
              valueFrom:
                secretKeyRef:
                  name: db-secrets
                  key: product-db
          resources:
            requests:
              memory: "256Mi"
              cpu: "250m"
            limits:
              memory: "512Mi"
              cpu: "500m"

---
apiVersion: v1
kind: Service
metadata:
  name: product-service
  namespace: ecommerce
spec:
  selector:
    app: product
  ports:
    - port: 80
      targetPort: 8080

---
# Order Service
apiVersion: apps/v1
kind: Deployment
metadata:
  name: order-service
  namespace: ecommerce
spec:
  replicas: 3
  selector:
    matchLabels:
      app: order
  template:
    metadata:
      labels:
        app: order
    spec:
      containers:
        - name: order
          image: myregistry/order-service:1.0
          ports:
            - containerPort: 8080
          env:
            - name: ServiceUrls__ProductService
              value: "http://product-service"
            - name: ConnectionStrings__OrderDB
              valueFrom:
                secretKeyRef:
                  name: db-secrets
                  key: order-db

---
apiVersion: v1
kind: Service
metadata:
  name: order-service
  namespace: ecommerce
spec:
  selector:
    app: order
  ports:
    - port: 80
      targetPort: 8080
```

## Horizontal Pod Autoscaler

```yaml
apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: product-service-hpa
  namespace: ecommerce
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: product-service
  minReplicas: 2
  maxReplicas: 10
  metrics:
    - type: Resource
      resource:
        name: cpu
        target:
          type: Utilization
          averageUtilization: 70
    - type: Resource
      resource:
        name: memory
        target:
          type: Utilization
          averageUtilization: 80
```

## StatefulSet (for Databases)

```yaml
apiVersion: apps/v1
kind: StatefulSet
metadata:
  name: postgres
spec:
  serviceName: postgres
  replicas: 1
  selector:
    matchLabels:
      app: postgres
  template:
    metadata:
      labels:
        app: postgres
    spec:
      containers:
        - name: postgres
          image: postgres:15
          ports:
            - containerPort: 5432
          env:
            - name: POSTGRES_PASSWORD
              valueFrom:
                secretKeyRef:
                  name: db-secrets
                  key: postgres-password
          volumeMounts:
            - name: data
              mountPath: /var/lib/postgresql/data
  volumeClaimTemplates:
    - metadata:
        name: data
      spec:
        accessModes: ["ReadWriteOnce"]
        resources:
          requests:
            storage: 10Gi
```

## Helm Charts

```yaml
# Chart.yaml
apiVersion: v2
name: product-service
version: 1.0.0
appVersion: "1.0"

# values.yaml
replicaCount: 3

image:
  repository: myregistry/product-service
  tag: "1.0"
  pullPolicy: IfNotPresent

service:
  type: LoadBalancer
  port: 80

resources:
  requests:
    memory: "256Mi"
    cpu: "250m"
  limits:
    memory: "512Mi"
    cpu: "500m"

autoscaling:
  enabled: true
  minReplicas: 2
  maxReplicas: 10
  targetCPUUtilizationPercentage: 70

# templates/deployment.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: {{ .Chart.Name }}
spec:
  replicas: {{ .Values.replicaCount }}
  template:
    spec:
      containers:
        - name: {{ .Chart.Name }}
          image: "{{ .Values.image.repository }}:{{ .Values.image.tag }}"
          resources:
            {{- toYaml .Values.resources | nindent 12 }}
```

```bash
# Install chart
helm install product-service ./product-service-chart

# Upgrade
helm upgrade product-service ./product-service-chart

# Rollback
helm rollback product-service 1
```

## kubectl Commands

```bash
# Apply configuration
kubectl apply -f deployment.yaml

# Get resources
kubectl get pods
kubectl get deployments
kubectl get services

# Describe
kubectl describe pod product-service-abc123

# Logs
kubectl logs product-service-abc123
kubectl logs -f product-service-abc123  # Follow

# Scale
kubectl scale deployment product-service --replicas=5

# Port forward
kubectl port-forward service/product-service 8080:80

# Execute command in pod
kubectl exec -it product-service-abc123 -- /bin/bash

# Delete
kubectl delete deployment product-service
kubectl delete -f deployment.yaml
```

## Docker Compose (Local Development)

```yaml
version: '3.8'

services:
  product-service:
    build: ./ProductService
    ports:
      - "5001:80"
    environment:
      - ASPNETCORE_ENVIRONMENT=Development
      - ConnectionStrings__ProductDB=Server=product-db;Database=ProductDB;
    depends_on:
      - product-db

  order-service:
    build: ./OrderService
    ports:
      - "5002:80"
    environment:
      - ASPNETCORE_ENVIRONMENT=Development
      - ConnectionStrings__OrderDB=Server=order-db;Database=OrderDB;
      - ServiceUrls__ProductService=http://product-service
    depends_on:
      - order-db
      - product-service

  product-db:
    image: postgres:15
    environment:
      POSTGRES_DB: ProductDB
      POSTGRES_PASSWORD: password
    volumes:
      - product-data:/var/lib/postgresql/data

  order-db:
    image: postgres:15
    environment:
      POSTGRES_DB: OrderDB
      POSTGRES_PASSWORD: password
    volumes:
      - order-data:/var/lib/postgresql/data

volumes:
  product-data:
  order-db:
```

## Interview Tips

- Understand pods, deployments, services
- Know difference between Deployment and StatefulSet
- Explain how Kubernetes handles self-healing
- Discuss rolling updates and rollbacks
- Know ConfigMaps vs Secrets
- Understand resource requests vs limits
- Explain horizontal pod autoscaling
- Know kubectl basic commands

## Best Practices

1. **Use health checks**: Liveness and readiness probes
2. **Set resource limits**: Prevent resource hogging
3. **Use namespaces**: Organize resources
4. **Implement autoscaling**: Handle traffic spikes
5. **Use Helm**: Template and version deployments
6. **Monitor pods**: Prometheus + Grafana
7. **Secure secrets**: Don't commit to Git
8. **Use labels**: Organize and select resources

## Key Takeaways

1. Kubernetes automates container management
2. Pods are basic units, Deployments manage them
3. Services provide stable networking
4. Use ConfigMaps for config, Secrets for sensitive data
5. Implement health checks for self-healing
6. HPA enables automatic scaling
7. Helm simplifies complex deployments
8. Docker Compose for local, Kubernetes for production
