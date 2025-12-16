# React Performance & Advanced Hooks - Interview Questions & Answers

## Table of Contents
1. [React.memo and Memoization](#reactmemo-and-memoization)
2. [useMemo Hook](#usememo-hook)
3. [useCallback Hook](#usecallback-hook)
4. [useReducer Hook](#usereducer-hook)
5. [useRef Hook](#useref-hook)
6. [Performance Optimization Strategies](#performance-optimization-strategies)
7. [Code Splitting and Lazy Loading](#code-splitting-and-lazy-loading)

---

## React.memo and Memoization

### Question
**What is React.memo and when should you use it?**

### Answer
`React.memo` is a Higher-Order Component that memoizes a component. It prevents unnecessary re-renders by doing a shallow comparison of props.

### Better Explanation

**Without React.memo (Re-renders on every parent render):**
```javascript
function Parent() {
  const [count, setCount] = useState(0);
  const [name, setName] = useState('John');

  return (
    <div>
      <button onClick={() => setCount(count + 1)}>Count: {count}</button>
      <ExpensiveChild name={name} /> {/* Re-renders even when name doesn't change */}
    </div>
  );
}

function ExpensiveChild({ name }) {
  console.log('ExpensiveChild rendered');
  // Expensive computation
  const result = heavyCalculation(name);
  return <div>{result}</div>;
}
```

**With React.memo (Only re-renders when props change):**
```javascript
const ExpensiveChild = React.memo(function ExpensiveChild({ name }) {
  console.log('ExpensiveChild rendered'); // Only logs when name changes
  const result = heavyCalculation(name);
  return <div>{result}</div>;
});
```

**Custom Comparison Function:**
```javascript
function arePropsEqual(prevProps, nextProps) {
  // Return true if props are equal (skip render)
  // Return false if props are different (re-render)
  return prevProps.user.id === nextProps.user.id;
}

const UserCard = React.memo(function UserCard({ user }) {
  return (
    <div>
      <h3>{user.name}</h3>
      <p>{user.email}</p>
    </div>
  );
}, arePropsEqual); // Custom comparison
```

**When to Use React.memo:**
- Component renders often with same props
- Component is expensive to render
- Parent component re-renders frequently
- Props are primitive values or stable references

**When NOT to Use:**
- Props change frequently
- Component is already fast
- Premature optimization (measure first!)
- Props include functions or objects (without useCallback/useMemo)

---

## useMemo Hook

### Question
**What is useMemo and how is it different from React.memo?**

### Answer
`useMemo` is a hook that memoizes a **computed value**. It only recalculates the value when dependencies change.

### Better Explanation

**Without useMemo (Recalculates on every render):**
```javascript
function ProductList({ products, category }) {
  const [sortOrder, setSortOrder] = useState('asc');

  // This runs on EVERY render, even if products/category/sortOrder don't change
  const filteredProducts = products
    .filter(p => p.category === category)
    .sort((a, b) => sortOrder === 'asc' ? a.price - b.price : b.price - a.price);

  return (
    <div>
      {filteredProducts.map(p => (
        <ProductCard key={p.id} product={p} />
      ))}
    </div>
  );
}
```

**With useMemo (Only recalculates when dependencies change):**
```javascript
function ProductList({ products, category }) {
  const [sortOrder, setSortOrder] = useState('asc');

  const filteredProducts = useMemo(() => {
    console.log('Filtering and sorting...');
    return products
      .filter(p => p.category === category)
      .sort((a, b) => sortOrder === 'asc' ? a.price - b.price : b.price - a.price);
  }, [products, category, sortOrder]); // Only recalculate when these change

  return (
    <div>
      {filteredProducts.map(p => (
        <ProductCard key={p.id} product={p} />
      ))}
    </div>
  );
}
```

**Real-World Examples:**

**1. Expensive Calculations:**
```javascript
function DataAnalysis({ data }) {
  // Only recalculate statistics when data changes
  const statistics = useMemo(() => {
    console.log('Calculating statistics...');
    return {
      mean: calculateMean(data),
      median: calculateMedian(data),
      stdDev: calculateStdDev(data),
      correlation: calculateCorrelation(data)
    };
  }, [data]);

  return (
    <div>
      <p>Mean: {statistics.mean}</p>
      <p>Median: {statistics.median}</p>
      <p>Std Dev: {statistics.stdDev}</p>
    </div>
  );
}
```

**2. Stable Object References:**
```javascript
function UserProfile({ userId }) {
  const [user, setUser] = useState(null);

  // Create stable object reference for child component
  const userConfig = useMemo(() => ({
    id: userId,
    permissions: ['read', 'write'],
    theme: 'dark'
  }), [userId]);

  // This child only re-renders when userId changes
  return <MemoizedChild config={userConfig} />;
}

const MemoizedChild = React.memo(function Child({ config }) {
  console.log('Child rendered');
  return <div>User ID: {config.id}</div>;
});
```

**3. Filtering Large Lists:**
```javascript
function SearchableList({ items }) {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredItems = useMemo(() => {
    if (!searchTerm) return items;

    return items.filter(item =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [items, searchTerm]);

  return (
    <div>
      <input
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search..."
      />
      <ul>
        {filteredItems.map(item => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
    </div>
  );
}
```

**React.memo vs useMemo:**

| Aspect | React.memo | useMemo |
|--------|-----------|---------|
| Type | HOC | Hook |
| Memoizes | Component rendering | Computed value |
| Usage | Wrap component | Inside component |
| Purpose | Prevent re-renders | Cache expensive calculations |

---

## useCallback Hook

### Question
**What is useCallback and when should you use it?**

### Answer
`useCallback` returns a memoized **function** that only changes when dependencies change. It's used to prevent child component re-renders when passing callbacks as props.

### Better Explanation

**Problem - New Function on Every Render:**
```javascript
function Parent() {
  const [count, setCount] = useState(0);
  const [items, setItems] = useState([]);

  // NEW function created on every render
  const handleClick = () => {
    console.log('Item clicked');
  };

  return (
    <div>
      <button onClick={() => setCount(count + 1)}>Count: {count}</button>
      {/* Child re-renders every time because handleClick is a new reference */}
      <MemoizedChild onClick={handleClick} />
    </div>
  );
}

const MemoizedChild = React.memo(function Child({ onClick }) {
  console.log('Child rendered'); // Logs on every parent render
  return <button onClick={onClick}>Click Me</button>;
});
```

**Solution - useCallback:**
```javascript
function Parent() {
  const [count, setCount] = useState(0);
  const [items, setItems] = useState([]);

  // SAME function reference unless dependencies change
  const handleClick = useCallback(() => {
    console.log('Item clicked');
  }, []); // No dependencies - function never changes

  return (
    <div>
      <button onClick={() => setCount(count + 1)}>Count: {count}</button>
      {/* Child only re-renders when onClick actually changes */}
      <MemoizedChild onClick={handleClick} />
    </div>
  );
}
```

**Real-World Examples:**

**1. Event Handlers with Dependencies:**
```javascript
function TodoList() {
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState('all');

  // Recreate function only when setTodos changes (which it doesn't)
  const handleToggle = useCallback((id) => {
    setTodos(prev => prev.map(todo =>
      todo.id === id ? { ...todo, done: !todo.done } : todo
    ));
  }, []); // setTodos is stable, so empty array is fine

  const handleDelete = useCallback((id) => {
    setTodos(prev => prev.filter(todo => todo.id !== id));
  }, []);

  return (
    <div>
      {todos.map(todo => (
        <MemoizedTodoItem
          key={todo.id}
          todo={todo}
          onToggle={handleToggle}
          onDelete={handleDelete}
        />
      ))}
    </div>
  );
}

const MemoizedTodoItem = React.memo(function TodoItem({ todo, onToggle, onDelete }) {
  return (
    <div>
      <input
        type="checkbox"
        checked={todo.done}
        onChange={() => onToggle(todo.id)}
      />
      <span>{todo.text}</span>
      <button onClick={() => onDelete(todo.id)}>Delete</button>
    </div>
  );
});
```

**2. Callbacks with External Dependencies:**
```javascript
function SearchComponent({ onSearch }) {
  const [query, setQuery] = useState('');
  const [filters, setFilters] = useState({ category: 'all', minPrice: 0 });

  // Function changes only when dependencies change
  const handleSearch = useCallback(() => {
    onSearch({
      query,
      ...filters
    });
  }, [query, filters, onSearch]); // Recreate when these change

  return (
    <div>
      <input value={query} onChange={(e) => setQuery(e.target.value)} />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
}
```

**3. useCallback with useMemo:**
```javascript
function DataGrid({ data }) {
  const [sortBy, setSortBy] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');

  // Memoize the sorted data
  const sortedData = useMemo(() => {
    return [...data].sort((a, b) => {
      const aVal = a[sortBy];
      const bVal = b[sortBy];
      return sortOrder === 'asc' ? aVal - bVal : bVal - aVal;
    });
  }, [data, sortBy, sortOrder]);

  // Memoize the click handler
  const handleSort = useCallback((column) => {
    if (sortBy === column) {
      setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(column);
      setSortOrder('asc');
    }
  }, [sortBy]);

  return (
    <table>
      <thead>
        <tr>
          <th onClick={() => handleSort('name')}>Name</th>
          <th onClick={() => handleSort('age')}>Age</th>
          <th onClick={() => handleSort('salary')}>Salary</th>
        </tr>
      </thead>
      <tbody>
        {sortedData.map(row => (
          <MemoizedRow key={row.id} data={row} />
        ))}
      </tbody>
    </table>
  );
}
```

**useCallback vs useMemo:**
```javascript
// These are equivalent:
const memoizedCallback = useCallback(() => {
  doSomething(a, b);
}, [a, b]);

const memoizedCallback = useMemo(() => {
  return () => doSomething(a, b);
}, [a, b]);

// useCallback is just syntactic sugar for useMemo returning a function
```

---

## useReducer Hook

### Question
**What is useReducer and when should you use it instead of useState?**

### Answer
`useReducer` is a hook for managing complex state logic. It's similar to Redux reducers and is an alternative to `useState` for more complex state transitions.

### Better Explanation

**useState vs useReducer:**

**Simple state - useState:**
```javascript
function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>+</button>
      <button onClick={() => setCount(count - 1)}>-</button>
    </div>
  );
}
```

**Complex state - useReducer:**
```javascript
// Reducer function (outside component for reusability and testing)
function counterReducer(state, action) {
  switch (action.type) {
    case 'INCREMENT':
      return { count: state.count + 1 };
    case 'DECREMENT':
      return { count: state.count - 1 };
    case 'RESET':
      return { count: 0 };
    case 'SET':
      return { count: action.payload };
    default:
      throw new Error(`Unknown action: ${action.type}`);
  }
}

function Counter() {
  const [state, dispatch] = useReducer(counterReducer, { count: 0 });

  return (
    <div>
      <p>Count: {state.count}</p>
      <button onClick={() => dispatch({ type: 'INCREMENT' })}>+</button>
      <button onClick={() => dispatch({ type: 'DECREMENT' })}>-</button>
      <button onClick={() => dispatch({ type: 'RESET' })}>Reset</button>
      <button onClick={() => dispatch({ type: 'SET', payload: 10 })}>Set to 10</button>
    </div>
  );
}
```

**Real-World Example - Form Management:**
```javascript
const formReducer = (state, action) => {
  switch (action.type) {
    case 'SET_FIELD':
      return {
        ...state,
        values: {
          ...state.values,
          [action.field]: action.value
        }
      };

    case 'SET_ERROR':
      return {
        ...state,
        errors: {
          ...state.errors,
          [action.field]: action.error
        }
      };

    case 'SET_LOADING':
      return {
        ...state,
        isLoading: action.isLoading
      };

    case 'SUBMIT_SUCCESS':
      return {
        ...state,
        isLoading: false,
        submitSuccess: true,
        errors: {}
      };

    case 'SUBMIT_ERROR':
      return {
        ...state,
        isLoading: false,
        submitError: action.error
      };

    case 'RESET':
      return action.initialState;

    default:
      return state;
  }
};

function RegistrationForm() {
  const initialState = {
    values: { username: '', email: '', password: '' },
    errors: {},
    isLoading: false,
    submitSuccess: false,
    submitError: null
  };

  const [state, dispatch] = useReducer(formReducer, initialState);

  const handleChange = (field, value) => {
    dispatch({ type: 'SET_FIELD', field, value });

    // Validate
    if (field === 'email' && !value.includes('@')) {
      dispatch({ type: 'SET_ERROR', field, error: 'Invalid email' });
    } else {
      dispatch({ type: 'SET_ERROR', field, error: null });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: 'SET_LOADING', isLoading: true });

    try {
      await registerUser(state.values);
      dispatch({ type: 'SUBMIT_SUCCESS' });
    } catch (error) {
      dispatch({ type: 'SUBMIT_ERROR', error: error.message });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={state.values.username}
        onChange={(e) => handleChange('username', e.target.value)}
      />
      {state.errors.username && <span>{state.errors.username}</span>}

      <input
        value={state.values.email}
        onChange={(e) => handleChange('email', e.target.value)}
      />
      {state.errors.email && <span>{state.errors.email}</span>}

      <button type="submit" disabled={state.isLoading}>
        {state.isLoading ? 'Submitting...' : 'Submit'}
      </button>

      {state.submitSuccess && <p>Registration successful!</p>}
      {state.submitError && <p>Error: {state.submitError}</p>}
    </form>
  );
}
```

**When to Use useReducer:**
- Multiple related state values
- Complex state transitions
- State updates depend on previous state
- Want to separate state logic from component
- Easier testing (reducer is pure function)
- Multiple ways to update same state

**When to Use useState:**
- Simple, independent state values
- State transitions are straightforward
- Small components with minimal logic

---

## useRef Hook

### Question
**What is useRef and what are its use cases?**

### Answer
`useRef` returns a mutable ref object whose `.current` property persists across renders. It doesn't cause re-renders when updated.

### Better Explanation

**Three Main Use Cases:**

**1. Accessing DOM Elements:**
```javascript
function TextInput() {
  const inputRef = useRef(null);

  const focusInput = () => {
    inputRef.current.focus();
  };

  const getInputValue = () => {
    console.log(inputRef.current.value);
  };

  return (
    <div>
      <input ref={inputRef} />
      <button onClick={focusInput}>Focus Input</button>
      <button onClick={getInputValue}>Get Value</button>
    </div>
  );
}
```

**2. Storing Mutable Values (without causing re-renders):**
```javascript
function Timer() {
  const [count, setCount] = useState(0);
  const intervalRef = useRef(null); // Store interval ID

  const startTimer = () => {
    if (intervalRef.current) return; // Already running

    intervalRef.current = setInterval(() => {
      setCount(c => c + 1);
    }, 1000);
  };

  const stopTimer = () => {
    clearInterval(intervalRef.current);
    intervalRef.current = null;
  };

  useEffect(() => {
    return () => clearInterval(intervalRef.current); // Cleanup
  }, []);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={startTimer}>Start</button>
      <button onClick={stopTimer}>Stop</button>
    </div>
  );
}
```

**3. Storing Previous Values:**
```javascript
function usePrevious(value) {
  const ref = useRef();

  useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref.current;
}

function Counter() {
  const [count, setCount] = useState(0);
  const prevCount = usePrevious(count);

  return (
    <div>
      <p>Current: {count}</p>
      <p>Previous: {prevCount}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}
```

**Real-World Examples:**

**Auto-scroll to Bottom:**
```javascript
function ChatMessages({ messages }) {
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="messages-container">
      {messages.map(msg => (
        <div key={msg.id}>{msg.text}</div>
      ))}
      <div ref={messagesEndRef} />
    </div>
  );
}
```

**Click Outside to Close:**
```javascript
function useClickOutside(callback) {
  const ref = useRef(null);

  useEffect(() => {
    const handleClick = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        callback();
      }
    };

    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [callback]);

  return ref;
}

function Dropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useClickOutside(() => setIsOpen(false));

  return (
    <div ref={dropdownRef}>
      <button onClick={() => setIsOpen(!isOpen)}>Toggle</button>
      {isOpen && (
        <ul className="dropdown-menu">
          <li>Option 1</li>
          <li>Option 2</li>
        </ul>
      )}
    </div>
  );
}
```

**Ref vs State:**

| useRef | useState |
|--------|----------|
| Doesn't cause re-render | Causes re-render |
| Mutable | Immutable |
| Updated synchronously | Updated asynchronously |
| Use for side effects | Use for UI state |

---

## Performance Optimization Strategies

### Question
**What are the best practices for optimizing React application performance?**

### Answer

**1. Code Organization:**
```javascript
// ❌ Bad - Everything in one component
function Dashboard() {
  // 500 lines of code mixing UI, logic, and data fetching
}

// ✅ Good - Separated concerns
function Dashboard() {
  return (
    <div>
      <DashboardHeader />
      <DashboardStats />
      <DashboardCharts />
      <DashboardTable />
    </div>
  );
}
```

**2. Lazy State Initialization:**
```javascript
// ❌ Bad - Expensive calculation runs on every render
const [state, setState] = useState(expensiveCalculation());

// ✅ Good - Runs only once
const [state, setState] = useState(() => expensiveCalculation());
```

**3. Batch State Updates:**
```javascript
// ❌ Bad - Multiple re-renders
const handleClick = () => {
  setCount(count + 1);    // Re-render
  setFlag(true);           // Re-render
  setItems([...items, 1]); // Re-render
};

// ✅ Good - Single re-render (React 18 auto-batches)
const handleClick = () => {
  setCount(count + 1);
  setFlag(true);
  setItems([...items, 1]);
  // All batched into one re-render
};
```

**4. Avoid Inline Objects/Arrays as Props:**
```javascript
// ❌ Bad - New object on every render
<Component style={{ margin: 10 }} />
<Component items={[1, 2, 3]} />

// ✅ Good - Stable reference
const style = { margin: 10 };
const items = [1, 2, 3];

<Component style={style} />
<Component items={items} />
```

**5. Use Keys Correctly:**
```javascript
// ❌ Bad - Index as key (causes issues when list changes)
{items.map((item, index) => (
  <div key={index}>{item}</div>
))}

// ✅ Good - Unique, stable identifier
{items.map(item => (
  <div key={item.id}>{item.name}</div>
))}
```

**6. Virtualize Long Lists:**
```javascript
import { FixedSizeList } from 'react-window';

function VirtualList({ items }) {
  const Row = ({ index, style }) => (
    <div style={style}>{items[index].name}</div>
  );

  return (
    <FixedSizeList
      height={600}
      itemCount={items.length}
      itemSize={50}
      width="100%"
    >
      {Row}
    </FixedSizeList>
  );
}
```

**7. Debounce Expensive Operations:**
```javascript
function SearchComponent() {
  const [query, setQuery] = useState('');
  const debouncedQuery = useDebounce(query, 300);

  useEffect(() => {
    if (debouncedQuery) {
      searchAPI(debouncedQuery);
    }
  }, [debouncedQuery]);

  return (
    <input
      value={query}
      onChange={(e) => setQuery(e.target.value)}
    />
  );
}
```

---

## Code Splitting and Lazy Loading

### Question
**How do you implement code splitting in React?**

### Answer

**1. Route-based Code Splitting:**
```javascript
import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Lazy load route components
const Home = lazy(() => import('./pages/Home'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Profile = lazy(() => import('./pages/Profile'));

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<LoadingSpinner />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
```

**2. Component-based Code Splitting:**
```javascript
import { lazy, Suspense } from 'react';

// Heavy component loaded only when needed
const HeavyChart = lazy(() => import('./HeavyChart'));

function Dashboard() {
  const [showChart, setShowChart] = useState(false);

  return (
    <div>
      <button onClick={() => setShowChart(true)}>Show Chart</button>

      {showChart && (
        <Suspense fallback={<div>Loading chart...</div>}>
          <HeavyChart />
        </Suspense>
      )}
    </div>
  );
}
```

**3. Named Exports:**
```javascript
// Component file: Modal.jsx
export function Modal() { /* ... */ }

// Import with named export
const Modal = lazy(() =>
  import('./Modal').then(module => ({ default: module.Modal }))
);
```

**4. Error Boundaries with Lazy Loading:**
```javascript
class ErrorBoundary extends React.Component {
  state = { hasError: false };

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return <div>Failed to load component</div>;
    }
    return this.props.children;
  }
}

function App() {
  return (
    <ErrorBoundary>
      <Suspense fallback={<Loading />}>
        <LazyComponent />
      </Suspense>
    </ErrorBoundary>
  );
}
```

---

## Key Takeaways for Jeneva Interview

### Performance Checklist:
- [ ] Use React.memo for expensive components
- [ ] Use useMemo for expensive calculations
- [ ] Use useCallback for callback props to memoized children
- [ ] Use useReducer for complex state logic
- [ ] Implement code splitting for large apps
- [ ] Virtualize long lists
- [ ] Avoid inline objects/functions in JSX
- [ ] Use proper keys in lists

### Common Performance Mistakes:
1. Overusing memoization (measure first!)
2. Wrong dependencies in hooks
3. Creating components inside render
4. Not using React DevTools Profiler
5. Premature optimization

### Interview Tips:
- Explain trade-offs (memoization has a cost)
- Show you understand when NOT to optimize
- Demonstrate measuring performance before optimizing
- Discuss real-world scenarios from your experience
