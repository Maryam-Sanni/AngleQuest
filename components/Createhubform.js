import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Picker } from 'react-native';

const CreateCoachingHubForm = () => {
  const [visibility, setVisibility] = useState('public');
  const [groupName, setGroupName] = useState('');
  const [addLeaders, setAddLeaders] = useState('');
  const [groupDescription, setGroupDescription] = useState('');
  const [searchMembers, setSearchMembers] = useState('');

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

  return (
    <View style={styles.pageContainer}>
      <View style={styles.formContainer}>
      <Text style={{ fontWeight: 600, color: 'black', }}>Visibility</Text>
        <Picker
          selectedValue={visibility}
          style={styles.input}
          onValueChange={(itemValue, itemIndex) =>
            setVisibility(itemValue)
          }>
          <Picker.Item label="Public" value="public" />
          <Picker.Item label="Private" value="private" />
        </Picker>
        <Text style={{ fontWeight: 600, color: 'black', marginTop: 10 }}>Group Name</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter group name"
          value={groupName}
          onChangeText={text => setGroupName(text)}
        />
        <Text style={{ fontWeight: 600, color: 'black', marginTop: 10 }}>Group Description</Text>
        <TextInput
          style={[styles.input, {height: 100}]}
          placeholder="Type here..."
          multiline
          value={groupDescription}
          onChangeText={text => setGroupDescription(text)}
        />
        <Text style={{ fontWeight: 600, color: 'black', marginTop: 10 }}>Group Goals (Optional) </Text>
        <TextInput
          style={styles.input}
          placeholder="Enter group goals"
          value={addLeaders}
          onChangeText={text => setAddLeaders(text)}
        />
       <Text style={{ fontWeight: 600, color: 'black', marginTop: 10 }}>Group Limit (Optional) </Text>
        <TextInput
          style={styles.input}
          placeholderTextColor="grey" // Set placeholder text color to grey
          placeholder="Enter group limit"
          keyboardType="numeric" // Set keyboardType to 'numeric' for number input
          value={searchMembers}
          onChangeText={text => setSearchMembers(text)}
        />
        <View style={styles.buttonContainer}>
          <Button title="Create Hub" onPress={handleSave} color="coral" />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  formContainer: {
    width: '60%',
  },
  input: {
    height: 40,
    borderColor: '#206c00',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginTop: 5
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
});

export default CreateCoachingHubForm;
