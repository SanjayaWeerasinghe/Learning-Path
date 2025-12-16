# Concurrency

## Overview
Parallel and concurrent programming in Haskell using threads, async, and parallel strategies.

## Key Concepts

```haskell
import Control.Concurrent
import Control.Concurrent.Async
import Control.Parallel
import Control.Parallel.Strategies

-- Threads
forkExample :: IO ()
forkExample = do
    forkIO $ putStrLn "Thread 1"
    forkIO $ putStrLn "Thread 2"
    threadDelay 1000000

-- MVars for communication
mvarExample :: IO ()
mvarExample = do
    m <- newEmptyMVar
    forkIO $ putMVar m "Hello from thread"
    msg <- takeMVar m
    putStrLn msg

-- Async
asyncExample :: IO ()
asyncExample = do
    a1 <- async (return "task 1")
    a2 <- async (return "task 2")
    r1 <- wait a1
    r2 <- wait a2
    putStrLn (r1 ++ " " ++ r2)

-- Parallel evaluation
parExample :: [Int] -> Int
parExample xs = sum xs1 `par` sum xs2 `pseq` sum xs1 + sum xs2
    where (xs1, xs2) = splitAt (length xs `div` 2) xs

-- Strategies
parListExample :: [Int] -> [Int]
parListExample xs = map (^2) xs `using` parList rseq

-- Parallel map
parMapExample :: (a -> b) -> [a] -> [b]
parMapExample f xs = map f xs `using` parList rdeepseq
```

## Tasks
1. Create multi-threaded download manager
2. Parallel map-reduce
3. Web scraper with concurrency
4. Producer-consumer with MVars
5. Parallel fibonacci calculation

## Next: `05-STM`
