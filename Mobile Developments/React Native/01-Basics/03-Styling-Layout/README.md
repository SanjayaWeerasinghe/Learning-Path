# Styling & Layout - Making Apps Beautiful

## What You'll Learn

- StyleSheet API
- Flexbox layout
- Dimensions and positioning
- Common style properties
- Responsive design basics

## Concept Overview

React Native uses JavaScript objects for styling, similar to CSS but with camelCase property names. Layout is primarily done with Flexbox.

### StyleSheet API

```javascript
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 16,
    color: '#333',
  },
});

// Usage
<View style={styles.container}>
  <Text style={styles.text}>Styled Text</Text>
</View>
```

### Flexbox Basics

```javascript
// Default: flexDirection is 'column' (vertical)
<View style={{ flex: 1, flexDirection: 'column' }}>
  <View style={{ flex: 1, backgroundColor: 'red' }} />
  <View style={{ flex: 2, backgroundColor: 'blue' }} />
</View>

// Horizontal layout
<View style={{ flexDirection: 'row' }}>
  <View style={{ flex: 1, backgroundColor: 'red' }} />
  <View style={{ flex: 1, backgroundColor: 'blue' }} />
</View>
```

### Alignment Properties

```javascript
const styles = StyleSheet.create({
  // Center everything
  centered: {
    flex: 1,
    justifyContent: 'center',  // Vertical centering
    alignItems: 'center',       // Horizontal centering
  },

  // Space between items
  spaceBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  // Align to bottom
  bottomAlign: {
    flex: 1,
    justifyContent: 'flex-end',
  },
});
```

### Common Style Properties

```javascript
const styles = StyleSheet.create({
  box: {
    // Dimensions
    width: 100,
    height: 100,

    // Spacing
    padding: 10,
    margin: 20,
    paddingHorizontal: 15,
    marginVertical: 10,

    // Colors
    backgroundColor: '#f0f0f0',

    // Borders
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,

    // Shadows (iOS)
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    // Shadows (Android)
    elevation: 5,
  },

  text: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    lineHeight: 24,
  },
});
```

### Absolute Positioning

```javascript
const styles = StyleSheet.create({
  absolute: {
    position: 'absolute',
    top: 20,
    right: 20,
  },

  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
});
```

## Complete Example

```javascript
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>My App</Text>
      </View>

      {/* Main Content */}
      <View style={styles.content}>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Card Title</Text>
          <Text style={styles.cardText}>Card content goes here</Text>
        </View>
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>Footer</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    height: 60,
    backgroundColor: '#6200ee',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 20,
    color: '#fff',
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  cardText: {
    fontSize: 14,
    color: '#666',
  },
  footer: {
    height: 50,
    backgroundColor: '#333',
    justifyContent: 'center',
    alignItems: 'center',
  },
  footerText: {
    color: '#fff',
  },
});
```

## Your Tasks

### Task 1: Centered Box
Create a colored box (200x200) centered on the screen.

### Task 2: Header-Footer Layout
Build a layout with:
- Fixed header (60px height)
- Scrollable content area
- Fixed footer (50px height)

### Task 3: Three Column Layout
Create three equal-width columns side by side.

### Task 4: Card Component
Design a card with:
- Shadow
- Rounded corners
- Padding
- Title and description

### Task 5: Navigation Bar
Create a horizontal nav bar with 4 equally-spaced icons/buttons.

### Task 6: Profile Screen
Build a profile screen:
- Avatar centered at top
- Name below avatar
- Stats in a row (followers, following, posts)
- Bio text

### Task 7: Grid Layout
Create a 2x3 grid of colored boxes.

### Task 8: Responsive Design
Make a layout that uses percentages and flex instead of fixed dimensions.

## Flexbox Cheat Sheet

```javascript
// Main Axis (flexDirection)
flexDirection: 'row'     // Horizontal
flexDirection: 'column'  // Vertical (default)

// Main Axis Alignment
justifyContent: 'flex-start'    // Start
justifyContent: 'center'        // Center
justifyContent: 'flex-end'      // End
justifyContent: 'space-between' // Space between
justifyContent: 'space-around'  // Space around

// Cross Axis Alignment
alignItems: 'flex-start'  // Start
alignItems: 'center'      // Center
alignItems: 'flex-end'    // End
alignItems: 'stretch'     // Stretch (default)

// Flex Properties
flex: 1  // Take remaining space
flexGrow: 1  // Grow to fill
flexShrink: 1  // Shrink if needed
```

## Tips

- Use flex instead of fixed heights when possible
- Test on both iOS and Android (shadows differ)
- Use StyleSheet.create for performance
- Combine multiple styles: `style={[styles.box, styles.red]}`
- Use Dimensions API for screen dimensions

## Next Steps

Move to `04-Lists-ScrollViews` to learn about rendering dynamic content!
