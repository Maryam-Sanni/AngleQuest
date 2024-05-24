import React, { useState, useEffect, useRef} from 'react';
import { View, Text, ScrollView, StyleSheet, Image, TouchableHighlight, TouchableOpacity, Modal, ImageBackground } from 'react-native';
import Topbar from '../components/topbar';
import Sidebar from '../components/sidebar';
import PastSessions from '../components/PastSessions';
import HubsAssignments from '../components/HubsAssignments';
import OpenModal from '../Jobseekers/Pickyourhub';
import { useNavigation } from '@react-navigation/native';


function MyComponent() { 
    const navigation = useNavigation();
    const [modalVisible, setModalVisible] = useState(false);

  
   

    const handleOpenPress = () => {
      setModalVisible(true);
    };
  
    const handleCloseModal = () => {
      setModalVisible(false);
    };


    return (
      <ImageBackground
    source={require ('../assets/Background.png') }
  style={{ height: '150%', width: '100%',flex: 1}}
>
        <View style={{ flex: 1 }}>
            <Topbar />
            <View style={{ flexDirection: 'row', flex: 1 }}>
                <Sidebar />
                <ScrollView contentContainerStyle={{ flexGrow: 1, maxHeight: 500 }}>
                    <View style={{ marginLeft: 270 }}>
                    <View style={styles.header}>
            <TouchableOpacity>
              <View style={styles.item}>
                <Image source={require('../assets/list.png')} style={styles.image} />
                <Text style={{color: 'black', fontWeight: '600', marginLeft: 10, fontSize: 16,  marginTop: 5}}>Hubs</Text>
                <Text style={{color: 'black', marginLeft: 15, color: '#206C00', borderColor: "#63EC55", borderWidth: 2, padding: 5, paddingHorizontal: 15, borderRadius: 5}}>SAP FI</Text>
                <Text style={{color: 'black', marginLeft: 15, marginTop: 5}}>Power Platform</Text>
              </View>
            </TouchableOpacity>
            </View>
                        <TouchableOpacity onPress={handleOpenPress}>
    <View style={{ justifyContent: "flex-start", paddingHorizontal: 10, paddingVertical: 10, borderRadius: 5, borderColor: "#f7fff4", backgroundColor: 'rgba(211,249,216,0.3)', width: 150, alignItems: 'center', marginTop: 20, marginLeft: 50, borderWidth: 1 }}>
                    <Text style={{ fontSize: 13, color: "#f7fff4", alignText: 'center', fontWeight: 'bold' }}>+ New</Text>
                  </View>
     </TouchableOpacity>

     <View style={styles.container}>
      <View style={styles.box}>
      <View style={{justifyContent: 'center', alignItems: 'center'}}>
      <Text style={{ fontSize: 18, color: "black", fontWeight: 'bold'}}>Next Hub Meeting</Text>
    <Text style={{ fontSize: 13, color: "grey", marginTop: 10}}>27/May/2024</Text>
    <Text style={{ fontSize: 13, color: "grey", marginTop: 5, fontWeight: '500'}}>2:00PM - 3:00PM</Text>
    <TouchableOpacity style={{  backgroundColor: 'none', padding: 8, paddingHorizontal: 10, marginTop: 10, borderRadius: 5, marginLeft: 10, marginRight: 10, borderWidth: 2, borderColor: '#206C00'}}>
          <Text style={{ color: '#206C00', textAlign: 'center', fontSize: 13, fontWeight: '600'}}>Join Now</Text>
          </TouchableOpacity>
          </View>
           </View>

      <View style={styles.box}>
        <Text style = {{fontSize: 14, color: 'black', fontWeight: 'bold', marginTop: 5, marginBottom: 10 }}>SAP FI Junior-Medior</Text>
           <Text style = {{fontSize: 12, marginTop: 5, color: 'black' }}>Integrating MM</Text>
           <Text style = {{fontSize: 12, marginTop: 5, color: 'black' }}>with Cost Account and</Text>
           <Text style = {{fontSize: 12, marginTop: 5, color: 'black' }}>other related topics</Text>
    
      </View>
     
      <View style={styles.box}> 
      <Text style = {{fontSize: 14, color: 'black', fontWeight: 'bold', marginTop: 5, marginBottom: 10 }}>Confirm Your attendance</Text>
        <View style={{flexDirection: 'row', marginTop: 10}}>
           <Text style = {{fontSize: 12, fontWeight: 'bold', marginRight: 10, color: '#206C00', borderColor: "#63EC55", borderWidth: 2, padding: 5, paddingHorizontal: 15, borderRadius: 5 }}>Yes, I will attend</Text>
           <Image source={require('../assets/teamicon.jpg')} style={styles.boximage}  />
     </View>
      </View>
      
      <View style={styles.box}>
      <Text style = {{fontSize: 14, color: 'black', fontWeight: 'bold', marginTop: 5, marginBottom: 5 }}>Confirmed Attendant</Text>
        <View style={{flexDirection: 'row'}}>
           <Text style = {{fontSize: 18, fontWeight: 'bold', color: '#206C00' }}>10</Text>
           <Image source={require('../assets/organization.png')} style={styles.boximage}  />
     </View>
     <Text style = {{fontSize: 14, color: 'black', fontWeight: 'bold', marginTop: 10, marginBottom: 5 }}>Unconfirmed</Text>
           <Text style = {{fontSize: 18, fontWeight: 'bold', color: '#206C00' }}>15</Text>
    </View>
    </View>

                        <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={handleCloseModal}
      >
          <View style={styles.modalContent}>
          <OpenModal onClose={() => handleCloseModal()} />
          </View>
      </Modal>
                       
                        <PastSessions />
                        <HubsAssignments />
                    </View>
                </ScrollView>
            </View>
        </View>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    modalContent: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        borderRadius: 10
      },
    header: {
        marginLeft: -60,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(225,225,212,0.3)',
        backgroundColor: '#f7fff4',
    },
    item: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginRight: 10, 
    }, 
    headertext: {
        marginLeft: 10,
        fontSize: 14,
        fontWeight: 'normal',
        marginTop: 7, 
        color: 'black'
    },
    image: {
        width: 24,
        height: 24,
        marginRight: 5,
        marginLeft: 100,
        marginTop: 5
    },
    container: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        marginLeft: 40, marginRight: 50, marginTop: 50
      },
      box: {
        backgroundColor: '#f7fff4',
        padding: 20,
        borderRadius: 20,
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        width: '22%',
        height: 150,
        borderWidth: 2, borderColor: 'rgba(225,225,212,0.3)',
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
      },
      boximage: {
        width: 30,
        height: 30,
        position: 'absolute',
        left: 130,
        borderRadius: 25
      },
});

export default MyComponent;
