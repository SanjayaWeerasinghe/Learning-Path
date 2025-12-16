# Monads in Practice

## Overview
Practical applications of common monads: IO, Maybe, Either, List, and State.

## IO Monad

```haskell
main :: IO ()
main = do
    putStrLn "What's your name?"
    name <- getLine
    putStrLn ("Hello, " ++ name)

-- Reading files
readFileContents :: FilePath -> IO String
readFileContents path = do
    contents <- readFile path
    return contents
```

## Maybe Monad

```haskell
-- Chaining operations that might fail
lookup' :: Eq a => a -> [(a,b)] -> Maybe b
lookup' _ [] = Nothing
lookup' key ((k,v):rest)
    | key == k  = Just v
    | otherwise = lookup' key rest

findAge :: String -> Maybe Int
findAge name = do
    person <- lookup name phonebook
    age <- lookup "age" person
    return age
```

## Either Monad

```haskell
-- Better error handling
validateAge :: Int -> Either String Int
validateAge age
    | age < 0   = Left "Age cannot be negative"
    | age > 150 = Left "Age seems unrealistic"
    | otherwise = Right age

validatePerson :: String -> Int -> Either String Person
validatePerson name age = do
    validAge <- validateAge age
    if null name
        then Left "Name cannot be empty"
        else Right (Person name validAge)
```

## Tasks
1. Build interactive program with IO
2. Chain Maybe lookups
3. Validate user input with Either
4. Generate combinations with List monad
5. Parse configuration file

## Next: `07-Modules`
