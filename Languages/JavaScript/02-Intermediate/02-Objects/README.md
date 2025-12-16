# Objects in JavaScript

## Introduction

Objects are collections of key-value pairs and are one of the fundamental data types in JavaScript. They allow you to store related data and functionality together, making them essential for organizing code.

## Key Concepts

### 1. Creating Objects

```javascript
// Object literal (most common)
let person = {
    name: "John",
    age: 30,
    city: "New York"
};

// Object constructor
let car = new Object();
car.brand = "Toyota";
car.model = "Camry";

// Object.create()
let proto = { greeting: "Hello" };
let obj = Object.create(proto);
obj.name = "John";

// Constructor function
function Person(name, age) {
    this.name = name;
    this.age = age;
}
let john = new Person("John", 30);

// ES6 Class
class User {
    constructor(name, email) {
        this.name = name;
        this.email = email;
    }
}
let user = new User("Jane", "jane@example.com");
```

### 2. Accessing Properties

```javascript
let person = {
    firstName: "John",
    lastName: "Doe",
    age: 30,
    "favorite color": "blue"  // Property with space
};

// Dot notation
console.log(person.firstName);  // "John"
console.log(person.age);        // 30

// Bracket notation
console.log(person["lastName"]);       // "Doe"
console.log(person["favorite color"]); // "blue" (required for spaces)

// Dynamic property access
let key = "age";
console.log(person[key]);  // 30

// Optional chaining (ES2020)
let user = {};
console.log(user?.address?.street);  // undefined (no error)
```

### 3. Adding, Modifying, and Deleting Properties

```javascript
let person = {
    name: "John",
    age: 30
};

// Adding properties
person.email = "john@example.com";
person["phone"] = "555-1234";

// Modifying properties
person.age = 31;
person["name"] = "John Doe";

// Deleting properties
delete person.phone;
console.log(person.phone);  // undefined

// Checking if property exists
console.log("email" in person);           // true
console.log(person.hasOwnProperty("age"));  // true
```

### 4. Object Methods

```javascript
// Methods are functions stored as object properties
let calculator = {
    num1: 0,
    num2: 0,

    setNumbers(a, b) {
        this.num1 = a;
        this.num2 = b;
    },

    add() {
        return this.num1 + this.num2;
    },

    multiply: function() {
        return this.num1 * this.num2;
    }
};

calculator.setNumbers(5, 3);
console.log(calculator.add());       // 8
console.log(calculator.multiply());  // 15

// Method shorthand (ES6)
let person = {
    name: "John",
    greet() {  // Instead of greet: function()
        return `Hello, I'm ${this.name}`;
    }
};
```

### 5. The `this` Keyword

```javascript
let user = {
    name: "John",
    age: 30,

    sayHi() {
        console.log(`Hi, I'm ${this.name}`);
    },

    getInfo: function() {
        return {
            name: this.name,
            age: this.age
        };
    }
};

user.sayHi();  // "Hi, I'm John"

// `this` refers to the object before the dot
let admin = {
    name: "Admin"
};
admin.sayHi = user.sayHi;
admin.sayHi();  // "Hi, I'm Admin"

// Arrow functions don't have their own `this`
let person = {
    name: "John",
    regularFunc() {
        console.log(this.name);  // "John"
    },
    arrowFunc: () => {
        console.log(this.name);  // undefined (inherits from outer scope)
    }
};
```

### 6. Object Iteration

```javascript
let person = {
    name: "John",
    age: 30,
    city: "New York"
};

// for...in loop
for (let key in person) {
    console.log(`${key}: ${person[key]}`);
}

// Object.keys() - array of keys
let keys = Object.keys(person);
console.log(keys);  // ["name", "age", "city"]

// Object.values() - array of values
let values = Object.values(person);
console.log(values);  // ["John", 30, "New York"]

// Object.entries() - array of [key, value] pairs
let entries = Object.entries(person);
console.log(entries);  // [["name", "John"], ["age", 30], ["city", "New York"]]

// Iterating with entries
for (let [key, value] of Object.entries(person)) {
    console.log(`${key}: ${value}`);
}
```

### 7. Object Copying and Merging

```javascript
let original = {
    name: "John",
    age: 30
};

// Shallow copy - Object.assign()
let copy1 = Object.assign({}, original);

// Shallow copy - spread operator
let copy2 = { ...original };

// Merging objects
let person = { name: "John", age: 30 };
let contact = { email: "john@example.com", phone: "555-1234" };
let merged = { ...person, ...contact };
console.log(merged);
// { name: "John", age: 30, email: "john@example.com", phone: "555-1234" }

// Deep copy (for nested objects)
let nested = {
    name: "John",
    address: {
        city: "New York",
        zip: "10001"
    }
};

// Deep copy using JSON (limitations: loses functions, undefined, symbols)
let deepCopy = JSON.parse(JSON.stringify(nested));

// Shallow vs deep copy
let shallow = { ...nested };
shallow.address.city = "Boston";
console.log(nested.address.city);  // "Boston" (modified!)

let deep = JSON.parse(JSON.stringify(nested));
deep.address.city = "Boston";
console.log(nested.address.city);  // "New York" (not modified)
```

### 8. Computed Property Names

```javascript
// ES6 feature - property names from variables
let propName = "age";
let person = {
    name: "John",
    [propName]: 30,
    ["is" + "Admin"]: false
};
console.log(person);  // { name: "John", age: 30, isAdmin: false }

// Dynamic property names
function createUser(name, value) {
    return {
        [name]: value
    };
}

let user = createUser("email", "user@example.com");
console.log(user);  // { email: "user@example.com" }
```

### 9. Property Getters and Setters

```javascript
let user = {
    firstName: "John",
    lastName: "Doe",

    get fullName() {
        return `${this.firstName} ${this.lastName}`;
    },

    set fullName(value) {
        [this.firstName, this.lastName] = value.split(" ");
    }
};

console.log(user.fullName);  // "John Doe"
user.fullName = "Jane Smith";
console.log(user.firstName);  // "Jane"
console.log(user.lastName);   // "Smith"

// Getters and setters for data validation
let account = {
    _balance: 0,  // Convention: underscore for "private"

    get balance() {
        return this._balance;
    },

    set balance(value) {
        if (value < 0) {
            console.log("Balance cannot be negative");
            return;
        }
        this._balance = value;
    }
};

account.balance = 100;
console.log(account.balance);  // 100
account.balance = -50;         // Error message
console.log(account.balance);  // 100 (unchanged)
```

## Code Examples

### Example 1: User Management System

```javascript
const userManager = {
    users: [],

    addUser(name, email) {
        const user = {
            id: this.users.length + 1,
            name: name,
            email: email,
            createdAt: new Date()
        };
        this.users.push(user);
        return user;
    },

    findUserById(id) {
        return this.users.find(user => user.id === id);
    },

    findUserByEmail(email) {
        return this.users.find(user => user.email === email);
    },

    updateUser(id, updates) {
        const user = this.findUserById(id);
        if (user) {
            Object.assign(user, updates);
            return user;
        }
        return null;
    },

    deleteUser(id) {
        const index = this.users.findIndex(user => user.id === id);
        if (index !== -1) {
            return this.users.splice(index, 1)[0];
        }
        return null;
    },

    getAllUsers() {
        return [...this.users];
    }
};

// Usage
userManager.addUser("John Doe", "john@example.com");
userManager.addUser("Jane Smith", "jane@example.com");
console.log(userManager.getAllUsers());
```

### Example 2: Object Comparison

```javascript
function shallowEqual(obj1, obj2) {
    const keys1 = Object.keys(obj1);
    const keys2 = Object.keys(obj2);

    if (keys1.length !== keys2.length) {
        return false;
    }

    for (let key of keys1) {
        if (obj1[key] !== obj2[key]) {
            return false;
        }
    }

    return true;
}

function deepEqual(obj1, obj2) {
    if (obj1 === obj2) return true;

    if (typeof obj1 !== "object" || typeof obj2 !== "object" ||
        obj1 === null || obj2 === null) {
        return false;
    }

    const keys1 = Object.keys(obj1);
    const keys2 = Object.keys(obj2);

    if (keys1.length !== keys2.length) {
        return false;
    }

    for (let key of keys1) {
        if (!keys2.includes(key) || !deepEqual(obj1[key], obj2[key])) {
            return false;
        }
    }

    return true;
}

// Test
let a = { x: 1, y: 2 };
let b = { x: 1, y: 2 };
console.log(shallowEqual(a, b));  // true

let c = { x: 1, nested: { a: 1 } };
let d = { x: 1, nested: { a: 1 } };
console.log(deepEqual(c, d));  // true
```

### Example 3: Object Factory

```javascript
function createProduct(name, price, category) {
    return {
        name,
        price,
        category,
        inStock: true,

        getInfo() {
            return `${this.name} - $${this.price}`;
        },

        applyDiscount(percentage) {
            this.price = this.price * (1 - percentage / 100);
            return this;
        },

        toggleStock() {
            this.inStock = !this.inStock;
            return this;
        }
    };
}

let laptop = createProduct("Laptop", 1000, "Electronics");
laptop.applyDiscount(10).toggleStock();
console.log(laptop.getInfo());  // "Laptop - $900"
console.log(laptop.inStock);    // false
```

### Example 4: Object Transformation

```javascript
// Transform array to object
const users = [
    { id: 1, name: "John" },
    { id: 2, name: "Jane" },
    { id: 3, name: "Bob" }
];

const usersById = users.reduce((obj, user) => {
    obj[user.id] = user;
    return obj;
}, {});

console.log(usersById);
// { 1: {id: 1, name: "John"}, 2: {...}, 3: {...} }

// Transform object to array
const scores = { math: 90, english: 85, science: 92 };
const scoreArray = Object.entries(scores).map(([subject, score]) => ({
    subject,
    score
}));

console.log(scoreArray);
// [{subject: "math", score: 90}, {...}, {...}]

// Filter object properties
function filterObject(obj, predicate) {
    return Object.keys(obj)
        .filter(key => predicate(key, obj[key]))
        .reduce((result, key) => {
            result[key] = obj[key];
            return result;
        }, {});
}

const person = { name: "John", age: 30, city: "NYC", country: "USA" };
const filtered = filterObject(person, (key, value) => typeof value === "string");
console.log(filtered);  // { name: "John", city: "NYC", country: "USA" }
```

## Practical Tasks

### Task 1: Deep Clone Function
Create a function that deep clones an object.

```javascript
function deepClone(obj) {
    // Handle all cases: primitives, arrays, objects, dates, etc.
}

// Test
const original = {
    name: "John",
    address: {
        city: "NYC",
        zip: "10001"
    },
    hobbies: ["reading", "gaming"]
};

const clone = deepClone(original);
clone.address.city = "Boston";
console.log(original.address.city);  // Should still be "NYC"
```

### Task 2: Object Merge
Merge multiple objects deeply.

```javascript
function deepMerge(...objects) {
    // Merge all objects, handling nested objects
}

// Test
const obj1 = { a: 1, b: { c: 2 } };
const obj2 = { b: { d: 3 }, e: 4 };
const merged = deepMerge(obj1, obj2);
console.log(merged);  // { a: 1, b: { c: 2, d: 3 }, e: 4 }
```

### Task 3: Object Validator
Create an object validator.

```javascript
function validateObject(obj, schema) {
    // Validate object against schema
    // Schema example: { name: "string", age: "number", email: "string" }
    // Return { valid: true/false, errors: [] }
}

// Test
const user = { name: "John", age: "30", email: "john@example.com" };
const schema = { name: "string", age: "number", email: "string" };
console.log(validateObject(user, schema));
```

### Task 4: Object Path Getter/Setter
Access nested properties using path strings.

```javascript
function getPath(obj, path) {
    // Get value at path (e.g., "user.address.city")
}

function setPath(obj, path, value) {
    // Set value at path
}

// Test
const data = { user: { address: { city: "NYC" } } };
console.log(getPath(data, "user.address.city"));  // "NYC"
setPath(data, "user.address.city", "Boston");
console.log(data.user.address.city);  // "Boston"
```

## Best Practices

1. **Use object literals for simple objects**
2. **Use const for objects that won't be reassigned**
3. **Use meaningful property names**
4. **Use shorthand property names when possible**
5. **Use computed property names for dynamic keys**
6. **Prefer `Object.keys/values/entries` over `for...in`**
7. **Check property existence before accessing**
8. **Use optional chaining for deeply nested properties**

```javascript
// Good practices
const user = {
    name,           // Shorthand
    age,
    [`role_${id}`]: "admin",  // Computed

    getName() {     // Method shorthand
        return this.name;
    }
};

// Safe property access
const city = user?.address?.city ?? "Unknown";
```

## Common Pitfalls

1. **Forgetting `this` refers to the calling object**
2. **Using arrow functions for methods needing `this`**
3. **Shallow vs deep copying confusion**
4. **Modifying objects passed as parameters**
5. **Not checking if property exists**

```javascript
// Pitfalls
const obj = {
    name: "John",
    greet: () => console.log(this.name)  // Won't work
};

// Shallow copy issue
const original = { nested: { value: 1 } };
const copy = { ...original };
copy.nested.value = 2;
console.log(original.nested.value);  // 2 (modified!)
```

## Interview Questions

### Question 1: What are the different ways to create an object?
**Answer:** Object literal `{}`, `new Object()`, `Object.create()`, constructor functions, ES6 classes, and factory functions. Object literals are most common for simple objects.

### Question 2: What's the difference between dot and bracket notation?
**Answer:** Dot notation (`obj.prop`) is cleaner but only works with valid identifiers. Bracket notation (`obj["prop"]`) works with any string, spaces, variables, and computed names.

### Question 3: How do you deep clone an object?
**Answer:** `JSON.parse(JSON.stringify(obj))` works but loses functions, undefined, symbols. For complete cloning, write recursive function or use libraries like Lodash's `_.cloneDeep()`.

### Question 4: What is the difference between `Object.keys()`, `Object.values()`, and `Object.entries()`?
**Answer:** `Object.keys()` returns array of property names, `Object.values()` returns array of values, `Object.entries()` returns array of `[key, value]` pairs. All return enumerable properties only.

### Question 5: How does the `this` keyword work in objects?
**Answer:** `this` refers to the object the method is called on. Arrow functions don't have their own `this` and inherit from parent scope. Regular functions have dynamic `this` based on how they're called.

## Additional Resources

- [MDN - Working with Objects](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Working_with_Objects)
- [MDN - Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)
- [JavaScript.info - Objects](https://javascript.info/object)
- [JavaScript Object Explorer](https://objectexplorer.netlify.app/)
