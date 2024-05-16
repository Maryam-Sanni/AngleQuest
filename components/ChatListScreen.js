import React from 'react';
import { View, FlatList, Text, TouchableOpacity, Image, ImageBackground } from 'react-native';

const data = [
  {
    id: '1',
    name: 'Amelia Harry',
    message: 'Hello John, This Amelia, This is a reminder that...',
    time: '10:00 AM',
    avatar: require('../assets/useravatar1.png')
  },
  {
    id: '2',
    name: 'Bwanbale Akiki',
    message: 'I will send my CV to you sir for proper',
    time: '12:08 PM',
    avatar: require('../assets/useravatar2.png')
  },
  {
    id: '3',
    name: 'Mardiyyah Sulaimon',
    message: 'Ready for the meeting?',
    time: 'Yesterday',
    avatar: require('../assets/useravatar4.png')
  },
  {
    id: '4',
    name: 'Software Eng. Hub',
    message: 'Lets reconvene same time tomorrow',
    time: 'Yesterday',
    avatar: require('../assets/useravatar.jpg')
  },
  {
    id: '5',
    name: 'Nathan Arthur',
    message: 'You are doing great! Dont doubt your potentials...',
    time: 'Yesterday',
    avatar: require('../assets/useravatar5.jpg')
  },
  {
    id: '6',
    name: 'Microsoft Hub',
    message: 'Remember youre here to learn',
    time: 'Yesterday',
    avatar: require('../assets/useravatar.jpg')
  },
  {
    id: '7',
    name: 'SAP Hub',
    message: 'Welcome to the SAP coaching hub',
    time: 'Yesterday',
    avatar: require('../assets/useravatar.jpg')
  },
  {
    id: '8',
    name: 'Akeju Benson',
    message: 'Good morning John, Lets continue from...',
    time: 'Yesterday',
    avatar: require('../assets/useravatar5.jpg')
  },
];

function CustomHeader() {
  return (
    <View style={{padding: 16, backgroundColor: 'white' }}>
      <Text style={{ fontSize: 20, fontWeight: 'bold', textAlign: 'flex-start', borderBottomWidth: 1, borderBottomColor: 'grey', padding: 16, }}>Chats</Text>
    </View>
  );
}

function ChatListScreen({ navigation }) {
  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => navigation.navigate('Chat', { userId: item.id })}>
      <View style={{ flexDirection: 'row', alignItems: 'center', padding: 16, borderBottomWidth: 1, borderBottomColor: '#E5E5E5', }}>
        <Image source={item.avatar} style={{ width: 48, height: 48, borderRadius: 24, marginRight: 12 }} />
        <View style={{ flex: 1 }}>
          <Text style={{ fontWeight: '500', fontSize: 15 }}>{item.name}</Text>
          <Text style={{ color: '#777', fontSize: 13 }}>{item.message}</Text>
        </View>
        <Text style={{ color: '#777', fontSize: 13 }}>{item.time}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={{ backgroundColor: 'white' }}>
      <CustomHeader />
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}

export default ChatListScreen;
