import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Modal, ScrollView, Image, TouchableOpacity} from 'react-native';

const EmploymentHistoryModal = ({ visible, onClose, employmentHistory, onSave }) => {
  const [history, setHistory] = useState(employmentHistory);

  useEffect(() => {
    setHistory(employmentHistory);
  }, [employmentHistory]);

  const handleChange = (key, value) => {
    setHistory({ ...history, [key]: value });
  };

  const handleSave = () => {
    onSave(history);
    onClose();
  };

  return (
    <Modal visible={visible} animationType="slide" transparent>
       <View style={{ flex: 1, alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)',}}>
       <ScrollView>
       <View style={styles.header}>
          <Image
            source={{ uri: 'https://cdn.builder.io/api/v1/image/assets/TEMP/1f2d38e99b0016f2bd167d2cfd38ff0d43c9f94a93c84b4e04a02d32658fb401?apiKey=7b9918e68d9b487793009b3aea5b1a32&' }} 
            style={styles.logo}
          />
          <Text style={styles.headerText}>Edit Employment History</Text>
       
        <TouchableOpacity onPress={onClose} style={styles.closeButton}>
          <Text style={{ fontSize: 18, color: '#3F5637', fontWeight: 'bold'}}>
            ✕
          </Text>
        </TouchableOpacity>
        </View>
      <View style={styles.modalContainer}>
        
          <TextInput
            style={styles.input}
            value={history.position}
            onChangeText={(text) => handleChange('position', text)}
            placeholder="Position"
          />
          <TextInput
            style={styles.input}
            value={history.company}
            onChangeText={(text) => handleChange('company', text)}
            placeholder="Company"
          />
          <TextInput
            style={styles.input}
            value={history.duration}
            onChangeText={(text) => handleChange('duration', text)}
            placeholder="Duration"
          />
          <TextInput
            style={styles.inputmultiline}
            value={history.description}
            onChangeText={(text) => handleChange('description', text)}
            placeholder="Description"
            multiline
          />
         <View style={{ marginTop: 20, width: 220, alignSelf: 'center'}}>
        <Button title="Save Changes" onPress={handleSave} color="coral" />
        </View>
      </View>
      </ScrollView>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    height: 850,
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#F8F8F8',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  inputmultiline: {
    height: 200,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  closeButton: {
    position: 'absolute',
    top: 20,
    right: 20,
  },
  header: {
    width: 600,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#CCC',
    marginTop: 30
  },
  logo: {
    width: 40,
    height: 40,
    marginRight: 10
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#3F5637'
  }
});

export default EmploymentHistoryModal;

