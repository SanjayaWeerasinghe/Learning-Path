# React Design Patterns - Interview Questions & Answers

## Table of Contents
1. [Container/Presentational Pattern](#containerpresentational-pattern)
2. [Higher-Order Components (HOC)](#higher-order-components)
3. [Render Props](#render-props)
4. [Custom Hooks](#custom-hooks)
5. [Compound Components](#compound-components)
6. [Context API Pattern](#context-api-pattern)
7. [Controlled vs Uncontrolled Components](#controlled-vs-uncontrolled-components)

---

## Container/Presentational Pattern

### Question
**What is the Container/Presentational pattern and when should you use it?**

### Answer
This pattern separates components into two categories:
- **Container Components**: Handle logic, state, and data fetching
- **Presentational Components**: Focus purely on UI rendering

### Better Explanation

**Presentational Component** (Dumb/Stateless):
```javascript
// Pure UI component - only receives props and renders
function UserCard({ user, onFollow }) {
  return (
    <div className="user-card">
      <img src={user.avatar} alt={user.name} />
      <h3>{user.name}</h3>
      <p>{user.bio}</p>
      <button onClick={() => onFollow(user.id)}>
        Follow
      </button>
    </div>
  );
}
```

**Container Component** (Smart/Stateful):
```javascript
// Handles logic, state, and data fetching
function UserCardContainer({ userId }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUser(userId).then(data => {
      setUser(data);
      setLoading(false);
    });
  }, [userId]);

  const handleFollow = async (userId) => {
    await followUser(userId);
    setUser({ ...user, isFollowing: true });
  };

  if (loading) return <Spinner />;

  return <UserCard user={user} onFollow={handleFollow} />;
}
```

**Benefits:**
- **Separation of Concerns**: Logic separate from presentation
- **Reusability**: Presentational components can be reused with different data
- **Testability**: Easy to test UI separately from logic
- **Maintainability**: Changes to UI don't affect business logic

**When to Use:**
- Complex components with lots of logic
- When you need to reuse UI with different data sources
- When testing is a priority

---

## Higher-Order Components

### Question
**What are Higher-Order Components (HOCs) and how do you implement them?**

### Answer
A Higher-Order Component is a function that takes a component and returns a new component with additional props or behavior. It's a pattern for reusing component logic.

### Better Explanation

**Think of HOCs as decorators** - they wrap a component and enhance it without modifying the original.

**Basic HOC Example:**
```javascript
// HOC that adds loading state
function withLoading(Component) {
  return function WithLoadingComponent({ isLoading, ...props }) {
    if (isLoading) {
      return <div className="spinner">Loading...</div>;
    }
    return <Component {...props} />;
  };
}

// Usage
const UserListWithLoading = withLoading(UserList);

function App() {
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);

  return <UserListWithLoading isLoading={loading} users={users} />;
}
```

**Real-World HOC - Authentication:**
```javascript
function withAuth(Component) {
  return function AuthenticatedComponent(props) {
    const { user, loading } = useAuth(); // Custom hook

    if (loading) {
      return <LoadingSpinner />;
    }

    if (!user) {
      return <Navigate to="/login" />;
    }

    // Pass user data to wrapped component
    return <Component {...props} user={user} />;
  };
}

// Usage
const ProtectedDashboard = withAuth(Dashboard);
const ProtectedProfile = withAuth(Profile);

function App() {
  return (
    <Routes>
      <Route path="/dashboard" element={<ProtectedDashboard />} />
      <Route path="/profile" element={<ProtectedProfile />} />
    </Routes>
  );
}
```

**Advanced HOC - Data Fetching:**
```javascript
function withDataFetching(Component, fetchFunction) {
  return function WithDataFetchingComponent(props) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
      let cancelled = false;

      setLoading(true);
      fetchFunction(props)
        .then(result => {
          if (!cancelled) {
            setData(result);
            setLoading(false);
          }
        })
        .catch(err => {
          if (!cancelled) {
            setError(err);
            setLoading(false);
          }
        });

      return () => {
        cancelled = true;
      };
    }, [props.id]); // Re-fetch when id changes

    return (
      <Component
        {...props}
        data={data}
        loading={loading}
        error={error}
      />
    );
  };
}

// Usage
const UserDetailsWithData = withDataFetching(
  UserDetails,
  ({ id }) => fetch(`/api/users/${id}`).then(r => r.json())
);
```

**HOC Best Practices:**
1. Don't mutate the original component
2. Pass unrelated props through
3. Maximize composability
4. Use display names for debugging
5. Don't use HOCs inside render method

**Note**: Modern React often uses **Custom Hooks** instead of HOCs as they're more flexible and easier to compose.

---

## Render Props

### Question
**What is the Render Props pattern and how is it different from HOCs?**

### Answer
Render Props is a pattern where a component takes a function as a prop that returns a React element. The component calls this function instead of implementing its own render logic.

### Better Explanation

**Basic Render Props:**
```javascript
// Component that tracks mouse position
function MouseTracker({ render }) {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (event) => {
    setPosition({ x: event.clientX, y: event.clientY });
  };

  return (
    <div style={{ height: '100vh' }} onMouseMove={handleMouseMove}>
      {render(position)}
    </div>
  );
}

// Usage - you control what gets rendered
function App() {
  return (
    <MouseTracker
      render={({ x, y }) => (
        <h1>Mouse position: {x}, {y}</h1>
      )}
    />
  );
}
```

**Real-World Example - Data Fetching:**
```javascript
function DataFetcher({ url, render }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(url)
      .then(response => response.json())
      .then(data => {
        setData(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err);
        setLoading(false);
      });
  }, [url]);

  return render({ data, loading, error });
}

// Usage with different UI implementations
function UserPage() {
  return (
    <DataFetcher
      url="/api/users"
      render={({ data, loading, error }) => {
        if (loading) return <Spinner />;
        if (error) return <ErrorMessage error={error} />;
        return (
          <ul>
            {data.map(user => (
              <li key={user.id}>{user.name}</li>
            ))}
          </ul>
        );
      }}
    />
  );
}
```

**Using Children as Render Prop:**
```javascript
function Toggle({ children }) {
  const [isOn, setIsOn] = useState(false);

  const toggle = () => setIsOn(!isOn);

  return children({ isOn, toggle });
}

// Usage
function App() {
  return (
    <Toggle>
      {({ isOn, toggle }) => (
        <div>
          <button onClick={toggle}>
            {isOn ? 'ON' : 'OFF'}
          </button>
          {isOn && <div>Content is visible!</div>}
        </div>
      )}
    </Toggle>
  );
}
```

**HOC vs Render Props:**

| Aspect | HOC | Render Props |
|--------|-----|--------------|
| Composition | Wrapping | Nesting |
| Props Naming | May clash | Explicit |
| Debugging | Harder (wrapped components) | Easier |
| Flexibility | Less (fixed structure) | More (dynamic rendering) |
| Performance | Slightly better | Slight overhead |

**Modern Alternative**: **Custom Hooks** are now preferred over both HOCs and Render Props:

```javascript
// Custom Hook (Modern approach)
function useMousePosition() {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (event) => {
      setPosition({ x: event.clientX, y: event.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return position;
}

// Usage - Much cleaner!
function App() {
  const { x, y } = useMousePosition();
  return <h1>Mouse position: {x}, {y}</h1>;
}
```

---

## Custom Hooks

### Question
**What are Custom Hooks and when should you create one?**

### Answer
Custom Hooks are JavaScript functions that use React hooks and allow you to extract and reuse stateful logic between components. They must start with "use" and can call other hooks.

### Better Explanation

**Basic Custom Hook:**
```javascript
// Custom hook for form handling
function useForm(initialValues) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues({ ...values, [name]: value });
  };

  const handleSubmit = (callback, validate) => (event) => {
    event.preventDefault();
    const validationErrors = validate(values);

    if (Object.keys(validationErrors).length === 0) {
      callback(values);
    } else {
      setErrors(validationErrors);
    }
  };

  const reset = () => {
    setValues(initialValues);
    setErrors({});
  };

  return { values, errors, handleChange, handleSubmit, reset };
}

// Usage
function LoginForm() {
  const { values, errors, handleChange, handleSubmit } = useForm({
    email: '',
    password: ''
  });

  const validate = (values) => {
    const errors = {};
    if (!values.email) errors.email = 'Email is required';
    if (!values.password) errors.password = 'Password is required';
    return errors;
  };

  const login = (formData) => {
    console.log('Logging in with:', formData);
  };

  return (
    <form onSubmit={handleSubmit(login, validate)}>
      <input
        name="email"
        value={values.email}
        onChange={handleChange}
      />
      {errors.email && <span>{errors.email}</span>}

      <input
        name="password"
        type="password"
        value={values.password}
        onChange={handleChange}
      />
      {errors.password && <span>{errors.password}</span>}

      <button type="submit">Login</button>
    </form>
  );
}
```

**Real-World Custom Hooks:**

**1. useFetch - Data Fetching:**
```javascript
function useFetch(url, options = {}) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;

    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(url, options);
        if (!response.ok) throw new Error(response.statusText);
        const json = await response.json();

        if (!cancelled) {
          setData(json);
          setError(null);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err.message);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      cancelled = true;
    };
  }, [url]);

  return { data, loading, error };
}

// Usage
function UserList() {
  const { data: users, loading, error } = useFetch('/api/users');

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <ul>
      {users.map(user => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
}
```

**2. useLocalStorage - Persistent State:**
```javascript
function useLocalStorage(key, initialValue) {
  // Get initial value from localStorage or use provided initial value
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  });

  // Update localStorage when value changes
  const setValue = (value) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(error);
    }
  };

  return [storedValue, setValue];
}

// Usage
function ThemeToggle() {
  const [theme, setTheme] = useLocalStorage('theme', 'light');

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <div className={`app ${theme}`}>
      <button onClick={toggleTheme}>
        Switch to {theme === 'light' ? 'dark' : 'light'} mode
      </button>
    </div>
  );
}
```

**3. useDebounce - Performance Optimization:**
```javascript
function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
}

// Usage - Search with debounce
function SearchComponent() {
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  useEffect(() => {
    if (debouncedSearchTerm) {
      // API call only happens 500ms after user stops typing
      searchAPI(debouncedSearchTerm);
    }
  }, [debouncedSearchTerm]);

  return (
    <input
      type="text"
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      placeholder="Search..."
    />
  );
}
```

**When to Create a Custom Hook:**
- Logic is used in multiple components
- Complex stateful logic needs to be extracted
- Multiple hooks are used together for a specific purpose
- You want to encapsulate side effects

---

## Compound Components

### Question
**What is the Compound Components pattern?**

### Answer
Compound Components is a pattern where multiple components work together to form a complete UI element. They share implicit state and communicate with each other.

### Better Explanation

Think of HTML's `<select>` and `<option>` - they work together as a compound component.

**Basic Compound Component:**
```javascript
// Create context for shared state
const TabsContext = React.createContext();

function Tabs({ children, defaultTab }) {
  const [activeTab, setActiveTab] = useState(defaultTab);

  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab }}>
      <div className="tabs">{children}</div>
    </TabsContext.Provider>
  );
}

function TabList({ children }) {
  return <div className="tab-list">{children}</div>;
}

function Tab({ id, children }) {
  const { activeTab, setActiveTab } = useContext(TabsContext);

  return (
    <button
      className={activeTab === id ? 'active' : ''}
      onClick={() => setActiveTab(id)}
    >
      {children}
    </button>
  );
}

function TabPanel({ id, children }) {
  const { activeTab } = useContext(TabsContext);

  return activeTab === id ? <div className="tab-panel">{children}</div> : null;
}

// Attach components to parent
Tabs.List = TabList;
Tabs.Tab = Tab;
Tabs.Panel = TabPanel;

// Usage - Very flexible and readable
function App() {
  return (
    <Tabs defaultTab="home">
      <Tabs.List>
        <Tabs.Tab id="home">Home</Tabs.Tab>
        <Tabs.Tab id="profile">Profile</Tabs.Tab>
        <Tabs.Tab id="settings">Settings</Tabs.Tab>
      </Tabs.List>

      <Tabs.Panel id="home">
        <h2>Home Content</h2>
      </Tabs.Panel>
      <Tabs.Panel id="profile">
        <h2>Profile Content</h2>
      </Tabs.Panel>
      <Tabs.Panel id="settings">
        <h2>Settings Content</h2>
      </Tabs.Panel>
    </Tabs>
  );
}
```

**Advanced Example - Accordion:**
```javascript
const AccordionContext = React.createContext();

function Accordion({ children, allowMultiple = false }) {
  const [openItems, setOpenItems] = useState([]);

  const toggleItem = (id) => {
    if (allowMultiple) {
      setOpenItems(prev =>
        prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
      );
    } else {
      setOpenItems(prev => prev.includes(id) ? [] : [id]);
    }
  };

  return (
    <AccordionContext.Provider value={{ openItems, toggleItem }}>
      <div className="accordion">{children}</div>
    </AccordionContext.Provider>
  );
}

function AccordionItem({ id, children }) {
  return <div className="accordion-item">{children}</div>;
}

function AccordionHeader({ id, children }) {
  const { openItems, toggleItem } = useContext(AccordionContext);
  const isOpen = openItems.includes(id);

  return (
    <button
      className="accordion-header"
      onClick={() => toggleItem(id)}
    >
      {children}
      <span>{isOpen ? '−' : '+'}</span>
    </button>
  );
}

function AccordionPanel({ id, children }) {
  const { openItems } = useContext(AccordionContext);
  const isOpen = openItems.includes(id);

  return isOpen ? <div className="accordion-panel">{children}</div> : null;
}

Accordion.Item = AccordionItem;
Accordion.Header = AccordionHeader;
Accordion.Panel = AccordionPanel;

// Usage
function FAQ() {
  return (
    <Accordion allowMultiple>
      <Accordion.Item id="1">
        <Accordion.Header id="1">What is React?</Accordion.Header>
        <Accordion.Panel id="1">
          React is a JavaScript library for building user interfaces.
        </Accordion.Panel>
      </Accordion.Item>

      <Accordion.Item id="2">
        <Accordion.Header id="2">What are hooks?</Accordion.Header>
        <Accordion.Panel id="2">
          Hooks are functions that let you use state and lifecycle features.
        </Accordion.Panel>
      </Accordion.Item>
    </Accordion>
  );
}
```

**Benefits:**
- Flexible API
- Clear component relationships
- Shared implicit state
- Highly composable
- Great developer experience

---

## Context API Pattern

### Question
**How do you use the Context API for state management?**

### Answer
Context API allows you to share data across the component tree without passing props through every level (prop drilling).

### Better Explanation

**Problem - Prop Drilling:**
```javascript
// Have to pass user through every component
function App() {
  const [user, setUser] = useState(null);
  return <Layout user={user} />;
}

function Layout({ user }) {
  return <Header user={user} />;
}

function Header({ user }) {
  return <UserMenu user={user} />;
}

function UserMenu({ user }) {
  return <div>{user?.name}</div>;
}
```

**Solution - Context API:**
```javascript
// 1. Create Context
const UserContext = React.createContext();

// 2. Create Provider Component
function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCurrentUser().then(data => {
      setUser(data);
      setLoading(false);
    });
  }, []);

  const login = async (credentials) => {
    const userData = await loginAPI(credentials);
    setUser(userData);
  };

  const logout = () => {
    logoutAPI();
    setUser(null);
  };

  const value = {
    user,
    loading,
    login,
    logout,
    isAuthenticated: !!user
  };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
}

// 3. Create Custom Hook for easy access
function useUser() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within UserProvider');
  }
  return context;
}

// 4. Wrap app with Provider
function App() {
  return (
    <UserProvider>
      <Layout />
    </UserProvider>
  );
}

// 5. Use anywhere in the tree
function UserMenu() {
  const { user, logout, isAuthenticated } = useUser();

  if (!isAuthenticated) {
    return <LoginButton />;
  }

  return (
    <div>
      <span>{user.name}</span>
      <button onClick={logout}>Logout</button>
    </div>
  );
}
```

**Real-World Pattern - Multiple Contexts:**
```javascript
// Theme Context
const ThemeContext = React.createContext();

function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light');

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

function useTheme() {
  return useContext(ThemeContext);
}

// Combine multiple providers
function App() {
  return (
    <UserProvider>
      <ThemeProvider>
        <Layout />
      </ThemeProvider>
    </UserProvider>
  );
}

// Or create a composite provider
function AppProviders({ children }) {
  return (
    <UserProvider>
      <ThemeProvider>
        <NotificationProvider>
          {children}
        </NotificationProvider>
      </ThemeProvider>
    </UserProvider>
  );
}
```

---

## Controlled vs Uncontrolled Components

### Question
**What's the difference between Controlled and Uncontrolled components?**

### Answer

**Controlled Components:**
- Form data is handled by React state
- Every state mutation has an associated handler function
- Single source of truth (React state)

**Uncontrolled Components:**
- Form data is handled by the DOM itself
- Use refs to get form values
- DOM is the source of truth

### Better Explanation

**Controlled Component:**
```javascript
function ControlledForm() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData); // Data from state
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="username"
        value={formData.username} // Controlled by React
        onChange={handleChange}
      />
      <input
        name="email"
        value={formData.email}
        onChange={handleChange}
      />
      <textarea
        name="message"
        value={formData.message}
        onChange={handleChange}
      />
      <button type="submit">Submit</button>
    </form>
  );
}
```

**Uncontrolled Component:**
```javascript
function UncontrolledForm() {
  const usernameRef = useRef();
  const emailRef = useRef();
  const messageRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Get values from DOM
    const formData = {
      username: usernameRef.current.value,
      email: emailRef.current.value,
      message: messageRef.current.value
    };
    console.log(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input ref={usernameRef} name="username" />
      <input ref={emailRef} name="email" />
      <textarea ref={messageRef} name="message" />
      <button type="submit">Submit</button>
    </form>
  );
}
```

**When to Use Each:**

**Controlled (Recommended for most cases):**
- Need to validate input in real-time
- Need to disable submit button based on input
- Need to enforce input format
- Need to update other UI based on input
- Need to create dynamic forms

**Uncontrolled:**
- Simple forms where you only need the value on submit
- Integrating with non-React code
- File inputs (always uncontrolled)
- Need to optimize performance for large forms

**Hybrid Approach - File Upload:**
```javascript
function FileUploadForm() {
  const [fileName, setFileName] = useState('');
  const fileInputRef = useRef(); // Uncontrolled (file input must be)

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFileName(file.name); // Track in state for display
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const file = fileInputRef.current.files[0];
    uploadFile(file);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
      />
      {fileName && <p>Selected: {fileName}</p>}
      <button type="submit">Upload</button>
    </form>
  );
}
```

---

## Key Takeaways for Jeneva Interview

### Design Pattern Priority:
1. **Custom Hooks** - Most modern and preferred
2. **Context API** - For state sharing across components
3. **Compound Components** - For flexible, composable UI components
4. **Container/Presentational** - For separating logic from UI
5. **Controlled Components** - For forms and inputs

### What Jeneva Likely Wants to See:
- **Modern patterns**: Focus on hooks and functional components
- **Composition**: How you break down and reuse components
- **State management**: When to use local state vs Context vs external library
- **Performance**: Understanding of when re-renders happen
- **Code organization**: Clean, maintainable component structure

### Practice Exercise:
Build a reusable Modal component system using:
- Compound Components pattern
- Context API for state management
- Custom hooks for modal controls
- Portal for rendering outside root DOM
