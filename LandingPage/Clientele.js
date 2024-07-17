import React, { useState, useRef, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Modal, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Top from './HomeTop';
import { Video } from 'expo-av';
import Footer from './Footer';
import { FontAwesome} from '@expo/vector-icons';
import { successStories } from './SuccessStories';

const MyComponent = () => {
  const navigation = useNavigation(); // Navigation object
  const colors = ['#FF4500', '#FF6347', '#FF7F50', '#FF8C00', '#FFA500', '#FFB347', '#FFCC80'];
  const videoRef = useRef(null);

  const renderGradientText = (text) => {
    const length = text.length;
    return text.split('').map((char, index) => {
      const colorIndex = Math.floor((index / length) * (colors.length - 1));
      return (
        <Text key={index} style={{ color: colors[colorIndex], fontSize: 50, fontWeight: 'bold' }}>
          {char}
        </Text>
      );
    });
  };

  const SuccessStory = ({ story }) => (
    <View style={styles.successStory}>
      <Text style={styles.customerName}>{story.customerName}</Text>
      <Text style={styles.industry}>{story.industry}</Text>
      <Text style={styles.challenges}>{story.challenges}</Text>
      <Text style={styles.solution}>{story.solution}</Text>
      <Text style={styles.benefits}>{story.benefits}</Text>
      <Text style={styles.testimonial}>{`"${story.testimonial}"`}</Text>
    </View>
  );
  
  const SuccessStoriesSection = () => (
    <View style={styles.successStoriesContainer}>
      <Text style={styles.sectionTitle}>Success Stories</Text>
      {successStories.map(story => (
        <SuccessStory key={story.id} story={story} />
      ))}
    </View>
  );
  

  return (
    <View style={{ flex: 1 }}>
      <Top />
      <ScrollView contentContainerStyle={{ flexGrow: 1, maxHeight: 500 }}>
      <View style={styles.container}>
      <Text style={{ fontSize: 50, textAlign: 'center', fontWeight: 'bold', marginTop: 100 }}>
            Trusted by over {renderGradientText('100 Users')} globally
          </Text>
        <Text style={{ fontSize: 18, textAlign: 'center', marginTop: 10, marginBottom: 80 }}>Leading global enterprises trust AngleQuest to foster employee growth</Text>

<View style={{flexDirection: 'row', flexWrap: 'wrap', width: "100%"}}>
  <View style={{flex: 1}}>
        <View style= {styles.boxContainer}>
        <View style={[styles.box, { backgroundColor: '#E1F5FE' }]}>
        <Image
                  source={require('../assets/asml.png')}
                  style={styles.boximage}
                />
        </View>
        <View style={[styles.box, { backgroundColor: '#bbdefb' }]}>
        <Image
                  source={require('../assets/tmc.png')}
                  style={styles.boximage}
                />
        </View>
        <View style={[styles.box, { backgroundColor: '#FAE0E6' }]}>
        <Image
                  source={require('../assets/rvl.png')}
                  style={styles.boximage}
                />
        </View>
        <View style={[styles.box, { backgroundColor: '#FFF9C4' }]}>
        <Image
                  source={require('../assets/awl.png')}
                  style={styles.boximage}
                />
        </View>
        <View style={[styles.box, { backgroundColor: '#F7F7E3' }]}>
        <Image
                  source={require('../assets/mtn.png')}
                  style={styles.boximage}
                />
        </View>
        <View style={[styles.box, { backgroundColor: '#DFFBDA' }]}>
        <Image
                  source={require('../assets/tesla.jpeg')}
                  style={styles.boximage}
                />
        </View>
        </View>
        <View style= {styles.boxContainer}>
        <View style={[styles.box, { backgroundColor: '#DFFBDA' }]}>
        <Image
                  source={require('../assets/dangote.jpeg')}
                  style={styles.boximage}
                />
        </View>
        <View style={[styles.box, { backgroundColor: '#FFFF' }]}>
        <Image
                  source={require('../assets/awl.png')}
                  style={styles.boximage}
                />
        </View>
        <View style={[styles.box, { backgroundColor: '#F0E6F6' }]}>
          <Text style={styles.boxText}>AngleQuest</Text>
        </View>
        <View style={[styles.box, { backgroundColor: '#E1F5FE' }]}>
          <Text style={styles.boxText}>AngleQuest</Text>
        </View>
        <View style={[styles.box, { backgroundColor: '#FAE0E6' }]}>
          <Text style={styles.boxText}>AngleQuest</Text>
          </View>
          <View style={[styles.box, { backgroundColor: '#FFF9C4' }]}>
          <Text style={styles.boxText}>AngleQuest</Text>
        </View>
      </View>
      <View style= {styles.boxContainer}>
        <View style={[styles.box, { backgroundColor: '#FAE0E6' }]}>
          <Text style={styles.boxText}>AngleQuest</Text>
        </View>
        <View style={[styles.box, { backgroundColor: '#FFF9C4' }]}>
          <Text style={styles.boxText}>AngleQuest</Text>
        </View>
        <View style={[styles.box, { backgroundColor: '#DFFBDA' }]}>
          <Text style={styles.boxText}>AngleQuest</Text>
        </View>
        <View style={[styles.box, { backgroundColor: '#F7F7E3' }]}>
          <Text style={styles.boxText}>AngleQuest</Text>
        </View>
        <View style={[styles.box, { backgroundColor: '#F0E6F6' }]}>
          <Text style={styles.boxText}>AngleQuest</Text>
          </View>
          <View style={[styles.box, { backgroundColor: '#E1F5FE' }]}>
          <Text style={styles.boxText}>AngleQuest</Text>
        </View>
      </View>
     </View>
      <View style={styles.vidbox}>
      <Video
                ref={videoRef}
                source={require('../assets/Marketing.mp4')}
                style={styles.video}
                useNativeControls
                onLoad={() => videoRef.current.playAsync()}
              />
</View>
      </View>
      <SuccessStoriesSection />
      </View>
      <Footer /> 
          
          <View style={styles.footer}>
          <View style={styles.sectionRow}>
          <View style={styles.section}>
      <Text style={styles.followUsText}>FOLLOW US ON</Text>
      <View style={styles.iconsRow}>
        <FontAwesome name="twitter" size={24} color="black" style={styles.icon} />
        <FontAwesome name="instagram" size={24} color="black" style={styles.icon} />
        <FontAwesome name="linkedin" size={24} color="black" style={styles.icon} />
      </View>
      </View>
      
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>PRODUCTS</Text>
          <Text style={styles.sectionItem}>Individual</Text>
          <Text style={styles.sectionItem}>Experts</Text>
          <Text style={styles.sectionItem}>Businesses</Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>RESOURCES</Text>
          <Text style={styles.sectionItem}>Documentation</Text>
          <Text style={styles.sectionItem}>FAQ</Text>
          <Text style={styles.sectionItem}>Terms & Privacy Policy</Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>WHY ANGLEQUEST</Text>
          <Text style={styles.sectionItem}>Pricing</Text>
        </View>
        <View style={styles.lastsection}>
          <Text style={styles.sectionTitle}>CONTACT US</Text>
          <Text style={styles.sectionItem}>anglequest@gmail.com</Text>
        </View>
      </View>
    </View>

      
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  header: {
    fontSize: 16,
    marginTop: 70,
    marginBottom: 5,
    fontWeight: 'bold',
    color: 'red',
    textAlign: 'center',
  },
  boxContainer: {
    flexDirection: 'row',
  },
  box: {
    width: "12.5%",
    height: 160,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1
  },
  vidbox: {
    width: "25%",
    height: 480,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'lightgrey'
  },
  video: {
    width: "100%",
    height: 480,
    alignSelf: 'center'
  },
  boxText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
  boximage: {
    width: 50,
    height: 50,
  },
  footer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 40,
    backgroundColor: 'white',
    alignSelf: 'stretch'
  },
  followUsText: {
    fontWeight: '600',
    fontSize: 18,
    marginBottom: 10,
    textAlign: 'center',
  },
  iconsRow: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  icon: {
    marginHorizontal: 10,
  },
  sectionRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  section: {
    flexDirection: 'column',
    marginRight: 100,
  },
  sectionTitle: {
    fontWeight: '600',
    fontSize: 18,

    marginBottom: 5,
  },
  lastsection: {
    flexDirection: 'column',
  },
  sectionItem: {

  },
  successStoriesContainer: {
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    color: '#333',
  },
  successStory: {
    marginBottom: 20,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    backgroundColor: '#f9f9f9',
  },
  customerName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  industry: {
    fontSize: 16,
    fontStyle: 'italic',
    marginBottom: 5,
  },
  challenges: {
    marginBottom: 5,
  },
  solution: {
    marginBottom: 5,
  },
  benefits: {
    marginBottom: 5,
  },
  testimonial: {
    fontStyle: 'italic',
    marginTop: 5,
  },
});

export default MyComponent;