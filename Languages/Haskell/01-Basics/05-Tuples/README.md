# Tuples

## What You'll Learn
- What tuples are and when to use them
- Creating and using tuples
- Pair functions (fst, snd)
- Pattern matching with tuples
- Tuples vs Lists
- Nested tuples
- Using tuples in functions
- Zip and tuples

## Concept Overview

Tuples are fixed-size collections that can hold values of different types. Unlike lists, tuples are heterogeneous and have a fixed length known at compile time.

### Creating Tuples

```haskell
-- Pair (2-tuple)
pair :: (Int, String)
pair = (42, "answer")

-- Triple (3-tuple)
triple :: (Int, String, Bool)
triple = (1, "one", True)

-- Different types allowed
mixed :: (Int, Double, Char, String, Bool)
mixed = (42, 3.14, 'x', "hello", True)

-- Single element is not a tuple
notTuple = (5)  -- Just 5, not a tuple

-- Empty tuple (unit type)
unit :: ()
unit = ()
```

### Pair Functions

```haskell
-- fst - get first element (only for pairs!)
ghci> fst (8, 11)
8

ghci> fst ("first", "second")
"first"

-- snd - get second element (only for pairs!)
ghci> snd (8, 11)
11

ghci> snd ("first", "second")
"second"

-- These only work on 2-tuples!
ghci> fst (1, 2, 3)  -- Error! Not a pair

-- For larger tuples, use pattern matching
```

### Pattern Matching with Tuples

```haskell
-- Extract values from pairs
addPair :: (Int, Int) -> Int
addPair (x, y) = x + y

ghci> addPair (3, 5)
8

-- Extract from triples
first3 :: (a, b, c) -> a
first3 (x, _, _) = x

second3 :: (a, b, c) -> b
second3 (_, y, _) = y

third3 :: (a, b, c) -> c
third3 (_, _, z) = z

-- Pattern matching in let/where
describePair :: (Int, Int) -> String
describePair pair =
    let (x, y) = pair
    in "First: " ++ show x ++ ", Second: " ++ show y

-- More concise
describePair' :: (Int, Int) -> String
describePair' (x, y) = "First: " ++ show x ++ ", Second: " ++ show y
```

### Lists of Tuples

```haskell
-- List of pairs
points :: [(Int, Int)]
points = [(1, 2), (3, 4), (5, 6)]

-- List of person data
people :: [(String, Int, String)]
people = [("Alice", 25, "NYC"),
          ("Bob", 30, "LA"),
          ("Charlie", 35, "Chicago")]

-- Extract names
getNames :: [(String, Int, String)] -> [String]
getNames [] = []
getNames ((name, _, _):rest) = name : getNames rest

ghci> getNames people
["Alice","Bob","Charlie"]
```

### Tuples vs Lists

```haskell
-- Lists - homogeneous, variable length
numbers :: [Int]
numbers = [1, 2, 3, 4, 5]  -- Can be any length

-- Tuples - heterogeneous, fixed length
person :: (String, Int, Bool)
person = ("Alice", 25, True)  -- Always 3 elements

-- Can't do this with tuples:
-- tuple = (1, 2, 3)  -- 3-tuple
-- tuple = (1, 2)     -- Different type! 2-tuple

-- List of tuples - all same tuple type
pairs :: [(Int, String)]
pairs = [(1, "one"), (2, "two"), (3, "three")]

-- This won't work:
-- mixed = [(1, "one"), (2, "two", True)]  -- Different tuple sizes!
```

### Zip - Creating Tuples from Lists

```haskell
-- zip combines two lists into list of pairs
ghci> zip [1, 2, 3] ['a', 'b', 'c']
[(1,'a'),(2,'b'),(3,'c')]

-- Stops at shortest list
ghci> zip [1..10] ['a'..'d']
[(1,'a'),(2,'b'),(3,'c'),(4,'d')]

-- zip with different types
ghci> zip ["one", "two", "three"] [1, 2, 3]
[("one",1),("two",2),("three",3)]

-- zipWith - combine with function
ghci> zipWith (+) [1, 2, 3] [4, 5, 6]
[5,7,9]

ghci> zipWith max [1, 2, 3] [2, 1, 4]
[2,2,4]

-- zip3 - combine three lists
ghci> zip3 [1,2] ['a','b'] [True,False]
[(1,'a',True),(2,'b',False)]
```

### Practical Examples

```haskell
-- Distance between two points
distance :: (Double, Double) -> (Double, Double) -> Double
distance (x1, y1) (x2, y2) =
    sqrt ((x2 - x1)^2 + (y2 - y1)^2)

-- Circle - center and radius
type Point = (Double, Double)
type Circle = (Point, Double)

circleArea :: Circle -> Double
circleArea ((x, y), r) = pi * r ^ 2

-- Person record
type Name = String
type Age = Int
type Person = (Name, Age)

birthday :: Person -> Person
birthday (name, age) = (name, age + 1)

greet :: Person -> String
greet (name, age) = "Hello " ++ name ++ ", you are " ++ show age

-- Find in list of tuples
findAge :: Name -> [Person] -> Maybe Age
findAge _ [] = Nothing
findAge searchName ((name, age):rest)
    | name == searchName = Just age
    | otherwise = findAge searchName rest
```

### Nested Tuples

```haskell
-- Tuples can contain tuples
nested :: ((Int, Int), (Char, Char))
nested = ((1, 2), ('a', 'b'))

-- Accessing nested tuples
getFirstPair :: ((a, b), (c, d)) -> (a, b)
getFirstPair (pair, _) = pair

-- Complex nesting
complex :: (Int, (String, (Bool, Char)))
complex = (42, ("hello", (True, 'x')))

-- Extract deeply nested value
extractChar :: (Int, (String, (Bool, Char))) -> Char
extractChar (_, (_, (_, c))) = c
```

### Swapping and Transforming

```haskell
-- Swap pair elements
swap :: (a, b) -> (b, a)
swap (x, y) = (y, x)

ghci> swap (1, "one")
("one",1)

-- Duplicate value into pair
duplicate :: a -> (a, a)
duplicate x = (x, x)

ghci> duplicate 5
(5,5)

-- Apply functions to pair
mapPair :: (a -> b) -> (a, a) -> (b, b)
mapPair f (x, y) = (f x, f y)

ghci> mapPair (*2) (3, 5)
(6,10)
```

## Your Tasks

### Task 1: Basic Tuples
Create `tuples_basic.hs` with:
- A pair of (Int, String)
- A triple of (String, Int, Bool)
- A 5-tuple with different types
- Functions to extract first and second from pairs using fst/snd

### Task 2: Pattern Matching
Create `tuples_pattern.hs` with:
- `addPair :: (Int, Int) -> Int`
- `multiplyPair :: (Int, Int) -> Int`
- `first3 :: (a, b, c) -> a`
- `second3 :: (a, b, c) -> b`
- `third3 :: (a, b, c) -> c`

### Task 3: Tuple Functions
Create `tuples_functions.hs` with:
- `swap :: (a, b) -> (b, a)`
- `duplicate :: a -> (a, a)`
- `pairMax :: Ord a => (a, a) -> a`
- `pairMin :: Ord a => (a, a) -> a`

### Task 4: Lists of Tuples
Create `tuples_lists.hs` with:
- List of (name, age) pairs for 5 people
- Function to get all names
- Function to get all ages
- Function to find person by name

### Task 5: Zip Operations
Create `tuples_zip.hs` that:
- Zips [1..10] with [11..20]
- Zips names with ages
- Uses zipWith to add two lists
- Uses zipWith to find max of corresponding elements

### Task 6: Geometric Points
Create `tuples_geometry.hs` with:
- Type alias: `type Point = (Double, Double)`
- `distance :: Point -> Point -> Double`
- `midpoint :: Point -> Point -> Point`
- `translate :: Point -> Point -> Point` (move by offset)
- Test with example points

### Task 7: Person Records
Create `tuples_person.hs` with:
- `type Person = (String, Int, String)` (name, age, city)
- `getName :: Person -> String`
- `getAge :: Person -> Int`
- `getCity :: Person -> String`
- `birthday :: Person -> Person` (increment age)
- `relocate :: Person -> String -> Person` (change city)

### Task 8: Nested Tuples
Create `tuples_nested.hs` with:
- Type: `type Rectangle = (Point, Point)` where Point is (Double, Double)
- `rectangleArea :: Rectangle -> Double`
- `rectanglePerimeter :: Rectangle -> Double`
- Test with example rectangles

### Task 9: Tuple Transformations
Create `tuples_transform.hs` with:
- `mapBoth :: (a -> b) -> (a, a) -> (b, b)` - apply function to both
- `mapFirst :: (a -> c) -> (a, b) -> (c, b)`
- `mapSecond :: (b -> c) -> (a, b) -> (a, c)`
- Test with various functions

### Task 10: Word Frequency
Create `tuples_frequency.hs` that:
- Takes a list of words
- Returns list of (word, count) tuples
- Use zip to pair words with counts
- Example: ["hi","bye","hi"] → [("hi",2), ("bye",1)]

### Task 11: Grade Book
Create `tuples_grades.hs` with:
- Type: `type Student = (String, Int, Char)` (name, score, grade)
- Function to convert score to grade
- Function to create Student from name and score
- List of students
- Find highest scoring student

### Task 12: Complex Tuples
Create `tuples_complex.hs` with:
- Type: `type Circle = (Point, Double)` (center, radius)
- `circleArea :: Circle -> Double`
- `circleCircumference :: Circle -> Double`
- `pointInCircle :: Point -> Circle -> Bool`
- Test if point is inside circle

## Expected Output Examples

**Task 2:**
```
addPair (3, 5) = 8
multiplyPair (4, 6) = 24
first3 (1, 'a', True) = 1
second3 (1, 'a', True) = 'a'
third3 (1, 'a', True) = True
```

**Task 6:**
```
Distance between (0,0) and (3,4): 5.0
Midpoint of (0,0) and (6,8): (3.0,4.0)
Translate (1,2) by (3,4): (4.0,6.0)
```

**Task 11:**
```
Students:
Alice: 95 (A)
Bob: 82 (B)
Charlie: 71 (C)

Highest scoring: Alice with 95
```

**Task 12:**
```
Circle at (0,0) with radius 5:
Area: 78.54
Circumference: 31.42

Is point (3,4) inside? True
Is point (6,8) inside? False
```

## Tips
- Use **tuples** for fixed-size heterogeneous data
- Use **lists** for variable-size homogeneous data
- **fst** and **snd** only work on pairs
- Pattern matching is the main way to extract tuple values
- Type synonyms make tuple types more readable
- Tuples are compared lexicographically
- Use tuples to return multiple values from functions
- **zip** is very useful for pairing data

## Common Mistakes

```haskell
-- ❌ Using fst/snd on non-pairs
fst (1, 2, 3)  -- Error! fst only works on pairs

-- ✅ Use pattern matching
first3 (x, _, _) = x

-- ❌ Mixing tuple sizes in list
tuples = [(1, 2), (3, 4, 5)]  -- Error! Different tuple types

-- ✅ All same size
tuples = [(1, 2), (3, 4)]

-- ❌ Single element "tuple"
single = (5)  -- Not a tuple! Just 5 in parens

-- ✅ Pairs need two elements
pair = (5, 10)

-- ❌ Changing tuple size
person = ("Alice", 25)
person = ("Bob", 30, "NYC")  -- Error! Different type

-- ✅ Keep same structure
person1 = ("Alice", 25)
person2 = ("Bob", 30)

-- ❌ Forgetting to pattern match
addPair pair = pair + pair  -- Error!

-- ✅ Extract values first
addPair (x, y) = x + y
```

## Tuples vs Lists Comparison

| Feature | Lists | Tuples |
|---------|-------|--------|
| **Elements** | Same type | Can be different types |
| **Length** | Variable | Fixed |
| **Syntax** | `[1, 2, 3]` | `(1, "two", 3.0)` |
| **Type** | `[Int]` | `(Int, String, Double)` |
| **Access** | Pattern match, head, tail | Pattern match, fst, snd |
| **Use case** | Collections | Multiple return values |

## Common Tuple Patterns

```haskell
-- Return multiple values
divMod' :: Int -> Int -> (Int, Int)
divMod' x y = (x `div` y, x `mod` y)

-- Store related data
type Point = (Double, Double)
type Person = (String, Int)

-- Pair data from two sources
zip [1,2,3] ['a','b','c']
-- [(1,'a'),(2,'b'),(3,'c')]

-- Pattern match in function
distance (x1, y1) (x2, y2) = ...

-- Pattern match in let
let (x, y) = point in ...

-- Pattern match in list comprehension
[(x, y) | x <- [1..3], y <- ['a'..'c']]
```

## Key Concepts
- **Tuple**: Fixed-size heterogeneous collection
- **Pair**: 2-tuple, can use fst/snd
- **Triple**: 3-tuple
- **Pattern Matching**: Main way to extract tuple values
- **Zip**: Create tuples from multiple lists
- **Type Synonym**: Make tuple types more readable
- **Heterogeneous**: Different types allowed
- **Fixed Size**: Length known at compile time

## Next Steps
Move on to `06-Pattern-Matching` to learn more powerful ways to deconstruct data!
