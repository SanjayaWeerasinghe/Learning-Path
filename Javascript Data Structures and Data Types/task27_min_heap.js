/**
 * Task 27: Implement Min Heap
 * Difficulty: Advanced
 */

class MinHeap {
    constructor() {
        this.heap = [];
    }

    getParentIndex(i) { return Math.floor((i - 1) / 2); }
    getLeftChildIndex(i) { return 2 * i + 1; }
    getRightChildIndex(i) { return 2 * i + 2; }

    swap(i, j) {
        [this.heap[i], this.heap[j]] = [this.heap[j], this.heap[i]];
    }

    insert(value) {
        this.heap.push(value);
        this.bubbleUp(this.heap.length - 1);
    }

    bubbleUp(index) {
        while (index > 0) {
            const parentIndex = this.getParentIndex(index);
            if (this.heap[parentIndex] <= this.heap[index]) break;
            this.swap(parentIndex, index);
            index = parentIndex;
        }
    }

    extractMin() {
        if (this.heap.length === 0) return null;
        if (this.heap.length === 1) return this.heap.pop();

        const min = this.heap[0];
        this.heap[0] = this.heap.pop();
        this.bubbleDown(0);
        return min;
    }

    bubbleDown(index) {
        while (true) {
            const leftIndex = this.getLeftChildIndex(index);
            const rightIndex = this.getRightChildIndex(index);
            let smallest = index;

            if (leftIndex < this.heap.length && this.heap[leftIndex] < this.heap[smallest]) {
                smallest = leftIndex;
            }
            if (rightIndex < this.heap.length && this.heap[rightIndex] < this.heap[smallest]) {
                smallest = rightIndex;
            }

            if (smallest === index) break;
            this.swap(index, smallest);
            index = smallest;
        }
    }

    peek() {
        return this.heap[0] || null;
    }

    size() {
        return this.heap.length;
    }
}

// Tests
const heap = new MinHeap();
heap.insert(3);
heap.insert(1);
heap.insert(5);
console.log(heap.peek()); // 1
console.log(heap.extractMin()); // 1
console.log(heap.peek()); // 3
