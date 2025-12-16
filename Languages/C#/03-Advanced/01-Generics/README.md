# Generics

## What You'll Learn
- What generics are and why they're useful
- Generic classes and methods
- Generic constraints
- Multiple type parameters
- Generic interfaces
- Variance (covariance and contravariance)
- Common generic types (List<T>, Dictionary<TKey, TValue>)
- Performance benefits of generics

## Concept Overview

Generics allow you to write flexible, reusable code that works with any data type while maintaining type safety. Instead of writing separate classes for each type, you write one generic class that works with all types.

### Generic Classes

```csharp
// Non-generic approach - need separate classes
class IntBox
{
    public int Value { get; set; }
}

class StringBox
{
    public string Value { get; set; }
}

// Generic approach - one class for all types
class Box<T>
{
    public T Value { get; set; }

    public Box(T value)
    {
        Value = value;
    }

    public void Display()
    {
        Console.WriteLine($"Box contains: {Value}");
    }
}

// Usage
Box<int> intBox = new Box<int>(42);
intBox.Display();  // Box contains: 42

Box<string> stringBox = new Box<string>("Hello");
stringBox.Display();  // Box contains: Hello

Box<double> doubleBox = new Box<double>(3.14);
doubleBox.Display();  // Box contains: 3.14
```

### Generic Methods

```csharp
class Utilities
{
    // Generic method
    public static void Swap<T>(ref T a, ref T b)
    {
        T temp = a;
        a = b;
        b = temp;
    }

    public static T GetMax<T>(T a, T b) where T : IComparable<T>
    {
        return a.CompareTo(b) > 0 ? a : b;
    }

    public static void PrintArray<T>(T[] array)
    {
        foreach (T item in array)
        {
            Console.Write(item + " ");
        }
        Console.WriteLine();
    }
}

// Usage
int x = 5, y = 10;
Utilities.Swap(ref x, ref y);  // Type inference
Console.WriteLine($"x: {x}, y: {y}");  // x: 10, y: 5

string s1 = "Hello", s2 = "World";
Utilities.Swap<string>(ref s1, ref s2);  // Explicit type
Console.WriteLine($"s1: {s1}, s2: {s2}");  // s1: World, s2: Hello

int max = Utilities.GetMax(15, 20);
Console.WriteLine($"Max: {max}");  // Max: 20
```

### Generic Constraints

```csharp
// where T : struct - T must be a value type
class StructContainer<T> where T : struct
{
    public T Value { get; set; }
}

// where T : class - T must be a reference type
class ClassContainer<T> where T : class
{
    public T Value { get; set; }
}

// where T : new() - T must have parameterless constructor
class Factory<T> where T : new()
{
    public T CreateInstance()
    {
        return new T();
    }
}

// where T : BaseClass - T must inherit from BaseClass
class Repository<T> where T : Entity
{
    public void Save(T entity)
    {
        Console.WriteLine($"Saving {entity.GetType().Name}");
    }
}

// where T : IInterface - T must implement interface
class Sorter<T> where T : IComparable<T>
{
    public void Sort(List<T> items)
    {
        items.Sort();
    }
}

// Multiple constraints
class MultiConstraint<T> where T : class, IDisposable, new()
{
    public T CreateAndUse()
    {
        using (T instance = new T())
        {
            return instance;
        }
    }
}
```

### Multiple Type Parameters

```csharp
class Pair<TFirst, TSecond>
{
    public TFirst First { get; set; }
    public TSecond Second { get; set; }

    public Pair(TFirst first, TSecond second)
    {
        First = first;
        Second = second;
    }

    public void Display()
    {
        Console.WriteLine($"First: {First}, Second: {Second}");
    }
}

// Usage
Pair<int, string> pair1 = new Pair<int, string>(1, "One");
pair1.Display();  // First: 1, Second: One

Pair<string, double> pair2 = new Pair<string, double>("Pi", 3.14);
pair2.Display();  // First: Pi, Second: 3.14
```

### Generic Interfaces

```csharp
interface IRepository<T>
{
    void Add(T item);
    void Remove(T item);
    T GetById(int id);
    IEnumerable<T> GetAll();
}

class Product
{
    public int Id { get; set; }
    public string Name { get; set; }
    public double Price { get; set; }
}

class ProductRepository : IRepository<Product>
{
    private List<Product> products = new List<Product>();

    public void Add(Product item)
    {
        products.Add(item);
    }

    public void Remove(Product item)
    {
        products.Remove(item);
    }

    public Product GetById(int id)
    {
        return products.FirstOrDefault(p => p.Id == id);
    }

    public IEnumerable<Product> GetAll()
    {
        return products;
    }
}
```

### Generic Collections

```csharp
// List<T>
List<int> numbers = new List<int> { 1, 2, 3, 4, 5 };
numbers.Add(6);

// Dictionary<TKey, TValue>
Dictionary<string, int> ages = new Dictionary<string, int>
{
    { "Alice", 25 },
    { "Bob", 30 },
    { "Charlie", 35 }
};

// Queue<T>
Queue<string> queue = new Queue<string>();
queue.Enqueue("First");
queue.Enqueue("Second");
string first = queue.Dequeue();

// Stack<T>
Stack<int> stack = new Stack<int>();
stack.Push(1);
stack.Push(2);
int top = stack.Pop();

// HashSet<T>
HashSet<string> uniqueNames = new HashSet<string> { "Alice", "Bob", "Alice" };
// Contains only: "Alice", "Bob"
```

### Generic Stack Implementation

```csharp
class CustomStack<T>
{
    private List<T> items = new List<T>();

    public int Count => items.Count;

    public void Push(T item)
    {
        items.Add(item);
    }

    public T Pop()
    {
        if (items.Count == 0)
            throw new InvalidOperationException("Stack is empty");

        T item = items[items.Count - 1];
        items.RemoveAt(items.Count - 1);
        return item;
    }

    public T Peek()
    {
        if (items.Count == 0)
            throw new InvalidOperationException("Stack is empty");

        return items[items.Count - 1];
    }

    public bool IsEmpty()
    {
        return items.Count == 0;
    }

    public void Clear()
    {
        items.Clear();
    }
}
```

### Covariance and Contravariance

```csharp
// Covariance (out) - reading from generic type
interface IProducer<out T>
{
    T Produce();
}

class AnimalProducer : IProducer<Animal>
{
    public Animal Produce() => new Animal();
}

class DogProducer : IProducer<Dog>
{
    public Dog Produce() => new Dog();
}

// Covariance allows this:
IProducer<Animal> producer = new DogProducer();  // Dog is more specific than Animal

// Contravariance (in) - writing to generic type
interface IConsumer<in T>
{
    void Consume(T item);
}

class AnimalConsumer : IConsumer<Animal>
{
    public void Consume(Animal animal) => Console.WriteLine("Consuming animal");
}

// Contravariance allows this:
IConsumer<Dog> consumer = new AnimalConsumer();  // Animal is more general than Dog
```

## Your Tasks

### Task 1: Generic Box Class
Create a generic `Box<T>` class with:
- Property: Value of type T
- Constructor that takes T value
- Methods: GetValue(), SetValue(T value), IsEmpty()
- Method: Display() shows the value
Test with int, string, double, and custom class.

### Task 2: Generic Pair Class
Create a generic `Pair<T1, T2>` class with:
- Properties: First (T1), Second (T2)
- Constructor taking both values
- Method: Swap() swaps first and second
- Method: Display() shows both values
- Override ToString()
Test with various type combinations.

### Task 3: Generic Stack
Implement a generic `Stack<T>` class with:
- Methods: Push(T item), Pop(), Peek(), Clear()
- Property: Count
- Property: IsEmpty
- Method: ToArray() returns T[]
Test with different data types.

### Task 4: Generic Queue
Implement a generic `Queue<T>` class with:
- Methods: Enqueue(T item), Dequeue(), Peek()
- Property: Count
- Method: Contains(T item)
- Method: ToList() returns List<T>
Test the queue with various types.

### Task 5: Generic Repository
Create a generic `Repository<T>` class with:
- Private List<T> storage
- Methods: Add(T item), Remove(T item), GetAll()
- Method: FindBy(Predicate<T> predicate)
- Method: Update(T oldItem, T newItem)
- Property: Count
Test with Product and Customer classes.

### Task 6: Generic Min/Max Finder
Create a class `MinMaxFinder<T>` with constraint `where T : IComparable<T>`:
- Method: FindMin(T[] array)
- Method: FindMax(T[] array)
- Method: FindMinMax(T[] array) returns Tuple<T, T>
Test with int[], double[], string[], and DateTime[].

### Task 7: Generic Dictionary Wrapper
Create a generic `Cache<TKey, TValue>` class:
- Uses Dictionary<TKey, TValue> internally
- Methods: Add(TKey, TValue), Get(TKey), Remove(TKey)
- Method: ContainsKey(TKey)
- Property: Count, Keys
- Method: Clear()
- Handle key not found gracefully
Test with different key-value combinations.

### Task 8: Generic Linked List Node
Create generic classes:
- `Node<T>`: Value (T), Next (Node<T>)
- `LinkedList<T>`: AddFirst(T), AddLast(T), Remove(T)
- Methods: Find(T value), Count, Display()
- Method: ToArray() returns T[]
Test with different data types.

### Task 9: Generic Comparable Class
Create a generic `ComparableBox<T>` class where T : IComparable<T>:
- Property: Value of type T
- Method: IsGreaterThan(ComparableBox<T> other)
- Method: IsLessThan(ComparableBox<T> other)
- Method: CompareTo(ComparableBox<T> other)
- Implement IComparable<ComparableBox<T>>
Test with numeric and string types.

### Task 10: Generic Factory
Create a generic `Factory<T>` class with constraint `where T : new()`:
- Method: Create() returns new instance of T
- Method: CreateMultiple(int count) returns List<T>
- Property: TotalCreated (static counter)
Test with various classes that have parameterless constructors.

### Task 11: Generic Converter
Create a generic `Converter<TInput, TOutput>` class:
- Delegate: Func<TInput, TOutput> conversion function
- Constructor takes the conversion function
- Method: Convert(TInput input) returns TOutput
- Method: ConvertAll(List<TInput> inputs) returns List<TOutput>
Test converting: int to string, string to int, Celsius to Fahrenheit.

### Task 12: Generic Data Structure - Binary Tree
Create generic classes:
- `TreeNode<T>`: Value (T), Left (TreeNode<T>), Right (TreeNode<T>)
- `BinarySearchTree<T>` where T : IComparable<T>:
  - Methods: Insert(T value), Search(T value), Delete(T value)
  - Method: InOrderTraversal() returns List<T>
  - Property: Count
Test with integers and strings.

## Expected Output Examples

**Task 1:**
```
Integer Box: 42
String Box: Hello World
Double Box: 3.14159

Product Box:
Name: Laptop
Price: $999.99
```

**Task 3:**
```
Stack Test:

Pushing: 1, 2, 3, 4, 5
Stack count: 5

Peek: 5
Popping: 5
Stack count: 4

Remaining items: 4, 3, 2, 1
```

**Task 5:**
```
Product Repository:

Added: Laptop ($999.99)
Added: Mouse ($25.00)
Added: Keyboard ($75.00)

All Products:
1. Laptop - $999.99
2. Mouse - $25.00
3. Keyboard - $75.00

Finding products over $50:
1. Laptop - $999.99
2. Keyboard - $75.00

Total products: 3
```

**Task 6:**
```
Array: [5, 2, 8, 1, 9, 3]
Min: 1
Max: 9

String Array: ["apple", "zebra", "banana", "mango"]
Min: apple
Max: zebra

DateTime Array:
Min: 2023-01-15
Max: 2024-12-31
```

**Task 12:**
```
Binary Search Tree:

Inserting: 5, 3, 7, 1, 4, 6, 9

In-Order Traversal: 1, 3, 4, 5, 6, 7, 9

Searching for 4: Found
Searching for 10: Not Found

Deleting 3...
In-Order Traversal: 1, 4, 5, 6, 7, 9
```

## Tips
- Use generics to write reusable, type-safe code
- Use constraints to restrict type parameters when needed
- Generic methods provide type inference for convenience
- Use `List<T>` instead of ArrayList for better performance
- Use `Dictionary<TKey, TValue>` instead of Hashtable
- Constraints can combine: `where T : class, IDisposable, new()`
- Use `default(T)` to get default value for generic type
- Generics avoid boxing/unboxing, improving performance
- Design generic types to be as flexible as possible

## Common Mistakes

```csharp
// ❌ Not using constraints when needed
class Sorter<T>
{
    public T GetMax(T a, T b)
    {
        return a > b ? a : b;  // ❌ Error! Can't use > on generic type
    }
}

// ✅ Use appropriate constraint
class Sorter<T> where T : IComparable<T>
{
    public T GetMax(T a, T b)
    {
        return a.CompareTo(b) > 0 ? a : b;
    }
}

// ❌ Trying to create instance without constraint
class Factory<T>
{
    public T Create()
    {
        return new T();  // ❌ Error! T might not have constructor
    }
}

// ✅ Use new() constraint
class Factory<T> where T : new()
{
    public T Create()
    {
        return new T();
    }
}

// ❌ Using non-generic collections
ArrayList list = new ArrayList();
list.Add(1);
list.Add("string");  // Different types!
int value = (int)list[0];  // Need casting, boxing

// ✅ Use generic collections
List<int> list = new List<int>();
list.Add(1);
// list.Add("string");  // ❌ Compile error - type safe!
int value = list[0];  // No casting needed

// ❌ Not handling null for reference types
class Container<T>
{
    private T value;

    public void Process()
    {
        Console.WriteLine(value.ToString());  // NullReferenceException if T is class!
    }
}

// ✅ Check for null or use constraint
class Container<T> where T : class
{
    private T value;

    public void Process()
    {
        if (value != null)
            Console.WriteLine(value.ToString());
    }
}

// ❌ Comparing generic values incorrectly
class Comparer<T>
{
    public bool AreEqual(T a, T b)
    {
        return a == b;  // May not work as expected for reference types!
    }
}

// ✅ Use EqualityComparer<T>
class Comparer<T>
{
    public bool AreEqual(T a, T b)
    {
        return EqualityComparer<T>.Default.Equals(a, b);
    }
}
```

## Key Concepts
- **Generics**: Feature allowing types to be parameters
- **Type Parameter**: Placeholder for specific type (T, TKey, TValue)
- **Generic Class**: Class that works with any type
- **Generic Method**: Method with generic type parameters
- **Constraint**: Restriction on what types can be used
- **Type Inference**: Compiler determines type from context
- **Covariance**: Treating generic type as its base type (out)
- **Contravariance**: Treating generic type as its derived type (in)
- **Type Safety**: Compile-time checking of types

## Next Steps
Move on to `02-Delegates-Events` to learn about function pointers and event-driven programming!
