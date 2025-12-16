# Conditional Rendering

## Introduction

Conditional rendering in React allows you to display different UI elements based on certain conditions. It enables you to create dynamic interfaces that respond to state, props, and other variables. React provides multiple ways to conditionally render components and elements, making your applications interactive and responsive to different scenarios.

## Key Concepts

### 1. Rendering Fundamentals
- **Dynamic UI**: Show/hide elements based on conditions
- **JavaScript Expressions**: Use JavaScript logic in JSX
- **Multiple Approaches**: if/else, ternary operators, logical AND, switch statements
- **Component Returns**: Conditionally return different JSX

### 2. Conditional Patterns
- **If/Else Statements**: Traditional JavaScript conditionals
- **Ternary Operator**: Inline conditional expressions
- **Logical AND (&&)**: Short-circuit evaluation
- **Logical OR (||)**: Default values
- **Switch Statements**: Multiple conditions

### 3. Common Use Cases
- **Authentication States**: Show different UI for logged-in/out users
- **Loading States**: Display loading indicators
- **Error Handling**: Show error messages
- **Feature Flags**: Enable/disable features
- **Permissions**: Show content based on user roles

## Basic Conditional Rendering

### Using If/Else

```jsx
function Greeting({ isLoggedIn }) {
  if (isLoggedIn) {
    return <h1>Welcome back!</h1>;
  } else {
    return <h1>Please sign in.</h1>;
  }
}

// Simplified version
function Greeting({ isLoggedIn }) {
  if (isLoggedIn) {
    return <h1>Welcome back!</h1>;
  }
  return <h1>Please sign in.</h1>;
}
```

### Using Variables

```jsx
function LoginControl({ isLoggedIn }) {
  let button;

  if (isLoggedIn) {
    button = <LogoutButton />;
  } else {
    button = <LoginButton />;
  }

  return (
    <div>
      <h1>User Dashboard</h1>
      {button}
    </div>
  );
}
```

### Ternary Operator

```jsx
function UserGreeting({ user }) {
  return (
    <div>
      <h1>
        {user ? `Welcome, ${user.name}!` : 'Please log in'}
      </h1>
    </div>
  );
}

// With components
function Dashboard({ isLoggedIn }) {
  return (
    <div>
      {isLoggedIn ? <UserDashboard /> : <GuestDashboard />}
    </div>
  );
}
```

### Logical AND Operator

```jsx
function Notifications({ messages }) {
  return (
    <div>
      <h1>Inbox</h1>
      {messages.length > 0 && (
        <p>You have {messages.length} unread messages.</p>
      )}
    </div>
  );
}

// With multiple conditions
function AdminPanel({ user }) {
  return (
    <div>
      {user && user.isAdmin && (
        <div className="admin-panel">
          <h2>Admin Controls</h2>
          <button>Manage Users</button>
        </div>
      )}
    </div>
  );
}
```

### Logical OR Operator

```jsx
function UserProfile({ user }) {
  return (
    <div>
      <h1>{user.name || 'Guest User'}</h1>
      <p>{user.bio || 'No bio available'}</p>
      <img src={user.avatar || '/default-avatar.png'} alt="Avatar" />
    </div>
  );
}
```

## Advanced Conditional Rendering

### Null Rendering

```jsx
function WarningBanner({ warn }) {
  if (!warn) {
    return null; // Render nothing
  }

  return (
    <div className="warning">
      Warning: This action cannot be undone!
    </div>
  );
}
```

### Switch Statements

```jsx
function StatusMessage({ status }) {
  const renderMessage = () => {
    switch (status) {
      case 'loading':
        return <p>Loading...</p>;
      case 'error':
        return <p className="error">An error occurred!</p>;
      case 'success':
        return <p className="success">Operation successful!</p>;
      case 'empty':
        return <p>No data available</p>;
      default:
        return <p>Ready</p>;
    }
  };

  return <div className="status">{renderMessage()}</div>;
}
```

### Object Mapping

```jsx
function IconDisplay({ type }) {
  const icons = {
    success: '✓',
    error: '✗',
    warning: '⚠',
    info: 'ℹ'
  };

  return (
    <div className={`icon icon-${type}`}>
      {icons[type] || '?'}
    </div>
  );
}

// With components
function Alert({ type, message }) {
  const alertComponents = {
    success: <SuccessAlert message={message} />,
    error: <ErrorAlert message={message} />,
    warning: <WarningAlert message={message} />,
    info: <InfoAlert message={message} />
  };

  return alertComponents[type] || null;
}
```

### Nested Conditional Rendering

```jsx
function UserCard({ user, isLoading, error }) {
  if (isLoading) {
    return <div>Loading user data...</div>;
  }

  if (error) {
    return <div className="error">Error: {error.message}</div>;
  }

  if (!user) {
    return <div>No user found</div>;
  }

  return (
    <div className="user-card">
      <h2>{user.name}</h2>
      {user.isPremium && <span className="badge">Premium</span>}
      {user.isVerified && <span className="badge">Verified</span>}
      {user.bio && <p>{user.bio}</p>}
    </div>
  );
}
```

### Multiple Conditions

```jsx
function AccessControl({ user, requiredRole, featureEnabled }) {
  const hasAccess = user && user.roles.includes(requiredRole) && featureEnabled;

  if (!user) {
    return <LoginPrompt />;
  }

  if (!featureEnabled) {
    return <FeatureDisabledMessage />;
  }

  if (!hasAccess) {
    return <UnauthorizedMessage />;
  }

  return <ProtectedContent />;
}
```

## Conditional Rendering Patterns

### Loading States

```jsx
import { useState, useEffect } from 'react';

function DataDisplay({ url }) {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(url)
      .then(response => response.json())
      .then(data => {
        setData(data);
        setIsLoading(false);
      })
      .catch(error => {
        setError(error);
        setIsLoading(false);
      });
  }, [url]);

  if (isLoading) {
    return <div className="spinner">Loading...</div>;
  }

  if (error) {
    return <div className="error">Error: {error.message}</div>;
  }

  if (!data || data.length === 0) {
    return <div className="empty">No data available</div>;
  }

  return (
    <div className="data-display">
      {data.map(item => (
        <div key={item.id}>{item.name}</div>
      ))}
    </div>
  );
}
```

### Authentication Flow

```jsx
function App() {
  const [user, setUser] = useState(null);
  const [isAuthenticating, setIsAuthenticating] = useState(true);

  useEffect(() => {
    // Check authentication status
    checkAuth().then(userData => {
      setUser(userData);
      setIsAuthenticating(false);
    });
  }, []);

  if (isAuthenticating) {
    return <SplashScreen />;
  }

  return (
    <div className="app">
      {user ? (
        <>
          <Header user={user} />
          <Dashboard user={user} />
        </>
      ) : (
        <LoginPage onLogin={setUser} />
      )}
    </div>
  );
}
```

### Feature Toggles

```jsx
function Features({ features }) {
  return (
    <div>
      <h1>Available Features</h1>

      {features.newUI && (
        <div className="feature">
          <h2>New UI</h2>
          <NewUIComponent />
        </div>
      )}

      {features.betaFeatures && (
        <div className="feature beta">
          <h2>Beta Features</h2>
          <BetaComponent />
        </div>
      )}

      {features.experimentalMode && (
        <div className="feature experimental">
          <h2>Experimental Mode</h2>
          <ExperimentalComponent />
        </div>
      )}
    </div>
  );
}
```

## Practical Tasks

### Task 1: Build a Login/Logout System

```jsx
import { useState } from 'react';

function AuthSystem() {
  const [user, setUser] = useState(null);
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [error, setError] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();

    // Simple validation
    if (credentials.username === 'admin' && credentials.password === 'password') {
      setUser({ username: credentials.username, role: 'admin' });
      setError('');
      setCredentials({ username: '', password: '' });
    } else {
      setError('Invalid credentials');
    }
  };

  const handleLogout = () => {
    setUser(null);
  };

  // Not logged in - show login form
  if (!user) {
    return (
      <div className="login-form">
        <h2>Login</h2>
        {error && <div className="error">{error}</div>}
        <form onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="Username"
            value={credentials.username}
            onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
          />
          <input
            type="password"
            placeholder="Password"
            value={credentials.password}
            onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
          />
          <button type="submit">Login</button>
        </form>
      </div>
    );
  }

  // Logged in - show dashboard
  return (
    <div className="dashboard">
      <h2>Welcome, {user.username}!</h2>
      {user.role === 'admin' && (
        <div className="admin-panel">
          <h3>Admin Controls</h3>
          <button>Manage Users</button>
          <button>View Reports</button>
        </div>
      )}
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}
```

### Task 2: Create a Multi-Step Wizard

```jsx
import { useState } from 'react';

function Wizard() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    payment: ''
  });

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  const updateField = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="step">
            <h2>Step 1: Personal Info</h2>
            <input
              placeholder="Name"
              value={formData.name}
              onChange={(e) => updateField('name', e.target.value)}
            />
            <input
              placeholder="Email"
              value={formData.email}
              onChange={(e) => updateField('email', e.target.value)}
            />
            <button onClick={nextStep}>Next</button>
          </div>
        );

      case 2:
        return (
          <div className="step">
            <h2>Step 2: Address</h2>
            <input
              placeholder="Address"
              value={formData.address}
              onChange={(e) => updateField('address', e.target.value)}
            />
            <button onClick={prevStep}>Back</button>
            <button onClick={nextStep}>Next</button>
          </div>
        );

      case 3:
        return (
          <div className="step">
            <h2>Step 3: Payment</h2>
            <input
              placeholder="Payment Info"
              value={formData.payment}
              onChange={(e) => updateField('payment', e.target.value)}
            />
            <button onClick={prevStep}>Back</button>
            <button onClick={nextStep}>Submit</button>
          </div>
        );

      case 4:
        return (
          <div className="step confirmation">
            <h2>Success!</h2>
            <p>Thank you, {formData.name}!</p>
            <p>Confirmation email sent to {formData.email}</p>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="wizard">
      <div className="progress">
        {step < 4 && <p>Step {step} of 3</p>}
      </div>
      {renderStep()}
    </div>
  );
}
```

### Task 3: Build a Content Filter

```jsx
import { useState } from 'react';

function ContentFilter() {
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const items = [
    { id: 1, title: 'React Tutorial', category: 'tutorial', status: 'published' },
    { id: 2, title: 'JavaScript Guide', category: 'guide', status: 'draft' },
    { id: 3, title: 'CSS Tips', category: 'tutorial', status: 'published' },
    { id: 4, title: 'Node.js Basics', category: 'guide', status: 'published' },
    { id: 5, title: 'TypeScript Overview', category: 'tutorial', status: 'draft' }
  ];

  const filteredItems = items.filter(item => {
    const matchesFilter = filter === 'all' || item.category === filter;
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="content-filter">
      <div className="controls">
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <div className="filter-buttons">
          <button
            className={filter === 'all' ? 'active' : ''}
            onClick={() => setFilter('all')}
          >
            All
          </button>
          <button
            className={filter === 'tutorial' ? 'active' : ''}
            onClick={() => setFilter('tutorial')}
          >
            Tutorials
          </button>
          <button
            className={filter === 'guide' ? 'active' : ''}
            onClick={() => setFilter('guide')}
          >
            Guides
          </button>
        </div>
      </div>

      <div className="results">
        {filteredItems.length === 0 ? (
          <p className="empty">No items found</p>
        ) : (
          filteredItems.map(item => (
            <div key={item.id} className="item">
              <h3>{item.title}</h3>
              <span className="category">{item.category}</span>
              {item.status === 'draft' && (
                <span className="badge draft">Draft</span>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
```

### Task 4: Create a Permission-Based UI

```jsx
import { useState } from 'react';

function PermissionBasedUI() {
  const [user, setUser] = useState({
    name: 'John Doe',
    role: 'editor', // 'admin', 'editor', 'viewer'
    permissions: ['read', 'write']
  });

  const hasPermission = (permission) => {
    return user.permissions.includes(permission);
  };

  const canEdit = hasPermission('write');
  const canDelete = hasPermission('delete');
  const canManageUsers = user.role === 'admin';

  return (
    <div className="app">
      <header>
        <h1>Dashboard - {user.name}</h1>
        <span className="role">{user.role}</span>
      </header>

      <div className="content">
        <h2>Articles</h2>

        <div className="article">
          <h3>Sample Article</h3>
          <p>Article content...</p>

          <div className="actions">
            {/* Everyone can view */}
            <button>View</button>

            {/* Only if can edit */}
            {canEdit && <button>Edit</button>}

            {/* Only if can delete */}
            {canDelete && <button className="danger">Delete</button>}
          </div>
        </div>

        {/* Admin-only section */}
        {canManageUsers && (
          <div className="admin-section">
            <h2>User Management</h2>
            <button>Add User</button>
            <button>View All Users</button>
            <button>Settings</button>
          </div>
        )}

        {/* Role-based features */}
        {user.role === 'admin' && (
          <div className="feature">Admin Analytics</div>
        )}

        {(user.role === 'admin' || user.role === 'editor') && (
          <div className="feature">Content Management</div>
        )}

        {/* Show message for limited permissions */}
        {!canEdit && (
          <div className="info">
            You have read-only access. Contact admin for edit permissions.
          </div>
        )}
      </div>
    </div>
  );
}
```

### Task 5: Build an Error Boundary Fallback

```jsx
import { useState } from 'react';

function ErrorBoundaryExample() {
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const simulateError = () => {
    setHasError(true);
    setErrorMessage('Something went wrong!');
  };

  const resetError = () => {
    setHasError(false);
    setErrorMessage('');
  };

  if (hasError) {
    return (
      <div className="error-boundary">
        <h1>Oops! Something went wrong</h1>
        <p>{errorMessage}</p>
        <details>
          <summary>Error Details</summary>
          <pre>{errorMessage}</pre>
        </details>
        <button onClick={resetError}>Try Again</button>
      </div>
    );
  }

  return (
    <div className="app">
      <h1>Application</h1>
      <p>Everything is working fine!</p>
      <button onClick={simulateError}>Simulate Error</button>
    </div>
  );
}
```

### Task 6: Create a Notification System

```jsx
import { useState } from 'react';

function NotificationSystem() {
  const [notifications, setNotifications] = useState([]);

  const addNotification = (type, message) => {
    const notification = {
      id: Date.now(),
      type, // 'success', 'error', 'warning', 'info'
      message
    };
    setNotifications([...notifications, notification]);
  };

  const removeNotification = (id) => {
    setNotifications(notifications.filter(n => n.id !== id));
  };

  const getIcon = (type) => {
    switch (type) {
      case 'success': return '✓';
      case 'error': return '✗';
      case 'warning': return '⚠';
      case 'info': return 'ℹ';
      default: return '';
    }
  };

  return (
    <div className="app">
      <h1>Notification System</h1>

      <div className="controls">
        <button onClick={() => addNotification('success', 'Operation successful!')}>
          Success
        </button>
        <button onClick={() => addNotification('error', 'An error occurred!')}>
          Error
        </button>
        <button onClick={() => addNotification('warning', 'Warning message!')}>
          Warning
        </button>
        <button onClick={() => addNotification('info', 'Information message!')}>
          Info
        </button>
      </div>

      <div className="notifications">
        {notifications.length === 0 ? (
          <p className="empty">No notifications</p>
        ) : (
          notifications.map(notification => (
            <div
              key={notification.id}
              className={`notification notification-${notification.type}`}
            >
              <span className="icon">{getIcon(notification.type)}</span>
              <span className="message">{notification.message}</span>
              <button
                className="close"
                onClick={() => removeNotification(notification.id)}
              >
                ×
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
```

## Best Practices

1. **Keep Conditions Simple**: Break complex conditions into variables
2. **Use Early Returns**: Return early for edge cases and errors
3. **Avoid Deep Nesting**: Flatten nested conditionals when possible
4. **Consistent Patterns**: Use the same conditional pattern throughout
5. **Handle Edge Cases**: Account for null, undefined, and empty states
6. **Loading States**: Always handle loading and error states
7. **Accessibility**: Ensure conditional UI changes are accessible
8. **Extract Components**: Move complex conditional logic to separate components

## Common Pitfalls

1. **Falsy Values**: `{count && <div>{count}</div>}` renders "0" when count is 0
2. **Missing Null Checks**: Accessing properties on null/undefined
3. **Too Many Ternaries**: Nested ternaries reduce readability
4. **Inline Logic**: Complex logic in JSX reduces readability
5. **Forgetting Keys**: Not adding keys when conditionally rendering lists
6. **State Inconsistency**: Conditional rendering based on stale state
7. **Component Remounting**: Conditional components lose state when toggled
8. **Performance Issues**: Re-creating components on every render

## Interview Questions

### Question 1: What are the different ways to conditionally render in React?
**Answer**: There are several ways: (1) If/else statements before the return, (2) Ternary operator: `{condition ? <A /> : <B />}`, (3) Logical AND: `{condition && <Component />}`, (4) Logical OR for defaults: `{value || 'default'}`, (5) Switch statements for multiple conditions, (6) Object/map lookups for dynamic rendering, (7) Immediately Invoked Function Expressions (IIFE) for complex logic in JSX. Choose based on readability and complexity.

### Question 2: What's the difference between `{count && <div>{count}</div>}` and `{count > 0 && <div>{count}</div>}`?
**Answer**: The first can render "0" as text when count is 0 because 0 is falsy in JavaScript but React renders it. The second explicitly checks if count is greater than 0, preventing the "0" from rendering. Best practice: use explicit boolean conditions (`count > 0`) rather than relying on truthy/falsy values, or use ternary: `{count ? <div>{count}</div> : null}` to make intentions clear.

### Question 3: When should you return null from a component?
**Answer**: Return null when you want a component to render nothing while still maintaining its place in the component tree. This is useful for conditional rendering where you want to hide a component without removing it from the parent's children. The component still mounts/unmounts normally, and lifecycle methods still run. It's cleaner than returning empty fragments or divs.

### Question 4: How do you handle loading states in React?
**Answer**: Use a state variable to track loading status. Pattern: (1) Set loading to true before async operation, (2) Set to false after completion, (3) Conditionally render loading UI. Example: `if (isLoading) return <Spinner />; if (error) return <Error />; if (!data) return <Empty />; return <Content data={data} />`. Always handle loading, error, empty, and success states.

### Question 5: What's the problem with nested ternary operators?
**Answer**: Nested ternaries reduce readability and are hard to maintain: `{a ? b ? c : d : e}` is confusing. Instead, use if/else statements, switch statements, or extract logic to a function. If you must nest, use proper formatting with parentheses and newlines. Better approach: extract to a function that returns different JSX based on conditions, or use object mapping for multiple conditions.

### Question 6: How does conditional rendering affect component lifecycle?
**Answer**: When a component is conditionally rendered with different keys or types, it unmounts and remounts, losing its state. Example: `{show && <Component />}` - when show toggles, Component unmounts/mounts. To preserve state, keep the component mounted and hide it with CSS, or lift state up to a parent that doesn't unmount. Use the `key` prop to force remounting when needed.

### Question 7: What's the best way to handle permission-based rendering?
**Answer**: Create a permissions system: (1) Store user permissions in context/state, (2) Create a helper function or custom hook to check permissions, (3) Use that in conditional rendering. Example: `const canEdit = hasPermission('edit'); {canEdit && <EditButton />}`. For complex permissions, create a `<Can permission="edit"><EditButton /></Can>` component that wraps content and checks permissions internally.

### Question 8: How do you prevent unnecessary re-renders with conditional rendering?
**Answer**: (1) Avoid creating new functions/components in conditional logic, (2) Use React.memo for components that conditionally render, (3) Move conditional components outside parent when possible, (4) Use children prop pattern to avoid re-creating elements, (5) Utilize useMemo for expensive conditional computations, (6) Consider using CSS visibility instead of mounting/unmounting for simple show/hide scenarios.

## Resources

- [Conditional Rendering](https://react.dev/learn/conditional-rendering)
- [Rendering Lists](https://react.dev/learn/rendering-lists)
- [JavaScript Logical Operators](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Logical_AND)
- [Ternary Operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Conditional_Operator)
- [React Patterns](https://reactpatterns.com/)
