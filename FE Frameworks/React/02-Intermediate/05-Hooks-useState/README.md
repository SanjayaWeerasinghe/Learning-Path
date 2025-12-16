# useState Hook

## Introduction

The useState hook is React's primary way to add state to functional components. It allows components to remember information between renders and trigger re-renders when that information changes. Understanding useState is fundamental to building interactive React applications with modern functional components.

## Key Concepts

### 1. useState Fundamentals
- **State Management**: Add local state to functional components
- **Array Destructuring**: Returns [state, setState] pair
- **Initial State**: Set initial value on first render
- **State Updates**: Trigger component re-renders

### 2. State Update Patterns
- **Direct Updates**: Set new state value directly
- **Functional Updates**: Update based on previous state
- **Object Updates**: Update objects immutably
- **Array Updates**: Update arrays without mutation

### 3. State Behavior
- **Asynchronous Updates**: State updates are batched
- **Immutability**: Never mutate state directly
- **Closure Issues**: Stale state in event handlers
- **Initial Value**: Can be a value or function

## Basic useState Usage

### Simple State

```jsx
import { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      <button onClick={() => setCount(count - 1)}>Decrement</button>
      <button onClick={() => setCount(0)}>Reset</button>
    </div>
  );
}
```

### Multiple State Variables

```jsx
function UserProfile() {
  const [name, setName] = useState('John');
  const [age, setAge] = useState(25);
  const [email, setEmail] = useState('john@example.com');

  return (
    <div>
      <p>Name: {name}</p>
      <p>Age: {age}</p>
      <p>Email: {email}</p>
      <button onClick={() => setAge(age + 1)}>Birthday</button>
    </div>
  );
}
```

### Boolean State (Toggles)

```jsx
function ToggleExample() {
  const [isVisible, setIsVisible] = useState(false);
  const [isEnabled, setIsEnabled] = useState(true);

  const toggle = () => setIsVisible(!isVisible);

  return (
    <div>
      <button onClick={toggle}>
        {isVisible ? 'Hide' : 'Show'}
      </button>
      {isVisible && <p>This content is visible!</p>}

      <button onClick={() => setIsEnabled(!isEnabled)}>
        {isEnabled ? 'Disable' : 'Enable'}
      </button>
    </div>
  );
}
```

## Functional Updates

### Previous State Dependency

```jsx
function FunctionalUpdates() {
  const [count, setCount] = useState(0);

  // Wrong: May not work as expected
  const incrementThreeTimes = () => {
    setCount(count + 1);
    setCount(count + 1);
    setCount(count + 1);
    // Only increments by 1!
  };

  // Correct: Use functional update
  const incrementThreeTimesCorrect = () => {
    setCount(c => c + 1);
    setCount(c => c + 1);
    setCount(c => c + 1);
    // Increments by 3!
  };

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={incrementThreeTimes}>Wrong +3</button>
      <button onClick={incrementThreeTimesCorrect}>Correct +3</button>
    </div>
  );
}
```

### Event Handlers with Previous State

```jsx
function ClickCounter() {
  const [clicks, setClicks] = useState(0);

  const handleClick = () => {
    // Always use functional update when new state depends on old state
    setClicks(prevClicks => prevClicks + 1);
  };

  // Multiple rapid clicks will all be counted correctly
  return (
    <div>
      <p>Clicks: {clicks}</p>
      <button onClick={handleClick}>Click Me</button>
    </div>
  );
}
```

## Object State

### Updating Objects

```jsx
function UserForm() {
  const [user, setUser] = useState({
    name: '',
    email: '',
    age: 0
  });

  const updateName = (newName) => {
    setUser({
      ...user,
      name: newName
    });
  };

  const updateEmail = (newEmail) => {
    setUser(prevUser => ({
      ...prevUser,
      email: newEmail
    }));
  };

  return (
    <div>
      <input
        value={user.name}
        onChange={(e) => updateName(e.target.value)}
        placeholder="Name"
      />
      <input
        value={user.email}
        onChange={(e) => updateEmail(e.target.value)}
        placeholder="Email"
      />
      <p>Name: {user.name}</p>
      <p>Email: {user.email}</p>
    </div>
  );
}
```

### Nested Objects

```jsx
function NestedState() {
  const [user, setUser] = useState({
    profile: {
      name: 'John',
      age: 30
    },
    settings: {
      theme: 'dark',
      notifications: true
    }
  });

  const updateName = (newName) => {
    setUser({
      ...user,
      profile: {
        ...user.profile,
        name: newName
      }
    });
  };

  const toggleTheme = () => {
    setUser({
      ...user,
      settings: {
        ...user.settings,
        theme: user.settings.theme === 'dark' ? 'light' : 'dark'
      }
    });
  };

  return (
    <div>
      <p>Name: {user.profile.name}</p>
      <p>Theme: {user.settings.theme}</p>
      <button onClick={() => updateName('Jane')}>Change Name</button>
      <button onClick={toggleTheme}>Toggle Theme</button>
    </div>
  );
}
```

## Array State

### Adding Items

```jsx
function TodoList() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');

  const addTodo = () => {
    if (input.trim()) {
      // Add to end
      setTodos([...todos, input]);
      // Or add to beginning
      // setTodos([input, ...todos]);
      setInput('');
    }
  };

  return (
    <div>
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button onClick={addTodo}>Add</button>
      <ul>
        {todos.map((todo, index) => (
          <li key={index}>{todo}</li>
        ))}
      </ul>
    </div>
  );
}
```

### Removing Items

```jsx
function ItemList() {
  const [items, setItems] = useState([
    { id: 1, name: 'Item 1' },
    { id: 2, name: 'Item 2' },
    { id: 3, name: 'Item 3' }
  ]);

  const removeItem = (id) => {
    setItems(items.filter(item => item.id !== id));
  };

  const removeByIndex = (index) => {
    setItems(items.filter((_, i) => i !== index));
  };

  return (
    <ul>
      {items.map((item, index) => (
        <li key={item.id}>
          {item.name}
          <button onClick={() => removeItem(item.id)}>Remove</button>
        </li>
      ))}
    </ul>
  );
}
```

### Updating Items

```jsx
function EditableList() {
  const [items, setItems] = useState([
    { id: 1, text: 'Item 1', completed: false },
    { id: 2, text: 'Item 2', completed: false },
    { id: 3, text: 'Item 3', completed: false }
  ]);

  const toggleComplete = (id) => {
    setItems(items.map(item =>
      item.id === id
        ? { ...item, completed: !item.completed }
        : item
    ));
  };

  const updateText = (id, newText) => {
    setItems(items.map(item =>
      item.id === id
        ? { ...item, text: newText }
        : item
    ));
  };

  return (
    <ul>
      {items.map(item => (
        <li key={item.id}>
          <input
            type="checkbox"
            checked={item.completed}
            onChange={() => toggleComplete(item.id)}
          />
          <input
            value={item.text}
            onChange={(e) => updateText(item.id, e.target.value)}
          />
        </li>
      ))}
    </ul>
  );
}
```

## Lazy Initial State

### Expensive Initialization

```jsx
function ExpensiveComponent() {
  // Wrong: Function runs on every render
  const [data, setData] = useState(expensiveComputation());

  // Correct: Function runs only once
  const [dataLazy, setDataLazy] = useState(() => expensiveComputation());

  return <div>{/* ... */}</div>;
}

function expensiveComputation() {
  console.log('Computing...');
  return Array.from({ length: 1000 }, (_, i) => i);
}
```

### Reading from localStorage

```jsx
function PersistentCounter() {
  // Lazy initialization from localStorage
  const [count, setCount] = useState(() => {
    const saved = localStorage.getItem('count');
    return saved !== null ? parseInt(saved, 10) : 0;
  });

  // Save to localStorage on change
  const increment = () => {
    setCount(c => {
      const newCount = c + 1;
      localStorage.setItem('count', newCount.toString());
      return newCount;
    });
  };

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={increment}>Increment</button>
    </div>
  );
}
```

## Practical Tasks

### Task 1: Build a Shopping Cart

```jsx
import { useState } from 'react';

function ShoppingCart() {
  const [cart, setCart] = useState([]);

  const products = [
    { id: 1, name: 'Laptop', price: 999 },
    { id: 2, name: 'Mouse', price: 25 },
    { id: 3, name: 'Keyboard', price: 75 }
  ];

  const addToCart = (product) => {
    const existing = cart.find(item => item.id === product.id);

    if (existing) {
      setCart(cart.map(item =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const removeFromCart = (id) => {
    setCart(cart.filter(item => item.id !== id));
  };

  const updateQuantity = (id, quantity) => {
    if (quantity === 0) {
      removeFromCart(id);
    } else {
      setCart(cart.map(item =>
        item.id === id ? { ...item, quantity } : item
      ));
    }
  };

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div>
      <h2>Products</h2>
      {products.map(product => (
        <div key={product.id}>
          <span>{product.name} - ${product.price}</span>
          <button onClick={() => addToCart(product)}>Add to Cart</button>
        </div>
      ))}

      <h2>Cart</h2>
      {cart.length === 0 ? (
        <p>Cart is empty</p>
      ) : (
        <>
          {cart.map(item => (
            <div key={item.id}>
              <span>{item.name} - ${item.price} × {item.quantity}</span>
              <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
              <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
              <button onClick={() => removeFromCart(item.id)}>Remove</button>
            </div>
          ))}
          <h3>Total: ${total}</h3>
        </>
      )}
    </div>
  );
}
```

### Task 2: Create a Form with Multiple Inputs

```jsx
import { useState } from 'react';

function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    subscribe: false
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));

    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.match(/\S+@\S+\.\S+/)) {
      newErrors.email = 'Valid email is required';
    }

    if (formData.phone && !formData.phone.match(/^\d{10}$/)) {
      newErrors.phone = 'Phone must be 10 digits';
    }

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();

    if (Object.keys(validationErrors).length === 0) {
      console.log('Form submitted:', formData);
      setSubmitted(true);
      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        message: '',
        subscribe: false
      });
    } else {
      setErrors(validationErrors);
    }
  };

  if (submitted) {
    return <div>Thank you for your message!</div>;
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <input
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Name"
        />
        {errors.name && <span>{errors.name}</span>}
      </div>

      <div>
        <input
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
        />
        {errors.email && <span>{errors.email}</span>}
      </div>

      <div>
        <input
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="Phone (optional)"
        />
        {errors.phone && <span>{errors.phone}</span>}
      </div>

      <div>
        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          placeholder="Message"
        />
      </div>

      <label>
        <input
          type="checkbox"
          name="subscribe"
          checked={formData.subscribe}
          onChange={handleChange}
        />
        Subscribe to newsletter
      </label>

      <button type="submit">Submit</button>
    </form>
  );
}
```

### Task 3: Build a Color Theme Switcher

```jsx
import { useState } from 'react';

function ThemeSwitcher() {
  const [theme, setTheme] = useState({
    mode: 'light',
    primaryColor: '#007bff',
    fontSize: 16
  });

  const toggleMode = () => {
    setTheme(prev => ({
      ...prev,
      mode: prev.mode === 'light' ? 'dark' : 'light'
    }));
  };

  const updateColor = (color) => {
    setTheme(prev => ({
      ...prev,
      primaryColor: color
    }));
  };

  const updateFontSize = (size) => {
    setTheme(prev => ({
      ...prev,
      fontSize: size
    }));
  };

  const styles = {
    backgroundColor: theme.mode === 'dark' ? '#333' : '#fff',
    color: theme.mode === 'dark' ? '#fff' : '#333',
    fontSize: `${theme.fontSize}px`,
    padding: '20px'
  };

  return (
    <div style={styles}>
      <h1 style={{ color: theme.primaryColor }}>Theme Customizer</h1>

      <div>
        <button onClick={toggleMode}>
          Switch to {theme.mode === 'light' ? 'Dark' : 'Light'} Mode
        </button>
      </div>

      <div>
        <label>Primary Color:</label>
        <input
          type="color"
          value={theme.primaryColor}
          onChange={(e) => updateColor(e.target.value)}
        />
      </div>

      <div>
        <label>Font Size: {theme.fontSize}px</label>
        <input
          type="range"
          min="12"
          max="24"
          value={theme.fontSize}
          onChange={(e) => updateFontSize(Number(e.target.value))}
        />
      </div>

      <div>
        <h3>Current Theme:</h3>
        <pre>{JSON.stringify(theme, null, 2)}</pre>
      </div>
    </div>
  );
}
```

## Best Practices

1. **Use Functional Updates**: When new state depends on previous state
2. **Lazy Initialization**: Use function for expensive initial state
3. **Split State**: Separate unrelated state into multiple useState calls
4. **Immutable Updates**: Never mutate state directly
5. **Meaningful Names**: Use descriptive variable names for state
6. **Colocate State**: Keep state close to where it's used
7. **Avoid Redundant State**: Derive values instead of storing duplicates
8. **Group Related State**: Use objects for related state values

## Common Pitfalls

1. **Direct Mutation**: Modifying state directly instead of using setState
2. **Stale Closures**: Event handlers capturing old state values
3. **Not Using Functional Updates**: Relying on current state in rapid updates
4. **Too Many useState**: Creating separate state for every value
5. **Initializing with Props**: Using props as initial state without updates
6. **Forgetting Immutability**: Mutating objects/arrays in state
7. **Async State Updates**: Expecting immediate state changes
8. **Complex State Logic**: Using useState for complex state (use useReducer)

## Interview Questions

### Question 1: What does useState return and how do you use it?
**Answer**: useState returns an array with exactly two elements: [currentState, setStateFunction]. We use array destructuring to name these: `const [count, setCount] = useState(0)`. The first element is the current state value, the second is a function to update it. Calling the setter function triggers a re-render with the new state value. The setter can accept a new value or a function that receives the previous state.

### Question 2: When should you use functional updates in useState?
**Answer**: Use functional updates when the new state depends on the previous state value: `setState(prevState => prevState + 1)`. This is crucial when: (1) Multiple updates happen in quick succession, (2) Updates occur in event handlers or callbacks, (3) State updates are batched together. The functional form ensures you're working with the most recent state value, avoiding stale closure issues.

### Question 3: Why can't you mutate state directly in React?
**Answer**: Direct mutation doesn't trigger re-renders because React compares state by reference. If you mutate an object/array directly, the reference stays the same, so React thinks nothing changed. You must create new objects/arrays: `setState({...state, key: value})` or `setState([...array, item])`. Immutability also helps React's reconciliation algorithm work efficiently and enables features like time-travel debugging.

### Question 4: What is lazy initialization and when should you use it?
**Answer**: Lazy initialization passes a function to useState that runs only once on initial render: `useState(() => expensiveComputation())`. Use it when: (1) Initial state requires expensive computation, (2) Reading from localStorage/sessionStorage, (3) Parsing/transforming data. Without lazy init, the computation runs on every render even though the result is only used once. The function is called only during the initial render, improving performance.

### Question 5: How do you update objects in state correctly?
**Answer**: Use the spread operator to create a new object: `setState({...currentState, property: newValue})`. For nested objects, spread each level: `setState({...state, nested: {...state.nested, prop: val}})`. Never do `state.property = value; setState(state)` - this mutates the object. Always create a new object reference. For complex updates, consider using useReducer or libraries like Immer.

### Question 6: What's the difference between useState and useReducer?
**Answer**: useState is simpler and best for independent state values or simple updates. useReducer is better for: (1) Complex state logic, (2) Multiple sub-values, (3) Next state depends on previous state in complex ways, (4) State transitions follow specific patterns. useReducer consolidates state logic in a reducer function, making it easier to test and reason about. Choose useState for simplicity, useReducer for complexity.

### Question 7: Can you use previous props to set initial state?
**Answer**: Yes, but the initial state is only set once on mount: `useState(props.initialCount)`. If props change, state won't update automatically. To sync state with props, use useEffect: `useEffect(() => setState(props.value), [props.value])`. Or use a key on the component to force remount. For derived state, consider computing it on each render instead of storing it.

### Question 8: Why does state update asynchronously?
**Answer**: React batches state updates for performance. Multiple setState calls in the same event handler are batched into a single re-render. This is why logging state immediately after setState shows old value - the update hasn't happened yet. To use updated state, use functional updates or useEffect with state as dependency. React 18 extends batching to all updates, including promises and timeouts.

## Resources

- [useState Hook](https://react.dev/reference/react/useState)
- [State: A Component's Memory](https://react.dev/learn/state-a-components-memory)
- [Updating Objects in State](https://react.dev/learn/updating-objects-in-state)
- [Updating Arrays in State](https://react.dev/learn/updating-arrays-in-state)
- [Choosing the State Structure](https://react.dev/learn/choosing-the-state-structure)
