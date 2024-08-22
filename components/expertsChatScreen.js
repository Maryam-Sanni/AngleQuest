import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, Modal, TouchableWithoutFeedback, ActivityIndicator, StyleSheet } from 'react-native';
import { GiftedChat, Send, Bubble } from 'react-native-gifted-chat';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRoute } from '@react-navigation/native';
import Echo from 'laravel-echo';
import Pusher from 'pusher-js';

const ChatScreen = ({ userId: propUserId }) => {
  const route = useRoute();
  const userId = propUserId || route.params?.userId;
  const [messages, setMessages] = useState([]);
  const [isProfileVisible, setProfileVisible] = useState(false);
  const [userData, setUserData] = useState({});
  const [currentUserId, setCurrentUserId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [latestSender, setLatestSender] = useState(null);
  const [presence, setPresence] = useState({});
  const [roomId, setRoomId] = useState('40');

    useEffect(() => {
      const initializeChat = async () => {
        try {
          // const token = await AsyncStorage.getItem('token');
          // const storedRoomId = await AsyncStorage.getItem(`room_id_${userId}`);

          // if (!storedRoomId) {
          //   const roomResponse = await axios.post(
          //     'https://recruitangle.com/api/chat/make-a-room',
          //     {
          //       name: `Room with ${userId}`,
          //       slug: `${currentUserId}-${userId}`,
          //       type: 'individual',
          //     },
          //     {
          //       headers: {
          //         Authorization: `Bearer ${token}`,
          //       },
          //     }
          //   );

          //   const newRoomId = roomResponse.data.room.id;
          //   setRoomId(newRoomId);
          //   await AsyncStorage.setItem(`room_id_${userId}`, newRoomId.toString());

          //   // Add both users to the room
          //   await axios.post(
          //     'https://recruitangle.com/api/chat/add-to-room',
          //     {
          //       room_id: newRoomId,
          //       user_id: currentUserId,  // Add the current user
          //     },
          //     {
          //       headers: {
          //         Authorization: `Bearer ${token}`,
          //       },
          //     }
          //   );

          //   await axios.post(
          //     'https://recruitangle.com/api/chat/add-to-room',
          //     {
          //       room_id: newRoomId,
          //       user_id: userId,  // Add the other user
          //     },
          //     {
          //       headers: {
          //         Authorization: `Bearer ${token}`,
          //       },
          //     }
          //   );
          // } else {
          //   setRoomId(storedRoomId);
          // }

          await loadUserData();
          await loadMessages();
        } catch (error) {
          console.error('Failed to initialize chat:', error);
        } finally {
          setLoading(false);
        }
      };

    const loadUserData = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        const response = await axios.get('https://recruitangle.com/api/expert/getAllJobSeekers', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const users = response.data.allJobSeekers.reduce((acc, user) => {
          acc[user.id] = {
            name: `${user.first_name} ${user.last_name}`,
            avatar: require('../assets/account.png'),
            role: user.role,
            email: user.email,
            phone: user.phone,
            expertise: user.expertise || 'Loading...',
          };
          return acc;
        }, {});

        setUserData(users);

        const id = await AsyncStorage.getItem('user_id');
        setCurrentUserId(id);
      } catch (error) {
        console.error('Failed to load user data:', error);
      }
    };

    const loadMessages = async () => {
      try {
        setLoading(true);
        const token = await AsyncStorage.getItem('token');
        const response = await axios.get(`https://recruitangle.com/api/chat/get/${roomId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const messagesFromServer = response.data.history.map(msg => ({
          _id: msg.id,
          text: msg.text || '',
          createdAt: new Date(msg.created_at),
          user: {
            _id: msg.sender_id === currentUserId ? currentUserId : msg.sender_id,
            name: msg.senderName || 'Unknown',
          },
          file: msg.file ? { uri: msg.file.uri, name: msg.file.name, type: msg.file.type } : undefined,
        }));

        // Sort messages by createdAt in ascending order and reverse to show latest first
        const sortedMessages = messagesFromServer.sort((a, b) => a.createdAt - b.createdAt).reverse();
        setMessages(sortedMessages);

        // Set latest message
        const latestMessage = sortedMessages[0];
        const lastMessage = latestMessage.text || 'File attached';
        const timestamp = latestMessage.createdAt.toISOString();
        await AsyncStorage.setItem(`lastMessage_${roomId}`, JSON.stringify({ lastMessage, timestamp }));

         setLatestSender(latestMessage.user._id);

      } catch (error) {
        console.error('Failed to load messages:', error);
      } finally {
        setLoading(false);
      }
    };

    initializeChat();
  }, [userId, roomId]);


  useEffect(() => {
    const echo = new Echo({
      broadcaster: 'reverb',
      key: 'qei9avxspe7qcl5sp3dl',
      wsHost: 'ws.recruitangle.com',
      wsPort: 80,
      forceTLS: false,
      encrypted: true,
      disableStats: true,
      enabledTransports: ['ws', 'wss'],
    });

    echo.private(`chat.room.${roomId}`)
    .listen('ChatMessageEvent', (message) => {
        handleIncomingMessage(message);
      });

    echo.join(`presence-chat`)
      .here((users) => {
        const newPresence = {};
        users.forEach(user => {
          newPresence[user.id] = 'online';
        });
        setPresence(newPresence);
      })
      .joining((user) => {
        setPresence(prevPresence => ({
          ...prevPresence,
          [user.id]: 'online',
        }));
      })
      .leaving((user) => {
        setPresence(prevPresence => ({
          ...prevPresence,
          [user.id]: 'offline',
        }));
      });

    return () => {
      echo.leaveChannel(`chat.room.${roomId}`);
      echo.leave(`presence-chat`);
    };
  }, [roomId]);

  const onSend = async (newMessages = []) => {
    const newMessage = newMessages[0];
    const messageData = {
      room_id: roomId,
      message: newMessage.text || '',
    };

    try {
      const token = await AsyncStorage.getItem('token');
      await axios.post('https://recruitangle.com/api/chat/send', messageData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (error) {
      console.error('Failed to send message:', error);
    }

    setMessages((prevMessages) => GiftedChat.append(prevMessages, newMessages));
    const lastMessage = newMessage.text || 'File attached';
    const timestamp = newMessage.createdAt.toISOString();
    await AsyncStorage.setItem(`lastMessage_${roomId}`, JSON.stringify({ lastMessage, timestamp }));
  };

  const renderSend = (props) => (
    <Send {...props}>
      <View style={{ marginRight: 10, marginBottom: 10 }}>
        <Image
          source={{ uri: 'https://img.icons8.com/?size=100&id=94664&format=png&color=000000' }}
          style={{ width: 30, height: 30 }}
        />
      </View>
    </Send>
  );

  const renderBubble = (props) => (
    <Bubble
      {...props}
      wrapperStyle={{
        left: {
          backgroundColor: 'lightgreen',
        },
        right: {
          backgroundColor: '#3D5C3A',
        },
      }}
    />
  );

  const handleIncomingMessage = (message) => {
    const newMessage = {
      _id: message.id,
      text: message.text || '',
      createdAt: new Date(message.created_at),
      user: {
        _id: message.user_id,
        name: message.senderName || 'Unknown',
      },
      file: message.file_url ? { uri: message.file_url, name: message.file.name, type: message.file.type } : undefined,
    };

    setMessages((prevMessages) => GiftedChat.append(prevMessages, newMessage));
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'online':
        return 'green';
      case 'offline':
        return 'grey';
      default:
        return 'grey';
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="coral" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => setProfileVisible(true)}>
        <View style={styles.profileContainer}>
          <Image
            source={userData[userId]?.avatar || require('../assets/account.png')}
            style={styles.profileImage}
          />
          <View style={{ flexDirection: 'column' }}>
            <Text style={styles.profileName}>{userData[userId]?.name || 'Loading...'}</Text>
            <Text style={[
              styles.profileStatus,
              { color: getStatusColor(presence[userId]) }
            ]}>
              {presence[userId] || 'offline'}
            </Text>
          </View>
        </View>
      </TouchableOpacity>

      <View style={{ flex: 1, backgroundColor: '#eafaf1' }}>
        <GiftedChat
          messages={messages}
          onSend={onSend}
          user={{ _id: currentUserId }}
          renderSend={renderSend}
          renderBubble={renderBubble}
          alwaysShowSend
        />
      </View>

      <Modal visible={isProfileVisible} animationType="slide" transparent>
        <TouchableWithoutFeedback onPress={() => setProfileVisible(false)}>
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <TouchableOpacity onPress={() => setProfileVisible(false)} style={styles.modalCloseButton}>
                <Text style={styles.modalCloseText}>X</Text>
              </TouchableOpacity>
              <Text style={styles.modalTitle}>{userData[userId]?.name || 'Loading...'}</Text>
              <Text style={styles.modalText}>Role: {userData[userId]?.role || 'Loading...'}</Text>
              <Text style={styles.modalText}>Email: {userData[userId]?.email || 'Loading...'}</Text>
              <Text style={styles.modalText}>Phone: {userData[userId]?.phone || 'Loading...'}</Text>
              <Text style={styles.modalText}>Expertise: {userData[userId]?.expertise || 'Loading...'}</Text>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eafaf1',
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: 'white',
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  profileName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  profileStatus: {
    fontSize: 14,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
  },
  modalCloseButton: {
    alignSelf: 'flex-end',
  },
  modalCloseText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalText: {
    fontSize: 16,
    marginBottom: 5,
  },
});