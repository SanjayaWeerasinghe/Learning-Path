# Microservices Architecture

A comprehensive guide to microservices architecture concepts, patterns, and implementation practices.

## Table of Contents

### 01 - Basics
- [Introduction](01-Basics/01-Introduction/README.md)
- [Architecture Patterns](01-Basics/02-Architecture-Patterns/README.md)
- [REST vs Microservices](01-Basics/03-REST-vs-Microservices/README.md)

### 02 - Intermediate
- [Service Communication](02-Intermediate/01-Service-Communication/README.md)
- [API Gateway](02-Intermediate/02-API-Gateway/README.md)
- [Service Discovery](02-Intermediate/03-Service-Discovery/README.md)
- [Load Balancing](02-Intermediate/04-Load-Balancing/README.md)
- [Configuration Management](02-Intermediate/05-Configuration-Management/README.md)

### 03 - Advanced
- [Message Queues](03-Advanced/01-Message-Queues/README.md)
- [Event-Driven Architecture](03-Advanced/02-Event-Driven-Architecture/README.md)
- [Distributed Tracing](03-Advanced/03-Distributed-Tracing/README.md)
- [Circuit Breakers](03-Advanced/04-Circuit-Breakers/README.md)
- [Container Orchestration](03-Advanced/05-Container-Orchestration/README.md)

## Learning Path

1. **Basics**: Understand microservices fundamentals and when to use them
2. **Intermediate**: Learn service communication and infrastructure patterns
3. **Advanced**: Master distributed systems, resilience, and orchestration

## Key Technologies

### .NET Ecosystem
- ASP.NET Core Web API
- gRPC
- MassTransit / NServiceBus
- Ocelot API Gateway
- Consul / Eureka
- Docker & Kubernetes

### Common Tools
- Docker (Containerization)
- Kubernetes (Orchestration)
- RabbitMQ / Kafka (Messaging)
- Redis (Caching)
- Elasticsearch (Logging)
- Prometheus / Grafana (Monitoring)

## Microservices Principles

1. **Single Responsibility**: Each service does one thing well
2. **Autonomy**: Services are independent and loosely coupled
3. **Business Domain Centric**: Organized around business capabilities
4. **Decentralized**: Data management and governance
5. **Fault Isolation**: Failure in one service doesn't cascade
6. **Continuous Delivery**: Independently deployable
7. **Scalability**: Scale services independently

## Interview Focus Areas

- Understanding when to use microservices vs monoliths
- Service communication patterns (sync vs async)
- Handling distributed transactions (Saga pattern)
- Service discovery and load balancing
- Resilience patterns (Circuit Breaker, Retry, Timeout)
- Containerization and orchestration
- Monitoring and observability
- Security (API Gateway, OAuth, JWT)

## Resources

- Books: "Building Microservices" by Sam Newman
- Patterns: microservices.io
- Practice: Build a simple e-commerce system with multiple services
