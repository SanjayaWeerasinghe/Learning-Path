/**
 * Task 45: Null/Undefined Guard
 * Difficulty: Beginner
 */

function safeAccess(obj, path, defaultValue) {
    const keys = path.split('.');

    let current = obj;
    for (const key of keys) {
        if (current === null || current === undefined) {
            return defaultValue;
        }
        current = current[key];
    }

    return current !== undefined ? current : defaultValue;
}

// Tests
console.log(safeAccess({ user: { name: "John" } }, "user.name", "N/A")); // "John"
console.log(safeAccess({ user: null }, "user.address.city", "N/A")); // "N/A"
console.log(safeAccess({}, "user.name", "Unknown")); // "Unknown"
console.log(safeAccess({ user: { age: 0 } }, "user.age", 18)); // 0
