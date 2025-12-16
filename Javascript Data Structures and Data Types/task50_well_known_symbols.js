/**
 * Task 50: Well-Known Symbols
 * Difficulty: Advanced
 */

class CustomCollection {
    constructor(items) {
        this.items = items;
    }

    [Symbol.iterator]() {
        let index = 0;
        const items = this.items;

        return {
            next() {
                if (index < items.length) {
                    return { value: items[index++], done: false };
                }
                return { done: true };
            }
        };
    }

    get [Symbol.toStringTag]() {
        return 'CustomCollection';
    }

    [Symbol.toPrimitive](hint) {
        if (hint === 'number') {
            return this.items.reduce((sum, item) => sum + item, 0);
        }
        if (hint === 'string') {
            return `Collection(${this.items.length})`;
        }
        return this.items.length;
    }
}

// Tests
const col = new CustomCollection([1, 2, 3]);
console.log([...col]); // [1, 2, 3]
console.log(String(col)); // "Collection(3)"
console.log(+col); // 6
console.log(Object.prototype.toString.call(col)); // "[object CustomCollection]"
