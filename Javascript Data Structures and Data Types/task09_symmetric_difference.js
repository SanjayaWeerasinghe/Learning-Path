/**
 * Task 9: Find Symmetric Difference
 * Difficulty: Beginner
 *
 * Problem Description:
 * Create a function that returns the symmetric difference of two or more sets.
 * The symmetric difference is elements that are in either set but not in both.
 *
 * Expected Input/Output:
 * Input: [1, 2, 3], [2, 3, 4]
 * Output: [1, 4]
 *
 * Input: [1, 2, 5], [2, 3, 5], [3, 4, 5]
 * Output: [1, 4, 5]
 *
 * Hints/Approach:
 * - Use Sets for efficient operations
 * - For two sets: (A ∪ B) - (A ∩ B)
 * - For multiple sets: apply operation iteratively
 * - Result should contain no duplicates
 */

/**
 * Helper: Find symmetric difference of two sets
 * Symmetric difference = elements in A or B but not in both
 *
 * @param {Set} setA - First set
 * @param {Set} setB - Second set
 * @returns {Set} - Symmetric difference
 */
function symmetricDifferenceTwoSets(setA, setB) {
    const result = new Set();

    // Add elements from A that are not in B
    for (const elem of setA) {
        if (!setB.has(elem)) {
            result.add(elem);
        }
    }

    // Add elements from B that are not in A
    for (const elem of setB) {
        if (!setA.has(elem)) {
            result.add(elem);
        }
    }

    return result;
}

/**
 * Solution 1: Symmetric difference for two arrays
 *
 * @param {number[]} arr1 - First array
 * @param {number[]} arr2 - Second array
 * @returns {number[]} - Symmetric difference as array
 */
function symmetricDifference(arr1, arr2) {
    const set1 = new Set(arr1);
    const set2 = new Set(arr2);

    const result = symmetricDifferenceTwoSets(set1, set2);

    return Array.from(result).sort((a, b) => a - b);
}

/**
 * Solution 2: Symmetric difference for multiple arrays
 * Apply symmetric difference operation iteratively
 *
 * Algorithm:
 * 1. Start with first array as Set
 * 2. For each subsequent array, compute symmetric difference with current result
 * 3. The result becomes the new current set
 *
 * @param {...number[]} arrays - Variable number of arrays
 * @returns {number[]} - Symmetric difference of all arrays
 */
function symmetricDifferenceMultiple(...arrays) {
    // Handle edge cases
    if (arrays.length === 0) return [];
    if (arrays.length === 1) return [...new Set(arrays[0])];

    // Start with first array as a Set
    let result = new Set(arrays[0]);

    // Apply symmetric difference with each subsequent array
    for (let i = 1; i < arrays.length; i++) {
        const currentSet = new Set(arrays[i]);
        result = symmetricDifferenceTwoSets(result, currentSet);
    }

    return Array.from(result).sort((a, b) => a - b);
}

/**
 * Solution 3: Using mathematical set operations
 * Symmetric difference = (A ∪ B) - (A ∩ B)
 *
 * @param {number[]} arr1 - First array
 * @param {number[]} arr2 - Second array
 * @returns {number[]} - Symmetric difference
 */
function symmetricDifferenceMath(arr1, arr2) {
    const set1 = new Set(arr1);
    const set2 = new Set(arr2);

    // Union: all elements from both sets
    const union = new Set([...set1, ...set2]);

    // Intersection: elements present in both sets
    const intersection = new Set(
        [...set1].filter(x => set2.has(x))
    );

    // Symmetric difference: union - intersection
    const symDiff = new Set(
        [...union].filter(x => !intersection.has(x))
    );

    return Array.from(symDiff).sort((a, b) => a - b);
}

/**
 * Solution 4: Using XOR logic (frequency-based approach)
 * Elements that appear odd number of times across all sets
 *
 * @param {...number[]} arrays - Variable number of arrays
 * @returns {number[]} - Symmetric difference
 */
function symmetricDifferenceXOR(...arrays) {
    const frequency = new Map();

    // Count frequency of each element across all arrays
    for (const arr of arrays) {
        const uniqueInArr = new Set(arr);  // Remove duplicates within array
        for (const num of uniqueInArr) {
            frequency.set(num, (frequency.get(num) || 0) + 1);
        }
    }

    // Elements with odd frequency are in symmetric difference
    const result = [];
    for (const [num, count] of frequency) {
        if (count % 2 === 1) {
            result.push(num);
        }
    }

    return result.sort((a, b) => a - b);
}

/**
 * Bonus: Symmetric difference with detailed explanation
 *
 * @param {number[]} arr1 - First array
 * @param {number[]} arr2 - Second array
 */
function symmetricDifferenceExplained(arr1, arr2) {
    console.log("Array 1:", arr1);
    console.log("Array 2:", arr2);

    const set1 = new Set(arr1);
    const set2 = new Set(arr2);

    console.log("Set 1:", Array.from(set1));
    console.log("Set 2:", Array.from(set2));

    // Elements only in set1
    const onlyInSet1 = [...set1].filter(x => !set2.has(x));
    console.log("Only in Set 1:", onlyInSet1);

    // Elements only in set2
    const onlyInSet2 = [...set2].filter(x => !set1.has(x));
    console.log("Only in Set 2:", onlyInSet2);

    // Symmetric difference
    const result = [...onlyInSet1, ...onlyInSet2].sort((a, b) => a - b);
    console.log("Symmetric Difference:", result);

    return result;
}

// Test cases
console.log("=== Test Case 1: Two sets ===");
const test1a = [1, 2, 3];
const test1b = [2, 3, 4];
console.log("Input:", test1a, test1b);
console.log("Output (basic):", symmetricDifference(test1a, test1b));
console.log("Output (math):", symmetricDifferenceMath(test1a, test1b));
console.log("Expected: [1, 4]");

console.log("\n=== Test Case 2: Three sets ===");
const test2 = [[1, 2, 5], [2, 3, 5], [3, 4, 5]];
console.log("Input:", test2);
console.log("Output (multiple):", symmetricDifferenceMultiple(...test2));
console.log("Output (XOR):", symmetricDifferenceXOR(...test2));
console.log("Expected: [1, 4, 5]");
console.log("Explanation: 1 appears once, 2 appears twice, 3 appears twice, 4 appears once, 5 appears three times");

console.log("\n=== Test Case 3: No common elements ===");
const test3a = [1, 2, 3];
const test3b = [4, 5, 6];
console.log("Input:", test3a, test3b);
console.log("Output:", symmetricDifference(test3a, test3b));
console.log("Expected: [1, 2, 3, 4, 5, 6] (all elements)");

console.log("\n=== Test Case 4: Completely overlapping ===");
const test4a = [1, 2, 3];
const test4b = [1, 2, 3];
console.log("Input:", test4a, test4b);
console.log("Output:", symmetricDifference(test4a, test4b));
console.log("Expected: [] (empty)");

console.log("\n=== Test Case 5: With duplicates in input ===");
const test5a = [1, 1, 2, 2, 3];
const test5b = [2, 2, 3, 3, 4];
console.log("Input:", test5a, test5b);
console.log("Output:", symmetricDifference(test5a, test5b));
console.log("Expected: [1, 4] (duplicates removed)");

console.log("\n=== Test Case 6: Four sets ===");
const test6 = [[1, 2, 3], [2, 3, 4], [3, 4, 5], [4, 5, 6]];
console.log("Input:", test6);
console.log("Output (multiple):", symmetricDifferenceMultiple(...test6));
console.log("Output (XOR):", symmetricDifferenceXOR(...test6));

console.log("\n=== Test Case 7: Detailed explanation ===");
symmetricDifferenceExplained([1, 2, 3, 4], [3, 4, 5, 6]);

/**
 * Complexity Analysis:
 *
 * For two sets of size n and m:
 * Time: O(n + m) - iterate through both sets once
 * Space: O(n + m) - store result set
 *
 * For k sets of average size n:
 * Time: O(k * n) - iterate through each set
 * Space: O(n) - result set size bounded by unique elements
 *
 * Key Concepts:
 * - Symmetric difference is commutative: A Δ B = B Δ A
 * - Symmetric difference is associative: (A Δ B) Δ C = A Δ (B Δ C)
 * - For multiple sets, can apply operation iteratively
 * - XOR logic: element in result if appears odd number of times
 *
 * Set Theory Formula:
 * A Δ B = (A - B) ∪ (B - A)
 *       = (A ∪ B) - (A ∩ B)
 *
 * Real-world applications:
 * - Finding differences between configurations
 * - Detecting changes between versions
 * - Finding unique items across categories
 */
