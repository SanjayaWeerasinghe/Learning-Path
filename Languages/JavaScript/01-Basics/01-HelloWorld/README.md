# Hello World - Your First JavaScript Program

## What You'll Learn
- How to run JavaScript code
- Using console.log()
- Basic JavaScript syntax
- Comments in JavaScript

## Concept Overview

JavaScript can run in two main environments:
1. **Browser** - For web applications
2. **Node.js** - For server-side applications

### Your First Program

```javascript
console.log("Hello, World!");
```

This simple line outputs text to the console.

### Comments

```javascript
// This is a single-line comment

/*
This is a
multi-line comment
*/

console.log("Hello!"); // Comment after code
```

### Multiple Outputs

```javascript
console.log("Line 1");
console.log("Line 2");
console.log("Line 3");
```

### Different Console Methods

```javascript
console.log("Normal message");
console.error("Error message");  // Red color
console.warn("Warning message"); // Yellow color
console.info("Info message");
```

### Outputting Different Data Types

```javascript
console.log("Text");        // String
console.log(42);            // Number
console.log(true);          // Boolean
console.log(3 + 5);         // Expression
console.log("Result:", 10); // Multiple values
```

## How to Run JavaScript

### Method 1: Browser Console (Easiest)
1. Open any web browser (Chrome recommended)
2. Press `F12` or `Ctrl+Shift+I` (Windows) / `Cmd+Option+I` (Mac)
3. Click "Console" tab
4. Type your code and press Enter

### Method 2: HTML File
```html
<!DOCTYPE html>
<html>
<head>
    <title>My First JavaScript</title>
</head>
<body>
    <h1>Check the Console!</h1>

    <script>
        console.log("Hello from HTML!");
    </script>
</body>
</html>
```

Save as `index.html` and open in browser. Press F12 to see console.

### Method 3: External JS File
```html
<!-- index.html -->
<!DOCTYPE html>
<html>
<head>
    <title>JavaScript Practice</title>
</head>
<body>
    <h1>Open Console (F12)</h1>
    <script src="script.js"></script>
</body>
</html>
```

```javascript
// script.js
console.log("Hello from external file!");
```

## Your Tasks

### Task 1: Basic Hello World
Write code that prints "Hello, World!" to the console.

### Task 2: Personal Greeting
Print your name with a greeting: "Hello, my name is [Your Name]"

### Task 3: Multiple Lines
Print these three lines:
```
Welcome to JavaScript
This is my first program
Let's learn together!
```

### Task 4: Using Different Console Methods
Create a program that uses:
- console.log() for a normal message
- console.error() for an error message
- console.warn() for a warning
- console.info() for info

### Task 5: Comments Practice
Write a program with:
- Single-line comments explaining what each line does
- A multi-line comment at the top describing the program
- Print your favorite quote

### Task 6: Math Output
Print the results of:
- 10 + 5
- 20 - 7
- 6 * 8
- 100 / 4
- "Sum of 5 and 3 is: " followed by 5 + 3

### Task 7: ASCII Art
Create simple ASCII art using console.log():
```
  *
 ***
*****
 ***
  *
```

### Task 8: Multiple Values
Print multiple values in one console.log():
- Your name, age, and favorite color
- Separate them with commas

## Expected Output Examples

**Task 1:**
```
Hello, World!
```

**Task 3:**
```
Welcome to JavaScript
This is my first program
Let's learn together!
```

**Task 6:**
```
15
13
48
25
Sum of 5 and 3 is: 8
```

**Task 8:**
```
John 25 Blue
```

## Tips
- JavaScript is case-sensitive: `console.log` ≠ `Console.Log`
- Strings use quotes: `"text"` or `'text'`
- Semicolons are optional but recommended: `console.log("Hi");`
- Use F12 to open console in any browser
- Syntax errors will show in red in the console

## Common Errors
```javascript
// ❌ Missing quotes
console.log(Hello); // Error: Hello is not defined

// ✅ Correct
console.log("Hello");

// ❌ Typo in console
consol.log("Hi"); // Error: consol is not defined

// ✅ Correct
console.log("Hi");

// ❌ Missing parentheses
console.log "Hi"; // Syntax error

// ✅ Correct
console.log("Hi");
```

## Debugging
If something doesn't work:
1. Check for typos
2. Check console for error messages (red text)
3. Verify quotes are matched
4. Ensure parentheses are matched

## Fun Facts
- JavaScript was created in 10 days by Brendan Eich in 1995
- Originally called "Mocha," then "LiveScript"
- Not related to Java (marketing decision!)
- Powers 98% of all websites

## Next Steps
Once you complete these tasks, move on to `02-Variables` to learn how to store and use data!
