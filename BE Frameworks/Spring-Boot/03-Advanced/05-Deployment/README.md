# Deployment - Production Deployment

## What You'll Learn

- Building JAR/WAR files
- Application properties for different environments
- Deploying to cloud platforms
- Docker containerization
- CI/CD pipelines
- Monitoring and logging

## Building Application

```bash
# Build JAR with Maven
mvn clean package

# Build JAR with Gradle
./gradlew build

# Run JAR
java -jar target/myapp-0.0.1-SNAPSHOT.jar
```

## Environment-Specific Configuration

### application.properties

```properties
spring.profiles.active=prod
```

### application-dev.properties

```properties
server.port=8080
spring.datasource.url=jdbc:h2:mem:testdb
logging.level.root=DEBUG
```

### application-prod.properties

```properties
server.port=80
spring.datasource.url=${DATABASE_URL}
logging.level.root=INFO
```

## Dockerfile

```dockerfile
FROM openjdk:17-jdk-slim
WORKDIR /app
COPY target/myapp-0.0.1-SNAPSHOT.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]
```

```bash
# Build Docker image
docker build -t myapp:latest .

# Run container
docker run -p 8080:8080 myapp:latest
```

## Docker Compose

```yaml
version: '3.8'
services:
  app:
    build: .
    ports:
      - "8080:8080"
    environment:
      - SPRING_PROFILES_ACTIVE=prod
      - DATABASE_URL=jdbc:postgresql://db:5432/mydb
    depends_on:
      - db

  db:
    image: postgres:15
    environment:
      POSTGRES_DB: mydb
      POSTGRES_USER: user
      POSTGRES_PASSWORD: password
    volumes:
      - postgres-data:/var/lib/postgresql/data

volumes:
  postgres-data:
```

## Heroku Deployment

```bash
# Install Heroku CLI
# Login
heroku login

# Create app
heroku create myapp

# Add PostgreSQL
heroku addons:create heroku-postgresql:hobby-dev

# Deploy
git push heroku main

# View logs
heroku logs --tail
```

## AWS Elastic Beanstalk

```bash
# Install EB CLI
pip install awsebcli

# Initialize
eb init

# Create environment
eb create my-env

# Deploy
eb deploy

# Open app
eb open
```

## Your Tasks

### Task 1: Build JAR
Build your application as an executable JAR.

### Task 2: Profiles
Configure different profiles for dev, test, and prod.

### Task 3: Docker
Containerize your application with Docker.

### Task 4: Docker Compose
Set up multi-container application with database.

### Task 5: Cloud Deployment
Deploy to Heroku or AWS.

### Task 6: CI/CD
Set up GitHub Actions for automated deployment.

## Production Checklist

- [ ] Use environment variables for secrets
- [ ] Enable HTTPS
- [ ] Set up database backups
- [ ] Configure logging
- [ ] Add health check endpoint
- [ ] Enable monitoring
- [ ] Set up error tracking
- [ ] Configure CORS
- [ ] Use connection pooling
- [ ] Enable compression

## Health Check Endpoint

```java
@RestController
public class HealthController {

    @GetMapping("/health")
    public ResponseEntity<String> health() {
        return ResponseEntity.ok("OK");
    }
}
```

## Congratulations!

You've completed the Spring Boot curriculum. You can now build and deploy production-ready Java applications!
