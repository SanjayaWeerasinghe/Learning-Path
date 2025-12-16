# Node.js Events - Event-Driven Architecture

## What You'll Learn
- Understanding Node.js event-driven architecture
- How to use the EventEmitter class
- Creating custom event emitters
- Event handling best practices
- Built-in events in Node.js
- Event patterns and use cases
- Error handling with events

## Concept Overview

Node.js is built on an event-driven architecture. Many objects in Node.js emit events - for example, a server emits an event each time a connection is made, a file stream emits an event when the file is opened.

### Why Events?
- **Asynchronous Programming**: Handle async operations elegantly
- **Loose Coupling**: Components communicate without direct dependencies
- **Scalability**: Handle many operations without blocking
- **Real-time Applications**: Perfect for chat apps, notifications, etc.
- **Node.js Core**: Understanding events is crucial for Node.js

### Event Loop Basics

```javascript
// Node.js event loop handles:
// 1. Timers (setTimeout, setInterval)
// 2. I/O callbacks (network, file operations)
// 3. Idle/Prepare (internal)
// 4. Poll (retrieve I/O events)
// 5. Check (setImmediate)
// 6. Close callbacks

console.log('Start');

setTimeout(() => {
  console.log('Timeout');
}, 0);

setImmediate(() => {
  console.log('Immediate');
});

console.log('End');

// Output:
// Start
// End
// Immediate
// Timeout
```

## EventEmitter Class

### Basic Usage

```javascript
const EventEmitter = require('events');

// Create an event emitter
const myEmitter = new EventEmitter();

// Register event listener
myEmitter.on('greet', () => {
  console.log('Hello, World!');
});

// Emit event
myEmitter.emit('greet');  // Output: Hello, World!
```

### Events with Parameters

```javascript
const EventEmitter = require('events');
const myEmitter = new EventEmitter();

// Listener with parameters
myEmitter.on('greet', (name, age) => {
  console.log(`Hello, ${name}! You are ${age} years old.`);
});

// Emit with arguments
myEmitter.emit('greet', 'John', 30);
// Output: Hello, John! You are 30 years old.
```

### Multiple Listeners

```javascript
const EventEmitter = require('events');
const myEmitter = new EventEmitter();

// First listener
myEmitter.on('user-login', (username) => {
  console.log(`User logged in: ${username}`);
});

// Second listener
myEmitter.on('user-login', (username) => {
  console.log(`Sending welcome email to ${username}`);
});

// Third listener
myEmitter.on('user-login', (username) => {
  console.log(`Logging activity for ${username}`);
});

// Emit - all listeners execute
myEmitter.emit('user-login', 'john_doe');
```

### One-Time Events

```javascript
const EventEmitter = require('events');
const myEmitter = new EventEmitter();

// Listener executes only once
myEmitter.once('startup', () => {
  console.log('Application started!');
});

myEmitter.emit('startup');  // Output: Application started!
myEmitter.emit('startup');  // No output - listener removed
```

## Creating Custom Event Emitters

### Extending EventEmitter

```javascript
const EventEmitter = require('events');

class Logger extends EventEmitter {
  log(message) {
    console.log(message);
    this.emit('logged', message);
  }
}

const logger = new Logger();

// Listen for logged events
logger.on('logged', (message) => {
  console.log(`Event: Message logged - ${message}`);
});

logger.log('Application started');
// Output:
// Application started
// Event: Message logged - Application started
```

### Real-World Example: User Registration

```javascript
const EventEmitter = require('events');

class UserManager extends EventEmitter {
  register(username, email) {
    console.log(`Registering user: ${username}`);

    // Simulate database save
    const user = { username, email, id: Date.now() };

    // Emit event after registration
    this.emit('user-registered', user);

    return user;
  }
}

const userManager = new UserManager();

// Email service listener
userManager.on('user-registered', (user) => {
  console.log(`Sending welcome email to ${user.email}`);
});

// Analytics listener
userManager.on('user-registered', (user) => {
  console.log(`Tracking new user: ${user.username}`);
});

// Notification listener
userManager.on('user-registered', (user) => {
  console.log(`Notifying admin about new user: ${user.username}`);
});

// Register a user
userManager.register('john_doe', 'john@example.com');
```

### Shopping Cart Example

```javascript
const EventEmitter = require('events');

class ShoppingCart extends EventEmitter {
  constructor() {
    super();
    this.items = [];
    this.total = 0;
  }

  addItem(item, price) {
    this.items.push({ item, price });
    this.total += price;
    this.emit('item-added', { item, price, total: this.total });
  }

  checkout() {
    this.emit('checkout', {
      items: this.items,
      total: this.total,
      itemCount: this.items.length
    });
  }
}

const cart = new ShoppingCart();

cart.on('item-added', (data) => {
  console.log(`Added ${data.item} - $${data.price}`);
  console.log(`Cart total: $${data.total}`);
});

cart.on('checkout', (data) => {
  console.log(`\nChecking out ${data.itemCount} items`);
  console.log(`Total: $${data.total}`);
});

cart.addItem('Laptop', 999);
cart.addItem('Mouse', 25);
cart.addItem('Keyboard', 75);
cart.checkout();
```

## Event Methods

### Registering Listeners

```javascript
const EventEmitter = require('events');
const emitter = new EventEmitter();

// on() - Register listener
emitter.on('event', () => console.log('on: Event occurred'));

// once() - One-time listener
emitter.once('event', () => console.log('once: Event occurred'));

// prependListener() - Add to beginning
emitter.prependListener('event', () => console.log('prependListener: First!'));

// addListener() - Alias for on()
emitter.addListener('event', () => console.log('addListener: Event occurred'));
```

### Removing Listeners

```javascript
const EventEmitter = require('events');
const emitter = new EventEmitter();

function listener1() {
  console.log('Listener 1');
}

function listener2() {
  console.log('Listener 2');
}

emitter.on('event', listener1);
emitter.on('event', listener2);

// Remove specific listener
emitter.removeListener('event', listener1);
// or
emitter.off('event', listener1);

// Remove all listeners for event
emitter.removeAllListeners('event');

// Remove all listeners for all events
emitter.removeAllListeners();
```

### Checking Listeners

```javascript
const EventEmitter = require('events');
const emitter = new EventEmitter();

emitter.on('event', () => {});
emitter.on('event', () => {});
emitter.on('other', () => {});

// Get listener count
console.log(emitter.listenerCount('event'));  // 2

// Get all listeners for event
const listeners = emitter.listeners('event');
console.log(listeners.length);  // 2

// Get all event names
console.log(emitter.eventNames());  // ['event', 'other']
```

## Error Handling

### Error Events

```javascript
const EventEmitter = require('events');
const emitter = new EventEmitter();

// Always handle error events
emitter.on('error', (err) => {
  console.error('Error occurred:', err.message);
});

// Emit error
emitter.emit('error', new Error('Something went wrong!'));

// If no error listener exists, Node.js will throw
```

### Try-Catch with Events

```javascript
const EventEmitter = require('events');

class SafeEmitter extends EventEmitter {
  safeEmit(event, ...args) {
    try {
      this.emit(event, ...args);
    } catch (err) {
      this.emit('error', err);
    }
  }
}

const emitter = new SafeEmitter();

emitter.on('error', (err) => {
  console.error('Caught error:', err.message);
});

emitter.on('risky', () => {
  throw new Error('Oops!');
});

emitter.safeEmit('risky');  // Error caught and handled
```

## Built-in Node.js Events

### File System Events

```javascript
const fs = require('fs');

// ReadStream events
const readStream = fs.createReadStream('file.txt');

readStream.on('open', (fd) => {
  console.log('File opened:', fd);
});

readStream.on('data', (chunk) => {
  console.log('Received chunk:', chunk.length, 'bytes');
});

readStream.on('end', () => {
  console.log('Finished reading file');
});

readStream.on('error', (err) => {
  console.error('Error:', err);
});

readStream.on('close', () => {
  console.log('Stream closed');
});
```

### HTTP Server Events

```javascript
const http = require('http');

const server = http.createServer();

server.on('request', (req, res) => {
  console.log('Request received:', req.url);
  res.end('Hello!');
});

server.on('connection', (socket) => {
  console.log('New connection');
});

server.on('close', () => {
  console.log('Server closed');
});

server.listen(3000, () => {
  console.log('Server listening on port 3000');
});
```

### Process Events

```javascript
// Exit event
process.on('exit', (code) => {
  console.log(`Process exiting with code: ${code}`);
});

// Uncaught exception
process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
  process.exit(1);
});

// Unhandled promise rejection
process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection:', reason);
});

// SIGINT (Ctrl+C)
process.on('SIGINT', () => {
  console.log('Received SIGINT, shutting down gracefully');
  process.exit(0);
});
```

## Your Tasks

### Task 1: Basic Event Emitter
Create a simple event emitter:
- Create an emitter
- Register a listener for 'message' event
- Emit the event with a string parameter
- Print the message

### Task 2: Multiple Listeners
Create an event emitter with multiple listeners:
- Register 3 different listeners for 'notification' event
- Each listener should perform a different action
- Emit the event and verify all listeners execute

### Task 3: User Authentication System
Create a UserAuth class:
- Extend EventEmitter
- Implement login() method
- Emit 'login-success' or 'login-failure' events
- Add listeners for both events

### Task 4: File Processor
Create a FileProcessor class:
- Emit 'start', 'processing', and 'complete' events
- Simulate file processing with setTimeout
- Track progress with events

### Task 5: Order System
Create an OrderSystem:
- Emit events: 'order-placed', 'payment-processed', 'shipped'
- Create listeners for each stage
- Simulate order flow

### Task 6: Event Counter
Create a counter that:
- Emits 'increment' and 'decrement' events
- Emits 'max' event when reaching 10
- Emits 'min' event when reaching 0

### Task 7: Chat Room
Create a simple chat room:
```javascript
class ChatRoom extends EventEmitter {
  sendMessage(user, message) {
    // Emit message event
  }
}
```
- Handle 'message' events
- Handle 'user-joined' and 'user-left' events

### Task 8: Timer with Events
Create a Timer class:
- Emit 'tick' every second
- Emit 'complete' when finished
- Allow start, pause, resume, stop

### Task 9: Error Handling
Create an API client that:
- Emits 'success' on successful request
- Emits 'error' on failed request
- Properly handles all errors

### Task 10: Event Logger
Create an event logger:
- Logs all events to a file
- Includes timestamp
- Handles different event types

## Common Pitfalls

### 1. Memory Leaks with Listeners

```javascript
// ❌ Adding listeners in a loop without removing
for (let i = 0; i < 100; i++) {
  emitter.on('event', () => {});
}
// EventEmitter warns at 10+ listeners

// ✅ Remove listeners when done
const listener = () => {};
emitter.on('event', listener);
// Later...
emitter.removeListener('event', listener);

// ✅ Or increase max if intentional
emitter.setMaxListeners(100);
```

### 2. Not Handling Error Events

```javascript
// ❌ Will crash if error emitted
const emitter = new EventEmitter();
emitter.emit('error', new Error('Oops'));  // Crash!

// ✅ Always handle errors
emitter.on('error', (err) => {
  console.error('Error:', err);
});
```

### 3. Emitting Events in Constructor

```javascript
// ❌ Emitting before listeners attached
class MyEmitter extends EventEmitter {
  constructor() {
    super();
    this.emit('ready');  // No listeners yet!
  }
}

// ✅ Emit after construction or use setImmediate
class MyEmitter extends EventEmitter {
  constructor() {
    super();
    setImmediate(() => this.emit('ready'));
  }
}
```

### 4. Forgetting to Call super()

```javascript
// ❌ Missing super() call
class MyEmitter extends EventEmitter {
  constructor() {
    // Missing super()!
  }
}

// ✅ Always call super()
class MyEmitter extends EventEmitter {
  constructor() {
    super();
  }
}
```

### 5. Using Arrow Functions with removeListener

```javascript
// ❌ Can't remove arrow function
emitter.on('event', () => console.log('hi'));
emitter.removeListener('event', () => console.log('hi'));  // Doesn't work!

// ✅ Use named function
const listener = () => console.log('hi');
emitter.on('event', listener);
emitter.removeListener('event', listener);  // Works!
```

## Best Practices

### 1. Use Descriptive Event Names

```javascript
// ❌ Unclear event names
emitter.on('done', () => {});
emitter.on('e', () => {});

// ✅ Descriptive names
emitter.on('user-registered', () => {});
emitter.on('payment-processed', () => {});
```

### 2. Document Events

```javascript
/**
 * User management system
 * @fires UserManager#user-registered
 * @fires UserManager#user-deleted
 */
class UserManager extends EventEmitter {
  /**
   * Register a new user
   * @param {string} username
   * @fires UserManager#user-registered
   */
  register(username) {
    // ...
    this.emit('user-registered', { username });
  }
}
```

### 3. Use Error Events

```javascript
// ✅ Always emit errors, don't throw
class MyEmitter extends EventEmitter {
  doSomething() {
    try {
      // risky operation
    } catch (err) {
      this.emit('error', err);  // Don't throw
    }
  }
}
```

### 4. Clean Up Listeners

```javascript
// ✅ Remove listeners when no longer needed
function setupListener(emitter) {
  const listener = () => {};
  emitter.on('event', listener);

  return () => {
    emitter.removeListener('event', listener);
  };
}

const cleanup = setupListener(emitter);
// Later...
cleanup();
```

### 5. Use once() for One-Time Events

```javascript
// ✅ For initialization or one-time events
emitter.once('ready', () => {
  console.log('Ready!');
});
```

### 6. Limit Listener Count

```javascript
// ✅ Set appropriate max listeners
const emitter = new EventEmitter();
emitter.setMaxListeners(20);  // Prevent memory leaks
```

### 7. Return this for Chaining

```javascript
// ✅ Enable method chaining
class MyEmitter extends EventEmitter {
  start() {
    this.emit('start');
    return this;
  }

  stop() {
    this.emit('stop');
    return this;
  }
}

// Usage
new MyEmitter()
  .on('start', () => {})
  .on('stop', () => {})
  .start()
  .stop();
```

## Event Patterns

### Pub/Sub Pattern

```javascript
class PubSub extends EventEmitter {
  publish(channel, message) {
    this.emit(channel, message);
  }

  subscribe(channel, callback) {
    this.on(channel, callback);
  }

  unsubscribe(channel, callback) {
    this.removeListener(channel, callback);
  }
}

const pubsub = new PubSub();
pubsub.subscribe('news', (article) => console.log(article));
pubsub.publish('news', 'Breaking news!');
```

### Observer Pattern

```javascript
class Subject extends EventEmitter {
  constructor() {
    super();
    this.state = null;
  }

  setState(state) {
    this.state = state;
    this.emit('state-changed', state);
  }

  getState() {
    return this.state;
  }
}

const subject = new Subject();

// Observers
subject.on('state-changed', (state) => {
  console.log('Observer 1:', state);
});

subject.on('state-changed', (state) => {
  console.log('Observer 2:', state);
});

subject.setState({ user: 'John' });
```

## Next Steps

Once you complete these tasks, move on to:
- `02-Intermediate/01-HTTP-Server` - Build web servers using events
- `02-Intermediate/02-Express-Basics` - Learn Express framework
- `02-Intermediate/03-Routing` - Handle HTTP routes

## Additional Resources

- [Node.js Events Documentation](https://nodejs.org/api/events.html)
- [Event Loop Explained](https://nodejs.org/en/docs/guides/event-loop-timers-and-nexttick/)
- [EventEmitter Guide](https://nodejs.dev/learn/the-nodejs-event-emitter)
- [Event-Driven Architecture](https://www.eventstore.com/blog/what-is-event-driven-architecture)
