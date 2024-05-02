import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Animated, Modal, TextInput, Image } from 'react-native';
import Topbar from '../components/expertstopbar';
import Sidebar from '../components/expertssidebar';

function MyComponent() {
  const [scaleAnimations] = useState([...Array(8)].map(() => new Animated.Value(1)));
  
 

  // Sample data for the cards
  const cardData = [
    {
      date: "Tue. 12-07-2024",
      time: "09:30AM - 12:30PM",
      
      expert: "Emily Ray",
      job: "Data Analyst",
      fee: "$50.00"
    },
    {
    date: "Fri. 12-07-2024",
      time: "02:00PM - 03:00PM",
      
      expert: "John Smith",
      job: "UI/UX Designer",
      fee: "$30.00"
    },
 {
    date: "Wed. 12-07-2024",
    time: "02:00PM - 04:00PM",
    
    expert: "Vee Venice",
    job: "SAP FI",
    fee: "$40.00"
  },
    {
    date: "Thur. 12-07-2024",
      time: "09:00AM - 12:00PM",
      
      expert: "Will Cooper",
      job: "Backend Dev.",
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
          <View style={{ justifyContent: "center", width: 180, height: 100, borderRadius: 5, backgroundColor: "#F0FFF9", marginRight: 10, marginLeft: 10, alignItems: 'center', marginTop: 20 }}>
          <View style={{ flexDirection: 'row'}}>
           <Image
              source={{ uri: 'https://cdn.builder.io/api/v1/image/assets/TEMP/96214782d7fee94659d7d6b5a7efe737b14e6f05a42e18dc902e7cdc60b0a37b' }}
              style={{ width: 50, aspectRatio: 1, marginLeft: 10, marginTop: -5  }}
            />
            <View style={{ flexDirection: 'column'}}>
 <Text style={{ fontSize: 16, color: "black", fontWeight: 'bold', marginLeft: 10, }}>
              {data.expert} 
            </Text>
            <Text style={{ fontSize: 13, color: "#206C00",  marginLeft: 10, }}>
              {data.job}
            </Text>
            </View>
</View>
</View>
          <View style={{ flexDirection: "row", alignItems: "center", marginLeft: 10,}}>
            <View style={{ flex: 1 , }}>
            <Text style={{ fontSize: 12, color: "#888", marginTop: 15, }}> Interview Date</Text>
              <Text style={{ fontSize: 16, color: "#206C00", fontWeight: '600', }}>{data.date}</Text>
               <Text style={{ fontSize: 12, color: "#888", marginTop: 15, }}> Interview Time</Text>
              <Text style={{ fontSize: 16, color: "#206C00", fontWeight: '600' }}>
                 {data.time}
              </Text>
            </View>
          </View>
         
            <Text style={{ fontSize: 12, color: "#888", marginTop: 15, }}>{data.description}</Text>
            
    
          <TouchableOpacity
            style={{
              backgroundColor: "coral",
              borderRadius: 5,
              paddingHorizontal: 30,
              paddingVertical: 5,
              marginTop: 20,
              alignSelf: "center",
              justifyContent: 'center', 
              marginLeft: 10, marginRight: 10,
            }}
            onPress={handleJoinHub}
          >
            <Text style={{ color: "#FFF", fontWeight: "bold", alignText: 'center', fontSize: 14}}>
             Give Feedback
            </Text>
          </TouchableOpacity>
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

                <Text style={{ fontSize: 14, color: "#888", fontWeight: "600"   }}>Recent</Text>
              
              
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginTop: 20 }}>
              {renderCards()}
            </View>
            <Text style={{ fontSize: 14, color: "#888", fontWeight: "600"   }}>Older</Text>

            <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginTop: 20 }}>
              {renderCards()}
            </View>
          </View>
        </ScrollView>
      </View>
     
    </View>
  );
}

export default MyComponent;
