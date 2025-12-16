/**
 * Task 38: Number Type Validator
 * Difficulty: Beginner
 */

function classifyNumber(value) {
    const isNumber = typeof value === 'number';

    if (!isNumber) {
        return { isNumber: false, type: typeof value, safe: false, value };
    }

    let type;
    if (Number.isNaN(value)) {
        type = "NaN";
    } else if (!Number.isFinite(value)) {
        type = "Infinity";
    } else if (Number.isInteger(value)) {
        type = "integer";
    } else {
        type = "float";
    }

    const safe = Number.isSafeInteger(value) || (type === "float" && Number.isFinite(value));

    return { isNumber, type, safe, value };
}

// Tests
console.log(classifyNumber(42));
// { isNumber: true, type: "integer", safe: true, value: 42 }

console.log(classifyNumber(3.14));
// { isNumber: true, type: "float", safe: true, value: 3.14 }

console.log(classifyNumber(NaN));
// { isNumber: true, type: "NaN", safe: false, value: NaN }

console.log(classifyNumber("hello"));
// { isNumber: false, type: "string", safe: false, value: "hello" }
