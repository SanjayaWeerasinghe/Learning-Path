# Ownership Basics - Rust's Superpower

## The Most Important Concept in Rust

Ownership is what makes Rust unique. It's how Rust achieves memory safety without a garbage collector.

**THIS IS THE HARDEST TOPIC. Take your time. Re-read. Practice.**

**Time**: 6-8 hours (spread over 3-4 days)

---

## What is Ownership?

Ownership is a set of rules that governs how Rust manages memory.

### The Three Rules of Ownership

**Rule 1**: Each value in Rust has an **owner**.

**Rule 2**: There can only be **one owner** at a time.

**Rule 3**: When the owner goes out of scope, the value is **dropped**.

**Memorize these!** They are fundamental to Rust.

---

## Stack vs Heap

Understanding memory is critical for ownership.

### Stack

- **Fast**: LIFO (Last In, First Out)
- **Fixed size**: Size must be known at compile time
- **Automatic cleanup**: Pops automatically when out of scope

```rust
let x = 5;  // Stored on stack
let y = true;  // Stored on stack
```

### Heap

- **Slower**: Must find space
- **Dynamic size**: Size can be unknown at compile time
- **Manual cleanup**: Must be freed (Rust does this automatically!)

```rust
let s = String::from("hello");  // String data on heap
```

**Key**: Ownership primarily deals with **heap data**.

---

## Variable Scope

```rust
fn main() {
    {                      // s is not valid here (not declared)
        let s = "hello";   // s is valid from this point
        // Use s
    }                      // Scope ends, s is no longer valid

    // s is not accessible here
}
```

---

## The `String` Type

`String` is heap-allocated (unlike string literals which are stack-allocated).

### Creating Strings

```rust
let s = String::from("hello");  // Heap-allocated
```

### Strings Can Grow

```rust
let mut s = String::from("hello");
s.push_str(", world!");  // Can modify
println!("{}", s);  // hello, world!
```

---

## Memory and Ownership

### What Happens Here?

```rust
let s1 = String::from("hello");
let s2 = s1;  // What happens?

println!("{}", s1);  // ❌ ERROR!
```

**Error**: "value borrowed here after move"

### Why?

When we do `let s2 = s1`:
1. The **pointer** to heap data is copied
2. `s1` is **invalidated** (moved to `s2`)
3. Only `s2` is valid now

**This is called a MOVE**.

```rust
let s1 = String::from("hello");
let s2 = s1;  // s1 moved to s2

// s1 is now invalid!
// s2 owns the data
```

---

## Move Semantics

### Simple Values (Copy)

```rust
let x = 5;
let y = x;  // x is copied (integers are Copy types)

println!("x = {}, y = {}", x, y);  // ✅ Both valid!
```

**Why?** Integers are stored on stack and implement `Copy` trait.

### Heap Values (Move)

```rust
let s1 = String::from("hello");
let s2 = s1;  // s1 moved to s2

println!("{}", s2);  // ✅ OK
println!("{}", s1);  // ❌ ERROR: s1 was moved
```

**Why?** Strings are on heap and do NOT implement `Copy`.

---

## Clone

To make a **deep copy**:

```rust
let s1 = String::from("hello");
let s2 = s1.clone();  // Deep copy

println!("s1 = {}, s2 = {}", s1, s2);  // ✅ Both valid!
```

**Warning**: `clone()` can be expensive (allocates new heap memory).

---

## Ownership and Functions

### Passing to Function (Move)

```rust
fn main() {
    let s = String::from("hello");
    takes_ownership(s);  // s moved into function

    // s is no longer valid here!
    println!("{}", s);  // ❌ ERROR
}

fn takes_ownership(some_string: String) {
    println!("{}", some_string);
}  // some_string dropped here
```

### Return Values Transfer Ownership

```rust
fn main() {
    let s1 = gives_ownership();  // Ownership transferred
    println!("{}", s1);  // ✅ OK
}

fn gives_ownership() -> String {
    let s = String::from("hello");
    s  // Ownership moved to caller
}
```

### Taking and Returning

```rust
fn main() {
    let s1 = String::from("hello");
    let s2 = takes_and_gives_back(s1);  // s1 moved in, s2 received

    println!("{}", s2);  // ✅ OK
    println!("{}", s1);  // ❌ ERROR: s1 was moved
}

fn takes_and_gives_back(s: String) -> String {
    s  // Returned ownership
}
```

---

## Copy Types

These types implement `Copy` (stack-only):

- All integers: `i8`, `i16`, `i32`, `i64`, `u8`, etc.
- Floating point: `f32`, `f64`
- Boolean: `bool`
- Character: `char`
- Tuples (if all elements are `Copy`)

```rust
let x = 5;
let y = x;  // x is still valid (Copy)

let t1 = (1, 2.0, 'a');
let t2 = t1;  // t1 is still valid (all elements are Copy)
```

**Rule**: If a type needs to allocate memory or owns a resource, it doesn't implement `Copy`.

---

## Visualizing Ownership

### Before Move

```
s1 ─────→ [String]
            ├─ ptr ────→ "hello" (heap)
            ├─ len: 5
            └─ capacity: 5
```

### After `let s2 = s1;`

```
s1 (INVALID)

s2 ─────→ [String]
            ├─ ptr ────→ "hello" (heap)
            ├─ len: 5
            └─ capacity: 5
```

**Only one owner!**

---

## Common Patterns

### Pattern 1: Return Ownership

```rust
fn process_string(s: String) -> String {
    // Do something with s
    s  // Return ownership
}
```

### Pattern 2: Take and Create New

```rust
fn to_uppercase(s: String) -> String {
    s.to_uppercase()
}
```

---

## Exercises

### Exercise 1: Basic Move

```rust
fn main() {
    let s1 = String::from("hello");
    let s2 = s1;

    // What can you print?
    // What causes an error?
}
```

### Exercise 2: Function Ownership

```rust
fn print_and_return(s: String) -> String {
    println!("{}", s);
    s
}

fn main() {
    let s = String::from("hello");
    // Call print_and_return
    // Can you still use s afterwards?
}
```

### Exercise 3: Clone vs Move

```rust
fn main() {
    let s1 = String::from("hello");

    // Create s2 so both s1 and s2 are valid
    let s2 = ?;

    println!("{} {}", s1, s2);
}
```

### Exercise 4: Scope and Dropping

```rust
fn main() {
    let s1 = String::from("hello");
    {
        let s2 = s1;
        println!("{}", s2);
    }
    // Is s1 valid here? Why or why not?
}
```

---

## Common Mistakes

### Mistake 1: Using After Move

```rust
let s1 = String::from("hello");
let s2 = s1;
println!("{}", s1);  // ❌ ERROR
```

**Fix**: Either clone or don't use s1 after move.

### Mistake 2: Passing to Function

```rust
fn main() {
    let s = String::from("hello");
    takes_ownership(s);
    println!("{}", s);  // ❌ ERROR
}

fn takes_ownership(s: String) {}
```

**Fix**: Return ownership or use references (next chapter).

---

## Mental Model

**Think of ownership as handing over a physical object.**

```rust
let book = Book::new("Rust Book");
give_to_friend(book);  // You no longer have the book!

// Can't read book anymore - you gave it away!
```

---

## Why Ownership?

### Problems in Other Languages

**C/C++**: Manual memory management
- Memory leaks (forgot to free)
- Double free (freed twice)
- Use after free (dangling pointers)

**Java/Python/JavaScript**: Garbage collection
- Runtime overhead
- Unpredictable pauses
- Still possible to leak (references)

### Rust's Solution

- **Compile-time checks**: No runtime overhead
- **No garbage collector**: Predictable performance
- **Memory safety**: No dangling pointers, no double free

**Ownership makes these bugs impossible!**

---

## Quick Reference

```rust
// Move (String is heap-allocated)
let s1 = String::from("hello");
let s2 = s1;  // s1 moved to s2
// s1 is now invalid

// Copy (i32 is stack-allocated)
let x = 5;
let y = x;  // x copied to y
// Both x and y are valid

// Clone (deep copy)
let s1 = String::from("hello");
let s2 = s1.clone();  // Both valid

// Function takes ownership
fn f(s: String) { }  // s dropped at end

// Function returns ownership
fn g() -> String {
    String::from("hello")
}
```

---

## Debugging Ownership Errors

When you see: `value borrowed here after move`

1. Find where the value was **moved** (assignment or function call)
2. Decide: Do you need to **clone** or use **references** (next chapter)?

---

**Next**: `07-References-Borrowing` - How to use values without taking ownership!

**THIS WAS HARD. That's normal. Re-read this tomorrow. Practice the exercises. It will click!** 🦀
