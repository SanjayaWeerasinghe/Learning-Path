# useEffect Hook

## Introduction

The useEffect hook lets you perform side effects in functional components. Side effects include data fetching, subscriptions, manually changing the DOM, timers, and more. useEffect runs after render and can be configured to run on specific conditions. Understanding useEffect is crucial for managing component lifecycle and external interactions in React.

## Key Concepts

### 1. useEffect Fundamentals
- **Side Effects**: Operations that affect things outside the component
- **Timing**: Runs after render, not during
- **Dependencies**: Control when effect runs
- **Cleanup**: Remove subscriptions and clean up resources

### 2. Effect Patterns
- **No Dependencies**: Runs after every render
- **Empty Dependencies**: Runs once on mount
- **With Dependencies**: Runs when dependencies change
- **Cleanup Function**: Runs before effect re-runs and on unmount

### 3. Common Use Cases
- **Data Fetching**: Load data from APIs
- **Subscriptions**: Event listeners, WebSocket connections
- **DOM Manipulation**: Direct DOM updates
- **Timers**: setTimeout, setInterval
- **Local Storage**: Sync with localStorage
- **Document Title**: Update page title

## Basic useEffect Usage

### Running on Every Render

```jsx
import { useState, useEffect } from 'react';

function EveryRender() {
  const [count, setCount] = useState(0);

  // Runs after every render
  useEffect(() => {
    console.log('Component rendered');
    document.title = `Count: ${count}`;
  });

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}
```

### Running Once on Mount

```jsx
function OnMount() {
  const [data, setData] = useState(null);

  // Runs only once after initial render
  useEffect(() => {
    console.log('Component mounted');
    fetch('https://api.example.com/data')
      .then(res => res.json())
      .then(data => setData(data));
  }, []); // Empty dependency array

  return <div>{data ? JSON.stringify(data) : 'Loading...'}</div>;
}
```

### Running on Specific Changes

```jsx
function WatchDependencies() {
  const [count, setCount] = useState(0);
  const [name, setName] = useState('');

  // Runs when count changes
  useEffect(() => {
    console.log('Count changed:', count);
  }, [count]);

  // Runs when name changes
  useEffect(() => {
    console.log('Name changed:', name);
  }, [name]);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter name"
      />
    </div>
  );
}
```

## Cleanup Function

### Event Listeners

```jsx
function EventListenerExample() {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    // Add event listener
    window.addEventListener('resize', handleResize);

    // Cleanup function
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []); // Run once on mount

  return <p>Window width: {windowWidth}px</p>;
}
```

### Timers

```jsx
function Timer() {
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(true);

  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      setSeconds(s => s + 1);
    }, 1000);

    // Cleanup: Clear interval when component unmounts or isRunning changes
    return () => {
      clearInterval(interval);
    };
  }, [isRunning]);

  return (
    <div>
      <p>Seconds: {seconds}</p>
      <button onClick={() => setIsRunning(!isRunning)}>
        {isRunning ? 'Pause' : 'Resume'}
      </button>
    </div>
  );
}
```

### Subscriptions

```jsx
function ChatRoom({ roomId }) {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    // Subscribe to chat room
    const subscription = subscribeToChatRoom(roomId, (message) => {
      setMessages(msgs => [...msgs, message]);
    });

    // Cleanup: Unsubscribe when roomId changes or component unmounts
    return () => {
      subscription.unsubscribe();
    };
  }, [roomId]);

  return (
    <div>
      <h2>Room: {roomId}</h2>
      {messages.map((msg, i) => (
        <p key={i}>{msg}</p>
      ))}
    </div>
  );
}
```

## Data Fetching

### Basic Fetch

```jsx
function UserProfile({ userId }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetch(`https://api.example.com/users/${userId}`)
      .then(response => {
        if (!response.ok) throw new Error('Failed to fetch');
        return response.json();
      })
      .then(data => {
        setUser(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, [userId]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!user) return <div>No user found</div>;

  return (
    <div>
      <h2>{user.name}</h2>
      <p>{user.email}</p>
    </div>
  );
}
```

### Async/Await with Cleanup

```jsx
function DataFetcher({ url }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(url);
        const result = await response.json();

        // Only update state if not cancelled
        if (!cancelled) {
          setData(result);
          setLoading(false);
        }
      } catch (error) {
        if (!cancelled) {
          console.error('Fetch error:', error);
          setLoading(false);
        }
      }
    };

    fetchData();

    // Cleanup: Cancel pending updates
    return () => {
      cancelled = true;
    };
  }, [url]);

  if (loading) return <div>Loading...</div>;
  return <div>{JSON.stringify(data)}</div>;
}
```

### AbortController for Fetch

```jsx
function AbortableFetch({ url }) {
  const [data, setData] = useState(null);

  useEffect(() => {
    const abortController = new AbortController();

    fetch(url, { signal: abortController.signal })
      .then(res => res.json())
      .then(setData)
      .catch(error => {
        if (error.name === 'AbortError') {
          console.log('Fetch aborted');
        } else {
          console.error('Fetch error:', error);
        }
      });

    // Cleanup: Abort fetch
    return () => {
      abortController.abort();
    };
  }, [url]);

  return <div>{data ? JSON.stringify(data) : 'Loading...'}</div>;
}
```

## localStorage and Persistence

### Sync with localStorage

```jsx
function PersistentCounter() {
  const [count, setCount] = useState(() => {
    const saved = localStorage.getItem('count');
    return saved ? parseInt(saved, 10) : 0;
  });

  useEffect(() => {
    localStorage.setItem('count', count.toString());
  }, [count]);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      <button onClick={() => setCount(0)}>Reset</button>
    </div>
  );
}
```

### Complex State Persistence

```jsx
function TodosWithStorage() {
  const [todos, setTodos] = useState(() => {
    const saved = localStorage.getItem('todos');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = (text) => {
    setTodos([...todos, { id: Date.now(), text }]);
  };

  return (
    <div>
      {todos.map(todo => (
        <div key={todo.id}>{todo.text}</div>
      ))}
    </div>
  );
}
```

## Document and Window APIs

### Update Document Title

```jsx
function PageTitle({ title }) {
  useEffect(() => {
    const previousTitle = document.title;
    document.title = title;

    // Restore previous title on unmount
    return () => {
      document.title = previousTitle;
    };
  }, [title]);

  return <h1>{title}</h1>;
}
```

### Body Class Toggle

```jsx
function ThemeToggle() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }

    // Cleanup
    return () => {
      document.body.classList.remove('dark-mode');
    };
  }, [darkMode]);

  return (
    <button onClick={() => setDarkMode(!darkMode)}>
      Toggle {darkMode ? 'Light' : 'Dark'} Mode
    </button>
  );
}
```

## Practical Tasks

### Task 1: Build a Clock Component

```jsx
import { useState, useEffect } from 'react';

function Clock() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="clock">
      <h2>Current Time</h2>
      <p>{time.toLocaleTimeString()}</p>
      <p>{time.toLocaleDateString()}</p>
    </div>
  );
}
```

### Task 2: Create a Live Search Component

```jsx
import { useState, useEffect } from 'react';

function LiveSearch() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    const timeoutId = setTimeout(() => {
      setLoading(true);
      fetch(`https://api.example.com/search?q=${query}`)
        .then(res => res.json())
        .then(data => {
          setResults(data);
          setLoading(false);
        })
        .catch(() => setLoading(false));
    }, 500); // Debounce search

    return () => clearTimeout(timeoutId);
  }, [query]);

  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search..."
      />

      {loading && <p>Searching...</p>}

      <ul>
        {results.map(result => (
          <li key={result.id}>{result.name}</li>
        ))}
      </ul>
    </div>
  );
}
```

### Task 3: Build a Mouse Tracker

```jsx
import { useState, useEffect } from 'react';

function MouseTracker() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isTracking, setIsTracking] = useState(true);

  useEffect(() => {
    if (!isTracking) return;

    const handleMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [isTracking]);

  return (
    <div>
      <h2>Mouse Position</h2>
      <p>X: {position.x}, Y: {position.y}</p>
      <button onClick={() => setIsTracking(!isTracking)}>
        {isTracking ? 'Stop' : 'Start'} Tracking
      </button>
    </div>
  );
}
```

### Task 4: Create an Auto-Save Form

```jsx
import { useState, useEffect } from 'react';

function AutoSaveForm() {
  const [formData, setFormData] = useState(() => {
    const saved = localStorage.getItem('formData');
    return saved ? JSON.parse(saved) : { name: '', email: '', message: '' };
  });
  const [lastSaved, setLastSaved] = useState(null);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      localStorage.setItem('formData', JSON.stringify(formData));
      setLastSaved(new Date());
    }, 1000); // Auto-save after 1 second of inactivity

    return () => clearTimeout(timeoutId);
  }, [formData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <form>
      <h2>Auto-Save Form</h2>
      {lastSaved && <p>Last saved: {lastSaved.toLocaleTimeString()}</p>}

      <input
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Name"
      />

      <input
        name="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="Email"
      />

      <textarea
        name="message"
        value={formData.message}
        onChange={handleChange}
        placeholder="Message"
        rows="4"
      />
    </form>
  );
}
```

### Task 5: Build a Window Size Detector

```jsx
import { useState, useEffect } from 'react';

function WindowSize() {
  const [size, setSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  });
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;

      setSize({ width, height });
      setIsMobile(width < 768);
    };

    // Throttle resize events
    let timeoutId;
    const throttledResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(handleResize, 100);
    };

    window.addEventListener('resize', throttledResize);

    return () => {
      window.removeEventListener('resize', throttledResize);
      clearTimeout(timeoutId);
    };
  }, []);

  return (
    <div>
      <h2>Window Size</h2>
      <p>Width: {size.width}px</p>
      <p>Height: {size.height}px</p>
      <p>Device: {isMobile ? 'Mobile' : 'Desktop'}</p>
    </div>
  );
}
```

### Task 6: Create an Online Status Indicator

```jsx
import { useState, useEffect } from 'react';

function OnlineStatus() {
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return (
    <div className={`status ${isOnline ? 'online' : 'offline'}`}>
      <span className="indicator"></span>
      {isOnline ? 'Online' : 'Offline'}
    </div>
  );
}
```

## Best Practices

1. **Always Cleanup**: Remove event listeners, clear timers, cancel requests
2. **Correct Dependencies**: Include all values used inside effect
3. **Avoid Omitting Dependencies**: Don't ignore ESLint warnings
4. **Separate Effects**: Create separate effects for different concerns
5. **Handle Race Conditions**: Use cleanup to prevent stale data updates
6. **Optimize with Dependencies**: Only run effect when necessary
7. **Use AbortController**: Cancel pending fetch requests
8. **Extract to Custom Hooks**: Reuse effect logic across components

## Common Pitfalls

1. **Missing Dependencies**: Not including all dependencies in array
2. **Missing Cleanup**: Forgetting to remove listeners or clear timers
3. **Infinite Loops**: Dependencies that change on every render
4. **Race Conditions**: Not handling cleanup for async operations
5. **Direct State Updates**: Updating state synchronously in effect
6. **Empty Dependency Array Mistakes**: Using stale values from initial render
7. **Object/Array Dependencies**: Creating new objects in dependency array
8. **Using Effects for Derived State**: Computing values that could be derived

## Interview Questions

### Question 1: What is useEffect and when do you use it?
**Answer**: useEffect is a hook for performing side effects in functional components. Use it for: (1) Data fetching, (2) Setting up subscriptions, (3) Manually changing the DOM, (4) Timers, (5) Logging. Side effects are operations that affect things outside the component's render function. useEffect runs after render, ensuring the DOM is updated before side effects execute. It's the functional component equivalent of componentDidMount, componentDidUpdate, and componentWillUnmount combined.

### Question 2: How do dependency arrays work in useEffect?
**Answer**: The dependency array controls when the effect runs: (1) No array: runs after every render, (2) Empty array []: runs once on mount, (3) With values [a, b]: runs when a or b changes. React compares dependencies using Object.is(). Include all values from component scope (props, state, functions) used inside effect. Missing dependencies cause stale closure bugs. React DevTools and ESLint help identify missing dependencies.

### Question 3: What is the cleanup function and when is it called?
**Answer**: The cleanup function is returned from useEffect: `return () => { /* cleanup */ }`. It's called: (1) Before re-running the effect (when dependencies change), (2) When component unmounts. Use cleanup to: remove event listeners, clear timers, cancel network requests, unsubscribe from subscriptions. Without cleanup, you get memory leaks and unexpected behavior. Example: `return () => clearInterval(intervalId)`.

### Question 4: How do you fetch data with useEffect?
**Answer**: Pattern: (1) Set loading state, (2) Fetch in useEffect, (3) Update state with result, (4) Handle errors, (5) Cleanup to prevent updates after unmount. Use AbortController or cancellation flag. Example: `useEffect(() => { let cancelled = false; fetch(url).then(data => { if (!cancelled) setState(data) }); return () => cancelled = true; }, [url])`. Include URL or any dynamic values in dependencies.

### Question 5: Why might useEffect run twice in development?
**Answer**: React 18+ Strict Mode intentionally runs effects twice in development to help find bugs related to missing cleanup. It simulates mounting, unmounting, and remounting to ensure effects are properly cleaned up. This only happens in development, not production. If it causes issues, your cleanup is likely missing or incorrect. Fix the cleanup rather than removing Strict Mode.

### Question 6: What's the difference between useEffect and useLayoutEffect?
**Answer**: useEffect runs asynchronously after paint (non-blocking), while useLayoutEffect runs synchronously before paint (blocking). Use useLayoutEffect only when you need to: (1) Measure DOM elements, (2) Make DOM mutations that need to be visible before paint, (3) Prevent visual flicker. Most effects should use useEffect for better performance. useLayoutEffect can block visual updates and hurt performance.

### Question 7: How do you handle race conditions in useEffect?
**Answer**: Race conditions occur when a newer request completes before an older one. Solutions: (1) Cleanup flag: `let cancelled = false; return () => cancelled = true`, (2) AbortController for fetch requests, (3) Ignore results from stale requests by comparing request ID/timestamp. Always cleanup async operations in useEffect. Check the cleanup flag before updating state to avoid setting state from stale requests.

### Question 8: When should you split effects into multiple useEffect calls?
**Answer**: Split effects when they: (1) Handle different concerns (data fetching vs event listeners), (2) Have different dependencies, (3) Have different cleanup needs. Each effect should have a single responsibility. Don't combine unrelated logic just to reduce useEffect calls. Separate effects are more readable, maintainable, and properly express their dependencies. React optimizes multiple effects efficiently.

## Resources

- [useEffect Hook](https://react.dev/reference/react/useEffect)
- [Synchronizing with Effects](https://react.dev/learn/synchronizing-with-effects)
- [You Might Not Need an Effect](https://react.dev/learn/you-might-not-need-an-effect)
- [Lifecycle of Reactive Effects](https://react.dev/learn/lifecycle-of-reactive-effects)
- [Separating Events from Effects](https://react.dev/learn/separating-events-from-effects)
