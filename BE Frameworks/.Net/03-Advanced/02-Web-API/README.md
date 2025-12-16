# Web API in ASP.NET Core

## Introduction

ASP.NET Core Web API is a framework for building HTTP-based services that can be consumed by various clients including browsers, mobile apps, and IoT devices.

## Creating a Web API

```bash
dotnet new webapi -n MyApi
cd MyApi
dotnet run
```

## API Controller

### Basic Controller
```csharp
[ApiController]
[Route("api/[controller]")]
public class ProductsController : ControllerBase
{
    [HttpGet]
    public ActionResult<IEnumerable<Product>> GetProducts()
    {
        return Ok(products);
    }

    [HttpGet("{id}")]
    public ActionResult<Product> GetProduct(int id)
    {
        var product = products.FirstOrDefault(p => p.Id == id);
        if (product == null)
            return NotFound();

        return Ok(product);
    }

    [HttpPost]
    public ActionResult<Product> CreateProduct(Product product)
    {
        products.Add(product);
        return CreatedAtAction(nameof(GetProduct),
            new { id = product.Id }, product);
    }

    [HttpPut("{id}")]
    public IActionResult UpdateProduct(int id, Product product)
    {
        if (id != product.Id)
            return BadRequest();

        // Update logic
        return NoContent();
    }

    [HttpDelete("{id}")]
    public IActionResult DeleteProduct(int id)
    {
        var product = products.FirstOrDefault(p => p.Id == id);
        if (product == null)
            return NotFound();

        products.Remove(product);
        return NoContent();
    }
}
```

## HTTP Methods

- **GET**: Retrieve resources
- **POST**: Create resources
- **PUT**: Update resources
- **PATCH**: Partial update
- **DELETE**: Delete resources

## Status Codes

```csharp
return Ok(data);                    // 200
return Created(uri, data);          // 201
return NoContent();                 // 204
return BadRequest();                // 400
return Unauthorized();              // 401
return Forbidden();                 // 403
return NotFound();                  // 404
return StatusCode(500);             // 500
```

## Model Validation

### Data Annotations
```csharp
public class Product
{
    public int Id { get; set; }

    [Required]
    [StringLength(100)]
    public string Name { get; set; }

    [Range(0.01, 10000)]
    public decimal Price { get; set; }
}
```

### Validate in Controller
```csharp
[HttpPost]
public ActionResult<Product> CreateProduct(Product product)
{
    if (!ModelState.IsValid)
        return BadRequest(ModelState);

    // Create product
    return CreatedAtAction(nameof(GetProduct),
        new { id = product.Id }, product);
}
```

## DTOs (Data Transfer Objects)

```csharp
public class ProductDTO
{
    public int Id { get; set; }
    public string Name { get; set; }
    public decimal Price { get; set; }
}

public class CreateProductDTO
{
    [Required]
    public string Name { get; set; }

    [Required]
    public decimal Price { get; set; }
}
```

## Routing

### Attribute Routing
```csharp
[Route("api/products")]
public class ProductsController : ControllerBase
{
    [HttpGet]
    [Route("")]
    public IActionResult GetAll() { }

    [HttpGet]
    [Route("{id}")]
    public IActionResult GetById(int id) { }

    [HttpGet]
    [Route("search")]
    public IActionResult Search(string term) { }
}
```

## Content Negotiation

```csharp
// Returns JSON by default
[HttpGet]
public ActionResult<Product> GetProduct()
{
    return Ok(product); // JSON
}

// Support XML
builder.Services.AddControllers()
    .AddXmlSerializerFormatters();
```

## API Versioning

### Install Package
```bash
dotnet add package Microsoft.AspNetCore.Mvc.Versioning
```

### Configure
```csharp
builder.Services.AddApiVersioning(options =>
{
    options.DefaultApiVersion = new ApiVersion(1, 0);
    options.AssumeDefaultVersionWhenUnspecified = true;
    options.ReportApiVersions = true;
});
```

### Version Controllers
```csharp
[ApiVersion("1.0")]
[Route("api/v{version:apiVersion}/products")]
public class ProductsV1Controller : ControllerBase { }

[ApiVersion("2.0")]
[Route("api/v{version:apiVersion}/products")]
public class ProductsV2Controller : ControllerBase { }
```

## Swagger/OpenAPI

### Install Package
```bash
dotnet add package Swashbuckle.AspNetCore
```

### Configure
```csharp
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
```

## CORS

```csharp
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll",
        builder =>
        {
            builder.AllowAnyOrigin()
                   .AllowAnyMethod()
                   .AllowAnyHeader();
        });
});

app.UseCors("AllowAll");
```

## Error Handling

### Global Exception Handler
```csharp
app.UseExceptionHandler("/error");

[ApiController]
public class ErrorController : ControllerBase
{
    [Route("/error")]
    public IActionResult Error()
    {
        return Problem();
    }
}
```

## Practical Tasks

### Task 1: Create API
- Create Web API project
- Create Product controller
- Implement CRUD endpoints
- Test with Swagger

### Task 2: Validation
- Add model validation
- Return proper error responses
- Test validation

### Task 3: EF Core Integration
- Integrate Entity Framework Core
- Use DbContext in controllers
- Implement async operations

### Task 4: Documentation
- Configure Swagger
- Add XML comments
- Document all endpoints

## Best Practices

1. Use async/await
2. Return proper status codes
3. Validate input
4. Use DTOs
5. Version APIs
6. Document with Swagger
7. Implement proper error handling
8. Use dependency injection
9. Follow RESTful conventions

## RESTful Design

```
GET    /api/products        - Get all products
GET    /api/products/1      - Get product by ID
POST   /api/products        - Create product
PUT    /api/products/1      - Update product
DELETE /api/products/1      - Delete product
```

## Interview Questions

1. What is REST?
2. Explain HTTP verbs in Web API
3. What are status codes?
4. How do you version APIs?
5. What is Swagger?
6. Explain content negotiation
7. What are DTOs and why use them?
8. How do you handle errors in API?

## Next Steps

- Implement authentication with JWT
- Add authorization
- Learn caching strategies
- Explore API gateways
