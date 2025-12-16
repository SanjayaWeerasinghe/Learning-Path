# JSX (JavaScript XML)

## Introduction

JSX is a syntax extension for JavaScript that lets you write HTML-like markup inside JavaScript files. It's one of React's most distinctive features, making components more readable and intuitive. JSX gets compiled to regular JavaScript function calls that create React elements. Understanding JSX is fundamental to writing React components effectively.

## Key Concepts

### 1. JSX Fundamentals
- **Syntax Extension**: HTML-like syntax in JavaScript
- **Compilation**: JSX is transformed to React.createElement() calls
- **Expressions**: JavaScript expressions can be embedded in JSX
- **Type Safety**: JSX provides compile-time checking

### 2. JSX vs HTML
- **Attribute Names**: camelCase instead of kebab-case
- **className vs class**: Reserved JavaScript keywords are renamed
- **Self-Closing Tags**: All tags must be closed
- **Single Root Element**: Components must return a single root element

### 3. Embedding Expressions
- **Curly Braces**: Embed JavaScript expressions with `{}`
- **Variables**: Reference variables directly
- **Function Calls**: Call functions inline
- **Conditional Logic**: Use ternary operators and logical AND

## JSX Syntax

### Basic JSX

```jsx
// Simple JSX element
const element = <h1>Hello, React!</h1>;

// JSX with attributes
const image = <img src="logo.png" alt="Logo" />;

// Nested JSX
const container = (
  <div>
    <h1>Welcome</h1>
    <p>This is a paragraph</p>
  </div>
);
```

### JSX Expressions

```jsx
function Greeting() {
  const name = 'Alice';
  const age = 25;

  return (
    <div>
      <h1>Hello, {name}!</h1>
      <p>You are {age} years old</p>
      <p>Next year you'll be {age + 1}</p>
    </div>
  );
}
```

### JSX Attributes

```jsx
function ProfileImage() {
  const imageUrl = 'https://example.com/avatar.jpg';
  const userName = 'John Doe';

  return (
    <img
      src={imageUrl}
      alt={userName}
      className="profile-image"
      width={200}
      height={200}
    />
  );
}
```

### Conditional Rendering in JSX

```jsx
function Welcome({ isLoggedIn, username }) {
  return (
    <div>
      {isLoggedIn ? (
        <h1>Welcome back, {username}!</h1>
      ) : (
        <h1>Please sign in</h1>
      )}
    </div>
  );
}

// Logical AND operator
function Notification({ message }) {
  return (
    <div>
      {message && <p className="alert">{message}</p>}
    </div>
  );
}
```

### JSX with Arrays

```jsx
function FruitList() {
  const fruits = ['Apple', 'Banana', 'Orange', 'Mango'];

  return (
    <ul>
      {fruits.map((fruit, index) => (
        <li key={index}>{fruit}</li>
      ))}
    </ul>
  );
}
```

### JSX Fragments

```jsx
// Using React.Fragment
function Table() {
  return (
    <React.Fragment>
      <tr>
        <td>Cell 1</td>
        <td>Cell 2</td>
      </tr>
    </React.Fragment>
  );
}

// Short syntax
function List() {
  return (
    <>
      <li>Item 1</li>
      <li>Item 2</li>
      <li>Item 3</li>
    </>
  );
}
```

### Inline Styles in JSX

```jsx
function StyledComponent() {
  const divStyle = {
    backgroundColor: 'blue',
    color: 'white',
    padding: '20px',
    borderRadius: '5px'
  };

  return (
    <div style={divStyle}>
      <h1 style={{ fontSize: '24px', margin: '0' }}>
        Styled Heading
      </h1>
    </div>
  );
}
```

## JSX Compilation

### Before Compilation (JSX)
```jsx
const element = (
  <div className="container">
    <h1>Hello, World!</h1>
  </div>
);
```

### After Compilation (JavaScript)
```javascript
const element = React.createElement(
  'div',
  { className: 'container' },
  React.createElement('h1', null, 'Hello, World!')
);
```

## JSX vs HTML Differences

### HTML
```html
<div class="container">
  <label for="name">Name:</label>
  <input type="text" value="John" readonly>
  <button onclick="handleClick()">Click</button>
</div>
```

### JSX
```jsx
<div className="container">
  <label htmlFor="name">Name:</label>
  <input type="text" value="John" readOnly />
  <button onClick={handleClick}>Click</button>
</div>
```

### Key Differences Table

| HTML | JSX | Reason |
|------|-----|--------|
| `class` | `className` | `class` is reserved in JavaScript |
| `for` | `htmlFor` | `for` is reserved in JavaScript |
| `onclick` | `onClick` | camelCase convention |
| `tabindex` | `tabIndex` | camelCase convention |
| `readonly` | `readOnly` | camelCase convention |
| `<br>` | `<br />` | All tags must be closed |

## Practical Tasks

### Task 1: Create a User Profile Card
Build a component that displays user information using JSX:

```jsx
function UserProfile() {
  const user = {
    name: 'Sarah Johnson',
    age: 28,
    occupation: 'Software Engineer',
    location: 'San Francisco, CA',
    avatar: 'https://via.placeholder.com/150',
    isOnline: true
  };

  return (
    <div className="profile-card">
      <img src={user.avatar} alt={user.name} className="avatar" />
      <h2>{user.name}</h2>
      {user.isOnline && <span className="status-badge">Online</span>}
      <div className="user-details">
        <p><strong>Age:</strong> {user.age}</p>
        <p><strong>Occupation:</strong> {user.occupation}</p>
        <p><strong>Location:</strong> {user.location}</p>
      </div>
    </div>
  );
}
```

### Task 2: Dynamic Product List
Create a component that renders a list of products with conditional pricing display:

```jsx
function ProductList() {
  const products = [
    { id: 1, name: 'Laptop', price: 999, inStock: true },
    { id: 2, name: 'Phone', price: 699, inStock: true },
    { id: 3, name: 'Tablet', price: 499, inStock: false },
    { id: 4, name: 'Headphones', price: 199, inStock: true }
  ];

  return (
    <div className="product-list">
      <h1>Products</h1>
      {products.map(product => (
        <div key={product.id} className="product-item">
          <h3>{product.name}</h3>
          <p className="price">${product.price}</p>
          {product.inStock ? (
            <button>Add to Cart</button>
          ) : (
            <p className="out-of-stock">Out of Stock</p>
          )}
        </div>
      ))}
    </div>
  );
}
```

### Task 3: Conditional Greeting Component
Build a component that shows different greetings based on time of day:

```jsx
function TimeBasedGreeting() {
  const hour = new Date().getHours();

  let greeting;
  let greetingClass;

  if (hour < 12) {
    greeting = 'Good Morning';
    greetingClass = 'morning';
  } else if (hour < 18) {
    greeting = 'Good Afternoon';
    greetingClass = 'afternoon';
  } else {
    greeting = 'Good Evening';
    greetingClass = 'evening';
  }

  return (
    <div className={`greeting ${greetingClass}`}>
      <h1>{greeting}!</h1>
      <p>Current time: {hour}:00</p>
    </div>
  );
}
```

### Task 4: Form with Multiple Input Types
Create a form component demonstrating various JSX attributes:

```jsx
function RegistrationForm() {
  return (
    <form className="registration-form">
      <h2>User Registration</h2>

      <div className="form-group">
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          name="username"
          placeholder="Enter username"
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="your@email.com"
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="age">Age:</label>
        <input
          type="number"
          id="age"
          name="age"
          min={18}
          max={100}
        />
      </div>

      <div className="form-group">
        <input type="checkbox" id="terms" name="terms" />
        <label htmlFor="terms">I agree to the terms and conditions</label>
      </div>

      <button type="submit">Register</button>
    </form>
  );
}
```

## Best Practices

1. **Use Fragments**: Avoid unnecessary wrapper divs with `<>...</>`
2. **Keep JSX Readable**: Break long JSX into multiple lines
3. **Extract Complex Logic**: Move complex expressions to variables
4. **Use Semantic HTML**: Choose appropriate HTML elements
5. **Self-Close Empty Tags**: Always close tags like `<img />`, `<input />`
6. **Use Proper Keys**: When mapping arrays, use unique, stable keys
7. **Avoid Inline Functions**: Define event handlers outside JSX when possible
8. **Comment JSX**: Use `{/* comment */}` for JSX comments

## Common Pitfalls

1. **Forgetting Curly Braces**: `<h1>Welcome {name}</h1>` not `<h1>Welcome name</h1>`
2. **Using class Instead of className**: Will cause warnings
3. **Not Closing Tags**: `<img>` should be `<img />`
4. **Multiple Root Elements**: Must wrap in a Fragment or div
5. **Incorrect Inline Styles**: Style object, not string: `style={{ color: 'red' }}` not `style="color: red"`
6. **Reserved Words**: Using JavaScript reserved words as attributes
7. **Case Sensitivity**: JSX is case-sensitive; `<Div>` is not the same as `<div>`
8. **Quotes vs Braces**: Strings use quotes `alt="text"`, expressions use braces `alt={variable}`

## Advanced JSX Patterns

### Conditional Rendering with Multiple Conditions

```jsx
function UserStatus({ user }) {
  return (
    <div>
      {user ? (
        user.isPremium ? (
          <PremiumBadge />
        ) : (
          <RegularBadge />
        )
      ) : (
        <GuestMessage />
      )}
    </div>
  );
}
```

### Spreading Props

```jsx
function Button(props) {
  return <button {...props} className="custom-button" />;
}

// Usage
<Button onClick={handleClick} disabled={false}>
  Click Me
</Button>
```

### Children Prop

```jsx
function Card({ children, title }) {
  return (
    <div className="card">
      <h2>{title}</h2>
      <div className="card-content">
        {children}
      </div>
    </div>
  );
}

// Usage
<Card title="My Card">
  <p>This is the card content</p>
  <button>Action</button>
</Card>
```

## Interview Questions

### Question 1: What is JSX and why do we use it?
**Answer**: JSX is a syntax extension for JavaScript that allows writing HTML-like code in JavaScript files. We use JSX because it makes React components more readable and intuitive, provides compile-time error checking, prevents injection attacks through automatic escaping, and allows the full power of JavaScript within markup. JSX is compiled to React.createElement() calls.

### Question 2: Can browsers understand JSX?
**Answer**: No, browsers cannot understand JSX directly. JSX must be transpiled to regular JavaScript using tools like Babel. The build tools (Create React App, Vite) include this transpilation step automatically. JSX is compiled to React.createElement() function calls that create React elements, which browsers can execute.

### Question 3: What's the difference between `class` and `className` in JSX?
**Answer**: In JSX, we use `className` instead of `class` because `class` is a reserved keyword in JavaScript (used for defining classes). Similarly, `for` attribute in HTML becomes `htmlFor` in JSX. React uses camelCase for attribute names to stay consistent with JavaScript naming conventions and avoid conflicts with reserved words.

### Question 4: How do you write comments in JSX?
**Answer**: In JSX, you write comments inside curly braces with the multi-line comment syntax: `{/* This is a comment */}`. You cannot use regular JavaScript comments `//` or `/* */` directly in JSX because they would be treated as text nodes. Outside of JSX (in the JavaScript portion), you can use normal JavaScript comments.

### Question 5: Why must JSX expressions have a single parent element?
**Answer**: JSX expressions must have a single parent element because they get compiled to React.createElement() calls, which can only return one element. Multiple root elements would mean trying to return multiple values from a single expression, which JavaScript doesn't allow. To avoid adding unnecessary DOM nodes, you can use React Fragments (`<>...</>`) as the parent wrapper.

## Resources

- [JSX in React Documentation](https://react.dev/learn/writing-markup-with-jsx)
- [JSX In Depth](https://react.dev/learn/javascript-in-jsx-with-curly-braces)
- [Babel REPL](https://babeljs.io/repl) - See JSX compilation
- [React Without JSX](https://react.dev/reference/react/createElement)
- [Conditional Rendering](https://react.dev/learn/conditional-rendering)
