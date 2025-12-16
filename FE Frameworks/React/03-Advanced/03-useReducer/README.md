# useReducer - Complex State Management

## What You'll Learn

- useReducer basics
- Actions and reducers
- Complex state logic
- useReducer vs useState
- Combining with Context

## Concept Overview

useReducer is an alternative to useState for managing complex state logic, inspired by Redux.

### Basic useReducer

```javascript
import { useReducer } from 'react';

// Reducer function
function counterReducer(state, action) {
  switch (action.type) {
    case 'INCREMENT':
      return { count: state.count + 1 };
    case 'DECREMENT':
      return { count: state.count - 1 };
    case 'RESET':
      return { count: 0 };
    default:
      return state;
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
    </div>
  );
}
```

### Todo List with useReducer

```javascript
function todoReducer(state, action) {
  switch (action.type) {
    case 'ADD_TODO':
      return [...state, { id: Date.now(), text: action.payload, done: false }];

    case 'TOGGLE_TODO':
      return state.map(todo =>
        todo.id === action.payload
          ? { ...todo, done: !todo.done }
          : todo
      );

    case 'DELETE_TODO':
      return state.filter(todo => todo.id !== action.payload);

    case 'EDIT_TODO':
      return state.map(todo =>
        todo.id === action.payload.id
          ? { ...todo, text: action.payload.text }
          : todo
      );

    default:
      return state;
  }
}

function TodoApp() {
  const [todos, dispatch] = useReducer(todoReducer, []);
  const [input, setInput] = useState('');

  const addTodo = () => {
    dispatch({ type: 'ADD_TODO', payload: input });
    setInput('');
  };

  return (
    <div>
      <input value={input} onChange={e => setInput(e.target.value)} />
      <button onClick={addTodo}>Add</button>

      <ul>
        {todos.map(todo => (
          <li key={todo.id}>
            <span
              style={{ textDecoration: todo.done ? 'line-through' : 'none' }}
              onClick={() => dispatch({ type: 'TOGGLE_TODO', payload: todo.id })}
            >
              {todo.text}
            </span>
            <button onClick={() => dispatch({ type: 'DELETE_TODO', payload: todo.id })}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
```

## Your Tasks

### Task 1: Counter with useReducer
Build a counter with increment, decrement, and reset using useReducer.

### Task 2: Todo List
Create a full-featured todo app with add, toggle, edit, and delete.

### Task 3: Form State
Manage complex form state with useReducer instead of multiple useState calls.

### Task 4: Shopping Cart
Build a shopping cart with useReducer for add, remove, update quantity, and clear.

### Task 5: useReducer + Context
Combine useReducer with Context API for global state management.

### Task 6: Undo/Redo
Implement undo/redo functionality using useReducer.

### Task 7: Async with useReducer
Handle async operations (API calls) with useReducer.

### Task 8: Game State
Build a simple game (tic-tac-toe) managing state with useReducer.

## When to Use useReducer

✅ Use useReducer when:
- Multiple state values that change together
- Complex state logic
- Next state depends on previous state
- Want to centralize state logic

✅ Use useState when:
- Simple state
- Independent state values
- Don't need complex logic

## Best Practices

- Keep reducers pure (no side effects)
- Use action types as constants
- Provide default case in switch
- Consider TypeScript for type safety
- Split large reducers into smaller ones

## Next Steps

Move to `04-Performance` for React optimization techniques!
