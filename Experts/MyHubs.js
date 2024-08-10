import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Animated, Modal, ImageBackground, Image, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Topbar from '../components/expertstopbar';
import Sidebar from '../components/expertssidebar';
import OpenModal from '../components/Createhubform';
import { BlurView } from 'expo-blur';
import { useFonts } from 'expo-font';
import { useTranslation } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

function MyComponent() {
  const [scaleAnimations] = useState([...Array(8)].map(() => new Animated.Value(1)));
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [isFirstHubsHovered, setIsFirstHubsHovered] = useState(false);
  const [isSecondHubsHovered, setIsSecondHubsHovered] = useState(false);
  const [isThirdHubsHovered, setIsThirdHubsHovered] = useState(false);
  const [isOthersHovered, setIsOthersHovered] = useState(false);
  const [isAllHovered, setIsAllHovered] = useState(true);
  const [cardData, setCardData] = useState({ AllHubs: [] });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        if (!token) {
          console.error('No token found');
          return;
        }
        
        const response = await axios.get('https://recruitangle.com/api/expert/hubs/all', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
  
        if (response.status === 200) {
          console.log('Fetched data:', response.data); // Check the response structure
          setCardData(response.data);
        } else {
          console.error('Error fetching data:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching data:', error.response ? error.response.data : error.message);
      }
    };
  
    fetchData();
  }, []);
  

  const handleCardAnimation = (index, toValue) => {
    Animated.timing(scaleAnimations[index], {
      toValue,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  const goToMyHubs = () => {
    navigation.navigate('All Hubs');
  };

  const goToHubs = () => {
    navigation.navigate('Manage Hubs');
  };

  const handleOpenPress = () => {
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  const renderCards = () => {
    if (!cardData.AllHubs || cardData.AllHubs.length === 0) {
      return <Text>No data available</Text>;
    }

    return cardData.AllHubs.map((data, index) => (
      <Animated.View
        key={index}
        style={{
          width: '25%',
          paddingHorizontal: 5,
          marginBottom: 20,
          transform: [{ scale: scaleAnimations[index] }],
        }}
        onMouseEnter={() => handleCardAnimation(index, 1.05)}
        onMouseLeave={() => handleCardAnimation(index, 1)}
      >
        <View
          style={{
            width: '95%',
            height: 300,
            borderRadius: 5,
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
            backgroundColor: '#d3f9d8',
          }}
        >
          <View
            style={{
              justifyContent: 'center',
              alignSelf: 'center',
              width: '90%',
              height: 100,
              borderRadius: 5,
              backgroundColor: '#F0FFF9',
              marginRight: '4%',
              marginLeft: 10,
              alignItems: 'center',
              marginTop: 20,
              borderWidth: 1,
              borderColor: '#206C00',
            }}
          >
            <Text style={{ fontSize: 12, color: 'black', fontWeight: '600', marginTop: 10 }}>
              {data.coaching_hub_limit} Participants
            </Text>
            <Text style={{ fontSize: 13, color: '#206C00', marginBottom: 10 }}>
              {data.meeting_day}s
            </Text>
            <Text style={{ fontSize: 13, color: '#206C00', marginBottom: 10 }}>
             {data.from} - {data.to}
            </Text>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 10 }}>
            <View style={{ flex: 1 }}>
              <Text style={{ fontSize: 16, color: '#000', fontWeight: '600', marginTop: 20 }}>
                {data.coaching_hub_name}
              </Text>
              <Text style={{ fontSize: 12, color: 'black', fontWeight: '400' }}>
                Created: {new Date(data.created_at).toLocaleDateString()}
              </Text>
            </View>
          </View>
          <Text style={{ fontSize: 12, color: '#888', marginTop: 10, marginLeft: 10, height: 60 }}>
            {data.coaching_hub_description}
          </Text>
          <View style={{ flexDirection: 'row', marginLeft: 10, marginTop: 10 }}>
            <Text style={{ fontSize: 12, color: 'black', marginTop: 2, marginRight: 5 }}>
              Hub Fee
            </Text>
            <Text style={{ fontSize: 16, color: 'coral', fontWeight: 'bold' }}>
              {data.coaching_hub_fee}
            </Text>
          </View>
        </View>
      </Animated.View>
    ));
  };
  

  const [fontsLoaded] = useFonts({
    'Roboto-Light': require('../assets/fonts/Roboto-Light.ttf'),
  });
  const { t } = useTranslation();

  return (
    <ImageBackground source={require('../assets/backgroundimg2.png')} style={{ height: '120%', width: '100%', flex: 1 }}>
      <BlurView intensity={70} style={{ flex: 1 }}>
        <View style={{ flex: 1 }}>
          <Topbar />
          <View style={{ flexDirection: 'row', flex: 1 }}>
            <Sidebar />
            <ScrollView contentContainerStyle={{ flexGrow: 1, maxHeight: 500 }}>
              <View style={styles.glassBox}>
                <View style={styles.pagecontainer}>
                  <View style={{ flex: 1 }}>
                    <View style={styles.header}>
                      <TouchableOpacity
                        onPress={goToHubs}
                        underlayColor={isOthersHovered ? 'transparent' : 'transparent'}
                        onMouseEnter={() => setIsOthersHovered(true)}
                        onMouseLeave={() => setIsOthersHovered(false)}
                      >
                        <View style={styles.item}>
                          <Image
                            source={{
                              uri: 'https://cdn.builder.io/api/v1/image/assets/TEMP/925cfbb55e82458868f5e0c8cafbdc90d47bec0907e65b77fb918a7ac0dbcfe0?apiKey=7b9918e68d9b487793009b3aea5b1a32&',
                            }}
                            style={styles.image}
                          />
                          <Text style={[styles.headertext, isOthersHovered && { color: 'coral' }]}>{t('Manage Hubs')}</Text>
                        </View>
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={goToMyHubs}
                        underlayColor={isAllHovered ? 'transparent' : 'transparent'}
                        onMouseEnter={() => setIsAllHovered(true)}
                        onMouseLeave={() => setIsAllHovered(true)}
                      >
                        <View style={styles.item}>
                          <Image
                            source={{
                              uri: 'https://cdn.builder.io/api/v1/image/assets/TEMP/925cfbb55e82458868f5e0c8cafbdc90d47bec0907e65b77fb918a7ac0dbcfe0?apiKey=7b9918e68d9b487793009b3aea5b1a32&',
                            }}
                            style={styles.image2}
                          />
                          <Text style={[styles.headertext, isAllHovered && { color: 'coral' }]}>{t('All Hubs')}</Text>
                        </View>
                      </TouchableOpacity>
                    </View>
                    <TouchableOpacity onPress={handleOpenPress}>
                      <View
                        style={{
                          justifyContent: 'flex-start',
                          paddingHorizontal: 10,
                          paddingVertical: 10,
                          borderRadius: 5,
                          borderColor: '#206C00',
                          backgroundColor: '#d3f9d8',
                          width: 150,
                          alignItems: 'center',
                          marginTop: 20,
                          marginBottom: 10,
                          marginLeft: 50,
                          borderWidth: 1,
                        }}
                      >
                        <Text style={{ fontSize: 13, color: '#206C00', alignText: 'center', fontWeight: '600', fontFamily: 'Roboto-Light' }}>
                          + {t('Create New Hub')}
                        </Text>
                      </View>
                    </TouchableOpacity>
                    <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginTop: 30, marginRight: 50, marginLeft: 50 }}>
                      {renderCards()}
                    </View>
                  </View>
                </View>
              </View>
            </ScrollView>
          </View>
        </View>
        <Modal animationType="slide" transparent={true} visible={modalVisible} onRequestClose={handleCloseModal}>
          <View style={styles.modalContent}>
            <OpenModal onClose={() => handleCloseModal()} />
          </View>
        </Modal>
      </BlurView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  modalContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  pagecontainer: {
    backgroundColor: '#f7fff4',
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    padding: 20,
    marginTop: 30,
    marginLeft: 30,
    marginRight: 30,
    marginBottom: 30,
    borderWidth: 2,
    borderColor: 'rgba(225,225,212,0.3)',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  glassBox: {
    backgroundColor: 'rgba(225,255,212,0.3)',
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    marginTop: 30,
    marginLeft: 240,
    marginRight: 30,
    marginBottom: 30,
  },
  header: {
    marginLeft: 0,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    backgroundColor: 'none',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#CCC',
  },
  item: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  headertext: {
    marginLeft: 5,
    fontSize: 14,
    fontWeight: '500',
    color: '#666',
    fontFamily: 'Roboto-Light',
  },
  image: {
    width: 24,
    height: 24,
    marginRight: 5,
    marginLeft: 50,
  },
  image2: {
    width: 24,
    height: 24,
    marginRight: 5,
    marginLeft: 100,
  },
  greenBox: {
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(225,225,212,0.3)',
  },
  blurBackground: {
    flex: 1,
  },
});

export default MyComponent;
