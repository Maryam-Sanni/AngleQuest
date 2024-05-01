import React from 'react';
import { View, Modal, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const CustomModal = ({ visible, onClose }) => {
  const navigation = useNavigation();
  const goToProfile = () => {
    onClose(false); // Close the modal
    navigation.navigate('Basic Details');
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)'  }}>
        <View style={{ backgroundColor: 'white', padding: 20, borderRadius: 10 }}>
          <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 10 }}>Complete Your Profile</Text>
          <Text>Please complete your profile to unlock all features.</Text>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 }}>
            <TouchableOpacity onPress={goToProfile}  style={{ padding: 8, backgroundColor: 'coral', borderRadius: 5 }}>
              <Text style={{ color: 'white' }}>Complete Profile</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => onClose(false)} style={{ padding: 8, backgroundColor: 'white', borderRadius: 5, borderColor: 'coral', borderWidth: 1 }}>
              <Text style={{ color: 'coral' }}>Later</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default CustomModal;
