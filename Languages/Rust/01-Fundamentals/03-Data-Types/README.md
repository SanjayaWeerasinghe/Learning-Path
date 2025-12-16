# Data Types - Rust's Type System

## Understanding Rust's Types

Rust is a **statically typed** language - all types must be known at compile time. This prevents an entire class of bugs.

**Time**: 4-5 hours

---

## Scalar Types

Rust has four primary scalar types: integers, floats, booleans, and characters.

### Integers

**Signed Integers** (can be negative):

| Type | Size | Range |
|------|------|-------|
| `i8` | 8-bit | -128 to 127 |
| `i16` | 16-bit | -32,768 to 32,767 |
| `i32` | 32-bit | -2,147,483,648 to 2,147,483,647 |
| `i64` | 64-bit | -(2^63) to 2^63-1 |
| `i128` | 128-bit | -(2^127) to 2^127-1 |
| `isize` | arch | Depends on architecture (32 or 64-bit) |

**Unsigned Integers** (positive only):

| Type | Size | Range |
|------|------|-------|
| `u8` | 8-bit | 0 to 255 |
| `u16` | 16-bit | 0 to 65,535 |
| `u32` | 32-bit | 0 to 4,294,967,295 |
| `u64` | 64-bit | 0 to 2^64-1 |
| `u128` | 128-bit | 0 to 2^128-1 |
| `usize` | arch | Depends on architecture |

```rust
fn main() {
    let x: i32 = 42;          // 32-bit signed (default)
    let y: u8 = 255;          // 8-bit unsigned
    let z: i64 = -1_000_000;  // 64-bit signed

    println!("x={}, y={}, z={}", x, y, z);
}
```

**Number Literals**:

```rust
let decimal = 98_222;      // Underscore for readability
let hex = 0xff;            // Hexadecimal
let octal = 0o77;          // Octal
let binary = 0b1111_0000;  // Binary
let byte = b'A';           // Byte (u8 only)
```

**Default**: If not specified, integers default to `i32`.

### Floating-Point

| Type | Size | Precision |
|------|------|-----------|
| `f32` | 32-bit | Single precision |
| `f64` | 64-bit | Double precision (default) |

```rust
fn main() {
    let x = 2.0;      // f64 (default)
    let y: f32 = 3.0; // f32

    let pi: f64 = 3.14159265359;
}
```

### Numeric Operations

```rust
fn main() {
    // Addition
    let sum = 5 + 10;

    // Subtraction
    let difference = 95.5 - 4.3;

    // Multiplication
    let product = 4 * 30;

    // Division
    let quotient = 56.7 / 32.2;
    let floored = 2 / 3;  // = 0 (integer division!)

    // Remainder
    let remainder = 43 % 5;

    println!("{}, {}, {}, {}, {}, {}",
             sum, difference, product, quotient, floored, remainder);
}
```

### Boolean

```rust
fn main() {
    let t = true;
    let f: bool = false;  // Explicit type annotation

    // Boolean operations
    let and = true && false;  // false
    let or = true || false;   // true
    let not = !true;          // false
}
```

**Size**: 1 byte (not 1 bit!)

### Character

```rust
fn main() {
    let c = 'z';
    let z: char = 'ℤ';  // Unicode!
    let heart = '❤';
    let emoji = '😻';

    println!("{} {} {} {}", c, z, heart, emoji);
}
```

**Key Points**:
- Single quotes for `char`, double quotes for strings
- 4 bytes in size (Unicode scalar value)
- Represents any Unicode character

---

## Compound Types

### Tuples

Fixed-size collection of values with different types.

```rust
fn main() {
    let tup: (i32, f64, u8) = (500, 6.4, 1);

    // Destructuring
    let (x, y, z) = tup;
    println!("x={}, y={}, z={}", x, y, z);

    // Direct access
    let five_hundred = tup.0;
    let six_point_four = tup.1;
    let one = tup.2;
}
```

**Empty Tuple**:
```rust
let unit: () = ();  // Unit type (like void in other languages)
```

### Arrays

Fixed-size collection of values with the **same type**.

```rust
fn main() {
    // Array with type annotation
    let a: [i32; 5] = [1, 2, 3, 4, 5];

    // Array with same value
    let b = [3; 5];  // [3, 3, 3, 3, 3]

    // Accessing elements
    let first = a[0];
    let second = a[1];

    println!("First: {}, Second: {}", first, second);
}
```

**Array Properties**:
- Fixed size (known at compile time)
- Allocated on the stack
- Index out of bounds causes **panic** at runtime

```rust
fn main() {
    let a = [1, 2, 3];
    let index = 10;

    let element = a[index];  // PANIC: index out of bounds!
}
```

---

## Type Inference

Rust can usually infer types:

```rust
fn main() {
    let x = 5;         // i32 inferred
    let y = 2.0;       // f64 inferred
    let z = true;      // bool inferred
    let c = 'a';       // char inferred
}
```

When inference isn't possible:

```rust
fn main() {
    let guess = "42".parse().expect("Not a number!");
    // ❌ ERROR: type annotations needed
}
```

Fix with type annotation:

```rust
fn main() {
    let guess: i32 = "42".parse().expect("Not a number!");
    // ✅ OK
}
```

---

## Type Conversion

### Explicit Casting with `as`

```rust
fn main() {
    let x = 10u8;
    let y = 20u16;

    // Cannot add different types
    // let z = x + y;  // ❌ ERROR

    // Must cast explicitly
    let z = x as u16 + y;  // ✅ OK

    let a = 65i32;
    let c = a as u8 as char;  // 'A'
}
```

### Parsing Strings

```rust
fn main() {
    let num: i32 = "42".parse().unwrap();
    let float: f64 = "3.14".parse().unwrap();

    println!("{}, {}", num, float);
}
```

---

## Overflow Behavior

### Debug Mode

Integer overflow **panics** in debug mode:

```rust
fn main() {
    let x: u8 = 255;
    let y = x + 1;  // PANIC in debug!
}
```

### Release Mode

Integer overflow **wraps** in release mode:

```rust
fn main() {
    let x: u8 = 255;
    let y = x + 1;  // y = 0 (wraps around)
}
```

### Explicit Overflow Handling

```rust
fn main() {
    let x: u8 = 200;

    // Wrapping (always wrap)
    let y = x.wrapping_add(100);  // 44

    // Checked (returns Option)
    let z = x.checked_add(100);   // None

    // Saturating (clamp to max)
    let w = x.saturating_add(100); // 255

    // Overflowing (returns tuple)
    let (result, overflowed) = x.overflowing_add(100);
    println!("{}, {}", result, overflowed);  // 44, true
}
```

---

## Exercises

### Exercise 1: Type Exploration

Declare variables of each scalar type and print them:
```rust
fn main() {
    let int: i32 = ?;
    let unsigned: u64 = ?;
    let float: f64 = ?;
    let boolean: bool = ?;
    let character: char = ?;

    // Print all
}
```

### Exercise 2: Calculator

```rust
fn main() {
    let a = 10;
    let b = 3;

    // Perform all arithmetic operations
    // Print results
}
```

### Exercise 3: Temperature Converter

```rust
fn main() {
    let fahrenheit: f64 = 98.6;
    // Convert to Celsius
    // Print result
}
```

### Exercise 4: Tuple Destructuring

```rust
fn main() {
    let person = ("Alice", 30, true);
    // Destructure and print
}
```

### Exercise 5: Array Sum

```rust
fn main() {
    let numbers = [1, 2, 3, 4, 5];
    // Calculate sum
    // Print result
}
```

---

## Common Mistakes

### Mistake 1: Mixing Types

```rust
// ❌ ERROR
let x = 5 + 2.5;

// ✅ CORRECT
let x = 5.0 + 2.5;
// or
let x = 5 + 2.5 as i32;
```

### Mistake 2: Division Surprise

```rust
let x = 5 / 2;  // = 2, not 2.5! (integer division)
let y = 5.0 / 2.0;  // = 2.5
```

### Mistake 3: Array Bounds

```rust
let a = [1, 2, 3];
let x = a[5];  // PANIC!
```

---

## Quick Reference

```rust
// Integers
let x: i32 = 42;
let y: u8 = 255;

// Floats
let f: f64 = 3.14;

// Boolean
let b: bool = true;

// Character
let c: char = '🦀';

// Tuple
let t: (i32, f64, char) = (42, 3.14, 'x');
let (a, b, c) = t;  // Destructure

// Array
let arr: [i32; 5] = [1, 2, 3, 4, 5];
let first = arr[0];

// Type casting
let x = 10 as f64;
```

---

**Next**: `04-Functions` - Learn to organize code into reusable functions.
