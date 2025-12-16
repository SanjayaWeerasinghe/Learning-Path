# Advanced Map, Filter, Reduce in JavaScript

## Introduction

This guide covers advanced patterns and real-world applications of map, filter, and reduce - the cornerstones of functional programming in JavaScript.

## Key Concepts

### 1. Advanced Map Patterns

```javascript
// Transform to different structure
const users = [{ name: 'John', age: 30 }, { name: 'Jane', age: 25 }];
const userMap = new Map(users.map(u => [u.name, u]));

// Conditional transformation
const numbers = [1, 2, 3, 4, 5];
const result = numbers.map(n => n % 2 === 0 ? n * 2 : n);

// Map with index for ranking
const scores = [95, 87, 92, 88];
const ranked = scores
    .map((score, i) => ({ score, originalIndex: i }))
    .sort((a, b) => b.score - a.score)
    .map((item, i) => ({ ...item, rank: i + 1 }));
```

### 2. Advanced Filter Patterns

```javascript
// Filter with complex conditions
const products = [
    { name: 'Laptop', price: 1000, inStock: true },
    { name: 'Phone', price: 500, inStock: false },
    { name: 'Tablet', price: 300, inStock: true }
];

const affordable = products.filter(p =>
    p.price < 600 && p.inStock
);

// Remove duplicates
const numbers = [1, 2, 2, 3, 3, 4];
const unique = numbers.filter((n, i, arr) => arr.indexOf(n) === i);

// Filter by type
const mixed = [1, 'two', 3, 'four', 5];
const numbersOnly = mixed.filter(item => typeof item === 'number');
```

### 3. Advanced Reduce Patterns

```javascript
// Group by property
const people = [
    { name: 'John', age: 30, city: 'NYC' },
    { name: 'Jane', age: 25, city: 'LA' },
    { name: 'Bob', age: 35, city: 'NYC' }
];

const byCity = people.reduce((acc, person) => {
    if (!acc[person.city]) acc[person.city] = [];
    acc[person.city].push(person);
    return acc;
}, {});

// Count occurrences
const fruits = ['apple', 'banana', 'apple', 'orange'];
const count = fruits.reduce((acc, fruit) => {
    acc[fruit] = (acc[fruit] || 0) + 1;
    return acc;
}, {});

// Compose functions
const compose = (...fns) => x =>
    fns.reduceRight((acc, fn) => fn(acc), x);

const addOne = x => x + 1;
const double = x => x * 2;
const result = compose(double, addOne)(5);  // 12
```

### 4. Combining Methods

```javascript
// Complex data pipeline
const transactions = [
    { id: 1, amount: 100, type: 'credit' },
    { id: 2, amount: 50, type: 'debit' },
    { id: 3, amount: 200, type: 'credit' }
];

const totalCredit = transactions
    .filter(t => t.type === 'credit')
    .map(t => t.amount)
    .reduce((sum, amount) => sum + amount, 0);

// Find average of filtered items
const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const avgEven = numbers
    .filter(n => n % 2 === 0)
    .reduce((sum, n, i, arr) => {
        sum += n;
        return i === arr.length - 1 ? sum / arr.length : sum;
    }, 0);
```

## Code Examples

### Example 1: Data Aggregation

```javascript
const orders = [
    { customer: 'John', items: [10, 20, 30], status: 'completed' },
    { customer: 'Jane', items: [15, 25], status: 'completed' },
    { customer: 'Bob', items: [50], status: 'pending' }
];

const summary = orders
    .filter(o => o.status === 'completed')
    .reduce((acc, order) => {
        const total = order.items.reduce((sum, price) => sum + price, 0);
        acc.totalRevenue += total;
        acc.orderCount++;
        acc.customers.add(order.customer);
        return acc;
    }, { totalRevenue: 0, orderCount: 0, customers: new Set() });

console.log(summary);
```

### Example 2: Data Transformation Pipeline

```javascript
const students = [
    { name: 'John', grades: [85, 90, 92] },
    { name: 'Jane', grades: [88, 95, 90] },
    { name: 'Bob', grades: [70, 75, 72] }
];

const processedStudents = students
    .map(student => ({
        ...student,
        average: student.grades.reduce((sum, g) => sum + g, 0) / student.grades.length
    }))
    .filter(student => student.average >= 80)
    .map(student => ({
        name: student.name,
        average: student.average.toFixed(2),
        grade: student.average >= 90 ? 'A' : 'B'
    }))
    .sort((a, b) => b.average - a.average);
```

## Practical Tasks

### Task 1: Build Analytics Dashboard
```javascript
// Given sales data, calculate:
// - Total revenue
// - Revenue by category
// - Top 5 products
// - Average order value
```

### Task 2: Implement Data Validator
```javascript
// Create pipeline to:
// - Filter valid entries
// - Transform data format
// - Aggregate results
```

### Task 3: Create Query Builder
```javascript
// Chain map/filter/reduce to build SQL-like queries
// .where(), .select(), .groupBy()
```

## Best Practices

1. **Chain methods for readability**
2. **Use descriptive variable names**
3. **Prefer pure functions** (no side effects)
4. **Consider performance** with large datasets
5. **Use appropriate method** for the task

## Interview Questions

### Question 1: When should you use reduce over map/filter?
**Answer:** Use reduce when aggregating to a single value (sum, count, grouping). Map/filter return arrays; reduce returns any type.

### Question 2: How do you flatten nested arrays with reduce?
**Answer:** `arr.reduce((flat, item) => flat.concat(item), [])` or use `flat()` method for cleaner syntax.

### Question 3: What's the performance difference between chaining methods?
**Answer:** Each method creates new array. For large datasets, consider single reduce or for loop. Modern engines optimize well though.

### Question 4: How do you avoid mutations in reduce?
**Answer:** Always return new object/array: `return {...acc, key: value}` not `acc.key = value; return acc`.

### Question 5: Can you break out of map/filter/reduce?
**Answer:** No. They iterate entire array. Use `find()`, `some()`, `every()`, or for loop if early exit needed.

## Additional Resources

- [MDN - Array Methods](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)
- [Functional Programming in JavaScript](https://eloquentjavascript.net/05_higher_order.html)
