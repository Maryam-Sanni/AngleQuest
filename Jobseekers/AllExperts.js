import React, { useState, useEffect } from 'react';
import { View, Text, Image, ScrollView, Animated, TouchableOpacity, ImageBackground, StyleSheet, Picker, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { BlurView } from 'expo-blur';
import Sidebar from '../components/sidebar';
import Topbar from '../components/topbar';
import {useFonts} from "expo-font"
import { useTranslation } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';


function MyComponent() {
  const [scaleAnimations] = useState([...Array(12)].map(() => new Animated.Value(1)));
  const navigation = useNavigation(); 
  const [search, setSearch] = useState('');
  const [selectedValue, setSelectedValue] = useState('');
  const [isDropdown, setIsDropdown] = useState(false);
  const [cardData, setCardData] = useState({ profileData: [] });
  const [selectedCategory, setSelectedCategory] = useState('');
  
  const toggleMode = () => {
    setIsDropdown(!isDropdown);
    setSelectedValue('');
    setSearch('');
  };
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        if (!token) {
          console.error('No token found');
          return;
        }

        const response = await axios.get('https://recruitangle.com/api/jobseeker/getAllExpertsForJobSeekers', {
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

  const handleTogglePress = () => {
    setIsPressed(!isPressed); // Toggle the pressed state
  };

  const renderInput = () => {
    if (isDropdown) {
      return (
        <Picker
          selectedValue={selectedValue}
          style={styles.picker}
          onValueChange={(itemValue, itemIndex) =>
            setSelectedValue(itemValue)
          }
        >
          <Picker.Item label="Pick an area of specialization" value="Pick an area of specialization" />
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
      );
    } else {
      return (
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Search for experts..."
            value={search}
            onChangeText={setSearch}
          />
          <TouchableOpacity onPress={toggleMode} style={styles.iconContainer}>
            <Image source={require('../assets/arrow-down.png')} style={{ width: 15, height: 15, }} />
          </TouchableOpacity>
        </View>
      );
    }
  };

  const goToBookInterview = () => {
    // Navigate to ExpertsProfile screen when the button is clicked
    navigation.navigate('New Interview');
  };

  const goToBookGrowth = () => {
    // Navigate to ExpertsProfile screen when the button is clicked
    navigation.navigate('New Growth Plan');
  };

  const goToBookAdvice = () => {
    // Navigate to ExpertsProfile screen when the button is clicked
    navigation.navigate('New Advice');
  };

  const renderCards = () => {
    const filteredData = cardData.profileData.filter(data => 
      !selectedCategory || data.preferred_role === selectedCategory
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
          <View style={{ justifyContent: "center", width: '90%', height: 100, borderRadius: 5, backgroundColor: "#F0FFF9", marginRight: 15, marginLeft: 10, marginTop: 20, alignItems: 'center', borderWidth: 1, borderColor: '#206C00' }}>
          <View style={{ flexDirection: 'column', alignItems: 'center' }}>
           <Image
              source={{ uri: 'https://cdn.builder.io/api/v1/image/assets/TEMP/96214782d7fee94659d7d6b5a7efe737b14e6f05a42e18dc902e7cdc60b0a37b' }}
              style={{ width: 50, height: 50, aspectRatio: 1,  marginTop: 10, }}
            />
           
 <Text style={{ fontSize: 14, color: "black", fontWeight: 'bold',fontFamily:"Roboto-Light"  }}>
   {data.first_name} {data.last_name} 
            </Text>
            <Text style={{ fontSize: 12, color: "#206C00", marginBottom: 10,fontFamily:"Roboto-Light"   }}>
              {data.preferred_role}
            </Text>
            
            
            
</View>
</View>
          <View style={{ flexDirection: "column", marginLeft: 18, }}>
            <View style={{ flex: 1 , }}>
           
            <View style={{ flexDirection: 'row', marginTop: 10,  }}>
            <Image
                          source={{ uri: 'https://cdn.builder.io/api/v1/image/assets/TEMP/6bba7edcb3f010b92084265108234b625f6a1e57053bb656b44878ce3a0ec09a?apiKey=7b9918e68d9b487793009b3aea5b1a32&' }}
                          style={{ width: 14, height: 12, aspectRatio: 1, marginTop: 5 }}
                        />
                        <Text style={{ fontSize: 14, color: '#206C00', marginLeft: 4, marginTop: 5,fontFamily:"Roboto-Light"  }}>{data.preferred_locations}</Text>
                        </View>

               <Text style={{ fontSize: 12, color: "#888", marginTop: 10, marginLeft: 10, height: 90, overflow: 'hidden' }}>{data.about}</Text>
              
              
            </View>
          </View>
         
           
            
          
       
        </View>
      </Animated.View>
    ));
  };

  const [fontsLoaded]=useFonts({
    'Roboto-Light':require("../assets/fonts/Roboto-Light.ttf"),
    })
    const {t}=useTranslation()

  return (
    <ImageBackground
    source={require ('../assets/backgroundimg2.png') }
  style={{ height: '110%', width: '100%',flex: 1}}
>
<BlurView intensity={70} style={{flex: 1}}>
    <View style={{flex: 1}}>
      <Topbar />
      <View style={{ flexDirection: 'row', flex: 1 }}>
        <Sidebar />
        <ScrollView contentContainerStyle={{ flexGrow: 1, maxHeight: 500  }}>
        <View style={styles.glassBox}>
    <View style={styles.container}>
          <View style={{ flex: 1, padding:20 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%' }}>
              <View style={{ flexDirection: "row", alignItems: "flex-start", paddingHorizontal: 10, marginTop: 20 }}>
              <TouchableOpacity>
              <View style={styles.session}>
                <Text style={{  fontWeight: "600", fontSize: 14, color: "#206C00",fontFamily:"Roboto-Light" }}>{t("All Experts")}</Text>
                </View>
                </TouchableOpacity>
                <TouchableOpacity>
              <View style={styles.session2}>
                <Text style={{ fontWeight: "600", fontSize: 14, color: "#206C00",fontFamily:"Roboto-Light" }}>{t("My Expert")}</Text>
                </View>
                </TouchableOpacity>
                <TouchableOpacity>
              <View style={styles.session2}>
              <Text style={{ fontWeight: "600", fontSize: 14, color: "#206C00",fontFamily:"Roboto-Light" }}>{t("Saved")}</Text>
              </View>
              </TouchableOpacity>
              </View>
              
            </View>
            <View style={{ marginTop: 25, marginLeft: 10, marginBottom: 10 }}>
                <Text style={{ fontSize: 14, color: "black", fontWeight: '600',fontFamily:"Roboto-Light"}}>{t("Use the search or the dropdown to filter")}</Text>
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
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginTop: 30 }}>
              {renderCards()}
            </View>
          </View>
          
          </View>
          </View>
        </ScrollView>
      </View>
      </View>
      </BlurView>
      </ImageBackground>

  );
}

const styles = StyleSheet.create({
  container: {
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
  sessionContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 10,
  },
  session: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderWidth: 1,
    borderColor: '#206C00',
    borderRadius: 5,
    backgroundColor: '#d3f9d8',
    marginRight: 10,
    marginBottom: 5,
  },
  session2: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderWidth: 1,
    borderColor: '#206C00',
    borderRadius: 5,
    backgroundColor: 'none',
    marginRight: 10,
    marginBottom: 5,
  },
  sessionText: {
    color: '#206C00',
  },
  dropcontainer: {
    flex: 1,
    justifyContent: 'flex-start',
    width: 400,
    marginTop: 10,
  },
  inputContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    width: 500,
  },
  input: {
    width: "100%",
    height: 40,
    borderColor: 'grey',
    borderWidth: 1,
    paddingLeft: 8,
    borderRadius: 5,
    marginRight: 10,
    backgroundColor: 'white',
    fontSize: 16
  },
  picker: {
    width: 720,
    height: 40,
    borderColor: 'grey',
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: 'white',
    marginRight: 20
  },
  iconContainer: {
    padding: 8,
  },
});

export default MyComponent;