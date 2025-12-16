# Linked Lists

## What is a Linked List?

A linear data structure where elements (nodes) are connected via pointers. Each node contains **data** and a **reference (pointer)** to the next node.

## Types of Linked Lists

### 1. Singly Linked List
```csharp
class ListNode {
    public int val;
    public ListNode next;

    public ListNode(int val = 0, ListNode next = null) {
        this.val = val;
        this.next = next;
    }
}
```

### 2. Doubly Linked List
```csharp
class DoublyListNode {
    public int val;
    public DoublyListNode prev;
    public DoublyListNode next;

    public DoublyListNode(int val = 0) {
        this.val = val;
        this.prev = null;
        this.next = null;
    }
}
```

### 3. Circular Linked List
Last node points back to the first node.

## Basic Operations

### Insert at Beginning
```csharp
ListNode InsertAtBeginning(ListNode head, int value) {
    ListNode newNode = new ListNode(value);
    newNode.next = head;
    return newNode;  // New head
}
```

### Insert at End
```csharp
ListNode InsertAtEnd(ListNode head, int value) {
    ListNode newNode = new ListNode(value);

    if (head == null) return newNode;

    ListNode current = head;
    while (current.next != null) {
        current = current.next;
    }
    current.next = newNode;

    return head;
}
```

### Delete Node
```csharp
ListNode DeleteNode(ListNode head, int value) {
    if (head == null) return null;

    if (head.val == value) return head.next;

    ListNode current = head;
    while (current.next != null && current.next.val != value) {
        current = current.next;
    }

    if (current.next != null) {
        current.next = current.next.next;
    }

    return head;
}
```

### Search
```csharp
bool Search(ListNode head, int value) {
    ListNode current = head;
    while (current != null) {
        if (current.val == value) return true;
        current = current.next;
    }
    return false;
}
```

## Time Complexity

| Operation | Array | Linked List |
|-----------|-------|-------------|
| Access | O(1) | O(n) |
| Search | O(n) | O(n) |
| Insert (beginning) | O(n) | O(1) |
| Insert (end) | O(1) | O(n) without tail pointer |
| Delete | O(n) | O(1) if node is given |

## Common Patterns

### 1. Two Pointers (Slow & Fast)

#### Find Middle of Linked List
```csharp
ListNode FindMiddle(ListNode head) {
    ListNode slow = head;
    ListNode fast = head;

    while (fast != null && fast.next != null) {
        slow = slow.next;
        fast = fast.next.next;
    }

    return slow;
}
```

#### Detect Cycle (Floyd's Algorithm)
```csharp
bool HasCycle(ListNode head) {
    ListNode slow = head;
    ListNode fast = head;

    while (fast != null && fast.next != null) {
        slow = slow.next;
        fast = fast.next.next;

        if (slow == fast) return true;
    }

    return false;
}
```

### 2. Reverse Linked List

#### Iterative
```csharp
ListNode Reverse(ListNode head) {
    ListNode prev = null;
    ListNode current = head;

    while (current != null) {
        ListNode nextTemp = current.next;
        current.next = prev;
        prev = current;
        current = nextTemp;
    }

    return prev;
}
```

#### Recursive
```csharp
ListNode ReverseRecursive(ListNode head) {
    if (head == null || head.next == null) return head;

    ListNode newHead = ReverseRecursive(head.next);
    head.next.next = head;
    head.next = null;

    return newHead;
}
```

### 3. Merge Two Sorted Lists
```csharp
ListNode MergeTwoLists(ListNode l1, ListNode l2) {
    ListNode dummy = new ListNode(0);
    ListNode current = dummy;

    while (l1 != null && l2 != null) {
        if (l1.val <= l2.val) {
            current.next = l1;
            l1 = l1.next;
        }
        else {
            current.next = l2;
            l2 = l2.next;
        }
        current = current.next;
    }

    current.next = l1 ?? l2;

    return dummy.next;
}
```

## Advanced Problems

### 1. Remove Nth Node From End
```csharp
ListNode RemoveNthFromEnd(ListNode head, int n) {
    ListNode dummy = new ListNode(0);
    dummy.next = head;
    ListNode first = dummy;
    ListNode second = dummy;

    // Move first n+1 steps ahead
    for (int i = 0; i <= n; i++) {
        first = first.next;
    }

    // Move both until first reaches end
    while (first != null) {
        first = first.next;
        second = second.next;
    }

    // Remove nth node
    second.next = second.next.next;

    return dummy.next;
}
```

### 2. Palindrome Linked List
```csharp
bool IsPalindrome(ListNode head) {
    if (head == null) return true;

    // Find middle
    ListNode slow = head, fast = head;
    while (fast != null && fast.next != null) {
        slow = slow.next;
        fast = fast.next.next;
    }

    // Reverse second half
    ListNode prev = null, current = slow;
    while (current != null) {
        ListNode nextTemp = current.next;
        current.next = prev;
        prev = current;
        current = nextTemp;
    }

    // Compare both halves
    ListNode left = head, right = prev;
    while (right != null) {
        if (left.val != right.val) return false;
        left = left.next;
        right = right.next;
    }

    return true;
}
```

### 3. Intersection of Two Linked Lists
```csharp
ListNode GetIntersectionNode(ListNode headA, ListNode headB) {
    if (headA == null || headB == null) return null;

    ListNode a = headA;
    ListNode b = headB;

    while (a != b) {
        a = a == null ? headB : a.next;
        b = b == null ? headA : b.next;
    }

    return a;
}
```

### 4. Add Two Numbers (Linked List)
```csharp
// Input: (2 -> 4 -> 3) + (5 -> 6 -> 4)
// Output: 7 -> 0 -> 8  (342 + 465 = 807)
ListNode AddTwoNumbers(ListNode l1, ListNode l2) {
    ListNode dummy = new ListNode(0);
    ListNode current = dummy;
    int carry = 0;

    while (l1 != null || l2 != null || carry > 0) {
        int sum = carry;
        if (l1 != null) {
            sum += l1.val;
            l1 = l1.next;
        }
        if (l2 != null) {
            sum += l2.val;
            l2 = l2.next;
        }

        carry = sum / 10;
        current.next = new ListNode(sum % 10);
        current = current.next;
    }

    return dummy.next;
}
```

### 5. Copy List with Random Pointer
```csharp
class Node {
    public int val;
    public Node next;
    public Node random;

    public Node(int val) {
        this.val = val;
        this.next = null;
        this.random = null;
    }
}

Node CopyRandomList(Node head) {
    if (head == null) return null;

    Dictionary<Node, Node> map = new Dictionary<Node, Node>();

    // First pass: Create all nodes
    Node current = head;
    while (current != null) {
        map[current] = new Node(current.val);
        current = current.next;
    }

    // Second pass: Assign next and random pointers
    current = head;
    while (current != null) {
        map[current].next = current.next != null ? map[current.next] : null;
        map[current].random = current.random != null ? map[current.random] : null;
        current = current.next;
    }

    return map[head];
}
```

### 6. Flatten Multilevel Doubly Linked List
```csharp
Node Flatten(Node head) {
    if (head == null) return null;

    Node current = head;

    while (current != null) {
        if (current.child != null) {
            Node next = current.next;
            Node child = current.child;

            current.next = child;
            child.prev = current;
            current.child = null;

            // Find tail of child list
            Node tail = child;
            while (tail.next != null) {
                tail = tail.next;
            }

            // Connect tail to next
            if (next != null) {
                tail.next = next;
                next.prev = tail;
            }
        }

        current = current.next;
    }

    return head;
}
```

## Dummy Node Technique

Use a dummy node to simplify edge cases (empty list, inserting at beginning):

```csharp
ListNode dummy = new ListNode(0);
dummy.next = head;
// ... perform operations
return dummy.next;  // Return new head
```

## Interview Tips

- Always check for `null` (empty list)
- Draw diagrams to visualize pointer changes
- Use dummy node for edge cases
- Two pointers (slow/fast) for cycle detection, middle finding
- Consider reversing the list if needed
- Remember: `current.next.next` requires checking both `current` and `current.next` are not null

## Common Edge Cases

1. Empty list (`head == null`)
2. Single node
3. Two nodes (important for reverse, middle finding)
4. Cycle detection
5. Null checks before accessing `.next`

## Practice Problems

1. Reverse Nodes in k-Group
2. Sort List (Merge Sort)
3. LRU Cache (Doubly Linked List + HashMap)
4. Design Linked List
5. Rotate List
6. Reorder List
7. Odd Even Linked List
8. Partition List
