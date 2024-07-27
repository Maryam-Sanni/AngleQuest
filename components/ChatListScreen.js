import React from 'react';
import { View, ScrollView, FlatList, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
 
const data = [
  {
    id: '1',
    name: 'Amelia Harry',
    message: 'Hello John, This Amelia, This is...',
    time: '10:00 AM',
    messagecount: '0',
    avatar: require('../assets/useravatar1.png')
  },
  {
    id: '2',
    name: 'Bwanbale Akiki',
    message: 'I will send my CV to you sir for proper',
    time: '12:08 PM',
    messagecount: '1',
    avatar: require('../assets/useravatar2.png')
  },
  {
    id: '3',
    name: 'Mardiyyah Sulaimon',
    message: 'Ready for the meeting?',
    time: '05:23 PM',
    messagecount: '3',
    avatar: require('../assets/useravatar4.png')
  },
  {
    id: '4',
    name: 'Software Eng. Hub',
    message: 'Lets reconvene same time tomorrow',
    time: 'Yesterday',
    messagecount: '0',
    avatar: require('../assets/useravatar.jpg')
  },
  {
    id: '5',
    name: 'Nathan Arthur',
    message: 'You are doing great! Dont doubt your potentials...',
    time: 'Yesterday',
    messagecount: '0',
    avatar: require('../assets/useravatar5.jpg')
  },
  {
    id: '6',
    name: 'Microsoft Hub',
    message: 'Remember youre here to learn',
    time: '29/05/24',
    messagecount: '5',
    avatar: require('../assets/useravatar.jpg')
  },
  {
    id: '7',
    name: 'SAP Hub',
    message: 'Welcome to the SAP coaching hub',
    time: '27/05/24',
    messagecount: '0',
    avatar: require('../assets/useravatar.jpg')
  },
  {
    id: '8',
    name: 'Akeju Benson',
    message: 'Good morning John, Lets continue from...',
    time: '13/04/24',
    messagecount: '10',
    avatar: require('../assets/useravatar5.jpg')
  },
  {
    id: '9',
    name: 'Royale Charles',
    message: 'Hi Charles, it is a great morning...',
    time: '10/04/24',
    messagecount: '0',
    avatar: require('../assets/useravatar2.png')
  },
  {
    id: '10',
    name: 'Mia Gonzalez',
    message: 'Hi',
    time: '07/02/24',
    messagecount: '0',
    avatar: require('../assets/useravatar4.png')
  },
];



function CustomHeader() {
  const { t } = useTranslation()
  
  return (
    <View style={styles.headerContainer}>
      <Text style={styles.headerText}>{t("Chats")}</Text>
    </View>
  );
}

function ChatListScreen({ onUserSelect }) {
  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => onUserSelect(item.id)}>
      <View style={styles.itemContainer}>
        <Image source={item.avatar} style={styles.avatar} />
        <View style={styles.messageContainer}>
          <Text style={styles.userName}>{item.name}</Text>
          <Text style={styles.message}>{item.message}</Text>
        </View>
        <View style={styles.timeAndCount}>
          <Text style={styles.time}>{item.time}</Text>
          {item.messagecount !== '0' && (
            <View style={styles.messageCount}>
              <Text style={styles.messageCountText}>{item.messagecount}</Text>
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <CustomHeader />
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {

  },
  headerContainer: {
    padding: 16,
    backgroundColor: '#F8F8F8',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 12,
  },
  messageContainer: {
    flex: 1,
    
  },
  userName: {
    fontWeight: '500',
    fontSize: 18,
  },
  message: {
    color: '#777',
    fontSize: 14,
  },
  timeAndCount: {
    flexDirection: 'column',
    alignItems: 'flex-end',
  },
  time: {
    color: '#777',
    fontSize: 13,
    marginBottom: 5,
  },
  messageCount: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#4CAF50',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 40,
  },
  messageCountText: {
    color: 'white',
    fontWeight: '500',
    fontSize: 10,
    textAlign: 'center',
  },
});

export default ChatListScreen;
