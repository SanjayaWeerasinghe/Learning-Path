# Template Haskell

## Overview
Metaprogramming in Haskell - generate code at compile time.

## Key Concepts

```haskell
{-# LANGUAGE TemplateHaskell #-}
import Language.Haskell.TH

-- Simple splice
$(return [])

-- Generate function
genFunction :: Name -> Q [Dec]
genFunction name = do
    let funName = mkName ("get" ++ nameBase name)
    funD funName [clause [] (normalB [| "value" |]) []]

-- Quasi-quotation
import Language.Haskell.TH.Quote

-- Expression quotation
add1 :: Int -> Q Exp
add1 n = [| n + 1 |]

-- Generate instances
derivePerson ''Person

-- Inspect types
getFieldNames :: Name -> Q [String]
getFieldNames name = do
    TyConI (DataD _ _ _ _ cons _) <- reify name
    return [nameBase n | RecC _ fields <- cons,
                         (n, _, _) <- fields]
```

## Common Uses

- Deriving instances automatically
- Generating boilerplate code
- DSL implementation
- Compile-time optimization
- Lens generation

## Tasks
1. Generate getter/setter functions
2. Auto-derive JSON instances
3. Create DSL with Template Haskell
4. Generate test cases
5. Build compile-time configuration

## Next: `09-FFI`
