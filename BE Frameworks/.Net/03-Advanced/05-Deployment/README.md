# Deployment in ASP.NET Core

## Introduction

Deploying ASP.NET Core applications involves publishing the application and hosting it on a web server or cloud platform.

## Publishing Options

### Framework-Dependent Deployment (FDD)
Requires .NET runtime on target machine
```bash
dotnet publish -c Release
```

### Self-Contained Deployment (SCD)
Includes .NET runtime
```bash
dotnet publish -c Release --self-contained true -r win-x64
dotnet publish -c Release --self-contained true -r linux-x64
dotnet publish -c Release --self-contained true -r osx-x64
```

## Configuration

### appsettings.json
```json
{
  "Logging": {
    "LogLevel": {
      "Default": "Information"
    }
  },
  "AllowedHosts": "*"
}
```

### appsettings.Production.json
```json
{
  "Logging": {
    "LogLevel": {
      "Default": "Warning"
    }
  },
  "ConnectionStrings": {
    "DefaultConnection": "Production connection string"
  }
}
```

### Environment Variables
```bash
export ASPNETCORE_ENVIRONMENT=Production
export ConnectionStrings__DefaultConnection="Server=..."
```

## IIS Deployment

### Prerequisites
- IIS installed
- .NET Hosting Bundle installed

### Publish
```bash
dotnet publish -c Release -o ./publish
```

### web.config
```xml
<?xml version="1.0" encoding="utf-8"?>
<configuration>
  <location path="." inheritInChildApplications="false">
    <system.webServer>
      <handlers>
        <add name="aspNetCore" path="*" verb="*"
             modules="AspNetCoreModuleV2" resourceType="Unspecified" />
      </handlers>
      <aspNetCore processPath="dotnet"
                  arguments=".\MyApp.dll"
                  stdoutLogEnabled="false"
                  stdoutLogFile=".\logs\stdout"
                  hostingModel="inprocess" />
    </system.webServer>
  </location>
</configuration>
```

## Docker Deployment

### Dockerfile
```dockerfile
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src
COPY ["MyApp/MyApp.csproj", "MyApp/"]
RUN dotnet restore "MyApp/MyApp.csproj"
COPY . .
WORKDIR "/src/MyApp"
RUN dotnet build "MyApp.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "MyApp.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "MyApp.dll"]
```

### Build and Run
```bash
docker build -t myapp .
docker run -d -p 8080:80 --name myapp-container myapp
```

### docker-compose.yml
```yaml
version: '3.8'
services:
  web:
    build: .
    ports:
      - "8080:80"
    environment:
      - ASPNETCORE_ENVIRONMENT=Production
    depends_on:
      - db
  db:
    image: postgres
    environment:
      POSTGRES_PASSWORD: example
```

## Azure Deployment

### Azure App Service
```bash
# Login
az login

# Create resource group
az group create --name MyResourceGroup --location eastus

# Create app service plan
az appservice plan create --name MyPlan --resource-group MyResourceGroup --sku B1

# Create web app
az webapp create --name MyApp --resource-group MyResourceGroup --plan MyPlan

# Deploy
az webapp deployment source config-zip --resource-group MyResourceGroup --name MyApp --src ./publish.zip
```

### Azure SQL Database
```bash
# Create SQL server
az sql server create --name myserver --resource-group MyResourceGroup --location eastus --admin-user myadmin --admin-password MyPassword123!

# Create database
az sql db create --resource-group MyResourceGroup --server myserver --name mydb --service-objective S0

# Get connection string
az sql db show-connection-string --client ado.net --name mydb --server myserver
```

## Linux Deployment

### Install .NET
```bash
wget https://dot.net/v1/dotnet-install.sh
sudo bash dotnet-install.sh
```

### Publish App
```bash
dotnet publish -c Release -o /var/www/myapp
```

### Systemd Service
```ini
[Unit]
Description=My ASP.NET Core App

[Service]
WorkingDirectory=/var/www/myapp
ExecStart=/usr/bin/dotnet /var/www/myapp/MyApp.dll
Restart=always
RestartSec=10
SyslogIdentifier=myapp
User=www-data
Environment=ASPNETCORE_ENVIRONMENT=Production
Environment=DOTNET_PRINT_TELEMETRY_MESSAGE=false

[Install]
WantedBy=multi-user.target
```

### Nginx Configuration
```nginx
server {
    listen 80;
    server_name example.com;

    location / {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection keep-alive;
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

## CI/CD with GitHub Actions

### .github/workflows/deploy.yml
```yaml
name: Deploy to Azure

on:
  push:
    branches: [ main ]

jobs:
  build:
    runs-on: ubuntu-latest

    steps:
    - uses: actions/checkout@v2

    - name: Setup .NET
      uses: actions/setup-dotnet@v1
      with:
        dotnet-version: '8.0.x'

    - name: Restore dependencies
      run: dotnet restore

    - name: Build
      run: dotnet build --no-restore -c Release

    - name: Test
      run: dotnet test --no-build --verbosity normal

    - name: Publish
      run: dotnet publish -c Release -o ./publish

    - name: Deploy to Azure
      uses: azure/webapps-deploy@v2
      with:
        app-name: 'my-app-name'
        publish-profile: ${{ secrets.AZURE_WEBAPP_PUBLISH_PROFILE }}
        package: ./publish
```

## Health Checks

```csharp
builder.Services.AddHealthChecks()
    .AddDbContextCheck<AppDbContext>();

app.MapHealthChecks("/health");
```

## Practical Tasks

### Task 1: IIS Deployment
- Publish application
- Deploy to IIS
- Configure application pool
- Test deployed app

### Task 2: Docker Deployment
- Create Dockerfile
- Build Docker image
- Run container locally
- Push to Docker Hub

### Task 3: Azure Deployment
- Create Azure account
- Deploy to Azure App Service
- Configure connection strings
- Set up CI/CD

### Task 4: Linux Deployment
- Set up Linux server
- Deploy application
- Configure Nginx
- Set up systemd service

## Best Practices

1. Use environment-specific configuration
2. Enable health checks
3. Implement logging
4. Use HTTPS
5. Set up monitoring
6. Configure auto-scaling
7. Use connection pooling
8. Implement caching
9. Optimize static files
10. Regular backups

## Security Considerations

1. Use HTTPS everywhere
2. Store secrets securely
3. Enable CORS properly
4. Implement rate limiting
5. Update dependencies regularly
6. Use security headers
7. Enable authentication
8. Validate all inputs

## Interview Questions

1. What are deployment models in .NET?
2. How do you deploy to IIS?
3. Explain Docker deployment
4. What is Azure App Service?
5. How do you configure environments?
6. What are health checks?
7. How do you set up CI/CD?
8. Best practices for production deployment?

## Next Steps

- Learn Kubernetes
- Explore microservices
- Study cloud platforms
- Master DevOps practices
