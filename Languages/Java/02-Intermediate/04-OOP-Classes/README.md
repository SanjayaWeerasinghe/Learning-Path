# Object-Oriented Programming (OOP) - Classes and Objects

## What You'll Learn
- Understanding classes and objects
- Creating and using classes
- Instance variables and methods
- Constructors
- The `this` keyword
- Encapsulation with private and public
- Getters and setters

## Concept Overview

Object-Oriented Programming (OOP) is a programming paradigm based on the concept of "objects" which contain data (fields) and code (methods).

### 1. Class and Object Basics

```java
// Class definition
class Dog {
    // Instance variables (attributes)
    String name;
    int age;
    String breed;

    // Instance method
    void bark() {
        System.out.println(name + " says: Woof!");
    }
}

// Creating and using objects
Dog myDog = new Dog();
myDog.name = "Buddy";
myDog.age = 3;
myDog.bark();  // Output: Buddy says: Woof!
```

### 2. Constructor

```java
class Person {
    String name;
    int age;

    // Constructor
    Person(String name, int age) {
        this.name = name;
        this.age = age;
    }

    void introduce() {
        System.out.println("Hi, I'm " + name + ", " + age + " years old");
    }
}

// Using constructor
Person person = new Person("John", 25);
person.introduce();
```

### 3. Encapsulation (Private fields with getters/setters)

```java
class BankAccount {
    private double balance;  // Private field

    // Constructor
    public BankAccount(double initialBalance) {
        this.balance = initialBalance;
    }

    // Getter
    public double getBalance() {
        return balance;
    }

    // Setter with validation
    public void deposit(double amount) {
        if (amount > 0) {
            balance += amount;
        }
    }
}
```

### 4. Multiple Constructors (Constructor Overloading)

```java
class Rectangle {
    double width;
    double height;

    // Default constructor
    Rectangle() {
        this.width = 1.0;
        this.height = 1.0;
    }

    // Parameterized constructor
    Rectangle(double width, double height) {
        this.width = width;
        this.height = height;
    }

    double getArea() {
        return width * height;
    }
}
```

## Your Tasks

### Task 1: Basic Class and Object
Create a file named `Car.java` with a simple Car class.

**Example code:**
```java
class Car {
    String brand;
    String model;
    int year;

    void displayInfo() {
        System.out.println("Brand: " + brand);
        System.out.println("Model: " + model);
        System.out.println("Year: " + year);
    }
}

public class CarDemo {
    public static void main(String[] args) {
        Car car1 = new Car();
        car1.brand = "Toyota";
        car1.model = "Camry";
        car1.year = 2022;

        System.out.println("Car 1 Information:");
        car1.displayInfo();
    }
}
```

**Expected Output:**
```
Car 1 Information:
Brand: Toyota
Model: Camry
Year: 2022
```

### Task 2: Constructor
Create a file named `Student.java` with a constructor.

**Example code:**
```java
class Student {
    String name;
    int age;
    int grade;

    // Constructor
    Student(String name, int age, int grade) {
        this.name = name;
        this.age = age;
        this.grade = grade;
    }

    void displayInfo() {
        System.out.println("Name: " + name);
        System.out.println("Age: " + age);
        System.out.println("Grade: " + grade);
    }
}

public class StudentDemo {
    public static void main(String[] args) {
        Student student1 = new Student("Alice", 20, 12);
        Student student2 = new Student("Bob", 19, 11);

        System.out.println("Student 1:");
        student1.displayInfo();

        System.out.println("\nStudent 2:");
        student2.displayInfo();
    }
}
```

**Expected Output:**
```
Student 1:
Name: Alice
Age: 20
Grade: 12

Student 2:
Name: Bob
Age: 19
Grade: 11
```

### Task 3: Multiple Constructors
Create a file named `Book.java` with constructor overloading.

**Example code:**
```java
class Book {
    String title;
    String author;
    double price;

    // Constructor with all parameters
    Book(String title, String author, double price) {
        this.title = title;
        this.author = author;
        this.price = price;
    }

    // Constructor with title and author only
    Book(String title, String author) {
        this.title = title;
        this.author = author;
        this.price = 0.0;
    }

    void displayInfo() {
        System.out.println("Title: " + title);
        System.out.println("Author: " + author);
        System.out.println("Price: $" + price);
    }
}

public class BookDemo {
    public static void main(String[] args) {
        Book book1 = new Book("Java Programming", "John Doe", 49.99);
        Book book2 = new Book("Python Basics", "Jane Smith");

        System.out.println("Book 1:");
        book1.displayInfo();

        System.out.println("\nBook 2:");
        book2.displayInfo();
    }
}
```

**Expected Output:**
```
Book 1:
Title: Java Programming
Author: John Doe
Price: $49.99

Book 2:
Title: Python Basics
Author: Jane Smith
Price: $0.0
```

### Task 4: Encapsulation with Getters and Setters
Create a file named `BankAccount.java` with private fields and getters/setters.

**Example code:**
```java
class BankAccount {
    private String accountNumber;
    private String holderName;
    private double balance;

    public BankAccount(String accountNumber, String holderName, double initialBalance) {
        this.accountNumber = accountNumber;
        this.holderName = holderName;
        this.balance = initialBalance;
    }

    // Getters
    public String getAccountNumber() {
        return accountNumber;
    }

    public String getHolderName() {
        return holderName;
    }

    public double getBalance() {
        return balance;
    }

    // Methods to modify balance
    public void deposit(double amount) {
        if (amount > 0) {
            balance += amount;
            System.out.println("Deposited: $" + amount);
        } else {
            System.out.println("Invalid deposit amount");
        }
    }

    public void withdraw(double amount) {
        if (amount > 0 && amount <= balance) {
            balance -= amount;
            System.out.println("Withdrawn: $" + amount);
        } else {
            System.out.println("Invalid or insufficient funds");
        }
    }

    public void displayInfo() {
        System.out.println("Account: " + accountNumber);
        System.out.println("Holder: " + holderName);
        System.out.println("Balance: $" + balance);
    }
}

public class BankAccountDemo {
    public static void main(String[] args) {
        BankAccount account = new BankAccount("12345", "John Doe", 1000.0);

        account.displayInfo();
        System.out.println();

        account.deposit(500);
        account.withdraw(200);
        System.out.println();

        account.displayInfo();
    }
}
```

**Expected Output:**
```
Account: 12345
Holder: John Doe
Balance: $1000.0

Deposited: $500.0
Withdrawn: $200.0

Account: 12345
Holder: John Doe
Balance: $1300.0
```

### Task 5: Rectangle Class
Create a file named `Rectangle.java` with area and perimeter calculations.

**Example code:**
```java
class Rectangle {
    private double length;
    private double width;

    public Rectangle(double length, double width) {
        this.length = length;
        this.width = width;
    }

    public double getArea() {
        return length * width;
    }

    public double getPerimeter() {
        return 2 * (length + width);
    }

    public void displayInfo() {
        System.out.println("Length: " + length);
        System.out.println("Width: " + width);
        System.out.println("Area: " + getArea());
        System.out.println("Perimeter: " + getPerimeter());
    }
}

public class RectangleDemo {
    public static void main(String[] args) {
        Rectangle rect1 = new Rectangle(10, 5);
        Rectangle rect2 = new Rectangle(7.5, 3.5);

        System.out.println("Rectangle 1:");
        rect1.displayInfo();

        System.out.println("\nRectangle 2:");
        rect2.displayInfo();
    }
}
```

**Expected Output:**
```
Rectangle 1:
Length: 10.0
Width: 5.0
Area: 50.0
Perimeter: 30.0

Rectangle 2:
Length: 7.5
Width: 3.5
Area: 26.25
Perimeter: 22.0
```

### Task 6-12: Additional Practice Tasks

Continue practicing by creating classes for:
- **Task 6**: Circle (with radius, area, circumference)
- **Task 7**: Employee (with name, ID, salary, bonus calculation)
- **Task 8**: Product (with name, price, quantity, total value)
- **Task 9**: Counter (with increment, decrement, reset methods)
- **Task 10**: Temperature (with Celsius, conversion methods)
- **Task 11**: Person (with name, age, validation)
- **Task 12**: ShoppingCart (with items list, total calculation)

## Tips and Common Mistakes

### Tips:
- **Use meaningful class names**: PascalCase (e.g., BankAccount)
- **Make fields private**: Protect data with encapsulation
- **Use constructors**: Initialize objects properly
- **The `this` keyword**: Distinguish between parameters and instance variables
- **One class, one responsibility**: Keep classes focused

### Common Mistakes:

1. **Not using `this` keyword**
   ```java
   class Person {
       String name;
       Person(String name) {
           name = name;  // ❌ Doesn't assign to instance variable
       }
   }

   class Person {
       String name;
       Person(String name) {
           this.name = name;  // ✅ Correct
       }
   }
   ```

2. **Public fields without validation**
   ```java
   class Account {
       public double balance;  // ❌ Anyone can set any value
   }

   class Account {
       private double balance;  // ✅ Controlled access
       public void deposit(double amount) {
           if (amount > 0) balance += amount;
       }
   }
   ```

## Next Steps

Move on to `05-Inheritance` to learn about code reuse through inheritance!

**Challenge**: Create a comprehensive Library Management System with classes for Book, Member, and Library. Include proper encapsulation, constructors, and methods for borrowing/returning books.
