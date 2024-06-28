import React, { useState, useEffect, useRef} from 'react';
import { View, Text, ScrollView, StyleSheet, Image, TouchableOpacity, Modal, ImageBackground } from 'react-native';
import Topbar from '../components/topbar';
import Sidebar from '../components/Managersidebar';
import EmployeeStats from '../components/TargetStats';
import { useNavigation } from '@react-navigation/native';
import CustomPercentageChart from '../components/PercentageChart';
import OpenModal from './NewTarget';

import {useFonts} from "expo-font"


function MyComponent() { 
    const navigation = useNavigation();
    const [modalVisible, setModalVisible] = useState(false);
  
  const handleOpenPress = () => {
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  const [fontsLoaded]=useFonts({
    'Varta-Light':require("../assets/fonts/Varta-Light.ttf"),
"Roboto-Light":require("../assets/fonts/Roboto-Light.ttf"),
  })

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
              <Image
  source={{ uri: 'https://cdn.builder.io/api/v1/image/assets/TEMP/fa3093fa6656295c8b39535a911908d6555a356fccce78af145fec472c4bd154?apiKey=7b9918e68d9b487793009b3aea5b1a32&' }}
  style={styles.image}
/>
                <Text style={styles.headertext}>Employee Targets</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleOpenPress}>
    <View style={{ position: 'absolute', right: 30, paddingHorizontal: 8, paddingVertical: 8, borderRadius: 5, backgroundColor: 'coral', width: 100, alignItems: 'center',}}>
                    <Text style={{ fontSize: 13, color: "white", alignText: 'center', fontWeight: '600' }}>+ New</Text>
                  </View>
     </TouchableOpacity>
            </View>    

    

                       
                        <EmployeeStats />
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
        justifyContent: 'space-between',
        alignItems: 'space-between',
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(225,225,212,0.3)',
        backgroundColor: '#f7fff4',
    },
    item: {
        flexDirection: 'row',
        alignItems: 'space-between',
    }, 
    headertext: {
      marginLeft: 5,
      fontSize: 14,
      fontWeight: '500',
      marginTop: 5,
      color: '#666',
      fontFamily:"Roboto-Light"
    },
    image: {
      width: 21,
      height: 21,
      marginRight: 5,
      marginTop: 5,
      marginLeft: 100
    },
    container: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        marginLeft: 40, marginRight: 50, marginTop: 20
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
