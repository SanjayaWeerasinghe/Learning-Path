/**
 * Task 22: Validate Binary Search Tree
 * Difficulty: Intermediate
 *
 * Problem Description:
 * Determine if a binary tree is a valid binary search tree.
 * A valid BST has all left descendants < node < all right descendants.
 *
 * Expected Input/Output:
 * Input: root = [2,1,3]
 * Output: true
 *
 * Input: root = [5,1,4,null,null,3,6]
 * Output: false (4 is in right subtree of 5 but 4 < 5)
 *
 * Hints/Approach:
 * - Can't just compare with immediate children
 * - Use range checking: track min and max allowed values
 * - Recursive approach: pass valid range down the tree
 * - Left subtree: max becomes current node value
 * - Right subtree: min becomes current node value
 */

class TreeNode {
    constructor(value) {
        this.value = value;
        this.left = null;
        this.right = null;
    }
}

/**
 * Solution 1: Recursive with Range Checking
 * Track valid range for each node
 */
function isValidBST(root) {
    return validate(root, -Infinity, Infinity);
}

function validate(node, min, max) {
    // Empty tree is valid
    if (node === null) return true;

    // Current node must be within range
    if (node.value <= min || node.value >= max) {
        return false;
    }

    // Recursively validate left and right subtrees
    // Left: all values must be < node.value
    // Right: all values must be > node.value
    return validate(node.left, min, node.value) &&
           validate(node.right, node.value, max);
}

/**
 * Solution 2: In-Order Traversal Approach
 * BST in-order traversal should be strictly increasing
 */
function isValidBSTInOrder(root) {
    let prev = -Infinity;

    function inOrder(node) {
        if (!node) return true;

        // Check left subtree
        if (!inOrder(node.left)) return false;

        // Check current node
        if (node.value <= prev) return false;
        prev = node.value;

        // Check right subtree
        return inOrder(node.right);
    }

    return inOrder(root);
}

/**
 * Solution 3: Iterative In-Order Traversal
 * Uses stack for traversal
 */
function isValidBSTIterative(root) {
    const stack = [];
    let current = root;
    let prev = -Infinity;

    while (current || stack.length > 0) {
        // Go to leftmost node
        while (current) {
            stack.push(current);
            current = current.left;
        }

        // Process node
        current = stack.pop();

        // Check if in-order (should be increasing)
        if (current.value <= prev) {
            return false;
        }
        prev = current.value;

        // Move to right subtree
        current = current.right;
    }

    return true;
}

// Helper function to create tree
function createTree(arr) {
    if (!arr || arr.length === 0) return null;

    const root = new TreeNode(arr[0]);
    const queue = [root];
    let i = 1;

    while (queue.length > 0 && i < arr.length) {
        const node = queue.shift();

        if (i < arr.length && arr[i] !== null) {
            node.left = new TreeNode(arr[i]);
            queue.push(node.left);
        }
        i++;

        if (i < arr.length && arr[i] !== null) {
            node.right = new TreeNode(arr[i]);
            queue.push(node.right);
        }
        i++;
    }

    return root;
}

// Test cases
console.log("=== Test Case 1: Valid BST ===");
const tree1 = createTree([2, 1, 3]);
console.log("Is valid BST:", isValidBST(tree1)); // true

console.log("\n=== Test Case 2: Invalid BST ===");
const tree2 = createTree([5, 1, 4, null, null, 3, 6]);
console.log("Is valid BST:", isValidBST(tree2)); // false

console.log("\n=== Test Case 3: Single Node ===");
const tree3 = createTree([1]);
console.log("Is valid BST:", isValidBST(tree3)); // true

console.log("\n=== Test Case 4: In-Order Approach ===");
const tree4 = createTree([2, 1, 3]);
console.log("Is valid (in-order):", isValidBSTInOrder(tree4)); // true

console.log("\n=== Test Case 5: Iterative Approach ===");
const tree5 = createTree([10, 5, 15, null, null, 6, 20]);
console.log("Is valid (iterative):", isValidBSTIterative(tree5)); // false

/**
 * Time Complexity: O(n) - visit each node once
 * Space Complexity: O(h) - recursion stack depth (h = height)
 *
 * Key Insight: Must track entire valid range, not just parent value
 */
