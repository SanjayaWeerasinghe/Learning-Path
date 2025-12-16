# Forms & Input - Handling User Input

## What You'll Learn

- TextInput component
- Handling input state
- Keyboard types
- Input validation
- Form submission

## Concept Overview

TextInput is the core component for user text entry. Combined with state management, you can build powerful forms.

### Basic TextInput

```javascript
import React, { useState } from 'react';
import { View, TextInput, Text } from 'react-native';

export default function App() {
  const [text, setText] = useState('');

  return (
    <View>
      <TextInput
        style={{ height: 40, borderWidth: 1, padding: 10 }}
        onChangeText={setText}
        value={text}
        placeholder="Enter text"
      />
      <Text>You typed: {text}</Text>
    </View>
  );
}
```

### Keyboard Types

```javascript
// Email keyboard
<TextInput
  keyboardType="email-address"
  autoCapitalize="none"
/>

// Number keyboard
<TextInput
  keyboardType="numeric"
/>

// Phone keyboard
<TextInput
  keyboardType="phone-pad"
/>

// Decimal keyboard
<TextInput
  keyboardType="decimal-pad"
/>

// URL keyboard
<TextInput
  keyboardType="url"
  autoCapitalize="none"
/>
```

### Input Types

```javascript
// Password input
<TextInput
  secureTextEntry={true}
  autoCapitalize="none"
/>

// Multiline text
<TextInput
  multiline={true}
  numberOfLines={4}
/>

// Auto-complete off
<TextInput
  autoComplete="off"
  autoCorrect={false}
/>
```

## Complete Form Example

```javascript
import React, { useState } from 'react';
import {
  View,
  TextInput,
  Button,
  Text,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};

    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validate()) {
      Alert.alert('Success', `Logged in as ${email}`);
      // Submit to API
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <View style={styles.form}>
        <Text style={styles.title}>Login</Text>

        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        {errors.email && <Text style={styles.error}>{errors.email}</Text>}

        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={true}
        />
        {errors.password && <Text style={styles.error}>{errors.password}</Text>}

        <Button title="Login" onPress={handleSubmit} />
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#f5f5f5',
  },
  form: {
    margin: 20,
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 10,
    fontSize: 16,
  },
  error: {
    color: 'red',
    fontSize: 12,
    marginBottom: 10,
  },
});
```

## Your Tasks

### Task 1: Simple Input
Create a single TextInput that displays the typed text below it in real-time.

### Task 2: Name Form
Build a form with:
- First name input
- Last name input
- Display full name below

### Task 3: Number Input
Create a number input that only accepts numbers and displays the value doubled.

### Task 4: Password Validator
Build a password input with:
- Show/hide password toggle
- Validation: min 8 characters, 1 uppercase, 1 number
- Visual feedback (green/red)

### Task 5: Email Validator
Create an email input with:
- Email keyboard
- Email format validation
- Error message display

### Task 6: Registration Form
Build a complete registration form:
- Username
- Email
- Password
- Confirm Password
- Submit button
- Validation for all fields

### Task 7: Search Bar
Create a search bar that filters a list as you type.

### Task 8: Multi-line Notes
Create a notes app with:
- Multiline TextInput (4+ lines)
- Character counter
- Save button

## TextInput Props

```javascript
<TextInput
  // Value
  value={text}
  onChangeText={setText}

  // Placeholder
  placeholder="Enter text"
  placeholderTextColor="#999"

  // Keyboard
  keyboardType="default"  // email-address, numeric, phone-pad, etc.
  returnKeyType="done"    // done, go, next, search, send

  // Behavior
  autoFocus={true}
  autoCapitalize="none"   // none, sentences, words, characters
  autoCorrect={false}

  // Security
  secureTextEntry={true}

  // Multiline
  multiline={true}
  numberOfLines={4}

  // Events
  onFocus={() => {}}
  onBlur={() => {}}
  onSubmitEditing={() => {}}

  // Styling
  style={styles.input}
  maxLength={50}
/>
```

## Validation Patterns

```javascript
// Email
const isValidEmail = (email) => /\S+@\S+\.\S+/.test(email);

// Phone (US)
const isValidPhone = (phone) => /^[\d]{10}$/.test(phone);

// Password (8+ chars, 1 uppercase, 1 number)
const isValidPassword = (pwd) =>
  /^(?=.*[A-Z])(?=.*\d).{8,}$/.test(pwd);

// URL
const isValidURL = (url) =>
  /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([\/\w .-]*)*\/?$/.test(url);
```

## Keyboard Handling

```javascript
import { Keyboard } from 'react-native';

// Dismiss keyboard
Keyboard.dismiss();

// Listen to keyboard events
useEffect(() => {
  const showListener = Keyboard.addListener('keyboardDidShow', () => {
    console.log('Keyboard shown');
  });
  const hideListener = Keyboard.addListener('keyboardDidHide', () => {
    console.log('Keyboard hidden');
  });

  return () => {
    showListener.remove();
    hideListener.remove();
  };
}, []);
```

## Tips

- Always use controlled components (value + onChangeText)
- Use KeyboardAvoidingView for forms
- Validate on submit, not on every keystroke (better UX)
- Use appropriate keyboard types
- Provide clear error messages
- Use ref for focusing next input

## Next Steps

Move to `06-Navigation-Basics` to learn about navigating between screens!
