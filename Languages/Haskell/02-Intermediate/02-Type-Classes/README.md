# Type Classes

## Overview
Type classes define interfaces that types can implement. Create your own type classes and make types instances of existing classes.

## Key Concepts

```haskell
-- Define a type class
class Eq a where
    (==) :: a -> a -> Bool
    (/=) :: a -> a -> Bool

-- Make a type an instance
data TrafficLight = Red | Yellow | Green

instance Eq TrafficLight where
    Red == Red = True
    Yellow == Yellow = True
    Green == Green = True
    _ == _ = False

instance Show TrafficLight where
    show Red = "Red light"
    show Yellow = "Yellow light"
    show Green = "Green light"

-- Deriving automatically
data Day = Mon | Tue | Wed deriving (Show, Eq, Ord, Enum, Bounded)
```

## Tasks
1. Define custom Eq instance
2. Define custom Ord instance
3. Create custom type class
4. Make types instances
5. Use deriving for common classes

## Next: `03-Functors`
