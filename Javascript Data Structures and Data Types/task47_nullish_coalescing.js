/**
 * Task 47: Nullish Coalescing Implementer
 * Difficulty: Intermediate
 */

function customNullishCoalesce(value, ...fallbacks) {
    // Return first non-nullish value
    if (value !== null && value !== undefined) {
        return value;
    }

    for (const fallback of fallbacks) {
        if (fallback !== null && fallback !== undefined) {
            return fallback;
        }
    }

    return undefined;
}

// Tests
console.log(customNullishCoalesce(null, undefined, 0, "default")); // 0
console.log(customNullishCoalesce(undefined, null, "fallback")); // "fallback"
console.log(customNullishCoalesce(false, "won't reach")); // false
console.log(customNullishCoalesce(null, undefined, null)); // undefined
