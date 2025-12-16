/**
 * Task 43: Logical Operators Deep Dive
 * Difficulty: Intermediate
 */

function evaluateLogical(a, operator, b) {
    let result;
    let explanation;

    switch (operator) {
        case '&&':
            result = a && b;
            explanation = a ? `Left side is truthy, returned right side` : `Left side (${a}) is falsy, returned left side`;
            break;
        case '||':
            result = a || b;
            explanation = a ? `Left side (${a}) is truthy, returned left side` : `Left side is falsy, returned right side`;
            break;
        case '??':
            result = a ?? b;
            explanation = (a === null || a === undefined) ? `Left side is nullish, returned right side` : `Left side is not nullish, returned left side`;
            break;
        default:
            return { result: undefined, explanation: "Invalid operator" };
    }

    return { result, explanation };
}

// Tests
console.log(evaluateLogical(0, '||', 5));
console.log(evaluateLogical("hello", '&&', "world"));
console.log(evaluateLogical(null, '??', "default"));
