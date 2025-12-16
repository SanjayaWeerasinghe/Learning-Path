/**
 * Task 58: Object Property Type Mapper
 * Difficulty: Beginner
 */

function mapPropertyTypes(obj) {
    const result = {};

    for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
            const value = obj[key];

            if (value === null) {
                result[key] = "null";
            } else if (Array.isArray(value)) {
                result[key] = "array";
            } else {
                result[key] = typeof value;
            }
        }
    }

    return result;
}

// Tests
console.log(mapPropertyTypes({ name: "John", age: 30, active: true }));
// { name: "string", age: "number", active: "boolean" }

console.log(mapPropertyTypes({ user: { id: 1 }, items: [1, 2] }));
// { user: "object", items: "array" }

console.log(mapPropertyTypes({ x: null, y: undefined }));
// { x: "null", y: "undefined" }
