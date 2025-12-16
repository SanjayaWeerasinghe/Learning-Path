# Modules

## Overview
Organize code into modules for better structure, reusability, and namespacing.

## Creating Modules

```haskell
-- File: Geometry.hs
module Geometry
( sphereVolume
, sphereArea
, cubeVolume
) where

sphereVolume :: Double -> Double
sphereVolume r = (4/3) * pi * r^3

sphereArea :: Double -> Double
sphereArea r = 4 * pi * r^2

cubeVolume :: Double -> Double
cubeVolume side = side^3

-- Private function (not exported)
helper :: Double -> Double
helper x = x * 2
```

## Importing Modules

```haskell
-- Import all
import Data.List

-- Import specific functions
import Data.List (nub, sort)

-- Import all except
import Data.List hiding (map)

-- Qualified import
import qualified Data.Map as M

-- Use: M.insert, M.lookup
```

## Hierarchical Modules

```haskell
-- File: Geometry/Sphere.hs
module Geometry.Sphere
( volume
, area
) where

-- File: Geometry/Cube.hs
module Geometry.Cube
( volume
, area
) where

-- Import:
import qualified Geometry.Sphere as Sphere
import qualified Geometry.Cube as Cube
```

## Tasks
1. Create custom module
2. Export specific functions
3. Use qualified imports
4. Build hierarchical module structure
5. Create utility module library

## Next: `08-Input-Output`
