# Setup & Hello World - Your First React Native App

## What You'll Learn

- Install React Native development tools
- Create your first React Native app
- Run app on emulator/simulator
- Understand project structure
- Make basic modifications

## Concept Overview

React Native lets you build mobile apps using JavaScript and React. Your code compiles to native iOS and Android components.

### Two Setup Options

**Option 1: Expo (Recommended for Beginners)**
- Easier setup
- No Xcode/Android Studio initially needed
- Great for learning
- Limited native module access

**Option 2: React Native CLI**
- Full native access
- More configuration required
- Production-ready from start

## Setup Instructions

### Option 1: Expo Setup

```bash
# Install Expo CLI
npm install -g expo-cli

# Create new project
expo init MyFirstApp

# Choose "blank" template

# Navigate to project
cd MyFirstApp

# Start development server
expo start
```

Install Expo Go app on your phone, scan QR code to see your app!

### Option 2: React Native CLI Setup

**Prerequisites:**
- Node.js 14+
- JDK 11+
- Android Studio (for Android)
- Xcode (for iOS - macOS only)

```bash
# Create new project
npx react-native init MyFirstApp

# Navigate to project
cd MyFirstApp

# Run on Android
npx react-native run-android

# Run on iOS (macOS only)
npx react-native run-ios
```

## Project Structure

```
MyFirstApp/
├── App.js              # Main component
├── package.json        # Dependencies
├── node_modules/       # Installed packages
├── android/           # Android native code
├── ios/               # iOS native code (macOS only)
└── index.js           # App entry point
```

## Your First Component

```javascript
// App.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Hello, React Native!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
});
```

## Your Tasks

### Task 1: Setup Environment
Set up React Native using Expo or CLI. Successfully run the default app.

### Task 2: Hello World
Modify App.js to display "Hello, World!" in the center of the screen.

### Task 3: Personal Greeting
Display your name with a greeting: "Hello, I'm [Your Name]"

### Task 4: Multiple Text Elements
Create an app with:
- Title: "My First App"
- Subtitle: "Built with React Native"
- Footer: "By [Your Name]"

### Task 5: Styling Practice
Style your text with:
- Different font sizes
- Different colors
- Different font weights (bold, normal)

### Task 6: Background Color
Change the background color of the main View to:
- Light blue
- Add padding

### Task 7: Multiple Views
Create nested Views with different background colors

### Task 8: Welcome Screen
Build a simple welcome screen with:
- App title
- Welcome message
- Version number
- Your name as developer

## Expected Output

**Task 2:**
```
Hello, World!
```
(Centered on screen)

**Task 4:**
```
My First App
Built with React Native
By John Doe
```

## Tips

- Save files to see changes with Hot Reload
- Shake device/emulator for developer menu
- Use `console.log()` for debugging (shows in terminal)
- Check terminal for error messages
- React Native uses components, not HTML elements

## Common Errors

```javascript
// ❌ Wrong - Can't use HTML elements
<div>Hello</div>

// ✅ Correct - Use React Native components
<View><Text>Hello</Text></View>

// ❌ Wrong - Text must be in <Text> component
<View>Hello</View>

// ✅ Correct
<View><Text>Hello</Text></View>
```

## Development Tools

- **Hot Reload**: Changes appear instantly
- **Developer Menu**: Shake device or Cmd+D (iOS) / Cmd+M (Android)
- **React DevTools**: Inspect component hierarchy
- **Debugger**: Chrome DevTools for debugging

## Troubleshooting

**App won't run:**
- Clear cache: `npx react-native start --reset-cache`
- Reinstall dependencies: `rm -rf node_modules && npm install`

**Metro bundler issues:**
- Close and restart Metro: Ctrl+C then `npx react-native start`

**Emulator not starting:**
- Check Android Studio AVD Manager or Xcode Simulator

## Next Steps

Once you complete these tasks, move on to `02-Core-Components` to learn about React Native's built-in components!
