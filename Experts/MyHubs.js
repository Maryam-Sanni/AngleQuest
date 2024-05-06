import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Animated, Modal, TextInput, Image, TouchableHighlight } from 'react-native';
import Topbar from '../components/expertstopbar';
import Sidebar from '../components/expertssidebar';
import { useNavigation } from '@react-navigation/native';

function MyComponent() {
  const [scaleAnimations] = useState([...Array(12)].map(() => new Animated.Value(1)));
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [userInput, setUserInput] = useState({
    goals: '',
    reasons: ''
  });

  const cardData = [
    {
      title: "SAP FI",
      visibility: "Public",
      description: "Customizing and configuring the SAP FICO system. Testing, support, and user training.",
      participants: 104,
      schedule: "10:30AM - 01:30PM, Thurs.",
      fee: "$50.00"
    },
    {
      title: "Dev Ops",
      visibility: "Private",
      description: "The practices and tools that integrate software dev with IT operations (Ops).",
      participants: 18,
      schedule: "12:00PM - 01:30PM, Mon.",
      fee: "$30.00"
    },
    {
      title: "Frontend Dev.",
      visibility: "Public",
      description: "Create user interfaces and optimize user experiences with HTML, CSS, and JavaScript.",
      participants: 130,
      schedule: "09:00PM - 10:30PM, Fri.",
      fee: "$50.00"
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

  const handleJoinHub = () => {
    setModalVisible(true);
  };

  const goTomanage = () => {
    navigation.navigate('Manage Hubs');
  };

  const goTonewhub = () => {
    navigation.navigate('Create Hub');
  };


  const handleSubmit = () => {
    console.log("Form submitted with data:", userInput);
    setModalVisible(false);
    setUserInput({
      goals: '',
      reasons: ''
    });
    alert("Message Sent");
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
          <View style={{ justifyContent: "center", width: '90%', height: 100, borderRadius: 5, backgroundColor: "#F0FFF9", marginRight: 10, marginLeft: 10, alignItems: 'flex-start', alignContent: 'center', marginTop: 20 }}>
            <View style={{ flexDirection: 'row' }}>
              <Image
                source={{ uri: 'https://cdn.builder.io/api/v1/image/assets/TEMP/96214782d7fee94659d7d6b5a7efe737b14e6f05a42e18dc902e7cdc60b0a37b' }}
                style={{ width: 30, height: 30, aspectRatio: 1, marginLeft: 10, marginTop: 20 }}
              />
              <Image
                source={{ uri: 'https://cdn.builder.io/api/v1/image/assets/TEMP/96214782d7fee94659d7d6b5a7efe737b14e6f05a42e18dc902e7cdc60b0a37b' }}
                style={{ width: 30, height: 30, aspectRatio: 1, marginLeft: -5, marginTop: 20 }}
              />
              <Image
                source={{ uri: 'https://cdn.builder.io/api/v1/image/assets/TEMP/96214782d7fee94659d7d6b5a7efe737b14e6f05a42e18dc902e7cdc60b0a37b' }}
                style={{ width: 30, height: 30, aspectRatio: 1, marginLeft: -5, marginTop: 20 }}
              />
              <View style={{ flexDirection: 'column', marginLeft: 25 }}>
                <Text style={{ fontSize: 12, color: "black", marginTop: 15 }}>Hub Fee</Text>
                <Text style={{ fontSize: 16, color: "coral", fontWeight: 'bold' }}>
                  {data.fee}
                </Text>
              </View>
            </View>
            <Text style={{ fontSize: 12, color: "black", fontWeight: '600', marginLeft: 10, marginTop: 10 }}>
              {data.participants} Participants
            </Text>
            <Text style={{ fontSize: 13, color: "#206C00", marginLeft: 10, marginBottom: 10 }}>
              {data.schedule}
            </Text>
          </View>
          <View style={{ flexDirection: "row", alignItems: "center", marginLeft: 10 }}>
            <View style={{ flex: 1 }}>
              <Text style={{ fontSize: 16, color: "#000", fontWeight: '600', marginTop: 15 }}>{data.title}</Text>
              <Text style={{ fontSize: 12, color: "grey", fontWeight: '400', fontStyle: 'italic' }}>
                {data.visibility}
              </Text>
            </View>
          </View>
          <Text style={{ fontSize: 12, color: "#888", marginTop: 15, marginLeft: 10 }}>{data.description}</Text>
          <TouchableHighlight
            style={{
              backgroundColor: "coral",
              borderRadius: 5,
              paddingHorizontal: 40,
              paddingVertical: 5,
              marginTop: 20,
              alignSelf: "center",
              justifyContent: 'center'
            }}
            onPress={handleJoinHub}
          >
            <Text style={{ color: "#FFF", fontWeight: "bold", alignText: 'center', fontSize: 14 }}>
              Send Message
            </Text>
          </TouchableHighlight>
        </View>
      </Animated.View>
    ));
  };

  return (
    <View style={{ flex: 1 }}>
      <Topbar />
      <View style={{ flexDirection: 'row', flex: 1 }}>
        <Sidebar />
        <ScrollView contentContainerStyle={{ flexGrow: 1, maxHeight: 500 }}>
          <View style={{ flex: 1, paddingHorizontal: 8, paddingTop: 8, paddingBottom: 20, backgroundColor: "white", marginLeft: 300, marginRight: 130, marginTop: 20 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%' }}>
              <View style={{ flexDirection: "row", alignItems: "flex-start", paddingHorizontal: 10, marginTop: 20 }}>
                <View style={{ justifyContent: "flex-end", paddingHorizontal: 15, paddingVertical: 5, borderRadius: 5, backgroundColor: "#d3f9d8", borderWidth: 1, borderColor: '#206C00' }}>
                  <Text style={{ fontWeight: "bold", fontSize: 14, color: "#206C00" }}>All Hubs</Text>
                </View>
                <TouchableOpacity onPress={goTomanage} >
                  <Text style={{ fontSize: 14, marginLeft: 30, fontWeight: "600", color: '#666', marginTop: 5 }}>Manage Hubs</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={goTonewhub}>
                  <Text style={{ fontSize: 14, marginLeft: 30, fontWeight: "600", color: '#666', marginTop: 5 }}>Create New Hub</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginTop: 20 }}>
              {renderCards()}
            </View>
          </View>
        </ScrollView>
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}
      >
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <View style={{ backgroundColor: 'white', padding: 10, borderRadius: 5, width: '80%' }}>
            <Text style={{ fontSize: 16, fontWeight: 'bold', marginBottom: 10 }}>Send a quick message to your trainees</Text>
            <TextInput
              placeholder="Type here..."
              style={{ borderWidth: 1, borderColor: '#ccc', borderRadius: 5, padding: 10, marginBottom: 10 }}
              value={userInput.goals}
              onChangeText={text => setUserInput(prevState => ({ ...prevState, goals: text }))}
            />
            <TouchableOpacity
              style={{ backgroundColor: 'coral', padding: 10, borderRadius: 5, alignItems: 'center' }}
              onPress={handleSubmit}
            >
              <Text style={{ color: 'white', fontWeight: 'bold' }}>Send</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

export default MyComponent;
