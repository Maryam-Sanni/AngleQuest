import React, { useState, useEffect, useRef } from 'react';
import { View, Text, ScrollView, StyleSheet, Image, TouchableHighlight, TouchableOpacity,  Modal,  Animated, CheckBox,} from 'react-native';
import { FaStar } from 'react-icons/fa';
import Topbar from '../components/expertstopbar';
import Sidebar from '../components/expertssidebar';
import ScheduledAdvice from '../components/ScheduledAdvice';
import CompletedAdvice from '../components/CompletedAdvice';
import { useNavigation } from '@react-navigation/native';
import OpenModal from '../Experts/AdviceProfile';

const data = [
  { date: 'M', score: 10 },
{ date: 'T', score: 15 },
{ date: 'W', score: 8 },
{ date: 'T', score: 18 },
{ date: 'F', score: 4 },
{ date: 'S', score: 6 },
{ date: 'S', score: 1 }
];

const colors = ['#FF4040', '#CD5B45', '#FF7F50', '#F08080', '#F88379', '#FFE4E1', '#FFE4E1',];

function MyComponent() {
    const navigation = useNavigation();
    const [isInterviewHovered, setIsInterviewHovered] = useState(false);
    const [isGrowthHovered, setIsGrowthHovered] = useState(false);
    const [isAdviceHovered, setIsAdviceHovered] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const barHeights = useRef(data.map(() => new Animated.Value(0))).current;
    const calculateTimeLeft = () => {
      const difference = +new Date(targetDate) - +new Date();
      let timeLeft = {};
  
      if (difference > 0) {
        timeLeft = {
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        };
      }
  
      return timeLeft;
    };
  
    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
    const targetDate = '2024-05-25T00:00:00'; // Change this to your target date and time
  
    useEffect(() => {
      const timer = setTimeout(() => {
        setTimeLeft(calculateTimeLeft());
      }, 1000);
  
      return () => clearTimeout(timer);
    });
  
    const timerComponents = Object.keys(timeLeft).map((interval) => {
      if (!timeLeft[interval]) {
        return null;
      }
  
      return (
        <Text key={interval}>
          {timeLeft[interval]} {interval}{" "}
        </Text>
      );
    });

  useEffect(() => {
    const animations = data.map((item, index) => Animated.timing(barHeights[index], {
      toValue: item.score * 7,
      duration: 1000,
      useNativeDriver: false,
    }));

    Animated.stagger(100, animations).start();
  }, []);

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
        <View style={{ marginLeft: 270, backgroundColor: 'white'}}>
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
    <View style={{ justifyContent: "flex-start", paddingHorizontal: 10, paddingVertical: 10, borderRadius: 5, borderColor: "coral", backgroundColor: "coral", width: 150, alignItems: 'center', marginTop: 20, marginLeft: 50, borderWidth: 1 }}>
                    <Text style={{ fontSize: 13, color: "white", alignText: 'center', fontWeight: '600' }}>Advice Profile</Text>
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

      <View style={styles.container}>
      <View style={styles.box}>
        <View style={styles.barGraphContainer}>
          {data.map((item, index) => (
            <View key={index} style={styles.barContainer}>
              <Animated.View style={[styles.graphBar, { height: barHeights[index], backgroundColor: colors[index] }]} />
              <View style={styles.scoreDateContainer}>
                <Text style={styles.graphScore}>{item.score}</Text>
                <Text style={styles.graphDate}>{item.date}</Text>
              </View>
            </View>
          ))}
          
        </View>
        
      </View>
       <View style={styles.box}>
        <View style={{alignItems: 'center', alignContent: 'center'}}>
      <Text style={{ fontSize: 20, fontWeight: 'bold', }}>Rating</Text>
       <Text style={{ fontSize: 12, marginTop: 5, marginBottom: 15 }}>40 candidates reviews</Text>
    <View style={{ paddingHorizontal: 10, paddingVertical: 10, borderRadius: 20, backgroundColor: '#F2F2F2', width: 200, alignItems: 'center', marginTop: 10 }}>
    <View style={{ flexDirection: 'row'}}>
                    <Text style={{ fontSize: 18, color: "black", alignText: 'center', fontWeight: '600' }}><FaStar color="gold" /><FaStar color="gold" /><FaStar color="gold" /><FaStar color="gold" /><FaStar color="gold" /></Text> <Text style={{ fontSize: 12, marginTop: 3, marginLeft: 5, color: "black"}}> 4.7 out of 5 </Text>
                    </View>
                  </View>
      <TouchableOpacity>
     <Text style={{ fontSize: 12, color: 'darkgrey', marginTop: 30 }}>How do we calculate ratings?</Text>
     </TouchableOpacity>
    </View>
      </View>
      <View style={styles.box2}>
        <Text style = {{fontSize: 10, color: 'grey', marginTop: 20, fontWeight: '600'}}>Next Session is in</Text>
         <Text style={{ fontSize: 24, fontWeight: 'bold', color: 'coral', marginTop: 10 }}>{timerComponents}</Text>
        <Text style = {{fontSize: 12, marginTop: 20, color: 'grey'  }}>By recording upcoming sessions in your calendar, you hold yourself accountable for candidate's progress. Seeing these sessions scheduled prompts you to prepare accordingly and actively participate. </Text>
     </View>
     </View>

<ScheduledAdvice /> 
<CompletedAdvice />
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
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10, marginTop: 50, marginLeft: 20, marginRight: 50
  },
  box2: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    width: '44%',
    height: 200,
    borderRadius: 10,
    borderWidth: 2, borderColor: '#f2f2f2',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  box: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    width: '25%',
    height: 200,
    borderWidth: 2, borderColor: '#f2f2f2',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  graphTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
  },
  barGraphContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    width: 200,
    height: 80,
    marginTop: 60,
    marginRight: 20,
    marginBottom: 5,
    paddingHorizontal: 10,
    backgroundColor: 'white',
    borderRadius: 5,
    paddingTop: 20,
    paddingBottom: 10,
  },
  barContainer: {
    alignItems: 'center',
  },
  scoreDateContainer: {
    position: 'absolute',
    bottom: -30,
    left: '50%',
    transform: [{ translateX: -5 }],
    alignItems: 'center',
     marginBottom: 10,
  },
  graphBar: {
    width: 20,
    borderRadius: 2,
    marginBottom: 20,
  },
  graphScore: {
    fontSize: 10,
    color: 'lightgrey',
    fontWeight: '600',
     marginTop: 10,
  },
  graphDate: {
    fontSize: 12,
    color: 'grey',
    fontWeight: 'bold',
    marginTop: 2
   
  },
  boximage: {
        width: 50,
        height: 50,
        position: 'absolute',
        left: '100%',
        marginLeft: 350,
        borderRadius: 25, 
      },
});

export default MyComponent;
