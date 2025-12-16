# Rust Core Concepts - Building the Foundation

## Level Up Your Rust

Now that you understand ownership, it's time to master Rust's powerful type system, error handling, and code organization.

**Duration**: 4-5 weeks
**Daily commitment**: 1-2 hours
**Difficulty**: ⭐⭐⭐☆☆

---

## What You'll Learn

By the end of Core Concepts, you will:

✅ Design data with structs and enums
✅ Master pattern matching
✅ Handle errors properly with Option and Result
✅ Use collections effectively (Vec, HashMap, etc.)
✅ Write generic, reusable code
✅ Understand and implement traits
✅ Work with lifetimes confidently
✅ Organize code with modules and packages

---

## Topics Covered

### Week 1: Data Structures

**01. Structs** (3 days)
- Classic structs
- Tuple structs
- Unit structs
- Methods with `impl`
- Associated functions
- Multiple `impl` blocks

**02. Enums & Pattern Matching** (3 days)
- Defining enums
- Enum variants with data
- `match` expressions
- Exhaustive matching
- `if let` and `while let`
- Match guards

**03. Option Type** (2 days)
- `Some(T)` and `None`
- Why no null in Rust
- Unwrapping: `unwrap`, `expect`, `unwrap_or`
- Combinators: `map`, `and_then`, `or_else`
- Pattern matching on Option

### Week 2: Error Handling & Collections

**04. Result & Error Handling** (3 days)
- `Ok(T)` and `Err(E)`
- The `?` operator
- Propagating errors
- Custom error types
- `thiserror` and `anyhow`

**05. Collections - Vec** (2 days)
- `Vec<T>` creation and initialization
- `push`, `pop`, `insert`, `remove`
- Indexing and slicing
- Iteration
- Capacity vs length

**06. Collections - HashMap** (2 days)
- `HashMap<K, V>` basics
- `insert`, `get`, `get_mut`
- Entry API
- Iteration
- BTreeMap alternative

### Week 3: Generics & Traits

**07. Generics** (3 days)
- Generic functions
- Generic structs
- Generic enums
- Generic methods
- Monomorphization
- Performance (zero-cost!)

**08. Traits** (4 days)
- Defining traits
- Implementing traits
- Trait bounds
- Multiple trait bounds
- Where clauses
- Default implementations
- Derivable traits
- Trait objects intro

### Week 4: Advanced Concepts

**09. Lifetimes** (4 days)
- Why lifetimes exist
- Lifetime syntax `'a`
- Lifetime annotations in functions
- Lifetime annotations in structs
- Lifetime elision rules
- `'static` lifetime
- Multiple lifetimes

**10. Modules & Packages** (3 days)
- Module system (`mod`)
- Visibility (`pub`)
- Use declarations
- Crates and packages
- `Cargo.toml`
- Workspaces
- Re-exports

---

## Learning Strategy

### Week-by-Week Goals

**Week 1: Data Modeling**
- Think in structs and enums
- Make illegal states unrepresentable
→ Build: Chess pieces, card deck, shape calculator

**Week 2: Robust Error Handling**
- Never `unwrap()` in production
- Propagate errors properly
→ Build: File processor, config parser, validator

**Week 3: Generic Programming**
- Write reusable code
- Understand trait bounds
→ Build: Generic stack/queue, custom Iterator

**Week 4: Advanced Ownership**
- Master lifetimes
- Organize large projects
→ Build: Library crate, multi-module project

---

## Key Concepts Deep Dive

### Enums Are Powerful

Rust enums are not like C enums:

```rust
// C-style (boring)
enum Color { Red, Green, Blue }

// Rust-style (powerful!)
enum WebEvent {
    PageLoad,
    KeyPress(char),
    Click { x: i64, y: i64 },
}
```

### Option Replaces Null

```rust
// No more null pointer exceptions!
fn find_user(id: u32) -> Option<User> {
    // Returns Some(user) or None
}

// Handle it safely
match find_user(42) {
    Some(user) => println!("Found: {}", user.name),
    None => println!("User not found"),
}
```

### Result Forces Error Handling

```rust
fn read_file(path: &str) -> Result<String, std::io::Error> {
    std::fs::read_to_string(path)
}

// Must handle the error
let content = read_file("data.txt")?; // Propagate error
```

### Traits Enable Polymorphism

```rust
trait Drawable {
    fn draw(&self);
}

// Any type can implement it
impl Drawable for Circle { ... }
impl Drawable for Rectangle { ... }

// Generic function works with any Drawable
fn render<T: Drawable>(shape: &T) {
    shape.draw();
}
```

---

## Practice Projects

### Beginner
```rust
// Contact book with struct and Vec
// Card game with enums
// Config file parser (Result handling)
```

### Intermediate
```rust
// Generic stack and queue
// Custom error types for library
// JSON-like data structure with enums
```

### Advanced
```rust
// Expression evaluator (enums + traits)
// Plugin system with trait objects
// Multi-module library project
```

---

## Common Challenges

### Challenge 1: "When to use struct vs enum?"

**Struct**: Data that has multiple fields that exist together
```rust
struct User {
    name: String,
    age: u32,
}
```

**Enum**: Data that can be one of several variants
```rust
enum Payment {
    Cash(f64),
    Card { number: String, cvv: u16 },
}
```

### Challenge 2: "Lifetime syntax is confusing"

**Strategy**:
1. Start without lifetime annotations
2. Let compiler tell you where needed
3. Understand the error message
4. Add minimum annotations
5. Test and repeat

**Remember**: Most code doesn't need explicit lifetimes thanks to elision!

### Challenge 3: "Too many trait bounds"

```rust
// Gets messy fast
fn process<T: Clone + Debug + Display + PartialEq>(item: T) { ... }

// Use where clause instead
fn process<T>(item: T)
where
    T: Clone + Debug + Display + PartialEq
{
    ...
}
```

---

## Assessment

### You're ready for Intermediate when you can:

✅ Model complex data with structs and enums
✅ Use pattern matching exhaustively
✅ Handle errors without unwrap/expect
✅ Work with Vec and HashMap comfortably
✅ Write generic functions and structs
✅ Implement and use traits
✅ Understand when lifetimes are needed
✅ Organize code into modules
✅ Complete Rustlings through lifetimes

---

## Resources for This Level

### Essential Reading
- The Rust Book Chapters 5-11
- Rust by Example: Chapters 5-12
- [Common Rust Lifetime Misconceptions](https://github.com/pretzelhammer/rust-blog)

### Practice
- Rustlings: Enums, Traits, Lifetimes, Modules
- Exercism: Medium difficulty problems
- Advent of Code (previous years)

### Videos
- Jon Gjengset's "Crust of Rust" - Lifetime annotations
- Let's Get Rusty - Generics and Traits

---

## What's Next?

**03-Intermediate** awaits! You'll learn:
- Closures and functional programming
- Iterators and lazy evaluation
- Smart pointers (Box, Rc, RefCell)
- Testing and documentation
- File I/O and CLI programs

---

## Motivation

> "Understanding ownership is learning to ride a bike.
> Understanding traits is learning to do tricks.
> Understanding lifetimes is learning to compete professionally."
>
> — The Rust Learning Curve

You've climbed the ownership mountain. Now you're building the tools you'll use for life. Keep going! 🦀
