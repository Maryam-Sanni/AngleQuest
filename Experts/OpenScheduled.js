import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Image, ScrollView, Picker } from 'react-native';

function MyComponent({ onClose }) {
  return (
     
    <View style={{ flex: 1, backgroundColor: "#F8F8F8", alignItems: 'center', marginTop: 40}}>
<View style={styles.greenBox}>
<TouchableOpacity onPress={onClose}>
            <Text style={{ fontSize: 18, color:'grey', marginLeft: 850,fontWeight: 'bold', marginTop: -20}}>
                            ✕
                        </Text>
                        </TouchableOpacity>
 <View style={styles.container}>
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
     
      <Text style={{marginLeft: 800, marginTop: 20, marginBottom: -20, width: 100, fontWeight: '600'}}>Rating</Text>
   


     <View style={styles.container}>
      <View style={styles.row}>
        <View style={[styles.cell, { flex: 2 }]}>
          <Text style = {{fontWeight: 'bold'}}>Question 1</Text>
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
  <Picker.Item label="10%" value="" />
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
          <Text style = {{fontWeight: 'bold'}}>Question 2</Text>
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
  <Picker.Item label="10%" value="" />
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
         <Text style = {{fontWeight: 'bold'}}>Question 3</Text>
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
  <Picker.Item label="10%" value="" />
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
         <Text style = {{fontWeight: 'bold'}}>Question 4</Text>
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
  <Picker.Item label="10%" value="" />
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
          <Text style = {{fontWeight: 'bold'}}>Question 5</Text>
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
  <Picker.Item label="10%" value="" />
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
          <Text style = {{fontWeight: 'bold'}}>Question 6</Text>
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
  <Picker.Item label="10%" value="" />
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
   buttonplus: {
    backgroundColor: 'coral',
    padding: 5,
    marginLeft: 750, 
    width: 100,
    paddingHorizontal: 20,
    marginTop: 10
  },
  buttonTextplus: {
    color: 'white',
    fontSize: 14,
    textAlign: 'center',
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
  greenBox: {
    width: 920,
    height:300,
    backgroundColor: '#F8F8F8',
   marginTop: 40
  },
  input: {
    outline: 'black',
    borderWidth: 1,
    borderColor: 'black',
  },
  
});

export default MyComponent;