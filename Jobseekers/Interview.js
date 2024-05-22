import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Modal, ImageBackground, Image, StyleSheet } from 'react-native';
import Topbar from '../components/topbar';
import Sidebar from '../components/sidebar';
import { BlurView } from 'expo-blur';
import OpenModal from '../Jobseekers/PickInterviewer';
import OpenModal2 from '../Jobseekers/NewInterview';

function MyComponent() {
    const [modalVisible, setModalVisible] = useState(false);
    const [modalVisible2, setModalVisible2] = useState(false);

    const handleOpenPress = () => {
        setModalVisible(true);
      };
    
      const handleCloseModal = () => {
        setModalVisible(false);
      };

      const handleOpenPress2 = () => {
        setModalVisible2(true);
      };
    
      const handleCloseModal2 = () => {
        setModalVisible2(false);
      };
 
  return (
    <ImageBackground
    source={require ('../assets/Background.png') }
  style={{ height: '150%', width: '100%',flex: 1}}
>
    <View style={{ flex: 1}}>
      <Topbar />
      <View style={{ flexDirection: 'row', flex: 1 }}>
        <Sidebar />
        <View style={styles.greenBox}>
        <BlurView intensity={100} style={styles.blurBackground}>
        <ScrollView contentContainerStyle={{ flexGrow: 1, maxHeight: 500 }}>
          <View style={{ flex: 1, marginLeft: 270, }}>
          <View style={styles.header}>
            <TouchableOpacity>
              <View style={styles.item}>
                <Text style={{color: 'black', fontWeight: 'bold', marginLeft: 30}}>Interview</Text>
              </View>
            </TouchableOpacity>
            </View>
            <TouchableOpacity onPress={handleOpenPress2} >
    <View style={{ justifyContent: "flex-start", paddingHorizontal: 10, paddingVertical: 10, borderRadius: 5, borderColor: "#f7fff4", backgroundColor: 'rgba(211,249,216,0.3)', width: 150, alignItems: 'center', marginTop: 20, marginLeft: 50, borderWidth: 1 }}>
                    <Text style={{ fontSize: 13, color: "#f7fff4", alignText: 'center', fontWeight: '600' }}>+ New</Text>
                  </View>
     </TouchableOpacity>

     <View style={{ justifyContent: "center", alignItems: 'center', marginTop: 100}}>
      <View style={styles.bubbleContainer}>
        <View style={styles.bubble}>
          <Text style={styles.bubbleText}>Its often not the most qualified candidate on paper that get the job, Its who performs best at the interview.</Text>
          <View style={styles.bubbleTail}></View>
      </View>
    </View>
     <TouchableOpacity onPress={handleOpenPress}>
    <View style={{ justifyContent: "center", paddingHorizontal: 10, paddingVertical: 10, borderRadius: 5, borderColor: "coral", backgroundColor: 'coral', width: 150, alignItems: 'center', alignContent: 'center', borderWidth: 1 }}>
                    <Text style={{ fontSize: 13, color: "white", alignText: 'center', fontWeight: '600' }}>Pick an Interviewer</Text>
                  </View>
     </TouchableOpacity>
     <Text style={{ fontSize: 14, color: "white", alignText: 'center', marginTop: 10 }}>Let an expert in your field interview you before your next appointment wth ratings, advice and insider tips</Text>
     </View>

            </View>
        </ScrollView>
        </BlurView>
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

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible2}
        onRequestClose={handleCloseModal2}
      >
          <View style={styles.modalContent}>
            <OpenModal2 onClose={() => handleCloseModal2()} />
          </View>
      </Modal>

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
  greenBox: {
   width: "100%",
    height:"100%",
    backgroundColor: 'rgba(225,225,212,0.3)',
  },
  blurBackground: {
    flex: 1, 
  },
  bubbleContainer: {
    position: 'relative',
    marginBottom: 20,
  },
  bubble: {
    maxWidth: 250,
    padding: 15,
    backgroundColor: '#f7fff4',
    borderRadius: 20,
    borderBottomLeftRadius: 0,
    borderColor: '#206C00',
    borderWidth: 1,
    marginLeft: 150
  },
  bubbleText: {
    fontSize: 14,
    textAlign: 'left',
  },
  bubbleTail: {
    position: 'absolute',
    bottom: -15,
    left: 20,
    width: 0,
    height: 0,
    borderTopWidth: 15,
    borderTopColor: '#f7fff4',
    borderLeftWidth: 15,
    borderLeftColor: 'transparent',
    borderRightWidth: 15,
    borderRightColor: 'transparent',
    borderBottomWidth: 0,
    borderBottomColor: 'transparent',
  },
});
export default MyComponent;
