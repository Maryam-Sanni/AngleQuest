import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, ImageBackground, TouchableOpacity} from 'react-native';
import Sidebar from '../components/Managersidebar';
import Topbar from '../components/topbar';
import { BlurView } from 'expo-blur';

function MyComponent() {

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
        <Text style={{ fontWeight: "600", fontSize: 14, color: "#206C00" }}>All Meetings</Text>
        </View>
        </TouchableOpacity>
        <TouchableOpacity>
        <View style={styles.session2}>
        <Text style={{ fontWeight: "600", fontSize: 14, color: "#206C00" }}>Upcoming</Text>
        </View>
        </TouchableOpacity>
        <TouchableOpacity>
        <View style={styles.session2}>
        <Text style={{ fontWeight: "600", fontSize: 14, color: "#206C00" }}>Concluded</Text>
        </View>
        </TouchableOpacity>
      </View>
      {/* Session */}
      <View style={{ flexDirection: 'row'}}>
      <Text style={styles.heading}>Jessica Jason</Text> 
      <Text style={styles.subheading}>(Meeting 1)</Text>
      </View>
      <View style={styles.scheduleContainer}>
        <View style={styles.schedule}>
          <Text style={styles.scheduleDay}>19th January</Text>
          <Text style={styles.scheduleTime}>09:00pm - 10:00pm</Text>
        </View>
      </View>
      <View style={styles.infoContainer}>
        <View style={styles.info}>
          
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
      <Text style={styles.heading}>Martinez Kelly</Text> 
      <Text style={styles.subheading}>(Meeting 2)</Text>
      </View>
      <View style={styles.scheduleContainer}>
        <View style={styles.schedule}>
          <Text style={styles.scheduleDay}>2nd March</Text>
          <Text style={styles.scheduleTime}>06:30pm - 07:30pm</Text>
        </View>
      </View>
      <View style={styles.infoContainer}>
        <View style={styles.info}>
          
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
      <Text style={styles.heading}>Adetola Adebayo</Text> 
      <Text style={styles.subheading}>(Meeting 1)</Text>
      </View>
      <View style={styles.scheduleContainer}>
        <View style={styles.schedule}>
          <Text style={styles.scheduleDay}>25th April</Text>
          <Text style={styles.scheduleTime}>10:00am - 11:00am</Text>
        </View>
      </View>
      <View style={styles.infoContainer}>
        <View style={styles.info}>
          
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
      <Text style={styles.heading}>Houston Taiwo</Text> 
      <Text style={styles.subheading}>(Meeting 1)</Text>
      </View>
      <View style={styles.scheduleContainer}>
        <View style={styles.schedule}>
          <Text style={styles.scheduleDay}>29th April</Text>
          <Text style={styles.scheduleTime}>09:00pm - 10:00pm</Text>
        </View>
      </View>
      <View style={styles.infoContainer}>
        <View style={styles.info}>
         
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
      <Text style={styles.heading}>Adrew Serrena</Text> 
      <Text style={styles.subheading}>(Meeting 2)</Text>
      </View>
      <View style={styles.scheduleContainer}>
        <View style={styles.schedule}>
          <Text style={styles.scheduleDay}>7th May</Text>
          <Text style={styles.scheduleTime}>09:00pm - 10:00pm</Text>
        </View>
      </View>
      <View style={styles.infoContainer}>
        <View style={styles.info}>
         
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
  },
  subheading: {
    fontSize: 14,
    color: 'Black',
    marginLeft: 5,
    marginTop: 18,
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
  },
  description: {
    fontSize: 14,
    color: 'black',
    marginBottom: 10,
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