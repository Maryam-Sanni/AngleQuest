import React, { useState } from 'react';
import { View, Text, StyleSheet, ImageBackground, ScrollView, TouchableOpacity, Modal } from 'react-native';
import Sidebar from '../components/sidebar';
import Topbar from '../components/topbar';
import { BlurView } from 'expo-blur';
import OpenSchedule from '../Jobseekers/SkipgrowthPayment';
import OpenSchedule2 from '../Jobseekers/MonthlygrowthSub';
import OpenSchedule3 from '../Jobseekers/AnnualgrowthSub'; 

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
                                        <Text style={{ color: 'black', fontSize: 18, fontWeight: 'bold', marginLeft: 50, marginTop: 20 }}>
                                            Hello Patrick, as a Data Analyst, here is something for you
                                        </Text>
                                        <Text style={{ color: '#206C00', fontSize: 13, marginTop: 10, marginLeft: 50 }}>
                                            Have you been longing to leap to the next stage in your career and it has been challenging?
                                        </Text>
                                        <Text style={{ color: '#206C00', fontSize: 13, marginLeft: 50, marginTop: 3 }}>
                                            If Yes, do you know expert Emily Ray can become your coach and do the following with you:
                                        </Text>
                                        <View style={styles.box}>
                                            <View style={{ flexDirection: 'row' }}>
                                                <View style={styles.rhcontainer}>
                                                    <View style={styles.rhombus}>
                                                        <Text style={styles.insideText}>Create a personal development plan with you</Text>
                                                    </View>
                                                    <Text style={{ marginTop: 50, width: 220, fontSize: 13 }}>• Create the next stage plan with you </Text>
                                                    <Text style={{ marginTop: 5, width: 220, fontSize: 13 }}>• Periodically reviews your progress </Text>
                                                    <Text style={{ marginTop: 5, width: 220, fontSize: 13 }}>• Continuously rates your progress </Text>
                                                    <Text style={{ color: '#206C00', fontSize: 14, marginTop: 20, fontWeight: "bold", marginBottom: 20 }}>Biannually</Text>
                                                </View>
                                                <View style={styles.rhcontainer}>
                                                    <View style={styles.rhombus}>
                                                        <Text style={styles.insideText}>Hands-on teaching every month</Text>
                                                    </View>
                                                    <Text style={{ marginTop: 50, width: 220, fontSize: 13 }}>• Monthly hands-on training </Text>
                                                    <Text style={{ marginTop: 5, width: 220, fontSize: 13 }}>• Shares knowledge gained with you </Text>
                                                    <Text style={{ marginTop: 5, width: 220, fontSize: 13 }}>• Shares tips to apply at work </Text>
                                                    <Text style={{ color: '#206C00', fontSize: 14, marginTop: 20, fontWeight: "bold", marginBottom: 20 }}>Monthly</Text>
                                                </View>
                                                <View style={styles.rhcontainer}>
                                                    <View style={styles.rhombus}>
                                                        <Text style={styles.insideText}>Periodic advice and growth review</Text>
                                                    </View>
                                                    <Text style={{ marginTop: 50, width: 220, fontSize: 13 }}>• One-on-One Career advice </Text>
                                                    <Text style={{ marginTop: 5, width: 220, fontSize: 13 }}>• One-on-One Growth advice </Text>
                                                    <Text style={{ marginTop: 5, width: 220 }}> </Text>
                                                    <Text style={{ color: '#206C00', fontSize: 14, marginTop: 20, fontWeight: "bold", marginBottom: 20 }}>Quarterly</Text>
                                                </View>
                                                <View style={styles.rhcontainer}>
                                                    <View style={styles.rhombus}>
                                                        <Text style={styles.insideText}>Available to answer your questions</Text>
                                                    </View>
                                                    <Text style={{ marginTop: 50, width: 220, fontSize: 13 }}>• Becomes your buddy </Text>
                                                    <Text style={{ marginTop: 5, width: 220, fontSize: 13 }}>• Available to answer questions </Text>
                                                    <Text style={{ marginTop: 5, width: 220 }}>  </Text>
                                                    <Text style={{ color: '#206C00', fontSize: 14, marginTop: 20, fontWeight: "bold", marginBottom: 20 }}>Weekly</Text>
                                                </View>
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

                                            <TouchableOpacity onPress={handleOpenPress2} style={styles.buttonplus}>
                                                <Text style={styles.buttonTextplus}>Next</Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity onPress={handleOpenPress} style={styles.buttonskip}>
                                                <Text style={styles.buttonTextskip}>Skip</Text>
                                            </TouchableOpacity>
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
    rhcontainer: {
        alignItems: 'center',
    },
    rhombus: {
        marginTop: 50,
        width: 130,
        height: 130,
        backgroundColor: 'none',
        borderWidth: 2,
        borderColor: '#206C00',
        transform: [{ rotate: '45deg' }],
        justifyContent: 'center',
        alignItems: 'center',
    },
    insideText: {
        transform: [{ rotate: '-45deg' }],
        color: '#206C00',
        fontSize: 14,
        textAlign: 'center'
    },
    belowText: {
        marginTop: 20,
        textAlign: 'center',
    },
    box: {
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
    buttonplus: {
        backgroundColor: 'coral',
        padding: 5,
        marginLeft: 360,
        width: 100,
        paddingHorizontal: 20,
        marginTop: 10,
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
        marginTop: 10,
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
});

export default App;
