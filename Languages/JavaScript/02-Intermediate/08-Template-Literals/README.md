# Template Literals in JavaScript

## Introduction

Template literals (template strings) are string literals allowing embedded expressions, multi-line strings, and string interpolation. Enclosed in backticks instead of quotes.

## Key Concepts

### 1. String Interpolation

```javascript
// Traditional concatenation
const name = 'John';
const age = 30;
const message = 'Hello, ' + name + '. You are ' + age + ' years old.';

// Template literal (cleaner)
const message = `Hello, ${name}. You are ${age} years old.`;

// Expressions in ${
}
const a = 5, b = 3;
console.log(`${a} + ${b} = ${a + b}`);  // "5 + 3 = 8"

// Function calls
const user = { getName: () => 'John' };
console.log(`User: ${user.getName()}`);  // "User: John"

// Ternary operators
const age = 20;
console.log(`Status: ${age >= 18 ? 'Adult' : 'Minor'}`);
```

### 2. Multi-line Strings

```javascript
// Traditional (awkward)
const text = 'Line 1\n' +
             'Line 2\n' +
             'Line 3';

// Template literal (natural)
const text = `
    Line 1
    Line 2
    Line 3
`;

// HTML templates
const html = `
    <div class="card">
        <h2>${title}</h2>
        <p>${description}</p>
    </div>
`;

// SQL queries
const query = `
    SELECT name, age
    FROM users
    WHERE age > ${minAge}
    ORDER BY name
`;
```

### 3. Tagged Templates

```javascript
// Tag function receives strings and values separately
function tag(strings, ...values) {
    console.log(strings);  // Array of string parts
    console.log(values);   // Array of interpolated values
}

const name = 'John';
const age = 30;
tag`Hello ${name}, you are ${age} years old`;
// strings: ['Hello ', ', you are ', ' years old']
// values: ['John', 30]

// Practical example: HTML escaping
function html(strings, ...values) {
    return strings.reduce((result, str, i) => {
        const value = values[i - 1];
        const escaped = String(value)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;');
        return result + escaped + str;
    });
}

const userInput = '<script>alert("XSS")</script>';
const safe = html`<div>${userInput}</div>`;
// <div>&lt;script&gt;alert("XSS")&lt;/script&gt;</div>
```

## Code Examples

### Example 1: Dynamic HTML Generation

```javascript
function createUserCard(user) {
    return `
        <div class="user-card">
            <img src="${user.avatar}" alt="${user.name}">
            <h3>${user.name}</h3>
            <p>${user.email}</p>
            <span class="badge ${user.role}">${user.role}</span>
        </div>
    `;
}

const user = {
    name: 'John Doe',
    email: 'john@example.com',
    avatar: '/img/john.jpg',
    role: 'admin'
};

document.body.innerHTML = createUserCard(user);
```

### Example 2: Formatting Utilities

```javascript
// Currency formatter
function currency(amount, symbol = '$') {
    return `${symbol}${amount.toFixed(2)}`;
}

const price = 19.99;
console.log(`Price: ${currency(price)}`);  // "Price: $19.99"

// Date formatter
function formatDate(date) {
    const d = new Date(date);
    return `${d.getMonth() + 1}/${d.getDate()}/${d.getFullYear()}`;
}

console.log(`Date: ${formatDate(new Date())}`);

// List formatter
function formatList(items) {
    return items.length === 0 ? 'none' :
           items.length === 1 ? items[0] :
           `${items.slice(0, -1).join(', ')} and ${items.slice(-1)}`;
}

console.log(`Users: ${formatList(['John', 'Jane', 'Bob'])}`);
// "Users: John, Jane and Bob"
```

### Example 3: Template Builder

```javascript
// Email template
function emailTemplate({ name, product, price, date }) {
    return `
        Dear ${name},

        Thank you for your purchase!

        Product: ${product}
        Price: $${price}
        Date: ${date}

        We hope you enjoy your purchase.

        Best regards,
        The Team
    `.trim();
}

const email = emailTemplate({
    name: 'John',
    product: 'Laptop',
    price: 999.99,
    date: '2024-01-15'
});
```

## Practical Tasks

### Task 1: Create Table Generator
```javascript
function generateTable(headers, rows) {
    // Generate HTML table using template literals
}

const headers = ['Name', 'Age', 'City'];
const rows = [
    ['John', 30, 'NYC'],
    ['Jane', 25, 'LA']
];
```

### Task 2: Build URL Constructor
```javascript
function buildURL(base, params) {
    // Create URL with query parameters
    // buildURL('api.com/users', {id: 1, active: true})
    // => 'api.com/users?id=1&active=true'
}
```

### Task 3: Markdown to HTML
```javascript
function markdown(strings, ...values) {
    // Convert simple markdown to HTML
    // markdown`**bold** and *italic*`
    // => '<strong>bold</strong> and <em>italic</em>'
}
```

## Best Practices

1. **Use for string interpolation** instead of concatenation
2. **Use for multi-line strings** instead of \n
3. **Escape user input** when generating HTML
4. **Keep templates readable** with proper indentation
5. **Use tagged templates** for special formatting

## Interview Questions

### Question 1: What are template literals?
**Answer:** Strings enclosed in backticks allowing: (1) embedded expressions with `${}`, (2) multi-line strings, (3) tagged templates. More powerful than regular strings.

### Question 2: What's the difference between ' and `?
**Answer:** Single/double quotes create regular strings; backticks create template literals with interpolation and multi-line support.

### Question 3: What are tagged templates?
**Answer:** Functions that process template literals, receiving string parts and interpolated values separately. Useful for custom formatting, escaping, or validation.

### Question 4: Can you nest template literals?
**Answer:** Yes, you can nest template literals within `${}` expressions: `` `outer ${`inner ${value}`}` ``.

### Question 5: Do template literals preserve whitespace?
**Answer:** Yes, all whitespace including newlines and indentation is preserved. Use `.trim()` if needed.

## Additional Resources

- [MDN - Template Literals](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals)
- [JavaScript.info - Template Literals](https://javascript.info/string)
