# Testing

## Overview
Testing Haskell code with HUnit (unit tests) and QuickCheck (property-based testing).

## HUnit - Unit Testing

```haskell
import Test.HUnit

-- Define tests
testAdd = TestCase (assertEqual "2+2" 4 (2+2))
testReverse = TestCase (assertEqual "reverse" [3,2,1] (reverse [1,2,3]))

tests = TestList [TestLabel "addition" testAdd,
                  TestLabel "reverse" testReverse]

-- Run tests
main = runTestTT tests
```

## QuickCheck - Property Testing

```haskell
import Test.QuickCheck

-- Properties
prop_reverse :: [Int] -> Bool
prop_reverse xs = reverse (reverse xs) == xs

prop_sort :: [Int] -> Bool
prop_sort xs = length (sort xs) == length xs

-- Run
main = do
    quickCheck prop_reverse
    quickCheck prop_sort

-- Custom generators
data Color = Red | Green | Blue deriving (Show, Eq)

instance Arbitrary Color where
    arbitrary = elements [Red, Green, Blue]
```

## Tasty - Test Framework

```haskell
import Test.Tasty
import Test.Tasty.HUnit
import Test.Tasty.QuickCheck

tests :: TestTree
tests = testGroup "All Tests"
    [ testGroup "Unit Tests"
        [ testCase "Addition" $ 2 + 2 @?= 4
        , testCase "Reverse" $ reverse [1,2,3] @?= [3,2,1]
        ]
    , testGroup "Properties"
        [ testProperty "reverse twice" $
            \xs -> reverse (reverse xs) == (xs :: [Int])
        ]
    ]

main = defaultMain tests
```

## Tasks
1. Write HUnit tests for list functions
2. Create QuickCheck properties for sorting
3. Test custom data types
4. Property test for tree operations
5. Build comprehensive test suite

## Next Steps
Congratulations on completing Intermediate! Move to `03-Advanced` for monad transformers, lenses, parsing, concurrency, and more!
