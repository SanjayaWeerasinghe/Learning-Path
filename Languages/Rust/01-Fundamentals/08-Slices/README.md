# Slices - References to Sequences

## References to Parts of Collections

Slices let you reference a contiguous sequence of elements without taking ownership.

**Time**: 3-4 hours

---

## String Slices

### Basic String Slice `&str`

```rust
fn main() {
    let s = String::from("hello world");

    let hello = &s[0..5];   // "hello"
    let world = &s[6..11];  // "world"

    println!("{} {}", hello, world);
}
```

### Slice Syntax

```rust
let s = String::from("hello");

let slice = &s[0..2];  // "he" (indices 0, 1)
let slice = &s[..2];   // "he" (start from beginning)
let slice = &s[3..];   // "lo" (to the end)
let slice = &s[..];    // "hello" (entire string)
```

**Important**: Indices must be on valid UTF-8 character boundaries!

```rust
let s = String::from("hello");
let slice = &s[0..1];  // ✅ "h"

let s = String::from("🦀");
let slice = &s[0..1];  // ❌ PANIC: not a char boundary
```

---

## String Slices in Functions

### Without Slices (Bad)

```rust
fn first_word(s: &String) -> usize {
    let bytes = s.as_bytes();

    for (i, &item) in bytes.iter().enumerate() {
        if item == b' ' {
            return i;
        }
    }

    s.len()
}

fn main() {
    let mut s = String::from("hello world");
    let word_length = first_word(&s);

    s.clear();  // Empties the string

    // word_length is still 5, but string is empty!
    // Data is out of sync!
}
```

### With Slices (Good)

```rust
fn first_word(s: &str) -> &str {
    let bytes = s.as_bytes();

    for (i, &item) in bytes.iter().enumerate() {
        if item == b' ' {
            return &s[..i];
        }
    }

    &s[..]
}

fn main() {
    let mut s = String::from("hello world");
    let word = first_word(&s);

    s.clear();  // ❌ ERROR: cannot borrow as mutable

    println!("{}", word);
}
```

**Compiler prevents the bug!**

Error: "cannot borrow `s` as mutable because it is also borrowed as immutable"

---

## `&str` vs `String`

### String Literals Are Slices

```rust
let s = "Hello, world!";  // Type is &str (slice)
```

String literals are stored in the binary and are slices pointing to that specific point.

### `&str` is More Flexible

```rust
fn first_word(s: &str) -> &str {
    // Works with both String and &str!
}

fn main() {
    let my_string = String::from("hello world");
    let word = first_word(&my_string);  // String

    let my_literal = "hello world";
    let word = first_word(my_literal);  // &str

    let word = first_word(&my_string[..]);  // Slice of String
}
```

**Best Practice**: Use `&str` for function parameters instead of `&String`.

---

## Array Slices

### Slicing Arrays

```rust
fn main() {
    let a = [1, 2, 3, 4, 5];

    let slice = &a[1..3];  // [2, 3]

    println!("Slice: {:?}", slice);
}
```

### Type of Array Slice

```rust
let a = [1, 2, 3, 4, 5];
let slice: &[i32] = &a[1..3];  // Type is &[i32]
```

### Working with Slices

```rust
fn sum(slice: &[i32]) -> i32 {
    let mut total = 0;
    for &item in slice {
        total += item;
    }
    total
}

fn main() {
    let numbers = [1, 2, 3, 4, 5];

    println!("Sum of all: {}", sum(&numbers));         // 15
    println!("Sum of 2-4: {}", sum(&numbers[1..4]));  // 9
}
```

---

## Slice Internals

A slice is a **fat pointer**:

```
Slice &[T]
  ├─ ptr: pointer to first element
  └─ len: number of elements
```

```rust
let arr = [1, 2, 3, 4, 5];
let slice = &arr[1..4];  // [2, 3, 4]

// slice contains:
// - ptr → arr[1]
// - len = 3
```

**Important**: Slices are just views into data - they don't own it!

---

## Practical Examples

### Example 1: Split into Words

```rust
fn split_words(text: &str) -> Vec<&str> {
    text.split_whitespace().collect()
}

fn main() {
    let text = "hello world from rust";
    let words = split_words(text);
    println!("{:?}", words);  // ["hello", "world", "from", "rust"]
}
```

### Example 2: Substring

```rust
fn substring(s: &str, start: usize, end: usize) -> &str {
    &s[start..end]
}

fn main() {
    let text = "hello world";
    println!("{}", substring(text, 0, 5));  // "hello"
}
```

### Example 3: Sum of Slice

```rust
fn sum_slice(numbers: &[i32]) -> i32 {
    numbers.iter().sum()
}

fn main() {
    let nums = vec![1, 2, 3, 4, 5];
    println!("Sum: {}", sum_slice(&nums));      // 15
    println!("Sum: {}", sum_slice(&nums[2..])); // 12 (3+4+5)
}
```

---

## Mutable Slices

```rust
fn zero_out(slice: &mut [i32]) {
    for item in slice {
        *item = 0;
    }
}

fn main() {
    let mut numbers = [1, 2, 3, 4, 5];

    zero_out(&mut numbers[2..4]);

    println!("{:?}", numbers);  // [1, 2, 0, 0, 5]
}
```

---

## Common Slice Methods

```rust
fn main() {
    let numbers = [1, 2, 3, 4, 5];
    let slice = &numbers[..];

    // Length
    println!("Length: {}", slice.len());  // 5

    // First element
    if let Some(&first) = slice.first() {
        println!("First: {}", first);  // 1
    }

    // Last element
    if let Some(&last) = slice.last() {
        println!("Last: {}", last);  // 5
    }

    // Contains
    println!("Contains 3? {}", slice.contains(&3));  // true

    // Split at index
    let (left, right) = slice.split_at(2);
    println!("Left: {:?}, Right: {:?}", left, right);
    // Left: [1, 2], Right: [3, 4, 5]
}
```

---

## Exercises

### Exercise 1: Last Word

```rust
fn last_word(s: &str) -> &str {
    // Return the last word in the string
}

fn main() {
    let text = "hello world";
    println!("{}", last_word(text));  // "world"
}
```

### Exercise 2: Reverse Slice

```rust
fn reverse_slice(slice: &mut [i32]) {
    // Reverse the slice in place
}

fn main() {
    let mut nums = [1, 2, 3, 4, 5];
    reverse_slice(&mut nums);
    println!("{:?}", nums);  // [5, 4, 3, 2, 1]
}
```

### Exercise 3: Find Substring

```rust
fn contains_substring(text: &str, pattern: &str) -> bool {
    // Check if text contains pattern
}
```

### Exercise 4: Max in Slice

```rust
fn max_value(slice: &[i32]) -> Option<&i32> {
    // Return reference to maximum value
}
```

---

## Common Mistakes

### Mistake 1: Invalid UTF-8 Boundary

```rust
let s = String::from("🦀");
let slice = &s[0..1];  // ❌ PANIC
```

**Fix**: Use methods like `chars()` or ensure valid boundaries.

### Mistake 2: Out of Bounds

```rust
let s = String::from("hello");
let slice = &s[0..10];  // ❌ PANIC
```

**Fix**: Check length first or use safe methods.

---

## Best Practices

### ✅ Prefer `&str` to `&String`

```rust
// ❌ Less flexible
fn process(s: &String) { }

// ✅ More flexible
fn process(s: &str) { }
```

### ✅ Use Slices for Function Parameters

```rust
// ❌ Takes ownership
fn sum(v: Vec<i32>) -> i32 { }

// ✅ Borrows via slice
fn sum(v: &[i32]) -> i32 { }
```

---

## Quick Reference

```rust
// String slices
let s = String::from("hello world");
let hello = &s[0..5];    // "hello"
let world = &s[6..];     // "world"
let all = &s[..];        // "hello world"

// Array slices
let a = [1, 2, 3, 4, 5];
let slice = &a[1..3];    // [2, 3]

// Function with slice
fn process(s: &str) { }
fn sum(numbers: &[i32]) -> i32 { }

// Mutable slice
let mut nums = [1, 2, 3];
let slice = &mut nums[..];
```

---

**Next**: `09-String-vs-str` - Deep dive into String types!

**You now understand slices - a powerful Rust feature!** 🦀
