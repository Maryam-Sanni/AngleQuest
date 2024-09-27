import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image, Modal } from 'react-native';
import OpenModal from './Growthplanprofile';
import OpenModal2 from './InterviewProfile';
import OpenModal3 from './AdviceProfile';
import OpenModal4 from '../components/Createhubform';
import { useFonts } from 'expo-font';
import { useTranslation } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigate } from 'react-router-dom';

function MyComponent({ onClose }) {
  const [ModalVisible, setModalVisible] = useState(false);
  const [ModalVisible2, setModalVisible2] = useState(false);
  const [ModalVisible3, setModalVisible3] = useState(false);
  const [ModalVisible4, setModalVisible4] = useState(false);
  const [growthPlanStatus, setGrowthPlanStatus] = useState('Pending');
  const [interviewStatus, setinterviewStatus] = useState('Pending');
  const [SkillAnalysisStatus, setSkillAnalysisStatus] = useState('Pending')
  const [NewHubStatus, setNewHubStatus] = useState('Pending');
  const navigate = useNavigate();

  const [fontsLoaded] = useFonts({
    'Roboto-Light': require("../assets/fonts/Roboto-Light.ttf"),
  });

  const { t } = useTranslation();

  useEffect(() => {
    const checkGrowthPlanStatus = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        if (token) {
          const response = await fetch('https://recruitangle.com/api/expert/growthplan/get', {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${token}`,
            },
          });
          const data = await response.json();

          // Check if the required fields are filled
          const { growthPlan } = data;
          const requiredFieldsFilled = 
            growthPlan.role &&
            growthPlan.level &&
            growthPlan.rate &&
            growthPlan.available_days &&
            growthPlan.available_times;

          setGrowthPlanStatus(requiredFieldsFilled ? 'Done' : 'Pending');
        }
      } catch (error) {
        console.error('Failed to fetch growth plan status:', error);
      }
    };

    checkGrowthPlanStatus();
  }, []);

  useEffect(() => {
    const checkinterviewStatus = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        if (token) {
          const response = await fetch('https://recruitangle.com/api/expert/interview/get', {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${token}`,
            },
          });
          const data = await response.json();

          // Check if the required fields are filled
          const { interview } = data;
          const requiredFieldsFilled = 
            interview.role &&
            interview.level &&
            interview.rate &&
            interview.available_days &&
            interview.available_times;

          setinterviewStatus(requiredFieldsFilled ? 'Done' : 'Pending');
        }
      } catch (error) {
        console.error('Failed to fetch interview status:', error);
      }
    };

    checkinterviewStatus();
  }, []);

  useEffect(() => {
    const checkSkillAnalysisStatus = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        if (token) {
          const response = await fetch('https://recruitangle.com/api/expert/skillAnalysis/get', {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${token}`,
            },
          });
          const data = await response.json();

          // Check if the required fields are filled
          const { SkillAnalysis } = data;
          const requiredFieldsFilled = 
            SkillAnalysis.role &&
            SkillAnalysis.level &&
            SkillAnalysis.rate &&
            SkillAnalysis.available_days &&
            SkillAnalysis.available_times;

          setSkillAnalysisStatus(requiredFieldsFilled ? 'Done' : 'Pending');
        }
      } catch (error) {
        console.error('Failed to fetch Skill Analysis status:', error);
      }
    };

    checkSkillAnalysisStatus();
  }, []);

  useEffect(() => {
    const checkNewHubStatus = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        if (token) {
          const response = await fetch('https://recruitangle.com/api/expert/hubs/get', {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${token}`,
            },
          });
          const data = await response.json();

          // Check if the required fields are filled
          const { NewHub } = data;
          const requiredFieldsFilled = 
            NewHub.coaching_hub_name &&
            NewHub.meeting_day &&
            NewHub.coaching_hub_fee &&
            NewHub.coaching_hub_description &&
            NewHub.from;

          setNewHubStatus(requiredFieldsFilled ? 'Done' : 'Pending');
        }
      } catch (error) {
        console.error('Failed to fetch interview status:', error);
      }
    };

    checkNewHubStatus();
  }, []);
  
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

  const handleOpenPress3 = () => {
    setModalVisible3(true);
  };

  const handleCloseModal3 = () => {
    setModalVisible3(false);
  };

  const handleOpenPress4 = () => {
    setModalVisible4(true);
  };

  const handleCloseModal4 = () => {
    setModalVisible4(false);
  };

  const goToGrowth = () => {
    navigate('/profile');
    onClose();
  };
  
  return (
    <View style={{ flex: 1, backgroundColor: "#F8F8F8", marginTop: 40, alignItems: 'center' }}>
      <View style={styles.greenBox}>
        <ScrollView contentContainerStyle={{ flexGrow: 1, maxHeight: 500 }}>
          <View style={styles.header}>
            <Image
              source={{ uri: 'https://cdn.builder.io/api/v1/image/assets/TEMP/1f2d38e99b0016f2bd167d2cfd38ff0d43c9f94a93c84b4e04a02d32658fb401?apiKey=7b9918e68d9b487793009b3aea5b1a32&' }}
              style={styles.logo}
            />
            <Text style={styles.headerText}>{t("Create Profiles")}</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Text style={{ fontSize: 18, color: '#3F5637', fontWeight: 'bold', fontFamily: "Roboto-Light" }}>
                ✕
              </Text>
            </TouchableOpacity>
          </View>

          <View style={{ flexDirection: 'row' }}>
            <View style={{ flexDirection: 'column', marginLeft: 20 }}>
              <Text style={{ fontWeight: 'bold', fontSize: 20, marginTop: 5, fontFamily: "Roboto-Light" }}>
                {t("To Get Started...")}
              </Text>
              <Text style={{ fontSize: 14, marginTop: 10, marginBottom: 15, width: 400, fontWeight: '500', fontFamily: "Roboto-Light" }}>
                {t("You will need to create your profiles to unlock all features")}
              </Text>
              <Image
                source={require('../assets/createPfp.png')}
                style={styles.image}
              />
            </View>
            <View style={{ flexDirection: 'column' }}>
              <View style={styles.input}>
                <Text style={{ fontWeight: '500', fontSize: 16, fontFamily: "Roboto-Light" }}>
                  {t("Your Viewers Profile")} <Text style={{ fontWeight: '500', fontSize: 14, color: 'black', marginLeft: 5, fontFamily: "Roboto-Light" }}>{t(growthPlanStatus)}</Text>
                </Text>
              </View>

              <TouchableOpacity 
                onPress={handleOpenPress2} 
                style={[styles.buttonind, interviewStatus === 'Done' && styles.buttonDone]}
                disabled={interviewStatus === 'Done'}
              >
                <Text style={[styles.buttonTextplus, interviewStatus === 'Done' && styles.buttonTextDone]}>
                  {interviewStatus === 'Done' ? t("Profile Created") : t("Create Interview Profile")}
                </Text>
              </TouchableOpacity>
              <View style={styles.input}>
                <Text style={{ fontWeight: '500', fontSize: 16, fontFamily: "Roboto-Light" }}>
                  {t("Growth Plan")} <Text style={{ fontWeight: '500', fontSize: 14, color: 'black', marginLeft: 5, fontFamily: "Roboto-Light" }}>{t(growthPlanStatus)}</Text>
                </Text>
              </View>
              
              <TouchableOpacity 
                onPress={handleOpenPress2} 
                style={[styles.buttonind, interviewStatus === 'Done' && styles.buttonDone]}
                disabled={interviewStatus === 'Done'}
              >
                <Text style={[styles.buttonTextplus, interviewStatus === 'Done' && styles.buttonTextDone]}>
                  {interviewStatus === 'Done' ? t("Profile Created") : t("Create Interview Profile")}
                </Text>
              </TouchableOpacity>

              <View style={styles.input}>
                <Text style={{ fontWeight: '500', fontSize: 16, fontFamily: "Roboto-Light" }}>
                  {t("Interview")} <Text style={{ fontWeight: '500', fontSize: 14, color: 'black', marginLeft: 5, fontFamily: "Roboto-Light" }}>{t(interviewStatus)}</Text>
                </Text>
              </View>
              <TouchableOpacity 
                onPress={handleOpenPress2} 
                style={[styles.buttonind, interviewStatus === 'Done' && styles.buttonDone]}
                disabled={interviewStatus === 'Done'}
              >
                <Text style={[styles.buttonTextplus, interviewStatus === 'Done' && styles.buttonTextDone]}>
                  {interviewStatus === 'Done' ? t("Profile Created") : t("Create Interview Profile")}
                </Text>
              </TouchableOpacity>

              <View style={styles.input}>
                <Text style={{ fontWeight: '500', fontSize: 16, fontFamily: "Roboto-Light" }}>
                  {t("Skill Analysis")} <Text style={{ fontWeight: '500', fontSize: 14, color: 'black', marginLeft: 5, fontFamily: "Roboto-Light" }}>{t(SkillAnalysisStatus)}</Text>
                </Text>
              </View>
              <TouchableOpacity 
                onPress={handleOpenPress3} 
                style={[styles.buttonind, SkillAnalysisStatus === 'Done' && styles.buttonDone]}
                disabled={SkillAnalysisStatus === 'Done'}
              >
                <Text style={[styles.buttonTextplus, SkillAnalysisStatus === 'Done' && styles.buttonTextDone]}>
                  {SkillAnalysisStatus === 'Done' ? t("Profile Created") : t("Create Skill Analysis Profile")}
                </Text>
              </TouchableOpacity>

              <View style={styles.input}>
                <Text style={{ fontWeight: '500', fontSize: 16, fontFamily: "Roboto-Light" }}>
                  {t("New Hub")} <Text style={{ fontWeight: '500', fontSize: 14, color: 'black', marginLeft: 5, fontFamily: "Roboto-Light" }}>{t(NewHubStatus)}</Text>
                </Text>
              </View>
              <TouchableOpacity 
                onPress={handleOpenPress4} 
                style={[styles.buttonind, NewHubStatus === 'Done' && styles.buttonDone]}
                disabled={NewHubStatus === 'Done'}
              >
                <Text style={[styles.buttonTextplus, NewHubStatus === 'Done' && styles.buttonTextDone]}>
                  {NewHubStatus === 'Done' ? t("Profile Created") : t("Create a Learning Hub")}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={onClose} style={styles.buttonplus}>
                <Text style={styles.buttonTextplus}>{t("Save & Continue Later")}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={ModalVisible}
        onRequestClose={handleCloseModal}
      >
        <View style={styles.modalContent}>
          <OpenModal onClose={handleCloseModal} />
        </View>
      </Modal>
      <Modal
        animationType="slide"
        transparent={true}
        visible={ModalVisible2}
        onRequestClose={handleCloseModal2}
      >
        <View style={styles.modalContent}>
          <OpenModal2 onClose={handleCloseModal2} />
        </View>
      </Modal>
      <Modal
        animationType="slide"
        transparent={true}
        visible={ModalVisible3}
        onRequestClose={handleCloseModal3}
      >
        <View style={styles.modalContent}>
          <OpenModal3 onClose={handleCloseModal3} />
        </View>
      </Modal>
      <Modal
        animationType="slide"
        transparent={true}
        visible={ModalVisible4}
        onRequestClose={handleCloseModal4}
      >
        <View style={styles.modalContent}>
          <OpenModal4 onClose={handleCloseModal4} />
        </View>
      </Modal>
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
  greenBox: {
    width: 1000,
    height: "100%",
    backgroundColor: '#F8F8F8',
  },
  buttonplus: {
    backgroundColor: 'coral',
    padding: 10,
    marginTop: 40,
    width: 450,
    marginLeft: 50,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonTextplus: {
    color: 'white',
    fontSize: 14,
    textAlign: 'center',
    fontFamily: "Roboto-Light"
  },
  buttonind: {
    backgroundColor: '#9B6F6F',
    padding: 10,
    marginTop: 10,
    width: 450,
    marginLeft: 50,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonDone: {
    backgroundColor: 'green',
  },
  buttonTextDone: {
    color: 'white',
  },
  input: {
    height: 45,
    width: 450,
    backgroundColor: 'white',
    borderColor: '#206C00',
    borderWidth: 1,
    color: 'black',
    fontSize: 14,
    marginLeft: 50,
    borderRadius: 5,
    padding: 10,
    marginTop: 20
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
    marginBottom: 20,
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
  image: {
    width: 400,
    height: 400,
    marginRight: 30,
  },
});

export default MyComponent;
