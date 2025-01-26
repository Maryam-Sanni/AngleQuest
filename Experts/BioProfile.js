import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, ScrollView, Picker, CheckBox, FlatList } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTranslation } from 'react-i18next';
import MultiSelect from 'react-native-multiple-select';
import personImage from '../assets/person.png';


const specializationRoles = {
  'Select a Category': ['No category selected'],
  'Business Analysis': ['Business Analysis'],
  SAP: ['SAP FI', 'SAP MM', 'SAP SD', 'SAP PP'],
  Scrum: ['Scrum'],
  Microsoft: ['Dynamics Sales', 'Dynamics Customer Service', 'Dynamics Field Service', 'Dynamics CRM Developer', 'Business Central', 'Power Platform Developer', 'Dynamics F&O'],
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

const ProfileUpdate = ({ onDone }) => {
  const [profileImage, setProfileImage] = useState(null);
  const [aboutMe, setAboutMe] = useState('');
  const [technicalSkills, setTechnicalSkills] = useState(['']); 
  const [certifications, setCertifications] = useState(['']);
  const [location, setLocation] = useState('');
  const [loading, setLoading] = useState('');
  const [role, setRole] = useState('');
  const [yearsOfExperience, setYearsOfExperience] = useState('');
  const [specialization, setSpecialization] = useState('SAP');
  const [selectedRoles, setSelectedRoles] = useState([]);
   const [selectedCountry, setSelectedCountry] = useState('');
  const [isSelectVisible, setSelectVisible] = useState(false);
  const [currentSelectedRoles, setCurrentSelectedRoles] = useState(() => {
    // Check if selectedRoles is defined and has a property 'SAP'
    return selectedRoles && selectedRoles['SAP'] ? selectedRoles['SAP'] : []; // Fallback to empty array
  });
   

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

       // Check if all fields are filled
    
    if (!specialization) {
      alert('Category (specialization) is missing.');
      return;
    }

    if (!yearsOfExperience) {
      alert('Years of experience is missing.');
      return;
    }

    if (!currentSelectedRoles || currentSelectedRoles.length === 0) {
      alert('Please select at least one role.');
      return;
    }

    if (!aboutMe) {
      alert('About me section is missing.');
      return;
    }

    if (!profileImage) {
      alert('Profile image is missing.');
      return;
    }

      // Save data to AsyncStorage
      await AsyncStorage.setItem('location', selectedCountry);
      await AsyncStorage.setItem('category', specialization);
      await AsyncStorage.setItem('yearsOfExperience', yearsOfExperience.toString());

      // Save roles as a JSON string since AsyncStorage stores strings only
      await AsyncStorage.setItem('currentSelectedRoles', JSON.stringify(currentSelectedRoles));

      // Convert profile image to base64 and save to AsyncStorage if it's not already a base64 string
      if (profileImage && typeof profileImage === 'string') {
        // Save profileImage as base64 directly in AsyncStorage
        await AsyncStorage.setItem('profileImage', profileImage);
      } else if (profileImage) {
        // If profileImage is a Blob, convert it to base64 first
        const blob = await fetch(profileImage).then(res => res.blob());
        const reader = new FileReader();
        reader.readAsDataURL(blob); // Converts Blob to base64
        reader.onloadend = async () => {
          const base64data = reader.result;
          await AsyncStorage.setItem('profileImage', base64data); // Save base64 string in AsyncStorage
        };
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

      formData.append('location', String(selectedCountry));
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
        alert('Failed to save. Please check that all fields are filled.');
      }
    } catch (error) {
      console.error('Save Error:', error.response ? error.response.data : error);
      alert('Failed to save. Please check that all fields are filled.');
    }
    onDone();
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
          setAboutMe(data.profile.about || ' ');
          setLocation(selectedCountry || ' ');
          setProfileImage(data.profile.image_url || 'default');
          setSelectedRoles(data.profile.specialization?.length > 0 ? data.profile.specialization : ['No roles selected']);
          setSpecialization(data.profile.category || 'No specialization');
          setYearsOfExperience(data.profile.years_experience || ' ');
        }
      } catch (error) {
        console.error('Error fetching profile:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const countries = [
    { label: ' ', value: ' ' },
    { label: 'Afghanistan', value: 'AF' },
    { label: 'Albania', value: 'AL' },
    { label: 'Algeria', value: 'DZ' },
    { label: 'Andorra', value: 'AD' },
    { label: 'Angola', value: 'AO' },
    { label: 'Antigua and Barbuda', value: 'AG' },
    { label: 'Argentina', value: 'AR' },
    { label: 'Armenia', value: 'AM' },
    { label: 'Australia', value: 'AU' },
    { label: 'Austria', value: 'AT' },
    { label: 'Azerbaijan', value: 'AZ' },
    { label: 'Bahamas', value: 'BS' },
    { label: 'Bahrain', value: 'BH' },
    { label: 'Bangladesh', value: 'BD' },
    { label: 'Barbados', value: 'BB' },
    { label: 'Belarus', value: 'BY' },
    { label: 'Belgium', value: 'BE' },
    { label: 'Belize', value: 'BZ' },
    { label: 'Benin', value: 'BJ' },
    { label: 'Bhutan', value: 'BT' },
    { label: 'Bolivia', value: 'BO' },
    { label: 'Bosnia and Herzegovina', value: 'BA' },
    { label: 'Botswana', value: 'BW' },
    { label: 'Brazil', value: 'BR' },
    { label: 'Brunei Darussalam', value: 'BN' },
    { label: 'Bulgaria', value: 'BG' },
    { label: 'Burkina Faso', value: 'BF' },
    { label: 'Burundi', value: 'BI' },
    { label: 'Cabo Verde', value: 'CV' },
    { label: 'Cambodia', value: 'KH' },
    { label: 'Cameroon', value: 'CM' },
    { label: 'Canada', value: 'CA' },
    { label: 'Central African Republic', value: 'CF' },
    { label: 'Chad', value: 'TD' },
    { label: 'Chile', value: 'CL' },
    { label: 'China', value: 'CN' },
    { label: 'Colombia', value: 'CO' },
    { label: 'Comoros', value: 'KM' },
    { label: 'Congo (Congo-Brazzaville)', value: 'CG' },
    { label: 'Congo (Democratic Republic)', value: 'CD' },
    { label: 'Costa Rica', value: 'CR' },
    { label: 'Croatia', value: 'HR' },
    { label: 'Cuba', value: 'CU' },
    { label: 'Cyprus', value: 'CY' },
    { label: 'Czechia (Czech Republic)', value: 'CZ' },
    { label: 'Denmark', value: 'DK' },
    { label: 'Djibouti', value: 'DJ' },
    { label: 'Dominica', value: 'DM' },
    { label: 'Dominican Republic', value: 'DO' },
    { label: 'Ecuador', value: 'EC' },
    { label: 'Egypt', value: 'EG' },
    { label: 'El Salvador', value: 'SV' },
    { label: 'Equatorial Guinea', value: 'GQ' },
    { label: 'Eritrea', value: 'ER' },
    { label: 'Estonia', value: 'EE' },
    { label: 'Eswatini (fmr. "Swaziland")', value: 'SZ' },
    { label: 'Ethiopia', value: 'ET' },
    { label: 'Fiji', value: 'FJ' },
    { label: 'Finland', value: 'FI' },
    { label: 'France', value: 'FR' },
    { label: 'Gabon', value: 'GA' },
    { label: 'Gambia', value: 'GM' },
    { label: 'Georgia', value: 'GE' },
    { label: 'Germany', value: 'DE' },
    { label: 'Ghana', value: 'GH' },
    { label: 'Greece', value: 'GR' },
    { label: 'Grenada', value: 'GD' },
    { label: 'Guatemala', value: 'GT' },
    { label: 'Guinea', value: 'GN' },
    { label: 'Guinea-Bissau', value: 'GW' },
    { label: 'Guyana', value: 'GY' },
    { label: 'Haiti', value: 'HT' },
    { label: 'Honduras', value: 'HN' },
    { label: 'Hungary', value: 'HU' },
    { label: 'Iceland', value: 'IS' },
    { label: 'India', value: 'IN' },
    { label: 'Indonesia', value: 'ID' },
    { label: 'Iran', value: 'IR' },
    { label: 'Iraq', value: 'IQ' },
    { label: 'Ireland', value: 'IE' },
    { label: 'Israel', value: 'IL' },
    { label: 'Italy', value: 'IT' },
    { label: 'Jamaica', value: 'JM' },
    { label: 'Japan', value: 'JP' },
    { label: 'Jordan', value: 'JO' },
    { label: 'Kazakhstan', value: 'KZ' },
    { label: 'Kenya', value: 'KE' },
    { label: 'Kiribati', value: 'KI' },
    { label: 'Korea, North', value: 'KP' },
    { label: 'Korea, South', value: 'KR' },
    { label: 'Kuwait', value: 'KW' },
    { label: 'Kyrgyzstan', value: 'KG' },
    { label: 'Laos', value: 'LA' },
    { label: 'Latvia', value: 'LV' },
    { label: 'Lebanon', value: 'LB' },
    { label: 'Lesotho', value: 'LS' },
    { label: 'Liberia', value: 'LR' },
    { label: 'Libya', value: 'LY' },
    { label: 'Liechtenstein', value: 'LI' },
    { label: 'Lithuania', value: 'LT' },
    { label: 'Luxembourg', value: 'LU' },
    { label: 'Madagascar', value: 'MG' },
    { label: 'Malawi', value: 'MW' },
    { label: 'Malaysia', value: 'MY' },
    { label: 'Maldives', value: 'MV' },
    { label: 'Mali', value: 'ML' },
    { label: 'Malta', value: 'MT' },
    { label: 'Marshall Islands', value: 'MH' },
    { label: 'Mauritania', value: 'MR' },
    { label: 'Mauritius', value: 'MU' },
    { label: 'Mexico', value: 'MX' },
    { label: 'Micronesia', value: 'FM' },
    { label: 'Moldova', value: 'MD' },
    { label: 'Monaco', value: 'MC' },
    { label: 'Mongolia', value: 'MN' },
    { label: 'Montenegro', value: 'ME' },
    { label: 'Morocco', value: 'MA' },
    { label: 'Mozambique', value: 'MZ' },
    { label: 'Myanmar', value: 'MM' },
    { label: 'Namibia', value: 'NA' },
    { label: 'Nauru', value: 'NR' },
    { label: 'Nepal', value: 'NP' },
    { label: 'Netherlands', value: 'NL' },
    { label: 'New Zealand', value: 'NZ' },
    { label: 'Nicaragua', value: 'NI' },
    { label: 'Niger', value: 'NE' },
    { label: 'Nigeria', value: 'NG' },
    { label: 'North Macedonia', value: 'MK' },
    { label: 'Norway', value: 'NO' },
    { label: 'Oman', value: 'OM' },
    { label: 'Pakistan', value: 'PK' },
    { label: 'Palau', value: 'PW' },
    { label: 'Panama', value: 'PA' },
    { label: 'Papua New Guinea', value: 'PG' },
    { label: 'Paraguay', value: 'PY' },
    { label: 'Peru', value: 'PE' },
    { label: 'Philippines', value: 'PH' },
    { label: 'Poland', value: 'PL' },
    { label: 'Portugal', value: 'PT' },
    { label: 'Qatar', value: 'QA' },
    { label: 'Romania', value: 'RO' },
    { label: 'Russia', value: 'RU' },
    { label: 'Rwanda', value: 'RW' },
    { label: 'Saint Kitts and Nevis', value: 'KN' },
    { label: 'Saint Lucia', value: 'LC' },
    { label: 'Saint Vincent and the Grenadines', value: 'VC' },
    { label: 'Samoa', value: 'WS' },
    { label: 'San Marino', value: 'SM' },
    { label: 'Sao Tome and Principe', value: 'ST' },
    { label: 'Saudi Arabia', value: 'SA' },
    { label: 'Senegal', value: 'SN' },
    { label: 'Serbia', value: 'RS' },
    { label: 'Seychelles', value: 'SC' },
    { label: 'Sierra Leone', value: 'SL' },
    { label: 'Singapore', value: 'SG' },
    { label: 'Slovakia', value: 'SK' },
    { label: 'Slovenia', value: 'SI' },
    { label: 'Solomon Islands', value: 'SB' },
    { label: 'Somalia', value: 'SO' },
    { label: 'South Africa', value: 'ZA' },
    { label: 'South Sudan', value: 'SS' },
    { label: 'Spain', value: 'ES' },
    { label: 'Sri Lanka', value: 'LK' },
    { label: 'Sudan', value: 'SD' },
    { label: 'Suriname', value: 'SR' },
    { label: 'Sweden', value: 'SE' },
    { label: 'Switzerland', value: 'CH' },
    { label: 'Syria', value: 'SY' },
    { label: 'Taiwan', value: 'TW' },
    { label: 'Tajikistan', value: 'TJ' },
    { label: 'Tanzania', value: 'TZ' },
    { label: 'Thailand', value: 'TH' },
    { label: 'Timor-Leste', value: 'TL' },
    { label: 'Togo', value: 'TG' },
    { label: 'Tonga', value: 'TO' },
    { label: 'Trinidad and Tobago', value: 'TT' },
    { label: 'Tunisia', value: 'TN' },
    { label: 'Turkey', value: 'TR' },
    { label: 'Turkmenistan', value: 'TM' },
    { label: 'Tuvalu', value: 'TV' },
    { label: 'Uganda', value: 'UG' },
    { label: 'Ukraine', value: 'UA' },
    { label: 'United Arab Emirates', value: 'AE' },
    { label: 'United Kingdom', value: 'GB' },
    { label: 'United States', value: 'US' },
    { label: 'Uruguay', value: 'UY' },
    { label: 'Uzbekistan', value: 'UZ' },
    { label: 'Vanuatu', value: 'VU' },
    { label: 'Vatican City', value: 'VA' },
    { label: 'Venezuela', value: 'VE' },
    { label: 'Vietnam', value: 'VN' },
    { label: 'Yemen', value: 'YE' },
    { label: 'Zambia', value: 'ZM' },
    { label: 'Zimbabwe', value: 'ZW' }
  ];

  
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={{maxHeight: 500}}>

        <Text style={styles.title}>My Profile</Text>
         <Text style={styles.description}>
          Provide your personal information, let us know you...
         </Text>
        
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
        <Text style={{fontSize: 12, marginBottom: 30, marginTop: -15, marginLeft: 20}}>Required*</Text>

      {/* About Me */}
      <View style={styles.field}>
        <Text style={styles.label}>About Me*</Text>
        <TextInput
          style={styles.input}
          placeholder="Write something about yourself"
          placeholderTextColor={'grey'}
          multiline
          value={aboutMe}
          onChangeText={setAboutMe}
        />
      </View>

      {/* Specialization */}
        <View style={styles.field}>
          <Text style={styles.label}>Category*</Text>
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
          <Text style={styles.label}>Specialization*</Text>

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
        <Text style={styles.label}>Years of Experience*</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your years of experience"
          placeholderTextColor="grey"
          value={yearsOfExperience}
          keyboardType="numeric" 
          onChangeText={(text) => {
            const numericValue = text.replace(/[^0-9]/g, '');
            setYearsOfExperience(numericValue);
          }}
        />
      </View>

       


        {/* Location */}
        <View style={styles.field}>
          <Text style={styles.label}>Location*</Text>
          <Picker
            selectedValue={selectedCountry}
            style={styles.picker}
            onValueChange={(itemValue) => setSelectedCountry(itemValue)}
          >
            {countries.map((country) => (
              <Picker.Item key={country.value} label={country.label} value={country.value} />
            ))}
          </Picker>
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
    height: "100%",
    backgroundColor: '#fff',
    marginLeft: 150, marginRight: 150
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 30,
    width: 800,
    alignSelf: 'center'
  },
  field: {
    marginBottom: 20,
    marginRight: 20
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
    backgroundColor: '#4caf50',
    padding: 12,
    borderRadius: 5,
    alignItems: 'center',
    width: 150
  },
  submitButtonText: {
    color: '#fff',
  },
  picker: {
    height: 40,
    maxHeight: 100,
    width: '100%',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 5,
    overflow: 'hidden',
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