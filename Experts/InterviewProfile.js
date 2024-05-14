import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Image, Modal, Picker, ScrollView } from 'react-native';
 

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
     <TouchableOpacity style={styles.buttonNew} >
      <Text style={styles.buttonTextNew}>New +</Text>
    </TouchableOpacity>
<View style={{ flexDirection: "row", marginBottom: 10}}>
<TouchableOpacity style={styles.buttonDue} >
      <Text style={styles.buttonTextDue}>Junior Power Platform Developer </Text>
    </TouchableOpacity>
    <TouchableOpacity style={styles.buttonAcc} >
      <Text style={styles.buttonTextAcc}>Junior Power Platform Developer</Text>
    </TouchableOpacity>
    <TouchableOpacity style={styles.buttonAcc} >
      <Text style={styles.buttonTextAcc}>Junior Power Platform Developer</Text>
    </TouchableOpacity>
</View>



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
      <View style={styles.row}>
        <View style={styles.cell}>
         <Text style = {{fontWeight: 'bold'}}>Rate</Text>
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
         <Text style = {{fontWeight: 'bold'}}>Available Days</Text>
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
          <Text style = {{fontWeight: 'bold'}}>Available Times</Text>
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
     <TouchableOpacity style={styles.buttonplus} >
      <Text style={styles.buttonTextplus}>+</Text>
    </TouchableOpacity>


     <View style={styles.container}>
      <View style={styles.row}>
        <View style={styles.cell}>
          <Text style = {{fontWeight: 'bold'}}>Question 1</Text>
        </View>
        <View style={[styles.cell, { flex: 5 }]}>
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
  <Picker.Item label="5%" value="" />
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
        <View style={styles.cell}>
          <Text style = {{fontWeight: 'bold'}}>Question 2</Text>
        </View>
        <View style={[styles.cell, { flex: 5 }]}>
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
  <Picker.Item label="20%" value="" />
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
        <View style={styles.cell}>
         <Text style = {{fontWeight: 'bold'}}>Question 3</Text>
        </View>
        <View style={[styles.cell, { flex: 5 }]}>
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
  <Picker.Item label="20%" value="" />
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
        <View style={styles.cell}>
         <Text style = {{fontWeight: 'bold'}}>Question 4</Text>
        </View>
        <View style={[styles.cell, { flex: 5 }]}>
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
        <View style={styles.cell}>
          <Text style = {{fontWeight: 'bold'}}>Question 5</Text>
        </View>
        <View style={[styles.cell, { flex: 5 }]}>
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
  <Picker.Item label="20%" value="" />
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
        <View style={styles.cell}>
          <Text style = {{fontWeight: 'bold'}}>Question 6</Text>
        </View>
        <View style={[styles.cell, { flex: 5 }]}>
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
  <Picker.Item label="25%" value="" />
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