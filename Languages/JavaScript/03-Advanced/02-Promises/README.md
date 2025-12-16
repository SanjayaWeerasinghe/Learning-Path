# Promises in JavaScript

## Introduction

Promises represent the eventual completion (or failure) of an asynchronous operation and its resulting value. They provide a cleaner alternative to callbacks.

## Key Concepts

### 1. Creating Promises

```javascript
// Basic promise
const promise = new Promise((resolve, reject) => {
    // Async operation
    setTimeout(() => {
        resolve('Success!');
        // or reject(new Error('Failed!'));
    }, 1000);
});

// Promise states: pending, fulfilled, rejected
```

### 2. Using Promises

```javascript
promise
    .then(result => console.log(result))
    .catch(error => console.error(error))
    .finally(() => console.log('Done'));

// Chaining
fetch('/api/users')
    .then(response => response.json())
    .then(users => users.map(u => u.name))
    .then(names => console.log(names))
    .catch(error => console.error(error));
```

### 3. Promise Methods

```javascript
// Promise.all - wait for all
Promise.all([promise1, promise2, promise3])
    .then(results => console.log(results))
    .catch(error => console.error(error));

// Promise.race - first to complete
Promise.race([promise1, promise2])
    .then(result => console.log(result));

// Promise.allSettled - wait for all, regardless of outcome
Promise.allSettled([promise1, promise2])
    .then(results => console.log(results));

// Promise.any - first to fulfill
Promise.any([promise1, promise2])
    .then(result => console.log(result));
```

## Code Examples

### Example 1: Fetch with Error Handling

```javascript
function fetchUser(id) {
    return fetch(`/api/users/${id}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('User not found');
            }
            return response.json();
        })
        .then(user => {
            console.log('User:', user);
            return user;
        })
        .catch(error => {
            console.error('Error:', error);
            return null;
        });
}
```

### Example 2: Sequential Operations

```javascript
function loadData() {
    return fetchUsers()
        .then(users => {
            return fetchPosts(users[0].id);
        })
        .then(posts => {
            return fetchComments(posts[0].id);
        })
        .then(comments => {
            console.log('Comments:', comments);
        });
}
```

## Practical Tasks

### Task 1: Promisify setTimeout
```javascript
function delay(ms) {
    // Return promise that resolves after ms
}
```

### Task 2: Retry Logic
```javascript
function retryPromise(fn, maxRetries) {
    // Retry failed promise
}
```

## Interview Questions

### Question 1: What is a Promise?
**Answer:** A Promise is an object representing eventual completion or failure of async operation. Has three states: pending, fulfilled, rejected.

### Question 2: What's the difference between Promise.all and Promise.race?
**Answer:** `Promise.all` waits for all promises (fails if any fail); `Promise.race` returns first to complete (success or failure).

### Question 3: How do you handle errors in Promise chains?
**Answer:** Use `.catch()` at end of chain to catch any errors. Errors propagate down the chain until caught.

### Question 4: What's Promise chaining?
**Answer:** Returning promises from `.then()` handlers to create sequence of async operations. Each `.then()` receives result of previous.

### Question 5: Can you convert callbacks to Promises?
**Answer:** Yes, wrap callback in Promise constructor: `new Promise((resolve, reject) => callback((err, data) => err ? reject(err) : resolve(data)))`.

## Additional Resources

- [MDN - Promises](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)
- [JavaScript.info - Promises](https://javascript.info/promise-basics)
