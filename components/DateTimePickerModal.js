import React, { useState } from "react";
import { View, Text, TouchableOpacity, Picker, StyleSheet } from "react-native";
import Modal from "react-native-modal";
import { Calendar } from "react-native-calendars";
import { useFonts } from "expo-font";
import { useTranslation } from 'react-i18next';

const DateTimePickerModal = ({ isVisible, onConfirm, onCancel }) => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedHour, setSelectedHour] = useState("01");
  const [selectedMinute, setSelectedMinute] = useState("00");
  const [selectedPeriod, setSelectedPeriod] = useState("AM");

  const handleDayPress = (day) => {
    setSelectedDate(day.dateString);
  };

  const handleConfirm = () => {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const dayOfWeek = days[new Date(selectedDate).getDay()];
    const hour = selectedPeriod === "AM" ? selectedHour : parseInt(selectedHour, 10) + 12;
    const time = `${selectedHour}:${selectedMinute} ${selectedPeriod}`;
    const selectedDateTime = `${dayOfWeek}, ${selectedDate} ${time}`;
  
    // Get the timezone offset in hours and minutes
    const timeZoneOffset = new Date().getTimezoneOffset();
    const offsetHours = Math.abs(Math.floor(timeZoneOffset / 60));
    const offsetMinutes = Math.abs(timeZoneOffset % 60);
  
    // Construct the timezone string
    const timeZoneString = `GMT${timeZoneOffset < 0 ? '+' : '-'}${offsetHours}:${offsetMinutes}`;
  
    // Append the timezone to the selectedDateTime
    const dateTimeWithTimeZone = `${selectedDateTime} (${timeZoneString})`;
    onConfirm(dateTimeWithTimeZone);
  };
  const [fontsLoaded]=useFonts({
    'Roboto-Light':require("../assets/fonts/Roboto-Light.ttf"),
  })
  const {t}=useTranslation()

  
  return (
    <Modal isVisible={isVisible} onBackdropPress={onCancel}>
      <View style={styles.modalContainer}>
        <Text style={styles.headerText}>{t("Select a Date and Time")}</Text>
        <Calendar
          onDayPress={handleDayPress}
          markedDates={{ [selectedDate]: { selected: true } }}
          style={styles.calendar}
          theme={{
            selectedDayBackgroundColor: 'coral',
            selectedDayTextColor: '#FFFFFF',
            todayTextColor: 'coral',
            arrowColor: 'coral',
          }}
        />
        <View style={styles.timePickerContainer}>
          <Picker
            style={styles.picker}
            selectedValue={selectedHour}
            onValueChange={(itemValue) => setSelectedHour(itemValue)}
          >
            {Array.from({ length: 12 }, (_, hour) => (
              <Picker.Item key={hour} label={`${hour === 0 ? 12 : hour}`} value={`${hour < 10 ? "0" + hour : hour}`} />
            ))}
          </Picker>
          <Text style={styles.timeSeparator}>:</Text>
          <Picker
            style={styles.picker}
            selectedValue={selectedMinute}
            onValueChange={(itemValue) => setSelectedMinute(itemValue)}
          >
            {Array.from({ length: 12 }, (_, min) => (
              <Picker.Item key={min * 5} label={`${min * 5 < 10 ? "0" + min * 5 : min * 5}`} value={`${min * 5}`} />
            ))}
          </Picker>
          <Picker
            style={styles.picker}
            selectedValue={selectedPeriod}
            onValueChange={(itemValue) => setSelectedPeriod(itemValue)}
          >
            <Picker.Item label="AM" value="AM" />
            <Picker.Item label="PM" value="PM" />
          </Picker>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={onCancel}>
            <Text style={styles.buttonText}>{t("Cancel")}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, { backgroundColor: 'coral' }]} onPress={handleConfirm}>
            <Text style={[styles.buttonText, { color: '#FFFFFF' }]}>{t("Confirm")}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    alignSelf: 'center',
    backgroundColor: "#F8F8F8",
    borderRadius: 10,
    padding: 20,
    width: 920
  },
  headerText: {
    fontSize: 18,
    marginBottom: 10,
    textAlign: 'center',
    fontFamily:"Roboto-Light"
  },
  calendar: {
    marginBottom: 10,
  },
  timePickerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  picker: {
    flex: 1,
    marginRight: 5,
    backgroundColor: '#F5F5F5',
    borderRadius: 5,
    padding: 10,
    borderColor: '#206C00'
  },
  timeSeparator: {
    fontSize: 18,
    fontFamily:"Roboto-Light"
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    flex: 1,
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#DDDDDD',
    marginHorizontal: 5,
  },
  buttonText: {
    fontSize: 16,
    fontFamily:"`Roboto-Light"
  },
});

export default DateTimePickerModal;
