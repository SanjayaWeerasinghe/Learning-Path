# Interfaces - Contracts and Abstraction

## What You'll Learn
- Understanding interfaces and their purpose
- Implementing interfaces
- Multiple interface implementation
- Default methods in interfaces
- Interface vs abstract classes
- Real-world interface examples

## Concept Overview

An interface is a contract that defines what a class must do, but not how it does it. Classes can implement multiple interfaces.

### 1. Basic Interface

```java
interface Animal {
    void eat();  // Abstract method (no body)
    void sleep();
}

class Dog implements Animal {
    @Override
    public void eat() {
        System.out.println("Dog is eating");
    }

    @Override
    public void sleep() {
        System.out.println("Dog is sleeping");
    }
}
```

### 2. Multiple Interface Implementation

```java
interface Swimmable {
    void swim();
}

interface Flyable {
    void fly();
}

class Duck implements Swimmable, Flyable {
    public void swim() {
        System.out.println("Duck is swimming");
    }

    public void fly() {
        System.out.println("Duck is flying");
    }
}
```

### 3. Interface with Constants

```java
interface MathConstants {
    double PI = 3.14159;  // public static final by default
    double E = 2.71828;
}
```

### 4. Default Methods (Java 8+)

```java
interface Drawable {
    void draw();

    default void print() {
        System.out.println("Printing...");
    }
}
```

## Your Tasks

Create files demonstrating interfaces for various scenarios. Here are comprehensive examples:

### Task 1-12: Interface Examples

**Example: Payment System**
```java
interface Payment {
    void processPayment(double amount);
    boolean validatePayment();
}

class CreditCard implements Payment {
    private String cardNumber;

    public CreditCard(String cardNumber) {
        this.cardNumber = cardNumber;
    }

    @Override
    public void processPayment(double amount) {
        System.out.println("Processing credit card payment: $" + amount);
    }

    @Override
    public boolean validatePayment() {
        return cardNumber != null && cardNumber.length() == 16;
    }
}

class PayPal implements Payment {
    private String email;

    public PayPal(String email) {
        this.email = email;
    }

    @Override
    public void processPayment(double amount) {
        System.out.println("Processing PayPal payment: $" + amount);
    }

    @Override
    public boolean validatePayment() {
        return email != null && email.contains("@");
    }
}
```

## Tips and Common Mistakes

### Tips:
- **Use interfaces for "can-do" relationships**: Dog CAN-DO swim
- **All methods are public abstract** by default
- **Use interfaces for polymorphism**: Reference type = interface
- **Implement multiple interfaces**: Achieve multiple inheritance
- **Prefer interfaces over abstract classes**: More flexible

### Common Mistakes:

1. **Not implementing all methods**
   ```java
   class MyClass implements MyInterface {
       // ❌ Must implement all interface methods
   }
   ```

2. **Wrong access modifier**
   ```java
   class MyClass implements MyInterface {
       void method() { }  // ❌ Must be public
       public void method() { }  // ✅ Correct
   }
   ```

## Next Steps

Move on to `07-Exception-Handling` to learn about error management!
