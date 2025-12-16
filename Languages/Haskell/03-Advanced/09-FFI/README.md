# Foreign Function Interface (FFI)

## Overview
Call C code from Haskell and vice versa.

## Calling C from Haskell

```haskell
{-# LANGUAGE ForeignFunctionInterface #-}
import Foreign.C.Types

-- Declare C function
foreign import ccall "math.h sin"
    c_sin :: CDouble -> CDouble

-- Use it
sinValue :: Double -> Double
sinValue x = realToFrac (c_sin (realToFrac x))

-- C string handling
foreign import ccall "string.h strlen"
    c_strlen :: CString -> IO CSize

-- Marshal data
import Foreign.Marshal.Array
import Foreign.C.String

useC :: IO ()
useC = do
    cstr <- newCString "Hello from C"
    len <- c_strlen cstr
    putStrLn $ "Length: " ++ show len
    free cstr
```

## Calling Haskell from C

```haskell
-- Export Haskell function
foreign export ccall hs_add :: CInt -> CInt -> CInt

hs_add :: CInt -> CInt -> CInt
hs_add x y = x + y
```

## Working with Pointers

```haskell
import Foreign.Ptr
import Foreign.Storable

-- Allocate memory
allocExample :: IO ()
allocExample = do
    ptr <- malloc :: IO (Ptr Int)
    poke ptr 42
    value <- peek ptr
    print value
    free ptr
```

## Tasks
1. Call C math functions
2. Wrap C library
3. Pass arrays between Haskell and C
4. Export Haskell function to C
5. Create bindings for C library

## Next: `10-Web-Development`
