# Performance Optimization

## Overview
Profiling, benchmarking, and optimizing Haskell code for better performance.

## Key Concepts

### Strictness

```haskell
-- Lazy evaluation can cause space leaks
sumLazy :: [Int] -> Int
sumLazy = foldl (+) 0  -- Builds large thunk

-- Strict evaluation
sumStrict :: [Int] -> Int
sumStrict = foldl' (+) 0  -- Forces evaluation

-- Bang patterns
{-# LANGUAGE BangPatterns #-}
factorial :: Int -> Int
factorial n = go n 1
    where go 0 !acc = acc
          go n !acc = go (n-1) (acc * n)
```

### Profiling

```bash
# Compile with profiling
ghc -prof -fprof-auto -rtsopts program.hs

# Run with profiling
./program +RTS -p

# Generate heap profile
./program +RTS -h
hp2ps -c program.hp
```

### Benchmarking

```haskell
import Criterion.Main

-- Benchmark
main = defaultMain [
    bgroup "sort" [
        bench "quicksort" $ nf quicksort [1..1000],
        bench "mergesort" $ nf mergesort [1..1000]
    ]
]
```

### Common Optimizations

```haskell
-- Use Text instead of String
import qualified Data.Text as T

-- Use Vector instead of List
import qualified Data.Vector as V

-- Use HashMap instead of association lists
import qualified Data.HashMap.Strict as HM

-- Use ByteString for binary data
import qualified Data.ByteString as BS
```

## Tasks
1. Profile and optimize recursive functions
2. Compare lazy vs strict evaluation
3. Benchmark different algorithms
4. Eliminate space leaks
5. Optimize with better data structures

## Next: `07-Advanced-Types`
