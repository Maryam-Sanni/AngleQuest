// BlankScreen.js
import React from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';

const BlankScreen = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="coral" /> {/* You can customize the size and color */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white', // You can change the background color if needed
  },
});

export default BlankScreen;
