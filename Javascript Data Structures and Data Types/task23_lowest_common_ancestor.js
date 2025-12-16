/**
 * Task 23: Lowest Common Ancestor in BST
 * Difficulty: Intermediate
 *
 * Problem Description:
 * Find the lowest common ancestor (LCA) of two nodes in a binary search tree.
 * The LCA is the lowest node that has both nodes as descendants.
 *
 * Expected Input/Output:
 * Input: root = [6,2,8,0,4,7,9,null,null,3,5], p = 2, q = 8
 * Output: 6
 *
 * Input: root = [6,2,8,0,4,7,9,null,null,3,5], p = 2, q = 4
 * Output: 2
 *
 * Hints/Approach:
 * - Leverage BST property for efficient solution
 * - If both nodes are less than root, LCA is in left subtree
 * - If both nodes are greater than root, LCA is in right subtree
 * - Otherwise, current node is LCA
 * - Time: O(h) where h is height
 */

class TreeNode {
    constructor(value) {
        this.value = value;
        this.left = null;
        this.right = null;
    }
}

/**
 * Solution 1: Iterative (most efficient for BST)
 */
function lowestCommonAncestor(root, p, q) {
    let current = root;

    while (current) {
        // Both p and q are in left subtree
        if (p.value < current.value && q.value < current.value) {
            current = current.left;
        }
        // Both p and q are in right subtree
        else if (p.value > current.value && q.value > current.value) {
            current = current.right;
        }
        // Current node is LCA (split point)
        else {
            return current;
        }
    }

    return null;
}

/**
 * Solution 2: Recursive approach
 */
function lowestCommonAncestorRecursive(root, p, q) {
    if (!root) return null;

    // Both in left subtree
    if (p.value < root.value && q.value < root.value) {
        return lowestCommonAncestorRecursive(root.left, p, q);
    }

    // Both in right subtree
    if (p.value > root.value && q.value > root.value) {
        return lowestCommonAncestorRecursive(root.right, p, q);
    }

    // Split point - current node is LCA
    return root;
}

/**
 * Solution 3: LCA for general binary tree (not just BST)
 * Slower but works for any binary tree
 */
function lcaBinaryTree(root, p, q) {
    if (!root || root === p || root === q) return root;

    const left = lcaBinaryTree(root.left, p, q);
    const right = lcaBinaryTree(root.right, p, q);

    // If found on both sides, current node is LCA
    if (left && right) return root;

    // Return non-null result
    return left || right;
}

// Helper to create BST
function createBST() {
    const root = new TreeNode(6);
    root.left = new TreeNode(2);
    root.right = new TreeNode(8);
    root.left.left = new TreeNode(0);
    root.left.right = new TreeNode(4);
    root.right.left = new TreeNode(7);
    root.right.right = new TreeNode(9);
    root.left.right.left = new TreeNode(3);
    root.left.right.right = new TreeNode(5);
    return root;
}

// Test cases
console.log("=== Test Case 1: LCA of 2 and 8 ===");
const tree1 = createBST();
const lca1 = lowestCommonAncestor(tree1, tree1.left, tree1.right);
console.log("LCA:", lca1.value); // 6

console.log("\n=== Test Case 2: LCA of 2 and 4 ===");
const tree2 = createBST();
const lca2 = lowestCommonAncestor(tree2, tree2.left, tree2.left.right);
console.log("LCA:", lca2.value); // 2

console.log("\n=== Test Case 3: Recursive Approach ===");
const tree3 = createBST();
const lca3 = lowestCommonAncestorRecursive(tree3, tree3.left.right.left, tree3.left.right.right);
console.log("LCA (recursive):", lca3.value); // 4

/**
 * Time Complexity: O(h) where h is height
 * - Best case (balanced): O(log n)
 * - Worst case (skewed): O(n)
 *
 * Space Complexity:
 * - Iterative: O(1)
 * - Recursive: O(h) for call stack
 *
 * Key Insight: BST property allows us to navigate without exploring both subtrees
 */
