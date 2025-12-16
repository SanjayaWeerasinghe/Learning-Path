/**
 * Task 39: Floating Point Comparator
 * Difficulty: Intermediate
 */

function floatEquals(a, b, epsilon = 0.0001) {
    return Math.abs(a - b) < epsilon;
}

// Tests
console.log(floatEquals(0.1 + 0.2, 0.3)); // true
console.log(floatEquals(0.1 + 0.2, 0.3, 0.0000001)); // false
console.log(floatEquals(1.0000001, 1.0000002, 0.00001)); // true
