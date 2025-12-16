# ES6 Classes in JavaScript

## Introduction

ES6 classes provide a cleaner syntax for creating objects and implementing inheritance. They're syntactic sugar over JavaScript's prototypal inheritance.

## Key Concepts

### 1. Class Declaration

```javascript
class Person {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }

    greet() {
        return `Hello, I'm ${this.name}`;
    }

    get info() {
        return `${this.name}, ${this.age} years old`;
    }

    set age(value) {
        if (value < 0) throw new Error('Invalid age');
        this._age = value;
    }

    get age() {
        return this._age;
    }
}

const person = new Person('John', 30);
console.log(person.greet());
```

### 2. Inheritance

```javascript
class Employee extends Person {
    constructor(name, age, jobTitle) {
        super(name, age);  // Call parent constructor
        this.jobTitle = jobTitle;
    }

    greet() {
        return `${super.greet()}. I'm a ${this.jobTitle}`;
    }

    work() {
        return `${this.name} is working`;
    }
}

const emp = new Employee('John', 30, 'Developer');
console.log(emp.greet());  // "Hello, I'm John. I'm a Developer"
```

### 3. Static Methods

```javascript
class MathUtil {
    static add(a, b) {
        return a + b;
    }

    static PI = 3.14159;

    static calculateCircleArea(radius) {
        return this.PI * radius * radius;
    }
}

console.log(MathUtil.add(5, 3));  // 8
console.log(MathUtil.PI);         // 3.14159
```

### 4. Private Fields

```javascript
class BankAccount {
    #balance = 0;  // Private field

    constructor(initialBalance) {
        this.#balance = initialBalance;
    }

    deposit(amount) {
        this.#balance += amount;
        return this.#balance;
    }

    withdraw(amount) {
        if (amount > this.#balance) {
            throw new Error('Insufficient funds');
        }
        this.#balance -= amount;
        return this.#balance;
    }

    getBalance() {
        return this.#balance;
    }
}

const account = new BankAccount(100);
// console.log(account.#balance);  // SyntaxError
console.log(account.getBalance());  // 100
```

## Code Examples

### Example 1: User Management System

```javascript
class User {
    static #idCounter = 0;

    constructor(username, email) {
        this.id = ++User.#idCounter;
        this.username = username;
        this.email = email;
        this.createdAt = new Date();
    }

    static getNextId() {
        return User.#idCounter + 1;
    }

    update(data) {
        Object.assign(this, data);
    }

    toJSON() {
        return {
            id: this.id,
            username: this.username,
            email: this.email
        };
    }
}

class Admin extends User {
    constructor(username, email, permissions = []) {
        super(username, email);
        this.permissions = permissions;
    }

    hasPermission(permission) {
        return this.permissions.includes(permission);
    }

    grantPermission(permission) {
        if (!this.permissions.includes(permission)) {
            this.permissions.push(permission);
        }
    }
}
```

## Practical Tasks

### Task 1: Create Shape Classes
```javascript
class Shape {
    // Base class with getArea() and getPerimeter()
}

class Rectangle extends Shape {
    // Implement for rectangle
}

class Circle extends Shape {
    // Implement for circle
}
```

### Task 2: Build Todo List Class
```javascript
class TodoList {
    // Add, remove, toggle, filter todos
}
```

### Task 3: Implement Stack and Queue
```javascript
class Stack {
    // push, pop, peek, isEmpty
}

class Queue extends Stack {
    // enqueue, dequeue
}
```

## Interview Questions

### Question 1: What are ES6 classes?
**Answer:** Syntactic sugar over prototypal inheritance. Provide cleaner syntax for creating constructor functions and handling inheritance with `extends` keyword.

### Question 2: What's the difference between class and constructor function?
**Answer:** Classes: cleaner syntax, must use `new`, strict mode by default. Constructor functions: traditional, can be called without `new`. Both use prototypal inheritance.

### Question 3: What are private fields?
**Answer:** Fields prefixed with `#`, only accessible inside class. True privacy (unlike convention of `_` prefix). ES2022 feature.

### Question 4: What does super() do?
**Answer:** Calls parent class constructor. Must be called before accessing `this` in child constructor. Also used to call parent methods: `super.method()`.

### Question 5: What are static methods?
**Answer:** Methods called on class itself, not instances. Useful for utility functions, factory methods, counters. Access with `ClassName.method()`.

## Additional Resources

- [MDN - Classes](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes)
- [JavaScript.info - Classes](https://javascript.info/classes)
