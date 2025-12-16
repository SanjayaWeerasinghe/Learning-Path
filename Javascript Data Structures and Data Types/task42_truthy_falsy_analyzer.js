/**
 * Task 42: Truthy/Falsy Analyzer
 * Difficulty: Beginner
 */

function analyzeTruthiness(values) {
    const truthy = [];
    const falsy = [];

    values.forEach(value => {
        const entry = { value, type: typeof value };
        if (Boolean(value)) {
            truthy.push(entry);
        } else {
            falsy.push(entry);
        }
    });

    return { truthy, falsy };
}

// Tests
const result = analyzeTruthiness([0, 1, "", "hello", null, undefined, [], {}]);
console.log("Truthy:", result.truthy);
console.log("Falsy:", result.falsy);
