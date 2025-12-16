/**
 * Task 18: Find Middle of Linked List
 * Difficulty: Beginner
 *
 * Problem Description:
 * Given the head of a singly linked list, return the middle node.
 * If there are two middle nodes (even length), return the second one.
 *
 * Expected Input/Output:
 * Input: head = [1,2,3,4,5]
 * Output: node with value 3
 *
 * Input: head = [1,2,3,4,5,6]
 * Output: node with value 4
 *
 * Hints/Approach:
 * - Use fast and slow pointer technique
 * - Slow moves one step, fast moves two steps
 * - When fast reaches end, slow is at middle
 * - Time: O(n), Space: O(1)
 */

// Node class for linked list
class ListNode {
    constructor(value) {
        this.value = value;
        this.next = null;
    }
}

/**
 * Solution 1: Fast and Slow Pointer (Two Pointer Technique)
 * Most efficient approach
 *
 * @param {ListNode} head - Head of the linked list
 * @returns {ListNode} - Middle node
 */
function findMiddle(head) {
    // Edge cases
    if (!head) {
        return null;
    }

    if (!head.next) {
        return head; // Single node
    }

    // Initialize both pointers at head
    let slow = head;
    let fast = head;

    // Move slow by 1, fast by 2
    // When fast reaches end, slow is at middle
    while (fast && fast.next) {
        slow = slow.next;
        fast = fast.next.next;
    }

    return slow;
}

/**
 * Solution 2: Two-Pass Approach
 * Count nodes, then traverse to middle
 *
 * @param {ListNode} head - Head of linked list
 * @returns {ListNode} - Middle node
 */
function findMiddleTwoPass(head) {
    if (!head) {
        return null;
    }

    // First pass: count nodes
    let length = 0;
    let current = head;
    while (current) {
        length++;
        current = current.next;
    }

    // Calculate middle index
    const middleIndex = Math.floor(length / 2);

    // Second pass: traverse to middle
    current = head;
    for (let i = 0; i < middleIndex; i++) {
        current = current.next;
    }

    return current;
}

/**
 * Solution 3: Using Array
 * Convert to array first (easier but uses extra space)
 *
 * @param {ListNode} head - Head of linked list
 * @returns {ListNode} - Middle node
 */
function findMiddleArray(head) {
    if (!head) {
        return null;
    }

    // Convert to array
    const nodes = [];
    let current = head;
    while (current) {
        nodes.push(current);
        current = current.next;
    }

    // Return middle element
    return nodes[Math.floor(nodes.length / 2)];
}

/**
 * Enhanced: Find middle and return both value and index
 *
 * @param {ListNode} head - Head of linked list
 * @returns {object} - Middle node info
 */
function findMiddleDetailed(head) {
    if (!head) {
        return { node: null, index: -1, value: null, isSecondMiddle: false };
    }

    let slow = head;
    let fast = head;
    let index = 0;

    while (fast && fast.next) {
        slow = slow.next;
        fast = fast.next.next;
        index++;
    }

    // Check if even length (two middle nodes)
    const isEvenLength = fast === null;

    return {
        node: slow,
        index: index,
        value: slow.value,
        isSecondMiddle: isEvenLength
    };
}

/**
 * Variation: Delete middle node
 *
 * @param {ListNode} head - Head of linked list
 * @returns {ListNode} - New head after deletion
 */
function deleteMiddle(head) {
    // Edge cases
    if (!head || !head.next) {
        return null; // Empty or single node
    }

    let slow = head;
    let fast = head;
    let prev = null;

    // Find middle with previous pointer
    while (fast && fast.next) {
        prev = slow;
        slow = slow.next;
        fast = fast.next.next;
    }

    // Delete middle node
    if (prev) {
        prev.next = slow.next;
    }

    return head;
}

/**
 * Variation: Split list at middle
 *
 * @param {ListNode} head - Head of linked list
 * @returns {Array} - [firstHalf, secondHalf]
 */
function splitAtMiddle(head) {
    if (!head) {
        return [null, null];
    }

    if (!head.next) {
        return [head, null];
    }

    let slow = head;
    let fast = head;
    let prev = null;

    while (fast && fast.next) {
        prev = slow;
        slow = slow.next;
        fast = fast.next.next;
    }

    // Break the link
    if (prev) {
        prev.next = null;
    }

    return [head, slow];
}

/**
 * Helper: Create linked list from array
 */
function createList(values) {
    if (values.length === 0) {
        return null;
    }

    const head = new ListNode(values[0]);
    let current = head;

    for (let i = 1; i < values.length; i++) {
        current.next = new ListNode(values[i]);
        current = current.next;
    }

    return head;
}

/**
 * Helper: Convert list to array
 */
function toArray(head) {
    const arr = [];
    let current = head;
    while (current) {
        arr.push(current.value);
        current = current.next;
    }
    return arr;
}

// Test cases
console.log("=== Test Case 1: Odd Length List ===");
const list1 = createList([1, 2, 3, 4, 5]);
const middle1 = findMiddle(list1);
console.log("List:", toArray(list1));
console.log("Middle value:", middle1.value); // 3
console.log("Middle index: 2 (0-indexed)");

console.log("\n=== Test Case 2: Even Length List ===");
const list2 = createList([1, 2, 3, 4, 5, 6]);
const middle2 = findMiddle(list2);
console.log("List:", toArray(list2));
console.log("Middle value:", middle2.value); // 4 (second of two middles)
console.log("Middle index: 3 (0-indexed)");

console.log("\n=== Test Case 3: Single Node ===");
const list3 = createList([42]);
const middle3 = findMiddle(list3);
console.log("List:", toArray(list3));
console.log("Middle value:", middle3.value); // 42

console.log("\n=== Test Case 4: Two Nodes ===");
const list4 = createList([1, 2]);
const middle4 = findMiddle(list4);
console.log("List:", toArray(list4));
console.log("Middle value:", middle4.value); // 2

console.log("\n=== Test Case 5: Empty List ===");
const list5 = null;
const middle5 = findMiddle(list5);
console.log("Middle value:", middle5); // null

console.log("\n=== Test Case 6: Detailed Middle Info ===");
const list6 = createList([1, 2, 3, 4, 5, 6]);
const detailedInfo = findMiddleDetailed(list6);
console.log("List:", toArray(list6));
console.log("Detailed info:", detailedInfo);

console.log("\n=== Test Case 7: Delete Middle ===");
const list7 = createList([1, 2, 3, 4, 5]);
console.log("Before delete:", toArray(list7));
deleteMiddle(list7);
console.log("After delete:", toArray(list7)); // [1, 2, 4, 5]

console.log("\n=== Test Case 8: Split at Middle ===");
const list8 = createList([1, 2, 3, 4, 5, 6]);
const [first, second] = splitAtMiddle(list8);
console.log("Original:", [1, 2, 3, 4, 5, 6]);
console.log("First half:", toArray(first)); // [1, 2, 3]
console.log("Second half:", toArray(second)); // [4, 5, 6]

console.log("\n=== Test Case 9: Method Comparison ===");
const list9 = createList([10, 20, 30, 40, 50, 60, 70]);
console.log("List:", toArray(list9));
console.log("Fast-Slow method:", findMiddle(list9).value);
console.log("Two-pass method:", findMiddleTwoPass(list9).value);
console.log("Array method:", findMiddleArray(list9).value);

console.log("\n=== Test Case 10: Performance Test ===");
const largeList = createList(Array.from({ length: 10000 }, (_, i) => i));

console.time("Fast-Slow Pointer");
findMiddle(largeList);
console.timeEnd("Fast-Slow Pointer");

console.time("Two-Pass Method");
findMiddleTwoPass(largeList);
console.timeEnd("Two-Pass Method");

console.time("Array Method");
findMiddleArray(largeList);
console.timeEnd("Array Method");

/**
 * Time Complexity Analysis:
 *
 * Fast-Slow Pointer:
 * - Time: O(n/2) ≈ O(n) - traverse half the list
 * - Space: O(1) - only two pointers
 * - Single pass through the list
 *
 * Two-Pass Method:
 * - Time: O(n) + O(n/2) ≈ O(n) - count all, traverse half
 * - Space: O(1) - only counter and pointer
 * - Two passes needed
 *
 * Array Method:
 * - Time: O(n) - convert to array
 * - Space: O(n) - store all nodes in array
 * - Easiest to understand but uses extra space
 *
 * Why Fast-Slow Pointer Works:
 * - Fast pointer moves twice as fast as slow pointer
 * - When fast reaches end, slow is at middle
 * - For odd length: fast lands on last node
 * - For even length: fast lands on null
 *
 * Key Insights:
 * - Fast-slow pointer is optimal: single pass, constant space
 * - Works perfectly for finding middle in one traversal
 * - No need to know length beforehand
 * - Can be adapted for other fraction points (1/3, 1/4, etc.)
 *
 * Real-world Applications:
 * - Binary search on linked list
 * - Merge sort on linked list (divide step)
 * - Palindrome checking (compare two halves)
 * - Finding nodes at specific fractions
 * - List partitioning algorithms
 *
 * Variations:
 * - Find node at 1/3 position (slow moves 1, fast moves 3)
 * - Find node at 1/4 position (slow moves 1, fast moves 4)
 * - Find first middle in even-length list (adjust condition)
 */
