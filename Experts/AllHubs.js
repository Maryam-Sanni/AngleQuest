import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, Image, TouchableOpacity, Modal } from 'react-native';
import Topbar from '../components/expertstopbar';
import Sidebar from '../components/expertssidebar';
import { useNavigation } from '@react-navigation/native';
import OpenModal from '../components/Createhubform';

  
function MyComponent() {
    const navigation = useNavigation();
    const [modalVisible, setModalVisible] = useState(false);
    const [isFirstHubsHovered, setIsFirstHubsHovered] = useState(false);
    const [isSecondHubsHovered, setIsSecondHubsHovered] = useState(false);
    const [isThirdHubsHovered, setIsThirdHubsHovered] = useState(false);
    const [isOthersHovered, setIsOthersHovered] = useState(false);
    const [isAllHovered, setIsAllHovered] = useState(false);
    
    const goToOffers= () => {
        navigation.navigate('Offers');
      };

      const goToMyHubs = () => {
        navigation.navigate('All Hubs');
      };

     

    const handleOpenPress = () => {
      setModalVisible(true);
    };
  
    const handleCloseModal = () => {
      setModalVisible(false);
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
            underlayColor={isSecondHubsHovered ? 'transparent' : 'transparent'}
            onMouseEnter={() => setIsSecondHubsHovered(true)}
            onMouseLeave={() => setIsSecondHubsHovered(false)} >
              <View style={styles.item}>
                <Image source={require('../assets/hubs.png')} style={styles.image} />
                <Text style={[styles.headertext, isSecondHubsHovered && { color: 'coral' }]}>Power Point Dev.</Text>
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
            <TouchableOpacity 
            underlayColor={isOthersHovered ? 'transparent' : 'transparent'}
            onMouseEnter={() => setIsOthersHovered(true)}
            onMouseLeave={() => setIsOthersHovered(false)} >
              <View style={styles.item}>
                <Image source={require('../assets/list.png')} style={styles.image} />
                <Text style={[styles.headertext, isOthersHovered && { color: 'coral' }]}>Others</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={goToMyHubs}
            underlayColor={isAllHovered ? 'transparent' : 'transparent'}
            onMouseEnter={() => setIsAllHovered(true)}
            onMouseLeave={() => setIsAllHovered(false)} >
              <View style={styles.item}>
                <Image source={require('../assets/chatroom.png')} style={styles.image} />
                <Text style={[styles.headertext, isAllHovered && { color: 'coral' }]}>All Hubs</Text>
              </View>
            </TouchableOpacity>
            </View>
            <TouchableOpacity onPress={handleOpenPress}>
    <View style={{ justifyContent: "flex-start", paddingHorizontal: 10, paddingVertical: 10, borderRadius: 5, borderColor: "#206C00", backgroundColor: "#d3f9d8", width: 150, alignItems: 'center', marginTop: 10, marginLeft: 50, borderWidth: 1}}>
                    <Text style={{ fontSize: 14, color: "#206C00", alignText: 'center' }}>Create New Hub</Text>
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
            <ScheduledMeetingsTable />
            <TouchableOpacity onPress={() => console.log('Delete Hub pressed')} style={styles.deleteHubButton}>
              <Text style={styles.deleteHubButtonText}>Delete Hub</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </View>
  );
}

const ScheduledMeetingsTable = () => {
  const [modalVisible, setModalVisible] = useState(false);

    const handleOpenPress = () => {
      setModalVisible(true);
    };
  
    const handleCloseModal = () => {
      setModalVisible(false);
    };

  return (
   
    <View style={styles.greenBox}>
    <Text style={styles.title}>Manage SAP FI Hub</Text>
    
    <View style={styles.table}>
    <View style={styles.row}>
        <View style={styles.cell}>
        <Text style={{fontWeight: '600', fontSize: 14}}>Name</Text>
        </View>
        <View style={styles.cell}>
        <Text style={{fontWeight: '600', fontSize: 14}}>Status</Text>
        </View>
        <View style={styles.cell}>
        <Text style={{fontWeight: '600', fontSize: 14}}>Sessions Missed</Text>
        </View>
        <View style={styles.cell}>
        <Text style={{fontWeight: '600', fontSize: 14}}>Joined Hub</Text>
        </View>
        <View style={styles.cell}>
          <Text style={{color: "white", fontSize: 14}}> </Text>
        </View>
      </View>
        <View style={styles.row}>
          <View style={styles.cell2}>
          <View style={{flexDirection: 'row'}}>
          <Image source={require('../assets/useravatar1.png')} style={styles.userimage} />
            <Text style={styles.cellText}>Maria Garcia</Text>
          </View>
          </View>
          <View style={styles.cell2}>
          <Text style={{fontStyle: "italic", fontSize: 14}}>Offline</Text>
          </View>
          <View style={styles.cell2}>
            <Text style={styles.cellText}>5 Sessions</Text>
          </View>
          <View style={styles.cell2}>
            <Text style={styles.cellText}>08-05-2024</Text>
          </View>
          <TouchableOpacity style={styles.cell2} >
          <Text style={{color: "darkred", fontSize: 14}}>Remove Participant</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.row}>
          <View style={styles.cell}>
          <View style={{flexDirection: 'row'}}>
          <Image source={require('../assets/useravatar.jpg')} style={styles.userimage} />
            <Text style={styles.cellText}>Ahmed Hassan</Text>
          </View>
          </View>
          <View style={styles.cell}>
          <Text style={{fontStyle: "italic", fontSize: 14}}>Online</Text>
          </View>
          <View style={styles.cell}>
            <Text style={styles.cellText}>0 Sessions</Text>
          </View>
          <View style={styles.cell}>
            <Text style={styles.cellText}>02-03-2024</Text>
          </View>
          <TouchableOpacity style={styles.cell} >
          <Text style={{color: "darkred", fontSize: 14}}>Remove Participant</Text>
          </TouchableOpacity>
        </View>
         <View style={styles.row}>
          <View style={styles.cell2}>
          <View style={{flexDirection: 'row'}}>
          <Image source={require('../assets/useravatar1.png')} style={styles.userimage} />
            <Text style={styles.cellText}>Isabella Ross</Text>
          </View>
          </View>
          <View style={styles.cell2}>
          <Text style={{fontStyle: "italic", fontSize: 14}}>Online</Text>
          </View>
          <View style={styles.cell2}>
            <Text style={styles.cellText}>1 Sessions</Text>
          </View>
          <View style={styles.cell2}>
            <Text style={styles.cellText}>08-05-2024</Text>
          </View>
          <TouchableOpacity style={styles.cell2}>
          <Text style={{color: "darkred", fontSize: 14}}>Remove Participant</Text>
          </TouchableOpacity>
        </View>
         <View style={styles.row}>
          <View style={styles.cell}>
          <View style={{flexDirection: 'row'}}>
          <Image source={require('../assets/useravatar2.png')} style={styles.userimage} />
            <Text style={styles.cellText}>Adedare Adeyemi</Text>
          </View>
          </View>
          <View style={styles.cell}>
          <Text style={{fontStyle: "italic", fontSize: 14}}>Offline</Text>
          </View>
          <View style={styles.cell}>
            <Text style={styles.cellText}>7 Sessions</Text>
          </View>
          <View style={styles.cell}>
            <Text style={styles.cellText}>02-03-2024</Text>
          </View>
          <TouchableOpacity style={styles.cell} >
          <Text style={{color: "darkred", fontSize: 14}}>Remove Participant</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.row}>
          <View style={styles.cell2}>
          <View style={{flexDirection: 'row'}}>
          <Image source={require('../assets/useravatar1.png')} style={styles.userimage} />
            <Text style={styles.cellText}>Sophie Dubois</Text>
          </View>
          </View>
          <View style={styles.cell2}>
          <Text style={{fontStyle: "italic", fontSize: 14}}>Online</Text>
          </View>
          <View style={styles.cell2}>
            <Text style={styles.cellText}>0 Sessions</Text>
          </View>
          <View style={styles.cell2}>
            <Text style={styles.cellText}>08-05-2024</Text>
          </View>
          <TouchableOpacity style={styles.cell2} >
          <Text style={{color: "darkred", fontSize: 14}}>Remove Participant</Text>
          </TouchableOpacity>
        </View>
         <View style={styles.row}>
          <View style={styles.cell}>
          <View style={{flexDirection: 'row'}}>
          <Image source={require('../assets/useravatar1.png')} style={styles.userimage} />
            <Text style={styles.cellText}>Emily Johnson</Text>
          </View>
          </View>
          <View style={styles.cell}>
          <Text style={{fontStyle: "italic", fontSize: 14}}>Offline</Text>
          </View>
          <View style={styles.cell}>
            <Text style={styles.cellText}>0 Sessions</Text>
          </View>
          <View style={styles.cell}>
            <Text style={styles.cellText}>02-03-2024</Text>
          </View>
          <TouchableOpacity style={styles.cell} >
          <Text style={{color: "darkred", fontSize: 14}}>Remove Participant</Text>
          </TouchableOpacity>
        </View>
 <View style={styles.row}>
          <View style={styles.cell2}>
          <View style={{flexDirection: 'row'}}>
          <Image source={require('../assets/User.png')} style={styles.userimage} />
            <Text style={styles.cellText}>Chinwe Ekpo</Text>
          </View>
          </View>
          <View style={styles.cell2}>
          <Text style={{fontStyle: "italic", fontSize: 14}}>Online</Text>
          </View>
          <View style={styles.cell2}>
            <Text style={styles.cellText}>0 Sessions</Text>
          </View>
          <View style={styles.cell2}>
            <Text style={styles.cellText}>08-05-2024</Text>
          </View>
          <TouchableOpacity style={styles.cell2} >
          <Text style={{color: "darkred", fontSize: 14}}>Remove Participant</Text>
          </TouchableOpacity>
        </View>
<View style={styles.row}>
          <View style={styles.cell}>
          <View style={{flexDirection: 'row'}}>
          <Image source={require('../assets/useravatar.jpg')} style={styles.userimage} />
            <Text style={styles.cellText}>Chiara Romano</Text>
          </View>
          </View>
          <View style={styles.cell}>
          <Text style={{fontStyle: "italic", fontSize: 14}}>Online</Text>
          </View>
          <View style={styles.cell}>
            <Text style={styles.cellText}>0 Sessions</Text>
          </View>
          <View style={styles.cell}>
            <Text style={styles.cellText}>02-03-2024</Text>
          </View>
          <TouchableOpacity style={styles.cell} >
          <Text style={{color: "darkred", fontSize: 14}}>Remove Participant</Text>
          </TouchableOpacity>
        </View>
<View style={styles.row}>
          <View style={styles.cell2}>
          <View style={{flexDirection: 'row'}}>
          <Image source={require('../assets/useravatar2.png')} style={styles.userimage} />
            <Text style={styles.cellText}>Oliver Morris</Text>
          </View>
          </View>
          <View style={styles.cell2}>
          <Text style={{fontStyle: "italic", fontSize: 14}}>Online</Text>
          </View>
          <View style={styles.cell2}>
            <Text style={styles.cellText}>4 Sessions</Text>
          </View>
          <View style={styles.cell2}>
            <Text style={styles.cellText}>08-05-2024</Text>
          </View>
          <TouchableOpacity style={styles.cell2}>
          <Text style={{color: "darkred", fontSize: 14}}>Remove Participant</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.row}>
<View style={styles.cell}>
<View style={{flexDirection: 'row'}}>
          <Image source={require('../assets/User.png')} style={styles.userimage} />
            <Text style={styles.cellText}>Ogoh Tochukwu</Text>
          </View>
          </View>
          <View style={styles.cell}>
          <Text style={{fontStyle: "italic", fontSize: 14}}>Offline</Text>
          </View>
          <View style={styles.cell}>
            <Text style={styles.cellText}>1 Sessions</Text>
          </View>
          <View style={styles.cell}>
            <Text style={styles.cellText}>02-03-2024</Text>
          </View>
          <TouchableOpacity style={styles.cell} >
          <Text style={{color: "darkred", fontSize: 14}}>Remove Participant</Text>
          </TouchableOpacity>
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
  
  greenBox: {
    flex: 1,
   width: "90%",
    height:250,
    paddingBottom: 10,
    marginBottom: 20,
    marginLeft: 50, 
    backgroundColor: '#F2F2F2',
    marginTop: 50, 
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
  deleteHubButton: {
    backgroundColor: 'red',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignSelf: 'flex-end',
    marginTop: 10,
    marginRight: 50
  },
  deleteHubButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default MyComponent;
