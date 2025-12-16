/**
 * Task 33: Template String Validator
 * Difficulty: Advanced
 */

function validateTemplate(template, data) {
    const placeholderRegex = /\$\{([^}]+)\}/g;
    const placeholders = [];
    let match;

    while ((match = placeholderRegex.exec(template)) !== null) {
        placeholders.push(match[1]);
    }

    const missing = placeholders.filter(key => !(key in data));

    return {
        isValid: missing.length === 0,
        missing: missing
    };
}

// Tests
console.log(validateTemplate("Hello ${name}, you are ${age} years old", { name: "John", age: 30 }));
// { isValid: true, missing: [] }

console.log(validateTemplate("Hello ${name}, you live in ${city}", { name: "Jane" }));
// { isValid: false, missing: ["city"] }
