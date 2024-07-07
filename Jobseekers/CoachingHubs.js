import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Animated, Modal, TextInput, Image, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Topbar from '../components/topbar';
import Sidebar from '../components/sidebar';
import { BlurView } from 'expo-blur';
import { useFonts } from 'expo-font';
import { useTranslation } from 'react-i18next';

function MyComponent() {
  const [scaleAnimations] = useState([...Array(8)].map(() => new Animated.Value(1)));
  const navigation = useNavigation(); 
  const [modalVisible, setModalVisible] = useState(false);
  const [userInput, setUserInput] = useState({
    goals: '',
    reasons: ''
  });



  // Sample data for the cards
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
    title: "Dev Ops",
      coach: "John Smith",
      description: "The practices and tools that integrate software dev with IT operations (Ops).",
      participants: 18,
      schedule: "12:00PM - 01:30PM, Mon.",
      fee: "$30.00"
    },
     {
    title: "Frontend",
      coach: "Philip Josh",
      description: "Create UI and optimize User Experiences with HTML, CSS, and JavaScript.",
      participants: 30,
      schedule: "09:00PM - 10:30PM, Fri.",
      fee: "$50.00"
    },
    {
    title: "Backend",
      coach: "Olatunji Raymond",
      description: "Build server-side systems that handle data storage and communication with frontend.",
      participants: 90,
      schedule: "09:00AM - 12:00PM, Tue.",
      fee: "$50.00"
    },
    {
    title: "Java Programming",
    coach: "John Doe",
    description: "Learn Java programming from scratch. Basic to advanced concepts covered.",
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
    alert("Thank you for submitting your goals and reasons! You'll receive feedback in 1-3 working days.");
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
          }}
        >
          <View style={{ justifyContent: "center", alignSelf:'center', width: '90%', height: 100, borderRadius: 5, backgroundColor: "#F0FFF9",  marginRight: "5%", marginLeft: 10, alignItems: 'center', marginTop: 10,  borderWidth: 1, borderColor: '#206C00'  }}>
           <View style={{ flexDirection: 'row'}}>
<Image
              source={{ uri: 'https://cdn.builder.io/api/v1/image/assets/TEMP/96214782d7fee94659d7d6b5a7efe737b14e6f05a42e18dc902e7cdc60b0a37b' }}
              style={{ width: 30, height: 30, aspectRatio: 1, marginTop: 20  }}
            />
            <Image
              source={{ uri: 'https://cdn.builder.io/api/v1/image/assets/TEMP/96214782d7fee94659d7d6b5a7efe737b14e6f05a42e18dc902e7cdc60b0a37b' }}
              style={{ width: 30, height: 30, aspectRatio: 1, marginLeft: -5, marginTop: 20  }}
            />
           <Image
              source={{ uri: 'https://cdn.builder.io/api/v1/image/assets/TEMP/96214782d7fee94659d7d6b5a7efe737b14e6f05a42e18dc902e7cdc60b0a37b' }}
              style={{ width: 30, height: 30, aspectRatio: 1, marginLeft: -5, marginTop: 20  }}
            />

           
            </View>
 <Text style={{ fontSize: 12, color: "black", fontWeight: '600', marginTop: 10,fontFamily:"Roboto-Light"  }}>
              {data.participants} Participants
            </Text>
            <Text style={{ fontSize: 13, color: "#206C00", marginBottom: 10,fontFamily:"Roboto-Light"  }}>
              {data.schedule}
            </Text>
</View>
          <View style={{ flexDirection: "row", alignItems: "center", marginLeft: 10, }}>
            <View style={{ flex: 1 , }}>
              <Text style={{ fontSize: 16, color: "#000", fontWeight: '600', marginTop: 10,fontFamily:"Roboto-Light"  }}>{data.title}</Text>
              <Text style={{ fontSize: 12, color: "black", fontWeight: '400',fontFamily:"Roboto-Light"  }}>
                Coach: {data.coach}
              </Text>
            </View>
          </View>
         
            <Text style={{ fontSize: 12, color: "#888", marginTop: 10, marginLeft: 10,fontFamily:"Roboto-Light"  }}>{data.description}</Text>
            
            <View style={{ flexDirection: 'row', marginLeft: 10, marginTop: 10 }}>
                <Text style={{ fontSize: 12, color: "black", marginTop: 2, marginRight: 5,fontFamily:"Roboto-Light" }}>Hub Fee</Text>
          <Text style={{ fontSize: 16, color: "coral", fontWeight: 'bold',fontFamily:"Roboto-Light"  }}>
                  {data.fee} </Text>
                  </View>
          <TouchableOpacity
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
              marginLeft: 10, marginRight: 10
            }}
            onPress={handleJoinHub}
          >
           
            <Text style={{ color: "#206C00", fontWeight: "bold", textAlign: 'center', fontSize: 14,fontFamily:"Roboto-Light" }}>
              Join Hub
            </Text>
           
          </TouchableOpacity>
        </View>
      </Animated.View>
    ));
  };

  const [fontsLoaded]=useFonts({
    "Roboto-Light":require("../assets/fonts/Roboto-Light.ttf"),
      })
      const {t}=useTranslation()
  return (
<ImageBackground
    source={require ('../assets/Background.png') }
  style={{ height: '150%', width: '100%',flex: 1}}
>
<BlurView intensity={100} style={{flex:1}}>
    <View style={{ flex: 1}}>
      <Topbar />
      <View style={{ flexDirection: 'row', flex: 1 }}>
        <Sidebar />
        <ScrollView contentContainerStyle={{ flexGrow: 1, maxHeight: 500 }}>
          <View style={{ flex: 1, alignItems: "center", paddingHorizontal: 8, paddingTop: 8, paddingBottom: 20, marginLeft: 300, marginRight: 130, marginTop: 20 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%' }}>
              <View style={{ flexDirection: "row", alignItems: "flex-start", paddingHorizontal: 10, marginTop: 20 }}>
              <View style={{ justifyContent: "flex-end", paddingHorizontal: 15, paddingVertical: 5, borderRadius: 5, backgroundColor: "#d3f9d8", borderWidth: 1, borderColor: '#206C00' }}>
                <Text style={{ fontWeight: "bold", fontSize: 14, color: "#206C00",fontFamily:"Roboto-Light" }}>{t("All Hubs")}</Text>
                </View>
                <Text style={{ fontSize: 14, marginLeft: 25, marginTop: 5, color: '#d3f9d8', fontWeight: '600',fontFamily:"Roboto-Light"  }}>{t("Most Popular")}</Text>
              </View>
              <TouchableOpacity style={{ marginTop: 5, marginRight: 20, justifyContent: 'center', paddingHorizontal: 15, paddingVertical: 5, fontSize: 14, fontWeight: 'bold', textAlign: 'center', backgroundColor: 'coral', borderRadius: 5 }} onPress={handleMyHubsPress} >
                <Text style={{ fontSize: 14, color: "white", fontWeight: 'bold',fontFamily:"Roboto-Light"  }}>{t("My Hubs")}</Text>
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
            <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 10,fontFamily:"Roboto-Light"  }}>{t("Tell us why you want to join this Hub?")} </Text>
            <TextInput
              placeholder="Specific goals"
              style={{ borderWidth: 1, borderColor: '#ccc', borderRadius: 5, padding: 10, marginBottom: 10,fontFamily:"Roboto-Light"  }}
              value={userInput.goals}
              onChangeText={text => setUserInput(prevState => ({ ...prevState, goals: text }))}
            />
            <TextInput
              placeholder="Reasons"
              style={{ borderWidth: 1, borderColor: '#ccc', borderRadius: 5, padding: 10, marginBottom: 10,fontFamily:"Roboto-Light"  }}
              value={userInput.reasons}
              onChangeText={text => setUserInput(prevState => ({ ...prevState, reasons: text }))}
            />
            <TouchableOpacity
              style={{ backgroundColor: 'coral', padding: 10, borderRadius: 5, alignItems: 'center' }}
              onPress={handleSubmit}
            >
              <Text style={{ color: 'white', fontWeight: 'bold',fontFamily:"Roboto-Light"  }}>{t("Submit")}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
    </BlurView>
    </ImageBackground>
  );
}
export default MyComponent;