/**
 * Task 19: Merge Two Sorted Linked Lists
 * Difficulty: Intermediate
 *
 * Problem Description:
 * Merge two sorted linked lists into one sorted list. The new list should be
 * made by splicing together nodes from the two lists.
 *
 * Expected Input/Output:
 * Input: list1 = [1,2,4], list2 = [1,3,4]
 * Output: [1,1,2,3,4,4]
 *
 * Input: list1 = [], list2 = [0]
 * Output: [0]
 *
 * Hints/Approach:
 * - Use a dummy head node to simplify edge cases
 * - Compare values from both lists and attach smaller node
 * - Continue until one list is exhausted
 * - Attach remaining nodes from non-empty list
 * - Can be done recursively or iteratively
 */

// Node class for linked list
class ListNode {
    constructor(value) {
        this.value = value;
        this.next = null;
    }
}

/**
 * Solution 1: Iterative Approach with Dummy Node
 * Most efficient and commonly used approach
 *
 * @param {ListNode} list1 - Head of first sorted list
 * @param {ListNode} list2 - Head of second sorted list
 * @returns {ListNode} - Head of merged sorted list
 */
function mergeTwoLists(list1, list2) {
    // Create a dummy node to simplify edge cases
    const dummy = new ListNode(0);
    let current = dummy;

    // Traverse both lists
    while (list1 && list2) {
        if (list1.value <= list2.value) {
            // Attach node from list1
            current.next = list1;
            list1 = list1.next;
        } else {
            // Attach node from list2
            current.next = list2;
            list2 = list2.next;
        }
        current = current.next;
    }

    // Attach remaining nodes (at most one list has remaining nodes)
    if (list1) {
        current.next = list1;
    } else if (list2) {
        current.next = list2;
    }

    // Return head (skip dummy node)
    return dummy.next;
}

/**
 * Solution 2: Recursive Approach
 * Elegant but uses O(n) call stack space
 *
 * @param {ListNode} list1 - Head of first sorted list
 * @param {ListNode} list2 - Head of second sorted list
 * @returns {ListNode} - Head of merged sorted list
 */
function mergeTwoListsRecursive(list1, list2) {
    // Base cases
    if (!list1) return list2;
    if (!list2) return list1;

    // Compare current nodes and recurse
    if (list1.value <= list2.value) {
        list1.next = mergeTwoListsRecursive(list1.next, list2);
        return list1;
    } else {
        list2.next = mergeTwoListsRecursive(list1, list2.next);
        return list2;
    }
}

/**
 * Solution 3: In-place Merge Without Dummy Node
 * Saves one extra node but slightly more complex
 *
 * @param {ListNode} list1 - Head of first sorted list
 * @param {ListNode} list2 - Head of second sorted list
 * @returns {ListNode} - Head of merged sorted list
 */
function mergeTwoListsNoDummy(list1, list2) {
    // Handle edge cases
    if (!list1) return list2;
    if (!list2) return list1;

    // Determine head
    let head, current;
    if (list1.value <= list2.value) {
        head = list1;
        list1 = list1.next;
    } else {
        head = list2;
        list2 = list2.next;
    }

    current = head;

    // Merge remaining nodes
    while (list1 && list2) {
        if (list1.value <= list2.value) {
            current.next = list1;
            list1 = list1.next;
        } else {
            current.next = list2;
            list2 = list2.next;
        }
        current = current.next;
    }

    // Attach remaining
    current.next = list1 || list2;

    return head;
}

/**
 * Extension: Merge K Sorted Lists
 * Uses divide and conquer approach
 *
 * @param {ListNode[]} lists - Array of sorted lists
 * @returns {ListNode} - Merged sorted list
 */
function mergeKLists(lists) {
    if (!lists || lists.length === 0) {
        return null;
    }

    // Divide and conquer
    while (lists.length > 1) {
        const mergedLists = [];

        // Merge pairs
        for (let i = 0; i < lists.length; i += 2) {
            const list1 = lists[i];
            const list2 = i + 1 < lists.length ? lists[i + 1] : null;
            mergedLists.push(mergeTwoLists(list1, list2));
        }

        lists = mergedLists;
    }

    return lists[0];
}

/**
 * Extension: Merge with Custom Comparator
 * Allows merging with custom comparison logic
 *
 * @param {ListNode} list1 - First list
 * @param {ListNode} list2 - Second list
 * @param {Function} compareFn - Comparison function
 * @returns {ListNode} - Merged list
 */
function mergeWithComparator(list1, list2, compareFn = (a, b) => a <= b) {
    const dummy = new ListNode(0);
    let current = dummy;

    while (list1 && list2) {
        if (compareFn(list1.value, list2.value)) {
            current.next = list1;
            list1 = list1.next;
        } else {
            current.next = list2;
            list2 = list2.next;
        }
        current = current.next;
    }

    current.next = list1 || list2;
    return dummy.next;
}

/**
 * Helper: Create linked list from array
 */
function createList(values) {
    if (!values || values.length === 0) {
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
console.log("=== Test Case 1: Two Non-Empty Lists ===");
const list1 = createList([1, 2, 4]);
const list2 = createList([1, 3, 4]);
const merged1 = mergeTwoLists(list1, list2);
console.log("List 1:", [1, 2, 4]);
console.log("List 2:", [1, 3, 4]);
console.log("Merged:", toArray(merged1)); // [1, 1, 2, 3, 4, 4]

console.log("\n=== Test Case 2: One Empty List ===");
const list3 = createList([]);
const list4 = createList([0]);
const merged2 = mergeTwoLists(list3, list4);
console.log("List 1:", []);
console.log("List 2:", [0]);
console.log("Merged:", toArray(merged2)); // [0]

console.log("\n=== Test Case 3: Both Empty ===");
const list5 = createList([]);
const list6 = createList([]);
const merged3 = mergeTwoLists(list5, list6);
console.log("List 1:", []);
console.log("List 2:", []);
console.log("Merged:", toArray(merged3)); // []

console.log("\n=== Test Case 4: Different Lengths ===");
const list7 = createList([1, 3, 5, 7, 9]);
const list8 = createList([2, 4]);
const merged4 = mergeTwoLists(list7, list8);
console.log("List 1:", [1, 3, 5, 7, 9]);
console.log("List 2:", [2, 4]);
console.log("Merged:", toArray(merged4)); // [1, 2, 3, 4, 5, 7, 9]

console.log("\n=== Test Case 5: No Overlap ===");
const list9 = createList([1, 2, 3]);
const list10 = createList([4, 5, 6]);
const merged5 = mergeTwoLists(list9, list10);
console.log("List 1:", [1, 2, 3]);
console.log("List 2:", [4, 5, 6]);
console.log("Merged:", toArray(merged5)); // [1, 2, 3, 4, 5, 6]

console.log("\n=== Test Case 6: Recursive Approach ===");
const list11 = createList([1, 2, 4]);
const list12 = createList([1, 3, 4]);
const merged6 = mergeTwoListsRecursive(list11, list12);
console.log("Recursive merge:", toArray(merged6)); // [1, 1, 2, 3, 4, 4]

console.log("\n=== Test Case 7: Merge K Lists ===");
const lists = [
    createList([1, 4, 5]),
    createList([1, 3, 4]),
    createList([2, 6])
];
const mergedK = mergeKLists(lists);
console.log("List 1:", [1, 4, 5]);
console.log("List 2:", [1, 3, 4]);
console.log("List 3:", [2, 6]);
console.log("Merged K lists:", toArray(mergedK)); // [1, 1, 2, 3, 4, 4, 5, 6]

console.log("\n=== Test Case 8: Custom Comparator (Descending) ===");
const list13 = createList([5, 3, 1]);
const list14 = createList([4, 2]);
const merged7 = mergeWithComparator(list13, list14, (a, b) => a >= b);
console.log("List 1 (desc):", [5, 3, 1]);
console.log("List 2 (desc):", [4, 2]);
console.log("Merged (desc):", toArray(merged7)); // [5, 4, 3, 2, 1]

console.log("\n=== Test Case 9: Merge with Objects ===");
const objList1 = createList([
    { id: 1, name: 'Alice' },
    { id: 3, name: 'Charlie' }
]);
const objList2 = createList([
    { id: 2, name: 'Bob' },
    { id: 4, name: 'David' }
]);
const merged8 = mergeWithComparator(
    objList1,
    objList2,
    (a, b) => a.id <= b.id
);
console.log("Merged objects:", toArray(merged8));

console.log("\n=== Test Case 10: Performance Comparison ===");
const largeList1 = createList(Array.from({ length: 5000 }, (_, i) => i * 2));
const largeList2 = createList(Array.from({ length: 5000 }, (_, i) => i * 2 + 1));

console.time("Iterative Merge");
mergeTwoLists(
    createList(Array.from({ length: 5000 }, (_, i) => i * 2)),
    createList(Array.from({ length: 5000 }, (_, i) => i * 2 + 1))
);
console.timeEnd("Iterative Merge");

console.time("Recursive Merge");
mergeTwoListsRecursive(
    createList(Array.from({ length: 5000 }, (_, i) => i * 2)),
    createList(Array.from({ length: 5000 }, (_, i) => i * 2 + 1))
);
console.timeEnd("Recursive Merge");

/**
 * Time Complexity Analysis:
 *
 * Iterative Approach:
 * - Time: O(n + m) where n, m are lengths of the two lists
 * - Space: O(1) - only uses pointers
 * - Single pass through both lists
 *
 * Recursive Approach:
 * - Time: O(n + m)
 * - Space: O(n + m) - call stack depth
 * - More elegant but uses extra space
 *
 * Merge K Lists:
 * - Time: O(N log k) where N is total nodes, k is number of lists
 * - Space: O(1) for iterative merging
 * - Divide and conquer reduces comparisons
 *
 * Space Complexity Comparison:
 * - Iterative: O(1) - constant space
 * - Recursive: O(n) - stack space
 *
 * Key Insights:
 * - Dummy node simplifies edge case handling
 * - Both lists are already sorted, just need to interleave
 * - No need to create new nodes, just relink existing ones
 * - Remaining nodes can be attached directly
 *
 * Algorithm Steps:
 * 1. Create dummy node as starting point
 * 2. Compare current nodes from both lists
 * 3. Attach smaller node to result
 * 4. Move forward in that list
 * 5. Repeat until one list is exhausted
 * 6. Attach remaining nodes from other list
 *
 * Real-world Applications:
 * - Merge sort implementation
 * - Combining sorted data from multiple sources
 * - Database join operations
 * - Priority queue implementations
 * - External sorting (merging disk files)
 * - Version control (merging sorted commits)
 *
 * Common Mistakes:
 * - Forgetting to handle empty lists
 * - Not attaching remaining nodes
 * - Creating new nodes instead of relinking
 * - Incorrect comparison (< vs <=)
 */
