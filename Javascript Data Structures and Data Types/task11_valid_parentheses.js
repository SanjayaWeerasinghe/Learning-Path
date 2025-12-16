/**
 * Task 11: Valid Parentheses
 * Difficulty: Beginner
 *
 * Problem Description:
 * Given a string containing just the characters '(', ')', '{', '}', '[' and ']',
 * determine if the input string is valid. A string is valid if brackets are closed
 * in the correct order.
 *
 * Expected Input/Output:
 * Input: s = "()"
 * Output: true
 *
 * Input: s = "()[]{}"
 * Output: true
 *
 * Input: s = "(]"
 * Output: false
 *
 * Input: s = "([)]"
 * Output: false
 *
 * Hints/Approach:
 * - Use a stack to track opening brackets
 * - When encountering a closing bracket, check if it matches the top of stack
 * - String is valid if stack is empty at the end
 * - Time complexity: O(n)
 */

/**
 * Solution 1: Using Stack with Map for Bracket Matching
 * This is the most common and elegant approach
 *
 * @param {string} s - String containing brackets
 * @returns {boolean} - True if brackets are valid, false otherwise
 */
function isValid(s) {
    // Edge case: odd length strings cannot be valid
    if (s.length % 2 !== 0) {
        return false;
    }

    // Create a stack to store opening brackets
    const stack = [];

    // Map of closing brackets to their corresponding opening brackets
    const bracketMap = {
        ')': '(',
        '}': '{',
        ']': '['
    };

    // Iterate through each character in the string
    for (let char of s) {
        // If it's a closing bracket
        if (char in bracketMap) {
            // Check if stack is empty or top doesn't match
            if (stack.length === 0 || stack[stack.length - 1] !== bracketMap[char]) {
                return false;
            }
            // Valid match, pop from stack
            stack.pop();
        } else {
            // It's an opening bracket, push to stack
            stack.push(char);
        }
    }

    // String is valid only if all brackets were matched (stack is empty)
    return stack.length === 0;
}

/**
 * Solution 2: Using Switch Statement
 * More verbose but easier to understand for beginners
 *
 * @param {string} s - String containing brackets
 * @returns {boolean} - True if brackets are valid, false otherwise
 */
function isValidSwitch(s) {
    if (s.length % 2 !== 0) {
        return false;
    }

    const stack = [];

    for (let i = 0; i < s.length; i++) {
        const char = s[i];

        switch (char) {
            // Opening brackets - push to stack
            case '(':
            case '{':
            case '[':
                stack.push(char);
                break;

            // Closing brackets - check for matching opening
            case ')':
                if (stack.pop() !== '(') return false;
                break;
            case '}':
                if (stack.pop() !== '{') return false;
                break;
            case ']':
                if (stack.pop() !== '[') return false;
                break;

            default:
                // Invalid character
                return false;
        }
    }

    return stack.length === 0;
}

/**
 * Solution 3: Using Array Methods
 * Demonstrates functional programming approach
 *
 * @param {string} s - String containing brackets
 * @returns {boolean} - True if brackets are valid, false otherwise
 */
function isValidFunctional(s) {
    if (s.length % 2 !== 0) return false;

    const pairs = { '(': ')', '{': '}', '[': ']' };
    const opening = new Set(['(', '{', '[']);

    const stack = s.split('').reduce((stack, char) => {
        if (opening.has(char)) {
            // Opening bracket
            stack.push(char);
        } else {
            // Closing bracket
            const last = stack.pop();
            if (!last || pairs[last] !== char) {
                // Signal invalid by pushing null
                stack.push(null);
                return stack;
            }
        }
        return stack;
    }, []);

    return stack.length === 0;
}

/**
 * Enhanced Version: Returns detailed information
 * Useful for debugging and understanding where validation fails
 *
 * @param {string} s - String containing brackets
 * @returns {object} - Validation result with details
 */
function validateBrackets(s) {
    const stack = [];
    const bracketMap = { ')': '(', '}': '{', ']': '[' };
    const result = {
        isValid: true,
        position: -1,
        message: "Valid bracket sequence",
        stack: []
    };

    for (let i = 0; i < s.length; i++) {
        const char = s[i];

        if (char in bracketMap) {
            // Closing bracket
            if (stack.length === 0) {
                result.isValid = false;
                result.position = i;
                result.message = `Closing bracket '${char}' at position ${i} has no matching opening bracket`;
                return result;
            }

            const lastOpening = stack[stack.length - 1];
            if (lastOpening.char !== bracketMap[char]) {
                result.isValid = false;
                result.position = i;
                result.message = `Closing bracket '${char}' at position ${i} doesn't match opening bracket '${lastOpening.char}' at position ${lastOpening.index}`;
                return result;
            }

            stack.pop();
        } else {
            // Opening bracket
            stack.push({ char, index: i });
        }
    }

    if (stack.length > 0) {
        result.isValid = false;
        result.position = stack[0].index;
        result.message = `Opening bracket '${stack[0].char}' at position ${stack[0].index} is not closed`;
        result.stack = stack;
        return result;
    }

    return result;
}

// Test cases
console.log("=== Test Case 1: Valid Simple ===");
console.log("Input: '()'");
console.log("Output:", isValid("()"));
console.log("Expected: true");

console.log("\n=== Test Case 2: Valid Multiple ===");
console.log("Input: '()[]{}'");
console.log("Output:", isValid("()[]{}"));
console.log("Expected: true");

console.log("\n=== Test Case 3: Valid Nested ===");
console.log("Input: '{[()]}'");
console.log("Output:", isValid("{[()]}"));
console.log("Expected: true");

console.log("\n=== Test Case 4: Invalid - Wrong Order ===");
console.log("Input: '(]'");
console.log("Output:", isValid("(]"));
console.log("Expected: false");

console.log("\n=== Test Case 5: Invalid - Mismatched ===");
console.log("Input: '([)]'");
console.log("Output:", isValid("([)]"));
console.log("Expected: false");

console.log("\n=== Test Case 6: Invalid - Extra Closing ===");
console.log("Input: '())'");
console.log("Output:", isValid("())"));
console.log("Expected: false");

console.log("\n=== Test Case 7: Invalid - Unclosed ===");
console.log("Input: '((('");
console.log("Output:", isValid("((("));
console.log("Expected: false");

console.log("\n=== Test Case 8: Complex Valid ===");
console.log("Input: '(([]){})['");
const complex = "(([]){})";
console.log("Output:", isValid(complex));
console.log("Expected: true");

console.log("\n=== Test Case 9: Empty String ===");
console.log("Input: ''");
console.log("Output:", isValid(""));
console.log("Expected: true");

console.log("\n=== Test Case 10: Detailed Validation ===");
const testCases = ["()", "([)]", "(((", "())"];
testCases.forEach(test => {
    const result = validateBrackets(test);
    console.log(`\nInput: '${test}'`);
    console.log("Valid:", result.isValid);
    console.log("Message:", result.message);
});

console.log("\n=== Performance Comparison ===");
const largeInput = "([]{})".repeat(1000);
console.time("Map approach");
isValid(largeInput);
console.timeEnd("Map approach");

console.time("Switch approach");
isValidSwitch(largeInput);
console.timeEnd("Switch approach");

console.time("Functional approach");
isValidFunctional(largeInput);
console.timeEnd("Functional approach");

/**
 * Time Complexity Analysis:
 * - All solutions: O(n) where n is the length of the string
 * - We visit each character exactly once
 *
 * Space Complexity Analysis:
 * - O(n) in worst case (all opening brackets)
 * - Stack can hold at most n/2 brackets for valid inputs
 *
 * Key Insights:
 * - Stack is perfect for matching paired elements
 * - Early termination saves time (odd length, extra closing bracket)
 * - Map-based approach is most concise and readable
 *
 * Common Mistakes to Avoid:
 * - Forgetting to check if stack is empty before popping
 * - Not checking if stack is empty at the end
 * - Not handling edge cases (empty string, odd length)
 *
 * Real-world Applications:
 * - Code editors (bracket matching and syntax highlighting)
 * - Compiler/interpreter (parsing expressions)
 * - HTML/XML validation
 * - Mathematical expression validation
 */
