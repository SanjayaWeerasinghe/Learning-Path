/**
 * Task 44: Boolean Coercion Tester
 * Difficulty: Intermediate
 */

function testCoercion(value) {
    return {
        value,
        inCondition: value ? true : false,
        withDoubleBang: !!value,
        withBoolean: Boolean(value),
        withLogicalOr: value || "fallback",
        isConsideredTruthy: !!value
    };
}

// Tests
console.log(testCoercion([]));
console.log(testCoercion(0));
console.log(testCoercion(""));
console.log(testCoercion("hello"));
