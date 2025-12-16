# React Native Fundamentals - Interview Questions & Answers

## Table of Contents
1. [What is React Native?](#what-is-react-native)
2. [Core Components](#core-components)
3. [Styling](#styling)
4. [Navigation](#navigation)
5. [State Management](#state-management)
6. [Native Modules and APIs](#native-modules-and-apis)
7. [Performance Optimization](#performance-optimization)

---

## What is React Native?

### Question
**What is React Native and how is it different from React?**

### Answer
React Native is a framework for building native mobile applications using React and JavaScript. It allows you to write code once and deploy to both iOS and Android.

**Key Differences from React:**
- Uses native components instead of web components
- No DOM, uses native UI
- Different styling approach
- Platform-specific APIs
- Requires native build tools (Xcode, Android Studio)

### Better Explanation

**React vs React Native:**
```javascript
// React (Web)
import React from 'react';

function App() {
  return (
    <div className="container">
      <h1>Hello World</h1>
      <button onClick={handleClick}>Click me</button>
      <img src="image.png" alt="Image" />
    </div>
  );
}

// React Native (Mobile)
import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';

function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Hello World</Text>
      <TouchableOpacity onPress={handleClick}>
        <Text>Click me</Text>
      </TouchableOpacity>
      <Image source={require('./image.png')} style={styles.image} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold'
  },
  image: {
    width: 200,
    height: 200
  }
});
```

**Advantages:**
- Cross-platform (iOS & Android)
- Reusable code (~70-90%)
- Fast development with hot reload
- Large ecosystem and community
- Native performance

**Disadvantages:**
- Larger app size than native
- Sometimes need native code
- Platform-specific bugs
- Requires native build setup

---

## Core Components

### Question
**What are the essential React Native components?**

### Answer

**View - Container Component:**
```javascript
import { View, StyleSheet } from 'react-native';

function Card() {
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        {/* Header content */}
      </View>
      <View style={styles.body}>
        {/* Body content */}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    margin: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5 // Android shadow
  },
  header: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingBottom: 10
  },
  body: {
    paddingTop: 10
  }
});
```

**Text - Text Display:**
```javascript
import { Text, StyleSheet } from 'react-native';

function TextExamples() {
  return (
    <>
      <Text style={styles.title}>Title</Text>
      <Text style={styles.subtitle}>Subtitle</Text>
      <Text style={styles.body}>
        Body text with <Text style={styles.bold}>bold</Text> parts
      </Text>
      <Text numberOfLines={2} ellipsizeMode="tail">
        This is a long text that will be truncated after 2 lines...
      </Text>
    </>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333'
  },
  subtitle: {
    fontSize: 18,
    color: '#666'
  },
  body: {
    fontSize: 14,
    lineHeight: 20
  },
  bold: {
    fontWeight: 'bold'
  }
});
```

**TouchableOpacity - Buttons:**
```javascript
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

function Button({ title, onPress, variant = 'primary' }) {
  return (
    <TouchableOpacity
      style={[styles.button, styles[variant]]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center'
  },
  primary: {
    backgroundColor: '#007AFF'
  },
  secondary: {
    backgroundColor: '#6c757d'
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600'
  }
});
```

**ScrollView - Scrollable Content:**
```javascript
import { ScrollView, View, Text } from 'react-native';

function ScrollableList() {
  return (
    <ScrollView
      style={styles.scrollView}
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      {items.map(item => (
        <View key={item.id} style={styles.item}>
          <Text>{item.title}</Text>
        </View>
      ))}
    </ScrollView>
  );
}
```

**FlatList - Efficient Lists:**
```javascript
import { FlatList, View, Text, StyleSheet } from 'react-native';

function UserList({ users }) {
  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.email}>{item.email}</Text>
    </View>
  );

  return (
    <FlatList
      data={users}
      renderItem={renderItem}
      keyExtractor={item => item.id.toString()}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
      ListEmptyComponent={() => (
        <Text style={styles.empty}>No users found</Text>
      )}
      refreshing={loading}
      onRefresh={fetchUsers}
      onEndReached={loadMore}
      onEndReachedThreshold={0.5}
    />
  );
}

const styles = StyleSheet.create({
  item: {
    padding: 16,
    backgroundColor: 'white'
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold'
  },
  email: {
    fontSize: 14,
    color: '#666'
  },
  separator: {
    height: 1,
    backgroundColor: '#e0e0e0'
  },
  empty: {
    textAlign: 'center',
    padding: 20,
    color: '#999'
  }
});
```

**TextInput - User Input:**
```javascript
import { TextInput, View, StyleSheet } from 'react-native';

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <View>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        autoCorrect={false}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginBottom: 16
  }
});
```

**Image - Display Images:**
```javascript
import { Image, StyleSheet } from 'react-native';

function ImageExamples() {
  return (
    <>
      {/* Local image */}
      <Image
        source={require('./assets/logo.png')}
        style={styles.logo}
      />

      {/* Remote image */}
      <Image
        source={{ uri: 'https://example.com/image.jpg' }}
        style={styles.photo}
        resizeMode="cover"
      />

      {/* With loading indicator */}
      <Image
        source={{ uri: 'https://example.com/image.jpg' }}
        style={styles.photo}
        loadingIndicatorSource={require('./assets/placeholder.png')}
      />
    </>
  );
}

const styles = StyleSheet.create({
  logo: {
    width: 100,
    height: 100
  },
  photo: {
    width: '100%',
    height: 200,
    borderRadius: 8
  }
});
```

---

## Styling

### Question
**How do you style React Native components?**

### Answer

**StyleSheet API:**
```javascript
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5'
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10
  }
});
```

**Flexbox Layout:**
```javascript
const styles = StyleSheet.create({
  // Vertical layout (default)
  column: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',  // Vertical alignment
    alignItems: 'center'       // Horizontal alignment
  },

  // Horizontal layout
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },

  // Flexible sizing
  flexItem: {
    flex: 1  // Takes available space
  },

  // Fixed sizing
  fixedItem: {
    width: 100,
    height: 100
  },

  // Percentage sizing
  percentItem: {
    width: '80%',
    height: '50%'
  }
});
```

**Conditional Styling:**
```javascript
function Button({ primary, disabled }) {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        primary && styles.primaryButton,
        disabled && styles.disabledButton
      ]}
      disabled={disabled}
    >
      <Text>Click me</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    padding: 12,
    borderRadius: 8
  },
  primaryButton: {
    backgroundColor: '#007AFF'
  },
  disabledButton: {
    opacity: 0.5
  }
});
```

**Platform-Specific Styling:**
```javascript
import { Platform, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84
      },
      android: {
        elevation: 5
      }
    })
  },

  // Alternative approach
  text: {
    fontSize: Platform.OS === 'ios' ? 16 : 14,
    fontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto'
  }
});
```

---

## Navigation

### Question
**How do you implement navigation in React Native?**

### Answer

**React Navigation (Most Popular):**

**Stack Navigation:**
```javascript
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: 'Home' }}
        />
        <Stack.Screen
          name="Profile"
          component={ProfileScreen}
          options={{  header}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function HomeScreen({ navigation }) {
  return (
    <View>
      <Button
        title="Go to Profile"
        onPress={() => navigation.navigate('Profile', { userId: 123 })}
      />
    </View>
  );
}

function ProfileScreen({ route, navigation }) {
  const { userId } = route.params;

  return (
    <View>
      <Text>User ID: {userId}</Text>
      <Button title="Go Back" onPress={() => navigation.goBack()} />
    </View>
  );
}
```

**Tab Navigation:**
```javascript
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';

const Tab = createBottomTabNavigator();

function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'person' : 'person-outline';
          }

          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#007AFF',
        tabBarInactiveTintColor: 'gray'
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}
```

**Drawer Navigation:**
```javascript
import { createDrawerNavigator } from '@react-navigation/drawer';

const Drawer = createDrawerNavigator();

function DrawerNavigator() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Home" component={HomeScreen} />
      <Drawer.Screen name="Settings" component={SettingsScreen} />
    </Drawer.Navigator>
  );
}
```

---

## State Management

### Question
**How do you manage state in React Native?**

### Answer

**Context API (Built-in):**
```javascript
import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const login = async (email, password) => {
    const userData = await loginAPI(email, password);
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}

// Usage
function LoginScreen() {
  const { login } = useAuth();

  const handleLogin = async () => {
    await login(email, password);
  };

  return <Button onPress={handleLogin} title="Login" />;
}
```

**Redux Toolkit (For Complex State):**
```javascript
import { configureStore, createSlice } from '@reduxjs/toolkit';
import { Provider, useDispatch, useSelector } from 'react-redux';

// Slice
const userSlice = createSlice({
  name: 'user',
  initialState: { profile: null, loading: false },
  reducers: {
    setUser: (state, action) => {
      state.profile = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    }
  }
});

export const { setUser, setLoading } = userSlice.actions;

// Store
const store = configureStore({
  reducer: {
    user: userSlice.reducer
  }
});

// App
function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        {/* Routes */}
      </NavigationContainer>
    </Provider>
  );
}

// Component
function ProfileScreen() {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user.profile);

  useEffect(() => {
    dispatch(setLoading(true));
    fetchUser().then(data => {
      dispatch(setUser(data));
      dispatch(setLoading(false));
    });
  }, []);

  return <Text>{user?.name}</Text>;
}
```

---

## Native Modules and APIs

### Question
**How do you access native features in React Native?**

### Answer

**Common Native APIs:**
```javascript
// Alert
import { Alert } from 'react-native';

Alert.alert(
  'Title',
  'Message',
  [
    { text: 'Cancel', style: 'cancel' },
    { text: 'OK', onPress: () => console.log('OK') }
  ]
);

// AsyncStorage (Persistent Storage)
import AsyncStorage from '@react-native-async-storage/async-storage';

// Store data
await AsyncStorage.setItem('@user', JSON.stringify(userData));

// Retrieve data
const value = await AsyncStorage.getItem('@user');
const user = JSON.parse(value);

// Camera
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';

const result = await launchCamera({ mediaType: 'photo' });
const photo = result.assets[0];

// Permissions
import { PermissionsAndroid, Platform } from 'react-native';

async function requestCameraPermission() {
  if (Platform.OS === 'android') {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.CAMERA
    );
    return granted === PermissionsAndroid.RESULTS.GRANTED;
  }
  return true; // iOS handles in Info.plist
}

// Geolocation
import Geolocation from '@react-native-community/geolocation';

Geolocation.getCurrentPosition(
  position => {
    const { latitude, longitude } = position.coords;
  },
  error => console.error(error),
  { enableHighAccuracy: true }
);
```

---

## Performance Optimization

### Question
**How do you optimize React Native app performance?**

### Answer

**1. FlatList Optimization:**
```javascript
<FlatList
  data={items}
  renderItem={renderItem}
  keyExtractor={item => item.id}
  // Performance props
  removeClippedSubviews={true}
  maxToRenderPerBatch={10}
  updateCellsBatchingPeriod={50}
  initialNumToRender={10}
  windowSize={10}
  getItemLayout={(data, index) => ({
    length: ITEM_HEIGHT,
    offset: ITEM_HEIGHT * index,
    index
  })}
/>
```

**2. Memoization:**
```javascript
import React, { memo, useMemo, useCallback } from 'react';

const ListItem = memo(({ item, onPress }) => (
  <TouchableOpacity onPress={() => onPress(item.id)}>
    <Text>{item.title}</Text>
  </TouchableOpacity>
));

function List({ items }) {
  const handlePress = useCallback((id) => {
    console.log('Pressed:', id);
  }, []);

  const sortedItems = useMemo(() => {
    return items.sort((a, b) => a.title.localeCompare(b.title));
  }, [items]);

  return (
    <FlatList
      data={sortedItems}
      renderItem={({ item }) => (
        <ListItem item={item} onPress={handlePress} />
      )}
    />
  );
}
```

**3. Image Optimization:**
```javascript
import FastImage from 'react-native-fast-image';

<FastImage
  style={styles.image}
  source={{
    uri: 'https://example.com/image.jpg',
    priority: FastImage.priority.normal,
    cache: FastImage.cacheControl.immutable
  }}
  resizeMode={FastImage.resizeMode.cover}
/>
```

---

## Key Takeaways for Jeneva Interview

### React Native Priorities:
1. **Core components**: View, Text, FlatList, TouchableOpacity
2. **Navigation**: React Navigation setup
3. **Styling**: Flexbox, StyleSheet, platform differences
4. **State management**: Context API, Redux basics
5. **Native features**: AsyncStorage, permissions, camera

### Common Questions:
- Difference between React and React Native
- How to handle navigation
- Performance optimization techniques
- Styling best practices
- Platform-specific code

### Demonstrate:
- Experience building mobile apps
- Understanding of native components
- Navigation implementation
- Performance awareness
- Cross-platform development
