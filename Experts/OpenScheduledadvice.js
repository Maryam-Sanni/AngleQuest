import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Image, ScrollView, Picker } from 'react-native';


function MyComponent({ onClose }) {
  return (
    <View style={{ flex: 1, backgroundColor: "#F8F8F8", marginTop: 40, alignItems: 'center'  }}>

<View style={styles.greenBox}>
<View style={styles.header}>
          <Image
            source={{ uri: 'https://cdn.builder.io/api/v1/image/assets/TEMP/1f2d38e99b0016f2bd167d2cfd38ff0d43c9f94a93c84b4e04a02d32658fb401?apiKey=7b9918e68d9b487793009b3aea5b1a32&' }} // replace with your logo URL
            style={styles.logo}
          />
          <Text style={styles.headerText}>Scheduled Advice Meetings</Text>
       
        <TouchableOpacity onPress={onClose} style={styles.closeButton}>
          <Text style={{ fontSize: 18, color: '#3F5637', fontWeight: 'bold'}}>
            ✕
          </Text>
        </TouchableOpacity>
        </View> 
 <View style={styles.container}>
 <View style={styles.row}>
        <View style={styles.cell}>
          <Text style = {{fontWeight: 'bold'}}>Full Name</Text>
        </View>
        <View style={styles.cell}>
           <TextInput
            placeholder="Cheil Maarsen"
            placeholderTextColor="grey"
            style={styles.input}
          />
        </View>
      </View>
      <View style={styles.row}>
        <View style={styles.cell}>
          <Text style = {{fontWeight: 'bold'}}>Role</Text>
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
          <Text style = {{fontWeight: 'bold'}}>Level</Text>
        </View>
        <View style={styles.cell}>
        <TextInput
            placeholder="Junior"
            placeholderTextColor="grey"
            style={styles.input}
          />
        </View>
      </View>
      
         
      
      
    </View>
     


     <View style={styles.container}>
      <View style={styles.row}>
        <View style={styles.cell}>
          <Text style = {{fontWeight: 'bold'}}>Topic 1</Text>
        </View>
        <View style={[styles.cell, { flex: 7 }]}>
           <TextInput
            placeholder="3 Ways to Optimize a model driven app to optimize its performance"
            placeholderTextColor="grey"
            style={styles.input}
          />
        </View>
        <View style={[styles.cell, { flex: 2 }]}>
         <Picker
  style={styles.picker} 
>
  <Picker.Item label="Covered" value="" />
  <Picker.Item label="Covered" value="Covered" />
  <Picker.Item label="Skipped" value="Skipped" />
  {/* Add more Picker.Item components for additional options */}
</Picker>
        </View>
      </View>
      <View style={styles.row}>
        <View style={styles.cell}>
          <Text style = {{fontWeight: 'bold'}}>Topic 2</Text>
        </View>
        <View style={[styles.cell, { flex: 7 }]}>
        <TextInput
            placeholder="3 Ways to Optimize custom pages to optimize its performance"
            placeholderTextColor="grey"
            style={styles.input}
          />
        </View>
        <View style={[styles.cell, { flex: 2 }]}>
         <Picker
  style={styles.picker} 
>
  <Picker.Item label="Covered" value="" />
  <Picker.Item label="Covered" value="Covered" />
  <Picker.Item label="Skipped" value="Skipped" />
  {/* Add more Picker.Item components for additional options */}
</Picker>
        </View>
      </View>
      <View style={styles.row}>
        <View style={styles.cell}>
         <Text style = {{fontWeight: 'bold'}}>Topic 3</Text>
        </View>
        <View style={[styles.cell, { flex: 7 }]}>
        <TextInput
            placeholder="3 Ways to Optimize a canvas app to optimize its performance"
            placeholderTextColor="grey"
            style={styles.input}
          />
        </View>
        <View style={[styles.cell, { flex: 2 }]}>
         <Picker
  style={styles.picker} 
>
  <Picker.Item label="Skipped" value="" />
  <Picker.Item label="Covered" value="Covered" />
  <Picker.Item label="Skipped" value="Skipped" />
  {/* Add more Picker.Item components for additional options */}
</Picker>
        </View>
      </View>
      <View style={styles.row}>
        <View style={styles.cell}>
         <Text style = {{fontWeight: 'bold'}}>Topic 4</Text>
        </View>
        <View style={[styles.cell, { flex: 7 }]}>
          <TextInput
            placeholder="3 Ways to Optimize a power automate to optimize its performance"
            placeholderTextColor="grey"
            style={styles.input}
          />
        </View>
        <View style={[styles.cell, { flex: 2 }]}>
         <Picker
  style={styles.picker} 
>
  <Picker.Item label="Covered" value="" />
  <Picker.Item label="Covered" value="Covered" />
  <Picker.Item label="Skipped" value="Skipped" />
  {/* Add more Picker.Item components for additional options */}
</Picker>
        </View>
      </View>
      <View style={styles.row}>
        <View style={styles.cell}>
          <Text style = {{fontWeight: 'bold'}}>Topic 5</Text>
        </View>
        <View style={[styles.cell, { flex: 7 }]}>
         <TextInput
            placeholder="3 Ways to Optimize AI builder bot to optimize its performance"
            placeholderTextColor="grey"
            style={styles.input}
          />
        </View>
        <View style={[styles.cell, { flex: 2 }]}>
         <Picker
  style={styles.picker} 
>
  <Picker.Item label="Skipped" value="" />
  <Picker.Item label="Covered" value="Covered" />
  <Picker.Item label="Skipped" value="Skipped" />
  {/* Add more Picker.Item components for additional options */}
</Picker>
        </View>
      </View>
      <View style={styles.row}>
        <View style={styles.cell}>
          <Text style = {{fontWeight: 'bold'}}>Topic 6</Text>
        </View>
        <View style={[styles.cell, { flex: 7 }]}>
         <TextInput
            placeholder="3 Ways to Optimize a canvas app to optimize its performance"
            placeholderTextColor="grey"
            style={styles.input}
          />
        </View>
        <View style={[styles.cell, { flex: 2 }]}>
         <Picker
  style={styles.picker} 
>
  <Picker.Item label="Covered" value="" />
  <Picker.Item label="Covered" value="Covered" />
  <Picker.Item label="Skipped" value="Skipped" />
  {/* Add more Picker.Item components for additional options */}
</Picker>
        </View>
      </View>
      </View>
<TouchableOpacity style={styles.buttonplus} >
      <Text style={styles.buttonTextplus}>Save</Text>
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
    marginTop: 30, 
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
  picker: {
    height: 20,
    width: '100%',
    backgroundColor: '#F8F8F8',
    borderColor: '#F8F8F8',
    color:'grey',
    fontSize: 14,
    outline: 'black',
    borderWidth: 1,
    borderColor: 'black'
  },
   buttonplus: {
    backgroundColor: 'coral',
    padding: 5,
    marginLeft: 750, 
    width: 100,
    paddingHorizontal: 20,
    marginTop: 30
  },
  buttonTextplus: {
    color: 'white',
    fontSize: 14,
    textAlign: 'center',
  },
  greenBox: {
    width: 920,
    height:600,
    backgroundColor: '#F8F8F8',
    marginTop: 40
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
    color: '#3F5637'
  }
});

export default MyComponent; 