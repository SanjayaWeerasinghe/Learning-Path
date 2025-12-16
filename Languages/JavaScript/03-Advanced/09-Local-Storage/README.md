# Local Storage in JavaScript

## Introduction

The Web Storage API provides mechanisms for storing key-value pairs in the browser. localStorage persists data permanently, while sessionStorage clears when the session ends.

## Key Concepts

### 1. Basic Operations

```javascript
// Store data
localStorage.setItem('username', 'John');
localStorage.setItem('age', '30');

// Retrieve data
const username = localStorage.getItem('username');
console.log(username);  // "John"

// Remove item
localStorage.removeItem('age');

// Clear all
localStorage.clear();

// Check if key exists
if (localStorage.getItem('username')) {
    console.log('User logged in');
}
```

### 2. Storing Objects

```javascript
// Objects must be stringified
const user = { name: 'John', age: 30, email: 'john@example.com' };

// Store
localStorage.setItem('user', JSON.stringify(user));

// Retrieve
const storedUser = JSON.parse(localStorage.getItem('user'));
console.log(storedUser.name);  // "John"

// Helper functions
const storage = {
    set(key, value) {
        localStorage.setItem(key, JSON.stringify(value));
    },
    get(key) {
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item) : null;
    },
    remove(key) {
        localStorage.removeItem(key);
    },
    clear() {
        localStorage.clear();
    }
};
```

### 3. localStorage vs sessionStorage

```javascript
// localStorage - persists forever
localStorage.setItem('theme', 'dark');

// sessionStorage - clears on tab close
sessionStorage.setItem('tempData', 'value');

// Both have same API
sessionStorage.getItem('tempData');
sessionStorage.removeItem('tempData');
sessionStorage.clear();
```

### 4. Storage Events

```javascript
// Listen for storage changes (different tabs/windows)
window.addEventListener('storage', (e) => {
    console.log('Storage changed:');
    console.log('Key:', e.key);
    console.log('Old value:', e.oldValue);
    console.log('New value:', e.newValue);
    console.log('URL:', e.url);
});

// Only fires in OTHER tabs/windows, not current
```

## Code Examples

### Example 1: User Preferences

```javascript
class UserPreferences {
    constructor() {
        this.key = 'userPreferences';
        this.defaults = {
            theme: 'light',
            language: 'en',
            notifications: true
        };
    }

    get() {
        const stored = localStorage.getItem(this.key);
        return stored ? JSON.parse(stored) : this.defaults;
    }

    set(preferences) {
        const current = this.get();
        const updated = { ...current, ...preferences };
        localStorage.setItem(this.key, JSON.stringify(updated));
    }

    reset() {
        localStorage.setItem(this.key, JSON.stringify(this.defaults));
    }
}

const prefs = new UserPreferences();
prefs.set({ theme: 'dark' });
console.log(prefs.get());
```

### Example 2: Shopping Cart

```javascript
class ShoppingCart {
    constructor() {
        this.key = 'shoppingCart';
    }

    getItems() {
        const items = localStorage.getItem(this.key);
        return items ? JSON.parse(items) : [];
    }

    addItem(product) {
        const items = this.getItems();
        const existing = items.find(item => item.id === product.id);

        if (existing) {
            existing.quantity++;
        } else {
            items.push({ ...product, quantity: 1 });
        }

        localStorage.setItem(this.key, JSON.stringify(items));
    }

    removeItem(productId) {
        let items = this.getItems();
        items = items.filter(item => item.id !== productId);
        localStorage.setItem(this.key, JSON.stringify(items));
    }

    clear() {
        localStorage.removeItem(this.key);
    }

    getTotal() {
        const items = this.getItems();
        return items.reduce((total, item) =>
            total + (item.price * item.quantity), 0
        );
    }
}

const cart = new ShoppingCart();
cart.addItem({ id: 1, name: 'Laptop', price: 1000 });
console.log(cart.getTotal());
```

### Example 3: Form Data Persistence

```javascript
class FormPersistence {
    constructor(formId) {
        this.formId = formId;
        this.key = `form_${formId}`;
        this.form = document.getElementById(formId);
        this.init();
    }

    init() {
        this.loadData();
        this.form.addEventListener('input', () => this.saveData());
        this.form.addEventListener('submit', () => this.clearData());
    }

    saveData() {
        const formData = new FormData(this.form);
        const data = Object.fromEntries(formData.entries());
        localStorage.setItem(this.key, JSON.stringify(data));
    }

    loadData() {
        const saved = localStorage.getItem(this.key);
        if (!saved) return;

        const data = JSON.parse(saved);
        Object.keys(data).forEach(key => {
            const field = this.form.elements[key];
            if (field) field.value = data[key];
        });
    }

    clearData() {
        localStorage.removeItem(this.key);
    }
}

// Usage
const formPersist = new FormPersistence('myForm');
```

## Practical Tasks

### Task 1: Build Cache System
```javascript
class Cache {
    constructor(expirationMinutes) {
        // Store with expiration
        // Auto-cleanup expired items
    }

    set(key, value, ttl) {
        // Store with custom TTL
    }

    get(key) {
        // Return if not expired, null otherwise
    }
}
```

### Task 2: Create Todo App with Persistence
```javascript
class TodoApp {
    // Load, save, add, remove, toggle todos
    // Persist to localStorage
}
```

### Task 3: Implement Recently Viewed
```javascript
class RecentlyViewed {
    // Track last N viewed items
    // Store in localStorage
    // Limit to max items
}
```

## Best Practices

1. **Always use try-catch** (quota can exceed)
2. **Stringify/parse objects**
3. **Validate data before use**
4. **Clear sensitive data**
5. **Consider storage limits** (~5-10MB)
6. **Use consistent key naming**

```javascript
// Safe storage wrapper
function safeStorage(key, value) {
    try {
        localStorage.setItem(key, JSON.stringify(value));
        return true;
    } catch (e) {
        if (e.name === 'QuotaExceededError') {
            console.error('Storage quota exceeded');
        }
        return false;
    }
}
```

## Common Pitfalls

1. **Storing sensitive data** (never store passwords, tokens)
2. **Not handling quota errors**
3. **Forgetting to JSON.stringify objects**
4. **Assuming localStorage always available**
5. **Not validating retrieved data**

```javascript
// Check availability
function isStorageAvailable() {
    try {
        const test = '__storage_test__';
        localStorage.setItem(test, test);
        localStorage.removeItem(test);
        return true;
    } catch {
        return false;
    }
}
```

## Interview Questions

### Question 1: What's the difference between localStorage and sessionStorage?
**Answer:** localStorage persists until manually cleared; sessionStorage clears when tab/window closes. Both have same API and ~5MB limit per origin.

### Question 2: What are the limitations of Web Storage?
**Answer:** (1) ~5-10MB limit, (2) synchronous API (blocks main thread), (3) strings only (must stringify objects), (4) no encryption, (5) same-origin policy.

### Question 3: How do you handle storage quota errors?
**Answer:** Use try-catch around setItem, check for QuotaExceededError, implement cleanup strategy (remove old data, compress, use IndexedDB for large data).

### Question 4: Can localStorage be accessed across domains?
**Answer:** No, subject to same-origin policy. Different protocols, domains, or ports have separate storage.

### Question 5: How do you synchronize localStorage across tabs?
**Answer:** Use storage event listener. Fires in other tabs when storage changes: `window.addEventListener('storage', handler)`.

## Additional Resources

- [MDN - Web Storage API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API)
- [MDN - localStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage)
