import React, { useContext, useState, useEffect } from 'react';
import { GiftedChat, Bubble } from 'react-native-gifted-chat';
import { View, Text, Image, StyleSheet, Platform } from 'react-native';
import { api_url, AuthContext } from './AuthProvider';

const Room = () => {
  const { activeRoom, token, xsrf, user } = useContext(AuthContext);
  const roomID = activeRoom?.id || '';
  const roomName = activeRoom?.name || '';
  const roomImage = activeRoom?.image || '';
  const [messages, setMessages] = useState([]);
  const [otherUserTyping, setOtherUserTyping] = useState(false);

  // Use a library for audio playback in React Native Web
  // const sound = new Audio('/media/bell.mp3');

  const connectWebSocket = () => {
    if (!window.Echo || !roomID) return;

    const webSocketChannel = `chat.room.${roomID}`;
    const channel = window.Echo.private(webSocketChannel);

    channel.listen('ChatMessageEvent', async () => {
      // sound.play(); // Commented out because Audio is not available in React Native Web
      await getChatHistory();
    });

    channel.listenForWhisper('typing', () => {
      console.log(`${roomName} is typing.`);
      setOtherUserTyping(true);
    });

    channel.listenForWhisper('typing-end', () => {
      console.log(`${roomName} stopped typing.`);
      setOtherUserTyping(false);
    });
  };

  const getChatHistory = async () => {
    try {
      const res = await fetch(api_url + 'chat/get/' + roomID, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
        },
      });
      const data = await res.json();
      if (data?.status === 'success') {
        const formattedMessages = data.history.map((msg) => ({
          _id: msg.id,
          text: msg.text,
          createdAt: new Date(msg.created_at),
          user: {
            _id: msg.user_id,
            name: msg.senderName,
          },
        }));
        setMessages(formattedMessages.reverse());
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  const onSend = async (newMessages = []) => {
    const messageToSend = newMessages[0].text;
    const formData = new FormData();
    formData.append('room_id', roomID);
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
    if (roomID) {
      getChatHistory();
      connectWebSocket();

      return () => {
        if (window.Echo) {
          window.Echo.leave(`chat.room.${roomID}`);
        }
      };
    }
  }, [roomID]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        {roomImage ? (
          <Image source={{ uri: roomImage }} style={styles.image} />
        ) : (
          <View style={styles.imagePlaceholder} />
        )}
        <Text style={styles.roomName}>{roomName}</Text>
      </View>
      <GiftedChat
        messages={messages}
        onSend={(newMessages) => onSend(newMessages)}
        user={{
          _id: user?.id,
          name: user?.name,
        }}
        isTyping={otherUserTyping}
        renderBubble={(props) => (
          <Bubble
            {...props}
            wrapperStyle={{
              right: {
                backgroundColor: '#0084ff',
              },
              left: {
                backgroundColor: '#f0f0f0',
              },
            }}
          />
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
  roomName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Room;
