/**
 * Task 53: BigInt Range Validator
 * Difficulty: Intermediate
 */

function isInBigIntRange(value, min, max) {
    try {
        let bigIntValue;

        if (typeof value === 'bigint') {
            bigIntValue = value;
        } else if (typeof value === 'number') {
            if (!Number.isInteger(value)) {
                return false; // Can't convert decimal to BigInt
            }
            bigIntValue = BigInt(value);
        } else if (typeof value === 'string') {
            bigIntValue = BigInt(value);
        } else {
            return false;
        }

        return bigIntValue >= min && bigIntValue <= max;
    } catch (error) {
        return false;
    }
}

// Tests
console.log(isInBigIntRange("12345678901234567890", 0n, 99999999999999999999n)); // true
console.log(isInBigIntRange(100, 0n, 50n)); // false
console.log(isInBigIntRange(9007199254740992, 0n, 10000000000000000n)); // true
console.log(isInBigIntRange(3.14, 0n, 10n)); // false (decimal)
console.log(isInBigIntRange("invalid", 0n, 10n)); // false
