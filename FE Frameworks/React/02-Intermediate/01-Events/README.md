# Event Handling in React

## Introduction

Event handling in React allows you to respond to user interactions like clicks, form submissions, keyboard input, and mouse movements. React events are named using camelCase and use synthetic events that wrap native browser events for cross-browser compatibility. Understanding event handling is essential for creating interactive React applications that respond to user actions.

## Key Concepts

### 1. Event Fundamentals
- **Synthetic Events**: React wraps browser events in a cross-browser wrapper
- **CamelCase Naming**: Event handlers use camelCase (onClick, onChange, onSubmit)
- **Function References**: Pass function references, not function calls
- **Event Object**: Synthetic event object passed to handlers

### 2. Event Handler Patterns
- **Inline Handlers**: Define handlers directly in JSX
- **Method Handlers**: Define handlers as component methods
- **Arrow Functions**: Use arrow functions to preserve context
- **Event Delegation**: React automatically handles delegation

### 3. Common Event Types
- **Mouse Events**: onClick, onDoubleClick, onMouseEnter, onMouseLeave
- **Keyboard Events**: onKeyDown, onKeyPress, onKeyUp
- **Form Events**: onChange, onSubmit, onFocus, onBlur
- **Touch Events**: onTouchStart, onTouchMove, onTouchEnd

## Basic Event Handling

### Click Events

```jsx
import { useState } from 'react';

function ClickExample() {
  const [count, setCount] = useState(0);

  const handleClick = () => {
    setCount(count + 1);
  };

  return (
    <div>
      <p>Clicked {count} times</p>
      <button onClick={handleClick}>Click Me</button>
    </div>
  );
}
```

### Inline Event Handlers

```jsx
function InlineHandlers() {
  const [message, setMessage] = useState('');

  return (
    <div>
      <p>{message}</p>
      <button onClick={() => setMessage('Button 1 clicked')}>
        Button 1
      </button>
      <button onClick={() => setMessage('Button 2 clicked')}>
        Button 2
      </button>
    </div>
  );
}
```

### Passing Arguments to Event Handlers

```jsx
function ArgumentExample() {
  const [selectedId, setSelectedId] = useState(null);

  const handleSelect = (id) => {
    setSelectedId(id);
  };

  return (
    <div>
      <p>Selected ID: {selectedId}</p>
      <button onClick={() => handleSelect(1)}>Item 1</button>
      <button onClick={() => handleSelect(2)}>Item 2</button>
      <button onClick={() => handleSelect(3)}>Item 3</button>
    </div>
  );
}
```

## Form Events

### Input Change Events

```jsx
function InputExample() {
  const [text, setText] = useState('');

  const handleChange = (e) => {
    setText(e.target.value);
  };

  return (
    <div>
      <input
        type="text"
        value={text}
        onChange={handleChange}
        placeholder="Type something..."
      />
      <p>You typed: {text}</p>
    </div>
  );
}
```

### Form Submit Events

```jsx
function FormExample() {
  const [formData, setFormData] = useState({
    username: '',
    email: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent page reload
    console.log('Form submitted:', formData);
    alert(`Welcome ${formData.username}!`);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="username"
        value={formData.username}
        onChange={handleChange}
        placeholder="Username"
      />
      <input
        name="email"
        type="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="Email"
      />
      <button type="submit">Submit</button>
    </form>
  );
}
```

### Multiple Input Types

```jsx
function MultiInputForm() {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    gender: '',
    subscribe: false,
    country: 'usa'
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  return (
    <form>
      <input
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Name"
      />

      <input
        name="age"
        type="number"
        value={formData.age}
        onChange={handleChange}
        placeholder="Age"
      />

      <label>
        <input
          name="subscribe"
          type="checkbox"
          checked={formData.subscribe}
          onChange={handleChange}
        />
        Subscribe to newsletter
      </label>

      <select name="country" value={formData.country} onChange={handleChange}>
        <option value="usa">USA</option>
        <option value="canada">Canada</option>
        <option value="uk">UK</option>
      </select>

      <div>
        <label>
          <input
            type="radio"
            name="gender"
            value="male"
            checked={formData.gender === 'male'}
            onChange={handleChange}
          />
          Male
        </label>
        <label>
          <input
            type="radio"
            name="gender"
            value="female"
            checked={formData.gender === 'female'}
            onChange={handleChange}
          />
          Female
        </label>
      </div>
    </form>
  );
}
```

## Keyboard Events

### Key Press Detection

```jsx
function KeyboardExample() {
  const [key, setKey] = useState('');
  const [text, setText] = useState('');

  const handleKeyDown = (e) => {
    setKey(e.key);

    // Check for specific keys
    if (e.key === 'Enter') {
      alert('Enter pressed!');
    }

    // Check for key combinations
    if (e.ctrlKey && e.key === 's') {
      e.preventDefault();
      alert('Save triggered!');
    }
  };

  return (
    <div>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Type something..."
      />
      <p>Last key pressed: {key}</p>
    </div>
  );
}
```

### Enter Key Submit

```jsx
function SearchBox() {
  const [query, setQuery] = useState('');

  const handleSearch = () => {
    console.log('Searching for:', query);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="search-box">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyPress={handleKeyPress}
        placeholder="Press Enter to search..."
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
}
```

## Mouse Events

### Mouse Position Tracking

```jsx
function MouseTracker() {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    setPosition({
      x: e.clientX,
      y: e.clientY
    });
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      style={{ height: '300px', border: '1px solid black' }}
    >
      <p>Mouse position: X: {position.x}, Y: {position.y}</p>
    </div>
  );
}
```

### Hover Effects

```jsx
function HoverButton() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <button
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        backgroundColor: isHovered ? 'blue' : 'gray',
        color: 'white',
        padding: '10px 20px',
        border: 'none',
        cursor: 'pointer'
      }}
    >
      {isHovered ? 'Hovered!' : 'Hover me'}
    </button>
  );
}
```

### Double Click

```jsx
function DoubleClickExample() {
  const [clicks, setClicks] = useState(0);
  const [doubleClicks, setDoubleClicks] = useState(0);

  return (
    <div>
      <button
        onClick={() => setClicks(clicks + 1)}
        onDoubleClick={() => setDoubleClicks(doubleClicks + 1)}
      >
        Click or Double Click
      </button>
      <p>Single clicks: {clicks}</p>
      <p>Double clicks: {doubleClicks}</p>
    </div>
  );
}
```

## Event Object

### Accessing Event Properties

```jsx
function EventObjectExample() {
  const [eventInfo, setEventInfo] = useState('');

  const handleClick = (e) => {
    const info = `
      Type: ${e.type}
      Target: ${e.target.tagName}
      Button: ${e.button}
      X: ${e.clientX}, Y: ${e.clientY}
    `;
    setEventInfo(info);
  };

  return (
    <div>
      <button onClick={handleClick}>Click for Event Info</button>
      <pre>{eventInfo}</pre>
    </div>
  );
}
```

### Preventing Default Behavior

```jsx
function PreventDefaultExample() {
  const handleLinkClick = (e) => {
    e.preventDefault();
    alert('Link click prevented!');
  };

  const handleContextMenu = (e) => {
    e.preventDefault();
    alert('Right-click disabled!');
  };

  return (
    <div>
      <a href="https://example.com" onClick={handleLinkClick}>
        Click this link (won't navigate)
      </a>
      <div
        onContextMenu={handleContextMenu}
        style={{ padding: '20px', border: '1px solid black' }}
      >
        Right-click here (disabled)
      </div>
    </div>
  );
}
```

### Event Propagation

```jsx
function EventPropagation() {
  const handleParentClick = () => {
    console.log('Parent clicked');
  };

  const handleChildClick = (e) => {
    e.stopPropagation(); // Stop event bubbling
    console.log('Child clicked');
  };

  return (
    <div
      onClick={handleParentClick}
      style={{ padding: '40px', backgroundColor: 'lightblue' }}
    >
      <p>Parent (click me)</p>
      <button onClick={handleChildClick}>
        Child (won't trigger parent)
      </button>
    </div>
  );
}
```

## Practical Tasks

### Task 1: Build a Todo List with Event Handlers

```jsx
import { useState } from 'react';

function TodoList() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      setTodos([...todos, { id: Date.now(), text: input, completed: false }]);
      setInput('');
    }
  };

  const toggleTodo = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSubmit(e);
    }
  };

  return (
    <div className="todo-list">
      <h1>Todo List</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Add a new todo..."
        />
        <button type="submit">Add</button>
      </form>

      <ul>
        {todos.map(todo => (
          <li key={todo.id}>
            <span
              onClick={() => toggleTodo(todo.id)}
              style={{
                textDecoration: todo.completed ? 'line-through' : 'none',
                cursor: 'pointer'
              }}
            >
              {todo.text}
            </span>
            <button onClick={() => deleteTodo(todo.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
```

### Task 2: Create an Interactive Image Gallery

```jsx
import { useState } from 'react';

function ImageGallery() {
  const images = [
    { id: 1, url: 'image1.jpg', title: 'Image 1' },
    { id: 2, url: 'image2.jpg', title: 'Image 2' },
    { id: 3, url: 'image3.jpg', title: 'Image 3' },
    { id: 4, url: 'image4.jpg', title: 'Image 4' }
  ];

  const [selectedImage, setSelectedImage] = useState(null);
  const [hoveredId, setHoveredId] = useState(null);

  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

  const handleClose = () => {
    setSelectedImage(null);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      handleClose();
    }
  };

  return (
    <div onKeyDown={handleKeyDown} tabIndex={0}>
      <div className="gallery">
        {images.map(image => (
          <div
            key={image.id}
            className="thumbnail"
            onClick={() => handleImageClick(image)}
            onMouseEnter={() => setHoveredId(image.id)}
            onMouseLeave={() => setHoveredId(null)}
            style={{
              opacity: hoveredId === image.id ? 0.8 : 1,
              cursor: 'pointer',
              transition: 'opacity 0.3s'
            }}
          >
            <img src={image.url} alt={image.title} />
            <p>{image.title}</p>
          </div>
        ))}
      </div>

      {selectedImage && (
        <div className="modal" onClick={handleClose}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <img src={selectedImage.url} alt={selectedImage.title} />
            <h2>{selectedImage.title}</h2>
            <button onClick={handleClose}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}
```

### Task 3: Build a Calculator

```jsx
import { useState } from 'react';

function Calculator() {
  const [display, setDisplay] = useState('0');
  const [operation, setOperation] = useState(null);
  const [previousValue, setPreviousValue] = useState(null);

  const handleNumberClick = (num) => {
    setDisplay(display === '0' ? num : display + num);
  };

  const handleOperationClick = (op) => {
    setPreviousValue(parseFloat(display));
    setOperation(op);
    setDisplay('0');
  };

  const handleEquals = () => {
    const current = parseFloat(display);
    const previous = previousValue;
    let result = 0;

    switch (operation) {
      case '+':
        result = previous + current;
        break;
      case '-':
        result = previous - current;
        break;
      case '*':
        result = previous * current;
        break;
      case '/':
        result = previous / current;
        break;
      default:
        return;
    }

    setDisplay(result.toString());
    setOperation(null);
    setPreviousValue(null);
  };

  const handleClear = () => {
    setDisplay('0');
    setOperation(null);
    setPreviousValue(null);
  };

  const handleKeyDown = (e) => {
    if (/[0-9]/.test(e.key)) {
      handleNumberClick(e.key);
    } else if (['+', '-', '*', '/'].includes(e.key)) {
      handleOperationClick(e.key);
    } else if (e.key === 'Enter' || e.key === '=') {
      handleEquals();
    } else if (e.key === 'Escape') {
      handleClear();
    }
  };

  return (
    <div className="calculator" onKeyDown={handleKeyDown} tabIndex={0}>
      <div className="display">{display}</div>
      <div className="buttons">
        {[7, 8, 9].map(num => (
          <button key={num} onClick={() => handleNumberClick(num.toString())}>
            {num}
          </button>
        ))}
        <button onClick={() => handleOperationClick('/')}>/</button>

        {[4, 5, 6].map(num => (
          <button key={num} onClick={() => handleNumberClick(num.toString())}>
            {num}
          </button>
        ))}
        <button onClick={() => handleOperationClick('*')}>*</button>

        {[1, 2, 3].map(num => (
          <button key={num} onClick={() => handleNumberClick(num.toString())}>
            {num}
          </button>
        ))}
        <button onClick={() => handleOperationClick('-')}>-</button>

        <button onClick={() => handleNumberClick('0')}>0</button>
        <button onClick={handleEquals}>=</button>
        <button onClick={handleClear}>C</button>
        <button onClick={() => handleOperationClick('+')}>+</button>
      </div>
    </div>
  );
}
```

### Task 4: Create a Color Picker

```jsx
import { useState } from 'react';

function ColorPicker() {
  const [color, setColor] = useState({ r: 0, g: 0, b: 0 });
  const [history, setHistory] = useState([]);

  const handleColorChange = (channel, value) => {
    setColor({ ...color, [channel]: parseInt(value) });
  };

  const rgbString = `rgb(${color.r}, ${color.g}, ${color.b})`;
  const hexString = `#${color.r.toString(16).padStart(2, '0')}${color.g.toString(16).padStart(2, '0')}${color.b.toString(16).padStart(2, '0')}`;

  const saveColor = () => {
    if (!history.includes(rgbString)) {
      setHistory([...history, rgbString]);
    }
  };

  const loadColor = (savedColor) => {
    const rgb = savedColor.match(/\d+/g).map(Number);
    setColor({ r: rgb[0], g: rgb[1], b: rgb[2] });
  };

  return (
    <div className="color-picker">
      <div
        className="preview"
        style={{ backgroundColor: rgbString, width: '200px', height: '200px' }}
      />

      <div className="controls">
        <label>
          Red: {color.r}
          <input
            type="range"
            min="0"
            max="255"
            value={color.r}
            onChange={(e) => handleColorChange('r', e.target.value)}
          />
        </label>

        <label>
          Green: {color.g}
          <input
            type="range"
            min="0"
            max="255"
            value={color.g}
            onChange={(e) => handleColorChange('g', e.target.value)}
          />
        </label>

        <label>
          Blue: {color.b}
          <input
            type="range"
            min="0"
            max="255"
            value={color.b}
            onChange={(e) => handleColorChange('b', e.target.value)}
          />
        </label>
      </div>

      <div className="values">
        <p>RGB: {rgbString}</p>
        <p>HEX: {hexString}</p>
      </div>

      <button onClick={saveColor}>Save Color</button>

      <div className="history">
        <h3>Saved Colors</h3>
        {history.map((savedColor, index) => (
          <div
            key={index}
            onClick={() => loadColor(savedColor)}
            style={{
              backgroundColor: savedColor,
              width: '50px',
              height: '50px',
              cursor: 'pointer',
              display: 'inline-block',
              margin: '5px'
            }}
          />
        ))}
      </div>
    </div>
  );
}
```

### Task 5: Build a Dropdown Menu

```jsx
import { useState, useEffect, useRef } from 'react';

function Dropdown({ options, onSelect }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const dropdownRef = useRef(null);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleSelect = (option) => {
    setSelected(option);
    onSelect(option);
    setIsOpen(false);
  };

  const handleClickOutside = (e) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
      setIsOpen(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <div className="dropdown" ref={dropdownRef}>
      <button onClick={handleToggle} className="dropdown-toggle">
        {selected || 'Select an option'}
      </button>

      {isOpen && (
        <ul className="dropdown-menu">
          {options.map((option, index) => (
            <li
              key={index}
              onClick={() => handleSelect(option)}
              className="dropdown-item"
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

// Usage
function App() {
  const options = ['Option 1', 'Option 2', 'Option 3', 'Option 4'];

  const handleSelect = (option) => {
    console.log('Selected:', option);
  };

  return <Dropdown options={options} onSelect={handleSelect} />;
}
```

## Best Practices

1. **Use Named Functions**: Define event handlers as named functions for readability
2. **Prevent Default When Needed**: Use `e.preventDefault()` for forms and links
3. **Stop Propagation Carefully**: Use `e.stopPropagation()` only when necessary
4. **Avoid Inline Functions**: Extract complex logic from inline handlers
5. **Handle Keyboard Events**: Provide keyboard navigation for accessibility
6. **Clean Up Listeners**: Remove event listeners in cleanup functions
7. **Use Synthetic Events**: Don't rely on native event properties
8. **Debounce Heavy Operations**: Throttle or debounce expensive event handlers

## Common Pitfalls

1. **Calling Functions Instead of Passing**: `onClick={handleClick()}` instead of `onClick={handleClick}`
2. **Forgetting preventDefault**: Form submissions reload the page
3. **Not Binding This**: In class components, forgetting to bind event handlers
4. **Memory Leaks**: Not cleaning up event listeners in useEffect
5. **Stale Closures**: Event handlers capturing old state values
6. **Event Pooling**: Accessing event properties asynchronously (React 16 and earlier)
7. **Missing Dependencies**: useEffect event listeners without proper dependencies
8. **Too Many Inline Handlers**: Creating new functions on every render

## Interview Questions

### Question 1: What are synthetic events in React?
**Answer**: Synthetic events are React's cross-browser wrapper around native browser events. They have the same interface as native events (like `stopPropagation()` and `preventDefault()`), but work identically across all browsers. React uses event delegation under the hood, attaching a single event listener at the root and mapping events to the appropriate handlers. This improves performance and ensures consistent behavior across browsers.

### Question 2: How do you pass arguments to event handlers in React?
**Answer**: There are two main ways: (1) Use an arrow function: `onClick={() => handleClick(id)}`, or (2) Use bind: `onClick={handleClick.bind(this, id)}`. The arrow function approach is more common in functional components. You can also create a higher-order function that returns an event handler. When using these approaches, be aware that you're creating a new function on each render, which could affect performance in lists.

### Question 3: What's the difference between onClick and onClick() in React?
**Answer**: `onClick={handleClick}` passes a reference to the function, which React calls when the event occurs. `onClick={handleClick()}` calls the function immediately during render and passes its return value to onClick, which is usually not what you want. This is a common mistake that can cause infinite loops or unexpected behavior. To pass arguments, use an arrow function: `onClick={() => handleClick(arg)}`.

### Question 4: How do you prevent event bubbling in React?
**Answer**: Use `e.stopPropagation()` in the event handler to prevent the event from bubbling up to parent elements. For example: `const handleClick = (e) => { e.stopPropagation(); // handle click }`. This is useful when you have nested clickable elements and want to prevent parent handlers from firing. Be cautious as stopping propagation can make code harder to debug and maintain.

### Question 5: Why should you call preventDefault() in form handlers?
**Answer**: `preventDefault()` prevents the default browser behavior. For forms, the default behavior is to submit the form and reload the page, which would lose your React state. By calling `e.preventDefault()` in the submit handler, you prevent the page reload and can handle the form submission with JavaScript, validate data, make API calls, and update state without losing the application state.

### Question 6: How do event handlers work differently in React vs vanilla JavaScript?
**Answer**: React uses synthetic events and event delegation. You pass function references in JSX (camelCase) instead of strings. React automatically handles event delegation by attaching listeners at the root, not individual elements. Event handlers receive synthetic events, not native events. You don't need to manually add/remove listeners; React handles this. In class components, you must bind methods, but functional components with hooks don't have this issue.

### Question 7: What happens to events when components unmount?
**Answer**: React automatically cleans up event listeners attached through JSX when components unmount. However, if you manually add event listeners (like window or document listeners in useEffect), you must clean them up in the useEffect cleanup function to prevent memory leaks. Return a cleanup function that removes the listener: `useEffect(() => { window.addEventListener('resize', handler); return () => window.removeEventListener('resize', handler); }, [])`.

### Question 8: How do you handle events in lists efficiently?
**Answer**: Instead of creating a new arrow function for each list item (which creates new functions on every render), use one of these approaches: (1) Pass data through data attributes and read from event.target, (2) Use a higher-order function that returns an event handler, or (3) Create a separate component for list items that handles its own events. For large lists, consider using event delegation by attaching a single listener to the parent and checking event.target.

## Resources

- [Handling Events in React](https://react.dev/learn/responding-to-events)
- [Synthetic Events](https://react.dev/reference/react-dom/components/common#react-event-object)
- [Event Handler Best Practices](https://react.dev/learn/responding-to-events#adding-event-handlers)
- [Form Events](https://react.dev/reference/react-dom/components/input)
- [Keyboard Events](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent)
