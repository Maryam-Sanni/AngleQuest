import React from 'react';
import { View, TextInput, StyleSheet, Dimensions } from 'react-native';
import RoomList from './RoomList';
import Room from './Room';

// Assuming you're using Expo's Dimensions API to make the component responsive
const { height } = Dimensions.get('window');

const ChatScopeUI = () => {
    return (
        <View style={styles.container}>
            <View style={styles.sidebar}>
                <TextInput 
                    style={styles.search}
                    placeholder="Search..." 
                    placeholderTextColor="#888" 
                />
                <RoomList />
            </View>
            <Room style={styles.room} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        height: height,
    },
    sidebar: {
        width: '25%',
        backgroundColor: '#f0f0f0', // Example background color
        padding: 10,
    },
    search: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        paddingLeft: 10,
        marginBottom: 10,
    },
    room: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 10,
    },
});

export default ChatScopeUI;
