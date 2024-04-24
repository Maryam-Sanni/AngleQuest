import React, { useState } from 'react';
import { View, FlatList, Text, TouchableOpacity, Image, Modal, StyleSheet, TouchableWithoutFeedback  } from 'react-native';
import CreateCoachingHubForm from './Createhubform'; 

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

function CustomHeader({ onPressAdd }) {
  return (
    <View style={{ backgroundColor: 'white', padding: 16 }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',  }}>
        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Chats</Text>
        <TouchableOpacity onPress={onPressAdd}>
          <View style={{ width: 36, height: 36, borderRadius: 18, backgroundColor: '#206C00', justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ color: 'white', fontSize: 24, marginTop: -5 }}>+</Text>
          </View>
        </TouchableOpacity>
      </View>
      <View style={{ borderBottomWidth: 1, borderBottomColor: 'grey', marginTop: 16 }} />
    </View>
  );
}

function ChatListScreen({ navigation }) {
  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => navigation.navigate('Chat', { userId: item.id })}>
      <View style={{ flexDirection: 'row', alignItems: 'center', padding: 16, borderBottomWidth: 1, borderBottomColor: '#E5E5E5' }}>
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
    <View>
      <CustomHeader onPressAdd={toggleModal} />
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={toggleModal}
      >
        <TouchableWithoutFeedback onPress={toggleModal}>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <TouchableOpacity style={styles.closeButton} onPress={toggleModal}>
                <Text style={{ fontSize: 24 }}>×</Text>
              </TouchableOpacity>
              <CreateCoachingHubForm />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '80%',
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ChatListScreen;