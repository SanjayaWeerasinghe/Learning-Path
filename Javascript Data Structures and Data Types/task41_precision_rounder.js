/**
 * Task 41: Precision Rounder
 * Difficulty: Beginner
 */

function roundToPrecision(number, decimals) {
    const multiplier = Math.pow(10, decimals);
    return Math.round((number + Number.EPSILON) * multiplier) / multiplier;
}

// Tests
console.log(roundToPrecision(1.005, 2)); // 1.01
console.log(roundToPrecision(2.675, 2)); // 2.68
console.log(roundToPrecision(0.1 + 0.2, 1)); // 0.3
console.log(roundToPrecision(1.2345, 2)); // 1.23
