# Event Loop in JavaScript

## Introduction

The event loop is the mechanism that handles asynchronous operations in JavaScript. Understanding it is crucial for writing efficient async code and debugging timing issues.

## Key Concepts

### 1. Call Stack

```javascript
function third() {
    console.log('Third');
}

function second() {
    third();
}

function first() {
    second();
    console.log('First');
}

first();
// Call stack: first() -> second() -> third() -> console.log
```

### 2. Task Queue (Macrotasks)

```javascript
console.log('1');

setTimeout(() => {
    console.log('2');
}, 0);

console.log('3');

// Output: 1, 3, 2
// setTimeout callback goes to task queue
```

### 3. Microtask Queue

```javascript
console.log('1');

setTimeout(() => console.log('2'), 0);

Promise.resolve().then(() => console.log('3'));

console.log('4');

// Output: 1, 4, 3, 2
// Microtasks (Promises) run before macrotasks
```

### 4. Execution Order

```javascript
console.log('Script start');

setTimeout(() => {
    console.log('setTimeout');
}, 0);

Promise.resolve()
    .then(() => {
        console.log('Promise 1');
    })
    .then(() => {
        console.log('Promise 2');
    });

console.log('Script end');

// Output:
// Script start
// Script end
// Promise 1
// Promise 2
// setTimeout

// Order: Call stack -> Microtasks -> Macrotasks
```

## Code Examples

### Example 1: Understanding Timing

```javascript
console.log('A');

setTimeout(() => console.log('B'), 0);

Promise.resolve()
    .then(() => console.log('C'))
    .then(() => console.log('D'));

requestAnimationFrame(() => console.log('E'));

console.log('F');

// Output: A, F, C, D, E, B
```

### Example 2: Nested Timers

```javascript
setTimeout(() => {
    console.log('Outer timeout');

    setTimeout(() => {
        console.log('Inner timeout');
    }, 0);

    Promise.resolve().then(() => {
        console.log('Inner promise');
    });
}, 0);

// Output: Outer timeout, Inner promise, Inner timeout
```

### Example 3: Event Loop Visualization

```javascript
function demonstrateEventLoop() {
    console.log('1: Synchronous');

    setTimeout(() => {
        console.log('4: Macro task (setTimeout)');
    }, 0);

    Promise.resolve()
        .then(() => {
            console.log('3: Micro task (Promise)');
        });

    console.log('2: Synchronous');
}

demonstrateEventLoop();
```

## Practical Tasks

### Task 1: Predict Output
```javascript
// Predict the output order
console.log('Start');

setTimeout(() => {
    console.log('Timeout 1');
    Promise.resolve().then(() => console.log('Promise 1'));
}, 0);

Promise.resolve()
    .then(() => console.log('Promise 2'))
    .then(() => {
        setTimeout(() => console.log('Timeout 2'), 0);
    });

console.log('End');
```

### Task 2: Implement Scheduler
```javascript
// Create a task scheduler using event loop knowledge
function scheduleTask(task, priority) {
    // Use appropriate API based on priority
}
```

## Interview Questions

### Question 1: What is the event loop?
**Answer:** Mechanism that continuously checks call stack and task queues, executing code in order: synchronous code (call stack), then microtasks (promises), then macrotasks (setTimeout).

### Question 2: What's the difference between microtasks and macrotasks?
**Answer:** Microtasks (Promises, queueMicrotask) execute before macrotasks (setTimeout, setInterval) after each call stack emptying. Microtask queue fully empties before next macrotask.

### Question 3: Why does setTimeout(fn, 0) not execute immediately?
**Answer:** It schedules callback in macrotask queue. Must wait for call stack to empty and all microtasks to complete before running.

### Question 4: What is the call stack?
**Answer:** Data structure tracking function execution. When function called, pushed onto stack. When returns, popped off. JavaScript is single-threaded, one call stack.

### Question 5: How do promises affect execution order?
**Answer:** Promise callbacks (.then, .catch) are microtasks. Run after current script but before setTimeout/setInterval. All pending microtasks run before next macrotask.

## Additional Resources

- [MDN - Event Loop](https://developer.mozilla.org/en-US/docs/Web/JavaScript/EventLoop)
- [JavaScript Visualizer](http://latentflip.com/loupe/)
- [Tasks, microtasks, queues and schedules](https://jakearchibald.com/2015/tasks-microtasks-queues-and-schedules/)
