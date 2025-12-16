/**
 * Task 13: Implement Queue from Scratch
 * Difficulty: Beginner
 *
 * Problem Description:
 * Implement a Queue class with the following methods:
 * - enqueue(value): Add element to rear
 * - dequeue(): Remove and return front element
 * - front(): Return front element without removing
 * - isEmpty(): Check if queue is empty
 * - size(): Return number of elements
 *
 * Expected Input/Output:
 * const queue = new Queue();
 * queue.enqueue(1);
 * queue.enqueue(2);
 * queue.front();    // 1
 * queue.dequeue();  // 1
 * queue.size();     // 1
 *
 * Hints/Approach:
 * - Can use an array, but be aware dequeue from front is O(n)
 * - Better approach: use an object with front/rear pointers for O(1) operations
 * - Or use two pointers to track front and rear indices
 * - Handle wraparound for circular queue implementation
 */

/**
 * Solution 1: Queue Using Array (Simple but O(n) dequeue)
 *
 * A queue follows FIFO (First In First Out) principle
 * Like a line of people waiting - first person in line is served first
 */
class QueueArray {
    constructor() {
        this.items = [];
    }

    /**
     * Add element to the rear of queue
     * @param {*} value - Value to add
     */
    enqueue(value) {
        // Add to end of array - O(1)
        this.items.push(value);
    }

    /**
     * Remove and return front element
     * @returns {*} - Front element or undefined if empty
     */
    dequeue() {
        if (this.isEmpty()) {
            return undefined;
        }
        // Remove from front - O(n) because all elements shift
        return this.items.shift();
    }

    /**
     * View front element without removing
     * @returns {*} - Front element or undefined if empty
     */
    front() {
        if (this.isEmpty()) {
            return undefined;
        }
        return this.items[0];
    }

    /**
     * Check if queue is empty
     * @returns {boolean}
     */
    isEmpty() {
        return this.items.length === 0;
    }

    /**
     * Get number of elements
     * @returns {number}
     */
    size() {
        return this.items.length;
    }

    /**
     * Clear all elements
     */
    clear() {
        this.items = [];
    }

    /**
     * View all elements (for debugging)
     * @returns {Array}
     */
    toArray() {
        return [...this.items];
    }
}

/**
 * Solution 2: Queue Using Object (O(1) for all operations)
 * Best performance implementation
 */
class Queue {
    constructor() {
        this.items = {};
        this.frontIndex = 0;
        this.rearIndex = 0;
    }

    /**
     * Add element to the rear - O(1)
     * @param {*} value - Value to enqueue
     */
    enqueue(value) {
        this.items[this.rearIndex] = value;
        this.rearIndex++;
    }

    /**
     * Remove and return front element - O(1)
     * @returns {*} - Front element or undefined if empty
     */
    dequeue() {
        if (this.isEmpty()) {
            return undefined;
        }

        const item = this.items[this.frontIndex];
        delete this.items[this.frontIndex];
        this.frontIndex++;

        // Reset indices when queue becomes empty
        if (this.frontIndex === this.rearIndex) {
            this.frontIndex = 0;
            this.rearIndex = 0;
        }

        return item;
    }

    /**
     * View front element without removing - O(1)
     * @returns {*} - Front element or undefined if empty
     */
    front() {
        if (this.isEmpty()) {
            return undefined;
        }
        return this.items[this.frontIndex];
    }

    /**
     * Get rear element without removing - O(1)
     * @returns {*} - Rear element or undefined if empty
     */
    rear() {
        if (this.isEmpty()) {
            return undefined;
        }
        return this.items[this.rearIndex - 1];
    }

    /**
     * Check if queue is empty - O(1)
     * @returns {boolean}
     */
    isEmpty() {
        return this.frontIndex === this.rearIndex;
    }

    /**
     * Get number of elements - O(1)
     * @returns {number}
     */
    size() {
        return this.rearIndex - this.frontIndex;
    }

    /**
     * Clear all elements
     */
    clear() {
        this.items = {};
        this.frontIndex = 0;
        this.rearIndex = 0;
    }

    /**
     * Convert to array
     * @returns {Array}
     */
    toArray() {
        const arr = [];
        for (let i = this.frontIndex; i < this.rearIndex; i++) {
            arr.push(this.items[i]);
        }
        return arr;
    }
}

/**
 * Solution 3: Priority Queue
 * Elements are dequeued based on priority instead of order
 */
class PriorityQueue {
    constructor() {
        this.items = [];
    }

    /**
     * Enqueue with priority (lower number = higher priority)
     * @param {*} value - Value to enqueue
     * @param {number} priority - Priority level
     */
    enqueue(value, priority = 0) {
        const element = { value, priority };

        // Find correct position based on priority
        let added = false;
        for (let i = 0; i < this.items.length; i++) {
            if (element.priority < this.items[i].priority) {
                this.items.splice(i, 0, element);
                added = true;
                break;
            }
        }

        // If not added, add to end
        if (!added) {
            this.items.push(element);
        }
    }

    /**
     * Dequeue highest priority element
     * @returns {*} - Highest priority element
     */
    dequeue() {
        if (this.isEmpty()) {
            return undefined;
        }
        return this.items.shift().value;
    }

    front() {
        if (this.isEmpty()) {
            return undefined;
        }
        return this.items[0].value;
    }

    isEmpty() {
        return this.items.length === 0;
    }

    size() {
        return this.items.length;
    }

    toArray() {
        return this.items.map(item => ({ value: item.value, priority: item.priority }));
    }
}

// Test cases
console.log("=== Test Case 1: Basic Queue Operations ===");
const queue = new Queue();
console.log("Is empty:", queue.isEmpty()); // true

queue.enqueue(1);
queue.enqueue(2);
queue.enqueue(3);
console.log("Queue after enqueues:", queue.toArray()); // [1, 2, 3]
console.log("Front:", queue.front()); // 1
console.log("Rear:", queue.rear()); // 3
console.log("Size:", queue.size()); // 3

console.log("Dequeue:", queue.dequeue()); // 1
console.log("Queue after dequeue:", queue.toArray()); // [2, 3]
console.log("Size:", queue.size()); // 2

console.log("\n=== Test Case 2: Empty Queue ===");
const emptyQueue = new Queue();
console.log("Dequeue from empty:", emptyQueue.dequeue()); // undefined
console.log("Front of empty:", emptyQueue.front()); // undefined
console.log("Is empty:", emptyQueue.isEmpty()); // true

console.log("\n=== Test Case 3: Queue with Different Types ===");
const mixedQueue = new Queue();
mixedQueue.enqueue("first");
mixedQueue.enqueue(42);
mixedQueue.enqueue({ name: "object" });
mixedQueue.enqueue([1, 2, 3]);
console.log("Mixed queue:", mixedQueue.toArray());
console.log("Dequeue:", mixedQueue.dequeue()); // "first"
console.log("Front:", mixedQueue.front()); // 42

console.log("\n=== Test Case 4: Complete Drain and Refill ===");
const testQueue = new Queue();
testQueue.enqueue(1);
testQueue.enqueue(2);
testQueue.dequeue();
testQueue.dequeue();
console.log("Is empty after draining:", testQueue.isEmpty()); // true
testQueue.enqueue(3);
testQueue.enqueue(4);
console.log("Queue after refill:", testQueue.toArray()); // [3, 4]

console.log("\n=== Test Case 5: Priority Queue ===");
const pq = new PriorityQueue();
pq.enqueue("Low priority task", 3);
pq.enqueue("High priority task", 1);
pq.enqueue("Medium priority task", 2);
console.log("Priority queue:", pq.toArray());
console.log("Dequeue (highest priority):", pq.dequeue()); // "High priority task"
console.log("Dequeue (next priority):", pq.dequeue()); // "Medium priority task"

console.log("\n=== Test Case 6: Performance Comparison ===");
const arrayQueue = new QueueArray();
const objectQueue = new Queue();
const iterations = 10000;

console.time("Array-based Queue");
for (let i = 0; i < iterations; i++) {
    arrayQueue.enqueue(i);
}
for (let i = 0; i < iterations; i++) {
    arrayQueue.dequeue();
}
console.timeEnd("Array-based Queue");

console.time("Object-based Queue");
for (let i = 0; i < iterations; i++) {
    objectQueue.enqueue(i);
}
for (let i = 0; i < iterations; i++) {
    objectQueue.dequeue();
}
console.timeEnd("Object-based Queue");

console.log("\n=== Test Case 7: Real-world Example - Print Queue ===");
class PrintJob {
    constructor(document, pages) {
        this.document = document;
        this.pages = pages;
        this.timestamp = new Date();
    }

    toString() {
        return `${this.document} (${this.pages} pages)`;
    }
}

class PrinterQueue {
    constructor() {
        this.queue = new Queue();
    }

    addJob(document, pages) {
        const job = new PrintJob(document, pages);
        this.queue.enqueue(job);
        console.log(`Added: ${job}`);
    }

    printNext() {
        const job = this.queue.dequeue();
        if (job) {
            console.log(`Printing: ${job}`);
            return job;
        } else {
            console.log("No jobs in queue");
            return null;
        }
    }

    viewNext() {
        const job = this.queue.front();
        if (job) {
            console.log(`Next job: ${job}`);
            return job;
        } else {
            console.log("No jobs in queue");
            return null;
        }
    }

    getQueueSize() {
        return this.queue.size();
    }
}

const printer = new PrinterQueue();
printer.addJob("Document1.pdf", 5);
printer.addJob("Report.docx", 10);
printer.addJob("Presentation.pptx", 3);
console.log("Queue size:", printer.getQueueSize());
printer.viewNext();
printer.printNext();
printer.printNext();
console.log("Remaining jobs:", printer.getQueueSize());

/**
 * Time Complexity Analysis:
 *
 * Array-based Queue:
 * - enqueue: O(1)
 * - dequeue: O(n) - all elements must shift
 * - front: O(1)
 * - isEmpty: O(1)
 *
 * Object-based Queue:
 * - enqueue: O(1)
 * - dequeue: O(1)
 * - front: O(1)
 * - isEmpty: O(1)
 * All operations are constant time!
 *
 * Space Complexity:
 * - Both: O(n) where n is number of elements
 *
 * Real-world Use Cases:
 * - Print job queues
 * - Task scheduling
 * - Breadth-first search in graphs
 * - Request handling in servers
 * - Message queues in distributed systems
 * - Call center systems
 * - CPU scheduling
 */
