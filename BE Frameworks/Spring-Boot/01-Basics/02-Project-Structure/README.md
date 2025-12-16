# Spring Boot Project Structure

## What You'll Learn
- Understanding Spring Boot project directory structure
- Maven/Gradle build file structure
- Package organization best practices
- Configuration files and their purposes
- Resource management in Spring Boot
- Static resources and templates
- Test directory structure
- Layered architecture pattern

## Concept Overview

A well-organized Spring Boot project follows a standard structure that makes the application maintainable, scalable, and easy to understand.

### 1. Standard Project Structure

```
myapp/
├── src/
│   ├── main/
│   │   ├── java/
│   │   │   └── com/
│   │   │       └── example/
│   │   │           └── myapp/
│   │   │               ├── MyappApplication.java
│   │   │               ├── controller/
│   │   │               ├── service/
│   │   │               ├── repository/
│   │   │               ├── model/
│   │   │               ├── dto/
│   │   │               ├── config/
│   │   │               └── exception/
│   │   └── resources/
│   │       ├── application.properties
│   │       ├── application-dev.properties
│   │       ├── application-prod.properties
│   │       ├── static/
│   │       │   ├── css/
│   │       │   ├── js/
│   │       │   └── images/
│   │       └── templates/
│   └── test/
│       └── java/
│           └── com/
│               └── example/
│                   └── myapp/
│                       └── MyappApplicationTests.java
├── target/ (Maven) or build/ (Gradle)
├── pom.xml (Maven) or build.gradle (Gradle)
├── .gitignore
└── README.md
```

### 2. Package Organization

**Layered Architecture:**

```java
com.example.myapp/
├── controller/        // REST Controllers - Handle HTTP requests
├── service/          // Business Logic - Service layer
├── repository/       // Data Access - Database operations
├── model/            // Entity classes - Database models
├── dto/              // Data Transfer Objects
├── config/           // Configuration classes
├── exception/        // Custom exceptions and handlers
└── util/             // Utility classes
```

**Example Structure:**

```java
// Main Application Class
package com.example.myapp;

@SpringBootApplication
public class MyappApplication {
    public static void main(String[] args) {
        SpringApplication.run(MyappApplication.class, args);
    }
}
```

```java
// Controller Layer
package com.example.myapp.controller;

@RestController
@RequestMapping("/api/users")
public class UserController {
    // Handle HTTP requests
}
```

```java
// Service Layer
package com.example.myapp.service;

@Service
public class UserService {
    // Business logic
}
```

```java
// Repository Layer
package com.example.myapp.repository;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    // Database operations
}
```

```java
// Model/Entity Layer
package com.example.myapp.model;

@Entity
public class User {
    // Entity fields
}
```

### 3. Configuration Files

**application.properties:**
```properties
# Server Configuration
server.port=8080
server.servlet.context-path=/api

# Database Configuration
spring.datasource.url=jdbc:mysql://localhost:3306/mydb
spring.datasource.username=root
spring.datasource.password=password

# JPA Configuration
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true

# Logging
logging.level.root=INFO
logging.level.com.example.myapp=DEBUG
```

**application.yml (YAML format):**
```yaml
server:
  port: 8080
  servlet:
    context-path: /api

spring:
  datasource:
    url: jdbc:mysql://localhost:3306/mydb
    username: root
    password: password
  jpa:
    hibernate:
      ddl-auto: update
    show-sql: true

logging:
  level:
    root: INFO
    com.example.myapp: DEBUG
```

### 4. Maven Configuration (pom.xml)

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0
         https://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>

    <parent>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-parent</artifactId>
        <version>3.2.0</version>
        <relativePath/>
    </parent>

    <groupId>com.example</groupId>
    <artifactId>myapp</artifactId>
    <version>0.0.1-SNAPSHOT</version>
    <name>myapp</name>
    <description>Demo project for Spring Boot</description>

    <properties>
        <java.version>17</java.version>
    </properties>

    <dependencies>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
        </dependency>

        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-test</artifactId>
            <scope>test</scope>
        </dependency>
    </dependencies>

    <build>
        <plugins>
            <plugin>
                <groupId>org.springframework.boot</groupId>
                <artifactId>spring-boot-maven-plugin</artifactId>
            </plugin>
        </plugins>
    </build>
</project>
```

### 5. Profile-Based Configuration

**application-dev.properties:**
```properties
server.port=8080
spring.datasource.url=jdbc:h2:mem:testdb
logging.level.root=DEBUG
```

**application-prod.properties:**
```properties
server.port=80
spring.datasource.url=jdbc:mysql://prod-server:3306/proddb
logging.level.root=WARN
```

**Activate Profile:**
```bash
# Using command line
java -jar myapp.jar --spring.profiles.active=dev

# Or in application.properties
spring.profiles.active=dev
```

## Your Tasks

### Task 1: Create Layered Package Structure
Create a new Spring Boot project with the following package structure:

```
com.example.taskmanager/
├── TaskManagerApplication.java
├── controller/
├── service/
├── repository/
├── model/
└── dto/
```

Create empty marker files (e.g., `.gitkeep`) in each package to maintain structure.

### Task 2: Implement Basic Layered Architecture
Create a simple Task management system with proper layering:

**Model (Task.java):**
```java
package com.example.taskmanager.model;

public class Task {
    private Long id;
    private String title;
    private String description;
    private boolean completed;

    // Constructor
    public Task(Long id, String title, String description, boolean completed) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.completed = completed;
    }

    // Getters and Setters
    // ... (add all getters and setters)
}
```

**Service (TaskService.java):**
```java
package com.example.taskmanager.service;

import com.example.taskmanager.model.Task;
import org.springframework.stereotype.Service;
import java.util.*;

@Service
public class TaskService {
    private List<Task> tasks = new ArrayList<>();
    private Long nextId = 1L;

    public List<Task> getAllTasks() {
        return tasks;
    }

    public Task createTask(String title, String description) {
        Task task = new Task(nextId++, title, description, false);
        tasks.add(task);
        return task;
    }
}
```

**Controller (TaskController.java):**
```java
package com.example.taskmanager.controller;

import com.example.taskmanager.model.Task;
import com.example.taskmanager.service.TaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tasks")
public class TaskController {

    @Autowired
    private TaskService taskService;

    @GetMapping
    public List<Task> getAllTasks() {
        return taskService.getAllTasks();
    }

    @PostMapping
    public Task createTask(@RequestParam String title,
                          @RequestParam String description) {
        return taskService.createTask(title, description);
    }
}
```

### Task 3: Configure Application Properties
Create `application.properties` with the following configurations:

```properties
# Server Configuration
server.port=8081
spring.application.name=Task Manager

# Logging Configuration
logging.level.root=INFO
logging.level.com.example.taskmanager=DEBUG
logging.pattern.console=%d{yyyy-MM-dd HH:mm:ss} - %msg%n
```

### Task 4: Create Multiple Configuration Profiles
Create three configuration files:

**application.properties:**
```properties
spring.application.name=Task Manager
spring.profiles.active=dev
```

**application-dev.properties:**
```properties
server.port=8080
logging.level.root=DEBUG
environment.name=Development
```

**application-prod.properties:**
```properties
server.port=80
logging.level.root=WARN
environment.name=Production
```

Create an endpoint to display the active environment.

### Task 5: Configuration Class
Create a configuration class to read custom properties:

```java
package com.example.taskmanager.config;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

@Configuration
@ConfigurationProperties(prefix = "app")
public class AppConfig {
    private String name;
    private String version;

    // Getters and Setters
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getVersion() { return version; }
    public void setVersion(String version) { this.version = version; }
}
```

**In application.properties:**
```properties
app.name=Task Manager
app.version=1.0.0
```

**Use in Controller:**
```java
@RestController
public class InfoController {

    @Autowired
    private AppConfig appConfig;

    @GetMapping("/info")
    public Map<String, String> getInfo() {
        Map<String, String> info = new HashMap<>();
        info.put("name", appConfig.getName());
        info.put("version", appConfig.getVersion());
        return info;
    }
}
```

### Task 6: Static Resources
Create static resources structure:

1. Create `src/main/resources/static/index.html`:
```html
<!DOCTYPE html>
<html>
<head>
    <title>Task Manager</title>
</head>
<body>
    <h1>Welcome to Task Manager</h1>
    <p>API is running on <a href="/api/tasks">/api/tasks</a></p>
</body>
</html>
```

2. Create `src/main/resources/static/css/style.css`
3. Access http://localhost:8080/index.html

### Task 7: DTO Pattern Implementation
Create DTOs to separate internal models from API responses:

**DTO (TaskDTO.java):**
```java
package com.example.taskmanager.dto;

public class TaskDTO {
    private Long id;
    private String title;
    private String status;

    public TaskDTO(Long id, String title, boolean completed) {
        this.id = id;
        this.title = title;
        this.status = completed ? "COMPLETED" : "PENDING";
    }

    // Getters and Setters
}
```

**Update Controller to use DTO:**
```java
@GetMapping("/dto")
public List<TaskDTO> getTasksAsDTO() {
    return taskService.getAllTasks()
        .stream()
        .map(task -> new TaskDTO(task.getId(),
                                 task.getTitle(),
                                 task.isCompleted()))
        .collect(Collectors.toList());
}
```

### Task 8: Custom Exception Handling Structure
Create exception handling package:

**Custom Exception:**
```java
package com.example.taskmanager.exception;

public class TaskNotFoundException extends RuntimeException {
    public TaskNotFoundException(String message) {
        super(message);
    }
}
```

**Global Exception Handler:**
```java
package com.example.taskmanager.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(TaskNotFoundException.class)
    public ResponseEntity<String> handleTaskNotFound(TaskNotFoundException ex) {
        return ResponseEntity
            .status(HttpStatus.NOT_FOUND)
            .body(ex.getMessage());
    }
}
```

### Task 9: Utility Package
Create a utility class for common operations:

```java
package com.example.taskmanager.util;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

public class DateUtil {

    private static final DateTimeFormatter formatter =
        DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");

    public static String getCurrentTimestamp() {
        return LocalDateTime.now().format(formatter);
    }

    public static String formatDate(LocalDateTime date) {
        return date.format(formatter);
    }
}
```

### Task 10: Complete Project Organization
Reorganize your entire project following best practices:

1. Create all necessary packages (controller, service, repository, model, dto, config, exception, util)
2. Move existing classes to appropriate packages
3. Create a README.md documenting the structure
4. Add .gitignore file:

```
target/
.mvn/
.idea/
*.iml
*.class
*.log
```

5. Verify the application runs successfully with the new structure

## Common Pitfalls

### 1. Package Organization
**Problem:**
All classes in the same package
**Solution:**
- Follow layered architecture
- Separate concerns into different packages
- Keep related classes together

### 2. Configuration Files Location
**Problem:**
Configuration files in wrong directory
**Solution:**
- Always place .properties/.yml in `src/main/resources/`
- Use profile-specific naming: `application-{profile}.properties`

### 3. Cyclic Dependencies
**Problem:**
Service A depends on Service B, and Service B depends on Service A
**Solution:**
- Redesign package structure
- Use interfaces to break circular dependencies
- Consider creating a separate common package

### 4. Mixed Responsibilities
**Problem:**
Business logic in controllers, or HTTP logic in services
**Solution:**
- Controllers: Handle HTTP requests only
- Services: Contain business logic
- Repositories: Handle data access

### 5. Hardcoded Values
**Problem:**
Hardcoded configuration in Java code
**Solution:**
- Use application.properties for configuration
- Use @Value or @ConfigurationProperties
- Create profile-specific configurations

## Best Practices

1. **Consistent Package Naming**
   - Use lowercase for package names
   - Use meaningful, descriptive names
   - Follow company/project conventions

2. **Layered Architecture**
   - Controller -> Service -> Repository
   - Keep layers independent
   - Use interfaces where appropriate

3. **Configuration Management**
   - Externalize configuration
   - Use profiles for different environments
   - Keep sensitive data in environment variables

4. **Resource Organization**
   - Separate static resources by type
   - Use templates for server-side rendering
   - Keep resources folder organized

5. **Testing Structure**
   - Mirror main structure in test directory
   - Keep unit tests close to code they test
   - Use separate integration test package

6. **Documentation**
   - Include README.md
   - Document API endpoints
   - Add JavaDoc for public methods
   - Keep architecture diagram updated

7. **Build Configuration**
   - Keep pom.xml/build.gradle clean
   - Group dependencies logically
   - Use properties for versions

8. **Version Control**
   - Proper .gitignore
   - Don't commit generated files
   - Don't commit sensitive data

9. **Naming Conventions**
   - Controllers: *Controller.java
   - Services: *Service.java
   - Repositories: *Repository.java
   - Models: Descriptive entity names

10. **Package Dependencies**
    - Controller depends on Service
    - Service depends on Repository
    - Avoid reverse dependencies

## Next Steps

Once you complete these tasks, move on to `03-Annotations` to learn about Spring Boot's powerful annotation system!

**Challenge**: Create a complete e-commerce product catalog application with proper package structure including: Product model, ProductService, ProductController, ProductDTO, custom exceptions, configuration classes, and multiple environment profiles. Document the entire structure in a README file.
