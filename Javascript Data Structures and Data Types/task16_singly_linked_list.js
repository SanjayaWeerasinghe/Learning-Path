/**
 * Task 16: Implement Singly Linked List
 * Difficulty: Intermediate
 *
 * Problem Description:
 * Create a SinglyLinkedList class with Node class. Implement methods:
 * - append(value): Add node to end
 * - prepend(value): Add node to beginning
 * - delete(value): Remove first node with value
 * - find(value): Return node with value
 * - toArray(): Convert list to array
 * - reverse(): Reverse the list
 *
 * Expected Input/Output:
 * const list = new SinglyLinkedList();
 * list.append(1);
 * list.append(2);
 * list.prepend(0);
 * list.toArray(); // [0, 1, 2]
 * list.reverse();
 * list.toArray(); // [2, 1, 0]
 *
 * Hints/Approach:
 * - Node structure: { value, next }
 * - Track head (and optionally tail) pointer
 * - For reverse: use three pointers (prev, current, next)
 * - Handle edge cases: empty list, single node
 */

/**
 * Node class represents a single node in the linked list
 */
class Node {
    constructor(value) {
        this.value = value;
        this.next = null;
    }
}

/**
 * Singly Linked List Implementation
 * Each node points to the next node, forming a chain
 */
class SinglyLinkedList {
    constructor() {
        this.head = null;
        this.tail = null;
        this.length = 0;
    }

    /**
     * Add a node to the end of the list - O(1) with tail pointer
     * @param {*} value - Value to append
     * @returns {SinglyLinkedList} - Returns this for chaining
     */
    append(value) {
        const newNode = new Node(value);

        // If list is empty, set both head and tail to new node
        if (!this.head) {
            this.head = newNode;
            this.tail = newNode;
        } else {
            // Link the current tail to new node
            this.tail.next = newNode;
            // Update tail to point to new node
            this.tail = newNode;
        }

        this.length++;
        return this;
    }

    /**
     * Add a node to the beginning of the list - O(1)
     * @param {*} value - Value to prepend
     * @returns {SinglyLinkedList} - Returns this for chaining
     */
    prepend(value) {
        const newNode = new Node(value);

        // If list is empty
        if (!this.head) {
            this.head = newNode;
            this.tail = newNode;
        } else {
            // Point new node to current head
            newNode.next = this.head;
            // Update head to point to new node
            this.head = newNode;
        }

        this.length++;
        return this;
    }

    /**
     * Insert value at specific index - O(n)
     * @param {*} value - Value to insert
     * @param {number} index - Position to insert at
     * @returns {boolean} - Success status
     */
    insertAt(value, index) {
        // Validate index
        if (index < 0 || index > this.length) {
            return false;
        }

        // Special case: insert at beginning
        if (index === 0) {
            this.prepend(value);
            return true;
        }

        // Special case: insert at end
        if (index === this.length) {
            this.append(value);
            return true;
        }

        // Traverse to position index-1
        let current = this.head;
        for (let i = 0; i < index - 1; i++) {
            current = current.next;
        }

        // Create new node and link it
        const newNode = new Node(value);
        newNode.next = current.next;
        current.next = newNode;

        this.length++;
        return true;
    }

    /**
     * Remove first node with specified value - O(n)
     * @param {*} value - Value to delete
     * @returns {boolean} - Success status
     */
    delete(value) {
        if (!this.head) {
            return false;
        }

        // Special case: delete head
        if (this.head.value === value) {
            this.head = this.head.next;

            // If list is now empty, update tail
            if (!this.head) {
                this.tail = null;
            }

            this.length--;
            return true;
        }

        // Traverse to find the node before the one to delete
        let current = this.head;
        while (current.next) {
            if (current.next.value === value) {
                // Node to delete is current.next
                const nodeToDelete = current.next;
                current.next = nodeToDelete.next;

                // If we deleted the tail, update tail pointer
                if (nodeToDelete === this.tail) {
                    this.tail = current;
                }

                this.length--;
                return true;
            }
            current = current.next;
        }

        return false; // Value not found
    }

    /**
     * Delete node at specific index - O(n)
     * @param {number} index - Position to delete
     * @returns {*} - Value of deleted node or null
     */
    deleteAt(index) {
        if (index < 0 || index >= this.length) {
            return null;
        }

        let deletedValue;

        // Special case: delete head
        if (index === 0) {
            deletedValue = this.head.value;
            this.head = this.head.next;

            if (!this.head) {
                this.tail = null;
            }

            this.length--;
            return deletedValue;
        }

        // Traverse to position index-1
        let current = this.head;
        for (let i = 0; i < index - 1; i++) {
            current = current.next;
        }

        // Delete the node at index
        const nodeToDelete = current.next;
        deletedValue = nodeToDelete.value;
        current.next = nodeToDelete.next;

        // Update tail if necessary
        if (nodeToDelete === this.tail) {
            this.tail = current;
        }

        this.length--;
        return deletedValue;
    }

    /**
     * Find node with specific value - O(n)
     * @param {*} value - Value to find
     * @returns {Node|null} - Found node or null
     */
    find(value) {
        let current = this.head;

        while (current) {
            if (current.value === value) {
                return current;
            }
            current = current.next;
        }

        return null;
    }

    /**
     * Get value at specific index - O(n)
     * @param {number} index - Position to get
     * @returns {*} - Value at index or null
     */
    get(index) {
        if (index < 0 || index >= this.length) {
            return null;
        }

        let current = this.head;
        for (let i = 0; i < index; i++) {
            current = current.next;
        }

        return current.value;
    }

    /**
     * Reverse the linked list - O(n)
     * Uses three pointers: prev, current, next
     */
    reverse() {
        if (!this.head || !this.head.next) {
            return; // Empty or single node
        }

        // Update tail to current head
        this.tail = this.head;

        let prev = null;
        let current = this.head;

        while (current) {
            // Save next node
            const next = current.next;

            // Reverse the link
            current.next = prev;

            // Move pointers forward
            prev = current;
            current = next;
        }

        // Update head to last node processed
        this.head = prev;
    }

    /**
     * Convert list to array - O(n)
     * @returns {Array} - Array representation
     */
    toArray() {
        const arr = [];
        let current = this.head;

        while (current) {
            arr.push(current.value);
            current = current.next;
        }

        return arr;
    }

    /**
     * Get size of list - O(1)
     * @returns {number} - Number of nodes
     */
    size() {
        return this.length;
    }

    /**
     * Check if list is empty - O(1)
     * @returns {boolean}
     */
    isEmpty() {
        return this.length === 0;
    }

    /**
     * Clear the entire list - O(1)
     */
    clear() {
        this.head = null;
        this.tail = null;
        this.length = 0;
    }

    /**
     * Display list (for debugging)
     * @returns {string} - String representation
     */
    toString() {
        return this.toArray().join(' -> ');
    }
}

// Test cases
console.log("=== Test Case 1: Append and Prepend ===");
const list = new SinglyLinkedList();
list.append(2);
list.append(3);
list.prepend(1);
list.append(4);
console.log("List:", list.toString()); // 1 -> 2 -> 3 -> 4
console.log("Array:", list.toArray()); // [1, 2, 3, 4]
console.log("Length:", list.size()); // 4

console.log("\n=== Test Case 2: Insert At Position ===");
const list2 = new SinglyLinkedList();
list2.append(1).append(3).append(4);
list2.insertAt(2, 1);
console.log("After insert:", list2.toString()); // 1 -> 2 -> 3 -> 4
list2.insertAt(0, 0);
list2.insertAt(5, 5);
console.log("After inserts:", list2.toString()); // 0 -> 1 -> 2 -> 3 -> 4 -> 5

console.log("\n=== Test Case 3: Delete Operations ===");
const list3 = new SinglyLinkedList();
list3.append(1).append(2).append(3).append(4).append(5);
console.log("Before delete:", list3.toString());
list3.delete(3);
console.log("After delete(3):", list3.toString()); // 1 -> 2 -> 4 -> 5
list3.delete(1);
console.log("After delete(1):", list3.toString()); // 2 -> 4 -> 5
list3.delete(5);
console.log("After delete(5):", list3.toString()); // 2 -> 4

console.log("\n=== Test Case 4: Reverse List ===");
const list4 = new SinglyLinkedList();
list4.append(1).append(2).append(3).append(4).append(5);
console.log("Original:", list4.toString()); // 1 -> 2 -> 3 -> 4 -> 5
list4.reverse();
console.log("Reversed:", list4.toString()); // 5 -> 4 -> 3 -> 2 -> 1

console.log("\n=== Test Case 5: Find Node ===");
const list5 = new SinglyLinkedList();
list5.append("apple").append("banana").append("cherry");
const found = list5.find("banana");
console.log("Found node:", found ? found.value : "Not found"); // banana
console.log("Next value:", found.next ? found.next.value : "null"); // cherry
console.log("Find non-existent:", list5.find("grape")); // null

console.log("\n=== Test Case 6: Get by Index ===");
const list6 = new SinglyLinkedList();
list6.append(10).append(20).append(30).append(40);
console.log("Get index 0:", list6.get(0)); // 10
console.log("Get index 2:", list6.get(2)); // 30
console.log("Get index 5:", list6.get(5)); // null

console.log("\n=== Test Case 7: Delete At Index ===");
const list7 = new SinglyLinkedList();
list7.append("A").append("B").append("C").append("D");
console.log("Before:", list7.toString());
console.log("Deleted:", list7.deleteAt(2)); // C
console.log("After:", list7.toString()); // A -> B -> D

console.log("\n=== Test Case 8: Edge Cases ===");
const emptyList = new SinglyLinkedList();
console.log("Empty list:", emptyList.toString()); // ""
console.log("Is empty:", emptyList.isEmpty()); // true
emptyList.reverse();
console.log("Reversed empty:", emptyList.toString()); // ""

const singleList = new SinglyLinkedList();
singleList.append(42);
singleList.reverse();
console.log("Reversed single:", singleList.toString()); // 42

console.log("\n=== Test Case 9: Method Chaining ===");
const chainList = new SinglyLinkedList();
chainList.append(1).append(2).append(3).prepend(0).append(4);
console.log("Chained operations:", chainList.toString());

/**
 * Time Complexity Summary:
 * - append: O(1) - with tail pointer
 * - prepend: O(1) - update head
 * - insertAt: O(n) - traverse to position
 * - delete: O(n) - may need to traverse entire list
 * - find: O(n) - may need to traverse entire list
 * - reverse: O(n) - visit each node once
 * - toArray: O(n) - visit each node once
 *
 * Space Complexity:
 * - O(n) where n is number of nodes
 *
 * Advantages:
 * - Dynamic size
 * - Efficient insertion/deletion at head: O(1)
 * - No wasted memory (no pre-allocation)
 *
 * Disadvantages:
 * - No random access (must traverse)
 * - Extra memory for pointers
 * - Can only traverse forward
 */
