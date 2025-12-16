/**
 * Task 1: Rotate Array
 * Difficulty: Beginner
 *
 * Problem Description:
 * Write a function that rotates an array to the right by k steps, where k is non-negative.
 * For example, rotating [1, 2, 3, 4, 5] by 2 steps results in [4, 5, 1, 2, 3].
 *
 * Expected Input/Output:
 * Input: nums = [1, 2, 3, 4, 5, 6, 7], k = 3
 * Output: [5, 6, 7, 1, 2, 3, 4]
 *
 * Input: nums = [-1, -100, 3, 99], k = 2
 * Output: [3, 99, -1, -100]
 *
 * Hints/Approach:
 * - Consider using array slicing methods
 * - Handle cases where k is greater than array length (use modulo operator)
 * - Alternative approach: reverse the array in parts
 * - Time complexity goal: O(n)
 */

/**
 * Solution 1: Using Array Slicing
 * This is the most straightforward approach using JavaScript array methods
 *
 * @param {number[]} nums - The input array to rotate
 * @param {number} k - Number of steps to rotate right
 * @returns {number[]} - The rotated array
 */
function rotateArray(nums, k) {
    // Handle edge case: empty array or no rotation needed
    if (nums.length === 0 || k === 0) {
        return nums;
    }

    // Handle cases where k is greater than array length
    // If array has 5 elements and k = 7, it's the same as k = 2
    k = k % nums.length;

    // If k is still 0 after modulo, no rotation needed
    if (k === 0) {
        return nums;
    }

    // Slice the array into two parts:
    // 1. Elements from (length - k) to end -> these move to front
    // 2. Elements from start to (length - k) -> these move to back
    // Then concatenate them in reverse order
    const rotatedPart = nums.slice(-k);      // Last k elements
    const remainingPart = nums.slice(0, -k);  // First (n-k) elements

    return [...rotatedPart, ...remainingPart];
}

/**
 * Solution 2: In-place rotation using array reversal
 * This approach modifies the original array
 *
 * Algorithm:
 * 1. Reverse entire array
 * 2. Reverse first k elements
 * 3. Reverse remaining elements
 *
 * Example: [1,2,3,4,5], k=2
 * Step 1: [5,4,3,2,1]
 * Step 2: [4,5,3,2,1]
 * Step 3: [4,5,1,2,3]
 *
 * @param {number[]} nums - The input array to rotate (modified in place)
 * @param {number} k - Number of steps to rotate right
 */
function rotateArrayInPlace(nums, k) {
    // Handle edge cases
    if (nums.length === 0 || k === 0) {
        return;
    }

    // Normalize k to be within array bounds
    k = k % nums.length;

    if (k === 0) {
        return;
    }

    /**
     * Helper function to reverse array elements between start and end indices
     * @param {number[]} arr - Array to reverse
     * @param {number} start - Starting index
     * @param {number} end - Ending index
     */
    function reverse(arr, start, end) {
        while (start < end) {
            // Swap elements at start and end positions
            [arr[start], arr[end]] = [arr[end], arr[start]];
            start++;
            end--;
        }
    }

    const n = nums.length;

    // Step 1: Reverse the entire array
    reverse(nums, 0, n - 1);

    // Step 2: Reverse the first k elements
    reverse(nums, 0, k - 1);

    // Step 3: Reverse the remaining elements
    reverse(nums, k, n - 1);
}

// Test cases
console.log("=== Test Case 1 ===");
const test1 = [1, 2, 3, 4, 5, 6, 7];
console.log("Original:", test1);
console.log("Rotated by 3 (slice method):", rotateArray(test1, 3));
// Expected: [5, 6, 7, 1, 2, 3, 4]

console.log("\n=== Test Case 2 ===");
const test2 = [-1, -100, 3, 99];
console.log("Original:", test2);
console.log("Rotated by 2 (slice method):", rotateArray(test2, 2));
// Expected: [3, 99, -1, -100]

console.log("\n=== Test Case 3 (k > array length) ===");
const test3 = [1, 2, 3, 4, 5];
console.log("Original:", test3);
console.log("Rotated by 7 (slice method):", rotateArray(test3, 7));
// Expected: [4, 5, 1, 2, 3] (same as k=2)

console.log("\n=== Test Case 4 (In-place rotation) ===");
const test4 = [1, 2, 3, 4, 5, 6, 7];
console.log("Original:", test4);
rotateArrayInPlace(test4, 3);
console.log("After in-place rotation by 3:", test4);
// Expected: [5, 6, 7, 1, 2, 3, 4]

console.log("\n=== Test Case 5 (Edge case: k = 0) ===");
const test5 = [1, 2, 3];
console.log("Original:", test5);
console.log("Rotated by 0:", rotateArray(test5, 0));
// Expected: [1, 2, 3]

/**
 * Time Complexity Analysis:
 * - Slice method: O(n) - creating new arrays
 * - In-place method: O(n) - three passes through the array
 *
 * Space Complexity Analysis:
 * - Slice method: O(n) - new array created
 * - In-place method: O(1) - only swaps elements
 */
