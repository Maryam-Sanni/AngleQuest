import React, { useState } from 'react';
import { View, Image, Text, TouchableOpacity, ScrollView, FlatList, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { FontAwesome5 } from '@expo/vector-icons';

import Sidebar from '../components/sidebar';
import Topbar from '../components/topbar';

const shadesOfGreen = ['#E6FFF4', '#EBEBEB', '#FFF9D9', '#DCFFD7'];

const data = [
  { title: 'Architectural Engineer', companies: 11, openings: 15 },
  { title: 'Civil Engineer', companies: 11, openings: 15 },
  { title: 'Construction Planner', companies: 11, openings: 15 },
  { title: 'Quantity Surveyor', companies: 11, openings: 15 }
];

const Card = ({ name, title }) => {
  const [isHovered, setIsHovered] = useState(false);
  const navigation = useNavigation(); // Get navigation object
  
    const handleBookSessionPress = () => {
      navigation.navigate('BookaSession'); // Navigate to 'BookSession' page
    };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  
  return (
    <View
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{ marginRight: 10, flex: 1, width: "20%", marginLeft: 10 }}
    >
      <View style={{ flex: 1, shadowColor: "#000", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.25, shadowRadius: 3.84, elevation: 5 , }}>
        <View style={{ overflow: "hidden", flex: 1 }}>
          <Image
            source={require("../assets/card.png")}
            style={{ flex: 1, resizeMode: "cover", position: "absolute", width: "100%" }}
          />
          <View style={{ flex: 1, justifyContent: "center", paddingHorizontal: 14, paddingVertical: 10  }}>
            <Image
              source={require("../assets/User.png")}
              style={{ alignSelf: "center", width: 100, height: 100, borderRadius: 50 }}
            />
            <View style={{ paddingHorizontal: 14, marginTop: 10, alignItems: 'center' }}>
              <Text style={{ fontSize: 16, fontWeight: "bold", color: "black" }}>{name}</Text>
              <Text style={{ fontSize: 12, color: "#206c00" }}>{title}</Text>
            </View>
            <TouchableOpacity onPress={handleBookSessionPress} 
              style={{
                justifyContent: "center",
                alignItems: "center",
                marginTop: 10,
                backgroundColor: isHovered ? "#206C00" : "coral",
                borderRadius: 3
              }}
            >
              <Text style={{ fontSize: 12, fontWeight: "bold", color: "white", paddingHorizontal: 10, paddingVertical: 8 }}>Book a Session</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

const cardData = [
  {
    backgroundImage: "../assets/card.png",
    profileImage: "../assets/User.png",
    name: "Mr John Smith",
    title: "Architectural Engineer",
  },
  {
    backgroundImage: "../assets/card.png",
    profileImage: "../assets/User.png",
    name: "Mr John Smith",
    title: "Architectural Engineer",
  },
  {
    backgroundImage: "../assets/card.png",
    profileImage: "../assets/User.png",
    name: "Mr John Smith",
    title: "Architectural Engineer",
  },
  {
    backgroundImage: "../assets/card.png",
    profileImage: "../assets/User.png",
    name: "Mr John Smith",
    title: "Architectural Engineer",
  },
];

const Leaderboard = () => {
  const profileData = [
    { id: 1, name: "Sam Walsh", role: "Solutions Architect", score: 30, isLeader: true, comment: "He was exceptional!" },
    { id: 2, name: "Jane Winsky", role: "Civil Engineer", score: 29, isLeader: true, comment: "Well done!" },
    { id: 3, name: "Tope Alice", role: "Backend Developer", score: 27, isLeader: false, comment: "Great Job!" },
    { id: 4, name: "David Black", role: "Software Engineer", score: 27, isLeader: false, comment: "Good attitude to work" },
    { id: 5, name: "Gerald Wilson", role: "DevOps", score: 25, isLeader: false, comment: "Highly Recommended" }
  ];

  return (
    <View style={styles.Profilecontainer}>
      <Text style={styles.heading}>Top Pre-Vetted Candidates</Text>
      <FlatList
        data={profileData}
        renderItem={({ item }) => <ProfileRow data={item} />}
        keyExtractor={item => item.id.toString()}
        style={styles.table}
      />
    </View>
  );
};

const ProfileRow = ({ data }) => {
  const [clicked, setClicked] = useState(false);

  const handlePress = () => {
    setClicked(!clicked);
  };

  return (
    <TouchableOpacity onPress={handlePress}>
      <View style={styles.profileRow}>
        <View style={styles.profileColumn}>
          <Text style={[styles.name, { color: clicked ? 'coral' : '#0F9D58' }]}>{data.name}</Text>
          <Text style={styles.role}>{data.role}</Text>
        </View>
        <View style={styles.profileColumn}>
          <Text style={styles.score}>{data.score}</Text>
        </View>
        <View style={styles.profileColumn}>
          <Image source={data.isLeader ? require('../assets/leader.png') : require('../assets/leader2.png')} style={styles.leaderImage} />
        </View>
        <View style={styles.profileColumn}>
          <Text style={styles.comment}>{data.comment}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

function MyComponent() {
  const navigation = useNavigation(); // Get navigation object

  const handleTellAFriendPress = () => {
    navigation.navigate('Refer'); // Navigate to 'TellAFriend' page
  };
  
  const handleGetStartedPress = () => {
    navigation.navigate('GetStarted'); // Navigate to 'GetStarted' page
  };

  const handlecareercoachPress = () => {
    navigation.navigate('Coaching Hubs'); // Navigate to 'CoachingHubs' page
  };

  return (
    <View style={{ height: '40%' }}>
      <Topbar />
      <View style={{ flexDirection: 'row', flex: 1 }}>
        <Sidebar />
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <View style={styles.container}>
            <Image
              source={require('../assets/home.png')}
              style={styles.image}
            />
            <View style={styles.textContainer}>
              <Text style={{ fontSize: 28, color: '#206C00', fontWeight: 'bold' }}>Everyone thinks they are the ideal candidate.</Text>
              <Text style={{ marginLeft: 110, fontSize: 14, color: '#206C00' }}>Lets make you the authentic one from the bunch out there!</Text>
            </View>
            <TouchableOpacity style={styles.oneononetouchableOpacity} onPress={handleGetStartedPress}>
              <Text style={styles.HoverlayText}>Get Started</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.careercoachtouchableOpacity} onPress={handlecareercoachPress}>
              <Text style={styles.HoverlayText}>Join a career coach group</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.vettedtouchableOpacity} onPress={handleTellAFriendPress}>
              <Text style={styles.HoverlayText}>Tell a Friend</Text>
            </TouchableOpacity>
           
</View>
          <Text style={{ fontWeight: 'bold', fontSize: 18, color: '#206C00', marginLeft: 340, marginTop: -160 }}>Featured Experts</Text>
          <View style={{ flexDirection: 'row', marginTop: 20, marginLeft: 320, marginRight: 100, alignItems: 'center' }}>
            <Image source={{ uri: "https://cdn.builder.io/api/v1/image/assets/TEMP/65477bf068a20246e3a4a487aaa4f217113e3e240ed082361e1a4dac2eb2f8c7?apiKey=7b9918e68d9b487793009b3aea5b1a32&" }} style={{ width: 0, height: 0 }} />
            <View style={{ flex: 1 }}>
              <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                {cardData.map((card, index) => (
                  <Card key={index} {...card} />
                ))}
              </View>
              <TouchableOpacity style={styles.MoreButton}>
              <Text style={{ color: '#206C00' }}> View More </Text>
            </TouchableOpacity>
            </View>
            <Image source={{ uri: "https://cdn.builder.io/api/v1/image/assets/TEMP/e5ace6ebcb4b409b16c6e25febe82298cdc6f90ccd2549e55ac52e3d62d059c6?apiKey=7b9918e68d9b487793009b3aea5b1a32&" }} style={{ width: 0, height: 0 }} />
          </View>

           <View style={styles.cardContainer}>
  <Text style={{ fontWeight: 'bold', fontSize: 18, color: '#206C00', marginBottom: -5 }}>Talent Hunts</Text>
  <View style={{ marginTop: 20 }}>
    <View style={styles.categoryContainer}>
      {data.map((item, index) => (
        <View key={index} style={[styles.categoryCard, {backgroundColor: shadesOfGreen[index % shadesOfGreen.length]}]}>
          <Text style={{ fontSize: 18, fontWeight: '600', color: 'black', marginTop: 5 }}>{item.title}</Text>
          <Text style={{ marginTop: 8, fontSize: 12 }}>{item.companies} Companies</Text>
          <Text style={{ marginTop: 3, fontSize: 12 }}>{item.openings} Openings</Text>
          <TouchableOpacity style={styles.categoryButton}>
            <Text style={styles.categoryButtonText}>Interview Now</Text>
          </TouchableOpacity>
        </View>
      ))}
    </View>
  </View>
  <TouchableOpacity style={styles.categoryViewAllButton}>
    <Text style={{ color: '#206C00' }}> View all </Text>
  </TouchableOpacity>
</View>

          <View
            style={{
              flexDirection: "row",
              backgroundColor: "#79A36B",
              paddingHorizontal: 8,
              marginTop: 60,
              marginLeft: 340,
              marginRight: 110,
              position: "relative",
              height: 170
            }}
          >
            <View style={{ flex: 1 }}>
              <Text style={{ fontSize: 26, fontWeight: "bold", color: "white", marginLeft: 20, marginTop: 10 }}>
                Get Pre-Vetted
              </Text>
              <Text style={{ fontSize: 14, color: "white", marginLeft: 20, marginTop: 5, textDecoration: 'underline' }}>
                Book experts in your field to get interviewed and scored
              </Text>

        {/* Pointers with icons */}
        <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 20, marginTop: 50 }}>
  <FontAwesome5 name="book" size={30} color="white" style={{ marginRight: 10 }} />
  <Text style={{ fontSize: 12, color: "white" }}>Research & Prepare</Text>

  <FontAwesome5 name="handshake" size={30} color="white" style={{ marginLeft: 20, marginRight: 10 }} />
  <Text style={{ fontSize: 12, color: "white" }}>Be Professional</Text>

  <FontAwesome5 name="gem" size={30} color="white" style={{ marginLeft: 20, marginRight: 10 }} />
  <Text style={{ fontSize: 12, color: "white" }}>Showcase your Value</Text>

  <FontAwesome5 name="thumbs-up" size={30} color="white" style={{ marginLeft: 20, marginRight: 10 }} />
  <Text style={{ fontSize: 12, color: "white" }}>Stay Confident</Text>
</View>

      </View>
      <View style={{ position: "absolute", top: -80, right: 50 }}>
        <Image
          source={require('../assets/success.png')}
          style={{ width: 250, height: 250 }}
        />
      </View>
    </View>
    
          {/* Leaderboard Component */}
          <Leaderboard />
          
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    marginLeft: 200,
    backgroundColor: 'white',
    resizeMode: 'cover',
    marginRight: 0,
    marginTop: 0,
    width: '100%',
    height: 400,
    aspectRatio: 3.7,
  },
  image: {
    width: '100%',
    height: '50%',
  },
  textContainer: {
    position: 'absolute',
    top: '50%',
    left: '40%',
    transform: [{ translateX: -240 }, { translateY: -160 }],
    textAlign: 'center',
  },
  oneononetouchableOpacity: {
    position: 'absolute',
    top: '30%',
    left: '50%',
    borderColor: 'coral',
    borderWidth: 1,
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderRadius: 3,
    transform: [{ translateX: -260 }],
  },
  careercoachtouchableOpacity: {
    position: 'absolute',
    top: '30%',
    left: '50%',
    borderColor: 'coral',
    borderWidth: 1,
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderRadius: 3,
    transform: [{ translateX: -150 }],
  },
  vettedtouchableOpacity: {
    position: 'absolute',
    top: '30%',
    left: '50%',
    borderColor: 'coral',
    borderWidth: 1,
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderRadius: 3,
    transform: [{ translateX: 20 }],
  },
  GetstartedtouchableOpacity: {
    position: 'absolute',
    top: '28%',
    left: '50%',
    paddingHorizontal: 30,
    paddingVertical: 10,
    borderRadius: 5,
    marginLeft: 70,
    transform: [{ translateY: 50 }],
  },
  TellaFriendtouchableOpacity: {
    position: 'absolute',
    top: '28%',
    left: '50%',
    paddingHorizontal: 30,
    paddingVertical: 10,
    borderRadius: 5,
    marginRight: 50,
    transform: [{ translateY: 50 }],
  },
  BoverlayText: {
    color: 'coral',
    fontSize: 10,
    textAlign: 'center',
    marginLeft: -260,
    textDecoration: 'underline'
  },
  overlayText: {
    color: 'coral',
    fontSize: 10,
    textAlign: 'center',
    marginLeft: -260,
    textDecoration: 'underline'
  },
  HoverlayText: {
    color: 'coral',
    fontSize: 10,
    textAlign: 'center',
  },
  cardContainer: {
    flex: 1,
    paddingHorizontal: 8,
    marginTop: 20,
    maxWidth: '100%',
    paddingLeft: 5,
    paddingTop: 10,
    marginLeft: 340,
    marginRight: 110
  },
  categoryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  categoryCard: {
    width: '24%',
    justifyContent: 'center',
    height: 200,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 2.84,
    elevation: 5,
    justifyContent: 'center',
    paddingVertical: 2,
    paddingHorizontal: 8,
    backgroundColor: '#F7FFF4',
    borderRadius: 5
  },
  categoryButton: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 8,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 50,
    borderWidth: 1,
    borderColor: 'grey',
    borderRadius: 3
  },
  categoryButtonText: {
    fontSize: 12,
    fontWeight: '600',
    color: 'black',
    textAlign: 'center'
  },
  categoryViewAllButton: {
    justifyContent: 'center',
    alignSelf: 'center',
    paddingVertical: 4,
    marginTop: 30,
    fontSize: 10,
    color: 'coral',
    textAlign: 'center',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#206C00',
    paddingHorizontal: 15
  },
  MoreButton: {
    justifyContent: 'center',
    alignSelf: 'center',
    paddingVertical: 5,
    marginTop: 30,
    marginBottom: 10,
    fontSize: 10,
    textAlign: 'center',
    backgroundColor: '#EEFFF8',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#EEFFF8',
    paddingHorizontal: 25
  },
  Profilecontainer: {
    position: 'relative',
    marginLeft: 340,
    marginTop: 50,
    marginBottom: 50,
    marginRight: 110,
  },
  heading: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0F9D58',
    textAlign: 'left',
    marginTop: -5,
    marginBottom: 10
  },
  profileRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    paddingBottom: 8,
  },
  profileColumn: {
    flex: 1,
  },
  name: {
    color: '#0F9D58',
    fontWeight: 'bold',
  },
  role: {
    color: '#999',
  },
  score: {
    textAlign: 'center',
    fontWeight: 'bold',
    color: 'coral'
  },
  comment: {
    textAlign: 'center',
    color: '#0F9D58',
  },
  leaderImage: {
    width: 30,
    height: 30,
    borderRadius: 20,
    resizeMode: 'cover',
  },
  table: {
    flex: 1,
  },
});

export default MyComponent;
