import React from 'react';
import { AppRegistry, View, Text, StyleSheet } from 'react-native'; // Import core React Native components
import ChatScopeUI from "./ChatScopeUI";
import { AuthProvider } from './AuthProvider';
import { name as appName } from '../app.json';

// Define your App component using React Native components
const App = () => (
  <View style={styles.container}>
    <AuthProvider>
      <ChatScopeUI />
    </AuthProvider>
  </View>
);

// Define your styles using StyleSheet
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0', // Set your background color or other styles
  },
});

// Register the component with AppRegistry for React Native
AppRegistry.registerComponent(appName, () => App);

// Render it to web using React Native for Web
AppRegistry.runApplication(appName, {
  initialProps: {},
  rootTag: document.getElementById('root'),
});
