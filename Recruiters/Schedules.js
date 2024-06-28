import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, ImageBackground} from 'react-native';
import Sidebar from '../components/Recruiterssidebar';
import Topbar from '../components/Recruiterstopbar';
import { BlurView } from 'expo-blur';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { FaStar } from 'react-icons/fa';

import {useFonts} from "expo-font"

function MyComponent() {

  const [fontsLoaded]=useFonts({
    'Varta-Light':require("../assets/fonts/Varta-Light.ttf"),
    "Varta-Bold":"../assets/fonts/Varta-Bold.ttf",
    "Varta-Medium":"../assets/fonts/Varta-Medium.ttf",
    "Varta-Regular":"./assets/fonts/Varta-Regular.ttf",
    "Varta-SemiBold":"./assets/fonts/Varta-SemiBold.ttf"


  })

  return (
    <ImageBackground
    source={require ('../assets/Background.png') }
  style={{ height: '110%', width: '100%',flex: 1}}
>
<BlurView intensity={70} style={{flex: 1}}>
    <View style={{flex: 1}}>
      <Topbar />
      <View style={{ flexDirection: 'row', flex: 1 }}>
        <Sidebar />
        <ScrollView contentContainerStyle={styles.scrollViewContent} indicatorStyle="black">
        <View style={styles.glassBox}>
    <View style={styles.container}>
    <View style={{ flexDirection: "row",  alignItems: "flex-start", marginTop: 10, marginBottom: 20, }}>
    <TouchableOpacity>
    <View style={styles.session}>
        <Text style={{ fontWeight: "600", fontSize: 14, color: "#206C00",fontFamily:"Varta-Light" }}>All upcoming Sessions</Text>
        </View>
        </TouchableOpacity>
        <TouchableOpacity>
        <View style={styles.session2}>
        <Text style={{ fontWeight: "600", fontSize: 14, color: "#206C00",fontFamily:"Varta-Light" }}>Upcoming hub session</Text>
        </View>
        </TouchableOpacity>
        <TouchableOpacity>
        <View style={styles.session2}>
        <Text style={{ fontWeight: "600", fontSize: 14, color: "#206C00",fontFamily:"Varta-Light" }}>Upcoming growth plan</Text>
        </View>
        </TouchableOpacity>
        <TouchableOpacity>
        <View style={styles.session2}>
        <Text style={{ fontWeight: "600", fontSize: 14, color: "#206C00",fontFamily:"Varta-Light"}}>Upcoming reviews</Text>
        </View>
        </TouchableOpacity>
        <TouchableOpacity>
        <View style={styles.session2}>
        <Text style={{ fontWeight: "600", fontSize: 14, color: "#206C00",fontFamily:"Varta-Light" }}>Upcoming advice</Text>
      </View>
      </TouchableOpacity>
      </View>
      {/* Session */}
      <View style={{ flexDirection: 'row'}}>
      <Text style={styles.heading}>Growth Plan Session</Text> 
      <Text style={styles.subheading}>with Joop Melcher</Text>
      </View>
      <View style={styles.scheduleContainer}>
        <View style={styles.schedule}>
          <Text style={styles.scheduleDay}>19-09-2024</Text>
          <Text style={styles.scheduleTime}>09:00pm - 10:00pm</Text>
        </View>
      </View>
      <Text style={styles.description}>
      Joop Melcher is a seasoned technology enthusiast and expert, particularly well-versed in SAP Financial Accounting (SAP FI). With a rich background in information technology and a deep understanding of enterprise resource planning systems, Joop has established himself as a go-to professional for businesses looking to optimize their financial processes using SAP solutions. 
      </Text>
      <View style={styles.infoContainer}>
        <View style={styles.info}>
          <View style={styles.infoItem}>
          <Image
              source={{ uri: 'https://cdn.builder.io/api/v1/image/assets/TEMP/b39a40d38d973a4aa17a201de5e8c8b473621b426f7e2cc5d09c9c3c61ac66f1?apiKey=7b9918e68d9b487793009b3aea5b1a32' }}
              style={styles.infoImage}
            /> 
            <Text style={{marginLeft: 5,fontFamily:"Varta-Light"}}>Save</Text>
          </View>
          <View style={{ flexDirection: 'row'}}>
                    <Text style={{ fontSize: 18, alignText: 'center', marginRight: 10}}><FaStar color="#F69200" /><FaStar color="#F69200" /></Text>
                    </View>
          <View style={styles.infoItem}>
            <Image
              source={{ uri: 'https://cdn.builder.io/api/v1/image/assets/TEMP/c74e4db33c970e305c09ab3f86a2b48290c7cd4267b79768f3a013431d9d263c?apiKey=7b9918e68d9b487793009b3aea5b1a32' }}
              style={styles.infoImage}
            />
            <Text>United Kingdom</Text>
          </View>
        </View>
        <View style={styles.status}>
          <Image
            source={{ uri: 'https://cdn.builder.io/api/v1/image/assets/TEMP/4f02cf88e6c8c6e2f839328a10a318d235a95ae6cb6e81a2776238987fe9f024?apiKey=7b9918e68d9b487793009b3aea5b1a32' }}
            style={styles.statusImage}
          />
          <Text>Upcoming</Text>
        </View>
      </View>
      {/* Session */}
      <View style={{ flexDirection: 'row'}}>
      <Text style={styles.heading}>Advice Session</Text> 
      <Text style={styles.subheading}>with Jessica Martinez</Text>
      </View>
      <View style={styles.scheduleContainer}>
        <View style={styles.schedule}>
          <Text style={styles.scheduleDay}>02-03-2024</Text>
          <Text style={styles.scheduleTime}>06:30pm - 07:30pm</Text>
        </View>
      </View>
      <Text style={styles.description}>
        Jessica Martinez is an experienced advisor known for her insightful guidance and strategic advice sessions. With a broad background in business consulting, she specializes in helping individuals and organizations achieve their goals through tailored advice and actionable strategies. Jessica’s expertise spans various industries, enabling her to offer unique perspectives and practical solutions to complex challenges.
      </Text>
      <View style={styles.infoContainer}>
        <View style={styles.info}>
          <View style={styles.infoItem}>
          <Image
              source={{ uri: 'https://cdn.builder.io/api/v1/image/assets/TEMP/b39a40d38d973a4aa17a201de5e8c8b473621b426f7e2cc5d09c9c3c61ac66f1?apiKey=7b9918e68d9b487793009b3aea5b1a32' }}
              style={styles.infoImage}
            /> 
            <Text style={{marginLeft: 5}}>Save</Text>
          </View>
          <View style={{ flexDirection: 'row'}}>
                    <Text style={{ fontSize: 18, alignText: 'center', marginRight: 10}}><FaStar color="#F69200" /><FaStar color="#F69200" /><FaStar color="#F69200" /><FaStar color="#F69200" /><FaStar color="#F69200" /></Text>
                    </View>
          <View style={styles.infoItem}>
            <Image
              source={{ uri: 'https://cdn.builder.io/api/v1/image/assets/TEMP/c74e4db33c970e305c09ab3f86a2b48290c7cd4267b79768f3a013431d9d263c?apiKey=7b9918e68d9b487793009b3aea5b1a32' }}
              style={styles.infoImage}
            />
            <Text>Switzerland</Text>
          </View>
        </View>
        <View style={styles.status}>
          <Image
            source={{ uri: 'https://cdn.builder.io/api/v1/image/assets/TEMP/2f5081b8ae506f05b44dfd97e5ce54536bbe736169816a24201e57e7cd655856?apiKey=7b9918e68d9b487793009b3aea5b1a32' }}
            style={styles.statusImage}
          />
          <Text>Concluded</Text>
        </View>
      </View>
     {/* Session*/}
     <View style={{ flexDirection: 'row'}}>
      <Text style={styles.heading}>Interview Session</Text> 
      <Text style={styles.subheading}>with Adetola Adebayo</Text>
      </View>
      <View style={styles.scheduleContainer}>
        <View style={styles.schedule}>
          <Text style={styles.scheduleDay}>25-06-2024</Text>
          <Text style={styles.scheduleTime}>10:00am - 11:00am</Text>
        </View>
      </View>
      <Text style={styles.description}>
      Adetola Adebayo is a distinguished expert specializing in interview coaching and preparation. With a strong background in human resources and career development, Adetola has become a trusted advisor for individuals seeking to excel in job interviews and advance their careers.
      </Text>
      <View style={styles.infoContainer}>
        <View style={styles.info}>
          <View style={styles.infoItem}>
          <Image
              source={{ uri: 'https://cdn.builder.io/api/v1/image/assets/TEMP/b39a40d38d973a4aa17a201de5e8c8b473621b426f7e2cc5d09c9c3c61ac66f1?apiKey=7b9918e68d9b487793009b3aea5b1a32' }}
              style={styles.infoImage}
            /> 
            <Text style={{marginLeft: 5}}>Save</Text>
          </View>
          <View style={{ flexDirection: 'row'}}>
                    <Text style={{ fontSize: 18, alignText: 'center', marginRight: 10}}><FaStar color="#F69200" /><FaStar color="#F69200" /><FaStar color="#F69200" /></Text>
                    </View>
          <View style={styles.infoItem}>
            <Image
              source={{ uri: 'https://cdn.builder.io/api/v1/image/assets/TEMP/c74e4db33c970e305c09ab3f86a2b48290c7cd4267b79768f3a013431d9d263c?apiKey=7b9918e68d9b487793009b3aea5b1a32' }}
              style={styles.infoImage}
            />
            <Text>Canada</Text>
          </View>
        </View>
        <View style={styles.status}>
          <Image
            source={{ uri: 'https://cdn.builder.io/api/v1/image/assets/TEMP/4f02cf88e6c8c6e2f839328a10a318d235a95ae6cb6e81a2776238987fe9f024?apiKey=7b9918e68d9b487793009b3aea5b1a32' }}
            style={styles.statusImage}
          />
          <Text>Upcoming</Text>
        </View>
      </View>
      {/* Session */}
     <View style={{ flexDirection: 'row'}}>
      <Text style={styles.heading}>Hub Session</Text> 
      <Text style={styles.subheading}>with Joop Melcher</Text>
      </View>
      <View style={styles.scheduleContainer}>
        <View style={styles.schedule}>
          <Text style={styles.scheduleDay}>21-05-2024</Text>
          <Text style={styles.scheduleTime}>09:00pm - 10:00pm</Text>
        </View>
      </View>
      <Text style={styles.description}>
      Joop Melcher is a seasoned technology enthusiast and expert, particularly well-versed in SAP Financial Accounting (SAP FI). With a rich background in information technology and a deep understanding of enterprise resource planning systems, Joop has established himself as a go-to professional for businesses looking to optimize their financial processes using SAP solutions. 
      </Text>
      <View style={styles.infoContainer}>
        <View style={styles.info}>
          <View style={styles.infoItem}>
          <Image
              source={{ uri: 'https://cdn.builder.io/api/v1/image/assets/TEMP/b39a40d38d973a4aa17a201de5e8c8b473621b426f7e2cc5d09c9c3c61ac66f1?apiKey=7b9918e68d9b487793009b3aea5b1a32' }}
              style={styles.infoImage}
            /> 
            <Text style={{marginLeft: 5}}>Save</Text>
          </View>
          <View style={{ flexDirection: 'row'}}>
                    <Text style={{ fontSize: 18, alignText: 'center', marginRight: 10}}><FaStar color="#F69200" /><FaStar color="#F69200" /></Text>
                    </View>
          <View style={styles.infoItem}>
            <Image
              source={{ uri: 'https://cdn.builder.io/api/v1/image/assets/TEMP/c74e4db33c970e305c09ab3f86a2b48290c7cd4267b79768f3a013431d9d263c?apiKey=7b9918e68d9b487793009b3aea5b1a32' }}
              style={styles.infoImage}
            />
            <Text>Netherlands</Text>
          </View>
        </View>
        <View style={styles.status}>
          <Image
            source={{ uri: 'https://cdn.builder.io/api/v1/image/assets/TEMP/4f02cf88e6c8c6e2f839328a10a318d235a95ae6cb6e81a2776238987fe9f024?apiKey=7b9918e68d9b487793009b3aea5b1a32' }}
            style={styles.statusImage}
          />
          <Text>Upcoming</Text>
        </View>
      </View>
     {/* Session*/}
     <View style={{ flexDirection: 'row'}}>
      <Text style={styles.heading}>Interview Session</Text> 
      <Text style={styles.subheading}>with Andrew Hutchings</Text>
      </View>
      <View style={styles.scheduleContainer}>
        <View style={styles.schedule}>
          <Text style={styles.scheduleDay}>07-02-2024</Text>
          <Text style={styles.scheduleTime}>09:00pm - 10:00pm</Text>
        </View>
      </View>
      <Text style={styles.description}>
      Andrew Hutchings is a renowned expert in interview coaching and preparation. With extensive experience in human resources and talent acquisition, Andrew has established himself as a leading advisor for individuals aiming to excel in job interviews and advance their careers.
      </Text>
      <View style={styles.infoContainer}>
        <View style={styles.info}>
          <View style={styles.infoItem}>
          <Image
              source={{ uri: 'https://cdn.builder.io/api/v1/image/assets/TEMP/b39a40d38d973a4aa17a201de5e8c8b473621b426f7e2cc5d09c9c3c61ac66f1?apiKey=7b9918e68d9b487793009b3aea5b1a32' }}
              style={styles.infoImage}
            /> 
            <Text style={{marginLeft: 5}}>Save</Text>
          </View>
          <View style={{ flexDirection: 'row'}}>
                    <Text style={{ fontSize: 18, alignText: 'center', marginRight: 10}}><FaStar color="#F69200" /></Text>
                    </View>
          <View style={styles.infoItem}>
            <Image
              source={{ uri: 'https://cdn.builder.io/api/v1/image/assets/TEMP/c74e4db33c970e305c09ab3f86a2b48290c7cd4267b79768f3a013431d9d263c?apiKey=7b9918e68d9b487793009b3aea5b1a32' }}
              style={styles.infoImage}
            />
            <Text>Germany</Text>
          </View>
        </View>
        <View style={styles.status}>
          <Image
            source={{ uri: 'https://cdn.builder.io/api/v1/image/assets/TEMP/2f5081b8ae506f05b44dfd97e5ce54536bbe736169816a24201e57e7cd655856?apiKey=7b9918e68d9b487793009b3aea5b1a32' }}
            style={styles.statusImage}
          />
          <Text>Concluded</Text>
        </View>
      </View>
    </View>
    </View>
    </ScrollView>
    </View>
    </View>
    </BlurView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  headerText: {
    fontWeight: 'bold',
    color: '#206C00',
    fontSize: 16,
  },
  sessionContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 10,
  },
  session: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderWidth: 1,
    borderColor: '#206C00',
    borderRadius: 5,
    backgroundColor: '#a3e5af',
    marginRight: 10,
    marginBottom: 5,
  },
  session2: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderWidth: 1,
    borderColor: '#206C00',
    borderRadius: 5,
    backgroundColor: 'none',
    marginRight: 10,
    marginBottom: 5,
  },
  sessionText: {
    color: '#206C00',
  },
  image: {
    width: 20,
    height: 20,
    aspectRatio: 1,
  },
  heading: {
    fontSize: 18,
    color: 'Black',
    fontWeight: '500',
    marginTop: 15,
    fontFamily:"Varta-Light"
  },
  subheading: {
    fontSize: 14,
    color: 'Black',
    marginLeft: 5,
    marginTop: 18,
    fontFamily:"Varta-Light"
  },
  scheduleContainer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  schedule: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  scheduleDay: {
    color: '#206C00',
    marginRight: 5,
    borderColor: '#206C00',
    backgroundColor: '#d3f9d8',
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 0,
    fontFamily:"Varta-Light"
  },
  scheduleTime: {
    color: 'black',
    marginLeft: -5,
    borderRightWidth: 1,
    borderColor: '#206C00',
    borderRadius: 0,
    borderTopWidth: 1, 
    borderBottomWidth: 1,
    backgroundColor: 'white',
    paddingHorizontal: 10,
    paddingVertical: 5,
    fontFamily:"Varta-Light"
  },
  description: {
    fontSize: 14,
    color: 'black',
    marginBottom: 10,
    fontFamily:"Varta-Light"
  },
  infoContainer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  info: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
  },
  infoImage: {
    width: 20,
    height: 20,
    marginRight: 5,
  },
  status: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusImage: {
    width: 20,
    height: 20,
    marginRight: 5,
  },
  scrollViewContent: {
    flexGrow: 1,
    maxHeight: 500, // Set a maximum height for the ScrollView
},
});

export default MyComponent;