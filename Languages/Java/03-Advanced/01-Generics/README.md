# Generics - Type-Safe Programming

## What You'll Learn
- Understanding generics and their benefits
- Creating generic classes
- Generic methods
- Bounded type parameters
- Wildcards (?, extends, super)
- Type erasure

## Concept Overview

Generics enable types (classes and interfaces) to be parameters when defining classes, interfaces, and methods, providing type safety and eliminating the need for casting.

### 1. Generic Class

```java
// Generic class with type parameter T
class Box<T> {
    private T value;

    public void set(T value) {
        this.value = value;
    }

    public T get() {
        return value;
    }
}

// Usage
Box<Integer> intBox = new Box<>();
intBox.set(100);
int value = intBox.get();  // No casting needed

Box<String> strBox = new Box<>();
strBox.set("Hello");
String str = strBox.get();
```

### 2. Generic Methods

```java
public class Utils {
    // Generic method
    public static <T> void printArray(T[] array) {
        for (T element : array) {
            System.out.print(element + " ");
        }
        System.out.println();
    }
}

// Usage
Integer[] intArray = {1, 2, 3, 4, 5};
String[] strArray = {"A", "B", "C"};
Utils.printArray(intArray);
Utils.printArray(strArray);
```

### 3. Bounded Type Parameters

```java
// T must extend Number
class Calculator<T extends Number> {
    public double add(T a, T b) {
        return a.doubleValue() + b.doubleValue();
    }
}

// Usage
Calculator<Integer> intCalc = new Calculator<>();
Calculator<Double> doubleCalc = new Calculator<>();
// Calculator<String> strCalc = new Calculator<>();  // Error!
```

### 4. Wildcards

```java
// Upper bounded wildcard (? extends Type)
public static double sum(List<? extends Number> list) {
    double sum = 0;
    for (Number num : list) {
        sum += num.doubleValue();
    }
    return sum;
}

// Lower bounded wildcard (? super Type)
public static void addIntegers(List<? super Integer> list) {
    list.add(10);
    list.add(20);
}

// Unbounded wildcard (?)
public static void printList(List<?> list) {
    for (Object obj : list) {
        System.out.println(obj);
    }
}
```

### 5. Multiple Type Parameters

```java
class Pair<K, V> {
    private K key;
    private V value;

    public Pair(K key, V value) {
        this.key = key;
        this.value = value;
    }

    public K getKey() { return key; }
    public V getValue() { return value; }
}

// Usage
Pair<String, Integer> pair = new Pair<>("Age", 25);
```

## Your Tasks

### Task 1: Generic Box Class
Create a file named `GenericBox.java`.

**Example code:**
```java
class Box<T> {
    private T item;

    public void setItem(T item) {
        this.item = item;
    }

    public T getItem() {
        return item;
    }

    public void displayInfo() {
        System.out.println("Item: " + item);
        System.out.println("Type: " + item.getClass().getSimpleName());
    }
}

public class GenericBox {
    public static void main(String[] args) {
        Box<Integer> intBox = new Box<>();
        intBox.setItem(100);
        System.out.println("Integer Box:");
        intBox.displayInfo();

        System.out.println();

        Box<String> strBox = new Box<>();
        strBox.setItem("Hello Generics");
        System.out.println("String Box:");
        strBox.displayInfo();

        System.out.println();

        Box<Double> doubleBox = new Box<>();
        doubleBox.setItem(3.14159);
        System.out.println("Double Box:");
        doubleBox.displayInfo();
    }
}
```

**Expected Output:**
```
Integer Box:
Item: 100
Type: Integer

String Box:
Item: Hello Generics
Type: String

Double Box:
Item: 3.14159
Type: Double
```

### Task 2-12: Additional Generic Tasks

Practice with:
- **Task 2**: Generic method to find maximum element
- **Task 3**: Generic Pair class with two type parameters
- **Task 4**: Generic Stack implementation
- **Task 5**: Generic method to swap array elements
- **Task 6**: Bounded type parameters with Number
- **Task 7**: Generic ArrayList wrapper
- **Task 8**: Generic method to convert array to list
- **Task 9**: Multiple type parameters in methods
- **Task 10**: Generic interface implementation
- **Task 11**: Wildcard usage examples
- **Task 12**: Generic cache class

## Tips and Common Mistakes

### Tips:
- **Use meaningful type parameter names**: `T` for type, `K` for key, `V` for value
- **Prefer generics over raw types**: Type safety
- **Use bounded types** when you need specific methods
- **Wildcards for flexibility**: When exact type doesn't matter
- **Cannot instantiate generic types**: `new T()` is not allowed

### Common Mistakes:

1. **Using raw types**
   ```java
   List list = new ArrayList();  // ❌ Raw type
   List<String> list = new ArrayList<>();  // ✅ Generic
   ```

2. **Cannot create generic arrays**
   ```java
   T[] array = new T[10];  // ❌ Error
   T[] array = (T[]) new Object[10];  // ✅ Workaround (with warning)
   ```

3. **Static context with type parameters**
   ```java
   class MyClass<T> {
       static T value;  // ❌ Cannot use T in static context
   }
   ```

## Next Steps

Move on to `02-Streams-Lambda` to learn about functional programming!
