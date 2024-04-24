import React, { useState } from 'react';
import { View, Platform, KeyboardAvoidingView, Text, Image, TouchableOpacity, Alert } from 'react-native';
import { GiftedChat, Send, Bubble } from 'react-native-gifted-chat';
import { Ionicons } from '@expo/vector-icons';
import * as DocumentPicker from 'expo-document-picker';
import { Audio } from 'expo-av';

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
        // Here you can handle the file, like sending it through a chat message
        // For simplicity, let's just alert the file details
        Alert.alert('File Selected', `Name: ${fileName}\nType: ${fileType}`);
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
      // Here you can handle the recorded audio, like sending it through a chat message
    } catch (error) {
      console.error('Failed to stop recording:', error);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', padding: 10, backgroundColor: 'white' }}>
        <Image
          source={require('../assets/useravatar5.jpg')}
          style={{ width: 40, height: 40, borderRadius: 20 }}
        />
        <View style={{ marginLeft: 10 }}>
          <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Nathan Arthur</Text>
          <Text style={{ fontStyle: 'normal', fontSize: 12 }}>Microsoft Azure - <Text style={{ fontWeight: '500', fontStyle: 'italic' }}>Expert</Text></Text>
        </View>
        <TouchableOpacity style={{ marginLeft: 'auto', marginRight: 10 }} onPress={handleFilePick}>
          <Ionicons name="document-outline" size={24} color="#206C00" />
        </TouchableOpacity>
        {isRecording ? (
          <TouchableOpacity onPress={stopRecording}>
            <Ionicons name="mic-off-outline" size={24} color="red" />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={startRecording}>
            <Ionicons name="mic-outline" size={24} color="#206C00" />
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
