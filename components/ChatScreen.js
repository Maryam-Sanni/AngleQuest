import React, { useState } from 'react';
import { View, Platform, KeyboardAvoidingView, Text, Image, TouchableOpacity, Alert } from 'react-native';
import { GiftedChat, Send, Bubble } from 'react-native-gifted-chat';
import { Ionicons } from '@expo/vector-icons';
import * as DocumentPicker from 'expo-document-picker';
import { Audio } from 'expo-av';


import {useFonts} from "expo-font"


function ChatScreen() {
  const [messages, setMessages] = useState([]);
  const [recording, setRecording] = useState(null);
  const [isRecording, setIsRecording] = useState(false);

  const onSend = (newMessages = []) => {
    setMessages((prevMessages) => GiftedChat.append(prevMessages, newMessages));
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
            backgroundColor: '#DFF4D7',
          },
          right: {
            backgroundColor: '#B9DDA9',
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
        onSend([message]); // Ensure the message is sent as an array
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
      onSend([message]); // Ensure the message is sent as an array
    } catch (error) {
      console.error('Failed to stop recording:', error);
    }
  };

  const [fontsLoaded]=useFonts({
    'Roboto-Light':require("../assets/fonts/Roboto-Light.ttf"),


  })

  return (
    <View style={{ flex: 1 }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', padding: 10, backgroundColor: 'white' }}>
        <Image
          source={require('../assets/useravatar5.jpg')}
          style={{ width: 40, height: 40, borderRadius: 20 }}
        />
        <View style={{ marginLeft: 10 }}>
          <Text style={{ fontSize: 16, fontWeight: 'bold',fontFamily:"Roboto-Light" }}>Nathan Arthur</Text>
          <Text style={{ fontStyle: 'normal', fontSize: 12,fontFamily:"Roboto-Light" }}>Microsoft Azure - <Text style={{ fontWeight: '500', fontStyle: 'italic' }}>Expert</Text></Text>
        </View>
        <TouchableOpacity style={{ marginLeft: 'auto', marginRight: 10 }} onPress={handleFilePick}>
          <Image
            source={{ uri: 'https://cdn.builder.io/api/v1/image/assets/TEMP/9afdd28554ea94baa9f576588ffd7e85d2ea305e799b46b23fc2336715ed2398?apiKey=7b9918e68d9b487793009b3aea5b1a32' }}
            style={{ width: 25, height: 25, marginTop: 10 }}
          />
        </TouchableOpacity>
        {isRecording ? (
          <TouchableOpacity onPress={stopRecording}>
            <Image
              source={{ uri: 'https://cdn.builder.io/api/v1/image/assets/TEMP/8b6ee6e3efc0882450b47e4387504c352faa72f342dc8adc7741cf3ed2a19f02?apiKey=7b9918e68d9b487793009b3aea5b1a32&' }}
              style={{ width: 25, height: 25, marginTop: 10, marginRight: 10 }}
            />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={startRecording}>
            <Image
              source={{ uri: 'https://cdn.builder.io/api/v1/image/assets/TEMP/7faa777c54d32d03bd2952b24dd7b363b4e5cd731ca521b853a6b213ebf2f277?apiKey=7b9918e68d9b487793009b3aea5b1a32&' }}
              style={{ width: 25, height: 25, marginTop: 10, marginRight: 10 }}
            />
          </TouchableOpacity>
        )}
      </View>

      <View style={{ flex: 1, backgroundColor: '#F5FFFA' }}>
        <GiftedChat
          messages={messages}
          onSend={(newMessages) => onSend(newMessages)}
          user={{ _id: 1 }}
          placeholder="Type a message..."
          renderSend={renderSend}
          renderBubble={renderBubble}
        />
      </View>

      {Platform.OS === 'android' && <KeyboardAvoidingView behavior="padding" />}
    </View>
  );
}

export default ChatScreen;
 