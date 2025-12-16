# Context API - Global State Management

## What You'll Learn

- Creating contexts
- Context providers
- Consuming context with useContext
- Avoiding prop drilling
- Context best practices

## Concept Overview

Context provides a way to pass data through the component tree without manually passing props at every level.

### Basic Context Usage

```javascript
import React, { createContext, useContext, useState } from 'react';

// Create context
const ThemeContext = createContext();

// Provider component
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

// Custom hook for consuming context
function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
}

// Usage in component
function ThemedButton() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      style={{
        background: theme === 'light' ? '#fff' : '#333',
        color: theme === 'light' ? '#333' : '#fff',
      }}
    >
      Toggle Theme ({theme})
    </button>
  );
}

// App setup
function App() {
  return (
    <ThemeProvider>
      <ThemedButton />
    </ThemeProvider>
  );
}
```

### Authentication Context Example

```javascript
const AuthContext = createContext();

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for saved session
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    const user = await api.login(email, password);
    setUser(user);
    localStorage.setItem('user', JSON.stringify(user));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  return useContext(AuthContext);
}
```

## Your Tasks

### Task 1: Theme Context
Create a theme context that provides light/dark mode switching across the app.

### Task 2: Auth Context
Build an authentication context with login, logout, and user state.

### Task 3: Shopping Cart Context
Create a shopping cart context with add, remove, and update quantity functionality.

### Task 4: Language Context
Build an internationalization context for multi-language support.

### Task 5: Multiple Contexts
Combine multiple contexts in one app (Theme + Auth + Cart).

### Task 6: Context with Reducer
Use useReducer with Context for complex state logic.

### Task 7: Persistent Context
Create a context that persists to localStorage.

### Task 8: Settings Context
Build a settings context for user preferences (theme, notifications, language, etc.).

## Best Practices

- Don't overuse Context - not for every shared state
- Split contexts by domain (Auth, Theme, etc.)
- Create custom hooks for consuming context
- Memoize context values to prevent unnecessary re-renders
- Use Context for truly global state

## Performance Tips

```javascript
// Memoize context value
const value = useMemo(
  () => ({ user, login, logout }),
  [user]
);

return (
  <AuthContext.Provider value={value}>
    {children}
  </AuthContext.Provider>
);
```

## Next Steps

Move to `03-useReducer` to learn advanced state management patterns!
