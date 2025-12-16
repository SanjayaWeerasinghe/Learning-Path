/**
 * Task 3: Merge Overlapping Intervals
 * Difficulty: Intermediate
 *
 * Problem Description:
 * Given an array of intervals where intervals[i] = [start_i, end_i], merge all overlapping
 * intervals and return an array of non-overlapping intervals.
 *
 * Expected Input/Output:
 * Input: intervals = [[1,3], [2,6], [8,10], [15,18]]
 * Output: [[1,6], [8,10], [15,18]]
 * Explanation: [1,3] and [2,6] overlap, so they merge into [1,6]
 *
 * Input: intervals = [[1,4], [4,5]]
 * Output: [[1,5]]
 * Explanation: Intervals that touch at boundaries should also be merged
 *
 * Hints/Approach:
 * - Sort intervals by start time first
 * - Iterate through sorted intervals and merge when current interval overlaps with previous
 * - An interval overlaps if: currentStart <= previousEnd
 * - Time complexity: O(n log n) due to sorting
 */

/**
 * Main solution: Merge overlapping intervals
 *
 * Algorithm:
 * 1. Sort intervals by their start time
 * 2. Initialize result with first interval
 * 3. For each subsequent interval:
 *    - If it overlaps with the last interval in result, merge them
 *    - Otherwise, add it as a new interval
 *
 * @param {number[][]} intervals - Array of intervals [start, end]
 * @returns {number[][]} - Array of merged non-overlapping intervals
 */
function mergeIntervals(intervals) {
    // Handle edge cases
    if (!intervals || intervals.length === 0) {
        return [];
    }

    if (intervals.length === 1) {
        return intervals;
    }

    // Step 1: Sort intervals by start time (first element of each interval)
    // If start times are equal, sort by end time
    intervals.sort((a, b) => {
        if (a[0] === b[0]) {
            return a[1] - b[1];  // If starts are equal, sort by end
        }
        return a[0] - b[0];      // Otherwise, sort by start
    });

    // Step 2: Initialize result array with the first interval
    const merged = [intervals[0]];

    // Step 3: Iterate through remaining intervals
    for (let i = 1; i < intervals.length; i++) {
        const currentInterval = intervals[i];
        const lastMergedInterval = merged[merged.length - 1];

        // Get boundaries of both intervals
        const currentStart = currentInterval[0];
        const currentEnd = currentInterval[1];
        const lastStart = lastMergedInterval[0];
        const lastEnd = lastMergedInterval[1];

        // Check if intervals overlap or touch
        // They overlap if: current starts before or when last ends
        if (currentStart <= lastEnd) {
            // Intervals overlap - merge them
            // The new end is the maximum of both ends
            lastMergedInterval[1] = Math.max(lastEnd, currentEnd);
        } else {
            // No overlap - add current interval as a new separate interval
            merged.push(currentInterval);
        }
    }

    return merged;
}

/**
 * Alternative solution with more verbose logic
 * This version makes the overlap condition more explicit
 *
 * @param {number[][]} intervals - Array of intervals
 * @returns {number[][]} - Merged intervals
 */
function mergeIntervalsVerbose(intervals) {
    if (!intervals || intervals.length <= 1) {
        return intervals;
    }

    // Sort by start time
    intervals.sort((a, b) => a[0] - b[0]);

    const result = [];
    let current = intervals[0];  // Start with first interval

    for (let i = 1; i < intervals.length; i++) {
        const next = intervals[i];

        // Check if current and next overlap
        // Overlapping conditions:
        // 1. Next starts before current ends: next[0] <= current[1]
        // 2. Next starts exactly when current ends: next[0] === current[1]
        const doOverlap = next[0] <= current[1];

        if (doOverlap) {
            // Merge: extend current interval's end to maximum of both ends
            current[1] = Math.max(current[1], next[1]);
        } else {
            // No overlap: save current interval and move to next
            result.push(current);
            current = next;
        }
    }

    // Don't forget to add the last interval
    result.push(current);

    return result;
}

/**
 * Helper function to visualize intervals
 * @param {number[][]} intervals - Array of intervals
 * @returns {string} - String representation of intervals
 */
function visualizeIntervals(intervals) {
    return intervals.map(([start, end]) => `[${start},${end}]`).join(', ');
}

// Test cases
console.log("=== Test Case 1: Basic overlapping intervals ===");
const test1 = [[1, 3], [2, 6], [8, 10], [15, 18]];
console.log("Input: ", visualizeIntervals(test1));
console.log("Output:", visualizeIntervals(mergeIntervals(test1)));
console.log("Expected: [1,6], [8,10], [15,18]");
// Explanation: [1,3] and [2,6] overlap → merge to [1,6]

console.log("\n=== Test Case 2: Touching intervals ===");
const test2 = [[1, 4], [4, 5]];
console.log("Input: ", visualizeIntervals(test2));
console.log("Output:", visualizeIntervals(mergeIntervals(test2)));
console.log("Expected: [1,5]");
// Explanation: Intervals touching at boundary (4) should merge

console.log("\n=== Test Case 3: All overlapping ===");
const test3 = [[1, 4], [2, 5], [3, 6]];
console.log("Input: ", visualizeIntervals(test3));
console.log("Output:", visualizeIntervals(mergeIntervals(test3)));
console.log("Expected: [1,6]");
// Explanation: All intervals overlap into one

console.log("\n=== Test Case 4: No overlapping ===");
const test4 = [[1, 2], [3, 4], [5, 6]];
console.log("Input: ", visualizeIntervals(test4));
console.log("Output:", visualizeIntervals(mergeIntervals(test4)));
console.log("Expected: [1,2], [3,4], [5,6]");
// Explanation: No intervals overlap

console.log("\n=== Test Case 5: Unsorted with overlaps ===");
const test5 = [[2, 3], [4, 5], [6, 7], [8, 9], [1, 10]];
console.log("Input: ", visualizeIntervals(test5));
console.log("Output:", visualizeIntervals(mergeIntervals(test5)));
console.log("Expected: [1,10]");
// Explanation: [1,10] covers all other intervals

console.log("\n=== Test Case 6: Nested intervals ===");
const test6 = [[1, 10], [2, 6], [3, 5]];
console.log("Input: ", visualizeIntervals(test6));
console.log("Output:", visualizeIntervals(mergeIntervals(test6)));
console.log("Expected: [1,10]");
// Explanation: Smaller intervals are contained within [1,10]

/**
 * Complexity Analysis:
 *
 * Time Complexity: O(n log n)
 * - Sorting takes O(n log n)
 * - Merging takes O(n) as we iterate once through sorted array
 * - Overall: O(n log n) + O(n) = O(n log n)
 *
 * Space Complexity: O(n)
 * - Result array can contain up to n intervals (worst case: no overlaps)
 * - Sorting might use O(log n) or O(n) space depending on implementation
 *
 * Key Insights:
 * - Sorting is crucial for efficient merging
 * - After sorting, we only need to check consecutive intervals
 * - We merge by extending the end of current interval
 * - Edge cases: empty array, single interval, touching intervals
 */
