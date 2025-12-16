# Spring Boot Setup - Getting Started

## What You'll Learn
- Installing Java Development Kit (JDK)
- Setting up your IDE (IntelliJ IDEA, Eclipse, or VS Code)
- Installing Maven/Gradle
- Using Spring Initializr to create projects
- Understanding Spring Boot dependencies
- Creating your first Spring Boot application
- Running and testing a Spring Boot app

## Concept Overview

Spring Boot is a framework that simplifies Spring application development by providing auto-configuration and starter dependencies. It allows you to create production-ready applications with minimal configuration.

### 1. Prerequisites

Before starting with Spring Boot, ensure you have:

**Java Development Kit (JDK)**
```bash
# Check Java version (JDK 17+ recommended)
java -version
javac -version
```

**Build Tool**
- Maven (most common) or Gradle
```bash
# Check Maven version
mvn -version

# Check Gradle version
gradle -version
```

### 2. Spring Initializr

Spring Initializr (https://start.spring.io/) is the easiest way to create Spring Boot projects.

**Configuration Options:**
- **Project**: Maven or Gradle
- **Language**: Java, Kotlin, or Groovy
- **Spring Boot Version**: Latest stable version
- **Project Metadata**:
  - Group: com.example
  - Artifact: demo
  - Name: demo
  - Package name: com.example.demo
  - Packaging: Jar or War
  - Java Version: 17 or higher

**Common Dependencies:**
- Spring Web - For REST APIs
- Spring Data JPA - Database access
- H2 Database - In-memory database
- Spring Boot DevTools - Development tools
- Lombok - Reduce boilerplate code

### 3. Project Structure

A typical Spring Boot project structure:

```
demo/
├── src/
│   ├── main/
│   │   ├── java/
│   │   │   └── com/example/demo/
│   │   │       └── DemoApplication.java
│   │   └── resources/
│   │       ├── application.properties
│   │       ├── static/
│   │       └── templates/
│   └── test/
│       └── java/
│           └── com/example/demo/
│               └── DemoApplicationTests.java
├── pom.xml (Maven) or build.gradle (Gradle)
└── README.md
```

### 4. Your First Spring Boot Application

**DemoApplication.java:**
```java
package com.example.demo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class DemoApplication {
    public static void main(String[] args) {
        SpringApplication.run(DemoApplication.class, args);
    }
}
```

**Simple REST Controller:**
```java
package com.example.demo;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HelloController {

    @GetMapping("/")
    public String hello() {
        return "Hello, Spring Boot!";
    }

    @GetMapping("/welcome")
    public String welcome() {
        return "Welcome to Spring Boot Learning!";
    }
}
```

### 5. Running Your Application

**Using Maven:**
```bash
mvn spring-boot:run
```

**Using Gradle:**
```bash
gradle bootRun
```

**Using IDE:**
- Right-click on DemoApplication.java
- Select "Run 'DemoApplication'"

**Using Java:**
```bash
mvn clean package
java -jar target/demo-0.0.1-SNAPSHOT.jar
```

**Access your application:**
```
http://localhost:8080/
```

### 6. Application Properties

**application.properties:**
```properties
# Server configuration
server.port=8080
server.servlet.context-path=/api

# Application name
spring.application.name=demo

# Logging
logging.level.root=INFO
logging.level.com.example.demo=DEBUG
```

**application.yml (alternative):**
```yaml
server:
  port: 8080
  servlet:
    context-path: /api

spring:
  application:
    name: demo

logging:
  level:
    root: INFO
    com.example.demo: DEBUG
```

## Your Tasks

### Task 1: Install Required Tools
Install the necessary development tools:
1. Install JDK 17 or higher
2. Install Maven or Gradle
3. Install an IDE (IntelliJ IDEA Community Edition recommended)
4. Verify installations with version commands

**Verification:**
```bash
java -version
javac -version
mvn -version
```

### Task 2: Create First Spring Boot Project
Using Spring Initializr (https://start.spring.io/):
1. Select Maven Project, Java, Spring Boot 3.x
2. Group: com.example
3. Artifact: firstapp
4. Dependencies: Spring Web
5. Generate and download the project
6. Extract and open in your IDE

### Task 3: Run the Default Application
1. Open the project in your IDE
2. Locate the main application class
3. Run the application
4. Verify it starts successfully (check console logs)
5. Access http://localhost:8080 (should show error page - this is normal)

**Expected Console Output:**
```
Started FirstappApplication in X.XXX seconds
```

### Task 4: Create a Simple REST Endpoint
Create a controller class with a hello endpoint:

```java
package com.example.firstapp;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HelloController {

    @GetMapping("/hello")
    public String hello() {
        return "Hello from Spring Boot!";
    }
}
```

Run the application and access http://localhost:8080/hello

**Expected Output:**
```
Hello from Spring Boot!
```

### Task 5: Multiple Endpoints
Extend your controller with multiple endpoints:

```java
@RestController
public class GreetingController {

    @GetMapping("/")
    public String home() {
        return "Welcome to Spring Boot Application!";
    }

    @GetMapping("/greet")
    public String greet() {
        return "Greetings from Spring Boot!";
    }

    @GetMapping("/about")
    public String about() {
        return "This is a Spring Boot learning application";
    }
}
```

Test all three endpoints in your browser or Postman.

### Task 6: Customize Server Port
Modify the application.properties file to change the server port:

```properties
server.port=8081
```

Restart the application and access http://localhost:8081/hello

### Task 7: Add Application Properties
Configure your application with custom properties:

```properties
server.port=8080
spring.application.name=MyFirstApp
logging.level.root=INFO
```

Restart and verify the application name appears in logs.

### Task 8: Return JSON Response
Create an endpoint that returns a JSON object:

```java
@RestController
public class DataController {

    @GetMapping("/user")
    public Map<String, String> getUser() {
        Map<String, String> user = new HashMap<>();
        user.put("name", "John Doe");
        user.put("email", "john@example.com");
        user.put("role", "Developer");
        return user;
    }
}
```

Access http://localhost:8080/user

**Expected Output:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "role": "Developer"
}
```

### Task 9: Create a POJO Response
Create a proper Java class for responses:

```java
package com.example.firstapp;

public class Product {
    private Long id;
    private String name;
    private double price;

    // Constructors
    public Product() {}

    public Product(Long id, String name, double price) {
        this.id = id;
        this.name = name;
        this.price = price;
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public double getPrice() { return price; }
    public void setPrice(double price) { this.price = price; }
}
```

```java
@RestController
public class ProductController {

    @GetMapping("/product")
    public Product getProduct() {
        return new Product(1L, "Laptop", 999.99);
    }
}
```

### Task 10: DevTools Setup (Optional)
Add Spring Boot DevTools for automatic restart:

**In pom.xml:**
```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-devtools</artifactId>
    <scope>runtime</scope>
    <optional>true</optional>
</dependency>
```

After adding this dependency:
1. Restart your application
2. Make a change to your controller
3. Save the file
4. Application should automatically restart

## Common Pitfalls

### 1. Port Already in Use
**Problem:**
```
Port 8080 is already in use
```
**Solution:**
- Change port in application.properties: `server.port=8081`
- Or stop the process using port 8080

### 2. JDK Version Mismatch
**Problem:**
```
Unsupported class file major version
```
**Solution:**
- Ensure JDK version matches Spring Boot requirements
- Use JDK 17 or higher for Spring Boot 3.x

### 3. Maven Dependencies Not Downloaded
**Problem:**
Dependencies not resolved
**Solution:**
```bash
mvn clean install
```
Or in IDE: Right-click project > Maven > Reload Project

### 4. Application Doesn't Start
**Problem:**
Application fails to start
**Solution:**
- Check for errors in console
- Verify @SpringBootApplication annotation
- Ensure main method signature is correct
- Check for port conflicts

### 5. Cannot Access Endpoints
**Problem:**
404 Not Found error
**Solution:**
- Verify URL path matches @GetMapping value
- Check if application is running
- Ensure controller has @RestController annotation
- Check context-path in application.properties

## Best Practices

1. **Use Spring Initializr**: Start projects with Spring Initializr for proper setup
2. **Choose Right Version**: Use latest stable Spring Boot version
3. **Minimal Dependencies**: Only add dependencies you need
4. **Properties Organization**: Use application.properties or application.yml consistently
5. **DevTools in Development**: Use DevTools for faster development cycle
6. **Proper Package Structure**: Organize code in meaningful packages
7. **IDE Plugins**: Install Spring Boot plugins for your IDE
8. **Version Control**: Initialize Git repository from the start
9. **README Documentation**: Document setup and running instructions
10. **Environment-Specific Config**: Use profiles for different environments

## IDE-Specific Setup

### IntelliJ IDEA
1. File > New > Project from Existing Sources
2. Select pom.xml or build.gradle
3. Enable annotation processing: Settings > Build > Compiler > Annotation Processors
4. Install Spring Boot plugin (if not already installed)

### Eclipse
1. File > Import > Maven > Existing Maven Projects
2. Install Spring Tools Suite (STS) plugin
3. Enable auto-build: Project > Build Automatically

### VS Code
1. Install Extension Pack for Java
2. Install Spring Boot Extension Pack
3. Open folder containing project
4. VS Code will automatically detect Spring Boot project

## Next Steps

Once you complete these tasks, move on to `02-Project-Structure` to understand how Spring Boot applications are organized!

**Challenge**: Create a Spring Boot application with multiple controllers serving different types of data (String, JSON, custom objects). Configure it to run on a custom port and add logging to track when endpoints are accessed.
