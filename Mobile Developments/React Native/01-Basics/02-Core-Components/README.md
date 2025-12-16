# Core Components - Building Blocks of React Native

## What You'll Learn

- View - Container component
- Text - Display text
- Image - Display images
- Button - Basic button
- ScrollView - Scrollable container
- SafeAreaView - Respect device safe areas

## Concept Overview

React Native provides platform-agnostic components that compile to native widgets. Instead of HTML elements, you use React Native components.

### View Component

The most fundamental component - like `<div>` in web development.

```javascript
import { View } from 'react-native';

<View style={{ padding: 20, backgroundColor: '#f0f0f0' }}>
  {/* Other components */}
</View>
```

### Text Component

All text must be wrapped in `<Text>`.

```javascript
import { Text } from 'react-native';

<Text style={{ fontSize: 18, color: 'blue' }}>
  Hello React Native
</Text>
```

### Image Component

Display local or remote images.

```javascript
import { Image } from 'react-native';

// Remote image
<Image
  source={{ uri: 'https://example.com/image.jpg' }}
  style={{ width: 200, height: 200 }}
/>

// Local image
<Image
  source={require('./assets/logo.png')}
  style={{ width: 100, height: 100 }}
/>
```

### Button Component

Basic button with onPress handler.

```javascript
import { Button, Alert } from 'react-native';

<Button
  title="Click Me"
  onPress={() => Alert.alert('Button Pressed!')}
  color="#841584"
/>
```

### ScrollView

Makes content scrollable.

```javascript
import { ScrollView } from 'react-native';

<ScrollView>
  <Text>Content that scrolls...</Text>
  <Text>More content...</Text>
</ScrollView>
```

### SafeAreaView

Respects device notches and system UI.

```javascript
import { SafeAreaView } from 'react-native';

<SafeAreaView style={{ flex: 1 }}>
  {/* Your content */}
</SafeAreaView>
```

## Complete Example

```javascript
import React from 'react';
import {
  SafeAreaView,
  View,
  Text,
  Image,
  Button,
  ScrollView,
  StyleSheet,
  Alert
} from 'react-native';

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <Text style={styles.title}>Core Components Demo</Text>
        </View>

        <Image
          source={{ uri: 'https://reactnative.dev/img/tiny_logo.png' }}
          style={styles.image}
        />

        <Text style={styles.description}>
          This app demonstrates React Native core components.
        </Text>

        <Button
          title="Press Me"
          onPress={() => Alert.alert('Success', 'Button pressed!')}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    padding: 20,
    backgroundColor: '#6200ee',
  },
  title: {
    fontSize: 24,
    color: '#fff',
    fontWeight: 'bold',
  },
  image: {
    width: 100,
    height: 100,
    alignSelf: 'center',
    margin: 20,
  },
  description: {
    fontSize: 16,
    padding: 20,
    textAlign: 'center',
  },
});
```

## Your Tasks

### Task 1: Profile Card
Create a profile card with:
- Profile image (use placeholder from web)
- Name as title
- Brief bio text
- "Follow" button

### Task 2: Product Display
Build a product display with:
- Product image
- Product name
- Price
- "Add to Cart" button

### Task 3: Multiple Images
Display 3 different images in a vertical ScrollView with captions under each.

### Task 4: Alert Button
Create 3 buttons that show different Alert messages when pressed.

### Task 5: Text Styles
Display the same text 5 times with different styles:
- Bold
- Italic
- Large
- Colored
- Underlined (use textDecorationLine)

### Task 6: Nested Views
Create a card layout with:
- Outer View (white background, shadow)
- Header View (colored background)
- Content View (text and image)
- Footer View (button)

### Task 7: Image Gallery
Create a scrollable gallery of 5 images from the web.

### Task 8: Safe Area Demo
Create an app using SafeAreaView that displays content at the top and bottom of the screen safely.

## Tips

- Always wrap text in `<Text>` components
- Images need explicit width and height
- Use SafeAreaView as root component for better device compatibility
- ScrollView renders all children at once (use FlatList for long lists)
- Button component is basic - use TouchableOpacity for custom buttons

## Common Patterns

```javascript
// Conditional rendering
{isLoggedIn && <Text>Welcome back!</Text>}

// Mapping arrays
{items.map((item, index) => (
  <Text key={index}>{item}</Text>
))}

// Image with fallback
<Image
  source={{ uri: imageUrl }}
  defaultSource={require('./placeholder.png')}
  style={styles.image}
/>
```

## Next Steps

Move on to `03-Styling-Layout` to learn Flexbox and advanced styling!
