# Database Integration - Connecting to Databases

## What You'll Learn

- Database configuration
- Connection pooling
- Multiple database support
- H2 in-memory database
- MySQL/PostgreSQL setup
- Database migrations with Flyway

## Configuration

### application.properties

```properties
# H2 Database (Development)
spring.datasource.url=jdbc:h2:mem:testdb
spring.datasource.driverClassName=org.h2.Driver
spring.h2.console.enabled=true

# MySQL
spring.datasource.url=jdbc:mysql://localhost:3306/mydb
spring.datasource.username=root
spring.datasource.password=password
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true

# PostgreSQL
spring.datasource.url=jdbc:postgresql://localhost:5432/mydb
spring.datasource.username=postgres
spring.datasource.password=password
```

## Entity Example

```java
@Entity
@Table(name = "products")
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private Double price;

    @Column(length = 500)
    private String description;

    @CreationTimestamp
    private LocalDateTime createdAt;

    @UpdateTimestamp
    private LocalDateTime updatedAt;

    // Getters and setters
}
```

## Repository

```java
@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
    List<Product> findByNameContaining(String keyword);
    List<Product> findByPriceBetween(Double min, Double max);
}
```

## Your Tasks

### Task 1: H2 Setup
Configure H2 database and access H2 console.

### Task 2: MySQL Integration
Connect Spring Boot app to MySQL database.

### Task 3: Multiple Entities
Create entities with relationships (One-to-Many, Many-to-Many).

### Task 4: Custom Queries
Write custom JPQL queries in repository.

### Task 5: Database Migration
Implement Flyway for database version control.

## Next Steps

Move to `04-Validation` for input validation!
