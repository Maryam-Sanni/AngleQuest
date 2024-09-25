import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Text } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import TopBar from '../components/topbar';
import Sidebar from '../components/sidebar';
import RoomList from './RoomList';
import Room from './Room';

const ChatScopeUI = () => {
  const [activeRoom, setActiveRoom] = useState(null);

  const rooms = [
    { id: 1, name: 'Room 1' },
    { id: 2, name: 'Room 2' },
    { id: 3, name: 'Room 3' },
  ];

  const selectRoom = (room) => {
    setActiveRoom(room);  // Set the selected room
  };

  return (
    <SafeAreaProvider> 
    <View style={{ flex: 1 }}>
      <TopBar />
      <View style={styles.container}>
        <Sidebar />

        {/* Room List Sidebar */}
        <View style={styles.sidebar}>
          <Text style={{fontSize: 24, fontWeight: 'bold', marginBottom: 20, marginTop: 10, marginLeft: 10}}>Chats</Text>
          <TextInput
            placeholder="Search..."
            style={styles.searchInput}
          />
          <RoomList rooms={rooms} selectRoom={selectRoom} />
        </View>

         <View style={{ flex: 1}}>
        <Room activeRoom={activeRoom} />
         </View>
         </View>

    </View>
       </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flex: 1,
  },
  sidebar: {
    width: '35%',
    backgroundColor: 'white',
    padding: 10,
    marginLeft: 210,
  },
  searchInput: {
    height: 40,
borderRadius: 10,
    marginBottom: 10,
    paddingHorizontal: 10,
    backgroundColor: '#F6F6F6',
    marginLeft: 10,
  marginRight: 10,
  },
});

export default ChatScopeUI;
