import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Picker, TouchableOpacity, ScrollView, Modal, FlatList  } from 'react-native';
import { useNavigation } from '@react-navigation/native';


const CustomTimePicker = ({ initialValue, onChange }) => {
  const [hour, setHour] = useState(initialValue.split(':')[0]);
  const [minute, setMinute] = useState(initialValue.split(':')[1]);
  const [isPM, setIsPM] = useState(initialValue.includes('PM'));
  const [modalVisible, setModalVisible] = useState(false);

  const handleHourChange = (selectedHour) => {
    setHour(selectedHour);
  };

  const handleMinuteChange = (selectedMinute) => {
    setMinute(selectedMinute);
  };

  const handleToggleAMPM = () => {
    setIsPM(!isPM);
  };

  const showTimePicker = () => {
    setModalVisible(true);
  };

  const selectTime = () => {
    const time = `${hour}:${minute} ${isPM ? 'PM' : 'AM'}`;
    onChange(time);
    setModalVisible(false);
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.timeOption} onPress={item.onPress}>
      <Text>{item.label}</Text>
    </TouchableOpacity>
  );

  const hourOptions = Array.from({ length: 12 }, (_, i) => i + 1 ).map((hour) => ({
    label: hour.toString(),
    onPress: () => handleHourChange(hour.toString().padStart(2, '0')),
  }));

  const minuteOptions = Array.from({ length: 6 }, (_, i) => i * 10).map((minute) => ({
    label: minute.toString().padStart(2, '0'),
    onPress: () => handleMinuteChange(minute.toString().padStart(2, '0')),
  }));

  return (
    <View>
      <TouchableOpacity style={styles.input} onPress={showTimePicker}>
        <Text>{`${hour}:${minute} ${isPM ? 'PM' : 'AM'}`}</Text>
      </TouchableOpacity>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}
      >
        <View style={styles.modalContainer}>
          <View style={styles.optionsContainer}>
            <FlatList
              data={hourOptions}
              renderItem={renderItem}
              keyExtractor={(item) => item.label}
              horizontal
              showsHorizontalScrollIndicator={false}
            />
            <FlatList
              data={minuteOptions}
              renderItem={renderItem}
              keyExtractor={(item) => item.label}
              horizontal
              showsHorizontalScrollIndicator={false}
            />
          </View>
           <View style={styles.ampmContainer}>
            <TouchableOpacity style={[styles.ampmButton, isPM ? styles.selected : null]} onPress={handleToggleAMPM}>
              <Text>PM</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.ampmButton, !isPM ? styles.selected : null]} onPress={handleToggleAMPM}>
              <Text>AM</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.selectButton} onPress={selectTime}>
            <Text>Select</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

const CreateCoachingHubForm = ({ onClose }) => {
  const navigation = useNavigation();
  const [startTime, setStartTime] = useState('12:00');
  const [endTime, setEndTime] = useState('12:00');

  const handleStartTimeChange = (time) => {
    setStartTime(time);
  };

  const handleEndTimeChange = (time) => {
    setEndTime(time);
  };

 
  const [visibility, setVisibility] = useState('public');
  const [groupName, setGroupName] = useState('');
  const [addLeaders, setAddLeaders] = useState('');
  const [groupDescription, setGroupDescription] = useState('');
  const [searchMembers, setSearchMembers] = useState('');
  const [descriptionLength, setDescriptionLength] = useState(0);
  const maxDescriptionLength = 85; // Max character limit for description


  const handleDescriptionChange = (text) => {
    if (text.length <= maxDescriptionLength) {
      setGroupDescription(text);
      setDescriptionLength(text.length);
    }
  };

  const handleSave = () => {
    // Handle saving the form data
    console.log("Form data:", {
      visibility,
      groupName,
      addLeaders,
      groupDescription,
      searchMembers
    });
  };

 
 
  return (
    <View style={{ flex: 1, backgroundColor: "#F8F8F8", marginTop: 40, alignItems: 'center'  }}>
        <ScrollView contentContainerStyle={{ flexGrow: 1, maxHeight: 500 }}>
        <View style={styles.greenBox}>
<TouchableOpacity onPress={onClose}>
            <Text style={{ fontSize: 18, color:'grey', marginLeft: 850,fontWeight: 'bold', marginTop: -20}}>
                            ✕
                        </Text>
                        </TouchableOpacity>
    <View style={styles.pageContainer}>
      <View style={styles.formContainer}>
        <Text style={{ fontWeight: 600, color: 'black', marginTop: 25 }}>Visibility*</Text>
        <Picker
          selectedValue={visibility}
          style={styles.input}
          onValueChange={(itemValue, itemIndex) =>
            setVisibility(itemValue)
          }> 
          <Picker.Item label="Public" value="public" />
          <Picker.Item label="Private" value="private" />
        </Picker>
        <Text style={{ fontWeight: 600, color: 'black', marginTop: 10 }}>Coaching Hub Name*</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter hub name"
          value={groupName}
          onChangeText={text => setGroupName(text)}
        />
        <Text style={{ fontWeight: 600, color: 'black', marginTop: 10 }}>Coaching Hub Description* ({maxDescriptionLength - descriptionLength} characters remaining)</Text>
        <TextInput
          style={[styles.input, { height: 100 }]}
          placeholder= "Type here..."
          multiline
          value={groupDescription}
          onChangeText={handleDescriptionChange}
        />
        <Text style={{ fontWeight: 600, color: 'black', marginTop: 10 }}>Meeting Day*</Text>
        <Picker
          selectedValue={visibility}
          style={styles.input}
          onValueChange={(itemValue, itemIndex) =>
            setVisibility(itemValue)
          }> 
          <Picker.Item label="Monday" value="Monday" />
          <Picker.Item label="Tuesday" value="Tuesday" />
          <Picker.Item label="Wednesday" value="Wednesday" />
          <Picker.Item label="Thursday" value="Thursday" />
          <Picker.Item label="Friday" value="Friday" />
          <Picker.Item label="Saturday" value="Saturday" />
          <Picker.Item label="Sunday" value="Sunday" />
        </Picker>
        <Text style={{ fontWeight: 600, color: 'black', marginTop: 10 }}>Meeting Time*</Text>
        <View style={styles.timecontainer}>
      <View style={styles.timeformContainer}>
        <Text style={styles.timelabel}>From</Text>
        <CustomTimePicker initialValue={startTime} onChange={handleStartTimeChange} />
        <Text style={styles.timelabel}>To</Text>
        <CustomTimePicker initialValue={endTime} onChange={handleEndTimeChange} />
      </View>
    </View>
        <Text style={{ fontWeight: 600, color: 'black', marginTop: 10 }}>Coaching Hub Fee*</Text>
        <TextInput
          style={styles.input}
          placeholder="$25"
          value={groupName}
          onChangeText={text => setGroupName(text)}
        />
        <Text style={{ fontWeight: 600, color: 'black', marginTop: 10 }}>Coaching Hub Goals (Optional) </Text>
        <TextInput
          style={[styles.input, { height: 100 }]}
          placeholder= "Type here..."
          multiline
          value={addLeaders}
          onChangeText={text => setAddLeaders(text)}
        />
       <Text style={{ fontWeight: 600, color: 'black', marginTop: 10 }}>Coaching Hub Limit (Optional) </Text>
        <TextInput
          style={styles.input}
          placeholder="50 Participants"
          keyboardType="numeric" // Set keyboardType to 'numeric' for number input
          value={searchMembers}
          onChangeText={text => setSearchMembers(text)}
        />
        <TouchableOpacity
          style={{ backgroundColor: 'coral', padding: 10, borderRadius: 5, alignItems: 'center', marginTop: 25, marginBottom: 30 }}
          onPress={handleSave}
        >
          <Text style={{ color: 'white', fontWeight: 'bold' }}>Save Changes</Text>
        </TouchableOpacity>
      </View>
      </View>
      </View>
      </ScrollView>
      </View>
  );
};

const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#F8F8F8'
  },
  scrollContainer: {
    flexGrow: 1,
    maxHeight: 500
  },
  formContainer: {
    width: '80%',
    paddingHorizontal: 20, // Add some horizontal padding for better layout
  },
  input: {
    height: 40,
    borderColor: 'grey',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginTop: 5,
  },
  greenBox: {
    width: 920,
    height:850,
    backgroundColor: '#F8F8F8',
    marginTop: 40
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
  timecontainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  timeformContainer: {
    width: '100%',
  },
  timelabel: {
    fontWeight: '600',
    marginBottom: 2,
    marginTop: 10,
    fontSize: 14,
    fontStyle: 'italic'
  },
  modalContainer: {
    backgroundColor: '#F8F8F8',
    marginTop: 'auto',
    marginBottom: 0,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    padding: 20,
  },
  optionsContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  timeOption: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  ampmContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  ampmButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  selected: {
    backgroundColor: 'coral',
  },
  selectButton: {
    backgroundColor: 'coral',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    color: 'white'
  },
});

export default CreateCoachingHubForm;
