      import React, { useState, useEffect } from 'react';
      import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image, Modal, Linking } from 'react-native';
      import { useFonts } from 'expo-font';
      import { useTranslation } from 'react-i18next';
      import axios from 'axios';
      import AsyncStorage from '@react-native-async-storage/async-storage';
import OpenModal from './ConfirmMeetingEnd';

      function MyComponent({ onClose }) {
        const [meetings, setMeetings] = useState([]);
         const [modalVisible, setModalVisible] = useState(false);
        const [selectedMeeting, setSelectedMeeting] = useState(null);

        const apiUrl = process.env.REACT_APP_API_URL;
        
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
        
        const handleOpenLink = async (url) => {
          if (url) {
            const supported = await Linking.canOpenURL(url);
            if (supported) {
              await Linking.openURL(url);
            } else {
              console.log("Can't open the URL:", url);
            }
          }
        };

        useEffect(() => {
          const fetchMeetingData = async () => {
            try {
              const token = await AsyncStorage.getItem('token');
              if (!token) {
                console.error('No token found');
                return;
              }

              const response = await axios.get(`${apiUrl}/api/expert/newhubmeeting/get`, {
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
          <View style={{ flex: 1, backgroundColor: "white", marginTop: 40, alignItems: 'center' }}>
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
                        <Text style={{ fontWeight: '600', fontSize: 16 }}>{t("Topic")}</Text>
                      </View>
                      <View style={styles.cell}>
                        <Text style={{ fontWeight: '600', fontSize: 16 }}>{t("Description")}</Text>
                      </View>
                      <View style={styles.cell}>
                        <Text style={{ fontWeight: '600', fontSize: 16 }}>{t("Meeting Date")}</Text>
                      </View>
                      <View style={styles.cell}>
                        <Text style={{ color: 'white' }}>{t("Join Meet")}</Text>
                      </View>
                      <TouchableOpacity>
                        <View style={styles.cell}>
                        <Text style={{color: 'white'}}>Mark</Text>
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
                        <View style={styles.coralButton}>
                          <Text style={{color:'#206C00'}} onPress={() => handleOpenLink(meeting.expert_link)}>
                            {t("Join Meeting")}
                          </Text>
                        </View>
                        <TouchableOpacity style={styles.linkButton} onPress={() => handleOpenPress(meeting)}>
                          <Text style={{color:'white'}}>{t("Mark as Completed")}</Text>
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
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  container: {
    flexDirection: 'column',
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  greenBox: {
    backgroundColor: 'white',
    borderRadius: 10,
  },
  table: {
    marginTop: 20,
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
    top: 10,
    right: 15,
    padding: 5,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#CCC',
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
    fontFamily: "Roboto-Light",
  },
  row: {
    flexDirection: 'row',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderColor: '#EEE',
  },
  cell: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 8,
    alignItems: 'center',
  },
  cell2: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 8,
    alignItems: 'center',
  },
  cellText: {
    fontSize: 14,
    fontFamily: "Roboto-Light",
  },
  linkText: {
    color: "#206C00",
    fontSize: 14,
    fontFamily: "Roboto-Light",
    textDecorationLine: 'underline',
  },
        linkButton: {
          backgroundColor: "#206C00",
          padding: 10,
          borderRadius: 5,
            width: 150,
          alignItems: 'center',
          height: 40
        },
        coralButton: {
          borderColor: "#206C00",
          borderWidth: 1,
          padding: 10,
          borderRadius: 5,
            width: 120,
          alignItems: 'center',
          height: 40, marginRight: 30
        },
});

      export default MyComponent;
