import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Text } from 'react-native';
import TopBar from '../components/expertstopbar';
import Sidebar from '../components/expertssidebar';
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

        {/* Main Chat Area */}
        <Room activeRoom={activeRoom} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flex: 1,
  },
  sidebar: {
    width: '35%',
    backgroundColor: '#f2f2f2',
    padding: 10,
    marginLeft: 210,
  },
  searchInput: {
    height: 40,
  borderRadius: 20,
    marginBottom: 10,
    paddingHorizontal: 10,
    backgroundColor: '#f7fff4',
    borderWidth: 1,
    borderColor: 'grey',
    marginLeft: 10,
  marginRight: 10,
  },
});

export default ChatScopeUI;
