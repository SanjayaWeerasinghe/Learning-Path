# Lists & ScrollViews - Displaying Dynamic Content

## What You'll Learn

- ScrollView - Simple scrolling
- FlatList - Efficient lists
- SectionList - Grouped lists
- Key extraction
- List performance optimization

## Concept Overview

React Native provides several components for displaying scrollable content. Choose based on your data size and structure.

### ScrollView

Best for small amounts of content. Renders all children immediately.

```javascript
import { ScrollView, Text } from 'react-native';

<ScrollView>
  <Text>Item 1</Text>
  <Text>Item 2</Text>
  <Text>Item 3</Text>
</ScrollView>
```

### FlatList

Best for large lists. Only renders visible items (virtualization).

```javascript
import { FlatList, Text, View } from 'react-native';

const DATA = [
  { id: '1', title: 'Item 1' },
  { id: '2', title: 'Item 2' },
  { id: '3', title: 'Item 3' },
];

<FlatList
  data={DATA}
  renderItem={({ item }) => (
    <View>
      <Text>{item.title}</Text>
    </View>
  )}
  keyExtractor={item => item.id}
/>
```

### SectionList

For grouped/sectioned data.

```javascript
import { SectionList } from 'react-native';

const SECTIONS = [
  {
    title: 'Fruits',
    data: ['Apple', 'Banana', 'Orange'],
  },
  {
    title: 'Vegetables',
    data: ['Carrot', 'Broccoli'],
  },
];

<SectionList
  sections={SECTIONS}
  renderItem={({ item }) => <Text>{item}</Text>}
  renderSectionHeader={({ section }) => (
    <Text style={styles.header}>{section.title}</Text>
  )}
  keyExtractor={(item, index) => item + index}
/>
```

## Complete FlatList Example

```javascript
import React from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity
} from 'react-native';

const DATA = [
  { id: '1', name: 'John Doe', age: 25 },
  { id: '2', name: 'Jane Smith', age: 30 },
  { id: '3', name: 'Bob Johnson', age: 35 },
  { id: '4', name: 'Alice Williams', age: 28 },
  { id: '5', name: 'Charlie Brown', age: 32 },
];

export default function App() {
  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.item}>
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.age}>Age: {item.age}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Contact List</Text>
      <FlatList
        data={DATA}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        ItemSeparatorComponent={() => (
          <View style={styles.separator} />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    padding: 20,
    backgroundColor: '#6200ee',
    color: '#fff',
  },
  item: {
    padding: 20,
    backgroundColor: '#fff',
  },
  name: {
    fontSize: 18,
    fontWeight: '600',
  },
  age: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  separator: {
    height: 1,
    backgroundColor: '#e0e0e0',
  },
});
```

## FlatList Props

```javascript
<FlatList
  data={DATA}                          // Array of data
  renderItem={renderItem}              // How to render each item
  keyExtractor={item => item.id}       // Unique key for each item

  // Optional props
  horizontal={false}                   // Horizontal scrolling
  numColumns={2}                       // Multiple columns
  ItemSeparatorComponent={Separator}   // Between items
  ListHeaderComponent={Header}         // At the top
  ListFooterComponent={Footer}         // At the bottom
  ListEmptyComponent={Empty}           // When data is empty
  refreshing={isRefreshing}            // Pull to refresh state
  onRefresh={handleRefresh}            // Pull to refresh handler
  onEndReached={loadMore}              // Load more data
  onEndReachedThreshold={0.5}         // When to trigger loadMore
/>
```

## Your Tasks

### Task 1: Simple ScrollView
Create a ScrollView with 20 numbered boxes that scroll vertically.

### Task 2: Product List
Use FlatList to display a list of products with:
- Product name
- Price
- "Buy" button

```javascript
const products = [
  { id: '1', name: 'Laptop', price: 999 },
  { id: '2', name: 'Phone', price: 699 },
  { id: '3', name: 'Tablet', price: 499 },
];
```

### Task 3: Horizontal Scroll
Create a horizontal FlatList of image cards.

### Task 4: Two Column Grid
Display items in a 2-column grid using `numColumns`.

### Task 5: Section List
Create a SectionList for a contact list grouped by first letter:
- Section A: Alice, Andrew
- Section B: Bob, Betty
- Section C: Charlie, Carol

### Task 6: Pull to Refresh
Add pull-to-refresh functionality to a FlatList.

### Task 7: Empty State
Show a message "No items found" when the list is empty using `ListEmptyComponent`.

### Task 8: Infinite Scroll
Implement "Load More" functionality using `onEndReached`.

## Performance Tips

```javascript
// ✅ Good: Extract renderItem to avoid re-creation
const renderItem = useCallback(({ item }) => (
  <Item data={item} />
), []);

// ✅ Good: Use keyExtractor
keyExtractor={item => item.id}

// ✅ Good: Set initial render count
initialNumToRender={10}

// ✅ Good: Optimize images
<Image
  source={{ uri: url }}
  resizeMode="cover"
/>

// ❌ Bad: Inline functions (re-created on every render)
renderItem={({ item }) => <Item data={item} />}
```

## Common Patterns

```javascript
// Pull to refresh
const [refreshing, setRefreshing] = useState(false);

const onRefresh = () => {
  setRefreshing(true);
  fetchData().then(() => setRefreshing(false));
};

// Load more
const loadMore = () => {
  if (!loading) {
    fetchMoreData();
  }
};

// Empty state
<FlatList
  data={DATA}
  renderItem={renderItem}
  ListEmptyComponent={() => (
    <Text style={styles.empty}>No items found</Text>
  )}
/>

// Item separator
const ItemSeparator = () => (
  <View style={{ height: 1, backgroundColor: '#ccc' }} />
);
```

## Next Steps

Move to `05-Forms-Input` to learn about handling user input!
