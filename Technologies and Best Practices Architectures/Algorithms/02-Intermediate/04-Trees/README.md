# Trees

## What is a Tree?

A hierarchical data structure with a **root** node and child nodes. Each node can have zero or more children.

## Binary Tree

Each node has **at most 2 children** (left and right).

### Node Structure
```csharp
class TreeNode {
    public int val;
    public TreeNode left;
    public TreeNode right;

    public TreeNode(int val = 0, TreeNode left = null, TreeNode right = null) {
        this.val = val;
        this.left = left;
        this.right = right;
    }
}
```

## Types of Binary Trees

### 1. Full Binary Tree
Every node has 0 or 2 children.

### 2. Complete Binary Tree
All levels filled except possibly the last, filled left to right.

### 3. Perfect Binary Tree
All internal nodes have 2 children, all leaves at same level.

### 4. Binary Search Tree (BST)
- Left subtree values < node value
- Right subtree values > node value
- Both subtrees are also BSTs

### 5. Balanced Tree
Height difference between left and right subtrees ≤ 1 for all nodes.

## Tree Traversals

### 1. Inorder (Left, Root, Right)
```csharp
void Inorder(TreeNode root) {
    if (root == null) return;

    Inorder(root.left);
    Console.Write(root.val + " ");
    Inorder(root.right);
}
// BST: Gives sorted order
```

### 2. Preorder (Root, Left, Right)
```csharp
void Preorder(TreeNode root) {
    if (root == null) return;

    Console.Write(root.val + " ");
    Preorder(root.left);
    Preorder(root.right);
}
// Use: Copy tree, prefix expression
```

### 3. Postorder (Left, Right, Root)
```csharp
void Postorder(TreeNode root) {
    if (root == null) return;

    Postorder(root.left);
    Postorder(root.right);
    Console.Write(root.val + " ");
}
// Use: Delete tree, postfix expression
```

### 4. Level Order (BFS)
```csharp
IList<IList<int>> LevelOrder(TreeNode root) {
    List<IList<int>> result = new List<IList<int>>();
    if (root == null) return result;

    Queue<TreeNode> queue = new Queue<TreeNode>();
    queue.Enqueue(root);

    while (queue.Count > 0) {
        int levelSize = queue.Count;
        List<int> currentLevel = new List<int>();

        for (int i = 0; i < levelSize; i++) {
            TreeNode node = queue.Dequeue();
            currentLevel.Add(node.val);

            if (node.left != null) queue.Enqueue(node.left);
            if (node.right != null) queue.Enqueue(node.right);
        }

        result.Add(currentLevel);
    }

    return result;
}
```

## Common Tree Problems

### 1. Maximum Depth
```csharp
int MaxDepth(TreeNode root) {
    if (root == null) return 0;
    return 1 + Math.Max(MaxDepth(root.left), MaxDepth(root.right));
}
```

### 2. Invert Binary Tree
```csharp
TreeNode InvertTree(TreeNode root) {
    if (root == null) return null;

    TreeNode temp = root.left;
    root.left = InvertTree(root.right);
    root.right = InvertTree(temp);

    return root;
}
```

### 3. Symmetric Tree
```csharp
bool IsSymmetric(TreeNode root) {
    return IsMirror(root, root);
}

bool IsMirror(TreeNode t1, TreeNode t2) {
    if (t1 == null && t2 == null) return true;
    if (t1 == null || t2 == null) return false;

    return (t1.val == t2.val) &&
           IsMirror(t1.left, t2.right) &&
           IsMirror(t1.right, t2.left);
}
```

### 4. Same Tree
```csharp
bool IsSameTree(TreeNode p, TreeNode q) {
    if (p == null && q == null) return true;
    if (p == null || q == null) return false;

    return (p.val == q.val) &&
           IsSameTree(p.left, q.left) &&
           IsSameTree(p.right, q.right);
}
```

### 5. Path Sum
```csharp
bool HasPathSum(TreeNode root, int targetSum) {
    if (root == null) return false;

    if (root.left == null && root.right == null) {
        return targetSum == root.val;
    }

    return HasPathSum(root.left, targetSum - root.val) ||
           HasPathSum(root.right, targetSum - root.val);
}
```

### 6. Lowest Common Ancestor (LCA)
```csharp
TreeNode LowestCommonAncestor(TreeNode root, TreeNode p, TreeNode q) {
    if (root == null || root == p || root == q) return root;

    TreeNode left = LowestCommonAncestor(root.left, p, q);
    TreeNode right = LowestCommonAncestor(root.right, p, q);

    if (left != null && right != null) return root;
    return left != null ? left : right;
}
```

### 7. Diameter of Binary Tree
```csharp
int diameter = 0;

int DiameterOfBinaryTree(TreeNode root) {
    Height(root);
    return diameter;
}

int Height(TreeNode node) {
    if (node == null) return 0;

    int leftHeight = Height(node.left);
    int rightHeight = Height(node.right);

    diameter = Math.Max(diameter, leftHeight + rightHeight);

    return 1 + Math.Max(leftHeight, rightHeight);
}
```

### 8. Balanced Binary Tree
```csharp
bool IsBalanced(TreeNode root) {
    return CheckHeight(root) != -1;
}

int CheckHeight(TreeNode node) {
    if (node == null) return 0;

    int leftHeight = CheckHeight(node.left);
    if (leftHeight == -1) return -1;

    int rightHeight = CheckHeight(node.right);
    if (rightHeight == -1) return -1;

    if (Math.Abs(leftHeight - rightHeight) > 1) return -1;

    return 1 + Math.Max(leftHeight, rightHeight);
}
```

### 9. Binary Tree Right Side View
```csharp
IList<int> RightSideView(TreeNode root) {
    List<int> result = new List<int>();
    if (root == null) return result;

    Queue<TreeNode> queue = new Queue<TreeNode>();
    queue.Enqueue(root);

    while (queue.Count > 0) {
        int levelSize = queue.Count;

        for (int i = 0; i < levelSize; i++) {
            TreeNode node = queue.Dequeue();

            if (i == levelSize - 1) {
                result.Add(node.val);
            }

            if (node.left != null) queue.Enqueue(node.left);
            if (node.right != null) queue.Enqueue(node.right);
        }
    }

    return result;
}
```

### 10. Construct Tree from Traversals
```csharp
// From Inorder and Preorder
TreeNode BuildTree(int[] preorder, int[] inorder) {
    return Build(preorder, inorder, 0, 0, inorder.Length - 1);
}

TreeNode Build(int[] preorder, int[] inorder, int preStart, int inStart, int inEnd) {
    if (preStart > preorder.Length - 1 || inStart > inEnd) return null;

    TreeNode root = new TreeNode(preorder[preStart]);
    int inIndex = 0;

    for (int i = inStart; i <= inEnd; i++) {
        if (inorder[i] == root.val) {
            inIndex = i;
            break;
        }
    }

    root.left = Build(preorder, inorder, preStart + 1, inStart, inIndex - 1);
    root.right = Build(preorder, inorder, preStart + inIndex - inStart + 1, inIndex + 1, inEnd);

    return root;
}
```

## Binary Search Tree (BST) Operations

### Search in BST
```csharp
TreeNode SearchBST(TreeNode root, int val) {
    if (root == null || root.val == val) return root;

    return val < root.val ?
           SearchBST(root.left, val) :
           SearchBST(root.right, val);
}
```

### Insert in BST
```csharp
TreeNode InsertIntoBST(TreeNode root, int val) {
    if (root == null) return new TreeNode(val);

    if (val < root.val) {
        root.left = InsertIntoBST(root.left, val);
    }
    else {
        root.right = InsertIntoBST(root.right, val);
    }

    return root;
}
```

### Validate BST
```csharp
bool IsValidBST(TreeNode root) {
    return Validate(root, null, null);
}

bool Validate(TreeNode node, int? min, int? max) {
    if (node == null) return true;

    if ((min.HasValue && node.val <= min.Value) ||
        (max.HasValue && node.val >= max.Value)) {
        return false;
    }

    return Validate(node.left, min, node.val) &&
           Validate(node.right, node.val, max);
}
```

### Kth Smallest in BST
```csharp
int KthSmallest(TreeNode root, int k) {
    Stack<TreeNode> stack = new Stack<TreeNode>();
    TreeNode current = root;

    while (current != null || stack.Count > 0) {
        while (current != null) {
            stack.Push(current);
            current = current.left;
        }

        current = stack.Pop();
        k--;
        if (k == 0) return current.val;

        current = current.right;
    }

    return -1;
}
```

## Tree Properties

| Property | Formula |
|----------|---------|
| Max nodes at level l | 2^l |
| Max nodes in tree (height h) | 2^(h+1) - 1 |
| Min height | log₂(n+1) - 1 |
| Leaf nodes (full tree) | (n+1) / 2 |

## DFS vs BFS

| Aspect | DFS (Recursion/Stack) | BFS (Queue) |
|--------|----------------------|-------------|
| Memory | O(h) height | O(w) width |
| Use Case | Path finding, tree structure | Level order, shortest path |
| Implementation | Recursion (simple) | Queue (iterative) |

## Interview Tips

- **Always check for null**: `if (root == null) return ...`
- **Recursion**: Most tree problems use recursion
- **Base case**: Usually null node
- **BST**: Inorder gives sorted order
- **Level order**: Use queue (BFS)
- **Height/Depth**: DFS with max of children + 1
- **Think recursively**: What does subtree return?

## Practice Problems

1. Serialize and Deserialize Binary Tree
2. Binary Tree Maximum Path Sum
3. Flatten Binary Tree to Linked List
4. Count Complete Tree Nodes
5. Sum Root to Leaf Numbers
6. Binary Tree Zigzag Level Order
7. Recover Binary Search Tree
8. Populating Next Right Pointers
9. All Paths from Root to Leaf
10. Vertical Order Traversal
