# Building REST APIs with Spring Boot

## What You'll Learn
- Understanding REST principles and architecture
- Creating RESTful endpoints (GET, POST, PUT, PATCH, DELETE)
- Request and response handling
- Path variables and request parameters
- Request body and response body
- HTTP status codes and responses
- Content negotiation
- HATEOAS basics
- API versioning strategies
- Best practices for REST API design

## Concept Overview

REST (Representational State Transfer) is an architectural style for building web services that use HTTP methods to perform CRUD operations on resources.

### 1. REST Principles

**Key Concepts:**
- **Resource-Based**: Everything is a resource (User, Product, Order)
- **HTTP Methods**: Use standard HTTP methods
  - GET: Retrieve resources
  - POST: Create resources
  - PUT: Update entire resource
  - PATCH: Partial update
  - DELETE: Remove resources
- **Stateless**: Each request contains all information needed
- **Uniform Interface**: Consistent URL patterns
- **JSON/XML**: Standard data formats

### 2. Basic REST Controller

```java
@RestController
@RequestMapping("/api/products")
public class ProductController {

    @GetMapping
    public List<Product> getAllProducts() {
        // Returns: 200 OK with list
    }

    @GetMapping("/{id}")
    public Product getProduct(@PathVariable Long id) {
        // Returns: 200 OK or 404 Not Found
    }

    @PostMapping
    public Product createProduct(@RequestBody Product product) {
        // Returns: 201 Created
    }

    @PutMapping("/{id}")
    public Product updateProduct(@PathVariable Long id,
                                 @RequestBody Product product) {
        // Returns: 200 OK
    }

    @DeleteMapping("/{id}")
    public void deleteProduct(@PathVariable Long id) {
        // Returns: 204 No Content
    }
}
```

### 3. HTTP Status Codes

```java
@RestController
@RequestMapping("/api/users")
public class UserController {

    @GetMapping("/{id}")
    public ResponseEntity<User> getUser(@PathVariable Long id) {
        User user = userService.findById(id);
        if (user == null) {
            return ResponseEntity.notFound().build(); // 404
        }
        return ResponseEntity.ok(user); // 200
    }

    @PostMapping
    public ResponseEntity<User> createUser(@RequestBody User user) {
        User created = userService.save(user);
        return ResponseEntity
            .status(HttpStatus.CREATED) // 201
            .body(created);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable Long id) {
        userService.delete(id);
        return ResponseEntity.noContent().build(); // 204
    }
}
```

### 4. Request Parameters and Path Variables

```java
@RestController
@RequestMapping("/api/search")
public class SearchController {

    // Path Variable
    @GetMapping("/user/{id}")
    public User getUserById(@PathVariable Long id) {
        return userService.findById(id);
    }

    // Multiple Path Variables
    @GetMapping("/user/{userId}/order/{orderId}")
    public Order getUserOrder(@PathVariable Long userId,
                             @PathVariable Long orderId) {
        return orderService.findByUserAndOrder(userId, orderId);
    }

    // Request Parameters
    @GetMapping("/users")
    public List<User> searchUsers(
        @RequestParam String name,
        @RequestParam(required = false) Integer age,
        @RequestParam(defaultValue = "0") int page,
        @RequestParam(defaultValue = "10") int size
    ) {
        return userService.search(name, age, page, size);
    }

    // Request Param with Map
    @GetMapping("/filter")
    public List<Product> filterProducts(@RequestParam Map<String, String> filters) {
        return productService.filter(filters);
    }
}
```

### 5. Request and Response Bodies

```java
// Request DTO
public class CreateUserRequest {
    private String username;
    private String email;
    private String password;
    // Getters and setters
}

// Response DTO
public class UserResponse {
    private Long id;
    private String username;
    private String email;
    private LocalDateTime createdAt;
    // Getters and setters
}

@RestController
@RequestMapping("/api/users")
public class UserController {

    @PostMapping
    public ResponseEntity<UserResponse> createUser(
            @RequestBody CreateUserRequest request) {

        User user = userService.create(request);
        UserResponse response = mapToResponse(user);

        return ResponseEntity
            .status(HttpStatus.CREATED)
            .body(response);
    }

    @GetMapping("/{id}")
    public ResponseEntity<UserResponse> getUser(@PathVariable Long id) {
        User user = userService.findById(id);
        return ResponseEntity.ok(mapToResponse(user));
    }
}
```

### 6. ResponseEntity for Complete Control

```java
@RestController
@RequestMapping("/api/orders")
public class OrderController {

    @PostMapping
    public ResponseEntity<OrderResponse> createOrder(
            @RequestBody OrderRequest request) {

        Order order = orderService.create(request);

        return ResponseEntity
            .status(HttpStatus.CREATED)
            .header("Location", "/api/orders/" + order.getId())
            .body(mapToResponse(order));
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getOrder(@PathVariable Long id) {
        try {
            Order order = orderService.findById(id);
            return ResponseEntity.ok(order);
        } catch (OrderNotFoundException e) {
            return ResponseEntity
                .status(HttpStatus.NOT_FOUND)
                .body(new ErrorResponse("Order not found", e.getMessage()));
        }
    }
}
```

### 7. Content Negotiation

```java
@RestController
@RequestMapping("/api/data")
public class DataController {

    @GetMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Data> getJson() {
        return ResponseEntity.ok(data);
    }

    @GetMapping(produces = MediaType.APPLICATION_XML_VALUE)
    public ResponseEntity<Data> getXml() {
        return ResponseEntity.ok(data);
    }

    @PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Data> createFromJson(@RequestBody Data data) {
        return ResponseEntity.status(HttpStatus.CREATED).body(data);
    }
}
```

### 8. API Versioning

**URI Versioning:**
```java
@RestController
@RequestMapping("/api/v1/users")
public class UserControllerV1 {
    @GetMapping("/{id}")
    public UserV1 getUser(@PathVariable Long id) {
        return userService.findByIdV1(id);
    }
}

@RestController
@RequestMapping("/api/v2/users")
public class UserControllerV2 {
    @GetMapping("/{id}")
    public UserV2 getUser(@PathVariable Long id) {
        return userService.findByIdV2(id);
    }
}
```

**Header Versioning:**
```java
@RestController
@RequestMapping("/api/users")
public class UserController {

    @GetMapping(value = "/{id}", headers = "API-Version=1")
    public UserV1 getUserV1(@PathVariable Long id) {
        return userService.findByIdV1(id);
    }

    @GetMapping(value = "/{id}", headers = "API-Version=2")
    public UserV2 getUserV2(@PathVariable Long id) {
        return userService.findByIdV2(id);
    }
}
```

## Your Tasks

### Task 1: Basic CRUD API
Create a complete CRUD API for Books:

```java
@RestController
@RequestMapping("/api/books")
public class BookController {

    private List<Book> books = new ArrayList<>();
    private Long nextId = 1L;

    @GetMapping
    public List<Book> getAllBooks() {
        return books;
    }

    @GetMapping("/{id}")
    public ResponseEntity<Book> getBook(@PathVariable Long id) {
        return books.stream()
            .filter(b -> b.getId().equals(id))
            .findFirst()
            .map(ResponseEntity::ok)
            .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Book> createBook(@RequestBody Book book) {
        book.setId(nextId++);
        books.add(book);
        return ResponseEntity
            .status(HttpStatus.CREATED)
            .body(book);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Book> updateBook(@PathVariable Long id,
                                          @RequestBody Book book) {
        return books.stream()
            .filter(b -> b.getId().equals(id))
            .findFirst()
            .map(existing -> {
                existing.setTitle(book.getTitle());
                existing.setAuthor(book.getAuthor());
                existing.setPrice(book.getPrice());
                return ResponseEntity.ok(existing);
            })
            .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteBook(@PathVariable Long id) {
        boolean removed = books.removeIf(b -> b.getId().equals(id));
        return removed ?
            ResponseEntity.noContent().build() :
            ResponseEntity.notFound().build();
    }
}

// Book class
public class Book {
    private Long id;
    private String title;
    private String author;
    private Double price;
    // Constructor, getters, setters
}
```

### Task 2: Request Parameters and Filtering
Create an endpoint with search and pagination:

```java
@RestController
@RequestMapping("/api/products")
public class ProductController {

    @GetMapping("/search")
    public ResponseEntity<List<Product>> searchProducts(
        @RequestParam(required = false) String name,
        @RequestParam(required = false) String category,
        @RequestParam(required = false) Double minPrice,
        @RequestParam(required = false) Double maxPrice,
        @RequestParam(defaultValue = "0") int page,
        @RequestParam(defaultValue = "10") int size
    ) {
        List<Product> results = productService.search(
            name, category, minPrice, maxPrice, page, size
        );
        return ResponseEntity.ok(results);
    }

    @GetMapping("/filter")
    public ResponseEntity<List<Product>> filterProducts(
        @RequestParam Map<String, String> filters
    ) {
        List<Product> results = productService.filter(filters);
        return ResponseEntity.ok(results);
    }
}
```

Test with:
- `/api/products/search?name=laptop&minPrice=500&maxPrice=2000`
- `/api/products/filter?brand=dell&color=black`

### Task 3: DTOs for Request/Response
Create separate DTOs for input and output:

```java
// Request DTO
public class CreateProductRequest {
    private String name;
    private String description;
    private Double price;
    private String category;
    // Getters and setters
}

// Response DTO
public class ProductResponse {
    private Long id;
    private String name;
    private Double price;
    private String category;
    private LocalDateTime createdAt;
    // Getters and setters
}

// Entity
@Entity
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String description;
    private Double price;
    private String category;
    private LocalDateTime createdAt;
    // Getters and setters
}

// Controller
@RestController
@RequestMapping("/api/products")
public class ProductController {

    @Autowired
    private ProductService productService;

    @PostMapping
    public ResponseEntity<ProductResponse> createProduct(
            @RequestBody CreateProductRequest request) {

        Product product = productService.create(request);
        ProductResponse response = mapToResponse(product);

        return ResponseEntity
            .status(HttpStatus.CREATED)
            .body(response);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProductResponse> getProduct(@PathVariable Long id) {
        Product product = productService.findById(id);
        return ResponseEntity.ok(mapToResponse(product));
    }

    private ProductResponse mapToResponse(Product product) {
        ProductResponse response = new ProductResponse();
        response.setId(product.getId());
        response.setName(product.getName());
        response.setPrice(product.getPrice());
        response.setCategory(product.getCategory());
        response.setCreatedAt(product.getCreatedAt());
        return response;
    }
}
```

### Task 4: HTTP Status Codes
Implement proper HTTP status codes:

```java
@RestController
@RequestMapping("/api/orders")
public class OrderController {

    @GetMapping("/{id}")
    public ResponseEntity<Order> getOrder(@PathVariable Long id) {
        Order order = orderService.findById(id);
        return order != null ?
            ResponseEntity.ok(order) : // 200
            ResponseEntity.notFound().build(); // 404
    }

    @PostMapping
    public ResponseEntity<Order> createOrder(@RequestBody Order order) {
        Order created = orderService.save(order);
        return ResponseEntity
            .status(HttpStatus.CREATED) // 201
            .header("Location", "/api/orders/" + created.getId())
            .body(created);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Order> updateOrder(@PathVariable Long id,
                                            @RequestBody Order order) {
        if (!orderService.exists(id)) {
            return ResponseEntity.notFound().build(); // 404
        }
        Order updated = orderService.update(id, order);
        return ResponseEntity.ok(updated); // 200
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteOrder(@PathVariable Long id) {
        if (!orderService.exists(id)) {
            return ResponseEntity.notFound().build(); // 404
        }
        orderService.delete(id);
        return ResponseEntity.noContent().build(); // 204
    }

    @PatchMapping("/{id}/status")
    public ResponseEntity<Order> updateStatus(@PathVariable Long id,
                                             @RequestParam String status) {
        Order order = orderService.updateStatus(id, status);
        return ResponseEntity.ok(order); // 200
    }
}
```

### Task 5: Nested Resources
Create endpoints for nested resources:

```java
@RestController
@RequestMapping("/api/users")
public class UserOrderController {

    // Get all orders for a user
    @GetMapping("/{userId}/orders")
    public ResponseEntity<List<Order>> getUserOrders(@PathVariable Long userId) {
        List<Order> orders = orderService.findByUserId(userId);
        return ResponseEntity.ok(orders);
    }

    // Get specific order for a user
    @GetMapping("/{userId}/orders/{orderId}")
    public ResponseEntity<Order> getUserOrder(
            @PathVariable Long userId,
            @PathVariable Long orderId) {

        Order order = orderService.findByUserIdAndOrderId(userId, orderId);
        return order != null ?
            ResponseEntity.ok(order) :
            ResponseEntity.notFound().build();
    }

    // Create order for a user
    @PostMapping("/{userId}/orders")
    public ResponseEntity<Order> createUserOrder(
            @PathVariable Long userId,
            @RequestBody Order order) {

        order.setUserId(userId);
        Order created = orderService.save(order);

        return ResponseEntity
            .status(HttpStatus.CREATED)
            .body(created);
    }
}
```

### Task 6: Pagination and Sorting
Implement pagination and sorting:

```java
@RestController
@RequestMapping("/api/products")
public class ProductController {

    @GetMapping
    public ResponseEntity<PageResponse<Product>> getProducts(
        @RequestParam(defaultValue = "0") int page,
        @RequestParam(defaultValue = "10") int size,
        @RequestParam(defaultValue = "id") String sortBy,
        @RequestParam(defaultValue = "ASC") String direction
    ) {
        List<Product> products = productService.findAll(page, size, sortBy, direction);
        long total = productService.count();

        PageResponse<Product> response = new PageResponse<>();
        response.setContent(products);
        response.setPage(page);
        response.setSize(size);
        response.setTotalElements(total);
        response.setTotalPages((int) Math.ceil((double) total / size));

        return ResponseEntity.ok(response);
    }
}

// PageResponse DTO
public class PageResponse<T> {
    private List<T> content;
    private int page;
    private int size;
    private long totalElements;
    private int totalPages;
    // Getters and setters
}
```

### Task 7: Response Headers
Add custom headers to responses:

```java
@RestController
@RequestMapping("/api/files")
public class FileController {

    @GetMapping("/{id}")
    public ResponseEntity<byte[]> downloadFile(@PathVariable Long id) {
        FileData file = fileService.findById(id);

        return ResponseEntity.ok()
            .header(HttpHeaders.CONTENT_DISPOSITION,
                   "attachment; filename=\"" + file.getName() + "\"")
            .header(HttpHeaders.CONTENT_TYPE, file.getContentType())
            .header("X-File-Size", String.valueOf(file.getSize()))
            .body(file.getData());
    }

    @PostMapping("/upload")
    public ResponseEntity<FileResponse> uploadFile(@RequestBody FileData file) {
        FileData saved = fileService.save(file);

        return ResponseEntity
            .status(HttpStatus.CREATED)
            .header("Location", "/api/files/" + saved.getId())
            .header("X-Upload-Id", saved.getUploadId())
            .body(mapToResponse(saved));
    }
}
```

### Task 8: API Versioning
Implement API versioning:

```java
// Version 1
@RestController
@RequestMapping("/api/v1/products")
public class ProductControllerV1 {

    @GetMapping("/{id}")
    public ProductV1 getProduct(@PathVariable Long id) {
        return new ProductV1(id, "Product Name", 99.99);
    }
}

// Version 2 (with additional fields)
@RestController
@RequestMapping("/api/v2/products")
public class ProductControllerV2 {

    @GetMapping("/{id}")
    public ProductV2 getProduct(@PathVariable Long id) {
        return new ProductV2(id, "Product Name", 99.99,
                           "Description", "Category");
    }
}

// V1 Response
public class ProductV1 {
    private Long id;
    private String name;
    private Double price;
    // Constructor, getters, setters
}

// V2 Response
public class ProductV2 {
    private Long id;
    private String name;
    private Double price;
    private String description;
    private String category;
    // Constructor, getters, setters
}
```

### Task 9: Bulk Operations
Create endpoints for bulk operations:

```java
@RestController
@RequestMapping("/api/products")
public class ProductBulkController {

    @PostMapping("/bulk")
    public ResponseEntity<BulkResponse> createBulk(
            @RequestBody List<Product> products) {

        List<Product> created = productService.saveAll(products);

        BulkResponse response = new BulkResponse();
        response.setSuccessCount(created.size());
        response.setTotalCount(products.size());
        response.setCreatedIds(created.stream()
                                     .map(Product::getId)
                                     .collect(Collectors.toList()));

        return ResponseEntity
            .status(HttpStatus.CREATED)
            .body(response);
    }

    @DeleteMapping("/bulk")
    public ResponseEntity<Void> deleteBulk(@RequestBody List<Long> ids) {
        productService.deleteAll(ids);
        return ResponseEntity.noContent().build();
    }

    @PatchMapping("/bulk/price")
    public ResponseEntity<Integer> updatePrices(
            @RequestParam Double percentage) {

        int updated = productService.updateAllPrices(percentage);
        return ResponseEntity.ok(updated);
    }
}
```

### Task 10: Complete E-commerce API
Create a complete REST API for an e-commerce system:

```java
// Product API
@RestController
@RequestMapping("/api/products")
public class ProductController {
    // CRUD operations
    // Search and filter
    // Pagination
}

// Category API
@RestController
@RequestMapping("/api/categories")
public class CategoryController {
    // CRUD operations
    // Get products by category
}

// Cart API
@RestController
@RequestMapping("/api/cart")
public class CartController {
    // Add to cart
    // Update quantity
    // Remove from cart
    // Get cart items
    // Clear cart
}

// Order API
@RestController
@RequestMapping("/api/orders")
public class OrderController {
    // Create order
    // Get order by ID
    // Get user orders
    // Update order status
    // Cancel order
}
```

## Common Pitfalls

### 1. Missing @RequestBody
**Problem:**
```java
@PostMapping
public User create(User user) { // Won't bind JSON
}
```

**Solution:**
```java
@PostMapping
public User create(@RequestBody User user) { // Correct
}
```

### 2. Wrong HTTP Methods
**Problem:**
Using GET for operations that modify data

**Solution:**
- GET: Read only
- POST: Create
- PUT: Full update
- PATCH: Partial update
- DELETE: Remove

### 3. Not Using Proper Status Codes
**Problem:**
```java
@PostMapping
public User create(@RequestBody User user) {
    return userService.save(user); // Returns 200 instead of 201
}
```

**Solution:**
```java
@PostMapping
public ResponseEntity<User> create(@RequestBody User user) {
    User created = userService.save(user);
    return ResponseEntity.status(HttpStatus.CREATED).body(created);
}
```

### 4. Exposing Internal Entities
**Problem:**
```java
@GetMapping("/{id}")
public User getUser(@PathVariable Long id) {
    return userRepository.findById(id); // Exposes password, internal IDs
}
```

**Solution:**
```java
@GetMapping("/{id}")
public UserDTO getUser(@PathVariable Long id) {
    User user = userRepository.findById(id);
    return mapToDTO(user); // Only expose necessary fields
}
```

### 5. Inconsistent URL Patterns
**Problem:**
- `/getUser/{id}`
- `/user/delete/{id}`
- `/updateUser`

**Solution:**
```java
// Consistent RESTful patterns
@GetMapping("/users/{id}")
@DeleteMapping("/users/{id}")
@PutMapping("/users/{id}")
```

## Best Practices

1. **Use Nouns for Resources**: `/api/products`, not `/api/getProducts`
2. **HTTP Methods for Actions**: Use GET, POST, PUT, DELETE appropriately
3. **Proper Status Codes**: Return correct HTTP status codes
4. **Use DTOs**: Separate internal models from API contracts
5. **Versioning**: Plan for API versioning from the start
6. **Pagination**: Implement for list endpoints
7. **Filtering**: Support search and filter operations
8. **Documentation**: Document your API (Swagger/OpenAPI)
9. **Error Handling**: Return meaningful error messages
10. **Security**: Validate input, sanitize output

## REST API Design Patterns

### URL Patterns
```
GET    /api/products           - List all products
GET    /api/products/{id}      - Get specific product
POST   /api/products           - Create product
PUT    /api/products/{id}      - Update product
DELETE /api/products/{id}      - Delete product

GET    /api/products?category=electronics&page=0&size=10
GET    /api/users/{id}/orders  - Nested resource
```

### Response Structure
```json
{
  "data": { },
  "status": "success",
  "message": "Operation completed",
  "timestamp": "2024-01-01T10:00:00Z"
}
```

## Next Steps

Once you complete these tasks, move on to `02-Spring-Data-JPA` to learn how to work with databases in your REST APIs!

**Challenge**: Build a complete blog REST API with Posts, Comments, and Users. Implement CRUD operations, nested resources (posts/{id}/comments), search and filtering, pagination, proper DTOs, HTTP status codes, and API versioning. Add endpoints for liking posts, following users, and getting trending posts.
