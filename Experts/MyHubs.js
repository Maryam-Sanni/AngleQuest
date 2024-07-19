import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Animated, Modal, ImageBackground, Image, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Topbar from '../components/expertstopbar';
import Sidebar from '../components/expertssidebar';
import OpenModal from '../components/Createhubform';
import { BlurView } from 'expo-blur';
import {useFonts} from "expo-font"
import { useTranslation } from 'react-i18next';



function MyComponent() {
  const [scaleAnimations] = useState([...Array(8)].map(() => new Animated.Value(1)));
  const navigation = useNavigation(); 
  const [modalVisible, setModalVisible] = useState(false);
  const [isFirstHubsHovered, setIsFirstHubsHovered] = useState(false);
    const [isSecondHubsHovered, setIsSecondHubsHovered] = useState(false);
    const [isThirdHubsHovered, setIsThirdHubsHovered] = useState(false);
    const [isOthersHovered, setIsOthersHovered] = useState(false);
    const [isAllHovered, setIsAllHovered] = useState(false);



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

  const goToMyHubs = () => {
    navigation.navigate('All Hubs');
  };

  const goToHubs = () => {
    navigation.navigate('Manage Hubs');
  };

const handleOpenPress = () => {
  setModalVisible(true);
};

const handleCloseModal = () => {
  setModalVisible(false);
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
<BlurView intensity={70} style={{flex:1}}>
    <View style={{ flex: 1 }}>
      <Topbar />
      <View style={{ flexDirection: 'row', flex: 1 }}>
        <Sidebar />
         <ScrollView contentContainerStyle={{ flexGrow: 1, maxHeight: 500 }}>
         <View style={styles.glassBox}>
         <View style={styles.pagecontainer}>
          <View style={{ flex: 1 }}>
          <View style={styles.header}>
        
            <TouchableOpacity onPress={goToHubs}
            underlayColor={isOthersHovered ? 'transparent' : 'transparent'}
            onMouseEnter={() => setIsOthersHovered(true)}
            onMouseLeave={() => setIsOthersHovered(false)} >
              <View style={styles.item}>
              <Image
  source={{ uri: 'https://cdn.builder.io/api/v1/image/assets/TEMP/925cfbb55e82458868f5e0c8cafbdc90d47bec0907e65b77fb918a7ac0dbcfe0?apiKey=7b9918e68d9b487793009b3aea5b1a32&' }}
  style={styles.image}
/>
                <Text style={[styles.headertext, isOthersHovered && { color: 'coral' }]}>{t("Manage Hubs")}</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={goToMyHubs}
            underlayColor={isAllHovered ? 'transparent' : 'transparent'}
            onMouseEnter={() => setIsAllHovered(true)}
            onMouseLeave={() => setIsAllHovered(false)} >
              <View style={styles.item}>
              <Image
  source={{ uri: 'https://cdn.builder.io/api/v1/image/assets/TEMP/925cfbb55e82458868f5e0c8cafbdc90d47bec0907e65b77fb918a7ac0dbcfe0?apiKey=7b9918e68d9b487793009b3aea5b1a32&' }}
  style={styles.image2}
/>
                <Text style={[styles.headertext, isAllHovered && { color: 'coral' }]}>{t("All Hubs")}</Text>
              </View>
            </TouchableOpacity>
            </View>
            <TouchableOpacity onPress={handleOpenPress}>
    <View style={{ justifyContent: "flex-start", paddingHorizontal: 10, paddingVertical: 10, borderRadius: 5, borderColor: "#206C00", backgroundColor: '#d3f9d8', width: 150, alignItems: 'center', marginTop: 20, marginBottom: 10, marginLeft: 50, borderWidth: 1 }}>
                    <Text style={{ fontSize: 13, color: "#206C00", alignText: 'center', fontWeight: '600',fontFamily:"Roboto-Light" }}>+ {t("Create New Hub")}</Text>
                  </View>
     </TouchableOpacity>

            <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginTop: 30, marginRight: 50, marginLeft: 50 }}>
              {renderCards()}
            </View>
            </View>
            </View>
            </View>
        </ScrollView>
        
        </View>
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
     
    </BlurView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  modalContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  }, 
  pagecontainer: {
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
  header: {
    marginLeft: 0,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    backgroundColor: 'none',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#CCC',
  },
  item: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  headertext: {
    marginLeft: 5,
    fontSize: 14,
    fontWeight: '500',
    color: '#666',fontFamily:"Roboto-Light"
  },
  image: {
    width: 24,
    height: 24,
    marginRight: 5,
    marginLeft: 50
  },
  image2: {
    width: 24,
    height: 24,
    marginRight: 5,
    marginLeft: 100
  },
  greenBox: {
   width: "100%",
    height:"100%",
    backgroundColor: 'rgba(225,225,212,0.3)',
  },
  blurBackground: {
    flex: 1, 
  },
});
export default MyComponent;
