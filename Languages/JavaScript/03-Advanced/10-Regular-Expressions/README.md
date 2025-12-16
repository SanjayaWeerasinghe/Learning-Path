# Regular Expressions in JavaScript

## Introduction

Regular expressions (regex) are patterns used to match character combinations in strings. Essential for validation, searching, and text processing.

## Key Concepts

### 1. Creating Regex

```javascript
// Literal notation
const regex1 = /pattern/flags;
const regex2 = /hello/i;  // Case-insensitive

// Constructor
const regex3 = new RegExp('pattern', 'flags');
const regex4 = new RegExp('hello', 'i');

// Dynamic patterns
const searchTerm = 'test';
const dynamicRegex = new RegExp(searchTerm, 'gi');
```

### 2. Regex Flags

```javascript
// g - global (find all matches)
'hello hello'.match(/hello/g);  // ['hello', 'hello']

// i - case-insensitive
'Hello'.match(/hello/i);  // ['Hello']

// m - multiline
const text = 'line1\nline2';
text.match(/^line/gm);  // ['line', 'line']

// s - dotall (. matches newlines)
'hello\nworld'.match(/hello.world/s);  // ['hello\nworld']

// u - unicode
/\u{1F600}/u.test('😀');  // true

// y - sticky (match from lastIndex)
const regex = /hello/y;
regex.lastIndex = 0;
```

### 3. Basic Patterns

```javascript
// Literal characters
/hello/.test('hello world');  // true

// Character classes
/[aeiou]/.test('hello');  // true (any vowel)
/[0-9]/.test('abc123');   // true (any digit)
/[a-z]/.test('Hello');    // true (lowercase letter)

// Negated character class
/[^0-9]/.test('123');     // false (not a digit)

// Metacharacters
/\d/.test('5');     // true (digit)
/\D/.test('a');     // true (non-digit)
/\w/.test('a');     // true (word character)
/\W/.test('!');     // true (non-word)
/\s/.test(' ');     // true (whitespace)
/\S/.test('a');     // true (non-whitespace)
/./.test('a');      // true (any character except newline)
```

### 4. Quantifiers

```javascript
// * - zero or more
/ho*t/.test('ht');      // true
/ho*t/.test('hot');     // true
/ho*t/.test('hooot');   // true

// + - one or more
/ho+t/.test('ht');      // false
/ho+t/.test('hot');     // true

// ? - zero or one
/colou?r/.test('color');    // true
/colou?r/.test('colour');   // true

// {n} - exactly n
/\d{3}/.test('123');    // true (3 digits)

// {n,} - n or more
/\d{2,}/.test('1');     // false
/\d{2,}/.test('12');    // true

// {n,m} - between n and m
/\d{2,4}/.test('12');   // true
/\d{2,4}/.test('12345');  // true (matches first 4)
```

### 5. Anchors and Boundaries

```javascript
// ^ - start of string
/^hello/.test('hello world');  // true
/^hello/.test('say hello');    // false

// $ - end of string
/world$/.test('hello world');  // true
/world$/.test('world hello');  // false

// \b - word boundary
/\bcat\b/.test('cat');         // true
/\bcat\b/.test('concatenate'); // false

// \B - non-word boundary
/\Bcat/.test('concatenate');   // true
```

### 6. Groups and Alternation

```javascript
// () - capturing group
const match = 'John Doe'.match(/(\w+) (\w+)/);
console.log(match[1]);  // "John"
console.log(match[2]);  // "Doe"

// (?:) - non-capturing group
/(?:Mr|Mrs|Ms) \w+/.test('Mr Smith');  // true

// | - alternation (OR)
/cat|dog/.test('I have a cat');  // true

// Named groups
const result = 'John Doe'.match(/(?<first>\w+) (?<last>\w+)/);
console.log(result.groups.first);  // "John"
console.log(result.groups.last);   // "Doe"
```

## Code Examples

### Example 1: Common Validations

```javascript
// Email validation
function isValidEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

// Phone number (US format)
function isValidPhone(phone) {
    const regex = /^\d{3}-\d{3}-\d{4}$/;
    return regex.test(phone);
}

// URL validation
function isValidURL(url) {
    const regex = /^https?:\/\/[\w\-]+(\.[\w\-]+)+[/#?]?.*$/;
    return regex.test(url);
}

// Password strength (8+ chars, uppercase, lowercase, digit)
function isStrongPassword(password) {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    return regex.test(password);
}

// Credit card (basic)
function isValidCreditCard(card) {
    const regex = /^\d{4}-\d{4}-\d{4}-\d{4}$/;
    return regex.test(card);
}
```

### Example 2: Text Extraction

```javascript
// Extract hashtags
function extractHashtags(text) {
    return text.match(/#\w+/g) || [];
}

console.log(extractHashtags('Love #javascript and #coding!'));
// ['#javascript', '#coding']

// Extract URLs
function extractURLs(text) {
    const regex = /https?:\/\/[^\s]+/g;
    return text.match(regex) || [];
}

// Extract email addresses
function extractEmails(text) {
    const regex = /[^\s@]+@[^\s@]+\.[^\s@]+/g;
    return text.match(regex) || [];
}

// Extract phone numbers
function extractPhones(text) {
    const regex = /\d{3}-\d{3}-\d{4}/g;
    return text.match(regex) || [];
}
```

### Example 3: String Manipulation

```javascript
// Replace all spaces with hyphens
const slug = 'Hello World 2024'.replace(/\s+/g, '-').toLowerCase();
// "hello-world-2024"

// Remove all non-alphanumeric
const clean = 'Hello, World!'.replace(/[^a-zA-Z0-9]/g, '');
// "HelloWorld"

// Format phone number
function formatPhone(phone) {
    const cleaned = phone.replace(/\D/g, '');
    const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
    if (match) {
        return `(${match[1]}) ${match[2]}-${match[3]}`;
    }
    return phone;
}

console.log(formatPhone('5551234567'));  // "(555) 123-4567"

// Redact credit card
function redactCreditCard(card) {
    return card.replace(/\d(?=\d{4})/g, '*');
}

console.log(redactCreditCard('1234-5678-9012-3456'));
// "****-****-****-3456"
```

### Example 4: Advanced Patterns

```javascript
// Lookahead - password must have digit
/(?=.*\d)/.test('abc123');  // true

// Negative lookahead
/^(?!.*admin)/.test('user123');  // true (doesn't contain 'admin')

// Lookbehind - match number after dollar sign
const match = '$100'.match(/(?<=\$)\d+/);
console.log(match[0]);  // "100"

// Match balanced parentheses (simple)
function hasBalancedParens(str) {
    let count = 0;
    for (let char of str) {
        if (char === '(') count++;
        if (char === ')') count--;
        if (count < 0) return false;
    }
    return count === 0;
}
```

## Practical Tasks

### Task 1: Build Form Validator
```javascript
const validators = {
    username: /^[a-zA-Z0-9_]{3,16}$/,
    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/
};

function validateForm(data) {
    // Validate each field
}
```

### Task 2: Implement Search Highlighting
```javascript
function highlightMatches(text, searchTerm) {
    // Wrap matches in <mark> tags
    // Handle case-insensitive
}
```

### Task 3: Create Markdown Parser
```javascript
function parseMarkdown(text) {
    // Convert **bold**, *italic*, [links](url)
    // Using regex replacements
}
```

## Best Practices

1. **Use regex literals** when pattern is static
2. **Escape special characters** when building dynamic patterns
3. **Test thoroughly** with edge cases
4. **Use named groups** for clarity
5. **Comment complex patterns**
6. **Consider performance** with large text

```javascript
// Good - clear and maintainable
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Escape dynamic input
function escapeRegex(str) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
```

## Interview Questions

### Question 1: What are regular expressions?
**Answer:** Patterns for matching character combinations in strings. Used for validation, searching, replacing. Created with `/pattern/flags` or `new RegExp()`.

### Question 2: What's the difference between test() and match()?
**Answer:** `test()` returns boolean; `match()` returns array of matches or null. Use test() for existence check, match() to extract matches.

### Question 3: What are regex flags?
**Answer:** Modifiers: `g` (global), `i` (case-insensitive), `m` (multiline), `s` (dotall), `u` (unicode), `y` (sticky). Change how pattern is applied.

### Question 4: What's a capturing group?
**Answer:** Parentheses `()` create group, capturing matched substring. Accessible in match results or via backreferences. Use `(?:)` for non-capturing.

### Question 5: How do you validate email with regex?
**Answer:** Basic: `/^[^\s@]+@[^\s@]+\.[^\s@]+$/`. Perfect validation impossible with regex alone. Better to verify by sending confirmation email.

## Additional Resources

- [MDN - Regular Expressions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions)
- [Regex101](https://regex101.com/) - Test and debug regex
- [RegexOne](https://regexone.com/) - Interactive tutorial
