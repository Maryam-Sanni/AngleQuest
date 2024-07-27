import React, { useState,  useEffect } from 'react';
import { View, ScrollView, StyleSheet, Text, TouchableOpacity, Image, ImageBackground, Modal  } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { BlurView } from 'expo-blur';
import Sidebar from '../components/expertssidebar';
import Topbar from '../components/expertstopbar';
import SuggestionModal from '../components/Suggestion';
import OpenModal2 from '../Experts/GProfile';
import {useFonts} from "expo-font"
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTranslation } from 'react-i18next';
import CustomModal from './TourGuide';

const HomePage = () => {
  const [isHovered1, setIsHovered1] = useState(false);
  const [isHovered2, setIsHovered2] = useState(false);
  const [isHovered3, setIsHovered3] = useState(false);
  const [isHovered4, setIsHovered4] = useState(false);
  const [isHovered5, setIsHovered5] = useState(false);
  const [isHovered6, setIsHovered6] = useState(false);
  const [isHovered7, setIsHovered7] = useState(false);
  const [isHovered8, setIsHovered8] = useState(false);
  const [isHovered9, setIsHovered9] = useState(false);
  const [isHovered10, setIsHovered10] = useState(false);
  const [isHovered11, setIsHovered11] = useState(false);
  const [isHovered12, setIsHovered12] = useState(false);
  const [isHovered13, setIsHovered13] = useState(false);
  const [isHovered14, setIsHovered14] = useState(false);
  const [isHovered15, setIsHovered15] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisible2, setModalVisible2] = useState(false);
  const [custommodalVisible, setCustomModalVisible] = useState(false);
  const navigation = useNavigation();
  const [first_name, setFirstName] = useState('');
  const [last_name, setLastName] = useState('');
  
  useEffect(() => {
    // Show the CustomModal when the component mounts
    setCustomModalVisible(true);
  }, []);
  
  useEffect(() => {
    // Retrieve first_name and last_name from AsyncStorage
    const retrieveData = async () => {
      try {
        const storedFirstName = await AsyncStorage.getItem('first_name');
        const storedLastName = await AsyncStorage.getItem('last_name');
        if (storedFirstName !== null && storedLastName !== null) {
          console.log('Stored first_name:', storedFirstName);
          console.log('Stored last_name:', storedLastName);
          setFirstName(storedFirstName);
          setLastName(storedLastName);
        }
      } catch (error) {
        console.error('Error retrieving data from AsyncStorage:', error);
      }
    };
  
    retrieveData();
  }, []);

  const handleCloseModal = () => {
    setCustomModalVisible(false);
  };

  const goToMessages = () => {
    navigation.navigate('Messaging');
  };

  const goToManageHubs = () => {
    navigation.navigate('Manage Hubs');
  };
 
  const goToWithdrawal = () => {
    navigation.navigate('Withdrawal');
  };

  const goToInterview = () => {
    navigation.navigate('Interview');
  };

  const goToAdvice = () => {
    navigation.navigate('Advice');
  };
 
  const goToGrowth = () => {
    navigation.navigate('Growth Plan');
  };
  
  const handleOpenPress2 = () => {
    setModalVisible2(true);
  };

  const handleCloseModal2 = () => {
    setModalVisible2(false);
  };

  const [fontsLoaded]=useFonts({
"Roboto-Light":require("../assets/fonts/Roboto-Light.ttf")
  });

const {t}=useTranslation()

  return (
    <ImageBackground
    source={require ('../assets/backgroundimg2.png') }
  style={{ height: '120%', width: '100%',flex: 1}}
>
  <View style={{ flex: 1 }}>
    <Topbar /> 
    <View style={{ flexDirection: 'row', flex: 1}}>
      <Sidebar />
      <ScrollView contentContainerStyle={{ flexGrow: 1, maxHeight: 500}}>
           <View style={styles.container}>
           <View style={{flexDirection: 'row' }}>
           <Image
        source={{
          uri:
            "https://cdn.builder.io/api/v1/image/assets/TEMP/1f2d38e99b0016f2bd167d2cfd38ff0d43c9f94a93c84b4e04a02d32658fb401?apiKey=7b9918e68d9b487793009b3aea5b1a32&",
        }}
        style={{ width: 40, height: 40, marginTop: -5}}
      />
     ` <Text style={styles.greeting}>{t('Good Day')}, {first_name} {last_name}</Text>`
      <View style={styles.circle}>
        <Text style={styles.circleText}>12</Text>
        </View>
      </View>
      <TouchableOpacity>
      <Text style={{color: '#63EC55', fontSize: 14, textDecoration: 'underline', marginTop: -5, marginLeft: 50, marginBottom: 30,fontFamily:"Roboto-Light"}}>{t("Share your profile on Linkedln")}</Text>
      </TouchableOpacity>
      <View style={styles.mainContent}>
      <View style={styles.messageBox}>
      <BlurView intensity={50} style={styles.blurBackground}>
      <View style={{flexDirection: 'row' }}>
          <Image
       source={require('../assets/chat.png')}
        style={styles.boxicon}
      />
          <Text style={{fontSize: 18, color: '#63EC55', marginTop: 25, marginLeft: 10,  fontWeight: 'bold', fontFamily:"Roboto-Light"}}>{t("Chats")}</Text>
          </View>
          <Text style={{fontSize: 16, color: 'white', marginTop: 20, marginLeft: 15,  fontWeight: 'bold',fontFamily:"Roboto-Light" }}>SAP FI Hub</Text>
          <View style={{flexDirection: 'row', marginTop: 15 }}>
          <Image source={require('../assets/useravatar4.png')} style={styles.image} />
          <View style={{flexDirection: 'column' }}>
            <Text style={{color: 'white', fontWeight: '600', fontSize: 15,fontFamily:"Roboto-Light"}}>Maryam Bakahli</Text>
            <Text style={{color: 'white', fontSize: 12, marginTop: 3,fontFamily:"Roboto-Light"}}>{t("Hello")},, This is Maryam...</Text>
          </View>
          </View>
          <View style={{flexDirection: 'row', marginTop: 10 }}>
          <Image source={require('../assets/useravatar1.png')} style={styles.image} />
          <View style={{flexDirection: 'column' }}>
            <Text style={{color: 'white', fontWeight: '600', fontSize: 15, fontFamily:"Roboto-Light"}}>Maryam Bakahli</Text>
            <Text style={{color: 'white', fontSize: 12, marginTop: 3,fontFamily:"Roboto-Light"}}>{t("Hello")},, This is Maryam...</Text>
          </View>
          </View>
          <Text style={{color: 'white', fontSize: 13, marginTop: 10, textDecoration: 'underline', marginLeft: 140,fontFamily:"Roboto-Light"}}>{t("see more")}</Text>
          <View style={{ borderBottomWidth: 2, borderBottomColor: 'white', marginTop: 10, marginLeft: 20, marginRight: 20 }} />
          
          <Text style={{fontSize: 16, color: 'white', marginTop: 10, marginLeft: 15,  fontWeight: 'bold',fontFamily:"Roboto-Light" }}>Microsoft Azure Hub</Text>
          <View style={{flexDirection: 'row', marginTop: 15 }}>
          <Image source={require('../assets/useravatar4.png')} style={styles.image} />
          <View style={{flexDirection: 'column' }}>
            <Text style={{color: 'white', fontWeight: '600', fontSize: 15,fontFamily:"Roboto-Light" }}>Maryam Bakahli</Text>
            <Text style={{color: 'white', fontSize: 12, marginTop: 3,fontFamily:"Roboto-Light"}}>{t("Hello")},, This is Maryam...</Text>
          </View>
          </View>
          <View style={{flexDirection: 'row', marginTop: 10 }}>
          <Image source={require('../assets/useravatar1.png')} style={styles.image} />
          <View style={{flexDirection: 'column' }}>
            <Text style={{color: 'white', fontWeight: '600', fontSize: 15,fontFamily:"Roboto-Light" }}>Maryam Bakahli</Text>
            <Text style={{color: 'white', fontSize: 12, marginTop: 3,fontFamily:"Roboto-Light"}}>{t("Hello")},, This is Maryam...</Text>
          </View>
          </View>
          <Text style={{color: 'white', fontSize: 13, marginTop: 10, textDecoration: 'underline', marginLeft: 140,fontFamily:"Roboto-Light"}}>{t("see more")}</Text>
          <View style={{ borderBottomWidth: 2, borderBottomColor: 'white', marginTop: 10, marginLeft: 15, marginRight: 15 }} />
          
          <Text style={{fontSize: 16, color: 'white', marginTop: 10, marginLeft: 15,  fontWeight: 'bold',fontFamily:"Roboto-Light" }}>Jr. PowerPoint Hub</Text>
          <View style={{flexDirection: 'row', marginTop: 15 }}>
          <Image source={require('../assets/useravatar4.png')} style={styles.image} />
          <View style={{flexDirection: 'column' }}>
            <Text style={{color: 'white', fontWeight: '600', fontSize: 15, fontFamily:"Roboto-Light"}}>Maryam Bakahli</Text>
            <Text style={{color: 'white', fontSize: 12, marginTop: 3,fontFamily:"Roboto-Light"}}>{t("Hello")}, This is Maryam..</Text>
          </View>
          </View>
          <View style={{flexDirection: 'row', marginTop: 10 }}>
          <Image source={require('../assets/useravatar1.png')} style={styles.image} />
          <View style={{flexDirection: 'column' }}>
            <Text style={{color: 'white', fontWeight: '600', fontSize: 15,fontFamily:"Roboto-Light" }}>Maryam Bakahli</Text>
            <Text style={{color: 'white', fontSize: 12, marginTop: 3,fontFamily:"Roboto-Light"}}>{t("Hello")},, This is Maryam...</Text>
          </View>
          </View>
          <Text style={{color: 'white', fontSize: 13, marginTop: 10, textDecoration: 'underline', marginLeft: 140,fontFamily:"Roboto-Light"}}>{t("see more")}</Text>
          <View style={{ borderBottomWidth: 2, borderBottomColor: 'white', marginTop: 10, marginLeft: 15, marginRight: 15 }} />
 
          <TouchableOpacity onPress={goToMessages} 
          style={[
            styles.touchablechat,
            isHovered1 && styles.touchableOpacityHovered
          ]}
          onMouseEnter={() => setIsHovered1(true)}
          onMouseLeave={() => setIsHovered1(false)}
        >
          <Text style={styles.touchableText}>{t("See All Chats")}</Text>
          </TouchableOpacity>
          </BlurView>
          </View>

        <View style={styles.sideColumn}>
          <View style={styles.greenBorderedBox}>
          <BlurView intensity={50} style={styles.blurBackground}>
          <View style={{flexDirection: 'row', }}>
          <View style={{flexDirection: 'column', marginTop: 20, width: 350, marginLeft: 30 }}>
          <Text style={{fontSize: 24, color: '#63EC55', fontWeight: 'bold', marginTop: 12,fontFamily:"Roboto-Light"  }}>{t("Are you passionate about lifting others in your field to their next level?")}</Text>
          <TouchableOpacity onPress={handleOpenPress2} 
          style={[
          styles.touchablebegin,
          isHovered2 && styles.touchableOpacityHovered
        ]}
        onMouseEnter={() => setIsHovered2(true)}
        onMouseLeave={() => setIsHovered2(false)}
      >
          <Text style={styles.touchableTextbegin}>{t("Get Started")}</Text>
          </TouchableOpacity>
         
         
          
          
          </View>
          <Image
                  source={require('../assets/passion.png')}
                  style={styles.imageback}
                />
                </View>
         
          </BlurView>
          </View>

          <View style={styles.greenBox}>
          <BlurView intensity={80} style={styles.blurBackground}>
          
          <View style={{flexDirection: 'row', marginTop: 20 }}>
          <View style={styles.greenwhitebox}> 
<Text style={{fontSize: 16, color: '#63EC55', marginTop: 15, marginLeft: 20, fontWeight: 'bold',fontFamily:"Roboto-Light" }}>{t("Activities")}</Text>
<View style={{flexDirection: 'row' }}>
<TouchableOpacity onPress={goToManageHubs} 
style={[
  styles.touchablerate,
  isHovered5 && styles.touchableOpacityHovered
]}
onMouseEnter={() => setIsHovered5(true)}
onMouseLeave={() => setIsHovered5(false)}
>
          <Text style={styles.touchableTextrate}>{t("Hubs")}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={goToGrowth} 
          style={[
            styles.touchablerate,
            isHovered6 && styles.touchableOpacityHovered
          ]}
          onMouseEnter={() => setIsHovered6(true)}
          onMouseLeave={() => setIsHovered6(false)}
          >
          <Text style={styles.touchableTextrate}>{t("Growth plan")}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={goToInterview} 
          style={[
            styles.touchablerate,
            isHovered7 && styles.touchableOpacityHovered
          ]}
          onMouseEnter={() => setIsHovered7(true)}
          onMouseLeave={() => setIsHovered7(false)}
          >
          <Text style={styles.touchableTextrate}>{t("Interview")}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={goToAdvice} 
          style={[
            styles.touchablerate,
            isHovered8 && styles.touchableOpacityHovered
          ]}
          onMouseEnter={() => setIsHovered8(true)}
          onMouseLeave={() => setIsHovered8(false)}
          >
          <Text style={styles.touchableTextrate}>{t("Advice")}</Text>
          </TouchableOpacity>
</View>
</View>
        </View>
          <View style={{flexDirection: 'row' }}>
          <View style={{flexDirection: 'column' }}>
           <View style={{flexDirection: 'row' }}>
         <View style={{flexDirection: 'row' }}>
          <Image
       source={require('../assets/Upcom2.png')}
        style={{ width: 25, height: 25, marginLeft: 50, marginTop: 15,}}
      />
          <Text style={{fontSize: 18, color: '#63EC55', marginTop: 15, marginLeft: 10,  fontWeight: 'bold',fontFamily:"Roboto-Light" }}>{t("Upcoming Sessions")}</Text>
          </View>
          
           </View>
          <View style={{flexDirection: 'row', marginBottom: 15 }}>
           <Image
              source={{ uri: 'https://cdn.builder.io/api/v1/image/assets/TEMP/96214782d7fee94659d7d6b5a7efe737b14e6f05a42e18dc902e7cdc60b0a37b' }}
              style={{ width: 40, height: 40, marginLeft: 40, marginTop: 7,}}
            />
              <Image
              source={{ uri: 'https://cdn.builder.io/api/v1/image/assets/TEMP/96214782d7fee94659d7d6b5a7efe737b14e6f05a42e18dc902e7cdc60b0a37b' }}
              style={{ width: 40, height: 40,  marginLeft: -2, marginTop: 7,}}
            />
            <Image
              source={{ uri: 'https://cdn.builder.io/api/v1/image/assets/TEMP/96214782d7fee94659d7d6b5a7efe737b14e6f05a42e18dc902e7cdc60b0a37b' }}
              style={{ width: 40, height: 40, marginLeft: -2, marginTop: 7,}}
            />
            <Image
              source={{ uri: 'https://cdn.builder.io/api/v1/image/assets/TEMP/96214782d7fee94659d7d6b5a7efe737b14e6f05a42e18dc902e7cdc60b0a37b' }}
              style={{ width: 40, height: 40, marginLeft: -2, marginTop: 7,}}
            />
              <View style={{flexDirection: 'row' }}>
<TouchableOpacity
style={[
  styles.touchablesession,
  isHovered3 && styles.touchableOpacityHovered
]}
onMouseEnter={() => setIsHovered3(true)}
onMouseLeave={() => setIsHovered3(false)}
>
          <Text style={styles.touchableTextsession}>Setting up master data on SAP</Text>
          </TouchableOpacity>
          <TouchableOpacity 
          style={[
            styles.touchablejoinsession,
            isHovered4 && styles.touchableOpacityHovered
          ]}
          onMouseEnter={() => setIsHovered4(true)}
          onMouseLeave={() => setIsHovered4(false)}
          >
          <Text style={styles.touchableTextjoinsession}>{t("Start")}</Text>
          </TouchableOpacity>
          </View>
              </View>
            </View>
          </View>


<View style={{flexDirection: 'row' }}>
<View style={styles.greenwhitebox}> 
<Text style={{fontSize: 16, color: '#63EC55', marginTop: 20, marginLeft: 20, fontWeight: 'bold',fontFamily:"Roboto-Light" }}>{t("New Offer")}</Text>
<View style={{flexDirection: 'row' }}>
<Text style={{fontSize: 14, color: 'white', marginTop: 20, marginLeft: 20, textDecoration: 'underline',fontFamily:"Roboto-Light" }}>ASML wanta to enroll 5 SAP FI as your protegees</Text>
<TouchableOpacity
style={[
  styles.touchablejoinrate,
  isHovered9 && styles.touchableOpacityHovered
]}
onMouseEnter={() => setIsHovered9(true)}
onMouseLeave={() => setIsHovered9(false)}
>
          <Text style={styles.touchableTextjoinrate}>{t("Send a Bid")} </Text>
          </TouchableOpacity>
          </View>
</View>
</View>
<View style={{flexDirection: 'row' }}>
<View style={styles.greenwhitebox}>
<View style={{flexDirection: 'row'}}>
<Text style={{fontSize: 16, color: '#63EC55', marginTop: 15, marginLeft: 30, fontWeight: 'bold' ,fontFamily:"Roboto-Light"}}>{t("Growth Plan Review")}</Text>
<Text style={{fontSize: 12, color: 'white', marginTop: 15, position: 'absolute', right: 20, fontWeight: '600',fontFamily:"Roboto-Light" }}>9:30 AM to 10:30 AM | Jun 25</Text>
</View>
<View style={{flexDirection: 'row', }}>
<Image
              source={{ uri: 'https://cdn.builder.io/api/v1/image/assets/TEMP/96214782d7fee94659d7d6b5a7efe737b14e6f05a42e18dc902e7cdc60b0a37b' }}
              style={{ width: 30, height: 30,  marginLeft: 30, marginTop: 15,}}
            />
              <Text style={{fontSize: 14, color: 'white', marginTop: 20, marginLeft: 10, fontWeight: '600',fontFamily:"Roboto-Light" }}>Maryam Bakahali</Text>
<TouchableOpacity 
style={[
  styles.touchablestart,
  isHovered10 && styles.touchableOpacityHovered
]}
onMouseEnter={() => setIsHovered10(true)}
onMouseLeave={() => setIsHovered10(false)}
>
          <Text style={styles.touchableTextjoinreview}>{t("Start")}</Text>
          </TouchableOpacity>
          </View>
          </View>
          </View>
<View style={{flexDirection: 'row' }}>
<View style={styles.greenwhitebox}>
<View style={{flexDirection: 'row'}}>
<Text style={{fontSize: 16, color: '#63EC55', marginTop: 15, marginLeft: 30, fontWeight: 'bold', fontFamily:"Roboto-Light"}}>{t("Advice Session")}</Text>
<Text style={{fontSize: 12, color: 'white', marginTop: 15, position: 'absolute', right: 20, fontWeight: '600',fontFamily:"Roboto-Light" }}>9:30 AM to 10:30 AM | Jun 25</Text>
</View>
<View style={{flexDirection: 'row' }}>
<Image
              source={{ uri: 'https://cdn.builder.io/api/v1/image/assets/TEMP/96214782d7fee94659d7d6b5a7efe737b14e6f05a42e18dc902e7cdc60b0a37b' }}
              style={{ width: 30, height: 30,  marginLeft: 30, marginTop: 15,}}
            />
              <Text style={{fontSize: 14, color: 'white', marginTop: 20, marginLeft: 10, fontWeight: '600',fontFamily:"Roboto-Light" }}>Maryam Bakahali</Text>
<TouchableOpacity 
style={[
  styles.touchablestart,
  isHovered11 && styles.touchableOpacityHovered
]}
onMouseEnter={() => setIsHovered11(true)}
onMouseLeave={() => setIsHovered11(false)}
>
          <Text style={styles.touchableTextjoinreview}>{t("Start")}</Text>
          </TouchableOpacity>
          </View>
          </View>
          </View>
 <View style={{flexDirection: 'row' }}>
          <View style={styles.greenwhitebox}>
<View style={{flexDirection: 'row'}}>
<Text style={{fontSize: 16, color: '#63EC55', marginTop: 15, marginLeft: 30, fontWeight: 'bold',fontFamily:"Roboto-Light" }}>{t("Interview Session")}</Text>
<Text style={{fontSize: 12, color: 'white', marginTop: 15, position: 'absolute', right: 20, fontWeight: '600',fontFamily:"Roboto-Light" }}>9:30 AM to 10:30 AM | Jun 25</Text>
</View>
<View style={{flexDirection: 'row', marginBottom: 10 }}>
<Image
              source={{ uri: 'https://cdn.builder.io/api/v1/image/assets/TEMP/96214782d7fee94659d7d6b5a7efe737b14e6f05a42e18dc902e7cdc60b0a37b' }}
              style={{ width: 30, height: 30,  marginLeft: 30, marginTop: 15,}}
            />
              <Text style={{fontSize: 14, color: 'white', marginTop: 20, marginLeft: 10, fontWeight: '600' }}>Maryam Bakahali</Text>
<TouchableOpacity
style={[
  styles.touchablestart,
  isHovered12 && styles.touchableOpacityHovered
]}
onMouseEnter={() => setIsHovered12(true)}
onMouseLeave={() => setIsHovered12(false)}
>
          <Text style={styles.touchableTextjoinreview}>{t("Start")}</Text>
          </TouchableOpacity>
          </View>
          </View>
          
          </View>
          </BlurView>
 </View>
 
        </View>

        <View style={styles.whiteBoxesContainer}>
        
          <View style={styles.whiteBox}>
          <BlurView intensity={50} style={styles.blurBackground}>
          <View style={{flexDirection: 'row' }}>
          <Image
       source={require('../assets/question.png')}
        style={styles.boxicon}
      />
          <Text style={{fontSize: 18, color: '#63EC55', marginTop: 25, marginLeft: 10,  fontWeight: 'bold',fontFamily:"Roboto-Light" }}>{t("Have a question?")}</Text>
          </View>
          <Text style={{fontSize: 14, color: 'white', marginTop: 10, marginLeft: 35,marginRight: 20, marginBottom: 20,fontFamily:"Roboto-Light"  }}>{t("Do you have an idea you will like to share with us?")}</Text>
          <TouchableOpacity onPress={() => setModalVisible(true)}
          style={[
            styles.touchablecoach,
            isHovered13 && styles.touchableOpacityHovered
          ]}
          onMouseEnter={() => setIsHovered13(true)}
          onMouseLeave={() => setIsHovered13(false)}
          >
          <Text style={styles.touchableTextcoach}>{t("Suggestion")}</Text>
          </TouchableOpacity>
          
          </BlurView>
          </View>

          <View style={styles.whiteBox}>
          <BlurView intensity={50} style={styles.blurBackground}>
          <View style={{flexDirection: 'row' }}>
          <Image
       source={require('../assets/QandA.png')}
        style={styles.boxicon}
      />
          <Text style={{fontSize: 18, color: '#63EC55', marginTop: 25, marginLeft: 10,  fontWeight: 'bold',fontFamily:"Roboto-Light" }}>{t("Need Help?")}</Text>
          </View>
          <Text style={{fontSize: 14, color: 'white', marginTop: 10, marginLeft: 35,marginRight: 20, marginBottom: 20,fontFamily:"Roboto-Light"  }}>{t("Do you have an issue you would like us to assist you with?")}</Text>
          <TouchableOpacity onPress={() => setModalVisible(true)}
          style={[
            styles.touchablecoach,
            isHovered14 && styles.touchableOpacityHovered
          ]}
          onMouseEnter={() => setIsHovered14(true)}
          onMouseLeave={() => setIsHovered14(false)}
          >
          <Text style={styles.touchableTextcoach}>{t("Get Help")}</Text>
          </TouchableOpacity>
          
          </BlurView>
          </View>

          <View style={styles.whiteBox}>
          <BlurView intensity={100} style={styles.blurBackground}>
          <View style={{flexDirection: 'row' }}>
          <Image
       source={require('../assets/money (2).png')}
        style={styles.boxicon}
      />
          <Text style={{fontSize: 18, color: '#63EC55', marginTop: 25, marginLeft: 10,  fontWeight: 'bold',fontFamily:"Roboto-Light" }}>{t("Income Overview")}</Text>
          </View>
          <Text style={{fontSize: 14, color: 'white', marginTop: 10, marginLeft: 35,marginRight: 20,fontFamily:"Roboto-Light"  }}>{t("You earned $ (XYZ) from session with Joop Melcher. Your available balance is...")}</Text>
          <TouchableOpacity onPress={goToWithdrawal} 
          style={[
            styles.touchablecoach,
            isHovered15 && styles.touchableOpacityHovered
          ]}
          onMouseEnter={() => setIsHovered15(true)}
          onMouseLeave={() => setIsHovered15(false)}
          >
          <Text style={styles.touchableTextcoach}>{t("Withdraw Earnings")}</Text>
          </TouchableOpacity>
          </BlurView>
          </View>
        </View> 
      </View>
 
    </View>
    <CustomModal visible={custommodalVisible} onClose={() => handleCloseModal()} />
        </ScrollView>
      </View>
      
     
    <SuggestionModal visible={modalVisible} onClose={() => setModalVisible(false)} />
    <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible2}
        onRequestClose={handleCloseModal2}
      >
        <View style={styles.modalContent}>
          <OpenModal2 onClose={() => handleCloseModal2()} />
        </View>
      </Modal>
     
    </View>
    </ImageBackground>
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
  container: {
    flex: 1,
    alignItems: 'center',
    marginLeft: 270,
    marginTop: 100,
  },
  greeting: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
    color: 'white',
    marginLeft: 3,
    fontFamily:"Roboto-Light"
  },
  icon: {
    width: 15,
    height: 15,
    marginLeft: 30,
    marginTop: 10
  },
  sunicon: {
    width: 28,
    height: 28,
    marginRight: 10,
    marginTop: 20,
    marginLeft: -300
  },
  boxicon: {
    width: 25,
    height: 25,
    marginLeft: 20,
    marginTop: 25,
  },
  staricon: {
    width: 20,
    height: 20,
    marginLeft: 50,
    marginTop: 15
  },
  mainContent: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 20,
    marginLeft: -55
  },
  sideColumn: {
    marginRight: 15,
  },
  greenBorderedBox: {
    width: 580,
    height: 220,
    backgroundColor: 'rgba(125,125,125,0.3)',
      borderRadius: 20,
    marginBottom: 20, 
    borderColor: 'rgba(255,255,255,0.5)',
    borderWidth: 1
},
messageBox: {
  width: 220,
  height: 700,
  backgroundColor: 'rgba(125,125,125,0.3)',
    borderRadius: 20,
  marginRight: 15, 
  borderColor: 'rgba(255,255,255,0.5)',
  borderWidth: 1
},
greenBox: {
  width: 580,
  height: 800,
  backgroundColor: 'rgba(225,255,212,0.1)',
  borderRadius: 20,
  marginBottom: 20,
  borderColor: 'rgba(255,255,255,0.5)',
    borderWidth: 1
},
blurBackground: {
  flex: 1, 
  borderRadius: 20, 
},
 blurBackground2: {
  flex: 1, 
  borderRadius: 20, 
},
whiteBoxesContainer: {
  flexDirection: 'column',
  justifyContent: 'flex-start',
},
whiteBox: {
  width: 280,
  height: 200,
  backgroundColor: 'rgba(125,125,125,0.3)',
  borderRadius: 20,
  marginBottom: 15,
  borderColor: 'rgba(255,255,255,0.5)',
  borderWidth: 1
},
  touchable: {
    padding: 8,
    paddingHorizontal: 20,
    marginTop: 12,
    marginLeft: 120,
    backgroundColor: 'rgba(200,200,125,0.3)',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  touchablechat: {
    padding: 8,
    paddingHorizontal: 20,
    marginTop: 60,
    marginLeft: 30,
    marginRight: 30,
    backgroundColor: 'rgba(200,200,125,0.3)',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  touchableText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 13,
    fontFamily:"Roboto-Light"
  },
  touchableTextbegin: {
    color: 'darkgreen',
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily:"Roboto-Light"
  },
   touchablecoach: {
    backgroundColor: 'rgba(200,200,125,0.3)',
    padding: 8,
    paddingHorizontal: 5, 
    marginTop: 25,
    marginLeft: 30,
    marginRight: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  touchableTextcoach: {
    color: 'white',
    textAlign: 'center',
    fontSize: 13,
    fontFamily:"Roboto-Light"
    },
   touchableall: {
    backgroundColor: 'rgba(200,200,125,0.3)',
    padding: 8,
    paddingHorizontal: 20,  
    marginTop: 15,
    width: 220,
    marginLeft: 30,
    marginRight: 30,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  touchableTextall: {
    color: 'white',
    textAlign: 'center',
    fontSize: 13
  },
   touchablehub: {
    backgroundColor: 'rgba(200,200,125,0.3)',
    paddingHorizontal: 20, 
    padding: 8, 
    marginTop: 15,
    width: 120,
    marginRight: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  touchableTexthub: {
    color: 'white',
    textAlign: 'center',
    fontSize: 13
  },
  touchablejoinsession: {
    backgroundColor: 'rgba(200,200,125,0.3)',
    padding: 8,
    paddingHorizontal: 20, 
    marginTop: 10,
    marginRight: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  touchableTextjoinsession: {
    color: 'white',
    textAlign: 'center',
    fontSize: 13
  },
  touchablerate: {
    backgroundColor: 'rgba(200,200,125,0.3)',
    justifyContent: 'center',
    padding: 8,
    paddingHorizontal: 10, 
    marginTop: 10,
    marginRight: 5,
    marginLeft: 20,
    width: 100,
    height: 40,
    overflow: 'hidden',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  touchableTextrate: {
    color: 'white',
    textAlign: 'center',
    fontSize: 13,
    fontFamily:"Roboto-Light"
  },
  touchablesession: {
    backgroundColor: 'rgba(200,200,125,0.3)',
    padding: 8,
    paddingHorizontal: 20, 
    marginTop: 10,
    marginRight: 10,
    marginLeft: 50,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  touchableTextsession: {
    color: 'white',
    textAlign: 'center',
    fontSize: 13,
    fontFamily:"Roboto-Light"
  },
   greenwhitebox: {
    width: 510,
    height: 100,
    backgroundColor: 'rgba(10,0,0,0.3)',
    marginLeft: 35, 
    marginTop: 10, 
    borderRadius: 20, 
    },
     touchablejoinreview: {
      backgroundColor: 'rgba(200,200,125,0.3)',
    padding: 8,
    paddingHorizontal: 20, 
    marginTop: 10,
    marginLeft: 350,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  touchablestart: {
    backgroundColor: 'rgba(200,200,125,0.3)',
    padding: 8,
    paddingHorizontal: 20, 
    marginTop: 15,
    borderRadius: 10,
    right: 20,
    position: 'absolute',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  touchableTextjoinreview: {
    color: 'white',
    textAlign: 'center',
    fontSize: 13,
    fontFamily:"Roboto-Light"
  },
  touchablejoinrate: {
    backgroundColor: 'rgba(200,200,125,0.3)',
    padding: 8,
    paddingHorizontal: 20, 
    marginTop: 10,
    position: 'absolute',
    right: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  touchableTextjoinrate: {
    color: 'white',
    textAlign: 'center',
    fontSize: 13
  },
  touchableOpacityHovered: {
    backgroundColor: 'coral'
  },
    verticalLine: {
    height: 60,
    width: 2,
    backgroundColor: '#CCC',
    marginLeft: 30,
    marginTop: 15
  },
  circle: {
    width: 35,
    height: 35,
    borderRadius: 20,
   backgroundColor: '#63EC55',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -15
  },
  circleText: {
    color: 'white',
    fontWeight: '500',
    fontSize: 16,
    fontFamily:"Roboto-Light"
  },
  image: {
    width: 35,
    height: 35,
    marginRight: 10,
    marginLeft: 15,
    borderRadius: 25
  },
  imageback: {
    width: 180,
    height: 180,
    marginRight: 30,
    marginLeft: 10,
    marginTop: 10,
    borderRadius: 20
  },
  touchablebegin: {
    padding: 10,
    paddingHorizontal: 5,
    marginTop: 20,
    marginBottom: 10,
    width: 150,
    backgroundColor: '#63EC55',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
});

export default HomePage;
