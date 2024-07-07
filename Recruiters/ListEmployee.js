import { useFonts } from 'expo-font';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { View, Text, StyleSheet, TouchableOpacity, Modal, ScrollView, CheckBox } from 'react-native';

function MyComponent({ onClose }) {
  const [selectedEmployees, setSelectedEmployees] = useState([]);

  const handleEmployeeSelection = (employee) => {
    const updatedSelection = selectedEmployees.includes(employee)
      ? selectedEmployees.filter((emp) => emp !== employee)
      : [...selectedEmployees, employee];
    setSelectedEmployees(updatedSelection);
  };

  const handleSave = () => {
    console.log("Selected employees:", selectedEmployees);
    onClose();
  };

  const renderEmployeeList = () => {
    const employees = [
      "John Smith",
      "Maria Garcia",
      "Muhammad Khan",
      "Sophie Johnson",
      "Carlos Martinez",
      "Aisha Rahman",
      "Alexandra Lee",
      "Mohammed Ali",
      "Isabella Rossi",
      "Chen Wei",
      "Luis Hernandez",
      "Ananya Patel",
      "David Kim",
      "Fatima Ahmed",
      "Michael Nguyen",
      "Mia Lopez",
      "Rahul Gupta",
      "Emily Taylor",
      "Javier Rodriguez",
      "Sofia Santos"
    ];

    return employees.map((employee, index) => (
      <View key={index} style={styles.employeeItem}>
        <CheckBox
          value={selectedEmployees.includes(employee)}
          onValueChange={() => handleEmployeeSelection(employee)}
        />
        <Text style={styles.employeeText}>{employee}</Text>
      </View>
    ));
  };
  const [fontsLoaded]=useFonts({
    "Roboto-Light":require("../assets/fonts/Roboto-Light.ttf")
  })
  const {t}=useTranslation()


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
            <Text style={styles.headerText}>{t("Add Employees")}</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Text style={styles.closeButtonText}>✕</Text>
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.scrollView}>
            {renderEmployeeList()}
          </ScrollView>

          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={handleSave} style={styles.saveButton}>
              <Text style={styles.saveButtonText}>{t("Save")}</Text>
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
    fontFamily:"Roboto-Light"
  },
  closeButton: {
    padding: 10,
  },
  closeButtonText: {
    fontSize: 18,
    color: '#3F5637',
    fontFamily:"Roboto-Light"
  },
  scrollView: {
    flex: 1,
  },
  employeeItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#CCC',
  },
  employeeText: {
    fontSize: 16,
    marginLeft: 10,
  },
  selectedItem: {
    backgroundColor: '#E0FFE0',
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
    fontFamily:"Roboto-Light"
  },
});

export default MyComponent;
