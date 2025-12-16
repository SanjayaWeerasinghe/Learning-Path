/**
 * Task 28: Kth Largest Element
 * Difficulty: Intermediate
 */

function findKthLargest(nums, k) {
    const minHeap = [];

    function heapifyUp(arr, i) {
        while (i > 0) {
            const parent = Math.floor((i - 1) / 2);
            if (arr[parent] <= arr[i]) break;
            [arr[parent], arr[i]] = [arr[i], arr[parent]];
            i = parent;
        }
    }

    function heapifyDown(arr, i) {
        while (true) {
            let smallest = i;
            const left = 2 * i + 1;
            const right = 2 * i + 2;

            if (left < arr.length && arr[left] < arr[smallest]) smallest = left;
            if (right < arr.length && arr[right] < arr[smallest]) smallest = right;

            if (smallest === i) break;
            [arr[i], arr[smallest]] = [arr[smallest], arr[i]];
            i = smallest;
        }
    }

    for (const num of nums) {
        if (minHeap.length < k) {
            minHeap.push(num);
            heapifyUp(minHeap, minHeap.length - 1);
        } else if (num > minHeap[0]) {
            minHeap[0] = num;
            heapifyDown(minHeap, 0);
        }
    }

    return minHeap[0];
}

// QuickSelect approach
function findKthLargestQuickSelect(nums, k) {
    k = nums.length - k; // Convert to kth smallest

    function partition(left, right) {
        const pivot = nums[right];
        let i = left;

        for (let j = left; j < right; j++) {
            if (nums[j] <= pivot) {
                [nums[i], nums[j]] = [nums[j], nums[i]];
                i++;
            }
        }

        [nums[i], nums[right]] = [nums[right], nums[i]];
        return i;
    }

    function select(left, right) {
        if (left === right) return nums[left];

        const pivotIndex = partition(left, right);

        if (k === pivotIndex) return nums[k];
        else if (k < pivotIndex) return select(left, pivotIndex - 1);
        else return select(pivotIndex + 1, right);
    }

    return select(0, nums.length - 1);
}

// Tests
console.log(findKthLargest([3, 2, 1, 5, 6, 4], 2)); // 5
console.log(findKthLargestQuickSelect([3, 2, 3, 1, 2, 4, 5, 5, 6], 4)); // 4
