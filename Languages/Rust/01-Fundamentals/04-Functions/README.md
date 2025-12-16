# Functions - Code Organization in Rust

## Building Blocks of Rust Programs

Functions are the primary way to organize code in Rust. Master them early!

**Time**: 3-4 hours

---

## Basic Function Syntax

```rust
fn main() {
    println!("Hello!");
    another_function();
}

fn another_function() {
    println!("Another function!");
}
```

**Key Points**:
- `fn` keyword declares functions
- Function names use `snake_case`
- `main` is special - program entry point
- Order doesn't matter (can call before definition)

---

## Parameters

### Single Parameter

```rust
fn greet(name: &str) {
    println!("Hello, {}!", name);
}

fn main() {
    greet("Alice");
    greet("Bob");
}
```

### Multiple Parameters

```rust
fn print_sum(x: i32, y: i32) {
    println!("{} + {} = {}", x, y, x + y);
}

fn main() {
    print_sum(5, 3);  // 5 + 3 = 8
}
```

**Important**: Type annotations are **required** for parameters!

```rust
// ❌ ERROR
fn add(x, y) {
    x + y
}

// ✅ CORRECT
fn add(x: i32, y: i32) -> i32 {
    x + y
}
```

---

## Return Values

### Implicit Return (No `return` keyword)

```rust
fn add(x: i32, y: i32) -> i32 {
    x + y  // No semicolon! This is an expression
}

fn main() {
    let result = add(5, 3);
    println!("5 + 3 = {}", result);  // 8
}
```

### Explicit Return

```rust
fn add(x: i32, y: i32) -> i32 {
    return x + y;  // With return keyword and semicolon
}
```

### Early Return

```rust
fn divide(x: i32, y: i32) -> i32 {
    if y == 0 {
        return 0;  // Early return
    }
    x / y  // Implicit return
}
```

---

## Statements vs Expressions

This is **critical** in Rust!

### Statement

Does NOT return a value. Ends with `;`.

```rust
let x = 5;  // Statement
```

### Expression

Returns a value. NO `;` at end.

```rust
5 + 3  // Expression (returns 8)
{
    let x = 3;
    x + 1  // Expression (returns 4)
}
```

### In Functions

```rust
fn five() -> i32 {
    5  // Expression - returned
}

fn main() {
    let x = five();
    println!("{}", x);  // 5
}
```

### Common Mistake

```rust
fn add(x: i32, y: i32) -> i32 {
    x + y;  // ❌ WRONG! Semicolon makes it a statement
}
```

Error: Expected `i32`, found `()`

**Fix**: Remove semicolon

```rust
fn add(x: i32, y: i32) -> i32 {
    x + y  // ✅ CORRECT! Expression returns value
}
```

---

## Unit Type `()`

Functions that don't return a value actually return `()`:

```rust
fn print_hello() {
    println!("Hello!");
}
// Equivalent to:
fn print_hello() -> () {
    println!("Hello!");
}
```

---

## Multiple Return Values (Tuples)

```rust
fn swap(x: i32, y: i32) -> (i32, i32) {
    (y, x)  // Return tuple
}

fn main() {
    let (a, b) = swap(1, 2);
    println!("a={}, b={}", a, b);  // a=2, b=1
}
```

### Example: Division with Remainder

```rust
fn divide_with_remainder(dividend: i32, divisor: i32) -> (i32, i32) {
    let quotient = dividend / divisor;
    let remainder = dividend % divisor;
    (quotient, remainder)
}

fn main() {
    let (q, r) = divide_with_remainder(17, 5);
    println!("17 / 5 = {} remainder {}", q, r);
    // Output: 17 / 5 = 3 remainder 2
}
```

---

## Practical Examples

### Example 1: Temperature Converter

```rust
fn fahrenheit_to_celsius(f: f64) -> f64 {
    (f - 32.0) * 5.0 / 9.0
}

fn celsius_to_fahrenheit(c: f64) -> f64 {
    c * 9.0 / 5.0 + 32.0
}

fn main() {
    let temp_f = 98.6;
    let temp_c = fahrenheit_to_celsius(temp_f);
    println!("{}°F = {:.1}°C", temp_f, temp_c);
    // Output: 98.6°F = 37.0°C
}
```

### Example 2: Is Even/Odd

```rust
fn is_even(n: i32) -> bool {
    n % 2 == 0
}

fn main() {
    println!("4 is even: {}", is_even(4));  // true
    println!("7 is even: {}", is_even(7));  // false
}
```

### Example 3: Maximum of Three

```rust
fn max_of_three(a: i32, b: i32, c: i32) -> i32 {
    let max_ab = if a > b { a } else { b };
    if max_ab > c { max_ab } else { c }
}

fn main() {
    let result = max_of_three(10, 25, 15);
    println!("Max: {}", result);  // 25
}
```

---

## Exercises

### Exercise 1: Basic Functions

Create functions:
- `square(n: i32) -> i32` - returns n²
- `cube(n: i32) -> i32` - returns n³
- Test with various inputs

### Exercise 2: Multiple Parameters

```rust
fn calculate(a: f64, b: f64, operation: char) -> f64 {
    // Return a+b if operation is '+'
    // Return a-b if operation is '-'
    // etc.
}
```

### Exercise 3: Tuple Returns

```rust
fn min_max(a: i32, b: i32, c: i32) -> (i32, i32) {
    // Return (minimum, maximum)
}
```

### Exercise 4: Circle Calculator

```rust
fn circle_area(radius: f64) -> f64 {
    // Calculate area
}

fn circle_circumference(radius: f64) -> f64 {
    // Calculate circumference
}

fn circle_stats(radius: f64) -> (f64, f64) {
    // Return (area, circumference)
}
```

### Exercise 5: Fibonacci

```rust
fn fibonacci(n: u32) -> u32 {
    // Return nth fibonacci number
    // 0, 1, 1, 2, 3, 5, 8, 13, ...
}
```

---

## Common Patterns

### Pattern: Helper Functions

```rust
fn is_leap_year(year: i32) -> bool {
    year % 4 == 0 && (year % 100 != 0 || year % 400 == 0)
}

fn days_in_february(year: i32) -> i32 {
    if is_leap_year(year) {
        29
    } else {
        28
    }
}
```

### Pattern: Input Validation

```rust
fn divide_safe(a: f64, b: f64) -> Option<f64> {
    if b == 0.0 {
        None
    } else {
        Some(a / b)
    }
}
```

---

## Best Practices

### ✅ Function Names

```rust
// Good: Descriptive, action verbs
fn calculate_total_price() -> f64 { }
fn is_valid_email() -> bool { }
fn convert_to_uppercase() -> String { }

// Bad: Vague, unclear
fn calc() -> f64 { }
fn check() -> bool { }
fn do_stuff() -> String { }
```

### ✅ Keep Functions Small

```rust
// Good: One responsibility
fn validate_email(email: &str) -> bool {
    email.contains('@') && email.contains('.')
}

// Bad: Too many responsibilities
fn process_user_data(data: &str) -> Result<User, Error> {
    // Parsing, validation, transformation, saving...
    // 100+ lines
}
```

### ✅ Type Annotations Always

```rust
// ✅ Clear
fn add(a: i32, b: i32) -> i32 {
    a + b
}

// ❌ Won't compile
fn add(a, b) {
    a + b
}
```

---

## Quick Reference

```rust
// Basic function
fn greet() {
    println!("Hello!");
}

// With parameters
fn greet(name: &str) {
    println!("Hello, {}!", name);
}

// With return value
fn add(x: i32, y: i32) -> i32 {
    x + y  // No semicolon!
}

// Multiple returns (tuple)
fn swap(x: i32, y: i32) -> (i32, i32) {
    (y, x)
}

// Early return
fn divide(x: i32, y: i32) -> i32 {
    if y == 0 {
        return 0;
    }
    x / y
}
```

---

**Next**: `05-Control-Flow` - Learn `if`, loops, and `match`.
