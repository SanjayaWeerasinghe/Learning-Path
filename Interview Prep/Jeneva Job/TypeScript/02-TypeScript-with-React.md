# TypeScript with React - Interview Questions & Answers

## Table of Contents
1. [Typing React Components](#typing-react-components)
2. [Typing Props and State](#typing-props-and-state)
3. [Typing React Hooks](#typing-react-hooks)
4. [Event Handlers](#event-handlers)
5. [Children and Component Composition](#children-and-component-composition)
6. [Advanced Patterns](#advanced-patterns)

---

## Typing React Components

### Question
**How do you type React components in TypeScript?**

### Answer

Modern React uses functional components with TypeScript. There are several ways to type them.

### Better Explanation

**Basic Functional Component:**
```typescript
// Simple approach - type the props parameter
interface ButtonProps {
  label: string;
  onClick: () => void;
}

function Button(props: ButtonProps) {
  return <button onClick={props.onClick}>{props.label}</button>;
}

// With destructuring
function Button({ label, onClick }: ButtonProps) {
  return <button onClick={onClick}>{label}</button>;
}
```

**With React.FC (Functional Component):**
```typescript
// React.FC explicitly types a functional component
const Button: React.FC<ButtonProps> = ({ label, onClick }) => {
  return <button onClick={onClick}>{label}</button>;
};

// Note: React.FC is less commonly used now (React 18+)
// Prefer the simple approach above
```

**Why React.FC is Less Popular Now:**
- Implicitly includes `children` prop (confusing)
- Doesn't work well with generics
- Adds unnecessary complexity
- Simple function typing is clearer

**Generic Components:**
```typescript
interface ListProps<T> {
  items: T[];
  renderItem: (item: T) => React.ReactNode;
  keyExtractor: (item: T) => string;
}

function List<T>({ items, renderItem, keyExtractor }: ListProps<T>) {
  return (
    <ul>
      {items.map(item => (
        <li key={keyExtractor(item)}>{renderItem(item)}</li>
      ))}
    </ul>
  );
}

// Usage - types are inferred!
<List
  items={users}
  renderItem={(user) => <div>{user.name}</div>}
  keyExtractor={(user) => user.id.toString()}
/>
```

---

## Typing Props and State

### Question
**How do you type props and state in React with TypeScript?**

### Answer

### Better Explanation

**Required vs Optional Props:**
```typescript
interface CardProps {
  // Required props
  title: string;
  description: string;

  // Optional props
  subtitle?: string;
  footer?: React.ReactNode;

  // Props with default values (still mark as optional in interface)
  variant?: "default" | "outlined" | "elevated";
  disabled?: boolean;
}

function Card({
  title,
  description,
  subtitle,
  footer,
  variant = "default",
  disabled = false
}: CardProps) {
  return (
    <div className={`card card-${variant}`}>
      <h2>{title}</h2>
      {subtitle && <h3>{subtitle}</h3>}
      <p>{description}</p>
      {footer}
    </div>
  );
}
```

**Readonly Props:**
```typescript
interface UserCardProps {
  readonly user: {
    readonly id: number;
    readonly name: string;
  };
}

// Or using Readonly utility type
interface UserCardProps {
  user: Readonly<{
    id: number;
    name: string;
  }>;
}
```

**Typing State with useState:**
```typescript
// Type inference (preferred when possible)
const [count, setCount] = useState(0); // number
const [name, setName] = useState(""); // string
const [isOpen, setIsOpen] = useState(false); // boolean

// Explicit typing (when needed)
const [user, setUser] = useState<User | null>(null);
const [items, setItems] = useState<Item[]>([]);

// With initial value
interface FormState {
  email: string;
  password: string;
  rememberMe: boolean;
}

const [formState, setFormState] = useState<FormState>({
  email: "",
  password: "",
  rememberMe: false
});

// Update specific field
const updateField = (field: keyof FormState, value: any) => {
  setFormState(prev => ({ ...prev, [field]: value }));
};
```

**Complex State Types:**
```typescript
interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

type Filter = "all" | "active" | "completed";

interface TodoState {
  todos: Todo[];
  filter: Filter;
  isLoading: boolean;
  error: string | null;
}

function TodoApp() {
  const [state, setState] = useState<TodoState>({
    todos: [],
    filter: "all",
    isLoading: false,
    error: null
  });

  // Type-safe updates
  const addTodo = (text: string) => {
    const newTodo: Todo = {
      id: Date.now(),
      text,
      completed: false
    };

    setState(prev => ({
      ...prev,
      todos: [...prev.todos, newTodo]
    }));
  };

  const setFilter = (filter: Filter) => {
    setState(prev => ({ ...prev, filter }));
  };

  return (
    <div>
      {/* Component JSX */}
    </div>
  );
}
```

**Discriminated Unions for State:**
```typescript
// Better pattern for loading/error/success states
type DataState<T> =
  | { status: "loading" }
  | { status: "error"; error: string }
  | { status: "success"; data: T };

function UserProfile({ userId }: { userId: number }) {
  const [state, setState] = useState<DataState<User>>({ status: "loading" });

  useEffect(() => {
    fetchUser(userId)
      .then(data => setState({ status: "success", data }))
      .catch(err => setState({ status: "error", error: err.message }));
  }, [userId]);

  // Type-safe rendering based on status
  switch (state.status) {
    case "loading":
      return <Spinner />;
    case "error":
      return <ErrorMessage message={state.error} />;
    case "success":
      return <UserDetails user={state.data} />;
  }
}
```

---

## Typing React Hooks

### Question
**How do you type React Hooks in TypeScript?**

### Answer

### Better Explanation

**useState (covered above, recap):**
```typescript
const [count, setCount] = useState(0);
const [user, setUser] = useState<User | null>(null);
const [items, setItems] = useState<Item[]>([]);
```

**useEffect:**
```typescript
// No special typing needed - React knows the signature
useEffect(() => {
  // Effect code

  return () => {
    // Cleanup
  };
}, [dependencies]);

// If you need to type the cleanup function explicitly
useEffect(() => {
  const cleanup = (): void => {
    // Cleanup code
  };

  return cleanup;
}, []);
```

**useRef:**
```typescript
// DOM elements
const inputRef = useRef<HTMLInputElement>(null);
const divRef = useRef<HTMLDivElement>(null);

// Accessing the ref
inputRef.current?.focus();

// Mutable values
const countRef = useRef<number>(0);
countRef.current += 1;

// Can be null initially
const timerRef = useRef<NodeJS.Timeout | null>(null);

timerRef.current = setTimeout(() => {
  // ...
}, 1000);
```

**useContext:**
```typescript
interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

// Create context with type
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Provider
function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const login = async (email: string, password: string) => {
    const user = await loginAPI(email, password);
    setUser(user);
  };

  const logout = () => {
    setUser(null);
  };

  const value: AuthContextType = {
    user,
    login,
    logout,
    isAuthenticated: !!user
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// Custom hook for consuming context
function useAuth(): AuthContextType {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error("useAuth must be used within AuthProvider");
  }

  return context;
}

// Usage
function LoginButton() {
  const { login, isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return null;
  }

  return <button onClick={() => login("email", "pass")}>Login</button>;
}
```

**useReducer:**
```typescript
// State type
interface CounterState {
  count: number;
  lastAction: string;
}

// Action types
type CounterAction =
  | { type: "INCREMENT" }
  | { type: "DECREMENT" }
  | { type: "RESET" }
  | { type: "SET"; payload: number };

// Reducer function
function counterReducer(state: CounterState, action: CounterAction): CounterState {
  switch (action.type) {
    case "INCREMENT":
      return { count: state.count + 1, lastAction: "increment" };
    case "DECREMENT":
      return { count: state.count - 1, lastAction: "decrement" };
    case "RESET":
      return { count: 0, lastAction: "reset" };
    case "SET":
      return { count: action.payload, lastAction: "set" };
    default:
      return state;
  }
}

function Counter() {
  const [state, dispatch] = useReducer(counterReducer, {
    count: 0,
    lastAction: "none"
  });

  return (
    <div>
      <p>Count: {state.count}</p>
      <button onClick={() => dispatch({ type: "INCREMENT" })}>+</button>
      <button onClick={() => dispatch({ type: "DECREMENT" })}>-</button>
      <button onClick={() => dispatch({ type: "RESET" })}>Reset</button>
      <button onClick={() => dispatch({ type: "SET", payload: 10 })}>
        Set to 10
      </button>
    </div>
  );
}
```

**useMemo and useCallback:**
```typescript
// useMemo - type is inferred from return value
const expensiveValue = useMemo<number>(() => {
  return computeExpensiveValue(a, b);
}, [a, b]);

// useCallback - type is inferred from function
const handleClick = useCallback((id: number) => {
  console.log(`Clicked item ${id}`);
}, []);

// Explicit typing
const handleSubmit = useCallback<(data: FormData) => void>(
  (data) => {
    submitForm(data);
  },
  []
);
```

**Custom Hooks:**
```typescript
// Return tuple
function useToggle(initialValue: boolean = false): [boolean, () => void] {
  const [value, setValue] = useState(initialValue);

  const toggle = useCallback(() => {
    setValue(v => !v);
  }, []);

  return [value, toggle];
}

// Return object
interface UseFetchResult<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

function useFetch<T>(url: string): UseFetchResult<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(url);
      const json = await response.json();
      setData(json);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  }, [url]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error, refetch: fetchData };
}

// Usage
function UserProfile({ userId }: { userId: number }) {
  const { data: user, loading, error } = useFetch<User>(`/api/users/${userId}`);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!user) return <div>No user found</div>;

  return <div>{user.name}</div>;
}
```

---

## Event Handlers

### Question
**How do you type event handlers in React with TypeScript?**

### Answer

### Better Explanation

**Common Event Types:**
```typescript
import React from "react";

function EventExamples() {
  // Click events
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    console.log(event.currentTarget.value);
  };

  // Change events
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.value);
  };

  // Form submit
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Handle form data
  };

  // Keyboard events
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      console.log("Enter pressed");
    }
  };

  // Focus events
  const handleFocus = (event: React.FocusEvent<HTMLInputElement>) => {
    console.log("Input focused");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        onFocus={handleFocus}
      />
      <button onClick={handleClick}>Submit</button>
    </form>
  );
}
```

**Generic Event Handler Type:**
```typescript
type EventHandler<T = Element> = (event: React.SyntheticEvent<T>) => void;

type ClickHandler = EventHandler<HTMLButtonElement>;
type ChangeHandler = EventHandler<HTMLInputElement>;
```

**Custom Event Handler Props:**
```typescript
interface SearchInputProps {
  value: string;
  onChange: (value: string) => void; // Simplified - just pass the value
  onSearch: (query: string) => void;
  placeholder?: string;
}

function SearchInput({ value, onChange, onSearch, placeholder }: SearchInputProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value); // Extract value for consumer
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onSearch(value);
    }
  };

  return (
    <input
      type="text"
      value={value}
      onChange={handleChange}
      onKeyDown={handleKeyDown}
      placeholder={placeholder}
    />
  );
}
```

**Event Handler with Inline Arrow Functions:**
```typescript
interface TodoItemProps {
  todo: Todo;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
}

function TodoItem({ todo, onToggle, onDelete }: TodoItemProps) {
  return (
    <div>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggle(todo.id)} // Inline arrow function
      />
      <span>{todo.text}</span>
      <button onClick={() => onDelete(todo.id)}>Delete</button>
    </div>
  );
}
```

---

## Children and Component Composition

### Question
**How do you type children and create composable components in TypeScript?**

### Answer

### Better Explanation

**Basic Children Typing:**
```typescript
interface CardProps {
  children: React.ReactNode; // Most flexible - accepts anything
  title: string;
}

function Card({ children, title }: CardProps) {
  return (
    <div className="card">
      <h2>{title}</h2>
      <div className="card-content">{children}</div>
    </div>
  );
}

// Usage
<Card title="My Card">
  <p>This is the content</p>
  <button>Click me</button>
</Card>
```

**Different Children Types:**
```typescript
// Single React element
interface LayoutProps {
  children: React.ReactElement;
}

// Multiple React elements
interface TabsProps {
  children: React.ReactElement[];
}

// Specific component type
interface TabsProps {
  children: React.ReactElement<TabPanelProps>[];
}

// Function as child (render prop)
interface ToggleProps {
  children: (isOn: boolean, toggle: () => void) => React.ReactNode;
}

function Toggle({ children }: ToggleProps) {
  const [isOn, setIsOn] = useState(false);
  const toggle = () => setIsOn(!isOn);

  return <>{children(isOn, toggle)}</>;
}

// Usage
<Toggle>
  {(isOn, toggle) => (
    <button onClick={toggle}>{isOn ? "ON" : "OFF"}</button>
  )}
</Toggle>
```

**Compound Components Pattern:**
```typescript
// Context for sharing state
interface TabsContextType {
  activeTab: string;
  setActiveTab: (id: string) => void;
}

const TabsContext = createContext<TabsContextType | undefined>(undefined);

// Main component
interface TabsProps {
  children: React.ReactNode;
  defaultTab: string;
}

function Tabs({ children, defaultTab }: TabsProps) {
  const [activeTab, setActiveTab] = useState(defaultTab);

  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab }}>
      <div className="tabs">{children}</div>
    </TabsContext.Provider>
  );
}

// Tab List component
interface TabListProps {
  children: React.ReactNode;
}

function TabList({ children }: TabListProps) {
  return <div className="tab-list">{children}</div>;
}

// Tab component
interface TabProps {
  id: string;
  children: React.ReactNode;
}

function Tab({ id, children }: TabProps) {
  const context = useContext(TabsContext);

  if (!context) {
    throw new Error("Tab must be used within Tabs");
  }

  const { activeTab, setActiveTab } = context;

  return (
    <button
      className={activeTab === id ? "active" : ""}
      onClick={() => setActiveTab(id)}
    >
      {children}
    </button>
  );
}

// Tab Panel component
interface TabPanelProps {
  id: string;
  children: React.ReactNode;
}

function TabPanel({ id, children }: TabPanelProps) {
  const context = useContext(TabsContext);

  if (!context) {
    throw new Error("TabPanel must be used within Tabs");
  }

  const { activeTab } = context;

  return activeTab === id ? <div className="tab-panel">{children}</div> : null;
}

// Attach to parent for better DX
Tabs.List = TabList;
Tabs.Tab = Tab;
Tabs.Panel = TabPanel;

// Usage - Type-safe compound components
<Tabs defaultTab="home">
  <Tabs.List>
    <Tabs.Tab id="home">Home</Tabs.Tab>
    <Tabs.Tab id="profile">Profile</Tabs.Tab>
  </Tabs.List>

  <Tabs.Panel id="home">
    <h2>Home Content</h2>
  </Tabs.Panel>
  <Tabs.Panel id="profile">
    <h2>Profile Content</h2>
  </Tabs.Panel>
</Tabs>
```

---

## Advanced Patterns

### Question
**What are some advanced TypeScript patterns for React?**

### Answer

**1. Forwarding Refs:**
```typescript
interface InputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, value, onChange }, ref) => {
    return (
      <div>
        <label>{label}</label>
        <input
          ref={ref}
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      </div>
    );
  }
);

// Usage
function Form() {
  const inputRef = useRef<HTMLInputElement>(null);

  const focusInput = () => {
    inputRef.current?.focus();
  };

  return (
    <div>
      <Input ref={inputRef} label="Name" value="" onChange={() => {}} />
      <button onClick={focusInput}>Focus Input</button>
    </div>
  );
}
```

**2. Polymorphic Components (as prop):**
```typescript
type ButtonProps<T extends React.ElementType> = {
  as?: T;
  children: React.ReactNode;
} & React.ComponentPropsWithoutRef<T>;

function Button<T extends React.ElementType = "button">({
  as,
  children,
  ...props
}: ButtonProps<T>) {
  const Component = as || "button";
  return <Component {...props}>{children}</Component>;
}

// Usage
<Button>Regular button</Button>
<Button as="a" href="/home">Link button</Button>
<Button as={Link} to="/profile">Router Link button</Button>
```

**3. Discriminated Union Props:**
```typescript
// Button can be either a regular button or a link
type ButtonPropsBase = {
  children: React.ReactNode;
  variant?: "primary" | "secondary";
};

type RegularButtonProps = ButtonPropsBase & {
  type: "button";
  onClick: () => void;
};

type LinkButtonProps = ButtonPropsBase & {
  type: "link";
  href: string;
};

type ButtonProps = RegularButtonProps | LinkButtonProps;

function Button(props: ButtonProps) {
  if (props.type === "link") {
    return (
      <a href={props.href} className={`btn btn-${props.variant || "primary"}`}>
        {props.children}
      </a>
    );
  }

  return (
    <button
      onClick={props.onClick}
      className={`btn btn-${props.variant || "primary"}`}
    >
      {props.children}
    </button>
  );
}

// Usage - TypeScript enforces correct props
<Button type="button" onClick={() => {}}>Click</Button>
<Button type="link" href="/home">Go Home</Button>
// <Button type="link" onClick={() => {}}>Invalid</Button> // ❌ Error
```

**4. Extending HTML Elements:**
```typescript
// Extend native button with custom props
interface CustomButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant: "primary" | "secondary" | "danger";
  isLoading?: boolean;
}

function CustomButton({ variant, isLoading, children, ...props }: CustomButtonProps) {
  return (
    <button
      {...props}
      className={`btn btn-${variant} ${props.className || ""}`}
      disabled={isLoading || props.disabled}
    >
      {isLoading ? "Loading..." : children}
    </button>
  );
}

// Usage - All native button props work + custom props
<CustomButton
  variant="primary"
  isLoading={false}
  onClick={() => {}}
  disabled={false}
  aria-label="Submit"
>
  Submit
</CustomButton>
```

**5. Utility Types for Props:**
```typescript
// Extract props from a component
type ButtonProps = React.ComponentProps<typeof Button>;

// Extract props from JSX element
type DivProps = React.ComponentProps<"div">;
type AnchorProps = React.ComponentProps<"a">;

// Make all props optional
type PartialButtonProps = Partial<ButtonProps>;

// Pick specific props
type LimitedButtonProps = Pick<ButtonProps, "onClick" | "children">;

// Omit specific props
type ButtonWithoutVariant = Omit<ButtonProps, "variant">;
```

---

## Key Takeaways for Jeneva Interview

### TypeScript + React Best Practices:
1. **Use type inference** when possible (useState, event handlers)
2. **Explicit typing** for props and complex state
3. **Discriminated unions** for state machines
4. **Generic components** for reusability
5. **Proper event typing** for type safety
6. **Composition patterns** with typed children

### Common Interview Questions to Prepare:
- How do you handle form state in TypeScript?
- How do you type a generic, reusable component?
- How do you handle async data fetching with types?
- How do you create compound components with types?
- How do you extend native HTML elements?

### Demonstrate These Skills:
- Strong understanding of React + TypeScript together
- Ability to create type-safe, reusable components
- Knowledge of when to use interfaces vs types
- Understanding of advanced patterns (generics, discriminated unions)
- Practical experience with real-world scenarios
