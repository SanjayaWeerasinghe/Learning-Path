/**
 * Task 7: Two Sum Using Hash Map
 * Difficulty: Beginner
 *
 * Problem Description:
 * Given an array of integers and a target sum, return the indices of two numbers
 * that add up to the target. Each input has exactly one solution, and you cannot
 * use the same element twice.
 *
 * Expected Input/Output:
 * Input: nums = [2, 7, 11, 15], target = 9
 * Output: [0, 1]
 *
 * Input: nums = [3, 2, 4], target = 6
 * Output: [1, 2]
 *
 * Hints/Approach:
 * - Use a Map to store visited numbers and their indices
 * - For each number, check if (target - number) exists in the map
 * - If found, return both indices
 * - Time complexity: O(n), Space complexity: O(n)
 */

/**
 * Solution 1: Using Map (Hash Map approach)
 *
 * Algorithm:
 * 1. Create a Map to store numbers we've seen and their indices
 * 2. For each number, calculate complement = target - current number
 * 3. If complement exists in Map, we found the pair!
 * 4. Otherwise, add current number to Map and continue
 *
 * @param {number[]} nums - Array of integers
 * @param {number} target - Target sum
 * @returns {number[]} - Indices of two numbers that sum to target
 */
function twoSum(nums, target) {
    // Map to store: number → its index
    const numMap = new Map();

    // Iterate through array
    for (let i = 0; i < nums.length; i++) {
        const currentNum = nums[i];
        const complement = target - currentNum;

        // Check if complement exists in map
        if (numMap.has(complement)) {
            // Found the pair! Return indices
            return [numMap.get(complement), i];
        }

        // Add current number and its index to map
        numMap.set(currentNum, i);
    }

    // No solution found (shouldn't happen per problem statement)
    return [];
}

/**
 * Solution 2: Using Object instead of Map
 * Similar approach but with plain JavaScript object
 *
 * @param {number[]} nums - Array of integers
 * @param {number} target - Target sum
 * @returns {number[]} - Indices of two numbers
 */
function twoSumObject(nums, target) {
    const numObj = {};

    for (let i = 0; i < nums.length; i++) {
        const complement = target - nums[i];

        // Check if complement exists in object
        if (complement in numObj) {
            return [numObj[complement], i];
        }

        // Store current number and index
        numObj[nums[i]] = i;
    }

    return [];
}

/**
 * Solution 3: Brute Force (for comparison)
 * Check every pair of numbers
 * Time: O(n²), Space: O(1)
 *
 * @param {number[]} nums - Array of integers
 * @param {number} target - Target sum
 * @returns {number[]} - Indices of two numbers
 */
function twoSumBruteForce(nums, target) {
    // Try every pair
    for (let i = 0; i < nums.length; i++) {
        for (let j = i + 1; j < nums.length; j++) {
            if (nums[i] + nums[j] === target) {
                return [i, j];
            }
        }
    }

    return [];
}

/**
 * Bonus: Return all pairs that sum to target (allows duplicates)
 *
 * @param {number[]} nums - Array of integers
 * @param {number} target - Target sum
 * @returns {number[][]} - Array of index pairs
 */
function twoSumAllPairs(nums, target) {
    const result = [];
    const seen = new Map();

    for (let i = 0; i < nums.length; i++) {
        const complement = target - nums[i];

        // If complement exists, add all its indices as pairs
        if (seen.has(complement)) {
            for (const index of seen.get(complement)) {
                result.push([index, i]);
            }
        }

        // Add current number and index to seen map
        if (!seen.has(nums[i])) {
            seen.set(nums[i], []);
        }
        seen.get(nums[i]).push(i);
    }

    return result;
}

// Test cases
console.log("=== Test Case 1: Basic example ===");
const test1 = [2, 7, 11, 15];
const target1 = 9;
console.log(`nums = [${test1}], target = ${target1}`);
console.log("Output (Map):", twoSum(test1, target1));
console.log("Output (Object):", twoSumObject(test1, target1));
console.log("Output (Brute Force):", twoSumBruteForce(test1, target1));
console.log("Expected: [0, 1]");

console.log("\n=== Test Case 2: Different indices ===");
const test2 = [3, 2, 4];
const target2 = 6;
console.log(`nums = [${test2}], target = ${target2}`);
console.log("Output:", twoSum(test2, target2));
console.log("Expected: [1, 2]");

console.log("\n=== Test Case 3: Negative numbers ===");
const test3 = [-1, -2, -3, -4, -5];
const target3 = -8;
console.log(`nums = [${test3}], target = ${target3}`);
console.log("Output:", twoSum(test3, target3));
console.log("Expected: [2, 4] (indices of -3 and -5)");

console.log("\n=== Test Case 4: Zero sum ===");
const test4 = [-3, 4, 3, 90];
const target4 = 0;
console.log(`nums = [${test4}], target = ${target4}`);
console.log("Output:", twoSum(test4, target4));
console.log("Expected: [0, 2] (indices of -3 and 3)");

console.log("\n=== Test Case 5: Duplicates exist ===");
const test5 = [3, 3];
const target5 = 6;
console.log(`nums = [${test5}], target = ${target5}`);
console.log("Output:", twoSum(test5, target5));
console.log("Expected: [0, 1]");

console.log("\n=== Test Case 6: All pairs (bonus) ===");
const test6 = [1, 2, 3, 4, 3];
const target6 = 6;
console.log(`nums = [${test6}], target = ${target6}`);
console.log("All pairs:", twoSumAllPairs(test6, target6));
console.log("Expected: [[1,3], [2,4]] (2+4=6, 3+3=6)");

/**
 * Complexity Analysis:
 *
 * Hash Map Solution (twoSum):
 * Time: O(n) - single pass through array
 * Space: O(n) - map can store up to n elements
 *
 * Brute Force Solution:
 * Time: O(n²) - nested loops check all pairs
 * Space: O(1) - no extra data structures
 *
 * Why Hash Map is Better:
 * - Much faster for large arrays
 * - Trade space for time
 * - Optimal solution for this problem
 *
 * Key Insights:
 * - Instead of searching for pair sum, search for complement
 * - Map allows O(1) lookups instead of O(n) array search
 * - One pass is sufficient with proper data structure
 */
