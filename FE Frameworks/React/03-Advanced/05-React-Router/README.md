# React Router - Client-Side Routing

## What You'll Learn

- React Router setup
- Route configuration
- Navigation (Link, useNavigate)
- URL parameters
- Nested routes
- Protected routes
- Programmatic navigation

## Setup

```bash
npm install react-router-dom
```

## Basic Routing

```javascript
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/contact">Contact</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
```

## URL Parameters

```javascript
import { useParams } from 'react-router-dom';

// Route
<Route path="/users/:id" element={<UserProfile />} />

// Component
function UserProfile() {
  const { id } = useParams();
  return <div>User ID: {id}</div>;
}
```

## Programmatic Navigation

```javascript
import { useNavigate } from 'react-router-dom';

function LoginForm() {
  const navigate = useNavigate();

  const handleLogin = () => {
    // After successful login
    navigate('/dashboard');
  };

  return <button onClick={handleLogin}>Login</button>;
}
```

## Protected Routes

```javascript
function ProtectedRoute({ children }) {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

// Usage
<Route
  path="/dashboard"
  element={
    <ProtectedRoute>
      <Dashboard />
    </ProtectedRoute>
  }
/>
```

## Nested Routes

```javascript
<Route path="/dashboard" element={<DashboardLayout />}>
  <Route index element={<DashboardHome />} />
  <Route path="profile" element={<Profile />} />
  <Route path="settings" element={<Settings />} />
</Route>

// In DashboardLayout
import { Outlet } from 'react-router-dom';

function DashboardLayout() {
  return (
    <div>
      <Sidebar />
      <Outlet /> {/* Nested routes render here */}
    </div>
  );
}
```

## Your Tasks

### Task 1: Basic Routes
Create an app with Home, About, and Contact pages using React Router.

### Task 2: Dynamic Routes
Build a blog with post list and individual post pages using URL parameters.

### Task 3: Protected Routes
Implement authentication with protected dashboard routes.

### Task 4: Nested Routes
Create a dashboard with nested routes for different sections.

### Task 5: Navigation Menu
Build an active nav menu that highlights the current route.

### Task 6: 404 Page
Create a custom 404 Not Found page for invalid routes.

### Task 7: Programmatic Navigation
Implement a multi-step form that navigates programmatically.

### Task 8: Query Parameters
Build a search page that uses URL query parameters for filters.

## Navigation Hooks

```javascript
// Navigate programmatically
const navigate = useNavigate();
navigate('/path');
navigate(-1); // Go back

// Get current location
const location = useLocation();
console.log(location.pathname);

// Get URL parameters
const { id, category } = useParams();

// Search params (query string)
const [searchParams, setSearchParams] = useSearchParams();
const query = searchParams.get('q');
```

## Best Practices

- Use `<Link>` instead of `<a>` for internal navigation
- Implement 404 routes with `path="*"`
- Use layout routes for shared UI
- Lazy load route components for code splitting
- Use protected routes for authentication
- Keep route configuration centralized

## Next Steps

You've completed React Advanced! Consider exploring:
- Redux for state management
- Testing with React Testing Library
- Server-Side Rendering with Next.js
- TypeScript with React
