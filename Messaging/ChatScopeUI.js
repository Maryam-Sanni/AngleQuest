import React, { useState } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
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
    <View style={{ flex: 1 }}>
      <TopBar />
      <View style={styles.container}>
        <Sidebar />

        {/* Room List Sidebar */}
        <View style={styles.sidebar}>
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
    width: '25%',
    backgroundColor: '#f2f2f2',
    padding: 10,
    marginLeft: 210,
  },
  searchInput: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
});

export default ChatScopeUI;
