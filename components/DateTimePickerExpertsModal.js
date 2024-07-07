import { useFonts } from "expo-font";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { View, Text, TouchableOpacity, Picker, StyleSheet } from "react-native";
import Modal from "react-native-modal";

const DateTimePickerModal = ({ isVisible, onConfirm, onCancel }) => {
  const [selectedDays, setSelectedDays] = useState({});
  const [selectedStartTime, setSelectedStartTime] = useState("07:00 AM");
  const [selectedEndTime, setSelectedEndTime] = useState("10:00 PM");

  const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  const handleDayPress = (day) => {
    const selectedDay = selectedDays[day];
    setSelectedDays({
      ...selectedDays,
      [day]: !selectedDay
    });
  };

  const handleConfirm = () => {
    const selectedTimeRanges = Object.keys(selectedDays).filter(day => selectedDays[day]).map(day => ({
      day,
      startTime: selectedStartTime,
      endTime: selectedEndTime
    }));

    onConfirm(selectedTimeRanges);
    // Close the modal
    onCancel();
  };

  const generateTimeLabel = (hour, minute) => {
    const period = hour < 12 ? "AM" : "PM";
    const displayHour = hour % 12 || 12; // Convert 0 to 12 for 12-hour format
    return `${displayHour}:${minute === 0 ? "00" : minute} ${period}`;
  };
  const [fontsLoaded]=useFonts({
    'Roboto-Light':require("../assets/fonts/Roboto-Light.ttf"),
  })
  const {t}=useTranslation()

  return (
    <Modal isVisible={isVisible} onBackdropPress={onCancel}>
      <View style={styles.modalContainer}>
        <Text style={styles.headerText}>{t("Select Available Days and Time")}</Text>
        <View style={styles.calendar}>
          <View style={styles.daysContainer}>
            {daysOfWeek.map(day => (
              <TouchableOpacity key={day} onPress={() => handleDayPress(day)}>
                <Text style={[styles.day, selectedDays[day] && styles.selectedDay]}>{day}</Text>
              </TouchableOpacity>
            ))}
          </View>
          <View style={styles.timeRangeContainer}>
            <Text style={styles.timeRangeLabel}>{t("From")}:</Text>
            <Picker
              style={styles.picker}
              selectedValue={selectedStartTime}
              onValueChange={(itemValue) => setSelectedStartTime(itemValue)}
            >
              {Array.from({ length: 24 * 4 }, (_, i) => {
                const hour = Math.floor(i / 4);
                const minute = (i % 4) * 15;
                const time = generateTimeLabel(hour, minute);
                return <Picker.Item key={time} label={time} value={time} />;
              })}
            </Picker>
            <Text style={styles.timeSeparator}>{t("To")}:</Text>
            <Picker
              style={styles.picker}
              selectedValue={selectedEndTime}
              onValueChange={(itemValue) => setSelectedEndTime(itemValue)}
            >
              {Array.from({ length: 24 * 4 }, (_, i) => {
                const hour = Math.floor(i / 4);
                const minute = (i % 4) * 15;
                const time = generateTimeLabel(hour, minute);
                return <Picker.Item key={time} label={time} value={time} />;
              })}
            </Picker>
          </View>
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
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    padding: 20,
  },
  headerText: {
    fontSize: 18,
    marginBottom: 10,
    textAlign: 'center',
    fontFamily:"Roboto-Light"
  },
  calendar: {
    marginBottom: 20,
  },
  daysContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  day: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderWidth: 1,
    borderColor: '#DDDDDD',
    borderRadius: 5,
    fontFamily:"Roboto-Light"

  },
  selectedDay: {
    backgroundColor: 'coral',
    color: '#FFFFFF',
    fontFamily:"Roboto-Light"

  },
  timeRangeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  timeRangeLabel: {
    fontSize: 16,
    marginRight: 10,
    fontFamily:"Roboto-Light"

  },
  picker: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    borderRadius: 5,
    padding: 10,
    borderColor: '#206C00'
  },
  timeSeparator: {
    fontSize: 16,
    marginHorizontal: 10,
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
    fontFamily:"Roboto-Light"

  },
});
export default DateTimePickerModal;