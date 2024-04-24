import React, { useState } from 'react';
import { View, Image, Text, TouchableOpacity, ScrollView, FlatList, StyleSheet } from 'react-native';

import { FontAwesome5 } from '@expo/vector-icons';

import Sidebar from '../components/expertssidebar';
import Topbar from '../components/expertstopbar';
import TopExperts from '../components/TopExperts';


const Card = ({ name, title }) => {
  const [isHovered, setIsHovered] = useState(false);

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
            <TouchableOpacity
              style={{
                justifyContent: "center",
                alignItems: "center",
                marginTop: 10,
                backgroundColor: isHovered ? "#206C00" : "coral",
                borderRadius: 3
              }}
            >
              <Text style={{ fontSize: 12, fontWeight: "bold", color: "white", paddingHorizontal: 10, paddingVertical: 8 }}>Connect</Text>
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



function MyComponent() {
  return (
    <View style={{ height: '40%' }}>
      <Topbar />
      <View style={{ flexDirection: 'row', flex: 1 }}>
        <Sidebar />
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <View style={styles.container}>
            <Image
              source={require('../assets/Frame home.png')}
              style={styles.image}
            />
            <View style={styles.textContainer}>
              <Text style={{ fontSize: 28, color: '#0F0F0F', fontWeight: 'bold' }}>
How adept are you in your field?</Text>
              <Text style={{ marginLeft: 20, fontSize: 14, color: '#0F0F0F' }}> Get Paid assisting individuals become the ideal candidate!</Text>
            </View>
            <TouchableOpacity style={styles.oneononetouchableOpacity} onPress={() => console.log('Image clicked')}>
              <Text style={styles.HoverlayText}>One-on-one session with Jobseekers</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.careercoachtouchableOpacity} onPress={() => console.log('Image clicked')}>
              <Text style={styles.HoverlayText}>Create a Coaching hub</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.vettedtouchableOpacity} onPress={() => console.log('Image clicked')}>
              <Text style={styles.HoverlayText}>Career advice</Text>
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

      <View style={{ flex: 1, paddingHorizontal: 8, marginTop: 14, marginLeft: 340, marginRight: 20 }}>
      <Text style={{ fontWeight: 'bold', fontSize: 18, color: '#206C00', marginBottom: 7 }}>
        Sponsored Sessions
      </Text>
      {/* First sponsored session */}
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 7 }}>
        <View style={{ flex: 1, paddingRight: 3 }}>
          <Text style={{ fontSize: 14, color: 'black', fontWeight: '500' }}>
            Chang Xi Architectural Design Firm - Architectural Engineer
          </Text>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 3 }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 1 }}>
            <Text style={{ fontSize: 14, color: 'green', fontWeight: '500' }}>
              <Text style={{ color: 'black' }}>Minimum Score:</Text> 18
            </Text>
            
              <Image
                source={{ uri: 'https://cdn.builder.io/api/v1/image/assets/TEMP/e866d6f9c3208cdef33ed641ea97e7a4dbfdd87e209ddce1a999319b5b8ed400?' }}
                style={{ width: 15, height: 15, marginLeft: 30, marginRight: 5 }}
              />
              <Text style={{ fontSize: 14, color: 'black', fontWeight: '500' }}>United Kingdom</Text>
            </View>
          </View>
        </View>
        <Image
          source={{ uri: 'https://cdn.builder.io/api/v1/image/assets/TEMP/7d77ac7c3d6604817a3bcbdd7644f3a61ed64c90a78516b20070223b319300c3?' }}
          style={{ width: 30, height: 30}}
        />
      </View>
      <Text style={{ marginTop: 15, fontSize: 14, color: '#777' }}>
        We are seeking a highly skilled and motivated architecture engineer to
        join our dynamic team. The successful candidate will collaborate with
        architects, engineers, and clients to develop architectural designs that
        are both functional and aesthetically pleasing. This is an exciting
        opportunity to contribute...
      </Text>

      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 25 }}>
     <View style={{ flex: 1, paddingRight: 3 }}>
          <Text style={{ fontSize: 14, color: 'black', fontWeight: '500' }}>
            Chang Xi Architectural Design Firm - Architectural Engineer
          </Text>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 3 }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 1 }}>
            <Text style={{ fontSize: 14, color: 'green', fontWeight: '500' }}>
              <Text style={{ color: 'black' }}>Minimum Score:</Text> 18
            </Text>
            
              <Image
                source={{ uri: 'https://cdn.builder.io/api/v1/image/assets/TEMP/e866d6f9c3208cdef33ed641ea97e7a4dbfdd87e209ddce1a999319b5b8ed400?' }}
                style={{ width: 15, height: 15, marginLeft: 30, marginRight: 5 }}
              />
              <Text style={{ fontSize: 14, color: 'black', fontWeight: '500' }}>United Kingdom</Text>
            </View>
          </View>
        </View>
        <Image
          source={{ uri: 'https://cdn.builder.io/api/v1/image/assets/TEMP/7d77ac7c3d6604817a3bcbdd7644f3a61ed64c90a78516b20070223b319300c3?' }}
          style={{ width: 30, height: 30}}
        />
      </View>
      <Text style={{ marginTop: 15, fontSize: 14, color: '#777' }}>
        We are seeking a highly skilled and motivated architecture engineer to
        join our dynamic team. The successful candidate will collaborate with
        architects, engineers, and clients to develop architectural designs that
        are both functional and aesthetically pleasing. This is an exciting
        opportunity to contribute...
      </Text>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 25 }}>
     <View style={{ flex: 1, paddingRight: 3 }}>
          <Text style={{ fontSize: 14, color: 'black', fontWeight: '500' }}>
            Chang Xi Architectural Design Firm - Architectural Engineer
          </Text>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 3 }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 1 }}>
            <Text style={{ fontSize: 14, color: 'green', fontWeight: '500' }}>
              <Text style={{ color: 'black' }}>Minimum Score:</Text> 18
            </Text>
            
              <Image
                source={{ uri: 'https://cdn.builder.io/api/v1/image/assets/TEMP/e866d6f9c3208cdef33ed641ea97e7a4dbfdd87e209ddce1a999319b5b8ed400?' }}
                style={{ width: 15, height: 15, marginLeft: 30, marginRight: 5 }}
              />
              <Text style={{ fontSize: 14, color: 'black', fontWeight: '500' }}>United Kingdom</Text>
            </View>
          </View>
        </View>
        <Image
          source={{ uri: 'https://cdn.builder.io/api/v1/image/assets/TEMP/7d77ac7c3d6604817a3bcbdd7644f3a61ed64c90a78516b20070223b319300c3?' }}
          style={{ width: 30, height: 30}}
        />
      </View>
      <Text style={{ marginTop: 15, fontSize: 14, color: '#777' }}>
        We are seeking a highly skilled and motivated architecture engineer to
        join our dynamic team. The successful candidate will collaborate with
        architects, engineers, and clients to develop architectural designs that
        are both functional and aesthetically pleasing. This is an exciting
        opportunity to contribute...
      </Text>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 25 }}>
     <View style={{ flex: 1, paddingRight: 3 }}>
          <Text style={{ fontSize: 14, color: 'black', fontWeight: '500' }}>
            Chang Xi Architectural Design Firm - Architectural Engineer
          </Text>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 3 }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 1 }}>
            <Text style={{ fontSize: 14, color: 'green', fontWeight: '500' }}>
              <Text style={{ color: 'black' }}>Minimum Score:</Text> 18
            </Text>
            
              <Image
                source={{ uri: 'https://cdn.builder.io/api/v1/image/assets/TEMP/e866d6f9c3208cdef33ed641ea97e7a4dbfdd87e209ddce1a999319b5b8ed400?' }}
                style={{ width: 15, height: 15, marginLeft: 30, marginRight: 5 }}
              />
              <Text style={{ fontSize: 14, color: 'black', fontWeight: '500' }}>United Kingdom</Text>
            </View>
          </View>
        </View>
        <Image
          source={{ uri: 'https://cdn.builder.io/api/v1/image/assets/TEMP/7d77ac7c3d6604817a3bcbdd7644f3a61ed64c90a78516b20070223b319300c3?' }}
          style={{ width: 30, height: 30}}
        />
      </View>
      <Text style={{ marginTop: 15, fontSize: 14, color: '#777' }}>
        We are seeking a highly skilled and motivated architecture engineer to
        join our dynamic team. The successful candidate will collaborate with
        architects, engineers, and clients to develop architectural designs that
        are both functional and aesthetically pleasing. This is an exciting
        opportunity to contribute...
      </Text>
      {/* View all button */}
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
              marginBottom: 20,
              marginLeft: 340,
              marginRight: 110,
              position: "relative",
              height: 170
            }}
          >
            <View style={{ flex: 1 }}>
              <Text style={{ fontSize: 26, fontWeight: "bold", color: "white", marginLeft: 20, marginTop: 10 }}>
                Get Paid to Vet Jobseekers
              </Text>
              <Text style={{ fontSize: 14, color: "white", marginLeft: 20, marginTop: 5, textDecoration: 'underline' }}>
                Maximize earnings evaluating Jobseekers in your niche.
              </Text>

        {/* Pointers with icons */}
        <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 20, marginTop: 50 }}>
  <FontAwesome5 name="book" size={30} color="white" style={{ marginRight: 10 }} />
  <Text style={{ fontSize: 12, color: "white" }}>Research & Prepare</Text>

  <FontAwesome5 name="balance-scale" size={30} color="white" style={{ marginLeft: 20, marginRight: 10 }} />
  <Text style={{ fontSize: 12, color: "white" }}>Be Objective</Text>

  <FontAwesome5 name="headset" size={30} color="white" style={{ marginLeft: 20, marginRight: 10 }} />
  <Text style={{ fontSize: 12, color: "white" }}>Listen Actively</Text>

  <FontAwesome5 name="handshake" size={30} color="white" style={{ marginLeft: 20, marginRight: 10 }} />
  <Text style={{ fontSize: 12, color: "white" }}>Maintain Ethical Boundaries</Text>
</View>

      </View>
      <View style={{ position: "absolute", top: -80, right: 20 }}>
        <Image
          source={require('../assets/success.png')}
          style={{ width: 250, height: 250 }}
        />
      </View>
    </View>
    
          < TopExperts/>
          
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    marginLeft: 200,
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
    marginLeft:-40
  },
  textContainer: {
    position: 'absolute',
    top: '50%',
    left: '40%',
    transform: [{ translateX: -200 }, { translateY: -160 }],
    textAlign: 'center',
  },
  oneononetouchableOpacity: {
    position: 'absolute',
    top: '30%',
    left: '50%',
    borderColor: '#0F0F0F',
    borderWidth: 1,
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderRadius: 3,
    transform: [{ translateX: -350 }],
  },
  careercoachtouchableOpacity: {
    position: 'absolute',
    top: '30%',
    left: '50%',
    borderColor: '#0F0F0F',
    borderWidth: 1,
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderRadius: 3,
    transform: [{ translateX: -140 }],
  },
  vettedtouchableOpacity: {
    position: 'absolute',
    top: '30%',
    left: '50%',
    borderColor: '#0F0F0F',
    borderWidth: 1,
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderRadius: 3,
    transform: [{ translateX: 10 }],
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
  BoverlayText: {
    color: 'black',
    fontSize: 10,
    textAlign: 'center',
    marginLeft: -260,
    textDecoration: 'underline'
  },
  HoverlayText: {
    color: '#0F0F0F',
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
