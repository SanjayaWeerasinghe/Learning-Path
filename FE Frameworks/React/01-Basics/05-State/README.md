# State in React

## Introduction

State is data that changes over time in a component. Unlike props, state is managed within the component and can be updated. When state changes, React re-renders the component to reflect the new state. Understanding state is crucial for building interactive React applications that respond to user input and other events.

## Key Concepts

### 1. State Fundamentals
- **Local Data**: State belongs to and is managed by a component
- **Mutable**: State can be changed using setState functions
- **Triggers Re-renders**: State changes cause component to re-render
- **Asynchronous**: State updates may be batched and asynchronous

### 2. useState Hook
- **Hook Function**: `useState` is React's built-in hook for adding state
- **Returns Array**: Returns `[currentState, setterFunction]`
- **Initial Value**: Accepts initial state as argument
- **Functional Updates**: Setter can accept a function for updates based on previous state

### 3. State Management
- **Immutability**: Never mutate state directly
- **Lifting State Up**: Share state between components by moving it to common parent
- **Derived State**: Calculate values from existing state rather than storing duplicates
- **State Colocation**: Keep state as close as possible to where it's used

## Using useState Hook

### Basic State

```jsx
import { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>
        Increment
      </button>
    </div>
  );
}
```

### Multiple State Variables

```jsx
function UserForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState(0);

  return (
    <form>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Name"
      />
      <input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <input
        type="number"
        value={age}
        onChange={(e) => setAge(Number(e.target.value))}
        placeholder="Age"
      />
    </form>
  );
}
```

### State with Objects

```jsx
function UserProfile() {
  const [user, setUser] = useState({
    name: 'John',
    age: 30,
    email: 'john@example.com'
  });

  const updateName = (newName) => {
    setUser({
      ...user,  // Spread existing properties
      name: newName  // Update specific property
    });
  };

  return (
    <div>
      <p>Name: {user.name}</p>
      <p>Age: {user.age}</p>
      <p>Email: {user.email}</p>
      <button onClick={() => updateName('Jane')}>
        Change Name
      </button>
    </div>
  );
}
```

### State with Arrays

```jsx
function TodoList() {
  const [todos, setTodos] = useState(['Learn React', 'Build Project']);
  const [input, setInput] = useState('');

  const addTodo = () => {
    setTodos([...todos, input]);
    setInput('');
  };

  const removeTodo = (index) => {
    setTodos(todos.filter((_, i) => i !== index));
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
          <li key={index}>
            {todo}
            <button onClick={() => removeTodo(index)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
```

### Functional Updates

```jsx
function Counter() {
  const [count, setCount] = useState(0);

  const increment = () => {
    // Using previous state
    setCount(prevCount => prevCount + 1);
  };

  const incrementByFive = () => {
    // Multiple updates using functional form
    setCount(c => c + 1);
    setCount(c => c + 1);
    setCount(c => c + 1);
    setCount(c => c + 1);
    setCount(c => c + 1);
  };

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={increment}>+1</button>
      <button onClick={incrementByFive}>+5</button>
    </div>
  );
}
```

### Lazy Initial State

```jsx
// Expensive computation
function createInitialState() {
  console.log('Computing initial state...');
  return Array.from({ length: 1000 }, (_, i) => i);
}

function DataList() {
  // Function is only called once on initial render
  const [data, setData] = useState(() => createInitialState());

  return <div>Data length: {data.length}</div>;
}
```

## State Patterns

### Toggle Pattern

```jsx
function ToggleButton() {
  const [isOn, setIsOn] = useState(false);

  const toggle = () => setIsOn(!isOn);

  return (
    <button onClick={toggle}>
      {isOn ? 'ON' : 'OFF'}
    </button>
  );
}
```

### Form Handling

```jsx
function LoginForm() {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    rememberMe: false
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submitted:', formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="username"
        value={formData.username}
        onChange={handleChange}
        placeholder="Username"
      />
      <input
        name="password"
        type="password"
        value={formData.password}
        onChange={handleChange}
        placeholder="Password"
      />
      <label>
        <input
          name="rememberMe"
          type="checkbox"
          checked={formData.rememberMe}
          onChange={handleChange}
        />
        Remember Me
      </label>
      <button type="submit">Login</button>
    </form>
  );
}
```

### Modal State

```jsx
function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState('');

  const openModal = (content) => {
    setModalContent(content);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <button onClick={() => openModal('Welcome!')}>
        Show Welcome
      </button>

      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <p>{modalContent}</p>
            <button onClick={closeModal}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}
```

## Practical Tasks

### Task 1: Build a Counter with Multiple Operations
Create a counter with increment, decrement, and reset:

```jsx
import { useState } from 'react';

function AdvancedCounter() {
  const [count, setCount] = useState(0);
  const [step, setStep] = useState(1);

  const increment = () => setCount(c => c + step);
  const decrement = () => setCount(c => c - step);
  const reset = () => setCount(0);

  return (
    <div className="counter">
      <h1>Count: {count}</h1>

      <div className="controls">
        <button onClick={decrement}>-{step}</button>
        <button onClick={increment}>+{step}</button>
        <button onClick={reset}>Reset</button>
      </div>

      <div className="step-control">
        <label>
          Step Size:
          <input
            type="number"
            value={step}
            onChange={(e) => setStep(Number(e.target.value))}
            min="1"
          />
        </label>
      </div>
    </div>
  );
}
```

### Task 2: Create a Shopping Cart
Build a shopping cart with add, remove, and quantity update:

```jsx
import { useState } from 'react';

function ShoppingCart() {
  const [cart, setCart] = useState([]);

  const products = [
    { id: 1, name: 'Laptop', price: 999 },
    { id: 2, name: 'Phone', price: 699 },
    { id: 3, name: 'Headphones', price: 199 }
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

  const removeFromCart = (productId) => {
    setCart(cart.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity === 0) {
      removeFromCart(productId);
    } else {
      setCart(cart.map(item =>
        item.id === productId
          ? { ...item, quantity: newQuantity }
          : item
      ));
    }
  };

  const total = cart.reduce((sum, item) =>
    sum + (item.price * item.quantity), 0
  );

  return (
    <div className="shopping-cart">
      <h2>Products</h2>
      <div className="products">
        {products.map(product => (
          <div key={product.id} className="product">
            <h3>{product.name}</h3>
            <p>${product.price}</p>
            <button onClick={() => addToCart(product)}>
              Add to Cart
            </button>
          </div>
        ))}
      </div>

      <h2>Cart</h2>
      <div className="cart-items">
        {cart.length === 0 ? (
          <p>Cart is empty</p>
        ) : (
          <>
            {cart.map(item => (
              <div key={item.id} className="cart-item">
                <h3>{item.name}</h3>
                <p>${item.price} × {item.quantity}</p>
                <div className="quantity-controls">
                  <button onClick={() =>
                    updateQuantity(item.id, item.quantity - 1)
                  }>
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button onClick={() =>
                    updateQuantity(item.id, item.quantity + 1)
                  }>
                    +
                  </button>
                  <button onClick={() => removeFromCart(item.id)}>
                    Remove
                  </button>
                </div>
              </div>
            ))}
            <div className="total">
              <h3>Total: ${total.toFixed(2)}</h3>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
```

### Task 3: Build a Multi-Step Form
Create a form with multiple steps and validation:

```jsx
import { useState } from 'react';

function MultiStepForm() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    // Step 1
    firstName: '',
    lastName: '',
    email: '',
    // Step 2
    address: '',
    city: '',
    zipCode: '',
    // Step 3
    cardNumber: '',
    expiryDate: '',
    cvv: ''
  });

  const updateField = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  const handleSubmit = () => {
    console.log('Form submitted:', formData);
    alert('Form submitted successfully!');
  };

  return (
    <div className="multi-step-form">
      <div className="progress">
        Step {step} of 3
      </div>

      {step === 1 && (
        <div className="step">
          <h2>Personal Information</h2>
          <input
            placeholder="First Name"
            value={formData.firstName}
            onChange={(e) => updateField('firstName', e.target.value)}
          />
          <input
            placeholder="Last Name"
            value={formData.lastName}
            onChange={(e) => updateField('lastName', e.target.value)}
          />
          <input
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={(e) => updateField('email', e.target.value)}
          />
          <button onClick={nextStep}>Next</button>
        </div>
      )}

      {step === 2 && (
        <div className="step">
          <h2>Address</h2>
          <input
            placeholder="Street Address"
            value={formData.address}
            onChange={(e) => updateField('address', e.target.value)}
          />
          <input
            placeholder="City"
            value={formData.city}
            onChange={(e) => updateField('city', e.target.value)}
          />
          <input
            placeholder="Zip Code"
            value={formData.zipCode}
            onChange={(e) => updateField('zipCode', e.target.value)}
          />
          <button onClick={prevStep}>Back</button>
          <button onClick={nextStep}>Next</button>
        </div>
      )}

      {step === 3 && (
        <div className="step">
          <h2>Payment</h2>
          <input
            placeholder="Card Number"
            value={formData.cardNumber}
            onChange={(e) => updateField('cardNumber', e.target.value)}
          />
          <input
            placeholder="MM/YY"
            value={formData.expiryDate}
            onChange={(e) => updateField('expiryDate', e.target.value)}
          />
          <input
            placeholder="CVV"
            value={formData.cvv}
            onChange={(e) => updateField('cvv', e.target.value)}
          />
          <button onClick={prevStep}>Back</button>
          <button onClick={handleSubmit}>Submit</button>
        </div>
      )}
    </div>
  );
}
```

### Task 4: Create a Filterable Product List
Build a product list with search and filter functionality:

```jsx
import { useState } from 'react';

function ProductFilter() {
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('all');
  const [priceRange, setPriceRange] = useState('all');

  const products = [
    { id: 1, name: 'Laptop', category: 'electronics', price: 999 },
    { id: 2, name: 'Phone', category: 'electronics', price: 699 },
    { id: 3, name: 'Shirt', category: 'clothing', price: 49 },
    { id: 4, name: 'Shoes', category: 'clothing', price: 89 },
    { id: 5, name: 'Watch', category: 'accessories', price: 199 },
    { id: 6, name: 'Headphones', category: 'electronics', price: 149 }
  ];

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    const matchesCategory = category === 'all' ||
      product.category === category;

    const matchesPrice =
      priceRange === 'all' ||
      (priceRange === 'low' && product.price < 100) ||
      (priceRange === 'medium' && product.price >= 100 && product.price < 500) ||
      (priceRange === 'high' && product.price >= 500);

    return matchesSearch && matchesCategory && matchesPrice;
  });

  return (
    <div className="product-filter">
      <div className="filters">
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="all">All Categories</option>
          <option value="electronics">Electronics</option>
          <option value="clothing">Clothing</option>
          <option value="accessories">Accessories</option>
        </select>

        <select
          value={priceRange}
          onChange={(e) => setPriceRange(e.target.value)}
        >
          <option value="all">All Prices</option>
          <option value="low">Under $100</option>
          <option value="medium">$100 - $500</option>
          <option value="high">$500+</option>
        </select>
      </div>

      <div className="products">
        <p>Found {filteredProducts.length} products</p>
        {filteredProducts.map(product => (
          <div key={product.id} className="product">
            <h3>{product.name}</h3>
            <p>Category: {product.category}</p>
            <p>Price: ${product.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
```

## Best Practices

1. **Use Multiple State Variables**: Separate unrelated state into different variables
2. **Immutability**: Always create new objects/arrays, never mutate existing state
3. **Functional Updates**: Use functional form when new state depends on previous state
4. **Lazy Initialization**: Use function form for expensive initial state calculations
5. **Colocate State**: Keep state as close as possible to where it's used
6. **Lift State Up**: Move state to common parent when multiple components need it
7. **Avoid Redundant State**: Derive values instead of storing them
8. **Use Objects for Related Data**: Group related state into objects

## Common Pitfalls

1. **Direct Mutation**: Modifying state directly instead of using setState
2. **Assuming Immediate Updates**: State updates are asynchronous
3. **Stale State in Closures**: Not using functional updates in event handlers
4. **Too Much State**: Storing derived or computable values in state
5. **Wrong Initial Value Type**: Initializing with different type than you'll use
6. **Forgetting Dependencies**: In useEffect (covered in intermediate section)
7. **Overusing State**: Using state when props or derived values would work
8. **Nested State Updates**: Deep nesting makes updates complex and error-prone

## Interview Questions

### Question 1: What is state in React and how is it different from props?
**Answer**: State is mutable data managed within a component that can change over time, while props are immutable data passed from parent to child. State is private to the component and can be updated using setState functions, triggering re-renders. Props are read-only from the child component's perspective. State is for dynamic data that changes within a component; props are for configuration and passing data down the component tree.

### Question 2: Why can't we modify state directly?
**Answer**: Direct state modification doesn't trigger re-renders, so the UI won't update. React needs to know when state changes to schedule re-renders. Using setState functions (like the setter from useState) tells React that state has changed, allowing it to update the virtual DOM and re-render the component. Direct mutations also break React's ability to batch updates and can cause unpredictable behavior.

### Question 3: When should you use functional updates in setState?
**Answer**: Use functional updates when the new state depends on the previous state value. This is important because state updates are asynchronous and may be batched, so directly referencing the current state value can lead to stale data. The functional form `setState(prev => prev + 1)` ensures you're always working with the most recent state value, especially important in event handlers and when multiple updates happen in succession.

### Question 4: What happens when state is updated in React?
**Answer**: When state is updated: (1) React schedules a re-render of the component, (2) The component function runs again with the new state value, (3) React creates a new virtual DOM representation, (4) React compares it with the previous virtual DOM (reconciliation), (5) React updates only the parts of the actual DOM that changed. This process is asynchronous and may be batched for performance. Child components also re-render unless optimized with React.memo.

### Question 5: How do you update an object in state immutably?
**Answer**: Use the spread operator to create a new object: `setState({ ...oldState, property: newValue })`. For nested objects, spread each level: `setState({ ...old, nested: { ...old.nested, prop: val } })`. For arrays: add with `[...arr, newItem]`, remove with `arr.filter()`, update with `arr.map()`. Never use methods that mutate like `push()`, `splice()`, or direct property assignment. Immutability is crucial for React to detect changes and trigger re-renders correctly.

## Resources

- [State: A Component's Memory](https://react.dev/learn/state-a-components-memory)
- [useState Hook](https://react.dev/reference/react/useState)
- [Choosing the State Structure](https://react.dev/learn/choosing-the-state-structure)
- [Sharing State Between Components](https://react.dev/learn/sharing-state-between-components)
- [Updating Objects in State](https://react.dev/learn/updating-objects-in-state)
- [Updating Arrays in State](https://react.dev/learn/updating-arrays-in-state)
