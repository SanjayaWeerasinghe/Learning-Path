# Node.js Learning Path - Beginner to Advanced

Node.js is a JavaScript runtime for building server-side applications. Build powerful backends!

## 📚 Prerequisites
- Complete JavaScript fundamentals
- Understand: async/await, promises, modules
- Terminal/Command line basics

## 🎯 Course Structure

### 01-Basics (Node Fundamentals)
1. **Setup** - Installing Node.js, npm basics
2. **Modules** - require, module.exports, CommonJS
3. **NPM** - Package management, package.json
4. **File System** - Reading/writing files
5. **Events** - Event emitter pattern

**Time**: 1-2 weeks

### 02-Intermediate (Web Development)
1. **HTTP Server** - Creating basic servers
2. **Express Basics** - Framework fundamentals
3. **Routing** - Handling different endpoints
4. **Middleware** - Request/response processing
5. **REST API** - Building RESTful services

**Time**: 2-3 weeks

### 03-Advanced (Production Ready)
1. **Database (MongoDB)** - Data persistence
2. **Authentication** - JWT, sessions, passwords
3. **Error Handling** - Proper error management
4. **Testing** - Jest, Mocha, unit tests
5. **Deployment** - Hosting, environment variables

**Time**: 3-4 weeks

## 🚀 Quick Start
```bash
# Check if Node.js is installed
node --version
npm --version

# Run JavaScript file
node app.js

# Initialize new project
npm init -y

# Install packages
npm install express
```

## ✅ Core Concepts

### Basic Server
```javascript
const http = require('http');

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Hello World!');
});

server.listen(3000, () => {
  console.log('Server running on port 3000');
});
```

### Express Server
```javascript
const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
```

## 💡 Project Ideas

**After Basics:**
- File reader/writer
- Command-line calculator
- Simple web server
- Log file parser

**After Intermediate:**
- RESTful API
- Blog backend
- URL shortener
- Weather API wrapper
- Task management API

**After Advanced:**
- Full-stack application
- Real-time chat (Socket.io)
- E-commerce backend
- Authentication system
- Microservices

## 🛠️ Essential Packages
```bash
# Web framework
npm install express

# Environment variables
npm install dotenv

# Database
npm install mongoose mongodb

# Authentication
npm install jsonwebtoken bcrypt

# Validation
npm install joi express-validator

# Testing
npm install --save-dev jest
```

## 📖 Key Features
- **Asynchronous & Event-driven**: Non-blocking I/O
- **NPM**: Largest package ecosystem
- **Single-threaded**: But handles concurrency
- **Fast**: Built on Chrome's V8 engine
- **Cross-platform**: Windows, Mac, Linux

## 🎓 Common Use Cases
- ✅ RESTful APIs
- ✅ Real-time applications (chat, games)
- ✅ Microservices
- ✅ Command-line tools
- ✅ Server-side rendering

## 🔧 Project Structure (Best Practice)
```
my-project/
├── node_modules/
├── src/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   └── index.js
├── .env
├── .gitignore
├── package.json
└── README.md
```

## 📚 Resources
- [Node.js Docs](https://nodejs.org/docs/)
- [Express Docs](https://expressjs.com/)
- [NPM](https://www.npmjs.com/)

**Start with:** `01-Basics/01-Setup/README.md`
