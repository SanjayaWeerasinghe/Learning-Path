# Parser Combinators

## Overview
Build parsers by combining simple parsers into complex ones using Parsec or Megaparsec.

## Key Concepts

```haskell
import Text.Parsec
import Text.Parsec.String (Parser)

-- Simple parsers
digit :: Parser Char
digit = oneOf "0123456789"

integer :: Parser Int
integer = read <$> many1 digit

-- Combining parsers
pair :: Parser (Int, Int)
pair = do
    char '('
    x <- integer
    char ','
    y <- integer
    char ')'
    return (x, y)

-- Alternative
identifier :: Parser String
identifier = many1 (letter <|> digit <|> char '_')

-- CSV parser
csv :: Parser [[String]]
csv = line `sepBy` newline

line :: Parser [String]
line = cell `sepBy` char ','

cell :: Parser String
cell = many (noneOf ",\n")

-- Expression parser
data Expr = Num Int | Add Expr Expr | Mul Expr Expr
    deriving (Show)

expr :: Parser Expr
expr = term `chainl1` addOp

term :: Parser Expr
term = factor `chainl1` mulOp

factor :: Parser Expr
factor = num <|> parens expr

num :: Parser Expr
num = Num . read <$> many1 digit

addOp = Add <$ char '+'
mulOp = Mul <$ char '*'

parens p = char '(' *> p <* char ')'
```

## Tasks
1. Parse CSV files
2. Build JSON parser
3. Create expression evaluator
4. Parse configuration files
5. Build simple programming language parser

## Next: `04-Concurrency`
