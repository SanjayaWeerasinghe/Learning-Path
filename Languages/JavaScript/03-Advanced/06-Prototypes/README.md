# Prototypes in JavaScript

## Introduction

Prototypes are the mechanism by which JavaScript objects inherit features from one another. Every JavaScript object has a prototype, forming a prototype chain.

## Key Concepts

### 1. Prototype Chain

```javascript
const person = {
    greet() {
        return `Hello, I'm ${this.name}`;
    }
};

const john = Object.create(person);
john.name = 'John';

console.log(john.greet());  // "Hello, I'm John"
console.log(john.__proto__ === person);  // true
```

### 2. Constructor Prototypes

```javascript
function Person(name, age) {
    this.name = name;
    this.age = age;
}

Person.prototype.greet = function() {
    return `Hello, I'm ${this.name}`;
};

const john = new Person('John', 30);
console.log(john.greet());  // Uses prototype method
```

### 3. Prototype vs __proto__

```javascript
// Constructor.prototype = object that instances inherit from
// instance.__proto__ = points to Constructor.prototype

function Dog(name) {
    this.name = name;
}

Dog.prototype.bark = function() {
    console.log('Woof!');
};

const dog = new Dog('Max');
console.log(dog.__proto__ === Dog.prototype);  // true
```

### 4. Prototypal Inheritance

```javascript
function Animal(name) {
    this.name = name;
}

Animal.prototype.eat = function() {
    console.log(`${this.name} is eating`);
};

function Dog(name, breed) {
    Animal.call(this, name);
    this.breed = breed;
}

// Set up inheritance
Dog.prototype = Object.create(Animal.prototype);
Dog.prototype.constructor = Dog;

Dog.prototype.bark = function() {
    console.log('Woof!');
};

const dog = new Dog('Max', 'Golden Retriever');
dog.eat();   // Inherited from Animal
dog.bark();  // From Dog
```

## Code Examples

### Example 1: Custom Array Methods

```javascript
Array.prototype.first = function() {
    return this[0];
};

Array.prototype.last = function() {
    return this[this.length - 1];
};

const numbers = [1, 2, 3, 4, 5];
console.log(numbers.first());  // 1
console.log(numbers.last());   // 5
```

### Example 2: Object Creation Patterns

```javascript
// Object.create pattern
const vehiclePrototype = {
    start() {
        console.log('Starting...');
    },
    stop() {
        console.log('Stopping...');
    }
};

const car = Object.create(vehiclePrototype);
car.brand = 'Toyota';
car.start();  // Uses prototype method
```

## Practical Tasks

### Task 1: Create Inheritance Chain
```javascript
// Create Person -> Employee -> Manager chain
// Using constructor functions and prototypes
```

### Task 2: Implement Custom String Methods
```javascript
// Add reverse() and isPalindrome() to String.prototype
```

### Task 3: Build Linked List
```javascript
// Use prototypes to create LinkedList class
```

## Interview Questions

### Question 1: What is a prototype?
**Answer:** Object from which other objects inherit properties. Every object has `__proto__` pointing to its prototype. Forms prototype chain up to `Object.prototype`.

### Question 2: What's the difference between `__proto__` and `prototype`?
**Answer:** `__proto__` is property on all objects pointing to their prototype. `prototype` is property on constructor functions, becomes `__proto__` of instances.

### Question 3: How does prototypal inheritance work?
**Answer:** When accessing property, JavaScript looks on object, then `__proto__`, then `__proto__.__proto__`, up the chain until found or reaching `null`.

### Question 4: What is Object.create()?
**Answer:** Creates new object with specified prototype. `Object.create(proto)` sets `proto` as `__proto__` of new object.

### Question 5: Should you modify built-in prototypes?
**Answer:** Generally no. Can cause conflicts, unexpected behavior, forward compatibility issues. Only in polyfills for older browsers.

## Additional Resources

- [MDN - Object Prototypes](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/Object_prototypes)
- [JavaScript.info - Prototypes](https://javascript.info/prototype-inheritance)
