import React, { useState } from 'react';
import { View, Text, Image, ScrollView, Animated, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Sidebar from '../components/sidebar';
import Topbar from '../components/topbar';

function MyComponent() {
  const [scaleAnimations] = useState([...Array(12)].map(() => new Animated.Value(1)));
  const navigation = useNavigation(); 
  
  

  

  
  // Sample data for the cards
  const cardData = [
    {
      date: "Mon-Fri",
      time: "09:30AM - 12:30PM",
      
      expert: "Emily Ray",
      job: "Data Analyst",
       country: "Switzerland",
      interviewfee: "$50",
      growthfee: "$12",
      advicefee: "$7",
    },
    {
    date: "Mon, Tue, Wed, Thur",
      time: "02:00PM - 03:00PM",
      
      expert: "Monica Jerry",
      job: "UI/UX Designer",
       country: "Canada",
      interviewfee: "$30",
      growthfee: "$18",
      advicefee: "$20",
    },
     {
    date: "Sat & Sun",
      time: "09:00PM - 10:30PM",
      
      expert: "Fisayo Fosudo",
      job: "Java Engineer",
      country: "Nigeria",
      interviewfee: "$25",
      growthfee: "$25",
      advicefee: "$25",
    },
    {
    date: "Wed - Fri",
    time: "02:00PM - 04:00PM",
    
    expert: "John Smith",
    job: "Dev Ops",
     country: "Canada",
    interviewfee: "$50",
      growthfee: "$40",
      advicefee: "$50",
  },
   {
    date: "Mon, Tue, Wed",
    time: "02:00PM - 04:00PM",
    
    expert: "Vee Venice",
    job: "SAP FI",
     country: "India",
    interviewfee: "$20",
      growthfee: "$15",
      advicefee: "$25",
  },
    {
    date: "Mon-Fri",
      time: "09:00AM - 12:00PM",
      
      expert: "Will Cooper",
      job: "Backend Dev.",
       country: "United Kingdom",
      interviewfee: "$30",
      growthfee: "$12",
      advicefee: "$7",
    },
    {
    date: "Mon-Fri",
    time: "02:00PM - 04:00PM",
    
    expert: "John Smith",
    job: "Frontend Dev.",
     country: "Netherlands",
    interviewfee: "$50",
      growthfee: "$42",
      advicefee: "$17",
  },
   {
    date: "Mon-Fri",
    time: "02:00PM - 04:00PM",
    
    expert: "John Smith",
    job: "Dev Ops",
     country: "United States",
    interviewfee: "$30",
      growthfee: "$25",
      advicefee: "$30",
  },
   {
    date: "Mon-Fri",
    time: "02:00PM - 04:00PM",
    
    expert: "Vee Venice",
    job: "SAP FI",
    country: "United Kingdom",
    interviewfee: "$50",
      growthfee: "$50",
      advicefee: "$50",
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

  const handlenavigateToProfile = () => {
    // Navigate to ExpertsProfile screen when the button is clicked
    navigation.navigate('ExpertProfile');
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
            width: '100%',
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
          <View style={{ justifyContent: "center", width: 180, height: 100, borderRadius: 5, backgroundColor: "#F0FFF9", marginRight: 15, marginLeft: 18, marginTop: 20, alignItems: 'center', borderWidth: 1, borderColor: '#206C00' }}>
          <View style={{ flexDirection: 'column', alignItems: 'center' }}>
           <Image
              source={{ uri: 'https://cdn.builder.io/api/v1/image/assets/TEMP/96214782d7fee94659d7d6b5a7efe737b14e6f05a42e18dc902e7cdc60b0a37b' }}
              style={{ width: 50, height: 50, aspectRatio: 1,  marginTop: 10, }}
            />
           
 <Text style={{ fontSize: 14, color: "black", fontWeight: 'bold',  }}>
              {data.expert} 
            </Text>
            <Text style={{ fontSize: 12, color: "#206C00", marginBottom: 10   }}>
              {data.job}
            </Text>
            
            
            
</View>
</View>
          <View style={{ flexDirection: "row", alignItems: "center", marginLeft: 18, }}>
            <View style={{ flex: 1 , }}>
            <View style={{ flexDirection: 'row', marginTop: 15,  }}>
            <Text style={{ fontSize: 14, color: "black", fontWeight: 'bold' }}> Available Days</Text>
            <Image
                          source={{ uri: 'https://cdn.builder.io/api/v1/image/assets/TEMP/6bba7edcb3f010b92084265108234b625f6a1e57053bb656b44878ce3a0ec09a?apiKey=7b9918e68d9b487793009b3aea5b1a32&' }}
                          style={{ width: 10, height: 10, aspectRatio: 1, marginTop: 5,  marginLeft: 15 }}
                        />
                        <Text style={{ fontSize: 10, color: '#206C00', marginLeft: 4, marginTop: 2,  }}>{data.country}</Text>
                        </View>
                       
              <Text style={{ fontSize: 12, color: "black", marginLeft: 5, marginTop: 5  }}>{data.date}</Text>
             
              <Text style={{ fontSize: 12, color: "black", marginLeft: 5 }}>
                 Time: {data.time}
              </Text>
              
            </View>
          </View>
         
           
            
          <View style={{ flexDirection: 'row', marginTop: 30,}}>
                      <View style={{ flexDirection: 'column', alignItems: 'center'}}>
          <TouchableOpacity
            style={{
              borderWidth: 1, 
              borderColor: '#206C00', 
              borderRadius: 5,
              backgroundColor: '#F0FFF9',
              paddingHorizontal: 5,
              paddingVertical: 10,
              
              alignSelf: "center",
              justifyContent: 'center', 
              marginLeft: 10, 
            }}
            onPress={handleJoinHub}
          >
            <Text style={{ color: "#206C00",  alignText: 'center', fontSize: 12}}>
             Interview
            </Text>
          </TouchableOpacity>
          <Text style={{ fontSize: 14, color: "black", marginTop: 5 }}>
              {data.interviewfee}</Text>
              </View>
              <View style={{ flexDirection: 'column', alignItems: 'center'}}>
          <TouchableOpacity
            style={{
              borderWidth: 1, 
              borderColor: '#206C00', 
              borderRadius: 5,
              backgroundColor: '#F0FFF9',
              paddingHorizontal: 5,
              paddingVertical: 10,
              
              alignSelf: "center",
              justifyContent: 'center', 
              marginLeft: 5, 
            }}
            onPress={handleJoinHub}
          >
            <Text style={{ color: "#206C00", alignText: 'center', fontSize: 12}}>
             Growth Plan
            </Text>
          </TouchableOpacity>
          <Text style={{ fontSize: 14, color: "black", marginTop: 5 }}>
              {data.growthfee}</Text>
              </View>
          <View style={{ flexDirection: 'column', alignItems: 'center'}}>
          <TouchableOpacity
            style={{
              borderWidth: 1, 
              borderColor: '#206C00', 
              borderRadius: 5,
              backgroundColor: '#F0FFF9',
              paddingHorizontal: 5,
              paddingVertical: 10,
             
              alignSelf: "center",
              justifyContent: 'center', 
              marginLeft: 5, marginRight: 10,
            }}
            onPress={handleJoinHub}
          >
            <Text style={{ color: "#206C00",  alignText: 'center', fontSize: 12}}>
             Advice
            </Text>
          </TouchableOpacity>
          <Text style={{ fontSize: 14, color: "black", marginTop: 5 }}>
              {data.advicefee}</Text>
              </View>
          </View>
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
                <Text style={{ fontWeight: "bold", fontSize: 14, color: "#206C00" }}>All Experts</Text>
                <Text style={{ fontSize: 14, marginLeft: 25 }}>Booked Experts</Text>
                <Text style={{ fontSize: 14, marginLeft: 25 }}>Saved</Text>
              </View>
              
            </View>
            <View style={{ flexDirection: "row", alignItems: "center", marginTop: 20, marginBottom: 20, flexWrap: "wrap" }}>
              <View style={{ justifyContent: "center", paddingHorizontal: 10, paddingVertical: 8, borderRadius: 8, borderWidth: 1, borderColor: "#206C00", backgroundColor: "#d3f9d8" }}>
                <Text style={{ fontSize: 14, color: "#206C00" }}>Civil Engineer</Text>
              </View>
              <View style={{ justifyContent: "center", paddingHorizontal: 10, paddingVertical: 8, borderRadius: 8, borderWidth: 1, borderColor: "#206C00", backgroundColor: "#d3f9d8", marginLeft: 4, marginRight: 4 }}>
                <Text style={{ fontSize: 14, color: "#206C00" }}>Architect</Text>
              </View>
              <View style={{ justifyContent: "center", paddingHorizontal: 10, paddingVertical: 8, borderRadius: 8, borderWidth: 1, borderColor: "#206C00", backgroundColor: "#d3f9d8", marginLeft: 4, marginRight: 4 }}>
                <Text style={{ fontSize: 14, color: "#206C00" }}>Surveyor</Text>
              </View>
              <View style={{ justifyContent: "center", paddingHorizontal: 10, paddingVertical: 8, borderRadius: 8, borderWidth: 1, borderColor: "#206C00", backgroundColor: "#d3f9d8", marginLeft: 4, marginRight: 4 }}>
                <Text style={{ fontSize: 14, color: "#206C00" }}>Constructor</Text>
              </View>
              <View style={{ justifyContent: "center", alignItems: "center", marginLeft: 4, paddingHorizontal: 10, paddingVertical: 8, borderRadius: 8, borderWidth: 1, borderColor: "#206C00", backgroundColor: "#d3f9d8" }}>
                <Text style={{ fontSize: 14, color: "#206C00" }}>+</Text>
              </View>
            </View>
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