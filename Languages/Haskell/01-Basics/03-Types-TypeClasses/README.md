# Types & Type Classes

## What You'll Learn
- Haskell's type system
- Basic types (Int, Integer, Float, Double, Bool, Char)
- Type inference
- Type signatures
- Type variables and polymorphism
- Common type classes (Eq, Ord, Show, Read, Enum, Bounded, Num)
- Type class constraints

## Concept Overview

Haskell has a strong, static type system. Every expression has a type, determined at compile time. The type system prevents many bugs and makes code safer.

### Basic Types

```haskell
-- Int - bounded integer (-2^63 to 2^63-1)
age :: Int
age = 25

-- Integer - unbounded integer (can be arbitrarily large)
factorial20 :: Integer
factorial20 = 2432902008176640000

-- Float - single precision floating point
pi' :: Float
pi' = 3.141592

-- Double - double precision floating point
e :: Double
e = 2.718281828459045

-- Bool - boolean
isReady :: Bool
isReady = True

-- Char - single character
initial :: Char
initial = 'A'

-- String - list of characters (type alias for [Char])
name :: String
name = "Alice"
-- Same as: name :: [Char]
```

### Type Inference

```haskell
-- Haskell can infer types automatically
x = 5           -- x :: Num a => a
y = 5.0         -- y :: Fractional a => a
z = "Hello"     -- z :: [Char] (or String)

-- But it's good practice to write type signatures
add :: Int -> Int -> Int
add x y = x + y

-- Check types in GHCi:
ghci> :type 5
5 :: Num a => a

ghci> :type "Hello"
"Hello" :: [Char]

ghci> :type True
True :: Bool

ghci> :type head
head :: [a] -> a
```

### Type Variables (Polymorphism)

```haskell
-- 'a' is a type variable - can be any type
head' :: [a] -> a
head' (x:_) = x

-- Works with any type:
ghci> head' [1,2,3]
1
ghci> head' "abc"
'a'
ghci> head' [True, False]
True

-- Multiple type variables
fst' :: (a, b) -> a
fst' (x, _) = x

snd' :: (a, b) -> b
snd' (_, y) = y

-- Generic functions work with many types
length' :: [a] -> Int
length' [] = 0
length' (_:xs) = 1 + length' xs
```

### Type Classes

Type classes are like interfaces - they define behavior that types can implement.

#### Eq - Equality Testing

```haskell
-- Eq type class provides == and /=
ghci> :type (==)
(==) :: Eq a => a -> a -> Bool

ghci> 5 == 5
True

ghci> "hello" == "world"
False

-- Functions with Eq constraint
elem' :: Eq a => a -> [a] -> Bool
elem' _ [] = False
elem' x (y:ys) = x == y || elem' x ys
```

#### Ord - Ordering

```haskell
-- Ord provides >, <, >=, <=, compare
ghci> :type (>)
(>) :: Ord a => a -> a -> Bool

ghci> 5 > 3
True

ghci> "abc" < "abd"
True

ghci> compare 5 3
GT  -- Ordering type: LT, EQ, or GT

-- Using Ord
maximum' :: Ord a => [a] -> a
maximum' [x] = x
maximum' (x:xs) = max x (maximum' xs)
```

#### Show - Convert to String

```haskell
-- Show provides the show function
ghci> :type show
show :: Show a => a -> String

ghci> show 123
"123"

ghci> show True
"True"

ghci> show [1,2,3]
"[1,2,3]"

-- Using Show
printValue :: Show a => a -> String
printValue x = "The value is: " ++ show x
```

#### Read - Parse from String

```haskell
-- Read is opposite of Show
ghci> :type read
read :: Read a => String -> a

ghci> read "5" :: Int
5

ghci> read "True" :: Bool
True

ghci> read "[1,2,3]" :: [Int]
[1,2,3]

-- Need type annotation because read is polymorphic
-- This is ambiguous:
ghci> read "5"
*** Exception: no parse

-- Must specify type:
ghci> read "5" :: Int
5
```

#### Enum - Sequential Types

```haskell
-- Enum provides succ, pred, and ranges
ghci> :type succ
succ :: Enum a => a -> a

ghci> succ 5
6

ghci> pred 'C'
'B'

ghci> [1..5]
[1,2,3,4,5]

ghci> ['a'..'e']
"abcde"

-- Days of week
data Day = Mon | Tue | Wed | Thu | Fri | Sat | Sun
    deriving (Enum, Show)

ghci> succ Mon
Tue
ghci> [Mon .. Fri]
[Mon,Tue,Wed,Thu,Fri]
```

#### Bounded - Upper/Lower Bounds

```haskell
-- Bounded provides minBound and maxBound
ghci> :type minBound
minBound :: Bounded a => a

ghci> minBound :: Int
-9223372036854775808

ghci> maxBound :: Int
9223372036854775807

ghci> minBound :: Bool
False

ghci> maxBound :: Bool
True

ghci> minBound :: Char
'\NUL'

ghci> maxBound :: Char
'\1114111'
```

#### Num - Numeric Types

```haskell
-- Num provides +, -, *, abs, signum, fromInteger
ghci> :type (+)
(+) :: Num a => a -> a -> a

-- Num is a superclass of Int, Integer, Float, Double
ghci> :type 5
5 :: Num a => a

-- Can be used as any numeric type
five_int :: Int
five_int = 5

five_double :: Double
five_double = 5
```

### Type Class Constraints

```haskell
-- Single constraint
equal :: Eq a => a -> a -> Bool
equal x y = x == y

-- Multiple constraints
showAndCompare :: (Show a, Ord a) => a -> a -> String
showAndCompare x y
    | x > y     = show x ++ " is greater"
    | x < y     = show x ++ " is smaller"
    | otherwise = show x ++ " is equal"

-- Constraint from type class hierarchy
-- Num requires Eq and Show
sumAndShow :: (Num a, Show a) => a -> a -> String
sumAndShow x y = "Sum is: " ++ show (x + y)
```

### Type Synonyms

```haskell
-- Type synonyms make code more readable
type String = [Char]
type Name = String
type PhoneNumber = String
type PhoneBook = [(Name, PhoneNumber)]

-- Using synonyms
inPhoneBook :: Name -> PhoneNumber -> PhoneBook -> Bool
inPhoneBook name number book = (name, number) `elem` book
```

### Common Type Signatures

```haskell
-- No arguments, returns value
value :: Int
value = 42

-- One argument
double :: Int -> Int
double x = x * 2

-- Two arguments
add :: Int -> Int -> Int
add x y = x + y

-- List argument
sumList :: [Int] -> Int
sumList xs = sum xs

-- Tuple argument
distance :: (Double, Double) -> (Double, Double) -> Double
distance (x1, y1) (x2, y2) = sqrt ((x2-x1)^2 + (y2-y1)^2)

-- Polymorphic
identity :: a -> a
identity x = x

-- With type class constraint
maximum' :: Ord a => [a] -> a
maximum' (x:xs) = foldr max x xs
```

## Your Tasks

### Task 1: Type Exploration
In GHCi, find types of:
- `'a'`
- `True`
- `"Hello"`
- `(True, 'a')`
- `4 == 5`
- `head`
- `tail`
- `reverse`

### Task 2: Explicit Types
Create `types_basic.hs` with explicitly typed:
- `num :: Int` = 42
- `decimal :: Double` = 3.14
- `letter :: Char` = 'x'
- `word :: String` = "Haskell"
- `flag :: Bool` = True

### Task 3: Function Types
Create `types_functions.hs` with:
- `increment :: Int -> Int`
- `concatenate :: String -> String -> String`
- `isPositive :: Int -> Bool`
- `firstChar :: String -> Char`
All with implementations and tests

### Task 4: Polymorphic Functions
Create `types_poly.hs` with:
- `identity :: a -> a` - returns same value
- `first :: (a, b) -> a` - first element of tuple
- `second :: (a, b) -> b` - second element
- `listLength :: [a] -> Int` - length of list
Test with different types

### Task 5: Eq Type Class
Create `types_eq.hs` with:
- `isEqual :: Eq a => a -> a -> Bool`
- `isNotEqual :: Eq a => a -> a -> Bool`
- `elemList :: Eq a => a -> [a] -> Bool`
Test with Int, String, Bool

### Task 6: Ord Type Class
Create `types_ord.hs` with:
- `maxOfTwo :: Ord a => a -> a -> a`
- `minOfTwo :: Ord a => a -> a -> a`
- `isSorted :: Ord a => [a] -> Bool` - check if list is sorted
Test with different types

### Task 7: Show and Read
Create `types_show_read.hs` with:
- Function that shows a value with label
- Function that reads and adds 10 to a number
- Function that reads a list and returns length
- Demonstrate parsing errors

### Task 8: Numeric Types
Create `types_num.hs` with:
- `square :: Num a => a -> a`
- `sumOfSquares :: Num a => a -> a -> a`
- `average :: Fractional a => a -> a -> a`
Test with Int, Integer, Double

### Task 9: Bounded Types
Create `types_bounded.hs` that:
- Prints minBound and maxBound for Int
- Prints minBound and maxBound for Bool
- Prints minBound and maxBound for Char
- Creates a function that checks if value is at boundary

### Task 10: Enum Types
Create `types_enum.hs` with:
- Use succ and pred on numbers and chars
- Generate ranges ['A'..'Z']
- Generate [1..100]
- Define custom enumerable type (e.g., Month)

### Task 11: Multiple Constraints
Create `types_constraints.hs` with:
- `showMax :: (Show a, Ord a) => a -> a -> String`
  - Returns string showing the max value
- `readAndCompare :: (Read a, Ord a) => String -> String -> Bool`
  - Reads two strings and compares
- Test with different types

### Task 12: Type Synonyms
Create `types_synonyms.hs` with:
- Type synonyms for: `Position = (Double, Double)`
- `Name = String`
- `Age = Int`
- `Person = (Name, Age)`
- `People = [Person]`
- Functions using these types

## Expected Output Examples

**Task 1:**
```haskell
ghci> :type 'a'
'a' :: Char
ghci> :type True
True :: Bool
ghci> :type "Hello"
"Hello" :: [Char]
ghci> :type (True, 'a')
(True, 'a') :: (Bool, Char)
```

**Task 6:**
```
maxOfTwo 5 10 = 10
minOfTwo "apple" "banana" = "apple"
isSorted [1,2,3,4,5] = True
isSorted [1,3,2,4,5] = False
```

**Task 10:**
```
succ 5 = 6
pred 'C' = 'B'
['A'..'Z'] = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
[Jan, Feb, Mar, Apr, May, Jun, Jul, Aug, Sep, Oct, Nov, Dec]
```

## Tips
- Always write type signatures for top-level functions
- Use `:type` in GHCi to check types
- Type variables start with lowercase (a, b, c)
- Type names start with uppercase (Int, Bool, String)
- Type classes define behavior
- `=>` separates type class constraints from type
- Polymorphic functions work with many types
- Strong typing catches errors at compile time

## Common Mistakes

```haskell
-- ❌ Forgetting type annotation for read
x = read "5"  -- Ambiguous!

-- ✅ Provide type
x = read "5" :: Int

-- ❌ Trying to compare different types
5 == "5"  -- Error!

-- ✅ Compare same types
5 == 5
"5" == "5"

-- ❌ Using wrong type variable conventions
func :: A -> A  -- Wrong! Type vars are lowercase

-- ✅ Correct type variables
func :: a -> a

-- ❌ Missing type class constraints
maximum' :: [a] -> a  -- Won't compile!

-- ✅ Add Ord constraint
maximum' :: Ord a => [a] -> a

-- ❌ Too specific types
add :: Int -> Int -> Int  -- Only works with Int

-- ✅ More general when possible
add :: Num a => a -> a -> a  -- Works with all numbers
```

## Type Class Hierarchy

```
Eq (equality)
└── Ord (ordering)

Show (convert to string)
Read (parse from string)

Enum (sequential)
Bounded (min/max bounds)

Num (numeric operations)
├── Integral
│   ├── Int
│   └── Integer
└── Fractional
    ├── Float
    └── Double
```

## Key Concepts
- **Type**: Classification of values
- **Type Inference**: Automatic type determination
- **Type Variable**: Placeholder for any type (polymorphism)
- **Type Class**: Interface defining behavior
- **Constraint**: Type class requirement
- **Type Signature**: Explicit type declaration
- **Polymorphism**: Functions working with multiple types
- **Type Synonym**: Alternative name for type

## Next Steps
Move on to `05-Tuples` to learn about fixed-size heterogeneous collections!
