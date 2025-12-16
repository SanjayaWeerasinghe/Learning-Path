# Kubernetes Basics

## Overview
Kubernetes (K8s) is the industry-standard container orchestration platform for deploying, scaling, and managing containerized applications.

## Topics Covered

### 1. Kubernetes Architecture
- Master node (Control Plane)
- Worker nodes
- Pods, Services, Deployments
- kubectl CLI
- Namespaces

### 2. Core Concepts
- **Pod**: Smallest deployable unit
- **Deployment**: Manages ReplicaSets
- **Service**: Exposes pods to network
- **ConfigMap**: Configuration data
- **Secret**: Sensitive data
- **Namespace**: Virtual clusters

### 3. Installation Options
- **Minikube**: Local development
- **Kind**: Kubernetes in Docker
- **Docker Desktop**: Built-in K8s
- **Cloud**: EKS, GKE, AKS

### 4. Essential kubectl Commands
```bash
# Cluster info
kubectl cluster-info
kubectl get nodes

# Pods
kubectl get pods
kubectl describe pod <pod-name>
kubectl logs <pod-name>
kubectl exec -it <pod-name> -- /bin/bash

# Deployments
kubectl create deployment <name> --image=<image>
kubectl get deployments
kubectl scale deployment <name> --replicas=3

# Services
kubectl expose deployment <name> --port=80 --type=LoadBalancer
kubectl get services

# Apply manifests
kubectl apply -f <file.yaml>
kubectl delete -f <file.yaml>
```

## Hands-On Tasks

### Task 1: Setup Kubernetes
1. Install Minikube or enable K8s in Docker Desktop
2. Verify installation: `kubectl version`
3. Start cluster: `minikube start` (if using Minikube)
4. Check nodes: `kubectl get nodes`
5. Explore dashboard: `minikube dashboard`

### Task 2: First Pod
**pod.yaml:**
```yaml
apiVersion: v1
kind: Pod
metadata:
  name: nginx-pod
  labels:
    app: nginx
spec:
  containers:
  - name: nginx
    image: nginx:alpine
    ports:
    - containerPort: 80
```

Tasks:
1. Create the pod: `kubectl apply -f pod.yaml`
2. Check status: `kubectl get pods`
3. View details: `kubectl describe pod nginx-pod`
4. Access logs: `kubectl logs nginx-pod`
5. Delete: `kubectl delete pod nginx-pod`

### Task 3: Deployment
**deployment.yaml:**
```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: web-deployment
spec:
  replicas: 3
  selector:
    matchLabels:
      app: web
  template:
    metadata:
      labels:
        app: web
    spec:
      containers:
      - name: nginx
        image: nginx:alpine
        ports:
        - containerPort: 80
```

Tasks:
1. Create deployment
2. Watch pods being created: `kubectl get pods -w`
3. Scale: `kubectl scale deployment web-deployment --replicas=5`
4. Update image: `kubectl set image deployment/web-deployment nginx=nginx:latest`
5. Check rollout status: `kubectl rollout status deployment/web-deployment`

### Task 4: Service
**service.yaml:**
```yaml
apiVersion: v1
kind: Service
metadata:
  name: web-service
spec:
  type: LoadBalancer
  selector:
    app: web
  ports:
  - port: 80
    targetPort: 80
```

Tasks:
1. Create service
2. Get service: `kubectl get svc`
3. Access application (use minikube tunnel if on Minikube)
4. Test load balancing by deleting pods

### Task 5: Complete Application
**app-deployment.yaml:**
```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: nodejs-app
spec:
  replicas: 2
  selector:
    matchLabels:
      app: nodejs
  template:
    metadata:
      labels:
        app: nodejs
    spec:
      containers:
      - name: app
        image: node:18-alpine
        command: ["sh", "-c", "echo 'const http = require(\"http\"); http.createServer((req,res) => res.end(\"Hello K8s!\")).listen(3000);' > server.js && node server.js"]
        ports:
        - containerPort: 3000
---
apiVersion: v1
kind: Service
metadata:
  name: nodejs-service
spec:
  selector:
    app: nodejs
  ports:
  - port: 80
    targetPort: 3000
  type: LoadBalancer
```

### Task 6: ConfigMap and Secrets
**configmap.yaml:**
```yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: app-config
data:
  APP_ENV: production
  LOG_LEVEL: info
```

**secret.yaml:**
```yaml
apiVersion: v1
kind: Secret
metadata:
  name: app-secrets
type: Opaque
stringData:
  DB_PASSWORD: mysecretpassword
  API_KEY: abc123xyz
```

**deployment-with-config.yaml:**
```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: app-with-config
spec:
  replicas: 1
  selector:
    matchLabels:
      app: myapp
  template:
    metadata:
      labels:
        app: myapp
    spec:
      containers:
      - name: app
        image: nginx:alpine
        env:
        - name: APP_ENV
          valueFrom:
            configMapKeyRef:
              name: app-config
              key: APP_ENV
        - name: DB_PASSWORD
          valueFrom:
            secretKeyRef:
              name: app-secrets
              key: DB_PASSWORD
```

## Common Patterns

### Rolling Update
```bash
kubectl set image deployment/myapp myapp=myapp:v2
kubectl rollout status deployment/myapp
kubectl rollout undo deployment/myapp  # Rollback
```

### Health Checks
```yaml
containers:
- name: app
  image: myapp
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

## Best Practices
1. Use Deployments, not bare Pods
2. Define resource limits and requests
3. Implement health checks
4. Use labels and selectors
5. Store configs in ConfigMaps
6. Never hardcode secrets
7. Use namespaces for organization
8. Version your manifests in Git

## Learning Resources
- [Kubernetes Documentation](https://kubernetes.io/docs/)
- [Kubernetes Basics Tutorial](https://kubernetes.io/docs/tutorials/kubernetes-basics/)
- [Play with Kubernetes](https://labs.play-with-k8s.com/)

## Verification Checklist
- [ ] Understand K8s architecture
- [ ] Can create Pods and Deployments
- [ ] Know how to expose Services
- [ ] Can use ConfigMaps and Secrets
- [ ] Understand scaling and updates
- [ ] Can debug pod issues

## Next Steps
Move to **03-Jenkins-GitHub-Actions** for advanced CI/CD.

## Estimated Time: 2 weeks
