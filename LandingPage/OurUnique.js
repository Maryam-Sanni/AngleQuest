import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Modal, } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Top from './landtop';
import {useFonts} from "expo-font" 
import OpenModal from './Collectinfo';

const MyComponent = () => {
  const navigation = useNavigation(); // Navigation object

  const [ModalVisible, setModalVisible] = useState(false);

  const handleOpenPress = () => {
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    onClose();
  };
  
  return (
    <View style={{ flex: 1  }}>
      <Top/ >
    <View style={styles.container}>
      <Text style={styles.header}>Our Unique Story</Text>
      <Text style={{fontSize: 16, color: 'black', marginTop: 20, fontWeight: '400', width: 800,}}>Upon commencement of our visionary journey, our mission was clear which was to create a platform that empowers recruiters to validate candidates more effectively, reducing the rejection rates often experienced by recruiters and candidates. Undoubtedly, before writing a single line of code, we understood the importance of engaging with experts within this industry—the recruiters themselves. Because, let's face it, they know their industry best.
      </Text>
   
      <Text style={{fontSize: 16, color: 'black', marginTop: 15, fontWeight: '400', width: 800,}}>Several conversation was had with dozens of recruiters, and their openness was both refreshing and enlightening which resulted to discovery deeper and much  more pressing.</Text>
    
      <Text style={{fontSize: 16, color: 'black', marginTop: 15, fontWeight: '400', width: 800,}}>Their challenge wasn't just about finding the right candidates; it was about how professionals, startups, teams, and companies manage their talent. Perhaps unlocking potential, fostering growth, and truly supporting individuals in a world where AI isn't just about instant gratification, but about anticipating needs and driving success.</Text>
   
      <Text style={{fontSize: 16, color: 'black', marginTop: 15, fontWeight: '400', width: 800,}}>With the invaluable insights and guidance from these incredible individuals, AngleQuest was innovated. Our platform addresses these fundamental challenges, reshaping the professional landscape to ensure that everyone can thrive in this dynamic environment.</Text>
      <TouchableOpacity onPress={handleOpenPress}>
      <Text style={styles.buttonTextplus}> Be among the first 1,000 persons to see AngleQuest in 50 days</Text>
                </TouchableOpacity>
                <Image
                  source={require('../assets/Puzzle2.png')}
                  style={styles.image}
                />
    </View>

    <Modal
        animationType="slide"
        transparent={true}
        visible={ModalVisible}
        onRequestClose={handleCloseModal}
      >
        <View style={styles.modalContent}>
          <OpenModal onClose={handleCloseModal} />
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
    modalContent: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.1)',
      },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#F8F8F8',
    borderRadius: 10,
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'darkgreen',
    textAlign: 'center',
  },
  buttonplus: {
    backgroundColor: '#F83838',
    padding: 10,
    marginTop: 50,
    width: 250,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonTextplus: {
    color: 'darkgreen',
    fontSize: 14,
    marginTop: 20,
    fontWeight: '600',
    padding: 5,
  backgroundColor: '#E6FFE6',
    textAlign: 'center',
  },
  image: {
    marginTop: 30,
    width: 500,
    height: 250,
  },
});

export default MyComponent;
