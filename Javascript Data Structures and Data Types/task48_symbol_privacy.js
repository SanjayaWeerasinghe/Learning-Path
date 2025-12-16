/**
 * Task 48: Symbol-Based Privacy
 * Difficulty: Intermediate
 */

const _id = Symbol('id');
const _password = Symbol('password');

class User {
    constructor(name, password) {
        this.name = name;
        this[_id] = Math.random().toString(36).substring(7);
        this[_password] = password;
    }

    getName() {
        return this.name;
    }

    getId() {
        return this[_id];
    }

    verifyPassword(password) {
        return this[_password] === password;
    }
}

// Tests
const user = new User("John", "secret123");
console.log(user.getName()); // "John"
console.log(Object.keys(user)); // ["name"]
console.log(JSON.stringify(user)); // '{"name":"John"}'
console.log(user.getId()); // random id
console.log(user.verifyPassword("secret123")); // true
