# String vs &str - Mastering Rust Strings

## Understanding Rust's String Types

Strings in Rust are more complex than other languages, but for good reason. Let's master them!

**Time**: 4-5 hours

---

## The Two String Types

### `String` - Owned, Growable

```rust
let s = String::from("hello");
// - Heap-allocated
// - Growable
// - Owned
```

### `&str` - Borrowed, Fixed-Size

```rust
let s: &str = "hello";
// - String slice
// - Immutable
// - Borrowed
// - Usually points to String or string literal
```

---

## Creating Strings

### `String::from()`

```rust
let s = String::from("hello");
```

### `.to_string()`

```rust
let s = "hello".to_string();
```

### `String::new()`

```rust
let mut s = String::new();
s.push_str("hello");
```

### String Literals

```rust
let s: &str = "hello";  // Type is &str, not String!
```

---

## When to Use Which?

### Use `String` When:

- You need to **own** the string data
- The string will **grow** or **shrink**
- Returning from a function
- Storing in a struct

```rust
struct Person {
    name: String,  // Owned
}

fn create_greeting(name: &str) -> String {
    format!("Hello, {}!", name)  // Returns owned String
}
```

### Use `&str` When:

- You only need to **read** the string
- Function parameters (most of the time)
- You don't need to modify it

```rust
fn print_greeting(name: &str) {  // Accepts borrowed &str
    println!("Hello, {}!", name);
}
```

---

## Converting Between Types

### `String` → `&str` (Cheap)

```rust
let s = String::from("hello");
let slice: &str = &s;  // Deref coercion
// or
let slice: &str = s.as_str();
```

### `&str` → `String` (Allocates!)

```rust
let s: &str = "hello";
let string: String = s.to_string();
// or
let string: String = String::from(s);
// or
let string: String = s.to_owned();
```

**Important**: This allocates new memory on the heap!

---

## Modifying Strings

### `String` Can Be Modified

```rust
let mut s = String::from("hello");

s.push_str(" world");   // Append &str
s.push('!');            // Append char

println!("{}", s);  // "hello world!"
```

### `&str` Cannot Be Modified

```rust
let s: &str = "hello";
s.push_str(" world");  // ❌ ERROR: no method push_str on &str
```

---

## String Concatenation

### Using `+` Operator

```rust
let s1 = String::from("Hello, ");
let s2 = String::from("world!");

let s3 = s1 + &s2;  // s1 moved here, s2 borrowed

// println!("{}", s1);  // ❌ ERROR: s1 was moved
println!("{}", s2);     // ✅ OK
println!("{}", s3);     // ✅ OK: "Hello, world!"
```

**Signature**: `fn add(self, s: &str) -> String`

- Takes ownership of left operand
- Borrows right operand

### Using `format!` Macro (Better!)

```rust
let s1 = String::from("Hello");
let s2 = String::from("world");

let s3 = format!("{}, {}!", s1, s2);

// s1 and s2 still valid!
println!("{}", s1);  // ✅ OK
println!("{}", s2);  // ✅ OK
println!("{}", s3);  // ✅ OK: "Hello, world!"
```

**Best Practice**: Use `format!` for concatenation.

---

## Indexing Strings

### You CANNOT Index Strings in Rust!

```rust
let s = String::from("hello");
let c = s[0];  // ❌ ERROR: cannot index
```

**Why?** Rust strings are UTF-8, and characters can be 1-4 bytes!

```rust
let hello = String::from("hello");  // 5 bytes
let hello = String::from("Здравствуйте");  // 24 bytes!
// Each Cyrillic character is 2 bytes
```

### Accessing Characters

```rust
// Bytes
for b in "hello".bytes() {
    println!("{}", b);  // 104, 101, 108, 108, 111
}

// Chars
for c in "hello".chars() {
    println!("{}", c);  // h, e, l, l, o
}

// Grapheme clusters (requires crate)
// "é" can be 1 char or 2 (e + ́)
```

### Slicing Strings

```rust
let s = String::from("hello");
let slice = &s[0..2];  // "he" (must be valid UTF-8 boundary!)

let s = String::from("Здравствуйте");
let slice = &s[0..4];  // "Зд" (4 bytes = 2 Cyrillic chars)
```

**Warning**: Slicing on invalid boundary causes PANIC!

---

## String Internals

### `String` Structure

```
String
  ├─ ptr: *mut u8  (pointer to heap data)
  ├─ len: usize    (current length in bytes)
  └─ capacity: usize  (allocated capacity)
```

### `&str` Structure

```
&str (slice)
  ├─ ptr: *const u8  (pointer to string data)
  └─ len: usize      (length in bytes)
```

**Key**: `String` owns the data, `&str` borrows it.

---

## Common String Methods

### Length

```rust
let s = String::from("hello");
println!("Length: {}", s.len());  // 5 (bytes, not characters!)

let s = String::from("🦀");
println!("Length: {}", s.len());  // 4 (emoji is 4 bytes)
println!("Chars: {}", s.chars().count());  // 1
```

### Checking Empty

```rust
let s = String::new();
if s.is_empty() {
    println!("Empty!");
}
```

### Contains

```rust
let s = String::from("hello world");
println!("{}", s.contains("world"));  // true
```

### Replace

```rust
let s = String::from("hello world");
let new_s = s.replace("world", "Rust");
println!("{}", new_s);  // "hello Rust"
```

### Split

```rust
let s = "hello world from rust";
for word in s.split_whitespace() {
    println!("{}", word);
}
// Prints: hello, world, from, rust
```

### Trim

```rust
let s = "  hello  \n";
println!("'{}'", s.trim());  // 'hello'
```

---

## Practical Examples

### Example 1: Build String from Parts

```rust
fn build_full_name(first: &str, last: &str) -> String {
    format!("{} {}", first, last)
}

fn main() {
    let name = build_full_name("John", "Doe");
    println!("{}", name);  // "John Doe"
}
```

### Example 2: Validate Email

```rust
fn is_valid_email(email: &str) -> bool {
    email.contains('@') && email.contains('.')
}

fn main() {
    println!("{}", is_valid_email("test@example.com"));  // true
    println!("{}", is_valid_email("invalid"));  // false
}
```

### Example 3: Word Count

```rust
fn word_count(text: &str) -> usize {
    text.split_whitespace().count()
}

fn main() {
    let text = "hello world from rust";
    println!("Words: {}", word_count(text));  // 4
}
```

---

## Exercises

### Exercise 1: String Builder

```rust
fn build_sentence(words: Vec<&str>) -> String {
    // Join words with spaces
}

fn main() {
    let words = vec!["Hello", "from", "Rust"];
    println!("{}", build_sentence(words));  // "Hello from Rust"
}
```

### Exercise 2: Reverse Words

```rust
fn reverse_words(text: &str) -> String {
    // Reverse order of words
}

fn main() {
    println!("{}", reverse_words("hello world"));  // "world hello"
}
```

### Exercise 3: Title Case

```rust
fn title_case(text: &str) -> String {
    // Capitalize first letter of each word
}

fn main() {
    println!("{}", title_case("hello world"));  // "Hello World"
}
```

---

## Common Mistakes

### Mistake 1: Trying to Index

```rust
let s = String::from("hello");
let c = s[0];  // ❌ ERROR
```

**Fix**: Use `.chars().nth(0)` or slice carefully.

### Mistake 2: Assuming len() is Character Count

```rust
let s = String::from("🦀");
println!("{}", s.len());  // 4 (bytes, not 1!)
```

**Fix**: Use `.chars().count()` for character count.

### Mistake 3: Concatenation Ownership

```rust
let s1 = String::from("hello");
let s2 = String::from("world");
let s3 = s1 + &s2;
println!("{}", s1);  // ❌ ERROR: s1 was moved
```

**Fix**: Use `format!` or clone `s1`.

---

## Best Practices

### ✅ Function Parameters: Use `&str`

```rust
// ✅ Flexible: accepts String and &str
fn process(text: &str) { }

// ❌ Inflexible: only accepts String
fn process(text: String) { }
```

### ✅ Return Owned Strings

```rust
// ✅ Returns owned data
fn create() -> String {
    String::from("hello")
}

// ❌ Dangling reference!
fn create() -> &str {
    let s = String::from("hello");
    &s  // ERROR: returning reference to local
}
```

### ✅ Use `format!` for Concatenation

```rust
// ✅ Clear and doesn't consume operands
let s = format!("{} {}", s1, s2);

// ❌ Consumes s1
let s = s1 + &s2;
```

---

## Quick Reference

```rust
// Creating
let s1 = String::from("hello");
let s2 = "hello".to_string();
let s3: &str = "hello";  // String literal

// Converting
let string: String = "hello".to_string();
let slice: &str = &string;

// Concatenation
let s = format!("{} {}", "hello", "world");

// Methods
s.len();                  // Byte length
s.is_empty();            // Check if empty
s.contains("pattern");   // Contains substring
s.replace("old", "new"); // Replace
s.trim();                // Remove whitespace
s.split_whitespace();    // Split into words

// Modification (String only)
let mut s = String::new();
s.push_str("hello");
s.push('!');

// Iteration
for c in s.chars() { }    // Characters
for b in s.bytes() { }    // Bytes
```

---

**Congratulations! You've completed Rust Fundamentals!** 🎉

**Next Level**: `02-Core-Concepts` - Structs, Enums, Traits, and more!

You now understand:
✅ Ownership and borrowing
✅ References and slices
✅ Strings in Rust

**You're ready for more advanced Rust!** 🦀
