# React Components

## Introduction

Components are the building blocks of React applications. They let you split the UI into independent, reusable pieces that can be thought about in isolation. React components are JavaScript functions that return JSX. Understanding how to create, compose, and organize components is fundamental to building React applications effectively.

## Key Concepts

### 1. Component Fundamentals
- **Functional Components**: JavaScript functions that return JSX
- **Component Names**: Must start with a capital letter
- **Reusability**: Components can be used multiple times
- **Composition**: Build complex UIs from simple components

### 2. Types of Components
- **Presentational Components**: Focus on how things look
- **Container Components**: Focus on how things work
- **Layout Components**: Define page structure
- **Page Components**: Represent entire pages or routes

### 3. Component Organization
- **File Structure**: One component per file (recommended)
- **Naming Conventions**: PascalCase for component names
- **Import/Export**: Sharing components between files
- **Component Hierarchy**: Parent-child relationships

## Creating Components

### Basic Functional Component

```jsx
// Simple component
function Welcome() {
  return <h1>Hello, React!</h1>;
}

// Arrow function syntax
const Greeting = () => {
  return <h1>Welcome to my app</h1>;
};

// Implicit return for simple components
const Logo = () => <img src="logo.png" alt="Logo" />;
```

### Component with Multiple Elements

```jsx
function UserCard() {
  return (
    <div className="user-card">
      <img src="avatar.jpg" alt="User" />
      <h2>John Doe</h2>
      <p>Software Developer</p>
      <button>Follow</button>
    </div>
  );
}
```

### Component with Logic

```jsx
function ProductPrice() {
  const basePrice = 99.99;
  const discount = 0.1;
  const finalPrice = basePrice * (1 - discount);

  return (
    <div className="price">
      <p className="original-price">${basePrice}</p>
      <p className="final-price">${finalPrice.toFixed(2)}</p>
      <p className="discount">Save {discount * 100}%</p>
    </div>
  );
}
```

## Component Composition

### Nested Components

```jsx
function Header() {
  return (
    <header>
      <h1>My Website</h1>
    </header>
  );
}

function Navigation() {
  return (
    <nav>
      <a href="/">Home</a>
      <a href="/about">About</a>
      <a href="/contact">Contact</a>
    </nav>
  );
}

function App() {
  return (
    <div className="app">
      <Header />
      <Navigation />
      <main>
        <h2>Main Content</h2>
      </main>
    </div>
  );
}
```

### Reusable Components

```jsx
function Button() {
  return <button className="btn">Click Me</button>;
}

function HomePage() {
  return (
    <div>
      <h1>Welcome</h1>
      <Button />
      <Button />
      <Button />
    </div>
  );
}
```

### Component with Complex Structure

```jsx
function BlogPost() {
  return (
    <article className="blog-post">
      <header>
        <h1>Understanding React Components</h1>
        <div className="meta">
          <span className="author">By Jane Doe</span>
          <span className="date">March 15, 2024</span>
        </div>
      </header>

      <div className="content">
        <p>React components are amazing...</p>
        <p>They allow you to build reusable UI pieces...</p>
      </div>

      <footer>
        <button>Like</button>
        <button>Share</button>
        <button>Comment</button>
      </footer>
    </article>
  );
}
```

## Component Organization

### File Structure

```
src/
├── components/
│   ├── Header/
│   │   ├── Header.jsx
│   │   ├── Header.css
│   │   └── index.js
│   ├── Button/
│   │   ├── Button.jsx
│   │   ├── Button.css
│   │   └── index.js
│   └── Card/
│       ├── Card.jsx
│       ├── Card.css
│       └── index.js
└── App.jsx
```

### Exporting Components

```jsx
// Button.jsx - Named export
export function Button() {
  return <button>Click</button>;
}

// Or default export
function Button() {
  return <button>Click</button>;
}
export default Button;

// index.js - Re-export for cleaner imports
export { default } from './Button';
```

### Importing Components

```jsx
// Importing default export
import Button from './components/Button';

// Importing named export
import { Button } from './components/Button';

// Importing multiple components
import Header from './components/Header';
import Footer from './components/Footer';
import Navigation from './components/Navigation';
```

## Practical Tasks

### Task 1: Build a Profile Card Component
Create a reusable profile card component with avatar, name, and bio:

```jsx
function ProfileCard() {
  return (
    <div className="profile-card">
      <div className="profile-header">
        <img
          src="https://via.placeholder.com/100"
          alt="Profile"
          className="avatar"
        />
      </div>
      <div className="profile-body">
        <h2>Alex Johnson</h2>
        <p className="title">Full Stack Developer</p>
        <p className="bio">
          Passionate about building great user experiences
          with modern web technologies.
        </p>
      </div>
      <div className="profile-footer">
        <button className="btn-primary">Follow</button>
        <button className="btn-secondary">Message</button>
      </div>
    </div>
  );
}

export default ProfileCard;
```

### Task 2: Create a Navigation Component Hierarchy
Build a navigation system with multiple components:

```jsx
function NavItem() {
  return <a href="/" className="nav-item">Home</a>;
}

function NavMenu() {
  return (
    <nav className="nav-menu">
      <NavItem />
      <a href="/products" className="nav-item">Products</a>
      <a href="/about" className="nav-item">About</a>
      <a href="/contact" className="nav-item">Contact</a>
    </nav>
  );
}

function Logo() {
  return (
    <div className="logo">
      <h1>MyBrand</h1>
    </div>
  );
}

function Header() {
  return (
    <header className="header">
      <Logo />
      <NavMenu />
    </header>
  );
}

export default Header;
```

### Task 3: Build a Product Grid
Create components for displaying a grid of products:

```jsx
function ProductImage() {
  return (
    <div className="product-image">
      <img
        src="https://via.placeholder.com/200"
        alt="Product"
      />
    </div>
  );
}

function ProductInfo() {
  return (
    <div className="product-info">
      <h3>Premium Headphones</h3>
      <p className="price">$299.99</p>
      <p className="rating">⭐⭐⭐⭐⭐ (128 reviews)</p>
    </div>
  );
}

function ProductCard() {
  return (
    <div className="product-card">
      <ProductImage />
      <ProductInfo />
      <button className="add-to-cart">Add to Cart</button>
    </div>
  );
}

function ProductGrid() {
  return (
    <div className="product-grid">
      <ProductCard />
      <ProductCard />
      <ProductCard />
      <ProductCard />
    </div>
  );
}

export default ProductGrid;
```

### Task 4: Create a Dashboard Layout
Build a complete dashboard layout using component composition:

```jsx
function Sidebar() {
  return (
    <aside className="sidebar">
      <h2>Dashboard</h2>
      <nav>
        <a href="/overview">Overview</a>
        <a href="/analytics">Analytics</a>
        <a href="/reports">Reports</a>
        <a href="/settings">Settings</a>
      </nav>
    </aside>
  );
}

function TopBar() {
  return (
    <div className="top-bar">
      <h1>Welcome Back!</h1>
      <div className="user-menu">
        <span>John Doe</span>
        <img src="avatar.jpg" alt="User" />
      </div>
    </div>
  );
}

function StatCard({ title, value }) {
  return (
    <div className="stat-card">
      <h3>{title}</h3>
      <p className="stat-value">{value}</p>
    </div>
  );
}

function MainContent() {
  return (
    <main className="main-content">
      <TopBar />
      <div className="stats-grid">
        <StatCard title="Total Users" value="1,234" />
        <StatCard title="Revenue" value="$45,678" />
        <StatCard title="Orders" value="890" />
        <StatCard title="Growth" value="+12.5%" />
      </div>
    </main>
  );
}

function Dashboard() {
  return (
    <div className="dashboard">
      <Sidebar />
      <MainContent />
    </div>
  );
}

export default Dashboard;
```

## Best Practices

1. **One Component Per File**: Keep components in separate files for better organization
2. **Descriptive Names**: Use clear, descriptive names that indicate the component's purpose
3. **Small and Focused**: Each component should do one thing well
4. **Consistent Naming**: Follow PascalCase for component names, camelCase for files
5. **Reusable Components**: Design components to be reusable across your application
6. **Logical Composition**: Compose components in a way that makes sense hierarchically
7. **Avoid Deep Nesting**: Don't nest components too deeply
8. **Extract Common Patterns**: If you use the same pattern multiple times, extract it

## Common Pitfalls

1. **Lowercase Component Names**: Components must start with uppercase letters
2. **Missing Return Statement**: Functional components must return JSX
3. **Too Large Components**: Components that do too much and are hard to maintain
4. **Improper Nesting**: Nesting components in a confusing hierarchy
5. **Not Extracting Reusable Parts**: Duplicating code instead of creating reusable components
6. **Circular Dependencies**: Components importing each other in a circle
7. **Mixing Logic and Presentation**: Putting too much business logic in presentational components
8. **Default Export Inconsistency**: Mixing default and named exports inconsistently

## Component Patterns

### Container and Presentational Pattern

```jsx
// Presentational Component - Focuses on UI
function UserList({ users }) {
  return (
    <ul>
      {users.map(user => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
}

// Container Component - Handles logic
function UserListContainer() {
  const users = [
    { id: 1, name: 'Alice' },
    { id: 2, name: 'Bob' },
    { id: 3, name: 'Charlie' }
  ];

  return <UserList users={users} />;
}
```

### Layout Components

```jsx
function PageLayout({ children }) {
  return (
    <div className="page-layout">
      <Header />
      <main className="content">
        {children}
      </main>
      <Footer />
    </div>
  );
}

// Usage
function HomePage() {
  return (
    <PageLayout>
      <h1>Home Page</h1>
      <p>Welcome to our website</p>
    </PageLayout>
  );
}
```

### Specialized Components

```jsx
function PrimaryButton() {
  return <button className="btn btn-primary">Primary</button>;
}

function SecondaryButton() {
  return <button className="btn btn-secondary">Secondary</button>;
}

function DangerButton() {
  return <button className="btn btn-danger">Delete</button>;
}
```

## Interview Questions

### Question 1: What is a React component?
**Answer**: A React component is a reusable, independent piece of UI that returns JSX. Components are JavaScript functions that accept inputs (called props) and return React elements describing what should appear on the screen. They allow you to split the UI into independent, reusable pieces and think about each piece in isolation. Components must start with a capital letter to distinguish them from regular HTML tags.

### Question 2: What's the difference between functional and class components?
**Answer**: Functional components are JavaScript functions that return JSX and use hooks for state and lifecycle features. Class components are ES6 classes that extend React.Component and use `this.state` and lifecycle methods. Modern React development prefers functional components with hooks because they're simpler, have less boilerplate, are easier to test, and have better performance. Class components are legacy but still supported.

### Question 3: Why must component names start with a capital letter?
**Answer**: Component names must start with a capital letter so React can distinguish between HTML tags and React components. When React sees a lowercase tag like `<div>`, it treats it as a DOM element. When it sees a capitalized tag like `<MyComponent>`, it knows it's a user-defined component. If you use lowercase for components, React will try to render them as HTML tags, which will fail or produce unexpected results.

### Question 4: How do you decide when to create a new component?
**Answer**: Create a new component when: (1) You need to reuse a piece of UI in multiple places, (2) A component becomes too complex and should be broken down, (3) A piece of UI has its own distinct responsibility, (4) You want to make code more maintainable and testable, (5) You need to separate concerns or abstract complexity. Good indicators are: the component is over 200-300 lines, it has multiple responsibilities, or the same pattern appears multiple times.

### Question 5: What is component composition and why is it important?
**Answer**: Component composition is the practice of building complex UIs by combining simpler components together. Instead of creating one large component, you create small, focused components and compose them. It's important because it promotes: reusability (components can be used in different contexts), maintainability (smaller components are easier to understand and modify), testability (small components are easier to test), and flexibility (components can be combined in different ways to create different UIs).

## Resources

- [React Components Documentation](https://react.dev/learn/your-first-component)
- [Thinking in React](https://react.dev/learn/thinking-in-react)
- [Component Composition](https://react.dev/learn/passing-props-to-a-component)
- [Sharing State Between Components](https://react.dev/learn/sharing-state-between-components)
- [React Component Patterns](https://www.patterns.dev/react)
