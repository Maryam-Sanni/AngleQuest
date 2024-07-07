import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Image, ScrollView, Picker } from 'react-native';
import {useFonts} from "expo-font"
import { useTranslation } from 'react-i18next';


function MyComponent({ onClose }) {
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
 <View style={styles.container}>
      <View style={styles.row}>
        <View style={styles.cell}>
          <Text style = {{fontWeight: 'bold',fontFamily:"Roboto-Light"}}>{t("Type")}</Text>
        </View>
        <View style={styles.cell}>
        <Text style={{color: 'grey',fontFamily:"Roboto-Light"}}>{t("Team")}</Text>    
        </View>
      </View>
      <View style={styles.row}>
        <View style={styles.cell}>
          <Text style = {{fontWeight: 'bold',fontFamily:"Roboto-Light"}}>{t("Title")}</Text>
        </View>
        <View style={styles.cell}>
        <Text style={{color: 'grey',fontFamily:"Roboto-Light"}}>{t("Become SAP FI Medior expert in 6 months")}</Text>    
        </View>
      </View>
      <View style={styles.row}>
        <View style={styles.cell}>
          <Text style = {{fontWeight: 'bold',fontFamily:"Roboto-Light"}}>{t("Level")}</Text>
        </View>
        <View style={styles.cell}>
        <Text style={{color: 'grey',fontFamily:"Roboto-Light"}}>{t("Junior")}</Text>
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
          <Text style={{color: 'grey',fontFamily:"Roboto-Light"}}>{t("I want to be bale to lead a a project")}</Text>
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

 <View style={{flexDirection: 'row'}}>
<Text style={{ marginTop: 20, marginBottom: -10, fontWeight: '500', fontSize: 14, color: 'black', marginLeft: 50,fontFamily:"Roboto-Light" }}>{t("Growth Plan Scoring")}</Text>
<Text style={{marginLeft: 540, marginTop: 20, marginBottom: -15, width: 200, fontWeight: '600',fontFamily:"Roboto-Light"}}>{t("Uneditable Section")}</Text>
       </View>
       <View style={styles.container}>
      <View style={styles.row}>
        <View style={styles.cell}>
          <Text style = {{fontWeight: 'bold',fontFamily:"Roboto-Light"}}>{t("Strongest Competency")}</Text>
        </View>
        <View style={styles.cell}>
        <Text style={{color: 'grey',fontFamily:"Roboto-Light"}}>{t("PV01-Passion")}</Text>
        </View>
        </View>
        <View style={styles.row}>
        <View style={styles.cell}>
        <Text style = {{fontWeight: 'bold',fontFamily:"Roboto-Light"}}>{t("Strongest Competency")}</Text>
        </View>
        <View style={styles.cell}>
        <Text style={{color: 'grey',fontFamily:"Roboto-Light"}}>{t("PV07-Customer Orientation")}</Text>
        </View>
        </View>
    <View style={styles.row}>
        <View style={styles.cell}>
          <Text style = {{fontWeight: 'bold',fontFamily:"Roboto-Light"}}>{t("Strongest Competency")}</Text>
        </View>
        <View style={styles.cell}>
        <Text style={{color: 'grey',fontFamily:"Roboto-Light"}}>SV01-Creativity and Innovation</Text>
        </View>
        </View>
    <View style={styles.row}>
        <View style={styles.cell}>
        <Text style = {{fontWeight: 'bold',fontFamily:"Roboto-Light"}}>{t("Competency to develop")}</Text>
        </View>
        <View style={styles.cell}>
        <Text style={{color: 'grey',fontFamily:"Roboto-Light"}}>FxT01-Knowledge of product</Text>
        </View>
        </View>
<View style={styles.row}>
        <View style={styles.cell}>
        <Text style = {{fontWeight: 'bold',fontFamily:"Roboto-Light"}}>{t("Competency to develop")}</Text>
        </View>
        <View style={styles.cell}>
        <Text style={{color: 'grey',fontFamily:"Roboto-Light"}}>PV09-Pro-activity</Text>
        </View>
        </View>
 <View style={styles.row}>
        <View style={styles.cell}>
          <Text style = {{fontWeight: 'bold',fontFamily:"Roboto-Light"}}>{t("Competency to develop")}</Text>
        </View>
        <View style={styles.cell}>
        <Text style={{color: 'grey',fontFamily:"Roboto-Light"}}>{t("LO05-Planning and Organization")}</Text>
        </View>
        </View>
        </View>
<Text style={{ marginTop: 20, fontWeight: '500', color: 'black', marginLeft: 50, fontSize: 14, marginBottom: 10,fontFamily:"Roboto-Light" }}> {t("Overall Feedback/Remark")}</Text>
              <View style={{ marginTop: 3.5, padding: 6, paddingTop: 8, paddingBottom: 100, backgroundColor: 'none', borderWidth: 2, borderColor: '#CCC', marginLeft: 50, marginRight: 70 }}>
              <Text style={{color: 'grey',fontFamily:"Roboto-Light"}}>{t("Your goals and its description are clear and concise. Well done for that. I am satisfied with this set goals and I am more than happy to work with you to the finish line.  See you in our one-one session where I'll share further tips on how to achieve this feat and above all meet you.")}</Text>
               
                </View>

<View style={styles.container}>
      <View style={styles.row}>
        <View style={styles.cell}>
          <Text style = {{fontWeight: 'bold',fontFamily:"Roboto-Light"}}>{t("Performance Rating")}</Text>
        </View>
        <View style={styles.cell}>
        <Text style={{color: 'grey',fontFamily:"Roboto-Light"}}>RT01-Brilliant</Text>
        </View>
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
    color:'grey',
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
  }
});

export default MyComponent;