# Basic Syntax

## What You'll Learn
- Function definitions and calls
- Basic operators
- Infix and prefix notation
- Let and where bindings
- If-then-else expressions
- Function composition
- Operator precedence

## Concept Overview

Haskell has a clean, mathematical syntax. Functions are first-class citizens, and the language emphasizes expressions over statements.

### Function Definition

```haskell
-- Simple function
double x = x * 2

-- With type signature
triple :: Int -> Int
triple x = x * 3

-- Multiple parameters
add :: Int -> Int -> Int
add x y = x + y

-- In GHCi:
ghci> double 5
10
ghci> triple 7
21
ghci> add 3 4
7
```

### Function Application

```haskell
-- No parentheses needed for function calls
result = square 5          -- 25

-- Function application has highest precedence
value = square 2 + 1       -- (square 2) + 1 = 5
notThis = square (2 + 1)   -- square 3 = 9

-- Multiple arguments
sum3 a b c = a + b + c
result = sum3 1 2 3        -- 6
```

### Operators

```haskell
-- Arithmetic operators
5 + 3      -- 8 (addition)
10 - 4     -- 6 (subtraction)
6 * 7      -- 42 (multiplication)
20 / 4     -- 5.0 (division - floating point)
20 `div` 3 -- 6 (integer division)
20 `mod` 3 -- 2 (modulo)
2 ^ 10     -- 1024 (exponentiation)

-- Comparison operators
5 == 5     -- True
5 /= 3     -- True (not equal)
5 < 10     -- True
5 >= 5     -- True

-- Boolean operators
True && False    -- False (and)
True || False    -- True (or)
not True         -- False (negation)
```

### Infix vs Prefix

```haskell
-- Functions can be used infix with backticks
div 10 3        -- 3 (prefix)
10 `div` 3      -- 3 (infix)

mod 10 3        -- 1 (prefix)
10 `mod` 3      -- 1 (infix)

-- Custom functions work too
add x y = x + y
add 5 3         -- 8 (prefix)
5 `add` 3       -- 8 (infix - more readable!)

-- Operators can be used prefix with parentheses
(+) 5 3         -- 8
(*) 6 7         -- 42
(==) 5 5        -- True
```

### If-Then-Else

```haskell
-- If is an EXPRESSION, not a statement
-- Must have both then and else

abs' x = if x >= 0 then x else -x

signum' x = if x > 0 then 1
            else if x < 0 then -1
            else 0

-- One-line version
max' a b = if a > b then a else b

-- In GHCi:
ghci> abs' (-5)
5
ghci> signum' (-3)
-1
ghci> max' 10 20
20
```

### Let Bindings

```haskell
-- Let defines local variables
cylinder r h =
    let sideArea = 2 * pi * r * h
        topArea = pi * r ^ 2
    in sideArea + 2 * topArea

-- Multiple bindings
bmiTell weight height =
    let bmi = weight / height ^ 2
        skinny = 18.5
        normal = 25.0
    in if bmi <= skinny
       then "Underweight"
       else if bmi <= normal
       then "Normal"
       else "Overweight"

-- Let bindings can use each other
calcSquares =
    let a = 5
        b = 10
        sumSquares = a^2 + b^2
    in sumSquares  -- 125
```

### Where Bindings

```haskell
-- Where is similar to let, but comes after
cylinder' r h = sideArea + 2 * topArea
    where sideArea = 2 * pi * r * h
          topArea = pi * r ^ 2

-- More readable for complex functions
bmiTell' weight height
    | bmi <= skinny = "Underweight"
    | bmi <= normal = "Normal"
    | otherwise     = "Overweight"
    where bmi = weight / height ^ 2
          skinny = 18.5
          normal = 25.0

-- Where bindings can define functions
initials firstname lastname = [f] ++ ". " ++ [l] ++ "."
    where (f:_) = firstname
          (l:_) = lastname
```

### Function Composition

```haskell
-- (.) operator composes functions
-- (f . g) x = f (g x)

-- Without composition
result = negate (abs (-5))  -- -5

-- With composition
negateAbs = negate . abs
result' = negateAbs (-5)    -- -5

-- Multiple composition
fn = negate . (* 3) . (+ 2)
fn 5    -- negate ((5 + 2) * 3) = -21

-- Practical example
sumSquares = sum . map (^2)
sumSquares [1,2,3,4]  -- 30
```

### Operator Sections

```haskell
-- Partial application of operators
divideByTen = (/ 10)
divideByTen 200     -- 20.0

isUpperCase = (`elem` ['A'..'Z'])
isUpperCase 'A'     -- True
isUpperCase 'a'     -- False

subtractFour = subtract 4
subtractFour 10     -- 6

-- Using sections with map
ghci> map (/ 2) [2, 4, 6, 8]
[1.0,2.0,3.0,4.0]

ghci> map (++ "!") ["Hello", "World"]
["Hello!","World!"]
```

### Dollar Operator ($)

```haskell
-- $ is function application with lowest precedence
-- f $ x = f x

-- Avoid parentheses
sum (map (*2) [1..10])    -- With parens
sum $ map (*2) [1..10]    -- With $

-- More complex
sqrt (3 + 4 + 9)          -- With parens
sqrt $ 3 + 4 + 9          -- With $

-- Chain with composition
sum (filter (> 5) (map (*2) [1..10]))
sum $ filter (> 5) $ map (*2) [1..10]
```

### Operator Precedence

```haskell
-- Precedence levels 0-9 (9 is highest)
-- Function application has precedence 10

2 + 3 * 4       -- 14 (multiplication first)
(2 + 3) * 4     -- 20

not True && False   -- Error! (need parens)
(not True) && False -- False

-- $ has lowest precedence (0)
-- . has high precedence (9)
```

## Your Tasks

### Task 1: Basic Functions
Create `syntax_basic.hs` with:
- `square :: Int -> Int` - square a number
- `cube :: Int -> Int` - cube a number
- `isEven :: Int -> Bool` - check if even
- `isOdd :: Int -> Bool` - check if odd
- Test all in main

### Task 2: Multiple Parameters
Create `syntax_params.hs` with:
- `add3 :: Int -> Int -> Int -> Int` - add three numbers
- `average :: Double -> Double -> Double` - average of two numbers
- `volumeBox :: Double -> Double -> Double -> Double` - l * w * h
- `areaTriangle :: Double -> Double -> Double` - base * height / 2

### Task 3: Infix Usage
Create `syntax_infix.hs` with:
- `power :: Int -> Int -> Int` (x^y)
- Use it both prefix and infix: `power 2 3` and `2 \`power\` 3`
- `between :: Int -> Int -> Int -> Bool` - check if number between two others
- Test: `5 \`between\` 1 $ 10`

### Task 4: If-Then-Else
Create `syntax_if.hs` with:
- `maxOfThree :: Int -> Int -> Int -> Int` - max of three numbers
- `letterGrade :: Int -> String` - A (90+), B (80+), C (70+), D (60+), F
- `canVote :: Int -> Bool` - age >= 18
- `describeNumber :: Int -> String` - "positive", "negative", or "zero"

### Task 5: Let Bindings
Create `syntax_let.hs` with:
- `quadraticRoots :: Double -> Double -> Double -> (Double, Double)`
  - Use discriminant and formula in let binding
- `sphereVolume :: Double -> Double` - volume of sphere
  - Define pi and calculation in let
- Test with examples

### Task 6: Where Bindings
Create `syntax_where.hs` with:
- `bmiCalculator :: Double -> Double -> String`
  - Calculate BMI in where
  - Return category
- `priceWithTax :: Double -> Double`
  - Tax rate in where (15%)
  - Return total
- `circleStats :: Double -> (Double, Double)`
  - Return (area, circumference) using where

### Task 7: Function Composition
Create `syntax_compose.hs` with:
- Define: `addOne = (+ 1)`
- Define: `doubleIt = (* 2)`
- Compose: `addOneThenDouble = doubleIt . addOne`
- Compose: `doubleAddOne = addOne . doubleIt`
- Test with: 5 (show difference!)
- Define: `sumOfSquares = sum . map (^2)`
- Test with: [1,2,3,4,5]

### Task 8: Operator Sections
Create `syntax_sections.hs` with:
- `half = (/ 2)`
- `double = (* 2)`
- `isPositive = (> 0)`
- `addTen = (+ 10)`
- Map each over a list and show results

### Task 9: Dollar Operator
Rewrite these using $ instead of parentheses in `syntax_dollar.hs`:
- `sqrt (abs (negate (-25)))`
- `sum (map (*2) (filter (>5) [1..20]))`
- `head (reverse (tail [1,2,3,4,5]))`

### Task 10: Complex Expressions
Create `syntax_complex.hs` with:
- `distance :: (Double, Double) -> (Double, Double) -> Double`
  - Distance between two 2D points
  - Use let or where for intermediate calculations
- `compoundInterest :: Double -> Double -> Int -> Double`
  - principal -> rate -> years -> amount
  - Formula: P * (1 + r)^t

## Expected Output Examples

**Task 1:**
```
Square of 5: 25
Cube of 3: 27
Is 4 even? True
Is 7 odd? True
```

**Task 4:**
```
Max of 5, 10, 3: 10
Grade for 85: B
Can 16 year old vote? False
Describe 0: zero
Describe -5: negative
Describe 10: positive
```

**Task 7:**
```
addOneThenDouble 5 = 12  (5+1=6, 6*2=12)
doubleAddOne 5 = 11      (5*2=10, 10+1=11)
sumOfSquares [1,2,3,4,5] = 55
```

**Task 10:**
```
Distance between (0,0) and (3,4): 5.0
Compound interest: $1000 at 5% for 10 years = $1628.89
```

## Tips
- **Function application** has highest precedence
- **Indentation matters** - align where/let bindings
- Use **let** when bindings are expressions
- Use **where** for readability at end of function
- **$** removes need for many parentheses
- **Infix notation** can make code more readable
- **if-then-else** always needs both branches
- Practice reading type signatures carefully

## Common Mistakes

```haskell
-- ❌ Missing else branch
abs' x = if x >= 0 then x  -- Error! Must have else

-- ✅ Both branches
abs' x = if x >= 0 then x else -x

-- ❌ Wrong indentation in where
fn x = result
    where a = 5
        b = 10  -- Error! Wrong indentation

-- ✅ Proper indentation
fn x = result
    where a = 5
          b = 10

-- ❌ Using = instead of <- in do blocks (wait for I/O lesson)

-- ❌ Incorrect operator precedence
not True && False  -- Error!

-- ✅ Use parentheses
(not True) && False  -- False

-- ❌ Function composition wrong direction
-- map . sum won't work
-- sum . map is correct

-- ❌ Forgetting $ can only replace right-most parens
sum $ map (*2) $ filter (>5) [1..10]  -- OK
(sum $ map (*2)) (filter (>5) [1..10])  -- Error!
```

## Key Concepts
- **Function Application**: Highest precedence, no parentheses needed
- **Infix/Prefix**: Functions can be used both ways
- **if-then-else**: Expression that returns a value
- **let binding**: Define local variables in expression
- **where binding**: Define local variables after function body
- **Function Composition** (.): Combine functions
- **Dollar ($)**: Low-precedence function application
- **Operator Sections**: Partial application of operators
- **Precedence**: Order of operations

## Operator Summary

| Operator | Purpose | Example |
|----------|---------|---------|
| `+`, `-`, `*`, `/` | Arithmetic | `5 + 3` |
| `^` | Exponentiation | `2 ^ 10` |
| `` `div` ``, `` `mod` `` | Integer division/mod | `10 \`div\` 3` |
| `==`, `/=` | Equality | `5 == 5` |
| `<`, `>`, `<=`, `>=` | Comparison | `5 < 10` |
| `&&`, `||` | Boolean logic | `True && False` |
| `$` | Function application | `f $ g x` |
| `.` | Function composition | `f . g` |
| `:` | Cons (prepend to list) | `1 : [2,3]` |
| `++` | List concatenation | `[1,2] ++ [3,4]` |

## Next Steps
Move on to `03-Types-TypeClasses` to learn about Haskell's powerful type system!
