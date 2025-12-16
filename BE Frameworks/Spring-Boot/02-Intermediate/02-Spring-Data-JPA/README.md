# Spring Data JPA - Database Access Made Easy

## What You'll Learn
- Understanding JPA and Spring Data JPA
- Creating entities and relationships
- Repository interfaces and query methods
- Custom queries with @Query
- JPQL and native SQL queries
- Pagination and sorting
- Specifications for dynamic queries
- Auditing and timestamps
- Transaction management
- Performance optimization

## Concept Overview

Spring Data JPA provides a repository abstraction that significantly reduces the amount of boilerplate code required to implement data access layers.

### 1. Entity Creation

```java
@Entity
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String username;

    @Column(nullable = false)
    private String email;

    private String firstName;
    private String lastName;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    // Constructors, getters, setters
}
```

### 2. Repository Interface

```java
@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    // Method name query
    User findByUsername(String username);
    List<User> findByLastName(String lastName);
    List<User> findByEmailContaining(String email);

    // Multiple conditions
    List<User> findByFirstNameAndLastName(String firstName, String lastName);
    List<User> findByAgeGreaterThan(Integer age);

    // Ordering
    List<User> findByLastNameOrderByFirstNameAsc(String lastName);
}
```

### 3. Custom Queries

```java
@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {

    @Query("SELECT p FROM Product p WHERE p.price > :price")
    List<Product> findExpensiveProducts(@Param("price") Double price);

    @Query("SELECT p FROM Product p WHERE p.category = :category AND p.stock > 0")
    List<Product> findAvailableByCategory(@Param("category") String category);

    // Native SQL
    @Query(value = "SELECT * FROM products WHERE price BETWEEN :min AND :max",
           nativeQuery = true)
    List<Product> findByPriceRange(@Param("min") Double min, @Param("max") Double max);

    // Modifying query
    @Modifying
    @Query("UPDATE Product p SET p.stock = p.stock - :quantity WHERE p.id = :id")
    int decreaseStock(@Param("id") Long id, @Param("quantity") int quantity);
}
```

### 4. Relationships

**One-to-Many:**
```java
@Entity
public class Author {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    @OneToMany(mappedBy = "author", cascade = CascadeType.ALL)
    private List<Book> books = new ArrayList<>();
}

@Entity
public class Book {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;

    @ManyToOne
    @JoinColumn(name = "author_id")
    private Author author;
}
```

**Many-to-Many:**
```java
@Entity
public class Student {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    @ManyToMany
    @JoinTable(
        name = "student_course",
        joinColumns = @JoinColumn(name = "student_id"),
        inverseJoinColumns = @JoinColumn(name = "course_id")
    )
    private Set<Course> courses = new HashSet<>();
}

@Entity
public class Course {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    @ManyToMany(mappedBy = "courses")
    private Set<Student> students = new HashSet<>();
}
```

### 5. Pagination and Sorting

```java
@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {

    Page<Product> findByCategory(String category, Pageable pageable);

    List<Product> findTop10ByOrderByPriceDesc();
}

// Service
@Service
public class ProductService {

    @Autowired
    private ProductRepository repository;

    public Page<Product> getProducts(int page, int size, String sortBy) {
        Pageable pageable = PageRequest.of(page, size, Sort.by(sortBy).descending());
        return repository.findAll(pageable);
    }
}
```

### 6. Auditing

```java
@Entity
@EntityListeners(AuditingEntityListener.class)
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    @CreatedDate
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @LastModifiedDate
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    @CreatedBy
    private String createdBy;

    @LastModifiedBy
    private String lastModifiedBy;
}

// Enable auditing
@Configuration
@EnableJpaAuditing
public class JpaConfig {
}
```

## Your Tasks

### Task 1: Create Basic Entity and Repository
Create a Product entity with repository:

```java
@Entity
@Table(name = "products")
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    private String description;

    @Column(nullable = false)
    private Double price;

    private Integer stock;

    private String category;

    // Constructors, getters, setters
}

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
    List<Product> findByCategory(String category);
    List<Product> findByPriceGreaterThan(Double price);
    List<Product> findByStockLessThan(Integer stock);
}
```

### Task 2: Method Name Queries
Implement various query methods:

```java
@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    // Exact match
    User findByEmail(String email);

    // Like/Containing
    List<User> findByFirstNameContaining(String firstName);

    // Multiple conditions
    List<User> findByFirstNameAndLastName(String firstName, String lastName);

    // Greater than, Less than
    List<User> findByAgeGreaterThanEqual(Integer age);

    // Between
    List<User> findByCreatedAtBetween(LocalDateTime start, LocalDateTime end);

    // OrderBy
    List<User> findByLastNameOrderByFirstNameAsc(String lastName);

    // Top/First
    User findFirstByOrderByCreatedAtDesc();
    List<User> findTop5ByOrderByAgeDesc();

    // Exists
    boolean existsByEmail(String email);

    // Count
    Long countByLastName(String lastName);
}
```

### Task 3: Custom JPQL Queries
Create custom queries using @Query:

```java
@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {

    @Query("SELECT o FROM Order o WHERE o.status = :status")
    List<Order> findByStatus(@Param("status") String status);

    @Query("SELECT o FROM Order o WHERE o.totalAmount > :amount AND o.orderDate > :date")
    List<Order> findHighValueRecentOrders(
        @Param("amount") Double amount,
        @Param("date") LocalDate date
    );

    @Query("SELECT o FROM Order o JOIN o.customer c WHERE c.email = :email")
    List<Order> findByCustomerEmail(@Param("email") String email);

    @Query("SELECT SUM(o.totalAmount) FROM Order o WHERE o.orderDate = :date")
    Double getTotalSalesForDate(@Param("date") LocalDate date);

    @Query("SELECT o.status, COUNT(o) FROM Order o GROUP BY o.status")
    List<Object[]> getOrderCountByStatus();
}
```

### Task 4: Native SQL Queries
Use native SQL when needed:

```java
@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {

    @Query(value = "SELECT * FROM products WHERE price BETWEEN :min AND :max",
           nativeQuery = true)
    List<Product> findByPriceRange(@Param("min") Double min, @Param("max") Double max);

    @Query(value = "SELECT category, AVG(price) as avg_price " +
                   "FROM products GROUP BY category",
           nativeQuery = true)
    List<Object[]> getAveragePriceByCategory();

    @Query(value = "SELECT * FROM products WHERE LOWER(name) LIKE LOWER(CONCAT('%', :search, '%'))",
           nativeQuery = true)
    List<Product> searchByName(@Param("search") String search);
}
```

### Task 5: One-to-Many Relationship
Create Author-Book relationship:

```java
@Entity
public class Author {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String email;

    @OneToMany(mappedBy = "author", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Book> books = new ArrayList<>();

    // Helper methods
    public void addBook(Book book) {
        books.add(book);
        book.setAuthor(this);
    }

    public void removeBook(Book book) {
        books.remove(book);
        book.setAuthor(null);
    }
}

@Entity
public class Book {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    private String isbn;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "author_id")
    private Author author;
}

@Repository
public interface AuthorRepository extends JpaRepository<Author, Long> {
    @Query("SELECT a FROM Author a LEFT JOIN FETCH a.books WHERE a.id = :id")
    Author findByIdWithBooks(@Param("id") Long id);
}
```

### Task 6: Many-to-Many Relationship
Create Student-Course relationship:

```java
@Entity
public class Student {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String email;

    @ManyToMany(cascade = {CascadeType.PERSIST, CascadeType.MERGE})
    @JoinTable(
        name = "student_course",
        joinColumns = @JoinColumn(name = "student_id"),
        inverseJoinColumns = @JoinColumn(name = "course_id")
    )
    private Set<Course> courses = new HashSet<>();

    public void enrollCourse(Course course) {
        courses.add(course);
        course.getStudents().add(this);
    }
}

@Entity
public class Course {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String code;

    @ManyToMany(mappedBy = "courses")
    private Set<Student> students = new HashSet<>();
}

@Repository
public interface StudentRepository extends JpaRepository<Student, Long> {
    @Query("SELECT s FROM Student s LEFT JOIN FETCH s.courses WHERE s.id = :id")
    Student findByIdWithCourses(@Param("id") Long id);

    @Query("SELECT s FROM Student s JOIN s.courses c WHERE c.id = :courseId")
    List<Student> findByCourseId(@Param("courseId") Long courseId);
}
```

### Task 7: Pagination and Sorting
Implement paginated queries:

```java
@Service
public class ProductService {

    @Autowired
    private ProductRepository productRepository;

    public Page<Product> getAllProducts(int page, int size, String sortBy) {
        Pageable pageable = PageRequest.of(page, size, Sort.by(sortBy).descending());
        return productRepository.findAll(pageable);
    }

    public Page<Product> getProductsByCategory(String category, int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        return productRepository.findByCategory(category, pageable);
    }

    public List<Product> getTopProducts(int limit) {
        Pageable pageable = PageRequest.of(0, limit, Sort.by("price").descending());
        return productRepository.findAll(pageable).getContent();
    }
}

@RestController
@RequestMapping("/api/products")
public class ProductController {

    @Autowired
    private ProductService productService;

    @GetMapping
    public ResponseEntity<Page<Product>> getProducts(
        @RequestParam(defaultValue = "0") int page,
        @RequestParam(defaultValue = "10") int size,
        @RequestParam(defaultValue = "id") String sortBy
    ) {
        return ResponseEntity.ok(productService.getAllProducts(page, size, sortBy));
    }
}
```

### Task 8: Modifying Queries
Create update and delete queries:

```java
@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {

    @Modifying
    @Transactional
    @Query("UPDATE Product p SET p.price = p.price * :factor WHERE p.category = :category")
    int updatePricesByCategory(@Param("category") String category, @Param("factor") Double factor);

    @Modifying
    @Transactional
    @Query("UPDATE Product p SET p.stock = p.stock + :quantity WHERE p.id = :id")
    int increaseStock(@Param("id") Long id, @Param("quantity") int quantity);

    @Modifying
    @Transactional
    @Query("DELETE FROM Product p WHERE p.stock = 0 AND p.updatedAt < :date")
    int deleteOutOfStockProducts(@Param("date") LocalDateTime date);
}
```

### Task 9: Auditing
Add auditing to entities:

```java
@Entity
@EntityListeners(AuditingEntityListener.class)
public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String orderNumber;
    private Double totalAmount;

    @CreatedDate
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @LastModifiedDate
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    @CreatedBy
    @Column(name = "created_by", updatable = false)
    private String createdBy;

    @LastModifiedBy
    @Column(name = "last_modified_by")
    private String lastModifiedBy;
}

@Configuration
@EnableJpaAuditing(auditorAwareRef = "auditorProvider")
public class JpaConfig {

    @Bean
    public AuditorAware<String> auditorProvider() {
        return () -> Optional.of("system"); // Replace with actual user
    }
}
```

### Task 10: Complete E-commerce Data Model
Create a complete e-commerce data model:

```java
@Entity
public class Customer {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String email;

    @OneToMany(mappedBy = "customer")
    private List<Order> orders;
}

@Entity
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    private Customer customer;

    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL)
    private List<OrderItem> items;

    private LocalDateTime orderDate;
    private String status;
}

@Entity
public class OrderItem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    private Order order;

    @ManyToOne
    private Product product;

    private Integer quantity;
    private Double price;
}

@Entity
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private Double price;
    private Integer stock;

    @ManyToOne
    private Category category;
}

@Entity
public class Category {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;

    @OneToMany(mappedBy = "category")
    private List<Product> products;
}
```

## Common Pitfalls

### 1. N+1 Query Problem
**Problem:**
```java
List<Author> authors = authorRepository.findAll();
for (Author author : authors) {
    author.getBooks().size(); // Triggers N queries
}
```

**Solution:**
```java
@Query("SELECT a FROM Author a LEFT JOIN FETCH a.books")
List<Author> findAllWithBooks();
```

### 2. Bidirectional Relationship Issues
**Problem:**
Not maintaining both sides of the relationship

**Solution:**
```java
public void addBook(Book book) {
    books.add(book);
    book.setAuthor(this); // Maintain both sides
}
```

### 3. Missing @Transactional on Modifying Queries
**Problem:**
```java
@Modifying
@Query("UPDATE Product p SET p.price = :price WHERE p.id = :id")
int updatePrice(@Param("id") Long id, @Param("price") Double price);
```

**Solution:**
```java
@Modifying
@Transactional
@Query("UPDATE Product p SET p.price = :price WHERE p.id = :id")
int updatePrice(@Param("id") Long id, @Param("price") Double price);
```

### 4. Lazy Loading Outside Transaction
**Problem:**
```java
public Author getAuthor(Long id) {
    return authorRepository.findById(id).get();
}
// Later: author.getBooks() // LazyInitializationException
```

**Solution:**
```java
@Transactional(readOnly = true)
public Author getAuthor(Long id) {
    Author author = authorRepository.findById(id).get();
    author.getBooks().size(); // Force initialization
    return author;
}
```

## Best Practices

1. **Use Method Names Wisely**: Clear, descriptive repository method names
2. **Fetch Strategies**: Use LAZY loading by default, EAGER only when needed
3. **Projections**: Use DTOs to fetch only required fields
4. **Pagination**: Always paginate large result sets
5. **Transactions**: Use @Transactional appropriately
6. **Indexing**: Add database indexes for frequently queried fields
7. **Cascade Operations**: Be careful with CascadeType.ALL
8. **Auditing**: Enable for tracking changes
9. **Query Optimization**: Use JOIN FETCH to avoid N+1 problems
10. **Native Queries**: Use sparingly, prefer JPQL

## Next Steps

Once you complete these tasks, move on to `03-Database-Integration` to learn about connecting to different databases!

**Challenge**: Create a social media data model with Users, Posts, Comments, and Likes. Implement all relationships, custom queries for feed generation, pagination for posts, auditing for all entities, and methods to get trending posts, user followers, and comment threads.
