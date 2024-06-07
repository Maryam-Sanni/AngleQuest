import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, Image, TouchableOpacity, TouchableHighlight, Modal, ImageBackground } from 'react-native';
import Topbar from '../components/expertstopbar';
import Sidebar from '../components/Recruiterssidebar';
import CustomPercentageChart from '../components/PercentageChart';
import ManageEmployees from './AssignEmployeeCoach';
import { useNavigation } from '@react-navigation/native';
import OpenModal from '../Recruiters/New Coach';
import { BlurView } from 'expo-blur';


function MyComponent() {
    const navigation = useNavigation();
    const [isInterviewHovered, setIsInterviewHovered] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    
    const handleOpenPress = () => {
      setModalVisible(true);
    };
  
    const handleCloseModal = () => {
      setModalVisible(false);
    };
  
    const goToTeams = () => {
      navigation.navigate('Teams');
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
  source={{ uri: 'https://cdn.builder.io/api/v1/image/assets/TEMP/813d5a4a25e7ea2bc6111724f9da82bc8321c028e79ecedafab3cf526363dfe1?apiKey=7b9918e68d9b487793009b3aea5b1a32&' }}
  style={styles.image}
/>
                                    <Text style={[styles.headertext, isInterviewHovered && { color: 'coral' }]}>Manage Coaches</Text>
                                </View>
                            </TouchableHighlight>
                            <TouchableOpacity onPress={handleOpenPress}>
    <View style={{ position: 'absolute', right: 30, paddingHorizontal: 8, paddingVertical: 8, borderRadius: 5, backgroundColor: 'coral', width: 100, alignItems: 'center',}}>
                    <Text style={{ fontSize: 13, color: "white", alignText: 'center', fontWeight: '600' }}>+ New</Text>
                  </View>
     </TouchableOpacity>
                        </View>


     <View style={{flex: 1, justifyContent: 'center', alignContent: 'center', alignItems: 'center'}}>
     <View style={styles.container}>
     <View style={styles.BoxesContainer}>
      <View style={styles.box2}>
      <BlurView intensity={100} style={styles.blurBackground}>
      <Text style={{ fontSize: 19, fontWeight: 'bold', marginTop: 10, marginLeft: 10, color: '#63EC55'}}>Engage your coaches to support and guide employees</Text>
     <Text style={{ fontSize: 15, color: "black", marginTop: 10, marginLeft: 10, marginRight: 200, color: 'white' }}>Assign coaches to mentor and support team members in their daily tasks and career development, while Recruitangle will assign subject matter experts to tutor and guide the growth of employees.</Text>
     <View style={{flexDirection: 'row'}}>
     <Image source={require('../assets/28.png')} style={styles.boximage} />
      </View>
      <View style={{flexDirection: 'row', marginTop: 10}}>
        <TouchableOpacity>
      <Image source={require('../assets/25.png')} style={styles.icon} />
      </TouchableOpacity>
      <TouchableOpacity onPress={handleOpenPress}>
     <Image source={require('../assets/26.png')} style={styles.icon} />
     </TouchableOpacity>
      </View>
      </BlurView>
      </View>

      <ManageEmployees />
</View>

      <View style={styles.BoxesContainer}>
      
      <View style={styles.box}>
      <Text style={{ fontSize: 18, fontWeight: 'bold', marginTop: 10, marginLeft: 10, color: '#63EC55'}}>Stats</Text>
      <View style={{flexDirection: 'row'}}>
      <View style={{flexDirection: 'column'}}>
      <Text style={{ marginTop: 10, marginLeft: 10, color: 'white'}}>Growth Plan</Text>
      <View style={{ justifyContent: "center", paddingHorizontal: 7, paddingVertical: 7, marginLeft: 10, marginTop: 5, backgroundColor: '#F2F2F2', width: 70, alignItems: 'center', alignContent: 'center',}}>
                    <Text style={{ fontSize: 16, color: "grey", alignText: 'center',}}>5</Text>
                  </View>
</View>
<View style={{flexDirection: 'column', position: 'absolute', right: 10}}>
<Text style={{ marginTop: 10, marginLeft: 10, color: 'white'}}>Hub Sessions</Text>
      <View style={{ justifyContent: "center", paddingHorizontal: 7, paddingVertical: 7, marginLeft: 10, marginTop: 5, backgroundColor: '#F2F2F2', width: 70, alignItems: 'center', alignContent: 'center',}}>
                    <Text style={{ fontSize: 16, color: "grey", alignText: 'center',}}>20</Text>
                  </View>
                  </View>
      </View>
     
      <View style={{flexDirection: 'row', marginTop: 10}}>
      <View style={{flexDirection: 'column'}}>
      <Text style={{ marginTop: 10, marginLeft: 10, color: 'white'}}>Advice Sessions</Text>
      <View style={{ justifyContent: "center", paddingHorizontal: 7, paddingVertical: 7, marginLeft: 10, marginTop: 5, backgroundColor: '#F2F2F2', width: 70, alignItems: 'center', alignContent: 'center',}}>
                    <Text style={{ fontSize: 16, color: "grey", alignText: 'center',}}>7</Text>
                  </View>
</View>
<View style={{flexDirection: 'column', position: 'absolute', right: 20}}>
<Text style={{ marginTop: 10, color: 'white'}}>Reviews</Text>
      <View style={{ justifyContent: "center", paddingHorizontal: 7, paddingVertical: 7, marginTop: 5, backgroundColor: '#F2F2F2', width: 70, alignItems: 'center', alignContent: 'center',}}>
                    <Text style={{ fontSize: 16, color: "grey", alignText: 'center',}}>13</Text>
                  </View>
                  </View>
      </View>
      <View style={{borderWidth: 1, borderColor: '#63EC55', marginTop: 25,}}>
      <Text style={{fontSize: 18, color: '#63EC55', marginTop: 10, marginLeft: 20,  fontWeight: 'bold' }}>Angle Badge</Text>
          <View style={{flexDirection: 'row' }}>
          <Text style={{fontSize: 14, marginTop: 10, marginLeft: 20,marginRight: 20, marginBottom: 20, color: 'white'  }}>This is the combined progress of your team</Text>
          <View style={{ alignItems: 'center', justifyContent: 'center', marginRight: 20, marginTop: -30 }}>
      <CustomPercentageChart percentage={45} />
      </View>
      </View>
</View>
      </View>
      <View style={styles.box3}>
      <View style={{flexDirection: 'row', marginTop: 10}}>
      <Text style={{ fontSize: 18, fontWeight: 'bold', marginTop: 10, marginLeft: 10, color: '#63EC55'}}>Teams</Text>
      <View style={{ justifyContent: "center", paddingHorizontal: 7, paddingVertical: 7, marginLeft: 10, marginTop: 5, backgroundColor: '#F2F2F2', width: 40, height: 40, borderRadius: 35, alignItems: 'center', alignContent: 'center',}}>
                    <Text style={{ fontSize: 16, color: "grey", alignText: 'center',}}>5</Text>
                  </View>
      </View>
      <Text style={{fontSize: 14, marginTop: 5, marginLeft: 10, color: 'white'  }}>Create new teams and manage previously created teams.</Text>
      <TouchableOpacity onPress={goToTeams}
          style={[
            styles.touchablecoach,
            isHovered && styles.touchableOpacityHovered
          ]}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          >
          <Text style={styles.touchableTextcoach}>Manage Teams</Text>
          </TouchableOpacity>
      </View>

      <View style={styles.box3}>
      <View style={{flexDirection: 'row', marginTop: 10}}> 
      <Text style={{ fontSize: 18, fontWeight: 'bold', marginTop: 10, marginLeft: 10, color: '#63EC55'}}>Members</Text>
      <View style={{ justifyContent: "center", paddingHorizontal: 7, paddingVertical: 7, marginLeft: 10, marginTop: 5, backgroundColor: '#F2F2F2', width: 40, height: 40, borderRadius: 35, alignItems: 'center', alignContent: 'center',}}>
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
    justifyContent: 'space-between',
    alignItems: 'space-between',
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
  icon: {
    width: 25,
    height: 25,
    marginRight: 5,
    marginTop: 5,
    marginLeft: 10
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
    backgroundColor: 'rgba(125,125,125,0.3)',
    marginLeft: 20,
    padding: 10,
    borderRadius: 20,
    width: 280,
    height: 360,
    borderWidth: 1, borderColor: 'rgba(225,225,212,0.3)',
  },
  box2: {
    backgroundColor: 'rgba(125,125,125,0.3)',
    borderRadius: 20,
    width: 750,
    height: 180,
    borderWidth: 1, borderColor: 'rgba(255,255,255,0.5)',
  },
  box3: {
    backgroundColor: 'rgba(125,125,125,0.3)',
    padding: 10,
    marginLeft: 20,
    marginTop: 20,
    padding: 10,
    borderRadius: 20,
    width: 280,
    height: 180,
    marginTop: 30,
    borderWidth: 1, borderColor: 'rgba(255,255,255,0.5)',
  },
  boximage: {
    width: 120,
    height: 120,
   position: 'absolute',
   right: 20,
   marginTop: -80
  },
  boximage2: {
    width: 30,
    height: 30,
    position: 'absolute',
    left: 350,
    marginTop:5, 
    borderRadius: 25
  },
  blurBackground: {
    flex: 1, 
    borderRadius: 20, 
    padding: 10,
  },
  touchablecoach: {
    backgroundColor: 'rgba(200,200,125,0.3)',
    padding: 8,
    paddingHorizontal: 5, 
    marginTop: 25,
    marginLeft: 30,
    marginRight: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  touchableTextcoach: {
    color: 'white',
    textAlign: 'center',
    fontSize: 13
  },
  touchableOpacityHovered: {
    backgroundColor: 'coral'
  },
});

export default MyComponent;
