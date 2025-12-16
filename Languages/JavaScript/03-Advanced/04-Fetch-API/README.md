# Fetch API in JavaScript

## Introduction

The Fetch API provides a modern interface for making HTTP requests. It returns Promises, making it easy to work with async/await.

## Key Concepts

### 1. Basic GET Request

```javascript
fetch('https://api.example.com/data')
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error('Error:', error));

// With async/await
async function fetchData() {
    try {
        const response = await fetch('https://api.example.com/data');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error:', error);
    }
}
```

### 2. POST Request

```javascript
async function createUser(userData) {
    const response = await fetch('https://api.example.com/users', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
    });

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
}

createUser({ name: 'John', email: 'john@example.com' });
```

### 3. Request Methods

```javascript
// GET (default)
fetch('/api/users');

// POST
fetch('/api/users', { method: 'POST', body: JSON.stringify(data) });

// PUT
fetch('/api/users/1', { method: 'PUT', body: JSON.stringify(data) });

// DELETE
fetch('/api/users/1', { method: 'DELETE' });

// PATCH
fetch('/api/users/1', { method: 'PATCH', body: JSON.stringify(data) });
```

### 4. Headers and Options

```javascript
fetch('/api/data', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer token123'
    },
    body: JSON.stringify({ key: 'value' }),
    credentials: 'include',  // Send cookies
    mode: 'cors',
    cache: 'no-cache'
});
```

### 5. Response Handling

```javascript
async function handleResponse(url) {
    const response = await fetch(url);

    // Check status
    if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    // Get response type
    const contentType = response.headers.get('content-type');

    if (contentType?.includes('application/json')) {
        return await response.json();
    } else if (contentType?.includes('text/')) {
        return await response.text();
    } else {
        return await response.blob();
    }
}
```

## Code Examples

### Example 1: CRUD Operations

```javascript
class UserAPI {
    constructor(baseURL) {
        this.baseURL = baseURL;
    }

    async getAll() {
        const response = await fetch(`${this.baseURL}/users`);
        return response.json();
    }

    async getById(id) {
        const response = await fetch(`${this.baseURL}/users/${id}`);
        if (!response.ok) throw new Error('User not found');
        return response.json();
    }

    async create(userData) {
        const response = await fetch(`${this.baseURL}/users`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(userData)
        });
        return response.json();
    }

    async update(id, userData) {
        const response = await fetch(`${this.baseURL}/users/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(userData)
        });
        return response.json();
    }

    async delete(id) {
        await fetch(`${this.baseURL}/users/${id}`, {
            method: 'DELETE'
        });
    }
}

const api = new UserAPI('https://api.example.com');
```

### Example 2: File Upload

```javascript
async function uploadFile(file) {
    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData  // Don't set Content-Type, browser sets it
    });

    return response.json();
}

// Usage
const fileInput = document.querySelector('input[type="file"]');
fileInput.addEventListener('change', async (e) => {
    const file = e.target.files[0];
    const result = await uploadFile(file);
    console.log('Uploaded:', result);
});
```

### Example 3: Request Interceptor

```javascript
async function fetchWithAuth(url, options = {}) {
    const token = localStorage.getItem('token');

    const headers = {
        ...options.headers,
        'Authorization': `Bearer ${token}`
    };

    const response = await fetch(url, {
        ...options,
        headers
    });

    if (response.status === 401) {
        // Handle unauthorized
        window.location.href = '/login';
        throw new Error('Unauthorized');
    }

    return response;
}
```

## Practical Tasks

### Task 1: Build API Client
```javascript
class APIClient {
    constructor(baseURL) {
        this.baseURL = baseURL;
    }

    async request(endpoint, options) {
        // Handle all HTTP methods
        // Add error handling
        // Return parsed response
    }
}
```

### Task 2: Implement Pagination
```javascript
async function fetchPaginated(url, page = 1, limit = 10) {
    // Fetch paginated data
    // Handle page navigation
}
```

### Task 3: Create Search Function
```javascript
async function searchAPI(query) {
    // Debounce search requests
    // Handle loading state
    // Return results
}
```

## Best Practices

1. **Always check response.ok**
2. **Handle errors appropriately**
3. **Use appropriate HTTP methods**
4. **Set correct Content-Type headers**
5. **Parse response based on content type**

## Interview Questions

### Question 1: What is the Fetch API?
**Answer:** Modern API for making HTTP requests, replacing XMLHttpRequest. Returns Promises, works well with async/await, supports various request types.

### Question 2: How do you handle errors with fetch?
**Answer:** Fetch only rejects on network errors. Check `response.ok` or `response.status` for HTTP errors. Use try-catch with async/await.

### Question 3: What's the difference between fetch and XMLHttpRequest?
**Answer:** Fetch: Promise-based, cleaner API, better with async/await. XMLHttpRequest: older, callback-based, more verbose.

### Question 4: How do you send JSON data with fetch?
**Answer:** Set `Content-Type: application/json` header and use `JSON.stringify()` for body: `body: JSON.stringify(data)`.

### Question 5: Can fetch send cookies?
**Answer:** Yes, with `credentials: 'include'` option. Default is 'same-origin' (only same-origin requests).

## Additional Resources

- [MDN - Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)
- [MDN - Using Fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch)
