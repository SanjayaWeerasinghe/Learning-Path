# Node.js Setup - Getting Started

## What You'll Learn
- What Node.js is and why it's important
- How to install Node.js and npm
- Setting up your development environment
- Running your first Node.js program
- Understanding Node.js versioning

## Concept Overview

Node.js is a JavaScript runtime built on Chrome's V8 JavaScript engine. It allows you to run JavaScript on the server-side, enabling full-stack JavaScript development.

### Why Node.js?
- **Fast and Scalable**: Built on V8 engine with non-blocking I/O
- **Full-Stack JavaScript**: Use same language for frontend and backend
- **Large Ecosystem**: npm provides access to millions of packages
- **Active Community**: Huge community support and resources
- **Real-time Applications**: Perfect for chat apps, streaming, and APIs

### Node.js vs Browser JavaScript
```javascript
// Browser - has window, document
console.log(window);
console.log(document);

// Node.js - has global, process, require
console.log(global);
console.log(process);
console.log(require);
```

## Installation

### Windows
1. Visit [nodejs.org](https://nodejs.org)
2. Download LTS (Long Term Support) version
3. Run the installer (.msi file)
4. Follow installation wizard
5. Verify installation:
```bash
node --version
npm --version
```

### macOS
**Using Homebrew (Recommended):**
```bash
brew install node
```

**Or download from nodejs.org:**
1. Download .pkg file
2. Run installer
3. Verify installation

### Linux (Ubuntu/Debian)
```bash
# Using NodeSource repository
curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash -
sudo apt-get install -y nodejs

# Verify installation
node --version
npm --version
```

### Version Managers (Recommended for Developers)

**nvm (Node Version Manager) - Windows, macOS, Linux:**
```bash
# Install nvm (check nvm-sh/nvm for latest)
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash

# Install latest LTS
nvm install --lts

# Use specific version
nvm use 18

# List installed versions
nvm list
```

**nvm-windows:**
Download from [github.com/coreybutler/nvm-windows](https://github.com/coreybutler/nvm-windows)

## Your First Node.js Program

### Method 1: Interactive REPL
```bash
# Start Node.js REPL (Read-Eval-Print Loop)
node

# Try some code
> console.log("Hello, Node.js!");
> 2 + 2
> const name = "Developer";
> name
> .exit
```

### Method 2: Running a File
Create `app.js`:
```javascript
// app.js
console.log("Hello, Node.js!");
console.log("Node version:", process.version);
console.log("Platform:", process.platform);
```

Run it:
```bash
node app.js
```

### Method 3: Using package.json Scripts
Create `package.json`:
```json
{
  "name": "my-first-app",
  "version": "1.0.0",
  "scripts": {
    "start": "node app.js"
  }
}
```

Run with npm:
```bash
npm start
```

## Essential Node.js Globals

```javascript
// Current directory
console.log(__dirname);

// Current file path
console.log(__filename);

// Process information
console.log(process.version);
console.log(process.platform);
console.log(process.env.NODE_ENV);

// Command line arguments
console.log(process.argv);

// Exit process
// process.exit(0);
```

## Choosing an Editor/IDE

### Visual Studio Code (Recommended)
- Free and lightweight
- Excellent Node.js support
- Built-in terminal
- Extensions: ESLint, Prettier, Node.js Extension Pack

### WebStorm
- Full-featured IDE
- Advanced debugging
- Paid (free trial available)

### Sublime Text / Atom
- Lightweight alternatives
- Good plugin ecosystems

## Your Tasks

### Task 1: Install Node.js
- Install Node.js LTS version
- Verify installation with `node --version`
- Verify npm with `npm --version`
- Take a screenshot of the versions

### Task 2: REPL Exploration
- Open Node.js REPL
- Perform basic math operations (10 + 5, 20 * 3)
- Create a variable and print it
- Check `process.version`
- Exit REPL with `.exit`

### Task 3: First Node.js File
Create `hello.js`:
- Print "Hello, World!"
- Print current Node.js version
- Print current platform (Windows, Linux, macOS)
- Run with `node hello.js`

### Task 4: Process Information
Create `info.js`:
- Print `__dirname` (current directory)
- Print `__filename` (current file path)
- Print `process.platform`
- Print `process.arch` (architecture)

### Task 5: Command Line Arguments
Create `args.js`:
```javascript
// Access command line arguments
console.log("Arguments:", process.argv);
console.log("First arg:", process.argv[2]);
console.log("Second arg:", process.argv[3]);
```
Run: `node args.js hello world`

### Task 6: Environment Variables
Create `env.js`:
```javascript
// Print environment variable
console.log("User:", process.env.USER || process.env.USERNAME);
console.log("Home:", process.env.HOME || process.env.USERPROFILE);
console.log("Node Env:", process.env.NODE_ENV || 'development');
```

### Task 7: Simple Calculator
Create `calculator.js`:
- Accept two numbers from command line
- Print their sum, difference, product, and quotient
- Example: `node calculator.js 10 5`

### Task 8: System Info Script
Create `system.js`:
- Print Node.js version
- Print npm version (use child_process or just node version)
- Print OS platform
- Print CPU architecture
- Print current working directory

### Task 9: Create package.json
- Run `npm init -y`
- Examine the generated package.json
- Add a "start" script to run your hello.js
- Run with `npm start`

### Task 10: Install nvm (Optional)
- Install Node Version Manager
- Install two different Node.js versions
- Switch between them
- List installed versions

## Common Pitfalls

### 1. Wrong Node Version
```javascript
// Problem: Using features not available in older Node.js
const data = { name: "John" };
const copy = { ...data }; // Requires Node 8.3+

// Check your version first
console.log(process.version);
```

### 2. Path Issues
```javascript
// ❌ Wrong - relative paths can be tricky
const file = './data.txt';

// ✅ Better - use __dirname
const path = require('path');
const file = path.join(__dirname, 'data.txt');
```

### 3. Forgetting to Exit
```javascript
// ❌ Process keeps running
setInterval(() => console.log("Running..."), 1000);

// ✅ Remember to clear intervals or exit
const interval = setInterval(() => {
  console.log("Running...");
}, 1000);

setTimeout(() => {
  clearInterval(interval);
  console.log("Done!");
}, 5000);
```

### 4. Global Namespace Pollution
```javascript
// ❌ Avoid polluting global
global.myVar = "Don't do this";

// ✅ Use modules instead
module.exports = { myVar: "Better approach" };
```

### 5. Not Handling Uncaught Exceptions
```javascript
// ✅ Handle uncaught exceptions
process.on('uncaughtException', (error) => {
  console.error('Uncaught Exception:', error);
  process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection:', reason);
  process.exit(1);
});
```

## Best Practices

### 1. Use LTS Version
- Always use LTS (Long Term Support) for production
- Use latest for learning and experimentation

### 2. Use Version Manager
```bash
# Install and switch versions easily
nvm install 18
nvm use 18
```

### 3. Check Node Version in Projects
Create `.nvmrc`:
```
18.17.0
```

Or in `package.json`:
```json
{
  "engines": {
    "node": ">=18.0.0",
    "npm": ">=9.0.0"
  }
}
```

### 4. Use Environment Variables
```javascript
// config.js
module.exports = {
  port: process.env.PORT || 3000,
  env: process.env.NODE_ENV || 'development',
  dbUrl: process.env.DB_URL || 'mongodb://localhost:27017'
};
```

### 5. Organize Your Code
```
my-app/
├── src/
│   ├── index.js
│   ├── config/
│   ├── utils/
│   └── modules/
├── tests/
├── package.json
└── .gitignore
```

### 6. Use Strict Mode
```javascript
'use strict';

// Your code here
```

### 7. Handle Errors Gracefully
```javascript
process.on('SIGTERM', () => {
  console.log('SIGTERM received, closing gracefully');
  server.close(() => {
    console.log('Server closed');
    process.exit(0);
  });
});
```

## Verification Checklist

After setup, verify:
- [ ] `node --version` shows version 18.x or higher
- [ ] `npm --version` shows version 9.x or higher
- [ ] Can run `node` to enter REPL
- [ ] Can create and run `.js` files
- [ ] Editor/IDE is installed and configured
- [ ] Can access Node.js documentation

## Troubleshooting

### Command Not Found
**Problem:** `node: command not found`

**Solutions:**
- Restart terminal after installation
- Check PATH: `echo $PATH` (Unix) or `echo %PATH%` (Windows)
- Reinstall Node.js
- On Windows, run as Administrator

### Permission Errors (macOS/Linux)
**Problem:** Permission denied when installing packages

**Solution:**
```bash
# Fix npm permissions
mkdir ~/.npm-global
npm config set prefix '~/.npm-global'
echo 'export PATH=~/.npm-global/bin:$PATH' >> ~/.bashrc
source ~/.bashrc
```

### Multiple Versions Conflict
**Problem:** Different projects need different Node versions

**Solution:** Use nvm to manage versions per project

## Next Steps

Once you complete these tasks, move on to:
- `02-Modules` - Learn about CommonJS and ES6 modules
- `03-NPM` - Master package management
- `04-File-System` - Work with files and directories
- `05-Events` - Understand Node.js event-driven architecture

## Additional Resources

- [Official Node.js Documentation](https://nodejs.org/docs)
- [Node.js Best Practices](https://github.com/goldbergyoni/nodebestpractices)
- [NPM Documentation](https://docs.npmjs.com)
- [nvm Repository](https://github.com/nvm-sh/nvm)
