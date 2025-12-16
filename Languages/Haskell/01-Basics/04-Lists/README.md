# Lists in Haskell

## What You'll Learn
- Creating and using lists
- List syntax and operators
- Common list functions
- List ranges
- Infinite lists
- String as lists of characters

## Concept Overview

Lists are the most fundamental data structure in Haskell. A list is a homogeneous collection - all elements must be the same type.

### Creating Lists

```haskell
-- Empty list
empty :: [Int]
empty = []

-- List of integers
numbers :: [Int]
numbers = [1, 2, 3, 4, 5]

-- List of strings
names :: [String]
names = ["Alice", "Bob", "Charlie"]

-- List of booleans
flags :: [Bool]
flags = [True, False, True]

-- Strings are lists of characters!
message :: String
message = "Hello"  -- Same as ['H', 'e', 'l', 'l', 'o']

-- Check in GHCi:
ghci> :type "Hello"
"Hello" :: String
ghci> :type ['H', 'e', 'l', 'l', 'o']
['H', 'e', 'l', 'l', 'o'] :: [Char]
```

### The Cons Operator (:)

```haskell
-- : is the "cons" operator - adds element to front of list
-- Read as "cons"

ghci> 1 : [2, 3, 4]
[1,2,3,4]

ghci> 'H' : "ello"
"Hello"

-- All lists are built with cons!
-- [1, 2, 3] is syntactic sugar for:
-- 1 : 2 : 3 : []

-- Building a list from scratch
list1 = 1 : 2 : 3 : []  -- [1,2,3]
list2 = 'a' : 'b' : 'c' : []  -- "abc"
```

### List Concatenation (++)

```haskell
-- ++ concatenates two lists

ghci> [1, 2, 3] ++ [4, 5, 6]
[1,2,3,4,5,6]

ghci> "Hello" ++ " " ++ "World"
"Hello World"

ghci> ['a', 'b'] ++ ['c', 'd']
"abcd"

-- Note: ++ walks through the whole first list
-- : is O(1), ++ is O(n)
```

### Accessing List Elements

```haskell
-- !! operator - get element by index (0-based)

ghci> [10, 20, 30, 40] !! 0
10

ghci> [10, 20, 30, 40] !! 2
30

ghci> "Hello" !! 1
'e'

-- head - first element
ghci> head [1, 2, 3, 4]
1

-- tail - everything except first
ghci> tail [1, 2, 3, 4]
[2,3,4]

-- last - last element
ghci> last [1, 2, 3, 4]
4

-- init - everything except last
ghci> init [1, 2, 3, 4]
[1,2,3]

-- ⚠️ These functions crash on empty lists!
ghci> head []
*** Exception: Prelude.head: empty list
```

### List Properties

```haskell
-- length - number of elements
ghci> length [1, 2, 3, 4, 5]
5

-- null - check if empty
ghci> null []
True
ghci> null [1, 2, 3]
False

-- reverse - reverse a list
ghci> reverse [1, 2, 3, 4, 5]
[5,4,3,2,1]

-- elem - check if element is in list
ghci> elem 3 [1, 2, 3, 4, 5]
True
ghci> elem 10 [1, 2, 3, 4, 5]
False

-- Also works as infix operator
ghci> 3 `elem` [1, 2, 3, 4, 5]
True
```

### List Ranges

```haskell
-- Simple range
ghci> [1..10]
[1,2,3,4,5,6,7,8,9,10]

-- With step
ghci> [2,4..20]
[2,4,6,8,10,12,14,16,18,20]

-- Backwards
ghci> [10,9..1]
[10,9,8,7,6,5,4,3,2,1]

-- Characters
ghci> ['a'..'z']
"abcdefghijklmnopqrstuvwxyz"

-- Infinite lists (lazy evaluation!)
ghci> [1..]  -- Infinite list of naturals
[1,2,3,4,5,6,7,8,9,10,11,12... (keeps going!)

-- Use take to get finite portion
ghci> take 10 [1..]
[1,2,3,4,5,6,7,8,9,10]

-- Cycle - repeat a list infinitely
ghci> take 10 (cycle [1, 2, 3])
[1,2,3,1,2,3,1,2,3,1]

-- Repeat - repeat a single element
ghci> take 5 (repeat 7)
[7,7,7,7,7]

-- Replicate - simpler way to repeat
ghci> replicate 5 7
[7,7,7,7,7]
```

### Common List Functions

```haskell
-- take - take first n elements
take :: Int -> [a] -> [a]
ghci> take 3 [1..10]
[1,2,3]

-- drop - drop first n elements
drop :: Int -> [a] -> [a]
ghci> drop 3 [1..10]
[4,5,6,7,8,9,10]

-- splitAt - split at index
splitAt :: Int -> [a] -> ([a], [a])
ghci> splitAt 3 [1..10]
([1,2,3],[4,5,6,7,8,9,10])

-- takeWhile - take while predicate is true
takeWhile :: (a -> Bool) -> [a] -> [a]
ghci> takeWhile (< 5) [1..10]
[1,2,3,4]

-- dropWhile - drop while predicate is true
dropWhile :: (a -> Bool) -> [a] -> [a]
ghci> dropWhile (< 5) [1..10]
[5,6,7,8,9,10]

-- sum - sum of all elements
ghci> sum [1..10]
55

-- product - product of all elements
ghci> product [1..5]
120

-- maximum - largest element
ghci> maximum [3, 7, 2, 9, 1]
9

-- minimum - smallest element
ghci> minimum [3, 7, 2, 9, 1]
1

-- zip - combine two lists into pairs
zip :: [a] -> [b] -> [(a, b)]
ghci> zip [1, 2, 3] ['a', 'b', 'c']
[(1,'a'),(2,'b'),(3,'c')]

-- unzip - opposite of zip
ghci> unzip [(1,'a'),(2,'b'),(3,'c')]
([1,2,3],"abc")
```

### List Comparison

```haskell
-- Lists compared lexicographically
ghci> [1, 2, 3] < [1, 2, 4]
True

ghci> [3, 2, 1] > [2, 10, 100]
True  -- 3 > 2, so True regardless of other elements

ghci> [1, 2, 3] == [1, 2, 3]
True

ghci> "abc" < "abd"
True
```

## Your Tasks

### Task 1: Basic List Operations
Create `lists_basic.hs` that:
- Defines a list of numbers [1..10]
- Prints the head, tail, last, and init
- Prints the length
- Checks if 5 is an element

### Task 2: List Construction
Create `lists_cons.hs` that:
- Builds [1,2,3,4,5] using only : and []
- Builds "Haskell" using only : and []
- Concatenates [1,2,3] and [4,5,6]
- Prepends 0 to [1,2,3,4,5]

### Task 3: List Ranges
Create `lists_ranges.hs` that:
- Creates list of even numbers from 2 to 20
- Creates list of multiples of 5 from 5 to 50
- Creates alphabet (a-z)
- Takes first 20 odd numbers (from infinite list)
- Takes first 10 multiples of 7

### Task 4: List Functions
Create `lists_functions.hs` that:
- Takes first 5 elements of [1..100]
- Drops first 10 elements of [1..20]
- Splits [1..10] at index 5
- Reverses [1,2,3,4,5]
- Replicates "Ha" 5 times

### Task 5: Mathematical Lists
Create `lists_math.hs` that:
- Calculates sum of [1..100]
- Calculates product of [1..10]
- Finds maximum of [34, 12, 78, 23, 90, 45]
- Finds minimum of same list
- Calculates average of [10, 20, 30, 40, 50]

### Task 6: List Predicates
Create `lists_predicates.hs` that:
- Takes numbers from [1..100] while they're less than 20
- Drops numbers from [1..20] while they're less than 15
- Filters all numbers less than 50 from [1..100] (use takeWhile)

### Task 7: Zip Operations
Create `lists_zip.hs` that:
- Zips [1..5] with ['a'..'e']
- Zips [1..10] with [10,9..1] (countdown)
- Creates pairs of numbers and their squares: [(1,1),(2,4),(3,9)...]
- Unzips [(1,'a'), (2,'b'), (3,'c')]

### Task 8: String Manipulation
Remember: Strings are lists of Char!
Create `lists_strings.hs` that:
- Gets first character of "Haskell"
- Gets all except first character
- Reverses "Hello"
- Checks if 'a' is in "Haskell"
- Concatenates "Func" ++ "tion" ++ "al"

### Task 9: Infinite Lists
Create `lists_infinite.hs` that:
- Takes first 10 natural numbers
- Takes first 15 even numbers (from [2,4..])
- Creates list of 10 identical elements using repeat
- Takes first 8 elements from cycle [1,2,3]
- Takes first 20 multiples of 13

### Task 10: List Comparison
Create `lists_compare.hs` that:
- Compares [1,2,3] with [1,2,4]
- Compares "apple" with "banana"
- Checks if [1,2,3] equals [1,2,3]
- Finds which is greater: [3,2,1] or [2,10,100]

### Task 11: Nested Lists
Create `lists_nested.hs` that:
- Creates a list of lists: [[1,2], [3,4,5], [6,7,8,9]]
- Accesses first sublist
- Accesses second element of third sublist
- Concatenates all sublists into one list (manually)

### Task 12: Custom List Functions
Create `lists_custom.hs` that defines:
- `listLength :: [a] -> Int` - calculates length manually (use recursion)
- `listSum :: [Int] -> Int` - sums elements manually
- `listReverse :: [a] -> [a]` - reverses manually (challenge!)
- Test all functions with examples

## Expected Output Examples

**Task 1:**
```
List: [1,2,3,4,5,6,7,8,9,10]
Head: 1
Tail: [2,3,4,5,6,7,8,9,10]
Last: 10
Init: [1,2,3,4,5,6,7,8,9]
Length: 10
Contains 5: True
```

**Task 5:**
```
Sum of 1 to 100: 5050
Product of 1 to 10: 3628800
Maximum: 90
Minimum: 12
Average: 30.0
```

**Task 7:**
```
Zipped: [(1,'a'),(2,'b'),(3,'c'),(4,'d'),(5,'e')]
Countdown pairs: [(1,10),(2,9),(3,8),(4,7),(5,6),(6,5),(7,4),(8,3),(9,2),(10,1)]
Squares: [(1,1),(2,4),(3,9),(4,16),(5,25)]
Unzipped: ([1,2,3],"abc")
```

## Tips
- Lists are **homogeneous** - all elements same type
- `:` (cons) adds to front - O(1)
- `++` concatenates - O(n) where n is length of first list
- Strings are just `[Char]`
- Use `null` to check empty, not `== []`
- Haskell is **lazy** - infinite lists work!
- `head`, `tail`, etc. crash on empty lists - be careful
- Use `take` with infinite lists to get finite portion

## Common Mistakes

```haskell
-- ❌ Mixing types in list
list = [1, "two", True]  -- Error! All elements must be same type

-- ✅ All same type
list = [1, 2, 3]

-- ❌ Using head on empty list
head []  -- Runtime error!

-- ✅ Check if empty first
if null myList then "Empty" else show (head myList)

-- ❌ Confusing : and ++
[1, 2] : [3, 4]  -- Error! : adds element, not list

-- ✅ Use : for elements, ++ for lists
1 : [2, 3, 4]    -- OK: prepend element
[1, 2] ++ [3, 4]  -- OK: concatenate lists

-- ❌ Forgetting take with infinite lists
[1..]  -- This will print forever!

-- ✅ Use take
take 10 [1..]  -- Gets first 10

-- ❌ Wrong range syntax
[1..10..2]  -- Error!

-- ✅ Correct range with step
[1,3..10]  -- [1,3,5,7,9]
```

## Key Concepts
- **List**: Homogeneous collection of elements
- **Cons (:)**: Prepend element to list
- **Concatenation (++)**: Join two lists
- **Head**: First element
- **Tail**: All except first
- **Lazy Evaluation**: Values computed only when needed
- **Infinite Lists**: Lists with no end (possible due to laziness)
- **Ranges**: Convenient syntax for generating lists

## List Operations Summary

| Function | Type | Description |
|----------|------|-------------|
| `head` | `[a] -> a` | First element |
| `tail` | `[a] -> [a]` | All except first |
| `last` | `[a] -> a` | Last element |
| `init` | `[a] -> [a]` | All except last |
| `length` | `[a] -> Int` | Number of elements |
| `null` | `[a] -> Bool` | Check if empty |
| `reverse` | `[a] -> [a]` | Reverse list |
| `take` | `Int -> [a] -> [a]` | Take first n |
| `drop` | `Int -> [a] -> [a]` | Drop first n |
| `maximum` | `[a] -> a` | Largest element |
| `minimum` | `[a] -> a` | Smallest element |
| `sum` | `[Int] -> Int` | Sum elements |
| `product` | `[Int] -> Int` | Product of elements |
| `elem` | `a -> [a] -> Bool` | Check membership |

## Next Steps
Move on to `05-Tuples` to learn about fixed-size heterogeneous collections, then `06-Pattern-Matching` to elegantly deconstruct lists!
