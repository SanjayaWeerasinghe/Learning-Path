# React Basics

## Introduction

This section covers the fundamental concepts of React that every developer needs to master. You'll learn about setting up a React project, understanding JSX syntax, creating components, managing props, and handling state. These core concepts form the foundation for all React development.

## Key Concepts

### 1. React Fundamentals
- **Declarative UI**: Describe what the UI should look like, React handles the updates
- **Component-Based**: Build encapsulated components that manage their own state
- **Virtual DOM**: React's efficient way of updating the actual DOM
- **Unidirectional Data Flow**: Data flows down from parent to child components

### 2. Core Building Blocks
- **Components**: Reusable pieces of UI
- **JSX**: JavaScript syntax extension for writing markup
- **Props**: Read-only data passed from parent to child
- **State**: Mutable data that belongs to a component

### 3. Development Setup
- **Create React App**: Official toolchain for React
- **Vite**: Modern, fast build tool for React
- **Development Environment**: Browser tools and extensions

## Topics Covered

1. **Setup** - Learn how to create and configure React projects
2. **JSX** - Master the syntax that makes React components readable
3. **Components** - Build reusable, composable UI pieces
4. **Props** - Pass data between components effectively
5. **State** - Manage dynamic data within components

## Learning Path

### Week 1: Setup and JSX
- Set up your development environment
- Create your first React app
- Learn JSX syntax and expressions
- Understand the differences between JSX and HTML

### Week 2: Components and Props
- Create functional components
- Understand component composition
- Pass props between components
- Validate props with PropTypes

### Week 3: State Management
- Understand the concept of state
- Use the useState hook
- Handle state updates
- Understand state immutability

## Best Practices

1. **Keep Components Small**: Each component should have a single responsibility
2. **Use Functional Components**: Prefer functional components with hooks over class components
3. **Name Components Properly**: Use PascalCase for component names
4. **Organize Files**: Keep related files together (component, styles, tests)
5. **Avoid Prop Drilling**: Don't pass props through too many layers

## Common Pitfalls

1. **Mutating State Directly**: Always use setState functions
2. **Forgetting Keys in Lists**: Always provide unique keys when rendering lists
3. **Using Indexes as Keys**: Avoid using array indexes as keys
4. **Not Using Fragments**: Wrap multiple elements properly
5. **Mixing Controlled and Uncontrolled Components**: Choose one pattern and stick to it

## Getting Started

Navigate to each topic folder to dive deep into specific concepts:
- `01-Setup/` - Project setup and configuration
- `02-JSX/` - JSX syntax and expressions
- `03-Components/` - Component creation and composition
- `04-Props/` - Props and data flow
- `05-State/` - State management basics

## Prerequisites

- Basic JavaScript (ES6+)
- HTML and CSS
- Node.js and npm installed
- Understanding of arrow functions, destructuring, and spread operator

## Next Steps

After completing the basics, move on to:
- **Intermediate React**: Event handling, conditional rendering, forms, and hooks
- **Advanced React**: Custom hooks, Context API, performance optimization
- **Real-world Projects**: Apply your knowledge in practical applications

## Resources

- [Official React Documentation](https://react.dev)
- [React DevTools](https://react.dev/learn/react-developer-tools)
- [Create React App Documentation](https://create-react-app.dev)
- [Vite Documentation](https://vitejs.dev)
