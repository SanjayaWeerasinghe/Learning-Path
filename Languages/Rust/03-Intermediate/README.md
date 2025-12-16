# Rust Intermediate - Practical Programming

## Real-World Rust Programming

You know the language. Now learn to write idiomatic, testable, and maintainable Rust code.

**Duration**: 5-6 weeks
**Daily commitment**: 1-2 hours
**Difficulty**: ⭐⭐⭐⭐☆

---

## What You'll Learn

By the end of Intermediate, you will:

✅ Write functional-style code with closures and iterators
✅ Understand and use smart pointers effectively
✅ Master interior mutability patterns
✅ Write comprehensive tests
✅ Document code professionally
✅ Manage dependencies with Cargo
✅ Build command-line applications
✅ Handle file I/O efficiently

---

## Topics Covered

### Week 1: Functional Programming

**01. Closures** (3 days)
- Closure syntax and types
- Capturing environment: move, borrow, mutable borrow
- Fn, FnMut, FnOnce traits
- Returning closures
- Closures vs function pointers

**02. Iterators** (4 days)
- Iterator trait
- `iter()`, `iter_mut()`, `into_iter()`
- Consuming adaptors: `collect`, `sum`, `fold`
- Iterator adaptors: `map`, `filter`, `take`, `skip`
- Chaining iterators
- Lazy evaluation
- Custom iterators
- Performance characteristics

### Week 2: Smart Pointers (Critical!)

**03. Smart Pointers - Box** (2 days)
- Heap allocation with `Box<T>`
- When to use Box
- Recursive types
- Boxing large values
- Deref coercion

**04. Smart Pointers - Rc/Arc** (3 days)
- Reference counting with `Rc<T>`
- Shared ownership
- Atomic reference counting with `Arc<T>`
- Thread safety differences
- Weak pointers
- Circular references and memory leaks

**05. Smart Pointers - RefCell** (2 days)
- Interior mutability
- `RefCell<T>` and runtime borrow checking
- `Cell<T>` for Copy types
- Combining `Rc<RefCell<T>>`
- When to use interior mutability
- Panic on borrow violations

### Week 3: Quality & Tooling

**06. Testing** (3 days)
- Unit tests with `#[test]`
- Integration tests
- Test organization
- `assert!`, `assert_eq!`, `assert_ne!`
- `#[should_panic]`
- Test-only code with `#[cfg(test)]`
- Doc tests
- Benchmarking basics

**07. Documentation** (2 days)
- Doc comments `///` and `//!`
- Markdown in comments
- Code examples in docs
- Documentation sections
- `cargo doc` and `rustdoc`
- Documenting modules and crates

**08. Cargo & Workspaces** (2 days)
- Dependency management
- Features and optional dependencies
- Dev dependencies
- Build dependencies
- Workspaces for multiple crates
- Build scripts `build.rs`
- Publishing to crates.io

### Week 4-5: Practical Applications

**09. File I/O** (3 days)
- Reading files: `fs::read_to_string`, `fs::read`
- Writing files: `fs::write`
- `File` and buffered I/O
- `BufReader` and `BufWriter`
- Error handling for I/O
- Working with paths: `Path` and `PathBuf`
- Directory operations

**10. CLI Programs** (4 days)
- Argument parsing
- `std::env::args`
- Using `clap` for argument parsing
- Reading from STDIN
- Writing to STDOUT and STDERR
- Exit codes
- Environment variables
- Building robust CLI tools

---

## Learning Strategy

### Week-by-Week Approach

**Week 1: Think Functionally**
- Replace loops with iterators
- Use closures for callbacks
- Chain operations
→ Build: Data transformer, file processor

**Week 2: Smart Pointer Patterns**
- Understand when each pointer type is needed
- Practice Rc + RefCell patterns
- Avoid memory leaks
→ Build: Graph/tree structures, shared cache

**Week 3: Professional Quality**
- Test everything
- Document everything
- Manage dependencies
→ Build: Well-tested library crate

**Weeks 4-5: Real Applications**
- Combine all skills
- Build production-quality tools
→ Build: grep clone, wc clone, custom CLI tool

---

## Key Concepts Deep Dive

### Iterators Are Zero-Cost

```rust
// This loop
let sum: i32 = vec![1, 2, 3, 4, 5]
    .iter()
    .map(|x| x * 2)
    .filter(|x| x > &5)
    .sum();

// Compiles to the same code as:
let mut sum = 0;
for x in &[1, 2, 3, 4, 5] {
    let doubled = x * 2;
    if doubled > 5 {
        sum += doubled;
    }
}
```

**But iterators are:**
- More readable
- More composable
- Less error-prone

### Smart Pointer Decision Tree

```
Need heap allocation?
  └─> Box<T>

Need shared ownership (single-threaded)?
  └─> Rc<T>

Need shared ownership (multi-threaded)?
  └─> Arc<T>

Need shared ownership + mutability (single-threaded)?
  └─> Rc<RefCell<T>>

Need shared ownership + mutability (multi-threaded)?
  └─> Arc<Mutex<T>> or Arc<RwLock<T>>
```

### Interior Mutability Pattern

```rust
use std::rc::Rc;
use std::cell::RefCell;

struct Node {
    value: i32,
    children: Vec<Rc<RefCell<Node>>>,
}

// Can mutate through shared reference!
let node = Rc::new(RefCell::new(Node {
    value: 5,
    children: vec![],
}));

node.borrow_mut().value = 10; // Mutation through Rc!
```

---

## Practice Projects

### Functional Programming
```rust
// Data pipeline with iterators
// Text analyzer (word frequency)
// CSV processor with filtering
```

### Smart Pointers
```rust
// Binary tree with Rc<RefCell<>>
// Graph structure
// LRU cache
```

### CLI Tools
```rust
// grep clone (search tool)
// wc clone (word count)
// cat clone with features
// Custom build tool
```

### Combined
```rust
// Markdown to HTML converter
// JSON/YAML parser
// File compression tool
// Log analyzer
```

---

## Common Patterns

### Pattern: Iterator Chains

```rust
// Read file, process lines, collect results
let results: Vec<_> = std::fs::read_to_string("data.txt")?
    .lines()
    .filter(|line| !line.trim().is_empty())
    .map(|line| line.to_uppercase())
    .collect();
```

### Pattern: Builder with Closures

```rust
struct QueryBuilder {
    filters: Vec<Box<dyn Fn(&str) -> bool>>,
}

impl QueryBuilder {
    fn filter<F>(mut self, f: F) -> Self
    where
        F: Fn(&str) -> bool + 'static,
    {
        self.filters.push(Box::new(f));
        self
    }
}
```

### Pattern: Rc + RefCell for Shared Mutable State

```rust
type Shared<T> = Rc<RefCell<T>>;

fn new_shared<T>(value: T) -> Shared<T> {
    Rc::new(RefCell::new(value))
}

// Usage
let counter = new_shared(0);
let counter2 = counter.clone();

*counter.borrow_mut() += 1;
println!("{}", counter2.borrow()); // Prints: 1
```

---

## Testing Best Practices

### Test Organization

```rust
// Unit tests
#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_add() {
        assert_eq!(add(2, 2), 4);
    }

    #[test]
    #[should_panic(expected = "divide by zero")]
    fn test_divide_by_zero() {
        divide(1, 0);
    }
}

// Integration tests (in tests/ directory)
// tests/integration_test.rs
#[test]
fn test_public_api() {
    // Tests the crate's public interface
}
```

### Doc Tests

```rust
/// Adds two numbers.
///
/// # Examples
///
/// ```
/// let result = my_crate::add(2, 2);
/// assert_eq!(result, 4);
/// ```
pub fn add(a: i32, b: i32) -> i32 {
    a + b
}
```

---

## Cargo Mastery

### Essential Commands

```bash
# Create new project
cargo new myproject
cargo new --lib mylib

# Build and run
cargo build          # Debug build
cargo build --release  # Optimized build
cargo run
cargo run --release

# Testing
cargo test           # Run all tests
cargo test test_name  # Run specific test
cargo test --doc     # Run doc tests

# Quality
cargo check          # Fast compile check
cargo clippy         # Linter
cargo fmt            # Formatter

# Documentation
cargo doc --open     # Generate and open docs

# Dependencies
cargo add serde      # Add dependency (requires cargo-edit)
cargo update         # Update dependencies
```

### Cargo.toml Essentials

```toml
[package]
name = "my_project"
version = "0.1.0"
edition = "2021"

[dependencies]
serde = { version = "1.0", features = ["derive"] }
tokio = { version = "1", features = ["full"] }

[dev-dependencies]
criterion = "0.5"  # Benchmarking

[build-dependencies]
cc = "1.0"  # For build scripts

[[bin]]
name = "my-tool"
path = "src/bin/my-tool.rs"
```

---

## Assessment

### You're ready for Advanced when you can:

✅ Write code using iterators instead of loops
✅ Choose the right smart pointer for the situation
✅ Implement interior mutability patterns
✅ Write comprehensive test suites
✅ Document public APIs properly
✅ Manage cargo workspaces
✅ Build production-quality CLI tools
✅ Complete a 500+ line project

---

## Resources for This Level

### Books & Guides
- The Rust Book Chapters 12-15, 20
- "Command Line Rust" by Ken Youens-Clark
- Rust Cookbook (I/O, CLI sections)

### Crates to Study
- `clap` - CLI argument parsing
- `anyhow`/`thiserror` - Error handling
- `serde` - Serialization
- `rayon` - Data parallelism

### Practice
- Build command-line tools
- Contribute to open-source Rust projects
- Solve Advent of Code with iterator chains

---

## What's Next?

**04-Advanced** is where things get serious:
- Multithreading and concurrency
- Async programming with Tokio
- Writing macros
- Unsafe Rust and FFI
- Advanced type system features
- Performance optimization

---

## Motivation

> "Intermediate Rust is where you stop fighting the language and start dancing with it."
>
> — Rust Wisdom

You're no longer a beginner. You're writing real Rust code. The advanced topics await! 🦀

---

*Pro tip: The best way to learn intermediate Rust is to build something real. Pick a project that excites you and build it. You'll learn more in one real project than in ten tutorials.*
