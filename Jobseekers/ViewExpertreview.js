import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Image, ScrollView, Picker } from 'react-native';
import {useFonts} from "expo-font"
import { useTranslation } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';


function MyComponent({ onClose }) {
  const [data, setData] = useState(null);
  const rating = 6; 

  const getRatingText = (rating) => {
    switch (rating) {
      case 1: return 'Very Dissatisfied';
      case 2: return 'Dissatisfied';
      case 3: return 'Somewhat Dissatisfied';
      case 4: return 'Slightly Dissatisfied';
      case 5: return 'Neutral';
      case 6: return 'Somewhat Satisfied';
      case 7: return 'Satisfied';
      case 8: return 'Very Satisfied';
      case 9: return 'Extremely Satisfied';
      case 10: return 'Completely Satisfied';
      default: return 'No Rating';
    }
  };



  useEffect(() => {
    const fetchData = async () => {
      try {
        const retrievedData = await AsyncStorage.getItem('selectedGrowthPlan');
        if (retrievedData) {
          const parsedData = JSON.parse(retrievedData);
          setData(parsedData); // Update the state with the retrieved data
        } else {
          console.log('No data found in AsyncStorage.');
        }
      } catch (error) {
        console.error('Failed to retrieve data from AsyncStorage', error);
      }
    };

    fetchData();
  }, []);

  const [fontsLoaded]=useFonts({
    'Roboto-Light':require("../assets/fonts/Roboto-Light.ttf"),
  })
  const {t}=useTranslation()

  return ( 
    <View style={{ flex: 1, backgroundColor: "#F8F8F8", marginTop: 40, alignItems: 'center',  }}>
    <ScrollView contentContainerStyle={{ flexGrow: 1, maxHeight: 500 }}>

<View style={styles.greenBox}>
<View style={styles.header}>
          <Image
            source={{ uri: 'https://cdn.builder.io/api/v1/image/assets/TEMP/1f2d38e99b0016f2bd167d2cfd38ff0d43c9f94a93c84b4e04a02d32658fb401?apiKey=7b9918e68d9b487793009b3aea5b1a32&' }} // replace with your logo URL
            style={styles.logo}
          />
          <Text style={styles.headerText}>{t("View Expert's Review")}</Text>

        <TouchableOpacity onPress={onClose} style={styles.closeButton}>
          <Text style={{ fontSize: 18, color: '#3F5637', fontWeight: 'bold',fontFamily:"Roboto-Light"}}>
            ✕
          </Text>
        </TouchableOpacity>
        </View> 
                        <Text style={{marginLeft: 730, marginTop: 20, marginBottom: -15, width: 200, fontWeight: '600',fontFamily:"Roboto-Light"}}>{t("Uneditable Section")}</Text>
  <Text style={{ fontSize: 15, color: 'black', fontWeight: '500', marginTop: 20, marginLeft: 50, fontFamily: 'Roboto-Light' }}>
    {t('Development Objectives')}
  </Text>
  <View style={styles.container}>
    {/* Form fields */}
    <View style={styles.row}>
      <View style={styles.cell}>
        <Text style={{ fontFamily: 'Roboto-Light' }}>{t('Title')}</Text>
      </View>
      <View style={styles.cell}>
        <TextInput
          placeholder=''
          placeholderTextColor="black"
          style={styles.input}
          editable={false}
          value={data?.title}
        />
      </View>
    </View>
    <View style={styles.row}>
      <View style={styles.cell}>
        <Text style={{ fontFamily: 'Roboto-Light' }}>{t('Role')}</Text>
      </View>
      <View style={styles.cell}>
        <TextInput
          placeholder=" "
          placeholderTextColor="black"
          style={styles.input}
          editable={false}
          value={data?.role}
        />
      </View>
    </View>

  </View>

 <View style={{flexDirection: 'row'}}>
<Text style={{ marginTop: 20, marginBottom: -10, fontWeight: '500', fontSize: 14, color: 'black', marginLeft: 50,fontFamily:"Roboto-Light" }}>{t("Growth Plan Scoring")}</Text>
<Text style={{marginLeft: 540, marginTop: 20, marginBottom: -15, width: 200, fontWeight: '600',fontFamily:"Roboto-Light"}}>{t("Uneditable Section")}</Text>
       </View>
       <View style={styles.container}>
         {data?.descriptions?.map((item, index) => (
           <View style={styles.row} key={index}>
             <View style={styles.cell}>
               <Text style={{fontWeight: 'bold', fontFamily: "Roboto-Light"}}>
                 {t("Guide")} {index + 1}: {item.description}
               </Text>
             </View>
             <View style={styles.cell}>
               <Text style={{color: 'grey', fontFamily: "Roboto-Light"}}>
                 {item.percentage}%
               </Text>
             </View>
           </View>
         ))}
        </View>
<Text style={{ marginTop: 20, fontWeight: '500', color: 'black', marginLeft: 50, fontSize: 14, marginBottom: 10,fontFamily:"Roboto-Light" }}> {t("Overall Feedback/Remark")}</Text>
              <View style={{ marginTop: 3.5, padding: 6, paddingTop: 8, paddingBottom: 100, backgroundColor: 'none', borderWidth: 2, borderColor: '#CCC', marginLeft: 50, marginRight: 70 }}>
              <Text style={{color: 'black',fontFamily:"Roboto-Light"}}>{data?.remark}</Text>

                </View>

<View style={styles.container}>
      <View style={styles.row}>
        <View style={styles.cell}>
          <Text style = {{fontWeight: 'bold',fontFamily:"Roboto-Light"}}>{t("Performance Rating")}</Text>
        </View>
        <View style={styles.cell}>
        <Text style={{color: 'black',fontFamily:"Roboto-Light"}}>{data?.rating}</Text>
        </View>
        </View>
        </View>

  <View style={styles.ratingContainer}>
    <Text style={styles.ratetitle}>{t("Rating")} <Image
      source={{ uri: 'https://img.icons8.com/?size=100&id=60003&format=png&color=206C00' }}
      style={{width: 20, height: 20, marginLeft: 5, marginTop: 5 }}
    /></Text>
    <View style={styles.raterow}>
      <Text style={styles.ratetext}>You rated {data?.coach} </Text>
      <Text style={styles.ratetext}>{getRatingText(rating)}</Text>
    </View>
  </View>



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
    color:'black',
    fontSize: 14,
    outline: 'black',
    borderWidth: 1,
    borderColor: 'black',
  },
  buttonAcc: {
    borderWidth: 3,
    borderColor: 'grey',
    padding: 10,
    marginTop: 30,
    marginLeft: 700, 
    marginRight: 70,
    paddingHorizontal: 5,
    marginBottom: 20
  },
  buttonTextAcc: {
    color: 'black',
    fontSize: 14,
    textAlign: 'center',
  },
  input: {
    outline: 'black',
    borderWidth: 1,
    borderColor: 'black',
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
  },
  ratingContainer: {
    alignItems: 'center',
    backgroundColor: 'white',
    justifyContent: 'center',
    padding: 50,
    marginTop: 300
  },
  ratetitle: {
    fontWeight: 'bold',
    fontSize: 20,
    marginBottom: 20,
    color: '#206C00'
  },
  raterow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratetext: {
    color: 'black',
    fontFamily: "Roboto-Light",
    fontSize: 16
  },

});

export default MyComponent;