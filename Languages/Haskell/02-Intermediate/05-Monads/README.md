# Monads

## Overview
Monads are applicative functors that support chaining operations. They're fundamental for handling effects in Haskell.

## Key Concepts

```haskell
class Applicative m => Monad m where
    return :: a -> m a
    (>>=) :: m a -> (a -> m b) -> m b

-- Maybe Monad
ghci> Just 5 >>= \x -> Just (x * 2)
Just 10

ghci> Nothing >>= \x -> Just (x * 2)
Nothing

-- do notation
foo :: Maybe Int
foo = do
    x <- Just 3
    y <- Just 5
    return (x + y)

-- Same as:
foo = Just 3 >>= \x ->
      Just 5 >>= \y ->
      return (x + y)

-- List Monad
ghci> [1,2,3] >>= \x -> [x, -x]
[1,-1,2,-2,3,-3]

-- Either Monad (for errors)
safeDiv :: Int -> Int -> Either String Int
safeDiv _ 0 = Left "Division by zero"
safeDiv x y = Right (x `div` y)

compute :: Int -> Int -> Either String Int
compute x y = do
    a <- safeDiv x y
    b <- safeDiv a 2
    return (b + 10)
```

## Monad Laws
1. Left identity
2. Right identity
3. Associativity

## Tasks
1. Chain Maybe operations
2. Use do notation
3. Implement safeDivision with Either
4. Use list monad for combinations
5. Create custom monad instance

## Next: `06-Monads-Practice`
