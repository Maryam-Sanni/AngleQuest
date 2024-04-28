import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, ScrollView, StyleSheet, Modal } from 'react-native';
import DateTimePickerModal from "../components/DateTimePickerExpertsModal";
import { useNavigation } from '@react-navigation/native';
import Top from '../components/top';

function MyComponent() {
    const navigation = useNavigation();
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedTimeRanges, setSelectedTimeRanges] = useState([]);
  const [selectedServices, setSelectedServices] = useState([]);

  const handleConfirm = (timeRanges) => {
    setSelectedTimeRanges(timeRanges);
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
   
  const toggleService = (service) => {
    if (selectedServices.includes(service)) {
      setSelectedServices(selectedServices.filter(item => item !== service));
    } else {
      setSelectedServices([...selectedServices, service]);
    }
  };
    
  const [profileImage, setProfileImage] = useState(null);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [state, setState] = useState('');
  const [country, setCountry] = useState('');
  const [dob, setDob] = useState('');
  const [gender, setGender] = useState('Male'); 
  const [about, setAbout] = useState('');
  const [degree, setDegree] = useState('');
  const [university, setUniversity] = useState('');
  const [degreeFrom, setDegreeFrom] = useState('');
  const [degreeTo, setDegreeTo] = useState('');
  const [company, setCompany] = useState('');
  const [positionHeld, setPositionHeld] = useState('');
  const [companyFrom, setCompanyFrom] = useState('');
  const [companyTo, setCompanyTo] = useState('');

  const [isRoleModalVisible, setIsRoleModalVisible] = useState(false);
  const [isCountryModalVisible, setIsCountryModalVisible] = useState(false);
  const [roles, setRoles] = useState(['Microsoft Power Platform']);
  const [countries, setCountries] = useState(['United States', 'Germany']);
  const [roleInputValue, setRoleInputValue] = useState('');
  const [countryInputValue, setCountryInputValue] = useState('');
  const [selectedRole, setSelectedRole] = useState(null);
  const [selectedCountry, setSelectedCountry] = useState(null);

  const handleAddRole = () => {
    setIsRoleModalVisible(true);
  };

  const handleAddCountry = () => {
    setIsCountryModalVisible(true);
  };

  const handleSaveRole = () => {
    if (roleInputValue.trim() !== '') {
      setRoles([...roles, roleInputValue.trim()]);
      setRoleInputValue('');
    }
    setIsRoleModalVisible(false);
  };

  const handleSaveCountry = () => {
    if (countryInputValue.trim() !== '') {
      setCountries([...countries, countryInputValue.trim()]);
      setCountryInputValue('');
    }
    setIsCountryModalVisible(false);
  };

  const handleSelectRole = (role) => {
    setSelectedRole(role);
  };

  const handleSelectCountry = (country) => {
    setSelectedCountry(country);
  };

  const handleRemoveRole = () => {
    if (selectedRole !== null) {
      const newRoles = roles.filter(role => role !== selectedRole);
      setRoles(newRoles);
      setSelectedRole(null);
    }
  };

  const handleRemoveCountry = () => {
    if (selectedCountry !== null) {
      const newCountries = countries.filter(country => country !== selectedCountry);
      setCountries(newCountries);
      setSelectedCountry(null);
    }
  };

  const handleSaveAndContinue = () => {
    // Implement your save logic here
    // For example, you can save roles and countries to a database
    console.log("Roles:", roles);
    console.log("Countries:", countries);
  };



  const handleChooseImage = (event) => {
    const selectedImage = event.target.files[0];
    const imageUrl = URL.createObjectURL(selectedImage);
    setProfileImage(imageUrl);
  };

const handleSaveEducation = () => {
    console.log('About:', about);
    console.log('Degree:', degree);
    console.log('University:', university);
    console.log('Degree From:', degreeFrom);
    console.log('Degree To:', degreeTo);
  };

const handleSaveEmployment = () => {
    console.log('Company:', company);
    console.log('Position Held:', positionHeld);
    console.log('Company From:', companyFrom);
    console.log('Company To:', companyTo);
  };

  const handleSaveContinue = () => {
    // Here you can use the collected data as needed
    console.log('Collected Data:');
    console.log('First Name:', firstName);
    console.log('Last Name:', lastName);
    console.log('State:', state);
    console.log('Country:', country);
    console.log('Date of Birth:', dob);
    console.log('Gender:', gender);
    console.log('Profile Picture:', profileImage);
   
    
  
    // Navigate to the VerifyEmail page
    navigation.navigate('Verify mail');
  };

  return (
    <View style={{ height: '28%' }}>
      <Top/ >
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
      <View style={{flex: 1 }}>
          <View style={{ flexDirection: 'row', marginTop: 20, marginBottom: 20, alignItems: 'center', justifyContent: 'center'}}>
            <View style={{
              width: 30,
              height: 30,
              borderRadius: 40,
              backgroundColor: 'coral',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold' }}>1</Text>
            </View>
            <View style={{ width: 60, height: 2, backgroundColor: '#FFEBCC', marginTop: 4, marginLeft: 5 }} />
            <View style={{
              width: 30,
              height: 30,
              borderRadius: 40,
              backgroundColor: '#FFEBCC',
              alignItems: 'center',
              justifyContent: 'center',
              marginLeft: 5,
            }}>
              <Text style={{ color: 'white', fontSize: 16 }}>2</Text>
            </View>
            <View style={{ width: 60, height: 2, backgroundColor: '#FFEBCC', marginTop: 4, marginLeft: 5 }} />
            <View style={{
              width: 30,
              height: 30,
              borderRadius: 40,
              backgroundColor: '#FFEBCC',
              alignItems: 'center',
              justifyContent: 'center',
              marginLeft: 5,
            }}>
              <Text style={{ color: 'white', fontSize: 16 }}>3</Text>    
           </View>
           </View>
          <Text style={{ fontSize: 16, fontWeight: 'bold', marginBottom: 2, marginTop: 10, color: 'black' }}>Basic Details</Text>
        

        <Text style={{ color: 'black', fontWeight: '500', marginTop: 15 }}>First Name</Text>
        <TextInput
          style={{
            borderWidth: 1,
            borderRadius: 5,
            borderColor: '#206C00',
            padding: 10,
            width: '100%',
            marginTop: 5,
            placeholderTextColor: 'black'
          }}
          placeholder='Enter your First Name'
          value={firstName}
          onChangeText={setFirstName}
        />
        <Text style={{ fontWeight: '500', color: 'black', marginTop: 15 }}>Last Name</Text>
        <TextInput
          style={{
            borderWidth: 1,
            borderColor: '#206C00',
            borderRadius: 5,
            padding: 10,
            width: '100%',
            marginTop: 5,
            placeholderTextColor: 'black'
          }}
          placeholder='Enter your Last Name'
          value={lastName}
          onChangeText={setLastName}
        />
        <Text style={{ fontWeight: '500', marginTop: 15, color: 'black' }}>State or Province</Text>
        <TextInput
          style={{
            borderWidth: 1,
            borderColor: '#206C00',
            borderRadius: 5,
            padding: 10,
            width: '100%',
            marginTop: 5,
            placeholderTextColor: 'grey'
          }}
          placeholder="Enter your State or Province"
          value={state}
          onChangeText={setState}
        />
        <Text style={{ fontWeight: '500', marginTop: 15, color: 'black' }}>Country</Text>
        <TextInput
          style={{
            borderWidth: 1,
            borderColor: '#206C00',
            borderRadius: 5,
            padding: 10,
            width: '100%',
            marginTop: 5,
            placeholderTextColor: 'grey'
          }}
          placeholder="Enter your Country"
          value={country}
          onChangeText={setCountry}
        />
        <Text style={{ fontWeight: '500', marginTop: 15, color: 'black' }}>Date of Birth</Text>
        <TextInput
          style={{
            borderWidth: 1,
            borderColor: '#206C00',
            borderRadius: 5,
            padding: 10,
            width: '100%',
            marginTop: 5,
            placeholderTextColor: 'grey'
          }}
          placeholder="Enter your Date of Birth (DD/MM/YYYY)"
          value={dob}
          onChangeText={setDob}
        />
        <Text style={{ marginTop: 15, color: 'black', fontWeight: '500' }}>Gender</Text>
        <select
          value={gender}
          onChange={(e) => setGender(e.target.value)}
          style={{ height: 40, width: '100%', borderColor: '#206C00', borderRadius: 5, marginTop: 5 }}
        >
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>
        {/* Upload Profile Picture */}
        <Text style={{ fontWeight: '500', marginTop: 15, color: 'black' }}>Upload Profile Picture</Text>
        <input
          type="file"
          accept="image/*"
          onChange={handleChooseImage}
          style={{ marginTop: 5 }}
        />
        {profileImage && (
          <Image source={{ uri: profileImage }} style={{ width: 50, height: 50 }} />
        )}
          <View style={{  marginTop: 20 }}>
                <TouchableOpacity onPress={() => setIsModalVisible(true)}>
                    <View style={{ justifyContent: "center", alignItems: "flex-start", padding: 5, borderRadius: 5, backgroundColor: "#A2BE95", marginBottom: 10, marginRight: -70 }}>
                      <Text style={{ fontSize: 14, color: "white", fontWeight: 'bold', marginBottom: 10, marginLeft: 5, marginTop: 10 }}>Pick a schedule</Text>
                      <View style={{ flexDirection: "row", alignItems: "center", marginLeft: 5 }}>
                        {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day, index) => (
                          <View key={index} style={{ justifyContent: "center", alignItems: "center", padding: 5, borderRadius: 5, borderColor: "white", borderWidth: 1, marginRight: 5, marginBottom: 5 }}>
                            <Text style={{ color: "white" }}>{day}</Text>
                          </View>
                        ))}
                      </View>
                      <View style={{ marginTop: 10, flexDirection: "row", justifyContent: "space-between" }}>
                        <View style={{ flexDirection: "row", alignItems: "center", marginLeft: 5}}>
                          <Text style={{ fontSize: 12, color: "white", marginRight: 5 }}>From:</Text>
                          <Text style={{ fontSize: 10, color: "green", borderColor: '#CEF1BF', backgroundColor: '#CEF1BF', paddingHorizontal: 15, paddingVertical: 5, borderWidth: 1, borderRadius: 5, marginRight: 5 }}>07:30</Text>
                        </View>
                        <Text style={{ fontSize: 10, color: "green", borderColor: '#CEF1BF', backgroundColor: '#CEF1BF', paddingHorizontal: 8, paddingVertical: 5, borderWidth: 1, borderRadius: 5, marginRight: 5  }}>am</Text>
                        <Text style={{ fontSize: 10, color: "green", borderColor: '#CEF1BF', backgroundColor: '#CEF1BF', paddingHorizontal: 5, paddingVertical: 5, borderWidth: 1, borderRadius: 5, marginRight: 5  }}>^</Text>
                        <Text style={{ fontSize: 12, color: "white", marginLeft: 25, marginRight: 5, marginTop: 5 }}>To:</Text>
                        <Text style={{ fontSize: 10, color: "green", borderColor: '#CEF1BF', backgroundColor: '#CEF1BF', paddingHorizontal: 15, paddingVertical: 5, borderWidth: 1, borderRadius: 5, marginRight: 5  }}>07:30</Text>
                        <Text style={{ fontSize: 10, color: "green", borderColor: '#CEF1BF', backgroundColor: '#CEF1BF', paddingHorizontal: 8, paddingVertical: 5, borderWidth: 1, borderRadius: 5, marginRight: 5 }}>am</Text>
                        <Text style={{ fontSize: 10, color: "green", borderColor: '#CEF1BF', backgroundColor: '#CEF1BF', paddingHorizontal: 5, paddingVertical: 5, borderWidth: 1, borderRadius: 5, marginRight: 5  }}>^</Text>
                      </View>
        
                      {selectedTimeRanges.length > 0 && (
  <View style={styles.availableContainer}>
    <Text style={styles.availableText}>Available:</Text>
    {selectedTimeRanges.map((timeRange, index) => (
      <Text key={index} style={styles.availableTime}>
        {timeRange.day}: {timeRange.startTime} - {timeRange.endTime}
      </Text>
    ))}
  </View>
)}

                      <View style={{ justifyContent: "center", alignItems: "center", padding: 25, marginLeft: 155, marginTop: -25 }}>
                        
                      </View>
                    </View>
                    
                  </TouchableOpacity>
                  </View>
         
          <View style={{ flexDirection: "row", alignItems: "center" }}>
           <View style={{ flex: 1 }}>
            <Text style={{ fontSize: 14, color: "black", fontWeight: 'bold', marginTop: 20, marginBottom: 10 }}>Service Rendered</Text>
            {["Career Advice", "Interview Sessions"].map((service, index) => (
            <View key={index} style={{ flexDirection: "row", alignItems: "center", marginBottom: 10 }}>
                <TouchableOpacity onPress={() => toggleService(service)} style={{ height: 15, width: 15, borderRadius: 10, borderWidth: 1, borderColor: "#4A5568", marginRight: 5, backgroundColor: selectedServices.includes(service) ? "#A2BE95" : "transparent" }} />
                <Text>{service}</Text>
              </View>
            ))}
          </View>
           
      {/* Rate Component */}
      <View>
        <Text style={{ fontSize: 14, fontWeight: "500", color: "black" }}>
          Rate ($)
        </Text>
      </View>
      <TextInput
          style={{
            borderWidth: 1,
            borderColor: '#206C00',
            borderRadius: 3,
            padding: 2,
            width: '10%',
            marginLeft: 5,
            placeholderTextColor: "green",
          }}
          keyboardType="numeric"
          placeholder="0.00"
           />
           <View style={{ alignSelf: "center", fontSize: 16, marginLeft: 5, marginRight: 15, fontWeight: "normal", lineHeight: 28 }}>
        /hr
        </View>
     </View>
      <Text style={{ marginTop: 10, fontSize: 14, fontWeight: 'bold', color: 'black' }}>About</Text>
              <View style={{ marginTop: 3.5, padding: 6, paddingTop: 8, paddingBottom: 100, backgroundColor: '#F4F4F4', borderRadius: 5 }}>
                <TextInput
                  style={{ padding: 6, marginTop: 2.5, fontSize: 12, fontWeight: 'normal', color: '#6B7280', borderWidth: 1, outline: 'none', borderColor: '#F4F4F4', borderRadius: 5 }}
                  placeholder="Type here"
                  value={about}
                  onChangeText={setAbout}
                />
              </View>
     
    <View style={{ flexDirection: 'row', flex: 1, justifyContent: 'space-between', marginTop: 30 }}>
                <Text style={{ fontSize: 16, fontWeight: 'bold', color: 'black', marginLeft: 10 }}>Education</Text>
                <Text style={{ fontSize: 12, fontWeight: 'normal', color: '#206C00', marginRight: 20 }}>+ Add Another Education</Text>
              </View>
              <View style={{ padding: 10, marginTop: 10, borderRadius: 5, backgroundColor: 'white' }}>
                <Text style={{ fontSize: 14, fontWeight: '600', color: 'black' }}>Degree</Text>
                <TextInput
                  style={{ padding: 10, marginTop: 5, fontWeight: 'normal', color: 'grey', borderWidth: 1, borderColor: '#206C00', borderRadius: 5 }}
                  placeholder="Enter Degree"
                  value={degree}
                  onChangeText={setDegree}
                />
                <Text style={{ fontSize: 14, fontWeight: '600', color: 'black', marginTop: 20 }}>College/University</Text>
                <TextInput
                  style={{ padding: 10, marginTop: 5, fontWeight: 'normal', color: 'grey', borderWidth: 1, borderColor: '#206C00', borderRadius: 5 }}
                  placeholder="Enter College or University"
                  value={university}
                  onChangeText={setUniversity}
                />
                  <Text style={{ fontSize: 14, fontWeight: '600', color: 'black', marginTop: 20 }}>Graduation Year</Text>
                  <TextInput
                    style={{ padding: 10, marginTop:5, fontWeight: 'normal', color: 'grey', borderWidth: 1, borderColor: '#206C00', borderRadius: 5 }}
                    placeholder="DD/MM/YYYY"
                    value={degreeFrom}
                    onChangeText={setDegreeFrom}
                  />
                 
                <TouchableOpacity
                  style={{ marginRight: 400, alignItems: 'center', marginTop: 20, padding: 10, backgroundColor: 'coral', borderRadius: 5 }}
                  onPress={handleSaveEducation}
                >
                  <Text style={{ fontSize: 12, fontWeight: 'bold', color: 'white' }}>Save</Text>
                </TouchableOpacity>
              </View>
           
           <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text style={{ marginTop:30, fontSize: 16, fontWeight: 'bold', color: 'black', marginLeft: 10 }}>Work Experience</Text>
                <Text style={{ fontSize: 12, fontWeight: 'normal', color: '#206C00', marginRight: 20, marginTop:30 }}>+ Add Another Employment</Text>
              </View>
              <View style={{ padding: 8, marginTop: 15, borderRadius: 5, backgroundColor: 'white' }}>
                <Text style={{ fontSize: 14, fontWeight: '500', color: 'black' }}>Company Name</Text>
                <TextInput
                  style={{ padding: 10, marginTop: 5,  fontWeight: 'normal', color: '#6B7280', borderWidth: 1, borderColor: '#206C00', borderRadius: 5 }}
                  placeholder="Enter Company Name"
                  value={company}
                  onChangeText={setCompany}
                />
                <Text style={{ fontSize: 14, fontWeight: '500', color: 'black', marginTop: 20 }}>Position Held</Text>
                <TextInput
                  style={{ padding: 10, marginTop: 5,  fontWeight: 'normal', color: '#6B7280', borderWidth: 1, borderColor: '#206C00', borderRadius: 5 }}
                  placeholder="Enter Position Held"
                  value={positionHeld}
                  onChangeText={setPositionHeld}
                />
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 }}>
                  <Text style={{ fontSize: 14, fontWeight: '500', color: 'black' }}>From</Text>
                  <Text style={{ fontSize: 14, fontWeight: '500', color: 'black', marginRight: 200 }}>To</Text>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 5 }}>
                  <TextInput
                    style={{ padding: 6, flex: 1, marginRight: 5, fontWeight: 'normal', color: '#6B7280', borderWidth: 1, borderColor: '#206C00', borderRadius: 5 }}
                    placeholder="DD/MM/YYYY"
                    value={companyFrom}
                    onChangeText={setCompanyFrom}
                  />
                  <TextInput
                    style={{ padding: 10, flex: 1, marginLeft: 25, fontWeight: 'normal', color: '#6B7280', borderWidth: 1, borderColor: '#206C00', borderRadius: 5 }}
                    placeholder="DD/MM/YYYY"
                    value={companyTo}
                    onChangeText={setCompanyTo}
                  />
                </View>
                <TouchableOpacity
                  style={{  alignItems: 'center', marginTop: 20, padding: 10, marginRight: 400, backgroundColor: 'coral', borderRadius: 5 }}
                  onPress={handleSaveEmployment}
                >
                  <Text style={{ fontSize: 12, fontWeight: 'bold', color: 'white' }}>Save</Text>
                </TouchableOpacity>
              </View>
              
      </View>
     
     
      <View style={styles.pageContainer}>
      <View style={styles.container}>
        <View style={styles.headingContainer}>
        </View>
        <View style={styles.subheading}>
          <Text style={styles.subheading}>Add Preferred Roles</Text>
          <Text>Add a maximum of 5 job roles you are proficient at</Text>
          <View style={styles.rolesContainer}>
            {roles.map((role, index) => (
              <TouchableOpacity
                key={index}
                style={styles.roleContainer}
                onPress={() => handleSelectRole(role)}
              >
                <Text style={[styles.role, selectedRole === role && styles.selected]}>{role}</Text>
              </TouchableOpacity>
            ))}
            {selectedRole &&
              <TouchableOpacity
                style={styles.removeButton}
                onPress={handleRemoveRole}
              >
                <Text style={styles.buttonText}>-</Text>
              </TouchableOpacity>
            }
            <Text style={styles.role} onPress={handleAddRole}>+</Text>
          </View>
          <View style={styles.infoContainer}>
            <Text style={styles.infoIcon}>?</Text>
            <Text style={styles.infoText}>Get recommended to Jobseekers searching for these roles </Text>
          </View>
        </View>
        <View style={styles.section}>
          <Text style={styles.subheading2}>Add Preferred Countries</Text>
          <Text>Add a maximum of 5 countries you are available to work</Text>
          <View style={styles.countriesContainer}>
            {countries.map((country, index) => (
              <TouchableOpacity
                key={index}
                style={styles.countryContainer}
                onPress={() => handleSelectCountry(country)}
              >
                <Text style={[styles.country, selectedCountry === country && styles.selected]}>{country}</Text>
              </TouchableOpacity>
            ))}
            {selectedCountry &&
              <TouchableOpacity
                style={styles.removeButton}
                onPress={handleRemoveCountry}
              >
                <Text style={styles.buttonText}>-</Text>
              </TouchableOpacity>
            }
            <Text style={styles.newCountry} onPress={handleAddCountry}>+</Text>
          </View>
          <View style={styles.infoContainer}>
            <Text style={styles.infoIcon}>?</Text>
            <Text style={styles.infoText}>See Jobseekers from these countries that match your proficiency</Text>
          </View>
        </View>
      </View>

      <Modal visible={isRoleModalVisible} animationType="slide">
        <View style={styles.modalContainer}>
          <TextInput
            style={styles.input}
            placeholder="Enter role"
            value={roleInputValue}
            onChangeText={(text) => setRoleInputValue(text)}
          />
          <TouchableOpacity style={styles.addButton} onPress={handleSaveRole}>
            <Text style={styles.buttonText}>Add</Text>
          </TouchableOpacity>
        </View>
      </Modal>

      <Modal visible={isCountryModalVisible} animationType="slide">
        <View style={styles.modalContainer}>
          <TextInput
            style={styles.input}
            placeholder="Enter country"
            value={countryInputValue}
            onChangeText={(text) => setCountryInputValue(text)}
          />
          <TouchableOpacity style={styles.addButton} onPress={handleSaveCountry}>
            <Text style={styles.buttonText}>Add</Text>
          </TouchableOpacity>
        </View>
      </Modal>

      <TouchableOpacity style={styles.saveAndContinueButton} onPress={handleSaveAndContinue}>
        <Text style={styles.saveAndContinueButtonText}>Save</Text>
      </TouchableOpacity>
    </View>
  
   <TouchableOpacity
        style={{
          backgroundColor: 'coral',
          alignItems: 'center',
          borderRadius: 10,
          paddingVertical: 10,
          paddingHorizontal: 20,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          elevation: 5,
          marginTop: 40,
          marginBottom: 40
        }}
        onPress={handleSaveContinue}
      >
        <Text style={{ fontSize: 14, fontWeight: 'bold', color: 'white', TextAlign: 'center' }}>Save & Continue</Text>
      </TouchableOpacity>

    </View>
    </ScrollView>
    <DateTimePickerModal
        isVisible={isModalVisible}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  pageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
  
  },
  headingContainer: {

  },
  subheading: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    marginTop: 10
  },
  subheading2: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    marginTop: 40
  },
  rolesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 15,
  },
  roleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 10,
    marginBottom: 5,
  },
  role: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    backgroundColor: '#d3f9d8',
    color: '#206C00',
    borderRadius: 50
  },
  selected: {
    borderWidth: 1,
    borderColor: '#206C00',
  },
  countriesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 15,
  },
  countryContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 10,
    marginBottom: 5,
  },
  country: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    backgroundColor: '#d3f9d8',
    color: '#206C00',
    borderRadius: 50,
  },
  newCountry: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    backgroundColor: '#d3f9d8',
    color: '#206C00',
    borderRadius: 50,
    marginRight: 10,
  },
  removeButton: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    backgroundColor: '#d3f9d8',
    color: '#206C00',
    borderRadius: 50,
    marginLeft: 5,
    marginRight: 10
  },
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
    marginBottom: 5
  },
  infoIcon: {
    fontSize: 14,
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: '#d3f9d8',
    borderRadius: 30,
  },
  infoText: {
    flex: 1,
    marginLeft: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white'
  },
  input: {
    width: '80%',
    backgroundColor: 'white',
    padding: 10,
    marginBottom: 20,
    borderRadius: 5,
  },
  addButton: {
    backgroundColor: 'coral',
    borderRadius: 5,
    padding: 10,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  saveAndContinueButton: {
    marginRight: 400,
     alignItems: 'center',
      marginTop: 10, 
      padding: 10,
       backgroundColor: 'coral',
        borderRadius: 5,
  },
  saveAndContinueButtonText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  availableContainer: {
  marginTop: 10,
    marginLeft: 10, // Adjust the margin according to your preference
  },
  availableText: {
    color: '#FFFFFF', // White color
  },
  availableTime: {
    color: '#FFFFFF', // White color
  },
});

export default MyComponent;