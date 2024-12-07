import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, FlatList, ImageBackground, Image, Modal } from 'react-native';
import { Button, Checkbox, Switch } from 'react-native-paper';
import * as XLSX from 'xlsx';
import * as DocumentPicker from 'expo-document-picker';
import Topbar from '../components/Recruiterstopbar';
import Sidebar from '../components/Recruiterssidebar';
import OpenModal from './NewEmployee2';

const EmployeePage = () => {
  const [employees, setEmployees] = useState([
    { id: 1, name: 'Patrick Oche', active: 'active', status: true, email: 'patrickking505@gmail.com', specialization: 'Microsoft', service: 'Work Delivery Support', current: 'senior', target: 'Solution Architect'  },
    { id: 2, name: 'Aaliyah Badru', active: 'active', status: true, email: 'badruaaliyah@gmail.com', specialization: 'SAP', service: 'Work Delivery Support', current: 'Junior', target: 'Senior' },
    { id: 3, name: 'Alex Brown', active: 'active', status: true, email: 'lexybrown@hotmail.com', specialization: 'Scrum', service: 'Career Growth Support', current: 'Junior', target: 'Intermediate' },
    { id: 4, name: 'Raymond Gray', active: 'inactive', status: false, email: 'raymodgray636@gmail.com', specialization: 'Business Analysis', service: 'Work Delivery Support and Career Growth Support', current: 'Beginner', target: 'Junior' },
    { id: 5, name: 'Mary Claire', active: 'active', status: true, email: 'mclaire2007@yahoo.com', specialization: 'Microsoft', service: 'Career Growth Support', current: 'senior', target: 'Manager' },
  ]);
  const [selectedEmployees, setSelectedEmployees] = useState([]);
  const [ModalVisible, setModalVisible] = useState(false);
  
  // Toggles employee selection
  const toggleSelectEmployee = (id) => {
    if (selectedEmployees.includes(id)) {
      setSelectedEmployees(selectedEmployees.filter((empId) => empId !== id));
    } else {
      setSelectedEmployees([...selectedEmployees, id]);
    }
  };

  // Toggles employee status
  const toggleStatus = (id) => {
    setEmployees((prev) =>
      prev.map((emp) =>
        emp.id === id
          ? { ...emp, status: !emp.status, active: emp.status ? 'inactive' : 'active' }
          : emp
      )
    );
  };

  // Export to Excel
  const exportToExcel = async () => {
    try {
      // Convert employees data to a worksheet
      const worksheet = XLSX.utils.json_to_sheet(employees);

      // Create a workbook and append the worksheet
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Employees');

      // Write the workbook to binary string
      const excelData = XLSX.write(workbook, { type: 'binary', bookType: 'xlsx' });

      // Convert binary string to a Blob
      const blob = new Blob(
        [new Uint8Array(excelData.split('').map((char) => char.charCodeAt(0)))],
        { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' }
      );

      // Create a download link
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'employees.xlsx';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Error exporting to Excel:', error);
      alert('Failed to export data.');
    }
  };

  // Import from Excel (example, needs implementation)
  const importFromExcel = async () => {
    try {
      // Open a document picker
      const result = await DocumentPicker.getDocumentAsync({
        type: ['application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'application/vnd.ms-excel'],
      });

      if (result.type === 'success') {
        const fileUri = result.uri;

        // Read the file
        const fileData = await FileSystem.readAsStringAsync(fileUri, {
          encoding: FileSystem.EncodingType.Base64,
        });

        // Parse the Excel file
        const workbook = XLSX.read(fileData, { type: 'base64' });
        const sheetName = workbook.SheetNames[0]; // Use the first sheet
        const worksheet = workbook.Sheets[sheetName];

        // Convert the worksheet to JSON
        const data = XLSX.utils.sheet_to_json(worksheet);

        // Update state with imported data
        console.log('Imported data:', data);
        setEmployees(data);
        alert('Data imported successfully!');
      } else {
        alert('No file selected.');
      }
    } catch (error) {
      console.error('Error importing from Excel:', error);
      alert('Failed to import data.');
    }
  };

  // Delete selected employees
  const deleteEmployees = () => {
    setEmployees(employees.filter((emp) => !selectedEmployees.includes(emp.id)));
    setSelectedEmployees([]);
  };

  const handleOpenPress = () => {
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };
  
  return (
    <ImageBackground
    source={require ('../assets/backgroundimg2.png') }
    style={{ height: '100%', width: '100%',flex: 1}}
    >
    <View style={{ flex: 1}}>
    <Topbar />
    <View style={{ flexDirection: 'row', flex: 1  }}>
      <Sidebar />
    <View style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <Button mode="text" 
          textColor="#000000"
          style={styles.button} 
          onPress={handleOpenPress}
          icon={() => (
            <Image 
              source={{ uri: 'https://img.icons8.com/?size=100&id=3220&format=png&color=4CAF50' }} 
              style={{ width: 20, height: 20 }} 
            />
          )}>New</Button>
        <Button mode="text" 
          textColor="#000000"
          style={styles.button} 
          onPress={deleteEmployees}
          icon={() => (
            <Image 
              source={{ uri: 'https://img.icons8.com/?size=100&id=14237&format=png&color=000000' }} 
              style={{ width: 20, height: 20 }} 
            />
          )}>Delete</Button>
        <Button mode="text" 
          textColor="#000000"
          style={styles.button} 
          onPress={() => alert('Page refreshed')}
          icon={() => (
            <Image 
              source={{ uri: 'https://img.icons8.com/?size=100&id=59872&format=png&color=000000' }} 
              style={{ width: 20, height: 20 }} 
            />
          )}>Refresh</Button>
        <Button mode="text" 
          textColor="#000000"
          style={styles.button} 
          onPress={importFromExcel}
          icon={() => (
            <Image 
              source={{ uri: 'https://img.icons8.com/?size=100&id=eQywUgX10I1j&format=png&color=000000' }} 
              style={{ width: 20, height: 20 }} 
            />
          )}>Download Excel Template</Button>
        <Button mode="text" 
          textColor="#000000"
          style={styles.button} 
          onPress={exportToExcel}
          icon={() => (
            <Image 
              source={{ uri: 'https://img.icons8.com/?size=100&id=BEMhRoRy403e&format=png&color=000000' }} 
              style={{ width: 20, height: 20 }} 
            />
          )}>Export to Excel</Button>
        <Button mode="text" 
          textColor="#000000"
          style={styles.button} 
          onPress={importFromExcel}
          icon={() => (
            <Image 
              source={{ uri: 'https://img.icons8.com/?size=100&id=BEMhRoRy403e&format=png&color=000000' }} 
              style={{ width: 20, height: 20 }} 
            />
          )}>Import from Excel</Button>
      </View>
      
      {/* Employee Table */}
      <ScrollView style={styles.tableContainer}>
        <View style={styles.tableHeader}>
          <Text style={[styles.headerCell, {flex: 0 }]}><Checkbox
            color="#4CAF50"
          /></Text>
          <Text style={[styles.headerCell, {marginLeft: 30 }]}>Full Name</Text>
          <Text style={[styles.headerCell, {marginLeft: 10 }]}>Email Address</Text>
          <Text style={[styles.headerCell, {marginLeft: 30 }]}>Specialization</Text>
          <Text style={styles.headerCell}>Current Role</Text>
          <Text style={styles.headerCell}>Target Role</Text>
          <Text style={styles.headerCell}>Service</Text>
          <Text style={[styles.headerCell, {marginLeft: 30 }]}>Status</Text>
          <Text style={[styles.headerCell, {flex: 0 }]}><Switch
               color="green"
             /></Text>
        </View>
         <View style={{ borderBottomWidth: 1, borderBottomColor: '#ddd', marginTop: 10 }} />
        <FlatList
          data={employees}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.tableRow}>
              <Checkbox
                status={selectedEmployees.includes(item.id) ? 'checked' : 'unchecked'}
                onPress={() => toggleSelectEmployee(item.id)}
                color="#4CAF50"
              />
              <Text style={[styles.cell, {marginLeft: 30 }]}>{item.name}</Text>
              <Text style={[styles.cell, {marginLeft: 10 }]}>{item.email}</Text>
              <Text style={[styles.cell, {marginLeft: 30 }]}>{item.specialization}</Text>
              <Text style={styles.cell}>{item.current}</Text>
              <Text style={styles.cell}>{item.target}</Text>
              <Text style={styles.cell}>{item.service}</Text>
              <Text style={[styles.cell, {marginLeft: 30 }]}>{item.active}</Text>
              <Switch
                value={item.status}
                onValueChange={() => toggleStatus(item.id)}
                color="green"
              />
            </View>
          )}
        />
      </ScrollView>
      <Modal
        animationType="slide"
        transparent={true}
        visible={ModalVisible}
        onRequestClose={handleCloseModal}
      >
        <View style={styles.modalContent}>
          <OpenModal onClose={handleCloseModal} />
        </View>
      </Modal>
    </View>
    </View>
    </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  modalContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.1)",
  },
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: 'white',
    marginLeft: 210
  },
  header: {
    flexDirection: 'row',
    padding: 10,
    marginBottom: 10,
    shadowColor: '#000',
      shadowOffset: { width: 0, height: 2, }, 
      shadowOpacity: 0.25, 
      shadowRadius: 3.84,
       elevation: 5, 
  },
  tableContainer: {
    flex: 1,
    marginTop: 16,
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: 'white',
    padding: 8,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  tableRow: {
    flexDirection: 'row',
    padding: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    alignItems: 'center',
  },
  headerCell: {
    fontWeight: 'bold',
    textAlign: 'flex-start',
    flex: 1,
  },
  cell: {
    flex: 1,
    textAlign: 'flex-start',
  },
  button: {
    borderRightWidth: 1, 
    borderColor: '#000000',
    paddingHorizontal: 10,
  },
});

export default EmployeePage;
