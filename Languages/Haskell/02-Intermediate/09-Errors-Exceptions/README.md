# Errors & Exceptions

## Overview
Handling errors gracefully using Maybe, Either, exceptions, and error handling combinators.

## Pure Error Handling

```haskell
-- Maybe for operations that might fail
safeHead :: [a] -> Maybe a
safeHead [] = Nothing
safeHead (x:_) = Just x

-- Either for detailed errors
divide :: Double -> Double -> Either String Double
divide _ 0 = Left "Division by zero"
divide x y = Right (x / y)

-- Validation with Either
type ValidationError = String

validateEmail :: String -> Either ValidationError String
validateEmail email
    | '@' `elem` email = Right email
    | otherwise = Left "Invalid email"

validateAge :: Int -> Either ValidationError Int
validateAge age
    | age < 0 = Left "Age cannot be negative"
    | age > 150 = Left "Age too high"
    | otherwise = Right age
```

## Exception Handling in IO

```haskell
import Control.Exception

-- Catching exceptions
safeReadFile :: FilePath -> IO (Either IOException String)
safeReadFile path = try (readFile path)

main :: IO ()
main = do
    result <- safeReadFile "test.txt"
    case result of
        Left ex -> putStrLn ("Error: " ++ show ex)
        Right contents -> putStrLn contents

-- Handling specific exceptions
readWithFallback :: FilePath -> IO String
readWithFallback path =
    readFile path `catch` \(e :: IOException) ->
        return "File not found"

-- Finally block
withCleanup :: IO ()
withCleanup =
    bracket
        (openFile "test.txt" ReadMode)
        hClose
        (\handle -> hGetContents handle >>= putStrLn)
```

## Tasks
1. Safe list operations with Maybe
2. Input validation with Either
3. File reading with exception handling
4. Build robust calculator
5. Parse configuration with error messages

## Next: `10-Testing`
