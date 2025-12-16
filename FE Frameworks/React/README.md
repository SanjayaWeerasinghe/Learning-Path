# React Learning Path - Beginner to Advanced

React is a JavaScript library for building user interfaces. Master component-based development!

## 📚 Prerequisites
- Complete JavaScript (especially ES6+)
- Understand: arrow functions, destructuring, map/filter, promises
- HTML & CSS basics
- Node.js & npm installed

## 🎯 Course Structure

### 01-Basics (Components & JSX)
1. **Setup** - Create React App, folder structure
2. **JSX** - JavaScript XML syntax
3. **Components** - Functional components
4. **Props** - Passing data to components
5. **State** - Component data management

**Time**: 1-2 weeks

### 02-Intermediate (Interactivity)
1. **Events** - Handling user interactions
2. **Conditional Rendering** - Show/hide based on state
3. **Lists & Keys** - Rendering arrays
4. **Forms** - Controlled components
5. **Hooks: useState** - State management
6. **Hooks: useEffect** - Side effects, lifecycle

**Time**: 2-3 weeks

### 03-Advanced (Professional Development)
1. **Custom Hooks** - Reusable logic
2. **Context API** - Global state management
3. **useReducer** - Complex state logic
4. **Performance** - Memoization, optimization
5. **React Router** - Multi-page applications

**Time**: 3-4 weeks

## 🚀 Quick Start
```bash
# Create new React app
npx create-react-app my-app
cd my-app
npm start

# Opens http://localhost:3000
```

## ✅ Core Concepts

### Component Example
```jsx
function Welcome(props) {
  return <h1>Hello, {props.name}!</h1>;
}
```

### State Example
```jsx
import { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <button onClick={() => setCount(count + 1)}>
      Count: {count}
    </button>
  );
}
```

## 💡 Project Ideas

**After Basics:**
- Profile card
- Counter app
- Greeting component
- Simple form

**After Intermediate:**
- To-do list
- Weather app
- Quiz application
- Recipe finder
- Shopping cart

**After Advanced:**
- Blog with routing
- E-commerce site
- Social media dashboard
- Task management app
- Real-time chat

## 🛠️ Tools
- **Create React App** - Quick setup
- **React DevTools** - Browser extension
- **VS Code Extensions**:
  - ES7+ React/Redux snippets
  - Prettier

## 📖 Key Principles
- **Component-based**: UI broken into reusable pieces
- **Declarative**: Describe what UI should look like
- **Unidirectional data flow**: Props down, events up
- **Virtual DOM**: Efficient updates

## 🎓 After React
- **State Management**: Redux, Zustand
- **Frameworks**: Next.js, Remix
- **Mobile**: React Native
- **Testing**: Jest, React Testing Library

## 📚 Resources
- [React Docs](https://react.dev/)
- [React Tutorial](https://react.dev/learn)

**Start with:** `01-Basics/01-Setup/README.md`
