/**
 * Task 32: Advanced String Parser
 * Difficulty: Intermediate
 */

function parseUserData(input) {
    const result = {};
    const pairs = input.split('|').map(pair => pair.trim());

    for (const pair of pairs) {
        const [key, value] = pair.split(':').map(s => s.trim());

        if (key === 'Age') {
            const age = parseInt(value);
            result.age = isNaN(age) ? null : age;
        } else if (key === 'Name') {
            result.name = value;
        } else if (key === 'Email') {
            result.email = value;
        }
    }

    return result;
}

// Tests
console.log(parseUserData("Name: Alice Smith | Age: 25 | Email: alice@test.com"));
// { name: "Alice Smith", age: 25, email: "alice@test.com" }

console.log(parseUserData("Name: Bob | Age: invalid | Email: bob@test.com"));
// { name: "Bob", age: null, email: "bob@test.com" }
