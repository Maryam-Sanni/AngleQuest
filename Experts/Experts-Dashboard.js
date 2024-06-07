import React, { useEffect, useRef } from 'react';
import { View, Image, Text, ScrollView, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Sidebar from '../components/expertssidebar';
import Topbar from '../components/expertstopbar';

const data = [
    { date: 'Jul', score: 28 },
    { date: 'Jun', score: 20 },
    { date: 'May', score: 24 },
    { date: 'Apr', score: 17 },
    { date: 'Mar', score: 12 }
];

const colors = ['#28B0D4', '#ADB80B', '#842652', '#90A55A', '#842652'];

function MyComponent() {
  const barHeights = useRef(data.map(() => new Animated.Value(0))).current;
  const navigation = useNavigation(); // Hook to access navigation object

  useEffect(() => {
    const animations = data.map((item, index) => {
      return Animated.timing(barHeights[index], {
        toValue: item.score * 7,
        duration: 1000, // Adjust duration as needed
        useNativeDriver: false, // UseNativeDriver: false is needed for height animation
      });
    });

    Animated.stagger(100, animations).start(); // Stagger the animations for a smoother effect
  }, []);

  const handleBalancePress = () => {
    navigation.navigate('RequestPayout'); // Navigate to Requestpayout screen
  };
  const goToMessages = () => {
    navigation.navigate('Messaging'); 
  };

  return (
    <View style={{height: '70%'}}>
      <Topbar />
      <View style={{ flexDirection: 'row', height: '100%' }}>
        <Sidebar />
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
          <View style={styles.container}>
            <Image
              source={require('../assets/Background.png')}
              style={styles.image}
            />
            <View style={styles.textContainer}>
              <Text style={{ fontSize: 25, color: '#206C00', fontWeight: 'bold' }}>Manage your activities</Text>
              <Text style={{ fontSize: 16, marginTop: 8, color: '#206C00' }}>Find ease in managing your activities, Get insights on all your actvities in one place.</Text>
            </View>
          </View>
          <View style={styles.parentcontainer}>
            <View style={styles.upcomingcontainer}>
              <Text style={styles.upcomingtitle}>Upcoming Interview</Text>
              <Text style={styles.upcomingtimer}>15m:22s</Text>
              <Text style={styles.upcomingdate}>Today</Text>
              <Text style={styles.upcomingtime}>09:30pm - 10:30pm</Text>
            </View>
            <View style={styles.empprogresscontainer}>
              <Text style={styles.progresstitle}>Feedback</Text>
              <Text style={styles.upcomingtimer}>21m:04s</Text>
              <Text style={styles.feedbacktext}>You are yet to give Paul Smith a feedback. You have limited time to do that!</Text>
            </View>
            <View style={styles.jobscontainer}>
              <Text style={styles.jobstitle}>Booked Interviews</Text>
              <Text style={styles.jobscount}>08</Text>
              <Text style={styles.jobsterminated}>Concluded - 06</Text>
              <Text style={styles.jobsprogress}>Upcoming - 02</Text>
            </View>
            <View style={styles.scorecontainer}>
  <Text style={styles.scoretitle}>Available Balance</Text>
  
    <Text style={styles.scoreaverage}>$1,234.00</Text>
    
 
</View>

</View>
          <View style={styles.parentcontainer}>
            <View style={styles.graphcontainer}>
              <Text style={styles.graphtitle}>Profile Visits</Text>
              <View style={styles.barGraphContainer}>
                {data.map((item, index) => (
                      <View key={index} style={styles.barContainer}>
        <Animated.View style={[styles.graphbar, { height: barHeights[index], backgroundColor: colors[index] }]} />
        <View style={styles.scoreDateContainer}>
          <Text style={styles.graphscore}>{item.score}</Text>
          <Text style={styles.graphdate}>{item.date}</Text>
        </View>
      </View>
                ))}
              </View>
            </View>
            <View style={{ marginRight: 10, flex: 1, paddingTop: 6, paddingRight: 20, paddingBottom: 12, paddingLeft: 6, width: '100%', borderRadius: 5, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.25, shadowRadius: 3.84, backgroundColor: 'white', paddingHorizontal: 5, marginTop: 190, maxWidth: '100%', height: 350, marginBottom: 30 }}>
              <Text style={{ fontSize: 16, fontWeight: '700', color: '#206C00', maxWidth: '100%', marginTop: 10, marginLeft: 10 }}>
                Career Advice
              </Text>
              <View style={{ flexDirection: 'row', marginTop: 10 }}>
                <Image
                  source={{ uri: 'https://cdn.builder.io/api/v1/image/assets/TEMP/bcbe3d336062256960bcbe42f5bf22be8130cc8c4a877a1428d779f94805dd43?apiKey=7b9918e68d9b487793009b3aea5b1a32&width=100' }}
                  style={{ width: 40, height: 40, borderRadius: 6, marginRight: 10, marginLeft: 10 }}
                />
                <View style={{ flex: 1, justifyContent: 'center' }}>
                  <Text style={{ fontSize: 16, color: 'black' }}>Mr John Smith</Text>
                  <Text style={{ fontSize: 12, color: '#A9A9A9' }}>Architectural Engineer</Text>
                </View>
              </View>
              <View style={{ backgroundColor: '#d3f9d8', marginTop: 20, height: 210, marginLeft: 30, marginRight: 30 }}>
                <Text style={{ fontSize: 12, color: 'grey', textAlign: 'center', marginTop: 50 }}>Earn more by giving career advice to Jobseekers</Text>
                <TouchableOpacity
                  style={styles.startMessagingButton}
                  onPress={goToMessages}
                >
                  <Text style={styles.startMessagingText}>Start Messaging</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    marginLeft: 200,
    marginRight: 0, 
    marginTop: 0,
    width: '100%',
    aspectRatio: 3.7,
  },
  scrollViewContainer: {
    flex: 1,
    marginTop: 60, // Adjust the marginTop to accommodate the top bar's height
  },
  scrollViewContent: {
    flexGrow: 1,
    // Other styles for the ScrollView content as needed
  },
  image: {
    width: '100%',
    height: '50%',
  },
  textContainer: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -450 }, { translateY: -120 }],
    textAlign: 'center',
  },
  parentcontainer: {
    flexDirection: 'row', 
    marginLeft: 230,
    marginRight: 20,
    marginTop: -170,
    justifyContent: 'space-between', 
    paddingHorizontal: 20, 
    paddingTop: 20, 
  },
  upcomingcontainer: {
    padding: 12,
    marginLeft: 10,
    marginRight: 15,
    width: '18%',
    backgroundColor: '#CAE1C1',
    borderRadius: 3,
    marginTop: 10,
    flexDirection: 'column',
  },
  upcomingtitle: {
    fontSize: 16,
    marginLeft: 0, 
    fontWeight: '700',
    color: '#206C00', 
  },
  upcomingtimer: {
    marginTop: 8,
    fontSize: 24, 
    fontWeight: 'bold',
    textAlign: 'left',
    color: 'coral',
  },
  upcomingdate: {
    marginTop: 15,
    fontSize: 10, 
    color: 'grey', 
  },
  upcomingtime: {
    marginTop: 4,
    fontSize: 10, 
    color: 'grey',
  },
  empprogresscontainer: {
    marginRight: 15,
    justifyContent: 'left',
    alignItems: 'left',
    padding: 16,
    width: '40%',
    borderRadius: 3,
    backgroundColor: '#CAE1C1',
    marginTop: 10,
  },
  progresstitle: {
    fontSize: 16,
    fontWeight: 700,
    color: '#206C00',
    maxWidth: '100%',
  },
  jobscontainer: {
    alignItems: 'flex-start',
    padding: 16,
    marginRight: 15,
    width: '18%',
    borderRadius: 3,
    backgroundColor: '#CAE1C1',
    marginTop: 10,
    paddingRight: 5, 
  },
  jobstitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#206C00',
  },
  jobscount: {
    marginTop: 8,
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'right',
    color: 'coral',
  },
  jobsprogress: {
    fontSize: 12,
    color: 'green',
  },
   feedbacktext: {
    marginTop: 8,
    fontSize: 12,
    color: 'green',
   },
  jobsterminated: {
    marginTop: 8,
    fontSize: 12,
    color: '#EF4444',
  },
  scorecontainer: {
    flex: 1, 
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
    marginRight: 15,
    width: '14%',
    backgroundColor: 'white',
    borderRadius: 3,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
    marginTop: 5,
  },
  scoretitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#206C00',
    textAlign: 'center',
    marginBottom: 8,
  },
  scoreaverage: {
    fontSize: 24,
    marginTop: 15,
    fontWeight: 'bold',
    color: 'coral',
    textAlign: 'center',
  },
  requestPayoutButton: {
    backgroundColor: '#56866F',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginLeft: 10,
  },  
  balanceContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  graphcontainer: {
    marginLeft: 10,
    marginRight: 20, 
    marginTop: 190,
    paddingHorizontal: 6,
    paddingVertical: 4,
    borderRadius: 3,
    backgroundColor: '#CAE1C1',
    maxWidth: '30%',
    height: 350
  },
  graphtitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#206C00',
    marginBottom: 4,
  },
  barGraphContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    width: 230,
    height: 280,
    marginTop: 10,
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 10,
    paddingHorizontal: 10,
    backgroundColor: '#d3f9d8',
    borderRadius: 5, 
    paddingTop: 20,
    paddingBottom: 30
  },
  barContainer: {
    alignItems: 'center',
  },
  scoreDateContainer: {
    position: 'absolute',
    bottom: -25,
    left: '50%',
    transform: [{ translateX: -15 }],
    alignItems: 'center',
  },
  graphbar: {
    width: 20,
    borderRadius: 2,
    marginBottom: 10,
  },
  graphscore: {
    fontSize: 12,
    color: 'grey',
     fontWeight: 'bold',
  },
  graphdate: {
    fontSize: 10,
    color: 'black',
    fontWeight: 'bold',
    marginTop: 2,
  },
  startMessagingButton: {
    backgroundColor: '#56866F',
    marginTop: 90,
    marginLeft: 200,
    marginRight: 200,
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 2.84,
    elevation: 2
  },
  startMessagingText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center'
  },
  tcontainer: {
    alignItems: 'center',
  },
});

export default MyComponent;
