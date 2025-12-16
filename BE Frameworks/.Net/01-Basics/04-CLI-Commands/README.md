# .NET CLI Commands

## Introduction

The .NET Command-Line Interface (CLI) is a cross-platform toolchain for developing .NET applications. It provides commands for creating, building, running, and publishing .NET projects.

## Getting Started

### Check Installation
```bash
dotnet --version
dotnet --info
dotnet --list-sdks
dotnet --list-runtimes
```

### Get Help
```bash
dotnet --help
dotnet new --help
dotnet build --help
```

## Project Commands

### Create New Project
```bash
# Console application
dotnet new console -n MyApp

# Web API
dotnet new webapi -n MyApi

# MVC Web App
dotnet new mvc -n MyWebApp

# Class Library
dotnet new classlib -n MyLibrary

# Blazor App
dotnet new blazor -n MyBlazorApp

# xUnit Test Project
dotnet new xunit -n MyTests
```

### List Templates
```bash
dotnet new list
dotnet new console --help
```

## Build Commands

### Build Project
```bash
# Build current project
dotnet build

# Build specific project
dotnet build MyApp.csproj

# Build in Release mode
dotnet build -c Release

# Build with verbosity
dotnet build --verbosity detailed
```

### Clean Build Artifacts
```bash
dotnet clean
dotnet clean -c Release
```

### Restore Dependencies
```bash
dotnet restore
```

## Run Commands

### Run Application
```bash
# Run current project
dotnet run

# Run specific project
dotnet run --project MyApp.csproj

# Run with arguments
dotnet run -- arg1 arg2

# Run in Release mode
dotnet run -c Release
```

### Watch for Changes (Auto-reload)
```bash
dotnet watch run
```

## Package Management

### Add Package
```bash
dotnet add package Newtonsoft.Json
dotnet add package Serilog --version 3.1.1
```

### Remove Package
```bash
dotnet remove package Newtonsoft.Json
```

### List Packages
```bash
dotnet list package
dotnet list package --outdated
dotnet list package --vulnerable
```

## Solution Commands

### Create Solution
```bash
dotnet new sln -n MySolution
```

### Add Project to Solution
```bash
dotnet sln add MyApp/MyApp.csproj
dotnet sln add MyLib/MyLib.csproj
```

### Remove Project from Solution
```bash
dotnet sln remove MyApp/MyApp.csproj
```

### List Projects in Solution
```bash
dotnet sln list
```

## Project References

### Add Reference
```bash
dotnet add reference ../MyLibrary/MyLibrary.csproj
```

### Remove Reference
```bash
dotnet remove reference ../MyLibrary/MyLibrary.csproj
```

### List References
```bash
dotnet list reference
```

## Test Commands

### Run Tests
```bash
# Run all tests
dotnet test

# Run with verbosity
dotnet test --verbosity normal

# Run specific test
dotnet test --filter FullyQualifiedName~MyTestClass

# Generate code coverage
dotnet test --collect:"XPlat Code Coverage"
```

## Publish Commands

### Publish Application
```bash
# Publish
dotnet publish

# Publish Release build
dotnet publish -c Release

# Publish to folder
dotnet publish -o ./publish

# Self-contained deployment
dotnet publish -c Release --self-contained -r win-x64

# Framework-dependent deployment
dotnet publish -c Release --self-contained false
```

### Runtime Identifiers (RIDs)
```bash
# Windows
-r win-x64
-r win-x86

# Linux
-r linux-x64
-r linux-arm64

# macOS
-r osx-x64
-r osx-arm64
```

## NuGet Commands

### Pack Package
```bash
dotnet pack
dotnet pack -c Release
```

### Push Package
```bash
dotnet nuget push MyPackage.1.0.0.nupkg --api-key <key> --source https://api.nuget.org/v3/index.json
```

### List Package Sources
```bash
dotnet nuget list source
```

### Add Package Source
```bash
dotnet nuget add source https://myget.org/feed -n MyFeed
```

## Tool Commands

### Install Global Tool
```bash
dotnet tool install -g dotnet-ef
dotnet tool install -g dotnet-aspnet-codegenerator
```

### List Tools
```bash
dotnet tool list -g
```

### Update Tool
```bash
dotnet tool update -g dotnet-ef
```

### Uninstall Tool
```bash
dotnet tool uninstall -g dotnet-ef
```

## Entity Framework Commands

### Install EF Tool
```bash
dotnet tool install -g dotnet-ef
```

### Create Migration
```bash
dotnet ef migrations add InitialCreate
```

### Update Database
```bash
dotnet ef database update
```

### Remove Migration
```bash
dotnet ef migrations remove
```

## Format and Analyze

### Format Code
```bash
dotnet format
```

### Analyze Code
```bash
dotnet build /p:EnableNETAnalyzers=true
```

## Advanced Commands

### Create Global Tool
```bash
dotnet new tool -n MyTool
dotnet pack
dotnet tool install -g --add-source ./nupkg MyTool
```

### Workload Commands
```bash
# List workloads
dotnet workload list

# Install workload (e.g., MAUI)
dotnet workload install maui

# Update workloads
dotnet workload update
```

## Configuration

### User Secrets
```bash
# Initialize secrets
dotnet user-secrets init

# Set secret
dotnet user-secrets set "ApiKey" "12345"

# List secrets
dotnet user-secrets list

# Remove secret
dotnet user-secrets remove "ApiKey"
```

## Scripting and Automation

### Build Script Example
```bash
#!/bin/bash
dotnet restore
dotnet build -c Release
dotnet test
dotnet publish -c Release -o ./publish
```

### CI/CD Pipeline
```bash
# Restore, build, test, publish
dotnet restore && \
dotnet build -c Release --no-restore && \
dotnet test --no-build && \
dotnet publish -c Release --no-build -o ./publish
```

## Environment Variables

```bash
# Set environment
export ASPNETCORE_ENVIRONMENT=Production
dotnet run

# Windows
set ASPNETCORE_ENVIRONMENT=Production
dotnet run
```

## Practical Tasks

### Task 1: Basic Workflow
- Create console app
- Add a package
- Build and run
- Clean artifacts

### Task 2: Solution Management
- Create a solution
- Add multiple projects
- Add project references
- Build entire solution

### Task 3: Publishing
- Publish self-contained app
- Publish framework-dependent app
- Publish for different platforms (Windows, Linux, macOS)

### Task 4: Testing Workflow
- Create test project
- Write unit tests
- Run tests with different filters
- Generate code coverage

## Common Command Patterns

```bash
# Full build pipeline
dotnet clean && dotnet restore && dotnet build -c Release

# Test with coverage
dotnet test --collect:"XPlat Code Coverage" --results-directory ./coverage

# Publish multi-platform
dotnet publish -c Release -r win-x64 -o ./publish/win
dotnet publish -c Release -r linux-x64 -o ./publish/linux
dotnet publish -c Release -r osx-x64 -o ./publish/mac
```

## Performance Tips

1. Use `--no-restore` when packages are already restored
2. Use `--no-build` when testing already built code
3. Parallel builds: `dotnet build -m`
4. Cache NuGet packages in CI/CD

## Best Practices

1. ✅ Use consistent naming conventions
2. ✅ Restore before building in CI
3. ✅ Clean before release builds
4. ✅ Use verbosity levels for debugging
5. ✅ Script repetitive tasks
6. ❌ Don't commit bin/ and obj/ folders
7. ❌ Don't skip tests in production builds

## Interview Questions

1. What is the dotnet CLI?
2. How do you create a new project using CLI?
3. Explain dotnet build vs dotnet publish
4. What are runtime identifiers (RIDs)?
5. How do you run tests using CLI?
6. What is dotnet watch?
7. How do you manage global tools?

## Quick Reference

```bash
dotnet new <template>      # Create project
dotnet restore             # Restore packages
dotnet build              # Build project
dotnet run                # Run project
dotnet test               # Run tests
dotnet publish            # Publish project
dotnet add package        # Add package
dotnet sln add            # Add to solution
```

## Next Steps

- Learn ASP.NET Core MVC
- Explore Entity Framework Core
- Master testing frameworks
- Understand deployment strategies
