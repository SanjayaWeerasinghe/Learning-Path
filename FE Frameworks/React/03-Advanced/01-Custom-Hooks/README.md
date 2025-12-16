# Custom Hooks - Reusable Logic

## What You'll Learn

- Creating custom hooks
- Hook composition
- Extracting component logic
- Common custom hook patterns
- Testing custom hooks

## Concept Overview

Custom hooks let you extract component logic into reusable functions. They start with "use" and can call other hooks.

### Basic Custom Hook

```javascript
import { useState, useEffect } from 'react';

// Custom hook for fetching data
function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(url)
      .then(res => res.json())
      .then(data => {
        setData(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err);
        setLoading(false);
      });
  }, [url]);

  return { data, loading, error };
}

// Usage
function App() {
  const { data, loading, error } = useFetch('https://api.example.com/data');

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return <div>{JSON.stringify(data)}</div>;
}
```

### Common Custom Hook Patterns

```javascript
// useLocalStorage - Persist state to localStorage
function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : initialValue;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
}

// useToggle - Boolean state toggle
function useToggle(initialValue = false) {
  const [value, setValue] = useState(initialValue);
  const toggle = () => setValue(v => !v);
  return [value, toggle];
}

// useDebounce - Debounce a value
function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
}

// useWindowSize - Track window dimensions
function useWindowSize() {
  const [size, setSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () => {
      setSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return size;
}
```

## Your Tasks

### Task 1: useFetch Hook
Create a `useFetch` hook that handles loading, error, and data states for API calls.

### Task 2: useLocalStorage Hook
Build a `useLocalStorage` hook that synchronizes state with localStorage.

### Task 3: useToggle Hook
Create a `useToggle` hook for boolean state management with toggle functionality.

### Task 4: useForm Hook
Build a `useForm` hook that handles form state and validation:
```javascript
const { values, errors, handleChange, handleSubmit } = useForm(initialValues, validate);
```

### Task 5: useDebounce Hook
Create a `useDebounce` hook for search input optimization.

### Task 6: usePrevious Hook
Build a hook that returns the previous value of a state or prop.

### Task 7: useOnClickOutside Hook
Create a hook that detects clicks outside a ref element.

### Task 8: useAsync Hook
Build a comprehensive async operation hook with loading, error, and data states.

## Best Practices

- Start hook names with "use"
- Only call hooks at the top level
- Extract repeated logic into custom hooks
- Keep hooks focused and single-purpose
- Document hook parameters and return values
- Test hooks in isolation

## Next Steps

Move on to `02-Context-API` to learn about global state management!
