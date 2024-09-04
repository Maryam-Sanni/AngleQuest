import React, { useContext, useEffect, useRef, useState } from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity, StyleSheet, Modal, Button } from 'react-native';
import { api_url, AuthContext } from './AuthProvider';

const RoomList = () => {
    const { user, token, xsrf, setActiveRoom } = useContext(AuthContext);

    const [users, setUsers] = useState([]);
    const [conversations, setConversations] = useState([]);
    const [isModalVisible, setModalVisible] = useState(false);

    const getUserChatrooms = () => {
        fetch(`${api_url}chat/my-memberships`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Accept': 'application/json'
            },
        })
        .then(res => res.json())
        .then(res => {
            if (res?.status === 'success') {
                setConversations(res?.memberships);
            }
        })
        .catch(err => console.log(err));
    };

    const getOtherUsers = () => {
        fetch(`${api_url}chat/otherUsers`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Accept': 'application/json'
            },
        })
        .then(res => res.json())
        .then(res => {
            if (res?.status === 'success') {
                setUsers(res?.users);
            }
        })
        .catch(err => console.log(err));
    };

    useEffect(() => {
        getOtherUsers();
        getUserChatrooms();
    }, []);

    const startNewConversation = (userID) => {
        const formData = new FormData();
        formData.append('type', 'individual');
        formData.append('receiver_id', userID);

        fetch(`${api_url}chat/make-a-room`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Accept': 'application/json',
                'X-CSRF-TOKEN': xsrf
            },
            body: formData
        })
        .then(res => res.json())
        .then(res => {
            if (res?.status === 'success') {
                setActiveRoom({
                    id: res?.room?.id,
                    name: res?.room?.displayName,
                    image: res?.room?.roomIcon
                });

                getUserChatrooms();
                setModalVisible(false);
            }
        })
        .catch(err => console.log(err));
    };

    return (
        <View style={styles.container}>
            <Button title="New Conversation" onPress={() => setModalVisible(true)} />

            <Modal
                visible={isModalVisible}
                animationType="slide"
                transparent={true}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalHeader}>
                            {user?.role === 'expert' ? 'Job Seekers' : 'Experts'}
                        </Text>

                        <ScrollView>
                            {users.map((u, i) => (
                                <TouchableOpacity
                                    key={i}
                                    style={styles.conversation}
                                    onPress={() => startNewConversation(u.id)}
                                >
                                    <Image source={{ uri: u.avatar_url }} style={styles.avatar} />
                                    <Text style={styles.conversationName}>
                                        {u.last_name} {u.first_name}
                                    </Text>
                                    <Text style={styles.conversationInfo}>
                                        @{u.username}
                                    </Text>
                                </TouchableOpacity>
                            ))}
                        </ScrollView>

                        <Button title="Cancel" onPress={() => setModalVisible(false)} />
                    </View>
                </View>
            </Modal>

            <ScrollView>
                {conversations.map((c, i) => (
                    <TouchableOpacity
                        key={i}
                        style={styles.conversation}
                        onPress={() => setActiveRoom({
                            id: c?.room?.id,
                            name: c?.room?.displayName,
                            image: c?.room?.roomIcon
                        })}
                    >
                        <Image source={{ uri: c?.room?.roomIcon }} style={styles.avatar} />
                        <Text style={styles.conversationName}>
                            {c?.room?.displayName}
                        </Text>
                        <Text style={styles.conversationInfo}>
                            {c?.room?.lastMessage}
                        </Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
    },
    conversation: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    avatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginRight: 10,
    },
    conversationName: {
        fontWeight: 'bold',
    },
    conversationInfo: {
        color: '#666',
    },
    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        marginHorizontal: 20,
    },
    modalHeader: {
        fontSize: 18,
        marginBottom: 10,
        fontWeight: 'bold',
    },
});

export default RoomList;
