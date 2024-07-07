import { useFonts } from 'expo-font';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Image, ScrollView, Picker } from 'react-native';

function MyComponent({ onClose }) {
  const [fontsLoaded]=useFonts({
    "Roboto-Light":require("../assets/fonts/Roboto-Light.ttf"),
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
<Text style={{ marginTop: 20, marginBottom: -10, fontWeight: 'bold', fontSize: 16, color: 'black', marginLeft: 50 }}>{t("Growth Plan Scoring")}</Text>
       <View style={styles.container}>
      <View style={styles.row}>
        <View style={styles.cell}>
          <Text style = {{fontWeight: 'bold',fontFamily:"Roboto-Light"}}>{t("Strongest Competency")}</Text>
        </View>
        <View style={styles.cell}>
        <Picker
  style={styles.picker}
>
  <Picker.Item label="PV01-Passion" value="" />
  <Picker.Item label="PV02-Passion" value="PV02-Passion" />
  <Picker.Item label="PV03-Passion" value="PV03-Passion" />
  <Picker.Item label="PV01-Passion" value="PV01-Passion" />
  {/* Add more Picker.Item components for additional options */}
</Picker>
        </View>
        </View>
        <View style={styles.row}>
        <View style={styles.cell}>
          <Text style = {{fontWeight: 'bold',fontFamily:"Roboto-Light"}}>{t("Strongest Competency")}</Text>
        </View>
        <View style={styles.cell}>
        <Picker
  style={styles.picker}
>
  <Picker.Item label="PV07-Customer Orientation" value="" />
  <Picker.Item label="PV06-Customer Orientation" value="PV06-Customer Orientation" />
  <Picker.Item label="PV05-Customer Orientation" value="PV05-Customer Orientation" />
  <Picker.Item label="PV07-Customer Orientation" value="PV07-Customer Orientation" />
  {/* Add more Picker.Item components for additional options */}
</Picker>
        </View>
        </View>
    <View style={styles.row}>
        <View style={styles.cell}>
          <Text style = {{fontWeight: 'bold',fontFamily:"Roboto-Light"}}>{t("Strongest Competency")}</Text>
        </View>
        <View style={styles.cell}>
        <Picker
  style={styles.picker}
>
  <Picker.Item label="SV01-Creativity and Innovation" value="" />
  <Picker.Item label="SV02-Creativity and Innovation" value="SV02-Creativity and Innovation" />
  <Picker.Item label="SV03-Creativity and Innovation" value="SV03-Creativity and Innovation" />
  <Picker.Item label="SV04-Creativity and Innovation" value="SV04-Creativity and Innovation" />
  {/* Add more Picker.Item components for additional options */}
</Picker>
         
        </View>
        </View>
    <View style={styles.row}>
        <View style={styles.cell}>
          <Text style = {{fontWeight: 'bold',fontFamily:"Roboto-Light"}}>{t("Competency to develop")}</Text>
        </View>
        <View style={styles.cell}>
        <Picker
  style={styles.picker}
>
  <Picker.Item label="FxT01-Knowledge of product " value="" />
  <Picker.Item label="FxT02-Knowledge of product " value="FxT02-Knowledge of product " />
  <Picker.Item label="FxT01-Knowledge of product " value="FxT01-Knowledge of product " />
  <Picker.Item label="FxT03-Knowledge of product " value="FxT03-Knowledge of product " />
  {/* Add more Picker.Item components for additional options */}
</Picker>
        </View>
        </View>
<View style={styles.row}>
        <View style={styles.cell}>
          <Text style = {{fontWeight: 'bold',fontFamily:"Roboto-Light"}}>{t("Competency to develop")}</Text>
        </View>
        <View style={styles.cell}>
        <Picker
  style={styles.picker}
>
  <Picker.Item label="PV09-Pro-activity " value="" />
  <Picker.Item label="PV09-Pro-activity" value="PV09-Pro-activity" />
  <Picker.Item label="PV08-Pro-activity " value="PV08-Pro-activity" />
  <Picker.Item label="PV07-Pro-activity " value="PV07-Pro-activity" />
  {/* Add more Picker.Item components for additional options */}
</Picker>
        </View>
        </View>
 <View style={styles.row}>
        <View style={styles.cell}>
          <Text style = {{fontWeight: 'bold',fontFamily:"Roboto-Light"}}>{t("Competency to develop")}</Text>
        </View>
        <View style={styles.cell}>
        <Picker
  style={styles.picker} 
>
  <Picker.Item label="LO05-Planning and Organization" value="" />
  <Picker.Item label="LO05-Planning and Organization" value="LO05-Planning and Organization" />
  <Picker.Item label="LO04-Planning and Organization" value="LO04-Planning and Organization" />
  <Picker.Item label="LO03-Planning and Organization" value="LO03-Planning and Organization" />
</Picker>
        </View>
        </View>
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
  <Picker.Item label="RT01-Brilliant" value="" />
  <Picker.Item label="RT02-Good" value="RT02-Good" />
  <Picker.Item label="RT03-Perfect" value="RT03-Perfect" />
  <Picker.Item label="RT01-Brilliant" value="RT01-Brilliant" />
  {/* Add more Picker.Item components for additional options */}
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
    marginTop: 40
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
    fontFamily:"Roboto-Light"
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