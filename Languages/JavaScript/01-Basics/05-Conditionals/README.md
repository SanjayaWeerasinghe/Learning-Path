# Conditionals in JavaScript

## Introduction

Conditional statements allow you to execute different code blocks based on different conditions. They are fundamental to creating dynamic and interactive programs that can make decisions.

## Key Concepts

### 1. if Statement

Executes a block of code if a specified condition is true.

```javascript
let age = 18;

if (age >= 18) {
    console.log("You are an adult");
}

// Without braces (single statement only - not recommended)
if (age >= 18) console.log("Adult");
```

### 2. if...else Statement

Executes one block if the condition is true, another if it's false.

```javascript
let temperature = 25;

if (temperature > 30) {
    console.log("It's hot outside");
} else {
    console.log("The weather is pleasant");
}
```

### 3. if...else if...else Statement

Tests multiple conditions in sequence.

```javascript
let score = 85;

if (score >= 90) {
    console.log("Grade: A");
} else if (score >= 80) {
    console.log("Grade: B");
} else if (score >= 70) {
    console.log("Grade: C");
} else if (score >= 60) {
    console.log("Grade: D");
} else {
    console.log("Grade: F");
}
```

### 4. Nested if Statements

if statements inside other if statements.

```javascript
let age = 25;
let hasLicense = true;

if (age >= 18) {
    if (hasLicense) {
        console.log("You can drive");
    } else {
        console.log("You need a license");
    }
} else {
    console.log("You are too young to drive");
}
```

### 5. switch Statement

Evaluates an expression and executes code based on matching cases.

```javascript
let day = 3;
let dayName;

switch (day) {
    case 1:
        dayName = "Monday";
        break;
    case 2:
        dayName = "Tuesday";
        break;
    case 3:
        dayName = "Wednesday";
        break;
    case 4:
        dayName = "Thursday";
        break;
    case 5:
        dayName = "Friday";
        break;
    case 6:
        dayName = "Saturday";
        break;
    case 7:
        dayName = "Sunday";
        break;
    default:
        dayName = "Invalid day";
}

console.log(dayName); // "Wednesday"
```

### 6. switch with Fall-through

Multiple cases can share the same code block.

```javascript
let month = "January";
let season;

switch (month) {
    case "December":
    case "January":
    case "February":
        season = "Winter";
        break;
    case "March":
    case "April":
    case "May":
        season = "Spring";
        break;
    case "June":
    case "July":
    case "August":
        season = "Summer";
        break;
    case "September":
    case "October":
    case "November":
        season = "Fall";
        break;
    default:
        season = "Unknown";
}

console.log(season); // "Winter"
```

### 7. Ternary Operator

Shorthand for simple if-else statements.

```javascript
// Syntax: condition ? expressionIfTrue : expressionIfFalse

let age = 20;
let status = age >= 18 ? "Adult" : "Minor";
console.log(status); // "Adult"

// Can be nested (use sparingly)
let score = 85;
let grade = score >= 90 ? "A" :
            score >= 80 ? "B" :
            score >= 70 ? "C" : "F";
console.log(grade); // "B"

// In function returns
function getDiscount(isMember) {
    return isMember ? 0.1 : 0;
}
```

### 8. Truthy and Falsy Values in Conditionals

JavaScript converts values to boolean in conditional contexts.

```javascript
// Falsy values: false, 0, "", null, undefined, NaN
// Truthy values: everything else

let name = "John";
if (name) {  // "John" is truthy
    console.log("Name is provided");
}

let count = 0;
if (count) {  // 0 is falsy
    console.log("This won't run");
}

let user = null;
if (!user) {  // null is falsy, !null is true
    console.log("No user found");
}

// Empty arrays and objects are truthy
if ([]) console.log("Empty array is truthy");
if ({}) console.log("Empty object is truthy");
```

## Code Examples

### Example 1: User Authentication

```javascript
function checkAccess(age, isMember, hasTicket) {
    if (age < 18) {
        return "Access denied: Must be 18 or older";
    }

    if (!hasTicket) {
        return "Access denied: Ticket required";
    }

    if (isMember) {
        return "Welcome! VIP access granted";
    } else {
        return "Welcome! Standard access granted";
    }
}

console.log(checkAccess(25, true, true));   // VIP access
console.log(checkAccess(16, true, true));   // Age restriction
console.log(checkAccess(25, false, false)); // No ticket
```

### Example 2: Grade Calculator with Multiple Conditions

```javascript
function calculateGrade(score, attendance, hasBonus) {
    // Attendance penalty
    if (attendance < 75) {
        return "F - Insufficient attendance";
    }

    // Apply bonus
    if (hasBonus) {
        score += 5;
    }

    // Cap at 100
    score = Math.min(score, 100);

    // Calculate grade
    if (score >= 90) return "A";
    if (score >= 80) return "B";
    if (score >= 70) return "C";
    if (score >= 60) return "D";
    return "F";
}

console.log(calculateGrade(85, 80, true));  // "A" (85 + 5 = 90)
console.log(calculateGrade(85, 70, false)); // "F" (low attendance)
console.log(calculateGrade(75, 90, false)); // "C"
```

### Example 3: Complex Conditional Logic

```javascript
function processOrder(orderTotal, customerType, hasCoupon) {
    let discount = 0;
    let shippingFee = 5;

    // Determine discount based on customer type
    if (customerType === "premium") {
        discount = 0.20;
        shippingFee = 0;
    } else if (customerType === "member") {
        discount = 0.10;
    } else if (hasCoupon) {
        discount = 0.05;
    }

    // Free shipping for orders over $50
    if (orderTotal > 50) {
        shippingFee = 0;
    }

    // Calculate final price
    let discountAmount = orderTotal * discount;
    let subtotal = orderTotal - discountAmount;
    let total = subtotal + shippingFee;

    return {
        original: orderTotal,
        discount: discountAmount,
        shipping: shippingFee,
        total: total
    };
}

console.log(processOrder(100, "premium", false));
// { original: 100, discount: 20, shipping: 0, total: 80 }

console.log(processOrder(30, "regular", true));
// { original: 30, discount: 1.5, shipping: 5, total: 33.5 }
```

### Example 4: Traffic Light System

```javascript
function getAction(lightColor) {
    switch (lightColor.toLowerCase()) {
        case "red":
            return "Stop";
        case "yellow":
            return "Slow down";
        case "green":
            return "Go";
        default:
            return "Invalid light color";
    }
}

console.log(getAction("red"));    // "Stop"
console.log(getAction("GREEN"));  // "Go"
console.log(getAction("blue"));   // "Invalid light color"
```

### Example 5: Using Guard Clauses

```javascript
// Without guard clauses (nested)
function processPayment(user, amount) {
    if (user) {
        if (user.isActive) {
            if (user.balance >= amount) {
                user.balance -= amount;
                return "Payment successful";
            } else {
                return "Insufficient balance";
            }
        } else {
            return "Account is inactive";
        }
    } else {
        return "User not found";
    }
}

// With guard clauses (cleaner)
function processPaymentClean(user, amount) {
    if (!user) return "User not found";
    if (!user.isActive) return "Account is inactive";
    if (user.balance < amount) return "Insufficient balance";

    user.balance -= amount;
    return "Payment successful";
}
```

## Practical Tasks

### Task 1: Temperature Classifier
Create a function that classifies temperature.

```javascript
function classifyTemperature(celsius) {
    // Return:
    // "Freezing" if below 0
    // "Cold" if 0-15
    // "Mild" if 16-25
    // "Warm" if 26-35
    // "Hot" if above 35
}

// Test cases
console.log(classifyTemperature(-5));   // "Freezing"
console.log(classifyTemperature(10));   // "Cold"
console.log(classifyTemperature(30));   // "Warm"
```

### Task 2: Leap Year Checker
Determine if a year is a leap year.

```javascript
function isLeapYear(year) {
    // A year is a leap year if:
    // - Divisible by 4
    // - But not divisible by 100
    // - Unless also divisible by 400
    // Return true or false
}

// Test cases
console.log(isLeapYear(2024));  // true
console.log(isLeapYear(2023));  // false
console.log(isLeapYear(2000));  // true
console.log(isLeapYear(1900));  // false
```

### Task 3: Movie Ticket Pricer
Calculate ticket price based on age and time.

```javascript
function getTicketPrice(age, isMatinee) {
    // Regular price: $12
    // Matinee discount: 25% off
    // Children (under 12): 50% off
    // Seniors (65+): 30% off
    // Apply matinee discount after age discount
    // Return final price
}

// Test cases
console.log(getTicketPrice(10, false));  // $6
console.log(getTicketPrice(30, true));   // $9
console.log(getTicketPrice(70, true));   // $6.30
```

### Task 4: Rock Paper Scissors
Implement a rock-paper-scissors game.

```javascript
function rockPaperScissors(player1, player2) {
    // Valid inputs: "rock", "paper", "scissors"
    // Return: "Player 1 wins", "Player 2 wins", or "Tie"
    // Handle invalid inputs
}

// Test cases
console.log(rockPaperScissors("rock", "scissors"));  // "Player 1 wins"
console.log(rockPaperScissors("paper", "rock"));     // "Player 1 wins"
console.log(rockPaperScissors("rock", "rock"));      // "Tie"
```

## Best Practices

1. **Use strict equality (`===`)** in conditions
2. **Use guard clauses** to reduce nesting
3. **Order conditions from most to least specific**
4. **Use switch for multiple equality checks** on the same value
5. **Don't forget `break` in switch statements**
6. **Use ternary for simple conditions only**
7. **Avoid deep nesting** - maximum 2-3 levels
8. **Make conditions readable** - extract complex conditions to variables

```javascript
// Good practices
function processUser(user) {
    // Guard clauses
    if (!user) return "No user";
    if (!user.isActive) return "Inactive user";

    // Clear condition
    const hasAccess = user.role === "admin" || user.permissions.includes("write");
    if (hasAccess) {
        return "Access granted";
    }

    return "Access denied";
}

// Avoid
function processUserBad(user) {
    if (user) {
        if (user.isActive) {
            if (user.role === "admin" || user.permissions.includes("write")) {
                return "Access granted";
            } else {
                return "Access denied";
            }
        } else {
            return "Inactive user";
        }
    } else {
        return "No user";
    }
}
```

## Common Pitfalls

1. **Forgetting `break` in switch** - causes fall-through
2. **Using assignment (`=`) instead of comparison (`===`)**
3. **Not handling all possible cases**
4. **Over-nesting conditionals** - hard to read
5. **Comparing with wrong types** - use strict equality
6. **Not considering truthy/falsy values**

```javascript
// Common mistakes
let x = 5;

// Wrong - assignment instead of comparison
if (x = 10) {  // Always true, sets x to 10
    console.log("This always runs");
}

// Wrong - missing break
switch (x) {
    case 5:
        console.log("Five");
    case 10:
        console.log("Ten");  // Also runs for case 5!
        break;
}

// Wrong - loose equality
if (x == "5") {  // true due to type coercion
    console.log("Use === instead");
}

// Wrong - not checking array length
let items = [];
if (items) {  // true - empty array is truthy
    console.log("Has items");  // Wrong!
}
if (items.length > 0) {  // Correct way
    console.log("Has items");
}
```

## Interview Questions

### Question 1: What's the difference between if-else and switch?
**Answer:**
- `if-else` is more flexible and can test any condition
- `switch` is optimized for checking one value against multiple possible values
- `switch` uses strict equality (`===`) for comparisons
- `switch` can be more readable when checking many values
- `if-else` is needed for range checks or complex conditions
- Always use `break` in switch cases to prevent fall-through

### Question 2: Explain truthy and falsy values and how they affect conditionals.
**Answer:** In JavaScript, all values are either truthy or falsy when evaluated in a boolean context.
- Falsy values (6 total): `false`, `0`, `""` (empty string), `null`, `undefined`, `NaN`
- All other values are truthy, including `"0"`, `"false"`, `[]`, `{}`, and any object
- This affects conditionals: `if (value)` checks if value is truthy
- Important to check specifically: `if (array.length > 0)` not just `if (array)`

### Question 3: What is a guard clause and why use it?
**Answer:** A guard clause is an early return statement that handles edge cases or invalid conditions at the beginning of a function. Benefits:
- Reduces nesting and improves readability
- Makes error conditions explicit and easy to find
- Follows the "fail fast" principle
- Makes the main logic clearer by removing it from deep nesting
- Example: `if (!user) return "Error";` before processing the user

### Question 4: What happens if you forget break in a switch statement?
**Answer:** Without `break`, execution "falls through" to the next case, executing its code regardless of whether it matches. This is usually a bug but can be intentional for grouping cases. Example:
```javascript
switch (value) {
    case 1:
        console.log("One");
        // No break - falls through
    case 2:
        console.log("Two");  // Runs for both 1 and 2
}
```

### Question 5: When should you use ternary operators vs if-else?
**Answer:**
- Use ternary for simple, single-line conditional assignments
- Use if-else for complex logic, multiple statements, or multiple conditions
- Avoid nested ternaries as they're hard to read
- Good ternary use: `let status = age >= 18 ? "adult" : "minor";`
- Avoid: `let x = a ? (b ? c : d) : (e ? f : g);` (use if-else instead)

## Additional Resources

- [MDN - if...else](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/if...else)
- [MDN - switch](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/switch)
- [MDN - Conditional Operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Conditional_Operator)
- [JavaScript.info - Conditional Operators](https://javascript.info/ifelse)
