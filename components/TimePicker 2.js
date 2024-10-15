import React, { useState } from "react";
import { View, Text, TouchableOpacity, Picker, StyleSheet, TextInput } from "react-native";
import { useTranslation } from 'react-i18next';

const DaysTimePickerModal = ({ isVisible, onConfirm, onCancel }) => {
  const [inputDate, setInputDate] = useState(""); // Store user input date
  const [dayOfWeek, setDayOfWeek] = useState(""); // Day of the week based on input date
  const [startTime, setStartTime] = useState({ hour: "01", minute: "00", period: "AM" });
  const [endTime, setEndTime] = useState({ hour: "02", minute: "00", period: "PM" });

  const { t } = useTranslation();

  const handleDateChange = (dateString) => {
    setInputDate(dateString);
    const date = new Date(dateString);
    // Get day of the week (0 = Sunday, 6 = Saturday)
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    setDayOfWeek(days[date.getUTCDay()]); // Update dayOfWeek state
  };

  const handleConfirm = () => {
    // Convert the input date to a valid date format
    const date = new Date(inputDate);
    if (!isNaN(date) && dayOfWeek) {
      // Construct the full date-time strings for start and end times
      const startDateTime = new Date(date);
      startDateTime.setHours(parseInt(startTime.hour) + (startTime.period === "PM" ? 12 : 0));
      startDateTime.setMinutes(parseInt(startTime.minute));

      const endDateTime = new Date(date);
      endDateTime.setHours(parseInt(endTime.hour) + (endTime.period === "PM" ? 12 : 0));
      endDateTime.setMinutes(parseInt(endTime.minute));

      // Pass the date and time to the onConfirm callback
      onConfirm({ date: date.toISOString().split("T")[0], startDateTime, endDateTime });
    } else {
      alert('Please enter a valid date.');
    }
  };

  return (
    <View style={styles.modalContainer}>
      <Text style={{ marginBottom: 30, fontSize: 20, fontWeight: 'bold' }}>{t("Choose Availability")}</Text>

      <Text style={styles.headerText}>{t("Enter a Date (YYYY-MM-DD)")}</Text>
      <TextInput
        style={styles.dateInput}
        placeholder="YYYY-MM-DD"
        value={inputDate}
        onChangeText={handleDateChange}
      />

      {dayOfWeek ? (
        <Text style={styles.dayOfWeekText}>{t("Day of the Week:")} {dayOfWeek}</Text>
      ) : null}

      <Text style={styles.headerText}>{t("Time Slot")}</Text>
      <View style={styles.timePickerContainer}>
        <TimePicker
          label={t("Start")}
          time={startTime}
          onTimeChange={setStartTime}
        />
        <Text style={styles.toText}>{t("to")}</Text>
        <TimePicker
          label={t("End")}
          time={endTime}
          onTimeChange={setEndTime}
          onConfirm={handleConfirm}
        />
      </View>

     
    </View>
  );
};

const TimePicker = ({ label, time, onTimeChange, onConfirm }) => {
  const handleTimeChange = (newTime) => {
    onTimeChange(newTime);
    // Call onConfirm if the end time is set (you can modify this condition based on your logic)
    if (label === "End") {
      const date = new Date(); // Replace with your actual date input
      onConfirm({ date, startDateTime: new Date(date.setHours(parseInt(time.hour), parseInt(time.minute), 0)), endDateTime: new Date(date.setHours(parseInt(newTime.hour), parseInt(newTime.minute), 0)) });
    }
  };

  return (
    <View style={styles.singleTimePicker}>
      <Text style={styles.timeLabel}>{label}</Text>
      <View style={styles.timePickerRow}>
        <Picker
          style={styles.hourPicker}
          selectedValue={time.hour}
          onValueChange={(hour) => handleTimeChange({ ...time, hour })}
        >
          {generateHours().map((hour, index) => (
            <Picker.Item key={index} label={hour} value={hour} />
          ))}
        </Picker>
        <Text style={styles.colonText}>:</Text>
        <Picker
          style={styles.minutePicker}
          selectedValue={time.minute}
          onValueChange={(minute) => handleTimeChange({ ...time, minute })}
        >
          {generateMinutes().map((minute, index) => (
            <Picker.Item key={index} label={minute} value={minute} />
          ))}
        </Picker>
        <Picker
          style={styles.periodPicker}
          selectedValue={time.period}
          onValueChange={(period) => handleTimeChange({ ...time, period })}
        >
          {["AM", "PM"].map((period, index) => (
            <Picker.Item key={index} label={period} value={period} />
          ))}
        </Picker>
      </View>
    </View>
  );
};


const generateHours = () => {
  const hours = [];
  for (let i = 1; i <= 12; i++) {
    const hourString = i < 10 ? `0${i}` : `${i}`;
    hours.push(hourString);
  }
  return hours;
};

const generateMinutes = () => {
  return ["00", "15", "30", "45"];
};

const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: "#F5F5F5",
    borderRadius: 20,
    padding: 20,
    width: 600,
    height: 250,
  },
  headerText: {
    fontSize: 12,
    fontStyle: 'italic',
    marginLeft: 5,
    textAlign: 'flex-start',
    fontWeight: '600',
  },
  dateInput: {
    height: 40,
    borderColor: '#206C00',
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
    marginBottom: 10,
  },
  dayOfWeekText: {
    fontSize: 14,
    marginBottom: 10,
  },
  timePickerContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    marginBottom: 5,
    marginTop: 5,
    marginLeft: 10,
  },
  singleTimePicker: {
    alignItems: 'flex-start',
  },
  timePickerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  hourPicker: {
    width: 60,
    height: 30,
    fontSize: 13,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#206C00',
  },
  timeLabel: {
    fontSize: 12,
  },
  minutePicker: {
    width: 60,
    height: 30,
    fontSize: 13,
    marginRight: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#206C00',
  },
  periodPicker: {
    width: 80,
    height: 30,
    fontSize: 13,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#206C00',
  },
  colonText: {
    fontSize: 18,
    marginHorizontal: 5,
  },
  toText: {
    marginHorizontal: 20,
    fontSize: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    marginLeft: 10,
  },
  button: {
    width: 80,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'coral',
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
  },
});

export default DaysTimePickerModal;
