import React from 'react';
import { View, Text, TouchableOpacity, Modal, Image } from 'react-native'; 
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
                    <View style={{ flexDirection: 'row'}}>
                        <Text style={{ fontSize: 14, marginBottom: 15, color: 'black'}}>Add to Calendar </Text>
                        <Image
       source={require('../assets/calendar.png')}
        style={{
          width: 18,
          height: 18,
          marginLeft: 10
      }}
      />     
      </View>
                    </TouchableOpacity>
                    
                    <View style={{ borderBottomWidth: 1, borderBottomColor: '#CCC', flex: 1, marginLeft: -20, marginRight: -20, marginBottom: 10, marginTop: -5 }} />
                    <TouchableOpacity onPress={handleviewprofile}>
                    <View style={{ flexDirection: 'row'}}>
                        <Text style={{ fontSize: 14, color: 'black', marginBottom: 15, }}>View Profile  
                        <Image
       source={require('../assets/person.png')}
        style={{
          width: 22,
          height: 22,
          marginLeft: 40
      }}
      />   
                        </Text>
                        </View>
                    </TouchableOpacity>
                    <View style={{ borderBottomWidth: 1, borderBottomColor: '#CCC', flex: 1, marginLeft: -20, marginRight: -20, marginBottom: 10, marginTop: -5 }} />
                    <TouchableOpacity onPress={handleRejectSession}>
                        <Text style={{ fontSize: 14, marginBottom: 5, color: 'darkred' }}>Reject Session 
                          <Image
       source={require('../assets/delete.png')}
        style={{
          width: 15,
          height: 15,
          marginLeft: 30
      }}
      />  
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
};

export default ConfirmationPopup;
