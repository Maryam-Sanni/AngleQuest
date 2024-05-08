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
                        <Text style={{marginLeft: 730, marginTop: 20, marginBottom: -15, width: 200, fontWeight: '600'}}>Uneditable Section</Text>
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

<Text style={{ marginTop: 20, fontWeight: 'bold', color: 'black', marginLeft: 50 }}>Bid Details</Text>
<View style={{flexDirection: 'row', marginBottom: 10,}}>
<Text style={{ marginTop: 5, fontWeight: '500', color: 'black', marginLeft: 50 }}>Write a concise message to the company stating why they should pick your bid</Text>
<Text style={{marginLeft: 165, marginTop: 5, width: 200, fontWeight: '600'}}>Uneditable Section</Text>
              </View>
              <View style={{ marginTop: 3.5, padding: 6, paddingTop: 8, paddingBottom: 100, backgroundColor: 'none', borderWidth: 2, borderColor: '#CCC', marginLeft: 50, marginRight: 70 }}>
                <Text style={{ color: 'grey', marginTop: 2.5,}}>Sent Content</Text>
                </View>

                <View style={styles.container}>
                <View style={styles.row}>
        <TouchableOpacity>
        <View style={styles.cell}>
          <Text style={{color: 'grey'}}>Attached file(s)</Text>
        </View>
        </TouchableOpacity>
        </View>
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
});

export default MyComponent;