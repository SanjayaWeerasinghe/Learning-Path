# .NET Project Structure

## Introduction

Understanding the structure of a .NET project is crucial for organizing code effectively and navigating codebases efficiently.

## Basic Project Structure

```
MyApp/
├── Program.cs              # Application entry point
├── MyApp.csproj            # Project file (MSBuild)
├── appsettings.json        # Configuration (for web apps)
├── Properties/
│   └── launchSettings.json # Development settings
├── obj/                    # Intermediate build files
├── bin/                    # Compiled output
│   ├── Debug/
│   └── Release/
└── wwwroot/                # Static files (web apps)
```

## The .csproj File

The project file defines project configuration, dependencies, and build settings.

```xml
<Project Sdk="Microsoft.NET.Sdk">

  <PropertyGroup>
    <OutputType>Exe</OutputType>
    <TargetFramework>net8.0</TargetFramework>
    <Nullable>enable</Nullable>
    <ImplicitUsings>enable</ImplicitUsings>
  </PropertyGroup>

  <ItemGroup>
    <PackageReference Include="Newtonsoft.Json" Version="13.0.3" />
  </ItemGroup>

</Project>
```

## Key Elements

### PropertyGroup
Defines project properties:
- `TargetFramework`: .NET version to target
- `OutputType`: Exe (console) or Library
- `Nullable`: Enable nullable reference types
- `ImplicitUsings`: Enable implicit global usings

### ItemGroup
References to packages and files:
- `PackageReference`: NuGet packages
- `ProjectReference`: Other projects
- `Compile`: Source files to compile

## Folder Organization

### Recommended Structure for Larger Apps

```
MyApp/
├── Controllers/        # MVC controllers
├── Models/            # Data models
├── Views/             # UI views
├── Services/          # Business logic
├── Data/              # Data access layer
├── Repositories/      # Repository pattern
├── DTOs/              # Data transfer objects
├── Helpers/           # Utility classes
├── Middleware/        # Custom middleware
└── Extensions/        # Extension methods
```

## bin vs obj Folders

### bin/ (Output)
- Contains compiled assemblies (DLLs/EXEs)
- Debug/ and Release/ configurations
- Final build artifacts

### obj/ (Intermediate)
- Temporary build files
- Project metadata
- Should not be committed to source control

## Configuration Files

### appsettings.json
```json
{
  "Logging": {
    "LogLevel": {
      "Default": "Information"
    }
  },
  "ConnectionStrings": {
    "DefaultConnection": "Server=localhost;Database=MyDb;"
  }
}
```

### appsettings.Development.json
```json
{
  "Logging": {
    "LogLevel": {
      "Default": "Debug"
    }
  }
}
```

### launchSettings.json
```json
{
  "profiles": {
    "MyApp": {
      "commandName": "Project",
      "dotnetRunMessages": true,
      "launchBrowser": true,
      "applicationUrl": "https://localhost:5001",
      "environmentVariables": {
        "ASPNETCORE_ENVIRONMENT": "Development"
      }
    }
  }
}
```

## Solution Structure (.sln)

For multiple projects:

```
MySolution/
├── MySolution.sln              # Solution file
├── src/
│   ├── MyApp.Web/             # Web project
│   ├── MyApp.Core/            # Core library
│   └── MyApp.Infrastructure/  # Infrastructure
└── tests/
    ├── MyApp.Tests/           # Unit tests
    └── MyApp.IntegrationTests/# Integration tests
```

## Working with Solutions

```bash
# Create solution
dotnet new sln -n MySolution

# Create projects
dotnet new webapi -n MyApp.Web
dotnet new classlib -n MyApp.Core

# Add projects to solution
dotnet sln add src/MyApp.Web/MyApp.Web.csproj
dotnet sln add src/MyApp.Core/MyApp.Core.csproj

# Add project reference
dotnet add src/MyApp.Web reference src/MyApp.Core
```

## Namespaces and File Organization

### File-Scoped Namespaces (.NET 6+)
```csharp
namespace MyApp.Services;

public class UserService
{
    // Implementation
}
```

### Traditional Namespaces
```csharp
namespace MyApp.Services
{
    public class UserService
    {
        // Implementation
    }
}
```

## .gitignore for .NET

```
# Build results
bin/
obj/

# User-specific files
*.user
*.suo

# Visual Studio
.vs/

# Rider
.idea/

# NuGet
packages/
*.nupkg

# Environment files
.env
```

## Practical Tasks

### Task 1: Explore Project Structure
- Create a new console app
- Examine the .csproj file
- Identify bin/ and obj/ folders

### Task 2: Create Solution
- Create a solution with multiple projects
- Add project references
- Build the solution

### Task 3: Organize Code
- Create folder structure (Models, Services, etc.)
- Organize classes into appropriate folders
- Use proper namespaces

### Task 4: Configuration
- Create appsettings.json
- Add configuration values
- Access configuration in code

## Best Practices

1. Use meaningful folder names
2. Keep one class per file
3. Match namespace to folder structure
4. Exclude bin/ and obj/ from source control
5. Use solution folders for organization
6. Separate concerns (Models, Services, Controllers)

## Interview Questions

1. What is the purpose of the .csproj file?
2. Explain bin vs obj folders
3. How do you organize a large .NET application?
4. What is appsettings.json used for?
5. How do you add project references?

## Next Steps

- Learn NuGet package management
- Explore dotnet CLI commands
- Understand build configurations
