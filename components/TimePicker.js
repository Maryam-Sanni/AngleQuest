import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Picker, StyleSheet } from "react-native";
import Modal from "react-native-modal";
import { useTranslation } from 'react-i18next';
import { formatInTimeZone } from 'date-fns-tz';

const DaysTimePickerModal = ({ isVisible, onConfirm, onCancel }) => {
  const [selectedDays, setSelectedDays] = useState([]);
  const [startTime, setStartTime] = useState({ hour: "01", minute: "00", period: "AM" });
  const [endTime, setEndTime] = useState({ hour: "02", minute: "00", period: "AM" });

  const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  // Get user's timezone
  const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  // Get the current date and time
  const now = new Date();

  // Format the date directly in the user's timezone
  const formattedDate = formatInTimeZone(now, userTimezone, 'yyyy-MM-dd HH:mm:ssXXX');

  // Get the UTC offset in hours
  const utcOffset = now.getTimezoneOffset() / -60; // getTimezoneOffset returns minutes

  console.log(`User Timezone: ${userTimezone}`);
  console.log(`Current Time in User Timezone: ${formattedDate}`);
  console.log(`UTC Offset: ${utcOffset} hours`);

  const toggleDaySelection = (day) => {
    setSelectedDays((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
    );
  };

  const [previousState, setPreviousState] = useState({
    selectedDays: [],
    startTime: { hour: "01", minute: "00", period: "AM" },
    endTime: { hour: "02", minute: "00", period: "AM" },
  });
  
  // Automatically trigger handleConfirm when any state changes
  useEffect(() => {
    const currentState = { selectedDays, startTime, endTime };
    if (JSON.stringify(currentState) !== JSON.stringify(previousState)) {
      handleConfirm(); // Call the confirm logic
      setPreviousState(currentState); // Update the previous state
    }
  }, [selectedDays, startTime, endTime]); // Dependencies: Runs when these change
  
  const handleConfirm = () => {
    onConfirm({ selectedDays, startTime, endTime });
  };

  const { t } = useTranslation();

  return (
      <View style={styles.modalContainer}>
        <Text style={{ marginBottom: 5, fontSize: 20, fontWeight: 'bold'}}>{t("Choose Availability")}</Text>
        <Text style={{ marginBottom: 30, fontSize: 14}}>{t("Select the days and time that you will be available to attend to member of AngleQuest that needs your service.")}</Text>
        <Text style={styles.headerText}>{t("Days of the week")}</Text>
        <View style={styles.daysContainer}>
          {daysOfWeek.map((day) => (
            <TouchableOpacity
              key={day}
              style={[
                styles.dayButton,
                selectedDays.includes(day) && styles.dayButtonSelected,
              ]}
              onPress={() => toggleDaySelection(day)}
            >
              <Text style={[
                  styles.dayText,
                  selectedDays.includes(day) && styles.dayTextSelected,
                ]}>{t(day)}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <Text style={styles.headerText}>{t("Time Slot")}</Text>
        <View style={styles.timePickerContainer}>
          <TimePicker
            label={t("Start")}
             style={styles.label}
            time={startTime}
            onTimeChange={setStartTime}
          />
          <Text style={styles.toText}>{t(" ")}</Text>
          <TimePicker
            label={t("End")}
            time={endTime}
            onTimeChange={setEndTime}
            onConfirm={handleConfirm}
          />
        </View>

        {/* Display user's timezone */}
        <Text style={styles.headerText}>{t("Time Zone")}</Text>
        <View style={styles.ZonePicker}>
        <Text style={styles.timezoneText}>{userTimezone}</Text>
        </View>
        
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={handleConfirm}>
            <Text style={styles.buttonText}>{t("Confirm")}</Text>
          </TouchableOpacity>
        </View>
      </View>
  );
};

const TimePicker = ({ label, time, onTimeChange, onConfirm }) => {
  const handleTimeChange = (newTime) => {
    onTimeChange(newTime);
  };

  const handlePeriodChange = (period) => {
    const newTime = { ...time, period };
    onTimeChange(newTime);
    handleConfirm(newTime); 
  };
  
  const handleConfirm = (currentTime) => {
    const date = new Date(); // Replace with your actual date input
    onConfirm({
      date,
      startDateTime: new Date(date.setHours(parseInt(currentTime.hour), parseInt(currentTime.minute), 0)),
      endDateTime: new Date(date.setHours(parseInt(currentTime.hour), parseInt(currentTime.minute), 0)),
    });
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
          onValueChange={handlePeriodChange} // Call the new handler for period change
        >
          {["AM", "PM"].map((period, index) => (
            <Picker.Item key={index} label={period} value={period} />
          ))}
        </Picker>
      </View>

      {/* Hidden confirm button */}
      <TouchableOpacity
        style={styles.hiddenButton} // Style it to be hidden
        onPress={() => handleConfirm(time)} // Ensure it uses the latest state
        accessibilityLabel="Confirm Time Selection"
      />
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
    height: 400
  },
  headerText: {
    fontSize: 12,
    fontStyle: 'italic',
    marginLeft: 5,
    textAlign: 'flex-start',
    fontWeight: '600',
  },
  daysContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    marginBottom: 20,
  },
  dayButton: {
    margin: 5,
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#DDDDDD',
  },
  dayButtonSelected: {
    backgroundColor: '#206C00',
  },
  dayText: {
    color: '#000000',
  },
  dayTextSelected: {
    color: 'white',
  },
  timePickerContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    marginBottom: 5,
    marginTop: 5,
    marginLeft: 10
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
    justifyContent: 'flex-start',
    marginBottom: 20,
    marginLeft: 10
  },
  button: {
    width: 80,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'grey',
    borderRadius: 5,
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
    color: 'white',
  },
  timezoneText: {
    fontSize: 14,
    fontWeight: '500',
  },
  ZonePicker: {
    width: 200,
    height: 30,
    borderRadius: 5,
    padding: 5,
    borderWidth: 1,
    backgroundColor: 'white',
      borderColor: '#206C00',
    marginBottom: 20,
    marginLeft: 10
  },
});

export default DaysTimePickerModal;
