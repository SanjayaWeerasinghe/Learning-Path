/**
 * Task 46: Null vs Undefined Differentiator
 * Difficulty: Beginner
 */

function distinguishNullish(obj) {
    const withNull = [];
    const withUndefined = [];
    const withValues = [];

    for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
            const value = obj[key];

            if (value === null) {
                withNull.push(key);
            } else if (value === undefined) {
                withUndefined.push(key);
            } else {
                withValues.push(key);
            }
        }
    }

    return { withNull, withUndefined, withValues };
}

// Tests
console.log(distinguishNullish({ a: 1, b: null, c: undefined, d: 0 }));
// { withNull: ["b"], withUndefined: ["c"], withValues: ["a", "d"] }

console.log(distinguishNullish({ x: null, y: "", z: false }));
// { withNull: ["x"], withUndefined: [], withValues: ["y", "z"] }
