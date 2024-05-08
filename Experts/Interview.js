 import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, Image, TouchableHighlight, TouchableOpacity, Modal } from 'react-native';
import Topbar from '../components/expertstopbar';
import Sidebar from '../components/expertssidebar';
import ScheduledMeetingsTable from '../components/ScheduledMeetingsTable';
import AwaitingFeedbacks from '../components/AwaitingFeedbacks';
import CompletedFeedbacks from '../components/CompletedFeedbacks';
import OpenModal from '../Experts/InterviewProfile'; 
import { useNavigation } from '@react-navigation/native';

function MyComponent() { 
    const navigation = useNavigation();
    const [isInterviewHovered, setIsInterviewHovered] = useState(false);
    const [isGrowthHovered, setIsGrowthHovered] = useState(false);
    const [isAdviceHovered, setIsAdviceHovered] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);

    const handleOpenPress = () => {
      setModalVisible(true);
    };
  
    const handleCloseModal = () => {
      setModalVisible(false);
    };

    const goToInterview = () => {
        navigation.navigate('Interview');
    };

    const goToGrowth = () => {
        navigation.navigate('Growth Plan');
    };

    const goToAdvice = () => {
        navigation.navigate('Advice');
    };


    return (
        <View style={{ flex: 1 }}>
            <Topbar />
            <View style={{ flexDirection: 'row', flex: 1 }}>
                <Sidebar />
                <ScrollView contentContainerStyle={{ flexGrow: 1, maxHeight: 500 }}>
                    <View style={{ marginLeft: 270, backgroundColor: 'white' }}>
                        <View style={styles.header}>
                            <TouchableHighlight
                                onPress={goToInterview} 
                                underlayColor={isInterviewHovered ? 'transparent' : 'transparent'}
                                onMouseEnter={() => setIsInterviewHovered(true)}
                                onMouseLeave={() => setIsInterviewHovered(false)}>
                                <View style={styles.item}>
                                    <Image source={require('../assets/expertsinterview.png')} style={styles.image} />
                                    <Text style={[styles.headertext, isInterviewHovered && { color: 'coral' }]}>Interviews</Text>
                                </View>
                            </TouchableHighlight>
                            <TouchableHighlight
                                onPress={goToGrowth}
                                underlayColor={isGrowthHovered ? 'transparent' : 'transparent'}
                                onMouseEnter={() => setIsGrowthHovered(true)}
                                onMouseLeave={() => setIsGrowthHovered(false)}>
                                <View style={styles.item}>
                                    <Image source={require('../assets/expertsgrowth.png')} style={styles.image} />
                                    <Text style={[styles.headertext, isGrowthHovered && { color: 'coral' }]}>Growth Plan</Text>
                                </View>
                            </TouchableHighlight>
                            <TouchableHighlight
                                onPress={goToAdvice}
                                underlayColor={isAdviceHovered ? 'transparent' : 'transparent'}
                                onMouseEnter={() => setIsAdviceHovered(true)}
                                onMouseLeave={() => setIsAdviceHovered(false)}>
                                <View style={styles.item}>
                                    <Image source={require('../assets/expertsadvice.png')} style={styles.image} />
                                    <Text style={[styles.headertext, isAdviceHovered && { color: 'coral' }]}>Advice</Text>
                                </View>
                            </TouchableHighlight>
                        </View>

                        <TouchableOpacity onPress={handleOpenPress}>
                            <View style={{ justifyContent: "flex-start", paddingHorizontal: 10, paddingVertical: 10, borderRadius: 5, borderColor: "#206C00", borderWidth: 1, backgroundColor: "#d3f9d8", width: 140, alignItems: 'center', marginTop: 10, marginLeft: 50 }}>
                                <Text style={{ fontSize: 14, color: "#206C00", alignText: 'center' }}>Interview Profile</Text>
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
                        <AwaitingFeedbacks />
                        <CompletedFeedbacks />
                    </View>
                </ScrollView>
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
        borderRadius: 10
      },
    header: {
        marginLeft: -60,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        backgroundColor: 'white',
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    item: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginRight: 10, 
    }, 
    headertext: {
        marginLeft: 5,
        fontSize: 14,
        fontWeight: '500',
        marginTop: 5, 
        color: '#666'
    },
    image: {
        width: 24,
        height: 24,
        marginRight: 5,
        marginLeft: 100
    },
});

export default MyComponent;
