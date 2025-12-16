# Guards & Where

## What You'll Learn
- Using guards for conditional logic
- Otherwise keyword
- Where clauses for local bindings
- Let vs Where
- Multiple where bindings
- Combining guards and where
- Nested where clauses

## Concept Overview

Guards provide a readable way to write conditional logic, and where clauses let you define local variables and functions that are visible across guards.

### Guards Syntax

```haskell
-- Basic guard syntax
abs' :: Int -> Int
abs' n
    | n >= 0    = n
    | otherwise = -n

-- Multiple guards
bmiTell :: Double -> String
bmiTell bmi
    | bmi <= 18.5 = "Underweight"
    | bmi <= 25.0 = "Normal"
    | bmi <= 30.0 = "Overweight"
    | otherwise   = "Obese"

-- Guards with expressions
max' :: Ord a => a -> a -> a
max' a b
    | a > b     = a
    | otherwise = b

-- ghci examples:
ghci> abs' (-5)
5
ghci> bmiTell 22
"Normal"
ghci> max' 10 20
20
```

### Where Bindings

```haskell
-- Where defines local variables
bmiTell' :: Double -> Double -> String
bmiTell' weight height
    | bmi <= skinny = "Underweight"
    | bmi <= normal = "Normal"
    | bmi <= fat    = "Overweight"
    | otherwise     = "Obese"
    where bmi = weight / height ^ 2
          skinny = 18.5
          normal = 25.0
          fat = 30.0

-- Where with multiple bindings
initials :: String -> String -> String
initials firstname lastname = [f] ++ ". " ++ [l] ++ "."
    where (f:_) = firstname
          (l:_) = lastname

-- Where with functions
calcBmis :: [(Double, Double)] -> [Double]
calcBmis xs = [bmi w h | (w, h) <- xs]
    where bmi weight height = weight / height ^ 2
```

### Let vs Where

```haskell
-- Let is an expression
cylinder :: Double -> Double -> Double
cylinder r h =
    let sideArea = 2 * pi * r * h
        topArea = pi * r ^ 2
    in sideArea + 2 * topArea

-- Where is a definition
cylinder' :: Double -> Double -> Double
cylinder' r h = sideArea + 2 * topArea
    where sideArea = 2 * pi * r * h
          topArea = pi * r ^ 2

-- Let can be used anywhere
[let square x = x * x in (square 5, square 3, square 2)]
-- [(25,9,4)]

-- Where is only at function level
```

### Combining Guards and Where

```haskell
-- Guards with where bindings
gradeFromScore :: Int -> String
gradeFromScore score
    | score >= aPlus  = "A+"
    | score >= a      = "A"
    | score >= bPlus  = "B+"
    | score >= b      = "B"
    | score >= c      = "C"
    | otherwise       = "F"
    where aPlus = 97
          a = 93
          bPlus = 87
          b = 83
          c = 70

-- Where with helper functions
describeTemperature :: Double -> String
describeTemperature temp
    | temp < freezing   = "Freezing! " ++ show celsius ++ "°C"
    | temp < cold       = "Cold. " ++ show celsius ++ "°C"
    | temp < warm       = "Pleasant. " ++ show celsius ++ "°C"
    | temp < hot        = "Warm. " ++ show celsius ++ "°C"
    | otherwise         = "Hot! " ++ show celsius ++ "°C"
    where celsius = toCelsius temp
          toCelsius f = (f - 32) * 5/9
          freezing = 32
          cold = 50
          warm = 68
          hot = 86
```

### Nested Where

```haskell
-- Where clauses can be nested
density :: Double -> Double -> Double -> String
density mass volume temperature
    | d < gasThreshold    = "Gas"
    | d < liquidThreshold = "Liquid"
    | otherwise           = "Solid"
    where d = adjustedDensity
          adjustedDensity = mass / volume * tempFactor
          tempFactor = temperature / standardTemp
          standardTemp = 273.15
          gasThreshold = 0.001
          liquidThreshold = 1.0
```

### Pattern Matching in Where

```haskell
-- Destructuring in where
describePoint :: (Double, Double) -> String
describePoint point
    | x == 0 && y == 0 = "Origin"
    | x == 0           = "On Y-axis"
    | y == 0           = "On X-axis"
    | x > 0 && y > 0   = "Quadrant I"
    | x < 0 && y > 0   = "Quadrant II"
    | x < 0 && y < 0   = "Quadrant III"
    | otherwise        = "Quadrant IV"
    where (x, y) = point

-- Multiple patterns in where
initials' :: String -> String -> String
initials' firstname lastname = [f] ++ ". " ++ [l] ++ "."
    where (f:_) = firstname
          (l:_) = lastname
```

## Your Tasks

### Task 1: Basic Guards
Create `guards_basic.hs` with:
- `signum' :: Int -> Int` - returns 1, 0, or -1
- `compare' :: Ord a => a -> a -> String` - "greater", "equal", or "less"
- `isTeenager :: Int -> Bool` - age between 13 and 19
- Test each function

### Task 2: BMI Calculator
Create `guards_bmi.hs` with:
- `bmiCategory :: Double -> Double -> String`
- Calculate BMI in where clause
- Use guards for categories
- Categories: Underweight (<18.5), Normal (18.5-25), Overweight (25-30), Obese (>30)

### Task 3: Grade Calculator
Create `guards_grades.hs` with:
- `letterGrade :: Int -> String`
- A+: 97-100, A: 93-96, A-: 90-92
- B+: 87-89, B: 83-86, B-: 80-82
- C+: 77-79, C: 73-76, C-: 70-72
- D: 60-69, F: below 60
- Define thresholds in where

### Task 4: Where with Calculations
Create `where_calc.hs` with:
- `sphereVolume :: Double -> Double` - volume of sphere
- `sphereSurfaceArea :: Double -> Double` - surface area
- Define pi approximation in where
- Show calculations for radius 5

### Task 5: Temperature Converter
Create `where_temp.hs` with:
- `describeTemp :: Double -> String` (takes Fahrenheit)
- Convert to Celsius in where
- Guards for: Freezing (<0°C), Cold (0-10°C), Mild (10-20°C), Warm (20-30°C), Hot (>30°C)

### Task 6: Triangle Classifier
Create `guards_triangle.hs` with:
- `triangleType :: Double -> Double -> Double -> String`
- Guards check: "Not a triangle", "Equilateral", "Isosceles", "Scalene"
- Helper function in where to check validity
- Test with various side lengths

### Task 7: Quadratic Solver
Create `where_quadratic.hs` with:
- `solveQuadratic :: Double -> Double -> Double -> String`
- Calculate discriminant in where
- Guards for: two solutions, one solution, no real solutions
- Show solutions when they exist

### Task 8: Password Strength
Create `guards_password.hs` with:
- `passwordStrength :: String -> String`
- Guards check length
- Helper functions in where for: hasNumber, hasUpper, hasLower
- Return: "Weak", "Medium", "Strong"

### Task 9: Multiple Where Bindings
Create `where_multiple.hs` with:
- `circleStats :: Double -> (Double, Double, Double)`
- Returns (area, circumference, diameter)
- All calculations use bindings from where
- Define pi, squared radius, etc.

### Task 10: Tax Calculator
Create `guards_tax.hs` with:
- `calculateTax :: Double -> Double`
- Tax brackets in where clause
- Guards for different income levels
- 0%: 0-10k, 10%: 10k-40k, 20%: 40k-100k, 30%: >100k

### Task 11: Distance Categories
Create `where_distance.hs` with:
- `categorizeDistance :: (Double, Double) -> (Double, Double) -> String`
- Calculate distance in where
- Guards: "Very close" (<1), "Close" (1-5), "Medium" (5-10), "Far" (>10)
- Use Pythagorean theorem

### Task 12: Complex Guards
Create `guards_complex.hs` with:
- `recommendActivity :: Int -> Double -> String` (age, temperature)
- Multiple guards checking both parameters
- Where clause with age groups and temp ranges
- Different activities for kids/adults and weather

## Expected Output Examples

**Task 2:**
```
Weight: 70kg, Height: 1.75m
BMI: 22.86
Category: Normal
```

**Task 3:**
```
Score 95: A
Score 88: B+
Score 75: C
Score 65: D
Score 50: F
```

**Task 7:**
```
Equation: x² + 2x + 1 = 0
One solution: x = -1.0

Equation: x² - 5x + 6 = 0
Two solutions: x = 2.0 or x = 3.0

Equation: x² + x + 1 = 0
No real solutions
```

**Task 11:**
```
Distance from (0,0) to (0.5, 0.5): Very close
Distance from (0,0) to (3,4): Close
Distance from (0,0) to (6,8): Medium
Distance from (0,0) to (20,20): Far
```

## Tips
- **Guards are more readable** than nested if-then-else
- **Otherwise** should be the last guard (catch-all)
- **Where bindings** are visible to all guards
- Use **where** for readability, especially with multiple bindings
- **Let** is an expression, **where** is a definition
- Guards are evaluated top-to-bottom
- Define constants in where to avoid magic numbers
- Where can contain functions, not just values

## Common Mistakes

```haskell
-- ❌ Forgetting otherwise
abs' n
    | n >= 0 = n
    | n < 0 = -n  -- Redundant! Use otherwise

-- ✅ Use otherwise
abs' n
    | n >= 0    = n
    | otherwise = -n

-- ❌ Wrong indentation in where
func x = result
    where y = 5
        z = 10  -- Error! Wrong indentation

-- ✅ Proper indentation
func x = result
    where y = 5
          z = 10

-- ❌ Guards without pattern
f | x > 0 = x  -- Error! Need parameter

-- ✅ Include parameter
f x | x > 0 = x

-- ❌ Using = instead of guards
compare' a b =
    | a > b = "greater"  -- Error!

-- ✅ No = before guards
compare' a b
    | a > b = "greater"
    | otherwise = "not greater"

-- ❌ Where used in expression context
x = (where y = 5 in y + 3)  -- Error! Use let

-- ✅ Let in expression
x = let y = 5 in y + 3

-- ❌ Accessing where binding from outside
f x = x + y
    where y = 5
z = y  -- Error! y not in scope

-- ✅ Where bindings are local
f x = x + y
    where y = 5
-- y only visible in f
```

## Guards vs If-Then-Else

```haskell
-- ❌ Nested if-then-else (hard to read)
grade score =
    if score >= 90 then "A"
    else if score >= 80 then "B"
    else if score >= 70 then "C"
    else "F"

-- ✅ Guards (much clearer!)
grade score
    | score >= 90 = "A"
    | score >= 80 = "B"
    | score >= 70 = "C"
    | otherwise   = "F"
```

## Let vs Where Comparison

| Feature | Let | Where |
|---------|-----|-------|
| **Type** | Expression | Definition |
| **Scope** | Local to expression | Entire function |
| **Placement** | Before use | After use |
| **With guards** | Not directly | Yes |
| **Usage** | Any expression | Function definitions |

## Key Concepts
- **Guards**: Boolean expressions for conditional logic
- **Otherwise**: Catch-all guard (always True)
- **Where**: Local bindings for function
- **Let**: Expression-level bindings
- **Scope**: Where bindings visible to all guards
- **Readability**: Guards clearer than nested ifs
- **Order**: Guards evaluated top-to-bottom

## Next Steps
Move on to `08-Recursion` to learn the functional way to loop and process data!
