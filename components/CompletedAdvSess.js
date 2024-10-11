import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import OpenSchedule from '../Jobseekers/ViewSkillAnalysis';
import { BlurView } from 'expo-blur';
import { useFonts } from 'expo-font';
import { useTranslation } from 'react-i18next';
import OpenSchedule2 from '../components/Rating';

const ScheduledMeetingsTable = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [skillanalysiss, setSkillanalysis] = useState([]);
  const [modalVisible2, setModalVisible2] = useState(false);
  const [selectedAnalysis, setSelectedAnalysis] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 3; // Number of meetings to display per page
  const totalPages = Math.ceil(skillanalysiss.length / itemsPerPage);

  // Get the current meetings to display based on the page
  const displayedMeetings =  skillanalysiss.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  const goToNextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const goToPreviousPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const apiUrl = process.env.REACT_APP_API_URL;
  
  const handleOpenPress2 = async (analysis) => {
    setSelectedAnalysis(analysis);
    setModalVisible2(true); // Ensure this sets the correct modal visibility

    try {
      await AsyncStorage.setItem('selectedSkillAnalysis', JSON.stringify(analysis));
      console.log('Selected analysis saved:', analysis);
    } catch (error) {
      console.error('Failed to save selected analysis to AsyncStorage', error);
    }
  };

  const handleCloseModal2 = () => {
    setModalVisible2(false);
  };

  const handleOpenPress = async (analysis) => {
    setSelectedAnalysis(analysis);
    setModalVisible(true); // Ensure this sets the correct modal visibility

    try {
      await AsyncStorage.setItem('selectedSkillAnalysis', JSON.stringify(analysis));
      console.log('Selected analysis saved:', analysis);
    } catch (error) {
      console.error('Failed to save selected analysis to AsyncStorage', error);
    }
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  const fetchData = async () => {
    try {
      const token = await AsyncStorage.getItem('token'); // Retrieve the token from AsyncStorage
      const storedUserId = await AsyncStorage.getItem('user_id'); // Retrieve user_id from AsyncStorage

      if (token && storedUserId) {
        const response = await fetch(`${apiUrl}/api/expert/skillAnalysis/getAllExpertsSkillAnalysisFeedbacks`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`, // Include the token in the Authorization header
          },
        });

        const data = await response.json();

        if (data.status === 'success') {
          // Filter skill analysis for the specific job seeker
          const filteredSkillAnalysis = data.skillAnalysis.filter(skillanalysis => skillanalysis.jobseeker_id === storedUserId);

          // Sort the filtered skill analysis by date_time
          filteredSkillAnalysis.sort((a, b) => {
            const dateA = new Date(a.date_time);
            const dateB = new Date(b.date_time);

            // Check if both dates are in the same month and year
            if (dateA.getFullYear() === dateB.getFullYear() && dateA.getMonth() === dateB.getMonth()) {
              return dateB - dateA; // For the same month, sort by time (newest first)
            }

            // Prioritize this month (current month) first
            const isAThisMonth = dateA.getFullYear() === new Date().getFullYear() && dateA.getMonth() === new Date().getMonth();
            const isBThisMonth = dateB.getFullYear() === new Date().getFullYear() && dateB.getMonth() === new Date().getMonth();

            if (isAThisMonth && !isBThisMonth) return -1; // A is this month, B is not
            if (!isAThisMonth && isBThisMonth) return 1;  // B is this month, A is not

            // Otherwise, sort by date (most recent first)
            return dateB - dateA; 
          });

          setSkillanalysis(filteredSkillAnalysis);

          try {
            await AsyncStorage.setItem('allSkillanalysis', JSON.stringify(filteredSkillAnalysis));
            console.log('Filtered skill analysis saved:', filteredSkillAnalysis);
          } catch (error) {
            console.error('Failed to save filtered skill analysis to AsyncStorage', error);
          }
        } else {
          console.error('Failed to fetch data', data);
        }
      } else {
        console.error('Token or user_id not found in AsyncStorage');
      }
    } catch (error) {
      console.error('Failed to load form data', error);
    }
  };





  useEffect(() => {
    fetchData(); // Initial data load

    const intervalId = setInterval(fetchData, 5000); // Poll every 5 seconds

    return () => clearInterval(intervalId); // Clear interval on component unmount
  }, []);

  const [fontsLoaded] = useFonts({
    'Roboto-Light': require('../assets/fonts/Roboto-Light.ttf'),
  });
  const { t } = useTranslation();

  return (
    <View style={styles.greenBox}>
      <BlurView intensity={100} style={styles.blurBackground}>
        <Text style={styles.title}>{t('Completed')}</Text>
        <View style={styles.table}>
          <View style={styles.row}>
            {/* Table Headers */}
            <View style={styles.cell2}>
              <Text style={styles.headerText}>{t('Expert')}</Text>
            </View>
            <View style={styles.cell2}>
              <Text style={styles.headerText}>{t('Role')}</Text>
            </View>
            <View style={styles.cell2}>
              <Text style={styles.headerText}>{t('Performance')}</Text>
            </View>
            <View style={styles.cell2}>
              <Text style={styles.headerText}>{t('Meeting Date')}</Text>
            </View>   
            <TouchableOpacity>
              <View style={styles.cell2}>
              <Text style={{color: 'white'}}>Join Meeting Today Now</Text>
               </View>
            </TouchableOpacity>
            <TouchableOpacity>
              <View style={styles.cell2}>
              <Text style={{color: 'white'}}>Rate</Text>
               </View>
            </TouchableOpacity>
            <TouchableOpacity>
              <View style={styles.cell2}>
              <Text style={{color: 'white'}}>View</Text>
               </View>
            </TouchableOpacity>
            
          </View>

          {/* Table Rows */}
          {displayedMeetings.map((skillanalysis, index) => (
            <View style={styles.row} key={index}>
               <View style={index % 2 === 0 ? styles.cell : styles.cell2}>
                <Text style={styles.cellText}>{skillanalysis.expert_name}</Text>
              </View>
               <View style={index % 2 === 0 ? styles.cell : styles.cell2}>
                <Text style={styles.cellText}>{skillanalysis.role}</Text>
              </View>
              
               <View style={index % 2 === 0 ? styles.cell : styles.cell2}>
                <Text style={styles.cellText}>{skillanalysis.rating}</Text>
              </View>
              <View style={index % 2 === 0 ? styles.cell : styles.cell2}>
                <Text style={styles.cellText}>{new Date(skillanalysis.updated_at).toLocaleDateString()} {new Date(skillanalysis.updated_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true })}</Text>
              </View>
              <TouchableOpacity>
                 <View style={index % 2 === 0 ? styles.cell : styles.cell2}>
                    <Text style={{color: 'transparent'}}>Join Meeting Today Now</Text>
                 </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleOpenPress2(skillanalysis)}>
                 <View style={index % 2 === 0 ? styles.cell : styles.cell2}>
                <Text style={styles.linkText}>{t('Rate')}</Text>
                 </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleOpenPress(skillanalysis)}>
                 <View style={index % 2 === 0 ? styles.cell : styles.cell2}>
                <Text style={styles.linkText}>{t('View')}</Text>
                 </View>
              </TouchableOpacity>
             
            </View>
          ))}
          <View style={styles.paginationContainer}>
            <TouchableOpacity onPress={goToPreviousPage} disabled={currentPage === 0}>
              <Text style={currentPage === 0 ? styles.disabledButton : styles.button}>{'<'}</Text>
            </TouchableOpacity>
            <Text>{`Page ${currentPage + 1} of ${totalPages}`}</Text>
            <TouchableOpacity onPress={goToNextPage} disabled={currentPage >= totalPages - 1}>
              <Text style={currentPage >= totalPages - 1 ? styles.disabledButton : styles.button}>{'>'}</Text>
            </TouchableOpacity>
          </View>
        </View>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible2}
          onRequestClose={handleCloseModal2}
        >
          <View style={styles.modalContent}>
             <OpenSchedule2 analysis={selectedAnalysis} onCancel={handleCloseModal2} />
          </View>
        </Modal>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={handleCloseModal}
        >
          <View style={styles.modalContent}>
             <OpenSchedule analysis={selectedAnalysis} onClose={handleCloseModal} />
          </View>
        </Modal>
      </BlurView>
    </View>
  );
};

const styles = StyleSheet.create({
  modalContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  title: {
    marginTop: 30,
    marginLeft: 50,
    color: "black",
    fontWeight: 'bold',
    fontSize: 15,
    textAlign: 'flex-start',
  },
  table: {
    flex: 1,
    marginRight: 200,
    marginTop: 20,
    marginBottom: 30,
    alignContent: 'center',
    justifyContent: 'space-around',
    marginLeft: 50, marginRight: 50
  },
  greenBox: {
    width: "90%",
    marginBottom: 20,
    marginLeft: 50,
    backgroundColor: 'rgba(225,225,212,0.3)',
    marginTop: 30,
    borderRadius: 20,
    borderColor: 'rgba(255,255,255,0.5)',
    borderWidth: 1,
  },
  row: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(225,225,212,0.3)',
  },
  cell: {
    flex: 1,
    backgroundColor: 'none',
    padding: 10,
    alignItems: 'center',
  },
  cell2: {
    flex: 1,
    backgroundColor: 'white', 
    padding: 10,
    alignItems: 'center',
  },
  cellText: {
    textAlign: 'center',
    fontFamily: "Roboto-Light"
  },
  headerText: {
    fontWeight: '600',
    fontSize: 14,
  },
  image: {
    width: 30,
    height: 30,
    marginRight: 10,
    marginTop: -5,
    borderRadius: 25
  },
  blurBackground: {
    flex: 1,
    borderRadius: 20,
  },
  linkText: {
    color: "#206C00",
    fontSize: 14,
    fontFamily: "Roboto-Light"
  },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
    marginLeft: 50,
    marginRight: 50
  },
  button: {
    fontSize: 18,
    color: 'darkgreen',
  },
  disabledButton: {
    fontSize: 18,
    color: 'gray',
  },
  popupOptionContainer: {
    flexDirection: 'row', 
    alignItems: 'center', 
    marginBottom: 10, 
  },
  icon: {
    width: 15, 
    height: 15,
    marginRight: 10,
  },
});

export default ScheduledMeetingsTable;