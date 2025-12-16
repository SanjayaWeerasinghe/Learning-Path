# List Comprehensions

## What You'll Learn
- List comprehension syntax
- Generators and predicates
- Multiple generators
- Pattern matching in comprehensions
- String comprehensions
- Nested comprehensions
- Infinite lists with comprehensions

## Concept Overview

List comprehensions provide a concise, mathematical notation for creating lists. They're similar to set notation in mathematics.

### Basic Syntax

```haskell
-- Mathematical notation: {x² | x ∈ {1..10}}
-- Haskell:

ghci> [x^2 | x <- [1..10]]
[1,4,9,16,25,36,49,64,81,100]

-- With predicate (filter)
ghci> [x^2 | x <- [1..10], x `mod` 2 == 0]
[4,16,36,64,100]

-- Multiple predicates
ghci> [x | x <- [1..20], x `mod` 2 == 0, x > 10]
[12,14,16,18,20]
```

### Multiple Generators

```haskell
-- Cartesian product
ghci> [(x,y) | x <- [1,2,3], y <- ['a','b']]
[(1,'a'),(1,'b'),(2,'a'),(2,'b'),(3,'a'),(3,'b')]

-- All combinations
ghci> [x+y | x <- [1,2,3], y <- [10,100]]
[11,101,12,102,13,103]
```

### Practical Examples

```haskell
-- Length function
length' xs = sum [1 | _ <- xs]

-- Remove non-uppercase
removeNonUppercase st = [c | c <- st, c `elem` ['A'..'Z']]

-- Pythagorean triples
pythTriples = [(a,b,c) | c <- [1..20],
                         b <- [1..c],
                         a <- [1..b],
                         a^2 + b^2 == c^2]

-- QuickSort
quicksort :: Ord a => [a] -> [a]
quicksort [] = []
quicksort (x:xs) =
    quicksort [a | a <- xs, a <= x]
    ++ [x] ++
    quicksort [a | a <- xs, a > x]
```

## Your Tasks

### Task 1: Basic Comprehensions
- Squares of [1..20]
- Even numbers from [1..50]
- Multiples of 7 from [1..100]

### Task 2: With Predicates
- Numbers divisible by both 3 and 5
- Vowels from a string
- Positive numbers from mixed list

### Task 3: Multiple Generators
- All (x,y) pairs where x*y > 50
- Chess board coordinates [(row, col)]

### Task 4: String Processing
- Convert to uppercase
- Remove spaces
- Count vowels

### Task 5: Pythagorean Triples
- Find all triples where a²+b²=c²
- Limit to perimeter <= 100

### Task 6: Nested Comprehensions
- Flatten 2D list
- Matrix operations

### Task 7: QuickSort
- Implement quicksort using comprehensions

### Task 8: Prime Numbers
- Generate primes using comprehensions
- Use trial division

### Task 9: Infinite Lists
- All even numbers [2,4..]
- Fibonacci using comprehension

### Task 10: Complex Filtering
- Students with grade > 80
- Products with price in range

## Expected Output

**Task 5:**
```
Pythagorean triples (perimeter <= 100):
[(3,4,5),(5,12,13),(6,8,10),(7,24,25),...]
```

## Next Steps
Congratulations on completing Basics! Move to `02-Intermediate` to learn about custom types, type classes, and monads!
