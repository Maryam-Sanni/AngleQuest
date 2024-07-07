import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity,  ScrollView, Picker, Image} from 'react-native';
import {useFonts} from "expo-font"
import { useTranslation } from 'react-i18next';

function MyComponent({ onClose }) {
  const [fontsLoaded]=useFonts({
    'Roboto-Light':require("../assets/fonts/Roboto-Light.ttf"),
  })
  const {t}=useTranslation()

  return (
    <View style={{ flex: 1, backgroundColor: "#F8F8F8", alignItems: 'center', marginTop: 40}}>
         <ScrollView contentContainerStyle={{ flexGrow: 1, maxHeight: 500 }}>
<View style={styles.greenBox}>
<View style={styles.header}>
          <Image
            source={{ uri: 'https://cdn.builder.io/api/v1/image/assets/TEMP/1f2d38e99b0016f2bd167d2cfd38ff0d43c9f94a93c84b4e04a02d32658fb401?apiKey=7b9918e68d9b487793009b3aea5b1a32&' }} // replace with your logo URL
            style={styles.logo}
          />
          <Text style={styles.headerText}>{t("About Hub")}</Text>
       
        <TouchableOpacity onPress={onClose} style={styles.closeButton}>
          <Text style={{ fontSize: 18, color: '#3F5637', fontWeight: 'bold',fontFamily:"Roboto-Light"}}>
            ✕
          </Text>
        </TouchableOpacity>
        </View> 
                        <Text style={{ fontSize: 15, color: 'black', fontWeight: '500', marginTop: 20, marginLeft: 50,fontFamily:"Roboto-Light" }}>SAP FI: Junior - Medior</Text>
<View style={styles.container}>
<View style={styles.row}>
        <View style={styles.cell}>
          <Text style={{fontFamily:"Roboto-Light"}}>Hub Name</Text>
        </View>
        <View style={styles.cell}>
        <Text style={{ color: 'grey',fontFamily:"Roboto-Light" }}>SAP FI Super Rangers</Text>
        </View>
      </View>
      <View style={styles.row}>
        <View style={styles.cell}>
          <Text style={{fontFamily:"Roboto-Light"}}>{t("Meeting Day")}</Text>
        </View>
        <View style={styles.cell}>
        <Text style={{ color: 'grey' }}>{t("Monday")}</Text>
        </View>
      </View>
      <View style={styles.row}>
        <View style={styles.cell}>
          <Text style={{fontFamily:"Roboto-Light"}}>{t("Frequency")}</Text>
        </View>
        <View style={styles.cell}>
        <Text style={{ color: 'grey' }}>{t("Once Monthly")}</Text>
        </View>
      </View>
      <View style={styles.row}>
        <View style={styles.cell}>
          <Text style={{fontFamily:"Roboto-Light"}}>{t("Hub Goal")}</Text>
        </View>
        <View style={styles.cell}>
        <Text style={{ color: 'grey', height: 50 }}>{t("You will be able to..")}.</Text>
        </View>
      </View>
      <View style={styles.row}>
        <View style={styles.cell}>
          <Text style={{fontFamily:"Roboto-Light"}}>{t("Description")}</Text>
        </View>
        <View style={styles.cell}>
        <Text style={{ color: 'grey', height: 50  }}>{t("You will be able to...")}</Text>
        </View>
      </View>
      <View style={styles.row}>
        <View style={styles.cell}>
          <Text style={{fontFamily:"Roboto-Light"}}>{t("Expert")}</Text>
        </View>
        <View style={styles.cell}>
        <Text style={{ color: 'grey' }}>Joop Melcher</Text>
        </View>
      </View>
      <View style={styles.row}>
        <View style={styles.cell}>
          <Text>Participants</Text>
        </View>
        <View style={styles.cell}>
        <Text style={{ color: 'grey'}}>104</Text>
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
  greenBox: {
    width: 920,
    height:550,
    backgroundColor: '#F8F8F8',
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
  picker: {
    height: 20,
    width: '100%',
    backgroundColor: '#F8F8F8',
    borderColor: 'black',
    borderWidth: 1, 
    color:'grey',
    fontSize: 14
  },
  buttonplus: {
    backgroundColor: 'coral',
    padding: 5,
    marginLeft: 700, 
    width: 150,
    paddingHorizontal: 20,
    marginTop: 10
  },
  buttonTextplus: {
    color: 'white',
    fontSize: 14,
    textAlign: 'center',
  },
  input: {
    outline: 'black',
    borderColor: 'black',
    borderWidth: 1
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
    color: '#3F5637'
  }
});

export default MyComponent;