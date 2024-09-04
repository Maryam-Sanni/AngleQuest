import React, { useContext, useState, useEffect } from 'react';
import { View, Text, TextInput, FlatList, Button, Image, TouchableOpacity } from 'react-native';
import { api_url, AuthContext } from './AuthProvider';
import { Audio } from 'expo-av';

const Room = () => {
  const { activeRoom, token, xsrf, user } = useContext(AuthContext);
  const { id: roomID, name: roomName, image: roomImage } = activeRoom;
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const [otherUserTyping, setOtherUserTyping] = useState(false);

  // Load the sound
  const [sound, setSound] = useState();

  async function playSound() {
    const { sound } = await Audio.Sound.createAsync(require('./assets/bell.mp3'));
    setSound(sound);
    await sound.playAsync();
  }

  useEffect(() => {
    return sound
      ? () => {
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  const webSocketChannel = `chat.room.${roomID}`;
  const channel = window.Echo.private(webSocketChannel);

  const connectWebSocket = () => {
    channel.listen('ChatMessageEvent', async (e) => {
      playSound();
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

  const typing = () => {
    channel.whisper('typing');
  };

  const stopTyping = () => {
    channel.whisper('typing-end');
  };

  const getChatHistory = async () => {
    fetch(`${api_url}chat/get/${roomID}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
      },
    })
      .then((res) => res.json())
      .then((res) => {
        if (res?.status === 'success') {
          setMessages(res?.history);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const sendMessage = (e) => {
    if (message.trim() === '') {
      alert('Please enter a message!');
      return;
    }

    const formData = new FormData();
    formData.append('room_id', roomID);
    formData.append('message', e);

    fetch(`${api_url}chat/send`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
        'X-CSRF-TOKEN': xsrf,
      },
      body: formData,
    })
      .then((res) => res.json())
      .then((res) => {
        if (res?.status === 'success') {
          setMessage('');
          setMessages([...messages, res?.chat]);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    if (roomID > 0) {
      getChatHistory();
      connectWebSocket();

      return () => {
        window.Echo.leave(webSocketChannel);
      };
    }
  }, [roomID]);

  return (
    <View style={{ flex: 1, padding: 10 }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
        <TouchableOpacity onPress={() => {/* Handle back action */}}>
          <Text>Back</Text>
        </TouchableOpacity>
        <Image source={{ uri: roomImage }} style={{ width: 40, height: 40, borderRadius: 20, marginLeft: 10 }} />
        <Text style={{ marginLeft: 10, fontSize: 18, fontWeight: 'bold' }}>{roomName}</Text>
      </View>

      {otherUserTyping && <Text>{`${roomName} is typing...`}</Text>}

      <FlatList
        data={messages}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={{ padding: 10, backgroundColor: item?.user_id === user?.id ? '#DCF8C6' : '#ECECEC', borderRadius: 5, marginBottom: 10 }}>
            <Text>{item?.text}</Text>
          </View>
        )}
      />

      <TextInput
        value={message}
        onChangeText={(txt) => setMessage(txt)}
        onKeyPress={typing}
        onBlur={stopTyping}
        placeholder="Type message here"
        style={{ borderWidth: 1, borderColor: '#CCC', padding: 10, borderRadius: 5 }}
        onSubmitEditing={(e) => sendMessage(e.nativeEvent.text)}
      />
      <Button title="Send" onPress={() => sendMessage(message)} />
    </View>
  );
};

export default Room;
