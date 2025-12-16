/**
 * Task 52: BigInt and Number Mixer
 * Difficulty: Beginner
 */

function mixedCalculation(bigIntValue, numberValue, operation) {
    let warning = null;
    let result;

    // Check if number has decimal part
    if (numberValue % 1 !== 0) {
        warning = "Decimal part lost in conversion";
    }

    const bigIntNumber = BigInt(Math.floor(numberValue));

    switch (operation) {
        case '+':
            result = bigIntValue + bigIntNumber;
            break;
        case '-':
            result = bigIntValue - bigIntNumber;
            break;
        case '*':
            result = bigIntValue * bigIntNumber;
            break;
        case '/':
            result = bigIntValue / bigIntNumber;
            break;
        default:
            return { result: null, type: null, warning: "Invalid operation" };
    }

    return { result, type: "BigInt", warning };
}

// Tests
console.log(mixedCalculation(100n, 50, '+'));
// { result: 150n, type: "BigInt", warning: null }

console.log(mixedCalculation(BigInt(Number.MAX_SAFE_INTEGER), 1.5, '+'));
// { result: 9007199254740993n, warning: "Decimal part lost in conversion" }

console.log(mixedCalculation(1000n, 3, '/'));
// { result: 333n, type: "BigInt", warning: null }
