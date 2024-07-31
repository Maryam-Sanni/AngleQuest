import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, TextInput, ScrollView, Picker } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Top from '../components/topbar';
import Sidebar from '../components/sidebar';
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

  return (
    <View style={{ flex: 1}}>
    <Top />
    <View style={{ flexDirection: 'row', flex: 1  }}>
      <Sidebar />
      <ScrollView contentContainerStyle={{ flexGrow: 1, maxHeight: 500  }}>
        <View style={styles.container}>

        <View style={styles.header}>
        <View style={{ flexDirection: "column"}}>
          <Text style={styles.headerText}>Hello I am AngleQuest AI</Text>
          <Text style={{ fontSize: 12, color: 'grey'}}>
              Upload your CV and choose the next level in your career that you want to reach...  </Text>
              <View style={styles.cvinput}>
              <input
                type="file"
                accept="image/*"
                onChange={handleChooseImage}
              />
            </View>
            </View>
              
          <TouchableOpacity style={styles.joinButton} onPress={handleShareCV}>
          <Text style={styles.joinButtonText}>Upload CV</Text>
        </TouchableOpacity>
        
        </View>



        <Image
            source={require('../assets/AnglequestAI.png')}
            style={styles.image}
          />

        <Text style={{ fontSize: 16, color: 'grey', textAlign: 'center' }}>I'll conduct a personalized skill gap analysis, growth plan,</Text>
        <Text style={{ fontSize: 16, color: 'grey', textAlign: 'center' }}>timeline and references to help you get started!</Text>

        <View style={{flexDirection: 'row', alignSelf: 'center' }}>
    <View style={[styles.whiteBox, { marginRight: 40, }]}>
    <Image
          source={{ uri: 'https://img.icons8.com/?size=100&id=7Yl8hX5gHFhC&format=png&color=000000' }}
          style={{width: 30, height: 30}}
        />
    <Picker style={styles.choose}>
                  <Picker.Item label={t("Specialty")} value="All" />
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
    <Text style={{ fontSize: 14, color: "grey", marginTop: 10,}}>Please select an area of expertise</Text>
      </View>

      <View style={[styles.whiteBox, { marginRight: 20,  }]}>
      <Image
          source={{ uri: 'https://img.icons8.com/?size=100&id=q5xh6x4WOWPD&format=png&color=000000' }}
          style={{width: 30, height: 30}}
        />
    <Picker style={styles.choose}>
    <Picker.Item label={t("Current level")} value="Teams" />
                  <Picker.Item label={t('Beginner')} value="Beginner" />
                  <Picker.Item label={t('Junior')} value="Junior" />
                  <Picker.Item label={t('Medior')} value="Medior" />
                  <Picker.Item label={t('Senior')} value="Senior" />
                  <Picker.Item label={t('Professional')} value="Professional" />
                </Picker>
    <Text style={{ fontSize: 14, color: "grey", marginTop: 10,}}>Where are you in your career?</Text>
      </View>

      <View style={[styles.whiteBox, { marginLeft: 20, }]}>
      <Image
          source={{ uri: 'https://img.icons8.com/?size=100&id=62901&format=png&color=000000' }}
          style={{width: 30, height: 30}}
        />
    <Picker style={styles.choose}>
    <Picker.Item label="Next level" value=" " />
                  <Picker.Item label={t('Beginner')} value="Beginner" />
                  <Picker.Item label={t('Junior')} value="Junior" />
                  <Picker.Item label={t('Medior')} value="Medior" />
                  <Picker.Item label={t('Senior')} value="Senior" />
                  <Picker.Item label={t('Professional')} value="Professional" />
                </Picker>
    <Text style={{ fontSize: 14, color: "grey", marginTop: 10,}}>Where do you aspire to get to?</Text>
      </View>
      </View>

      <View style={styles.messagecontainer}>
      <TextInput
        placeholder={t("Is there any other thing you will like to discuss?")}
        placeholderTextColor="#888"
        style={styles.messageinput}
      />
      <TouchableOpacity>
      <Image source={require('../assets/Sendarrow-message.png')} style={styles.icon} />
      </TouchableOpacity>
    </View>

        <View style={{ flexDirection: 'row', marginTop: 50 }}>
          <View style={{ flexDirection: 'column', marginLeft: 20 }}>
          <Text style={{ fontSize: 18 }}>
            Hello I am <Text style={{ fontSize: 18, fontWeight: '500' }}>
            AngleQuest AI
          </Text>
          </Text>
          
            <Text style={{ fontSize: 18, fontWeight: '500' }}>
              Upload your CV and choose the next level in your career that you want to reach...  </Text>
              <Text style={{ fontSize: 18 }}>I'll conduct a personalized skill gap analysis, growth plan, timeline and references to help you get started!</Text>
         
          
          <View style={styles.rows}>
          <TouchableOpacity style={styles.PDF} onPress={handleChooseImage}>
              <Text style={{fontSize: 14, color: 'white'}}>Upload CV</Text>
            </TouchableOpacity>
          <Picker style={styles.picker}>
                  <Picker.Item label={t("Specialty")} value="All" />
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

                <Picker style={styles.picker}>
                  <Picker.Item label={t("Current level")} value="Teams" />
                  <Picker.Item label={t('Beginner')} value="Beginner" />
                  <Picker.Item label={t('Junior')} value="Junior" />
                  <Picker.Item label={t('Medior')} value="Medior" />
                  <Picker.Item label={t('Senior')} value="Senior" />
                  <Picker.Item label={t('Professional')} value="Professional" />
                </Picker>

                <Picker style={styles.picker}>
                  <Picker.Item label="Next level" value=" " />
                  <Picker.Item label={t('Beginner')} value="Beginner" />
                  <Picker.Item label={t('Junior')} value="Junior" />
                  <Picker.Item label={t('Medior')} value="Medior" />
                  <Picker.Item label={t('Senior')} value="Senior" />
                  <Picker.Item label={t('Professional')} value="Professional" />
                </Picker>
                <TouchableOpacity style={styles.GO} onPress={toggleExpanded}>
              <Text style={{fontSize: 30, color: 'white', fontWeight: '600'}}>{'\u2193'}</Text>
            </TouchableOpacity>
              </View>
              </View>
              </View>

              {isExpanded && (
        <>
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
<Text style={{fontSize: 14, color: 'darkgreen', fontWeight: 'bold', marginBottom: 20 }}>Your knowledge gaps | <Text style={{color: 'green', fontWeight: '400' }}>things that you need to learn quickly</Text></Text>
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
              <View style={styles.percent}>
              <Text style={{fontSize: 35, fontWeight: '600', textAlign: 'center'}}>65%</Text>
              </View>
              <Text style={{fontSize: 16, fontWeight: '600', width: 150, marginTop: 10, textAlign: 'center'}}>You meet 65% of the requirement</Text>

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
      </>
      )}

        </View>
      </ScrollView>
      <CustomAlert
  visible={alertVisible}
  title={t("Alert")}
  message={alertMessage}
  onConfirm={hideAlert}
/>
    </View>
    </View>
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
    marginLeft: 210,
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
    width: 100,
    height: 100,
    alignSelf: 'center',
    marginTop: 30
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
    marginTop: 50,
    padding: 30,
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
    marginLeft: 15,
    width: 150,
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
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  box: {
    width: 70,
    height: 40,
    marginHorizontal: 5,
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
    width: 400
  },
  bigbox2: {
    padding: 5,
    borderWidth: 0,
   borderLeftWidth: 2,
   borderRightWidth: 2,
    borderColor: '#63EC55',
    marginLeft: 20,  width: 400
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
      width: 250,
      height: 250,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 10,
      backgroundColor: 'white',
    borderRadius: 10,
    marginTop: 50,
    borderWidth: 1,
    borderColor: "#CCC",
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
