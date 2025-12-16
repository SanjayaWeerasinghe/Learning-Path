# Node.js Modules - Code Organization

## What You'll Learn
- What modules are and why they're important
- How to create and export modules
- CommonJS vs ES6 modules
- Built-in Node.js modules
- Module resolution and require mechanism
- Best practices for organizing code

## Concept Overview

Modules are reusable blocks of code whose existence doesn't impact other code. Node.js has a modular architecture that allows you to break down your application into smaller, manageable pieces.

### Why Use Modules?
- **Code Organization**: Keep code organized and maintainable
- **Reusability**: Write once, use many times
- **Encapsulation**: Hide implementation details
- **Avoid Conflicts**: Prevent variable name collisions
- **Easy Testing**: Test modules independently

### Types of Modules
1. **Built-in Modules**: Provided by Node.js (fs, path, http, etc.)
2. **Local Modules**: Your own custom modules
3. **Third-party Modules**: Installed via npm

## CommonJS Modules (Default in Node.js)

### Creating a Module

```javascript
// math.js - Simple module
function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

// Export functions
module.exports = {
  add,
  subtract
};
```

### Using a Module

```javascript
// app.js
const math = require('./math');

console.log(math.add(5, 3));      // 8
console.log(math.subtract(10, 4)); // 6
```

### Different Export Patterns

```javascript
// Pattern 1: Export object
module.exports = {
  add: (a, b) => a + b,
  subtract: (a, b) => a - b
};

// Pattern 2: Export single function
module.exports = function(name) {
  return `Hello, ${name}!`;
};

// Pattern 3: Export class
class Calculator {
  add(a, b) { return a + b; }
  subtract(a, b) { return a - b; }
}
module.exports = Calculator;

// Pattern 4: Exports shorthand
exports.add = (a, b) => a + b;
exports.subtract = (a, b) => a - b;
// Note: exports is a reference to module.exports
```

### Destructuring Imports

```javascript
// Import specific functions
const { add, subtract } = require('./math');

console.log(add(5, 3));      // 8
console.log(subtract(10, 4)); // 6
```

## ES6 Modules (ESM)

### Enabling ES6 Modules

Add to `package.json`:
```json
{
  "type": "module"
}
```

Or use `.mjs` extension: `math.mjs`

### ES6 Module Syntax

```javascript
// math.mjs
export function add(a, b) {
  return a + b;
}

export function subtract(a, b) {
  return a - b;
}

export const PI = 3.14159;

// Default export
export default class Calculator {
  multiply(a, b) { return a * b; }
}
```

### Using ES6 Modules

```javascript
// app.mjs
import Calculator, { add, subtract, PI } from './math.mjs';

console.log(add(5, 3));        // 8
console.log(subtract(10, 4));  // 6
console.log(PI);               // 3.14159

const calc = new Calculator();
console.log(calc.multiply(4, 5)); // 20
```

### Import Variations

```javascript
// Import everything
import * as math from './math.mjs';
math.add(5, 3);

// Import with alias
import { add as sum } from './math.mjs';
sum(5, 3);

// Import default with different name
import Calc from './math.mjs';

// Import for side effects only
import './setup.mjs';
```

## Built-in Modules

### Path Module

```javascript
const path = require('path');

// Join paths
const filePath = path.join(__dirname, 'data', 'file.txt');
console.log(filePath);

// Get file extension
console.log(path.extname('file.txt'));  // .txt

// Get filename
console.log(path.basename('/user/local/file.txt')); // file.txt

// Get directory
console.log(path.dirname('/user/local/file.txt')); // /user/local

// Parse path
const parsed = path.parse('/user/local/file.txt');
console.log(parsed);
// { root, dir, base, ext, name }
```

### OS Module

```javascript
const os = require('os');

// System information
console.log('Platform:', os.platform());
console.log('CPU Architecture:', os.arch());
console.log('CPU Cores:', os.cpus().length);
console.log('Free Memory:', os.freemem());
console.log('Total Memory:', os.totalmem());
console.log('Home Directory:', os.homedir());
console.log('Username:', os.userInfo().username);
```

### URL Module

```javascript
const url = require('url');

const myUrl = new URL('https://example.com:8080/path?name=john&age=30');

console.log(myUrl.hostname);  // example.com
console.log(myUrl.pathname);  // /path
console.log(myUrl.search);    // ?name=john&age=30
console.log(myUrl.searchParams.get('name')); // john
```

### Util Module

```javascript
const util = require('util');

// Promisify callback functions
const fs = require('fs');
const readFile = util.promisify(fs.readFile);

// Use with async/await
async function readMyFile() {
  const data = await readFile('file.txt', 'utf8');
  console.log(data);
}

// Check types
console.log(util.types.isDate(new Date())); // true
console.log(util.types.isPromise(Promise.resolve())); // true
```

## Module Resolution

### Require Resolution Order

```javascript
// 1. Core modules (highest priority)
require('fs');  // Built-in fs module

// 2. File paths (relative or absolute)
require('./math');      // Same directory
require('../utils/math'); // Parent directory
require('/absolute/path/math'); // Absolute path

// 3. node_modules
require('express');  // Looks in node_modules

// 4. File extensions (auto-resolved)
require('./math');     // Tries .js, .json, .node
```

### Module Caching

```javascript
// counter.js
let count = 0;
module.exports = {
  increment: () => ++count,
  getCount: () => count
};

// app.js
const counter1 = require('./counter');
const counter2 = require('./counter');

counter1.increment();
console.log(counter1.getCount()); // 1
console.log(counter2.getCount()); // 1 - Same instance!

// Clear cache (rarely needed)
delete require.cache[require.resolve('./counter')];
```

## Your Tasks

### Task 1: Basic Module
Create `greetings.js`:
- Export a `sayHello` function that takes a name
- Export a `sayGoodbye` function
- Create `app.js` to use these functions

### Task 2: Calculator Module
Create `calculator.js`:
- Export add, subtract, multiply, divide functions
- Create `test.js` to test all functions
- Use destructuring to import functions

### Task 3: Person Module
Create `person.js`:
- Export a Person class with name and age properties
- Add a `greet()` method
- Create instances in `app.js`

### Task 4: Config Module
Create `config.js`:
- Export configuration object with:
  - appName
  - version
  - port
  - environment
- Import and use in `app.js`

### Task 5: String Utils
Create `stringUtils.js`:
- Export `capitalize(str)` function
- Export `reverse(str)` function
- Export `isPalindrome(str)` function
- Test all functions

### Task 6: Array Utils
Create `arrayUtils.js`:
- Export `sum(array)` - sum all numbers
- Export `average(array)` - calculate average
- Export `max(array)` - find maximum
- Export `min(array)` - find minimum

### Task 7: Built-in Modules
Create `systemInfo.js`:
- Use `os` module to print system information
- Use `path` module to create file paths
- Use `url` module to parse a URL

### Task 8: ES6 Modules
Create `math.mjs`:
- Use ES6 export syntax
- Export named functions
- Export default class
- Create `app.mjs` to import and use

### Task 9: Module Pattern
Create a module that:
- Has private variables (using closure)
- Exports only public methods
- Demonstrates encapsulation

```javascript
// Example structure
const myModule = (() => {
  let privateVar = 'secret';

  return {
    publicMethod: () => {
      // Can access privateVar
    }
  };
})();
```

### Task 10: Multi-file Project
Create a project structure:
```
project/
├── index.js
├── utils/
│   ├── math.js
│   ├── string.js
│   └── array.js
└── models/
    └── user.js
```
Import and use utilities from different folders.

## Common Pitfalls

### 1. Circular Dependencies

```javascript
// ❌ Avoid circular dependencies
// a.js
const b = require('./b');
module.exports = { name: 'A' };

// b.js
const a = require('./a');
module.exports = { name: 'B' };

// ✅ Restructure to avoid circles
// common.js
module.exports = { shared: 'data' };

// a.js
const common = require('./common');

// b.js
const common = require('./common');
```

### 2. Modifying exports vs module.exports

```javascript
// ❌ Wrong - breaks the reference
exports = { add: (a, b) => a + b };

// ✅ Correct
module.exports = { add: (a, b) => a + b };

// ✅ Also correct
exports.add = (a, b) => a + b;
```

### 3. Forgetting File Extensions in Imports

```javascript
// ❌ Missing ./ for local modules
const math = require('math'); // Looks in node_modules!

// ✅ Correct
const math = require('./math');
```

### 4. Mixing CommonJS and ESM

```javascript
// ❌ Can't use require in ESM
import { add } from './math.mjs';
const fs = require('fs'); // Error!

// ✅ Use import for everything in ESM
import fs from 'fs';
```

### 5. Not Handling Module Not Found

```javascript
// ✅ Handle missing modules gracefully
try {
  const optional = require('./optional-module');
} catch (error) {
  console.log('Optional module not found, using defaults');
}
```

## Best Practices

### 1. One Module, One Responsibility

```javascript
// ✅ Good - focused module
// userValidator.js
module.exports = {
  validateEmail: (email) => { /* ... */ },
  validatePassword: (password) => { /* ... */ }
};
```

### 2. Use Descriptive Names

```javascript
// ❌ Unclear
const u = require('./utils');

// ✅ Clear
const userUtils = require('./utils/userUtils');
const { validateEmail } = require('./validators/emailValidator');
```

### 3. Group Related Exports

```javascript
// user.js
class User { /* ... */ }
const createUser = (data) => new User(data);
const deleteUser = (id) => { /* ... */ };

module.exports = {
  User,
  createUser,
  deleteUser
};
```

### 4. Use Index Files for Clean Imports

```javascript
// utils/index.js
module.exports = {
  math: require('./math'),
  string: require('./string'),
  array: require('./array')
};

// app.js
const { math, string } = require('./utils');
// Instead of:
// const math = require('./utils/math');
// const string = require('./utils/string');
```

### 5. Document Your Exports

```javascript
/**
 * Math utility functions
 * @module utils/math
 */

/**
 * Adds two numbers
 * @param {number} a - First number
 * @param {number} b - Second number
 * @returns {number} Sum of a and b
 */
function add(a, b) {
  return a + b;
}

module.exports = { add };
```

### 6. Avoid Side Effects in Modules

```javascript
// ❌ Avoid side effects on import
console.log('Module loaded!'); // Runs on require
const data = fetchDataFromAPI(); // Network call on import

// ✅ Export initialization function instead
module.exports = {
  init: () => {
    console.log('Initializing...');
    return fetchDataFromAPI();
  }
};
```

### 7. Use Absolute Imports for Deep Nesting

```javascript
// package.json
{
  "imports": {
    "#utils/*": "./src/utils/*",
    "#models/*": "./src/models/*"
  }
}

// Now you can use:
const math = require('#utils/math');
// Instead of:
const math = require('../../../../utils/math');
```

## Module Patterns

### Singleton Pattern

```javascript
// database.js
class Database {
  constructor() {
    this.connection = null;
  }

  connect() {
    if (!this.connection) {
      this.connection = 'connected';
    }
    return this.connection;
  }
}

module.exports = new Database(); // Export instance
```

### Factory Pattern

```javascript
// userFactory.js
class User {
  constructor(name, role) {
    this.name = name;
    this.role = role;
  }
}

module.exports = {
  createAdmin: (name) => new User(name, 'admin'),
  createGuest: (name) => new User(name, 'guest')
};
```

### Revealing Module Pattern

```javascript
// logger.js
const logger = (() => {
  // Private
  const logLevel = 'info';

  function formatMessage(msg) {
    return `[${new Date().toISOString()}] ${msg}`;
  }

  // Public
  return {
    info: (msg) => console.log(formatMessage(msg)),
    error: (msg) => console.error(formatMessage(msg))
  };
})();

module.exports = logger;
```

## Next Steps

Once you complete these tasks, move on to:
- `03-NPM` - Learn package management and using third-party modules
- `04-File-System` - Work with files using the fs module
- `05-Events` - Master the event-driven architecture

## Additional Resources

- [Node.js Modules Documentation](https://nodejs.org/api/modules.html)
- [ES Modules in Node.js](https://nodejs.org/api/esm.html)
- [CommonJS vs ESM](https://blog.logrocket.com/commonjs-vs-es-modules-node-js/)
- [Module Design Patterns](https://www.patterns.dev/posts/module-pattern/)
