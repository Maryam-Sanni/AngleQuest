import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, ScrollView } from 'react-native';

function MyComponent({ onClose }) {
  const [selectedEmployees, setSelectedEmployees] = useState([
    "John Smith",
    "Maria Garcia",
    "Muhammad Khan"
  ]); // Initial selected employees

  const handleRemove = (employee) => {
    setSelectedEmployees(selectedEmployees.filter((emp) => emp !== employee));
  };

  const handleSave = () => {
    console.log("Selected employees:", selectedEmployees);
    onClose();
  };

  const renderSelectedEmployees = () => {
    return selectedEmployees.map((employee, index) => (
      <View key={index} style={styles.selectedEmployeeItem}>
        <Text style={styles.employeeText}>{employee}</Text>
        <TouchableOpacity onPress={() => handleRemove(employee)} style={styles.removeButton}>
          <Text style={styles.removeButtonText}>Remove</Text>
        </TouchableOpacity>
      </View>
    ));
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={true}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.greenBox}>
          <View style={styles.header}>
            <Text style={styles.headerText}>Your Employees</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Text style={styles.closeButtonText}>✕</Text>
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.scrollView}>
            {renderSelectedEmployees()}
          </ScrollView>

          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={handleSave} style={styles.saveButton}>
              <Text style={styles.saveButtonText}>Update</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40
  },
  greenBox: {
    width: '30%',
    height: '100%',
    backgroundColor: '#F8F8F8',
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#3F5637',
  },
  closeButton: {
    padding: 10,
  },
  closeButtonText: {
    fontSize: 18,
    color: '#3F5637',
  },
  scrollView: {
    flex: 1,
  },
  selectedEmployeeItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#CCC',
  },
  employeeText: {
    fontSize: 16,
  },
  buttonContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  saveButton: {
    backgroundColor: 'coral',
    borderRadius: 5,
    padding: 10,
    width: '50%',
    alignItems: 'center',
  },
  saveButtonText: {
    color: 'white',
    fontSize: 16,
  },
  removeButton: {
    backgroundColor: 'red',
    borderRadius: 5,
    padding: 5,
  },
  removeButtonText: {
    color: 'white',
    fontSize: 14,
  },
});

export default MyComponent;
