import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, ScrollView, Picker, CheckBox, FlatList } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTranslation } from 'react-i18next';
import MultiSelect from 'react-native-multiple-select';


const specializationRoles = {
  SAP: ['SAP FI', 'SAP MM', 'SAP SD'],
  Microsoft: ['Dynamics Sales', 'Dynamics Customer Service', 'Dynamics Field Service', 'Dynamics CRM Developer', 'Business Central', 'Power Platform Developer'],
  Scrum: ['Scrum'],
  'Business Analysis': ['Business Analysis'],
};

const CustomMultiSelect = ({ items, selectedItems, onSelectedItemsChange }) => {
  const toggleSelection = (id) => {
    if (selectedItems.includes(id)) {
      onSelectedItemsChange(selectedItems.filter(item => item !== id));
    } else {
      onSelectedItemsChange([...selectedItems, id]);
    }
  };

  return (
<View style={styles.container2}>
      <FlatList
        data={items}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.checkboxContainer}>
            <CheckBox
              value={selectedItems.includes(item.id)}
              onValueChange={() => toggleSelection(item.id)}
              tintColors={{ true: 'green', false: 'gray' }} // Checkbox colors: green when checked, gray when unchecked
              style={styles.checkbox} // Optional styles for the checkbox
            />
            <Text style={selectedItems.includes(item.id) ? styles.selectedText : styles.unselectedText}>
              {item.name}
            </Text>
          </View>
        )}
      />
    </View>
  );
};

const ProfileUpdate = () => {
  const [profileImage, setProfileImage] = useState(null);
  const [aboutMe, setAboutMe] = useState('');
  const [technicalSkills, setTechnicalSkills] = useState(['']); 
  const [certifications, setCertifications] = useState(['']);
  const [location, setLocation] = useState('');
  const [loading, setLoading] = useState('');
  const [role, setRole] = useState('');
  const [yearsOfExperience, setYearsOfExperience] = useState('');
  const [specialization, setSpecialization] = useState(' ');
  const [selectedRoles, setSelectedRoles] = useState([]);
  const [isSelectVisible, setSelectVisible] = useState(false);
  const [currentSelectedRoles, setCurrentSelectedRoles] = useState(selectedRoles); 

  // Effect to clear selected roles when specialization changes
  useEffect(() => {
    setCurrentSelectedRoles([]); // Clear roles
  }, [specialization]);

  // Function to handle click on the input box
  const handleInputClick = () => {
    setSelectVisible(prevState => !prevState); // Toggle visibility
  };

  // Update the selected roles and close the select when a change happens
  const handleSelectedItemsChange = (items) => {
    setCurrentSelectedRoles(items);
    onSelectedItemsChange(items); // Call the parent function to update
    setSelectVisible(false); // Close the select after selection
  };



  const { t } = useTranslation();
  
   const apiUrl = process.env.REACT_APP_API_URL;
  
  const handleImageUpload = async () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';

    input.onchange = (event) => {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = () => {
          setProfileImage(reader.result); // Set base64 image
        };
        reader.readAsDataURL(file); // Read file as base64 string
      }
    };

    input.click(); // Trigger the file picker dialog
  };

  
  const handleSaveall = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      if (!token) {
        alert('Token not found. Please sign in again.');
        return;
      }

      // Save data to AsyncStorage
      await AsyncStorage.setItem('location', location);
      await AsyncStorage.setItem('category', specialization);
      await AsyncStorage.setItem('yearsOfExperience', yearsOfExperience.toString());

      // Save roles as a JSON string since AsyncStorage stores strings only
      await AsyncStorage.setItem('currentSelectedRoles', JSON.stringify(currentSelectedRoles));

      // Save the profile image
      if (profileImage && typeof profileImage === 'string') {
        await AsyncStorage.setItem('profileImage', profileImage);  // Assuming this is base64, save it as is
      } else {
        alert('Please upload a valid image.');
        return;
      }

      // Create a new FormData object
      const formData = new FormData();
      formData.append('about', aboutMe);

      // Convert base64 to Blob if profileImage is a base64 string
      if (profileImage && typeof profileImage === 'string') {
        const blob = await fetch(profileImage).then(res => res.blob());
        formData.append('image', blob, 'profileImage.jpg');
      }

      formData.append('location', location);
      formData.append('category', specialization);

      currentSelectedRoles.forEach((role, index) => {
        formData.append(`specialization[${index}]`, role);
      });

      formData.append('years_experience', yearsOfExperience);

      // Send the request using axios
      const response = await axios.post(`${apiUrl}/api/expert/update-profile`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 200) {
        console.log('Save Response:', response.data);
        alert('Your Profile has been successfully saved.');
      } else {
        alert('Failed to save. Please try again.');
      }
    } catch (error) {
      console.error('Save Error:', error.response ? error.response.data : error);
      alert('Failed to save. Please try again.');
    }
  };




  const handleAddSkill = () => {
    setTechnicalSkills([...technicalSkills, '']);
  };

  const handleRemoveSkill = (index) => {
    const newSkills = technicalSkills.filter((_, idx) => idx !== index);
    setTechnicalSkills(newSkills);
  };

  const handleSkillChange = (value, index) => {
    const newSkills = technicalSkills.map((skill, idx) => (idx === index ? value : skill));
    setTechnicalSkills(newSkills);
  };

  const handleAddCertification = () => {
    setCertifications([...certifications, '']);
  };

  const handleRemoveCertification = (index) => {
    const newCertifications = certifications.filter((_, idx) => idx !== index);
    setCertifications(newCertifications);
  };

  const handleCertificationChange = (value, index) => {
    const newCertifications = certifications.map((cert, idx) => (idx === index ? value : cert));
    setCertifications(newCertifications);
  };
  
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        // Retrieve token from AsyncStorage
        const token = await AsyncStorage.getItem('token');
        if (!token) {
          throw new Error('No token found');
        }

        // Make API request with token in headers
        const response = await fetch(`${apiUrl}/api/expert/get-expert-profile`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`, // Include the token
            'Content-Type': 'application/json',
          },
        });

        const data = await response.json();

        if (data.status === 'success' && data.profile) {
          // Provide alternatives if certain fields are null or undefined
          setAboutMe(data.profile.about || 'No description available');
          setLocation(data.profile.location || 'Location not specified');
          setProfileImage(data.profile.image_url || 'default');
          setSelectedRoles(data.profile.specialization?.length > 0 ? data.profile.specialization : ['No roles selected']);
          setSpecialization(data.profile.category || 'No specialization');
          setYearsOfExperience(data.profile.years_experience || 'No experience specified');
        }
      } catch (error) {
        console.error('Error fetching profile:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={{ flexGrow: 1, maxHeight: 500, paddingLeft: 20}}>

      {/* Profile Image */}
        <View style={styles.field}>
          <TouchableOpacity onPress={handleImageUpload} style={styles.imageUploadButton}>
            {profileImage && profileImage !== 'default' ? (
              <Image source={{ uri: profileImage }} style={styles.profileImage} />
            ) : (
              <View style={styles.defaultImageContainer}>
                <Image 
                  source={{ uri: 'https://img.icons8.com/?size=100&id=lgyS725ZKMwY&format=png&color=000000' }} 
                  style={styles.defaultImage}
                />
                <Text style={styles.uploadText}>Upload Photo</Text>
              </View>
            )}
          </TouchableOpacity>

          {profileImage && profileImage !== 'default' && (
            <TouchableOpacity onPress={() => setProfileImage('default')} style={styles.removeButton}>
              <Text style={styles.removeButtonText}>Remove Photo</Text>
            </TouchableOpacity>
          )}
        </View>


      {/* About Me */}
      <View style={styles.field}>
        <Text style={styles.label}>About Me</Text>
        <TextInput
          style={styles.input}
          placeholder="Tell us about yourself"
          placeholderTextColor={'grey'}
          multiline
          value={aboutMe}
          onChangeText={setAboutMe}
        />
      </View>

      {/* Specialization */}
        <View style={styles.field}>
          <Text style={styles.label}>Category</Text>
          <Picker
            selectedValue={specialization}
            value={specialization}
            style={styles.picker}
            onValueChange={(itemValue) => setSpecialization(itemValue)}
          >
            {Object.keys(specializationRoles).map((spec) => (
              <Picker.Item key={spec} label={spec} value={spec} />
            ))}
          </Picker>
        </View>

        {/* Role Selection */}
        <View style={styles.field}>
          <Text style={styles.label}>Specialization</Text>

          {/* Clickable TextInput */}
          <TouchableOpacity onPress={handleInputClick} style={styles.inputContainer}>
            <TextInput
              style={styles.input2}
              value={
                currentSelectedRoles.length > 0
                  ? currentSelectedRoles.join(', ')
                  : selectedRoles.length > 0
                  ? selectedRoles
                  : 'Select specialization...'}
              editable={false} // Make it non-editable
            />
         
            <Image
              source={{ uri: 'https://img.icons8.com/?size=100&id=39942&format=png&color=000000' }} // Use the provided icon link
              style={styles.arrowIcon}
            />
          </TouchableOpacity>
          
          {/* Conditionally render CustomMultiSelect */}
          {isSelectVisible && specialization && specializationRoles[specialization] && (
            <CustomMultiSelect
              items={specializationRoles[specialization].map((role) => ({ id: role, name: role }))}
              selectedItems={currentSelectedRoles}
              onSelectedItemsChange={handleSelectedItemsChange} // Update selected roles
            />
          )}
        </View>


      
        
      {/* Years of Experience */}
      <View style={styles.field}>
        <Text style={styles.label}>Years of Experience</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your years of experience"
          placeholderTextColor={'grey'}
          value={yearsOfExperience}
          onChangeText={setYearsOfExperience}
        />
      </View>

       


        {/* Location */}
        <View style={styles.field}>
          <Text style={styles.label}>Location</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your location"
            placeholderTextColor={'grey'}
            value={location}
            onChangeText={setLocation}
          />
        </View>
        
      {/* Submit Button */}
      <TouchableOpacity onPress={handleSaveall} style={styles.submitButton}>
        <Text style={styles.submitButtonText}>Update Profile</Text>
      </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  field: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    marginLeft: 5
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    fontSize: 16,
    backgroundColor: '#f9f9f9',
  },
  imageUploadButton: {
  width: 100,
    height: 100, 
    borderRadius: 50, 
    borderWidth: 1,
    borderColor: '#CCC',
    alignSelf: 'flex-start',
    backgroundColor: '#f9f9f9',
    marginBottom: 20
  },
  profileImage: {
    width: 100,
    height: 100, 
    borderRadius: 50, 
    borderWidth: 1,
    borderColor: '#CCC',
    alignSelf: 'flex-start'
  },
  uploadText: {
    color: '#666',
    fontSize: 12,
    marginTop: 40, 
    marginLeft: 10,
    textAlign: 'center'
  },
  addButtonText: {
    color: 'green',
    fontSize: 14,
    marginLeft: 10
  },
  removeButton: {
    marginTop: 10,
    alignSelf: 'flex-end',
  },
  removeButtonText: {
    color: 'grey',
    fontSize: 16,
    marginTop: -10
  },
  submitButton: {
    backgroundColor: 'coral',
    paddingVertical: 15,
    alignItems: 'center',
    borderRadius: 5,
    width: 200
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 18,
  },
  picker: {
    height: 40,
    width: '100%',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 5
  },
  multiSelect: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    padding: 10,
  },
  container2: {
    backgroundColor: '#F5F5F5', // Background color of the FlatList
    borderColor: '#ccc', // Border color
    borderWidth: 1, 
    borderBottomRadius: 5,
    padding: 5,
  },
  checkboxContainer: {
    flexDirection: 'row', // Align checkbox and text in a row
    alignItems: 'center', // Center them vertically
    marginVertical: 5, 
    marginTop: 7,
    marginLeft: 10
  },
  checkbox: {
    color: 'green', 
    backgroundColor: 'green'
  },
  selectedText: {
    color: 'green', // Text color for selected items
    marginLeft: 10
  },
  unselectedText: {
    color: 'black', // Default text color
    marginLeft: 10
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
  },
  input2: {
    flex: 1,
    fontSize: 16,
    paddingRight: 30, // Add padding to prevent text overlapping with the arrow
  },
  arrowIcon: {
    width: 10, // Set the desired width
    height: 10, // Set the desired height
    marginLeft: 10, // Space between input and icon
  },
});

export default ProfileUpdate;
