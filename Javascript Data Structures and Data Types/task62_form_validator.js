/**
 * Task 62: Form Data Validator
 * Difficulty: Advanced
 */

function validateFormData(data, schema) {
    const errors = [];

    for (const field in schema) {
        const rules = schema[field];
        const value = data[field];

        // Check required
        if (rules.required && (value === null || value === undefined || value === '')) {
            errors.push({ field, message: `${field} is required` });
            continue;
        }

        // Skip if value is not provided and not required
        if (value === undefined || value === null) continue;

        // Check type
        if (rules.type === 'number' && typeof value !== 'number') {
            errors.push({ field, message: `${field} must be a number` });
            continue;
        }

        if (rules.type === 'string' && typeof value !== 'string') {
            errors.push({ field, message: `${field} must be a string` });
            continue;
        }

        // Check format (for strings)
        if (rules.format === 'email' && typeof value === 'string') {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                errors.push({ field, message: 'Invalid email format' });
            }
        }

        // Check min/max for numbers
        if (rules.type === 'number' && typeof value === 'number') {
            if (rules.min !== undefined && value < rules.min) {
                errors.push({ field, message: `Value must be at least ${rules.min}` });
            }
            if (rules.max !== undefined && value > rules.max) {
                errors.push({ field, message: `Value exceeds maximum (${rules.max})` });
            }
        }
    }

    return {
        valid: errors.length === 0,
        errors
    };
}

// Tests
const schema = {
    email: { type: 'string', format: 'email', required: true },
    age: { type: 'number', min: 0, max: 150, required: true },
    name: { type: 'string', required: false }
};

console.log(validateFormData({ email: 'invalid', age: 200 }, schema));
// { valid: false, errors: [{ field: 'email', message: 'Invalid email format' }, ...] }

console.log(validateFormData({ email: 'test@test.com', age: 25 }, schema));
// { valid: true, errors: [] }

console.log(validateFormData({ age: 30 }, schema));
// { valid: false, errors: [{ field: 'email', message: 'email is required' }] }
