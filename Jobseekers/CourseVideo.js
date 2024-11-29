import React, { useState } from 'react';
import { View, Text, ImageBackground, ScrollView, TouchableOpacity, FlatList, StyleSheet, Picker, Image, TextInput } from 'react-native';
import { Video } from 'expo-av';
import Topbar from '../components/topbar';
import Sidebar from '../components/sidebar';
import { BlurView } from "expo-blur";

const courses = [
  { id: '1', category: 'SAP', tutor: 'John Doe', level: 'Beginner' },
  { id: '2', category: 'Microsoft', tutor: 'Jane Smith', level: 'Intermediate' },
  { id: '3', category: 'Scrum', tutor: 'Emily Davis', level: 'Advanced' },
  { id: '4', category: 'Business Analysis', tutor: 'Michael Brown', level: 'Beginner' },
];

const meetingsData = {
  '1': [
    { id: '101', title: 'Introduction to SAP', description: 'Basics of SAP and its modules.' },
    { id: '102', title: 'SAP Navigation', description: 'How to navigate the SAP system.' },
  ],
  '2': [
    { id: '201', title: 'Getting Started with Office 365', description: 'Overview of Office 365 tools.' },
  ],
  '3': [
    { id: '301', title: 'Scrum Roles', description: 'Detailed explanation of Scrum roles.' },
    { id: '302', title: 'Scrum Ceremonies', description: 'Introduction to Scrum ceremonies.' },
  ],
  '4': [
    { id: '401', title: 'What is Business Analysis?', description: 'Understanding the role of a Business Analyst.' },
  ],
};

const CourseCard = ({ course, onPress }) => (
  <View style={{marginTop: 15}}>
  <TouchableOpacity style={styles.card} onPress={onPress}>
    <ImageBackground
      source={require('../assets/groupPeeps.png')} 
      style={styles.cardImage}
      imageStyle={styles.cardImageStyle}
    />
    <View style={styles.cardDetails}>
      <Text style={styles.cardCategory}>{course.category}</Text>
      <Text style={styles.cardTutor}>Tutor: {course.tutor}</Text>
      <Text style={styles.cardLevel}>Level: {course.level}</Text>
    </View>
  </TouchableOpacity>
    </View>
);

export default function CoursesPage() {
  const [selectedCourse, setSelectedCourse] = useState(null);

  const videoRef = React.useRef(null);

  // Programmatically trigger fullscreen using the native controls
  const handleExpandVideo = async () => {
    if (videoRef.current) {
      await videoRef.current.presentFullscreenPlayer(); // Trigger fullscreen
    }
  };
  
  const renderMeeting = ({ item }) => (
    <View style={styles.meetingCard}>
      <TouchableOpacity onPress={handleExpandVideo}>
        <Image
          source={{
            uri: "https://img.icons8.com/?size=100&id=397&format=png&color=000000",
          }}
          style={{ width: 25, height: 25, marginRight: 10, marginTop: 30 }} 
        />
      </TouchableOpacity>

      <TouchableOpacity onPress={handleExpandVideo}>
        <Video
          ref={videoRef}
          source={require('../assets/coursetest.mp4')}
          useNativeControls
          resizeMode="cover"
          style={styles.largeVideo}
        />
      </TouchableOpacity>
      <View style={{flexDirection: 'column' }}>
      <Text style={styles.meetingTitle}>{item.title}</Text>
      <Text style={styles.meetingDescription}>{item.description}</Text>
      </View>
     
    </View>
  );

  return (
    <ImageBackground
      source={require("../assets/backgroundimg2.png")}
      style={{ height: "100%", width: "100%", flex: 1 }}
    >
      <View style={{ flex: 1 }}>
        <Topbar />
        <View style={{ flexDirection: "row", flex: 1 }}>
          <Sidebar />
          <ScrollView contentContainerStyle={{ flexGrow: 1, maxHeight: 500 }}>
            <View style={{marginLeft: 230 }}>
              <View style={{flexDirection: 'row', marginTop: 30, marginLeft: 10 }}>
                <View style={{flexDirection: 'column' }}>
                <Text style={{fontSize: 45, textAlign: 'left', color: 'white', fontWeight: '600', width: 500, marginRight: 150, marginTop: 30 }}>EXPLORE, COMPLETE, AND EXCEL IN ESSENTIAL COURSES</Text>
                <Text style={{fontSize: 15, textAlign: 'left', color: 'white', marginTop: 10, marginLeft: 10}}>Unlock New Skills, One Step at a Time. Learn at Your Own Pace</Text>
                </View>
              <Video
                source={require('../assets/background.mp4')}
                useNativeControls
                resizeMode="cover"
                shouldPlay={true}
                isMuted={true} 
                style={{ width: 600, height: 300, borderRadius: 10 }}
              />
              </View>
              <View style={styles.container}>
                <BlurView intensity={50} style={styles.blurBackground}>

      {selectedCourse ? (
        <View>
          <TouchableOpacity onPress={() => setSelectedCourse(null)} style={styles.backButton}>
            <Text style={styles.backText}>← Back to Courses</Text>
          </TouchableOpacity>
          <FlatList
            data={meetingsData[selectedCourse]}
            renderItem={renderMeeting}
            keyExtractor={(item) => item.id}
          />
        </View>
      ) : (
      <View>
        <View style={{flexDirection: 'row'}}>
        <Picker
          style={styles.picker}
        >
        <Picker.Item label="All Categories" value="" />
          <Picker.Item label="SAP" value="SAP" />
          <Picker.Item label="Microsoft" value="Microsoft" />
          <Picker.Item label="Scrum" value="Scrum" />
          <Picker.Item label="Business Analysis" value="Business Analysis" />
        </Picker>
        <TextInput
          placeholder="Search"
          style={styles.input}
        />
        </View>
      <Text style={{fontSize: 18, textAlign: 'left', color: 'white', fontWeight: '600', marginLeft: 10}}>All Courses</Text>
        <TouchableOpacity style={{position: 'absolute', right: 30, top: 40}}>
        <Text style={{fontSize: 14, backgroundColor: '#F5F5F5', padding: 10, borderRadius: 20, width: 100, textAlign: 'center'}}>View All</Text>
        </TouchableOpacity>
      <FlatList
        data={courses}
        renderItem={({ item, index }) => (
          <View style={styles.leftCard }>
            <CourseCard course={item} onPress={() => setSelectedCourse(item.id)} />
          </View>
        )}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.courseList}
      />
      </View>
      )}
                </BlurView>
              </View>
            </View>
    </ScrollView>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderRadius: 10,
    backgroundColor: "rgba(125,125,125,0.3)",
    marginTop: 100,
    marginRight: 30
  },
  blurBackground: {
    flex: 1,
    padding: 20,
    borderRadius: 10,
  },
  courseList: {
    flexWrap: 'wrap',
    padding: 10,
    flexDirection: 'row',
  },
  row: {
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  card: {
    width: 300,
    marginRight: 10,
    backgroundColor: 'none',
    borderRadius: 5,
    overflow: 'hidden',
  },
  leftCard: {
    marginRight: 8, 
  },
  cardImage: {
    height: 120,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardImageStyle: {
    borderRadius: 12,
  },
  cardDetails: {
    padding: 8,
  },
  cardCategory: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 4,
  },
  cardTutor: {
    fontSize: 14,
    color: 'white',
    marginBottom: 4,
  },
  cardLevel: {
    fontSize: 12,
    color: 'white',
  },
  backButton: {
    marginBottom: 16,
  },
  backText: {
    fontSize: 18,
    color: 'white',
    fontWeight: 600
  },
  meetingCard: {
    padding: 16,
    marginBottom: 16,
    flexDirection: 'row',
  },
  meetingTitle: {
    fontSize: 20,
    fontWeight: 'bold',
     color: 'black',
  },
  meetingDescription: {
    fontSize: 16,
    color: 'black',
    marginTop: 4,
    marginBottom: 12,
  },
  largeVideo: {
    width: 100,
    height: 100,
    borderRadius: 8,
    marginRight: 20
  },
  picker: {
    width: 200,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    marginLeft: 10,
    marginBottom: 20
  },
  input: {
    width: 400,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingLeft: 8,
    borderRadius: 5,
    marginLeft: 20,
    backgroundColor: 'white',
    fontSize: 16,
  },
});
