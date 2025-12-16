/**
 * Task 54: Comprehensive Type Checker
 * Difficulty: Advanced
 */

function getDetailedType(value) {
    const typeofResult = typeof value;
    const toStringResult = Object.prototype.toString.call(value);

    // Check for primitives first
    if (value === null) {
        return {
            primitive: true,
            type: "null",
            constructor: null,
            toString: "[object Null]"
        };
    }

    if (value === undefined) {
        return {
            primitive: true,
            type: "undefined",
            constructor: undefined,
            toString: "[object Undefined]"
        };
    }

    // Check for specific object types
    if (Array.isArray(value)) {
        return {
            primitive: false,
            type: "Array",
            constructor: "Array",
            toString: toStringResult
        };
    }

    if (value instanceof Date) {
        return {
            primitive: false,
            type: "Date",
            constructor: "Date",
            toString: toStringResult
        };
    }

    if (value instanceof RegExp) {
        return {
            primitive: false,
            type: "RegExp",
            constructor: "RegExp",
            toString: toStringResult
        };
    }

    // Handle primitives
    const primitive = typeofResult !== 'object' && typeofResult !== 'function';

    return {
        primitive,
        type: typeofResult,
        constructor: value.constructor?.name || typeofResult,
        toString: toStringResult
    };
}

// Tests
console.log(getDetailedType([1, 2, 3]));
console.log(getDetailedType(null));
console.log(getDetailedType(new Date()));
console.log(getDetailedType(/regex/));
console.log(getDetailedType(42));
console.log(getDetailedType("hello"));
