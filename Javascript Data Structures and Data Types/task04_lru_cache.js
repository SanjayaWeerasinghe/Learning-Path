/**
 * Task 4: Implement LRU Cache
 * Difficulty: Advanced
 *
 * Problem Description:
 * Design and implement a Least Recently Used (LRU) cache with the following operations:
 * - get(key): Get the value of the key if it exists in the cache, otherwise return -1
 * - put(key, value): Update or insert the value if the key is not already present.
 *   When cache reaches capacity, invalidate the least recently used item before inserting.
 *
 * Expected Input/Output:
 * const cache = new LRUCache(2); // capacity = 2
 * cache.put(1, 1);
 * cache.put(2, 2);
 * cache.get(1);       // returns 1
 * cache.put(3, 3);    // evicts key 2
 * cache.get(2);       // returns -1 (not found)
 * cache.put(4, 4);    // evicts key 1
 * cache.get(1);       // returns -1 (not found)
 * cache.get(3);       // returns 3
 * cache.get(4);       // returns 4
 *
 * Hints/Approach:
 * - Use a Map (maintains insertion order) combined with logic to track access
 * - Or implement using a doubly linked list + hash map for O(1) operations
 * - Move accessed items to the front/end to track recency
 * - Remove from tail/front when capacity is exceeded
 */

/**
 * Solution 1: Using JavaScript Map (Leverages insertion order)
 *
 * Key Insight:
 * JavaScript Map maintains insertion order. We can use this property:
 * - When an item is accessed (get), delete it and re-insert to move it to end
 * - When adding new item at capacity, delete the first (oldest) item
 *
 * Time Complexity: O(1) for both get and put operations
 */
class LRUCache {
    /**
     * Initialize LRU Cache with given capacity
     * @param {number} capacity - Maximum number of items cache can hold
     */
    constructor(capacity) {
        this.capacity = capacity;
        this.cache = new Map();  // Map to store key-value pairs
    }

    /**
     * Get value associated with key
     * @param {number} key - Key to look up
     * @returns {number} - Value if found, -1 otherwise
     */
    get(key) {
        // Check if key exists in cache
        if (!this.cache.has(key)) {
            return -1;  // Key not found
        }

        // Key exists - get the value
        const value = this.cache.get(key);

        // Move this key to end (mark as recently used)
        // Delete and re-insert to update position
        this.cache.delete(key);
        this.cache.set(key, value);

        return value;
    }

    /**
     * Put key-value pair into cache
     * @param {number} key - Key to insert/update
     * @param {number} value - Value to associate with key
     */
    put(key, value) {
        // If key already exists, delete it first
        // This ensures we can re-insert it at the end (most recently used position)
        if (this.cache.has(key)) {
            this.cache.delete(key);
        }

        // Add/update the key-value pair (goes to end of Map)
        this.cache.set(key, value);

        // Check if we've exceeded capacity
        if (this.cache.size > this.capacity) {
            // Remove the least recently used item (first item in Map)
            // Map.keys() returns an iterator, and next().value gives first key
            const firstKey = this.cache.keys().next().value;
            this.cache.delete(firstKey);
        }
    }

    /**
     * Get current cache state (for debugging)
     * @returns {Object} - Object representation of cache
     */
    toString() {
        return JSON.stringify(Object.fromEntries(this.cache));
    }
}

/**
 * Solution 2: Using Doubly Linked List + Hash Map
 * This is a more traditional implementation that explicitly manages node order
 *
 * Advantages:
 * - More control over the data structure
 * - Clearer what's happening under the hood
 * - Can be implemented in languages without ordered maps
 */

/**
 * Node class for doubly linked list
 */
class DLLNode {
    constructor(key, value) {
        this.key = key;      // Store key in node for deletion
        this.value = value;
        this.prev = null;
        this.next = null;
    }
}

/**
 * LRU Cache using Doubly Linked List
 */
class LRUCacheWithDLL {
    constructor(capacity) {
        this.capacity = capacity;
        this.cache = new Map();  // Map: key → DLLNode

        // Dummy head and tail nodes simplify edge case handling
        this.head = new DLLNode(0, 0);  // Dummy head (most recent)
        this.tail = new DLLNode(0, 0);  // Dummy tail (least recent)

        // Connect head and tail
        this.head.next = this.tail;
        this.tail.prev = this.head;
    }

    /**
     * Remove a node from its current position in the list
     * @param {DLLNode} node - Node to remove
     */
    _removeNode(node) {
        const prevNode = node.prev;
        const nextNode = node.next;

        // Bypass this node
        prevNode.next = nextNode;
        nextNode.prev = prevNode;
    }

    /**
     * Add node right after head (mark as most recently used)
     * @param {DLLNode} node - Node to add
     */
    _addToHead(node) {
        node.prev = this.head;
        node.next = this.head.next;

        this.head.next.prev = node;
        this.head.next = node;
    }

    /**
     * Move node to head (mark as recently used)
     * @param {DLLNode} node - Node to move
     */
    _moveToHead(node) {
        this._removeNode(node);
        this._addToHead(node);
    }

    /**
     * Remove and return the least recently used node (before tail)
     * @returns {DLLNode} - Removed node
     */
    _removeTail() {
        const lruNode = this.tail.prev;
        this._removeNode(lruNode);
        return lruNode;
    }

    /**
     * Get value by key
     * @param {number} key - Key to look up
     * @returns {number} - Value if found, -1 otherwise
     */
    get(key) {
        if (!this.cache.has(key)) {
            return -1;
        }

        // Get the node
        const node = this.cache.get(key);

        // Move to head (mark as recently used)
        this._moveToHead(node);

        return node.value;
    }

    /**
     * Put key-value pair
     * @param {number} key - Key
     * @param {number} value - Value
     */
    put(key, value) {
        if (this.cache.has(key)) {
            // Key exists - update value and move to head
            const node = this.cache.get(key);
            node.value = value;
            this._moveToHead(node);
        } else {
            // New key - create new node
            const newNode = new DLLNode(key, value);

            // Add to cache and to head of list
            this.cache.set(key, newNode);
            this._addToHead(newNode);

            // Check capacity
            if (this.cache.size > this.capacity) {
                // Remove LRU item
                const lruNode = this._removeTail();
                this.cache.delete(lruNode.key);
            }
        }
    }
}

// Test cases
console.log("=== Test Case 1: Basic LRU Cache Operations (Map-based) ===");
const cache1 = new LRUCache(2);
cache1.put(1, 1);
console.log("After put(1,1):", cache1.toString());
cache1.put(2, 2);
console.log("After put(2,2):", cache1.toString());
console.log("get(1):", cache1.get(1));  // returns 1
console.log("After get(1):", cache1.toString());
cache1.put(3, 3);  // evicts key 2
console.log("After put(3,3):", cache1.toString());
console.log("get(2):", cache1.get(2));  // returns -1 (evicted)
cache1.put(4, 4);  // evicts key 1
console.log("After put(4,4):", cache1.toString());
console.log("get(1):", cache1.get(1));  // returns -1 (evicted)
console.log("get(3):", cache1.get(3));  // returns 3
console.log("get(4):", cache1.get(4));  // returns 4

console.log("\n=== Test Case 2: Same test with DLL-based implementation ===");
const cache2 = new LRUCacheWithDLL(2);
cache2.put(1, 1);
cache2.put(2, 2);
console.log("get(1):", cache2.get(1));  // returns 1
cache2.put(3, 3);  // evicts key 2
console.log("get(2):", cache2.get(2));  // returns -1
cache2.put(4, 4);  // evicts key 1
console.log("get(1):", cache2.get(1));  // returns -1
console.log("get(3):", cache2.get(3));  // returns 3
console.log("get(4):", cache2.get(4));  // returns 4

console.log("\n=== Test Case 3: Update existing key ===");
const cache3 = new LRUCache(2);
cache3.put(1, 1);
cache3.put(2, 2);
cache3.put(1, 10);  // Update key 1
console.log("get(1):", cache3.get(1));  // returns 10 (updated value)
console.log("Cache state:", cache3.toString());

/**
 * Complexity Analysis:
 *
 * Map-based Solution:
 * Time: O(1) for both get() and put()
 * Space: O(capacity) for storing cache items
 *
 * DLL-based Solution:
 * Time: O(1) for both get() and put()
 * Space: O(capacity) for cache Map and DLL nodes
 *
 * Key Concepts:
 * - LRU eviction policy: Remove least recently used when at capacity
 * - Both get and put count as "using" an item
 * - Map maintains insertion order in JavaScript (ES6+)
 * - DLL allows O(1) insertion/deletion at any position
 */
