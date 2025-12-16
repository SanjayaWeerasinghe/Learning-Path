/**
 * Task 10: Implement Stack from Scratch
 * Difficulty: Beginner
 *
 * Problem Description:
 * Implement a Stack class with the following methods:
 * - push(value): Add element to top
 * - pop(): Remove and return top element
 * - peek(): Return top element without removing
 * - isEmpty(): Check if stack is empty
 * - size(): Return number of elements
 *
 * Expected Input/Output:
 * const stack = new Stack();
 * stack.push(1);
 * stack.push(2);
 * stack.peek();    // 2
 * stack.pop();     // 2
 * stack.size();    // 1
 * stack.isEmpty(); // false
 *
 * Hints/Approach:
 * - Use an array internally to store elements
 * - Push/pop should be O(1) operations
 * - Handle edge cases: pop from empty stack
 * - Consider whether to use error throwing or return null/undefined
 */

/**
 * Stack Implementation using Array
 *
 * A stack follows LIFO (Last In First Out) principle
 * Think of it like a stack of plates - you add/remove from the top
 */
class Stack {
    /**
     * Initialize an empty stack
     */
    constructor() {
        // Internal storage using array
        this.items = [];
    }

    /**
     * Add an element to the top of the stack
     * @param {*} value - The value to push onto the stack
     * @returns {number} - The new size of the stack
     */
    push(value) {
        // Array.push() adds element to end (top of stack)
        // This is O(1) operation
        this.items.push(value);
        return this.items.length;
    }

    /**
     * Remove and return the top element from the stack
     * @returns {*} - The top element, or undefined if stack is empty
     */
    pop() {
        // Check if stack is empty
        if (this.isEmpty()) {
            return undefined;
        }
        // Array.pop() removes and returns last element
        // This is O(1) operation
        return this.items.pop();
    }

    /**
     * View the top element without removing it
     * @returns {*} - The top element, or undefined if stack is empty
     */
    peek() {
        // Check if stack is empty
        if (this.isEmpty()) {
            return undefined;
        }
        // Return last element without removing
        return this.items[this.items.length - 1];
    }

    /**
     * Check if the stack is empty
     * @returns {boolean} - True if stack is empty, false otherwise
     */
    isEmpty() {
        return this.items.length === 0;
    }

    /**
     * Get the number of elements in the stack
     * @returns {number} - The size of the stack
     */
    size() {
        return this.items.length;
    }

    /**
     * Clear all elements from the stack
     */
    clear() {
        this.items = [];
    }

    /**
     * Convert stack to array (for visualization)
     * @returns {Array} - Array representation of stack
     */
    toArray() {
        return [...this.items];
    }
}

/**
 * Alternative Implementation: Stack with Error Handling
 * This version throws errors instead of returning undefined
 */
class StrictStack {
    constructor() {
        this.items = [];
    }

    push(value) {
        this.items.push(value);
        return this.items.length;
    }

    pop() {
        if (this.isEmpty()) {
            throw new Error("Stack underflow: Cannot pop from empty stack");
        }
        return this.items.pop();
    }

    peek() {
        if (this.isEmpty()) {
            throw new Error("Stack is empty: Cannot peek");
        }
        return this.items[this.items.length - 1];
    }

    isEmpty() {
        return this.items.length === 0;
    }

    size() {
        return this.items.length;
    }
}

/**
 * Alternative Implementation: Stack with Maximum Capacity
 * Demonstrates bounded stack with overflow protection
 */
class BoundedStack {
    constructor(maxSize = 100) {
        this.items = [];
        this.maxSize = maxSize;
    }

    push(value) {
        if (this.size() >= this.maxSize) {
            throw new Error(`Stack overflow: Maximum capacity (${this.maxSize}) reached`);
        }
        this.items.push(value);
        return this.items.length;
    }

    pop() {
        if (this.isEmpty()) {
            return undefined;
        }
        return this.items.pop();
    }

    peek() {
        if (this.isEmpty()) {
            return undefined;
        }
        return this.items[this.items.length - 1];
    }

    isEmpty() {
        return this.items.length === 0;
    }

    isFull() {
        return this.items.length >= this.maxSize;
    }

    size() {
        return this.items.length;
    }
}

// Test cases
console.log("=== Test Case 1: Basic Operations ===");
const stack = new Stack();
console.log("Is empty:", stack.isEmpty()); // true
stack.push(1);
stack.push(2);
stack.push(3);
console.log("Stack after pushes:", stack.toArray()); // [1, 2, 3]
console.log("Peek:", stack.peek()); // 3
console.log("Size:", stack.size()); // 3
console.log("Pop:", stack.pop()); // 3
console.log("Stack after pop:", stack.toArray()); // [1, 2]
console.log("Size:", stack.size()); // 2

console.log("\n=== Test Case 2: Empty Stack ===");
const emptyStack = new Stack();
console.log("Pop from empty:", emptyStack.pop()); // undefined
console.log("Peek from empty:", emptyStack.peek()); // undefined
console.log("Is empty:", emptyStack.isEmpty()); // true
console.log("Size:", emptyStack.size()); // 0

console.log("\n=== Test Case 3: Different Data Types ===");
const mixedStack = new Stack();
mixedStack.push(42);
mixedStack.push("hello");
mixedStack.push({ name: "John" });
mixedStack.push([1, 2, 3]);
mixedStack.push(true);
console.log("Mixed stack:", mixedStack.toArray());
console.log("Pop object:", mixedStack.pop()); // true
console.log("Pop array:", mixedStack.pop()); // [1, 2, 3]

console.log("\n=== Test Case 4: Strict Stack with Errors ===");
const strictStack = new StrictStack();
strictStack.push(10);
strictStack.push(20);
console.log("Strict stack size:", strictStack.size()); // 2
try {
    strictStack.pop();
    strictStack.pop();
    strictStack.pop(); // This should throw error
} catch (error) {
    console.log("Error caught:", error.message);
}

console.log("\n=== Test Case 5: Bounded Stack ===");
const boundedStack = new BoundedStack(3);
boundedStack.push(1);
boundedStack.push(2);
boundedStack.push(3);
console.log("Is full:", boundedStack.isFull()); // true
try {
    boundedStack.push(4); // This should throw error
} catch (error) {
    console.log("Error caught:", error.message);
}

console.log("\n=== Test Case 6: Stack Use Case - Undo Functionality ===");
class UndoManager {
    constructor() {
        this.history = new Stack();
    }

    performAction(action) {
        this.history.push(action);
        console.log(`Performed: ${action}`);
    }

    undo() {
        const action = this.history.pop();
        if (action) {
            console.log(`Undid: ${action}`);
        } else {
            console.log("Nothing to undo");
        }
    }

    canUndo() {
        return !this.history.isEmpty();
    }
}

const undoManager = new UndoManager();
undoManager.performAction("Type 'Hello'");
undoManager.performAction("Type ' World'");
undoManager.performAction("Add exclamation");
undoManager.undo();
undoManager.undo();
console.log("Can undo:", undoManager.canUndo()); // true

/**
 * Time Complexity Analysis:
 * - push(): O(1) - adds to end of array
 * - pop(): O(1) - removes from end of array
 * - peek(): O(1) - accesses last element
 * - isEmpty(): O(1) - checks length property
 * - size(): O(1) - returns length property
 *
 * Space Complexity Analysis:
 * - O(n) where n is the number of elements in the stack
 *
 * Real-world Use Cases:
 * - Undo/Redo functionality in applications
 * - Browser history (back button)
 * - Function call stack in programming
 * - Expression evaluation and syntax parsing
 * - Depth-first search in graphs/trees
 * - Backtracking algorithms
 */
