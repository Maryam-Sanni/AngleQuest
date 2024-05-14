import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Image, Picker } from 'react-native';

function MyComponent({ onClose }) {
  return (
    <View style={{ flex: 1, backgroundColor: "#F8F8F8", marginTop: 40, alignItems: 'center',  }}>
    

<View style={styles.greenBox}>
<TouchableOpacity onPress={onClose}>
            <Text style={{ fontSize: 18, color:'grey', marginLeft: 850,fontWeight: 'bold', marginTop: -20}}>
                            ✕
                        </Text>
                        </TouchableOpacity>

                        <View style={styles.container}>
      <View style={styles.row}>
        <View style={styles.cell}>
          <Text style = {{fontWeight: 'bold'}}>Amount</Text>
        </View>
        <View style={styles.cell}>
        <TextInput
            placeholder="100"
            placeholderTextColor="grey"
            style={styles.input}
          />
        </View>
      </View>
      <View style={styles.row}>
        <View style={styles.cell}>
          <Text style = {{fontWeight: 'bold'}}>Destination/Bank</Text>
        </View>
        <View style={styles.cell}>
        <Picker
  style={styles.picker} 
>
  <Picker.Item label="Choose Withdrawal Method" value="" />
  <Picker.Item label="Paypal" value="Paypal" />
  <Picker.Item label="Payoneer" value="Payoneer" />
  <Picker.Item label="Wire Transfer" value="Wire Transfer" />
</Picker>
        </View>
      </View>
      <View style={styles.row}>
        <View style={styles.cell}>
          <Text style = {{fontWeight: 'bold'}}>Confirm Withdrawal Code</Text>
        </View>
        <View style={styles.cell}>
         <TextInput
            placeholder="Enter the code"
            placeholderTextColor="grey"
            style={styles.input}
          />
        </View>
      </View>
      
        
        </View>



 <View style={{flexDirection: 'row'}}>
<TouchableOpacity style={styles.buttonAcc2} >
      <Text style={styles.buttonTextAcc}>Get Code</Text>
    </TouchableOpacity>
    <TouchableOpacity style={styles.buttonAcc} >
      <Text style={styles.buttonTextAcc}>Place Request</Text>
    </TouchableOpacity>
    </View>
    
 
   
  </View> 
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
  picker: {
    height: 20,
    width: '100%',
    backgroundColor: '#F8F8F8',
    borderColor: 'black',
    borderWidth: 1, 
    color:'grey',
    fontSize: 14
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
  buttonAcc: {
    backgroundColor: 'coral',
    padding: 10,
    marginTop: 20,
    marginLeft: 620, 
    paddingHorizontal: 10,
    marginBottom: 20,
    borderRadius: 5
  },
   buttonAcc2: {
    backgroundColor: 'grey',
    padding: 10,
    marginTop: 20,
    marginLeft: 50, 
    paddingHorizontal: 10,
    marginBottom: 20,
    borderRadius: 5
  },
  buttonTextAcc: {
    color: 'white',
    fontSize: 14,
    textAlign: 'center',
    fontWeight: 'bold', 
  },
  input: {
    outline: 'black',
    borderWidth: 1,
    borderColor: 'black'
  },
});

export default MyComponent;