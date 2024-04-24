import React, { useState } from 'react';
import { View, Text, Image, ScrollView, Animated, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Sidebar from '../components/sidebar';
import Topbar from '../components/topbar';

function MyComponent() {
  const [scaleAnimations] = useState([...Array(12)].map(() => new Animated.Value(1)));
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

  const navigateToProfile = () => {
    // Navigate to ExpertsProfile screen when the button is clicked
    navigation.navigate('ExpertProfile');
  };

  return (
    <View style={{  height: '40%', }}>
      <Topbar />
      <View style={{ flexDirection: 'row', flex: 1 }}>
        <Sidebar />
        <ScrollView contentContainerStyle={{ flexGrow: 1}}
        >
          <View style={{ flex: 1, paddingTop: 8, backgroundColor: "white", marginLeft: 350, marginRight: 150 }}>
            <View style={{ flexDirection: "row", marginTop: 20 }}>
              <Text style={{ fontWeight: "bold", fontSize: 14, color: "#206C00" }}>All Experts</Text>
              <Text style={{ fontSize: 14, marginLeft: 35 }}>Booked Experts</Text>
              <Text style={{ fontSize: 14, marginLeft: 35 }}>Saved</Text>
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

            <View style={{ flex: 1, flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between'}}>
              {[...Array(12)].map((_, index) => (
               <Animated.View
        key={index}
        style={{
          marginTop: 30, flexDirection: 'column', justifyContent: 'center', paddingHorizontal: 10, paddingVertical: 8, width: '30%', height: 350, borderRadius: 5, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.25, shadowRadius: 4, backgroundColor: '#F5FDF1', marginBottom: 20 ,
          transform: [{ scale: scaleAnimations[index] }],
        }}
        onMouseEnter={() => handleCardAnimation(index, 1.05)}
        onMouseLeave={() => handleCardAnimation(index, 1)}
      >
                    {/* Your card content */}
                    <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 2, marginTop: 10 }}>
                      <Image
                        source={{ uri: 'https://cdn.builder.io/api/v1/image/assets/TEMP/0636b7ce229379e9fc58b9aae8a30299c92f42aeaa82a7c88df44bfc92fc32c6?apiKey=7b9918e68d9b487793009b3aea5b1a32&width=100' }}
                        style={{ width: 48, height: 48, borderRadius: 24 }}
                      />
                      <View style={{ flexDirection: 'column', flex: 1, alignItems: 'flex-start', justifyContent: 'center' }}>
                        <Text style={{ fontSize: 16, color: 'black' }}>John Smith</Text>
                        <Text style={{ fontSize: 12, color: '#206C00', fontWeight: 'bold' }}>Architectural Engineer</Text>
                      </View>
                    </View>
                    <View style={{ flexDirection: 'column', paddingHorizontal: 3, paddingVertical: 16, marginTop: 5 }}>
                      <Text style={{ fontSize: 12, color: '#206C00' }}>Available Days</Text>
                      <Text style={{ fontSize: 15, color: 'black' }}>Saturday & Sunday</Text>
                      <Text style={{ fontSize: 12, color: '#206C00', marginTop: 10 }}>Available Time</Text>
                      <Text style={{ fontSize: 15, color: 'black' }}>10:00am - 05:00pm</Text>
                      <Image
                        source={{ uri: 'https://cdn.builder.io/api/v1/image/assets/TEMP/373e3162f78c5403ea941ff9b0a85e3148f4f90e28100b3d386bf29510d5c163?apiKey=7b9918e68d9b487793009b3aea5b1a32&' }}
                        style={{ width: '30%', aspectRatio: 5, marginTop: 8 }}
                      />
                      <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 8 }}>
                        <Image
                          source={{ uri: 'https://cdn.builder.io/api/v1/image/assets/TEMP/6bba7edcb3f010b92084265108234b625f6a1e57053bb656b44878ce3a0ec09a?apiKey=7b9918e68d9b487793009b3aea5b1a32&' }}
                          style={{ width: 20, height: 20, aspectRatio: 1 }}
                        />
                        <Text style={{ fontSize: 14, color: '#206C00', marginLeft: 4 }}>United Kingdom</Text>
                      </View>
                      <View style={{ alignSelf: 'flex-end', marginTop: 12 }}>
                        <Text style={{ fontSize: 20, color: '#206C00', fontWeight: 'bold' }}>$17</Text>
                        <Text style={{ fontSize: 12, color: '#206C00' }}>/hr</Text>
                      </View>
                      
                      <TouchableOpacity
              onPress={navigateToProfile} // Call navigateToProfile function onPress
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                paddingHorizontal: 16,
                paddingVertical: 8,
                marginTop: 16,
                borderRadius: 5,
                backgroundColor: 'coral'
              }}
            >
              <Text style={{ fontSize: 16, color: 'white' }}>View Profile</Text>
            </TouchableOpacity>
                    </View>
                
               </Animated.View>
              ))}
              
            </View>
          </View>
        </ScrollView>
      </View>
    </View>
  );
}

export default MyComponent;
