import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Image, ScrollView } from 'react-native';

function MyComponent({ onClose }) {
  return (
    <View style={{ flex: 1, backgroundColor: "#F8F8F8", marginTop: 40, alignItems: 'center'  }}>
     <ScrollView contentContainerStyle={{ flexGrow: 1, maxHeight: 500 }}>
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

 <Text style={{ marginTop: 20, fontWeight: '500', color: 'black', marginLeft: 50 }}>Feedback from the company</Text>
              <View style={{ marginTop: 3.5, padding: 6, paddingTop: 8, paddingBottom: 100, backgroundColor: 'none', borderWidth: 2, borderColor: '#CCC', marginLeft: 50, marginRight: 70 }}>
                <Text style={{ color: 'grey', marginTop: 2.5,}}>Hi XYZ, {'\n'} {'\n'}After some careful review of your bid and profile in comparison to others, we believe you are the best experienced for our team. {'\n'}{'\n'}Congratulations and Thank you for wanting to work with us on this journey. {'\n'}{'\n'}Thank you, ASML Management</Text>
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
    height:650,
    backgroundColor: '#F8F8F8',
    marginTop: 40
  },
});

export default MyComponent;