# Hello World & Setup

## What You'll Learn
- Installing GHC (Glasgow Haskell Compiler)
- Using GHCi (interactive mode)
- Writing your first Haskell program
- Compiling and running Haskell code
- Basic project structure

## Concept Overview

Haskell is a purely functional programming language. Unlike imperative languages, Haskell programs are built by composing functions and transforming data rather than executing sequences of commands.

### Installing Haskell

The recommended way to install Haskell is using **GHCup**, which manages GHC, Cabal, Stack, and HLS.

**Installation (Linux/macOS):**
```bash
curl --proto '=https' --tlsv1.2 -sSf https://get-ghcup.haskell.org | sh
```

**Installation (Windows):**
Download and run the installer from: https://www.haskell.org/ghcup/

**Verify Installation:**
```bash
ghc --version
ghci --version
```

### GHCi - Interactive Mode

GHCi is Haskell's REPL (Read-Eval-Print Loop) where you can test code interactively.

```bash
$ ghci
GHCi, version 9.4.7: https://www.haskell.org/ghc/  :? for help
ghci>
```

**Basic GHCi Commands:**
```haskell
ghci> 2 + 2
4

ghci> "Hello" ++ " World"
"Hello World"

ghci> :type True
True :: Bool

ghci> :info Int
-- Shows information about Int

ghci> :load MyFile.hs
-- Loads a Haskell file

ghci> :reload
-- Reloads the current file

ghci> :quit
-- Exit GHCi
```

### Your First Haskell Program

Create a file named `hello.hs`:

```haskell
-- hello.hs
-- Comments start with --

{-
   Multi-line comments
   use curly braces with dashes
-}

main :: IO ()
main = putStrLn "Hello, World!"
```

**Breaking it down:**
- `main` - The entry point of the program
- `:: IO ()` - Type signature (main has type IO with no meaningful return)
- `=` - Defines the value of main
- `putStrLn` - Function that prints a string with newline

**Running the program:**

**Method 1: Compile and run**
```bash
$ ghc hello.hs
$ ./hello
Hello, World!
```

**Method 2: Run with runghc (interpreted)**
```bash
$ runghc hello.hs
Hello, World!
```

**Method 3: Load in GHCi**
```bash
$ ghci
ghci> :load hello.hs
ghci> main
Hello, World!
```

### Basic Haskell Syntax

```haskell
-- Simple function definition
double x = x * 2

-- Function with type signature
triple :: Int -> Int
triple x = x * 3

-- Using the functions
result1 = double 5      -- 10
result2 = triple 7      -- 21

-- Functions are called WITHOUT parentheses
-- Instead of: double(5)
-- We write:   double 5
```

### Simple Calculator Example

```haskell
-- calculator.hs

-- Addition
add :: Int -> Int -> Int
add x y = x + y

-- Subtraction
subtract' :: Int -> Int -> Int
subtract' x y = x - y

-- Multiplication
multiply :: Int -> Int -> Int
multiply x y = x * y

-- Division (integer division)
divide :: Int -> Int -> Int
divide x y = x `div` y

-- Main function
main :: IO ()
main = do
    putStrLn "Simple Calculator"
    putStrLn ("5 + 3 = " ++ show (add 5 3))
    putStrLn ("10 - 4 = " ++ show (subtract' 10 4))
    putStrLn ("6 * 7 = " ++ show (multiply 6 7))
    putStrLn ("20 / 4 = " ++ show (divide 20 4))
```

**Run it:**
```bash
$ runghc calculator.hs
Simple Calculator
5 + 3 = 8
10 - 4 = 6
6 * 7 = 42
20 / 4 = 5
```

### Understanding Type Signatures

```haskell
-- Read as: greet takes a String and returns a String
greet :: String -> String
greet name = "Hello, " ++ name ++ "!"

-- Read as: add takes Int, takes another Int, returns Int
add :: Int -> Int -> Int
add x y = x + y

-- Read as: isEven takes Int, returns Bool
isEven :: Int -> Bool
isEven n = n `mod` 2 == 0

-- In GHCi:
ghci> greet "Alice"
"Hello, Alice!"

ghci> add 10 20
30

ghci> isEven 7
False

ghci> isEven 8
True
```

## Your Tasks

### Task 1: Install Haskell
- Install GHCup following the instructions above
- Verify GHC and GHCi are installed
- Start GHCi and try basic arithmetic: `2 + 2`, `10 * 5`, `20 - 7`

### Task 2: GHCi Exploration
In GHCi, try:
- `5 + 3`
- `"Hello" ++ " Haskell"`
- `:type 42`
- `:type "Hello"`
- `:type True`
- `max 10 20`
- `min 5 3`

### Task 3: Hello World
Create `hello.hs` that prints "Hello, World!" to the console.
Compile and run it using `ghc` and `./hello`.

### Task 4: Personal Greeting
Create `greeting.hs` that:
- Defines a function `greet` that takes a name and returns a greeting
- Has a main function that prints greetings for 3 different names

### Task 5: Simple Math
Create `math.hs` that:
- Defines functions: `add`, `subtract'`, `multiply`, `divide`
- Each function takes two Ints and returns an Int
- Main function demonstrates all operations with example values

### Task 6: Temperature Converter
Create `temp.hs` that:
- Defines `celsiusToFahrenheit :: Double -> Double`
- Defines `fahrenheitToCelsius :: Double -> Double`
- Main function converts and prints several temperatures
- Formula: F = C * 9/5 + 32

### Task 7: Circle Calculator
Create `circle.hs` that:
- Defines `circleArea :: Double -> Double` (area = π * r²)
- Defines `circleCircumference :: Double -> Double` (circumference = 2 * π * r)
- Use `pi` constant from Prelude
- Main function calculates for radius 5.0

### Task 8: Boolean Functions
Create `boolean.hs` that:
- Defines `isPositive :: Int -> Bool`
- Defines `isNegative :: Int -> Bool`
- Defines `isZero :: Int -> Bool`
- Main function tests with values: 10, -5, 0

### Task 9: String Operations
Create `strings.hs` that:
- Defines `initials :: String -> String -> String` (returns first letters)
- Example: `initials "John" "Doe"` returns "J.D."
- Main function shows examples

### Task 10: Interactive Program
Create `interactive.hs` that:
- Asks for user's name using `getLine`
- Greets them personally
- Asks for their age
- Prints a message with their age

Example:
```haskell
main :: IO ()
main = do
    putStrLn "What is your name?"
    name <- getLine
    putStrLn ("Hello, " ++ name ++ "!")
```

## Expected Output Examples

**Task 4:**
```
Hello, Alice!
Hello, Bob!
Hello, Charlie!
```

**Task 6:**
```
0°C = 32.0°F
100°C = 212.0°F
-40°C = -40.0°F
```

**Task 7:**
```
Circle with radius 5.0:
Area: 78.53981633974483
Circumference: 31.41592653589793
```

**Task 10:**
```
What is your name?
Alice
Hello, Alice!
How old are you?
25
You are 25 years old!
```

## Tips
- **Function names** start with lowercase letters
- **Type names** start with uppercase letters
- **Indentation matters** in Haskell (like Python)
- Use `:type` in GHCi to check types of expressions
- Use `:info` to get information about functions/types
- `++` concatenates strings
- `show` converts values to strings
- Function application doesn't need parentheses: `f x` not `f(x)`
- Use `$` to avoid parentheses: `f (g x)` = `f $ g x`

## Common Mistakes

```haskell
-- ❌ Parentheses for function calls (imperative style)
result = double(5)

-- ✅ No parentheses needed
result = double 5

-- ❌ Wrong indentation
greet name =
"Hello, " ++ name  -- Error!

-- ✅ Proper indentation
greet name =
    "Hello, " ++ name

-- ❌ Using = in IO blocks
main = do
    name = getLine  -- Error!
    putStrLn name

-- ✅ Use <- for IO actions
main = do
    name <- getLine
    putStrLn name

-- ❌ Trying to modify variables
x = 5
x = x + 1  -- Error! Can't reassign in Haskell

-- ✅ Create new bindings
x = 5
y = x + 1  -- y is 6, x is still 5
```

## Key Concepts
- **Pure Functions**: Same input always gives same output
- **Immutability**: Values cannot be changed
- **Type Signatures**: `name :: Type`
- **Function Application**: `functionName argument`
- **IO Actions**: Side effects wrapped in IO type
- **do notation**: For sequencing IO actions

## GHCi Quick Reference

| Command | Description |
|---------|-------------|
| `:type expr` or `:t expr` | Show type of expression |
| `:info name` or `:i name` | Show information about name |
| `:load file` or `:l file` | Load Haskell file |
| `:reload` or `:r` | Reload current file |
| `:quit` or `:q` | Exit GHCi |
| `:help` or `:?` | Show help |
| `:set +s` | Show timing/memory stats |
| `:browse ModuleName` | List module contents |

## Next Steps
Move on to `02-Basic-Syntax` to learn more about functions, operators, and expressions in Haskell!
