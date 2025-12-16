# NuGet Packages

## Introduction

NuGet is the package manager for .NET. It allows you to share and consume reusable code packages, making development faster and more efficient.

## What is NuGet?

NuGet is a package management system that:
- Hosts thousands of .NET libraries
- Manages project dependencies
- Handles versioning automatically
- Simplifies library integration

## Installing Packages

### Using CLI
```bash
# Install package
dotnet add package Newtonsoft.Json

# Install specific version
dotnet add package Newtonsoft.Json --version 13.0.3

# Install prerelease
dotnet add package MyPackage --prerelease
```

### Using Visual Studio
1. Right-click project → Manage NuGet Packages
2. Search for package
3. Click Install

### Using Package Manager Console
```powershell
Install-Package Newtonsoft.Json
Install-Package Newtonsoft.Json -Version 13.0.3
```

## Package Reference in .csproj

```xml
<ItemGroup>
  <PackageReference Include="Newtonsoft.Json" Version="13.0.3" />
  <PackageReference Include="Serilog" Version="3.1.1" />
  <PackageReference Include="AutoMapper" Version="12.0.1" />
</ItemGroup>
```

## Restoring Packages

```bash
# Restore all packages
dotnet restore

# Restore for specific project
dotnet restore MyProject.csproj
```

Packages are restored to:
- Global cache: `~/.nuget/packages`
- Project: `obj/` folder

## Updating Packages

```bash
# Update all packages
dotnet list package --outdated
dotnet add package PackageName

# Update specific package
dotnet add package Newtonsoft.Json --version 13.0.4
```

## Removing Packages

```bash
# Remove package
dotnet remove package Newtonsoft.Json
```

## Popular NuGet Packages

### JSON Processing
```bash
dotnet add package Newtonsoft.Json
dotnet add package System.Text.Json
```

### Logging
```bash
dotnet add package Serilog
dotnet add package NLog
```

### Testing
```bash
dotnet add package xUnit
dotnet add package NUnit
dotnet add package Moq
```

### Database
```bash
dotnet add package Microsoft.EntityFrameworkCore
dotnet add package Dapper
```

### HTTP Client
```bash
dotnet add package RestSharp
dotnet add package Flurl.Http
```

### Validation
```bash
dotnet add package FluentValidation
```

### Mapping
```bash
dotnet add package AutoMapper
dotnet add package Mapster
```

## Package Versioning

### Semantic Versioning (SemVer)
Format: `Major.Minor.Patch`
- **Major**: Breaking changes
- **Minor**: New features (backward compatible)
- **Patch**: Bug fixes

### Version Ranges
```xml
<!-- Exact version -->
<PackageReference Include="Package" Version="1.2.3" />

<!-- Minimum version -->
<PackageReference Include="Package" Version="1.2.3-*" />

<!-- Range -->
<PackageReference Include="Package" Version="[1.0, 2.0)" />

<!-- Floating version (not recommended) -->
<PackageReference Include="Package" Version="*" />
```

## Creating Your Own Package

### Step 1: Create Class Library
```bash
dotnet new classlib -n MyLibrary
```

### Step 2: Add Package Metadata
```xml
<PropertyGroup>
  <PackageId>MyCompany.MyLibrary</PackageId>
  <Version>1.0.0</Version>
  <Authors>Your Name</Authors>
  <Company>Your Company</Company>
  <Description>A useful library</Description>
  <PackageTags>utility;helper</PackageTags>
</PropertyGroup>
```

### Step 3: Pack
```bash
dotnet pack
```

### Step 4: Publish
```bash
dotnet nuget push MyLibrary.1.0.0.nupkg --api-key <key> --source https://api.nuget.org/v3/index.json
```

## Package Sources

### View Sources
```bash
dotnet nuget list source
```

### Add Custom Source
```bash
dotnet nuget add source https://myget.org/F/myfeed/api/v3/index.json -n MyFeed
```

### nuget.config
```xml
<?xml version="1.0" encoding="utf-8"?>
<configuration>
  <packageSources>
    <add key="nuget.org" value="https://api.nuget.org/v3/index.json" />
    <add key="MyFeed" value="https://myget.org/F/myfeed/api/v3/index.json" />
  </packageSources>
</configuration>
```

## Managing Package Dependencies

### List Packages
```bash
# List installed packages
dotnet list package

# Show outdated packages
dotnet list package --outdated

# Include transitive dependencies
dotnet list package --include-transitive
```

### Dependency Graph
Packages can have their own dependencies (transitive dependencies).

```
MyApp
├── PackageA (1.0.0)
│   └── PackageC (2.0.0)
└── PackageB (1.5.0)
    └── PackageC (2.1.0)  # Conflict!
```

## Package Caching

### Clear Cache
```bash
dotnet nuget locals all --clear
```

### Cache Locations
- Windows: `%userprofile%\.nuget\packages`
- macOS/Linux: `~/.nuget/packages`

## Best Practices

1. ✅ Use stable versions in production
2. ✅ Keep packages updated (security patches)
3. ✅ Review package dependencies
4. ✅ Check package download stats and maintenance
5. ✅ Lock package versions for critical dependencies
6. ❌ Don't install unnecessary packages
7. ❌ Avoid packages with no recent updates
8. ❌ Don't use wildcard versions in production

## Security Considerations

### Check for Vulnerabilities
```bash
dotnet list package --vulnerable
```

### Use Trusted Sources
- Verify package authors
- Check GitHub repository
- Review package documentation
- Monitor security advisories

## Practical Tasks

### Task 1: Install and Use Package
- Create a new console app
- Install Newtonsoft.Json
- Serialize an object to JSON
- Deserialize JSON to object

### Task 2: Package Management
- List all installed packages
- Check for outdated packages
- Update a package to latest version
- Remove an unused package

### Task 3: Explore Packages
- Browse NuGet.org
- Install Serilog for logging
- Install AutoMapper for object mapping
- Use both in a simple application

### Task 4: Create Package
- Create a class library
- Add useful utility methods
- Pack into NuGet package
- Test locally

## Common NuGet Commands

```bash
# Install
dotnet add package <PackageName>

# Remove
dotnet remove package <PackageName>

# Restore
dotnet restore

# List
dotnet list package

# Update
dotnet add package <PackageName> --version <Version>

# Clear cache
dotnet nuget locals all --clear

# Pack
dotnet pack

# Push
dotnet nuget push <PackagePath>
```

## Interview Questions

1. What is NuGet and why is it important?
2. How do you install a package using CLI?
3. What is semantic versioning?
4. Explain transitive dependencies
5. How do you create your own NuGet package?
6. Where are NuGet packages cached?
7. How do you check for package vulnerabilities?

## Next Steps

- Learn dotnet CLI commands
- Explore popular NuGet packages
- Create and publish your own package
- Understand dependency injection with packages
