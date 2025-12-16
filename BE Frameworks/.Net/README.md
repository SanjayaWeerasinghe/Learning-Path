# .NET Learning Path - Beginner to Advanced

.NET is a free, open-source platform for building modern applications. Build enterprise-grade apps!

## 📚 Prerequisites
- Complete C# fundamentals (Basics + Intermediate)
- Understand: OOP, classes, interfaces, async/await
- HTTP basics
- SQL basics (helpful but not required)

## 🎯 Course Structure

### 01-Basics (Platform Fundamentals)
1. **Setup** - Install .NET SDK, CLI tools
2. **Project Structure** - Understanding .NET projects
3. **NuGet Packages** - Package management
4. **CLI Commands** - dotnet new, build, run

**Time**: 1 week

### 02-Intermediate (Web Development)
1. **ASP.NET Core MVC** - Model-View-Controller pattern
2. **Razor Pages** - Page-based development
3. **Dependency Injection** - Built-in DI container
4. **Configuration** - appsettings.json, environments
5. **Middleware** - Request/response pipeline

**Time**: 3-4 weeks

### 03-Advanced (Production Applications)
1. **Entity Framework Core** - ORM, database access
2. **Web API** - Building RESTful services
3. **Authentication & Authorization** - Identity, JWT
4. **SignalR** - Real-time communications
5. **Deployment** - Azure, Docker, IIS

**Time**: 4-6 weeks

## 🚀 Quick Start
```bash
# Install .NET SDK from https://dot.net

# Verify installation
dotnet --version

# Create new web app
dotnet new webapp -o MyWebApp
cd MyWebApp

# Run the application
dotnet run

# Opens https://localhost:5001
```

## ✅ Core Concepts

### Minimal API (Simple)
```csharp
var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

app.MapGet("/", () => "Hello World!");

app.Run();
```

### MVC Controller
```csharp
[ApiController]
[Route("api/[controller]")]
public class ProductsController : ControllerBase
{
    [HttpGet]
    public IActionResult GetAll()
    {
        return Ok(new { message = "Hello from API" });
    }
}
```

## 💡 Project Ideas

**After Basics:**
- Console calculator
- File processor
- Simple CLI tool

**After Intermediate:**
- Blog website
- Task management app
- Contact form
- Weather dashboard
- Portfolio website

**After Advanced:**
- E-commerce platform
- Social media app
- RESTful API with database
- Real-time chat application
- Microservices architecture

## 🛠️ Essential Packages
```bash
# Entity Framework Core
dotnet add package Microsoft.EntityFrameworkCore.SqlServer

# Identity (Authentication)
dotnet add package Microsoft.AspNetCore.Identity

# Swagger (API Documentation)
dotnet add package Swashbuckle.AspNetCore

# AutoMapper (Object mapping)
dotnet add package AutoMapper.Extensions.Microsoft.DependencyInjection
```

## 📖 .NET vs .NET Framework
- **.NET** (Modern, cross-platform, open-source) ✅
- **.NET Framework** (Legacy, Windows-only) ❌

**Use .NET (6, 7, 8)** for all new projects!

## 🎓 Project Types
- **Console App**: Command-line applications
- **Web App (MVC)**: Full-stack web applications
- **Web API**: RESTful services
- **Blazor**: Web UI with C#
- **MAUI**: Cross-platform mobile/desktop

## 🔧 Project Structure
```
MyWebApp/
├── Controllers/      # MVC controllers
├── Models/          # Data models
├── Views/           # Razor views
├── wwwroot/         # Static files
├── appsettings.json # Configuration
├── Program.cs       # Entry point
└── MyWebApp.csproj  # Project file
```

## 📚 Key Features
- **Cross-platform**: Windows, macOS, Linux
- **High performance**: Fast and efficient
- **Built-in DI**: Dependency injection out-of-the-box
- **Async by default**: Scalable applications
- **Security**: Built-in protection features

## 🌐 Common Commands
```bash
# Create projects
dotnet new console     # Console app
dotnet new webapp      # Web app
dotnet new webapi      # Web API

# Build & Run
dotnet build           # Compile
dotnet run             # Build and run
dotnet watch run       # Auto-reload on changes

# Packages
dotnet add package <name>
dotnet restore
```

## 🎯 Career Path
1. **.NET Basics** → Console apps
2. **ASP.NET Core** → Web development
3. **Entity Framework** → Database apps
4. **Advanced** → Microservices, cloud

## 📖 Resources
- [.NET Documentation](https://docs.microsoft.com/dotnet/)
- [ASP.NET Core](https://docs.microsoft.com/aspnet/core/)
- [C# Guide](https://docs.microsoft.com/dotnet/csharp/)
- [Entity Framework](https://docs.microsoft.com/ef/core/)

**Start with:** `01-Basics/01-Setup/README.md`
