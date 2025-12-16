# Extension Methods

## What You'll Learn
- What extension methods are
- Creating extension methods
- Extending built-in types
- Extension methods for collections
- LINQ-style extensions
- Best practices
- Common use cases
- Limitations

## Concept Overview

Extension methods allow you to add new methods to existing types without modifying the original type or creating a derived type. They appear as instance methods but are actually static methods.

### Basic Extension Method

```csharp
// Extension methods must be in static class
public static class StringExtensions
{
    // First parameter with 'this' specifies the type being extended
    public static string Reverse(this string str)
    {
        char[] chars = str.ToCharArray();
        Array.Reverse(chars);
        return new string(chars);
    }

    public static int WordCount(this string str)
    {
        return str.Split(new[] { ' ', '\t', '\n' },
            StringSplitOptions.RemoveEmptyEntries).Length;
    }

    public static bool IsNullOrEmpty(this string str)
    {
        return string.IsNullOrEmpty(str);
    }
}

// Usage - call like instance methods
string text = "Hello World";
string reversed = text.Reverse();  // dlroW olleH
int words = text.WordCount();  // 2
bool isEmpty = text.IsNullOrEmpty();  // false
```

### Extending Built-in Types

```csharp
public static class IntExtensions
{
    public static bool IsEven(this int number)
    {
        return number % 2 == 0;
    }

    public static bool IsOdd(this int number)
    {
        return number % 2 != 0;
    }

    public static bool IsPrime(this int number)
    {
        if (number <= 1) return false;
        if (number == 2) return true;
        if (number % 2 == 0) return false;

        for (int i = 3; i * i <= number; i += 2)
        {
            if (number % i == 0) return false;
        }
        return true;
    }

    public static int Factorial(this int number)
    {
        if (number < 0) throw new ArgumentException("Number must be non-negative");
        if (number == 0) return 1;

        int result = 1;
        for (int i = 2; i <= number; i++)
        {
            result *= i;
        }
        return result;
    }
}

// Usage
int num = 7;
Console.WriteLine(num.IsEven());  // False
Console.WriteLine(num.IsOdd());  // True
Console.WriteLine(num.IsPrime());  // True
Console.WriteLine(5.Factorial());  // 120
```

### DateTime Extensions

```csharp
public static class DateTimeExtensions
{
    public static bool IsWeekend(this DateTime date)
    {
        return date.DayOfWeek == DayOfWeek.Saturday ||
               date.DayOfWeek == DayOfWeek.Sunday;
    }

    public static bool IsWeekday(this DateTime date)
    {
        return !date.IsWeekend();
    }

    public static DateTime StartOfDay(this DateTime date)
    {
        return date.Date;
    }

    public static DateTime EndOfDay(this DateTime date)
    {
        return date.Date.AddDays(1).AddTicks(-1);
    }

    public static DateTime StartOfMonth(this DateTime date)
    {
        return new DateTime(date.Year, date.Month, 1);
    }

    public static DateTime EndOfMonth(this DateTime date)
    {
        return date.StartOfMonth().AddMonths(1).AddTicks(-1);
    }

    public static int Age(this DateTime birthDate)
    {
        DateTime today = DateTime.Today;
        int age = today.Year - birthDate.Year;
        if (birthDate.Date > today.AddYears(-age)) age--;
        return age;
    }

    public static string ToRelativeTime(this DateTime date)
    {
        TimeSpan diff = DateTime.Now - date;

        if (diff.TotalMinutes < 1) return "just now";
        if (diff.TotalMinutes < 60) return $"{(int)diff.TotalMinutes} minutes ago";
        if (diff.TotalHours < 24) return $"{(int)diff.TotalHours} hours ago";
        if (diff.TotalDays < 7) return $"{(int)diff.TotalDays} days ago";
        if (diff.TotalDays < 30) return $"{(int)(diff.TotalDays / 7)} weeks ago";

        return date.ToString("MMM dd, yyyy");
    }
}

// Usage
DateTime date = new DateTime(1990, 5, 15);
Console.WriteLine(date.Age());  // Current age
Console.WriteLine(DateTime.Now.IsWeekend());

DateTime posted = DateTime.Now.AddHours(-3);
Console.WriteLine(posted.ToRelativeTime());  // "3 hours ago"
```

### Collection Extensions

```csharp
public static class CollectionExtensions
{
    public static void ForEach<T>(this IEnumerable<T> source, Action<T> action)
    {
        foreach (T item in source)
        {
            action(item);
        }
    }

    public static bool IsNullOrEmpty<T>(this IEnumerable<T> source)
    {
        return source == null || !source.Any();
    }

    public static IEnumerable<T> Shuffle<T>(this IEnumerable<T> source)
    {
        Random random = new Random();
        return source.OrderBy(x => random.Next());
    }

    public static IEnumerable<IEnumerable<T>> Batch<T>(this IEnumerable<T> source, int size)
    {
        List<T> batch = new List<T>();
        foreach (T item in source)
        {
            batch.Add(item);
            if (batch.Count == size)
            {
                yield return batch;
                batch = new List<T>();
            }
        }

        if (batch.Count > 0)
        {
            yield return batch;
        }
    }

    public static T Random<T>(this IList<T> list)
    {
        if (list.Count == 0) throw new InvalidOperationException("List is empty");
        return list[new Random().Next(list.Count)];
    }

    public static string JoinString<T>(this IEnumerable<T> source, string separator = ", ")
    {
        return string.Join(separator, source);
    }
}

// Usage
List<int> numbers = new List<int> { 1, 2, 3, 4, 5 };

numbers.ForEach(n => Console.WriteLine(n * 2));

var shuffled = numbers.Shuffle();

var batches = numbers.Batch(2);  // [[1,2], [3,4], [5]]

int randomNum = numbers.Random();

string joined = numbers.JoinString(", ");  // "1, 2, 3, 4, 5"
```

### LINQ-Style Extensions

```csharp
public static class LinqExtensions
{
    public static IEnumerable<T> WhereNot<T>(this IEnumerable<T> source,
        Func<T, bool> predicate)
    {
        return source.Where(x => !predicate(x));
    }

    public static IEnumerable<T> DistinctBy<T, TKey>(this IEnumerable<T> source,
        Func<T, TKey> keySelector)
    {
        HashSet<TKey> seenKeys = new HashSet<TKey>();
        foreach (T item in source)
        {
            TKey key = keySelector(item);
            if (seenKeys.Add(key))
            {
                yield return item;
            }
        }
    }

    public static T MaxBy<T, TKey>(this IEnumerable<T> source,
        Func<T, TKey> keySelector) where TKey : IComparable<TKey>
    {
        return source.OrderByDescending(keySelector).First();
    }

    public static T MinBy<T, TKey>(this IEnumerable<T> source,
        Func<T, TKey> keySelector) where TKey : IComparable<TKey>
    {
        return source.OrderBy(keySelector).First();
    }

    public static bool None<T>(this IEnumerable<T> source)
    {
        return !source.Any();
    }

    public static bool None<T>(this IEnumerable<T> source, Func<T, bool> predicate)
    {
        return !source.Any(predicate);
    }
}

// Usage
var people = new List<Person>
{
    new Person { Name = "Alice", Age = 25 },
    new Person { Name = "Bob", Age = 30 },
    new Person { Name = "Alice", Age = 35 }
};

// Get unique people by name
var uniquePeople = people.DistinctBy(p => p.Name);

// Find oldest person
var oldest = people.MaxBy(p => p.Age);

// Find people who are not adults
var notAdults = people.WhereNot(p => p.Age >= 18);
```

### Validation Extensions

```csharp
public static class ValidationExtensions
{
    public static bool IsValidEmail(this string email)
    {
        if (string.IsNullOrWhiteSpace(email)) return false;

        try
        {
            return System.Text.RegularExpressions.Regex.IsMatch(email,
                @"^[^@\s]+@[^@\s]+\.[^@\s]+$");
        }
        catch
        {
            return false;
        }
    }

    public static bool IsValidUrl(this string url)
    {
        return Uri.TryCreate(url, UriKind.Absolute, out Uri uriResult) &&
               (uriResult.Scheme == Uri.UriSchemeHttp ||
                uriResult.Scheme == Uri.UriSchemeHttps);
    }

    public static bool IsNumeric(this string str)
    {
        return double.TryParse(str, out _);
    }

    public static bool IsBetween<T>(this T value, T min, T max) where T : IComparable<T>
    {
        return value.CompareTo(min) >= 0 && value.CompareTo(max) <= 0;
    }
}

// Usage
string email = "test@example.com";
Console.WriteLine(email.IsValidEmail());  // True

int age = 25;
Console.WriteLine(age.IsBetween(18, 65));  // True
```

### Null Handling Extensions

```csharp
public static class NullExtensions
{
    public static T OrDefault<T>(this T value, T defaultValue)
    {
        return value == null ? defaultValue : value;
    }

    public static string OrEmpty(this string str)
    {
        return str ?? string.Empty;
    }

    public static TResult IfNotNull<T, TResult>(this T obj,
        Func<T, TResult> func, TResult defaultValue = default(TResult))
    {
        return obj != null ? func(obj) : defaultValue;
    }

    public static void IfNotNull<T>(this T obj, Action<T> action)
    {
        if (obj != null)
        {
            action(obj);
        }
    }
}

// Usage
string name = null;
Console.WriteLine(name.OrEmpty());  // ""
Console.WriteLine(name.OrDefault("Unknown"));  // "Unknown"

Person person = GetPerson();
string email = person.IfNotNull(p => p.Email, "No email");

person.IfNotNull(p => Console.WriteLine($"Hello {p.Name}"));
```

### Conversion Extensions

```csharp
public static class ConversionExtensions
{
    public static int ToInt(this string str, int defaultValue = 0)
    {
        return int.TryParse(str, out int result) ? result : defaultValue;
    }

    public static double ToDouble(this string str, double defaultValue = 0)
    {
        return double.TryParse(str, out double result) ? result : defaultValue;
    }

    public static DateTime ToDateTime(this string str, DateTime defaultValue = default)
    {
        return DateTime.TryParse(str, out DateTime result) ? result : defaultValue;
    }

    public static T ToEnum<T>(this string str, T defaultValue = default) where T : struct
    {
        return Enum.TryParse<T>(str, true, out T result) ? result : defaultValue;
    }

    public static byte[] ToBytes(this string str)
    {
        return System.Text.Encoding.UTF8.GetBytes(str);
    }

    public static string FromBytes(this byte[] bytes)
    {
        return System.Text.Encoding.UTF8.GetString(bytes);
    }
}

// Usage
string numberStr = "42";
int number = numberStr.ToInt();  // 42

string invalidNumber = "abc";
int defaultNum = invalidNumber.ToInt(100);  // 100
```

## Your Tasks

### Task 1: String Extensions
Create string extension methods:
- `Truncate(maxLength)` - truncates with "..."
- `Capitalize()` - first letter uppercase
- `ToCamelCase()`, `ToPascalCase()`, `ToSnakeCase()`
- `RemoveWhitespace()`
- `ContainsAny(params string[])`
Test with various strings.

### Task 2: Number Extensions
Create numeric extension methods:
- `ToOrdinal()` - 1 -> "1st", 2 -> "2nd"
- `ToWords()` - 123 -> "one hundred twenty-three"
- `ToRoman()` - converts to Roman numerals
- `IsBetween(min, max)`
- `Clamp(min, max)`
Test with different numbers.

### Task 3: Collection Extensions
Create collection extension methods:
- `SecondOrDefault()`, `ThirdOrDefault()`
- `TakeLast(n)`
- `Without(item)` - returns collection without item
- `Duplicates()` - returns duplicate items
- `Median()`, `Mode()`
Test with various collections.

### Task 4: DateTime Extensions
Create DateTime extension methods:
- `IsToday()`, `IsTomorrow()`, `IsYesterday()`
- `NextWeekday()`, `PreviousWeekday()`
- `Quarter()` - returns quarter (1-4)
- `ToUnixTimestamp()`, `FromUnixTimestamp()`
- `BusinessDaysUntil(DateTime other)`
Test with various dates.

### Task 5: Validation Extensions
Create comprehensive validation extensions:
- String: `IsAlpha()`, `IsAlphaNumeric()`, `IsDigits()`
- `IsValidCreditCard()`, `IsValidPhoneNumber()`
- `IsStrongPassword()` - checks complexity
- `IsValidIPAddress()`
Test with valid and invalid inputs.

### Task 6: LINQ Extensions
Create advanced LINQ extensions:
- `Page(pageNumber, pageSize)`
- `ToObservableCollection()`
- `SelectMany<T, TResult>()` - flatten nested collections
- `Except(params T[])` - remove specific items
- `Intersect(params T[])` - common items
Test with complex queries.

### Task 7: File Path Extensions
Create path extension methods:
- `GetFileExtension()`, `ChangeExtension(newExt)`
- `GetFileNameWithoutPath()`
- `CombinePath(params string[])`
- `IsValidFileName()`, `IsValidPath()`
- `GetRelativePath(basePath)`
Test with various paths.

### Task 8: Comparison Extensions
Create comparison extensions:
- `IsIn(params T[])` - checks if value in list
- `IsNotIn(params T[])`
- `IsBetween(min, max, inclusive)`
- `EqualsAny(params T[])`
- `IsDefault()` - checks if default value
Test with different types.

### Task 9: JSON Extensions
Create JSON serialization extensions:
- `ToJson()` - serialize object to JSON string
- `FromJson<T>()` - deserialize JSON to object
- `ToPrettyJson()` - formatted JSON
- `IsValidJson()` - checks if valid JSON
Use System.Text.Json or Newtonsoft.Json.

### Task 10: Fluent Validation
Create fluent validation extensions:
- `IsRequired()`, `HasMinLength(n)`, `HasMaxLength(n)`
- `Matches(regex)`, `IsEmail()`, `IsUrl()`
- Chain multiple validations
- Return validation result with errors
Example: `value.IsRequired().HasMinLength(3).IsAlphaNumeric()`

### Task 11: Functional Extensions
Create functional programming extensions:
- `Apply<T, TResult>(Func<T, TResult>)` - applies function
- `Pipe<T, TResult>(Func<T, TResult>)` - chains functions
- `Tap(Action<T>)` - performs action, returns value
- `Match(Func whenTrue, Func whenFalse)` for bool
- `Select(Func when, Func other)` - conditional transform
Test with functional patterns.

### Task 12: Comprehensive Extension Library
Create a complete extension library with:
- String utilities (20+ methods)
- Collection utilities (15+ methods)
- DateTime utilities (15+ methods)
- Numeric utilities (10+ methods)
- Validation utilities (10+ methods)
- Conversion utilities (10+ methods)

Organize in separate static classes by category.
Create documentation for each method.
Write unit tests for all extensions.
Create usage examples document.

## Expected Output Examples

**Task 1:**
```
String Extensions Demo:

Original: "Hello World Programming"
Truncate(15): "Hello World..."
Capitalize: "Hello World Programming"
CamelCase: "helloWorldProgramming"
PascalCase: "HelloWorldProgramming"
SnakeCase: "hello_world_programming"
RemoveWhitespace: "HelloWorldProgramming"
ContainsAny("World", "Test"): True
```

**Task 2:**
```
Number Extensions Demo:

1.ToOrdinal(): "1st"
2.ToOrdinal(): "2nd"
3.ToOrdinal(): "3rd"
21.ToOrdinal(): "21st"

123.ToWords(): "one hundred twenty-three"

5.ToRoman(): "V"
1994.ToRoman(): "MCMXCIV"

25.IsBetween(20, 30): True
15.Clamp(20, 30): 20
```

**Task 4:**
```
DateTime Extensions Demo:

Date: 2025-10-02
IsWeekend: False
IsToday: True
Quarter: 4
NextWeekday: 2025-10-03
ToRelativeTime: "just now"
BusinessDaysUntil(2025-10-10): 6
```

**Task 10:**
```
Fluent Validation Demo:

Validating username: "ab"
Result: Invalid
Errors:
  - Must be at least 3 characters
  - Must be alphanumeric

Validating email: "invalid-email"
Result: Invalid
Errors:
  - Must be valid email format

Validating password: "Pass123!"
Result: Valid
```

## Tips
- Extension methods must be in static class
- First parameter must use `this` keyword
- Extension methods appear in IntelliSense
- Can chain multiple extension methods
- Don't overuse - keep extensions focused
- Use descriptive names
- Consider null checks in extensions
- Document your extension methods
- Group related extensions in same class
- Prefer extension methods over utility classes

## Common Mistakes

```csharp
// ❌ Non-static class
public class StringExtensions  // Must be static!
{
    public static string Reverse(this string str) { }
}

// ✅ Static class
public static class StringExtensions
{
    public static string Reverse(this string str) { }
}

// ❌ Missing 'this' keyword
public static string Reverse(string str)  // Not an extension!
{
}

// ✅ Use 'this' for first parameter
public static string Reverse(this string str)
{
}

// ❌ Not handling null
public static string Reverse(this string str)
{
    return new string(str.ToCharArray().Reverse().ToArray());
    // NullReferenceException if str is null!
}

// ✅ Handle null
public static string Reverse(this string str)
{
    if (str == null) return null;
    return new string(str.ToCharArray().Reverse().ToArray());
}

// ❌ Too specific extensions
public static bool IsJohn(this string name)  // Too specific!
{
    return name == "John";
}

// ✅ General purpose extensions
public static bool EqualsIgnoreCase(this string str, string other)
{
    return str.Equals(other, StringComparison.OrdinalIgnoreCase);
}

// ❌ Extension method in non-static class
public class MyClass
{
    public static void MyExtension(this string str)  // Error!
    {
    }
}

// ✅ Separate static class for extensions
public static class StringExtensions
{
    public static void MyExtension(this string str)
    {
    }
}
```

## Key Concepts
- **Extension Method**: Method that extends existing type
- **Static Class**: Class containing only static members
- **this Parameter**: First parameter specifying extended type
- **Method Chaining**: Calling multiple methods in sequence
- **IntelliSense**: IDE feature showing available methods
- **Fluent Interface**: Method chaining for readability
- **LINQ-style**: Extensions that work with IEnumerable
- **Null Safety**: Handling null values in extensions

## Next Steps
Move on to `10-Dependency-Injection` to learn about IoC containers and DI patterns!
