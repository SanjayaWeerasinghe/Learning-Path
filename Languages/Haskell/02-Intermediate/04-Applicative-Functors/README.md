# Applicative Functors

## Overview
Applicative functors are functors with more structure. They allow applying functions wrapped in a context.

## Key Concepts

```haskell
class Functor f => Applicative f where
    pure :: a -> f a
    (<*>) :: f (a -> b) -> f a -> f b

-- Maybe Applicative
ghci> pure (+3) <*> Just 10
Just 13

ghci> Just (+3) <*> Just 10
Just 13

-- Combining values in context
ghci> pure (+) <*> Just 3 <*> Just 5
Just 8

ghci> (+) <$> Just 3 <*> Just 5
Just 8

-- List Applicative
ghci> [(+1), (*2)] <*> [1,2,3]
[2,3,4,2,4,6]

-- Functions with multiple arguments
ghci> pure (,,) <*> Just 1 <*> Just 2 <*> Just 3
Just (1,2,3)
```

## Applicative Laws
1. Identity
2. Composition
3. Homomorphism
4. Interchange

## Tasks
1. Use <*> with Maybe
2. Use <*> with lists
3. Apply multi-argument functions
4. Create custom Applicative
5. Use applicative style parsing

## Next: `05-Monads`
