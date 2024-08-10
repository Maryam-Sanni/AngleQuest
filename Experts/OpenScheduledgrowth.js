import React, { useState, useEffect } from 'react'; 
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Image, ScrollView, Picker } from 'react-native';
import { useFonts } from 'expo-font';
import { useTranslation } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import CustomAlert from '../components/CustomAlert';

function MyComponent({ onClose }) {
   const [guides, setGuides] = useState([]);
  
  const [fontsLoaded]=useFonts({
    "Roboto-Light":require("../assets/fonts/Roboto-Light.ttf"),
        })
        const {t}=useTranslation()

  useEffect(() => {
    const loadFormData = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        if (!token) throw new Error('No token found');

        const response = await axios.get('https://recruitangle.com/api/expert/growthplan/get', {
          headers: { Authorization: `Bearer ${token}` }
        });

        if (response.status === 200 && response.data.status === 'success') {
          const data = response.data.growthPlan;
          setGuides(data.guides || []);
        } else {
          console.error('Failed to fetch data', response);
        }
      } catch (error) {
        console.error('Failed to load form data', error);
      }
    };

    loadFormData();
  }, []);

  const handleGuideChange = (index, field, value) => {
    const newGuides = [...guides];
    newGuides[index] = { ...newGuides[index], [field]: value };
    setGuides(newGuides);
  };
  
  return ( 
    <View style={{ flex: 1, backgroundColor: "#F8F8F8", marginTop: 40, alignItems: 'center',  }}>
    <ScrollView contentContainerStyle={{ flexGrow: 1, maxHeight: 500 }}>

<View style={styles.greenBox}>
<View style={styles.header}>
          <Image
            source={{ uri: 'https://cdn.builder.io/api/v1/image/assets/TEMP/1f2d38e99b0016f2bd167d2cfd38ff0d43c9f94a93c84b4e04a02d32658fb401?apiKey=7b9918e68d9b487793009b3aea5b1a32&' }} // replace with your logo URL
            style={styles.logo}
          />
          <Text style={styles.headerText}>{t("Scheduled Growth Plans")}</Text>
       
        <TouchableOpacity onPress={onClose} style={styles.closeButton}>
          <Text style={{ fontSize: 18, color: '#3F5637', fontWeight: 'bold',fontFamily:"Roboto-Light"}}>
            ✕
          </Text>
        </TouchableOpacity>
        </View>
                        <Text style={{marginLeft: 730, marginTop: 20, marginBottom: -15, width: 200, fontWeight: '600'}}>{t("Uneditable Section")}</Text>
 <View style={styles.container}>
      <View style={styles.row}>
        <View style={styles.cell}>
          <Text style = {{fontWeight: 'bold',fontFamily:"Roboto-Light"}}>{t("Protegee")}</Text>
        </View>
        <View style={styles.cell}>
        <Text style={{color: 'grey',fontFamily:"Roboto-Light"}}> Maryam Bakahali</Text>
           
        </View>
      </View>
      <View style={styles.row}>
        <View style={styles.cell}>
          <Text style = {{fontWeight: 'bold',fontFamily:"Roboto-Light"}}>{t("Level")}</Text>
        </View>
        <View style={styles.cell}>
        <Text style={{color: 'grey',fontFamily:"Roboto-Light"}}>Junior</Text>
        </View>
      </View>
      <View style={styles.row}>
        <View style={styles.cell}>
          <Text style = {{fontWeight: 'bold',fontFamily:"Roboto-Light"}}>{t("Result Description")}</Text>
        </View>
        <View style={styles.cell}>
          <Text style={{color: 'grey',fontFamily:"Roboto-Light"}}>{t("To be able to find my way around SAP FI")}</Text>
        </View>
        </View>
        <View style={styles.row}>
        <View style={styles.cell}>
          <Text style = {{fontWeight: 'bold',fontFamily:"Roboto-Light"}}>{t("How to achieve")}</Text>
        </View>
        <View style={styles.cell}>
          <Text style={{color: 'grey',fontFamily:"Roboto-Light"}}>{t("To be taught to troubleshoot, find 'codes, navigate the system")}</Text>
        </View>
        </View>
    <View style={styles.row}>
        <View style={styles.cell}>
          <Text style = {{fontWeight: 'bold',fontFamily:"Roboto-Light"}}>{t("Anticipated Progress (Target)")}</Text>
        </View>
        <View style={styles.cell}>
          <Text style={{color: 'grey',fontFamily:"Roboto-Light"}}>{t("I want to be able to lead a a project")}</Text>
        </View>
        </View>
    <View style={styles.row}>
        <View style={styles.cell}>
          <Text style = {{fontWeight: 'bold',fontFamily:"Roboto-Light"}}>{t("What do you need to achieve this objective?")}</Text>
        </View>
        <View style={styles.cell}>
          <Text style={{color: 'grey',fontFamily:"Roboto-Light"}}>{t("Continuous training, practice and support")}</Text>
        </View>
        </View>
 <View style={styles.row}>
        <View style={styles.cell}>
          <Text style = {{fontWeight: 'bold',fontFamily:"Roboto-Light"}}>{t("Progress/Level")}</Text>
        </View>
        <View style={styles.cell}>
          <Text style={{color: 'grey',fontFamily:"Roboto-Light"}}>{t("Goal Setting Stage")}</Text>
        </View>
        </View>
 <View style={styles.row}>
        <View style={styles.cell}>
          <Text style = {{fontWeight: 'bold',fontFamily:"Roboto-Light"}}>{t("Goal Timeline")}</Text>
        </View>
        <View style={styles.cell}>
          <Text style={{color: 'grey',fontFamily:"Roboto-Light"}}>{t("Start Date-End Date")}</Text>
        </View>
        </View>
     
      
 </View>
  <Text style={{ marginLeft: 50, fontWeight: 'bold', marginTop: 20 }}>{t("Growth Plan Scoring")}</Text>

  <View style={styles.container}>
    {guides.map((guide, index) => (
      <View style={styles.row} key={index}>
        <View style={[styles.cell, { flex: 2 }]}>
          <Text style={{ fontWeight: 'bold', fontFamily: "Roboto-Light" }}>{t("Guide")} {index + 1}</Text>
        </View>
        <View style={[styles.cell, { flex: 5 }]}>
          <TextInput
            placeholder={t("Guide description")}
            placeholderTextColor="grey"
            style={styles.input}
            editable={false} 
            value={guide.guide}
            onChangeText={text => handleGuideChange(index, 'guide', text)}
          />
        </View>
        <View style={[styles.cell, { flex: 2 }]}>
          <Picker
            selectedValue={guide.percentage}
            style={styles.picker}
            onValueChange={(itemValue) => handleGuideChange(index, 'percentage', itemValue)}
          >
            <Picker.Item label="10%" value="10" />
            <Picker.Item label="20%" value="20" />
            <Picker.Item label="30%" value="30" />
            <Picker.Item label="40%" value="40" />
            <Picker.Item label="50%" value="50" />
            <Picker.Item label="60%" value="60" />
            <Picker.Item label="70%" value="70" />
            <Picker.Item label="80%" value="80" />
            <Picker.Item label="90%" value="90" />
            <Picker.Item label="100%" value="100" />
          </Picker>
        </View>
      </View>
    ))}
    <TouchableOpacity
      onPress={() => setGuides([...guides, { guide: '', percentage: '0' }])}
      style={styles.addButton}
    >

    </TouchableOpacity>
  </View>
<Text style={{ marginTop: 20, fontWeight: 'bold', color: 'black', marginLeft: 50, fontSize: 16, marginBottom: 10,fontFamily:"Roboto-Light" }}> {t("Overall Feedback/Remark")}</Text>
              <View style={{ marginTop: 3.5, padding: 6, paddingTop: 8, paddingBottom: 100, backgroundColor: 'none', borderWidth: 2, borderColor: '#CCC', marginLeft: 50, marginRight: 70 }}>
                <TextInput
                  style={{ padding: 6, marginTop: 2.5, fontSize: 14, fontWeight: 'normal', color: '#6B7280', borderWidth: 1, outline: 'black', borderColor: 'black',  }}
                  placeholder="e.g: Your goals and its description are clear and concise. Well done for that. I am satisfied with this set goals and I am more than happy to work with you to the finish line.  See you in our one-one session where I'll share further tips on how to achieve this feat and above all meet you."
                />
                </View>

<View style={styles.container}>
      <View style={styles.row}>
        <View style={styles.cell}>
          <Text style = {{fontWeight: 'bold',fontFamily:"Roboto-Light"}}>{t("Performance Rating")}</Text>
        </View>
        <View style={styles.cell}>
        <Picker
  style={styles.picker}
>
  <Picker.Item label="Brilliant" value="Brilliant" />
  <Picker.Item label="Good" value="Good" />
  <Picker.Item label="Perfect" value="Perfect" />
</Picker>
        </View>
        </View>
        </View>

    <TouchableOpacity style={styles.buttonAcc} >
      <Text style={styles.buttonTextAcc}>{t("Save")}</Text>
    </TouchableOpacity>
    
    
 
    </View>
    </ScrollView>
</View>

);
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    borderWidth: 1,
    borderColor: '#CCC',
    marginRight: 70, 
    marginTop: 20, 
    marginLeft: 50 
  },
  row: {
    flexDirection: 'row',
  },
  cell: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#CCC',
    padding: 5,
  },
  greenBox: {
    width: 920,
    height:850,
    backgroundColor: '#F8F8F8',
  },
  picker: {
    height: 20,
    width: '100%',
    backgroundColor: '#F8F8F8',
    borderColor: '#F8F8F8',
    color:'grey',
    fontSize: 14,
    outline: 'black',
    borderWidth: 1,
    borderColor: 'black',
  },
  buttonAcc: {
   backgroundColor: 'coral',
    padding: 10,
    marginTop: 30,
    marginLeft: 700, 
    marginRight: 70,
    paddingHorizontal: 5,
    marginBottom: 20
  },
  buttonTextAcc: {
    color: 'white',
    fontSize: 14,
    textAlign: 'center',
    fontFamily:"Roboto-Light"
  },
  input: {
    outline: 'none',
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
    color: '#3F5637',
    fontFamily:"Roboto-Light"
  }
});

export default MyComponent;