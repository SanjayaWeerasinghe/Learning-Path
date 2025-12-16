# React Intermediate

## Introduction

This section builds upon the basics and introduces more practical concepts for building interactive React applications. You'll learn how to handle user interactions, render content conditionally, work with lists, manage forms, and master the most commonly used React hooks (useState and useEffect).

## Key Concepts

### 1. User Interactions
- **Event Handling**: Responding to user actions (clicks, input, etc.)
- **Synthetic Events**: React's cross-browser wrapper around native events
- **Event Delegation**: How React efficiently handles events

### 2. Dynamic Rendering
- **Conditional Rendering**: Show/hide UI based on conditions
- **List Rendering**: Efficiently render arrays of data
- **Keys**: Helping React identify which items have changed

### 3. Form Management
- **Controlled Components**: Forms where React controls the input state
- **Uncontrolled Components**: Forms using refs to access DOM values
- **Form Validation**: Ensuring user input is correct
- **Form Submission**: Handling form data

### 4. React Hooks
- **useState**: Managing component state
- **useEffect**: Handling side effects (data fetching, subscriptions, etc.)
- **Effect Cleanup**: Preventing memory leaks
- **Dependencies Array**: Controlling when effects run

## Topics Covered

1. **Events** - Handle user interactions effectively
2. **Conditional Rendering** - Display UI based on conditions
3. **Lists and Keys** - Render dynamic lists properly
4. **Forms** - Build interactive forms with controlled components
5. **useState Hook** - Deep dive into state management
6. **useEffect Hook** - Master side effects and lifecycle

## Learning Path

### Week 1: Events and Conditional Rendering
- Learn event handling patterns
- Understand synthetic events
- Master conditional rendering techniques
- Handle multiple rendering scenarios

### Week 2: Lists and Forms
- Render lists efficiently
- Understand the importance of keys
- Build controlled form components
- Handle form validation and submission

### Week 3: Hooks Deep Dive
- Master useState patterns
- Understand useEffect lifecycle
- Learn effect cleanup
- Handle async operations

## Best Practices

1. **Event Handlers**: Use descriptive names (handleClick, handleSubmit)
2. **Conditional Rendering**: Keep conditions simple and readable
3. **Keys**: Always use stable, unique identifiers (not array indexes)
4. **Forms**: Prefer controlled components for better control
5. **useEffect**: Always specify dependencies array
6. **Cleanup**: Clean up subscriptions and timers in useEffect

## Common Pitfalls

1. **Binding Event Handlers**: Forgetting that `this` behaves differently in JavaScript
2. **Inline Arrow Functions**: Creating new functions on every render
3. **Missing Keys**: Not providing keys when rendering lists
4. **Index as Key**: Using array index as key in dynamic lists
5. **Infinite Loops**: Missing dependencies in useEffect causing infinite re-renders
6. **Stale Closures**: Accessing stale state in useEffect
7. **Form State**: Not properly controlling form inputs

## Practical Applications

### Event Handling Examples
- Button clicks and user interactions
- Form inputs and validation
- Keyboard shortcuts
- Mouse events and drag-and-drop

### Conditional Rendering Use Cases
- Loading states
- Error boundaries
- Authentication flows
- Feature flags

### List Rendering Scenarios
- Product catalogs
- User lists
- Comment sections
- Navigation menus

### Form Applications
- Login/signup forms
- Search filters
- Multi-step wizards
- Settings panels

### useEffect Use Cases
- Data fetching from APIs
- Setting up subscriptions
- Manual DOM manipulation
- Syncing with external systems

## Getting Started

Navigate to each topic folder to explore specific concepts:
- `01-Events/` - Event handling and user interactions
- `02-Conditional-Rendering/` - Conditional display patterns
- `03-Lists-Keys/` - Rendering lists and key importance
- `04-Forms/` - Form handling and validation
- `05-Hooks-useState/` - useState hook in depth
- `06-Hooks-useEffect/` - useEffect hook and side effects

## Prerequisites

You should be comfortable with:
- All concepts from React Basics
- JavaScript promises and async/await
- Array methods (map, filter, reduce)
- ES6+ syntax (destructuring, spread operator)

## Next Steps

After mastering intermediate concepts, proceed to:
- **Advanced React**: Custom hooks, Context API, useReducer, performance optimization
- **State Management Libraries**: Redux, Zustand, Recoil
- **Advanced Patterns**: Render props, HOCs, compound components
- **Testing**: Jest, React Testing Library

## Common Interview Topics

- How does React's event system differ from native DOM events?
- When should you use controlled vs uncontrolled components?
- Why are keys important when rendering lists?
- Explain the useEffect dependency array
- How do you prevent memory leaks in useEffect?
- What's the difference between useState and useReducer?

## Resources

- [React Events Documentation](https://react.dev/learn/responding-to-events)
- [Conditional Rendering Guide](https://react.dev/learn/conditional-rendering)
- [Lists and Keys](https://react.dev/learn/rendering-lists)
- [Forms in React](https://react.dev/reference/react-dom/components/input)
- [useState Hook](https://react.dev/reference/react/useState)
- [useEffect Hook](https://react.dev/reference/react/useEffect)
