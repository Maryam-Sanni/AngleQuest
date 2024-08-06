import React, { useState, useEffect, useRef} from 'react';
import { View, Text, ScrollView, StyleSheet, Image, TouchableHighlight, TouchableOpacity, Modal, ImageBackground } from 'react-native';
import Topbar from '../components/topbar';
import Sidebar from '../components/sidebar';
import ScheduledAdvice from '../components/ScheduledAdvSess';
import CompletedAdvice from '../components/CompletedAdvSess';
import OpenModal from '../Jobseekers/Pickexpertadv';
import { useNavigation } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { useTranslation } from 'react-i18next';

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
      "Roboto-Light":require("../assets/fonts/Roboto-Light.ttf"),
        })      
        const {t}=useTranslation()
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
                <Text style={{color: 'black', fontWeight: '600', marginLeft: 10, fontSize: 16,  marginTop: 5,fontFamily:"Roboto-Light"}}>{t("Skill Analysis")}</Text>
                </View>
            </TouchableOpacity>
            </View>
                        <TouchableOpacity onPress={handleOpenPress}>
    <View style={{ justifyContent: "flex-start", paddingHorizontal: 10, paddingVertical: 10, borderRadius: 5, borderColor: "#f7fff4", backgroundColor: 'rgba(211,249,216,0.3)', width: 150, alignItems: 'center', marginTop: 20, marginLeft: 50, borderWidth: 1 }}>
                    <Text style={{ fontSize: 13, color: "#f7fff4", alignText: 'center', fontWeight: 'bold',fontFamily:"Roboto-Light" }}>+ {t("New")}</Text>
                  </View>
     </TouchableOpacity>

     <View style={styles.container}>
      <View style={styles.box}>
      <View style={{justifyContent: 'center', alignItems: 'center'}}>
      <Text style={{ fontSize: 16, color: "black", fontWeight: 'bold',fontFamily:"Roboto-Light"}}>{t("Next Meeting")}</Text>
    <Text style={{ fontSize: 13, color: "grey", marginTop: 10,fontFamily:"Roboto-Light"}}>27/May/2024</Text>
    <Text style={{ fontSize: 13, color: "grey", marginTop: 5, fontWeight: '500',fontFamily:"Roboto-Light"}}>2:00PM - 3:00PM</Text>
    <TouchableOpacity style={{  backgroundColor: 'none', padding: 8, paddingHorizontal: 10, marginTop: 10, borderRadius: 5, marginLeft: 10, marginRight: 10, borderWidth: 2, borderColor: '#206C00'}}>
          <Text style={{ color: '#206C00', textAlign: 'center', fontSize: 13, fontWeight: '600',fontFamily:"Roboto-Light"}}>{t("Join Now")}</Text>
          </TouchableOpacity>
          </View>
           </View>

      <View style={styles.box}>
        <Text style = {{fontSize: 16, color: 'black', fontWeight: 'bold', marginTop: 5, marginBottom: 5,fontFamily:"Roboto-Light" }}>SAP FI </Text>
        <View style={{flexDirection: 'row'}}>
           <Text style = {{fontSize: 14, color: 'black',fontFamily:"Roboto-Light" }}>{t("Career Change")}</Text>
           <Image source={require('../assets/traffic-sign.png')} style={styles.boximage}  />
      </View>
     </View>

      <View style={styles.box}> 
      <Text style = {{fontSize: 16, color: 'black', fontWeight: 'bold', marginTop: 5, marginBottom: 5,fontFamily:"Roboto-Light" }}>{t("Description")}</Text>
      <Text style = {{fontSize: 12, color: 'black',fontFamily:"Roboto-Light", textAlign: 'center' }}>{t("I want to change from a data analyst to an SAP FI consultant")}</Text>
      </View>
      
      <View style={styles.box}>
        <View style={{flexDirection: 'row' }}>
        <Image
              source={{ uri: 'https://cdn.builder.io/api/v1/image/assets/TEMP/96214782d7fee94659d7d6b5a7efe737b14e6f05a42e18dc902e7cdc60b0a37b' }}
              style={{ width: 40, height: 40, aspectRatio: 1, }}
            />
            <Text style = {{fontSize: 12, color: 'black', marginLeft: 5, marginTop: 10, fontWeight: '500', fontFamily:"Roboto-Light" }}>{t("Coach")} Joop Melcher</Text>
            </View>
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
                       
                        <ScheduledAdvice />
                        <CompletedAdvice />
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
        alignItems: 'center',
        justifyContent: 'center',
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
        marginTop: 10,
        borderRadius: 25
      },
});

export default MyComponent;
