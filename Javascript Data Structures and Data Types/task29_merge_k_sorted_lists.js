/**
 * Task 29: Merge K Sorted Lists
 * Difficulty: Advanced
 */

class ListNode {
    constructor(value) {
        this.value = value;
        this.next = null;
    }
}

function mergeKLists(lists) {
    if (!lists || lists.length === 0) return null;

    while (lists.length > 1) {
        const mergedLists = [];

        for (let i = 0; i < lists.length; i += 2) {
            const l1 = lists[i];
            const l2 = i + 1 < lists.length ? lists[i + 1] : null;
            mergedLists.push(mergeTwoLists(l1, l2));
        }

        lists = mergedLists;
    }

    return lists[0];
}

function mergeTwoLists(l1, l2) {
    const dummy = new ListNode(0);
    let current = dummy;

    while (l1 && l2) {
        if (l1.value <= l2.value) {
            current.next = l1;
            l1 = l1.next;
        } else {
            current.next = l2;
            l2 = l2.next;
        }
        current = current.next;
    }

    current.next = l1 || l2;
    return dummy.next;
}

function createList(arr) {
    if (!arr || arr.length === 0) return null;
    const head = new ListNode(arr[0]);
    let current = head;
    for (let i = 1; i < arr.length; i++) {
        current.next = new ListNode(arr[i]);
        current = current.next;
    }
    return head;
}

function toArray(head) {
    const arr = [];
    while (head) {
        arr.push(head.value);
        head = head.next;
    }
    return arr;
}

// Tests
const lists = [
    createList([1, 4, 5]),
    createList([1, 3, 4]),
    createList([2, 6])
];
const merged = mergeKLists(lists);
console.log(toArray(merged)); // [1, 1, 2, 3, 4, 4, 5, 6]
