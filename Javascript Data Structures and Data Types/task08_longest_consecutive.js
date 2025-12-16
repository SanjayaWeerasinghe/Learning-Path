/**
 * Task 8: Longest Consecutive Sequence
 * Difficulty: Intermediate
 *
 * Problem Description:
 * Given an unsorted array of integers, find the length of the longest consecutive
 * elements sequence in O(n) time.
 *
 * Expected Input/Output:
 * Input: nums = [100, 4, 200, 1, 3, 2]
 * Output: 4
 * Explanation: [1, 2, 3, 4] is the longest consecutive sequence
 *
 * Input: nums = [0, 3, 7, 2, 5, 8, 4, 6, 0, 1]
 * Output: 9
 * Explanation: [0,1,2,3,4,5,6,7,8]
 *
 * Hints/Approach:
 * - Use a Set for O(1) lookups
 * - For each number, check if it's the start of a sequence (num-1 not in set)
 * - Count consecutive numbers from that starting point
 * - Avoid re-checking sequences by only starting at sequence beginnings
 */

/**
 * Main Solution: Using Set for O(n) time complexity
 *
 * Algorithm:
 * 1. Put all numbers in a Set for O(1) lookup
 * 2. For each number, check if it's the start of a sequence
 *    (A number is a start if num-1 is NOT in the set)
 * 3. If it's a start, count consecutive numbers
 * 4. Track maximum length found
 *
 * @param {number[]} nums - Array of integers
 * @returns {number} - Length of longest consecutive sequence
 */
function longestConsecutive(nums) {
    // Handle edge case
    if (nums.length === 0) return 0;

    // Create Set for O(1) lookups
    const numSet = new Set(nums);
    let maxLength = 0;

    // Iterate through each unique number
    for (const num of numSet) {
        // Check if this is the start of a sequence
        // It's a start if (num - 1) is NOT in the set
        if (!numSet.has(num - 1)) {
            // This is a sequence start, count consecutive numbers
            let currentNum = num;
            let currentLength = 1;

            // Keep incrementing while next number exists in set
            while (numSet.has(currentNum + 1)) {
                currentNum++;
                currentLength++;
            }

            // Update maximum length
            maxLength = Math.max(maxLength, currentLength);
        }
        // If not a sequence start, skip (avoid re-counting)
    }

    return maxLength;
}

/**
 * Alternative Solution: Using Set with sequence extraction
 * This version also returns the actual sequence
 *
 * @param {number[]} nums - Array of integers
 * @returns {Object} - Object with length and sequence
 */
function longestConsecutiveWithSequence(nums) {
    if (nums.length === 0) {
        return { length: 0, sequence: [] };
    }

    const numSet = new Set(nums);
    let maxLength = 0;
    let longestSequence = [];

    for (const num of numSet) {
        // Only start if this is the beginning of a sequence
        if (!numSet.has(num - 1)) {
            const sequence = [num];
            let currentNum = num;

            // Build the sequence
            while (numSet.has(currentNum + 1)) {
                currentNum++;
                sequence.push(currentNum);
            }

            // Update if this is the longest sequence
            if (sequence.length > maxLength) {
                maxLength = sequence.length;
                longestSequence = sequence;
            }
        }
    }

    return {
        length: maxLength,
        sequence: longestSequence
    };
}

/**
 * Brute Force Solution (for comparison)
 * Sort first, then find consecutive sequence
 * Time: O(n log n), Space: O(1) or O(n) depending on sort
 *
 * @param {number[]} nums - Array of integers
 * @returns {number} - Length of longest consecutive sequence
 */
function longestConsecutiveSorted(nums) {
    if (nums.length === 0) return 0;

    // Sort the array
    const sorted = [...nums].sort((a, b) => a - b);

    let maxLength = 1;
    let currentLength = 1;

    for (let i = 1; i < sorted.length; i++) {
        // Skip duplicates
        if (sorted[i] === sorted[i - 1]) {
            continue;
        }

        // Check if consecutive
        if (sorted[i] === sorted[i - 1] + 1) {
            currentLength++;
            maxLength = Math.max(maxLength, currentLength);
        } else {
            // Sequence broken, reset
            currentLength = 1;
        }
    }

    return maxLength;
}

/**
 * Detailed walkthrough function
 * Shows step-by-step how the algorithm works
 *
 * @param {number[]} nums - Array of integers
 */
function longestConsecutiveDetailed(nums) {
    console.log("Input array:", nums);

    const numSet = new Set(nums);
    console.log("Number set:", Array.from(numSet));

    let maxLength = 0;

    for (const num of numSet) {
        if (!numSet.has(num - 1)) {
            console.log(`\nStarting sequence at ${num}`);
            let currentNum = num;
            let currentLength = 1;

            while (numSet.has(currentNum + 1)) {
                currentNum++;
                currentLength++;
                console.log(`  Extended to ${currentNum}, length: ${currentLength}`);
            }

            console.log(`Sequence complete: length ${currentLength}`);
            maxLength = Math.max(maxLength, currentLength);
        }
    }

    console.log(`\nLongest consecutive sequence length: ${maxLength}`);
    return maxLength;
}

// Test cases
console.log("=== Test Case 1: Basic example ===");
const test1 = [100, 4, 200, 1, 3, 2];
console.log("nums =", test1);
console.log("Output (Set):", longestConsecutive(test1));
console.log("Output (with sequence):", longestConsecutiveWithSequence(test1));
console.log("Output (sorted):", longestConsecutiveSorted(test1));
console.log("Expected: 4 (sequence [1,2,3,4])");

console.log("\n=== Test Case 2: Long sequence ===");
const test2 = [0, 3, 7, 2, 5, 8, 4, 6, 0, 1];
console.log("nums =", test2);
console.log("Output:", longestConsecutive(test2));
console.log("Output (with sequence):", longestConsecutiveWithSequence(test2));
console.log("Expected: 9 (sequence [0,1,2,3,4,5,6,7,8])");

console.log("\n=== Test Case 3: No consecutive ===");
const test3 = [1, 3, 5, 7, 9];
console.log("nums =", test3);
console.log("Output:", longestConsecutive(test3));
console.log("Expected: 1");

console.log("\n=== Test Case 4: All consecutive ===");
const test4 = [5, 6, 7, 8, 9];
console.log("nums =", test4);
console.log("Output:", longestConsecutive(test4));
console.log("Expected: 5");

console.log("\n=== Test Case 5: Duplicates ===");
const test5 = [1, 2, 0, 1];
console.log("nums =", test5);
console.log("Output:", longestConsecutive(test5));
console.log("Expected: 3 (sequence [0,1,2])");

console.log("\n=== Test Case 6: Empty array ===");
const test6 = [];
console.log("nums =", test6);
console.log("Output:", longestConsecutive(test6));
console.log("Expected: 0");

console.log("\n=== Test Case 7: Detailed walkthrough ===");
const test7 = [10, 5, 11, 6, 7];
longestConsecutiveDetailed(test7);

/**
 * Complexity Analysis:
 *
 * Set Solution (longestConsecutive):
 * Time: O(n)
 *   - Creating Set: O(n)
 *   - Iterating through Set: O(n)
 *   - Each number visited at most twice (once as start, once in while loop)
 *   - Overall: O(n) + O(n) = O(n)
 * Space: O(n) - Set stores all unique numbers
 *
 * Sorted Solution:
 * Time: O(n log n) - dominated by sorting
 * Space: O(1) to O(n) depending on sorting implementation
 *
 * Why Set Solution is Optimal:
 * - Achieves O(n) time by avoiding re-counting sequences
 * - Key insight: only start counting from sequence beginnings
 * - Set provides O(1) lookup to check for sequence starts
 *
 * Key Insights:
 * - Don't start counting from middle of sequences
 * - Check num-1 to determine if num is a sequence start
 * - Each sequence counted exactly once
 * - Duplicates handled automatically by Set
 */
