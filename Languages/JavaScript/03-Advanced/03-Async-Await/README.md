# Async/Await in JavaScript

## Introduction

Async/await is syntactic sugar built on Promises, making asynchronous code look and behave more like synchronous code, improving readability.

## Key Concepts

### 1. Async Functions

```javascript
// Async function always returns a Promise
async function fetchData() {
    return 'data';  // Wrapped in Promise.resolve()
}

fetchData().then(data => console.log(data));

// Equivalent to:
function fetchDataPromise() {
    return Promise.resolve('data');
}
```

### 2. Await Keyword

```javascript
async function loadUser(id) {
    const response = await fetch(`/api/users/${id}`);
    const user = await response.json();
    return user;
}

// Await pauses execution until Promise resolves
// Can only use await inside async functions
```

### 3. Error Handling

```javascript
async function fetchWithErrorHandling() {
    try {
        const response = await fetch('/api/data');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}
```

### 4. Parallel vs Sequential

```javascript
// Sequential (slow)
async function sequential() {
    const user = await fetchUser();
    const posts = await fetchPosts();
    return { user, posts };
}

// Parallel (fast)
async function parallel() {
    const [user, posts] = await Promise.all([
        fetchUser(),
        fetchPosts()
    ]);
    return { user, posts };
}
```

## Code Examples

### Example 1: API Calls

```javascript
async function getUserData(userId) {
    try {
        const userResponse = await fetch(`/api/users/${userId}`);
        if (!userResponse.ok) {
            throw new Error('User not found');
        }

        const user = await userResponse.json();

        const postsResponse = await fetch(`/api/users/${userId}/posts`);
        const posts = await postsResponse.json();

        return { user, posts };
    } catch (error) {
        console.error('Failed to load user data:', error);
        return null;
    }
}
```

### Example 2: Multiple Requests

```javascript
async function loadDashboard() {
    try {
        const [users, posts, comments] = await Promise.all([
            fetch('/api/users').then(r => r.json()),
            fetch('/api/posts').then(r => r.json()),
            fetch('/api/comments').then(r => r.json())
        ]);

        return { users, posts, comments };
    } catch (error) {
        console.error('Dashboard load failed:', error);
    }
}
```

## Practical Tasks

### Task 1: Retry with Delay
```javascript
async function retryWithDelay(fn, retries = 3, delay = 1000) {
    // Implement retry logic with delay
}
```

### Task 2: Timeout Promise
```javascript
async function withTimeout(promise, ms) {
    // Reject if promise takes longer than ms
}
```

## Interview Questions

### Question 1: What is async/await?
**Answer:** Syntactic sugar for Promises. `async` makes function return Promise; `await` pauses execution until Promise resolves. Makes async code look synchronous.

### Question 2: Can you use await without async?
**Answer:** No (except top-level await in modules). `await` can only be used inside `async` functions.

### Question 3: How do you handle errors with async/await?
**Answer:** Use try-catch blocks around await statements, or use .catch() on the returned Promise.

### Question 4: What's the difference between Promise.all and multiple awaits?
**Answer:** Multiple awaits run sequentially; Promise.all runs in parallel. Use Promise.all for independent async operations.

### Question 5: Does async/await make code synchronous?
**Answer:** No, it's still asynchronous. It just makes async code easier to read and write by hiding Promise mechanics.

## Additional Resources

- [MDN - async/await](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function)
- [JavaScript.info - Async/await](https://javascript.info/async-await)
