import React, { useState } from 'react';
import { View, Text, StyleSheet, ImageBackground, ScrollView, TouchableOpacity, Modal, Image } from 'react-native';
import Sidebar from '../components/sidebar';
import Topbar from '../components/topbar';
import { BlurView } from 'expo-blur';
import OpenSchedule from '../Jobseekers/SkipadvicePayment';
import OpenSchedule2 from '../Jobseekers/MonthlyadviceSub';
import OpenSchedule3 from '../Jobseekers/AnnualadviceSub'; 

const App = () => {
    const [isAnnualPressed, setIsAnnualPressed] = useState(false);
    const [isMonthlyPressed, setIsMonthlyPressed] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [modalVisible2, setModalVisible2] = useState(false);
    const [modalVisible3, setModalVisible3] = useState(false); 

    const handleOpenPress = () => {
        setModalVisible(true);
    };

    const handleCloseModal = () => {
        setModalVisible(false);
    };

    const handleOpenPress2 = () => {
        if (isMonthlyPressed) {
            setModalVisible2(true);
        } else if (isAnnualPressed) {
            setModalVisible3(true);
        }
    };

    const handleCloseModal2 = () => {
        setModalVisible2(false);
    };

    const handleCloseModal3 = () => {
        setModalVisible3(false);
    };

    const handlePress = () => {
        setIsAnnualPressed(prevState => !prevState);
        if (isMonthlyPressed) {
            setIsMonthlyPressed(false);
        }
    };

    const handlePress2 = () => {
        setIsMonthlyPressed(prevState => !prevState);
        if (isAnnualPressed) {
            setIsAnnualPressed(false);
        }
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
                                            Hey Patrick, here is an offer...
                                        </Text>
                                        <Text style={{ color: '#206C00', fontSize: 13, marginLeft: 50, marginTop: 3 }}>
                                            Do you know expert Emily Ray can become your coach and do the following with you:
                                        </Text>

                                        <View style={styles.box}>
                                        <View style={styles.arrowContainer}>
            <View style={styles.arrow} />
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginLeft: 25, marginRight: 25 }}>
        {/* Basic Section */}
        <TouchableOpacity style={{ flex: 1, marginHorizontal: 5, marginVertical: 10, marginRight: 10, backgroundColor: 'transparent', shadowColor: '#000', shadowOffset: { width: 0, height: 2, }, shadowOpacity: 0.25, shadowRadius: 3.84, elevation: 5, borderRadius: 12, borderColor: '#63EC55', borderWidth: 1 }}>
          <View style={{ paddingHorizontal: 6, paddingVertical: 7, backgroundColor: 'white', borderRadius: 12, height: 200, }}>
            <Text style={{ fontSize: 18, fontWeight: 'bold', marginTop: 10, marginLeft: 10  }}>1. Growth Plan</Text>
            <View style={{ flexDirection: 'row', marginTop: 10 }}>
              <Image
                source={{ uri: 'https://cdn.builder.io/api/v1/image/assets/TEMP/ccb4e9d11761a733c7f0b31358f0adde0677991513c5c76300ef8731486bdcd9?apiKey=7b9918e68d9b487793009b3aea5b1a32' }}
                style={{ width: 24, height: 24, marginRight: 5 }}
                resizeMode="contain"
              />
              <Text>Create the next stage plan with you</Text>
            </View>
            <View style={{ flexDirection: 'row', marginTop: 3 }}>
              <Image
                source={{ uri: 'https://cdn.builder.io/api/v1/image/assets/TEMP/ccb4e9d11761a733c7f0b31358f0adde0677991513c5c76300ef8731486bdcd9?apiKey=7b9918e68d9b487793009b3aea5b1a32' }}
                style={{ width: 24, height: 24, marginRight: 5 }}
                resizeMode="contain"
              />
              <Text>Periodically reviews your progress</Text>
            </View>
            <View style={{ flexDirection: 'row', marginTop: 3 }}>
              <Image
                source={{ uri: 'https://cdn.builder.io/api/v1/image/assets/TEMP/ccb4e9d11761a733c7f0b31358f0adde0677991513c5c76300ef8731486bdcd9?apiKey=7b9918e68d9b487793009b3aea5b1a32' }}
                style={{ width: 24, height: 24, marginRight: 5 }}
                resizeMode="contain"
              />
              <Text>Continuously rates your progress</Text>
            </View>
          </View>
        </TouchableOpacity>

        {/* Standard Section */}
        <TouchableOpacity style={{ flex: 1, marginHorizontal: 5, marginVertical: 10, marginRight: 10, borderRadius: 12, backgroundColor: 'transparent', shadowColor: '#000', shadowOffset: { width: 0, height: 2, }, shadowOpacity: 0.25, shadowRadius: 3.84, elevation: 5, borderRadius: 12, borderColor: '#63EC55', borderWidth: 1  }}>
          <View style={{ paddingHorizontal: 6, paddingVertical: 7, backgroundColor: 'white', borderRadius: 12, height: 200 }}>
            <Text style={{ fontSize: 18, fontWeight: 'bold', color: 'black', marginTop: 10, marginLeft: 10 }}>2. Hubs</Text>
            <View style={{ flexDirection: 'row', marginTop: 10 }}>
              <Image
                source={{ uri: 'https://cdn.builder.io/api/v1/image/assets/TEMP/ccb4e9d11761a733c7f0b31358f0adde0677991513c5c76300ef8731486bdcd9?apiKey=7b9918e68d9b487793009b3aea5b1a32' }}
                style={{ width: 24, height: 24, marginRight: 5 }}
                resizeMode="contain"
              />
              <Text>Monthly hands-on training</Text>
            </View>
            <View style={{ flexDirection: 'row', marginTop: 2 }}>
              <Image
                source={{ uri: 'https://cdn.builder.io/api/v1/image/assets/TEMP/ccb4e9d11761a733c7f0b31358f0adde0677991513c5c76300ef8731486bdcd9?apiKey=7b9918e68d9b487793009b3aea5b1a32' }}
                style={{ width: 24, height: 24, marginRight: 5 }}
                resizeMode="contain"
              />
              <Text> Shares knowledge gained with you </Text>
            </View>
            <View style={{ flexDirection: 'row', marginTop: 3 }}>
              <Image
                source={{ uri: 'https://cdn.builder.io/api/v1/image/assets/TEMP/ccb4e9d11761a733c7f0b31358f0adde0677991513c5c76300ef8731486bdcd9?apiKey=7b9918e68d9b487793009b3aea5b1a32' }}
                style={{ width: 24, height: 24, marginRight: 5 }}
                resizeMode="contain"
              />
              <Text>Shares tips to apply at work</Text>
            </View>
          </View>
        </TouchableOpacity>

        {/* Pro Section */}
        <TouchableOpacity style={{ flex: 1, marginHorizontal: 5, marginVertical: 10, backgroundColor: 'transparent', shadowColor: '#000', shadowOffset: { width: 0, height: 2, }, shadowOpacity: 0.25, shadowRadius: 3.84, elevation: 5, borderRadius: 12, borderColor: '#63EC55', borderWidth: 1 }}>
          <View style={{ paddingHorizontal: 6, paddingVertical: 7, backgroundColor: 'white', borderRadius: 12, height: 200 }}>
            <Text style={{ fontSize: 18, fontWeight: 'bold', color: 'black', marginTop: 10, marginLeft: 10  }}>3. Advice</Text>
            <View style={{ flexDirection: 'row', marginTop: 10 }}>
              <Image
                source={{ uri: 'https://cdn.builder.io/api/v1/image/assets/TEMP/ccb4e9d11761a733c7f0b31358f0adde0677991513c5c76300ef8731486bdcd9?apiKey=7b9918e68d9b487793009b3aea5b1a32' }}
                style={{ width: 24, height: 24, marginRight: 5 }}
                resizeMode="contain"
              />
              <Text>One-on-One Career advice</Text>
            </View>
            <View style={{ flexDirection: 'row', marginTop: 2 }}>
              <Image
                source={{ uri: 'https://cdn.builder.io/api/v1/image/assets/TEMP/ccb4e9d11761a733c7f0b31358f0adde0677991513c5c76300ef8731486bdcd9?apiKey=7b9918e68d9b487793009b3aea5b1a32' }}
                style={{ width: 24, height: 24, marginRight: 5 }}
                resizeMode="contain"
              />
              <Text>One-on-One Growth advice</Text>
            </View>
          </View>
        </TouchableOpacity>

         {/* Pro Section */}
         <TouchableOpacity style={{ flex: 1, marginHorizontal: 5, marginVertical: 10, backgroundColor: 'transparent', shadowColor: '#000', shadowOffset: { width: 0, height: 2, }, shadowOpacity: 0.25, shadowRadius: 3.84, elevation: 5, borderRadius: 12, borderColor: '#63EC55', borderWidth: 1 }}>
          <View style={{ paddingHorizontal: 6, paddingVertical: 7, backgroundColor: 'white', borderRadius: 12, height: 200 }}>
            <Text style={{ fontSize: 18, fontWeight: 'bold', color: 'black', marginTop: 10, marginLeft: 10  }}>4. Mentorship & Guidance</Text>
            <View style={{ flexDirection: 'row', marginTop: 10 }}>
              <Image
                source={{ uri: 'https://cdn.builder.io/api/v1/image/assets/TEMP/ccb4e9d11761a733c7f0b31358f0adde0677991513c5c76300ef8731486bdcd9?apiKey=7b9918e68d9b487793009b3aea5b1a32' }}
                style={{ width: 24, height: 24, marginRight: 5 }}
                resizeMode="contain"
              />
              <Text>Becomes your buddy</Text>
            </View>
            <View style={{ flexDirection: 'row', marginTop: 2 }}>
              <Image
                source={{ uri: 'https://cdn.builder.io/api/v1/image/assets/TEMP/ccb4e9d11761a733c7f0b31358f0adde0677991513c5c76300ef8731486bdcd9?apiKey=7b9918e68d9b487793009b3aea5b1a32' }}
                style={{ width: 24, height: 24, marginRight: 5 }}
                resizeMode="contain"
              />
              <Text>Available to answer questions </Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    
      <View style={styles.arrowContainer2}>
            <View style={styles.arrowLeft} />
        </View>
                                            </View>

                                        <Text style={{ color: '#206C00', fontSize: 14, marginTop: 30, fontWeight: '500', marginLeft: 30, marginBottom: 20 }}>Curious about how much it costs? Just a token: </Text>
                                        <View style={{ flexDirection: 'row' }}>
                                            <TouchableOpacity
                                                style={[
                                                    styles.touchableOpacity,
                                                    { backgroundColor: isAnnualPressed ? '#4A5568' : 'white' }
                                                ]}
                                                activeOpacity={1}
                                                onPress={handlePress}
                                            />
                                            <Text style={{ fontSize: 15, fontWeight: 'bold' }}> Annually $840  </Text>
                                        </View>
                                        <Text style={{ fontSize: 12, color: '#206C00', marginTop: 7, marginLeft: 40 }}> Saves you 15% ($120)  </Text>

                                        <View style={{ flexDirection: 'row', marginTop: 20 }}>
                                            <TouchableOpacity
                                                style={[
                                                    styles.touchableOpacity,
                                                    { backgroundColor: isMonthlyPressed ? '#4A5568' : 'white' }
                                                ]}
                                                activeOpacity={1}
                                                onPress={handlePress2}
                                            />
                                            <Text style={{ fontSize: 15, fontWeight: 'bold' }}> Monthly $80  </Text>
                                        </View>
                                        <Text style={{ fontSize: 12, color: '#206C00', marginTop: 25, marginLeft: 30, fontWeight: '600' }}>Its a question of how much you believe in yourself...</Text>
                                        <View style={{ flexDirection: 'row' }}>
                                            <Text style={{ fontSize: 12, color: '#206C00', marginTop: 5, marginLeft: 30, fontWeight: '600' }}>Imagine how this could transform your career in 6 months!</Text>

                                            <View style={styles.buttonContainer}>
                                            <TouchableOpacity onPress={handleOpenPress2} style={styles.buttonplus}>
                                                <Text style={styles.buttonTextplus}>Next</Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity onPress={handleOpenPress} style={styles.buttonskip}>
                                                <Text style={styles.buttonTextskip}>Skip</Text>
                                            </TouchableOpacity>
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
                                        <Modal
                                            animationType="slide"
                                            transparent={true}
                                            visible={modalVisible2}
                                            onRequestClose={handleCloseModal2}
                                        >
                                            <View style={styles.modalContent}>
                                                <OpenSchedule2 onClose={handleCloseModal2} />
                                            </View>
                                        </Modal>
                                        <Modal
                                            animationType="slide"
                                            transparent={true}
                                            visible={modalVisible3}
                                            onRequestClose={handleCloseModal3}
                                        >
                                            <View style={styles.modalContent}>
                                                <OpenSchedule3 onClose={handleCloseModal3} />
                                            </View>
                                        </Modal>
                                    </View>
                                </View>
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
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
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
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
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
    padding: 30,
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
    buttonContainer: {
      position: 'absolute',
      flexDirection: 'row',
      right: 30,
      marginBottom: 5,
      bottom: -30
  },
    buttonplus: {
        backgroundColor: 'coral',
        padding: 5,
        marginLeft: 360,
        width: 100,
        paddingHorizontal: 20,
        marginBottom: 30
    },
    buttonskip: {
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: 'coral',
        padding: 5,
        marginLeft: 20,
        width: 100,
        paddingHorizontal: 20,
        marginBottom: 30
    },
    buttonTextplus: {
        color: 'white',
        fontSize: 14,
        textAlign: 'center',
    },
    buttonTextskip: {
        color: 'coral',
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
