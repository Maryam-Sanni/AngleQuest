import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Picker, StyleSheet, Image } from "react-native";
import Modal from "react-native-modal";
import { Calendar } from "react-native-calendars";
import { useFonts } from "expo-font";
import { useTranslation } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';

const DateTimePickerModal = ({ isVisible, onConfirm, onCancel }) => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedHour, setSelectedHour] = useState("01");
  const [selectedMinute, setSelectedMinute] = useState("00");
  const [selectedPeriod, setSelectedPeriod] = useState("AM");
  const [availableDays, setAvailableDays] = useState([]);
  const [availableTimes, setAvailableTimes] = useState({});
  const [StoredTimes, setStoredTimes] = useState({});
  const [pressedDay, setPressedDay] = useState(null);
  const [availabilityNotice, setAvailabilityNotice] = useState("");

  useEffect(() => {
    const fetchAvailability = async () => {
      try {
        const storedDays = await AsyncStorage.getItem('selectedUserDays');
        const storedTimes = await AsyncStorage.getItem('selectedUserTimes');

        console.log('Stored Days:', storedDays);
        console.log('Stored Times:', storedTimes);

        if (storedDays) {
          // Check if the storedDays is in the format with commas or spaces
          const daysArray = storedDays.includes(',') 
            ? storedDays.split(',').map(day => day.trim()) // Split by commas if days are comma-separated
            : storedDays.split(' ').map(day => day.trim()); // Split by spaces if days are space-separated

          setAvailableDays(daysArray);
        }

        if (storedTimes) {
          const times = storedTimes.split(';').map(range => range.trim());
          console.log('Parsed Times:', times);
          setAvailableTimes({ '*': times });
          setStoredTimes(storedTimes);
        }
      } catch (error) {
        console.error('Error fetching availability:', error);
      }
    };

    fetchAvailability();
  }, []);




  const handleDayPress = (day) => {
    if (isDayAvailable(day.dateString)) {
      setPressedDay(day.dateString);
      setSelectedDate(day.dateString);
      setSelectedHour("01");
      setSelectedMinute("00");
      setSelectedPeriod("AM");
      setAvailabilityNotice("");  // Clear notice when a new date is selected
    }
  };

  const handleConfirm = () => {
    console.log('handleConfirm function called'); // Ensure this line shows in console

    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const dayOfWeek = days[new Date(selectedDate).getDay()];

    const hour = selectedPeriod === "AM" 
      ? parseInt(selectedHour, 10) % 12 
      : (parseInt(selectedHour, 10) % 12) + 12;
    const selectedTime24Hour = `${hour < 10 ? '0' + hour : hour}:${selectedMinute.padStart(2, '0')}`;

    const convertTo24Hour = (timeStr) => {
      const [time, period] = timeStr.split(' ');
      const [hour, minute] = time.split(':').map(Number);

      let hour24 = hour;
      if (period === 'AM') {
        if (hour === 12) hour24 = 0; // Midnight case
      } else {
        if (hour !== 12) hour24 = hour + 12; // PM case, except for noon
      }

      return `${hour24 < 10 ? '0' + hour24 : hour24}:${minute < 10 ? '0' + minute : minute}`;
    };


    const isTimeAvailable = () => {
      const availableRanges = availableTimes['*'] || []; // Check for wildcard entry
      console.log('Available Ranges:', availableRanges);

      return availableRanges.some(range => {
        const [startTime, endTime] = range.split(' - ');

        const startTime24 = convertTo24Hour(startTime);
        const endTime24 = convertTo24Hour(endTime);

        console.log('Selected Time (24-hour):', selectedTime24Hour);
        console.log('Start Time (24-hour):', startTime24);
        console.log('End Time (24-hour):', endTime24);

        return selectedTime24Hour >= startTime24 && selectedTime24Hour <= endTime24;
      });
    };


    if (!isTimeAvailable()) {
      setAvailabilityNotice(t("Please choose a time between the available time for this expert."));
      return;
    }

    setAvailabilityNotice("");  
    const time = `${selectedHour}:${selectedMinute} ${selectedPeriod}`;
    const dateTimeWithTimeZone = `${dayOfWeek}, ${selectedDate} ${time}`;
    onConfirm(dateTimeWithTimeZone);
  };




  const [fontsLoaded] = useFonts({
    'Roboto-Light': require("../assets/fonts/Roboto-Light.ttf"),
  });

  const { t } = useTranslation();

  const isDayAvailable = (day) => {
    const dayOfWeek = new Date(day).toLocaleDateString('en-US', { weekday: 'short' });
    return availableDays.includes(dayOfWeek);
  };

  const getAvailableTimes = () => {
    if (selectedDate) {
      return availableTimes[selectedDate] || [];
    }
    return [];
  };

  const generateAllTimes = () => {
    const allTimes = [];
    for (let hour = 1; hour <= 12; hour++) {
      for (let minute = 0; minute < 60; minute += 5) {
        const timeString = `${hour < 10 ? '0' + hour : hour}:${minute < 10 ? '0' + minute : minute}`;
        allTimes.push(`${timeString} AM`);
        allTimes.push(`${timeString} PM`);
      }
    }
    return allTimes;
  };

  const today = new Date().toISOString().split('T')[0];

  return (
    <Modal isVisible={isVisible} onBackdropPress={onCancel}>
      <View style={styles.modalContainer}>
        <Text style={styles.headerText}>{t("What day between")} {availableDays.join(', ')} {StoredTimes} {t("works best for you?")}</Text>
            <Calendar
              onDayPress={handleDayPress}
              markedDates={{
                [selectedDate]: { selected: true },
                [today]: {
                  marked: true,
                  dotColor: 'green',
                },
              }}
              minDate={new Date().toISOString().split('T')[0]} // Disable past dates
              style={styles.calendar}
              dayComponent={({ date }) => {
                const isAvailable = isDayAvailable(date.dateString);
                const todayDate = new Date().toISOString().split('T')[0];
                const isPastDate = new Date(date.dateString) < new Date(todayDate);

            return (
              <TouchableOpacity
                style={[
                  styles.dayWrapper,
                  !isAvailable && styles.unavailableDay,
                  isPastDate && styles.pastDay
                ]}
                onPress={() => isAvailable && !isPastDate && handleDayPress(date)}
                disabled={isPastDate} // Disable past dates
              >
                <Text style={[
                  styles.dayText,
                  !isAvailable && styles.unavailableDayText,
                  isPastDate && styles.pastDayText,
                  pressedDay === date.dateString && styles.pressedDayText
                ]}>
                  {date.day}
                </Text>
              </TouchableOpacity>
            );
          }}
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

        {availabilityNotice ? (
          <Text style={styles.availabilityNotice}>{availabilityNotice}</Text>
        ) : null}

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
  dayWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
    width: 40,
  },
  unavailableDay: {
    opacity: 0.3,
  },
  unavailableDayText: {
    textDecorationLine: 'line-through',
    color: 'gray',
  },
  pressedDayText: {
    color: 'white', 
    backgroundColor: 'green',
    width: 21,
    height: 21,
    borderRadius: 15,
    textAlign: 'center',
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
    fontWeight: 'bold',
    marginRight: 10,
    marginLeft: 5
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
    backgroundColor: '#DDDDDD',
    marginHorizontal: 5,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600'
  },
  availabilityNotice: {
    color: 'red',
    fontSize: 16,
    marginBottom: 10,
    textAlign: 'center'
  },
  pastDay: {
    opacity: 0.5,
  },
  pastDayText: {
    textDecorationLine: 'line-through',
    color: 'gray',
  },
});

export default DateTimePickerModal;
