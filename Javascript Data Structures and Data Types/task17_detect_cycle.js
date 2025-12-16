/**
 * Task 17: Detect Cycle in Linked List
 * Difficulty: Intermediate
 *
 * Problem Description:
 * Given the head of a linked list, determine if the list has a cycle.
 * A cycle exists if a node can be reached again by following the next pointers.
 *
 * Expected Input/Output:
 * Input: head = [3,2,0,-4], pos = 1 (tail connects to index 1)
 * Output: true
 *
 * Input: head = [1,2], pos = -1 (no cycle)
 * Output: false
 *
 * Hints/Approach:
 * - Floyd's Cycle Detection (Tortoise and Hare algorithm)
 * - Use two pointers: slow moves one step, fast moves two steps
 * - If they meet, there's a cycle
 * - If fast reaches null, no cycle
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
 * Solution 1: Floyd's Cycle Detection (Tortoise and Hare)
 * Most efficient approach - O(n) time, O(1) space
 *
 * @param {ListNode} head - Head of the linked list
 * @returns {boolean} - True if cycle exists
 */
function hasCycle(head) {
    // Edge case: empty list or single node
    if (!head || !head.next) {
        return false;
    }

    // Initialize two pointers
    let slow = head;      // Tortoise - moves 1 step
    let fast = head;      // Hare - moves 2 steps

    // Continue until fast reaches end or they meet
    while (fast && fast.next) {
        slow = slow.next;           // Move slow by 1
        fast = fast.next.next;      // Move fast by 2

        // If they meet, cycle exists
        if (slow === fast) {
            return true;
        }
    }

    // Fast reached end, no cycle
    return false;
}

/**
 * Solution 2: Using Hash Set
 * Track visited nodes - O(n) time, O(n) space
 *
 * @param {ListNode} head - Head of linked list
 * @returns {boolean} - True if cycle exists
 */
function hasCycleHashSet(head) {
    if (!head) {
        return false;
    }

    const visited = new Set();
    let current = head;

    while (current) {
        // If we've seen this node before, cycle exists
        if (visited.has(current)) {
            return true;
        }

        // Mark node as visited
        visited.add(current);
        current = current.next;
    }

    // Reached end without finding duplicate
    return false;
}

/**
 * Enhanced Version: Detect cycle and return cycle start node
 * Uses Floyd's algorithm extended version
 *
 * @param {ListNode} head - Head of linked list
 * @returns {ListNode|null} - Starting node of cycle or null
 */
function detectCycleStart(head) {
    if (!head || !head.next) {
        return null;
    }

    let slow = head;
    let fast = head;
    let hasCycle = false;

    // Phase 1: Detect if cycle exists
    while (fast && fast.next) {
        slow = slow.next;
        fast = fast.next.next;

        if (slow === fast) {
            hasCycle = true;
            break;
        }
    }

    if (!hasCycle) {
        return null;
    }

    // Phase 2: Find cycle start
    // Reset one pointer to head
    slow = head;

    // Move both one step at a time
    while (slow !== fast) {
        slow = slow.next;
        fast = fast.next;
    }

    // They meet at the cycle start
    return slow;
}

/**
 * Enhanced Version: Get cycle length
 *
 * @param {ListNode} head - Head of linked list
 * @returns {number} - Length of cycle or 0 if no cycle
 */
function getCycleLength(head) {
    if (!head || !head.next) {
        return 0;
    }

    let slow = head;
    let fast = head;

    // Detect cycle
    while (fast && fast.next) {
        slow = slow.next;
        fast = fast.next.next;

        if (slow === fast) {
            // Cycle detected, count length
            let length = 1;
            let current = slow.next;

            while (current !== slow) {
                length++;
                current = current.next;
            }

            return length;
        }
    }

    return 0; // No cycle
}

/**
 * Detailed cycle information
 *
 * @param {ListNode} head - Head of linked list
 * @returns {object} - Cycle information
 */
function analyzeCycle(head) {
    const result = {
        hasCycle: false,
        cycleStart: null,
        cycleLength: 0,
        totalNodes: 0,
        nodesBeforeCycle: 0
    };

    if (!head) {
        return result;
    }

    // Detect cycle and find start
    let slow = head;
    let fast = head;
    let cycleFound = false;

    while (fast && fast.next) {
        slow = slow.next;
        fast = fast.next.next;
        result.totalNodes++;

        if (slow === fast) {
            cycleFound = true;
            break;
        }
    }

    if (!cycleFound) {
        // Count remaining nodes if no cycle
        while (slow && slow.next) {
            result.totalNodes++;
            slow = slow.next;
        }
        result.totalNodes++; // Count last node
        return result;
    }

    result.hasCycle = true;

    // Find cycle start
    slow = head;
    while (slow !== fast) {
        slow = slow.next;
        fast = fast.next;
        result.nodesBeforeCycle++;
    }
    result.cycleStart = slow;

    // Find cycle length
    let length = 1;
    let current = slow.next;
    while (current !== slow) {
        length++;
        current = current.next;
    }
    result.cycleLength = length;

    return result;
}

/**
 * Helper: Create linked list with cycle for testing
 */
function createCyclicList(values, pos) {
    if (values.length === 0) {
        return null;
    }

    const head = new ListNode(values[0]);
    let current = head;
    let cycleNode = null;

    if (pos === 0) {
        cycleNode = head;
    }

    for (let i = 1; i < values.length; i++) {
        current.next = new ListNode(values[i]);
        current = current.next;

        if (i === pos) {
            cycleNode = current;
        }
    }

    // Create cycle if pos is valid
    if (pos >= 0 && cycleNode) {
        current.next = cycleNode;
    }

    return head;
}

/**
 * Helper: Create regular linked list (no cycle)
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

// Test cases
console.log("=== Test Case 1: List with Cycle ===");
const list1 = createCyclicList([3, 2, 0, -4], 1);
console.log("Has cycle:", hasCycle(list1)); // true
console.log("Has cycle (HashSet):", hasCycleHashSet(list1)); // true

console.log("\n=== Test Case 2: List without Cycle ===");
const list2 = createList([1, 2, 3, 4, 5]);
console.log("Has cycle:", hasCycle(list2)); // false
console.log("Has cycle (HashSet):", hasCycleHashSet(list2)); // false

console.log("\n=== Test Case 3: Single Node with Cycle ===");
const list3 = createCyclicList([1], 0);
console.log("Has cycle:", hasCycle(list3)); // true

console.log("\n=== Test Case 4: Two Nodes with Cycle ===");
const list4 = createCyclicList([1, 2], 0);
console.log("Has cycle:", hasCycle(list4)); // true

console.log("\n=== Test Case 5: Empty List ===");
const list5 = null;
console.log("Has cycle:", hasCycle(list5)); // false

console.log("\n=== Test Case 6: Detect Cycle Start ===");
const list6 = createCyclicList([3, 2, 0, -4], 1);
const cycleStart = detectCycleStart(list6);
console.log("Cycle starts at node with value:", cycleStart ? cycleStart.value : "null"); // 2

console.log("\n=== Test Case 7: Get Cycle Length ===");
const list7 = createCyclicList([1, 2, 3, 4, 5], 2);
console.log("Cycle length:", getCycleLength(list7)); // 3 (nodes 3, 4, 5)

console.log("\n=== Test Case 8: Detailed Cycle Analysis ===");
const list8 = createCyclicList([1, 2, 3, 4, 5, 6], 2);
const analysis = analyzeCycle(list8);
console.log("Analysis:", analysis);
// Expected: { hasCycle: true, cycleStart: Node(3), cycleLength: 4, ... }

console.log("\n=== Test Case 9: No Cycle Analysis ===");
const list9 = createList([1, 2, 3, 4, 5]);
const analysis2 = analyzeCycle(list9);
console.log("Analysis:", analysis2);
// Expected: { hasCycle: false, cycleStart: null, cycleLength: 0, totalNodes: 5 }

console.log("\n=== Test Case 10: Performance Comparison ===");
const largeList = createCyclicList(Array.from({ length: 10000 }, (_, i) => i), 5000);

console.time("Floyd's Algorithm");
hasCycle(largeList);
console.timeEnd("Floyd's Algorithm");

console.time("HashSet Method");
hasCycleHashSet(largeList);
console.timeEnd("HashSet Method");

/**
 * Time Complexity Analysis:
 *
 * Floyd's Cycle Detection:
 * - Time: O(n) where n is number of nodes
 * - Space: O(1) - only two pointers
 * - In worst case, fast pointer goes around cycle once before meeting slow
 *
 * HashSet Method:
 * - Time: O(n)
 * - Space: O(n) - stores all nodes in set
 *
 * Space Complexity Comparison:
 * - Floyd's: O(1) - constant space
 * - HashSet: O(n) - linear space
 *
 * Why Floyd's Algorithm Works:
 * 1. If there's a cycle, slow and fast will eventually meet inside the cycle
 * 2. Fast catches up to slow at rate of 1 step per iteration
 * 3. They will meet within the cycle guaranteed
 *
 * Finding Cycle Start (Extended Floyd's):
 * 1. After meeting, reset one pointer to head
 * 2. Move both at same speed (1 step)
 * 3. They meet at cycle entrance
 *
 * Proof: If distance to cycle is 'a' and they meet at distance 'b' in cycle,
 * then moving 'a' steps from head and 'a' steps from meeting point both
 * land at cycle start.
 *
 * Real-world Applications:
 * - Detecting infinite loops in program execution
 * - Memory leak detection
 * - Detecting circular dependencies
 * - Validating data structure integrity
 * - Network routing loop detection
 */
