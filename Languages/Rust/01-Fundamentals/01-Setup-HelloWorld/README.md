# Setup & Hello World - Your Rust Journey Begins

## Welcome to Rust! 🦀

This is day 1 of your Rust mastery. By the end of this lesson, you'll have Rust installed and running your first program.

---

## What You'll Learn

✅ Install Rust using rustup
✅ Understand the Rust toolchain
✅ Create your first Rust project with Cargo
✅ Understand project structure
✅ Compile and run Rust programs
✅ Use the `println!` macro

**Time**: 2-3 hours

---

## Installing Rust

### Step 1: Install rustup (The Rust Toolchain Installer)

**On Linux/macOS:**
```bash
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
```

**On Windows:**
Download and run [rustup-init.exe](https://rustup.rs/)

### Step 2: Verify Installation

```bash
rustc --version   # Rust compiler
cargo --version   # Package manager
rustfmt --version # Code formatter
clippy --version  # Linter
```

Expected output:
```
rustc 1.75.0 (or newer)
cargo 1.75.0 (or newer)
rustfmt 1.6.0
clippy 0.1.75
```

### Step 3: Update Rust (Do this regularly!)

```bash
rustup update
```

---

## Understanding the Rust Toolchain

Rust comes with amazing tools:

| Tool | Purpose |
|------|---------|
| **rustc** | The Rust compiler (you rarely use it directly) |
| **cargo** | Build system and package manager (your main tool) |
| **rustup** | Toolchain installer and version manager |
| **rustfmt** | Code formatter (like prettier/black) |
| **clippy** | Linter (catches common mistakes) |
| **rust-analyzer** | Language server for IDEs |

---

## Your First Rust Program (Without Cargo)

### Manual Compilation

```rust
// main.rs
fn main() {
    println!("Hello, world!");
}
```

Compile and run:
```bash
rustc main.rs
./main  # Linux/macOS
main.exe  # Windows
```

**Output**: `Hello, world!`

### Understanding the Code

```rust
fn main() {              // fn = function, main = entry point
    println!("Hello, world!");  // println! is a MACRO (note the !)
}                        // Semicolons end statements
```

**Key Points**:
- `fn` declares a function
- `main` is special - it's where execution starts
- `println!` is a macro (macros end with `!`)
- Strings use double quotes
- Statements end with `;`

---

## The Right Way: Using Cargo

Cargo is Rust's build tool and package manager. **Always use Cargo for projects.**

### Create a New Project

```bash
cargo new hello_world
cd hello_world
```

This creates:
```
hello_world/
├── Cargo.toml    # Project metadata and dependencies
├── src/
│   └── main.rs   # Your code
└── .gitignore    # Git ignore file (bonus!)
```

### Cargo.toml - The Manifest File

```toml
[package]
name = "hello_world"
version = "0.1.0"
edition = "2021"     # Rust edition

[dependencies]
# Dependencies go here
```

**Editions**: Rust evolves in "editions" (2015, 2018, 2021). Use `2021`.

### src/main.rs - Your Code

```rust
fn main() {
    println!("Hello, world!");
}
```

### Build and Run

```bash
# Compile (creates target/debug/hello_world)
cargo build

# Run the compiled binary
./target/debug/hello_world

# OR do both at once:
cargo run
```

### Quick Check (No Binary)

```bash
cargo check  # Compiles but doesn't produce executable (FAST!)
```

**Use `cargo check` constantly while developing!**

---

## Exploring `println!`

### Basic Usage

```rust
fn main() {
    println!("Hello, world!");           // Plain text
    println!("The number is {}", 42);    // Placeholder
    println!("{} + {} = {}", 2, 2, 4);   // Multiple placeholders
}
```

Output:
```
Hello, world!
The number is 42
2 + 2 = 4
```

### Named Arguments

```rust
fn main() {
    println!("{name} is {age} years old", name = "Alice", age = 30);
}
```

Output: `Alice is 30 years old`

### Debug Output

```rust
fn main() {
    let numbers = vec![1, 2, 3];
    println!("{:?}", numbers);  // Debug format
    println!("{:#?}", numbers); // Pretty debug format
}
```

**Note**: `{:?}` is for debugging complex types.

---

## Common Beginner Mistakes

### Mistake 1: Forgetting Semicolons

```rust
// ❌ ERROR
fn main() {
    println!("Hello")  // Missing semicolon!
}

// ✅ CORRECT
fn main() {
    println!("Hello");
}
```

### Mistake 2: Using `print` Instead of `println!`

```rust
// ❌ ERROR: No such thing as print (no !)
fn main() {
    print("Hello");
}

// ✅ CORRECT
fn main() {
    println!("Hello");  // Note the !
}
```

### Mistake 3: Wrong Quotes

```rust
// ❌ ERROR: Rust uses double quotes for strings
fn main() {
    println!('Hello');  // Single quotes are for characters only
}

// ✅ CORRECT
fn main() {
    println!("Hello");
}
```

---

## Your First Exercises

### Exercise 1: Hello, Your Name!

Print your name:
```rust
fn main() {
    println!("Hello, [YOUR NAME]!");
}
```

### Exercise 2: Multiple Lines

Print 3 lines:
```rust
fn main() {
    println!("Welcome to Rust");
    println!("This is awesome");
    println!("Let's learn together!");
}
```

### Exercise 3: Using Placeholders

```rust
fn main() {
    let name = "Alice";
    let age = 30;
    println!("My name is {} and I am {} years old", name, age);
}
```

### Exercise 4: Simple Math

```rust
fn main() {
    println!("2 + 2 = {}", 2 + 2);
    println!("10 - 5 = {}", 10 - 5);
    println!("4 * 3 = {}", 4 * 3);
    println!("10 / 2 = {}", 10 / 2);
}
```

### Exercise 5: Personalized Greeting

Create a new Cargo project and write a program that prints:
```
Hello, [Your Name]!
Welcome to Rust programming.
Today is a great day to code!
```

---

## IDE Setup (Recommended)

### Visual Studio Code (Best for Beginners)

1. Install [VS Code](https://code.visualstudio.com/)
2. Install "rust-analyzer" extension
3. Install "CodeLLDB" for debugging
4. Install "crates" for dependency management

### Other Options

- **IntelliJ IDEA** + Rust plugin (Excellent)
- **Vim/Neovim** + rust-analyzer
- **Emacs** + rust-mode

---

## Useful Cargo Commands

```bash
# Create new project
cargo new project_name

# Create new library
cargo new --lib library_name

# Check for errors (fast)
cargo check

# Build (debug mode)
cargo build

# Build (release mode, optimized)
cargo build --release

# Run
cargo run

# Run with arguments
cargo run -- arg1 arg2

# Run tests
cargo test

# Format code
cargo fmt

# Run linter
cargo clippy

# Clean build artifacts
cargo clean
```

---

## Understanding Project Structure

```
my_project/
├── Cargo.toml       # Manifest (metadata + dependencies)
├── Cargo.lock       # Dependency lock file (don't edit!)
├── src/
│   ├── main.rs      # Binary entry point (for executables)
│   └── lib.rs       # Library entry point (for libraries)
├── tests/           # Integration tests (optional)
├── examples/        # Example code (optional)
└── target/          # Build output (gitignored)
    ├── debug/       # Debug builds
    └── release/     # Release builds
```

---

## The Rust Build Process

```
Source Code (*.rs)
      ↓
   [rustc]        ← Compiler
      ↓
  LLVM IR         ← Intermediate representation
      ↓
   [LLVM]         ← LLVM backend
      ↓
Machine Code      ← Native binary
```

**Why is this important?**
- Rust compiles to native code (fast!)
- No runtime or garbage collector
- Cross-compilation is possible

---

## Release vs Debug Builds

### Debug Build (Default)

```bash
cargo build
```

- **Fast compilation**
- **Slow runtime**
- Includes debugging symbols
- No optimizations
- Use for development

### Release Build

```bash
cargo build --release
```

- **Slow compilation**
- **Fast runtime** (10-100x faster!)
- Optimizations enabled
- Smaller binary
- Use for production

**Rule**: Develop with debug, ship with release!

---

## Next Steps

✅ You now have Rust installed
✅ You can create, compile, and run Rust programs
✅ You understand Cargo basics
✅ You've written your first Rust code

**Tomorrow**: Learn about variables and mutability in `02-Variables-Mutability`

---

## Quick Reference Card

```rust
// Create project
cargo new my_project

// Basic program
fn main() {
    println!("Hello, world!");
}

// With variables
fn main() {
    let name = "Alice";
    println!("Hello, {}!", name);
}

// With numbers
fn main() {
    let x = 5;
    let y = 10;
    println!("{} + {} = {}", x, y, x + y);
}
```

---

## Common Questions

**Q: What's the difference between `rustc` and `cargo`?**
A: `rustc` is the compiler. `cargo` is the build tool that calls `rustc` (plus does much more). Always use `cargo`.

**Q: Why `println!` and not `println`?**
A: The `!` means it's a macro, not a function. Macros are expanded at compile time.

**Q: Should I commit target/ to git?**
A: No! It's already in `.gitignore`. It contains build artifacts.

**Q: What edition should I use?**
A: Always use the latest (2021 as of now). It's in Cargo.toml.

**Q: Can I use Rust without Cargo?**
A: Technically yes, but please don't. Cargo is amazing.

---

## Debugging Tips

### Rust Won't Compile?

1. **Read the error message carefully** - Rust errors are helpful!
2. **Check for typos** - Rust is case-sensitive
3. **Check semicolons** - Missing `;` is common
4. **Run `cargo check`** - Faster than full compile

### Can't Find `cargo`?

```bash
# Add to shell profile (.bashrc, .zshrc, etc.)
source $HOME/.cargo/env

# OR
export PATH="$HOME/.cargo/bin:$PATH"
```

---

**Congratulations! You're now a Rust programmer!** 🦀

Move on to `02-Variables-Mutability` when you're ready.
