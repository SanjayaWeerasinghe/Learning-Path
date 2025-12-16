/**
 * Task 34: Case Converter Utility
 * Difficulty: Beginner
 */

function convertCase(str, targetCase) {
    // Split by various delimiters
    const words = str
        .replace(/([A-Z])/g, ' $1') // Add space before capitals
        .replace(/[_-]/g, ' ') // Replace _ and - with space
        .trim()
        .split(/\s+/)
        .map(word => word.toLowerCase());

    switch (targetCase) {
        case 'camelCase':
            return words[0] + words.slice(1).map(w => w[0].toUpperCase() + w.slice(1)).join('');
        case 'PascalCase':
            return words.map(w => w[0].toUpperCase() + w.slice(1)).join('');
        case 'snake_case':
            return words.join('_');
        case 'kebab-case':
            return words.join('-');
        default:
            return str;
    }
}

// Tests
console.log(convertCase("helloWorld", "snake_case")); // "hello_world"
console.log(convertCase("hello_world", "camelCase")); // "helloWorld"
console.log(convertCase("hello-world", "PascalCase")); // "HelloWorld"
