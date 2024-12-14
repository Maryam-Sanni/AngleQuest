import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, FlatList, ImageBackground, Image, Modal } from 'react-native';
import { Button, Checkbox, Switch } from 'react-native-paper';
import * as XLSX from 'xlsx';
import * as DocumentPicker from 'expo-document-picker';
import Topbar from '../components/Recruiterstopbar';
import Sidebar from '../components/Recruiterssidebar';
import OpenModal from './NewEmployee2';
import OpenModal2 from './NewEmp';
import AsyncStorage from '@react-native-async-storage/async-storage';


  const EmployeePage = () => {
    const [employees, setEmployees] = useState([
      { id: 1, name: 'Patrick Oche', active: 'active', status: true, email: 'patrickking505@gmail.com', specialization: 'Microsoft', service: 'Work Delivery Support', current: 'senior', target: 'Solution Architect', createdDate: new Date('2024-12-14T00:00:00Z')  },
      { id: 2, name: 'Aaliyah Badru', active: 'active', status: true, email: 'badruaaliyah@gmail.com', specialization: 'SAP', service: 'Work Delivery Support', current: 'Junior', target: 'Senior', createdDate: new Date('2024-12-11T00:00:00Z')  },
      { id: 3, name: 'Alex Brown', active: 'active', status: true, email: 'lexybrown@hotmail.com', specialization: 'Scrum', service: 'Career Growth Support', current: 'Junior', target: 'Intermediate', createdDate: new Date('2024-12-10T00:00:00Z') },
      { id: 4, name: 'Raymond Gray', active: 'inactive', status: false, email: 'raymodgray636@gmail.com', specialization: 'Business Analysis', service: 'Work Delivery Support and Career Growth Support', current: 'Beginner', target: 'Junior', createdDate: new Date('2024-12-08T00:00:00Z') },
      { id: 5, name: 'Mary Claire', active: 'active', status: true, email: 'mclaire2007@yahoo.com', specialization: 'Microsoft', service: 'Career Growth Support', current: 'senior', target: 'Manager', createdDate: new Date('2024-12-01T00:00:00Z') },
    ]);
    
  const [selectedEmployees, setSelectedEmployees] = useState([]);
  const [ModalVisible, setModalVisible] = useState(false);
     const [ModalVisible2, setModalVisible2] = useState(false);

    // Function to check if the createdDate is today
    const isCreatedToday = (createdDate) => {
      const today = new Date();

      // Normalize today's date to ignore time
      const normalizedToday = new Date(today.getFullYear(), today.getMonth(), today.getDate());

      // Normalize createdDate to ignore time
      const normalizedCreatedDate = new Date(createdDate.getFullYear(), createdDate.getMonth(), createdDate.getDate());

      // Compare normalized dates
      return normalizedCreatedDate.getTime() === normalizedToday.getTime();
    };

    // Format the date
    const formatDate = (date) => {
      return new Date(date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      });
    };

    // Handle the toggle selection of employees
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

    // Function to save selected row data to AsyncStorage
    const handleOpenPress2 = async (item) => {
      try {
        // Save the item to AsyncStorage
        await AsyncStorage.setItem('selectedEmployee', JSON.stringify(item));
        console.log('Employee data saved successfully:', item);
      } catch (error) {
        console.error('Error saving data to AsyncStorage:', error);
      }
       setModalVisible2(true);
    };

    const handleCloseModal2 = () => {
      setModalVisible2(false);
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
      </View>
      
      {/* Employee Table */}
      <ScrollView style={styles.tableContainer}>
        <View style={styles.tableHeader}>
          <Text style={[styles.headerCell, {flex: 0 }]}><Checkbox
            color="#4CAF50"
          /></Text>
          <Text style={[styles.headerCell, {marginLeft: 30 }]}>Full Name</Text>
          <Text style={styles.headerCell}>Email Address</Text>
          <Text style={[styles.headerCell, {marginLeft: 30 }]}>Specialization</Text>
          <Text style={styles.headerCell}>Current Role</Text>
          <Text style={styles.headerCell}>Target Role</Text>
          <Text style={styles.headerCell}>Service</Text>
           <Text style={[styles.headerCell, {marginLeft: 30 }]}>Created</Text>
            <Text style={styles.headerCell}>Status</Text>
          <Text style={[styles.headerCell, {flex: 0 }]}><Switch
               color="green"
             /></Text>
        </View>
         <View style={{ borderBottomWidth: 1, borderBottomColor: '#ddd', marginTop: 10 }} />
        <FlatList
          data={employees}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View
              style={[
                styles.tableRow,
                isCreatedToday(item.createdDate) && styles.highlightRow,
              ]}
            >
              <Checkbox
                status={selectedEmployees.includes(item.id) ? 'checked' : 'unchecked'}
                onPress={() => toggleSelectEmployee(item.id)}
                color="#4CAF50"
              />
              <TouchableOpacity
                onPress={() => handleOpenPress2(item)} 
                style={[styles.cell, { marginLeft: 30, color: 'green' }]}
              >
                <Text>{item.name}</Text>
              </TouchableOpacity>
                <Text style={styles.cell}>{item.email}</Text>
              <Text style={[styles.cell, {marginLeft: 30 }]}>{item.specialization}</Text>
              <Text style={styles.cell}>{item.current}</Text>
              <Text style={styles.cell}>{item.target}</Text>
              <Text style={styles.cell}>{item.service}</Text>
               <Text style={[styles.cell, {marginLeft: 30 }]}>{formatDate(item.createdDate)}</Text>
              <Text style={styles.cell}>{item.active}</Text>
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
      <Modal
        animationType="slide"
        transparent={true}
        visible={ModalVisible2}
        onRequestClose={handleCloseModal2}
      >
        <View style={styles.modalContent}>
          <OpenModal2 onClose={handleCloseModal2} />
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
  highlightRow: {
    backgroundColor: '#e8f5e9', 
  },
  headerCell: {
    fontWeight: 'bold',
    textAlign: 'flex-start',
    flex: 1,
     maxWidth: "11.25%"
  },
  cell: {
    flex: 1,
    textAlign: 'flex-start',
     maxWidth: "11.25%"
  },
  button: {
    borderRightWidth: 1, 
    borderColor: '#000000',
    paddingHorizontal: 10,
  },
});

export default EmployeePage;
