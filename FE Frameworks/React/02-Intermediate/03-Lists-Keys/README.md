# Lists and Keys

## Introduction

Rendering lists is a common task in React applications. Lists allow you to display collections of data dynamically, and keys help React identify which items have changed, been added, or removed. Understanding how to properly render lists and use keys is essential for building performant and bug-free React applications.

## Key Concepts

### 1. List Fundamentals
- **Array Mapping**: Transform arrays into JSX elements
- **Dynamic Rendering**: Render lists from data arrays
- **Keys**: Unique identifiers for list items
- **Iteration**: Use map(), filter(), reduce() for list manipulation

### 2. Keys Purpose
- **Reconciliation**: Help React identify changes efficiently
- **Performance**: Enable efficient DOM updates
- **Stability**: Maintain component state across re-renders
- **Uniqueness**: Must be unique among siblings

### 3. List Patterns
- **Simple Lists**: Basic array rendering
- **Filtered Lists**: Display filtered data
- **Nested Lists**: Lists within lists
- **Dynamic Lists**: Add, remove, update items

## Basic List Rendering

### Simple List

```jsx
function FruitList() {
  const fruits = ['Apple', 'Banana', 'Orange', 'Mango'];

  return (
    <ul>
      {fruits.map((fruit, index) => (
        <li key={index}>{fruit}</li>
      ))}
    </ul>
  );
}
```

### List with Objects

```jsx
function UserList() {
  const users = [
    { id: 1, name: 'Alice', age: 25 },
    { id: 2, name: 'Bob', age: 30 },
    { id: 3, name: 'Charlie', age: 28 }
  ];

  return (
    <div className="user-list">
      {users.map(user => (
        <div key={user.id} className="user-card">
          <h3>{user.name}</h3>
          <p>Age: {user.age}</p>
        </div>
      ))}
    </div>
  );
}
```

### List with Components

```jsx
function UserCard({ user }) {
  return (
    <div className="user-card">
      <h3>{user.name}</h3>
      <p>{user.email}</p>
    </div>
  );
}

function UserList() {
  const users = [
    { id: 1, name: 'Alice', email: 'alice@example.com' },
    { id: 2, name: 'Bob', email: 'bob@example.com' },
    { id: 3, name: 'Charlie', email: 'charlie@example.com' }
  ];

  return (
    <div>
      {users.map(user => (
        <UserCard key={user.id} user={user} />
      ))}
    </div>
  );
}
```

## Understanding Keys

### Why Keys Are Important

```jsx
// Bad - Using index as key can cause issues
function BadExample() {
  const [items, setItems] = useState(['A', 'B', 'C']);

  return (
    <ul>
      {items.map((item, index) => (
        <li key={index}>{item}</li>
      ))}
    </ul>
  );
}

// Good - Using unique IDs
function GoodExample() {
  const [items, setItems] = useState([
    { id: 1, text: 'A' },
    { id: 2, text: 'B' },
    { id: 3, text: 'C' }
  ]);

  return (
    <ul>
      {items.map(item => (
        <li key={item.id}>{item.text}</li>
      ))}
    </ul>
  );
}
```

### Key Best Practices

```jsx
import { useState } from 'react';

function TodoList() {
  const [todos, setTodos] = useState([
    { id: 1, text: 'Learn React', completed: false },
    { id: 2, text: 'Build Project', completed: false }
  ]);

  // Good: Using stable, unique IDs
  return (
    <ul>
      {todos.map(todo => (
        <li key={todo.id}>
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={() => toggleTodo(todo.id)}
          />
          {todo.text}
        </li>
      ))}
    </ul>
  );
}

// Generating unique IDs
function generateId() {
  return Date.now() + Math.random();
}

// Or use a library like uuid
// import { v4 as uuidv4 } from 'uuid';
// const id = uuidv4();
```

### When Index as Key Is Acceptable

```jsx
// OK: Static list that never changes
function MonthList() {
  const months = [
    'January', 'February', 'March', 'April',
    'May', 'June', 'July', 'August',
    'September', 'October', 'November', 'December'
  ];

  // Index is OK here because list is static
  return (
    <ul>
      {months.map((month, index) => (
        <li key={index}>{month}</li>
      ))}
    </ul>
  );
}
```

## Dynamic Lists

### Adding Items

```jsx
import { useState } from 'react';

function ShoppingList() {
  const [items, setItems] = useState([
    { id: 1, name: 'Milk' },
    { id: 2, name: 'Bread' }
  ]);
  const [input, setInput] = useState('');

  const addItem = () => {
    if (input.trim()) {
      const newItem = {
        id: Date.now(),
        name: input
      };
      setItems([...items, newItem]);
      setInput('');
    }
  };

  return (
    <div>
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Add item..."
      />
      <button onClick={addItem}>Add</button>

      <ul>
        {items.map(item => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
    </div>
  );
}
```

### Removing Items

```jsx
import { useState } from 'react';

function TaskList() {
  const [tasks, setTasks] = useState([
    { id: 1, text: 'Task 1' },
    { id: 2, text: 'Task 2' },
    { id: 3, text: 'Task 3' }
  ]);

  const removeTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  return (
    <ul>
      {tasks.map(task => (
        <li key={task.id}>
          {task.text}
          <button onClick={() => removeTask(task.id)}>Delete</button>
        </li>
      ))}
    </ul>
  );
}
```

### Updating Items

```jsx
import { useState } from 'react';

function EditableList() {
  const [items, setItems] = useState([
    { id: 1, text: 'Item 1', isEditing: false },
    { id: 2, text: 'Item 2', isEditing: false },
    { id: 3, text: 'Item 3', isEditing: false }
  ]);

  const toggleEdit = (id) => {
    setItems(items.map(item =>
      item.id === id ? { ...item, isEditing: !item.isEditing } : item
    ));
  };

  const updateText = (id, newText) => {
    setItems(items.map(item =>
      item.id === id ? { ...item, text: newText } : item
    ));
  };

  return (
    <ul>
      {items.map(item => (
        <li key={item.id}>
          {item.isEditing ? (
            <input
              value={item.text}
              onChange={(e) => updateText(item.id, e.target.value)}
              onBlur={() => toggleEdit(item.id)}
              autoFocus
            />
          ) : (
            <span onDoubleClick={() => toggleEdit(item.id)}>
              {item.text}
            </span>
          )}
        </li>
      ))}
    </ul>
  );
}
```

## Filtering and Sorting Lists

### Filtered Lists

```jsx
import { useState } from 'react';

function FilteredProductList() {
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('all');

  const products = [
    { id: 1, name: 'Laptop', category: 'electronics', price: 999 },
    { id: 2, name: 'Shirt', category: 'clothing', price: 29 },
    { id: 3, name: 'Phone', category: 'electronics', price: 699 },
    { id: 4, name: 'Shoes', category: 'clothing', price: 89 }
  ];

  const filteredProducts = products
    .filter(product => {
      const matchesSearch = product.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesCategory = category === 'all' || product.category === category;
      return matchesSearch && matchesCategory;
    });

  return (
    <div>
      <input
        type="text"
        placeholder="Search products..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        <option value="all">All Categories</option>
        <option value="electronics">Electronics</option>
        <option value="clothing">Clothing</option>
      </select>

      <div className="products">
        {filteredProducts.map(product => (
          <div key={product.id} className="product">
            <h3>{product.name}</h3>
            <p>Category: {product.category}</p>
            <p>Price: ${product.price}</p>
          </div>
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <p>No products found</p>
      )}
    </div>
  );
}
```

### Sorted Lists

```jsx
import { useState } from 'react';

function SortableList() {
  const [sortBy, setSortBy] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');

  const data = [
    { id: 1, name: 'John', age: 30, salary: 50000 },
    { id: 2, name: 'Alice', age: 25, salary: 60000 },
    { id: 3, name: 'Bob', age: 35, salary: 55000 }
  ];

  const sortedData = [...data].sort((a, b) => {
    const multiplier = sortOrder === 'asc' ? 1 : -1;

    if (typeof a[sortBy] === 'string') {
      return multiplier * a[sortBy].localeCompare(b[sortBy]);
    }

    return multiplier * (a[sortBy] - b[sortBy]);
  });

  return (
    <div>
      <div className="controls">
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="name">Name</option>
          <option value="age">Age</option>
          <option value="salary">Salary</option>
        </select>

        <button onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}>
          {sortOrder === 'asc' ? '↑' : '↓'}
        </button>
      </div>

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Age</th>
            <th>Salary</th>
          </tr>
        </thead>
        <tbody>
          {sortedData.map(person => (
            <tr key={person.id}>
              <td>{person.name}</td>
              <td>{person.age}</td>
              <td>${person.salary}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
```

## Nested Lists

### Lists Within Lists

```jsx
function NestedList() {
  const categories = [
    {
      id: 1,
      name: 'Fruits',
      items: [
        { id: 101, name: 'Apple' },
        { id: 102, name: 'Banana' },
        { id: 103, name: 'Orange' }
      ]
    },
    {
      id: 2,
      name: 'Vegetables',
      items: [
        { id: 201, name: 'Carrot' },
        { id: 202, name: 'Broccoli' },
        { id: 203, name: 'Spinach' }
      ]
    }
  ];

  return (
    <div>
      {categories.map(category => (
        <div key={category.id} className="category">
          <h2>{category.name}</h2>
          <ul>
            {category.items.map(item => (
              <li key={item.id}>{item.name}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
```

### Tree Structure

```jsx
function TreeNode({ node }) {
  return (
    <li>
      <span>{node.name}</span>
      {node.children && node.children.length > 0 && (
        <ul>
          {node.children.map(child => (
            <TreeNode key={child.id} node={child} />
          ))}
        </ul>
      )}
    </li>
  );
}

function FileTree() {
  const fileStructure = {
    id: 1,
    name: 'root',
    children: [
      {
        id: 2,
        name: 'src',
        children: [
          { id: 3, name: 'index.js' },
          { id: 4, name: 'App.js' }
        ]
      },
      {
        id: 5,
        name: 'public',
        children: [
          { id: 6, name: 'index.html' }
        ]
      }
    ]
  };

  return (
    <ul className="file-tree">
      <TreeNode node={fileStructure} />
    </ul>
  );
}
```

## Practical Tasks

### Task 1: Build a Contact List with Search

```jsx
import { useState } from 'react';

function ContactList() {
  const [contacts, setContacts] = useState([
    { id: 1, name: 'Alice Johnson', phone: '555-0101', email: 'alice@example.com' },
    { id: 2, name: 'Bob Smith', phone: '555-0102', email: 'bob@example.com' },
    { id: 3, name: 'Charlie Brown', phone: '555-0103', email: 'charlie@example.com' },
    { id: 4, name: 'Diana Prince', phone: '555-0104', email: 'diana@example.com' }
  ]);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contact.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const deleteContact = (id) => {
    setContacts(contacts.filter(contact => contact.id !== id));
  };

  return (
    <div className="contact-list">
      <h1>Contacts ({filteredContacts.length})</h1>

      <input
        type="text"
        placeholder="Search contacts..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-box"
      />

      <div className="contacts">
        {filteredContacts.length === 0 ? (
          <p className="empty">No contacts found</p>
        ) : (
          filteredContacts.map(contact => (
            <div key={contact.id} className="contact-card">
              <h3>{contact.name}</h3>
              <p>📞 {contact.phone}</p>
              <p>✉️ {contact.email}</p>
              <button onClick={() => deleteContact(contact.id)}>Delete</button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
```

### Task 2: Create a Sortable Table

```jsx
import { useState } from 'react';

function SortableTable() {
  const [data, setData] = useState([
    { id: 1, product: 'Laptop', category: 'Electronics', price: 999, stock: 15 },
    { id: 2, product: 'Mouse', category: 'Accessories', price: 25, stock: 50 },
    { id: 3, product: 'Keyboard', category: 'Accessories', price: 75, stock: 30 },
    { id: 4, product: 'Monitor', category: 'Electronics', price: 299, stock: 20 },
    { id: 5, product: 'Webcam', category: 'Electronics', price: 89, stock: 12 }
  ]);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });

  const sortData = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }

    const sorted = [...data].sort((a, b) => {
      if (typeof a[key] === 'string') {
        return direction === 'asc'
          ? a[key].localeCompare(b[key])
          : b[key].localeCompare(a[key]);
      }
      return direction === 'asc' ? a[key] - b[key] : b[key] - a[key];
    });

    setData(sorted);
    setSortConfig({ key, direction });
  };

  const getSortIndicator = (key) => {
    if (sortConfig.key !== key) return '↕️';
    return sortConfig.direction === 'asc' ? '↑' : '↓';
  };

  return (
    <div className="sortable-table">
      <h1>Product Inventory</h1>

      <table>
        <thead>
          <tr>
            <th onClick={() => sortData('product')}>
              Product {getSortIndicator('product')}
            </th>
            <th onClick={() => sortData('category')}>
              Category {getSortIndicator('category')}
            </th>
            <th onClick={() => sortData('price')}>
              Price {getSortIndicator('price')}
            </th>
            <th onClick={() => sortData('stock')}>
              Stock {getSortIndicator('stock')}
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map(item => (
            <tr key={item.id}>
              <td>{item.product}</td>
              <td>{item.category}</td>
              <td>${item.price}</td>
              <td>{item.stock}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
```

### Task 3: Build a Tag Manager

```jsx
import { useState } from 'react';

function TagManager() {
  const [tags, setTags] = useState([
    { id: 1, name: 'React', color: '#61dafb' },
    { id: 2, name: 'JavaScript', color: '#f7df1e' },
    { id: 3, name: 'CSS', color: '#264de4' }
  ]);
  const [input, setInput] = useState('');
  const [selectedColor, setSelectedColor] = useState('#000000');

  const addTag = () => {
    if (input.trim()) {
      const newTag = {
        id: Date.now(),
        name: input,
        color: selectedColor
      };
      setTags([...tags, newTag]);
      setInput('');
    }
  };

  const removeTag = (id) => {
    setTags(tags.filter(tag => tag.id !== id));
  };

  return (
    <div className="tag-manager">
      <h1>Tag Manager</h1>

      <div className="add-tag">
        <input
          type="text"
          placeholder="Tag name..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && addTag()}
        />
        <input
          type="color"
          value={selectedColor}
          onChange={(e) => setSelectedColor(e.target.value)}
        />
        <button onClick={addTag}>Add Tag</button>
      </div>

      <div className="tags">
        {tags.length === 0 ? (
          <p>No tags yet</p>
        ) : (
          tags.map(tag => (
            <span
              key={tag.id}
              className="tag"
              style={{ backgroundColor: tag.color }}
            >
              {tag.name}
              <button onClick={() => removeTag(tag.id)}>×</button>
            </span>
          ))
        )}
      </div>
    </div>
  );
}
```

### Task 4: Create a Multi-Select List

```jsx
import { useState } from 'react';

function MultiSelectList() {
  const [items] = useState([
    { id: 1, name: 'Apple', category: 'Fruit' },
    { id: 2, name: 'Carrot', category: 'Vegetable' },
    { id: 3, name: 'Banana', category: 'Fruit' },
    { id: 4, name: 'Broccoli', category: 'Vegetable' },
    { id: 5, name: 'Orange', category: 'Fruit' }
  ]);
  const [selected, setSelected] = useState([]);

  const toggleSelection = (id) => {
    if (selected.includes(id)) {
      setSelected(selected.filter(itemId => itemId !== id));
    } else {
      setSelected([...selected, id]);
    }
  };

  const selectAll = () => {
    setSelected(items.map(item => item.id));
  };

  const deselectAll = () => {
    setSelected([]);
  };

  const deleteSelected = () => {
    console.log('Deleting items:', selected);
    setSelected([]);
  };

  return (
    <div className="multi-select">
      <h1>Multi-Select List</h1>

      <div className="controls">
        <button onClick={selectAll}>Select All</button>
        <button onClick={deselectAll}>Deselect All</button>
        <button onClick={deleteSelected} disabled={selected.length === 0}>
          Delete Selected ({selected.length})
        </button>
      </div>

      <ul className="items">
        {items.map(item => (
          <li
            key={item.id}
            className={selected.includes(item.id) ? 'selected' : ''}
            onClick={() => toggleSelection(item.id)}
          >
            <input
              type="checkbox"
              checked={selected.includes(item.id)}
              onChange={() => toggleSelection(item.id)}
            />
            <span>{item.name}</span>
            <span className="category">{item.category}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
```

### Task 5: Build a Drag-and-Drop List

```jsx
import { useState } from 'react';

function DragDropList() {
  const [items, setItems] = useState([
    { id: 1, text: 'Item 1' },
    { id: 2, text: 'Item 2' },
    { id: 3, text: 'Item 3' },
    { id: 4, text: 'Item 4' }
  ]);
  const [draggedItem, setDraggedItem] = useState(null);

  const handleDragStart = (item) => {
    setDraggedItem(item);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (targetItem) => {
    if (!draggedItem || draggedItem.id === targetItem.id) return;

    const draggedIndex = items.findIndex(item => item.id === draggedItem.id);
    const targetIndex = items.findIndex(item => item.id === targetItem.id);

    const newItems = [...items];
    newItems.splice(draggedIndex, 1);
    newItems.splice(targetIndex, 0, draggedItem);

    setItems(newItems);
    setDraggedItem(null);
  };

  return (
    <div className="drag-drop-list">
      <h1>Drag and Drop List</h1>
      <p>Drag items to reorder</p>

      <ul>
        {items.map(item => (
          <li
            key={item.id}
            draggable
            onDragStart={() => handleDragStart(item)}
            onDragOver={handleDragOver}
            onDrop={() => handleDrop(item)}
            className={draggedItem?.id === item.id ? 'dragging' : ''}
          >
            <span className="drag-handle">☰</span>
            {item.text}
          </li>
        ))}
      </ul>
    </div>
  );
}
```

## Best Practices

1. **Always Use Keys**: Every list item needs a unique key
2. **Stable Keys**: Use IDs, not array indices for dynamic lists
3. **Extract Components**: Create separate components for list items
4. **Avoid Index as Key**: Only use index for static, non-reorderable lists
5. **Filter Before Map**: Filter data before mapping to JSX
6. **Memoize Expensive Operations**: Use useMemo for heavy computations
7. **Handle Empty States**: Show meaningful messages for empty lists
8. **Unique Keys**: Ensure keys are unique among siblings

## Common Pitfalls

1. **Index as Key**: Using array index as key for dynamic lists
2. **Missing Keys**: Forgetting keys causes React warnings
3. **Non-Unique Keys**: Duplicate keys cause unpredictable behavior
4. **Key in Wrong Place**: Key should be on the top-level element in map()
5. **Modifying Keys**: Changing keys causes unnecessary re-renders
6. **Random Keys**: Using Math.random() or Date.now() directly as keys
7. **Spreading Keys**: Forgetting to pass key when spreading props
8. **Nested Map Without Keys**: Missing keys in nested lists

## Interview Questions

### Question 1: Why do we need keys in React lists?
**Answer**: Keys help React identify which items have changed, been added, or removed. They give list items a stable identity across re-renders. Without keys, React uses index by default, which can cause bugs when items are reordered, added, or deleted. Keys enable efficient reconciliation - React can reuse DOM elements instead of recreating them, improving performance and preserving component state.

### Question 2: Why shouldn't you use array index as a key?
**Answer**: Using index as key causes issues when the list order changes. If you delete the first item, all subsequent items shift indices, causing React to think they're different items. This can lead to: (1) Wrong component state being preserved, (2) Performance issues from unnecessary re-renders, (3) Form inputs showing wrong values. Use stable, unique identifiers like database IDs instead. Index is only acceptable for static lists that never change.

### Question 3: What makes a good key?
**Answer**: A good key is: (1) Unique among siblings (not necessarily globally unique), (2) Stable - doesn't change between renders, (3) Predictable - same item always has same key. Good examples: database IDs, UUIDs, or unique property combinations. Bad examples: array indices (for dynamic lists), Math.random(), Date.now(), or any value that changes. If data doesn't have IDs, generate them when creating the data, not during rendering.

### Question 4: How do you handle lists without unique IDs?
**Answer**: Options: (1) Generate unique IDs when creating data: `{ id: Date.now(), ...item }` or use uuid library, (2) Use a combination of unique properties as a composite key: `key={`${item.name}-${item.date}`}`, (3) For truly static lists only, index is acceptable. Never use Math.random() as it changes every render. Store generated IDs in state to keep them stable across re-renders.

### Question 5: Can you use the same key for different lists?
**Answer**: Yes, keys only need to be unique among siblings, not globally. Different lists can use the same key values. Example: Two separate lists can both have items with key="1". Keys are scoped to their immediate parent. However, within the same parent, all siblings must have unique keys to avoid conflicts.

### Question 6: What happens if keys are not unique?
**Answer**: Non-unique keys cause unpredictable behavior: (1) React can't properly track which items changed, (2) Component state may be applied to wrong items, (3) Performance degradation from unnecessary re-renders, (4) React shows console warnings. In some cases, only one item with duplicate key may render. Always ensure keys are unique among siblings.

### Question 7: Where should the key prop be placed?
**Answer**: The key should be on the outermost element returned by map(), not on child elements. Correct: `{items.map(item => <Component key={item.id} />)}`. Wrong: `{items.map(item => <div><Component key={item.id} /></div>)}` (key should be on div). When extracting a component, the key moves to the component call, not inside the component's JSX.

### Question 8: How do you efficiently update large lists?
**Answer**: Strategies: (1) Use proper keys so React reuses DOM nodes, (2) Implement virtualization (react-window, react-virtualized) for very long lists, (3) Use React.memo on list item components to prevent unnecessary re-renders, (4) Filter/sort data before mapping, not during render, (5) Use pagination or infinite scroll, (6) Memoize expensive computations with useMemo, (7) Debounce search/filter inputs to reduce re-renders.

## Resources

- [Rendering Lists](https://react.dev/learn/rendering-lists)
- [Keys in React](https://react.dev/learn/rendering-lists#keeping-list-items-in-order-with-key)
- [Reconciliation](https://react.dev/learn/preserving-and-resetting-state)
- [Index as Key Anti-Pattern](https://robinpokorny.com/blog/index-as-a-key-is-an-anti-pattern/)
- [UUID Library](https://www.npmjs.com/package/uuid)
