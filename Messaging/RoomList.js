import React, { useContext, useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet, Modal, Button, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { api_url, AuthContext } from './AuthProvider';

const RoomList = ({ selectRoom }) => {
    const { setActiveRoom, user, xsrf } = useContext(AuthContext);
    const [token, setToken] = useState(null);  // New state for storing the token
    const [users, setUsers] = useState([]);
    const [conversations, setConversations] = useState([]);
    const [isModalVisible, setModalVisible] = useState(false);

    const ico = 'https://chatscope.io/storybook/react/assets/emily-xzL8sDL2.svg';

    // Function to retrieve token from AsyncStorage
    const getToken = async () => {
        try {
            const storedToken = await AsyncStorage.getItem('token');
            if (storedToken) {
                setToken(storedToken);
            }
        } catch (error) {
            console.log('Error retrieving token:', error);
        }
    };

    const getUserChatrooms = async () => {
        if (!token) return;
        try {
            const res = await fetch(api_url + 'chat/my-memberships', {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Accept': 'application/json',
                },
            });
            const data = await res.json();
            if (data?.status === 'success') {
                setConversations(data?.memberships);
            }
        } catch (err) {
            console.log(err);
        }
    };

    const getOtherUsers = async () => {
        if (!token) return;
        try {
            const res = await fetch(api_url + 'chat/otherUsers', {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Accept': 'application/json',
                },
            });
            const data = await res.json();
            if (data?.status === 'success') {
                setUsers(data?.users);
            }
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        getToken(); // Retrieve token when the component is mounted
    }, []);

    useEffect(() => {
        if (token) {
            getOtherUsers();
            getUserChatrooms();
        }
    }, [token]);

    const saveRoomInfoToStorage = async (room) => {
        try {
            await AsyncStorage.setItem('selectedRoom', JSON.stringify(room));
        } catch (error) {
            console.log('Error saving room info to storage:', error);
        }
    };

    const startNewConversation = async (userID) => {
        const formData = new FormData();
        formData.append('type', 'individual');
        formData.append('receiver_id', userID);

        try {
            const res = await fetch(api_url + 'chat/make-a-room', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Accept': 'application/json',
                    'X-CSRF-TOKEN': xsrf,
                },
                body: formData,
            });
            const data = await res.json();
            if (data?.status === 'success') {
                const room = {
                    id: data?.room?.id,
                    name: data?.room?.displayName,
                    image: data?.room?.roomIcon,
                };
                selectRoom(room);
                await saveRoomInfoToStorage(room);  // Save room info to AsyncStorage
                getUserChatrooms();
                setModalVisible(false);
            }
        } catch (err) {
            console.log(err);
        }
    };

    const handleSelectRoom = (room) => {
        selectRoom(room);
        saveRoomInfoToStorage(room);  // Save selected room to AsyncStorage
    };

    return (
        <View style={styles.container}>
            <Button title="New Conversation" onPress={() => setModalVisible(true)} />

            <Modal
                visible={isModalVisible}
                transparent={true}
                animationType="slide"
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalHeader}>
                            {user?.role === 'expert' ? 'Job Seekers' : 'Experts'}
                        </Text>
                        <FlatList
                            data={users}
                            keyExtractor={(item) => item.id.toString()}
                            renderItem={({ item }) => (
                                <TouchableOpacity
                                    style={styles.conversation}
                                    onPress={() => startNewConversation(item.id)}
                                >
                                    <Image
                                        source={{ uri: item.avatar_url || ico }}
                                        style={styles.avatar}
                                    />
                                    <View style={styles.conversationInfo}>
                                        <Text style={styles.conversationName}>
                                            {item.last_name} {item.first_name}
                                        </Text>
                                        <Text style={styles.conversationUsername}>
                                            @{item.username}
                                        </Text>
                                    </View>
                                </TouchableOpacity>
                            )}
                        />
                        <Button title="Cancel" onPress={() => setModalVisible(false)} />
                    </View>
                </View>
            </Modal>

            <FlatList
                data={conversations}
                keyExtractor={(item) => item?.room?.id.toString()}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={styles.conversation}
                        onPress={() => handleSelectRoom({
                            id: item?.room?.id,
                            name: item?.room?.displayName,
                            image: item?.room?.roomIcon,
                        })}
                    >
                        <Image
                            source={{ uri: item?.room?.roomIcon || ico }}
                            style={styles.avatar}
                        />
                        <View style={styles.conversationInfo}>
                            <Text style={styles.conversationName}>
                                {item?.room?.displayName}
                            </Text>
                            <Text style={styles.conversationLastMessage}>
                                {item?.room?.lastMessage}
                            </Text>
                        </View>
                    </TouchableOpacity>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        width: '80%',
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 20,
        alignItems: 'center',
    },
    modalHeader: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    conversation: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
    },
    avatar: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 10,
    },
    conversationInfo: {
        flex: 1,
    },
    conversationName: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    conversationUsername: {
        color: 'gray',
    },
    conversationLastMessage: {
        color: 'gray',
    },
});

export default RoomList;
