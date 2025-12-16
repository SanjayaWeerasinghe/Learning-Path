/**
 * Task 51: Large Number Factorial
 * Difficulty: Intermediate
 */

function bigFactorial(n) {
    if (n < 0) return { result: null, digits: 0 };
    if (n === 0 || n === 1) return { result: 1n, digits: 1 };

    let result = 1n;
    for (let i = 2n; i <= BigInt(n); i++) {
        result *= i;
    }

    const digits = result.toString().length;

    return { result, digits };
}

// Tests
console.log(bigFactorial(20));
// { result: 2432902008176640000n, digits: 19 }

console.log(bigFactorial(100));
// { result: 93326215443...000n, digits: 158 }

console.log(bigFactorial(10));
// { result: 3628800n, digits: 7 }
