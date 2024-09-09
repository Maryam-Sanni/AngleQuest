import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, SafeAreaView, KeyboardAvoidingView, Platform } from 'react-native';
import { GiftedChat, Bubble } from 'react-native-gifted-chat';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { api_url, AuthContext } from './AuthProvider';

const Room = ({ activeRoom }) => {
  const { xsrf } = React.useContext(AuthContext);
  const [messages, setMessages] = useState([]);
  const [otherUserTyping, setOtherUserTyping] = useState(false);
  const [token, setToken] = useState('');
  const [userId, setUserId] = useState('');
  const [roomData, setRoomData] = useState({
    id: '',
    name: 'Unknown',
    image: '',
  });

  useEffect(() => {
    const fetchTokenAndUserId = async () => {
      try {
        const storedToken = await AsyncStorage.getItem('token');
        const storedUserId = await AsyncStorage.getItem('user_id');
        if (storedToken) {
          setToken(storedToken);
        }
        if (storedUserId) {
          setUserId(storedUserId);
        }
      } catch (error) {
        console.log('Error fetching token or user ID:', error);
      }
    };

    fetchTokenAndUserId();
  }, []);

  useEffect(() => {
    const fetchRoomData = async () => {
      try {
        const storedRoom = await AsyncStorage.getItem('selectedRoom');
        if (storedRoom) {
          const room = JSON.parse(storedRoom);
          setRoomData(room);
        }
      } catch (error) {
        console.log('Error retrieving room data from storage:', error);
      }
    };

    if (activeRoom) {
      setRoomData({
        id: activeRoom.id,
        name: activeRoom.name,
        image: activeRoom.image || '', // Add fallback for image
      });
      fetchRoomData(); // Fetch room data if needed
    }
  }, [activeRoom]); // Trigger fetch on room change

  const connectWebSocket = () => {
    if (!window.Echo || !roomData.id) return;

    const webSocketChannel = `chat.room.${roomData.id}`;
    const channel = window.Echo.private(webSocketChannel);

    channel.listen('ChatMessageEvent', async () => {
      await getChatHistory();
    });

    channel.listenForWhisper('typing', () => {
      console.log(`${roomData.name} is typing.`);
      setOtherUserTyping(true);
    });

    channel.listenForWhisper('typing-end', () => {
      console.log(`${roomData.name} stopped typing.`);
      setOtherUserTyping(false);
    });
  };

  const getChatHistory = async () => {
    try {
      if (userId && token) {
        const response = await axios.get(api_url + 'chat/get/' + roomData.id, {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json',
          },
        });

        const data = response.data;
        if (data?.status === 'success') {
          const formattedMessages = data.history.map((msg) => ({
            _id: msg.id,
            text: msg.text,
            createdAt: new Date(msg.created_at),
            user: {
              _id: msg.user_id,
              name: msg.senderName,
            },
            // No need for `position`, GiftedChat uses `user._id` for alignment
          }));

          setMessages(formattedMessages.reverse());
        }
      }
    } catch (err) {
      console.log('Error fetching chat history:', err.message);
    }
  };

  const onSend = async (newMessages = []) => {
    const messageToSend = newMessages[0].text;
    const formData = new FormData();
    formData.append('room_id', roomData.id); 
    formData.append('message', messageToSend);

    try {
      const res = await fetch(api_url + 'chat/send', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
          'X-CSRF-TOKEN': xsrf,
        },
        body: formData,
      });
      const data = await res.json();
      if (data?.status === 'success') {
        setMessages((previousMessages) =>
          GiftedChat.append(previousMessages, newMessages)
        );
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    if (roomData.id && token) {
      getChatHistory();
      connectWebSocket();

      return () => {
        if (window.Echo) {
          window.Echo.leave(`chat.room.${roomData.id}`);
        }
      };
    }
  }, [roomData.id, token]); // Dependencies to re-connect WebSocket and fetch data on room change

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <View style={styles.header}>
          {roomData.image ? (
            <Image source={{ uri: roomData.image }} style={styles.image} />
          ) : (
            <View style={styles.imagePlaceholder} />
          )}
          <Text style={styles.roomName}>{roomData.name}</Text>
        </View>
        {otherUserTyping && (
          <Text style={styles.typingIndicator}>The other user is typing...</Text>
        )}
        <GiftedChat
          messages={messages}
          onSend={(newMessages) => onSend(newMessages)}
          user={{
            _id: userId, // Use the user ID from AsyncStorage
            name: 'User', // Optionally set the user's name
          }}
          isTyping={otherUserTyping}
          renderBubble={(props) => (
            <Bubble
              {...props}
              wrapperStyle={{
                right: {
                  backgroundColor: '#B9D6A0', 
                  alignSelf: 'flex-end', 
                },
                left: {
                  backgroundColor: '#f0f0f0',
                },
              }}
              textStyle={{
                right: {
                  color: '#fff', 
                },
                left: {
                  color: '#000', 
                },
              }}
            />
          )}
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    height: 80,
    backgroundColor: '#f5f5f5',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  imagePlaceholder: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#ccc',
    marginRight: 10,
  },
  typingIndicator: {
    margin: 10,
    fontSize: 14,
    color: '#666',
  },
  roomName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Room;
