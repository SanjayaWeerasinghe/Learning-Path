/**
 * Task 40: Number Base Converter
 * Difficulty: Advanced
 */

function convertBase(number, fromBase, toBase) {
    // Convert from source base to decimal
    const decimal = parseInt(number, fromBase);

    if (isNaN(decimal)) {
        return "Invalid number for given base";
    }

    // Convert from decimal to target base
    return decimal.toString(toBase).toUpperCase();
}

// Tests
console.log(convertBase("FF", 16, 10)); // "255"
console.log(convertBase("255", 10, 16)); // "FF"
console.log(convertBase("1010", 2, 10)); // "10"
console.log(convertBase("10", 10, 2)); // "1010"
