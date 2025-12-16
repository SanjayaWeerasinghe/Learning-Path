# Rust Fundamentals - Starting from Zero

## Welcome to Rust!

This section assumes **zero prior programming knowledge in Rust**. We start with the absolute basics and build a solid foundation.

**Duration**: 4-5 weeks
**Daily commitment**: 1-2 hours
**Difficulty**: ⭐⭐☆☆☆

---

## What You'll Learn

By the end of Fundamentals, you will:

✅ Understand Rust's ownership system (the most important concept)
✅ Know when to use references vs owned values
✅ Work confidently with strings and slices
✅ Write functions and control flow
✅ Understand stack vs heap memory
✅ Debug common borrow checker errors

---

## Topics Covered

### Week 1: Basics

**01. Setup & Hello World** (Day 1-2)
- Install rustup, cargo, IDE setup
- Create first project with `cargo new`
- Understand project structure
- Compile and run programs
- Use `println!` macro

**02. Variables & Mutability** (Day 3-4)
- `let` bindings
- Mutability with `mut`
- Constants with `const`
- Shadowing
- Scope and dropping

**03. Data Types** (Day 5-7)
- Scalar types: integers, floats, booleans, characters
- Compound types: tuples, arrays
- Type annotations and inference
- Numeric operations
- Type conversions

### Week 2: Functions & Control

**04. Functions** (Day 8-10)
- Defining functions with `fn`
- Parameters and return values
- Expressions vs statements
- Unit type `()`
- Function signatures

**05. Control Flow** (Day 11-14)
- `if` expressions
- `else if` and `else`
- `loop`, `while`, `for`
- `break` and `continue`
- Pattern matching intro with `match`

### Week 3-4: Ownership (Most Important!)

**06. Ownership Basics** (Day 15-17)
- What is ownership?
- The three ownership rules
- Stack vs heap memory
- Move semantics
- Copy types vs Move types
- Drop trait

**07. References & Borrowing** (Day 18-21)
- Immutable references `&T`
- Mutable references `&mut T`
- Borrowing rules (the borrow checker!)
- Dangling references
- Reference scope

**08. Slices** (Day 22-24)
- What are slices?
- String slices `&str`
- Array slices `&[T]`
- Slice internals
- When to use slices

**09. String vs &str** (Day 25-28)
- `String` (owned) vs `&str` (borrowed)
- String creation and manipulation
- String concatenation
- UTF-8 encoding
- When to use each

---

## Learning Strategy

### Week-by-Week Breakdown

**Week 1**: Get comfortable with syntax and basic types
→ Build: Calculator, temperature converter

**Week 2**: Master control flow and functions
→ Build: Guessing game, FizzBuzz, pattern printer

**Week 3**: FIGHT THE BORROW CHECKER (hardest week!)
→ Read ownership chapter 3 times, do rustlings exercises

**Week 4**: Practice ownership until it clicks
→ Build: Text parser, word counter, simple games

---

## Important Notes

### ⚠️ Expect Frustration in Week 3

**This is NORMAL:**
- "Why won't this compile?"
- "The borrow checker hates me"
- "I just want to use this value twice!"

**Push through:**
- The borrow checker is teaching you
- Every error message is a lesson
- This pain leads to enlightenment
- After 2-3 weeks, it clicks suddenly

### 💡 Success Tips

1. **Type everything yourself** - Don't copy-paste
2. **Read error messages carefully** - Rust errors are helpful
3. **Use `cargo check` frequently** - Fast feedback
4. **Don't skip ownership** - It's the foundation
5. **Do the exercises** - Reading isn't enough
6. **Ask "why?"** - Understand, don't memorize

---

## Practice Projects

### Beginner (Week 1-2)
```rust
// Calculator
// Temperature converter (F ↔ C)
// Number guessing game
// FizzBuzz
```

### Intermediate (Week 3-4)
```rust
// Word counter
// Text statistics analyzer
// Simple encryption/decryption
// Rock, paper, scissors game
```

---

## Common Misconceptions

❌ **"I'll skip ownership for now"**
→ No! Ownership IS Rust. Everything else builds on it.

❌ **"I'll use `.clone()` everywhere"**
→ That defeats the purpose. Fight the borrow checker properly.

❌ **"Garbage collected languages are easier"**
→ They hide complexity. Rust teaches you what's really happening.

❌ **"I need to understand lifetimes now"**
→ Not yet! Lifetimes come in Core Concepts.

---

## Prerequisites

**None!** We start from zero.

However, helpful (but not required):
- Basic computer literacy
- Comfort with command line
- Any programming experience (makes analogies easier)

---

## Resources for This Level

### Essential
- [The Rust Book](https://doc.rust-lang.org/book/) Chapters 1-4
- [Rustlings](https://github.com/rust-lang/rustlings) - Variables through Move Semantics
- [Rust by Example](https://doc.rust-lang.org/rust-by-example/) - Chapters 1-4

### Video
- [Let's Get Rusty](https://www.youtube.com/c/LetsGetRusty) - Beginner series
- [Jon Gjengset](https://www.youtube.com/c/JonGjengset) - Crust of Rust series

### Practice
- Exercism Rust Track (Hello World through Armstrong Numbers)
- Rustlings exercises 01-09

---

## Assessment

### You're ready for Core Concepts when you can:

✅ Explain the three ownership rules
✅ Know when to use `&` vs `&mut` vs owned
✅ Understand why code doesn't compile (borrow errors)
✅ Confidently use `String` and `&str`
✅ Write functions that borrow vs consume values
✅ Complete Rustlings move_semantics exercises

---

## What's Next?

After Fundamentals, you'll move to **02-Core Concepts** where you'll learn:
- Structs and enums
- Pattern matching
- Option and Result types
- Collections
- Generics and traits
- Lifetimes (advanced ownership)

---

## Motivation

> "The first two weeks of Rust are the hardest two weeks you'll ever spend learning a programming language. After that, you'll wonder how you ever lived without it."
>
> — Every Rust developer ever

**You can do this. Start with 01-Setup-HelloWorld!** 🦀

---

*Remember: If you're frustrated with the borrow checker, you're learning. If you're not frustrated, you're not trying hard enough. Embrace the struggle!*
