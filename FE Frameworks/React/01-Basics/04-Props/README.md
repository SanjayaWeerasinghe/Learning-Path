# Props (Properties)

## Introduction

Props are how components communicate in React. They allow you to pass data from parent components to child components, making your components dynamic and reusable. Props are read-only and follow a unidirectional data flow pattern. Understanding props is essential for building flexible, maintainable React applications.

## Key Concepts

### 1. Props Fundamentals
- **Read-Only**: Props cannot be modified by the receiving component
- **Unidirectional Flow**: Data flows from parent to child
- **Immutable**: Props should never be mutated directly
- **Any Type**: Props can be any JavaScript type (strings, numbers, objects, functions, etc.)

### 2. Passing Props
- **Attributes**: Props are passed as JSX attributes
- **Expressions**: Use curly braces to pass JavaScript expressions
- **Spread Operator**: Spread objects to pass multiple props
- **Children**: Special prop for nested content

### 3. Receiving Props
- **Function Parameters**: Props object is the first parameter
- **Destructuring**: Extract specific props for cleaner code
- **Default Values**: Set default values for props
- **Validation**: Use PropTypes for type checking

## Passing Props

### Basic Props

```jsx
// Parent Component
function App() {
  return (
    <Welcome name="Alice" age={25} />
  );
}

// Child Component
function Welcome(props) {
  return (
    <div>
      <h1>Hello, {props.name}!</h1>
      <p>You are {props.age} years old.</p>
    </div>
  );
}
```

### Props with Destructuring

```jsx
// Destructuring in function parameter
function UserCard({ name, email, avatar }) {
  return (
    <div className="user-card">
      <img src={avatar} alt={name} />
      <h2>{name}</h2>
      <p>{email}</p>
    </div>
  );
}

// Usage
function App() {
  return (
    <UserCard
      name="John Doe"
      email="john@example.com"
      avatar="https://via.placeholder.com/100"
    />
  );
}
```

### Multiple Props Types

```jsx
function Product({ name, price, inStock, discount, tags }) {
  return (
    <div className="product">
      <h2>{name}</h2>
      <p className="price">${price}</p>
      <p>{inStock ? 'In Stock' : 'Out of Stock'}</p>
      {discount && <span className="badge">-{discount}%</span>}
      <div className="tags">
        {tags.map((tag, index) => (
          <span key={index} className="tag">{tag}</span>
        ))}
      </div>
    </div>
  );
}

// Usage
<Product
  name="Laptop"
  price={999}
  inStock={true}
  discount={10}
  tags={['Electronics', 'Computers', 'Sale']}
/>
```

### Passing Objects and Arrays

```jsx
function UserProfile({ user }) {
  return (
    <div className="profile">
      <h1>{user.name}</h1>
      <p>Age: {user.age}</p>
      <p>Location: {user.location}</p>
      <div className="hobbies">
        {user.hobbies.map((hobby, index) => (
          <span key={index}>{hobby}</span>
        ))}
      </div>
    </div>
  );
}

// Usage
function App() {
  const userData = {
    name: 'Sarah',
    age: 28,
    location: 'New York',
    hobbies: ['Reading', 'Hiking', 'Photography']
  };

  return <UserProfile user={userData} />;
}
```

### Passing Functions as Props

```jsx
function Button({ onClick, label, variant }) {
  return (
    <button
      className={`btn btn-${variant}`}
      onClick={onClick}
    >
      {label}
    </button>
  );
}

// Usage
function App() {
  const handleClick = () => {
    alert('Button clicked!');
  };

  return (
    <div>
      <Button
        onClick={handleClick}
        label="Click Me"
        variant="primary"
      />
    </div>
  );
}
```

## Children Prop

### Basic Children

```jsx
function Card({ children }) {
  return (
    <div className="card">
      {children}
    </div>
  );
}

// Usage
function App() {
  return (
    <Card>
      <h2>Card Title</h2>
      <p>This is card content.</p>
      <button>Action</button>
    </Card>
  );
}
```

### Children with Other Props

```jsx
function Panel({ title, children, footer }) {
  return (
    <div className="panel">
      <div className="panel-header">
        <h2>{title}</h2>
      </div>
      <div className="panel-body">
        {children}
      </div>
      {footer && (
        <div className="panel-footer">
          {footer}
        </div>
      )}
    </div>
  );
}

// Usage
<Panel
  title="User Settings"
  footer={<button>Save Changes</button>}
>
  <p>Panel content goes here</p>
  <input type="text" placeholder="Username" />
</Panel>
```

## Default Props

### Using Default Parameters

```jsx
function Greeting({ name = 'Guest', message = 'Welcome!' }) {
  return (
    <div>
      <h1>{message}</h1>
      <p>Hello, {name}!</p>
    </div>
  );
}

// Usage - will use default values
<Greeting />

// Usage - will override defaults
<Greeting name="Alice" message="Good morning!" />
```

### Using defaultProps (Legacy)

```jsx
function Button({ label, variant }) {
  return <button className={`btn-${variant}`}>{label}</button>;
}

Button.defaultProps = {
  label: 'Click Me',
  variant: 'primary'
};
```

## Prop Types

### Installing PropTypes

```bash
npm install prop-types
```

### Using PropTypes

```jsx
import PropTypes from 'prop-types';

function UserCard({ name, age, email, isAdmin }) {
  return (
    <div className="user-card">
      <h2>{name}</h2>
      <p>Age: {age}</p>
      <p>Email: {email}</p>
      {isAdmin && <span className="admin-badge">Admin</span>}
    </div>
  );
}

UserCard.propTypes = {
  name: PropTypes.string.isRequired,
  age: PropTypes.number.isRequired,
  email: PropTypes.string,
  isAdmin: PropTypes.bool
};

UserCard.defaultProps = {
  isAdmin: false
};
```

### Common PropTypes

```jsx
import PropTypes from 'prop-types';

function Component(props) {
  return <div>{/* component content */}</div>;
}

Component.propTypes = {
  // Primitive types
  name: PropTypes.string,
  age: PropTypes.number,
  isActive: PropTypes.bool,
  callback: PropTypes.func,
  data: PropTypes.object,
  items: PropTypes.array,

  // Required prop
  id: PropTypes.string.isRequired,

  // Specific values
  status: PropTypes.oneOf(['active', 'inactive', 'pending']),

  // Multiple types
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),

  // Array of specific type
  numbers: PropTypes.arrayOf(PropTypes.number),

  // Object with specific shape
  user: PropTypes.shape({
    name: PropTypes.string,
    age: PropTypes.number
  }),

  // Object with exact shape
  config: PropTypes.exact({
    theme: PropTypes.string,
    debug: PropTypes.bool
  }),

  // Any type
  anything: PropTypes.any,

  // Custom validator
  customProp: function(props, propName, componentName) {
    if (!/^[A-Z]/.test(props[propName])) {
      return new Error(
        `${propName} in ${componentName} must start with uppercase`
      );
    }
  }
};
```

## Spread Operator with Props

### Spreading Props

```jsx
function Button(props) {
  return <button {...props} className="custom-button" />;
}

// Usage - all attributes are passed to button
<Button onClick={handleClick} disabled={false} type="submit">
  Submit
</Button>
```

### Extracting and Spreading Remaining Props

```jsx
function Input({ label, error, ...inputProps }) {
  return (
    <div className="form-field">
      <label>{label}</label>
      <input {...inputProps} className={error ? 'error' : ''} />
      {error && <span className="error-message">{error}</span>}
    </div>
  );
}

// Usage
<Input
  label="Email"
  error="Invalid email"
  type="email"
  placeholder="Enter email"
  required
/>
```

## Practical Tasks

### Task 1: Create a Reusable Button Component
Build a button component that accepts various props:

```jsx
import PropTypes from 'prop-types';

function Button({
  children,
  onClick,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  fullWidth = false
}) {
  const className = [
    'btn',
    `btn-${variant}`,
    `btn-${size}`,
    fullWidth && 'btn-full-width',
    disabled && 'btn-disabled'
  ].filter(Boolean).join(' ');

  return (
    <button
      className={className}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

Button.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
  variant: PropTypes.oneOf(['primary', 'secondary', 'danger']),
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  disabled: PropTypes.bool,
  fullWidth: PropTypes.bool
};

// Usage
function App() {
  return (
    <div>
      <Button variant="primary" size="large" onClick={() => alert('Clicked!')}>
        Primary Button
      </Button>
      <Button variant="danger" disabled>
        Disabled Button
      </Button>
    </div>
  );
}
```

### Task 2: Build a Product Card with Multiple Props
Create a product card that displays various product information:

```jsx
import PropTypes from 'prop-types';

function ProductCard({
  product,
  onAddToCart,
  onViewDetails,
  showDiscount = true
}) {
  const { id, name, price, image, rating, inStock, discount } = product;
  const finalPrice = discount ? price * (1 - discount / 100) : price;

  return (
    <div className="product-card">
      <div className="product-image">
        <img src={image} alt={name} />
        {showDiscount && discount > 0 && (
          <span className="discount-badge">-{discount}%</span>
        )}
      </div>

      <div className="product-info">
        <h3>{name}</h3>
        <div className="rating">{'⭐'.repeat(rating)}</div>

        <div className="price-section">
          {discount > 0 && (
            <span className="original-price">${price.toFixed(2)}</span>
          )}
          <span className="final-price">${finalPrice.toFixed(2)}</span>
        </div>

        <div className="actions">
          {inStock ? (
            <button onClick={() => onAddToCart(id)}>
              Add to Cart
            </button>
          ) : (
            <p className="out-of-stock">Out of Stock</p>
          )}
          <button onClick={() => onViewDetails(id)}>
            View Details
          </button>
        </div>
      </div>
    </div>
  );
}

ProductCard.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    rating: PropTypes.number,
    inStock: PropTypes.bool,
    discount: PropTypes.number
  }).isRequired,
  onAddToCart: PropTypes.func.isRequired,
  onViewDetails: PropTypes.func.isRequired,
  showDiscount: PropTypes.bool
};

// Usage
function App() {
  const product = {
    id: 1,
    name: 'Wireless Headphones',
    price: 199.99,
    image: 'headphones.jpg',
    rating: 4,
    inStock: true,
    discount: 15
  };

  return (
    <ProductCard
      product={product}
      onAddToCart={(id) => console.log('Added:', id)}
      onViewDetails={(id) => console.log('Viewing:', id)}
    />
  );
}
```

### Task 3: Create a Form Input Component
Build a reusable form input with labels and error handling:

```jsx
import PropTypes from 'prop-types';

function FormInput({
  label,
  name,
  type = 'text',
  value,
  onChange,
  placeholder,
  error,
  required = false,
  helpText
}) {
  return (
    <div className="form-group">
      <label htmlFor={name}>
        {label}
        {required && <span className="required">*</span>}
      </label>

      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={error ? 'error' : ''}
        required={required}
      />

      {helpText && !error && (
        <small className="help-text">{helpText}</small>
      )}

      {error && (
        <span className="error-message">{error}</span>
      )}
    </div>
  );
}

FormInput.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.string,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  error: PropTypes.string,
  required: PropTypes.bool,
  helpText: PropTypes.string
};

// Usage
function LoginForm() {
  const [email, setEmail] = React.useState('');
  const [error, setError] = React.useState('');

  return (
    <FormInput
      label="Email Address"
      name="email"
      type="email"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      placeholder="you@example.com"
      error={error}
      required
      helpText="We'll never share your email"
    />
  );
}
```

### Task 4: Build a List Component with Render Props
Create a flexible list component that renders items using a render function:

```jsx
import PropTypes from 'prop-types';

function List({ items, renderItem, emptyMessage = 'No items to display' }) {
  if (items.length === 0) {
    return <p className="empty-message">{emptyMessage}</p>;
  }

  return (
    <ul className="list">
      {items.map((item, index) => (
        <li key={item.id || index}>
          {renderItem(item, index)}
        </li>
      ))}
    </ul>
  );
}

List.propTypes = {
  items: PropTypes.array.isRequired,
  renderItem: PropTypes.func.isRequired,
  emptyMessage: PropTypes.string
};

// Usage
function App() {
  const users = [
    { id: 1, name: 'Alice', role: 'Admin' },
    { id: 2, name: 'Bob', role: 'User' },
    { id: 3, name: 'Charlie', role: 'User' }
  ];

  return (
    <List
      items={users}
      renderItem={(user) => (
        <div className="user-item">
          <strong>{user.name}</strong>
          <span className="role">{user.role}</span>
        </div>
      )}
      emptyMessage="No users found"
    />
  );
}
```

## Best Practices

1. **Use Destructuring**: Destructure props for cleaner code
2. **Validate Props**: Use PropTypes in development
3. **Provide Defaults**: Set sensible default values
4. **Keep Props Simple**: Don't pass too many props to a single component
5. **Use Descriptive Names**: Make prop names clear and meaningful
6. **Avoid Prop Drilling**: Don't pass props through many layers
7. **Immutability**: Never mutate props directly
8. **Document Complex Props**: Add comments for complex prop structures

## Common Pitfalls

1. **Mutating Props**: Props are read-only; never modify them
2. **Missing Keys**: Forgetting keys when rendering lists from props
3. **Prop Drilling**: Passing props through too many component layers
4. **Overusing Props**: Passing too many props to a component
5. **Not Validating Props**: Skipping PropTypes in complex components
6. **Incorrect Prop Names**: Using reserved words or conflicting names
7. **Forgetting Children**: Not handling the children prop when needed
8. **Default Values with Required**: Marking a prop as required when it has a default

## Interview Questions

### Question 1: What are props in React and how do they work?
**Answer**: Props (short for properties) are read-only inputs passed from parent to child components. They enable component reusability by allowing the same component to display different data. Props flow unidirectionally (top-down) and cannot be modified by the child component. They can be any JavaScript type including strings, numbers, objects, arrays, and functions. Props are accessed via the first parameter of functional components.

### Question 2: What is the difference between props and state?
**Answer**: Props are passed from parent to child and are read-only (immutable from the child's perspective). State is owned and managed by a component itself and can be changed using setState or useState. Props are used to configure a component and pass data down the tree. State is used for data that changes over time within a component. Changes to props or state trigger re-renders.

### Question 3: Why can't we modify props directly?
**Answer**: Props are read-only to maintain unidirectional data flow and prevent side effects. If child components could modify props, it would create unpredictable behavior and make debugging difficult. Data flows down from parent to child, and if children need to communicate back, they should use callback functions passed as props. This design ensures that components are predictable and easy to reason about.

### Question 4: What is the children prop and when should you use it?
**Answer**: The children prop is a special prop that contains the content between the opening and closing tags of a component. It's useful for creating wrapper components, layout components, and reusable containers. Use children when you want to create a component that doesn't know its content ahead of time, like modals, cards, sidebars, or any component that wraps other content.

### Question 5: How do you pass a function as a prop and why would you do it?
**Answer**: Functions are passed as props using curly braces: `<Child onClick={handleClick} />`. This is commonly used for event handlers and callbacks, allowing child components to communicate with parents (lifting state up). The child calls the function when an event occurs, and the parent can update its state or perform actions. This maintains unidirectional data flow while enabling child-to-parent communication.

## Resources

- [Passing Props to a Component](https://react.dev/learn/passing-props-to-a-component)
- [PropTypes Documentation](https://reactjs.org/docs/typechecking-with-proptypes.html)
- [Composition vs Inheritance](https://react.dev/learn/passing-props-to-a-component#passing-jsx-as-children)
- [Destructuring Props](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment)
