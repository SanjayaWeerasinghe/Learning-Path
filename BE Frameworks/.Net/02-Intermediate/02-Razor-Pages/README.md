# Razor Pages

## Introduction

Razor Pages is a page-focused framework for building web UI in ASP.NET Core. It simplifies web development by organizing code around pages rather than controllers and views.

## Creating a Razor Pages App

```bash
dotnet new webapp -n MyRazorApp
cd MyRazorApp
dotnet run
```

## Project Structure

```
MyRazorApp/
├── Pages/
│   ├── Index.cshtml
│   ├── Index.cshtml.cs
│   ├── Privacy.cshtml
│   ├── Privacy.cshtml.cs
│   └── Shared/
│       └── _Layout.cshtml
├── wwwroot/
└── Program.cs
```

## Razor Page Structure

### Page Model (.cshtml.cs)
```csharp
public class IndexModel : PageModel
{
    public string Message { get; set; }

    public void OnGet()
    {
        Message = "Welcome to Razor Pages!";
    }
}
```

### Page View (.cshtml)
```html
@page
@model IndexModel

<h1>@Model.Message</h1>
```

## Page Handlers

### GET Handler
```csharp
public void OnGet()
{
    // Handle GET request
}
```

### POST Handler
```csharp
public IActionResult OnPost()
{
    if (!ModelState.IsValid)
        return Page();

    // Process form
    return RedirectToPage("Success");
}
```

### Named Handlers
```csharp
public IActionResult OnPostDelete()
{
    // Handle delete
}

public IActionResult OnPostUpdate()
{
    // Handle update
}
```

```html
<form method="post" asp-page-handler="Delete">
    <button type="submit">Delete</button>
</form>
```

## Model Binding

### BindProperty
```csharp
public class CreateModel : PageModel
{
    [BindProperty]
    public Product Product { get; set; }

    public IActionResult OnPost()
    {
        if (ModelState.IsValid)
        {
            _db.Products.Add(Product);
            _db.SaveChanges();
            return RedirectToPage("Index");
        }
        return Page();
    }
}
```

### Form
```html
@page
@model CreateModel

<form method="post">
    <input asp-for="Product.Name" />
    <input asp-for="Product.Price" />
    <button type="submit">Create</button>
</form>
```

## Routing

### Default Route
```
/Pages/Index.cshtml → /Index or /
/Pages/Products/List.cshtml → /Products/List
```

### Custom Routes
```html
@page "{id:int}"

@code {
    [BindProperty(SupportsGet = true)]
    public int Id { get; set; }
}
```

## Practical Tasks

### Task 1: Create Razor Pages App
- Create new Razor Pages project
- Explore structure
- Modify Index page

### Task 2: Product Management
- Create product list page
- Create product details page
- Implement create/edit/delete

### Task 3: Form Handling
- Create form with validation
- Handle POST requests
- Display success messages

## Best Practices

1. Keep page models focused
2. Use model binding
3. Validate user input
4. Use tag helpers
5. Organize related pages in folders

## Interview Questions

1. What are Razor Pages?
2. Razor Pages vs MVC - when to use which?
3. What are page handlers?
4. How does routing work in Razor Pages?

## Next Steps

- Learn dependency injection in ASP.NET Core
- Explore configuration management
- Study middleware pipeline
