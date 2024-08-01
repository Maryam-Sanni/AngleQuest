import React, { useState, useEffect } from 'react';
import { View, Platform, KeyboardAvoidingView, Text, Image, TouchableOpacity, Alert, Modal, TouchableWithoutFeedback } from 'react-native';
import { GiftedChat, Send, Bubble } from 'react-native-gifted-chat';
import * as DocumentPicker from 'expo-document-picker';
import { Audio } from 'expo-av';
import { useFonts } from 'expo-font';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

function ChatScreen({ userId }) {

  const [messages, setMessages] = useState([]);
  const [recording, setRecording] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const [isProfileVisible, setProfileVisible] = useState(false);
  const [userData, setUserData] = useState({});

  useEffect(() => {
    const loadUserData = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        const response = await axios.get('https://recruitangle.com/api/expert/getAllExperts', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const users = response.data.allExperts.reduce((acc, user) => {
          acc[user.id] = {
            name: `${user.first_name} ${user.last_name}`,
            avatar: require('../assets/account.png'), // Assuming a default avatar
            role: user.role,
          };
          return acc;
        }, {});
        setUserData(users);
      } catch (error) {
        console.error('Failed to load user data:', error);
      }
    };

    loadUserData();
  }, []);


  useEffect(() => {
    const loadMessages = async () => {
      try {
        const storedMessages = await AsyncStorage.getItem(`chat_${userId}`);
        if (storedMessages) {
          setMessages(JSON.parse(storedMessages));
        } else {
          setMessages([]); // Clear messages if none are stored
        }
      } catch (error) {
        console.error('Failed to load messages:', error);
      }
    };

    loadMessages();
  }, [userId]);

  const onSend = async (newMessages = []) => {
    setMessages((prevMessages) => {
      const updatedMessages = GiftedChat.append(prevMessages, newMessages);
      AsyncStorage.setItem(`chat_${userId}`, JSON.stringify(updatedMessages)); // Save messages for this user
      return updatedMessages;
    });

    try {
      const token = await AsyncStorage.getItem('token');
      const messageContent = newMessages[0].text;

      const response = await axios.post('https://recruitangle.com/api/chat/send', {
        receiver_id: userId, // Use the passed userId prop as the receiver ID
        receiver_type: 'Individual', // Replace with actual receiver type
        message: messageContent,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log('Message sent:', response.data);
    } catch (error) {
      console.error('Failed to send message:', error);
    }
  };

  const renderSend = (props) => {
    return (
      <Send {...props}>
        <View style={{ marginRight: 10, marginBottom: 10 }}>
          <Text style={{ color: '#206C00', fontWeight: 'bold', fontSize: 16 }}>Send</Text>
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
            backgroundColor: 'white',
          },
          right: {
            backgroundColor: '#3D5C3A',
          },
        }}
      />
    );
  };

  const handleFilePick = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({ type: '*/*' });
      if (result.type === 'success') {
        const { uri: fileUri, name: fileName, type: fileType } = result;
        const message = {
          _id: Math.random().toString(36).substring(7),
          text: '',
          createdAt: new Date(),
          user: {
            _id: 1,
          },
          file: {
            uri: fileUri,
            name: fileName,
            type: fileType,
          },
        };
        onSend([message]);
      }
    } catch (error) {
      console.error('Error picking file:', error);
    }
  };

  const startRecording = async () => {
    try {
      const { sound, status } = await Audio.Recording.createAsync(Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY);
      setRecording(sound);
      setIsRecording(true);
    } catch (error) {
      console.error('Failed to start recording:', error);
    }
  };

  const stopRecording = async () => {
    try {
      await recording.stopAndUnloadAsync();
      setIsRecording(false);
      const { uri } = recording.getURI();
      const message = {
        _id: Math.random().toString(36).substring(7),
        text: '',
        createdAt: new Date(),
        user: {
          _id: 1,
        },
        audio: uri,
      };
      onSend([message]);
    } catch (error) {
      console.error('Failed to stop recording:', error);
    }
  };

  const toggleProfileModal = () => {
    setProfileVisible(!isProfileVisible);
  };

  const [fontsLoaded] = useFonts({
    'Roboto-Light': require("../assets/fonts/Roboto-Light.ttf"),
  });
  const { t } = useTranslation();

  const user = userData[userId] || { name: 'Unknown', avatar: require('../assets/account.png'), expertise: 'Unknown' };

  return (
    <View style={{ flex: 1 }}>
      <Modal visible={isProfileVisible} animationType="slide" transparent>
        <TouchableWithoutFeedback onPress={toggleProfileModal}>
          <View style={{ flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.5)', justifyContent: 'center', alignItems: 'center' }}>
            <View style={{ backgroundColor: 'white', padding: 20, borderRadius: 10, width: '20%', alignItems: 'center' }}>
              <TouchableOpacity onPress={toggleProfileModal} style={{ position: 'absolute', top: 10, right: 10 }}>
                <Text>✕</Text>
              </TouchableOpacity>
              <View style={{ flex: 1, marginTop: 50, marginLeft: 20, marginRight: 20 }}>
                <View style={{ flexDirection: "row", marginTop: 4, paddingRight: 2 }}>
                  <Text style={{ fontSize: 16, fontWeight: "bold", color: "black", fontFamily: "Roboto-Light" }}>
                    Nathan Arthur
                  </Text>
                  <View
                    style={{
                      width: 2,
                      height: 2,
                      backgroundColor: "green",
                      borderRadius: 1,
                      marginLeft: 2,
                    }}
                  />
                </View>
                <Text style={{ fontSize: 12, color: "#A0AEC0", fontFamily: "Roboto-Light" }}>Java Programmer</Text>
                <View style={{ borderBottomWidth: 1, borderBottomColor: '#ccc', marginTop: 10 }} />
                <Text style={{ marginTop: 10, fontSize: 12, color: "#206C00", fontFamily: "Roboto-Light" }}>{t('Profile')}</Text>
                <Text style={{ marginTop: 8, fontSize: 12, color: "black", fontFamily: "Roboto-Light" }}>{t('Account Number')}</Text>
                <Text style={{ marginTop: 8, fontSize: 12, color: "black", fontFamily: "Roboto-Light" }}>ACT002234</Text>
                <Text style={{ marginTop: 8, fontSize: 12, color: "black", fontFamily: "Roboto-Light" }}>{t('Email')}</Text>
                <Text style={{ marginTop: 8, fontSize: 12, color: "black", fontFamily: "Roboto-Light" }}>natearthur123@gmail.com</Text>
                <Text style={{ marginTop: 8, fontSize: 12, color: "black", fontFamily: "Roboto-Light" }}>{t('Phone')}</Text>
                <Text style={{ marginTop: 8, fontSize: 12, color: "black", fontFamily: "Roboto-Light" }}>+44 701 123 1234</Text>
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
      <View style={{ flexDirection: 'row', alignItems: 'center', padding: 10 }}>
        <TouchableOpacity onPress={toggleProfileModal}>
          <Image source={user.avatar} style={{ width: 40, height: 40, borderRadius: 20 }} />
        </TouchableOpacity>
        <View style={{ marginLeft: 10 }}>
          <Text style={{ fontWeight: 'bold', color: 'black' }}>{user.name}</Text>
          <Text style={{ fontSize: 12, color: '#A0AEC0' }}>{user.expertise} - <Text style={{ fontStyle: 'italics' }}>{user.role}</Text></Text>
        </View>
      </View>
      <View style={{ backgroundColor: '#eafaf1', flex: 1, }}>
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

export default ChatScreen;