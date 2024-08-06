import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, Modal, TouchableWithoutFeedback, ActivityIndicator, StyleSheet } from 'react-native';
import { GiftedChat, Send, Bubble } from 'react-native-gifted-chat';
import { useFonts } from 'expo-font';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRoute } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import WebSocket from 'react-native-websocket';

const ChatScreen = ({ userId: propUserId }) => {
  const route = useRoute();
  const userId = propUserId || route.params?.userId;
  const [messages, setMessages] = useState([]);
  const [isProfileVisible, setProfileVisible] = useState(false);
  const [userData, setUserData] = useState({});
  const [currentUserId, setCurrentUserId] = useState(null);
  const [loading, setLoading] = useState(true); // For handling loading state
  const [latestSender, setLatestSender] = useState(null);
  const [ws, setWs] = useState(null);

  useEffect(() => {
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
      } finally {
        setLoading(false);
      }
    };

    loadUserData();
  }, []);

  useEffect(() => {
    const socket = new WebSocket('ws://ws.recruitangle.com:80/app/qei9avxspe7qcl5sp3dl');

    socket.onopen = () => {
      console.log('WebSocket connection opened');
      setWs(socket);
    };

    socket.onmessage = (event) => {
      const message = JSON.parse(event.data);
      handleIncomingMessage(message);
    };

    socket.onclose = () => {
      console.log('WebSocket connection closed');
      setWs(null);
    };

    socket.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    return () => {
      try {
        if (socket) {
          socket.close();
        }
      } catch (error) {
        console.error('Error closing WebSocket:', error);
      }
    };
  }, []);

  useEffect(() => {
    const loadMessages = async () => {
      try {
        setLoading(true); // Set loading to true when fetching messages
        const token = await AsyncStorage.getItem('token');
        const response = await axios.get(`https://recruitangle.com/api/chat/get/${userId}/Individual`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const messagesFromServer = response.data.history.map(msg => ({
          _id: msg.id,
          text: msg.text || '',
          createdAt: new Date(msg.created_at),
          user: {
            _id: msg.sender_id === currentUserId ? 1 : 2, // 1 for current user, 2 for others
            name: msg.senderName || 'Unknown',
          },
          file: msg.file ? { uri: msg.file.uri, name: msg.file.name, type: msg.file.type } : undefined,
        }));

        // Sort messages by createdAt in ascending order (oldest to newest)
        const sortedMessages = messagesFromServer.sort((a, b) => a.createdAt - b.createdAt);

        // Reverse the sorted array to have latest messages at the bottom
        const reversedMessages = sortedMessages.reverse();

        const formattedMessages = reversedMessages.map(msg => ({
          ...msg,
          user: {
            ...msg.user,
            _id: msg.user._id === 1 ? currentUserId : msg.user._id,
          },
        }));

        setMessages(formattedMessages);

        // Update last message and timestamp
        const latestMessage = formattedMessages[0];
        const lastMessage = latestMessage.text;
        const timestamp = latestMessage.createdAt.toISOString();
        await AsyncStorage.setItem(`lastMessage_${userId}`, JSON.stringify({ lastMessage, timestamp }));

        setLatestSender(latestMessage.user._id);

      } catch (error) {
        console.error('Failed to load messages:', error);
      } finally {
        setLoading(false); // Set loading to false when done
      }
    };

    loadMessages();
  }, [userId, currentUserId]);

  const onSend = async (newMessages = []) => {
    const newMessage = newMessages[0];
    const messageData = {
      receiver_id: userId,
      receiver_type: 'Individual',
      message: newMessage.text || '',
      file: newMessage.file || {},
      time: newMessage.createdAt.toISOString(),
    };

    try {
      const token = await AsyncStorage.getItem('token');
      await axios.post('https://recruitangle.com/api/chat/send', messageData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log('Message sent:', newMessages);
    } catch (error) {
      console.error('Failed to send message:', error);
    }

    if (ws) {
      ws.send(JSON.stringify(messageData));
    }

    setMessages((prevMessages) => GiftedChat.append(prevMessages, newMessages));
    AsyncStorage.setItem(`chat_${userId}`, JSON.stringify([...messages, newMessage]));

    const lastMessage = newMessage.text || 'File attached';
    const timestamp = newMessage.createdAt.toISOString();
    AsyncStorage.setItem(`lastMessage_${userId}`, JSON.stringify({ lastMessage, timestamp }));
  };


  const renderSend = (props) => {
    return (
      <Send {...props}>
        <View style={{ marginRight: 10, marginBottom: 10 }}>
          <Image
            source={{ uri: 'https://img.icons8.com/?size=100&id=94664&format=png&color=000000' }}
            style={{ width: 30, height: 30 }}
          />
        </View>
      </Send>
    );
  };

  const renderBubble = (props) => {
    return (
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
  };

  const handleIncomingMessage = (message) => {
    const newMessage = {
      _id: message.id,
      text: message.text || '',
      createdAt: new Date(message.created_at),
      user: {
        _id: message.sender_id === currentUserId ? 1 : 2,
        name: message.senderName || 'Unknown',
      },
      file: message.file ? { uri: message.file.uri, name: message.file.name, type: message.file.type } : undefined,
    };

    setMessages((prevMessages) => GiftedChat.append(prevMessages, newMessage));
  };

  const handleSelectFile = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      const selectedImage = result.assets[0];
      const newMessage = {
        _id: messages.length + 1,
        text: '',
        createdAt: new Date(),
        user: { _id: currentUserId, name: userData[currentUserId]?.name || 'Unknown' },
        file: selectedImage,
      };

      setMessages((prevMessages) => GiftedChat.append(prevMessages, newMessage));

      // Update last message and timestamp
      const lastMessage = 'File attached';
      const timestamp = newMessage.createdAt.toISOString();
      await AsyncStorage.setItem(`lastMessage_${userId}`, JSON.stringify({ lastMessage, timestamp }));
    }
  };

  const { t } = useTranslation();

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
          <Text style={styles.profileName}>{userData[userId]?.name || 'Loading...'}</Text>
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

      <View style={{ alignSelf: 'center'}}>
      <Modal visible={isProfileVisible} animationType="slide" transparent>
        <TouchableWithoutFeedback onPress={() => setProfileVisible(false)}>
          <View style={{ flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.5)', justifyContent: 'center', alignItems: 'center' }}>
            <View style={{ backgroundColor: 'white', padding: 20, borderRadius: 10, width: '30%', alignItems: 'flex-start' }}>
              <TouchableOpacity onPress={() => setProfileVisible(false)} style={styles.closeButton}>
                <Text style={{ fontSize: 18, marginLeft: 300, marginBottom: 10 }}>✕</Text>
              </TouchableOpacity>
          <Text style={{ fontSize: 18, fontWeight: 'bold', color: "black"}}>{t('User Info')}</Text>

                            <Text style={{ marginTop: 8, fontSize: 14, color: "black", fontWeight: '600', }}>{t('Name')}</Text>
                            <Text style={{ marginTop: 8, fontSize: 12, color: "black" }}>
                              {userData[userId]?.name || 'N/A'}
                            </Text>
          <Text style={{ marginTop: 8,  fontSize: 14, color: "black", fontWeight: '600', 
             }}>{t('Role')}</Text>
                              <Text style={{ marginTop: 8, fontSize: 12, color: "black" }}>
                                {userData[userId]?.role || 'N/A'}
                              </Text>
                            <Text style={{ marginTop: 8,  fontSize: 14, color: "black", fontWeight: '600',  }}>{t('Email')}</Text>
                            <Text style={{ marginTop: 8, fontSize: 12, color: "black"}}>
                              {userData[userId]?.email || 'N/A'}
                            </Text>

                            <Text style={{ marginTop: 8,  fontSize: 14, color: "black", fontWeight: '600', 
           }}>{t('Phone')}</Text>
                            <Text style={{ marginTop: 8, fontSize: 12, color: "black", fontFamily: "Roboto-Light" }}>
                              {userData[userId]?.phone || 'N/A'}
                            </Text>


          <Text style={{ marginTop: 8,  fontSize: 14, color: "black", fontWeight: '600', 
             }}>{t('Expertise')}</Text>
                              <Text style={{ marginTop: 8, fontSize: 12, color: "black" }}>
                                {userData[userId]?.expertise || 'N/A'}
                              </Text>
        </View>
          </View>
            </TouchableWithoutFeedback>
      </Modal>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  profileName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  sendingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
    marginBottom: 5,
  },
  sendButtonText: {
    color: '#0084ff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalOverlay: {
    flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.5)', justifyContent: 'center', alignItems: 'center' 
  },
  modalContent: {
    backgroundColor: 'white', padding: 20, borderRadius: 10, width: '30%', alignItems: 'flex-start' 
  },
  modalProfileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignSelf: 'center',
    marginBottom: 20,
  },
  modalProfileName: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalProfileRole: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 10,
  },
  modalProfileEmail: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 10,
  },
  modalProfilePhone: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 10,
  },
  modalProfileExpertise: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 10,
  },
  closeButton: {
    alignItems: 'center',
    marginTop: 10,
  },
  closeButtonText: {
    color: '#0084ff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ChatScreen;