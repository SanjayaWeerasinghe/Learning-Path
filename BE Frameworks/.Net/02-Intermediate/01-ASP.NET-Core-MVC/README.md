# ASP.NET Core MVC

## Introduction

ASP.NET Core MVC is a framework for building web applications using the Model-View-Controller architectural pattern. It provides a clean separation of concerns and enables testable, maintainable code.

## MVC Pattern

### Model
Represents data and business logic
```csharp
public class Product
{
    public int Id { get; set; }
    public string Name { get; set; }
    public decimal Price { get; set; }
}
```

### View
Presents data to the user (Razor syntax)
```html
@model Product

<h1>@Model.Name</h1>
<p>Price: $@Model.Price</p>
```

### Controller
Handles user requests and coordinates Model and View
```csharp
public class ProductController : Controller
{
    public IActionResult Index()
    {
        var products = GetProducts();
        return View(products);
    }
}
```

## Creating an MVC Application

```bash
dotnet new mvc -n MyMvcApp
cd MyMvcApp
dotnet run
```

## Project Structure

```
MyMvcApp/
├── Controllers/
│   └── HomeController.cs
├── Models/
│   └── ErrorViewModel.cs
├── Views/
│   ├── Home/
│   │   └── Index.cshtml
│   └── Shared/
│       └── _Layout.cshtml
├── wwwroot/
│   ├── css/
│   ├── js/
│   └── lib/
└── Program.cs
```

## Controllers

### Basic Controller
```csharp
public class HomeController : Controller
{
    public IActionResult Index()
    {
        return View();
    }

    public IActionResult About()
    {
        ViewData["Message"] = "Your application description.";
        return View();
    }
}
```

### Action Results
```csharp
public IActionResult Index() => View();
public IActionResult Details(int id) => View(product);
public IActionResult RedirectToHome() => RedirectToAction("Index");
public IActionResult NotFound() => NotFound();
public IActionResult Json() => Json(data);
public IActionResult File() => File(bytes, "application/pdf");
```

## Routing

### Conventional Routing
```csharp
app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Home}/{action=Index}/{id?}");
```

### Attribute Routing
```csharp
[Route("products")]
public class ProductController : Controller
{
    [Route("")]
    [Route("index")]
    public IActionResult Index() => View();

    [Route("{id}")]
    public IActionResult Details(int id) => View();
}
```

## Views

### Razor Syntax
```html
@model List<Product>

<h1>Products</h1>

@foreach (var product in Model)
{
    <div>
        <h2>@product.Name</h2>
        <p>@product.Price.ToString("C")</p>
    </div>
}
```

### Layout Pages
```html
<!-- _Layout.cshtml -->
<!DOCTYPE html>
<html>
<head>
    <title>@ViewData["Title"]</title>
</head>
<body>
    @RenderBody()
</body>
</html>
```

### Partial Views
```html
@await Html.PartialAsync("_ProductCard", product)
```

## Passing Data to Views

### ViewData
```csharp
ViewData["Title"] = "Home Page";
```

### ViewBag
```csharp
ViewBag.Message = "Welcome";
```

### Strongly-Typed Models
```csharp
return View(product);
```

### TempData
```csharp
TempData["SuccessMessage"] = "Product created!";
return RedirectToAction("Index");
```

## Form Handling

### View with Form
```html
@model Product

<form asp-action="Create" method="post">
    <input asp-for="Name" />
    <input asp-for="Price" />
    <button type="submit">Create</button>
</form>
```

### Controller Action
```csharp
[HttpPost]
public IActionResult Create(Product product)
{
    if (ModelState.IsValid)
    {
        _context.Products.Add(product);
        _context.SaveChanges();
        return RedirectToAction("Index");
    }
    return View(product);
}
```

## Model Validation

### Data Annotations
```csharp
public class Product
{
    [Required]
    [StringLength(100)]
    public string Name { get; set; }

    [Range(0.01, 10000)]
    public decimal Price { get; set; }

    [EmailAddress]
    public string ContactEmail { get; set; }
}
```

### Display Validation Errors
```html
<div asp-validation-summary="All"></div>
<input asp-for="Name" />
<span asp-validation-for="Name"></span>
```

## Tag Helpers

```html
<!-- Form Tag Helper -->
<form asp-controller="Product" asp-action="Create">

<!-- Anchor Tag Helper -->
<a asp-controller="Home" asp-action="Index">Home</a>

<!-- Input Tag Helper -->
<input asp-for="Name" />

<!-- Label Tag Helper -->
<label asp-for="Name"></label>

<!-- Select Tag Helper -->
<select asp-for="CategoryId" asp-items="Model.Categories"></select>
```

## Practical Tasks

### Task 1: Create MVC App
- Create new MVC project
- Explore default structure
- Run and navigate the app
- Understand routing

### Task 2: Build Product Catalog
- Create Product model
- Create ProductController
- Create Index view to list products
- Create Details view for single product

### Task 3: CRUD Operations
- Implement Create action and view
- Implement Edit action and view
- Implement Delete action
- Add validation

### Task 4: Layouts and Partials
- Create custom layout
- Create navigation partial
- Create product card partial
- Use partials in views

## Best Practices

1. Keep controllers thin - delegate to services
2. Use strongly-typed models
3. Validate user input
4. Use tag helpers for cleaner markup
5. Follow RESTful conventions
6. Use dependency injection
7. Separate concerns properly

## Interview Questions

1. What is the MVC pattern?
2. Explain the request lifecycle in ASP.NET Core MVC
3. What are Tag Helpers?
4. Difference between ViewData, ViewBag, and TempData?
5. How does routing work in MVC?
6. What are Action Results?
7. How do you handle forms and validation?

## Next Steps

- Learn Razor Pages
- Explore Entity Framework Core
- Implement authentication
- Build Web APIs
