import React, { useState, useRef } from 'react';
import { View, FlatList, Text, TouchableOpacity, Image, ScrollView } from 'react-native';

const data = [
  {
    id: '1',
    name: 'Amelia Harry',
    message: 'Hello John, This Amelia, This is a reminder that...',
    time: '5 min ago',
    messagecount: '2', 
    avatar: require('../assets/account.png'),
    hub: 'Hub3'
  },
  {
    id: '2',
    name: 'Bwanbale Akiki',
    message: 'I will send my CV to you sir for proper',
    time: '09:08 AM',
    messagecount: '3', 
    avatar: require('../assets/account.png'),
    hub: 'Hub2'
  },
  {
    id: '3',
    name: 'Mardiyyah Sulaimon',
    message: 'Ready for the meeting?',
    time: '12:27 PM',
    messagecount: '13',
    avatar: require('../assets/account.png'),
    hub: 'Hub1'
  },
  {
    id: '4',
    name: 'SAP FI Hub',
    message: 'Lets reconvene same time tomorrow',
    time: '03:04PM',
    messagecount: '1', 
    avatar: require('../assets/people.png'),
    hub: 'Hub1'
  },
  {
    id: '5',
    name: 'Nathan Arthur',
    message: 'You are doing great! Dont doubt your potentials...',
    time: 'Yesterday',
    messagecount: '0', 
    avatar: require('../assets/account.png'),
    hub: 'Hub5'
  },
  {
    id: '6',
    name: 'Microsoft Azure Hub',
    message: 'Remember youre here to learn',
    time: 'Yesterday',
    messagecount: '0', 
    avatar: require('../assets/people.png'),
    hub: 'Hub2'
  },
  {
    id: '7',
    name: 'Power Point Hub',
    message: 'Welcome to the Power Point coaching hub',
    time: 'Wednesday',
    messagecount: '2', 
    avatar: require('../assets/people.png'),
    hub: 'Hub3'
  },
  {
    id: '8',
    name: 'Akeju Benson',
    message: 'Good morning Benson, Lets continue from...',
    time: 'Tuesday',
    messagecount: '0', 
    avatar: require('../assets/account.png'),
    hub: 'Hub4'
  },
  {
    id: '9',
    name: 'John Jenny',
    message: 'Good morning John, Lets continue from...',
    time: '01/05/24',
    messagecount: '9', 
    avatar: require('../assets/account.png'),
    hub: 'Hub5'
  },
  {
    id: '10',
    name: 'Adedare Adeyemi',
    message: 'Hi Dare, Lets continue from...',
    time: '28/04/24',
    messagecount: '1',
    avatar: require('../assets/account.png'),
    hub: 'Hub3'
  },
  {
    id: '11',
    name: 'Chiara Romano',
    message: 'Good afternoon Chiara, Lets continue from...',
    time: '26/04/24',
    messagecount: '2',
    avatar: require('../assets/account.png'),
    hub: 'Hub1'
  },
  {
    id: '12',
    name: 'Snr. Power Point Hub',
    message: 'I will send a document for you all to',
    time: '26/04/24',
    messagecount: '0', 
    avatar: require('../assets/people.png'),
    hub: 'Hub4'
  },
  {
    id: '13',
    name: 'Java Programming',
    message: 'Are you all ready for our session today?',
    time: '25/04/24',
    messagecount: '0', 
    avatar: require('../assets/people.png'),
    hub: 'Hub5'
  },
];

function CustomHeader({ onPressAllChats, onPressHub1, onPressHub2, onPressHub3, onPressHub4, onPressHub5, selectedHub, scrollViewRef  }) {
const scrollLeft = () => {
    scrollViewRef.current.scrollTo({ x: 0, y: 0, animated: true });
  };

  const scrollRight = () => {
    scrollViewRef.current.scrollToEnd({ animated: true });
  };

  return (
    <View style={{ backgroundColor: 'white', padding: 16, width: '100%' }}>
      <Text style={{ fontSize: 20, fontWeight: 'bold', textAlign: 'flex-start', borderBottomWidth: 1, borderBottomColor: 'grey', padding: 16 }}>Chats</Text>
       <TouchableOpacity onPress={() => scrollLeft()}>
          <Image source={require('../assets/left-arrow.png')} style={{ width: 10, height: 10, marginTop: 20, left: 10}} />
        </TouchableOpacity>
       <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ flexDirection: 'row' }} ref={scrollViewRef}>
      <View style={{ flexDirection: 'row',}}>
        <TouchableOpacity onPress={onPressAllChats}>
          <View style={{ justifyContent: "flex-start", paddingHorizontal: 10, paddingVertical: 5, borderRadius: 10, borderColor: selectedHub === null ? "#206C00" : "#d3f9d8", backgroundColor: selectedHub === null ? "#d3f9d8" : null, alignItems: 'center', marginTop: 10, marginLeft: 10, borderWidth: 1, marginBottom: 5 }}>
            <Text style={{ fontSize: 13, color: selectedHub === null ? "#206C00" : "#777", alignText: 'center', fontWeight: '600',}}>All Chats</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={onPressHub1}>
          <View style={{ justifyContent: "flex-start", paddingHorizontal: 10, marginLeft: 10, paddingVertical: 5, borderRadius: 10, borderColor: selectedHub === 'Hub1' ? "#206C00" : "#d3f9d8", backgroundColor: selectedHub === 'Hub1' ? "#d3f9d8" : null, alignItems: 'center', marginTop: 10, marginLeft: 10, borderWidth: 1, marginBottom: 5 }}>
            <Text style={{ fontSize: 13, color: selectedHub === 'Hub1' ? "#206C00" : "#777", alignText: 'center', fontWeight: '600' }}>SAP FI Hub</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={onPressHub2}>
          <View style={{ justifyContent: "flex-start", paddingHorizontal: 10, marginLeft: 10, paddingVertical: 5, borderRadius: 10, borderColor: selectedHub === 'Hub2' ? "#206C00" : "#d3f9d8", backgroundColor: selectedHub === 'Hub2' ? "#d3f9d8" : null, alignItems: 'center', marginTop: 10, marginLeft: 10, borderWidth: 1, marginBottom: 5 }}>
            <Text style={{ fontSize: 13, color: selectedHub === 'Hub2' ? "#206C00" : "#777", alignText: 'center', fontWeight: '600' }}>Microsoft Azure Hub</Text>
          </View>
        </TouchableOpacity>
         
        <TouchableOpacity onPress={onPressHub3}>
          <View style={{ justifyContent: "flex-start", paddingHorizontal: 10, paddingVertical: 5,  marginLeft: 10, borderRadius: 10, borderColor: selectedHub === 'Hub3' ? "#206C00" : "#d3f9d8", backgroundColor: selectedHub === 'Hub3' ? "#d3f9d8" : null, alignItems: 'center', marginTop: 10, marginLeft: 10, borderWidth: 1, marginBottom: 5 }}>
            <Text style={{ fontSize: 13, color: selectedHub === 'Hub3' ? "#206C00" : "#777", alignText: 'center', fontWeight: '600' }}>Jr. Power Point Hub</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={onPressHub4}>
          <View style={{ justifyContent: "flex-start", paddingHorizontal: 10, paddingVertical: 5, borderRadius: 10, marginLeft: 10, borderColor: selectedHub === 'Hub4' ? "#206C00" : "#d3f9d8", backgroundColor: selectedHub === 'Hub4' ? "#d3f9d8" : null, alignItems: 'center', marginTop: 10, marginLeft: 10, borderWidth: 1, marginBottom: 5 }}>
            <Text style={{ fontSize: 13, color: selectedHub === 'Hub4' ? "#206C00" : "#777", alignText: 'center', fontWeight: '600' }}>Snr. Power Point Hub</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={onPressHub5}>
          <View style={{ justifyContent: "flex-start", paddingHorizontal: 10, paddingVertical: 5, borderRadius: 10, marginLeft: 10, borderColor: selectedHub === 'Hub5' ? "#206C00" : "#d3f9d8", backgroundColor: selectedHub === 'Hub5' ? "#d3f9d8" : null, alignItems: 'center', marginTop: 10, marginLeft: 10, borderWidth: 1, marginBottom: 5 }}>
            <Text style={{ fontSize: 13, color: selectedHub === 'Hub5' ? "#206C00" : "#777", alignText: 'center', fontWeight: '600' }}>Java Programming Hub</Text>
          </View>
        </TouchableOpacity>
       
      </View>
      </ScrollView>
      <TouchableOpacity onPress={() => scrollRight()}>
          <Image source={require('../assets/right-arrow.png')} style={{ width: 10, height: 10, marginLeft: 380, marginTop: -61, position: 'absolute', right: 10 }} />
        </TouchableOpacity>
    </View>
  );
}

function ChatListScreen({ navigation }) {
  const [selectedHub, setSelectedHub] = useState(null);
  const [messageCountText, setMessageCountText] = useState('0');
   const scrollViewRef = useRef(null);

  const filteredData = selectedHub ? data.filter(user => user.hub === selectedHub) : data;

  const handlePressAllChats = () => {
    setSelectedHub(null);
  };

  const handlePressHub1 = () => {
    setSelectedHub('Hub1');
  };

  const handlePressHub2 = () => {
    setSelectedHub('Hub2');
  };

  const handlePressHub3 = () => {
    setSelectedHub('Hub3');
  };

const handlePressHub4 = () => {
    setSelectedHub('Hub4');
  };
  
  const handlePressHub5 = () => {
    setSelectedHub('Hub5');
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => navigation.navigate('Chat', { userId: item.id })}>
      <View style={{ flexDirection: 'row', alignItems: 'center', padding: 16, borderBottomWidth: 1, borderBottomColor: '#E5E5E5', width: '100%' }}>
        <Image source={item.avatar} style={{ width: 36, height: 36, borderRadius: 18, marginRight: 12 }} />
        <View style={{ flex: 1 }}>
          <Text style={{ fontWeight: '500', fontSize: 15 }}>{item.name}</Text>
          <Text style={{ color: '#777', fontSize: 13 }}>{item.message}</Text>
        </View>
        <View style={{ flexDirection: 'column'}}>
        <Text style={{ color: '#777', fontSize: 13, marginBottom: 5 }}>{item.time}</Text>
        <View>
        {item.messagecount !== '0' && (
          <View style={{ width: 16, height: 16, borderRadius: 8, backgroundColor: '#4CAF50', justifyContent: 'center', alignItems: 'center', marginLeft: 40 }}>
            <Text style={{ color: 'white', fontWeight: '500', fontSize: 10 }}>{item.messagecount}</Text>
          </View>
        )}
      </View>
      </View>
    </View>
    </TouchableOpacity>
  );

  return (
    <View>
      <CustomHeader
        onPressAllChats={handlePressAllChats}
        onPressHub1={handlePressHub1}
        onPressHub2={handlePressHub2}
        onPressHub3={handlePressHub3}
        onPressHub4={handlePressHub4}
        onPressHub5={handlePressHub5}
        selectedHub={selectedHub}
        scrollViewRef={scrollViewRef}
      />
      <FlatList
        data={filteredData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}

export default ChatListScreen;
