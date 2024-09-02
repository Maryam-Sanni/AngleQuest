      import React, { useState, useEffect } from 'react';
      import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image, Modal } from 'react-native';
      import { useFonts } from 'expo-font';
      import { useTranslation } from 'react-i18next';
      import axios from 'axios';
      import AsyncStorage from '@react-native-async-storage/async-storage';
import OpenModal from './ConfirmMeetingEnd';

      function MyComponent({ onClose }) {
        const [meetings, setMeetings] = useState([]);
         const [modalVisible, setModalVisible] = useState(false);
        const [selectedMeeting, setSelectedMeeting] = useState(null);

        const handleOpenPress = async (meeting) => {
          setSelectedMeeting(meeting);
          setModalVisible(true);

          try {
            await AsyncStorage.setItem('selectedMeeting', JSON.stringify(meeting));
            console.log('Selected meeting saved:', meeting);
          } catch (error) {
            console.error('Failed to save selected meeting to AsyncStorage', error);
          }
        };

        const handleCloseModal = () => {
          setModalVisible(false);
        };

        const [fontsLoaded] = useFonts({
          'Roboto-Light': require("../assets/fonts/Roboto-Light.ttf"),
        });
        const { t } = useTranslation();

        useEffect(() => {
          const fetchMeetingData = async () => {
            try {
              const token = await AsyncStorage.getItem('token');
              if (!token) {
                console.error('No token found');
                return;
              }

              const response = await axios.get('https://recruitangle.com/api/expert/newhubmeeting/get', {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              });

              if (response.status === 200) {
                const { NewMeeting } = response.data;
                if (NewMeeting && NewMeeting.length > 0) {
                  setMeetings(NewMeeting);
                } else {
                  console.error('No meetings found');
                }
              } else {
                console.error('Failed to fetch meeting data');
              }
            } catch (error) {
              console.error('Error fetching meeting data:', error);
            }
          };

          fetchMeetingData();
        }, []);

        return (
          <View style={{ flex: 1, backgroundColor: "rgba(0, 0, 0, 0.5)", marginTop: 40, alignItems: 'center' }}>
            <View style={styles.greenBox}>
              <ScrollView contentContainerStyle={{ flexGrow: 1, maxHeight: 500 }}>
                <View style={styles.header}>
                  <Image
                    source={{ uri: 'https://cdn.builder.io/api/v1/image/assets/TEMP/1f2d38e99b0016f2bd167d2cfd38ff0d43c9f94a93c84b4e04a02d32658fb401?apiKey=7b9918e68d9b487793009b3aea5b1a32&' }}
                    style={styles.logo}
                  />
                  <Text style={styles.headerText}>{t("All Hub Sessions")}</Text>
                  <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                    <Text style={{ fontSize: 18, color: '#3F5637', fontWeight: 'bold', fontFamily: "Roboto-Light" }}>
                      ✕
                    </Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.container}>
                  <View style={styles.table}>
                    <View style={styles.row}>
                      <View style={styles.cell}>
                        <Text style={{ fontWeight: '600', fontSize: 14, fontFamily: "Roboto-Light" }}>{t("Topic")}</Text>
                      </View>
                      <View style={styles.cell}>
                        <Text style={{ fontWeight: '600', fontSize: 14, fontFamily: "Roboto-Light" }}>{t("Description")}</Text>
                      </View>
                      <View style={styles.cell}>
                        <Text style={{ fontWeight: '600', fontSize: 14, fontFamily: "Roboto-Light" }}>{t("Meeting Date")}</Text>
                      </View>
                      <View style={styles.cell}>
                        <Text style={{ fontWeight: '600', fontSize: 14, fontFamily: "Roboto-Light" }}>{t("Meeting Time")}</Text>
                      </View>
                      <TouchableOpacity>
                        <View style={styles.cell}>
                        <Text style={{color: '#F7F7F7'}}>Mark as Completed</Text>
                         </View>
                      </TouchableOpacity>
                    </View>
                    {meetings.map((meeting) => (
                      <View key={meeting.id} style={styles.row}>
                        <View style={styles.cell2}>
                          <Text style={styles.cellText}>{meeting.meeting_topic}</Text>
                        </View>
                        <View style={styles.cell2}>
                          <Text style={styles.cellText}>{meeting.meeting_description}</Text>
                        </View>
                        <View style={styles.cell2}>
                          <Text style={styles.cellText}>{meeting.date}</Text>
                        </View>
                        <View style={styles.cell2}>
                          <Text style={styles.cellText}>{meeting.time}</Text>
                        </View>
                        <TouchableOpacity styles={styles.cell2} onPress={() => handleOpenPress(meeting)}>
                          <Text style={styles.linkText}>{t("Mark as Completed")}</Text>
                        </TouchableOpacity>
                      </View>
                    ))}
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
          backgroundColor: 'rgba(0, 0, 0, 0.1)',
        },
        container: {
          flexDirection: 'column',
          marginLeft: 50,
        },
        greenBox: {
          width: 1000,
          height: "100%",
          backgroundColor: '#F8F8F8',
        },
        table: {
          marginRight: 200,
          marginTop: 20,
          marginBottom: 20,
          alignContent: 'center',
          justifyContent: 'space-around',
          marginLeft: 50,
          marginRight: 50,
        },
        open: {
          color: "coral",
          fontSize: 14,
          borderColor: "coral",
          backgroundColor: '#f7fff4',
          borderWidth: 2,
          padding: 5,
          paddingHorizontal: 15,
          borderRadius: 5,
          fontFamily: "Roboto-Light",
          textAlign: 'center'
        },
        closeButton: {
          position: 'absolute',
          top: 20,
          right: 20,
        },
        header: {
          flexDirection: 'row',
          alignItems: 'center',
          padding: 10,
          backgroundColor: 'white',
          borderBottomWidth: 1,
          borderBottomColor: '#CCC',
          marginBottom: 5,
        },
        logo: {
          width: 40,
          height: 40,
          marginRight: 10,
        },
        headerText: {
          fontSize: 18,
          fontWeight: 'bold',
          color: '#3F5637',
          fontFamily: "Roboto-Light"
        },
        row: {
          flexDirection: 'row',
        },
        cell: {
          flex: 1,
          borderBottomWidth: 1,
          borderBottomColor: '#EEE',
          padding: 10,
          alignItems: 'center',
        },
        cell2: {
          flex: 1,
          borderBottomWidth: 1,
          borderBottomColor: '#EEE',
          padding: 10,
          alignItems: 'center',
          backgroundColor: '#F7F7F7',
        },
        cellText: {
          fontSize: 14,
          fontFamily: "Roboto-Light"
        },
        linkText: {
          color: "#206C00",
          fontSize: 14,
          fontFamily: "Roboto-Light"
        }
      });

      export default MyComponent;
