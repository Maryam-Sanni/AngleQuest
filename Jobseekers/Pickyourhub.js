import React, { useState } from 'react';
import { View, Text, Image, ScrollView, Animated, TouchableOpacity, StyleSheet, Modal, Picker, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import OpenModal from '../Jobseekers/Moreabouthub';
import OpenSchedule2 from '../components/JProfile';

function MyComponent({ onClose }) {
  const [scaleAnimations] = useState([...Array(12)].map(() => new Animated.Value(1)));
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisible2, setModalVisible2] = useState(false);
  const [search, setSearch] = useState('');
  const [selectedValue, setSelectedValue] = useState('');
  const [isDropdown, setIsDropdown] = useState(false);
  const [isPressed, setIsPressed] = useState(Array(4).fill(false)); // State for tracking button press

  const goToPlans = () => {
    navigation.navigate('Hubs Payment');
    onClose(); // Close the modal
  };

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

  const handleJoinPressIn = (index) => {
    setIsPressed((prev) => {
      const newState = [...prev];
      newState[index] = !prev[index]; // Toggle the state only if it's different from the previous state
      return newState;
    });
  };  
  
  const handleJoinPressOut = (index) => {
    // No need to update the state here
  };
  
  
  

  const cardData = [
    {
      title: "SAP FI",
      coach: "Joop Melcher",
      description: "Customizing and configuring the SAP FICO system. Testing, support, and user training.",
      participants: 104,
      schedule: "10:30AM - 01:30PM, Thurs.",
      fee: "$50.00"
    },
    {
      title: "Frontend",
      coach: "Philip Josh",
      description: "Create UI and optimize User Experiences with HTML, CSS, and JavaScript.",
      participants: 30,
      schedule: "09:00PM - 10:30PM, Fri.",
      fee: "$120.00"
    },
    {
      title: "Backend",
      coach: "Olatunji Raymond",
      description: "Build server-side systems that handle data storage and communication with frontend.",
      participants: 90,
      schedule: "09:00AM - 12:00PM, Tue.",
      fee: "$75.00"
    },
    {
      title: "Java Programming",
      coach: "John Doe",
      description: "Learn Java programming from scratch. From basic to advanced concepts covered.",
      participants: 75,
      schedule: "02:00PM - 04:00PM, Mon.",
      fee: "$40.00"
    },
  ];

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

 

  const renderCards = () => {
    return cardData.map((data, index) => (
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
            <View style={{ justifyContent: "center", alignSelf: 'center', width: '90%', height: 100, borderRadius: 5, backgroundColor: "#F0FFF9", marginRight: "5%", marginLeft: 10, alignItems: 'center', marginTop: 10, borderWidth: 1, borderColor: '#206C00' }}>
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
                {data.participants} Participants
              </Text>
              <Text style={{ fontSize: 13, color: "#206C00", marginBottom: 10 }}>
                {data.schedule}
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleOpenPress}>
            <View style={{ flexDirection: "row", alignItems: "center", marginLeft: 10, }}>
              <View style={{ flex: 1, }}>
                <Text style={{ fontSize: 16, color: "#000", fontWeight: '600', marginTop: 10 }}>{data.title}</Text>
                <Text style={{ fontSize: 12, color: "black", fontWeight: '400' }}>
                  Coach: {data.coach}
                </Text>
              </View>
            </View>

            <Text style={{ fontSize: 12, color: "#888", marginTop: 10, marginLeft: 10, }}>{data.description}</Text>

            <View style={{ flexDirection: 'row', marginLeft: 10, marginTop: 10 }}>
              <Text style={{ fontSize: 12, color: "black", marginTop: 2, marginRight: 5 }}>Hub Fee</Text>
              <Text style={{ fontSize: 16, color: "coral", fontWeight: 'bold' }}>
                {data.fee} </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
          style={[
            styles.joinButton,
            isPressed[index] && styles.joinButtonPressed,
          ]}
          onPressIn={() => handleJoinPressIn(index)}
          onPressOut={() => handleJoinPressOut(index)}
        >
          <Text style={[
            styles.joinButtonText,
            isPressed[index] && styles.joinButtonTextPressed,
          ]}>
            Join Hub
          </Text>
        </TouchableOpacity>
        </View>
      </Animated.View>
    ));
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#F8F8F8", marginTop: 40, alignItems: 'center' }}>
      <ScrollView contentContainerStyle={{ flexGrow: 1, maxHeight: 500 }}>
        <View style={styles.greenBox}>
          <View style={styles.header}>
            <Image
              source={{ uri: 'https://cdn.builder.io/api/v1/image/assets/TEMP/1f2d38e99b0016f2bd167d2cfd38ff0d43c9f94a93c84b4e04a02d32658fb401?apiKey=7b9918e68d9b487793009b3aea5b1a32&' }} // replace with your logo URL
              style={styles.logo}
            />
            <Text style={styles.headerText}>Hubs</Text>

            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Text style={{ fontSize: 18, color: '#3F5637', fontWeight: 'bold' }}>
                ✕
              </Text>
            </TouchableOpacity>
          </View>

          <View style={{ alignItems: 'flex-start', marginLeft: 40, }}>
            <Text style={{ fontSize: 16, color: "black", alignText: 'flex-start', fontWeight: 'bold', marginTop: 5 }}>Pick an hub you will like to join</Text>
            <Text style={{ fontSize: 14, color: "black", alignText: 'flex-start', marginBottom: 10 }}>Use the search or the dropdown to filter</Text>
            <View style={{ flexDirection: 'row', marginTop: 10}}>
     <Picker
                  style={styles.picker}
                >
                  <Picker.Item label="Category" value="Category" />
                  <Picker.Item label="Java Engineering" value="Java Engineering" />
                  <Picker.Item label="SAP FI" value="SAP FI" />
                  <Picker.Item label="Microsoft Azure" value="Microsoft Azure" />
                  <Picker.Item label="Dev Ops" value="Dev Ops" />
                  <Picker.Item label="Frontend Development" value="Frontend Development" />
                  <Picker.Item label="Backend Development" value="Backend Development" />
                  <Picker.Item label="Fullstack Development" value="Fullstack Development" />
                  <Picker.Item label="Data Analysis" value="Data Analysis" />
                  <Picker.Item label="UI/UX Design" value="UI/UX Design" />
                </Picker>

                <TextInput
                  placeholder="Search"
                  style={styles.input}
                />
     </View>
          </View>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginTop: 30, marginLeft: 30, marginRight: 30 }}>
            {renderCards()}
          </View>
          <TouchableOpacity onPress={goToPlans} style={styles.buttonplus} >
            <Text style={styles.buttonTextplus}>Continue</Text>
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
    color: '#3F5637'
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

