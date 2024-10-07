import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const PopUpMenu = ({ visible, onClose, onGiveFeedback, onStartMeeting }) => {
  if (!visible) return null;

  return (
    <View style={styles.popupContainer}>
      <View style={styles.popupContent}>
        <TouchableOpacity onPress={onGiveFeedback}>
          <Text style={styles.popupText}>Give Feedback</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={onStartMeeting}>
          <Text style={styles.popupText}>Start Meeting</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={onClose}>
          <Text style={styles.popupText}>Close</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  popupContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  popupContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  popupText: {
    marginVertical: 10,
    fontSize: 16,
  },
});

export default PopUpMenu;
