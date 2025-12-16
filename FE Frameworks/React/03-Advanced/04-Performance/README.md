# Performance Optimization - Building Fast React Apps

## What You'll Learn

- React.memo
- useMemo and useCallback
- Code splitting and lazy loading
- Virtualization
- Performance profiling
- Common performance pitfalls

## Concept Overview

Learn techniques to optimize React app performance and prevent unnecessary re-renders.

### React.memo

Prevents re-renders when props haven't changed.

```javascript
const ExpensiveComponent = React.memo(({ data }) => {
  console.log('Rendering ExpensiveComponent');
  return <div>{data}</div>;
});

// Won't re-render if data hasn't changed
```

### useMemo

Memoizes expensive calculations.

```javascript
function Component({ items }) {
  // Only recalculates when items change
  const total = useMemo(() => {
    return items.reduce((sum, item) => sum + item.price, 0);
  }, [items]);

  return <div>Total: ${total}</div>;
}
```

### useCallback

Memoizes function references.

```javascript
function Parent() {
  const [count, setCount] = useState(0);

  // Prevents Child re-render when count changes
  const handleClick = useCallback(() => {
    console.log('Clicked');
  }, []); // Empty deps = never changes

  return <Child onClick={handleClick} />;
}

const Child = React.memo(({ onClick }) => {
  return <button onClick={onClick}>Click</button>;
});
```

### Code Splitting

```javascript
import React, { Suspense, lazy } from 'react';

// Lazy load component
const HeavyComponent = lazy(() => import('./HeavyComponent'));

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <HeavyComponent />
    </Suspense>
  );
}
```

### Virtualization (Large Lists)

```javascript
import { FixedSizeList } from 'react-window';

function VirtualList({ items }) {
  const Row = ({ index, style }) => (
    <div style={style}>Item {items[index]}</div>
  );

  return (
    <FixedSizeList
      height={600}
      itemCount={items.length}
      itemSize={35}
      width='100%'
    >
      {Row}
    </FixedSizeList>
  );
}
```

## Your Tasks

### Task 1: Memo Basics
Create components with and without React.memo, observe re-render behavior.

### Task 2: useMemo Calculation
Build a component with expensive calculations, optimize with useMemo.

### Task 3: useCallback Optimization
Prevent child component re-renders using useCallback.

### Task 4: Code Splitting
Split your app into chunks using React.lazy and Suspense.

### Task 5: Virtual List
Render a list of 10,000 items efficiently using react-window.

### Task 6: Profile and Fix
Use React DevTools Profiler to find and fix performance issues.

### Task 7: Image Optimization
Implement lazy loading for images.

### Task 8: Debounce Search
Optimize search input with debouncing.

## Common Performance Pitfalls

```javascript
// ❌ Bad: Inline object creation
<Component style={{ margin: 10 }} />

// ✅ Good: Define outside or useMemo
const style = { margin: 10 };
<Component style={style} />

// ❌ Bad: Inline function
<button onClick={() => handleClick(id)}>Click</button>

// ✅ Good: useCallback
const onClick = useCallback(() => handleClick(id), [id]);
<button onClick={onClick}>Click</button>

// ❌ Bad: Expensive calculation in render
const total = items.reduce((sum, item) => sum + item.price, 0);

// ✅ Good: useMemo
const total = useMemo(
  () => items.reduce((sum, item) => sum + item.price, 0),
  [items]
);
```

## Performance Checklist

- [ ] Use React.memo for expensive components
- [ ] Memoize callbacks with useCallback
- [ ] Memoize calculations with useMemo
- [ ] Code split large components
- [ ] Virtualize long lists
- [ ] Lazy load images
- [ ] Debounce expensive operations
- [ ] Profile with React DevTools

## Next Steps

Move to `05-React-Router` to learn client-side routing!
