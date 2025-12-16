# Touchables & Events - Handling User Interactions

## What You'll Learn

- TouchableOpacity
- TouchableHighlight
- Pressable (modern approach)
- Gesture handling
- Touch events

## Concept Overview

React Native provides several touchable components for handling user interactions.

### TouchableOpacity

```javascript
import { TouchableOpacity, Text } from 'react-native';

<TouchableOpacity
  onPress={() => console.log('Pressed')}
  activeOpacity={0.7}
>
  <Text>Press Me</Text>
</TouchableOpacity>
```

### Pressable (Recommended)

```javascript
import { Pressable } from 'react-native';

<Pressable
  onPress={() => console.log('Pressed')}
  style={({ pressed }) => [
    styles.button,
    pressed && styles.pressed
  ]}
>
  <Text>Press Me</Text>
</Pressable>
```

## Your Tasks

Build interactive components with various touch handlers and feedback.
