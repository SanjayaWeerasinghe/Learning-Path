/**
 * Task 12: Evaluate Reverse Polish Notation
 * Difficulty: Intermediate
 *
 * Problem Description:
 * Evaluate the value of an arithmetic expression in Reverse Polish Notation (postfix notation).
 * Valid operators are +, -, *, /. Each operand may be an integer or another expression.
 *
 * Expected Input/Output:
 * Input: tokens = ["2", "1", "+", "3", "*"]
 * Output: 9  // ((2 + 1) * 3)
 *
 * Input: tokens = ["4", "13", "5", "/", "+"]
 * Output: 6  // (4 + (13 / 5))
 *
 * Hints/Approach:
 * - Use a stack to store operands
 * - When encountering a number, push to stack
 * - When encountering an operator, pop two operands, apply operation, push result
 * - Final answer is the only element left in stack
 */

/**
 * Solution 1: Standard Stack Approach
 * Most straightforward implementation
 *
 * @param {string[]} tokens - Array of tokens (numbers and operators)
 * @returns {number} - Result of the expression
 */
function evalRPN(tokens) {
    // Stack to store operands
    const stack = [];

    // Set of valid operators
    const operators = new Set(['+', '-', '*', '/']);

    for (let token of tokens) {
        if (operators.has(token)) {
            // Pop two operands (order matters for - and /)
            // Second operand is popped first, then first operand
            const secondOperand = stack.pop();
            const firstOperand = stack.pop();

            // Perform operation based on operator
            let result;
            switch (token) {
                case '+':
                    result = firstOperand + secondOperand;
                    break;
                case '-':
                    result = firstOperand - secondOperand;
                    break;
                case '*':
                    result = firstOperand * secondOperand;
                    break;
                case '/':
                    // Division truncates toward zero
                    result = Math.trunc(firstOperand / secondOperand);
                    break;
            }

            // Push result back onto stack
            stack.push(result);
        } else {
            // It's a number, push to stack
            // Convert string to number
            stack.push(parseInt(token));
        }
    }

    // Final result is the only element in stack
    return stack[0];
}

/**
 * Solution 2: Using Function Map
 * More elegant approach using operations map
 *
 * @param {string[]} tokens - Array of tokens
 * @returns {number} - Result of the expression
 */
function evalRPNMap(tokens) {
    const stack = [];

    // Map operators to their corresponding functions
    const operations = {
        '+': (a, b) => a + b,
        '-': (a, b) => a - b,
        '*': (a, b) => a * b,
        '/': (a, b) => Math.trunc(a / b)
    };

    for (let token of tokens) {
        if (token in operations) {
            // Pop operands and apply operation
            const b = stack.pop();
            const a = stack.pop();
            stack.push(operations[token](a, b));
        } else {
            // Push number to stack
            stack.push(Number(token));
        }
    }

    return stack[0];
}

/**
 * Solution 3: With Detailed Step Tracking
 * Useful for understanding and debugging
 *
 * @param {string[]} tokens - Array of tokens
 * @returns {object} - Result with execution steps
 */
function evalRPNDetailed(tokens) {
    const stack = [];
    const steps = [];
    const operations = {
        '+': (a, b) => a + b,
        '-': (a, b) => a - b,
        '*': (a, b) => a * b,
        '/': (a, b) => Math.trunc(a / b)
    };

    for (let i = 0; i < tokens.length; i++) {
        const token = tokens[i];

        if (token in operations) {
            const b = stack.pop();
            const a = stack.pop();
            const result = operations[token](a, b);

            steps.push({
                step: i + 1,
                token: token,
                operation: `${a} ${token} ${b} = ${result}`,
                stackBefore: [...stack, a, b],
                stackAfter: [...stack, result]
            });

            stack.push(result);
        } else {
            const num = Number(token);
            steps.push({
                step: i + 1,
                token: token,
                operation: `Push ${num}`,
                stackBefore: [...stack],
                stackAfter: [...stack, num]
            });
            stack.push(num);
        }
    }

    return {
        result: stack[0],
        steps: steps
    };
}

/**
 * Solution 4: Extended RPN with More Operators
 * Supports additional operations like power, modulo
 *
 * @param {string[]} tokens - Array of tokens
 * @returns {number} - Result of the expression
 */
function evalRPNExtended(tokens) {
    const stack = [];
    const operations = {
        '+': (a, b) => a + b,
        '-': (a, b) => a - b,
        '*': (a, b) => a * b,
        '/': (a, b) => Math.trunc(a / b),
        '^': (a, b) => Math.pow(a, b),
        '%': (a, b) => a % b,
        'min': (a, b) => Math.min(a, b),
        'max': (a, b) => Math.max(a, b)
    };

    for (let token of tokens) {
        if (token in operations) {
            const b = stack.pop();
            const a = stack.pop();
            stack.push(operations[token](a, b));
        } else {
            stack.push(Number(token));
        }
    }

    return stack[0];
}

/**
 * Helper: Convert Infix to RPN
 * Bonus function to convert regular notation to RPN
 *
 * @param {string} expression - Infix expression (e.g., "2 + 3 * 4")
 * @returns {string[]} - RPN tokens
 */
function infixToRPN(expression) {
    const tokens = expression.split(' ');
    const output = [];
    const operators = [];
    const precedence = { '+': 1, '-': 1, '*': 2, '/': 2, '^': 3 };
    const rightAssociative = new Set(['^']);

    for (let token of tokens) {
        if (!isNaN(token)) {
            // Number
            output.push(token);
        } else if (token in precedence) {
            // Operator
            while (
                operators.length > 0 &&
                operators[operators.length - 1] !== '(' &&
                (
                    precedence[operators[operators.length - 1]] > precedence[token] ||
                    (precedence[operators[operators.length - 1]] === precedence[token] &&
                        !rightAssociative.has(token))
                )
            ) {
                output.push(operators.pop());
            }
            operators.push(token);
        } else if (token === '(') {
            operators.push(token);
        } else if (token === ')') {
            while (operators.length > 0 && operators[operators.length - 1] !== '(') {
                output.push(operators.pop());
            }
            operators.pop(); // Remove '('
        }
    }

    while (operators.length > 0) {
        output.push(operators.pop());
    }

    return output;
}

// Test cases
console.log("=== Test Case 1: Simple Addition and Multiplication ===");
const test1 = ["2", "1", "+", "3", "*"];
console.log("Tokens:", test1);
console.log("RPN Expression: 2 1 + 3 *");
console.log("Infix Equivalent: (2 + 1) * 3");
console.log("Result:", evalRPN(test1));
console.log("Expected: 9");

console.log("\n=== Test Case 2: Division ===");
const test2 = ["4", "13", "5", "/", "+"];
console.log("Tokens:", test2);
console.log("RPN Expression: 4 13 5 / +");
console.log("Infix Equivalent: 4 + (13 / 5)");
console.log("Result:", evalRPN(test2));
console.log("Expected: 6");

console.log("\n=== Test Case 3: Complex Expression ===");
const test3 = ["10", "6", "9", "3", "+", "-11", "*", "/", "*", "17", "+", "5", "+"];
console.log("Tokens:", test3);
console.log("Result:", evalRPN(test3));
console.log("Expected: 22");

console.log("\n=== Test Case 4: Negative Numbers ===");
const test4 = ["5", "3", "-", "2", "*"];
console.log("Tokens:", test4);
console.log("RPN Expression: 5 3 - 2 *");
console.log("Infix Equivalent: (5 - 3) * 2");
console.log("Result:", evalRPN(test4));
console.log("Expected: 4");

console.log("\n=== Test Case 5: Division Truncation ===");
const test5 = ["7", "3", "/"];
console.log("Tokens:", test5);
console.log("Result:", evalRPN(test5));
console.log("Expected: 2 (truncated toward zero)");

console.log("\n=== Test Case 6: Detailed Step-by-Step ===");
const test6 = ["2", "1", "+", "3", "*"];
const detailed = evalRPNDetailed(test6);
console.log("Expression:", test6.join(" "));
console.log("\nExecution Steps:");
detailed.steps.forEach(step => {
    console.log(`Step ${step.step}: ${step.operation}`);
    console.log(`  Stack: [${step.stackAfter.join(", ")}]`);
});
console.log("\nFinal Result:", detailed.result);

console.log("\n=== Test Case 7: Extended Operations ===");
const test7 = ["2", "3", "^"]; // 2^3 = 8
console.log("Tokens:", test7);
console.log("Result (2^3):", evalRPNExtended(test7));
console.log("Expected: 8");

console.log("\n=== Test Case 8: Infix to RPN Conversion ===");
const infix = "2 + 3 * 4";
const rpn = infixToRPN(infix);
console.log("Infix:", infix);
console.log("RPN:", rpn.join(" "));
console.log("Evaluation:", evalRPN(rpn));
console.log("Expected: 14");

console.log("\n=== Test Case 9: Complex Infix Conversion ===");
const infix2 = "( 2 + 3 ) * 4";
const rpn2 = infixToRPN(infix2);
console.log("Infix:", infix2);
console.log("RPN:", rpn2.join(" "));
console.log("Evaluation:", evalRPN(rpn2));
console.log("Expected: 20");

/**
 * Time Complexity Analysis:
 * - O(n) where n is the number of tokens
 * - Each token is processed exactly once
 * - Stack operations (push/pop) are O(1)
 *
 * Space Complexity Analysis:
 * - O(n) for the stack
 * - In worst case, all tokens are numbers pushed to stack
 *
 * Why RPN is Useful:
 * - No need for parentheses
 * - No operator precedence rules needed
 * - Easy to evaluate using a stack
 * - Used in calculators (HP calculators)
 * - Used in some programming languages (Forth, PostScript)
 * - Compiler intermediate representation
 *
 * Key Concepts:
 * - Stack is perfect for expression evaluation
 * - Order of operands matters for non-commutative operations (-, /)
 * - RPN eliminates ambiguity in expression evaluation
 *
 * Common Pitfalls:
 * - Popping operands in wrong order
 * - Forgetting to handle negative numbers
 * - Not truncating division toward zero
 * - Assuming stack will have exactly one element at end (should validate)
 */
