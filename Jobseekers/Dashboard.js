import React from 'react';
import { View, Image, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native'; 
import Sidebar from '../components/sidebar';
import Topbar from '../components/topbar';
import { useFonts } from 'expo-font';
import { useTranslation } from 'react-i18next';

const data = [
  { date: '12/03', score: 25 },
  { date: '22/03', score: 23 },
  { date: '02/04', score: 21 },
  { date: '15/05', score: 17 },
  { date: '17/05', score: 12 }
];

const colors = ['#28B0D4', '#ADB80B', '#842652', '#90A55A', '#842652'];

function MyComponent() {
  const navigation = useNavigation(); 

  const goToMessages = () => {
    navigation.navigate('Messages'); 
  };
  const [fontsLoaded]=useFonts({
    "Roboto-Light":require("../assets/fonts/Roboto-Light.ttf"),
      })
      const {t}=useTranslation()

  return (
    <View style={{ height: '70%' }}>
      <Topbar />
      <View style={{ flexDirection: 'row', flex: 1 }}>
        <Sidebar />
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <View style={styles.container}>
            <Image
              source={require('../assets/Background.png')}
              style={styles.image}
            />
            <View style={styles.textContainer}>
              <Text style={{ fontSize: 25, color: '#206C00', fontWeight: 'bold', marginLeft: 100,fontFamily:"Roboto-Light" }}>{t("Manage your activities")}</Text>
              <Text style={{ fontSize: 14, marginTop: 8, color: '#206C00', marginLeft: 100,fontFamily:"Roboto-Light"  }}>{t("Find ease in managing your activities, Get insights on all your actvities in one place.")}</Text>
            </View>
          </View>
          <View style={styles.parentcontainer}>
            <View style={styles.upcomingcontainer}>
              <Text style={styles.upcomingtitle}>{t("Upcoming Interview")}</Text>
              <Text style={styles.upcomingtimer}>15m:22s</Text>
              <Text style={styles.upcomingdate}>{t("Today")}</Text>
              <Text style={styles.upcomingtime}>09:30pm - 10:30pm</Text>
            </View>
            <View style={styles.empprogresscontainer}>
              <Text style={styles.progresstitle}>{t("Employment Progress")}</Text>
              <View style={styles.progressContainer}>
                <View style={styles.dot} />
                <View style={styles.bar} />
                <View style={styles.dot} />
                <View style={styles.bar} />
                <View style={styles.dot} />
                <View style={styles.bar} />
                <View style={styles.dot} />
                <View style={styles.emptyBar} />
                <View style={styles.dot} />
                <View style={styles.emptyBar} />
                <View style={styles.dot} />
              </View>
              <View style={styles.progresslabelsContainer}>
                <Text style={styles.progresslabel}>{t("Interview")}</Text>
                <Text style={styles.progresslabel}>{t("Feedback")}</Text>
                <Text style={styles.progresslabel}>{t("Recruiter")}</Text>
                <Text style={styles.progresslabel}>{t("Review")}</Text>
                <Text style={styles.progressemptyLabel}>{t("Employed")}</Text>
                <Text style={styles.progressemptyLabel}>{t("Resume")}</Text>
              </View>
            </View>
            <View style={styles.jobscontainer}>
              <Text style={styles.jobstitle}>{t("Job Applications")}</Text>
              <Text style={styles.jobscount}>13</Text>
              <Text style={styles.jobsprogress}>{t("In Progress - 7")}</Text>
              <Text style={styles.jobsterminated}>{t("Terminated - 6")}</Text>
            </View>
            <View style={styles.scorecontainer}>
              <Text style={styles.scoretitle}>{t("Interview Average")}</Text>
              <Text style={styles.scoreaverage}>20</Text>
            </View>
          </View>
          <View style={styles.parentcontainer}>
            <View style={styles.graphcontainer}>
              <Text style={styles.graphtitle}>{t("Interview Score Progression")}</Text>
              <View style={styles.barGraphContainer}>
                {data.map((item, index) => (
                  <View key={index} style={styles.barContainer}>
                    <View style={[styles.graphbar, { height: item.score * 7, backgroundColor: colors[index] }]} />
                    <Text style={styles.graphscore}>{item.score}</Text>
                    <Text style={styles.graphdate}>{item.date}</Text>
                  </View>
                ))}
              </View>
            </View>

            <View style={styles.careerAdviceContainer}>
              <Text style={styles.careerAdviceTitle}>{t("Career Advice")}</Text>
              <View style={styles.careerAdviceContent}>
                <Image
                  source={{ uri: 'https://cdn.builder.io/api/v1/image/assets/TEMP/bcbe3d336062256960bcbe42f5bf22be8130cc8c4a877a1428d779f94805dd43?apiKey=7b9918e68d9b487793009b3aea5b1a32&width=100' }}
                  style={{ width: 40, height: 40, borderRadius: 6, marginRight: 10 }}
                />
                <View>
                  <Text style={styles.expertName}>Mr John Smith</Text>
                  <Text style={styles.expertTitle}>{t("Architectural Engineer")}</Text>
                </View>
              </View>
              <View style={styles.adviceButtonContainer}>
                <Text style={styles.adviceText}>{t("Send an instant message to an expert for advice. You will need to be a pro user to access this feature...")}</Text>
                <TouchableOpacity
                  style={styles.startMessagingButton}
                  onPress={goToMessages}
                >
                  <Text style={styles.startMessagingText}>{t("Start Messaging")}</Text>
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
    position: 'relative',
    width: '100%',
    aspectRatio: 3.7,
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
    marginLeft: 10,
    fontWeight: '700',
    color: '#206C00',
    fontFamily:"Roboto-Light" 
  },
  upcomingtimer: {
    marginTop: 8,
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'left',
    color: 'coral',
    fontFamily:"Roboto-Light" 
  },
  upcomingdate: {
    marginTop: 15,
    fontSize: 10,
    color: 'grey',
    fontFamily:"Roboto-Light" 
  },
  upcomingtime: {
    marginTop: 4,
    fontSize: 10,
    color: 'grey',
    fontFamily:"Roboto-Light" 
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
    fontWeight: '700',
    color: '#206C00',
    maxWidth: '100%',
    fontFamily:"Roboto-Light" 
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
    marginBottom: 16,
  },
  dot: {
    width: 6,
    height: 6,
    marginLeft: 6,
    marginTop: 10,
    borderRadius: 3,
    backgroundColor: '#206C00',
  },
  bar: {
    height: 1,
    width: 50,
    marginTop: 10,
    backgroundColor: '#206C00',
    marginLeft: 5,
    marginRight: 5,
  },
  emptyBar: {
    height: 1.5,
    width: 50,
    marginTop: 10,
    backgroundColor: 'lightgrey',
    marginLeft: 5,
    marginRight: 5,
  },
  progresslabelsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  progresslabel: {
    fontSize: 12,
    marginTop: -5,
    color: '#206C00',
    flex: 1,
    textAlign: 'flex-start',
    fontFamily:"Roboto-Light" 
  },
  progressemptyLabel: {
    fontSize: 12,
    marginTop: -5,
    color: 'grey',
    flex: 1,
    textAlign: 'flex-start',
    fontFamily:"Roboto-Light" 
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
    fontFamily:"Roboto-Light" 
  },
  jobscount: {
    marginTop: 8,
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'right',
    color: 'coral',
    fontFamily:"Roboto-Light" 
  },
  jobsprogress: {
    marginTop: 8,
    fontSize: 12,
    color: 'green',
    fontFamily:"Roboto-Light" 
  },
  jobsterminated: {
    marginTop: 4,
    fontSize: 12,
    color: '#EF4444',
    fontFamily:"Roboto-Light" 
  },
  scorecontainer: {
    flexGrow: 1,
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
    fontFamily:"Roboto-Light" 
  },
  scoreaverage: {
    fontSize: 40,
    fontWeight: 'bold',
    color: 'coral',
    textAlign: 'center',
    fontFamily:"Roboto-Light" 
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
    fontFamily:"Roboto-Light" 
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
    paddingBottom: 20
  },
  barContainer: {
    alignItems: 'center',
  },
  graphbar: {
    width: 20,
    borderRadius: 2,
    marginBottom: 10,
  },
  graphscore: {
    fontSize: 12,
    color: '#000',
    fontFamily:"Roboto-Light" 
  },
  graphdate: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 4,
    fontFamily:"Roboto-Light" 
  },
  careerAdviceContainer: {
    marginRight: 10,
    flex: 1,
    paddingTop: 6,
    paddingRight: 20,
    paddingBottom: 12,
    paddingLeft: 6,
    width: '100%',
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    backgroundColor: 'white',
    paddingHorizontal: 5,
    marginTop: 190,
    maxWidth: '100%',
    height: 350,
    marginBottom: 30
  },
  careerAdviceTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#206C00',
    maxWidth: '100%',
    marginTop: 10,
    marginLeft: 10,
    fontFamily:"Roboto-Light" 
  },
  careerAdviceContent: {
    flexDirection: 'row',
    marginTop: 10,
    marginLeft: 10
  },
  expertName: {
    fontSize: 16,
    color: 'black',
    fontFamily:"Roboto-Light" 
  },
  expertTitle: {
    fontSize: 12,
    color: '#A9A9A9',
    fontFamily:"Roboto-Light" 
  },
  adviceButtonContainer: {
    backgroundColor: '#d3f9d8',
    marginTop: 20,
    height: 210,
    marginLeft: 30,
    marginRight: 30
  },
  adviceText: {
    fontSize: 12,
    color: 'grey',
    textAlign: 'center',
    marginTop: 50,fontFamily:"Roboto-Light" 
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
    textAlign: 'center',
    fontFamily:"Roboto-Light" 
  }
});

export default MyComponent;
