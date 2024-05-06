import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Image, ScrollView } from 'react-native';

function MyComponent({ onClose }) {
  return (
    <View style={{ flex: 1, backgroundColor: "#F8F8F8", marginTop: 40, alignItems: 'center'  }}>
<View style={styles.greenBox}>    
<TouchableOpacity onPress={onClose}>
            <Text style={{ fontSize: 18, color:'grey', marginLeft: 850,fontWeight: 'bold', marginTop: -20}}>
                            ✕
                        </Text>
                        </TouchableOpacity>
 <View style={styles.container}>
      <View style={styles.row}>
        <View style={styles.cell}>
          <Text style = {{fontWeight: 'bold'}}>Company Name</Text>
        </View>
        <View style={styles.cell}>
        <Text style={{color: 'grey'}}>ASML</Text>
        </View>
      </View>
      <View style={styles.row}>
        <View style={styles.cell}>
          <Text style = {{fontWeight: 'bold'}}>Role</Text>
        </View>
        <View style={styles.cell}>
        <Text style={{color: 'grey'}}>Power Point Platform</Text>
        </View>
      </View>
      <View style={styles.row}>
        <View style={styles.cell}>
          <Text style = {{fontWeight: 'bold'}}>Level</Text>
        </View>
        <View style={styles.cell}>
        <Text style={{color: 'grey'}}>Junior</Text>
        </View>
      </View>
      <View style={styles.row}>
        <View style={styles.cell}>
          <Text style = {{fontWeight: 'bold'}}>Number of Candidates</Text>
        </View>
        <View style={styles.cell}>
          <Text style={{color: 'grey'}}>5</Text>
        </View>
        </View>
        <View style={styles.row}>
        <View style={styles.cell}>
          <Text style = {{fontWeight: 'bold'}}>Status</Text>
        </View>
        <View style={styles.cell}>
          <Text style={{color: 'grey'}}>Open</Text>
        </View>
        </View>
        </View>

<Text style={{ marginTop: 20, fontWeight: '500', color: 'black', marginLeft: 50 }}>Bid Details</Text>
<Text style={{ marginTop: 5, fontWeight: '500', color: 'black', marginLeft: 50 }}>Write a concise message to the company stating why they should pick your bid</Text>
              <View style={{ marginTop: 3.5, padding: 6, paddingTop: 8, paddingBottom: 100, backgroundColor: 'none', borderWidth: 2, borderColor: '#CCC', marginLeft: 50, marginRight: 70 }}>
                <TextInput
                  style={{ padding: 6, marginTop: 2.5, fontSize: 14, fontWeight: 'normal', color: '#6B7280', borderWidth: 2, outline: 'none', borderColor: '#F8F8F8', borderRadius: 5,  }}
                  placeholder=""
                />
                </View>

                <View style={styles.container}>
                <View style={styles.row}>
        <TouchableOpacity>
        <View style={styles.cell}>
          <Text style={{color: 'grey'}}>Attach any supporting file</Text>
        </View>
        </TouchableOpacity>
        </View>
        </View>

 <View style={{flexDirection: 'row'}}>
<Text style={{color: 'coral', marginLeft: 50, marginTop: 40}}>Kindly note that your profile will also be shared with the company.</Text>
    <TouchableOpacity style={styles.buttonAcc} >
      <Text style={styles.buttonTextAcc}>Send Bid</Text>
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
    height:600,
    backgroundColor: '#F8F8F8',
    marginTop: 40
  },
  buttonAcc: {
    backgroundColor: 'coral',
    padding: 10,
    marginTop: 30,
    marginLeft: 320, 
    paddingHorizontal: 10,
    marginBottom: 20
  },
  buttonTextAcc: {
    color: 'white',
    fontSize: 14,
    textAlign: 'center',
  },
  input: {
    outline: 'none',
  },
});

export default MyComponent;