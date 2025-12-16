# Inheritance - Code Reuse and Hierarchies

## What You'll Learn
- Understanding inheritance and its benefits
- Creating parent and child classes
- The `extends` keyword
- Method overriding
- The `super` keyword
- Access modifiers (public, private, protected)
- The Object class

## Concept Overview

Inheritance allows a class to inherit properties and methods from another class, promoting code reuse and establishing relationships between classes.

### 1. Basic Inheritance

```java
// Parent class (superclass)
class Animal {
    String name;

    void eat() {
        System.out.println(name + " is eating");
    }
}

// Child class (subclass)
class Dog extends Animal {
    void bark() {
        System.out.println(name + " is barking");
    }
}

// Usage
Dog dog = new Dog();
dog.name = "Buddy";
dog.eat();   // Inherited from Animal
dog.bark();  // Defined in Dog
```

### 2. Constructor Inheritance with super()

```java
class Vehicle {
    String brand;

    Vehicle(String brand) {
        this.brand = brand;
    }
}

class Car extends Vehicle {
    int year;

    Car(String brand, int year) {
        super(brand);  // Call parent constructor
        this.year = year;
    }
}
```

### 3. Method Overriding

```java
class Animal {
    void makeSound() {
        System.out.println("Animal makes a sound");
    }
}

class Dog extends Animal {
    @Override
    void makeSound() {
        System.out.println("Dog barks");
    }
}
```

### 4. Protected Access Modifier

```java
class Parent {
    protected int value;  // Accessible in child classes

    protected void display() {
        System.out.println("Value: " + value);
    }
}

class Child extends Parent {
    void setValue(int val) {
        value = val;  // Can access protected member
    }
}
```

## Your Tasks

### Task 1: Basic Inheritance
Create a file named `AnimalInheritance.java`.

**Example code:**
```java
class Animal {
    String name;
    int age;

    void eat() {
        System.out.println(name + " is eating");
    }

    void sleep() {
        System.out.println(name + " is sleeping");
    }
}

class Dog extends Animal {
    String breed;

    void bark() {
        System.out.println(name + " says: Woof! Woof!");
    }
}

class Cat extends Animal {
    void meow() {
        System.out.println(name + " says: Meow!");
    }
}

public class AnimalInheritance {
    public static void main(String[] args) {
        Dog dog = new Dog();
        dog.name = "Buddy";
        dog.age = 3;
        dog.breed = "Golden Retriever";
        dog.eat();
        dog.bark();

        System.out.println();

        Cat cat = new Cat();
        cat.name = "Whiskers";
        cat.age = 2;
        cat.eat();
        cat.meow();
    }
}
```

**Expected Output:**
```
Buddy is eating
Buddy says: Woof! Woof!

Whiskers is eating
Whiskers says: Meow!
```

### Task 2: Constructor with super()
Create a file named `VehicleInheritance.java`.

**Example code:**
```java
class Vehicle {
    String brand;
    int year;

    Vehicle(String brand, int year) {
        this.brand = brand;
        this.year = year;
    }

    void displayInfo() {
        System.out.println("Brand: " + brand);
        System.out.println("Year: " + year);
    }
}

class Car extends Vehicle {
    int doors;

    Car(String brand, int year, int doors) {
        super(brand, year);
        this.doors = doors;
    }

    @Override
    void displayInfo() {
        super.displayInfo();
        System.out.println("Doors: " + doors);
    }
}

class Motorcycle extends Vehicle {
    boolean hasSidecar;

    Motorcycle(String brand, int year, boolean hasSidecar) {
        super(brand, year);
        this.hasSidecar = hasSidecar;
    }

    @Override
    void displayInfo() {
        super.displayInfo();
        System.out.println("Has Sidecar: " + hasSidecar);
    }
}

public class VehicleInheritance {
    public static void main(String[] args) {
        Car car = new Car("Toyota", 2022, 4);
        System.out.println("Car Information:");
        car.displayInfo();

        System.out.println("\nMotorcycle Information:");
        Motorcycle bike = new Motorcycle("Harley", 2021, false);
        bike.displayInfo();
    }
}
```

**Expected Output:**
```
Car Information:
Brand: Toyota
Year: 2022
Doors: 4

Motorcycle Information:
Brand: Harley
Year: 2021
Has Sidecar: false
```

### Task 3-12: Additional Practice Tasks

Create inheritance hierarchies for:
- **Task 3**: Shape hierarchy (Shape → Circle, Rectangle)
- **Task 4**: Employee hierarchy (Employee → Manager, Developer)
- **Task 5**: Bank account types (Account → SavingsAccount, CheckingAccount)
- **Task 6**: Person hierarchy (Person → Student, Teacher)
- **Task 7**: Electronic devices (Device → Phone, Laptop)
- **Task 8**: Game characters (Character → Warrior, Mage)
- **Task 9**: Media types (Media → Book, Movie, Music)
- **Task 10**: Food categories (Food → Fruit, Vegetable)
- **Task 11**: Building types (Building → House, Apartment)
- **Task 12**: Payment methods (Payment → CreditCard, Cash)

## Tips and Common Mistakes

### Tips:
- **Use inheritance for "is-a" relationships**: Dog IS-A Animal
- **Call super() first** in child constructor
- **Use @Override annotation**: Helps catch errors
- **Don't break encapsulation**: Respect parent's private fields
- **Favor composition over inheritance**: When relationship is not "is-a"

### Common Mistakes:

1. **Forgetting super()**
   ```java
   class Child extends Parent {
       Child() {
           // ❌ Parent constructor not called
       }
   }

   class Child extends Parent {
       Child() {
           super();  // ✅ Correct
       }
   }
   ```

2. **Accessing private parent fields**
   ```java
   class Parent {
       private int value;
   }
   class Child extends Parent {
       void set() {
           value = 10;  // ❌ Cannot access private field
       }
   }
   ```

## Next Steps

Move on to `06-Interfaces` to learn about contracts and multiple inheritance!
