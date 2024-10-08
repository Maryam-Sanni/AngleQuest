import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, ScrollView, Picker } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTranslation } from 'react-i18next';

const ProfileUpdate = () => {
  const [profileImage, setProfileImage] = useState(null);
  const [aboutMe, setAboutMe] = useState('');
  const [technicalSkills, setTechnicalSkills] = useState(['']); 
  const [certifications, setCertifications] = useState(['']);
  const [location, setLocation] = useState('');
  const [role, setRole] = useState('');
  const [specialization, setSpecialization] = useState('');
  const [yearsOfExperience, setYearsOfExperience] = useState('');

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
          setProfileImage(reader.result); // Set image URL as base64 string
        };
        reader.readAsDataURL(file); // Read file as base64
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

      // Prepare data for API request
      const data = {
        about: aboutMe,
        skills: technicalSkills,
        certifications: certifications,
        location: location,
        category: specialization, // Use specialization as string
        specialization: role,
        years_experience: yearsOfExperience
      };

      const response = await axios.post(`${apiUrl}/api/expert/update-profile`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 200) {
        console.log('Save Days Response:', response.data);
        alert('Your Profile has been successfully saved.');
      } else {
        alert('Failed to save. Please try again.');
      }
    } catch (error) {
      console.error('Save Error:', error);
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
            'Authorization': `Bearer ${token}`, // Include the token
            'Content-Type': 'application/json',
          },
        });

        const data = await response.json();

        if (data.status === 'success' && data.profile) {
          setAboutMe(data.profile.about);
          setLocation(data.profile.location);
          setRole(data.profile.specialization);
          setSpecialization(data.profile.category);
          setYearsOfExperience(data.profile.years_experience);
        }
      } catch (error) {
        console.error('Error fetching balance:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);
  
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={{ flexGrow: 1, maxHeight: 500 ,}}>
      <Text style={styles.title}>Personal Profile</Text>

      {/* Profile Image */}
      <View style={styles.field}>
        <TouchableOpacity onPress={handleImageUpload} style={styles.imageUploadButton}>
          {profileImage ? (
            <Image source={{ uri: profileImage }} style={styles.profileImage} />
          ) : (
            <Text style={styles.uploadText}>Click to Upload Image</Text>
          )}
        </TouchableOpacity>
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
            style={styles.picker}
            onValueChange={(itemValue) => setSpecialization(itemValue)}
          >
            <Picker.Item label={t('SAP')} value="SAP" />
            <Picker.Item label={t('Microsoft')} value="Microsoft" />
            <Picker.Item label={t('Scrum')} value="Scrum" />
            <Picker.Item label={t('Business Analysis')} value="Business Analysis" />
          </Picker>
        </View>

        {/* Role */}
        <View style={styles.field}>
          <Text style={styles.label}>Specialization</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your role"
            placeholderTextColor={'grey'}
            value={role}
            onChangeText={setRole}
          />
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
          keyboardType="numeric"
        />
      </View>

        {/* Technical Skills */}
        <View style={styles.field}>
          <Text style={styles.label}>Technical Skills</Text>
          {technicalSkills.map((skill, index) => (
            <View key={index} style={styles.inputGroup}>
              <TextInput
                style={styles.input}
                placeholder="Enter a skill"
                placeholderTextColor={'grey'}
                value={skill}
                onChangeText={(value) => handleSkillChange(value, index)}
              />
              {technicalSkills.length > 1 && (
                <TouchableOpacity onPress={() => handleRemoveSkill(index)} style={styles.removeButton}>
                  <Text style={styles.removeButtonText}>remove</Text>
                </TouchableOpacity>
              )}
            </View>
          ))}
            
          <TouchableOpacity onPress={handleAddSkill} style={styles.addButton}>
            <Text style={styles.addButtonText}>Add Skill</Text>
          </TouchableOpacity>
        </View>

        {/* Certifications */}
        <View style={styles.field}>
          <Text style={styles.label}>Certifications</Text>
          {certifications.map((cert, index) => (
            <View key={index} style={styles.inputGroup}>
              <TextInput
                style={styles.input}
                placeholder="Enter a certification"
                placeholderTextColor={'grey'}
                value={cert}
                onChangeText={(value) => handleCertificationChange(value, index)}
              />
              {certifications.length > 1 && (
                <TouchableOpacity onPress={() => handleRemoveCertification(index)} style={styles.removeButton}>
                  <Text style={styles.removeButtonText}>remove</Text>
                </TouchableOpacity>
              )}
            </View>
          ))}
          <TouchableOpacity onPress={handleAddCertification} style={styles.addButton}>
            <Text style={styles.addButtonText}>Add Certification</Text>
          </TouchableOpacity>
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
    marginLeft: 10
  },
  addButtonText: {
    color: 'green',
    fontSize: 16,
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
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 18,
  },
  picker: {
    height: 50,
    width: '100%',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
  },
});

export default ProfileUpdate;
