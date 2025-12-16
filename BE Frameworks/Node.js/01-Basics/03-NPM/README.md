# NPM - Node Package Manager

## What You'll Learn
- What npm is and why it's essential
- How to initialize npm projects
- Installing and managing packages
- Understanding package.json and package-lock.json
- Using npm scripts
- Publishing packages (basics)
- Understanding semantic versioning

## Concept Overview

npm (Node Package Manager) is the default package manager for Node.js. It's the world's largest software registry with over 2 million packages, allowing developers to share and reuse code.

### What is npm?
- **Package Registry**: Repository of JavaScript packages
- **CLI Tool**: Command-line interface for managing packages
- **Dependency Manager**: Handles project dependencies
- **Script Runner**: Runs custom scripts

### npm vs npx vs yarn
```bash
# npm - Package manager, installs packages
npm install express

# npx - Package runner, executes packages without installing
npx create-react-app my-app

# yarn - Alternative package manager (by Facebook)
yarn add express
```

## Getting Started

### Check npm Version

```bash
npm --version
npm -v

# Update npm
npm install -g npm@latest
```

### Initialize a Project

```bash
# Interactive mode
npm init

# Skip questions (use defaults)
npm init -y

# Custom defaults
npm config set init-author-name "Your Name"
npm config set init-license "MIT"
```

### package.json Structure

```json
{
  "name": "my-project",
  "version": "1.0.0",
  "description": "My awesome project",
  "main": "index.js",
  "scripts": {
    "start": "node index.js",
    "test": "jest",
    "dev": "nodemon index.js"
  },
  "keywords": ["node", "javascript"],
  "author": "Your Name",
  "license": "MIT",
  "dependencies": {
    "express": "^4.18.0"
  },
  "devDependencies": {
    "nodemon": "^2.0.0",
    "jest": "^29.0.0"
  }
}
```

## Installing Packages

### Local Installation (Default)

```bash
# Install single package
npm install express
npm i express  # Short form

# Install multiple packages
npm install express mongoose dotenv

# Install specific version
npm install express@4.17.1

# Install with version range
npm install express@^4.0.0
```

### Save Options

```bash
# Save as dependency (default)
npm install express --save
npm install express  # --save is default

# Save as dev dependency
npm install nodemon --save-dev
npm install nodemon -D  # Short form

# Install globally
npm install -g nodemon
npm i -g nodemon
```

### Dependencies vs DevDependencies

```javascript
// dependencies - Required for production
{
  "dependencies": {
    "express": "^4.18.0",
    "mongoose": "^7.0.0",
    "dotenv": "^16.0.0"
  }
}

// devDependencies - Only for development
{
  "devDependencies": {
    "nodemon": "^2.0.0",
    "jest": "^29.0.0",
    "eslint": "^8.0.0"
  }
}
```

## Removing Packages

```bash
# Uninstall local package
npm uninstall express
npm remove express
npm rm express  # Short form

# Uninstall global package
npm uninstall -g nodemon

# Remove devDependency
npm uninstall --save-dev jest
```

## Updating Packages

```bash
# Check for outdated packages
npm outdated

# Update all packages (respects semver)
npm update

# Update specific package
npm update express

# Update to latest (ignore semver)
npm install express@latest

# Interactive update
npx npm-check-updates -u
npm install
```

## Semantic Versioning (SemVer)

### Version Format: MAJOR.MINOR.PATCH

```
1.2.3
│ │ │
│ │ └─── PATCH: Bug fixes (1.2.3 → 1.2.4)
│ └───── MINOR: New features, backwards compatible (1.2.3 → 1.3.0)
└─────── MAJOR: Breaking changes (1.2.3 → 2.0.0)
```

### Version Symbols

```json
{
  "dependencies": {
    "express": "4.18.2",      // Exact version
    "mongoose": "^7.0.0",     // Compatible (7.x.x, no breaking changes)
    "dotenv": "~16.0.0",      // Approximately (16.0.x, patch updates only)
    "lodash": "*",            // Latest version (not recommended)
    "chalk": ">=4.0.0",       // Greater than or equal
    "axios": "<1.0.0",        // Less than
    "cors": "2.x"             // Any 2.x version
  }
}
```

### Version Examples

```bash
# ^ (Caret) - Allow MINOR and PATCH updates
"express": "^4.18.2"
# Allows: 4.18.3, 4.19.0, 4.20.0
# Blocks: 5.0.0

# ~ (Tilde) - Allow PATCH updates only
"express": "~4.18.2"
# Allows: 4.18.3, 4.18.4
# Blocks: 4.19.0, 5.0.0
```

## NPM Scripts

### Common Scripts

```json
{
  "scripts": {
    "start": "node index.js",
    "dev": "nodemon index.js",
    "test": "jest",
    "build": "webpack",
    "lint": "eslint .",
    "format": "prettier --write .",
    "clean": "rm -rf dist"
  }
}
```

### Running Scripts

```bash
# Special scripts (no 'run' needed)
npm start
npm test

# Custom scripts (need 'run')
npm run dev
npm run build
npm run lint

# Run multiple scripts
npm run build && npm start

# Pass arguments
npm run test -- --coverage
```

### Script Shortcuts

```json
{
  "scripts": {
    "start": "node index.js",
    "prestart": "echo 'Starting...'",      // Runs before start
    "poststart": "echo 'Started!'",        // Runs after start
    "dev": "nodemon index.js",
    "test": "jest",
    "pretest": "npm run lint",             // Lint before testing
    "posttest": "echo 'Tests complete!'"
  }
}
```

## package-lock.json

### Purpose
- Locks exact versions of all dependencies
- Ensures consistent installs across environments
- Speeds up installation

```json
// package-lock.json (simplified)
{
  "name": "my-project",
  "version": "1.0.0",
  "lockfileVersion": 2,
  "dependencies": {
    "express": {
      "version": "4.18.2",
      "resolved": "https://registry.npmjs.org/express/-/express-4.18.2.tgz",
      "integrity": "sha512-...",
      "requires": {
        "accepts": "~1.3.8",
        "body-parser": "1.20.1"
      }
    }
  }
}
```

### Best Practices
- **Commit** package-lock.json to version control
- **Never** manually edit package-lock.json
- **Delete** node_modules and package-lock.json if corrupted, then `npm install`

## Global vs Local Packages

### Global Packages

```bash
# Install globally
npm install -g nodemon
npm install -g create-react-app
npm install -g typescript

# List global packages
npm list -g --depth=0

# Global installation path
npm root -g

# Uninstall global
npm uninstall -g nodemon
```

### Local Packages (Recommended)

```bash
# Use npx to run local packages
npx nodemon index.js
npx jest

# Or add to scripts in package.json
{
  "scripts": {
    "dev": "nodemon index.js"
  }
}
```

## npm Configuration

### View Configuration

```bash
# View all config
npm config list

# View specific config
npm config get prefix
npm config get registry
```

### Set Configuration

```bash
# Set default author
npm config set init-author-name "Your Name"
npm config set init-license "MIT"

# Use different registry
npm config set registry https://registry.npmjs.org/

# Delete configuration
npm config delete init-author-name
```

## Your Tasks

### Task 1: Initialize Project
- Create a new directory `my-npm-project`
- Run `npm init -y`
- Examine the generated package.json
- Modify name, description, and author

### Task 2: Install Packages
- Install `lodash` as a dependency
- Install `nodemon` as a dev dependency
- Check package.json and node_modules
- Examine package-lock.json

### Task 3: Version Practice
- Install `express@4.17.1` (specific version)
- Install `axios` with caret `^`
- Install `dotenv` with tilde `~`
- Run `npm outdated` to check versions

### Task 4: NPM Scripts
Create scripts in package.json:
```json
{
  "scripts": {
    "start": "node app.js",
    "dev": "nodemon app.js",
    "test": "echo \"Running tests...\"",
    "greet": "echo \"Hello from npm script!\""
  }
}
```
Run each script.

### Task 5: Create Application
Create `app.js`:
```javascript
const _ = require('lodash');

const numbers = [1, 2, 3, 4, 5];
const doubled = _.map(numbers, n => n * 2);
console.log('Doubled:', doubled);

const shuffled = _.shuffle(numbers);
console.log('Shuffled:', shuffled);
```
Run with `npm start`.

### Task 6: Pre and Post Scripts
Add pre and post scripts:
```json
{
  "scripts": {
    "start": "node app.js",
    "prestart": "echo 'About to start...'",
    "poststart": "echo 'Started successfully!'"
  }
}
```

### Task 7: Update Packages
- Run `npm outdated`
- Update a specific package
- Update all packages
- Check package.json for changes

### Task 8: Clean Install
- Delete `node_modules` folder
- Run `npm install` (or `npm ci` for CI/CD)
- Verify all packages reinstalled

### Task 9: List Packages
- Run `npm list` to see dependency tree
- Run `npm list --depth=0` for top-level only
- Run `npm list lodash` for specific package

### Task 10: Create .npmignore
Create `.npmignore`:
```
node_modules/
*.log
.env
.DS_Store
coverage/
```

## Common Pitfalls

### 1. Committing node_modules

```bash
# ❌ Never commit node_modules
git add node_modules/  # NO!

# ✅ Add to .gitignore
echo "node_modules/" >> .gitignore

# ✅ Commit package.json and package-lock.json instead
git add package.json package-lock.json
```

### 2. Using Global Packages in Projects

```bash
# ❌ Avoid global dependencies for project-specific tools
npm install -g jest

# ✅ Install locally and use npm scripts
npm install --save-dev jest
# package.json
{
  "scripts": {
    "test": "jest"
  }
}
```

### 3. Not Using package-lock.json

```bash
# ❌ Don't delete package-lock.json
rm package-lock.json  # Bad practice!

# ✅ Commit it to version control
git add package-lock.json
```

### 4. Installing Packages Without Saving

```bash
# ❌ Old way (npm < 5)
npm install express  # Didn't save automatically

# ✅ Modern npm (auto-saves)
npm install express  # Automatically adds to package.json
```

### 5. Using * for Version

```json
{
  "dependencies": {
    "express": "*"  // ❌ Can break your app with updates
  }
}

// ✅ Use specific ranges
{
  "dependencies": {
    "express": "^4.18.0"
  }
}
```

## Best Practices

### 1. Use npm ci for CI/CD

```bash
# ❌ In CI/CD pipelines
npm install  # Might update package-lock.json

# ✅ Use ci for reproducible builds
npm ci  # Faster, stricter, uses lock file exactly
```

### 2. Keep Dependencies Updated

```bash
# Regular maintenance
npm outdated
npm audit
npm audit fix

# Use tools
npx npm-check-updates -u
```

### 3. Use Exact Versions for Critical Packages

```json
{
  "dependencies": {
    "critical-package": "1.2.3"  // Exact version, no ^
  }
}
```

### 4. Organize Scripts Logically

```json
{
  "scripts": {
    "start": "node index.js",
    "dev": "nodemon index.js",
    "test": "jest",
    "test:watch": "jest --watch",
    "test:coverage": "jest --coverage",
    "build": "webpack",
    "build:prod": "webpack --mode production",
    "lint": "eslint .",
    "lint:fix": "eslint . --fix"
  }
}
```

### 5. Use .npmrc for Team Settings

```
# .npmrc
save-exact=true
package-lock=true
engine-strict=true
```

### 6. Specify Engine Versions

```json
{
  "engines": {
    "node": ">=18.0.0",
    "npm": ">=9.0.0"
  }
}
```

### 7. Use Private Flag for Private Projects

```json
{
  "name": "my-private-project",
  "private": true,  // Prevents accidental publishing
  "version": "1.0.0"
}
```

## Security

### Audit Packages

```bash
# Check for vulnerabilities
npm audit

# Fix vulnerabilities automatically
npm audit fix

# Fix with breaking changes
npm audit fix --force

# View detailed report
npm audit --json
```

### Best Practices
- Regularly run `npm audit`
- Keep packages updated
- Review dependencies before installing
- Use `npm ci` in production
- Enable 2FA on npm account

## Useful npm Commands

```bash
# Package information
npm view express
npm view express version
npm view express versions

# Search packages
npm search express

# Show package homepage
npm home express

# Show package repository
npm repo express

# Show package bugs
npm bugs express

# Open package docs
npm docs express

# List installed packages
npm list
npm ls

# Clean cache
npm cache clean --force

# Check for issues
npm doctor
```

## Next Steps

Once you complete these tasks, move on to:
- `04-File-System` - Learn to work with files and directories
- `05-Events` - Master Node.js event-driven architecture
- `02-Intermediate` - Start building real applications with Express

## Additional Resources

- [npm Documentation](https://docs.npmjs.com/)
- [package.json Documentation](https://docs.npmjs.com/cli/v9/configuring-npm/package-json)
- [Semantic Versioning](https://semver.org/)
- [npm Scripts Guide](https://docs.npmjs.com/cli/v9/using-npm/scripts)
- [npm Best Practices](https://github.com/goldbergyoni/nodebestpractices#npm-best-practices)
