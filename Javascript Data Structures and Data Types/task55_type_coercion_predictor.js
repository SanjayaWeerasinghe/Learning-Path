/**
 * Task 55: Type Coercion Predictor
 * Difficulty: Advanced
 */

function predictCoercion(value1, operator, value2) {
    let result;
    let explanation;
    let coercionType;

    const type1 = typeof value1;
    const type2 = typeof value2;

    if (operator === '+') {
        if (type1 === 'string' || type2 === 'string') {
            result = String(value1) + String(value2);
            coercionType = "Both→String";
            explanation = "Plus operator with string performs concatenation";
        } else {
            result = Number(value1) + Number(value2);
            coercionType = "Both→Number";
            explanation = "Plus operator with numbers performs addition";
        }
    } else if (['-', '*', '/'].includes(operator)) {
        result = operator === '-' ? value1 - value2 :
                 operator === '*' ? value1 * value2 :
                 value1 / value2;
        coercionType = "Both→Number";
        explanation = `${operator} operator converts both values to numbers`;
    } else if (operator === '==') {
        result = value1 == value2;
        coercionType = "Complex";
        explanation = "Loose equality performs type coercion";
    }

    return { result, explanation, coercionType };
}

// Tests
console.log(predictCoercion(5, '+', '5'));
// { result: "55", explanation: "Plus operator with string performs concatenation", ... }

console.log(predictCoercion('5', '-', 2));
// { result: 3, explanation: "- operator converts both values to numbers", ... }

console.log(predictCoercion(true, '+', 1));
// { result: 2, ... }
