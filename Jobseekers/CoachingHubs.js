import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Animated, Modal, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Topbar from '../components/topbar';
import Sidebar from '../components/sidebar';

function MyComponent() {
  const [scaleAnimations] = useState([...Array(8)].map(() => new Animated.Value(1)));
  const [modalVisible, setModalVisible] = useState(false);
  const [userInput, setUserInput] = useState({
    goals: '',
    reasons: ''
  });

  const navigation = useNavigation(); 

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

  const handleMyHubsPress = () => {
    navigation.navigate('Messages'); // Navigating to the Messages page
  };

  const handleSubmit = () => {
    // Perform submission logic here, e.g., send data to server
    console.log("Form submitted with data:", userInput);
    // Close modal and reset form
    setModalVisible(false);
    setUserInput({
      goals: '',
      reasons: ''
    });
    // Provide feedback about the submission
    alert("Thank you for your interest! The Hub Lead will assess your request in a minute.");
  };

  const renderCards = () => {
    return [...Array(5)].map((_, index) => (
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
        {/* Card content */}
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
            padding: 20,
          }}
        >
          {/* Card title and description */}
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <View style={{ flex: 1 , }}>
              <Text style={{ fontSize: 16, color: "#000", fontWeight: '600' }}>DevOps</Text>
              <Text style={{ fontSize: 12, color: "black", fontWeight: '200' }}>
                Anchored by: Gerald Wilson
              </Text>
            </View>
          </View>
          <View style={{ marginTop: 20 }}>
            <Text style={{ fontSize: 12, color: "#888" }}>About Hub</Text>
            <Text style={{ fontSize: 14, color: "#206C00", marginTop: 5 }}>
              Expert guidance and mentorship on the practice of DevOps.
            </Text>
            <Text style={{ fontSize: 12, color: "#888", marginTop: 10 }}>
              Meeting Time
            </Text>
            <Text style={{ fontSize: 14, color: "#206C00", marginTop: 5 }}>
              09:30pm - 11:30pm, Weds & Thurs.
            </Text>
          </View>
          <TouchableOpacity
            style={{
              backgroundColor: "coral",
              borderRadius: 3,
              paddingHorizontal: 20,
              paddingVertical: 4,
              marginTop: 35,
              alignSelf: "center",
              justifyContent: 'center'
            }}
            onPress={handleJoinHub}
          >
            <Text style={{ color: "#FFF", fontWeight: "bold", alignText: 'center', fontSize: 14}}>
              Join Hub
            </Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    ));
  };

  return (
    <View style={{ height: '80%',}}>
      <Topbar />
      <View style={{ flexDirection: 'row', flex: 1 }}>
        <Sidebar />
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <View style={{ flex: 1, paddingHorizontal: 8, paddingTop: 8, paddingBottom: 20, backgroundColor: "white", marginLeft: 300, marginRight: 130, marginTop: 20 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%' }}>
              <View style={{ flexDirection: "row", alignItems: "flex-start", paddingHorizontal: 10, marginTop: 20 }}>
                <Text style={{ fontWeight: "bold", fontSize: 14, color: "#206C00" }}>All Hubs</Text>
                <Text style={{ fontSize: 14, marginLeft: 35 }}>Most Popular</Text>
              </View>
              <TouchableOpacity 
                style={{ marginTop: 7, marginRight: 20, justifyContent: 'center', paddingHorizontal: 15, paddingVertical: 4, fontSize: 14, fontWeight: 'bold', textAlign: 'center', color: '#FFFFFF', backgroundColor: 'coral', borderRadius: 3 }}
                onPress={handleMyHubsPress} // Updated onPress event handler
              >
                <Text style={{ fontSize: 14, color: "white",  }}>My Hubs</Text>
              </TouchableOpacity>
            </View>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginTop: 20 }}>
              {renderCards()}
            </View>
          </View>
        </ScrollView>
      </View>
      {/* Modal for collecting user goals and reasons */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}
      >
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <View style={{ backgroundColor: 'white', padding: 10, borderRadius: 5, width: '40%' }}>
            <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 10 }}>Quick Questions</Text>
            <TextInput
              placeholder="Why do you want to join this Hub?"
              style={{ borderWidth: 1, borderColor: '#ccc', borderRadius: 5, padding: 10, marginBottom: 10 }}
              value={userInput.goals}
              onChangeText={text => setUserInput(prevState => ({ ...prevState, goals: text }))}
            />
            <TextInput
              placeholder="Are you willing and able to commit to attending meetings and sessions?"
              style={{ borderWidth: 1, borderColor: '#ccc', borderRadius: 5, padding: 10, marginBottom: 10 }}
              value={userInput.reasons}
              onChangeText={text => setUserInput(prevState => ({ ...prevState, reasons: text }))}
            />
            <TextInput
              placeholder="Do you have any prerequisites?"
              style={{ borderWidth: 1, borderColor: '#ccc', borderRadius: 5, padding: 10, marginBottom: 10 }}
              value={userInput.reasons}
              onChangeText={text => setUserInput(prevState => ({ ...prevState, reasons: text }))}
            />
            <TextInput
              placeholder="What are your strengths?"
              style={{ borderWidth: 1, borderColor: '#ccc', borderRadius: 5, padding: 10, marginBottom: 10 }}
              value={userInput.reasons}
              onChangeText={text => setUserInput(prevState => ({ ...prevState, reasons: text }))}
            />
            <TouchableOpacity
              style={{ backgroundColor: 'coral', padding: 10, borderRadius: 5, alignItems: 'center' }}
              onPress={handleSubmit}
            >
              <Text style={{ color: 'white', fontWeight: 'bold' }}>Submit</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

export default MyComponent;
