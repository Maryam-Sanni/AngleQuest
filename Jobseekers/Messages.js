import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import ChatListScreen from '../components/ChatListScreen'; 
import ChatScreen from '../components/ChatScreen'; 
import Sidebar from '../components/sidebar';
import Topbar from '../components/topbar';

function MainScreen() {
  return (
    <View style={{ flex: 1  }}>
      <Topbar />
      <View style={{ flexDirection: 'row', flex: 1 }}>
        <Sidebar />
        <View style={styles.container}>
          <ScrollView contentContainerStyle={{ flexGrow: 1 }} style={styles.scrollView}>
            <View style={styles.chatListContainer}>
              <ChatListScreen />
            </View>
          </ScrollView>
          <View style={styles.chatScreenContainer}>
            <ChatScreen />
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row', 
    marginLeft: 210
  },
  scrollView: {
    width: 10,
  },
  chatListContainer: {
    flex: 1,
    borderRightWidth: 1, 
    borderRightColor: '#CCCCCC',
  },
  chatScreenContainer: {
    flex: 2, 
  },
});

export default MainScreen;