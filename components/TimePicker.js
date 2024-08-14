import React, { useState } from "react";
import { View, Text, TouchableOpacity, Picker, StyleSheet } from "react-native";
import Modal from "react-native-modal";
import { useTranslation } from 'react-i18next';

const DaysTimePickerModal = ({ isVisible, onConfirm, onCancel }) => {
  const [selectedDays, setSelectedDays] = useState([]);
  const [startTime, setStartTime] = useState({ hour: "01", minute: "00", period: "AM" });
  const [endTime, setEndTime] = useState({ hour: "02", minute: "00", period: "PM" });

  const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  const toggleDaySelection = (day) => {
    setSelectedDays((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
    );
  };

  const handleConfirm = () => {
    onConfirm({ selectedDays, startTime, endTime });
  };

  const { t } = useTranslation();

  return (
    <Modal isVisible={isVisible} onBackdropPress={onCancel}>
      <View style={styles.modalContainer}>
        <Text style={styles.headerText}>{t("Select Days and Time")}</Text>
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
              <Text style={styles.dayText}>{t(day)}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <View style={styles.timePickerContainer}>
          <TimePicker
            label={t("Start Time")}
             style={styles.label}
            time={startTime}
            onTimeChange={setStartTime}
          />
          <Text style={styles.toText}>{t("to")}</Text>
          <TimePicker
            label={t("End Time")}
            style={styles.label}
            time={endTime}
            onTimeChange={setEndTime}
          />
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.buttoncancel} onPress={onCancel}>
            <Text style={{color: 'black'}}>{t("Cancel")}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={handleConfirm}>
            <Text style={styles.buttonText}>{t("Confirm")}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const TimePicker = ({ label, time, onTimeChange }) => {
  return (
    <View style={styles.singleTimePicker}>
      <Text style={styles.timeLabel}>{label}</Text>
      <View style={styles.timePickerRow}>
        <Picker
          style={styles.hourPicker}
          selectedValue={time.hour}
          onValueChange={(hour) => onTimeChange({ ...time, hour })}
        >
          {generateHours().map((hour, index) => (
            <Picker.Item key={index} label={hour} value={hour} />
          ))}
        </Picker>
        <Text style={styles.colonText}>:</Text>
        <Picker
          style={styles.minutePicker}
          selectedValue={time.minute}
          onValueChange={(minute) => onTimeChange({ ...time, minute })}
        >
          {generateMinutes().map((minute, index) => (
            <Picker.Item key={index} label={minute} value={minute} />
          ))}
        </Picker>
        <Picker
          style={styles.periodPicker}
          selectedValue={time.period}
          onValueChange={(period) => onTimeChange({ ...time, period })}
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
    alignSelf: 'center',
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    width: 600,
    height: 300
  },
  headerText: {
    fontSize: 18,
    marginBottom: 10,
    textAlign: 'center',
    fontWeight: '600',
  },
  daysContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: 20,
    marginTop: 10
  },
  dayButton: {
    margin: 5,
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#DDDDDD',
  },
  dayButtonSelected: {
    backgroundColor: '#135837',
  },
  dayText: {
    color: '#000000',
  },
  timePickerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 20
  },
  singleTimePicker: {
    alignItems: 'center',
  },
  timePickerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  hourPicker: {
    width: 60,
    height: 30,
    borderRadius: 5,
    borderWidth: 1,
      borderColor: '#135837',
  },
  label: {
    marginBottom: 10,
    fontSize: 16
  },
  minutePicker: {
    width: 60,
    height: 30,
    marginRight: 10,
    borderRadius: 5,
    borderWidth: 1,
      borderColor: '#135837',
  },
  periodPicker: {
    width: 80,
    height: 30,
    borderRadius: 5,
    borderWidth: 1,
      borderColor: '#135837',
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
    justifyContent: 'flex-end',
  },
  button: {
    width: 100,
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#135837',
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
    color: '#FFFFFF',
  },
});

export default DaysTimePickerModal;
