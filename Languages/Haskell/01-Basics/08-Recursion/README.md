# Recursion

## What You'll Learn
- What recursion is and why it's important in Haskell
- Base cases and recursive cases
- Recursion on lists
- Recursion on numbers
- Tail recursion and accumulators
- Multiple recursion
- Mutual recursion
- Thinking recursively

## Concept Overview

Recursion is the primary way to loop in Haskell. A recursive function calls itself with different arguments until it reaches a base case.

### Basic Recursion Pattern

```haskell
-- Every recursive function needs:
-- 1. Base case(s) - when to stop
-- 2. Recursive case(s) - how to continue

factorial :: Int -> Int
factorial 0 = 1                    -- Base case
factorial n = n * factorial (n-1)  -- Recursive case

-- Examples:
ghci> factorial 5
120  -- 5 * 4 * 3 * 2 * 1

-- How it works:
-- factorial 5
-- = 5 * factorial 4
-- = 5 * (4 * factorial 3)
-- = 5 * (4 * (3 * factorial 2))
-- = 5 * (4 * (3 * (2 * factorial 1)))
-- = 5 * (4 * (3 * (2 * (1 * factorial 0))))
-- = 5 * (4 * (3 * (2 * (1 * 1))))
-- = 120
```

### List Recursion

```haskell
-- Sum of list
sum' :: Num a => [a] -> a
sum' [] = 0                  -- Base case: empty list
sum' (x:xs) = x + sum' xs    -- Recursive case

-- Examples:
-- sum' [1,2,3]
-- = 1 + sum' [2,3]
-- = 1 + (2 + sum' [3])
-- = 1 + (2 + (3 + sum' []))
-- = 1 + (2 + (3 + 0))
-- = 6

-- Length of list
length' :: [a] -> Int
length' [] = 0
length' (_:xs) = 1 + length' xs

-- Reverse a list
reverse' :: [a] -> [a]
reverse' [] = []
reverse' (x:xs) = reverse' xs ++ [x]

-- Maximum element
maximum' :: Ord a => [a] -> a
maximum' [] = error "Empty list"
maximum' [x] = x  -- Base case: single element
maximum' (x:xs) = max x (maximum' xs)
```

### Number Recursion

```haskell
-- Power function
power :: Int -> Int -> Int
power _ 0 = 1              -- Base case: x^0 = 1
power x n = x * power x (n-1)

-- Fibonacci
fibonacci :: Int -> Int
fibonacci 0 = 0            -- Base case 1
fibonacci 1 = 1            -- Base case 2
fibonacci n = fibonacci (n-1) + fibonacci (n-2)

-- GCD (Greatest Common Divisor)
gcd' :: Int -> Int -> Int
gcd' a 0 = a               -- Base case
gcd' a b = gcd' b (a `mod` b)
```

### Recursion with Accumulator (Tail Recursion)

```haskell
-- Non-tail recursive sum (builds up stack)
sum' :: [Int] -> Int
sum' [] = 0
sum' (x:xs) = x + sum' xs

-- Tail recursive sum (more efficient)
sum'' :: [Int] -> Int
sum'' xs = sumHelper xs 0
    where sumHelper [] acc = acc
          sumHelper (x:xs) acc = sumHelper xs (acc + x)

-- Tail recursive factorial
factorial' :: Int -> Int
factorial' n = factHelper n 1
    where factHelper 0 acc = acc
          factHelper n acc = factHelper (n-1) (n * acc)

-- Tail recursive reverse
reverse'' :: [a] -> [a]
reverse'' xs = revHelper xs []
    where revHelper [] acc = acc
          revHelper (x:xs) acc = revHelper xs (x:acc)
```

### Multiple Recursion

```haskell
-- Fibonacci is multiple recursion (calls itself twice)
fib :: Int -> Int
fib 0 = 0
fib 1 = 1
fib n = fib (n-1) + fib (n-2)  -- Two recursive calls!

-- Tree-like recursion
-- Merge sort
mergeSort :: Ord a => [a] -> [a]
mergeSort [] = []
mergeSort [x] = [x]
mergeSort xs = merge (mergeSort left) (mergeSort right)
    where (left, right) = splitAt (length xs `div` 2) xs
          merge [] ys = ys
          merge xs [] = xs
          merge (x:xs) (y:ys)
              | x <= y    = x : merge xs (y:ys)
              | otherwise = y : merge (x:xs) ys
```

### Mutual Recursion

```haskell
-- Functions that call each other
isEven :: Int -> Bool
isEven 0 = True
isEven n = isOdd (n-1)

isOdd :: Int -> Bool
isOdd 0 = False
isOdd n = isEven (n-1)

-- Another example
countEven :: [Int] -> Int
countEven [] = 0
countEven (x:xs)
    | even x    = 1 + countOdd xs
    | otherwise = countOdd xs

countOdd :: [Int] -> Int
countOdd [] = 0
countOdd (x:xs)
    | odd x     = 1 + countEven xs
    | otherwise = countEven xs
```

### Thinking Recursively

```haskell
-- Pattern: Base case + Recursive case

-- 1. What's the simplest case? (base case)
-- 2. How do we break problem into smaller parts?
-- 3. How do we combine results?

-- Example: replicate
-- Replicate n x creates list of n copies of x
replicate' :: Int -> a -> [a]
replicate' 0 _ = []                    -- Base: 0 copies = empty list
replicate' n x = x : replicate' (n-1) x  -- Recursive: cons x to (n-1) copies

-- Example: take
-- Take n elements from list
take' :: Int -> [a] -> [a]
take' n _
    | n <= 0 = []                      -- Base: take 0 or less = empty
take' _ [] = []                         -- Base: empty list = empty
take' n (x:xs) = x : take' (n-1) xs    -- Recursive: cons x to (n-1) elements

-- Example: zip
-- Combine two lists into pairs
zip' :: [a] -> [b] -> [(a,b)]
zip' [] _ = []                          -- Base: first list empty
zip' _ [] = []                          -- Base: second list empty
zip' (x:xs) (y:ys) = (x,y) : zip' xs ys  -- Recursive: pair heads, recurse on tails
```

### Common Recursive Patterns

```haskell
-- Map pattern: transform each element
map' :: (a -> b) -> [a] -> [b]
map' _ [] = []
map' f (x:xs) = f x : map' f xs

-- Filter pattern: keep elements matching predicate
filter' :: (a -> Bool) -> [a] -> [a]
filter' _ [] = []
filter' p (x:xs)
    | p x       = x : filter' p xs
    | otherwise = filter' p xs

-- Fold pattern: reduce list to single value
foldr' :: (a -> b -> b) -> b -> [a] -> b
foldr' _ acc [] = acc
foldr' f acc (x:xs) = f x (foldr' f acc xs)
```

## Your Tasks

### Task 1: Basic Number Recursion
Create `recursion_numbers.hs` with:
- `factorial :: Int -> Int`
- `power :: Int -> Int -> Int` (x^n)
- `sumUpTo :: Int -> Int` (sum 1 to n)
- `productUpTo :: Int -> Int` (product 1 to n)

### Task 2: Fibonacci Sequence
Create `recursion_fibonacci.hs` with:
- `fib :: Int -> Int`
- Function to generate first n Fibonacci numbers
- Test with n=10

### Task 3: List Sum and Product
Create `recursion_list_basic.hs` with:
- `sum' :: Num a => [a] -> a`
- `product' :: Num a => [a] -> a`
- `length' :: [a] -> Int`
- `null' :: [a] -> Bool`

### Task 4: List Maximum and Minimum
Create `recursion_minmax.hs` with:
- `maximum' :: Ord a => [a] -> a`
- `minimum' :: Ord a => [a] -> a`
- Handle empty list with error message

### Task 5: List Operations
Create `recursion_list_ops.hs` with:
- `reverse' :: [a] -> [a]`
- `take' :: Int -> [a] -> [a]`
- `drop' :: Int -> [a] -> [a]`
- `replicate' :: Int -> a -> [a]`

### Task 6: List Search
Create `recursion_search.hs` with:
- `elem' :: Eq a => a -> [a] -> Bool`
- `indexOf :: Eq a => a -> [a] -> Int` (return -1 if not found)
- `count :: Eq a => a -> [a] -> Int` (count occurrences)

### Task 7: Tail Recursion
Create `recursion_tail.hs` with tail-recursive versions:
- `sum'' :: [Int] -> Int` with accumulator
- `factorial' :: Int -> Int` with accumulator
- `reverse'' :: [a] -> [a]` with accumulator
- Compare performance with non-tail versions

### Task 8: Merge and Split
Create `recursion_merge.hs` with:
- `merge :: Ord a => [a] -> [a] -> [a]` (merge two sorted lists)
- `split :: [a] -> ([a], [a])` (split into two halves)
- Test with sorted lists

### Task 9: QuickSort
Create `recursion_quicksort.hs`:
- Implement quicksort recursively
- Use pattern matching and list comprehensions
- Test with [5,2,8,1,9,3,7,4,6]

### Task 10: String Recursion
Create `recursion_strings.hs` with:
- `palindrome :: String -> Bool` (check if palindrome)
- `reverseWords :: String -> String`
- `countVowels :: String -> Int`

### Task 11: Mutual Recursion
Create `recursion_mutual.hs` with:
- `isEven :: Int -> Bool` and `isOdd :: Int -> Bool` (using mutual recursion)
- Test with various numbers

### Task 12: Tree Recursion
Create `recursion_tree.hs` with:
- `sumDigits :: Int -> Int` (sum of digits)
- `countDigits :: Int -> Int` (number of digits)
- `reverseInt :: Int -> Int` (reverse digits)

## Expected Output Examples

**Task 1:**
```
factorial 5 = 120
power 2 10 = 1024
sumUpTo 100 = 5050
productUpTo 5 = 120
```

**Task 2:**
```
Fibonacci sequence (first 10):
[0,1,1,2,3,5,8,13,21,34]
```

**Task 6:**
```
elem' 5 [1..10] = True
indexOf 5 [1,2,3,4,5,6] = 4
count 'l' "hello" = 2
```

**Task 9:**
```
Unsorted: [5,2,8,1,9,3,7,4,6]
Sorted:   [1,2,3,4,5,6,7,8,9]
```

**Task 12:**
```
sumDigits 12345 = 15
countDigits 12345 = 5
reverseInt 12345 = 54321
```

## Tips
- **Always define base case(s)** - when to stop
- **Make sure recursive calls progress** toward base case
- **Tail recursion** is more efficient (uses constant stack space)
- Use **accumulators** for tail recursion
- Think of recursion as **pattern matching + induction**
- Lists naturally suit recursion: `[]` base, `(x:xs)` recursive
- **Trust the recursion** - assume recursive call works

## Common Mistakes

```haskell
-- ❌ Missing base case (infinite loop!)
factorial n = n * factorial (n-1)
-- Never stops!

-- ✅ Include base case
factorial 0 = 1
factorial n = n * factorial (n-1)

-- ❌ Not progressing toward base case
countdown n = countdown n  -- Infinite!

-- ✅ Progress toward base
countdown 0 = 0
countdown n = countdown (n-1)

-- ❌ Wrong base case
reverse' [x] = [x]  -- What about empty list?

-- ✅ Correct base case
reverse' [] = []
reverse' (x:xs) = reverse' xs ++ [x]

-- ❌ Inefficient recursion
fib n = fib (n-1) + fib (n-2)  -- Exponential time!

-- ✅ Use accumulator or memoization
-- (for beginners, just be aware it's slow)

-- ❌ Not handling empty list
sum' (x:xs) = x + sum' xs  -- Crash on []!

-- ✅ Handle empty list
sum' [] = 0
sum' (x:xs) = x + sum' xs
```

## Recursion vs Iteration

In imperative languages:
```python
# Python loop
def factorial(n):
    result = 1
    for i in range(1, n+1):
        result *= i
    return result
```

In Haskell:
```haskell
-- Haskell recursion
factorial :: Int -> Int
factorial 0 = 1
factorial n = n * factorial (n-1)

-- Or tail recursive
factorial' :: Int -> Int
factorial' n = go n 1
    where go 0 acc = acc
          go n acc = go (n-1) (n*acc)
```

## Key Concepts
- **Recursion**: Function calling itself
- **Base Case**: Condition to stop recursion
- **Recursive Case**: How to break problem down
- **Tail Recursion**: Recursive call is last operation
- **Accumulator**: Parameter to carry intermediate result
- **Multiple Recursion**: Multiple recursive calls
- **Mutual Recursion**: Functions calling each other
- **Induction**: Mathematical principle behind recursion

## Next Steps
Move on to `09-Higher-Order-Functions` to learn about functions that take functions as parameters!
