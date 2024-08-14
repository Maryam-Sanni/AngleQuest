import React, { useState } from "react";
import { View, Text, TouchableOpacity, Picker, StyleSheet, Image } from "react-native";
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
        <Text style={styles.headerText}>{t("What day & time works best for you?")}</Text>
        <Calendar
          onDayPress={handleDayPress}
          markedDates={{
            [selectedDate]: { selected: true },
            [new Date().toISOString().split('T')[0]]: {
              marked: true,
              dotColor: 'green',
            },
          }}
          minDate={new Date().toISOString().split('T')[0]} // Disable past dates
          style={styles.calendar}
          theme={{
            selectedDayBackgroundColor: '#135837',
            selectedDayTextColor: '#FFFFFF',
            todayTextColor: 'green',
            todayTextFontWeight: 'bold',
            arrowColor: 'black',
            textSectionTitleColor: 'black',
            dotColor: '#135837', 
            textDayHeaderFontFamily: 'Roboto-Light',
            textMonthFontWeight: '500',
          }}
        />

        <View style={styles.timePickerContainer}>
          <Image
            source={{ uri: 'https://img.icons8.com/?size=100&id=9&format=png&color=000000' }}
            style={{ width: 30, height: 30, marginLeft: 30, marginRight: 20 }}
          />
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
          <TouchableOpacity style={styles.buttoncancel} onPress={onCancel}>
            <Text style={styles.buttonText}>{t("Cancel")}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, { backgroundColor: '#135837' }]} onPress={handleConfirm}>
            <Text style={[styles.buttonText, { color: '#FFFFFF' }]}>{t("Apply")}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    alignSelf: 'center',
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    width: 700
  },
  headerText: {
    fontSize: 18,
    marginBottom: 10,
    textAlign: 'center',
    fontWeight: '600'
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
    backgroundColor: 'white',
    borderRadius: 5,
    padding: 10,
    borderColor: 'black'
  },
  timeSeparator: {
    fontSize: 18,
    fontFamily:"Roboto-Light"
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    justifyContent: 'flex-end'
  },
  button: {
     width: 100,
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#DDDDDD',
    marginHorizontal: 5,
  },
  buttoncancel: {
    width: 100,
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#135837',
    marginHorizontal: 5,
  },
  buttonText: {
    fontSize: 16,
    fontFamily:"`Roboto-Light"
  },
});

export default DateTimePickerModal;
