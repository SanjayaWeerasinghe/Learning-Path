# Lenses

## Overview
Lenses provide composable getters and setters for accessing and modifying nested data structures.

## Key Concepts

```haskell
{-# LANGUAGE TemplateHaskell #-}
import Control.Lens

-- Define data types
data Person = Person {
    _name :: String,
    _age :: Int,
    _address :: Address
} deriving (Show)

data Address = Address {
    _street :: String,
    _city :: String
} deriving (Show)

-- Generate lenses
makeLenses ''Person
makeLenses ''Address

-- Using lenses
person = Person "Alice" 30 (Address "Main St" "NYC")

-- Get values
getName = person ^. name  -- "Alice"

-- Set values
older = person & age .~ 31

-- Modify values
birthday = person & age %~ (+1)

-- Nested access
getCity = person ^. address . city  -- "NYC"

-- Nested modification
moveCity = person & address . city .~ "LA"

-- Composition
streetAndCity = street <> " in " <> city
```

## Common Lens Operations

- `^.` - view (get)
- `.~` - set
- `%~` - modify
- `&` - flip ($), for chaining

## Tasks
1. Create person record with lenses
2. Access nested fields
3. Update nested structures
4. Compose multiple lenses
5. Use lens traversals

## Next: `03-Parser-Combinators`
