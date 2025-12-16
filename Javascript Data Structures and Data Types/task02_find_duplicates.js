/**
 * Task 2: Find All Duplicates in Array
 * Difficulty: Intermediate
 *
 * Problem Description:
 * Given an integer array where each element appears once or twice, return an array of all
 * elements that appear twice. Solve it without using extra space (aside from the output array)
 * and in O(n) runtime.
 *
 * Expected Input/Output:
 * Input: nums = [4, 3, 2, 7, 8, 2, 3, 1]
 * Output: [2, 3]
 *
 * Input: nums = [1, 1, 2]
 * Output: [1]
 *
 * Hints/Approach:
 * - Use the array indices as a hash table
 * - Mark visited elements by negating values at their corresponding indices
 * - When you encounter a negative value, it indicates a duplicate
 * - Remember to handle 1-indexed vs 0-indexed arrays
 */

/**
 * Solution 1: Using index negation trick (O(1) space, O(n) time)
 *
 * Key Insight:
 * Since all numbers are in range [1, n], we can use array indices to mark seen numbers
 * We negate the value at index (num - 1) to mark that we've seen num
 * If we encounter a number whose corresponding index already has a negative value,
 * it means we've seen this number before - it's a duplicate!
 *
 * @param {number[]} nums - Array containing integers from 1 to n
 * @returns {number[]} - Array of duplicate numbers
 */
function findDuplicates(nums) {
    const duplicates = [];

    // Iterate through each number in the array
    for (let i = 0; i < nums.length; i++) {
        // Get the absolute value of current number
        // (it might be negative if we've already processed it)
        const num = Math.abs(nums[i]);

        // Calculate the index corresponding to this number
        // Since numbers are 1-indexed but array is 0-indexed, subtract 1
        const index = num - 1;

        // Check if the value at this index is already negative
        if (nums[index] < 0) {
            // If negative, we've seen this number before - it's a duplicate!
            duplicates.push(num);
        } else {
            // If positive, mark it as seen by negating the value at that index
            nums[index] = -nums[index];
        }
    }

    // Optional: Restore the original array (remove negations)
    // This is only needed if we want to preserve the input array
    for (let i = 0; i < nums.length; i++) {
        nums[i] = Math.abs(nums[i]);
    }

    return duplicates;
}

/**
 * Solution 2: Using a Set (uses O(n) extra space)
 * This is simpler but doesn't meet the space complexity requirement
 *
 * @param {number[]} nums - Array of numbers
 * @returns {number[]} - Array of duplicate numbers
 */
function findDuplicatesWithSet(nums) {
    const seen = new Set();      // Track numbers we've encountered
    const duplicates = new Set(); // Track duplicates (Set prevents duplicate duplicates)

    for (const num of nums) {
        // If we've seen this number before, it's a duplicate
        if (seen.has(num)) {
            duplicates.add(num);
        } else {
            // First time seeing this number
            seen.add(num);
        }
    }

    // Convert Set to Array and return
    return Array.from(duplicates);
}

/**
 * Solution 3: Using object/map as hash table (uses O(n) extra space)
 * This approach counts occurrences and returns numbers that appear exactly twice
 *
 * @param {number[]} nums - Array of numbers
 * @returns {number[]} - Array of numbers that appear exactly twice
 */
function findDuplicatesWithMap(nums) {
    const frequency = {};  // Object to store frequency of each number
    const duplicates = [];

    // Count frequency of each number
    for (const num of nums) {
        frequency[num] = (frequency[num] || 0) + 1;
    }

    // Find numbers that appear exactly twice
    for (const num in frequency) {
        if (frequency[num] === 2) {
            duplicates.push(Number(num));  // Convert string key back to number
        }
    }

    return duplicates;
}

// Test cases
console.log("=== Test Case 1 ===");
const test1 = [4, 3, 2, 7, 8, 2, 3, 1];
console.log("Input:", test1);
console.log("Duplicates (negation method):", findDuplicates([...test1]));
console.log("Duplicates (Set method):", findDuplicatesWithSet([...test1]));
console.log("Duplicates (Map method):", findDuplicatesWithMap([...test1]));
// Expected: [2, 3] or [3, 2]

console.log("\n=== Test Case 2 ===");
const test2 = [1, 1, 2];
console.log("Input:", test2);
console.log("Duplicates (negation method):", findDuplicates([...test2]));
console.log("Duplicates (Set method):", findDuplicatesWithSet([...test2]));
console.log("Duplicates (Map method):", findDuplicatesWithMap([...test2]));
// Expected: [1]

console.log("\n=== Test Case 3 (No duplicates) ===");
const test3 = [1, 2, 3, 4, 5];
console.log("Input:", test3);
console.log("Duplicates (negation method):", findDuplicates([...test3]));
console.log("Duplicates (Set method):", findDuplicatesWithSet([...test3]));
console.log("Duplicates (Map method):", findDuplicatesWithMap([...test3]));
// Expected: []

console.log("\n=== Test Case 4 (All duplicates) ===");
const test4 = [2, 2, 3, 3, 4, 4];
console.log("Input:", test4);
console.log("Duplicates (negation method):", findDuplicates([...test4]));
console.log("Duplicates (Set method):", findDuplicatesWithSet([...test4]));
console.log("Duplicates (Map method):", findDuplicatesWithMap([...test4]));
// Expected: [2, 3, 4]

/**
 * Complexity Analysis:
 *
 * Solution 1 (Index Negation):
 * Time: O(n) - single pass through array
 * Space: O(1) - only output array, no extra data structures
 *
 * Solution 2 (Set):
 * Time: O(n) - single pass through array
 * Space: O(n) - Set can contain up to n elements
 *
 * Solution 3 (Map/Object):
 * Time: O(n) - one pass to count, one pass to find duplicates
 * Space: O(n) - frequency map can have up to n entries
 */
