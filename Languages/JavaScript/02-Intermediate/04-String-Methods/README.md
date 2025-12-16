# String Methods in JavaScript

## Introduction

Strings are immutable sequences of characters. JavaScript provides numerous built-in methods for searching, extracting, and manipulating strings.

## Key Concepts

### 1. String Basics

```javascript
// Creating strings
let str1 = "Hello";
let str2 = 'World';
let str3 = `Template literal`;

// String length
console.log(str1.length);  // 5

// Accessing characters
console.log(str1[0]);      // "H"
console.log(str1.charAt(0));  // "H"
console.log(str1.at(-1));  // "o" (ES2022)

// Strings are immutable
str1[0] = "h";  // Doesn't change the string
console.log(str1);  // "Hello"
```

### 2. Case Conversion

```javascript
let text = "Hello World";

console.log(text.toLowerCase());  // "hello world"
console.log(text.toUpperCase());  // "HELLO WORLD"

// Original unchanged (immutable)
console.log(text);  // "Hello World"

// Capitalize first letter
function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

console.log(capitalize("hello"));  // "Hello"
```

### 3. Searching and Checking

```javascript
let text = "Hello World, welcome to JavaScript";

// indexOf() - first occurrence (-1 if not found)
console.log(text.indexOf("World"));     // 6
console.log(text.indexOf("world"));     // -1 (case-sensitive)
console.log(text.indexOf("o"));         // 4
console.log(text.indexOf("o", 5));      // 7 (start from index 5)

// lastIndexOf() - last occurrence
console.log(text.lastIndexOf("o"));     // 24

// includes() - check if contains (ES6)
console.log(text.includes("World"));    // true
console.log(text.includes("world"));    // false

// startsWith() - check start (ES6)
console.log(text.startsWith("Hello")); // true
console.log(text.startsWith("World")); // false

// endsWith() - check end (ES6)
console.log(text.endsWith("Script"));   // true
console.log(text.endsWith("World"));    // false
```

### 4. Extracting Substrings

```javascript
let text = "Hello World";

// slice(start, end) - extracts portion
console.log(text.slice(0, 5));    // "Hello"
console.log(text.slice(6));       // "World"
console.log(text.slice(-5));      // "World" (from end)
console.log(text.slice(-5, -1));  // "Worl"

// substring(start, end) - similar to slice
console.log(text.substring(0, 5)); // "Hello"
console.log(text.substring(6));    // "World"
// Negative values treated as 0
console.log(text.substring(-5));   // "Hello World"

// substr(start, length) - DEPRECATED
console.log(text.substr(6, 5));    // "World"
```

### 5. Splitting and Joining

```javascript
// split() - string to array
let text = "Hello World JavaScript";
let words = text.split(" ");
console.log(words);  // ["Hello", "World", "JavaScript"]

let chars = "Hello".split("");
console.log(chars);  // ["H", "e", "l", "l", "o"]

// Split with limit
let limited = text.split(" ", 2);
console.log(limited);  // ["Hello", "World"]

// CSV parsing
let csv = "John,Doe,30,Developer";
let data = csv.split(",");
console.log(data);  // ["John", "Doe", "30", "Developer"]

// Join array to string
let arr = ["Hello", "World"];
console.log(arr.join(" "));   // "Hello World"
console.log(arr.join("-"));   // "Hello-World"
console.log(arr.join(""));    // "HelloWorld"
```

### 6. Replacing and Trimming

```javascript
// replace() - replace first occurrence
let text = "Hello World World";
console.log(text.replace("World", "JavaScript"));
// "Hello JavaScript World"

// replaceAll() - replace all occurrences (ES2021)
console.log(text.replaceAll("World", "JavaScript"));
// "Hello JavaScript JavaScript"

// Replace with regex
console.log(text.replace(/World/g, "JavaScript"));
// "Hello JavaScript JavaScript"

// trim() - remove whitespace
let spaced = "  Hello World  ";
console.log(spaced.trim());       // "Hello World"
console.log(spaced.trimStart());  // "Hello World  "
console.log(spaced.trimEnd());    // "  Hello World"

// Remove specific characters
function trimChar(str, char) {
    const regex = new RegExp(`^${char}+|${char}+$`, 'g');
    return str.replace(regex, '');
}

console.log(trimChar("***Hello***", "*"));  // "Hello"
```

### 7. Padding

```javascript
// padStart() - pad at beginning
let num = "5";
console.log(num.padStart(3, "0"));  // "005"

let time = "9";
console.log(time.padStart(2, "0"));  // "09"

// padEnd() - pad at end
let str = "Hello";
console.log(str.padEnd(10, "."));  // "Hello....."

// Credit card masking
function maskCard(card) {
    return card.slice(-4).padStart(card.length, "*");
}

console.log(maskCard("1234567890123456"));  // "************3456"
```

### 8. Template Literals

```javascript
// String interpolation
let name = "John";
let age = 30;
let greeting = `Hello, ${name}! You are ${age} years old.`;

// Multi-line strings
let multiline = `
    This is a
    multi-line
    string
`;

// Expression evaluation
let a = 5, b = 3;
console.log(`${a} + ${b} = ${a + b}`);  // "5 + 3 = 8"

// Tagged templates
function tag(strings, ...values) {
    return strings.reduce((result, str, i) => {
        return result + str + (values[i] || '');
    }, '');
}

let output = tag`Hello ${name}, you are ${age} years old`;
```

## Code Examples

### Example 1: String Validation

```javascript
function validateEmail(email) {
    return email.includes("@") &&
           email.includes(".") &&
           email.indexOf("@") < email.lastIndexOf(".");
}

function validatePhone(phone) {
    // Remove non-digits
    const cleaned = phone.replace(/\D/g, "");
    return cleaned.length === 10;
}

function validatePassword(password) {
    return password.length >= 8 &&
           /[A-Z]/.test(password) &&
           /[a-z]/.test(password) &&
           /[0-9]/.test(password);
}

console.log(validateEmail("test@example.com"));  // true
console.log(validatePhone("555-123-4567"));      // true
console.log(validatePassword("Pass123"));        // true
```

### Example 2: String Utilities

```javascript
// Reverse string
function reverseString(str) {
    return str.split("").reverse().join("");
}

// Check palindrome
function isPalindrome(str) {
    const cleaned = str.toLowerCase().replace(/[^a-z0-9]/g, "");
    return cleaned === reverseString(cleaned);
}

// Count vowels
function countVowels(str) {
    const matches = str.match(/[aeiou]/gi);
    return matches ? matches.length : 0;
}

// Title case
function toTitleCase(str) {
    return str.split(" ")
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(" ");
}

console.log(reverseString("hello"));           // "olleh"
console.log(isPalindrome("A man a plan a canal Panama"));  // true
console.log(countVowels("hello world"));       // 3
console.log(toTitleCase("hello world"));       // "Hello World"
```

### Example 3: Text Processing

```javascript
// Word count
function wordCount(text) {
    return text.trim().split(/\s+/).length;
}

// Truncate text
function truncate(text, maxLength, suffix = "...") {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength - suffix.length) + suffix;
}

// Slug generation
function generateSlug(text) {
    return text.toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-");
}

// Extract hashtags
function extractHashtags(text) {
    const matches = text.match(/#\w+/g);
    return matches || [];
}

console.log(wordCount("Hello world, how are you?"));  // 5
console.log(truncate("This is a long text", 10));     // "This is..."
console.log(generateSlug("Hello World 2024!"));       // "hello-world-2024"
console.log(extractHashtags("Love #javascript and #coding"));  // ["#javascript", "#coding"]
```

## Practical Tasks

### Task 1: Create a String Formatter
```javascript
function formatString(template, data) {
    // Replace {key} with data[key]
    // Example: formatString("Hello {name}!", {name: "John"}) => "Hello John!"
}
```

### Task 2: Implement Word Wrapper
```javascript
function wrapText(text, lineLength) {
    // Wrap text to specified line length
    // Break at word boundaries
}
```

### Task 3: Create initials generator
```javascript
function getInitials(fullName) {
    // "John Doe" => "JD"
    // "John Michael Doe" => "JMD"
}
```

### Task 4: Implement Caesar Cipher
```javascript
function caesarCipher(str, shift) {
    // Shift each letter by shift positions
    // "abc" with shift 1 => "bcd"
}
```

## Best Practices

1. Use template literals for string interpolation
2. Use `includes()` instead of `indexOf() !== -1`
3. Remember strings are immutable
4. Use appropriate methods for the task
5. Consider performance for large strings

## Interview Questions

### Question 1: How do you reverse a string?
**Answer:** `str.split("").reverse().join("")` - split into array, reverse array, join back to string.

### Question 2: What's the difference between slice() and substring()?
**Answer:** Both extract portions. `slice()` accepts negative indices; `substring()` treats negative as 0. `slice()` is generally preferred.

### Question 3: How do you check if a string contains a substring?
**Answer:** Use `includes()` (returns boolean), or `indexOf()` (returns -1 if not found). `includes()` is more readable.

### Question 4: What are template literals?
**Answer:** Strings enclosed in backticks allowing interpolation `${expr}`, multi-line strings, and tagged templates. More powerful than regular strings.

### Question 5: How do you remove all occurrences of a substring?
**Answer:** Use `replaceAll()` (ES2021) or `replace()` with global regex flag: `str.replace(/substring/g, "replacement")`.

## Additional Resources

- [MDN - String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)
- [JavaScript.info - Strings](https://javascript.info/string)
