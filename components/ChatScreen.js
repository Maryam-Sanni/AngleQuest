import React, { useState, useCallback } from 'react';
import { View, Platform, KeyboardAvoidingView, Text, Image, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { GiftedChat, Send, Bubble } from 'react-native-gifted-chat';
import * as DocumentPicker from 'expo-document-picker';
import { Audio } from 'expo-av';
import { useTranslation } from 'react-i18next';
import { useFonts } from 'expo-font';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

function ChatScreen({ userId }) { // Changed to use userId directly from props
  const { t } = useTranslation();

  // User data mapped by userId
  const userData = {
    1: { name: 'Amelia Harry', avatar: require('../assets/useravatar1.png'), expertise: 'SAP FI' },
    2: { name: 'Bwanbale Akiki', avatar: require('../assets/useravatar2.png'), expertise: 'Microsoft Azure' },
    3: { name: 'Mardiyyah Sulaimon', avatar: require('../assets/useravatar4.png'), expertise: 'Dynamics' },
    4: { name: 'Software Eng. Hub', avatar: require('../assets/useravatar.jpg'), expertise: 'Software Eng Hub' },
    5: { name: 'Nathan Arthur', avatar: require('../assets/useravatar5.jpg'), expertise: 'Frontend Developer' },
    6: { name: 'Microsoft Hub', avatar: require('../assets/useravatar.jpg'), expertise: 'Microsoft Azure Hub' },
    7: { name: 'SAP Hub', avatar: require('../assets/useravatar.jpg'), expertise: 'SAP FI Hub' },
    8: { name: 'Akeju Benson', avatar: require('../assets/useravatar5.jpg'), expertise: 'SAP FI - Hub Moderator' },
  };

  const [messages, setMessages] = useState([]);
  const [recording, setRecording] = useState(null);
  const [isRecording, setIsRecording] = useState(false);

  const onSend = useCallback(async (newMessages = []) => {
    setMessages((prevMessages) => GiftedChat.append(prevMessages, newMessages));

    const receiverId = '123'; // Replace with actual receiver ID
    const receiverType = 'Expert'; // Replace with actual receiver type

    try {
      const token = await AsyncStorage.getItem('token');
      const messageContent = newMessages[0].text;

      await axios.post('https://recruitangle.com/api/chat/send', {
        receiver_id: receiverId,
        receiver_type: receiverType,
        message: messageContent,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (error) {
      Alert.alert('Error', 'Failed to send message');
    }
  }, []);

  const renderSend = (props) => (
    <Send {...props}>
      <View style={styles.sendButton}>
        <Text style={styles.sendButtonText}>{t("Send")}</Text>
      </View>
    </Send>
  );

  const renderBubble = (props) => (
    <Bubble
      {...props}
      wrapperStyle={{
        left: { backgroundColor: '#DFF4D7' },
        right: { backgroundColor: '#3D5C3A' },
      }}
    />
  );

  const handleFilePick = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({ type: '*/*' });
      if (result.type === 'success') {
        const { uri: fileUri, name: fileName, type: fileType } = result;
        const message = {
          _id: Math.random().toString(36).substring(7),
          text: '',
          createdAt: new Date(),
          user: { _id: 1 },
          file: { uri: fileUri, name: fileName, type: fileType },
        };
        onSend([message]);
      }
    } catch (error) {
      Alert.alert('Error', 'Error picking file');
    }
  };

  const startRecording = async () => {
    try {
      const { sound } = await Audio.Recording.createAsync(Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY);
      setRecording(sound);
      setIsRecording(true);
    } catch (error) {
      Alert.alert('Error', 'Failed to start recording');
    }
  };

  const stopRecording = async () => {
    try {
      await recording.stopAndUnloadAsync();
      setIsRecording(false);
      const uri = recording.getURI();
      if (uri) {
        const message = {
          _id: Math.random().toString(36).substring(7),
          text: '',
          createdAt: new Date(),
          user: { _id: 1 },
          audio: uri,
        };
        onSend([message]);
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to stop recording');
    }
  };

  const [fontsLoaded] = useFonts({
    'Roboto-Light': require('../assets/fonts/Roboto-Light.ttf'),
  });

  if (!fontsLoaded) {
    return <Text>Loading...</Text>;
  }

  const user = userData[userId] || { name: 'Unknown', avatar: require('../assets/useravatar1.png'), expertise: 'Unknown' };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={user.avatar} style={styles.avatar} />
        <View style={styles.userInfo}>
          <Text style={styles.userName}>{user.name}</Text>
          <Text style={styles.userExpertise}>{user.expertise} - <Text style={styles.expertiseText}>{t("Expert")}</Text></Text>
        </View>
        <TouchableOpacity style={styles.fileButton} onPress={handleFilePick}>
          <Image
            source={{ uri: 'https://cdn.builder.io/api/v1/image/assets/TEMP/9afdd28554ea94baa9f576588ffd7e85d2ea305e799b46b23fc2336715ed2398?apiKey=7b9918e68d9b487793009b3aea5b1a32' }}
            style={styles.fileIcon}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={isRecording ? stopRecording : startRecording}>
          <Image
            source={{ uri: isRecording ? 'https://cdn.builder.io/api/v1/image/assets/TEMP/8b6ee6e3efc0882450b47e4387504c352faa72f342dc8adc7741cf3ed2a19f02?apiKey=7b9918e68d9b487793009b3aea5b1a32&' : 'https://cdn.builder.io/api/v1/image/assets/TEMP/7faa777c54d32d03bd2952b24dd7b363b4e5cd731ca521b853a6b213ebf2f277?apiKey=7b9918e68d9b487793009b3aea5b1a32&' }}
            style={styles.recordingIcon}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.chatContainer}>
        <GiftedChat
          messages={messages}
          onSend={onSend}
          user={{ _id: 1 }}
          renderSend={renderSend}
          renderBubble={renderBubble}
        />
      </View>

      {Platform.OS === 'android' && <KeyboardAvoidingView behavior="padding" />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: 'white',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  userInfo: {
    marginLeft: 10,
  },
  userName: {
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'Roboto-Light',
  },
  userExpertise: {
    fontSize: 12,
    fontFamily: 'Roboto-Light',
  },
  expertiseText: {
    fontWeight: '500',
    fontStyle: 'italic',
  },
  fileButton: {
    marginLeft: 'auto',
    marginRight: 10,
  },
  fileIcon: {
    width: 25,
    height: 25,
    marginTop: 10,
  },
  recordingIcon: {
    width: 25,
    height: 25,
    marginTop: 10,
    marginRight: 10,
  },
  chatContainer: {
    flex: 1,
    backgroundColor: '#F5FFFA',
  },
  sendButton: {
    marginRight: 10,
    marginBottom: 10,
  },
  sendButtonText: {
    color: '#206C00',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default ChatScreen;
