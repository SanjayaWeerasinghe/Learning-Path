/**
 * Task 37: Safe Number Calculator
 * Difficulty: Intermediate
 */

function safeCalculate(num1, operator, num2) {
    let result;
    let warning = null;

    switch (operator) {
        case '+':
            result = num1 + num2;
            break;
        case '-':
            result = num1 - num2;
            break;
        case '*':
            result = num1 * num2;
            break;
        case '/':
            result = num1 / num2;
            break;
        default:
            return { result: NaN, warning: "Invalid operator" };
    }

    // Check for precision issues
    if (Math.abs((num1 + num2) - result) > Number.EPSILON && operator === '+') {
        warning = "Floating point precision issue detected";
        result = parseFloat(result.toFixed(10));
    }

    // Check for overflow
    if (!Number.isFinite(result)) {
        warning = "Result exceeds safe number range";
    }

    // Check for NaN
    if (Number.isNaN(result)) {
        warning = "Result is NaN";
    }

    return { result, warning };
}

// Tests
console.log(safeCalculate(0.1, '+', 0.2));
console.log(safeCalculate(Number.MAX_VALUE, '*', 2));
console.log(safeCalculate(10, '/', 3));
