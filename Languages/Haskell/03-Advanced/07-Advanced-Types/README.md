# Advanced Type System

## Overview
GADTs, Type Families, DataKinds, and other advanced type system features.

## GADTs (Generalized Algebraic Data Types)

```haskell
{-# LANGUAGE GADTs #-}

data Expr a where
    I :: Int -> Expr Int
    B :: Bool -> Expr Bool
    Add :: Expr Int -> Expr Int -> Expr Int
    Eq :: Eq a => Expr a -> Expr a -> Expr Bool

eval :: Expr a -> a
eval (I n) = n
eval (B b) = b
eval (Add e1 e2) = eval e1 + eval e2
eval (Eq e1 e2) = eval e1 == eval e2

-- Type-safe evaluation!
ghci> eval (Add (I 5) (I 3))
8
ghci> eval (Eq (I 5) (B True))  -- Type error!
```

## Type Families

```haskell
{-# LANGUAGE TypeFamilies #-}

-- Associated type families
class Collection c where
    type Elem c
    empty :: c
    insert :: Elem c -> c -> c

instance Collection [a] where
    type Elem [a] = a
    empty = []
    insert = (:)

-- Type family functions
type family Sum a b where
    Sum Int Int = Int
    Sum Double Double = Double
    Sum String String = String
```

## DataKinds

```haskell
{-# LANGUAGE DataKinds, KindSignatures #-}

data Nat = Zero | Succ Nat

data Vec (n :: Nat) a where
    VNil :: Vec 'Zero a
    VCons :: a -> Vec n a -> Vec ('Succ n) a

-- Length-indexed vectors
head' :: Vec ('Succ n) a -> a
head' (VCons x _) = x
-- Can't call head' on empty vector - compile error!
```

## Tasks
1. Create type-safe expression evaluator
2. Implement length-indexed vectors
3. Use type families for generic operations
4. Build type-safe database query DSL
5. Phantom types for units of measure

## Next: `08-Template-Haskell`
