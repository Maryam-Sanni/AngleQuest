import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Image, ScrollView, Picker} from 'react-native';
import { useNavigation } from '@react-navigation/native';

function MyComponent({ onClose }) {
  const navigation = useNavigation();

  const goToPlans = () => {
    // Navigate to ExpertsProfile screen when the button is clicked
    navigation.navigate('My Growth Plans');
    onClose(); // Close the modal
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#F8F8F8", alignItems: 'center', marginTop: 40}}>
         <ScrollView contentContainerStyle={{ flexGrow: 1, maxHeight: 500 }}>
<View style={styles.greenBox}>
<TouchableOpacity onPress={onClose}>
            <Text style={{ fontSize: 18, color:'grey', marginLeft: 850,fontWeight: 'bold', marginTop: -20}}>
                            ✕
                        </Text>
                        </TouchableOpacity>
                        <Text style={{ fontSize: 15, color: 'black', fontWeight: '500', marginTop: 20, marginLeft: 50 }}>Personal Development Objectives</Text>
<View style={styles.container}>
<View style={styles.row}>
        <View style={styles.cell}>
          <Text>Type</Text>
        </View>
        <View style={styles.cell}>
        <Picker
  style={styles.picker} 
>
  <Picker.Item label="Pick an option" value="" />
  <Picker.Item label="Personal" value="Personal" />
  <Picker.Item label="Team" value="Team" />
  <Picker.Item label="Organization" value="Organization" />
</Picker>
        </View>
      </View>
      <View style={styles.row}>
        <View style={styles.cell}>
          <Text>Title</Text>
        </View>
        <View style={styles.cell}>
           <TextInput
            placeholder="Become SAP FI Medior expert in 6 months"
            placeholderTextColor="grey"
            style={styles.input}
          />
        </View>
      </View>
      <View style={styles.row}>
        <View style={styles.cell}>
          <Text>Role</Text>
        </View>
        <View style={styles.cell}>
           <TextInput
            placeholder="SAP FI"
            placeholderTextColor="grey"
            style={styles.input}
          />
        </View>
      </View>
      <View style={styles.row}>
        <View style={styles.cell}>
          <Text>Result description</Text>
        </View>
        <View style={styles.cell}>
        <TextInput
            placeholder="Example: To be able to find my way around SAP fi..."
            placeholderTextColor="grey"
            style={styles.input}
          />
        </View>
      </View>
      <View style={styles.row}>
        <View style={styles.cell}>
          <Text>How to achieve</Text>
        </View>
        <View style={styles.cell}>
        <TextInput
            placeholder="Example: To be taught how to troubleshoot, find T'codes..."
            placeholderTextColor="grey"
            style={styles.input}
          />
        </View>
      </View>
      <View style={styles.row}>
        <View style={styles.cell}>
          <Text>What do you need to achieve the objective</Text>
        </View>
        <View style={styles.cell}>
          <TextInput
            placeholder="Continous training, practice and support"
            placeholderTextColor="grey"
            style={styles.input}
          />
        </View>
      </View>
      <View style={styles.row}>
        <View style={styles.cell}>
          <Text>Progress/Level</Text>
        </View>
        <View style={styles.cell}>
         <TextInput
            placeholder="Starter"
            placeholderTextColor="grey"
            style={styles.input}
          />
        </View>
      </View>
      <View style={styles.row}>
        <View style={styles.cell}>
          <Text>Start Date</Text>
        </View>
        <View style={styles.cell}>
        <TextInput
            placeholder="1/April/2024"
            placeholderTextColor="grey"
            style={styles.input}
          />
        </View>
      </View>
      <View style={styles.row}>
        <View style={styles.cell}>
          <Text>End Date</Text>
        </View>
        <View style={styles.cell}>
        <TextInput
            placeholder="20/Jul/2024"
            placeholderTextColor="grey"
            style={styles.input}
          />
        </View>
      </View>
      <View style={styles.row}>
        <View style={styles.cell}>
          <Text>Status</Text>
        </View>
        <View style={styles.cell}>
        <Text style={{ color: 'grey' }}>Review/Replan/Active/Completed</Text>
        </View>
      </View>
      <View style={styles.row}>
        <View style={styles.cell}>
          <Text>Coach</Text>
        </View>
        <View style={styles.cell}>
        <Text style={{ color: 'grey' }}>Joop Melcher</Text>
        </View>
      </View>
      <View style={styles.row}>
        <View style={styles.cell}>
          <Text>Feedbacks/remarks (from Coach)</Text>
        </View>
        <View style={styles.cell}><Text style={{ color: 'grey' }}>Read only field Jobseeker</Text>
        </View>
      </View>
      
    </View>
    <TouchableOpacity onPress={goToPlans} style={styles.buttonplus} >
      <Text style={styles.buttonTextplus}>Create</Text>
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
        marginTop: 20, 
        marginLeft: 50 
      },
  greenBox: {
    width: 920,
    height:550,
    backgroundColor: '#F8F8F8',
    marginTop: 40
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
    borderColor: 'black',
    borderWidth: 1, 
    color:'grey',
    fontSize: 14
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
  input: {
    outline: 'black',
    borderColor: 'black',
    borderWidth: 1
  },
});

export default MyComponent;