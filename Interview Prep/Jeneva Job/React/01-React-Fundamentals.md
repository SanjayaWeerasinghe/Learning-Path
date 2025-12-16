# React Fundamentals - Interview Questions & Answers

## Table of Contents
1. [What is React?](#what-is-react)
2. [Virtual DOM](#virtual-dom)
3. [JSX](#jsx)
4. [Components](#components)
5. [Props vs State](#props-vs-state)
6. [Lifecycle Methods](#lifecycle-methods)

---

## What is React?

### Question
**What is React and what are its key features?**

### Answer
React is an open-source JavaScript library developed by Facebook for building user interfaces, particularly single-page applications. It's used for handling the view layer in web and mobile applications.

**Key Features:**
- **Component-Based Architecture**: Build encapsulated components that manage their own state
- **Virtual DOM**: Efficient updates and rendering of components
- **Unidirectional Data Flow**: Data flows from parent to child components
- **JSX**: JavaScript XML syntax for writing UI components
- **Declarative**: Describe what UI should look like for different states
- **React Hooks**: Modern way to use state and lifecycle features in functional components

### Better Explanation
Think of React as a construction system where you build your application using reusable building blocks (components). Instead of manually updating the webpage when data changes, you tell React what the page should look like, and it efficiently updates only what needs to change.

**Real-World Analogy**:
Imagine building a house with LEGO blocks. Each LEGO piece is a component. You can reuse the same pieces in different parts of the house, and you can easily replace or update individual pieces without rebuilding the entire house.

---

## Virtual DOM

### Question
**What is the Virtual DOM and how does it work?**

### Answer
The Virtual DOM is a lightweight JavaScript representation of the actual DOM. React keeps a copy of the DOM structure in memory and uses it to optimize updates.

**How it works:**
1. When state changes, React creates a new Virtual DOM tree
2. React compares the new Virtual DOM with the previous one (Diffing)
3. React calculates the minimum number of changes needed
4. React updates only those specific parts in the real DOM (Reconciliation)

### Better Explanation
The real DOM is slow to update because it involves re-rendering the entire page structure. React's Virtual DOM is like having a draft or blueprint of your webpage in memory.

**Process Flow:**
```
State Change → New Virtual DOM → Diff Algorithm → Minimal Real DOM Updates
```

**Benefits:**
- **Performance**: Batch multiple updates and apply them efficiently
- **Cross-platform**: Same concept works for React Native
- **Predictability**: Easier to debug and reason about changes

**Example:**
```javascript
// When you update state
const [count, setCount] = useState(0);
setCount(count + 1); // React creates new Virtual DOM

// React only updates the specific text node that displays the count
// Not the entire component tree
```

---

## JSX

### Question
**What is JSX and why do we use it?**

### Answer
JSX (JavaScript XML) is a syntax extension for JavaScript that allows you to write HTML-like code within JavaScript. It's not mandatory but is the recommended way to describe UI in React.

**Key Points:**
- JSX produces React "elements"
- Browsers don't understand JSX; it gets transpiled to JavaScript by Babel
- You can embed JavaScript expressions in JSX using curly braces `{}`

### Better Explanation

**Without JSX:**
```javascript
const element = React.createElement(
  'h1',
  { className: 'greeting' },
  'Hello, world!'
);
```

**With JSX:**
```javascript
const element = <h1 className="greeting">Hello, world!</h1>;
```

**JSX Rules:**
1. Must return a single parent element
2. Use `className` instead of `class`
3. Use `htmlFor` instead of `for`
4. Self-closing tags must end with `/>` (e.g., `<img />`)
5. JavaScript expressions go in curly braces

**Advanced Example:**
```javascript
function Greeting({ name, time }) {
  const isEvening = time >= 18;

  return (
    <div className={isEvening ? 'dark-theme' : 'light-theme'}>
      <h1>Hello, {name}!</h1>
      {isEvening && <p>Good evening!</p>}
      <ul>
        {['Item 1', 'Item 2', 'Item 3'].map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
}
```

---

## Components

### Question
**What are the differences between Functional and Class Components?**

### Answer

**Functional Components:**
- Simple JavaScript functions that return JSX
- Use React Hooks for state and lifecycle
- Easier to read and test
- Better performance
- Recommended approach in modern React

**Class Components:**
- ES6 classes that extend `React.Component`
- Use `this.state` and `this.setState()`
- Have lifecycle methods
- More boilerplate code
- Legacy approach but still supported

### Better Explanation

**Functional Component (Modern):**
```javascript
import { useState, useEffect } from 'react';

function UserProfile({ userId }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUser(userId).then(data => {
      setUser(data);
      setLoading(false);
    });
  }, [userId]);

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h2>{user.name}</h2>
      <p>{user.email}</p>
    </div>
  );
}
```

**Class Component (Legacy):**
```javascript
class UserProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      loading: true
    };
  }

  componentDidMount() {
    fetchUser(this.props.userId).then(data => {
      this.setState({ user: data, loading: false });
    });
  }

  render() {
    if (this.state.loading) return <div>Loading...</div>;

    return (
      <div>
        <h2>{this.state.user.name}</h2>
        <p>{this.state.user.email}</p>
      </div>
    );
  }
}
```

**Why Functional Components are Preferred:**
- Less code, easier to understand
- No `this` binding issues
- Hooks provide better code organization
- Easier to optimize with React compiler
- Better tree-shaking for smaller bundles

---

## Props vs State

### Question
**What is the difference between Props and State?**

### Answer

**Props (Properties):**
- Data passed from parent to child components
- Read-only (immutable)
- Controlled by parent component
- Used to configure and customize components

**State:**
- Data managed within the component
- Mutable (can be changed)
- Controlled by the component itself
- Changes trigger re-renders

### Better Explanation

**Think of it like this:**
- **Props** are like function arguments - you pass them in and use them, but don't change them
- **State** is like local variables - you can create and modify them within the component

**Props Example:**
```javascript
// Parent Component
function App() {
  return <UserCard name="John Doe" role="Developer" />;
}

// Child Component - receives props
function UserCard({ name, role }) {
  // Cannot do: name = "Jane" ❌ Props are read-only

  return (
    <div>
      <h3>{name}</h3>
      <p>{role}</p>
    </div>
  );
}
```

**State Example:**
```javascript
function Counter() {
  const [count, setCount] = useState(0); // State

  const increment = () => {
    setCount(count + 1); // ✅ Can modify state
  };

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={increment}>Increment</button>
    </div>
  );
}
```

**Combining Props and State:**
```javascript
function TodoList({ initialTodos }) { // Props from parent
  const [todos, setTodos] = useState(initialTodos); // State
  const [filter, setFilter] = useState('all'); // State

  const addTodo = (text) => {
    setTodos([...todos, { id: Date.now(), text, done: false }]);
  };

  const filteredTodos = todos.filter(todo => {
    if (filter === 'active') return !todo.done;
    if (filter === 'completed') return todo.done;
    return true;
  });

  return (
    <div>
      {filteredTodos.map(todo => (
        <div key={todo.id}>{todo.text}</div>
      ))}
    </div>
  );
}
```

---

## Lifecycle Methods

### Question
**Explain React component lifecycle methods and their equivalents in Hooks.**

### Answer

React components go through three main phases:
1. **Mounting**: Component is created and inserted into the DOM
2. **Updating**: Component re-renders due to changes in props or state
3. **Unmounting**: Component is removed from the DOM

### Better Explanation

**Class Component Lifecycle:**
```javascript
class UserProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = { user: null };
    // Runs before component mounts
  }

  componentDidMount() {
    // Runs after component is mounted
    // Perfect for API calls, subscriptions
    this.fetchUser();
  }

  componentDidUpdate(prevProps, prevState) {
    // Runs after updates (state or props change)
    if (prevProps.userId !== this.props.userId) {
      this.fetchUser();
    }
  }

  componentWillUnmount() {
    // Runs before component is removed
    // Perfect for cleanup: timers, subscriptions
    this.cancelRequests();
  }

  render() {
    return <div>{this.state.user?.name}</div>;
  }
}
```

**Functional Component with Hooks:**
```javascript
function UserProfile({ userId }) {
  const [user, setUser] = useState(null);

  // Combines componentDidMount, componentDidUpdate, componentWillUnmount
  useEffect(() => {
    // componentDidMount + componentDidUpdate
    let cancelled = false;

    fetchUser(userId).then(data => {
      if (!cancelled) setUser(data);
    });

    // componentWillUnmount (cleanup function)
    return () => {
      cancelled = true; // Cleanup
    };
  }, [userId]); // Runs when userId changes

  return <div>{user?.name}</div>;
}
```

**useEffect Patterns:**

```javascript
// Run once on mount (like componentDidMount)
useEffect(() => {
  console.log('Component mounted');
}, []); // Empty dependency array

// Run on every render (no dependency array)
useEffect(() => {
  console.log('Component rendered');
});

// Run when specific values change
useEffect(() => {
  console.log('userId changed');
}, [userId]);

// Cleanup on unmount
useEffect(() => {
  const timer = setInterval(() => console.log('tick'), 1000);

  return () => clearInterval(timer); // Cleanup
}, []);

// Multiple effects for different concerns
useEffect(() => {
  // Effect 1: Fetch user data
  fetchUser(userId);
}, [userId]);

useEffect(() => {
  // Effect 2: Update document title
  document.title = `User ${userId}`;
}, [userId]);
```

**Lifecycle Comparison Table:**

| Class Component | Functional Component (Hooks) | Purpose |
|----------------|------------------------------|---------|
| `componentDidMount()` | `useEffect(() => {}, [])` | Run after first render |
| `componentDidUpdate()` | `useEffect(() => {}, [deps])` | Run after updates |
| `componentWillUnmount()` | `useEffect(() => { return cleanup }, [])` | Cleanup before unmount |
| `shouldComponentUpdate()` | `React.memo()` or `useMemo()` | Optimize re-renders |
| `getDerivedStateFromProps()` | `useState()` + `useEffect()` | Sync state with props |

---

## Key Takeaways for Jeneva Interview

1. **Focus on Modern React**: Emphasize functional components and hooks
2. **Understand Why**: Know why React does things a certain way (Virtual DOM, unidirectional data flow)
3. **Component Design**: Be ready to discuss component composition and reusability
4. **Performance**: Understand when and why re-renders happen
5. **Real-World Experience**: Be prepared with examples from projects you've built

### Practice Exercise

Build a simple Todo App that demonstrates:
- Functional components
- State management with useState
- Side effects with useEffect
- Props passing
- List rendering with keys
- Event handling
- Conditional rendering
