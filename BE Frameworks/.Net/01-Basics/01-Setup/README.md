# .NET Setup

## Introduction

Setting up your .NET development environment is the first step to becoming a .NET developer. This guide covers everything you need to get started.

## Installing .NET SDK

### Windows
1. Visit [dotnet.microsoft.com](https://dotnet.microsoft.com)
2. Download .NET SDK (Latest LTS version recommended)
3. Run installer and follow prompts
4. Verify installation: `dotnet --version`

### macOS
```bash
brew install --cask dotnet-sdk
```

### Linux (Ubuntu/Debian)
```bash
wget https://dot.net/v1/dotnet-install.sh
sudo bash dotnet-install.sh
```

## Choosing an IDE

### Visual Studio (Windows/Mac)
- Full-featured IDE
- Best for enterprise development
- Integrated debugging and testing tools

### Visual Studio Code (Cross-platform)
- Lightweight and fast
- Excellent C# extension support
- Great for web development

### JetBrains Rider (Cross-platform)
- Powerful refactoring tools
- Excellent performance
- Paid (with free trial)

## Creating Your First Project

### Using CLI
```bash
# Create console app
dotnet new console -n MyFirstApp

# Navigate to project
cd MyFirstApp

# Run the app
dotnet run
```

### Using Visual Studio
1. File → New → Project
2. Select "Console App (.NET)"
3. Name your project
4. Click Create

## Project Templates

```bash
dotnet new console      # Console application
dotnet new classlib     # Class library
dotnet new web          # Empty web application
dotnet new webapi       # Web API
dotnet new mvc          # MVC web application
dotnet new blazor       # Blazor application
```

## Verifying Your Setup

```bash
# Check .NET version
dotnet --version

# List installed SDKs
dotnet --list-sdks

# List installed runtimes
dotnet --list-runtimes

# Get help
dotnet --help
```

## Basic Project Structure

```
MyFirstApp/
├── Program.cs          # Main entry point
├── MyFirstApp.csproj   # Project file
├── obj/                # Build artifacts
└── bin/                # Compiled output
```

## Understanding Program.cs

```csharp
// .NET 6+ (Top-level statements)
Console.WriteLine("Hello, World!");

// Traditional approach
namespace MyFirstApp
{
    class Program
    {
        static void Main(string[] args)
        {
            Console.WriteLine("Hello, World!");
        }
    }
}
```

## Practical Tasks

### Task 1: Install and Verify
- Install .NET SDK
- Verify installation with `dotnet --version`
- Install VS Code with C# extension

### Task 2: Create First App
- Create a new console application
- Modify the output message
- Run the application

### Task 3: Explore Templates
- Create projects using different templates
- Examine the generated files
- Run each project type

### Task 4: IDE Familiarization
- Open project in your chosen IDE
- Explore the interface
- Learn keyboard shortcuts

## Common Issues

**Issue**: `dotnet` command not found
- **Solution**: Add .NET to PATH environment variable

**Issue**: Multiple SDK versions installed
- **Solution**: Use global.json to specify SDK version

**Issue**: Build errors on first run
- **Solution**: Run `dotnet restore` to restore packages

## Next Steps

- Learn about .NET project structure
- Explore NuGet package management
- Master dotnet CLI commands
