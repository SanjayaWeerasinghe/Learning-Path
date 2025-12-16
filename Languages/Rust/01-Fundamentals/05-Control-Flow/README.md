# Control Flow - Making Decisions in Rust

## Directing Program Execution

Control flow determines which code runs and when. Master `if`, loops, and `match`.

**Time**: 4-5 hours

---

## `if` Expressions

### Basic `if`

```rust
fn main() {
    let number = 5;

    if number > 0 {
        println!("Positive");
    }
}
```

### `if-else`

```rust
fn main() {
    let number = -3;

    if number > 0 {
        println!("Positive");
    } else {
        println!("Not positive");
    }
}
```

### `if-else if-else`

```rust
fn main() {
    let number = 0;

    if number > 0 {
        println!("Positive");
    } else if number < 0 {
        println!("Negative");
    } else {
        println!("Zero");
    }
}
```

### `if` is an Expression!

```rust
fn main() {
    let condition = true;
    let number = if condition { 5 } else { 6 };

    println!("The value is: {}", number);  // 5
}
```

**Both arms must return same type**:

```rust
// ❌ ERROR: Mismatched types
let number = if condition { 5 } else { "six" };

// ✅ CORRECT: Same type
let number = if condition { 5 } else { 6 };
```

---

## Loops

Rust has three kinds of loops: `loop`, `while`, and `for`.

### Infinite Loop with `loop`

```rust
fn main() {
    loop {
        println!("Again!");  // Forever!
    }
}
```

### Breaking Out

```rust
fn main() {
    let mut count = 0;

    loop {
        count += 1;

        if count == 3 {
            break;  // Exit loop
        }

        println!("Count: {}", count);
    }
}
```

Output:
```
Count: 1
Count: 2
```

### Returning from Loops

```rust
fn main() {
    let mut counter = 0;

    let result = loop {
        counter += 1;

        if counter == 10 {
            break counter * 2;  // Return value!
        }
    };

    println!("Result: {}", result);  // 20
}
```

---

## `while` Loops

```rust
fn main() {
    let mut number = 3;

    while number != 0 {
        println!("{}!", number);
        number -= 1;
    }

    println!("LIFTOFF!");
}
```

Output:
```
3!
2!
1!
LIFTOFF!
```

---

## `for` Loops

### Iterating Over Collection

```rust
fn main() {
    let a = [10, 20, 30, 40, 50];

    for element in a {
        println!("The value is: {}", element);
    }
}
```

### Range

```rust
fn main() {
    for number in 1..4 {  // 1, 2, 3 (excludes 4)
        println!("{}", number);
    }

    for number in 1..=4 {  // 1, 2, 3, 4 (includes 4)
        println!("{}", number);
    }
}
```

### Countdown

```rust
fn main() {
    for number in (1..4).rev() {  // Reverse!
        println!("{}!", number);
    }
    println!("LIFTOFF!");
}
```

Output:
```
3!
2!
1!
LIFTOFF!
```

---

## `match` - Pattern Matching

### Basic Match

```rust
fn main() {
    let number = 2;

    match number {
        1 => println!("One"),
        2 => println!("Two"),
        3 => println!("Three"),
        _ => println!("Something else"),  // _ is catchall
    }
}
```

### Match with Multiple Patterns

```rust
fn main() {
    let number = 4;

    match number {
        1 | 2 => println!("One or two"),  // Multiple patterns
        3..=5 => println!("Three to five"),  // Range
        _ => println!("Something else"),
    }
}
```

### Match is an Expression

```rust
fn main() {
    let number = 3;

    let description = match number {
        1 => "one",
        2 => "two",
        3 => "three",
        _ => "other",
    };

    println!("The number is {}", description);
}
```

### Match with Values

```rust
fn day_type(day: u32) -> &'static str {
    match day {
        1..=5 => "Weekday",
        6 | 7 => "Weekend",
        _ => "Invalid day",
    }
}

fn main() {
    println!("{}", day_type(3));  // Weekday
    println!("{}", day_type(7));  // Weekend
}
```

---

## `continue` Keyword

```rust
fn main() {
    for number in 1..=5 {
        if number == 3 {
            continue;  // Skip 3
        }
        println!("{}", number);
    }
}
```

Output:
```
1
2
4
5
```

---

## Loop Labels

For nested loops:

```rust
fn main() {
    'outer: for x in 0..3 {
        for y in 0..3 {
            if x == 1 && y == 1 {
                break 'outer;  // Break outer loop
            }
            println!("({}, {})", x, y);
        }
    }
}
```

---

## Practical Examples

### Example 1: FizzBuzz

```rust
fn main() {
    for number in 1..=20 {
        match (number % 3, number % 5) {
            (0, 0) => println!("FizzBuzz"),
            (0, _) => println!("Fizz"),
            (_, 0) => println!("Buzz"),
            (_, _) => println!("{}", number),
        }
    }
}
```

### Example 2: Number Guessing Game

```rust
use std::io;

fn main() {
    let secret = 7;

    loop {
        println!("Guess the number:");

        let mut guess = String::new();
        io::stdin().read_line(&mut guess).expect("Failed");

        let guess: i32 = match guess.trim().parse() {
            Ok(num) => num,
            Err(_) => continue,
        };

        match guess.cmp(&secret) {
            std::cmp::Ordering::Less => println!("Too small!"),
            std::cmp::Ordering::Greater => println!("Too big!"),
            std::cmp::Ordering::Equal => {
                println!("You win!");
                break;
            }
        }
    }
}
```

### Example 3: Sum of Evens

```rust
fn main() {
    let mut sum = 0;

    for number in 1..=100 {
        if number % 2 == 0 {
            sum += number;
        }
    }

    println!("Sum of evens 1-100: {}", sum);  // 2550
}
```

---

## Exercises

### Exercise 1: Grade Calculator

```rust
fn get_grade(score: u32) -> char {
    // Return 'A' for 90-100
    // 'B' for 80-89, etc.
}
```

### Exercise 2: Factorial

```rust
fn factorial(n: u32) -> u32 {
    // Calculate n! using loop
}
```

### Exercise 3: Prime Checker

```rust
fn is_prime(n: u32) -> bool {
    // Return true if n is prime
}
```

### Exercise 4: Multiplication Table

```rust
fn print_table(n: u32) {
    // Print multiplication table for n
}
```

### Exercise 5: Pattern Printer

```rust
fn print_triangle(n: u32) {
    // Print:
    // *
    // **
    // ***
    // ****
    // (n rows)
}
```

---

## Best Practices

### ✅ Prefer `for` over `while` for iteration

```rust
// ❌ Risky: Easy to mess up
let mut i = 0;
while i < 5 {
    println!("{}", i);
    i += 1;
}

// ✅ Safe and clear
for i in 0..5 {
    println!("{}", i);
}
```

### ✅ Use `match` for exhaustive checks

```rust
// ❌ Easy to forget cases
if x == 1 {
    //...
} else if x == 2 {
    //...
}

// ✅ Compiler ensures all cases covered
match x {
    1 => {},
    2 => {},
    _ => {},
}
```

### ✅ Use ranges instead of inequalities

```rust
// ❌ Verbose
if x >= 1 && x <= 10 {
    //...
}

// ✅ Clear
match x {
    1..=10 => {},
    _ => {},
}
```

---

## Quick Reference

```rust
// if expression
let x = if condition { 5 } else { 6 };

// loop (infinite)
loop {
    break;  // Exit
}

// while
while condition {
    // ...
}

// for range
for i in 0..10 {  // 0 to 9
    // ...
}

// for array
for item in array {
    // ...
}

// match
match value {
    1 => {},
    2 | 3 => {},  // Multiple
    4..=10 => {},  // Range
    _ => {},  // Catchall
}

// continue/break
for i in 0..10 {
    if i == 5 { continue; }
    if i == 8 { break; }
}
```

---

**Next**: `06-Ownership-Basics` - The most important concept in Rust!
