import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Modal } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation
import Top from '../components/top';

function MyComponent() {
  const navigation = useNavigation(); // Get the navigation object

  const [isRoleModalVisible, setIsRoleModalVisible] = useState(false);
  const [isCountryModalVisible, setIsCountryModalVisible] = useState(false);
  const [roles, setRoles] = useState(['Microsoft Azure']);
  const [countries, setCountries] = useState(['United Kingdom', 'Netherlands']);
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

    // Navigate to the "SocialsAndAddress" page
    navigation.navigate('SocialsAndAddress');
  };

  return (
    <View style={{ flex: 1 }}>
    <Top/ >
    <View style={styles.pageContainer}>
      <View style={styles.container}>
        <View style={styles.headingContainer}>
          <View style={{ flexDirection: 'row', marginTop: -20, marginBottom: 40, alignItems: 'center', justifyContent: 'center', }}>
            <View style={{
              width: 30,
              height: 30,
              borderRadius: 40,
              backgroundColor: '#FFEBCC',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <Text style={{ color: 'white', fontSize: 16 }}>1</Text>
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
              backgroundColor: 'coral',
              alignItems: 'center',
              justifyContent: 'center',
              marginLeft: 5,
            }}>
              <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold' }}>3</Text>
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
              <Text style={{ color: 'white', fontSize: 18 }}>4</Text>
            </View>
          </View>
          <Text style={[styles.heading, styles.coral]}>Roles & Countries</Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.subheading}>Add Preferred Roles</Text>
          <Text>Add a maximum of 5 job roles you are available for</Text>
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
            <Text style={styles.infoText}>Get recommended to Recruiters searching for your role and get notified when jobs are posted</Text>
          </View>
        </View>
        <View style={styles.section}>
          <Text style={styles.subheading}>Add Preferred Countries</Text>
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
            <Text style={styles.infoText}>See jobs posted from these countries that match your preferred job roles</Text>
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
        <Text style={styles.saveAndContinueButtonText}>Save & Continue</Text>
      </TouchableOpacity>
    </View>
    </View>
  );
}

const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white'
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  headingContainer: {
    alignItems: 'left',
    marginBottom: -40,
    marginTop: 20
  },
  heading: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'coral',
    marginBottom: 20
  },
  subheading: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    marginTop: 40
  },
  coral: {
    color: 'coral',
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
    backgroundColor: 'coral',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginBottom: 50,
  },
  saveAndContinueButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
    textAlign: 'center',
  },
});

export default MyComponent;
