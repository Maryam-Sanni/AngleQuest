import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, Image, TouchableOpacity, Modal } from 'react-native';
import Topbar from '../components/expertstopbar';
import Sidebar from '../components/expertssidebar';
import { useNavigation } from '@react-navigation/native';
import OpenModal from '../components/Createhubform';
import OpenModal2 from '../components/Edithubform';
import ConfirmationPopup from '../Experts/OtherHubs';

  
function MyComponent() {
    const navigation = useNavigation();
    const [modalVisible, setModalVisible] = useState(false);
    const [isFirstHubsHovered, setIsFirstHubsHovered] = useState(false);
    const [isSecondHubsHovered, setIsSecondHubsHovered] = useState(false);
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

  return (
    <View style={{ flex: 1 }}>
      <Topbar />
      <View style={{ flexDirection: 'row', flex: 1 }}>
        <Sidebar />
        <ScrollView contentContainerStyle={{ flexGrow: 1, maxHeight: 500 }}>
          <View style={{ marginLeft: 270, backgroundColor: 'white'}}>
            <View style={styles.header}>
              <TouchableOpacity
            underlayColor={isFirstHubsHovered ? 'transparent' : 'transparent'}
            onMouseEnter={() => setIsFirstHubsHovered(true)}
            onMouseLeave={() => setIsFirstHubsHovered(false)}> 
              <View style={styles.item}>
                <Image source={require('../assets/hubs.png')} style={styles.image} />
                <Text style={[styles.headertext, isFirstHubsHovered && { color: 'coral' }]}>SAP FI</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity 
            underlayColor={isThirdHubsHovered ? 'transparent' : 'transparent'}
            onMouseEnter={() => setIsThirdHubsHovered(true)}
            onMouseLeave={() => setIsThirdHubsHovered(false)} >
              <View style={styles.item}>
                <Image source={require('../assets/hubs.png')} style={styles.image} />
                <Text style={[styles.headertext, isThirdHubsHovered && { color: 'coral' }]}>Microsoft Azure</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleOthersPress}>
                <Image source={require('../assets/ellipsis-down.png')} style={{width: 18, height: 18, marginRight: 5, marginLeft: 50}} />
            </TouchableOpacity>
            </View>
            <TouchableOpacity onPress={goToMyHubs}
            underlayColor={isAllHovered ? 'transparent' : 'transparent'}
            onMouseEnter={() => setIsAllHovered(true)}
            onMouseLeave={() => setIsAllHovered(false)} >
              <View style={styles.item}>
                <Image source={require('../assets/chatroom.png')} style={styles.eimage} />
                <Text style={[styles.eheadertext, isAllHovered && { color: 'coral' }]}>All Hubs</Text>
              </View>
            </TouchableOpacity>
            
            <TouchableOpacity onPress={handleOpenPress}>
    <View style={{ justifyContent: "flex-start", paddingHorizontal: 10, paddingVertical: 10, borderRadius: 5, borderColor: "coral", backgroundColor: "coral", width: 150, alignItems: 'center', marginTop: 20, marginLeft: 50, borderWidth: 1 }}>
                    <Text style={{ fontSize: 13, color: "white", alignText: 'center', fontWeight: '600' }}>+ Create New Hub</Text>
                  </View>
     </TouchableOpacity>


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
        visible={modalVisible2}
        onRequestClose={handleCloseModal2}
      >
          <View style={styles.modalContent}>
            <ConfirmationPopup onClose={() => handleCloseModal2()} />
          </View>
      </Modal>


            <ScheduledMeetingsTable />
            <TouchableOpacity onPress={handleOpenPress2}>
    <View style={{ justifyContent: "flex-start", paddingHorizontal: 10, paddingVertical: 10, borderRadius: 5, borderColor: "coral", backgroundColor: "coral", width: 150, alignItems: 'center', marginTop: 20, marginLeft: 50, borderWidth: 1, marginBottom: 50 }}>
                    <Text style={{ fontSize: 13, color: "white", alignText: 'center', fontWeight: '600' }}>Edit Hub</Text>
                  </View>
     </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </View>
  );
}

const ScheduledMeetingsTable = () => {
  const [messageCountText, setMessageCountText] = useState('0'); 
  const [modalVisible, setModalVisible] = useState(false);

    const handleOpenPress = () => {
      setModalVisible(true);
    };
  
    const handleCloseModal = () => {
      setModalVisible(false);
    };

  return ( 
    <View style={{flex: 1}}>
    <View style={{flexDirection: 'row', flexWrap: "wrap", alignItems: 'center', alignContent: 'center' }}>
    <View style={[styles.whiteBox, { marginLeft: 50, }]}>
    <Text style={{ fontSize: 14, color: "black", fontWeight: 'bold'}}>Next Meeting Schedule</Text>
    <Text style={{ fontSize: 13, color: "grey", marginTop: 10}}>27/May/2024</Text>
    <Text style={{ fontSize: 14, color: "black", marginTop: 10, fontWeight: '500'}}>2:00PM - 3:00PM</Text>
    <TouchableOpacity style={{  backgroundColor: 'white', paddingVertical: 5, paddingHorizontal: 15, marginTop: 15, borderColor: 'green', borderWidth: 2}}>
          <Text style={{ color: 'black', fontWeight: 'bold', textAlign: 'center', fontSize: 12}}>Start Session</Text>
          </TouchableOpacity>
      </View>

      <View style={[styles.whiteBox, { marginLeft: 40,  }]}>
      <Text style={{ fontSize: 12, color: "grey", fontWeight: '500'}}>Next Meeting Confirmation</Text>
    <Text style={{ fontSize: 24, color: "black", marginTop: 5, fontWeight: 'bold'}}>12</Text>
    <Text style={{ fontSize: 12, color: "darkred", marginTop: 10, fontWeight: '500'}}>Yet to Confirm</Text>
    <Text style={{ fontSize: 24, color: "darkred", marginTop: 5, fontWeight: 'bold'}}>2</Text>
      </View>

      <View style={[styles.whiteBox, { marginLeft: 40, }]}>
      <Text style={{ fontSize: 12, color: "grey", fontWeight: '500'}}>Total Hub Members</Text>
    <Text style={{ fontSize: 24, color: "black", marginTop: 10, fontWeight: 'bold'}}>108</Text>
      </View>

      <View style={[styles.whiteBox, {  marginRight: 50, marginLeft: 30  }]}>
      <Text style={{ fontSize: 12, color: "grey", fontWeight: '500'}}>Sessions Held</Text>
    <Text style={{ fontSize: 24, color: "green", marginTop: 5, fontWeight: 'bold'}}>20</Text>
    <Text style={{ fontSize: 12, color: "grey", fontWeight: '500', marginTop: 10,}}>Sessions Missed</Text>
    <Text style={{ fontSize: 24, color: "darkred", marginTop: 5, fontWeight: 'bold'}}>4</Text>
      </View>

      </View>
    <View style={styles.greenBox}>
    <Text style={styles.title}>Manage SAP FI Hub</Text>
    
    <View style={styles.table}>
    <View style={styles.row}>
        <View style={styles.cell}>
        <Text style={{fontWeight: '600', fontSize: 14}}>Name</Text>
        </View>
        <View style={styles.cell}>
        <Text style={{fontWeight: '600', fontSize: 14}}> </Text>
        </View>
        <View style={styles.cell}>
        <Text style={{fontWeight: '600', fontSize: 14}}>Status</Text>
        </View>
        <View style={styles.cell}>
        <Text style={{fontWeight: '600', fontSize: 14}}>Sessions Attended</Text>
        </View>
        <View style={styles.cell}>
        <Text style={{fontWeight: '600', fontSize: 14}}>Sessions Missed</Text>
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
          <Text style={{fontStyle: "italic", fontSize: 14,}}>Offline</Text>
          </View>
          <View style={styles.cell2}>
            <Text style={styles.cellText}>15 Sessions</Text>
          </View>
          <View style={styles.cell2}>
            <Text style={styles.cellText}>5 Sessions</Text>
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
          <Text style={{fontStyle: "italic", fontSize: 14, color: 'green'}}>Online</Text>
          </View>
          <View style={styles.cell}>
            <Text style={styles.cellText}>20 Sessions</Text>
          </View>
          <View style={styles.cell}>
            <Text style={styles.cellText}>0 Sessions</Text>
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
          <Text style={{fontStyle: "italic", fontSize: 14, color: 'green'}}>Online</Text>
          </View>
          <View style={styles.cell2}>
            <Text style={styles.cellText}>19 Sessions</Text>
          </View>
          <View style={styles.cell2}>
            <Text style={styles.cellText}>1 Sessions</Text>
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
          <Text style={{fontStyle: "italic", fontSize: 14}}>Offline</Text>
          </View>
          <View style={styles.cell}>
            <Text style={styles.cellText}>13 Sessions</Text>
          </View>
          <View style={styles.cell}>
            <Text style={styles.cellText}>7 Sessions</Text>
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
          <Text style={{fontStyle: "italic", fontSize: 14, color: 'green'}}>Online</Text>
          </View>
          <View style={styles.cell2}>
            <Text style={styles.cellText}>8 Sessions</Text>
          </View>
          <View style={styles.cell2}>
            <Text style={styles.cellText}>12 Sessions</Text>
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
          <Text style={{fontStyle: "italic", fontSize: 14}}>Offline</Text>
          </View>
          <View style={styles.cell}>
            <Text style={styles.cellText}>20 Sessions</Text>
          </View>
          <View style={styles.cell}>
            <Text style={styles.cellText}>0 Sessions</Text>
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
          <Text style={{fontStyle: "italic", fontSize: 14, color: 'green'}}>Online</Text>
          </View>
          <View style={styles.cell2}>
            <Text style={styles.cellText}>20 Sessions</Text>
          </View>
          <View style={styles.cell2}>
            <Text style={styles.cellText}>0 Sessions</Text>
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
          <Text style={{fontStyle: "italic", fontSize: 14}}>Offline</Text>
          </View>
          <View style={styles.cell}>
            <Text style={styles.cellText}>20 Sessions</Text>
          </View>
          <View style={styles.cell}>
            <Text style={styles.cellText}>0 Sessions</Text>
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
          <Text style={{fontStyle: "italic", fontSize: 14, color: 'green'}}>Online</Text>
          </View>
          <View style={styles.cell2}>
            <Text style={styles.cellText}>16 Sessions</Text>
          </View>
          <View style={styles.cell2}>
            <Text style={styles.cellText}>4 Sessions</Text>
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
          <Text style={{fontStyle: "italic", fontSize: 14}}>Offline</Text>
          </View>
          <View style={styles.cell}>
            <Text style={styles.cellText}>19 Sessions</Text>
          </View>
          <View style={styles.cell}>
            <Text style={styles.cellText}>1 Sessions</Text>
          </View>
        </View>
        

      </View>
      
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
    backgroundColor: 'white',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  item: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  headertext: {
    marginLeft: 5,
    fontSize: 14,
    fontWeight: '500',
    color: '#206C00'
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
  eheadertext: {
    position: 'absolute',
    right: 30,
    marginLeft: 5,
    fontSize: 14,
    marginTop: -30,
    fontWeight: '500',
    color: '#206C00'
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
    borderBottomColor: '#CCC',
  },
  cell: {
    flex: 1,
   backgroundColor: 'white',
    padding: 10,
    alignItems: 'flex-start',
  },
  cell2: {
    flex: 1,
   backgroundColor: '#F2F2F2',
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
    paddingBottom: 10,
    marginBottom: 20,
    marginLeft: 50, 
    backgroundColor: '#F2F2F2',
    marginTop: 20, 
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
    backgroundColor: '#ffffff',
    borderWidth: 2, borderColor: '#f2f2f2',
    borderRadius: 10,
    marginTop: 50,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});

export default MyComponent;
