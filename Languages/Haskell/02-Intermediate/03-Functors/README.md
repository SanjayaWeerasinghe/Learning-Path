# Functors

## Overview
Functors are types that can be mapped over. The Functor type class provides the `fmap` function.

## Key Concepts

```haskell
class Functor f where
    fmap :: (a -> b) -> f a -> f b

-- List is a Functor
instance Functor [] where
    fmap = map

ghci> fmap (*2) [1,2,3]
[2,4,6]

-- Maybe is a Functor
instance Functor Maybe where
    fmap f Nothing = Nothing
    fmap f (Just x) = Just (f x)

ghci> fmap (*2) (Just 5)
Just 10

-- Custom Functor
data Box a = Box a deriving (Show)

instance Functor Box where
    fmap f (Box x) = Box (f x)
```

## Functor Laws
1. Identity: `fmap id = id`
2. Composition: `fmap (f . g) = fmap f . fmap g`

## Tasks
1. Use fmap with lists
2. Use fmap with Maybe
3. Create custom Functor instance
4. Chain fmap operations
5. Use (<$>) operator

## Next: `04-Applicative-Functors`
