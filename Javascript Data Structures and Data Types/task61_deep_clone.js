/**
 * Task 61: Safe Deep Clone
 * Difficulty: Advanced
 */

function deepClone(obj, hash = new WeakMap()) {
    // Handle primitives and null
    if (obj === null || typeof obj !== 'object') {
        return obj;
    }

    // Handle circular references
    if (hash.has(obj)) {
        return hash.get(obj);
    }

    // Handle Date
    if (obj instanceof Date) {
        return new Date(obj);
    }

    // Handle RegExp
    if (obj instanceof RegExp) {
        return new RegExp(obj);
    }

    // Handle Array
    if (Array.isArray(obj)) {
        const arrCopy = [];
        hash.set(obj, arrCopy);
        obj.forEach((item, index) => {
            arrCopy[index] = deepClone(item, hash);
        });
        return arrCopy;
    }

    // Handle Set
    if (obj instanceof Set) {
        const setCopy = new Set();
        hash.set(obj, setCopy);
        obj.forEach(value => {
            setCopy.add(deepClone(value, hash));
        });
        return setCopy;
    }

    // Handle Map
    if (obj instanceof Map) {
        const mapCopy = new Map();
        hash.set(obj, mapCopy);
        obj.forEach((value, key) => {
            mapCopy.set(deepClone(key, hash), deepClone(value, hash));
        });
        return mapCopy;
    }

    // Handle Object
    const objCopy = Object.create(Object.getPrototypeOf(obj));
    hash.set(obj, objCopy);

    // Clone regular properties
    Object.keys(obj).forEach(key => {
        objCopy[key] = deepClone(obj[key], hash);
    });

    // Clone symbol properties
    Object.getOwnPropertySymbols(obj).forEach(sym => {
        objCopy[sym] = deepClone(obj[sym], hash);
    });

    return objCopy;
}

// Tests
const original = {
    date: new Date(),
    regex: /test/g,
    nested: { a: 1, b: { c: 2 } },
    arr: [1, 2, 3]
};

const cloned = deepClone(original);
cloned.nested.b.c = 999;

console.log("Original nested.b.c:", original.nested.b.c); // 2
console.log("Cloned nested.b.c:", cloned.nested.b.c); // 999
console.log("Date cloned correctly:", cloned.date instanceof Date);
console.log("Regex cloned correctly:", cloned.regex instanceof RegExp);
