import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Picker, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const CreateCoachingHubForm = () => {
  const navigation = useNavigation();
  const [visibility, setVisibility] = useState('public');
  const [groupName, setGroupName] = useState('');
  const [addLeaders, setAddLeaders] = useState('');
  const [groupDescription, setGroupDescription] = useState('');
  const [searchMembers, setSearchMembers] = useState('');
  const [descriptionLength, setDescriptionLength] = useState(0);
  const maxDescriptionLength = 85; // Max character limit for description

  const handleXPress = () => {
    navigation.navigate('My Hubs'); // Navigate to 'JoinAs' page
  };

  const handleDescriptionChange = (text) => {
    if (text.length <= maxDescriptionLength) {
      setGroupDescription(text);
      setDescriptionLength(text.length);
    }
  };

  const handleSave = () => {
    // Handle saving the form data
    console.log("Form data:", {
      visibility,
      groupName,
      addLeaders,
      groupDescription,
      searchMembers
    });
  };

  const goTomanage = () => {
    // Navigate to ExpertsProfile screen when the button is clicked
    navigation.navigate('Manage Hubs');
  };

  const goTohubs = () => {
    // Navigate to ExpertsProfile screen when the button is clicked
    navigation.navigate('My Hubs');
  };

  return (
    <View style={styles.pageContainer}>
      <View style={styles.formContainer}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%' }}>
              <View style={{ flexDirection: "row", alignItems: "flex-start", paddingHorizontal: 10, marginTop: 20 }}>
              <TouchableOpacity onPress={goTohubs} >
                <Text style={{ fontWeight: "600", fontSize: 14, color: "#666", marginTop: 5, }}>All Hubs</Text>
                </TouchableOpacity >
                <TouchableOpacity onPress={goTomanage} >
                <Text style={{ fontSize: 14, marginLeft: 30, marginRight: 30, fontWeight: "600", color: '#666', marginTop: 5  }}>Manage Hubs</Text>
                </TouchableOpacity>
                <View style={{ justifyContent: "flex-end", paddingHorizontal: 15, paddingVertical: 5, borderRadius: 5, backgroundColor: "#d3f9d8", borderWidth: 1, borderColor: '#206C00' }}>
                <Text style={{ fontSize: 14, fontWeight: "bold", color: '#206C00', }}>Create New Hub</Text>
                </View>
              </View>
            </View>
        <Text style={{ fontWeight: 600, color: 'black', marginTop: 15 }}>Visibility*</Text>
        <Picker
          selectedValue={visibility}
          style={styles.input}
          onValueChange={(itemValue, itemIndex) =>
            setVisibility(itemValue)
          }> 
          <Picker.Item label="Public" value="public" />
          <Picker.Item label="Private" value="private" />
        </Picker>
        <Text style={{ fontWeight: 600, color: 'black', marginTop: 10 }}>Coaching Hub Name*</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter hub name"
          value={groupName}
          onChangeText={text => setGroupName(text)}
        />
        <Text style={{ fontWeight: 600, color: 'black', marginTop: 10 }}>Coaching Hub Description* ({maxDescriptionLength - descriptionLength} characters remaining)</Text>
        <TextInput
          style={[styles.input, { height: 70 }]}
          placeholder= "Type here..."
          multiline
          value={groupDescription}
          onChangeText={handleDescriptionChange}
        />
        <Text style={{ fontWeight: 600, color: 'black', marginTop: 10 }}>Meeting Day*</Text>
        <Picker
          selectedValue={visibility}
          style={styles.input}
          onValueChange={(itemValue, itemIndex) =>
            setVisibility(itemValue)
          }> 
          <Picker.Item label="Monday" value="Monday" />
          <Picker.Item label="Tuesday" value="Tuesday" />
          <Picker.Item label="Wednesday" value="Wednesday" />
          <Picker.Item label="Thursday" value="Thursday" />
          <Picker.Item label="Friday" value="Friday" />
          <Picker.Item label="Saturday" value="Saturday" />
          <Picker.Item label="Sunday" value="Sunday" />
        </Picker>
        <Text style={{ fontWeight: 600, color: 'black', marginTop: 10 }}>Meeting Time*</Text>
        <TextInput
          style={styles.input}
          placeholder="09:00AM - 19:00AM (GMT +1)"
          value={addLeaders}
          onChangeText={text => setAddLeaders(text)}
        />
        <Text style={{ fontWeight: 600, color: 'black', marginTop: 10 }}>Coaching Hub Fee*</Text>
        <TextInput
          style={styles.input}
          placeholder="$25"
          value={groupName}
          onChangeText={text => setGroupName(text)}
        />
        
        <TouchableOpacity
          style={{ backgroundColor: 'coral', padding: 10, borderRadius: 5, alignItems: 'center', marginLeft: 200, marginRight: 200, marginTop: 15 }}
          onPress={handleSave}
        >
          <Text style={{ color: 'white', fontWeight: 'bold' }}>Create New Hub</Text>
        </TouchableOpacity>
      </View>
      
    </View>
  );
};

const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
    alignItems: 'center',
  },
  scrollContainer: {
    flexGrow: 1,
    maxHeight: 500
  },
  formContainer: {
    width: '50%',
    paddingHorizontal: 20, // Add some horizontal padding for better layout
  },
  input: {
    height: 40,
    borderColor: '#206C00',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginTop: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
});

export default CreateCoachingHubForm;
