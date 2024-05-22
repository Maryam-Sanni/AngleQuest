import React from 'react';
import { View, StyleSheet, ScrollView, ImageBackground } from 'react-native';
import ChatListScreen from '../components/ExpertsChatListScreen';  
import ChatScreen from '../components/expertsChatScreen'; 
import Sidebar from '../components/expertssidebar';
import Topbar from '../components/expertstopbar';
import { BlurView } from 'expo-blur';

function MainScreen() {
  
  return (
    <View style={{ flex: 1 }}>
      <Topbar />
      <View style={styles.container}>
        <Sidebar />
        <View style={styles.contentContainer}>
          <ScrollView contentContainerStyle={styles.scrollViewContent}>
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
    justifyContent: 'space-between',
  },
  contentContainer: {
    flex: 1,
    marginLeft: 210,
    flexDirection: 'row',
  
  },
  scrollViewContent: {
    flexGrow: 1,
    maxHeight: 500,
    backgroundColor: 'none'
  },
  chatListContainer: {
    flex: 1, 
    borderRightWidth: 1, 
    borderRightColor: '#CCCCCC',
  },
  chatScreenContainer: {
    width: '60%',
  },
  profileContainer: {
    width: 210,
    borderLeftWidth: 1,
    borderLeftColor: '#CCCCCC',
    justifyContent: 'flex-start',
  },
  greenBox: {
    width: "100%",
     height:"100%",
     backgroundColor: 'rgba(225,225,212,0.3)',
   },
   blurBackground: {
     flex: 1, 
    },
});

export default MainScreen;
