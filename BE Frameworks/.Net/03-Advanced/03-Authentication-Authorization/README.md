# Authentication and Authorization in ASP.NET Core

## Introduction

Authentication verifies who a user is, while authorization determines what they can access. ASP.NET Core provides robust built-in support for both.

## Authentication vs Authorization

- **Authentication**: "Who are you?" - Verifying identity
- **Authorization**: "What can you do?" - Verifying permissions

## Cookie Authentication

### Configure
```csharp
builder.Services.AddAuthentication(CookieAuthenticationDefaults.AuthenticationScheme)
    .AddCookie(options =>
    {
        options.LoginPath = "/Account/Login";
        options.LogoutPath = "/Account/Logout";
    });

app.UseAuthentication();
app.UseAuthorization();
```

### Login
```csharp
[HttpPost]
public async Task<IActionResult> Login(LoginModel model)
{
    var claims = new List<Claim>
    {
        new Claim(ClaimTypes.Name, model.Username),
        new Claim(ClaimTypes.Email, model.Email)
    };

    var identity = new ClaimsIdentity(claims,
        CookieAuthenticationDefaults.AuthenticationScheme);
    var principal = new ClaimsPrincipal(identity);

    await HttpContext.SignInAsync(principal);
    return RedirectToAction("Index", "Home");
}
```

## JWT Authentication

### Install Package
```bash
dotnet add package Microsoft.AspNetCore.Authentication.JwtBearer
```

### Configure
```csharp
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            ValidIssuer = builder.Configuration["Jwt:Issuer"],
            ValidAudience = builder.Configuration["Jwt:Audience"],
            IssuerSigningKey = new SymmetricSecurityKey(
                Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Key"]))
        };
    });
```

### Generate Token
```csharp
public string GenerateToken(User user)
{
    var securityKey = new SymmetricSecurityKey(
        Encoding.UTF8.GetBytes(_config["Jwt:Key"]));
    var credentials = new SigningCredentials(securityKey,
        SecurityAlgorithms.HmacSha256);

    var claims = new[]
    {
        new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
        new Claim(ClaimTypes.Name, user.Username),
        new Claim(ClaimTypes.Email, user.Email)
    };

    var token = new JwtSecurityToken(
        issuer: _config["Jwt:Issuer"],
        audience: _config["Jwt:Audience"],
        claims: claims,
        expires: DateTime.Now.AddMinutes(30),
        signingCredentials: credentials);

    return new JwtSecurityTokenHandler().WriteToken(token);
}
```

### Login Endpoint
```csharp
[HttpPost("login")]
public IActionResult Login(LoginModel model)
{
    // Validate credentials
    var user = ValidateUser(model.Username, model.Password);
    if (user == null)
        return Unauthorized();

    var token = GenerateToken(user);
    return Ok(new { token });
}
```

## Authorization

### Authorize Attribute
```csharp
[Authorize]
public class SecureController : Controller
{
    public IActionResult Index()
    {
        return View();
    }
}

[Authorize]
[HttpGet]
public IActionResult SecureEndpoint()
{
    return Ok("Secure data");
}
```

### Role-Based Authorization
```csharp
[Authorize(Roles = "Admin")]
public IActionResult AdminOnly()
{
    return View();
}

[Authorize(Roles = "Admin,Manager")]
public IActionResult AdminOrManager()
{
    return View();
}
```

### Policy-Based Authorization
```csharp
// Configure policies
builder.Services.AddAuthorization(options =>
{
    options.AddPolicy("RequireAdminRole",
        policy => policy.RequireRole("Admin"));

    options.AddPolicy("RequireAge18",
        policy => policy.Requirements.Add(new MinimumAgeRequirement(18)));
});

// Use policy
[Authorize(Policy = "RequireAdminRole")]
public IActionResult AdminPanel()
{
    return View();
}
```

### Custom Authorization Handler
```csharp
public class MinimumAgeRequirement : IAuthorizationRequirement
{
    public int MinimumAge { get; }

    public MinimumAgeRequirement(int minimumAge)
    {
        MinimumAge = minimumAge;
    }
}

public class MinimumAgeHandler : AuthorizationHandler<MinimumAgeRequirement>
{
    protected override Task HandleRequirementAsync(
        AuthorizationHandlerContext context,
        MinimumAgeRequirement requirement)
    {
        var birthDate = context.User.FindFirst(c => c.Type == "DateOfBirth")?.Value;

        if (birthDate == null)
            return Task.CompletedTask;

        var age = DateTime.Today.Year - DateTime.Parse(birthDate).Year;

        if (age >= requirement.MinimumAge)
            context.Succeed(requirement);

        return Task.CompletedTask;
    }
}

// Register handler
builder.Services.AddScoped<IAuthorizationHandler, MinimumAgeHandler>();
```

## Identity Framework

### Install Packages
```bash
dotnet add package Microsoft.AspNetCore.Identity.EntityFrameworkCore
```

### Configure
```csharp
builder.Services.AddIdentity<IdentityUser, IdentityRole>()
    .AddEntityFrameworkStores<AppDbContext>()
    .AddDefaultTokenProviders();

builder.Services.Configure<IdentityOptions>(options =>
{
    options.Password.RequireDigit = true;
    options.Password.RequiredLength = 8;
    options.Password.RequireNonAlphanumeric = false;
    options.Lockout.MaxFailedAccessAttempts = 5;
});
```

### Register User
```csharp
var user = new IdentityUser { UserName = model.Email, Email = model.Email };
var result = await _userManager.CreateAsync(user, model.Password);

if (result.Succeeded)
{
    await _signInManager.SignInAsync(user, isPersistent: false);
    return RedirectToAction("Index", "Home");
}
```

## Practical Tasks

### Task 1: Cookie Authentication
- Implement cookie authentication
- Create login/logout functionality
- Protect routes with [Authorize]

### Task 2: JWT Authentication
- Configure JWT authentication
- Create login endpoint
- Generate and return tokens
- Secure API endpoints

### Task 3: Role-Based Authorization
- Add roles to users
- Protect endpoints by role
- Create role management

### Task 4: Policy-Based Authorization
- Define custom policies
- Create authorization handlers
- Apply policies to endpoints

## Best Practices

1. Use HTTPS in production
2. Store secrets securely
3. Implement refresh tokens
4. Use strong password policies
5. Implement rate limiting
6. Log authentication attempts
7. Use secure token storage
8. Implement logout properly

## Interview Questions

1. What is authentication vs authorization?
2. Explain JWT authentication
3. What is cookie-based authentication?
4. How do claims work in ASP.NET Core?
5. What is role-based authorization?
6. Explain policy-based authorization
7. What is ASP.NET Core Identity?
8. How do you secure Web APIs?

## Next Steps

- Learn OAuth 2.0 and OpenID Connect
- Explore external authentication providers
- Study security best practices
- Implement refresh tokens
