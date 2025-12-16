# Custom Types

## What You'll Learn
- Defining custom data types with `data`
- Type synonyms with `type`
- Newtype wrapper
- Record syntax
- Deriving type classes
- Recursive data types
- Parameterized types

## Concept Overview

Custom types let you model your domain precisely and leverage the type system for correctness.

### Data Types

```haskell
-- Simple enumeration
data Day = Monday | Tuesday | Wednesday | Thursday | Friday | Saturday | Sunday
    deriving (Show, Eq, Ord, Enum)

-- Type with parameters
data Shape = Circle Double | Rectangle Double Double
    deriving (Show)

area :: Shape -> Double
area (Circle r) = pi * r^2
area (Rectangle w h) = w * h

-- Parameterized types
data Maybe a = Nothing | Just a
data Either a b = Left a | Right b
```

### Record Syntax

```haskell
-- Without records
data Person = Person String Int String
getName (Person n _ _) = n

-- With records
data Person = Person {
    name :: String,
    age :: Int,
    email :: String
} deriving (Show)

-- Automatic getters
alice = Person {name = "Alice", age = 30, email = "alice@example.com"}
ghci> name alice
"Alice"

-- Update syntax
older = alice {age = 31}
```

### Type vs Newtype vs Data

```haskell
-- type: alias (no runtime overhead)
type Name = String
type Age = Int
type Person = (Name, Age)

-- newtype: wrapper (no runtime overhead, new type)
newtype Age = Age Int
    deriving (Show, Eq, Ord)

-- data: full type (can have multiple constructors)
data Age = Age Int | Unknown
    deriving (Show)
```

### Recursive Types

```haskell
-- Linked list
data List a = Empty | Cons a (List a)
    deriving (Show)

-- Binary tree
data Tree a = EmptyTree | Node a (Tree a) (Tree a)
    deriving (Show)

insert :: Ord a => a -> Tree a -> Tree a
insert x EmptyTree = Node x EmptyTree EmptyTree
insert x (Node a left right)
    | x == a = Node x left right
    | x < a  = Node a (insert x left) right
    | x > a  = Node a left (insert x right)
```

## Your Tasks

### Task 1: Define Shape Types
- Create data type for Circle, Rectangle, Triangle
- Implement area and perimeter functions

### Task 2: Person Records
- Define Person with name, age, address
- Create functions to update each field

### Task 3: Binary Tree
- Implement insert, search, and traversal
- Test with numbers and strings

### Task 4: Maybe/Either Practice
- Use Maybe for safe division
- Use Either for detailed errors

### Task 5: Type Synonyms
- Create type synonyms for common patterns
- PhoneBook, StudentGrades, etc.

## Next Steps
Move on to `02-Type-Classes` to learn how to define behavior for your types!
