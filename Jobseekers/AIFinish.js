import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, Animated, StyleSheet, TextInput, ScrollView, Picker, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Top from '../components/topbar';
import Sidebar from '../components/sidebar';
import { BlurView } from 'expo-blur';
import { useTranslation } from 'react-i18next';
import CustomAlert from '../components/CustomAlert';

const MyComponent = () => {
  const navigation = useNavigation();
  const [profileImage, setProfileImage] = useState(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState('')  

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  const handleChooseImage = (event) => {
    const selectedImage = event.target.files[0];
    if (selectedImage) {
      const imageUrl = URL.createObjectURL(selectedImage);
      setProfileImage(imageUrl);
    }
  };

  const handleShareCV = (imageUri) => {
    if (profileImage) {
      setAlertMessage('✓ Proceed to choose your "Specialty"');
    } else {
      setAlertMessage('Please choose a file');
    }
    setAlertVisible(true);
  };

  const hideAlert = () => {
    setAlertVisible(false);
  };



  const boxes = [
    'Box 1', 'Box 2', 'Box 3', 'Box 4',
    'Box 5', 'Box 6', 'Box 7', 'Box 8',
    'Box 9', 'Box 10', 'Box 11', 'Box 12'
  ];

  const { t } = useTranslation();

  const gotoCV = () => {
      navigation.navigate('Use CV');
  };

  const gotoQS = () => {
    navigation.navigate('Use Questionnaire');
  };

  return (
    <ImageBackground
    source={require ('../assets/backgroundimg2.png') }
    style={{ height: '110%', width: '100%',flex: 1}}
    >
    <BlurView intensity={70} style={{flex: 1}}>
    <View style={{ flex: 1}}>
    <Top />
    <View style={{ flexDirection: 'row', flex: 1  }}>
      <Sidebar />
      <ScrollView contentContainerStyle={{ flexGrow: 1, maxHeight: 500  }}>
        <View style={styles.glassBox}>
        <View style={styles.container}>

          <View style={{ flexDirection: 'row', marginTop: 50, alignSelf: 'flex-start', }}> 
            <Image
              source={require('../assets/AnglequestAI.png')}
              style={styles.image}
            />
            <View style={styles.rows}>
              <Text style={{ fontSize: 18, fontWeight: '500', textAlign: 'center' }}>
                John Ojabo Heart’s Knowledge Gap Analysis </Text>
            </View>
          </View>


          
          <View style={{flexDirection: 'row', marginTop: 50}}>
            <View style={styles.Timeline}>
            <Text style={{fontSize: 14 }}>Timelines</Text>
            </View>
            <View style={styles.month}>
            <Text style={{fontSize: 14 }}>3 Months</Text>
            </View>
            <View style={styles.month}>
            <Text style={{fontSize: 14 }}>6 Months</Text>
            </View>
            <View style={styles.month}>
            <Text style={{fontSize: 14 }}>9 Months</Text>
            </View>
            <View style={styles.month}>
            <Text style={{fontSize: 14 }}>12 Months</Text>
            </View>
            <View style={styles.month}>
            <Text style={{fontSize: 14 }}>15 Months</Text>
            </View>
            </View>
          <View style={{ flexDirection: "row", marginTop: 30 }}>
                        <View style={{ flexDirection: "column" }}>
                        <View style={styles.download}>
                        <Text style={{fontSize: 14, color: 'green' }}>Download pdf</Text>
                        </View>

                        <Image
                      source={require('../assets/sprint.png')}
                      style={styles.image}
                    />
          </View>
            <View style={styles.bigbox}>
              <Text style={{fontSize: 14, color: 'darkgreen', fontWeight: 'bold', marginBottom: 20 }}>Your knowledge gaps | <Text style={{color: 'green', fontWeight: '400' }}>Things that you need to learn</Text></Text>
              <View style={styles.row}>
                      {boxes.slice(0, 4).map((box, index) => (
                        <View style={styles.box} key={index}>
                           <Text style={styles.boxText}>box</Text>
                        </View>
                      ))}
                    </View>
              <View style={styles.row}>
                {boxes.slice(4, 8).map((box, index) => (
                  <View style={styles.box} key={index + 4}>
                    <Text style={styles.boxText}>box</Text>
                  </View>
                ))}
              </View>
              <View style={styles.row}>
                {boxes.slice(8, 12).map((box, index) => (
                  <View style={styles.box} key={index + 8}>
                     <Text style={styles.boxText}>box</Text>
                  </View>
                ))}
              </View>
              <TouchableOpacity>
              <Text style={{color: 'green', fontWeight: '400', fontSize: 12, textAlign: 'right', textDecorationLine: 'underline' }}>See knowledge gap in step by step</Text>
              </TouchableOpacity> 
            </View>
            <View style={styles.bigbox2}>
            <Text style={{fontSize: 14, color: 'darkgreen', fontWeight: 'bold', marginBottom: 20 }}>Learning References | <Text style={{color: 'green', fontWeight: '400' }}>where and how to learn your goals</Text></Text>
              <View style={styles.row}>
                {boxes.slice(0, 4).map((box, index) => (
                  <View style={styles.box} key={index}>
                     <Text style={styles.boxText}>box</Text>
                  </View>
                ))}
              </View>
              <View style={styles.row}>
                {boxes.slice(4, 8).map((box, index) => (
                  <View style={styles.box} key={index + 4}>
                     <Text style={styles.boxText}>box</Text>
                  </View>
                ))}
              </View>
              <View style={styles.row}>
                {boxes.slice(8, 12).map((box, index) => (
                  <View style={styles.box} key={index + 8}>
                     <Text style={styles.boxText}>box</Text>
                  </View>
                ))}
              </View>
              <TouchableOpacity>
              <Text style={{color: 'green', fontWeight: '400', fontSize: 12, textAlign: 'right', textDecorationLine: 'underline' }}>See learning reference in step by step</Text>
              </TouchableOpacity> 
            </View>
          </View>
           <View style={{ flexDirection: "row", marginTop: 30 }}>
                        <View style={{ flexDirection: "column" }}>
                          <Text style={{fontSize: 14, fontWeight: '600', width: 150, marginTop: 10 }}>Your proficiency rating</Text>

                        <View style={styles.percent}>
                        <Text style={{fontSize: 18, textAlign: 'center'}}>Intermediate Programmer</Text>
                        </View>
                      
                        {profileImage && (
                        <Image
                          source={{ uri: profileImage }}
                          style={{ width: 150, height: 50, marginTop: 20 }}
                        />
                      )}
          </View>
             <View style={styles.bigbox}>
               <Text style={{fontSize: 14, color: 'darkgreen', fontWeight: 'bold', marginBottom: 20 }}>Certifications to obtain | <Text style={{color: 'green', fontWeight: '400' }}>the bragging certs in this level </Text></Text>
               <View style={styles.row}>
                       {boxes.slice(0, 4).map((box, index) => (
                         <View style={styles.box} key={index}>
                            <Text style={styles.boxText}>box</Text>
                         </View>
                       ))}
                     </View>
                     <View style={styles.row}>
                       {boxes.slice(4, 8).map((box, index) => (
                         <View style={styles.box} key={index + 4}>
                            <Text style={styles.boxText}>box</Text>
                         </View>
                       ))}
                     </View>
               <View style={styles.row}>
                 {boxes.slice(8, 12).map((box, index) => (
                   <View style={styles.box} key={index + 8}>
                      <Text style={styles.boxText}>box</Text>
                   </View>
                 ))}
               </View> 
             </View>
             <View style={styles.bigbox2}>
             <Text style={{fontSize: 14, color: 'darkgreen', fontWeight: 'bold', marginBottom: 20 }}>Sample CVs | <Text style={{color: 'green', fontWeight: '400' }}>best options for your next CV</Text></Text>
             <View style={styles.row}>
                     {boxes.slice(0, 4).map((box, index) => (
                       <View style={styles.box} key={index}>
                          <Text style={styles.boxText}>box</Text>
                       </View>
                     ))}
                   </View>
                   <View style={styles.row}>
                     {boxes.slice(4, 8).map((box, index) => (
                       <View style={styles.box} key={index + 4}>
                          <Text style={styles.boxText}>box</Text>
                       </View>
                     ))}
                   </View>
                   <View style={styles.row}>
                     {boxes.slice(8, 12).map((box, index) => (
                       <View style={styles.box} key={index + 8}>
                          <Text style={styles.boxText}>box</Text>
                       </View>
                     ))}
                   </View>
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
};

const styles = StyleSheet.create({
  modalContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
  },
  container: {
    height: 1000,
    alignItems: 'center',
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
    height: 1030,
  backgroundColor: 'rgba(225,255,212,0.3)',
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    marginTop: 30,
    marginLeft: 240,
    marginRight: 30,
    marginBottom: 30,
  },
  buttonplus: {
    backgroundColor: '#135837',
    padding: 10,
    borderRadius: 10,
    marginTop: 50,
    width: 200,
  },
  buttonTextplus: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  image: {
    width: 120,
    height: 120,
marginRight: 10,
    marginLeft: 20,
    marginTop: -10
  },
  input: {
    marginTop: 50,
    backgroundColor: 'white',
    borderColor: '#135837',
    borderWidth: 1,
    color: 'black',
    fontSize: 14,
    borderRadius: 10,
    padding: 10,
    marginLeft: 10,
  },
  picker: {
    height: 40,
    width: 150,
    backgroundColor: '#4E8125',
    borderColor: 'black',
    borderWidth: 1, 
    color:'white',
    fontSize: 14,
    marginLeft: 50,
    borderRadius: 5, marginLeft: 10,
  },
  GO: {
  height: 40,
  width: 100,
  backgroundColor: '#4E8125',
  borderColor: 'black',
  borderWidth: 1, 
  color:'black',
  fontSize: 14,
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: 5, marginRight: 40, marginLeft: 10
},
  PDF: {
    height: 40,
    width: 150,
    backgroundColor: '#4E8125',
    borderColor: 'black',
    borderWidth: 1, 
    color:'black',
    fontSize: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 50,
    borderRadius: 5, marginLeft: 40,
  },
  rows: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: "100%",
    padding: 30,
    marginLeft: 20,
    borderWidth: 2,
    backgroundColor: '#F2F2F2',
    borderColor: '#63EC55'
  },
  Timeline: {
paddingVertical: 10,
paddingHorizontal: 20,
borderWidth: 2,
borderColor: 'grey',
marginLeft: 15,
width: 150,
alignItems: 'center'
  },
  month: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderWidth: 2,
    borderColor: '#63EC55',
    marginLeft: 10,
    width: 140,
    backgroundColor: '#F2F2F2',
    alignItems: 'center'
  },
  download: {
  paddingVertical: 10,
  paddingHorizontal: 20,
  borderWidth: 1,
  borderColor: '#63EC55',
  width: 150,
  alignItems: 'center',
  borderRadius: 5,
  marginBottom: 20
  },
  row: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  box: {
    width: "20%",
    marginHorizontal: 5,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  bigbox: {
    padding: 5,
    borderWidth: 0,
   borderLeftWidth: 2,
    borderColor: '#63EC55',
    marginLeft: 20,
    width: 350
  },
  bigbox2: {
    padding: 5,
    borderWidth: 0,
   borderLeftWidth: 2,
   borderRightWidth: 2,
    borderColor: '#63EC55',
    marginLeft: 10,  width: 350,
  },
  percent: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderWidth: 2,
    borderColor: 'green',
    width: 150,
    height: 80,
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 20
    },
    boxText:{
      color: 'white'
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 10,
      backgroundColor: 'white',
      borderWidth: 1,
      borderColor: "#CCC",
      borderRadius: 5,
      marginLeft: 5,
      marginRight: 5,
      marginTop: 5
    },
    logo: {
      width: 40,
      height: 40,
      marginRight: 5,
      marginLeft: 50,
    },
    headerText: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 20
    },
    joinButton: {
      backgroundColor: '#206C00',
     padding: 10,
     width: 100,
      position: 'absolute',
      right: 20,
      borderRadius: 10
    },
    joinButtonText: {
      color: 'white',
      fontWeight: '500',
    },
    cvinput: {
      color: 'black',
      fontSize: 12, marginTop: 3
    },
    whiteBox: {
      width: 280,
      height: 120,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 10,
      backgroundColor: 'white',
    borderRadius: 20,
    marginTop: 50,
    borderWidth: 2,
    borderColor: "black",
    },
    choose: {
marginTop: 10,
fontSize: 16,
fontWeight: 'bold',
      color:'#206C00',
      textAlign: 'center',
      width: 200,
      height: 40,
      borderWidth: 0
    },
    messagecontainer: {
      height: 50,
      marginBottom: 50,
      marginTop: 50,
      flexDirection: 'row',
      alignItems: 'center',
      borderWidth: 1,
      borderColor: 'grey',
      width: "80%",
      backgroundColor: '#F6F6F6',
      alignSelf: 'center',
      borderRadius: 5,
      padding: 5,
    },
    messageinput: {
      flex: 1,
      marginHorizontal: 10,
      padding: 5,
      fontSize: 16,
      borderWidth: 0,
      color: 'black',
      fontFamily:"Roboto-Light'"
    },
    icon: {
      width: 25,
      height: 25,
      marginHorizontal: 5,
    },
});

export default MyComponent;
