/**
 * Task 56: Strict Equality Explainer
 * Difficulty: Intermediate
 */

function compareValues(a, b) {
    const looseEqual = a == b;
    const strictEqual = a === b;
    const typeA = typeof a;
    const typeB = typeof b;

    let explanation;

    if (looseEqual === strictEqual) {
        if (looseEqual) {
            explanation = "Values are equal with same type";
        } else {
            explanation = "Values are not equal even with coercion";
        }
    } else {
        explanation = `Loose equality coerced ${typeA} '${a}' to match ${typeB} ${b}`;
    }

    return {
        looseEqual,
        strictEqual,
        explanation,
        types: { a: typeA, b: typeB }
    };
}

// Tests
console.log(compareValues('5', 5));
// { looseEqual: true, strictEqual: false, explanation: "Loose equality coerced string '5' to number 5", ... }

console.log(compareValues(0, false));
// { looseEqual: true, strictEqual: false, ... }

console.log(compareValues(null, undefined));
// { looseEqual: true, strictEqual: false, ... }

console.log(compareValues(5, 5));
// { looseEqual: true, strictEqual: true, ... }
