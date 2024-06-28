import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Image, ScrollView, Picker } from 'react-native';
import {useFonts} from "expo-font"

function MyComponent({ onClose }) {
  const [fontsLoaded]=useFonts({
    'Varta-Light':require("../assets/fonts/Varta-Light.ttf"),
"Roboto-Light":require("../assets/fonts/Roboto-Light.ttf"),
  })

  return (
    <View style={{  flex: 1, backgroundColor: "white", marginTop: 40, alignItems: 'center' }}>
    <ScrollView contentContainerStyle={{ flexGrow: 1, maxHeight: 500 }}>
        <View style={styles.greenBox}>
        <View style={styles.header}>
          <Image
            source={{ uri: 'https://cdn.builder.io/api/v1/image/assets/TEMP/1f2d38e99b0016f2bd167d2cfd38ff0d43c9f94a93c84b4e04a02d32658fb401?apiKey=7b9918e68d9b487793009b3aea5b1a32&' }} 
            style={styles.logo}
          />
          <Text style={styles.headerText}>Create Growth Plan Profile</Text>
       
        <TouchableOpacity onPress={onClose} style={styles.closeButton}>
          <Text style={{ fontSize: 18, color: '#3F5637', fontWeight: 'bold',fontFamily:"Roboto-Light"}}>
            ✕
          </Text>
        </TouchableOpacity>
        </View> 
     <TouchableOpacity style={styles.buttonNew} >
      <Text style={styles.buttonTextNew}>New +</Text>
    </TouchableOpacity>
<View style={{ flexDirection: "row", marginBottom: 10}}>
<TouchableOpacity style={styles.buttonDue} >
      <Text style={styles.buttonTextDue}>Junior Power Platform Developer </Text>
    </TouchableOpacity>
    <TouchableOpacity style={styles.buttonAcc} >
      <Text style={styles.buttonTextAcc}>Junior SAP FI</Text>
    </TouchableOpacity>
    <TouchableOpacity style={styles.buttonAcc} >
      <Text style={styles.buttonTextAcc}>Senior SAP FI</Text>
    </TouchableOpacity>
</View>



 <View style={styles.container}>
      <View style={styles.row}>
        <View style={styles.cell}>
          <Text style = {{fontWeight: 'bold',fontFamily:"Roboto-Light"}}>Role</Text>
        </View>
        <View style={styles.cell}>
           <TextInput
            placeholder="Junior Platform Developer"
            placeholderTextColor="grey"
            style={styles.input}
          />
        </View>
      </View>
      <View style={styles.row}>
        <View style={styles.cell}>
          <Text style = {{fontWeight: 'bold',fontFamily:"Roboto-Light"}}>Level</Text>
        </View>
        <View style={styles.cell}>
        <TextInput
            placeholder="Junior"
            placeholderTextColor="grey"
            style={styles.input}
          />
        </View>
      </View>
      <View style={styles.row}>
        <View style={styles.cell}>
         <Text style = {{fontWeight: 'bold',fontFamily:"Roboto-Light"}}>Rate</Text>
        </View>
        <View style={styles.cell}>
        <TextInput
            placeholder="$50"
            placeholderTextColor="grey"
            style={styles.input}
          />
        </View>
      </View>
      <View style={styles.row}>
        <View style={styles.cell}>
         <Text style = {{fontWeight: 'bold',fontFamily:"Roboto-Light"}}>Available Days</Text>
        </View>
        <View style={styles.cell}>
          <TextInput
            placeholder="Mon-Fri"
            placeholderTextColor="grey"
            style={styles.input}
          />
        </View>
      </View>
      <View style={styles.row}>
        <View style={styles.cell}>
          <Text style = {{fontWeight: 'bold',fontFamily:"Roboto-Light"}}>Available Times</Text>
        </View>
        <View style={styles.cell}>
         <TextInput
            placeholder="12PM-1PM"
            placeholderTextColor="grey"
            style={styles.input}
          />
        </View>
      </View>
    </View>
    <View style= {{flexDirection: 'row'}}>
    <Text style={{marginLeft: 50, fontWeight: '600', marginTop: 20,fontFamily:"Roboto-Light"}}>My Scoring Guide</Text>
     <TouchableOpacity style={styles.buttonplus} >
      <Text style={styles.buttonTextplus}>+</Text>
    </TouchableOpacity>
</View>

     <View style={styles.container}>
      <View style={styles.row}>
      <View style={[styles.cell, { flex: 2 }]}>
          <Text style = {{fontWeight: 'bold',fontFamily:"Roboto-Light"}}>Guide 1</Text>
        </View>
        <View style={[styles.cell, { flex: 5 }]}>
           <TextInput
            placeholder="Plan around how to use tools to boost performance e.g, xrm toolbox"
            placeholderTextColor="grey"
            style={styles.input}
          />
        </View>
        <View style={[styles.cell, { flex: 2 }]}>
        <Picker
  style={styles.picker} 
>
  <Picker.Item label=" " value="" />
  <Picker.Item label="10%" value="10%" />
  <Picker.Item label="20%" value="20%" />
  <Picker.Item label="30%" value="30%" />
  <Picker.Item label="40%" value="40%" />
  <Picker.Item label="50%" value="50%" />
  <Picker.Item label="60%" value="60%" />
  <Picker.Item label="70%" value="70%" />
  <Picker.Item label="80%" value="80%" />
  <Picker.Item label="90%" value="90%" />
  <Picker.Item label="100%" value="100%" />
</Picker>
        </View>
      </View>
      <View style={styles.row}>
      <View style={[styles.cell, { flex: 2 }]}>
          <Text style = {{fontWeight: 'bold',fontFamily:"Roboto-Light"}}>Guide 2</Text>
        </View>
        <View style={[styles.cell, { flex: 5 }]}>
        <TextInput
            placeholder="How to incorporate app performance optimization"
            placeholderTextColor="grey"
            style={styles.input}
          />
        </View>
        <View style={[styles.cell, { flex: 2 }]}>
        <Picker
  style={styles.picker} 
>
  <Picker.Item label=" " value="" />
  <Picker.Item label="10%" value="10%" />
  <Picker.Item label="20%" value="20%" />
  <Picker.Item label="30%" value="30%" />
  <Picker.Item label="40%" value="40%" />
  <Picker.Item label="50%" value="50%" />
  <Picker.Item label="60%" value="60%" />
  <Picker.Item label="70%" value="70%" />
  <Picker.Item label="80%" value="80%" />
  <Picker.Item label="90%" value="90%" />
  <Picker.Item label="100%" value="100%" />
</Picker>
        </View>
         </View>
      <View style={styles.row}>
      <View style={[styles.cell, { flex: 2 }]}>
         <Text style = {{fontWeight: 'bold',fontFamily:"Roboto-Light"}}>Guide 3</Text>
        </View>
        <View style={[styles.cell, { flex: 5 }]}>
        <TextInput
            placeholder="How to be proactivee"
            placeholderTextColor="grey"
            style={styles.input}
          />
        </View>
        <View style={[styles.cell, { flex: 2 }]}>
        <Picker
  style={styles.picker} 
>
  <Picker.Item label=" " value="" />
  <Picker.Item label="10%" value="10%" />
  <Picker.Item label="20%" value="20%" />
  <Picker.Item label="30%" value="30%" />
  <Picker.Item label="40%" value="40%" />
  <Picker.Item label="50%" value="50%" />
  <Picker.Item label="60%" value="60%" />
  <Picker.Item label="70%" value="70%" />
  <Picker.Item label="80%" value="80%" />
  <Picker.Item label="90%" value="90%" />
  <Picker.Item label="100%" value="100%" />
</Picker>
        </View>
      </View>
      <View style={styles.row}>
      <View style={[styles.cell, { flex: 2 }]}>
         <Text style = {{fontWeight: 'bold',fontFamily:"Roboto-Light"}}>Guide 4</Text>
        </View>
        <View style={[styles.cell, { flex: 5 }]}>
          <TextInput
            placeholder="How to optimize power automate"
            placeholderTextColor="grey"
            style={styles.input}
          />
        </View>
        <View style={[styles.cell, { flex: 2 }]}>
        <Picker
  style={styles.picker} 
>
  <Picker.Item label=" " value="" />
  <Picker.Item label="10%" value="10%" />
  <Picker.Item label="20%" value="20%" />
  <Picker.Item label="30%" value="30%" />
  <Picker.Item label="40%" value="40%" />
  <Picker.Item label="50%" value="50%" />
  <Picker.Item label="60%" value="60%" />
  <Picker.Item label="70%" value="70%" />
  <Picker.Item label="80%" value="80%" />
  <Picker.Item label="90%" value="90%" />
  <Picker.Item label="100%" value="100%" />
</Picker>
        </View>
      </View>
      <View style={styles.row}>
      <View style={[styles.cell, { flex: 2 }]}>
          <Text style = {{fontWeight: 'bold',fontFamily:"Roboto-Light"}}>Guide 5</Text>
        </View>
        <View style={[styles.cell, { flex: 5 }]}>
         <TextInput
            placeholder="How to optimize AI builder bot"
            placeholderTextColor="grey"
            style={styles.input}
          />
        </View>
        <View style={[styles.cell, { flex: 2 }]}>
        <Picker
  style={styles.picker} 
>
  <Picker.Item label=" " value="" />
  <Picker.Item label="10%" value="10%" />
  <Picker.Item label="20%" value="20%" />
  <Picker.Item label="30%" value="30%" />
  <Picker.Item label="40%" value="40%" />
  <Picker.Item label="50%" value="50%" />
  <Picker.Item label="60%" value="60%" />
  <Picker.Item label="70%" value="70%" />
  <Picker.Item label="80%" value="80%" />
  <Picker.Item label="90%" value="90%" />
  <Picker.Item label="100%" value="100%" />
</Picker>
        </View>
      </View>
     
      </View>
<TouchableOpacity onPress={onClose} style={styles.buttonsave} >
      <Text style={styles.buttonTextsave}>Save</Text>
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
    marginTop: 10, 
    marginLeft: 50,
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
  buttonDue: {
    borderWidth: 2,
    borderColor: 'coral',
    padding: 10,
    marginLeft: 50,
    paddingHorizontal: 20,
    marginTop: 15,
  },
  buttonTextDue: {
    color: 'black',
    fontSize: 14,
    textAlign: 'center',
    fontFamily:"Roboto-Light"
  },
  buttonAcc: {
    borderWidth: 2,
    borderColor: '#CCC',
    padding: 10,
    marginTop: 15,
    marginLeft: 30, 
    paddingHorizontal: 20,
  },
  buttonTextAcc: {
    color: 'grey',
    fontSize: 14,
    textAlign: 'center',
    fontFamily:"Roboto-Light"
  },
  buttonNew: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: 'coral',
    padding: 5,
    marginLeft: 50, 
    width: 100,
    paddingHorizontal: 20,
    marginTop: 10
  },
  buttonTextNew: {
    color: 'coral',
    fontSize: 14,
    textAlign: 'center',
    fontFamily:"Roboto-Light"
  },
   buttonplus: {
    backgroundColor: 'coral', 
    padding: 5,
    marginLeft: 585, 
    width: 100,
    paddingHorizontal: 20,
    marginTop: 10
  },
  buttonTextplus: {
    color: 'white',
    fontSize: 14,
    textAlign: 'center',
  },
   buttonsave: {
    backgroundColor: 'coral',
    padding: 5,
    marginLeft: 750, 
    width: 100,
    paddingHorizontal: 20,
    marginTop: 10
  },
  buttonTextsave: {
    color: 'white',
    fontSize: 14,
    textAlign: 'center',
    fontFamily:"Roboto-Light"
  },
  greenBox: {
    width: 920,
    height:600,
    backgroundColor: '#F8F8F8',
  },
  input: {
    outline: 'black',
    borderWidth: 1,
    borderColor: 'black',
    fontFamily:"Roboto-Light"
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
  picker: {
    height: 20,
    width: '100%',
    backgroundColor: '#F8F8F8',
    borderColor: 'black',
    borderWidth: 1, 
    color:'grey',
    fontSize: 14
  },
});

export default MyComponent;