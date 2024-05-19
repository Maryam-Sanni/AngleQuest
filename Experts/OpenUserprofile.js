import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Image } from 'react-native';

function MyComponent({ onClose }) {
  return (
    <View style={{ flex: 1, backgroundColor: "#F8F8F8", marginTop: 40, alignItems: 'center',  }}>
    

<View style={styles.greenBox}>
<View style={styles.header}>
          <Image
            source={{ uri: 'https://cdn.builder.io/api/v1/image/assets/TEMP/1f2d38e99b0016f2bd167d2cfd38ff0d43c9f94a93c84b4e04a02d32658fb401?apiKey=7b9918e68d9b487793009b3aea5b1a32&' }} // replace with your logo URL
            style={styles.logo}
          />
          <Text style={styles.headerText}>User Profile</Text>
       
        <TouchableOpacity onPress={onClose} style={styles.closeButton}>
          <Text style={{ fontSize: 18, color: '#3F5637', fontWeight: 'bold'}}>
            ✕
          </Text>
        </TouchableOpacity>
        </View> 
                        <Text style={{marginLeft: 730, marginTop: 20, marginBottom: -15, width: 200, fontWeight: '600'}}>Uneditable Section</Text>

 <View style={styles.container}>
      <View style={styles.row}>
        <View style={styles.cell}>
          <Text style = {{fontWeight: 'bold'}}>Full Name</Text>
        </View>
        <View style={styles.cell}>
        <Text style={{color: 'grey'}}> Maryam Bakahali</Text>
        </View>
      </View>
      <View style={styles.row}>
        <View style={styles.cell}>
          <Text style = {{fontWeight: 'bold'}}>Role</Text>
        </View>
        <View style={styles.cell}>
        <Text style = {{color: 'grey' }}>Power Platform and Dynamics 365 Expert</Text>
        </View>
      </View>
      <View style={styles.row}>
        <View style={styles.cell}>
         <Text style = {{fontWeight: 'bold'}}>Level</Text>
        </View>
        <View style={styles.cell}>
        <Text style = {{color: 'grey' }}>Medior</Text>
        </View>
      </View>
      <View style={styles.row}>
        <View style={styles.cell}>
         <Text style = {{fontWeight: 'bold'}}>Type</Text>
        </View>
        <View style={styles.cell}>
        <Text style = {{color: 'grey' }}>Interview for New Role</Text>
        </View>
      </View>
      <View style={styles.row}>
        <View style={styles.cell}>
          <Text style = {{fontWeight: 'bold'}}>Company</Text>
        </View>
        <View style={styles.cell}>
        <Text style = {{color: 'grey' }}>Prodware</Text>
        </View>
      </View>
 </View>
<TouchableOpacity>
       <View style={styles.container}>
      <View style={styles.row}>
        <View style={styles.cell}>
          <Text style = {{fontWeight: 'bold'}}>CV</Text>
        </View>
        <View style={styles.cell}>
        <Text style = {{color: 'green', textDecorationStyle: 'underline' }}>MaryambakCV.pdf</Text>
        </View>
        </View>
    </View>
    </TouchableOpacity>


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
    height:850,
    backgroundColor: '#F8F8F8',
    marginTop: 40
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
    color: '#3F5637'
  }
});

export default MyComponent;