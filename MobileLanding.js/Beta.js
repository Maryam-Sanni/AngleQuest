import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Modal, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Top from './landtop';
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

  const goToStart = () => {
    navigation.navigate('Our Story'); // Navigate to 'JoinAs' page
  };

  const [currentText, setCurrentText] = useState('Power Platform & Dynamics CE');
  const [currentColor, setCurrentColor] = useState('#206C00');

  useEffect(() => {
    const texts = ['Power Platform & Dynamics CE', 'Microsoft Azure', 'SAP FI', 'Dynamics F&O', 'Salesforce', 'Business Central', 'Full-Stack Development'];
    const colors = ['#206C00', '#C87081', '#121F64', '#F83838', '#FFBF40', '#4489DA', 'coral'];
    let index = 0;

    const interval = setInterval(() => {
      index = (index + 1) % texts.length;
      setCurrentText(texts[index]);
      setCurrentColor(colors[index]);
    }, 4000); // Change text and color every 2 seconds

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <Top />
      <ScrollView contentContainerStyle={{ flexGrow: 1, maxHeight: 500 }}>
      <View style={styles.container}>
        <Text style={styles.header}>Beta coming in 50 days</Text>
        <Text style={{ fontSize: 35, textAlign: 'center', fontWeight: 600 }}>Super-charge your team members</Text>
        <Text style={{ fontSize: 35, color: currentColor, textAlign: 'center', fontWeight: 600 }}>
          {currentText}
          <Text style={{ fontSize: 35, color: 'black', textAlign: 'center', fontWeight: 600 }}> career growth and efficiency</Text>
        </Text>
        <Text style={{ fontSize: 18, color: 'grey', marginTop: 30, padding: 10, textAlign: 'center' }}>
          A unique toolkit for team impact management.
        </Text>
        <Text style={{ fontSize: 18, color: 'grey', padding: 10, textAlign: 'center', marginTop: -15 }}>
        Designed for individuals & businesses of all sizes who wants to optimize their efficiency.
        </Text>
        <TouchableOpacity onPress={handleOpenPress} style={styles.buttonplus}>
          <Text style={styles.buttonTextplus}>Sign up for early access</Text>
        </TouchableOpacity>
        <Image
          source={require('../assets/Puzzle2.png')}
          style={styles.image}
        />
        <Text style={styles.heading}>Our Unique Story</Text>
        <View style= {{ padding: 20, justifyContent: 'center' }}>
      <Text style={{fontSize: 18, color: 'black', marginTop: 10 }}>Upon commencement of our visionary journey, our mission was clear which was to create a platform that empowers recruiters to validate candidates more effectively, reducing the rejection rates often experienced by recruiters and candidates. Undoubtedly, before writing a single line of code, we understood the importance of engaging with experts within this industry—the recruiters themselves. Because, let's face it, they know their industry best.
      </Text>
      <Text style={{fontSize: 18, color: 'black', marginTop: 10 }}>Several conversation was had with dozens of recruiters, and their openness was both refreshing and enlightening. What we discovered was a deeper, more pressing issue at play.
      </Text>
      <Text style={{fontSize: 18, color: 'black', marginTop: 10 }}>Their challenge wasn't just about finding the right candidates; it was about how professionals, startups, teams, and companies manage their talent. Perhaps unlocking potential, fostering growth, and truly supporting individuals in a world where AI isn't just about instant gratification, but about anticipating needs and driving success.</Text>
      <Text style={{fontSize: 18, color: 'black', marginTop: 10 }}>With the invaluable insights and guidance from these incredible individuals, AngleQuest was innovated. Our platform addresses these fundamental challenges, reshaping the professional landscape to ensure that everyone can thrive in this dynamic environment.</Text>
      </View>
      <TouchableOpacity onPress={handleOpenPress}>
      <Text style={styles.buttonBeFirst}>Be among the first 1,000 persons to see AngleQuest in 50 days</Text>
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
      </ScrollView>
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
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#F8F8F8',
  },
  header: {
    fontSize: 16,
    marginTop: 20,
    marginBottom: 5,
    fontWeight: 'bold',
    color: 'red',
    textAlign: 'center',
  },
  buttonplus: {
    backgroundColor: 'coral',
    padding: 10,
    marginTop: 40,
    width: 250,
    paddingHorizontal: 20,
  },
  buttonTextplus: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  image: {
    marginTop: 50,
    width: 300,
    height: 150,
  },
  heading: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'darkgreen',
    marginTop: 50,
    textAlign: 'center',
  },
  buttonBeFirst: {
    color: 'darkgreen',
    fontSize: 14,
    marginTop: 20,
    fontWeight: '600',
    padding: 5,
    textAlign: 'center',
    textDecorationLine: 'underline',
  
  },
});

export default MyComponent;
