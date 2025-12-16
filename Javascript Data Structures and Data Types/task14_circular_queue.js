/**
 * Task 14: Implement Circular Queue
 * Difficulty: Intermediate
 *
 * Problem Description:
 * Design a circular queue that supports operations enqueue, dequeue, front, rear,
 * isEmpty, and isFull. A circular queue reuses space by wrapping around when the
 * rear reaches the end.
 *
 * Expected Input/Output:
 * const queue = new CircularQueue(3);
 * queue.enqueue(1); // true
 * queue.enqueue(2); // true
 * queue.enqueue(3); // true
 * queue.enqueue(4); // false (queue is full)
 * queue.dequeue();  // 1
 * queue.enqueue(4); // true
 * queue.rear();     // 4
 *
 * Hints/Approach:
 * - Use fixed-size array
 * - Track front and rear pointers
 * - Use modulo operator for wraparound: (index + 1) % capacity
 * - Distinguish between empty and full: track count or use front == (rear + 1) % capacity
 */

/**
 * Solution 1: Circular Queue with Count Tracker
 * Easiest to understand - uses count to distinguish empty/full
 *
 * @param {number} capacity - Maximum size of queue
 */
class CircularQueue {
    constructor(capacity) {
        this.capacity = capacity;
        this.items = new Array(capacity);
        this.front = 0;
        this.rear = -1;
        this.count = 0; // Track number of elements
    }

    /**
     * Add element to rear of queue
     * @param {*} value - Value to enqueue
     * @returns {boolean} - True if successful, false if full
     */
    enqueue(value) {
        // Check if queue is full
        if (this.isFull()) {
            return false;
        }

        // Move rear pointer in circular fashion
        this.rear = (this.rear + 1) % this.capacity;

        // Add element at rear position
        this.items[this.rear] = value;

        // Increment count
        this.count++;

        return true;
    }

    /**
     * Remove and return front element
     * @returns {*} - Front element or null if empty
     */
    dequeue() {
        if (this.isEmpty()) {
            return null;
        }

        // Get front element
        const item = this.items[this.front];

        // Optional: clear the slot
        this.items[this.front] = null;

        // Move front pointer in circular fashion
        this.front = (this.front + 1) % this.capacity;

        // Decrement count
        this.count--;

        return item;
    }

    /**
     * Get front element without removing
     * @returns {*} - Front element or null if empty
     */
    Front() {
        if (this.isEmpty()) {
            return null;
        }
        return this.items[this.front];
    }

    /**
     * Get rear element without removing
     * @returns {*} - Rear element or null if empty
     */
    Rear() {
        if (this.isEmpty()) {
            return null;
        }
        return this.items[this.rear];
    }

    /**
     * Check if queue is empty
     * @returns {boolean}
     */
    isEmpty() {
        return this.count === 0;
    }

    /**
     * Check if queue is full
     * @returns {boolean}
     */
    isFull() {
        return this.count === this.capacity;
    }

    /**
     * Get current size
     * @returns {number}
     */
    size() {
        return this.count;
    }

    /**
     * Visualize queue state (for debugging)
     * @returns {object}
     */
    getState() {
        return {
            capacity: this.capacity,
            count: this.count,
            front: this.front,
            rear: this.rear,
            items: [...this.items],
            isEmpty: this.isEmpty(),
            isFull: this.isFull()
        };
    }

    /**
     * Get all valid elements in order
     * @returns {Array}
     */
    toArray() {
        if (this.isEmpty()) {
            return [];
        }

        const result = [];
        let index = this.front;
        for (let i = 0; i < this.count; i++) {
            result.push(this.items[index]);
            index = (index + 1) % this.capacity;
        }
        return result;
    }
}

/**
 * Solution 2: Circular Queue Without Count
 * Uses one slot as empty marker
 */
class CircularQueueNoCount {
    constructor(capacity) {
        // Add 1 to capacity to distinguish empty from full
        this.capacity = capacity + 1;
        this.items = new Array(this.capacity);
        this.front = 0;
        this.rear = 0;
    }

    enqueue(value) {
        // Check if full: (rear + 1) % capacity === front
        const nextRear = (this.rear + 1) % this.capacity;
        if (nextRear === this.front) {
            return false; // Full
        }

        this.items[this.rear] = value;
        this.rear = nextRear;
        return true;
    }

    dequeue() {
        if (this.isEmpty()) {
            return null;
        }

        const item = this.items[this.front];
        this.items[this.front] = null;
        this.front = (this.front + 1) % this.capacity;
        return item;
    }

    Front() {
        if (this.isEmpty()) {
            return null;
        }
        return this.items[this.front];
    }

    Rear() {
        if (this.isEmpty()) {
            return null;
        }
        // Rear points to next empty slot, so get previous
        const actualRear = (this.rear - 1 + this.capacity) % this.capacity;
        return this.items[actualRear];
    }

    isEmpty() {
        return this.front === this.rear;
    }

    isFull() {
        return (this.rear + 1) % this.capacity === this.front;
    }

    size() {
        return (this.rear - this.front + this.capacity) % this.capacity;
    }
}

// Test cases
console.log("=== Test Case 1: Basic Enqueue/Dequeue ===");
const cq = new CircularQueue(3);
console.log("Initial state:", cq.getState());
console.log("Enqueue 1:", cq.enqueue(1)); // true
console.log("Enqueue 2:", cq.enqueue(2)); // true
console.log("Enqueue 3:", cq.enqueue(3)); // true
console.log("Queue full:", cq.isFull()); // true
console.log("Enqueue 4:", cq.enqueue(4)); // false
console.log("Current queue:", cq.toArray()); // [1, 2, 3]

console.log("\n=== Test Case 2: Wraparound Behavior ===");
console.log("Dequeue:", cq.dequeue()); // 1
console.log("Enqueue 4:", cq.enqueue(4)); // true
console.log("Current queue:", cq.toArray()); // [2, 3, 4]
console.log("State:", cq.getState());
console.log("Front:", cq.Front()); // 2
console.log("Rear:", cq.Rear()); // 4

console.log("\n=== Test Case 3: Complete Drain ===");
console.log("Dequeue:", cq.dequeue()); // 2
console.log("Dequeue:", cq.dequeue()); // 3
console.log("Dequeue:", cq.dequeue()); // 4
console.log("Is empty:", cq.isEmpty()); // true
console.log("Dequeue from empty:", cq.dequeue()); // null

console.log("\n=== Test Case 4: Refill After Drain ===");
cq.enqueue(10);
cq.enqueue(20);
console.log("Queue after refill:", cq.toArray()); // [10, 20]
console.log("State:", cq.getState());

console.log("\n=== Test Case 5: Multiple Wraparounds ===");
const cq2 = new CircularQueue(3);
for (let i = 1; i <= 10; i++) {
    if (cq2.isFull()) {
        console.log(`Iteration ${i}: Dequeue ${cq2.dequeue()}`);
    }
    console.log(`Iteration ${i}: Enqueue ${i} - ${cq2.enqueue(i)}`);
    console.log(`  Queue: [${cq2.toArray()}]`);
}

console.log("\n=== Test Case 6: CircularQueue without Count ===");
const cq3 = new CircularQueueNoCount(3);
console.log("Enqueue 1:", cq3.enqueue(1)); // true
console.log("Enqueue 2:", cq3.enqueue(2)); // true
console.log("Enqueue 3:", cq3.enqueue(3)); // true
console.log("Is full:", cq3.isFull()); // true
console.log("Enqueue 4:", cq3.enqueue(4)); // false
console.log("Dequeue:", cq3.dequeue()); // 1
console.log("Enqueue 4:", cq3.enqueue(4)); // true
console.log("Size:", cq3.size()); // 3

console.log("\n=== Test Case 7: Buffer Simulation ===");
class CircularBuffer extends CircularQueue {
    constructor(capacity) {
        super(capacity);
    }

    // Overwrite oldest element if buffer is full
    write(value) {
        if (this.isFull()) {
            this.dequeue(); // Remove oldest
        }
        this.enqueue(value);
    }

    read() {
        return this.dequeue();
    }

    peek() {
        return this.Front();
    }
}

const buffer = new CircularBuffer(5);
console.log("Streaming data to buffer:");
for (let i = 1; i <= 8; i++) {
    buffer.write(i);
    console.log(`Write ${i}: Buffer = [${buffer.toArray()}]`);
}
console.log("Buffer keeps only last 5 elements:", buffer.toArray());

console.log("\n=== Test Case 8: Performance Test ===");
const iterations = 100000;
const perfQueue = new CircularQueue(1000);

console.time("CircularQueue Performance");
for (let i = 0; i < iterations; i++) {
    if (perfQueue.isFull()) {
        perfQueue.dequeue();
    }
    perfQueue.enqueue(i);
}
console.timeEnd("CircularQueue Performance");

/**
 * Time Complexity Analysis:
 * - enqueue: O(1) - direct array access with modulo
 * - dequeue: O(1) - direct array access with modulo
 * - Front: O(1) - direct array access
 * - Rear: O(1) - direct array access
 * - isEmpty: O(1) - simple comparison
 * - isFull: O(1) - simple comparison
 *
 * Space Complexity:
 * - O(k) where k is the capacity (fixed)
 * - Very space-efficient for bounded queues
 *
 * Advantages of Circular Queue:
 * - Efficient use of memory - reuses freed space
 * - Fixed memory allocation - no dynamic resizing
 * - All operations are O(1)
 * - No wasted space like in linear queue
 *
 * Disadvantages:
 * - Fixed size - cannot grow dynamically
 * - Need to handle full queue condition
 *
 * Real-world Applications:
 * - CPU scheduling (round-robin)
 * - Memory management (buffer management)
 * - Traffic systems
 * - Streaming data buffers
 * - Keyboard/mouse event buffers
 * - Audio/video streaming
 * - Network packet queues
 *
 * Key Insights:
 * - Modulo operator is key for wraparound
 * - Two approaches: use count or waste one slot
 * - Count approach is more intuitive
 * - One-slot-waste approach uses less memory for tracking
 */
