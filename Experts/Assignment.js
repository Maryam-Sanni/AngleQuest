import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Image, Modal } from 'react-native';
import OpenModal from './GradeAssignmentList';
import DateTimePickerModal from "../components/DateTimePickerModal";
import { useFonts } from "expo-font";
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomAlert from '../components/CustomAlert';
import MultiSelect from 'react-native-multiple-select';
import { api_url, AuthContext } from '../Messaging/AuthProvider';

function MyComponent({ onClose }) {
  const [mainModalVisible, setMainModalVisible] = useState(true);
  const [ModalVisible, setModalVisible] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedDateTime, setSelectedDateTime] = useState(null);
  const [selectedMembers, setSelectedMembers] = useState([]);
  const [topic, setTopic] = useState('');
  const [description, setDescription] = useState('');
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');     
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [hubMembers, setHubMembers] = useState([]);
  const [coaching_hub_name, setGroupName] = useState('');

  const apiUrl = process.env.REACT_APP_API_URL;
  
  const handleConfirmDateTime = (dateTime) => {
    setSelectedDateTime(dateTime);
    setIsModalVisible(false);
  };

  const handleCancelModal = () => {
    setIsModalVisible(false);
  };

  const handleOpenPress = () => {
    setMainModalVisible(false);
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    onClose();
  };
  
  useEffect(() => {
    const loadFormData = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        if (!token) throw new Error('No token found');

        const response = await axios.get(`${apiUrl}/api/expert/hubs/get`, {
          headers: { Authorization: `Bearer ${token}` }
        });

        if (response.status === 200 && response.data.status === 'success') {
          const data = response.data.NewHub;
          setGroupName(data.coaching_hub_name || '');
        } else {
          console.error('Failed to fetch data', response);
        }
      } catch (error) {
        console.error('Failed to load form data', error);
      }
    };

    loadFormData();
  }, []);
  
  const handleSubmit = async () => {
    try {
      const token = await AsyncStorage.getItem('token'); 
      if (!token) {
        alert('No token found');
        return;
      }

      // Map selected member IDs to names
      const selectedNames = selectedMembers.map(id => {
        const member = hubMembers.find(member => member.id === id);
        return member ? member.name : id;
      });

      const formData = {
        hub_member: selectedNames.join(', '),
        topic: topic,
        description: description,
        assignment_due: selectedDateTime,
        hub_name: coaching_hub_name,
        assignment_response: "Pending"
      };

      const response = await axios.post(`${apiUrl}/api/expert/newassignment/create`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 201) {
        setAlertMessage(t('Assignment created successfully'));
      } else {
        setAlertMessage(t('Failed to create Assignment'));
      }
    } catch (error) {
      console.error('Error during save:', error);
      setAlertMessage(t('Failed to create Assignment'));
    }
    setAlertVisible(true);
  }; 

  const hideAlert = () => {
    setAlertVisible(false);
    onClose();
  };

  const [fontsLoaded] = useFonts({
    'Roboto-Light': require("../assets/fonts/Roboto-Light.ttf"),
  });
  const { t } = useTranslation();
 
  const fetchData = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      if (!token) {
        throw new Error("No token found");
      }

      const response = await axios.get(`${apiUrl}/api/expert/getAllJobSeekers`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Extract the relevant data (id and full name)
      const result = response.data.allJobSeekers.map((jobSeeker) => ({
        id: jobSeeker.id.toString(),
        name: `${jobSeeker.first_name} ${jobSeeker.last_name}`,
      }));

      // Update state directly with the fetched members
      setHubMembers(result);
    } catch (error) {
      console.error("Failed to fetch data:", error);
    }
  };

  useEffect(() => {
    // Fetch the members directly when the component mounts
    fetchData();
  }, []);



  useEffect(() => {
    const saveSelectedMembers = async () => {
      try {
        await AsyncStorage.setItem('selectedMembers', JSON.stringify(selectedMembers));
      } catch (error) {
        console.error('Failed to save selected members:', error);
      }
    };

    saveSelectedMembers();
  }, [selectedMembers]);

  return (
    <View style={{ marginTop: 40, alignItems: 'center' }}>
      <View style={styles.greenBox}>
        <View style={styles.header}>
          <Image
            source={{ uri: 'https://cdn.builder.io/api/v1/image/assets/TEMP/1f2d38e99b0016f2bd167d2cfd38ff0d43c9f94a93c84b4e04a02d32658fb401?apiKey=7b9918e68d9b487793009b3aea5b1a32&' }}
            style={styles.logo}
          />
          <Text style={styles.headerText}>{t("New Assignment")}</Text>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Text style={{ fontSize: 18, color: '#3F5637', fontWeight: 'bold', fontFamily: "Roboto-Light" }}>
              ✕
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.container}>
          <View style={{ flexDirection: "row", marginBottom: 20 }}>
            <TouchableOpacity>
              <View style={{ justifyContent: "flex-start", paddingHorizontal: 10, paddingVertical: 10, borderRadius: 5, borderColor: "coral", backgroundColor: '#f7fff4', width: 150, alignItems: 'center', marginTop: 20, marginLeft: 50, borderWidth: 1 }}>
                <Text style={{ fontSize: 13, color: "coral", textAlign: 'center', fontWeight: 'bold', fontFamily: "Roboto-Light" }}>{t("New Assignment")}</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleOpenPress} >
              <View style={{ justifyContent: "flex-start", paddingHorizontal: 10, paddingVertical: 10, borderRadius: 5, borderColor: "#f7fff4", backgroundColor: 'coral', width: 150, alignItems: 'center', marginTop: 20, marginLeft: 20, borderWidth: 1 }}>
                <Text style={{ fontSize: 13, color: "#f7fff4", textAlign: 'center', fontWeight: 'bold', fontFamily: "Roboto-Light" }}>{t("Grade Assignment")}</Text>
              </View>
            </TouchableOpacity>
          </View>

            <Text style={{ fontWeight: '500', fontSize: 16, marginLeft: 50, marginTop: 10, marginBottom: 5, fontFamily: "Roboto-Light" }}>
              Hub Members
            </Text>
            <View style={[styles.multiSelectContainer, isDropdownOpen && styles.multiSelectContainerExpanded]}>
              <MultiSelect
                items={hubMembers} // Pass hubMembers to the items prop
                uniqueKey="id"
                onSelectedItemsChange={setSelectedMembers}
                selectedItems={selectedMembers}
                selectText="Pick Members"
                searchInputPlaceholderText="Search Members..."
                styleMainWrapper={styles.multiSelectContainer}
                styleDropdownMenuSubsection={styles.multiSelectInputGroup}
                styleListContainer={styles.multiSelectDropdown}
                itemTextColor='black'
                selectedItemTextColor='green'
                displayKey="name"
                submitButtonText="Save Selection"
                styleInputGroup={styles.multiSelectSearchInput}
                styleTextDropdown={styles.multiSelectText}
                styleTextDropdownSelected={styles.multiSelectText}
                onToggleList={(isOpen) => setIsDropdownOpen(isOpen)}
                iconDropdown={{ color: 'black' }}
                iconSearch={{ color: 'black' }}
                iconCancel={{ color: 'black' }}
              />
          </View>

          <Text style={{ fontWeight: '500', fontSize: 16, marginLeft: 50, marginTop: 20, marginBottom: 5, fontFamily: "Roboto-Light" }}>
            {t("Topic")}
          </Text>
          <TextInput
            placeholder=" "
            value={topic}
            onChangeText={(text) => setTopic(text)}
            style={styles.input}
          />

          <Text style={{ fontWeight: '500', fontSize: 16, marginLeft: 50, marginTop: 20, marginBottom: 5, fontFamily: "Roboto-Light" }}>
            {t("Description")}
          </Text>
          <TextInput
            placeholder=" "
            value={description}
            onChangeText={(text) => setDescription(text)}
            style={[styles.input, { height: 100 }]}
            multiline
          />

          <Text style={{ fontWeight: '500', fontSize: 16, marginLeft: 50, marginTop: 20, marginBottom: 5, fontFamily: "Roboto-Light" }}>
            {t("Assignment Due")}
          </Text>
          <TouchableOpacity onPress={() => setIsModalVisible(true)}>
            <Text style={styles.input}>{t("Selected date and time:")} {selectedDateTime}</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity onPress={handleSubmit} style={styles.buttonplus}>
          <Text style={styles.buttonTextplus}>{t("Send")}</Text>
        </TouchableOpacity>
      </View>

      <DateTimePickerModal
        isVisible={isModalVisible}
        onConfirm={handleConfirmDateTime}
        onCancel={handleCancelModal}
      />
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
      <CustomAlert
        visible={alertVisible}
        title={t("Alert")}
        message={alertMessage}
        onConfirm={hideAlert}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  modalContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
  },
  container: {
    flexDirection: 'column',
    marginLeft: 100,
  },
  greenBox: {
    width: 1000,
    height: "100%",
    backgroundColor: '#F8F8F8',
  },
  picker: {
    height: 40,
    width: '80%',
    backgroundColor: 'white',
    borderColor: '#206C00',
    borderWidth: 1,
    color: 'black',
    fontSize: 14,
    marginLeft: 50,
    borderRadius: 5,
  },
  buttonplus: {
    backgroundColor: 'coral',
    padding: 5,
    marginBottom: 50,
    marginTop: 30,
    width: 100,
    marginLeft: 770,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonTextplus: {
    color: 'white',
    fontSize: 14,
    textAlign: 'center',
    fontFamily: "Roboto-Light"
  },
  input: {
    height: 40,
    width: '80%',
    backgroundColor: 'white',
    borderColor: '#206C00',
    borderWidth: 1,
    color: 'black',
    fontSize: 14,
    marginLeft: 50,
    borderRadius: 5,
    padding: 10,
    fontFamily: "Roboto-Light"
  },
  closeButton: {
    position: 'absolute',
    top: 20,
    right: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#CCC',
    marginBottom: 5,
  },
  logo: {
    width: 40,
    height: 40,
    marginRight: 10,
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#3F5637',
    fontFamily: "Roboto-Light"
  },
  multiSelectContainer: {
    marginLeft: 25,
    marginRight: 65,
  },
  multiSelectContainerExpanded: {
    height: 200,
  },
  multiSelectInputGroup: {
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#206C00',
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginTop: 5
  },
  multiSelectDropdown: {
    maxHeight: 150,
  },
  multiSelectSearchInput: {
    height: 40,
    padding: 20,
    borderWidth: 1,
    borderColor: '#206C00',
    fontSize: 20
  },
  multiSelectText: {
    fontSize: 16,
    color: 'black',
    marginLeft: 10
  },
});

export default MyComponent;
