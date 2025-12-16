/**
 * Task 63: Data Type Converter Pipeline
 * Difficulty: Advanced
 */

function convertData(value, conversions) {
    const steps = [];
    let current = value;

    for (const conversion of conversions) {
        let result;
        let success = true;

        try {
            switch (conversion) {
                case 'string':
                    result = String(current);
                    break;

                case 'number':
                    result = Number(current);
                    if (isNaN(result)) {
                        success = false;
                        result = current;
                    }
                    break;

                case 'boolean':
                    result = Boolean(current);
                    break;

                case 'bigint':
                    if (typeof current === 'number' && !Number.isInteger(current)) {
                        success = false;
                        result = current;
                    } else {
                        result = BigInt(current);
                    }
                    break;

                case 'array':
                    if (Array.isArray(current)) {
                        result = current;
                    } else {
                        result = [current];
                    }
                    break;

                case 'json':
                    result = JSON.stringify(current);
                    break;

                default:
                    success = false;
                    result = current;
            }
        } catch (error) {
            success = false;
            result = current;
        }

        steps.push({
            step: conversion,
            result,
            type: typeof result,
            success
        });

        if (success) {
            current = result;
        }
    }

    return {
        original: value,
        steps,
        final: current
    };
}

// Tests
console.log(convertData(42, ['string', 'array', 'json']));
// {
//   original: 42,
//   steps: [
//     { step: 'string', result: '42', type: 'string', success: true },
//     { step: 'array', result: ['42'], type: 'object', success: true },
//     { step: 'json', result: '["42"]', type: 'string', success: true }
//   ],
//   final: '["42"]'
// }

console.log(convertData("100", ['number', 'bigint']));
// Converts string to number, then to bigint

console.log(convertData(true, ['string', 'number']));
// Converts boolean to string "true", then to NaN (fails)

console.log(convertData([1, 2, 3], ['json', 'string']));
// Converts array to JSON string
