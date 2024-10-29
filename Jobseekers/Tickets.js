import React, { useState, useEffect, useRef} from 'react';
import { View, Text, ScrollView, StyleSheet, Image, Linking, TouchableOpacity, Modal, ImageBackground } from 'react-native';
import Topbar from '../components/topbar';
import Sidebar from '../components/sidebar';
import GrowthPlantype from '../Jobseekers/Ticketstable';
import OpenModal from '../Jobseekers/NewTicket';
import { useNavigate } from 'react-router-dom';
import {useFonts} from "expo-font"
import { useTranslation } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

function MyComponent() { 
  const navigate = useNavigate();
    const [modalVisible, setModalVisible] = useState(false);
  const [lastCandidateLink, setLastCandidateLink] = useState(null);
  const [meetings, setMeetings] = useState([]);
  const [pendingCount, setPendingCount] = useState(0);
  const [reviewedCount, setReviewedCount] = useState(0);
  const [meetingData, setMeetingData] = useState({ date: '', time: '' });
  const complaintData = { followUpDate: 'Nov 25, 2024', severityLevel: 'High', representative: 'Patrick Oche' };
  const activeCount = 2; // Number of active complaints
  const resolvedCount = 5; // Number of resolved complaints

  const apiUrl = process.env.REACT_APP_API_URL;

  
    const handleOpenPress = () => {
      setModalVisible(true);
    };
  
    const handleCloseModal = () => {
      setModalVisible(false);
    };

 

  const handlejoinPress = () => {
    if (lastCandidateLink) {
      Linking.openURL(lastCandidateLink);
    } else {
      console.error('No candidate link found');
    }
  };

    const [fontsLoaded]=useFonts({
      "Roboto-Light":require("../assets/fonts/Roboto-Light.ttf"),
        })
      
        const { t } = useTranslation()
    return (
      <ImageBackground
    source={require ('../assets/backgroundimg2.png') }
  style={{ height: '100%', width: '100%',flex: 1}}
>
        <View style={{ flex: 1 }}>
            <Topbar />
            <View style={{ flexDirection: 'row', flex: 1 }}>
                <Sidebar />
                <ScrollView contentContainerStyle={{ flexGrow: 1, maxHeight: 500 }}>
                    <View style={{ marginLeft: 230 }}>
                    <View style={styles.header}>
            <TouchableOpacity>
              <View style={styles.item}>
                <Image
                  source={{ uri: 'https://img.icons8.com/?size=100&id=23413&format=png&color=5B5D55' }}
                  style={styles.image}
                />
                <Text style={{color: '#666', fontWeight: '600', marginLeft: 10, fontSize: 14, marginTop: 5 }}>{t("Tickets")}</Text>
              </View>
            </TouchableOpacity>
            </View>
                      <View style={{flexDirection: 'row'}}>
                        <TouchableOpacity onPress={handleOpenPress}>
    <View style={{ justifyContent: "flex-start", paddingHorizontal: 10, paddingVertical: 10, borderRadius: 5, borderColor: "#f7fff4", backgroundColor: 'rgba(211,249,216,0.3)', width: 150, alignItems: 'center', marginTop: 20, marginLeft: 50, borderWidth: 1 }}>
                    <Text style={{ fontSize: 13, color: "#f7fff4", alignText: 'center', fontWeight: 'bold',fontFamily:"Roboto-Light" }}>+ {t("New")}</Text>
                  </View>
     </TouchableOpacity>

                      
                      </View>
                      <View style={styles.container}>
     <View style={styles.box}>
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
          <Text style={styles.boxTitle}>Next Follow-up</Text>
          <Text style={styles.boxText}>{complaintData.followUpDate}</Text>
          <TouchableOpacity
            style={styles.joinButton}
            onPress={() => console.log('Join follow-up meeting')}
          >
            <Text style={styles.joinButtonText}>Join Now</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.box}>
        <Text style={styles.boxTitle}>Active Tickets</Text>
        <View style={styles.row}>
          <Text style={styles.statusNumber}>{activeCount}</Text>
          <Text style={styles.statusText}>In Progress</Text>
        </View>
      </View>

      <View style={styles.box}>
        <Text style={styles.boxTitle}>Resolved Tickets</Text>
        <View style={styles.row}>
          <Text style={styles.statusNumber}>{resolvedCount}</Text>
          <Text style={styles.statusText}>Completed</Text>
        </View>
      </View>

      <View style={styles.box}>
        <Text style={styles.boxTitle}>Severity Level</Text>
        <View style={styles.row}>
          <Text style={styles.levelText}>{complaintData.severityLevel}</Text>
        </View>
        <Text style={styles.representativeText}>Handled by {complaintData.representative}</Text>
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
                       
                        <GrowthPlantype />
            
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
        borderRadius: 10
      },
    header: {
        marginLeft: -60,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(225,225,212,0.3)',
        backgroundColor: '#f7fff4',
    },
    item: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginRight: 10, 
    }, 
    headertext: {
        marginLeft: 10,
        fontSize: 14,
        fontWeight: 'normal',
        marginTop: 7, 
        color: 'black'
    },
    image: {
        width: 20,
        height: 20,
        marginRight: 5,
        marginLeft: 100,
      marginTop: 5,
      tintColor: '#666',
    },
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
     marginTop: 50,
      maxWidth: '90%',
      marginLeft: 50,
      },
      box: {
        backgroundColor: '#f7fff4',
        padding: 20,
        borderRadius: 20,
        alignItems: 'center',
          justifyContent: 'center',
        width: '22%',
        height: 150,
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
      joinButton: {
        borderWidth: 2,
        borderColor: '#206C00',
        borderRadius: 5,
        paddingVertical: 8,
        paddingHorizontal: 10,
        marginTop: 10,
      },
      joinButtonText: {
        color: '#206C00',
        fontSize: 13,
        fontWeight: '600',
        textAlign: 'center',
      },
      row: {
        flexDirection: 'row',
        alignItems: 'center',
      },
      statusNumber: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#206C00',
      },
      statusText: {
        fontSize: 12,
        marginLeft: 10,
      },
      levelText: {
        fontSize: 14,
        fontWeight: 'bold',
        marginTop: 5,
      },
      representativeText: {
        fontSize: 12,
        color: '#206C00',
        textAlign: 'center',
        marginTop: 10,
      },
      boxImage: {
        width: 24,
        height: 24,
        marginLeft: 10,
      },
      boxTitle: {
        fontSize: 16,
        color: 'black',
        fontWeight: '600',
        textAlign: 'center',
        marginBottom: 10,
      },
});

export default MyComponent;
