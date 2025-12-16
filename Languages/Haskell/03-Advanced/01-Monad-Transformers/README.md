# Monad Transformers

## Overview
Monad transformers allow you to combine multiple monads, giving you the capabilities of both.

## Key Concepts

```haskell
import Control.Monad.Trans.Maybe
import Control.Monad.Trans.State
import Control.Monad.Trans.Reader
import Control.Monad.Trans.Writer

-- MaybeT - add Maybe to another monad
type MaybeIO a = MaybeT IO a

askUser :: MaybeIO String
askUser = do
    liftIO $ putStrLn "Enter your name:"
    name <- liftIO getLine
    if null name
        then MaybeT $ return Nothing
        else MaybeT $ return (Just name)

-- StateT - add State to another monad
type App a = StateT AppState IO a

data AppState = AppState { counter :: Int }

incrementCounter :: App ()
incrementCounter = modify (\s -> s { counter = counter s + 1 })

-- ReaderT - configuration
type Config a = ReaderT AppConfig IO a

data AppConfig = AppConfig { dbConnection :: String }

-- WriterT - logging
type Logger a = WriterT [String] IO a

logMessage :: String -> Logger ()
logMessage msg = tell [msg]
```

## Common Transformers

- **MaybeT**: Computations that might fail
- **EitherT/ExceptT**: Error handling with messages
- **StateT**: Stateful computations
- **ReaderT**: Read-only environment
- **WriterT**: Accumulate output (logging)
- **RWST**: Reader + Writer + State combined

## Tasks
1. Build application with ReaderT for config
2. Use StateT for stateful I/O
3. Combine Maybe and IO with MaybeT
4. Create logging with WriterT
5. Stack multiple transformers

## Next: `02-Lenses`
