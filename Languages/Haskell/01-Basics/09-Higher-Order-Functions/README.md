# Higher-Order Functions

## What You'll Learn
- What higher-order functions are
- Functions as parameters
- Functions as return values
- map, filter, and fold
- Function composition
- Currying and partial application
- Lambda functions
- Common higher-order patterns

## Concept Overview

Higher-order functions are functions that either take functions as parameters or return functions as results. They're fundamental to functional programming and enable powerful abstractions.

### Map - Transform Every Element

```haskell
-- map applies a function to every element
map :: (a -> b) -> [a] -> [b]

ghci> map (*2) [1,2,3,4,5]
[2,4,6,8,10]

ghci> map (++ "!") ["Hello", "World"]
["Hello!","World!"]

ghci> map length ["hi", "hello", "hey"]
[2,5,3]

-- Custom implementation
map' :: (a -> b) -> [a] -> [b]
map' _ [] = []
map' f (x:xs) = f x : map' f xs
```

### Filter - Keep Elements Matching Condition

```haskell
-- filter keeps elements where predicate is True
filter :: (a -> Bool) -> [a] -> [a]

ghci> filter even [1..10]
[2,4,6,8,10]

ghci> filter (>5) [1..10]
[6,7,8,9,10]

ghci> filter (/= ' ') "hello world"
"helloworld"

-- Custom implementation
filter' :: (a -> Bool) -> [a] -> [a]
filter' _ [] = []
filter' p (x:xs)
    | p x       = x : filter' p xs
    | otherwise = filter' p xs
```

### Fold - Reduce List to Single Value

```haskell
-- foldr - fold from the right
foldr :: (a -> b -> b) -> b -> [a] -> b

ghci> foldr (+) 0 [1,2,3,4,5]
15

ghci> foldr (*) 1 [1,2,3,4,5]
120

ghci> foldr (:) [] [1,2,3]
[1,2,3]

-- foldl - fold from the left
foldl :: (b -> a -> b) -> b -> [a] -> b

ghci> foldl (+) 0 [1,2,3,4,5]
15

ghci> foldl (flip (:)) [] [1,2,3]
[3,2,1]
```

### Lambda Functions

```haskell
-- Anonymous functions with \

ghci> map (\x -> x * 2) [1..5]
[2,4,6,8,10]

ghci> filter (\x -> x > 5) [1..10]
[6,7,8,9,10]

-- Multiple parameters
ghci> zipWith (\x y -> x + y) [1,2,3] [4,5,6]
[5,7,9]

-- Pattern matching in lambdas
ghci> map (\(x,y) -> x + y) [(1,2), (3,4), (5,6)]
[3,7,11]
```

### Currying and Partial Application

```haskell
-- All functions are curried by default
add :: Int -> Int -> Int
add x y = x + y

-- Same as:
add :: Int -> (Int -> Int)

-- Partial application
add5 :: Int -> Int
add5 = add 5

ghci> add5 10
15

-- Sections
ghci> map (*2) [1..5]
[2,4,6,8,10]

ghci> filter (>3) [1..10]
[4,5,6,7,8,9,10]
```

### Function Composition

```haskell
-- (.) composes functions
(.) :: (b -> c) -> (a -> b) -> (a -> c)

-- Without composition
negateAbsOld x = negate (abs x)

-- With composition
negateAbs = negate . abs

ghci> negateAbs (-5)
-5

-- Multiple composition
sumSquares = sum . map (^2)
ghci> sumSquares [1,2,3,4]
30
```

## Your Tasks

### Task 1: Map Practice
Create `hof_map.hs` with:
- Double all numbers in list
- Convert strings to uppercase (map toUpper)
- Square all numbers
- Get lengths of all strings

### Task 2: Filter Practice
Create `hof_filter.hs` with:
- Get all even numbers from [1..100]
- Get all positive numbers
- Filter strings longer than 5 characters
- Get all vowels from a string

### Task 3: Fold Practice
Create `hof_fold.hs` with:
- Sum using foldr
- Product using foldl
- Concatenate strings using foldr
- Find maximum using foldr

### Task 4: Lambda Functions
Create `hof_lambda.hs` with:
- Map with lambda to add 10
- Filter with lambda for odd numbers
- ZipWith with lambda for multiplication
- Sort with custom lambda comparator

### Task 5: Function Composition
Create `hof_compose.hs` with:
- Compose: negate . (* 3) . (+ 2)
- Compose: sum . map (^2) . filter even
- Test composed functions

### Task 6: Partial Application
Create `hof_partial.hs` with:
- Create functions using partial application
- multiplyBy10, add100, etc.
- Test them

### Task 7: Custom Map/Filter/Fold
Create `hof_custom.hs`:
- Implement your own map, filter, foldr
- Test with various functions

### Task 8: takeWhile and dropWhile
Create `hof_while.hs` with:
- Use takeWhile (<10) on [1..]
- Use dropWhile (<5) on [1..20]
- Combine both

### Task 9: All and Any
Create `hof_all_any.hs`:
- Check if all elements > 0
- Check if any element even
- Implement custom all' and any'

### Task 10: ZipWith
Create `hof_zipwith.hs`:
- Add corresponding elements
- Multiply corresponding elements
- Find max of corresponding elements

### Task 11: Complex Pipeline
Create `hof_pipeline.hs`:
- Get sum of squares of odd numbers from [1..100]
- Use filter, map, and fold
- Also use composition

### Task 12: Real-World Example
Create `hof_realworld.hs`:
- Process list of (name, age, salary) tuples
- Filter by age > 30
- Map to get just names
- Calculate average salary

## Expected Output Examples

**Task 1:**
```
Doubled: [2,4,6,8,10]
Squares: [1,4,9,16,25]
```

**Task 11:**
```
Sum of squares of odd numbers 1-100: 166650
```

## Next Steps
Move on to `10-List-Comprehensions` for elegant list generation!
