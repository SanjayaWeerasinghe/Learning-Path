/**
 * Task 57: Dynamic Property Creator
 * Difficulty: Intermediate
 */

function createDynamicObject(properties) {
    const obj = {};

    properties.forEach(prop => {
        const { key, value, enumerable = true, getter = false } = prop;

        if (getter) {
            Object.defineProperty(obj, key, {
                get: value,
                enumerable,
                configurable: true
            });
        } else {
            Object.defineProperty(obj, key, {
                value,
                writable: true,
                enumerable,
                configurable: true
            });
        }
    });

    return obj;
}

// Tests
const obj = createDynamicObject([
    { key: 'name', value: 'John', enumerable: true },
    { key: Symbol('id'), value: 123, enumerable: false },
    { key: 'computed', value: () => 'Hello', getter: true }
]);

console.log(obj.name); // "John"
console.log(obj.computed); // "Hello"
console.log(Object.keys(obj)); // ["name", "computed"]
