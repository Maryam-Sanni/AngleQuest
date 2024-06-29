import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Image, ScrollView, Picker} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import DateTimePickerModal from "../components/DateTimePickerModal";


function MyComponent({ onClose }) {
  const navigation = useNavigation();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedDateTime, setSelectedDateTime] = useState(null);

  const handleConfirmDateTime = (dateTime) => {
    setSelectedDateTime(dateTime);
    setIsModalVisible(false);
  };

  const handleCancelModal = () => {
    setIsModalVisible(false);
  };


  const goToPlans = () => {
    // Navigate to ExpertsProfile screen when the button is clicked
    navigation.navigate('Advice Offer');
    onClose(); // Close the modal
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#F8F8F8", alignItems: 'center', marginTop: 40}}>
         <ScrollView contentContainerStyle={{ flexGrow: 1, maxHeight: 500 }}>
<View style={styles.greenBox}>
<View style={styles.header}>
          <Image
            source={{ uri: 'https://cdn.builder.io/api/v1/image/assets/TEMP/1f2d38e99b0016f2bd167d2cfd38ff0d43c9f94a93c84b4e04a02d32658fb401?apiKey=7b9918e68d9b487793009b3aea5b1a32&' }} // replace with your logo URL
            style={styles.logo}
          />
          <Text style={styles.headerText}>Create New Advice Objective</Text>
       
        <TouchableOpacity onPress={onClose} style={styles.closeButton}>
          <Text style={{ fontSize: 18, color: '#3F5637', fontWeight: 'bold'}}>
            ✕
          </Text>
        </TouchableOpacity>
        </View> 

<View style={styles.container}>
<View style={styles.row}>
        <View style={styles.cell}>
          <Text>Type</Text>
        </View>
        <View style={styles.cell}>
        <Picker
  style={styles.picker} 
>
  <Picker.Item label="Career Change" value="Career Change" />
  <Picker.Item label="Getting a raise" value="Getting a raise" />
  <Picker.Item label="Visibility at work" value="Visibility at work" />
</Picker>
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
          <Text>Describe the challenge you are seeking advice for in few words</Text>
        </View>
        <View style={styles.cell}>
        <TextInput
            placeholder="I want to change from a data analyst to a SAP FI consultant"
            placeholderTextColor="grey"
            multiline
            style={[styles.input, { height: 100 }]}
          />
        </View>
      </View>
      <View style={styles.row}>
        <View style={styles.cell}>
          <Text>Starting Level</Text>
        </View>
        <View style={styles.cell}>
        <Picker
  style={styles.picker} 
>
  <Picker.Item label="Beginner" value="" />
  <Picker.Item label="Junior" value="Junior" />
  <Picker.Item label="Medior" value="Medior" />
  <Picker.Item label="Senior" value="Senior" />
  <Picker.Item label="Professional" value="Professional" />
</Picker>
        </View>
      </View>
      <View style={styles.row}>
        <View style={styles.cell}>
          <Text>Target Level</Text>
        </View>
        <View style={styles.cell}>
        <Picker
  style={styles.picker} 
>
  <Picker.Item label="Beginner" value="" />
  <Picker.Item label="Junior" value="Junior" />
  <Picker.Item label="Medior" value="Medior" />
  <Picker.Item label="Senior" value="Senior" />
  <Picker.Item label="Professional" value="Professional" />
</Picker>
        </View>
      </View>
      <View style={styles.row}>
        <View style={styles.cell}>
          <Text>Status</Text>
        </View>
        <View style={styles.cell}>
           <Picker
  style={styles.picker} 
>
  <Picker.Item label="Active" value="" />
  <Picker.Item label="Review" value="Review" />
  <Picker.Item label="Replan" value="Replan" />
  <Picker.Item label="Completed" value="Completed" />
</Picker>
        </View>
      </View>
      <View style={styles.row}>
        <View style={styles.cell}>
          <Text>Expert</Text>
        </View>
        <View style={styles.cell}>
        <Text style={{ color: 'grey' }}>Joop Melcher</Text>
        </View>
      </View>
      <View style={styles.row}>
        <View style={styles.cell}>
          <Text>Expert available days</Text>
        </View>
        <View style={styles.cell}>
        <Text style={{ color: 'grey' }}>Mon, Tue, Wed and Thurs</Text>
        </View>
      </View>
      <View style={styles.row}>
        <View style={styles.cell}>
          <Text>Expert available time</Text>
        </View>
        <View style={styles.cell}><Text style={{ color: 'grey' }}>09:00AM-05:00PM</Text>
        </View>
      </View> 
      <View style={styles.row}>
        <View style={styles.cell}>
          <Text>Date and Time</Text>
        </View>
        <View style={styles.cell}>
        <TouchableOpacity onPress={() => setIsModalVisible(true)}>
        <Text style={{color: 'grey', borderWidth: 1, borderColor: 'black'}}>Selected date and time: {selectedDateTime}</Text>
        </TouchableOpacity>
        </View>
      </View>

    </View>
    <TouchableOpacity onPress={goToPlans} style={styles.buttonplus} >
      <Text style={styles.buttonTextplus}>Next</Text>
    </TouchableOpacity>
    </View>
    
<DateTimePickerModal
        isVisible={isModalVisible}
        onConfirm={handleConfirmDateTime}
        onCancel={handleCancelModal}
      />
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
    height: '100%',
    backgroundColor: '#F8F8F8',
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
    borderRadius: 5,
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