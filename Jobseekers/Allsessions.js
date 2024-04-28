import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';
import Sidebar from '../components/sidebar';
import Topbar from '../components/topbar';

function MyComponent() {
  return (
    <View style={{height: '80%'}}>
      <Topbar />
      <View style={{ flexDirection: 'row', flex: 1 }}>
        <Sidebar />
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
    <View style={styles.container}>
    <View style={{ flexDirection: "row",  alignItems: "flex-start", paddingHorizontal: 10, marginTop: 5, marginBottom: 20 }}>
        <Text style={{ fontWeight: "bold", fontSize: 14, color: "#206C00" }}>All Sessions</Text>
        <Text style={{ fontSize: 14, marginLeft: 35 }}>Upcoming Sessions</Text>
        <Text style={{ fontSize: 14, marginLeft: 35 }}>Past Sessions</Text>
        <Text style={{ fontSize: 14, marginLeft: 35  }}>Saved</Text>
      </View>
      <View style={styles.sessionContainer}>
        {/* Sessions */}
        <View style={styles.session}>
          <Text style={styles.sessionText}>Civil Engineer</Text>
        </View>
        <View style={styles.session}>
          <Text style={styles.sessionText}>Architect</Text>
        </View>
        <View style={styles.session}>
          <Text style={styles.sessionText}>Surveyor</Text>
        </View>
        <View style={styles.session}>
          <Text style={styles.sessionText}>Constructor</Text>
        </View>
        <View style={styles.session}>
          <Text style={styles.sessionText}>Construction Foreman</Text>
        </View>
      </View>
      {/* Architectural Engineer */}
      <Text style={styles.heading}>Architectural Engineer</Text>
      {/* Other sessions */}
      <View style={styles.scheduleContainer}>
        <View style={styles.schedule}>
          <Text style={styles.scheduleDay}>Friday</Text>
          <Text style={styles.scheduleTime}>09:00pm - 10:00pm</Text>
        </View>
      </View>
      <Text style={styles.description}>
        John Smith is a passionate architectural engineer with over 10 years of experience in designing and implementing innovative building solutions. With a Bachelor's degree in Architectural Engineering from XYZ University and a Master's degree in Sustainable Design, John brings a unique blend of technical expertise and environmental consciousness to his projects.
      </Text>
      <View style={styles.infoContainer}>
        <View style={styles.info}>
          <View style={styles.infoItem}>
            <Image
              source={{ uri: 'https://cdn.builder.io/api/v1/image/assets/TEMP/b39a40d38d973a4aa17a201de5e8c8b473621b426f7e2cc5d09c9c3c61ac66f1?apiKey=7b9918e68d9b487793009b3aea5b1a32' }}
              style={styles.infoImage}
            />
            <Text>Save</Text>
          </View>
          <Image
            source={{ uri: 'https://cdn.builder.io/api/v1/image/assets/TEMP/9851efa0d826fe660810451d5369a608759a0cc7acc997dd6024a4423a37ac83?apiKey=7b9918e68d9b487793009b3aea5b1a32' }}
            style={styles.infoImage}
          />
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
      {/* Construction Manager */}
      <Text style={styles.heading}>Construction Manager</Text>
      {/* Other sessions */}
      <View style={styles.scheduleContainer}>
        <View style={styles.schedule}>
          <Text style={styles.scheduleDay}>Monday</Text>
          <Text style={styles.scheduleTime}>06:30pm - 07:30pm</Text>
        </View>
      </View>
      <Text style={styles.description}>
        Jessica Martinez is a dedicated construction engineer with over 8 years of experience in the industry. She holds a Bachelor's degree in Civil Engineering from XYZ University and is a licensed Professional Engineer (PE). Throughout her career, Jessica has successfully managed a wide range of construction projects, including residential, commercial, and infrastructure developments.
      </Text>
      <View style={styles.infoContainer}>
        <View style={styles.info}>
          <View style={styles.infoItem}>
            <Image
              source={{ uri: 'https://cdn.builder.io/api/v1/image/assets/TEMP/b39a40d38d973a4aa17a201de5e8c8b473621b426f7e2cc5d09c9c3c61ac66f1?apiKey=7b9918e68d9b487793009b3aea5b1a32' }}
              style={styles.infoImage}
            />
            <Text>Save</Text>
          </View>
          <Image
            source={{ uri: 'https://cdn.builder.io/api/v1/image/assets/TEMP/9851efa0d826fe660810451d5369a608759a0cc7acc997dd6024a4423a37ac83?apiKey=7b9918e68d9b487793009b3aea5b1a32' }}
            style={styles.infoImage}
          />
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
      {/* Construction Foreman */}
      <Text style={styles.heading}>Construction Foreman</Text>
      {/* Other sessions */}
      <View style={styles.scheduleContainer}>
        <View style={styles.schedule}>
          <Text style={styles.scheduleDay}>Sunday</Text>
          <Text style={styles.scheduleTime}>10:00am - 11:00am</Text>
        </View>
      </View>
      <Text style={styles.description}>
        Michael Johnson is a seasoned construction foreman with over 15 years of experience in the industry. Beginning his career as a laborer, he quickly rose through the ranks due to his exceptional leadership skills and dedication to excellence. Michael has a deep understanding of all aspects of construction, from site preparation to project completion.
      </Text>
      <View style={styles.infoContainer}>
        <View style={styles.info}>
          <View style={styles.infoItem}>
            <Image
              source={{ uri: 'https://cdn.builder.io/api/v1/image/assets/TEMP/b39a40d38d973a4aa17a201de5e8c8b473621b426f7e2cc5d09c9c3c61ac66f1?apiKey=7b9918e68d9b487793009b3aea5b1a32' }}
              style={styles.infoImage}
            />
            <Text>Save</Text>
          </View>
          <Image
            source={{ uri: 'https://cdn.builder.io/api/v1/image/assets/TEMP/9851efa0d826fe660810451d5369a608759a0cc7acc997dd6024a4423a37ac83?apiKey=7b9918e68d9b487793009b3aea5b1a32' }}
            style={styles.infoImage}
          />
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
      {/* Another Construction Foreman Session */}
      <Text style={styles.heading}>Construction Foreman</Text>
      <View style={styles.scheduleContainer}>
        <View style={styles.schedule}>
          <Text style={styles.scheduleDay}>Tuesday</Text>
          <Text style={styles.scheduleTime}>09:00pm - 10:00pm</Text>
        </View>
      </View>
      <Text style={styles.description}>
        Michael Johnson is a seasoned construction foreman with over 15 years of experience in the industry. Beginning his career as a laborer, he quickly rose through the ranks due to his exceptional leadership skills and dedication to excellence. Michael has a deep understanding of all aspects of construction, from site preparation to project completion.
      </Text>
      <View style={styles.infoContainer}>
        <View style={styles.info}>
          <View style={styles.infoItem}>
            <Image
              source={{ uri: 'https://cdn.builder.io/api/v1/image/assets/TEMP/b39a40d38d973a4aa17a201de5e8c8b473621b426f7e2cc5d09c9c3c61ac66f1?apiKey=7b9918e68d9b487793009b3aea5b1a32' }}
              style={styles.infoImage}
            />
            <Text>Save</Text>
          </View>
          <Image
            source={{ uri: 'https://cdn.builder.io/api/v1/image/assets/TEMP/9851efa0d826fe660810451d5369a608759a0cc7acc997dd6024a4423a37ac83?apiKey=7b9918e68d9b487793009b3aea5b1a32' }}
            style={styles.infoImage}
          />
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
    </ScrollView>
    </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20, 
    backgroundColor: 'white',
    paddingTop: 40,
    paddingBottom: 20,
    marginLeft: 210,
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
    backgroundColor: '#CEF1BF',
    marginRight: 5,
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
    color: 'black',
    marginTop: 10,
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
    backgroundColor: '#CEF1BF',
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 3
  },
  scheduleTime: {
    color: 'black',
    marginLeft: -5,
    borderRightWidth: 1,
    borderColor: '#206C00',
    borderRadius: 3,
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
});

export default MyComponent;