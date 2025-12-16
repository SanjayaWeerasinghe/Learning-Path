/**
 * Task 60: Copy Comparison Tool
 * Difficulty: Intermediate
 */

function demonstrateCopyTypes(obj) {
    // Create shallow copy
    const shallow = { ...obj };

    // Create deep copy
    const deep = JSON.parse(JSON.stringify(obj));

    // Modify nested property
    if (obj.user) {
        obj.user.name = "Modified";
    }

    return {
        original: obj,
        shallow,
        deep,
        explanation: "Shallow copy shares nested object references"
    };
}

// Tests
const result = demonstrateCopyTypes({ user: { name: "John" }, count: 5 });
console.log("Original:", result.original); // { user: { name: "Modified" }, count: 5 }
console.log("Shallow:", result.shallow);   // { user: { name: "Modified" }, count: 5 }
console.log("Deep:", result.deep);         // { user: { name: "John" }, count: 5 }
console.log("Explanation:", result.explanation);
