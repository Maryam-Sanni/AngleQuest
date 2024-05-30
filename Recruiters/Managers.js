import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, Image, TouchableOpacity, TouchableHighlight, Modal, ImageBackground } from 'react-native';
import Topbar from '../components/expertstopbar';
import Sidebar from '../components/Recruiterssidebar';
import CustomPercentageChart from '../components/PercentageChart';
import ManageEmployees from './AssignEmployees';
import { useNavigation } from '@react-navigation/native';
import OpenModal from '../Recruiters/New Manager';


function MyComponent() {
    const navigation = useNavigation();
    const [isInterviewHovered, setIsInterviewHovered] = useState(false);
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
        <View style={{ marginLeft: 270}}>
          <View style={styles.header}>
          <TouchableHighlight>
                                <View style={styles.item}>
                                <Image
  source={{ uri: 'https://cdn.builder.io/api/v1/image/assets/TEMP/55120fdad0942a072dd9c4983820860f2be5dfe081dd7a9dc2fbf948476d5ae7?apiKey=7b9918e68d9b487793009b3aea5b1a32&' }}
  style={styles.image}
/>
                                    <Text style={[styles.headertext, isInterviewHovered && { color: 'coral' }]}>Manage Managers</Text>
                                </View>
                            </TouchableHighlight>
                    
                        </View>
                        <TouchableOpacity onPress={handleOpenPress}>
    <View style={{ justifyContent: "flex-start", paddingHorizontal: 10, paddingVertical: 10, borderRadius: 5, borderColor: "#f7fff4", backgroundColor: 'rgba(211,249,216,0.3)', width: 150, alignItems: 'center', marginTop: 20, marginLeft: 50, borderWidth: 1 }}>
                    <Text style={{ fontSize: 13, color: "#f7fff4", alignText: 'center', fontWeight: 'bold' }}>+ New</Text>
                  </View>
     </TouchableOpacity>

     <View style={styles.container}>
     <View style={styles.BoxesContainer}>
      <View style={styles.box2}>
      <Text style={{ fontSize: 19, fontWeight: 'bold', marginTop: 10, marginLeft: 10, color: '#206C00'}}>Onboard your managers to be a part of subordinate's journey</Text>
     <Text style={{ fontSize: 15, color: "black", marginTop: 5, marginLeft: 10, marginRight: 200, color: 'grey' }}>Orchestrate the growth you wish to see</Text>
     <View style={{flexDirection: 'row'}}>
    
     <Image source={require('../assets/24.png')} style={styles.boximage} />
      </View>
      </View>

      <ManageEmployees />
</View>

      <View style={styles.BoxesContainer}>
      <View style={styles.box}>
      <Text style={{ fontSize: 18, fontWeight: 'bold', marginTop: 10, marginLeft: 10, color: '#206C00'}}>Stats</Text>
      <View style={{flexDirection: 'row'}}>
      <View style={{flexDirection: 'column'}}>
      <Text style={{ marginTop: 10, marginLeft: 10,}}>Growth Plan</Text>
      <View style={{ justifyContent: "center", paddingHorizontal: 7, paddingVertical: 7, marginLeft: 10, marginTop: 5, backgroundColor: '#F2F2F2', width: 70, alignItems: 'center', alignContent: 'center',}}>
                    <Text style={{ fontSize: 16, color: "grey", alignText: 'center',}}>5</Text>
                  </View>
</View>
<View style={{flexDirection: 'column', position: 'absolute', right: 10}}>
<Text style={{ marginTop: 10, marginLeft: 10,}}>Hub Sessions</Text>
      <View style={{ justifyContent: "center", paddingHorizontal: 7, paddingVertical: 7, marginLeft: 10, marginTop: 5, backgroundColor: '#F2F2F2', width: 70, alignItems: 'center', alignContent: 'center',}}>
                    <Text style={{ fontSize: 16, color: "grey", alignText: 'center',}}>20</Text>
                  </View>
                  </View>
      </View>
     
      <View style={{flexDirection: 'row', marginTop: 10}}>
      <View style={{flexDirection: 'column'}}>
      <Text style={{ marginTop: 10, marginLeft: 10,}}>Advice Sessions</Text>
      <View style={{ justifyContent: "center", paddingHorizontal: 7, paddingVertical: 7, marginLeft: 10, marginTop: 5, backgroundColor: '#F2F2F2', width: 70, alignItems: 'center', alignContent: 'center',}}>
                    <Text style={{ fontSize: 16, color: "grey", alignText: 'center',}}>7</Text>
                  </View>
</View>
<View style={{flexDirection: 'column', position: 'absolute', right: 10}}>
<Text style={{ marginTop: 10, marginLeft: 10,}}>Reviews</Text>
      <View style={{ justifyContent: "center", paddingHorizontal: 7, paddingVertical: 7, marginLeft: 10, marginTop: 5, backgroundColor: '#F2F2F2', width: 70, alignItems: 'center', alignContent: 'center',}}>
                    <Text style={{ fontSize: 16, color: "grey", alignText: 'center',}}>13</Text>
                  </View>
                  </View>
      </View>
      <View style={{borderWidth: 1, borderColor: '#63EC55', marginTop: 25,}}>
      <Text style={{fontSize: 18, color: '#206C00', marginTop: 10, marginLeft: 20,  fontWeight: 'bold' }}>Angle Badge</Text>
          <View style={{flexDirection: 'row' }}>
          <Text style={{fontSize: 14, marginTop: 10, marginLeft: 20,marginRight: 20, marginBottom: 20  }}>This is the combined progress of your team</Text>
          <View style={{ alignItems: 'center', justifyContent: 'center', marginRight: 20, marginTop: -30 }}>
      <CustomPercentageChart percentage={45} />
      </View>
      </View>
</View>

      </View>
      <View style={styles.box3}>
      <View style={{flexDirection: 'row', marginTop: 10}}>
      <Text style={{ fontSize: 18, fontWeight: 'bold', marginTop: 10, marginLeft: 10, color: '#206C00'}}>Members</Text>
      <View style={{ justifyContent: "center", paddingHorizontal: 7, paddingVertical: 7, marginLeft: 10, marginTop: 5, backgroundColor: '#F2F2F2', width: 70, alignItems: 'center', alignContent: 'center',}}>
                    <Text style={{ fontSize: 16, color: "grey", alignText: 'center',}}>20</Text>
                  </View>
      </View>
      <View style={{flexDirection: 'row', marginTop: 20, marginLeft: 10 }}>
      <Image source={require('../assets/useravatar4.png')}
              style={{ width: 40, height: 40, marginTop: 7, borderRadius: 25}}
            />
             <Image source={require('../assets/useravatar2.png')}
              style={{ width: 40, height: 40,  marginLeft: -2, marginTop: 7, borderRadius: 25}}
            />
            <Image source={require('../assets/useravatar.jpg')}
              style={{ width: 40, height: 40, marginLeft: -2, marginTop: 7, borderRadius: 25}}
            />
            <Image source={require('../assets/useravatar1.png')}
              style={{ width: 40, height: 40,  marginLeft: -2, marginTop: 7, borderRadius: 25}}
            />
           <Image source={require('../assets/useravatar5.jpg')}
              style={{ width: 40, height: 40, marginLeft: -2, marginTop: 7, borderRadius: 25}}
            />
            </View>
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
  },
  header: {
    marginLeft: -60,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    backgroundColor: '#f7fff4',
    paddingVertical: 15,
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
    marginTop: 5,
    color: '#666'
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
    justifyContent: 'flex-start',
    marginLeft: 40, marginRight: 50, marginTop: 50, marginBottom: 20,
  },
  BoxesContainer: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },
  box: {
    backgroundColor: '#f7fff4',
    marginLeft: 20,
    padding: 10,
    borderRadius: 20,
    width: 280,
    height: 360,
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
  box2: {
    backgroundColor: '#f7fff4',
    padding: 10,
    borderRadius: 20,
    width: 700,
    height: 180,
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
  box3: {
    backgroundColor: '#f7fff4',
    marginLeft: 20,
    marginTop: 20,
    padding: 10,
    borderRadius: 20,
    width: 280,
    height: 180,
    marginTop: 30,
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
    width: 130,
    height: 130,
   position: 'absolute',
   right: 20,
   marginTop: -40
  },
  boximage2: {
    width: 30,
    height: 30,
    position: 'absolute',
    left: 350,
    marginTop:5, 
    borderRadius: 25
  },
});

export default MyComponent;
