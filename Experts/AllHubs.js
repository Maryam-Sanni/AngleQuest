import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, Image, TouchableOpacity, Modal, ImageBackground } from 'react-native';
import Topbar from '../components/expertstopbar';
import Sidebar from '../components/expertssidebar';
import { useNavigation } from '@react-navigation/native';
import OpenModal from '../components/Createhubform';
import OpenModal2 from '../components/Edithubform';
import ConfirmationPopup from '../Experts/OtherHubs';
import { BlurView } from 'expo-blur';
import OpenModal4 from './SetMeet';
import OpenModal5 from './Assignment';
import { useTranslation } from 'react-i18next';
import {useFonts} from "expo-font"


function MyComponent() {
    const navigation = useNavigation();
    const [modalVisible, setModalVisible] = useState(false);
    const [isFirstHubsHovered, setIsFirstHubsHovered] = useState(false);
    const [modalVisible4, setModalVisible4] = useState(false);
    const [isThirdHubsHovered, setIsThirdHubsHovered] = useState(false);
    const [modalVisible2, setModalVisible2] = useState(false);
    const [modalVisible3, setModalVisible3] = useState(false);
    const [isAllHovered, setIsAllHovered] = useState(false);
    

      const goToMyHubs = () => {
        navigation.navigate('All Hubs');
      };

      const handleOthersPress = () => {
        setModalVisible2(true);
      };
    
      const handleCloseModal2 = () => {
        setModalVisible2(false);
      };

      const handleOpenPress = () => {
        setModalVisible(true);
      };
    
      const handleCloseModal = () => {
        setModalVisible(false);
      };

    const handleOpenPress2 = () => {
      setModalVisible3(true);
    };
  
    const handleCloseModal3 = () => {
      setModalVisible3(false);
    };

    const handleOpenPress3 = () => {
      setModalVisible4(true);
    };
  
    const handleCloseModal4 = () => {
      setModalVisible4(false);
    };
const {t}=useTranslation()
  const [fontsLoaded]=useFonts({
    'Roboto-Light':require("../assets/fonts/Roboto-Light.ttf"),
  })

  return (
    <ImageBackground
    source={require ('../assets/backgroundimg2.png') }
  style={{ height: '120%', width: '100%',flex: 1}}
>
    <View style={{ flex: 1 }}>
      <Topbar />
      <View style={{ flexDirection: 'row', flex: 1 }}>
        <Sidebar />
        <ScrollView contentContainerStyle={{ flexGrow: 1, maxHeight: 500 }}>
          <View style={{ marginLeft: 270 }}>
            <View style={styles.header}>
              <TouchableOpacity
            underlayColor={isFirstHubsHovered ? 'transparent' : 'transparent'}
            onMouseEnter={() => setIsFirstHubsHovered(true)}
            onMouseLeave={() => setIsFirstHubsHovered(false)}> 
              <View style={styles.item}>
              <Image
  source={{ uri: 'https://cdn.builder.io/api/v1/image/assets/TEMP/925cfbb55e82458868f5e0c8cafbdc90d47bec0907e65b77fb918a7ac0dbcfe0?apiKey=7b9918e68d9b487793009b3aea5b1a32&' }}
  style={styles.image}
/>
                <Text style={[{marginLeft: 5, color: "#666" }, isFirstHubsHovered && { color: 'coral' }]}>SAP FI</Text>
              </View>
            </TouchableOpacity>
            
            <TouchableOpacity 
            underlayColor={isThirdHubsHovered ? 'transparent' : 'transparent'}
            onMouseEnter={() => setIsThirdHubsHovered(true)}
            onMouseLeave={() => setIsThirdHubsHovered(false)} >
              <View style={styles.item}>
              <Image
  source={{ uri: 'https://cdn.builder.io/api/v1/image/assets/TEMP/925cfbb55e82458868f5e0c8cafbdc90d47bec0907e65b77fb918a7ac0dbcfe0?apiKey=7b9918e68d9b487793009b3aea5b1a32&' }}
  style={styles.image}
/>
                <Text style={[{marginLeft: 5, color: "#666" }, isThirdHubsHovered && { color: 'coral' }]}>Microsoft Azure</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleOthersPress}>
                <Image source={require('../assets/ellipsis-down.png')} style={{width: 15, height: 15, marginRight: 5, marginLeft: 50}} />
            </TouchableOpacity>
            <TouchableOpacity onPress={goToMyHubs}
            underlayColor={isAllHovered ? 'transparent' : 'transparent'}
            onMouseEnter={() => setIsAllHovered(true)}
            onMouseLeave={() => setIsAllHovered(false)} >
              <View style={styles.item}>
              <Image
  source={{ uri: 'https://cdn.builder.io/api/v1/image/assets/TEMP/925cfbb55e82458868f5e0c8cafbdc90d47bec0907e65b77fb918a7ac0dbcfe0?apiKey=7b9918e68d9b487793009b3aea5b1a32&' }}
  style={styles.image}
/>
                <Text style={[{marginLeft: 5, color: "#666" }, isAllHovered && { color: 'coral' }]}>{t("All Hubs")}</Text>
              </View>
            </TouchableOpacity>
            </View>

            <TouchableOpacity onPress={handleOpenPress}>
    <View style={{ position: 'absolute', right: 80, top: -45, paddingHorizontal: 8, paddingVertical: 8, borderRadius: 5, backgroundColor: 'coral', width: 100, alignItems: 'center',}}>
                    <Text style={{ fontSize: 13, color: "white", alignText: 'center', fontWeight: '600',fontFamily:"Roboto-Light" }}>{t("New Hub")}</Text>
                  </View>
     </TouchableOpacity>

     <View style={{ flexDirection: "row"}}>
            <TouchableOpacity onPress={handleOpenPress2}>
    <View style={{ justifyContent: "flex-start", paddingHorizontal: 10, paddingVertical: 10, borderRadius: 5, borderColor: "#f7fff4", backgroundColor: 'rgba(211,249,216,0.3)', width: 150, alignItems: 'center', marginTop: 20, marginLeft: 50, borderWidth: 1 }}>
                    <Text style={{ fontSize: 13, color: "#f7fff4", alignText: 'center', fontWeight: 'bold',fontFamily:"Roboto-Light" }}>{t("Edit Hub")}</Text>
                  </View>
     </TouchableOpacity>
     <TouchableOpacity onPress={handleOpenPress3}>
    <View style={{ justifyContent: "flex-start", paddingHorizontal: 10, paddingVertical: 10, borderRadius: 5, borderColor: "#f7fff4", backgroundColor: 'rgba(211,249,216,0.3)', width: 150, alignItems: 'center', marginTop: 20, marginLeft: 20, borderWidth: 1 }}>
                    <Text style={{ fontSize: 13, color: "#f7fff4", alignText: 'center', fontWeight: 'bold',fontFamily:"Roboto-Light" }}>{t("Assignment")}</Text>
                  </View>
     </TouchableOpacity>
    
     </View>
    
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible3}
        onRequestClose={handleCloseModal3}
      >
          <View style={styles.modalContent}>
          <OpenModal2 onClose={() => handleCloseModal3()} />
          </View>
      </Modal>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible4}
        onRequestClose={handleCloseModal4}
      >
          <View style={styles.modalContent}>
          <OpenModal5 onClose={() => handleCloseModal4()} />
          </View>
      </Modal>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible2}
        onRequestClose={handleCloseModal2}
      >
          <View style={styles.modalContent}>
            <ConfirmationPopup onClose={() => handleCloseModal2()} />
          </View>
      </Modal>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={handleCloseModal}
      >
          <View style={styles.modalContent}>
          <OpenModal onClose={() => handleCloseModal()} />
          </View>
      </Modal>s

            <ScheduledMeetingsTable />
            
          </View>
        </ScrollView>
      </View>
    </View>
    </ImageBackground>
  );
}

const ScheduledMeetingsTable = () => {
  const [messageCountText, setMessageCountText] = useState('0'); 
    const [modalVisible4, setModalVisible4] = useState(false);

    const handleOpenPress4 = () => {
      setModalVisible4(true);
    };
  
    const handleCloseModal4 = () => {
      setModalVisible4(false);
      onClose();
    };
    const {t}=useTranslation()

  return ( 
    <View style={{flex: 1}}>
    <View style={{flexDirection: 'row', flexWrap: "wrap", alignItems: 'center', alignContent: 'center' }}>
    <View style={[styles.whiteBox, { marginLeft: 50, }]}>
    <Text style={{ fontSize: 16, color: "black", fontWeight: '600'}}>{t("Next Meeting Schedule")}</Text>
    <Text style={{ fontSize: 13, color: "grey", marginTop: 10}}>27/May/2024</Text>
    <Text style={{ fontSize: 14, color: "grey", marginTop: 10, fontWeight: '500'}}>2:00PM - 3:00PM</Text>
    <TouchableOpacity style={{  backgroundColor: 'none', padding: 8, paddingHorizontal: 10, marginTop: 15, borderRadius: 5, marginLeft: 10, marginRight: 10, borderWidth: 2, borderColor: '#206C00'}}>
          <Text style={{ color: '#206C00', textAlign: 'center', fontSize: 13, fontWeight: '600'}}>{t("Start Session")}</Text>
          </TouchableOpacity>
      </View>

      <View style={[styles.whiteBox, { marginLeft: 40,  }]}>
      <Text style={{ fontSize: 12, color: "black", fontWeight: '500'}}>{t("Next Meeting Confirmation")}</Text>
    <Text style={{ fontSize: 24, color: "black", marginTop: 5, fontWeight: 'bold'}}>12</Text>
    <Text style={{ fontSize: 12, color: "darkred", marginTop: 10, fontWeight: '500'}}>{t("Yet to Confirm")}</Text>
    <Text style={{ fontSize: 24, color: "darkred", marginTop: 5, fontWeight: 'bold'}}>2</Text>
      </View>

      <View style={[styles.whiteBox, { marginLeft: 40, }]}>
      <Text style={{ fontSize: 16, color: "black", fontWeight: '500'}}>{t("Total Hub Members")}</Text>
    <Text style={{ fontSize: 24, color: "black", marginTop: 10, fontWeight: 'bold'}}>108</Text>
    <TouchableOpacity onPress={handleOpenPress4} style={{  backgroundColor: 'none', padding: 8, paddingHorizontal: 10, marginTop: 15, borderRadius: 5, marginLeft: 10, marginRight: 10, borderWidth: 2, borderColor: '#206C00'}}>
          <Text style={{ color: '#206C00', textAlign: 'center', fontSize: 13, fontWeight: '600'}}>{t("New Meeting")}</Text>
          </TouchableOpacity>
      </View>

      <View style={[styles.whiteBox, {  marginRight: 50, marginLeft: 30  }]}>
      <Text style={{ fontSize: 12, color: "#206C00", fontWeight: '500'}}>{t("Sessions Held")}</Text>
    <Text style={{ fontSize: 24, color: "#206C00", marginTop: 5, fontWeight: 'bold'}}>20</Text>
    <Text style={{ fontSize: 12, color: "darkred", fontWeight: '500', marginTop: 10,}}>{t("Sessions Missed")}</Text>
    <Text style={{ fontSize: 24, color: "darkred", marginTop: 5, fontWeight: 'bold'}}>4</Text>
      </View>

      </View>
    <View style={styles.greenBox}>
    <BlurView intensity={100} style={styles.blurBackground}>
    <Text style={styles.title}>{t("Manage SAP FI Hub")}</Text>
    
    <View style={styles.table}>
    <View style={styles.row}>
        <View style={styles.cell}>
        <Text style={{fontWeight: '600', fontSize: 14}}>{t("Name")}</Text>
        </View>
        <View style={styles.cell}>
        <Text style={{fontWeight: '600', fontSize: 14}}> </Text>
        </View>
        <View style={styles.cell}>
        <Text style={{fontWeight: '600', fontSize: 14}}>{t("Status")}</Text>
        </View>
        <View style={styles.cell}>
        <Text style={{fontWeight: '600', fontSize: 14}}>{t("Sessions Attended")}</Text>
        </View>
        <View style={styles.cell}>
        <Text style={{fontWeight: '600', fontSize: 14}}>{t("Sessions Missed")}</Text>
        </View>
      </View>
        <View style={styles.row}>
          <View style={styles.cell2}>
          <TouchableOpacity>
          <View style={{flexDirection: 'row'}}>
          <Image source={require('../assets/useravatar1.png')} style={styles.userimage} />
            <Text style={styles.cellText}>Maria Garcia</Text>
          </View>
          </TouchableOpacity>
          </View>
          <View style={styles.cell2}>
          <View style={styles.messageCount}>
        <Text style={styles.messageCountText}>3</Text>
        </View>
        </View>
          <View style={styles.cell2}>
          <Text style={{fontStyle: "italic", fontSize: 14,}}>{t("Offline")}</Text>
          </View>
          <View style={styles.cell2}>
            <Text style={styles.cellText}>15 {t("Sessions")}</Text>
          </View>
          <View style={styles.cell2}>
            <Text style={styles.cellText}>5 {t("Sessions")}</Text>
          </View>
        </View>
        <View style={styles.row}>
          <View style={styles.cell}>
          <TouchableOpacity>
          <View style={{flexDirection: 'row'}}>
          <Image source={require('../assets/useravatar.jpg')} style={styles.userimage} />
            <Text style={styles.cellText}>Ahmed Hassan</Text>
          </View>
          </TouchableOpacity>
          </View>
          <View style={styles.cell}>
          <View style={styles.messageCount}>
        <Text style={styles.messageCountText}>9</Text>
        </View>
        </View>
          <View style={styles.cell}>
          <Text style={{fontStyle: "italic", fontSize: 14, color: 'green'}}>{t("Online")}</Text>
          </View>
          <View style={styles.cell}>
            <Text style={styles.cellText}>20 {t("Sessions")}</Text>
          </View>
          <View style={styles.cell}>
            <Text style={styles.cellText}>0 {t("Sessions")}</Text>
          </View>
        </View>
         <View style={styles.row}>
          <View style={styles.cell2}>
          <TouchableOpacity>
          <View style={{flexDirection: 'row'}}>
          <Image source={require('../assets/useravatar1.png')} style={styles.userimage} />
            <Text style={styles.cellText}>Isabella Ross</Text>
          </View>
          </TouchableOpacity>
          </View>
          <View style={styles.cell2}>
          <View style={styles.messageCount}>
        <Text style={styles.messageCountText}>1</Text>
        </View>
        </View>
          <View style={styles.cell2}>
          <Text style={{fontStyle: "italic", fontSize: 14, color: 'green'}}>{t("Online")}</Text>
          </View>
          <View style={styles.cell2}>
            <Text style={styles.cellText}>19 {t("Sessions")}</Text>
          </View>
          <View style={styles.cell2}>
            <Text style={styles.cellText}>1 {t("Sessions")}</Text>
          </View>
        </View>
         <View style={styles.row}>
          <View style={styles.cell}>
          <TouchableOpacity>
          <View style={{flexDirection: 'row'}}>
          <Image source={require('../assets/useravatar2.png')} style={styles.userimage} />
            <Text style={styles.cellText}>Adedare Adeyemi</Text>
          </View>
          </TouchableOpacity>
          </View>
          <View style={styles.cell}>
          <View style={styles.messageCount}>
        <Text style={styles.messageCountText}>7</Text>
        </View>
        </View>
          <View style={styles.cell}>
          <Text style={{fontStyle: "italic", fontSize: 14}}>{t("Offline")}</Text>
          </View>
          <View style={styles.cell}>
            <Text style={styles.cellText}>13 {t("Sessions")}</Text>
          </View>
          <View style={styles.cell}>
            <Text style={styles.cellText}>7 {t("Sessions")}</Text>
          </View>
        </View>
        <View style={styles.row}>
          <View style={styles.cell2}>
          <TouchableOpacity>
          <View style={{flexDirection: 'row'}}>
          <Image source={require('../assets/useravatar1.png')} style={styles.userimage} />
            <Text style={styles.cellText}>Sophie Dubois</Text>
          </View>
          </TouchableOpacity>
          </View>
          <View style={styles.cell2}>
          <View style={styles.messageCount}>
        <Text style={styles.messageCountText}>12</Text>
        </View>
        </View>
          <View style={styles.cell2}>
          <Text style={{fontStyle: "italic", fontSize: 14, color: 'green'}}>{t("Online")}</Text>
          </View>
          <View style={styles.cell2}>
            <Text style={styles.cellText}>8 {t("Sessions")}</Text>
          </View>
          <View style={styles.cell2}>
            <Text style={styles.cellText}>12 {t("Sessions")}</Text>
          </View>
        </View>
         <View style={styles.row}>
          <View style={styles.cell}>
          <TouchableOpacity>
          <View style={{flexDirection: 'row'}}>
          <Image source={require('../assets/useravatar1.png')} style={styles.userimage} />
            <Text style={styles.cellText}>Emily Johnson</Text>
          </View>
          </TouchableOpacity>
          </View>
          <View style={styles.cell}>
          <View style={styles.messageCount}>
        <Text style={styles.messageCountText}>2</Text>
        </View>
        </View>
          <View style={styles.cell}>
          <Text style={{fontStyle: "italic", fontSize: 14}}>{t("Offline")}</Text>
          </View>
          <View style={styles.cell}>
            <Text style={styles.cellText}>20 {t("Sessions")}</Text>
          </View>
          <View style={styles.cell}>
            <Text style={styles.cellText}>0 {t("Sessions")}</Text>
          </View>
        </View>
 <View style={styles.row}>
          <View style={styles.cell2}>
          <TouchableOpacity>
          <View style={{flexDirection: 'row'}}>
          <Image source={require('../assets/User.png')} style={styles.userimage} />
            <Text style={styles.cellText}>Chinwe Ekpo</Text>
          </View>
          </TouchableOpacity>
          </View>
          <View style={styles.cell2}>
  {messageCountText !== '0' && (
    <View style={styles.messageCount}>
      <Text style={styles.messageCountText}>0</Text>
    </View>
  )}
</View>
          <View style={styles.cell2}>
          <Text style={{fontStyle: "italic", fontSize: 14, color: 'green'}}>{t("Online")}</Text>
          </View>
          <View style={styles.cell2}>
            <Text style={styles.cellText}>20 {t("Sessions")}</Text>
          </View>
          <View style={styles.cell2}>
            <Text style={styles.cellText}>0 {t("Sessions")}</Text>
          </View>
        </View>
<View style={styles.row}>
          <View style={styles.cell}>
          <TouchableOpacity>
          <View style={{flexDirection: 'row'}}>
          <Image source={require('../assets/useravatar.jpg')} style={styles.userimage} />
            <Text style={styles.cellText}>Chiara Romano</Text>
          </View>
          </TouchableOpacity>
          </View>
          <View style={styles.cell}>
          <View style={styles.messageCount}>
        <Text style={styles.messageCountText}>14</Text>
        </View>
        </View>
          <View style={styles.cell}>
          <Text style={{fontStyle: "italic", fontSize: 14}}>{t("Offline")}</Text>
          </View>
          <View style={styles.cell}>
            <Text style={styles.cellText}>20 {t("Sessions")}</Text>
          </View>
          <View style={styles.cell}>
            <Text style={styles.cellText}>0 {t("Sessions")}</Text>
          </View>
        </View>
<View style={styles.row}>
          <View style={styles.cell2}>
          <TouchableOpacity>
          <View style={{flexDirection: 'row'}}>
          <Image source={require('../assets/useravatar2.png')} style={styles.userimage} />
            <Text style={styles.cellText}>Oliver Morris</Text>
          </View>
          </TouchableOpacity>
          </View>
          <View style={styles.cell2}>
          <View style={styles.messageCount}>
        <Text style={styles.messageCountText}>3</Text>
        </View>
        </View>
          <View style={styles.cell2}>
          <Text style={{fontStyle: "italic", fontSize: 14, color: 'green'}}>{t("Online")}</Text>
          </View>
          <View style={styles.cell2}>
            <Text style={styles.cellText}>16 {t("Sessions")}</Text>
          </View>
          <View style={styles.cell2}>
            <Text style={styles.cellText}>4 {t("Sessions")}</Text>
          </View>
        </View>
        <View style={styles.row}>
<View style={styles.cell}>
<TouchableOpacity>
<View style={{flexDirection: 'row'}}>
          <Image source={require('../assets/User.png')} style={styles.userimage} />
            <Text style={styles.cellText}>Ogoh Tochukwu</Text>
          </View>
         </TouchableOpacity>
          </View>
          <View style={styles.cell}>
  {messageCountText !== '0' && (
    <View style={styles.messageCount}>
      <Text style={styles.messageCountText}>0</Text>
    </View>
  )}
</View>
          <View style={styles.cell}>
          <Text style={{fontStyle: "italic", fontSize: 14}}>{t("Offline")}</Text>
          </View>
          <View style={styles.cell}>
            <Text style={styles.cellText}>19 {t("Sessions")}</Text>
          </View>
          <View style={styles.cell}>
            <Text style={styles.cellText}>1 {t("Sessions")}</Text>
          </View>
        </View>

        <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible4}
        onRequestClose={handleCloseModal4}
      >
        <View style={styles.modalContent}>
          <OpenModal4 onClose={handleCloseModal4} />
        </View>
      </Modal>
       
      </View>
      </BlurView>
    </View>
    
    </View>
  );
}

const styles = StyleSheet.create({
  modalContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  header: {
    marginLeft: -60,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    backgroundColor: '#f7fff4',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f7fff4',
  },
  item: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  headertext: {
    marginLeft: 5,
    fontSize: 14,
    fontWeight: 500,
    color: '#666'
  },
  image: {
    width: 24,
    height: 24,
    marginRight: 5,
    marginLeft: 100
  },
  eimage: {
    position: 'absolute',
    width: 24,
    height: 24,
    right: 0,
    marginRight: 90,
    marginTop: -30
  },
  headertext: {
    position: 'absolute',
    right: 30,
    marginLeft: 5,
    fontSize: 14,
    marginTop: -30,
    fontWeight: '500',
    color: '#666',
    fontFamily:""
  },
  title: {
    marginTop: 20,
    marginLeft: 50,
    color: "black",
    fontWeight: 'bold',
    fontSize: 15,
    textAlign: 'flex-start',
  },
  table: {
    marginRight: 200,
    marginTop: 20,
    marginBottom: 20,
    alignContent: 'center',
    justifyContent: 'space-around',
    marginLeft: 50, marginRight: 50
  },
  row: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(225,225,212,0.3)',
  },
  cell: {
    flex: 1,
   backgroundColor: 'white',
    padding: 10,
    alignItems: 'flex-start',
  },
  cell2: {
    flex: 1,
   backgroundColor: 'none',
    padding: 10,
    alignItems: 'flex-start',
  },
  cellText: {
    textAlign: 'flex-start',
  },
  messageCount: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#4CAF50',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 70
  },
  messageCountText: {
    color: 'white',
    fontWeight: '500',
    fontSize: 11
  },
  greenBox: {
    flex: 1,
   width: "90%",
    height:250,
    marginBottom: 20,
    marginLeft: 50, 
    backgroundColor: 'rgba(225,225,212,0.3)',
    marginTop: 20, 
    borderRadius: 20,
    borderColor: 'rgba(255,255,255,0.5)',
    borderWidth: 1,
  },
  blurBackground: {
    borderRadius: 20, 
    backgroundColor: 'rgba(225,225,212,0.3)',
  },
  cellText: {
    textAlign: 'center',
  },
  userimage: {
    width: 30,
    height: 30,
    marginRight: 10,
    marginTop: -5,
    borderRadius: 25
  },
  whiteBox: {
    width: '20%',
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: '#f7fff4',
  borderRadius: 20,
  marginTop: 50,
  borderColor: 'rgba(255,255,255,0.5)',
    borderWidth: 1,
    BlurView: '100%'
  },
});

export default MyComponent;
