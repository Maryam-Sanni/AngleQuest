import React from 'react';
import { View, Text, TouchableOpacity, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; 
import { useNavigation } from '@react-navigation/native';

const ConfirmationPopup = ({ visible, onClose, onConfirm, onDecline }) => {
    const navigation = useNavigation();
  
    const handleRejectSession = () => {
        navigation.navigate('Reject Session'); // Navigate to Reject Session screen
        onClose(); // Close the modal
    };

    const handleviewprofile = () => {
        navigation.navigate('Jobseekers Profile'); // Navigate to Jobseekers Profile screen
        onClose(); // Close the modal
    };

    return (
        <Modal visible={visible} animationType="fade" transparent>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)', marginRight: -1000 }}>
                <View style={{ backgroundColor: '#FFF', padding: 20, borderRadius: 5 }}>
                    <TouchableOpacity onPress={onClose} style={{ alignSelf: 'flex-end' }}>
                        <Text style={{ fontSize: 18, color:'#A2BE95' , marginBottom: 10, marginTop: -10 }}>
                            ✕
                        </Text>
                    </TouchableOpacity>
                    <View style={{ borderBottomWidth: 1, borderBottomColor: '#A2BE95', flex: 1, marginLeft: -20, marginRight: -20, marginBottom: 15 }} />
                    <TouchableOpacity onPress={onConfirm}>
                        <Text style={{ fontSize: 14, marginBottom: 15, color: 'black'}}>Add to Calendar
                            <Ionicons name="calendar" size={18} color="black" style={{ marginLeft: 15, textAlignVertical: 'center', marginTop: 2 }} />  {/* Confirm icon */}
                        </Text>
                    </TouchableOpacity>
                    <View style={{ borderBottomWidth: 1, borderBottomColor: '#CCC', flex: 1, marginLeft: -20, marginRight: -20, marginBottom: 10, marginTop: -5 }} />
                    <TouchableOpacity onPress={handleviewprofile}>
                        <Text style={{ fontSize: 14, color: 'black', marginBottom: 15, }}>View Profile  
                            <Ionicons name="person" size={18} color="black" style={{ marginLeft: 45, textAlignVertical: 'center' }} />{/* Decline icon */}
                        </Text>
                    </TouchableOpacity>
                    <View style={{ borderBottomWidth: 1, borderBottomColor: '#CCC', flex: 1, marginLeft: -20, marginRight: -20, marginBottom: 10, marginTop: -5 }} />
                    <TouchableOpacity onPress={handleRejectSession}>
                        <Text style={{ fontSize: 14, marginBottom: 5, color: 'darkred' }}>Reject Session 
                            <Ionicons name="trash" size={18} color="darkred" style={{ marginLeft: 30, textAlignVertical: 'center', marginBottom: -10 }} /> {/* Profile icon */}
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
};

export default ConfirmationPopup;
