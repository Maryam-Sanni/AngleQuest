import React, { useState } from 'react';
import { View, Text, StyleSheet, ImageBackground, ScrollView, TouchableOpacity, Modal, Image } from 'react-native';
import Sidebar from '../components/sidebar';
import Topbar from '../components/topbar';
import { BlurView } from 'expo-blur';
import { useNavigation } from '@react-navigation/native';
import OpenSchedule from '../Jobseekers/Others';

const App = () => {
    const [modalVisible, setModalVisible] = useState(false);
    const navigation = useNavigation();

    const goToInterview = () => {
        navigation.navigate('New Interview');
      };
    
      const goToGrowth = () => {
        navigation.navigate('New Growth Plan');
      };

      const goToHub = () => {
        navigation.navigate('Coaching Hubs');
      };

      const goToAdvice = () => {
        navigation.navigate('New Advice');
      };

      const handleOpenPress = () => {
        setModalVisible(true);
    };

    const handleCloseModal = () => {
        setModalVisible(false);
    };

    return (
        <ImageBackground
            source={require('../assets/Background.png')}
            style={{ height: '110%', width: '100%', flex: 1 }}
        >
            <BlurView intensity={70} style={{ flex: 1 }}>
                <View style={{ flex: 1 }}>
                    <Topbar />
                    <View style={{ flexDirection: 'row', flex: 1 }}>
                        <Sidebar />
                        <ScrollView contentContainerStyle={{ flexGrow: 1, maxHeight: 500 }}>
                            <View style={styles.glassBox}>
                                <View style={styles.pagecontainer}>
                                    <View style={{ flex: 1 }}>
                                        <Text style={{ color: 'black', fontSize: 20, fontWeight: 'bold', marginLeft: 50, marginTop: 20 }}>
                                            What would you like to do today?
                                        </Text>
                                        <Text style={{ color: '#206C00', fontSize: 13, marginLeft: 50, marginTop: 3 }}>
                                            Below are the different ways we can contribute to your growth
                                        </Text>
                
                                        <View style={styles.box}>
                                        <View style={styles.arrowContainer}>
            <View style={styles.arrow} />
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginLeft: 5, marginRight: 5 }}>
       
        <View style={{ flex: 1,  justifyContent: 'center', alignItems: 'center', marginRight: 10, backgroundColor: 'white', shadowColor: '#000', shadowOffset: { width: 0, height: 2, }, shadowOpacity: 0.25, shadowRadius: 3.84, elevation: 5, borderRadius: 12, borderColor: '#63EC55', borderWidth: 1 }}>
          <View style={{ paddingHorizontal: 6, justifyContent: 'center', alignItems: 'center', paddingVertical: 7, backgroundColor: 'white', borderRadius: 12, height: 200, }}>
            <Text style={{ fontSize: 18,  marginTop: 10, marginLeft: 10, height: 120,  }}>Do you have an upcoming interview? </Text>
            <TouchableOpacity onPress={goToInterview} style={{ justifyContent: 'center', alignItems: 'center', paddingHorizontal: 10, padding: 5, marginTop: 50, marginBottom: 10, backgroundColor: 'coral', borderRadius: 5, marginRight: 15, marginLeft: 15 }}>
              <Text style={{ fontSize: 12, color: 'white', alignText: 'center'}}>Get Interviewed</Text>
            </TouchableOpacity>
           
          </View>
        </View>

        <View style={{ flex: 1,  justifyContent: 'center', alignItems: 'center', marginRight: 10, backgroundColor: 'white', shadowColor: '#000', shadowOffset: { width: 0, height: 2, }, shadowOpacity: 0.25, shadowRadius: 3.84, elevation: 5, borderRadius: 12, borderColor: '#63EC55', borderWidth: 1 }}>
          <View style={{ paddingHorizontal: 6, justifyContent: 'center', alignItems: 'center', paddingVertical: 7, backgroundColor: 'white', borderRadius: 12, height: 200, }}>
            <Text style={{ fontSize: 18,  marginTop: 10, marginLeft: 10, height: 120,  }}>Do you want to move to the next level in your career? </Text>
            <TouchableOpacity onPress={goToGrowth} style={{width: 100, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 10, padding: 5, marginTop: 50, marginBottom: 10, backgroundColor: 'coral', borderRadius: 5, marginRight: 15, marginLeft: 15 }}>
              <Text style={{ fontSize: 12, color: 'white', alignText: 'center' }}>Create Plan</Text>
            </TouchableOpacity>
           
          </View>
        </View>

        <View style={{ flex: 1,  justifyContent: 'center', alignItems: 'center', marginHorizontal: 5, marginVertical: 10, backgroundColor: 'white', shadowColor: '#000', shadowOffset: { width: 0, height: 2, }, shadowOpacity: 0.25, shadowRadius: 3.84, elevation: 5, borderRadius: 12, borderColor: '#63EC55', borderWidth: 1 }}>
          <View style={{ paddingHorizontal: 6, justifyContent: 'center', alignItems: 'center', paddingVertical: 7, backgroundColor: 'white', borderRadius: 12, height: 200, }}>
            <Text style={{ fontSize: 18,  marginTop: 10, marginLeft: 10, height: 120,  }}>Do you want to learn directly from an expert? </Text>
            <TouchableOpacity onPress={goToHub} style={{ width: 100, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 10, padding: 5, marginTop: 50, marginBottom: 10, backgroundColor: 'coral', borderRadius: 5, marginRight: 15, marginLeft: 15 }}>
              <Text style={{ fontSize: 12, color: 'white' }}>Join a hub</Text>
            </TouchableOpacity>
           
          </View>
        </View>

        <View style={{ flex: 1,  justifyContent: 'center', alignItems: 'center', marginHorizontal: 5, marginVertical: 10, marginRight: 10, backgroundColor: 'white', shadowColor: '#000', shadowOffset: { width: 0, height: 2, }, shadowOpacity: 0.25, shadowRadius: 3.84, elevation: 5, borderRadius: 12, borderColor: '#63EC55', borderWidth: 1 }}>
          <View style={{ paddingHorizontal: 6, justifyContent: 'center', alignItems: 'center', paddingVertical: 7, backgroundColor: 'white', borderRadius: 12, height: 200, }}>
            <Text style={{ fontSize: 18,  marginTop: 10, marginLeft: 10, height: 120,  }}>Are you stuck and need some direction in your career? </Text>
            <TouchableOpacity onPress={goToAdvice} style={{width: 100, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 10, padding: 5, marginTop: 50, marginBottom: 10, backgroundColor: 'coral', borderRadius: 5, marginRight: 15, marginLeft: 15 }}>
              <Text style={{ fontSize: 12, color: 'white' }}>Advice Session</Text>
            </TouchableOpacity>
           
          </View>
        </View>

        <View style={{ flex: 1,  justifyContent: 'center', alignItems: 'center', marginHorizontal: 5, marginVertical: 10, marginRight: 10, backgroundColor: 'white', shadowColor: '#000', shadowOffset: { width: 0, height: 2, }, shadowOpacity: 0.25, shadowRadius: 3.84, elevation: 5, borderRadius: 12, borderColor: '#63EC55', borderWidth: 1 }}>
          <View style={{ paddingHorizontal: 6, justifyContent: 'center', alignItems: 'center', paddingVertical: 7, backgroundColor: 'white', borderRadius: 12, height: 200, }}>
            <Text style={{ fontSize: 18,  marginTop: 10, marginLeft: 10, height: 120,  }}>Others?</Text>
            <TouchableOpacity onPress={handleOpenPress} style={{width: 100, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 10, padding: 5, marginTop: 50, marginBottom: 10, backgroundColor: 'coral', borderRadius: 5, marginRight: 15, marginLeft: 15 }}>
              <Text style={{ fontSize: 12, color: 'white' }}>Tell Us</Text>
            </TouchableOpacity>
           
          </View>
        </View>

      </View>
    
      <View style={styles.arrowContainer2}>
            <View style={styles.arrowLeft} />
        </View>
        </View>                      
                                             
        <View style={styles.skipButtonContainer}>
                                            <TouchableOpacity
                                                style={styles.buttonplus}
                                                onPress={() => navigation.goBack()}
                                            >
                                                <Text style={styles.buttonTextplus}>Back</Text>
                                            </TouchableOpacity>
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
                                                <OpenSchedule onClose={handleCloseModal} />
                                            </View>
                                        </Modal>
                            </View>
                        </ScrollView>
                    </View>
                </View>
            </BlurView>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    modalContent: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        borderRadius: 10
    },
    pagecontainer: {
        backgroundColor: '#f7fff4',
        borderRadius: 20,
        padding: 20,
        marginTop: 30,
        marginLeft: 30,
        marginRight: 30,
        marginBottom: 30,
        borderWidth: 2,
        borderColor: 'rgba(225,225,212,0.3)',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    glassBox: {
        backgroundColor: 'rgba(225,255,212,0.3)',
        borderRadius: 20,
        marginTop: 30,
        marginLeft: 240,
        marginRight: 30,
        marginBottom: 30,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        marginTop: 50,
    },
    box: {
        padding: 20,
        marginTop: 30,
        alignItems: 'center',
        borderWidth: 2,
        borderColor: '#63EC55',
        marginLeft: 30,
        marginRight: 30,
    },
    touchableOpacity: {
        height: 18,
        width: 18,
        borderRadius: 15,
        borderWidth: 1,
        borderColor: "#4A5568",
        marginRight: 5,
        marginLeft: 30,
    },
    skipButtonContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginRight: 30,
    },
    buttonplus: {
        backgroundColor: 'coral',
        padding: 5,
        width: 100,
        paddingHorizontal: 20,
        marginTop: 50,
        marginBottom: 30,
    },
    buttonTextplus: {
        color: 'white',
        fontSize: 14,
        textAlign: 'center',
    },
    arrowContainer: {
        position: 'absolute',
        top: 0,
        left: '40%',
        transform: [{ translateY: -10 }],
      },
      arrowContainer2: {
        position: 'absolute',
        bottom: -10,
        left: '80%',
        transform: [{ translateX: -10 }],
      },
      arrow: {
        width: 0,
        height: 0,
        backgroundColor: 'transparent',
        borderStyle: 'solid',
        borderTopWidth: 10,
        borderBottomWidth: 10,
        borderLeftWidth: 15,
        borderTopColor: 'transparent',
        borderBottomColor: 'transparent',
        borderLeftColor: '#63EC55',
      },
      arrowLeft: {
        width: 0,
        height: 0,
        backgroundColor: 'transparent',
        borderStyle: 'solid',
        borderTopWidth: 10,
        borderBottomWidth: 10,
        borderRightWidth: 15,
        borderTopColor: 'transparent',
        borderBottomColor: 'transparent',
        borderRightColor: '#63EC55',
    },
});

export default App; 