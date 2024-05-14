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
    <View style= {{flexDirection: 'row'}}>
    <Text style={{marginLeft: 50, fontWeight: '600', marginTop: 20}}>My Guide</Text>
     <TouchableOpacity style={styles.buttonplus} >
      <Text style={styles.buttonTextplus}>+</Text>
    </TouchableOpacity>
</View>

     <View style={styles.container}>
      <View style={styles.row}>
      <View style={[styles.cell, { flex: 2 }]}>
          <Text style = {{fontWeight: 'bold'}}>Guide 1</Text>
        </View>
        <View style={[styles.cell, { flex: 5 }]}>
           <TextInput
            placeholder="Plan around how to use tools to boost performance e.g, xrm toolbox"
            placeholderTextColor="grey"
            style={styles.input}
          />
        </View>
      </View>
      <View style={styles.row}>
      <View style={[styles.cell, { flex: 2 }]}>
          <Text style = {{fontWeight: 'bold'}}>Guide 2</Text>
        </View>
        <View style={[styles.cell, { flex: 5 }]}>
        <TextInput
            placeholder="How to incorporate app performance optimization"
            placeholderTextColor="grey"
            style={styles.input}
          />
        </View>
         </View>
      <View style={styles.row}>
      <View style={[styles.cell, { flex: 2 }]}>
         <Text style = {{fontWeight: 'bold'}}>Guide 3</Text>
        </View>
        <View style={[styles.cell, { flex: 5 }]}>
        <TextInput
            placeholder="How to be proactivee"
            placeholderTextColor="grey"
            style={styles.input}
          />
        </View>
      </View>
      <View style={styles.row}>
      <View style={[styles.cell, { flex: 2 }]}>
         <Text style = {{fontWeight: 'bold'}}>Guide 4</Text>
        </View>
        <View style={[styles.cell, { flex: 5 }]}>
          <TextInput
            placeholder="How to optimize power automate"
            placeholderTextColor="grey"
            style={styles.input}
          />
        </View>
      </View>
      <View style={styles.row}>
      <View style={[styles.cell, { flex: 2 }]}>
          <Text style = {{fontWeight: 'bold'}}>Guide 5</Text>
        </View>
        <View style={[styles.cell, { flex: 5 }]}>
         <TextInput
            placeholder="How to optimize AI builder bot"
            placeholderTextColor="grey"
            style={styles.input}
          />
        </View>
      </View>
     
      </View>
<TouchableOpacity style={styles.buttonsave} >
      <Text style={styles.buttonTextsave}>Save</Text>
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
    marginLeft: 635, 
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
  
});

export default MyComponent;