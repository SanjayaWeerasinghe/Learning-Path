# Input/Output

## Overview
Performing I/O operations: reading user input, file operations, and handling streams.

## Console I/O

```haskell
main :: IO ()
main = do
    putStrLn "Enter your name:"
    name <- getLine
    putStrLn ("Hello, " ++ name ++ "!")

-- Without do notation
main' = putStrLn "Enter name:" >>
        getLine >>= \name ->
        putStrLn ("Hello, " ++ name)
```

## File Operations

```haskell
-- Reading files
import System.IO

readFileExample :: IO ()
readFileExample = do
    contents <- readFile "input.txt"
    putStrLn contents

-- Writing files
writeFileExample :: IO ()
writeFileExample = do
    writeFile "output.txt" "Hello, World!"

-- Appending
appendFileExample :: IO ()
appendFileExample = do
    appendFile "log.txt" "New log entry\n"

-- With handles
withFileExample :: IO ()
withFileExample = do
    handle <- openFile "test.txt" ReadMode
    contents <- hGetContents handle
    putStr contents
    hClose handle
```

## Command Line Arguments

```haskell
import System.Environment

main :: IO ()
main = do
    args <- getArgs
    progName <- getProgName
    putStrLn ("Program: " ++ progName)
    putStrLn ("Args: " ++ show args)
```

## Tasks
1. Build interactive calculator
2. Read and process file contents
3. Copy file program
4. Word count program
5. Simple grep implementation
6. TODO list application

## Next: `09-Errors-Exceptions`
