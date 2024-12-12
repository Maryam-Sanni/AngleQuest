import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, Modal, ScrollView, StyleSheet } from 'react-native';
import axios from 'axios';
import { LinearGradient } from 'expo-linear-gradient';

function MyComponent({ onClose }) {
  const [email, setEmail] = useState('');
  const [date, setDate] = useState('');
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isAppointmentCreated, setIsAppointmentCreated] = useState(false); // State to track confirmation

  const options = [
    'SAP FI',
    'SAP MM',
    'SAP SD',
    'SAP PP',
    'Microsoft Dynamics Sales',
    'Microsoft Dynamics Customer Service',
    'Microsoft Power Platform Developer',
    'Microsoft Dynamics F&O',
    'Microsoft Dynamics Field Service',
    'Microsoft Dynamics CRM Developer',
    'Microsoft Business Central',
    'Scrum',
    'Business Analysis',
  ];

  const toggleOption = (option) => {
    setSelectedOptions((prevSelectedOptions) =>
      prevSelectedOptions.includes(option)
        ? prevSelectedOptions.filter((item) => item !== option)
        : [...prevSelectedOptions, option]
    );
  };

  const handleChange = (e) => {
    setDate(e.target.value); // This will handle the change in date input
  };

  const handleSubmit = async () => {
    const data = {
      email: email,
      date: date,
      category: selectedOptions.join(', ') || '',
      urgent: 'Yes', // Hardcoded for now, adjust as per requirement
    };

    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/inquire-tech`, data, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 201) {
        Alert.alert('Success', 'Your request has been submitted!');
        setIsAppointmentCreated(true); // Set confirmation state to true
      } else {
        Alert.alert('Error', response.data.message || 'Something went wrong');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Network error: Please try again later');
    }
  };

  const handlePress = () => {
    setIsHovered(false);
    handleSubmit();
  };

  // Render form if appointment is not created
  return (
    <View style={styles.modalContent}>
      <TouchableOpacity onPress={onClose} style={styles.closeButton}>
        <Text style={{ fontSize: 18, color: '#3F5637', fontWeight: 'bold', fontFamily: 'Roboto-Light' }}>✕</Text>
      </TouchableOpacity>
      {isAppointmentCreated ? (
        // Confirmation View if the appointment is created
        <View style={styles.confirmationContainer}>
          <Text style={styles.confirmationText}>Congratulations! Session Created</Text>
          <Text style={styles.noteText}>Note that this session costs $50.</Text>
          <Text style={styles.paynoteText}>
            Payment account details will be shared with you via email.
          </Text>
        </View>
      ) : (
      <ScrollView style={styles.form}>
        {/* Email Input */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            placeholder="anglequest@gmail.com"
            placeholderTextColor="gray"
            style={styles.input}
            value={email}
            onChangeText={setEmail}
          />
        </View>

        {/* Date Input */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Date</Text>
          <input 
             type="date"
             style={styles.input}
             value={date}
             onChange={handleChange}
           />
        </View>

        {/* Preference Dropdown with Checkboxes */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Preference</Text>
          <View style={styles.selectContainer}>
            <TouchableOpacity
              style={styles.dropdownHeader}
              onPress={() => setDropdownVisible(!dropdownVisible)}
            >
              <Text style={styles.dropdownText}>
                {selectedOptions.length > 0 ? selectedOptions.join(', ') : 'Select Options'}
              </Text>
            </TouchableOpacity>

            {dropdownVisible && (
              <View style={styles.dropdownOverlay}>
                <ScrollView style={styles.scrollContainer}>
                  {options.map((option, index) => (
                    <TouchableOpacity
                      key={index}
                      style={[
                        styles.option,
                        selectedOptions.includes(option) && styles.optionSelected,
                      ]}
                      onPress={() => toggleOption(option)}
                    >
                      <View style={styles.checkboxContainer}>
                        <View
                          style={[
                            styles.checkbox,
                            selectedOptions.includes(option) && styles.checkboxSelected,
                          ]}
                        >
                          {selectedOptions.includes(option) && (
                            <Text style={styles.checkboxCheckmark}>✓</Text>
                          )}
                        </View>
                        <Text
                          style={[
                            styles.optionText,
                            selectedOptions.includes(option) && styles.optionTextSelected,
                          ]}
                        >
                          {option}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
                <TouchableOpacity
                  style={styles.doneButton}
                  onPress={() => setDropdownVisible(false)}
                >
                  <Text style={styles.doneButtonText}>Done</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>

        {/* Submit Button */}
        <TouchableOpacity
          style={styles.button}
          onPress={handlePress}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <LinearGradient
            colors={isHovered ? ['#FF6347', '#FF4500'] : ['#FF7F50', '#FF6347']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.gradient}
          >
            <Text style={styles.buttonText}>Book an appointment</Text>
          </LinearGradient>
        </TouchableOpacity>
      </ScrollView>
       )}
      {/* Notes and Payment Info */}
     
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  footerText: {
    fontSize: 16,
    color: '#333',
  },
  linkText: {
    color: '#00796b',
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  modalContent: {
    width: '40%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
  },
  form: {
    maxHeight: 300,
    marginBottom: 20,
    marginTop: 30
  },
  inputGroup: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
  },
  selectContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  dropdownHeader: {
    padding: 10,
    backgroundColor: '#f9f9f9',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  dropdownText: {
    fontSize: 16,
  },
  dropdownOverlay: {
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    paddingBottom: 10,
  },
  scrollContainer: {
    maxHeight: 200,
  },
  option: {
    padding: 10,
  },
  optionSelected: {
    backgroundColor: '#e0f7fa',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderColor: '#00796b',
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10
  },
  checkboxSelected: {
    backgroundColor: '#00796b',
  },
  checkboxCheckmark: {
    color: 'white',
    fontSize: 14,
  },
  doneButton: {
    padding: 10,
    backgroundColor: '#00796b',
    justifyContent: 'center',
    alignItems: 'center',
  },
  doneButtonText: {
    color: 'white',
    fontSize: 16,
  },
  noteText: {
    fontSize: 14,
    marginTop: 10,
    color: '#333',
  },
  paynoteText: {
    fontSize: 14,
    marginTop: 5,
    color: '#666',
  },
  button: {
     borderRadius: 5,
     overflow: "hidden", 
     marginBottom: 40,
     width: 180,
   },
   gradient: {
     padding: 15,
     alignItems: "center",
     justifyContent: "center",
   },
   buttonText: {
     color: "#fff",
     fontWeight: "bold",
   },
    closeButton: {
      position: 'absolute',
      top: 20,
      right: 20,
    },
  confirmationContainer: {
    width: 500,
     marginTop: 20,
   },
  confirmationText: {
     fontSize: 18,
     fontWeight: "bold",
     marginTop: 20,
   },
    noteText: {
      fontSize: 14,
      marginTop: 10,
    },
   paynoteText: {
     fontSize: 14,
     marginTop: 5,
     color: "gray",
   },
});

export default MyComponent;
