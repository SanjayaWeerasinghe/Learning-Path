/**
 * Task 20: Implement Binary Search Tree
 * Difficulty: Intermediate
 *
 * Problem Description:
 * Create a BinarySearchTree class with Node class. Implement methods:
 * - insert(value): Add node maintaining BST property
 * - search(value): Find if value exists
 * - delete(value): Remove node
 * - inOrderTraversal(): Return array of values in sorted order
 * - findMin() and findMax(): Find minimum and maximum values
 *
 * Expected Input/Output:
 * const bst = new BST();
 * bst.insert(5);
 * bst.insert(3);
 * bst.insert(7);
 * bst.search(3); // true
 * bst.inOrderTraversal(); // [3, 5, 7]
 * bst.findMin(); // 3
 *
 * Hints/Approach:
 * - Node structure: { value, left, right }
 * - BST property: left < parent < right
 * - Insertion: recursively compare and insert
 * - Deletion: handle three cases (leaf, one child, two children)
 * - For two children: replace with inorder successor/predecessor
 */

/**
 * Node class for BST
 */
class BSTNode {
    constructor(value) {
        this.value = value;
        this.left = null;
        this.right = null;
    }
}

/**
 * Binary Search Tree Implementation
 */
class BinarySearchTree {
    constructor() {
        this.root = null;
    }

    /**
     * Insert a value into the BST
     * @param {*} value - Value to insert
     */
    insert(value) {
        const newNode = new BSTNode(value);

        if (this.root === null) {
            this.root = newNode;
            return this;
        }

        let current = this.root;
        while (true) {
            // Avoid duplicates
            if (value === current.value) return this;

            if (value < current.value) {
                // Go left
                if (current.left === null) {
                    current.left = newNode;
                    return this;
                }
                current = current.left;
            } else {
                // Go right
                if (current.right === null) {
                    current.right = newNode;
                    return this;
                }
                current = current.right;
            }
        }
    }

    /**
     * Insert recursively
     * @param {*} value - Value to insert
     */
    insertRecursive(value) {
        this.root = this._insertRecursive(this.root, value);
        return this;
    }

    _insertRecursive(node, value) {
        if (node === null) {
            return new BSTNode(value);
        }

        if (value < node.value) {
            node.left = this._insertRecursive(node.left, value);
        } else if (value > node.value) {
            node.right = this._insertRecursive(node.right, value);
        }

        return node;
    }

    /**
     * Search for a value
     * @param {*} value - Value to find
     * @returns {boolean} - True if found
     */
    search(value) {
        return this._search(this.root, value);
    }

    _search(node, value) {
        if (node === null) {
            return false;
        }

        if (value === node.value) {
            return true;
        }

        if (value < node.value) {
            return this._search(node.left, value);
        } else {
            return this._search(node.right, value);
        }
    }

    /**
     * Find minimum value
     * @returns {*} - Minimum value or null
     */
    findMin() {
        if (this.root === null) return null;

        let current = this.root;
        while (current.left !== null) {
            current = current.left;
        }
        return current.value;
    }

    /**
     * Find maximum value
     * @returns {*} - Maximum value or null
     */
    findMax() {
        if (this.root === null) return null;

        let current = this.root;
        while (current.right !== null) {
            current = current.right;
        }
        return current.value;
    }

    /**
     * Delete a value from the BST
     * @param {*} value - Value to delete
     */
    delete(value) {
        this.root = this._delete(this.root, value);
        return this;
    }

    _delete(node, value) {
        if (node === null) {
            return null;
        }

        if (value < node.value) {
            node.left = this._delete(node.left, value);
        } else if (value > node.value) {
            node.right = this._delete(node.right, value);
        } else {
            // Node to delete found

            // Case 1: Leaf node
            if (node.left === null && node.right === null) {
                return null;
            }

            // Case 2: One child
            if (node.left === null) {
                return node.right;
            }
            if (node.right === null) {
                return node.left;
            }

            // Case 3: Two children
            // Find inorder successor (smallest in right subtree)
            let minRight = node.right;
            while (minRight.left !== null) {
                minRight = minRight.left;
            }

            // Replace value with successor
            node.value = minRight.value;

            // Delete successor
            node.right = this._delete(node.right, minRight.value);
        }

        return node;
    }

    /**
     * In-order traversal (Left-Root-Right) - gives sorted order
     * @returns {Array} - Array of values in sorted order
     */
    inOrderTraversal() {
        const result = [];
        this._inOrder(this.root, result);
        return result;
    }

    _inOrder(node, result) {
        if (node !== null) {
            this._inOrder(node.left, result);
            result.push(node.value);
            this._inOrder(node.right, result);
        }
    }

    /**
     * Pre-order traversal (Root-Left-Right)
     * @returns {Array} - Array of values
     */
    preOrderTraversal() {
        const result = [];
        this._preOrder(this.root, result);
        return result;
    }

    _preOrder(node, result) {
        if (node !== null) {
            result.push(node.value);
            this._preOrder(node.left, result);
            this._preOrder(node.right, result);
        }
    }

    /**
     * Post-order traversal (Left-Right-Root)
     * @returns {Array} - Array of values
     */
    postOrderTraversal() {
        const result = [];
        this._postOrder(this.root, result);
        return result;
    }

    _postOrder(node, result) {
        if (node !== null) {
            this._postOrder(node.left, result);
            this._postOrder(node.right, result);
            result.push(node.value);
        }
    }

    /**
     * Get height of tree
     * @returns {number} - Height of tree
     */
    height() {
        return this._height(this.root);
    }

    _height(node) {
        if (node === null) return -1;
        return 1 + Math.max(this._height(node.left), this._height(node.right));
    }

    /**
     * Check if tree is balanced
     * @returns {boolean} - True if balanced
     */
    isBalanced() {
        return this._isBalanced(this.root) !== -1;
    }

    _isBalanced(node) {
        if (node === null) return 0;

        const left = this._isBalanced(node.left);
        if (left === -1) return -1;

        const right = this._isBalanced(node.right);
        if (right === -1) return -1;

        if (Math.abs(left - right) > 1) return -1;

        return 1 + Math.max(left, right);
    }
}

// Test cases
console.log("=== Test Case 1: Basic Operations ===");
const bst = new BinarySearchTree();
bst.insert(5).insert(3).insert(7).insert(1).insert(4).insert(6).insert(9);
console.log("In-order traversal:", bst.inOrderTraversal());
console.log("Pre-order traversal:", bst.preOrderTraversal());
console.log("Post-order traversal:", bst.postOrderTraversal());

console.log("\n=== Test Case 2: Search ===");
console.log("Search 3:", bst.search(3)); // true
console.log("Search 10:", bst.search(10)); // false

console.log("\n=== Test Case 3: Find Min/Max ===");
console.log("Min:", bst.findMin()); // 1
console.log("Max:", bst.findMax()); // 9

console.log("\n=== Test Case 4: Delete Leaf ===");
const bst2 = new BinarySearchTree();
bst2.insert(5).insert(3).insert(7).insert(1).insert(9);
console.log("Before delete:", bst2.inOrderTraversal());
bst2.delete(1);
console.log("After delete 1:", bst2.inOrderTraversal());

console.log("\n=== Test Case 5: Delete Node with Two Children ===");
const bst3 = new BinarySearchTree();
bst3.insert(5).insert(3).insert(7).insert(1).insert(4).insert(6).insert(9);
console.log("Before delete:", bst3.inOrderTraversal());
bst3.delete(5);
console.log("After delete 5:", bst3.inOrderTraversal());

console.log("\n=== Test Case 6: Height and Balance ===");
const bst4 = new BinarySearchTree();
bst4.insert(5).insert(3).insert(7).insert(1).insert(9);
console.log("Height:", bst4.height());
console.log("Is balanced:", bst4.isBalanced());

const bst5 = new BinarySearchTree();
bst5.insert(1).insert(2).insert(3).insert(4).insert(5);
console.log("Height (skewed):", bst5.height());
console.log("Is balanced (skewed):", bst5.isBalanced());

/**
 * Time Complexity:
 * Average case (balanced tree):
 * - Insert: O(log n)
 * - Search: O(log n)
 * - Delete: O(log n)
 * - Traversals: O(n)
 *
 * Worst case (skewed tree):
 * - Insert: O(n)
 * - Search: O(n)
 * - Delete: O(n)
 *
 * Space: O(h) for recursion stack where h is height
 */
