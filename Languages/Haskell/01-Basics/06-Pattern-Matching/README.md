# Pattern Matching

## What You'll Learn
- What pattern matching is
- Pattern matching on values
- Pattern matching on lists
- Pattern matching on tuples
- The wildcard pattern (_)
- As-patterns (@)
- Pattern guards
- Patterns in let and where
- Exhaustive patterns

## Concept Overview

Pattern matching is a powerful feature in Haskell that lets you check values against patterns and deconstruct data structures. It's one of the most important features for writing elegant functional code.

### Basic Pattern Matching

```haskell
-- Match on specific values
lucky :: Int -> String
lucky 7 = "LUCKY NUMBER SEVEN!"
lucky x = "Sorry, you're out of luck"

ghci> lucky 7
"LUCKY NUMBER SEVEN!"
ghci> lucky 3
"Sorry, you're out of luck"

-- Order matters! First match wins
sayMe :: Int -> String
sayMe 1 = "One!"
sayMe 2 = "Two!"
sayMe 3 = "Three!"
sayMe x = "Not between 1 and 3"

-- Multiple patterns
factorial :: Int -> Int
factorial 0 = 1
factorial n = n * factorial (n - 1)

-- Character patterns
charName :: Char -> String
charName 'a' = "Alpha"
charName 'b' = "Bravo"
charName 'c' = "Charlie"
charName c   = "Unknown: " ++ [c]
```

### List Pattern Matching

```haskell
-- Empty list pattern
sum' :: [Int] -> Int
sum' [] = 0
sum' (x:xs) = x + sum' xs

-- Match first element
head' :: [a] -> a
head' [] = error "Empty list!"
head' (x:_) = x

-- Match first two elements
firstTwo :: [a] -> String
firstTwo [] = "Empty list"
firstTwo [x] = "Only one element"
firstTwo (x:y:_) = "First two elements"

-- Pattern with specific values
tell :: [Int] -> String
tell [] = "Empty"
tell [x] = "Single element: " ++ show x
tell [x,y] = "Two elements: " ++ show x ++ " and " ++ show y
tell (x:y:_) = "Long list, first two: " ++ show x ++ ", " ++ show y

ghci> tell []
"Empty"
ghci> tell [1]
"Single element: 1"
ghci> tell [1,2]
"Two elements: 1 and 2"
ghci> tell [1,2,3,4,5]
"Long list, first two: 1, 2"
```

### Tuple Pattern Matching

```haskell
-- Pair patterns
addVectors :: (Double, Double) -> (Double, Double) -> (Double, Double)
addVectors (x1, y1) (x2, y2) = (x1 + x2, y1 + y2)

-- Triple patterns
first :: (a, b, c) -> a
first (x, _, _) = x

second :: (a, b, c) -> b
second (_, y, _) = y

third :: (a, b, c) -> c
third (_, _, z) = z

-- Nested patterns
describePair :: (Int, (String, Bool)) -> String
describePair (num, (str, bool)) =
    "Number: " ++ show num ++
    ", String: " ++ str ++
    ", Bool: " ++ show bool
```

### Wildcard Pattern (_)

```haskell
-- Ignore values you don't need
head' :: [a] -> a
head' (x:_) = x  -- Don't care about the tail

-- Ignore multiple values
third' :: [a] -> a
third' (_:_:x:_) = x

-- Ignore parts of tuples
snd' :: (a, b) -> b
snd' (_, y) = y

-- Count elements (ignore values)
length' :: [a] -> Int
length' [] = 0
length' (_:xs) = 1 + length' xs
```

### As-Patterns (@)

```haskell
-- Keep both the whole and the parts
firstLetter :: String -> String
firstLetter "" = "Empty string"
firstLetter all@(x:xs) = "First letter of " ++ all ++ " is " ++ [x]

ghci> firstLetter "Haskell"
"First letter of Haskell is H"

-- Useful for lists
capital :: String -> String
capital "" = "Empty string"
capital all@(x:xs) = "Capital of " ++ all ++ " is " ++ [x]

-- Pattern with as-pattern
dupli :: [a] -> [a]
dupli [] = []
dupli all@(x:xs) = x : all
-- dupli [1,2,3] = [1,1,2,3]
```

### Pattern Matching in Functions

```haskell
-- Multiple patterns for different cases
bmiTell :: Double -> String
bmiTell bmi
    | bmi <= 18.5 = "Underweight"
    | bmi <= 25.0 = "Normal"
    | bmi <= 30.0 = "Overweight"
    | otherwise   = "Obese"

-- Calculate BMI with pattern matching
describeBMI :: Double -> Double -> String
describeBMI weight height = bmiTell (weight / height^2)

-- Pattern match on constructor patterns
data Shape = Circle Double | Rectangle Double Double

area :: Shape -> Double
area (Circle r) = pi * r^2
area (Rectangle w h) = w * h
```

### Patterns in let and where

```haskell
-- Pattern in let
cylinder :: Double -> Double -> Double
cylinder r h =
    let (sideArea, topArea) = (2 * pi * r * h, pi * r^2)
    in sideArea + 2 * topArea

-- Pattern in where
initials :: String -> String -> String
initials firstname lastname = [f] ++ ". " ++ [l] ++ "."
    where (f:_) = firstname
          (l:_) = lastname

-- Multiple patterns in where
calcBmis :: [(Double, Double)] -> [Double]
calcBmis xs = [bmi w h | (w, h) <- xs]
    where bmi weight height = weight / height ^ 2
```

### List Patterns in Detail

```haskell
-- Match specific list structures
describeList :: [a] -> String
describeList [] = "Empty"
describeList [x] = "Singleton"
describeList [x,y] = "Two elements"
describeList [x,y,z] = "Three elements"
describeList (x:y:z:xs) = "Long list"

-- Match with guards
firstBigger :: [Int] -> Bool
firstBigger (x:y:_)
    | x > y = True
    | otherwise = False
firstBigger _ = False

-- Recursive list patterns
sum' :: Num a => [a] -> a
sum' [] = 0
sum' (x:xs) = x + sum' xs

-- Multiple element patterns
take' :: Int -> [a] -> [a]
take' n _
    | n <= 0 = []
take' _ [] = []
take' n (x:xs) = x : take' (n-1) xs
```

### Exhaustive Patterns

```haskell
-- ✅ Exhaustive - covers all cases
bool2Int :: Bool -> Int
bool2Int True = 1
bool2Int False = 0

-- ❌ Non-exhaustive - compiler warning!
bool2Int' :: Bool -> Int
bool2Int' True = 1
-- What about False?

-- ✅ Use catch-all pattern
safeDiv :: Int -> Int -> Maybe Int
safeDiv _ 0 = Nothing
safeDiv x y = Just (x `div` y)

-- ✅ Handle all list cases
head' :: [a] -> Maybe a
head' [] = Nothing
head' (x:_) = Just x
```

### Complex Pattern Matching

```haskell
-- Nested list patterns
sumPairs :: [(Int, Int)] -> Int
sumPairs [] = 0
sumPairs ((x,y):rest) = x + y + sumPairs rest

-- Multiple patterns with guards
describe :: [Int] -> String
describe [] = "Empty"
describe [x]
    | x < 0 = "Single negative"
    | x == 0 = "Single zero"
    | otherwise = "Single positive"
describe (x:y:_)
    | x > y = "First is bigger"
    | x < y = "Second is bigger"
    | otherwise = "First two are equal"

-- Pattern match on results
quickSort :: Ord a => [a] -> [a]
quickSort [] = []
quickSort (x:xs) =
    let smallerSorted = quickSort [a | a <- xs, a <= x]
        biggerSorted = quickSort [a | a <- xs, a > x]
    in smallerSorted ++ [x] ++ biggerSorted
```

## Your Tasks

### Task 1: Basic Patterns
Create `pattern_basic.hs` with:
- `isZero :: Int -> Bool` - pattern match on 0
- `isOne :: Int -> Bool` - pattern match on 1
- `firstDigit :: Int -> String` - pattern match 0-9, else "Not a digit"

### Task 2: List Patterns
Create `pattern_lists.hs` with:
- `null' :: [a] -> Bool` - check if empty
- `head' :: [a] -> a` - get first element
- `tail' :: [a] -> [a]` - get all but first
- `length' :: [a] -> Int` - calculate length recursively

### Task 3: Tuple Patterns
Create `pattern_tuples.hs` with:
- `addPair :: (Int, Int) -> Int`
- `first3 :: (a, b, c) -> a`
- `swap :: (a, b) -> (b, a)`
- `vectorSum :: (Int, Int) -> (Int, Int) -> (Int, Int)`

### Task 4: Wildcard Patterns
Create `pattern_wildcard.hs` with:
- `secondElem :: [a] -> a` - get second element, ignore rest
- `thirdElem :: [a] -> a` - get third element
- `ignoreFirst :: (a, b, c) -> (b, c)` - ignore first in triple

### Task 5: As-Patterns
Create `pattern_as.hs` with:
- `duplicateFirst :: [a] -> [a]` - duplicate first element
- `showFirst :: Show a => [a] -> String` - show first and whole list
- Test with various lists

### Task 6: Factorial
Create `pattern_factorial.hs` with:
- `factorial :: Int -> Int` using pattern matching
- Pattern for 0 → 1
- Pattern for n → n * factorial (n-1)
- Test with 0, 1, 5, 10

### Task 7: Fibonacci
Create `pattern_fibonacci.hs` with:
- `fib :: Int -> Int`
- Pattern for 0 → 0
- Pattern for 1 → 1
- Pattern for n → fib(n-1) + fib(n-2)
- Calculate first 10 Fibonacci numbers

### Task 8: List Operations
Create `pattern_list_ops.hs` with:
- `take' :: Int -> [a] -> [a]`
- `drop' :: Int -> [a] -> [a]`
- `zip' :: [a] -> [b] -> [(a, b)]`
- All using pattern matching

### Task 9: Custom Describe
Create `pattern_describe.hs` with:
- `describeList :: [a] -> String`
- Pattern for [] → "Empty"
- Pattern for [_] → "One element"
- Pattern for [_,_] → "Two elements"
- Pattern for (_:_:_:_) → "Many elements"

### Task 10: Sum Pairs
Create `pattern_pairs.hs` with:
- `sumPairs :: [(Int, Int)] -> [Int]`
- Takes list of pairs, returns list of sums
- Example: [(1,2), (3,4)] → [3, 7]
- Use pattern matching on list of tuples

### Task 11: Guards with Patterns
Create `pattern_guards.hs` with:
- `bmiCategory :: Double -> Double -> String`
- Pattern match parameters
- Use guards for BMI ranges
- Test with different weights/heights

### Task 12: QuickSort
Create `pattern_quicksort.hs`:
- Implement quicksort using pattern matching
- Pattern for [] → []
- Pattern for (pivot:rest) → sort smaller ++ [pivot] ++ sort bigger
- Test with [5,2,8,1,9,3]

## Expected Output Examples

**Task 6:**
```
factorial 0 = 1
factorial 1 = 1
factorial 5 = 120
factorial 10 = 3628800
```

**Task 7:**
```
Fibonacci numbers:
fib 0 = 0
fib 1 = 1
fib 2 = 1
fib 3 = 2
fib 4 = 3
fib 5 = 5
fib 6 = 8
fib 7 = 13
fib 8 = 21
fib 9 = 34
```

**Task 9:**
```
describeList [] = "Empty"
describeList [1] = "One element"
describeList [1,2] = "Two elements"
describeList [1,2,3,4,5] = "Many elements"
```

**Task 12:**
```
Unsorted: [5,2,8,1,9,3]
Sorted: [1,2,3,5,8,9]
```

## Tips
- **Patterns are checked top-to-bottom** - order matters!
- Use **wildcard (_)** for values you don't need
- **As-patterns (@)** keep both whole and parts
- Always **handle all cases** to avoid runtime errors
- **Pattern matching on lists** is fundamental
- Use **guards** with patterns for conditions
- Compiler warns about non-exhaustive patterns
- Pattern matching is more readable than conditionals

## Common Mistakes

```haskell
-- ❌ Non-exhaustive patterns
head' (x:_) = x
-- What about empty list? Runtime error!

-- ✅ Handle all cases
head' [] = error "Empty list"
head' (x:_) = x

-- ❌ Wrong order
classify x = "Other"
classify 0 = "Zero"
-- First pattern always matches!

-- ✅ Specific patterns first
classify 0 = "Zero"
classify x = "Other"

-- ❌ Overlapping patterns
check [] = "Empty"
check xs = "Not empty"
check [x] = "One"  -- Never reached!

-- ✅ Correct order
check [] = "Empty"
check [x] = "One"
check xs = "Multiple"

-- ❌ Forgetting parentheses
head x:xs = x  -- Wrong! Parses as (head x):xs

-- ✅ Use parentheses
head (x:xs) = x

-- ❌ Too specific pattern
sum [x,y,z] = x + y + z
-- Only works for 3-element lists!

-- ✅ General recursive pattern
sum [] = 0
sum (x:xs) = x + sum xs
```

## Pattern Matching Summary

| Pattern | Example | Matches |
|---------|---------|---------|
| **Literal** | `7` | Exact value 7 |
| **Variable** | `x` | Any value (binds to x) |
| **Wildcard** | `_` | Any value (ignored) |
| **Cons** | `(x:xs)` | Non-empty list |
| **List** | `[x,y,z]` | Exactly 3 elements |
| **Tuple** | `(x,y)` | Pair |
| **As-pattern** | `all@(x:xs)` | Whole and parts |

## Key Concepts
- **Pattern Matching**: Check and deconstruct values
- **Exhaustive**: Covering all possible cases
- **Wildcard (_)**: Ignore unneeded values
- **As-pattern (@)**: Keep whole and parts
- **Cons (:)**: List constructor pattern
- **Order Matters**: First match wins
- **Guards**: Conditions with patterns
- **Non-exhaustive**: Missing cases (compiler warning)

## Next Steps
Move on to `07-Guards-Where` to learn more about conditional logic and local bindings!
