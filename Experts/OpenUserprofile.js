import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Image } from 'react-native';

function MyComponent({ onClose }) {
  return (
    <View style={{ flex: 1, backgroundColor: "#F8F8F8", marginTop: 40, alignItems: 'center',  }}>
    

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
});

export default MyComponent;