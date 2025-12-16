# Variables & Mutability - Understanding Rust's Core Concept

## The Foundation of Rust Programming

Rust's approach to variables is different from other languages. Understanding mutability is crucial to mastering Rust.

**Time**: 3-4 hours

---

## Variables in Rust

### Basic Variable Declaration

```rust
fn main() {
    let x = 5;  // Immutable by default!
    println!("x = {}", x);
}
```

**Key Insight**: Variables are **immutable by default** in Rust. This is the opposite of most languages!

### Attempting to Mutate

```rust
fn main() {
    let x = 5;
    x = 6;  // ❌ ERROR: cannot assign twice to immutable variable
}
```

**Error message**:
```
error[E0384]: cannot assign twice to immutable variable `x`
```

---

## Mutable Variables

### Using `mut` Keyword

```rust
fn main() {
    let mut x = 5;  // Now mutable!
    println!("x = {}", x);

    x = 6;  // ✅ OK: x is mutable
    println!("x = {}", x);
}
```

**Output**:
```
x = 5
x = 6
```

### Why Immutable by Default?

1. **Safety**: Prevents accidental changes
2. **Concurrency**: Immutable data is thread-safe
3. **Reasoning**: Easier to understand code
4. **Compiler optimizations**: More aggressive optimizations

**Philosophy**: "Explicit is better than implicit"

---

## Constants

### Declaring Constants

```rust
const MAX_POINTS: u32 = 100_000;  // Type annotation required!
const PI: f64 = 3.14159;

fn main() {
    println!("Max points: {}", MAX_POINTS);
}
```

### Constants vs Variables

| Feature | `let` | `let mut` | `const` |
|---------|-------|-----------|---------|
| **Mutability** | Immutable | Mutable | Always immutable |
| **Type annotation** | Optional | Optional | **Required** |
| **Scope** | Block | Block | Global or block |
| **Value** | Runtime | Runtime | **Compile-time only** |
| **Naming** | snake_case | snake_case | SCREAMING_SNAKE_CASE |

### Constant Rules

```rust
// ✅ GOOD: Compile-time constant
const MAX_PLAYERS: u32 = 100;

// ❌ ERROR: Cannot use runtime values
const CURRENT_TIME: u32 = get_time();  // Won't compile!

// ❌ ERROR: const cannot be mutable
const mut X: i32 = 5;  // Invalid syntax
```

---

## Shadowing

### Redeclaring Variables

```rust
fn main() {
    let x = 5;
    let x = x + 1;  // Shadows previous x
    let x = x * 2;  // Shadows again

    println!("x = {}", x);  // Output: x = 12
}
```

**What happened?**
1. First `x = 5`
2. Second `x = 5 + 1 = 6` (shadows first)
3. Third `x = 6 * 2 = 12` (shadows second)

### Shadowing vs Mutation

```rust
// Shadowing: Creates NEW variable
let x = 5;
let x = x + 1;  // Different variable, same name

// Mutation: Changes SAME variable
let mut y = 5;
y = y + 1;  // Same variable, new value
```

### Shadowing Allows Type Changes

```rust
fn main() {
    let spaces = "   ";        // String
    let spaces = spaces.len(); // Number (different type!)
    println!("{}", spaces);    // Output: 3
}
```

**This is IMPOSSIBLE with `mut`**:

```rust
fn main() {
    let mut spaces = "   ";
    spaces = spaces.len();  // ❌ ERROR: mismatched types
}
```

---

## Scopes and Lifetimes

### Block Scope

```rust
fn main() {
    let x = 5;

    {
        let y = 10;
        println!("x = {}, y = {}", x, y);  // Both visible
    }

    println!("{}", y);  // ❌ ERROR: y not in scope
}
```

### Shadowing in Scopes

```rust
fn main() {
    let x = 5;

    {
        let x = 10;  // Shadows outer x in this scope
        println!("Inner x = {}", x);  // 10
    }

    println!("Outer x = {}", x);  // 5 (unchanged!)
}
```

**Output**:
```
Inner x = 10
Outer x = 5
```

---

## Practical Examples

### Example 1: Counter

```rust
fn main() {
    let mut count = 0;

    count += 1;
    count += 1;
    count += 1;

    println!("Count: {}", count);  // Count: 3
}
```

### Example 2: Temperature Conversion

```rust
fn main() {
    let fahrenheit = 98.6;
    let celsius = (fahrenheit - 32.0) * 5.0 / 9.0;

    println!("{}°F = {:.1}°C", fahrenheit, celsius);
    // Output: 98.6°F = 37.0°C
}
```

### Example 3: String Processing

```rust
fn main() {
    let text = "hello";
    let text = text.to_uppercase();  // Shadowing with type change
    let text = format!("{}!!!", text);  // Shadowing again

    println!("{}", text);  // Output: HELLO!!!
}
```

---

## Common Patterns

### Pattern: Immutable Input, Mutable Processing

```rust
fn process_data(data: Vec<i32>) {
    let mut sum = 0;  // Mutable accumulator

    for value in data {  // data itself is immutable
        sum += value;
    }

    println!("Sum: {}", sum);
}
```

### Pattern: Transform with Shadowing

```rust
fn parse_input(input: &str) -> i32 {
    let input = input.trim();           // Shadow: &str → &str
    let input = input.parse::<i32>();   // Shadow: &str → Result
    let input = input.unwrap_or(0);     // Shadow: Result → i32
    input
}
```

---

## Exercises

### Exercise 1: Basic Mutability

Create a program that:
1. Creates an immutable variable `x` with value 10
2. Creates a mutable variable `y` with value 20
3. Adds `x` to `y`
4. Prints the result

### Exercise 2: Shadowing Practice

Use shadowing to:
1. Start with `let value = "42";`
2. Parse it to a number
3. Multiply by 2
4. Print the result

### Exercise 3: Scope Exploration

Write a program with nested scopes that demonstrates:
- Variables visible in inner scopes
- Variables NOT visible in outer scopes
- Shadowing between scopes

### Exercise 4: Counter

Create a counter that:
- Starts at 0
- Increments 5 times in a loop
- Prints the final count

---

## Common Mistakes

### Mistake 1: Forgetting `mut`

```rust
// ❌ ERROR
let x = 5;
x += 1;

// ✅ CORRECT
let mut x = 5;
x += 1;
```

### Mistake 2: Type Mismatch with `mut`

```rust
// ❌ ERROR
let mut x = 5;
x = "hello";  // Cannot change type

// ✅ CORRECT: Use shadowing
let x = 5;
let x = "hello";
```

### Mistake 3: Unnecessary `mut`

```rust
// ⚠️ WARNING: Rust will warn you
let mut x = 5;  // Never mutated!
println!("{}", x);

// ✅ BETTER
let x = 5;
println!("{}", x);
```

---

## Memory Implications

### Immutable Variables

```rust
let x = vec![1, 2, 3];
// x lives on stack (pointer + metadata)
// Data lives on heap
// Cannot modify x, so no accidental changes
```

### Mutable Variables

```rust
let mut x = vec![1, 2, 3];
x.push(4);  // Can modify
// Same memory layout, but compiler allows changes
```

**Key**: Mutability is about permissions, not memory layout!

---

## Best Practices

### ✅ Prefer Immutable

```rust
// Default to immutable
let config = load_config();
let result = process(config);
```

### ✅ Use `mut` When Needed

```rust
// Use mut for accumulators, builders, etc.
let mut total = 0;
for item in items {
    total += item.price;
}
```

### ✅ Use Shadowing for Transformations

```rust
// Transform data through stages
let data = read_file();
let data = parse(data);
let data = validate(data);
```

### ❌ Avoid Unnecessary `mut`

```rust
// Bad: mut not needed
let mut x = 5;
println!("{}", x);

// Good: Immutable
let x = 5;
println!("{}", x);
```

---

## Quick Reference

```rust
// Immutable (default)
let x = 5;

// Mutable
let mut y = 10;
y += 1;

// Constant
const MAX: i32 = 100;

// Shadowing (same name, new variable)
let z = 5;
let z = z + 1;

// Shadowing with type change
let s = "123";
let s = s.parse::<i32>().unwrap();
```

---

## What's Next?

You now understand:
✅ Variables are immutable by default
✅ How to use `mut` for mutability
✅ The difference between `let`, `const`, and shadowing
✅ Scopes and variable lifetimes

**Next**: `03-Data-Types` - Learn about Rust's type system

---

**Pro Tip**: When in doubt, start with immutable. Add `mut` only when the compiler complains. This leads to safer, clearer code.
