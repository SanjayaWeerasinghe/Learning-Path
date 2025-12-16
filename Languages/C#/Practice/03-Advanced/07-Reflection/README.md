# Reflection

## What You'll Learn
- What reflection is and when to use it
- Getting type information at runtime
- Inspecting assemblies, types, and members
- Creating instances dynamically
- Invoking methods and accessing properties
- Custom attributes and metadata
- Performance considerations
- Practical use cases

## Concept Overview

Reflection allows you to inspect and interact with types, methods, properties, and other code elements at runtime. It's useful for frameworks, serialization, dependency injection, and plugin systems.

### Getting Type Information

```csharp
// Get type from object
string text = "Hello";
Type stringType = text.GetType();
Console.WriteLine(stringType.Name);  // String
Console.WriteLine(stringType.FullName);  // System.String

// Get type using typeof
Type intType = typeof(int);
Type listType = typeof(List<string>);

// Get type by name
Type dateType = Type.GetType("System.DateTime");
```

### Type Properties

```csharp
Type type = typeof(List<int>);

Console.WriteLine($"Name: {type.Name}");  // List`1
Console.WriteLine($"FullName: {type.FullName}");  // System.Collections.Generic.List`1[[System.Int32...]]
Console.WriteLine($"Namespace: {type.Namespace}");  // System.Collections.Generic
Console.WriteLine($"Assembly: {type.Assembly.GetName().Name}");  // System.Collections

Console.WriteLine($"IsClass: {type.IsClass}");  // True
Console.WriteLine($"IsInterface: {type.IsInterface}");  // False
Console.WriteLine($"IsAbstract: {type.IsAbstract}");  // False
Console.WriteLine($"IsSealed: {type.IsSealed}");  // False
Console.WriteLine($"IsGenericType: {type.IsGenericType}");  // True
Console.WriteLine($"IsPublic: {type.IsPublic}");  // True
```

### Inspecting Members

```csharp
class Person
{
    public string Name { get; set; }
    public int Age { get; set; }
    private string secret = "hidden";

    public void SayHello()
    {
        Console.WriteLine($"Hello, I'm {Name}");
    }

    private void SecretMethod()
    {
        Console.WriteLine("Secret!");
    }
}

Type personType = typeof(Person);

// Get all properties
PropertyInfo[] properties = personType.GetProperties();
foreach (PropertyInfo prop in properties)
{
    Console.WriteLine($"Property: {prop.Name}, Type: {prop.PropertyType.Name}");
}

// Get all methods
MethodInfo[] methods = personType.GetMethods();
foreach (MethodInfo method in methods)
{
    Console.WriteLine($"Method: {method.Name}");
}

// Get all fields (including private)
FieldInfo[] fields = personType.GetFields(
    BindingFlags.Public | BindingFlags.NonPublic | BindingFlags.Instance);
foreach (FieldInfo field in fields)
{
    Console.WriteLine($"Field: {field.Name}, Type: {field.FieldType.Name}");
}
```

### Creating Instances Dynamically

```csharp
// Create instance using Activator
Type personType = typeof(Person);
object personObj = Activator.CreateInstance(personType);
Person person = (Person)personObj;

// Create with constructor parameters
Type rectangleType = typeof(Rectangle);
object rectangleObj = Activator.CreateInstance(rectangleType, 10, 20);

// Create generic type
Type listType = typeof(List<>);
Type stringListType = listType.MakeGenericType(typeof(string));
object stringList = Activator.CreateInstance(stringListType);
```

### Invoking Methods

```csharp
class Calculator
{
    public int Add(int a, int b)
    {
        return a + b;
    }

    private int Multiply(int a, int b)
    {
        return a * b;
    }
}

Calculator calc = new Calculator();
Type calcType = typeof(Calculator);

// Invoke public method
MethodInfo addMethod = calcType.GetMethod("Add");
object result = addMethod.Invoke(calc, new object[] { 5, 3 });
Console.WriteLine($"5 + 3 = {result}");  // 8

// Invoke private method
MethodInfo multiplyMethod = calcType.GetMethod("Multiply",
    BindingFlags.NonPublic | BindingFlags.Instance);
object result2 = multiplyMethod.Invoke(calc, new object[] { 5, 3 });
Console.WriteLine($"5 * 3 = {result2}");  // 15
```

### Accessing Properties

```csharp
Person person = new Person { Name = "Alice", Age = 25 };
Type personType = typeof(Person);

// Get property value
PropertyInfo nameProp = personType.GetProperty("Name");
object nameValue = nameProp.GetValue(person);
Console.WriteLine($"Name: {nameValue}");  // Alice

// Set property value
PropertyInfo ageProp = personType.GetProperty("Age");
ageProp.SetValue(person, 30);
Console.WriteLine($"Age: {person.Age}");  // 30

// Access all properties dynamically
foreach (PropertyInfo prop in personType.GetProperties())
{
    object value = prop.GetValue(person);
    Console.WriteLine($"{prop.Name}: {value}");
}
```

### Custom Attributes

```csharp
// Define custom attribute
[AttributeUsage(AttributeTargets.Class | AttributeTargets.Property)]
class DescriptionAttribute : Attribute
{
    public string Description { get; }

    public DescriptionAttribute(string description)
    {
        Description = description;
    }
}

// Use attribute
[Description("Represents a person")]
class Person
{
    [Description("Person's full name")]
    public string Name { get; set; }

    [Description("Person's age in years")]
    public int Age { get; set; }
}

// Read attributes
Type personType = typeof(Person);

// Get class attribute
DescriptionAttribute classAttr = (DescriptionAttribute)
    Attribute.GetCustomAttribute(personType, typeof(DescriptionAttribute));
Console.WriteLine($"Class: {classAttr.Description}");

// Get property attributes
foreach (PropertyInfo prop in personType.GetProperties())
{
    DescriptionAttribute propAttr = (DescriptionAttribute)
        Attribute.GetCustomAttribute(prop, typeof(DescriptionAttribute));
    if (propAttr != null)
    {
        Console.WriteLine($"{prop.Name}: {propAttr.Description}");
    }
}
```

### Assembly Information

```csharp
// Get current assembly
Assembly currentAssembly = Assembly.GetExecutingAssembly();
Console.WriteLine($"Name: {currentAssembly.GetName().Name}");
Console.WriteLine($"Version: {currentAssembly.GetName().Version}");
Console.WriteLine($"Location: {currentAssembly.Location}");

// Get all types in assembly
Type[] types = currentAssembly.GetTypes();
foreach (Type type in types)
{
    Console.WriteLine($"Type: {type.FullName}");
}

// Load assembly dynamically
Assembly assembly = Assembly.LoadFrom("MyLibrary.dll");

// Get specific type from assembly
Type myType = assembly.GetType("MyNamespace.MyClass");
```

### Generic Type Reflection

```csharp
// Generic type
Type listType = typeof(List<int>);

Console.WriteLine($"IsGenericType: {listType.IsGenericType}");  // True
Console.WriteLine($"IsGenericTypeDefinition: {listType.IsGenericTypeDefinition}");  // False

// Get generic arguments
Type[] genericArgs = listType.GetGenericArguments();
Console.WriteLine($"Generic argument: {genericArgs[0].Name}");  // Int32

// Get generic type definition
Type genericDef = listType.GetGenericTypeDefinition();
Console.WriteLine($"Generic definition: {genericDef.Name}");  // List`1

// Create generic type
Type openType = typeof(Dictionary<,>);
Type closedType = openType.MakeGenericType(typeof(string), typeof(int));
object dict = Activator.CreateInstance(closedType);
```

### Practical Example - Object Serializer

```csharp
class SimpleSerializer
{
    public static string Serialize(object obj)
    {
        Type type = obj.GetType();
        StringBuilder sb = new StringBuilder();

        foreach (PropertyInfo prop in type.GetProperties())
        {
            object value = prop.GetValue(obj);
            sb.AppendLine($"{prop.Name}={value}");
        }

        return sb.ToString();
    }

    public static T Deserialize<T>(string data) where T : new()
    {
        T obj = new T();
        Type type = typeof(T);

        string[] lines = data.Split('\n');
        foreach (string line in lines)
        {
            if (string.IsNullOrWhiteSpace(line)) continue;

            string[] parts = line.Split('=');
            string propName = parts[0];
            string propValue = parts[1].Trim();

            PropertyInfo prop = type.GetProperty(propName);
            if (prop != null)
            {
                object convertedValue = Convert.ChangeType(propValue, prop.PropertyType);
                prop.SetValue(obj, convertedValue);
            }
        }

        return obj;
    }
}

// Usage
Person person = new Person { Name = "Alice", Age = 25 };
string serialized = SimpleSerializer.Serialize(person);
Console.WriteLine(serialized);

Person deserialized = SimpleSerializer.Deserialize<Person>(serialized);
```

## Your Tasks

### Task 1: Type Inspector
Create a program that:
- Takes a type name as input
- Displays all properties with their types
- Displays all methods with their signatures
- Displays all constructors
- Shows if type is class, interface, or struct

### Task 2: Object Cloner
Create a deep clone utility using reflection:
- Method: `DeepClone<T>(T obj)`
- Clones all properties (including nested objects)
- Handles different types (primitives, strings, collections)
- Test with complex nested objects

### Task 3: Property Validator
Create a validation framework:
- Custom attributes: [Required], [Range], [MaxLength]
- Method: `Validate(object obj)` returns list of errors
- Check all properties with validation attributes
- Display detailed validation errors
Test with various classes.

### Task 4: Dependency Injector
Create a simple DI container:
- Register types: `Register<TInterface, TImplementation>()`
- Resolve instances: `Resolve<T>()`
- Constructor injection (inject dependencies automatically)
- Singleton and transient lifetime support
Test with multiple services.

### Task 5: Object Comparer
Create an object comparison utility:
- Method: `Compare(object obj1, object obj2)`
- Returns list of differences
- Compares all properties
- Shows old value vs new value
- Handles nested objects
Test with modified objects.

### Task 6: CSV Serializer
Create a CSV serializer using reflection:
- Method: `ToCsv<T>(List<T> items)`
- Method: `FromCsv<T>(string csv)` returns List<T>
- Handles properties as columns
- Supports different data types
- Custom column names via attributes
Test with various classes.

### Task 7: Plugin System
Create a plugin loader:
- Load assemblies from plugins folder
- Find all classes implementing IPlugin interface
- Create instances and execute plugins
- Display plugin information (name, version, author)
- Handle plugin errors gracefully
Create sample plugins to test.

### Task 8: Method Performance Analyzer
Create a performance analyzer:
- Custom attribute: [Measure]
- Wraps methods with timing
- Logs execution time
- Reports slowest methods
- Aggregate statistics
Test with various methods.

### Task 9: Auto-Mapper
Create an object mapping utility:
- Method: `Map<TSource, TDest>(TSource source)`
- Maps properties with same names
- Handles type conversion
- Custom mapping rules via attributes
- Nested object mapping
Test mapping between DTOs and entities.

### Task 10: Documentation Generator
Create a documentation generator:
- Read XML comments from code
- Generate markdown documentation
- Include: classes, methods, properties, parameters
- Custom [Description] attributes
- Export to file
Test with documented classes.

### Task 11: Dynamic Query Builder
Create a LINQ query builder using reflection:
- Build queries from string conditions
- Support: Where, OrderBy, Select
- Parse property names dynamically
- Type-safe execution
- Example: "Age > 18 AND Name LIKE 'A%'"
Test with various object types.

### Task 12: Comprehensive ORM (Object-Relational Mapper)
Create a mini ORM using reflection:
- Attributes: [Table], [Column], [PrimaryKey]
- Generate SQL: CREATE TABLE, INSERT, UPDATE, DELETE, SELECT
- Map database rows to objects
- Map objects to database rows
- Type-safe operations
- Simple query interface
Test with multiple entity types and operations.

## Expected Output Examples

**Task 1:**
```
Type Inspector

Enter type name: System.String

Type: String
Namespace: System
Assembly: System.Private.CoreLib

Properties:
- Length: Int32 (read-only)
- Chars: Char (indexed property)

Methods:
- Contains(String): Boolean
- StartsWith(String): Boolean
- EndsWith(String): Boolean
- Substring(Int32, Int32): String
...

Constructors:
- String(Char[])
- String(Char, Int32)
...
```

**Task 3:**
```
Validation Results:

Class: Person

Errors:
✗ Name: Required field is empty
✗ Age: Value 150 is out of range [0-120]
✗ Email: MaxLength exceeded (50/30)

Valid Properties:
✓ Phone
✓ Address

Total Errors: 3
```

**Task 5:**
```
Object Comparison

Comparing Person objects:

Differences:
Name: "Alice" → "Alice Johnson" (MODIFIED)
Age: 25 → 26 (MODIFIED)
Email: (UNCHANGED)
Address: null → "123 Main St" (ADDED)

Total differences: 3
Unchanged: 1
```

**Task 7:**
```
Plugin System

Loading plugins from: ./plugins

Found 3 plugins:

1. Plugin: Logger
   Version: 1.0.0
   Author: John Doe
   Description: Logging functionality
   ✓ Loaded successfully

2. Plugin: Calculator
   Version: 2.1.0
   Author: Jane Smith
   Description: Mathematical operations
   ✓ Loaded successfully

3. Plugin: Reporter
   Version: 1.5.0
   Author: Bob Johnson
   Description: Report generation
   ✗ Failed to load: MissingMethodException

Executing plugins...
[Logger] Initialized
[Calculator] Initialized
```

## Tips
- Use reflection sparingly - it's slower than direct code
- Cache reflection results when possible
- Use BindingFlags to specify what members to get
- Be careful with private member access
- Consider security implications
- Use reflection for frameworks, not application logic
- Prefer compile-time type safety when possible
- Test thoroughly when using reflection
- Handle exceptions (member not found, etc.)

## Common Mistakes

```csharp
// ❌ Not checking for null
PropertyInfo prop = type.GetProperty("MissingProperty");
object value = prop.GetValue(obj);  // NullReferenceException!

// ✅ Check for null
PropertyInfo prop = type.GetProperty("Name");
if (prop != null)
{
    object value = prop.GetValue(obj);
}

// ❌ Wrong BindingFlags
MethodInfo method = type.GetMethod("PrivateMethod");  // Returns null!

// ✅ Specify correct flags
MethodInfo method = type.GetMethod("PrivateMethod",
    BindingFlags.NonPublic | BindingFlags.Instance);

// ❌ Not handling invoke exceptions
method.Invoke(obj, parameters);  // May throw TargetInvocationException

// ✅ Handle exceptions
try
{
    method.Invoke(obj, parameters);
}
catch (TargetInvocationException ex)
{
    Console.WriteLine($"Method threw: {ex.InnerException.Message}");
}

// ❌ Repeating reflection in loops
for (int i = 0; i < 1000; i++)
{
    PropertyInfo prop = type.GetProperty("Name");  // Slow!
    prop.SetValue(obj, $"Name{i}");
}

// ✅ Cache reflection results
PropertyInfo prop = type.GetProperty("Name");
for (int i = 0; i < 1000; i++)
{
    prop.SetValue(obj, $"Name{i}");
}

// ❌ Incorrect type conversion
object value = prop.GetValue(obj);
int intValue = (int)value;  // May throw InvalidCastException

// ✅ Safe conversion
object value = prop.GetValue(obj);
if (value is int intValue)
{
    // Use intValue
}
```

## Key Concepts
- **Reflection**: Runtime inspection and manipulation of types
- **Type**: Represents type information
- **Assembly**: Collection of types and resources
- **PropertyInfo**: Metadata about properties
- **MethodInfo**: Metadata about methods
- **FieldInfo**: Metadata about fields
- **Attribute**: Metadata attached to code elements
- **BindingFlags**: Specifies which members to include
- **Activator**: Creates instances dynamically
- **Dynamic Type Discovery**: Finding types at runtime

## Next Steps
Move on to `08-Attributes` to learn custom metadata and code decoration!
