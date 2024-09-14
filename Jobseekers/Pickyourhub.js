import React, { useState, useEffect } from 'react';
import { View, Text, Image, ScrollView, Animated, TouchableOpacity, StyleSheet, Modal, Picker, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import OpenModal from '../Jobseekers/Moreabouthub';
import OpenModal3 from '../Jobseekers/PaymentDetails';
import OpenSchedule2 from '../components/JProfile';
import {useFonts} from "expo-font"
import { useTranslation } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

 
function MyComponent({ onClose }) {
  const [scaleAnimations] = useState([...Array(12)].map(() => new Animated.Value(1)));
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisible2, setModalVisible2] = useState(false);
  const [modalVisible3, setModalVisible3] = useState(false);
  const [search, setSearch] = useState('');
  const [selectedValue, setSelectedValue] = useState('');
  const [attend, setattend] = useState('No');
  const [isDropdown, setIsDropdown] = useState(false);
  const [isPressed, setIsPressed] = useState(Array(4).fill(false)); // State for tracking button press
  const [cardData, setCardData] = useState({ AllHubs: [] });
   const [selectedCategory, setSelectedCategory] = useState('');
   const [selectedIndex, setSelectedIndex] = useState(null);
  const [token, setToken] = useState("");
  const [subscriptionStatus, setSubscriptionStatus] = useState(null);
  const [selectedHub, setSelectedHub] = useState(null);
   const [Sessionsheld, setSessionsheld] = useState('0');
   const [Sessionsmissed, setSessionsmissed] = useState('0');
   const [Confirmed, setSetConfirmed] = useState('No');
 

  useEffect(() => {
    const getToken = async () => {
      const storedToken = await AsyncStorage.getItem('token');
      setToken(storedToken);
    };
    getToken();
  }, []);

  const toggleMode = () => {
    setIsDropdown(!isDropdown);
    setSelectedValue('');
    setSearch('');
  };

  const handleOpenPress = () => {
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  const handleOpenPress2 = () => {
    setModalVisible2(true);
  };

  const handleCloseModal2 = () => {
    setModalVisible2(false);
  };

  useEffect(() => {
    // Fetch the subscription status when the component mounts
    const fetchSubscriptionStatus = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        if (token) {
          const response = await axios.get('https://recruitangle.com/api/jobseeker/get-subscription', {
            headers: { Authorization: `Bearer ${token}` }
          });
          setSubscriptionStatus(response?.data?.JSSubscriptionStatus?.subscribed);
        }
      } catch (error) {
        console.error('Error fetching subscription status:', error.response ? error.response.data : error.message);
      }
    };

    fetchSubscriptionStatus();
  }, []);

const handleOpenPress3 = async () => {
  try {
    if (!subscriptionStatus) {
      console.error('Subscription status is not available');
      return;
    }

    if (subscriptionStatus === 'Yes') {
      navigation.navigate('Coaching Hub Sessions');
      onClose();
    } else {
      setModalVisible3(true);
    }
  } catch (error) {
    console.error('Error checking subscription status:', error.response ? error.response.data : error.message);
  }
};

  useEffect(() => {
    if (!selectedHub) return;

    const createHubAndJoinExpertHub = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        if (!token) {
          console.error('No token found');
          return;
        }

        // POST to create the hub
        const createHubResponse = await axios.post('https://recruitangle.com/api/jobseeker/create-hub', {
          category: selectedHub.category,
          meeting_day: selectedHub.meeting_day,
          from: selectedHub.from,
          to: selectedHub.to,
          coaching_hub_name: selectedHub.coaching_hub_name,
          expert_name: selectedHub.expert_name,
          coaching_hub_description: selectedHub.coaching_hub_description,
          coaching_hub_fee: selectedHub.coaching_hub_fee,
          attend: attend
        }, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (createHubResponse.status === 200) {
          console.log('Hub successfully created');

          // Get jobseeker details from AsyncStorage
          const firstName = await AsyncStorage.getItem('first_name');
          const lastName = await AsyncStorage.getItem('last_name');
          const jobseekerId = await AsyncStorage.getItem('user_id');
          const jobseekerName = `${firstName} ${lastName}`;

          // POST to join the expert hub
          const joinHubResponse = await axios.post('https://recruitangle.com/api/jobseeker/join-expert-hub', {
            jobseeker_name: jobseekerName,
            jobseeker_id: jobseekerId,
            expert_id: selectedHub.user_id,
            hub_id: selectedHub.id, 
            hub_sessions_held: Sessionsheld,
            hub_sessions_missed: Sessionsmissed,
            confirmed_attendance: Confirmed
          }, {
            headers: { Authorization: `Bearer ${token}` },
          });

          if (joinHubResponse.status === 200) {
            console.log('Successfully joined expert hub');
            // Handle success (e.g., navigate to a different screen or show a success message)
          } else {
            console.error('Error joining expert hub:', joinHubResponse.statusText);
          }
        } else {
          console.error('Error creating hub:', createHubResponse.statusText);
        }
      } catch (error) {
        console.error('Error:', error.response ? error.response.data : error.message);
      }
    };

    createHubAndJoinExpertHub();
  }, [selectedHub]);


  const handleCloseModal3 = () => {
    setModalVisible3(false);
     onClose();
  };
  
  const handleJoinPressIn = (index) => {
    setIsPressed((prev) => {
      // Create a new state where only the currently pressed index is true
      const newState = Array(4).fill(false);
      newState[index] = true;
      return newState;
    });
    setSelectedIndex(index);
    setSelectedHub(cardData.AllHubs[index]);
  };
  
  const handleJoinPressOut = () => {
    // No need to update the state here
  };
  
  
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
    Animated.timing(
      scaleAnimations[index],
      {
        toValue,
        duration: 200,
        useNativeDriver: true,
      }
    ).start();
  };

  const {t}=useTranslation()
  
  const handleCardPress = (index) => {
    setSelectedIndex(index);
    setSelectedHub(cardData.AllHubs[index]); // Store the selected hub's data
  };


  const renderCards = () => {
    const filteredData = cardData.AllHubs.filter(data => 
      !selectedCategory || data.category === selectedCategory
    );

    return filteredData.map((data, index) => (
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
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
            backgroundColor: "#d3f9d8",
          }}
        >
          <TouchableOpacity onPress={handleOpenPress2}>
            <View style={{ justifyContent: "center", alignSelf: 'center', width: '90%', height: 110, borderRadius: 5, backgroundColor: "#F0FFF9", marginRight: "5%", marginLeft: 10, alignItems: 'center', marginTop: 10, borderWidth: 1, borderColor: '#206C00' }}>
              <View style={{ flexDirection: 'row' }}>
                <Image
                  source={{ uri: 'https://cdn.builder.io/api/v1/image/assets/TEMP/96214782d7fee94659d7d6b5a7efe737b14e6f05a42e18dc902e7cdc60b0a37b' }}
                  style={{ width: 30, height: 30, aspectRatio: 1, marginTop: 20 }}
                />
                <Image
                  source={{ uri: 'https://cdn.builder.io/api/v1/image/assets/TEMP/96214782d7fee94659d7d6b5a7efe737b14e6f05a42e18dc902e7cdc60b0a37b' }}
                  style={{ width: 30, height: 30, aspectRatio: 1, marginLeft: -5, marginTop: 20 }}
                />
                <Image
                  source={{ uri: 'https://cdn.builder.io/api/v1/image/assets/TEMP/96214782d7fee94659d7d6b5a7efe737b14e6f05a42e18dc902e7cdc60b0a37b' }}
                  style={{ width: 30, height: 30, aspectRatio: 1, marginLeft: -5, marginTop: 20 }}
                />
              </View>
              <Text style={{ fontSize: 12, color: "black", fontWeight: '600', marginTop: 10 }}>
                {data.category}
              </Text>
              <Text style={{ fontSize: 13, color: "#206C00", marginTop: 5 }}>
                {data.meeting_day}s
              </Text>
              <Text style={{ fontSize: 13, color: "#206C00", marginBottom: 10 }}>
               {data.from} - {data.to}
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleOpenPress}>
            <View style={{ flexDirection: "row", alignItems: "center", marginLeft: 10, }}>
              <View style={{ flex: 1, }}>
                <Text style={{ fontSize: 16, color: "#000", fontWeight: '600', marginTop: 10 }}>{data.coaching_hub_name}</Text>
                <Text style={{ fontSize: 12, color: "black", fontWeight: '400' }}>
                  {t("Coach")}: {data.expert_name}
                </Text>
              </View>
            </View>

            <Text style={{ fontSize: 12, color: "#888", marginTop: 10, marginLeft: 10, height: 60 }}>{data.coaching_hub_description}</Text>

            
          </TouchableOpacity>
      <TouchableOpacity
            onPressIn={() => handleJoinPressIn(index)}
            onPressOut={handleJoinPressOut}
            style={{
              borderWidth: 1,
                borderColor: '#206C00',
                backgroundColor: "#F0FFF9",
                borderRadius: 5,
                paddingHorizontal: 50,
                paddingVertical: 5,
                marginTop: 15,
                width: "90%",
                alignSelf: "center",
                justifyContent: 'center',
                marginLeft: 10,
                marginRight: 10,
              backgroundColor: isPressed[index] ? 'coral' : '#F0FFF9',
            }}
          >
         <Text style={{ color: isPressed[index] ? '#fff' : '#206C00', textAlign: 'center', fontWeight: 'bold', fontSize: 14 }}>Join Hub</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    ));
  };

  const [fontsLoaded]=useFonts({
    'Roboto-Light':require("../assets/fonts/Roboto-Light.ttf"),
  })


  return (
    <View style={{ flex: 1, backgroundColor: "#F8F8F8", marginTop: 40, alignItems: 'center' }}>
      <ScrollView contentContainerStyle={{ flexGrow: 1, maxHeight: 500 }}>
        <View style={styles.greenBox}>
          <View style={styles.header}>
            <Image
              source={{ uri: 'https://cdn.builder.io/api/v1/image/assets/TEMP/1f2d38e99b0016f2bd167d2cfd38ff0d43c9f94a93c84b4e04a02d32658fb401?apiKey=7b9918e68d9b487793009b3aea5b1a32&' }} // replace with your logo URL
              style={styles.logo}
            />
            <Text style={styles.headerText}>{t("Hubs")}</Text>

            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Text style={{ fontSize: 18, color: '#3F5637', fontWeight: 'bold',fontFamily:"Roboto-Light" }}>
                ✕
              </Text>
            </TouchableOpacity>
          </View>

          <View style={{ alignItems: 'flex-start', marginLeft: 40, }}>
            <Text style={{ fontSize: 16, color: "black", alignText: 'flex-start', fontWeight: 'bold', marginTop: 5,fontFamily:"Roboto-Light" }}>{t("Pick an hub you will like to join")}</Text>
            <Text style={{ fontSize: 14, color: "black", alignText: 'flex-start', marginBottom: 10,fontFamily:"Roboto-Light" }}>{t("Use the search or the dropdown to filter")}</Text>
            <View style={{ flexDirection: 'row', marginTop: 10}}>
              <Picker
                selectedValue={selectedCategory}
                style={styles.picker}
                onValueChange={(itemValue) => setSelectedCategory(itemValue)}
              >
                <Picker.Item label="All Categories" value="" />
                <Picker.Item label="SAP" value="SAP" />
                <Picker.Item label="Microsoft" value="Microsoft" />
                <Picker.Item label="Salesforce" value="Salesforce" />
                <Picker.Item label="Frontend Development" value="Frontend Development" />
                <Picker.Item label="Backend Development" value="Backend Development" />
                <Picker.Item label="UI/UX" value="UI/UX" />
                <Picker.Item label="Data Analysis" value="Data Analysis" />
                <Picker.Item label="Cloud Computing" value="Cloud Computing" />
                <Picker.Item label="Management" value="Management" />
              </Picker>

                <TextInput
                  placeholder={t("Search")}
                  style={styles.input}
                />
     </View>
          </View>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginTop: 30, marginLeft: 30, marginRight: 30 }}>
            {renderCards()}
          </View>
          <TouchableOpacity onPress={handleOpenPress3} style={styles.buttonplus} >
            <Text style={styles.buttonTextplus}>{t("Continue")}</Text>
          </TouchableOpacity>
        </View>

        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={handleCloseModal}
        >
          <View style={styles.modalContent}>
            <OpenModal onClose={() => handleCloseModal()} />
          </View>
        </Modal>

        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible3}
          onRequestClose={handleCloseModal}
        >
          <View style={styles.modalContent}>
            <OpenModal3 onClose={() => handleCloseModal3()} />
          </View>
        </Modal>
        
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible2}
          onRequestClose={handleCloseModal2}
        >
          <View style={styles.modalContent}>
            <OpenSchedule2 onClose={() => handleCloseModal2()} />
          </View>
        </Modal>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  modalContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 10
  },
  greenBox: {
    width: 1000,
    height: 700,
    backgroundColor: '#F8F8F8',
  },
  buttonplus: {
    backgroundColor: 'coral',
    borderRadius: 5,
    padding: 5,
    marginLeft: 820, 
    width: 150,
    paddingHorizontal: 20,
    marginTop: 20,
  },
  buttonTextplus: {
    color: 'white',
    fontSize: 14,
    textAlign: 'center',
    fontFamily:"Roboto-Light"
  },
  closeButton: {
    position: 'absolute',
    top: 20,
    right: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#CCC',
    marginBottom: 20
  },
  logo: {
    width: 40,
    height: 40,
    marginRight: 10
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#3F5637',
    fontFamily:"Roboto-Light"
  },
  dropcontainer: {
    justifyContent: 'center',
    width: 400,
    marginTop: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: 500,
  },
  input: {
    width: "100%",
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingLeft: 8,
    borderRadius: 5,
    marginRight: 10,
    backgroundColor: 'white',
    fontSize: 16,
  },
  picker: {
    width: 700,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    marginRight: 20
  },
  iconContainer: {
    padding: 8,
  },
  joinButton: {
    borderWidth: 1,
    borderColor: '#206C00',
    backgroundColor: "#F0FFF9",
    borderRadius: 5,
    paddingHorizontal: 50,
    paddingVertical: 5,
    marginTop: 15,
    width: "90%",
    alignSelf: "center",
    justifyContent: 'center',
    marginLeft: 10,
    marginRight: 10
  },
  joinButtonPressed: {
    borderColor: 'coral',
    backgroundColor: 'coral',
  },
  joinButtonText: {
    color: "#206C00",
    fontWeight: "bold",
    textAlign: 'center',
    fontSize: 14
  },
  joinButtonTextPressed: {
    color: 'white',
  },
});

export default MyComponent;

