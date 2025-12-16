# References & Borrowing - Using Without Owning

## The Solution to Ownership Hassles

References let you use values without taking ownership. This is THE key to practical Rust programming.

**Time**: 5-6 hours (practice heavily!)

---

## The Problem

```rust
fn main() {
    let s = String::from("hello");

    let len = calculate_length(s);  // s moved!

    println!("Length of '{}' is {}", s, len);  // ❌ ERROR: s was moved
}

fn calculate_length(s: String) -> usize {
    s.len()
}
```

**Problem**: We want to use `s` but it was moved!

---

## The Solution: References

```rust
fn main() {
    let s = String::from("hello");

    let len = calculate_length(&s);  // Borrow with &

    println!("Length of '{}' is {}", s, len);  // ✅ OK: s still valid!
}

fn calculate_length(s: &String) -> usize {  // Takes a reference
    s.len()
}  // s goes out of scope but doesn't own the data
```

**Key**: `&s` creates a **reference** to `s` without taking ownership.

---

## References Explained

### Creating a Reference

```rust
let s1 = String::from("hello");
let s2 = &s1;  // s2 is a reference to s1

println!("s1: {}, s2: {}", s1, s2);  // ✅ Both valid!
```

### Visualization

```
s1 ────→ [String]
           ├─ ptr ────→ "hello" (heap)
           ├─ len: 5
           └─ cap: 5

s2 ────→ s1 (just points to s1, doesn't own)
```

**s2 borrows s1 but doesn't own it.**

---

## Borrowing Rules

### Rule 1: References Don't Take Ownership

```rust
fn main() {
    let s1 = String::from("hello");
    let len = calculate_length(&s1);

    println!("{}", s1);  // ✅ Still valid!
}

fn calculate_length(s: &String) -> usize {
    s.len()
}
```

### Rule 2: References Are Immutable by Default

```rust
fn main() {
    let s = String::from("hello");
    change(&s);
}

fn change(s: &String) {
    s.push_str(", world");  // ❌ ERROR: cannot borrow as mutable
}
```

---

## Mutable References

### Creating Mutable References

```rust
fn main() {
    let mut s = String::from("hello");  // Must be mut

    change(&mut s);  // &mut creates mutable reference

    println!("{}", s);  // "hello, world"
}

fn change(s: &mut String) {  // Accepts &mut
    s.push_str(", world");  // ✅ Can modify!
}
```

### The Borrowing Rules (Critical!)

**Rule 1**: You can have either:
- **One mutable reference**, OR
- **Any number of immutable references**

**Rule 2**: References must always be valid (no dangling references)

---

## Multiple Immutable References (OK)

```rust
fn main() {
    let s = String::from("hello");

    let r1 = &s;  // OK
    let r2 = &s;  // OK
    let r3 = &s;  // OK

    println!("{}, {}, {}", r1, r2, r3);  // ✅ All valid!
}
```

**Why it's safe**: Multiple readers don't cause data races.

---

## Cannot Mix Mutable and Immutable

```rust
fn main() {
    let mut s = String::from("hello");

    let r1 = &s;      // OK: immutable
    let r2 = &s;      // OK: immutable
    let r3 = &mut s;  // ❌ ERROR: cannot borrow as mutable

    println!("{}, {}, {}", r1, r2, r3);
}
```

**Error**: "cannot borrow `s` as mutable because it is also borrowed as immutable"

**Why?** Readers (`r1`, `r2`) expect data not to change, but `r3` wants to change it!

---

## Only One Mutable Reference

```rust
fn main() {
    let mut s = String::from("hello");

    let r1 = &mut s;  // OK
    let r2 = &mut s;  // ❌ ERROR: cannot borrow as mutable more than once

    println!("{}, {}", r1, r2);
}
```

**Why?** Two mutable references could cause data races.

---

## Scope Matters!

```rust
fn main() {
    let mut s = String::from("hello");

    {
        let r1 = &mut s;  // OK
    }  // r1 goes out of scope here

    let r2 = &mut s;  // ✅ OK: r1 is gone
}
```

### Non-Lexical Lifetimes (NLL)

```rust
fn main() {
    let mut s = String::from("hello");

    let r1 = &s;
    let r2 = &s;
    println!("{} {}", r1, r2);  // r1 and r2 last used here

    let r3 = &mut s;  // ✅ OK: r1 and r2 no longer used
    println!("{}", r3);
}
```

**Modern Rust is smart**: References are only considered "active" until their last use.

---

## Dangling References

Rust prevents dangling references at compile time!

### This Won't Compile

```rust
fn dangle() -> &String {  // ❌ ERROR
    let s = String::from("hello");
    &s  // Returning reference to s
}  // s dropped here! Reference would be invalid!
```

**Error**: "this function's return type contains a borrowed value, but there is no value for it to be borrowed from"

### Solution: Return Ownership

```rust
fn no_dangle() -> String {  // ✅ OK
    let s = String::from("hello");
    s  // Move ownership to caller
}
```

---

## Practical Examples

### Example 1: String Length Without Taking Ownership

```rust
fn main() {
    let s = String::from("hello world");
    let len = calculate_length(&s);
    println!("'{}' has length {}", s, len);
}

fn calculate_length(s: &String) -> usize {
    s.len()
}
```

### Example 2: Modify in Place

```rust
fn main() {
    let mut s = String::from("hello");
    append_world(&mut s);
    println!("{}", s);  // "hello world"
}

fn append_world(s: &mut String) {
    s.push_str(" world");
}
```

### Example 3: First Word

```rust
fn first_word(s: &String) -> &str {
    let bytes = s.as_bytes();

    for (i, &item) in bytes.iter().enumerate() {
        if item == b' ' {
            return &s[0..i];
        }
    }

    &s[..]
}

fn main() {
    let s = String::from("hello world");
    let word = first_word(&s);
    println!("First word: {}", word);  // "hello"
}
```

---

## Common Patterns

### Pattern: Read-Only Access

```rust
fn print_info(s: &String) {
    println!("Length: {}", s.len());
    println!("Content: {}", s);
}
```

### Pattern: Modify in Place

```rust
fn make_uppercase(s: &mut String) {
    *s = s.to_uppercase();
}
```

### Pattern: Builder Pattern

```rust
struct Config {
    value: i32,
}

impl Config {
    fn set_value(&mut self, value: i32) -> &mut Self {
        self.value = value;
        self  // Return mutable self
    }
}

fn main() {
    let mut config = Config { value: 0 };
    config.set_value(10).set_value(20);  // Chaining!
}
```

---

## Exercises

### Exercise 1: Calculate Sum

```rust
fn sum(numbers: &[i32]) -> i32 {
    // Calculate sum without taking ownership
}

fn main() {
    let nums = vec![1, 2, 3, 4, 5];
    let total = sum(&nums);
    println!("Numbers: {:?}, Sum: {}", nums, total);
}
```

### Exercise 2: Modify String

```rust
fn add_prefix(s: &mut String, prefix: &str) {
    // Add prefix to beginning of s
}

fn main() {
    let mut text = String::from("world");
    add_prefix(&mut text, "hello ");
    println!("{}", text);  // "hello world"
}
```

### Exercise 3: Find Max

```rust
fn find_max(numbers: &[i32]) -> Option<&i32> {
    // Return reference to maximum value
}
```

---

## Common Mistakes

### Mistake 1: Multiple Mutable References

```rust
let mut s = String::from("hello");
let r1 = &mut s;
let r2 = &mut s;  // ❌ ERROR
```

**Fix**: Use one at a time or use scopes.

### Mistake 2: Mixing Mutable and Immutable

```rust
let mut s = String::from("hello");
let r1 = &s;
let r2 = &mut s;  // ❌ ERROR
```

**Fix**: Don't mix within the same scope.

### Mistake 3: Dangling Reference

```rust
fn dangle() -> &String {  // ❌ ERROR
    let s = String::from("hello");
    &s
}
```

**Fix**: Return owned value, not reference.

---

## Borrowing Flowchart

```
Need to use a value?
  │
  ├─ Just read it?
  │   → Use immutable reference (&T)
  │   → Can have multiple
  │
  ├─ Need to modify it?
  │   → Use mutable reference (&mut T)
  │   → Only one allowed
  │
  └─ Need it permanently?
      → Take ownership (T)
      → Original owner can't use it
```

---

## Quick Reference

```rust
// Immutable reference
let s = String::from("hello");
let r = &s;  // Borrow
// s still valid

// Mutable reference
let mut s = String::from("hello");
let r = &mut s;  // Mutable borrow
r.push_str(" world");

// Function with reference
fn len(s: &String) -> usize {
    s.len()
}

// Function with mutable reference
fn append(s: &mut String) {
    s.push_str("!");
}

// Rules:
// - Either ONE &mut T or MANY &T
// - References must always be valid
```

---

**Next**: `08-Slices` - References to part of a collection!

**Congratulations! You understand borrowing - one of the hardest parts of Rust!** 🦀
