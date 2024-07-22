import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Alert, ScrollView, Picker } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Top from '../components/topbar';
import Sidebar from '../components/sidebar';
import { useTranslation } from 'react-i18next';
import * as DocumentPicker from 'expo-document-picker';

const MyComponent = () => {
  const navigation = useNavigation();
  const [profileImage, setProfileImage] = useState(null);
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  const handleChooseImage = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: ['image/*', 'application/pdf'],
        copyToCacheDirectory: true,
        multiple: false,
      });
      if (result.type === 'success') {
        setProfileImage(result.uri);
      }
    } catch (err) {
      console.error('Error picking document:', err);
    }
  };

  const handleShareCV = () => {
    if (profileImage) {
      Alert.alert(
        'Thank you for sharing your CV with us. AngleQuest AI will be soon.',
        'Thank you for sharing your CV with us. AngleQuest AI will be soon.'
      );
    } else {
      Alert.alert('Please Choose a File', 'Please Choose a File');
    }
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

        <View style={{ flexDirection: 'row', marginTop: 50 }}>
          <Image
            source={require('../assets/AnglequestAI.png')}
            style={styles.image}
          />
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
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
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
    }
});

export default MyComponent;
