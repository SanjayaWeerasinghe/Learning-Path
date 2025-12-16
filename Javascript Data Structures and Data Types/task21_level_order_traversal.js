/**
 * Task 21: Level Order Traversal (BFS)
 * Difficulty: Intermediate
 *
 * Problem Description:
 * Given the root of a binary tree, return the level order traversal of its nodes' values
 * (i.e., from left to right, level by level).
 *
 * Expected Input/Output:
 * Input: root = [3,9,20,null,null,15,7]
 * Output: [[3], [9,20], [15,7]]
 *
 * Input: root = [1]
 * Output: [[1]]
 *
 * Hints/Approach:
 * - Use a queue for BFS traversal
 * - Process nodes level by level
 * - Track level size to group nodes by level
 * - Enqueue children as you dequeue parents
 * - Time: O(n), Space: O(w) where w is max width
 */

class TreeNode {
    constructor(value) {
        this.value = value;
        this.left = null;
        this.right = null;
    }
}

/**
 * Solution 1: BFS with Queue
 * Standard level-order traversal
 */
function levelOrder(root) {
    if (!root) return [];

    const result = [];
    const queue = [root];

    while (queue.length > 0) {
        const levelSize = queue.length;
        const currentLevel = [];

        // Process all nodes at current level
        for (let i = 0; i < levelSize; i++) {
            const node = queue.shift();
            currentLevel.push(node.value);

            // Add children for next level
            if (node.left) queue.push(node.left);
            if (node.right) queue.push(node.right);
        }

        result.push(currentLevel);
    }

    return result;
}

/**
 * Solution 2: Recursive DFS approach
 * Tracks level and builds result array
 */
function levelOrderRecursive(root) {
    const result = [];
    dfs(root, 0, result);
    return result;
}

function dfs(node, level, result) {
    if (!node) return;

    // Create new level array if needed
    if (result.length === level) {
        result.push([]);
    }

    // Add current node to its level
    result[level].push(node.value);

    // Recurse on children
    dfs(node.left, level + 1, result);
    dfs(node.right, level + 1, result);
}

/**
 * Variation: Right-to-Left Level Order
 */
function levelOrderRight(root) {
    if (!root) return [];

    const result = [];
    const queue = [root];

    while (queue.length > 0) {
        const levelSize = queue.length;
        const currentLevel = [];

        for (let i = 0; i < levelSize; i++) {
            const node = queue.shift();
            currentLevel.push(node.value);

            // Add children right-to-left
            if (node.right) queue.push(node.right);
            if (node.left) queue.push(node.left);
        }

        result.push(currentLevel);
    }

    return result;
}

/**
 * Variation: Zigzag Level Order
 * Alternate between left-to-right and right-to-left
 */
function zigzagLevelOrder(root) {
    if (!root) return [];

    const result = [];
    const queue = [root];
    let leftToRight = true;

    while (queue.length > 0) {
        const levelSize = queue.length;
        const currentLevel = [];

        for (let i = 0; i < levelSize; i++) {
            const node = queue.shift();

            // Add to level based on direction
            if (leftToRight) {
                currentLevel.push(node.value);
            } else {
                currentLevel.unshift(node.value);
            }

            if (node.left) queue.push(node.left);
            if (node.right) queue.push(node.right);
        }

        result.push(currentLevel);
        leftToRight = !leftToRight;
    }

    return result;
}

/**
 * Helper: Create binary tree from array
 */
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
console.log("=== Test Case 1: Standard Level Order ===");
const tree1 = createTree([3, 9, 20, null, null, 15, 7]);
console.log("Level order:", levelOrder(tree1));
// Expected: [[3], [9, 20], [15, 7]]

console.log("\n=== Test Case 2: Single Node ===");
const tree2 = createTree([1]);
console.log("Level order:", levelOrder(tree2));
// Expected: [[1]]

console.log("\n=== Test Case 3: Recursive Approach ===");
const tree3 = createTree([1, 2, 3, 4, 5, 6, 7]);
console.log("Level order (recursive):", levelOrderRecursive(tree3));
// Expected: [[1], [2, 3], [4, 5, 6, 7]]

console.log("\n=== Test Case 4: Zigzag Level Order ===");
const tree4 = createTree([1, 2, 3, 4, 5, 6, 7]);
console.log("Zigzag level order:", zigzagLevelOrder(tree4));
// Expected: [[1], [3, 2], [4, 5, 6, 7]]

console.log("\n=== Test Case 5: Right-to-Left ===");
const tree5 = createTree([1, 2, 3, 4, 5]);
console.log("Right-to-left:", levelOrderRight(tree5));

/**
 * Time Complexity: O(n) - visit each node once
 * Space Complexity: O(w) - width of widest level in queue
 *
 * Applications:
 * - Tree visualization
 * - Finding shortest path in unweighted tree
 * - Level-by-level processing
 * - Finding nodes at specific depth
 */
