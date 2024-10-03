import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, ScrollView } from 'react-native';

const ProfileUpdate = () => {
  const [profileImage, setProfileImage] = useState(null);
  const [aboutMe, setAboutMe] = useState('');
  const [technicalSkills, setTechnicalSkills] = useState('');
  const [certifications, setCertifications] = useState('');
  const [location, setLocation] = useState('');
  const [role, setRole] = useState('');
  const [specialization, setSpecialization] = useState('');
  const [yearsOfExperience, setYearsOfExperience] = useState('');

  // This function can handle image uploads
  const handleImageUpload = () => {
    // Add logic to upload image and update state
    console.log('Upload image');
  };

  const handleSubmit = () => {
    const updatedProfile = {
      profileImage,
      aboutMe,
      technicalSkills,
      certifications,
      location,
      role,
      specialization,
      yearsOfExperience,
    };
    console.log('Profile Updated:', updatedProfile);
    // Add logic to submit updated profile to the backend
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={{ flexGrow: 1, maxHeight: 500 ,}}>
      <Text style={styles.title}>Update Your Profile</Text>

      {/* Profile Image */}
      <View style={styles.field}>
        <Text style={styles.label}>Profile Image</Text>
        <TouchableOpacity onPress={handleImageUpload} style={styles.imageUploadButton}>
          {profileImage ? (
            <Image source={{ uri: profileImage }} style={styles.profileImage} />
          ) : (
            <Text style={styles.uploadText}>Upload Image</Text>
          )}
        </TouchableOpacity>
      </View>

      {/* About Me */}
      <View style={styles.field}>
        <Text style={styles.label}>About Me</Text>
        <TextInput
          style={styles.input}
          placeholder="Tell us about yourself"
          multiline
          value={aboutMe}
          onChangeText={setAboutMe}
        />
      </View>

      {/* Technical Skills */}
      <View style={styles.field}>
        <Text style={styles.label}>Technical Skills</Text>
        <TextInput
          style={styles.input}
          placeholder="List your technical skills"
          value={technicalSkills}
          onChangeText={setTechnicalSkills}
        />
      </View>

      {/* Certifications */}
      <View style={styles.field}>
        <Text style={styles.label}>Certifications</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your certifications"
          value={certifications}
          onChangeText={setCertifications}
        />
      </View>

      {/* Location */}
      <View style={styles.field}>
        <Text style={styles.label}>Location</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your location"
          value={location}
          onChangeText={setLocation}
        />
      </View>

      {/* Role */}
      <View style={styles.field}>
        <Text style={styles.label}>Role</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your role"
          value={role}
          onChangeText={setRole}
        />
      </View>

      {/* Specialization */}
      <View style={styles.field}>
        <Text style={styles.label}>Specialization</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your specialization"
          value={specialization}
          onChangeText={setSpecialization}
        />
      </View>

      {/* Years of Experience */}
      <View style={styles.field}>
        <Text style={styles.label}>Years of Experience</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your years of experience"
          value={yearsOfExperience}
          onChangeText={setYearsOfExperience}
          keyboardType="numeric"
        />
      </View>

      {/* Submit Button */}
      <TouchableOpacity onPress={handleSubmit} style={styles.submitButton}>
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
    alignItems: 'center',
    justifyContent: 'center',
    height: 100,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    backgroundColor: '#f9f9f9',
  },
  profileImage: {
    width: '100%',
    height: '100%',
    borderRadius: 5,
  },
  uploadText: {
    color: '#666',
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
});

export default ProfileUpdate;
