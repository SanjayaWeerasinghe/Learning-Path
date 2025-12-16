# Attributes

## What You'll Learn
- What attributes are and why they're useful
- Built-in attributes
- Creating custom attributes
- Attribute targets and usage
- Reading attributes with reflection
- Attribute parameters
- Practical attribute patterns
- Real-world use cases

## Concept Overview

Attributes are metadata tags that provide information about code elements. They don't affect program logic directly but can be read at runtime using reflection or used by compilers and tools.

### Built-in Attributes

```csharp
// Obsolete - marks deprecated code
[Obsolete("Use NewMethod instead")]
public void OldMethod()
{
    Console.WriteLine("Old method");
}

[Obsolete("This method is deprecated", true)]  // Error on use
public void ReallyOldMethod()
{
}

// Serializable - marks types for serialization
[Serializable]
public class Person
{
    public string Name { get; set; }
    public int Age { get; set; }
}

// Conditional - compile based on symbol
[Conditional("DEBUG")]
public void DebugLog(string message)
{
    Console.WriteLine($"[DEBUG] {message}");
}

// DebuggerDisplay - custom display in debugger
[DebuggerDisplay("Person: {Name}, Age: {Age}")]
public class PersonDebug
{
    public string Name { get; set; }
    public int Age { get; set; }
}
```

### Custom Attribute Definition

```csharp
// Simple custom attribute
[AttributeUsage(AttributeTargets.Class)]
public class AuthorAttribute : Attribute
{
    public string Name { get; }
    public string Date { get; set; }

    public AuthorAttribute(string name)
    {
        Name = name;
    }
}

// Usage
[Author("John Doe", Date = "2025-10-02")]
public class MyClass
{
}
```

### Attribute Targets

```csharp
// Multiple targets
[AttributeUsage(
    AttributeTargets.Class | AttributeTargets.Method | AttributeTargets.Property,
    AllowMultiple = true,  // Can be applied multiple times
    Inherited = true)]     // Inherited by derived classes
public class DocumentationAttribute : Attribute
{
    public string Description { get; set; }
    public string Version { get; set; }

    public DocumentationAttribute(string description)
    {
        Description = description;
    }
}

// Usage on different targets
[Documentation("Main application class", Version = "1.0")]
public class Application
{
    [Documentation("Starts the application")]
    public void Start()
    {
    }

    [Documentation("Application name")]
    public string Name { get; set; }
}
```

### Reading Attributes

```csharp
public class Person
{
    [Required]
    [MaxLength(50)]
    public string Name { get; set; }

    [Range(0, 120)]
    public int Age { get; set; }
}

// Read attributes from class
Type type = typeof(Person);
var attributes = type.GetCustomAttributes(typeof(DocumentationAttribute), false);

// Read attributes from property
PropertyInfo nameProp = type.GetProperty("Name");
var requiredAttr = nameProp.GetCustomAttribute<RequiredAttribute>();
if (requiredAttr != null)
{
    Console.WriteLine("Name is required");
}

// Read all attributes from property
var allAttrs = nameProp.GetCustomAttributes();
foreach (var attr in allAttrs)
{
    Console.WriteLine($"Attribute: {attr.GetType().Name}");
}
```

### Validation Attributes

```csharp
// Custom validation attributes
[AttributeUsage(AttributeTargets.Property)]
public class RequiredAttribute : Attribute
{
    public string ErrorMessage { get; set; } = "Field is required";
}

[AttributeUsage(AttributeTargets.Property)]
public class RangeAttribute : Attribute
{
    public int Min { get; }
    public int Max { get; }
    public string ErrorMessage { get; set; }

    public RangeAttribute(int min, int max)
    {
        Min = min;
        Max = max;
        ErrorMessage = $"Value must be between {min} and {max}";
    }
}

[AttributeUsage(AttributeTargets.Property)]
public class MaxLengthAttribute : Attribute
{
    public int Length { get; }
    public string ErrorMessage { get; set; }

    public MaxLengthAttribute(int length)
    {
        Length = length;
        ErrorMessage = $"Length cannot exceed {length}";
    }
}

// Usage
public class Person
{
    [Required(ErrorMessage = "Name is required")]
    [MaxLength(50)]
    public string Name { get; set; }

    [Required]
    [Range(0, 120, ErrorMessage = "Age must be between 0 and 120")]
    public int Age { get; set; }

    [MaxLength(100)]
    public string Email { get; set; }
}

// Validator class
public static class Validator
{
    public static List<string> Validate(object obj)
    {
        List<string> errors = new List<string>();
        Type type = obj.GetType();

        foreach (PropertyInfo prop in type.GetProperties())
        {
            object value = prop.GetValue(obj);

            // Check Required
            var required = prop.GetCustomAttribute<RequiredAttribute>();
            if (required != null && value == null)
            {
                errors.Add($"{prop.Name}: {required.ErrorMessage}");
            }

            // Check Range
            var range = prop.GetCustomAttribute<RangeAttribute>();
            if (range != null && value is int intValue)
            {
                if (intValue < range.Min || intValue > range.Max)
                {
                    errors.Add($"{prop.Name}: {range.ErrorMessage}");
                }
            }

            // Check MaxLength
            var maxLength = prop.GetCustomAttribute<MaxLengthAttribute>();
            if (maxLength != null && value is string strValue)
            {
                if (strValue.Length > maxLength.Length)
                {
                    errors.Add($"{prop.Name}: {maxLength.ErrorMessage}");
                }
            }
        }

        return errors;
    }
}
```

### Description Attributes

```csharp
[AttributeUsage(AttributeTargets.All)]
public class DescriptionAttribute : Attribute
{
    public string Description { get; }

    public DescriptionAttribute(string description)
    {
        Description = description;
    }
}

// Usage
[Description("Represents a product in inventory")]
public class Product
{
    [Description("Unique product identifier")]
    public int Id { get; set; }

    [Description("Product name or title")]
    public string Name { get; set; }

    [Description("Current price in USD")]
    public double Price { get; set; }
}

// Generate documentation
public static void GenerateDocumentation(Type type)
{
    var classAttr = type.GetCustomAttribute<DescriptionAttribute>();
    Console.WriteLine($"Class: {type.Name}");
    if (classAttr != null)
    {
        Console.WriteLine($"  {classAttr.Description}");
    }

    Console.WriteLine("\nProperties:");
    foreach (PropertyInfo prop in type.GetProperties())
    {
        var propAttr = prop.GetCustomAttribute<DescriptionAttribute>();
        Console.WriteLine($"  {prop.Name}: {prop.PropertyType.Name}");
        if (propAttr != null)
        {
            Console.WriteLine($"    {propAttr.Description}");
        }
    }
}
```

### Table Mapping Attributes (ORM-style)

```csharp
[AttributeUsage(AttributeTargets.Class)]
public class TableAttribute : Attribute
{
    public string Name { get; }

    public TableAttribute(string name)
    {
        Name = name;
    }
}

[AttributeUsage(AttributeTargets.Property)]
public class ColumnAttribute : Attribute
{
    public string Name { get; set; }
    public bool IsPrimaryKey { get; set; }
    public bool IsRequired { get; set; }
}

// Usage
[Table("Users")]
public class User
{
    [Column(Name = "user_id", IsPrimaryKey = true)]
    public int Id { get; set; }

    [Column(Name = "user_name", IsRequired = true)]
    public string Name { get; set; }

    [Column(Name = "email_address", IsRequired = true)]
    public string Email { get; set; }

    [Column(Name = "age")]
    public int Age { get; set; }
}

// Generate SQL
public static string GenerateCreateTableSQL(Type type)
{
    var tableAttr = type.GetCustomAttribute<TableAttribute>();
    string tableName = tableAttr?.Name ?? type.Name;

    StringBuilder sql = new StringBuilder();
    sql.AppendLine($"CREATE TABLE {tableName} (");

    List<string> columns = new List<string>();
    foreach (PropertyInfo prop in type.GetProperties())
    {
        var columnAttr = prop.GetCustomAttribute<ColumnAttribute>();
        if (columnAttr != null)
        {
            string columnName = columnAttr.Name ?? prop.Name;
            string dataType = GetSQLType(prop.PropertyType);
            string definition = $"  {columnName} {dataType}";

            if (columnAttr.IsPrimaryKey)
                definition += " PRIMARY KEY";

            if (columnAttr.IsRequired)
                definition += " NOT NULL";

            columns.Add(definition);
        }
    }

    sql.AppendLine(string.Join(",\n", columns));
    sql.AppendLine(");");

    return sql.ToString();
}
```

### Method Attributes

```csharp
[AttributeUsage(AttributeTargets.Method)]
public class TestAttribute : Attribute
{
    public string Description { get; set; }
    public int Priority { get; set; } = 1;
}

[AttributeUsage(AttributeTargets.Method)]
public class ExpectedExceptionAttribute : Attribute
{
    public Type ExceptionType { get; }

    public ExpectedExceptionAttribute(Type exceptionType)
    {
        ExceptionType = exceptionType;
    }
}

// Test class
public class MathTests
{
    [Test(Description = "Test addition of positive numbers")]
    public void TestAddition()
    {
        Assert.Equal(5, Calculator.Add(2, 3));
    }

    [Test(Description = "Test division by zero", Priority = 2)]
    [ExpectedException(typeof(DivideByZeroException))]
    public void TestDivisionByZero()
    {
        Calculator.Divide(10, 0);
    }
}

// Test runner
public static void RunTests(Type testClass)
{
    foreach (MethodInfo method in testClass.GetMethods())
    {
        var testAttr = method.GetCustomAttribute<TestAttribute>();
        if (testAttr != null)
        {
            Console.WriteLine($"Running test: {method.Name}");
            Console.WriteLine($"  {testAttr.Description}");

            try
            {
                var instance = Activator.CreateInstance(testClass);
                method.Invoke(instance, null);

                var expectedEx = method.GetCustomAttribute<ExpectedExceptionAttribute>();
                if (expectedEx != null)
                {
                    Console.WriteLine("  FAILED: Expected exception not thrown");
                }
                else
                {
                    Console.WriteLine("  PASSED");
                }
            }
            catch (Exception ex)
            {
                var expectedEx = method.GetCustomAttribute<ExpectedExceptionAttribute>();
                if (expectedEx != null && ex.InnerException?.GetType() == expectedEx.ExceptionType)
                {
                    Console.WriteLine("  PASSED (Expected exception caught)");
                }
                else
                {
                    Console.WriteLine($"  FAILED: {ex.InnerException?.Message}");
                }
            }
        }
    }
}
```

## Your Tasks

### Task 1: Custom Description Attribute
Create a [Description] attribute:
- Apply to classes, properties, and methods
- Store description text
- Create utility to print all descriptions
Test with multiple classes.

### Task 2: Validation Framework
Create validation attributes:
- [Required], [Range], [MaxLength], [MinLength]
- [Email], [Phone], [CreditCard]
- Validator class that checks all attributes
- Returns list of validation errors
Test with User class.

### Task 3: Serialization Attributes
Create custom serialization system:
- [Serializable] for classes
- [SerializeField] for properties
- [IgnoreField] to skip properties
- Serialize and deserialize objects
Test with complex objects.

### Task 4: ORM Table Mapping
Create database mapping attributes:
- [Table(name)], [Column(name)]
- [PrimaryKey], [ForeignKey]
- [Required], [MaxLength]
- Generate CREATE TABLE SQL
- Generate INSERT SQL
Test with multiple entity classes.

### Task 5: Logging Attributes
Create logging attributes:
- [LogExecution] - logs method entry/exit
- [LogParameters] - logs parameters
- [LogReturnValue] - logs return value
- Use reflection to wrap methods
- Display execution logs
Test with various methods.

### Task 6: Authorization Attributes
Create authorization system:
- [Authorize(roles)] - requires specific roles
- [AllowAnonymous] - allows any access
- Check authorization before method execution
- Return access denied for unauthorized
Test with different user roles.

### Task 7: Test Framework
Create a mini test framework:
- [Test] - marks test methods
- [Setup], [TearDown] - before/after each test
- [ExpectedException(type)] - expects exception
- Test runner that executes all tests
- Display pass/fail results
Create test class to verify.

### Task 8: API Route Attributes
Create API routing attributes:
- [Route(path)], [HttpGet], [HttpPost]
- [FromBody], [FromQuery]
- Route matching system
- Display all available routes
Test with controller classes.

### Task 9: Configuration Attributes
Create configuration attributes:
- [ConfigValue(key, default)]
- [Required]
- Load from config file
- Inject values into properties
- Validate required values
Test with settings class.

### Task 10: Audit Trail Attributes
Create audit attributes:
- [Auditable] - marks class for auditing
- [AuditIgnore] - skip property
- Track all changes to object
- Display audit log
- Show before/after values
Test with multiple modifications.

### Task 11: Cache Attributes
Create caching system:
- [Cache(duration)] - cache method result
- [CacheInvalidate] - clear cache
- Store results with expiration
- Return cached value if valid
- Display cache statistics
Test with expensive operations.

### Task 12: Comprehensive Attribute System
Create a complete attribute system combining:
- Validation ([Required], [Range], etc.)
- Documentation ([Description])
- Database mapping ([Table], [Column])
- Authorization ([Authorize])
- Logging ([LogExecution])

Create a system that:
- Validates objects
- Generates database schema
- Checks authorization
- Logs all operations
- Provides full documentation
Test with real-world scenario (e.g., user management system).

## Expected Output Examples

**Task 2:**
```
Validation Results for User:

✗ Name: Field is required
✗ Age: Value 150 must be between 0 and 120
✗ Email: Invalid email format
✓ Phone: Valid

Validation failed with 3 errors.
```

**Task 4:**
```
Generated SQL for User class:

CREATE TABLE Users (
  user_id INT PRIMARY KEY NOT NULL,
  user_name VARCHAR(50) NOT NULL,
  email VARCHAR(100) NOT NULL,
  age INT,
  created_date DATETIME
);

INSERT INTO Users (user_id, user_name, email, age, created_date)
VALUES (1, 'John Doe', 'john@example.com', 30, '2025-10-02');
```

**Task 5:**
```
Logging Execution:

[ENTER] CalculateTotal(items: 5, discount: 0.1)
  [PARAM] items = 5
  [PARAM] discount = 0.1
  [BODY] Calculating...
  [RETURN] 45.0
[EXIT] CalculateTotal - Duration: 12ms

[ENTER] ProcessOrder(orderId: 1001)
  [PARAM] orderId = 1001
  [BODY] Processing...
  [RETURN] True
[EXIT] ProcessOrder - Duration: 234ms
```

**Task 7:**
```
Running Test Suite: MathTests

[TEST] TestAddition
  Description: Test addition of positive numbers
  Result: ✓ PASSED

[TEST] TestSubtraction
  Description: Test subtraction
  Result: ✓ PASSED

[TEST] TestDivisionByZero
  Description: Test exception handling
  Expected: DivideByZeroException
  Result: ✓ PASSED (Exception caught)

[TEST] TestMultiplication
  Description: Test multiplication
  Result: ✗ FAILED: Expected 20, got 21

Summary:
Tests run: 4
Passed: 3
Failed: 1
Success rate: 75%
```

## Tips
- Inherit from System.Attribute
- Use [AttributeUsage] to specify targets
- Make attribute properties, not fields
- Use positional parameters for required data
- Use named properties for optional data
- Set AllowMultiple = true if repeatable
- Set Inherited = true if should inherit
- Use descriptive attribute names (end with "Attribute")
- Cache reflection results for performance
- Validate attribute data in constructor

## Common Mistakes

```csharp
// ❌ Not inheriting from Attribute
public class MyAttribute  // Missing : Attribute
{
}

// ✅ Inherit from Attribute
public class MyAttribute : Attribute
{
}

// ❌ Wrong AttributeUsage
[AttributeUsage(AttributeTargets.Class)]
public class MyAttribute : Attribute
{
}

// Applied to method - compile error!
[My]
public void MyMethod() { }

// ✅ Specify correct targets
[AttributeUsage(AttributeTargets.Class | AttributeTargets.Method)]
public class MyAttribute : Attribute
{
}

// ❌ Not specifying AllowMultiple
[AttributeUsage(AttributeTargets.Class)]
public class AuthorAttribute : Attribute
{
}

[Author("John")]
[Author("Jane")]  // ❌ Error! Not allowed multiple times
public class MyClass { }

// ✅ Allow multiple
[AttributeUsage(AttributeTargets.Class, AllowMultiple = true)]
public class AuthorAttribute : Attribute
{
}

// ❌ Mutable required properties
public class RangeAttribute : Attribute
{
    public int Min { get; set; }  // Should be required!
    public int Max { get; set; }
}

// ✅ Use constructor for required properties
public class RangeAttribute : Attribute
{
    public int Min { get; }
    public int Max { get; }

    public RangeAttribute(int min, int max)
    {
        Min = min;
        Max = max;
    }
}

// ❌ Not checking for null
PropertyInfo prop = type.GetProperty("Name");
var attr = prop.GetCustomAttribute<RequiredAttribute>();
string message = attr.ErrorMessage;  // NullReferenceException!

// ✅ Check for null
var attr = prop.GetCustomAttribute<RequiredAttribute>();
if (attr != null)
{
    string message = attr.ErrorMessage;
}
```

## Key Concepts
- **Attribute**: Metadata tag for code elements
- **AttributeUsage**: Specifies where attribute can be applied
- **AttributeTargets**: Enum specifying valid targets
- **AllowMultiple**: Whether attribute can be applied multiple times
- **Inherited**: Whether attribute is inherited by derived classes
- **Custom Attribute**: User-defined attribute class
- **Reflection**: Used to read attributes at runtime
- **Metadata**: Information about code structure
- **Validation**: Using attributes to define rules
- **Decoration**: Adding functionality via attributes

## Next Steps
Move on to `09-Extension-Methods` to learn how to add methods to existing types!
