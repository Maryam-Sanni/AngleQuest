import React, { useState } from 'react';
import { View, Text, Image, ScrollView, Animated, TouchableOpacity, StyleSheet, Modal } from 'react-native';
import { useNavigation } from '@react-navigation/native';


function MyComponent({ onClose }) {
  const [scaleAnimations] = useState([...Array(12)].map(() => new Animated.Value(1)));
  const navigation = useNavigation(); 


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
      coach: "Joop Melcher",
      description: "The practices and tools that integrate software dev with IT operations (Ops).",
      participants: 18,
      schedule: "12:00PM - 01:30PM, Mon.",
      fee: "$30.00"
    },
    {
    title: "Backend",
      coach: "Joop Melcher",
      description: "Build server-side systems that handle data storage and communication with frontend.",
      participants: 90,
      schedule: "09:00AM - 12:00PM, Tue.",
      fee: "$50.00"
    },
    {
      title: "Frontend",
        coach: "Joop Melcher",
        description: "Build server-side systems that handle data storage and communication with frontend.",
        participants: 90,
        schedule: "09:00AM - 12:00PM, Tue.",
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


  const goToBookInterview = () => {
    // Navigate to ExpertsProfile screen when the button is clicked
    navigation.navigate('BookaSession');
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
            marginLeft: 20,
            marginRight: 20,
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
          <View style={{ justifyContent: "center", alignSelf:'center', width: '90%', height: 100, borderRadius: 5, backgroundColor: "#F0FFF9",  marginRight: "4%", marginLeft: 10, alignItems: 'center', marginTop: 20,  borderWidth: 1, borderColor: '#206C00'  }}>
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
 <Text style={{ fontSize: 12, color: "black", fontWeight: '600', marginTop: 10 }}>
              {data.participants} Participants
            </Text>
            <Text style={{ fontSize: 13, color: "#206C00", marginBottom: 10 }}>
              {data.schedule}
            </Text>
</View>
          <View style={{ flexDirection: "row", alignItems: "center", marginLeft: 10, }}>
            <View style={{ flex: 1 , }}>
              <Text style={{ fontSize: 16, color: "#000", fontWeight: '600', marginTop: 20 }}>{data.title}</Text>
              <Text style={{ fontSize: 12, color: "black", fontWeight: '400' }}>
                Coach: {data.coach}
              </Text>
            </View>
          </View>
         
            <Text style={{ fontSize: 12, color: "#888", marginTop: 10, marginLeft: 10, }}>{data.description}</Text>
            
            <View style={{ flexDirection: 'row', marginLeft: 10, marginTop: 10 }}>
                <Text style={{ fontSize: 12, color: "black", marginTop: 2, marginRight: 5}}>Hub Fee</Text>
          <Text style={{ fontSize: 16, color: "coral", fontWeight: 'bold' }}>
                  {data.fee} </Text>
                  <TouchableOpacity style={{ height: 18, width: 18, borderRadius: 15, borderWidth: 1, borderColor: "#4A5568", marginRight: 5, marginLeft: 50, marginTop: 5,   }} />
                  </View>
         
           
            
        </View>
      </Animated.View>
    ));
  };

  return (
    <View style={{  flex: 1, backgroundColor: "#F8F8F8", marginTop: 40, alignItems: 'center' }}>
        <ScrollView contentContainerStyle={{ flexGrow: 1, maxHeight: 500 }}>
        <View style={styles.greenBox}>
        <View style={styles.header}>
          <Image
            source={{ uri: 'https://cdn.builder.io/api/v1/image/assets/TEMP/1f2d38e99b0016f2bd167d2cfd38ff0d43c9f94a93c84b4e04a02d32658fb401?apiKey=7b9918e68d9b487793009b3aea5b1a32&' }} // replace with your logo URL
            style={styles.logo}
          />
          <Text style={styles.headerText}>Expert's Hubs</Text>
       
        <TouchableOpacity onPress={onClose} style={styles.closeButton}>
          <Text style={{ fontSize: 18, color: '#3F5637', fontWeight: 'bold'}}>
            ✕
          </Text>
        </TouchableOpacity>
        </View> 
          
         
          <Text style={{ fontSize: 16, color: "black", alignText: 'flex-start', fontWeight: 'bold', marginTop: 5, marginLeft: 50 }}>Hubs</Text>
     <Text style={{ fontSize: 14, color: "black", alignText: 'flex-start', fontWeight: '400', marginLeft: 50, marginBottom: 20  }}>By Expert Joop Melcher</Text>
    
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginTop: 10, marginLeft: 30, marginRight: 30 }}>
              {renderCards()}
            </View>
            <View style={{ flexDirection: 'row',}}>
            <TouchableOpacity style={styles.buttonplus} >
      <Text style={styles.buttonTextplus}>Continue</Text>
    </TouchableOpacity>
    <TouchableOpacity style={styles.buttonskip} >
      <Text style={styles.buttonTextskip}>Skip</Text>
    </TouchableOpacity>
    </View>
          </View>
          
        </ScrollView>
       
      </View>
      

  );
}

const styles = StyleSheet.create({
  greenBox: {
    width: 1000,
    height: 700,
    backgroundColor: '#F8F8F8',
    marginTop: 40
  },
  buttonplus: {
    backgroundColor: 'coral',
    padding: 5,
    marginLeft: 750, 
    width: 100,
    paddingHorizontal: 20,
    marginTop: 10,
    marginBottom: 30
  },
  buttonTextplus: {
    color: 'white',
    fontSize: 14,
    textAlign: 'center',
  },
  buttonskip: {
    backgroundColor: 'white',
    borderColor: 'darkgreen',
    borderWidth: 1,
    padding: 5,
    marginLeft: 20, 
    width: 100,
    paddingHorizontal: 20,
    marginTop: 10,
    marginBottom: 30
  },
  buttonTextskip: {
    color: 'black',
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
  }
});

export default MyComponent;