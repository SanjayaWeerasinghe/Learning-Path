# Software Transactional Memory (STM)

## Overview
STM provides composable atomic operations for concurrent programming without locks.

## Key Concepts

```haskell
import Control.Concurrent.STM
import Control.Concurrent.STM.TVar

-- TVar - transactional variable
accountExample :: IO ()
accountExample = do
    account <- newTVarIO 100

    -- Atomic transaction
    atomically $ modifyTVar account (+50)

    balance <- readTVarIO account
    print balance  -- 150

-- Transfer money atomically
type Account = TVar Int

transfer :: Account -> Account -> Int -> STM ()
transfer from to amount = do
    fromBalance <- readTVar from
    toBalance <- readTVar to
    writeTVar from (fromBalance - amount)
    writeTVar to (toBalance + amount)

-- Retry and orElse
waitForFunds :: Account -> Int -> STM ()
waitForFunds account amount = do
    balance <- readTVar account
    if balance < amount
        then retry  -- Block until balance changes
        else return ()

withdraw :: Account -> Int -> STM ()
withdraw account amount = do
    waitForFunds account amount
    balance <- readTVar account
    writeTVar account (balance - amount)

-- Compose transactions
transferOrFail :: Account -> Account -> Int -> STM ()
transferOrFail from to amount =
    transfer from to amount `orElse` return ()
```

## TMVar and TChan

```haskell
-- TMVar - transactional MVar
tmvarExample :: IO ()
tmvarExample = do
    tm <- newEmptyTMVarIO
    atomically $ putTMVar tm "value"
    val <- atomically $ takeTMVar tm
    print val

-- TChan - transactional channel
tchanExample :: IO ()
tchanExample = do
    chan <- newTChanIO
    atomically $ writeTChan chan "message"
    msg <- atomically $ readTChan chan
    print msg
```

## Tasks
1. Build thread-safe bank system
2. Implement producer-consumer with STM
3. Create shared counter with TVar
4. Build message queue with TChan
5. Implement dining philosophers

## Next: `06-Performance`
