import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Modal, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Top from './HomeTop';
import OpenModal from './Collectinfo';
import BottomTab from './BottomNav';
import { Video } from 'expo-av';
import { Feather } from '@expo/vector-icons';
import Footer from './Footer';
import { FontAwesome, FontAwesome5 } from '@expo/vector-icons';
import Swiper from 'react-native-swiper';


const MyComponent = () => {
  const navigation = useNavigation(); // Navigation object
  const [ModalVisible, setModalVisible] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isBExpanded, setIsBExpanded] = useState(false);
  const [isIExpanded, setIsIExpanded] = useState(true);
  
    const toggleExpanded = () => {
      setIsExpanded(!isExpanded);
    };

    const toggleBExpanded = () => {
      setIsBExpanded(!isBExpanded);
    };

    const toggleIExpanded = () => {
      setIsIExpanded(!isIExpanded);
    };

  const handleOpenPress = () => {
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    onClose();
  };


  const [currentText, setCurrentText] = useState('Power Platform & Dynamics CE');
  const [currentColor, setCurrentColor] = useState('#206C00');

  useEffect(() => {
    const texts = ['Power Platform & Dynamics CE', 'Microsoft Azure', 'SAP FI', 'Dynamics F&O', 'Salesforce', 'Business Central', 'Full-Stack Development'];
    const colors = ['#206C00', '#C87081', '#121F64', '#F83838', '#FFBF40', '#4489DA', 'coral'];
    let index = 0;

    const interval = setInterval(() => {
      index = (index + 1) % texts.length;
      setCurrentText(texts[index]);
      setCurrentColor(colors[index]);
    }, 4000); // Change text and color every 2 seconds

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <Top />
      <ScrollView contentContainerStyle={{ flexGrow: 1, maxHeight: 500 }}>
      <View style={styles.container}>
      <Text style={{ fontSize: 32, textAlign: 'center', fontWeight: 400, marginTop: 30, marginBottom: 5 }}>Super-charge your team members</Text>
        <Text style={{ fontSize: 32, color: currentColor, textAlign: 'center', fontWeight: 400 }}>
          {currentText}
          <Text style={{ fontSize: 32, color: 'black', textAlign: 'center', fontWeight: 400 }}> career growth and efficiency</Text>
        </Text>
        <Text style={{ fontSize: 16, color: 'grey', marginTop: 30, padding: 10, textAlign: 'center' }}>
          A unique toolkit for team impact management.
        </Text>
        <Text style={{ fontSize: 16, color: 'grey', padding: 10, textAlign: 'center', marginTop: -15 }}>
        Designed for individuals & businesses of all sizes who wants to optimize their efficiency.
        </Text>
        <TouchableOpacity onPress={handleOpenPress} style={styles.buttonplus}>
          <Text style={styles.buttonTextplus}>Sign up for early access</Text>
        </TouchableOpacity>
        <Image
          source={require('../assets/Puzzle2.png')}
          style={styles.image}
        />
        <View style={{backgroundColor: 'white', padding: 10, alignSelf: 'stretch', justifyContent: 'center'}} >
                <Image
                  source={require('../assets/landingco1.gif')}
                  style={styles.landingimage}
                />
                 </View>
                  <View style={{}} >
                <View style={styles.whiteBox} >
                <Text style={{ fontSize: 25, textAlign: 'center', fontWeight: 600, marginTop: 20 }}>Recommended for</Text>
                <View style={{flexDirection: 'row'}} >
                <Image
                  source={require('../assets/39.png')}
                  style={styles.recommended}
                />
                <View style={{flexDirection: 'column'}} >
    <Text style={{ fontSize: 20, fontWeight: 'bold', marginTop: 50, marginLeft: 10 }}>In-house Teams</Text>
    <Text style={{ fontSize: 14, color: "grey", marginTop: 10, textAlign: 'center', width: 280, marginLeft: -5 }}>Improve the efficiency of your team and orchestrate their next career milestone.</Text>
    <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 10}} >
    <TouchableOpacity>
          <Text style={{ color: '#206C00', textAlign: 'center', fontSize: 15, fontWeight: '600', marginLeft: 10}}>TRY IT NOW</Text>
          </TouchableOpacity>
          <Image
                  source={require('../assets/icons8-arrow-right-50.png')}
                  style={styles.tryarrow}
                />
                </View>
    </View>
    </View>
    
                <View style={{flexDirection: 'row'}} >
                <Image
                  source={require('../assets/40.png')}
                  style={styles.recommended}
                />
                <View style={{flexDirection: 'column'}} >
    <Text style={{ fontSize: 20, fontWeight: 'bold', marginTop: 50, marginLeft: 10 }}>Consulting Firms</Text>
    <Text style={{ fontSize: 14, color: "grey", marginTop: 10, marginLeft: 10, width: 280}}>A tool that keeps your consultant at their best & enable them to transit to any role easily.</Text>
    <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 10}} >
    <TouchableOpacity>
          <Text style={{ color: '#206C00', textAlign: 'center', fontSize: 15, fontWeight: '600', marginLeft: 10}}>TRY IT NOW</Text>
          </TouchableOpacity>
          <Image
                  source={require('../assets/icons8-arrow-right-50.png')}
                  style={styles.tryarrow}
                />
                </View>
    </View>
    </View>

    <View style={{flexDirection: 'row'}} >
                <Image
                  source={require('../assets/45.png')}
                  style={styles.recommended}
                />
                <View style={{flexDirection: 'column'}} >
    <Text style={{ fontSize: 20, fontWeight: 'bold', marginTop: 50, marginLeft: 10 }}>Recruiting Firms</Text>
    <Text style={{ fontSize: 14, color: "grey", marginTop: 10, marginLeft: 10, width: 280}}>A tool that helps you streamline candidates and get the best of your workforce.</Text>
    <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 10}} >
    <TouchableOpacity>
          <Text style={{ color: '#206C00', textAlign: 'center', fontSize: 15, fontWeight: '600', marginLeft: 10}}>TRY IT NOW</Text>
          </TouchableOpacity>
          <Image
                  source={require('../assets/icons8-arrow-right-50.png')}
                  style={styles.tryarrow}
                />
                </View>
    </View>
    </View>

    <View style={{flexDirection: 'row'}} >
                <Image
                  source={require('../assets/41.png')}
                  style={styles.recommended}
                />
                <View style={{flexDirection: 'column'}} >
    <Text style={{ fontSize: 20, fontWeight: 'bold', marginTop: 50, marginLeft: 10}}>Individual Professionals</Text>
    <Text style={{ fontSize: 14, color: "grey", marginTop: 10, marginLeft: 10, width: 280}}>Use AngleQuest to manage your professional growth from one level to another.</Text>
    <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 10}} >
    <TouchableOpacity>
          <Text style={{ color: '#206C00', textAlign: 'center', fontSize: 15, fontWeight: '600', marginLeft: 10}}>TRY IT NOW</Text>
          </TouchableOpacity>
          <Image
                  source={require('../assets/icons8-arrow-right-50.png')}
                  style={styles.tryarrow}
                />
                </View>
    </View>
    </View>

      </View>
      
      
      </View>
      <View style={{backgroundColor: '#ECEEF8', alignSelf: 'stretch', marginTop: 100}} >
      <View style={{flexDirection: 'row', marginLeft: 20}} >
      <Swiper style={styles.wrapper} showsPagination={true} loop={false} vertical={true} dotStyle={styles.dot} activeDotStyle={styles.activeDot}
      >
      <View style={styles.greyBox} >
      <View style={{flexDirection: 'row', marginBottom: 40, marginTop: -20}} >
      <Image
        source={{
          uri:
            "https://cdn.builder.io/api/v1/image/assets/TEMP/1f2d38e99b0016f2bd167d2cfd38ff0d43c9f94a93c84b4e04a02d32658fb401?apiKey=7b9918e68d9b487793009b3aea5b1a32&",
        }}
        style={{ width: 20, height: 20,}}
      /> <Text style={{ fontSize: 16, fontWeight: 'bold', marginLeft: 5}}>AngleQuest<Text style={{ fontSize: 16, fontWeight: '500', marginLeft: 5}}>Efficiency</Text></Text>
      </View>
    <Text style={{ fontSize: 20, fontWeight: 'bold', textAlign: 'center'}}>Explore transformative stories of innovative companies using AngleQuest</Text>
    <Text style={{ color: 'green', fontSize: 20, marginTop: 5, textDecorationLine: 'underline',}}>              </Text>
      </View>
      <View style={styles.roundedBox} >
    <Text style={{ fontSize: 14, fontWeight: '400', color: 'grey'}}>Attractive to top talent</Text>
    <Text style={{ fontSize: 35, fontWeight: 'bold', color: '#206C00', marginTop: 25}}>{'\u2191'} 80%</Text>
    <Text style={{ fontSize: 14, color: "grey", marginTop: 5}}>Of new hires preferred companies that proposed AngleQuest at interview stage</Text>
    <View style={{flexDirection: 'row'}} >
    <TouchableOpacity>
          <Text style={{ color: '#206C00', fontSize: 14, marginTop: 35, textDecorationLine: 'underline'}}>Learn More</Text>
          </TouchableOpacity>
          <Image
                  source={require('../assets/icons8-arrow-right-50.png')}
                  style={styles.learn}
                />
                </View>
                <Video
                source={require('../assets/testimonial1.mp4')}
                style={styles.video}
                useNativeControls
              />
      </View>
      <View style={styles.roundedBox} >
    <Text style={{ fontSize: 14, fontWeight: '400', color: 'grey'}}>Boost Productivity of new hires</Text>
    <Text style={{ fontSize: 35, fontWeight: 'bold', color: '#206C00', marginTop: 25}}>{'\u2191'} 74%</Text>
    <Text style={{ fontSize: 14, color: "grey", marginTop: 5}}>Of employees and professionals reported that they meet the expectation of their client and new employeers with the use of AngleQuest</Text>
    <View style={{flexDirection: 'row'}} >
    <TouchableOpacity>
          <Text style={{ color: '#206C00', fontSize: 14, marginTop: 15, textDecorationLine: 'underline'}}>Learn More</Text>
          </TouchableOpacity>
          <Image
                  source={require('../assets/icons8-arrow-right-50.png')}
                  style={styles.learn2}
                />
                  </View>
                <Video
                source={require('../assets/testimonial2.mp4')}
                style={styles.video}
                useNativeControls
              />
              
      </View>
      </Swiper>
      </View>
      </View>
      
      <Text style={{ fontSize: 22, textAlign: 'center', fontWeight: "bold", marginTop: 70 }}>End-to-End Product to Elevate Your Growth Journey</Text>
      <Text style={{ fontSize: 16, textAlign: 'center', fontWeight: "600", marginTop: 10 }}>Tailored product designed for professional and business growth</Text>
      
      <View style={[styles.signupBox, { height: isIExpanded ? 'auto' : 200 }]}>
      <TouchableOpacity onPress={toggleIExpanded}>
        <View style={{ flexDirection: 'row' }}>
          <Image
            source={require('../assets/42.png')}
            style={styles.signupimg}
          />
          <Text style={{ fontSize: 18, fontWeight: 'bold', marginLeft: 5, marginTop: 7 }}>
            Sign up as an individual
          </Text>
          <Image
                  source={require('../assets/arrow-down.png')}
                  style={styles.adown}
                />
        </View>
        <Text style={{ fontSize: 14, color: 'grey', marginTop: 5 }}>
        Unlock your potential with AngleQuest
        </Text>
        {!isIExpanded && (
          <Text style={{ fontSize: 14, color: 'grey', marginTop: 20 }}>
           Sign up today to access personalized coaching, skill-building resources and career advancement tools tailored just for you.
          </Text>
        )}
      </TouchableOpacity>
      {isIExpanded && (
        <>
         <Text style={{ fontSize: 14, color: 'grey', marginTop: 20 }}>
         Sign up today to access personalized coaching, skill-building resources and career advancement tools tailored just for you.
          </Text>
          <View style={{ borderBottomWidth: 1.5, borderBottomColor: 'purple', marginTop: 30 }} />
          <Text style={{ fontSize: 14, color: 'grey', marginTop: 15 }}>Top use cases:</Text>
          <View style={{flexDirection: 'row', marginTop: 20}} >
    < Feather name="check" size={15} color="purple" />
                <Text style={{ fontSize: 14, marginLeft: 5}}>Career Advancement</Text>
</View>
<View style={{flexDirection: 'row', marginTop: 10}} >
    < Feather name="check" size={15} color="purple" />
                <Text style={{ fontSize: 14, marginLeft: 5}}>Coaching and Mentoring</Text>
</View>
<View style={{flexDirection: 'row', marginTop: 10}} >
    < Feather name="check" size={15} color="purple" />
                <Text style={{ fontSize: 14, marginLeft: 5}}>Personalized Growth Plan</Text>
</View>
<View style={{flexDirection: 'row', marginTop: 10}} >
    < Feather name="check" size={15} color="purple" />
                <Text style={{ fontSize: 14, marginLeft: 5}}>Performance Tracking</Text>
</View>
          <TouchableOpacity style={styles.signupButton}>
            <Text style={styles.signupButtonText}>Sign Up</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
      

      <View style={[styles.signupBox, { height: isExpanded ? 'auto' : 200 }]}>
      <TouchableOpacity onPress={toggleExpanded}>
        <View style={{ flexDirection: 'row' }}>
          <Image
            source={require('../assets/43.png')}
            style={styles.signupimg}
          />
          <Text style={{ fontSize: 18, fontWeight: 'bold', marginLeft: 5, marginTop: 7 }}>
            Sign up as an expert
          </Text>
          <Image
                  source={require('../assets/arrow-down.png')}
                  style={styles.adown}
                />
        </View>
        <Text style={{ fontSize: 14, color: 'grey', marginTop: 5 }}>
          Empower individuals and earn
        </Text>
        {!isExpanded && (
          <Text style={{ fontSize: 14, color: 'grey', marginTop: 20 }}>
            Join our platform to share your expertise, guide professionals in their professional journey and earn recognition and compensation.
          </Text>
        )}
      </TouchableOpacity>
      {isExpanded && (
        <>
         <Text style={{ fontSize: 14, color: 'grey', marginTop: 20 }}>
            Join our platform to share your expertise, guide professionals in their professional journey and earn recognition and compensation.
          </Text>
          <View style={{ borderBottomWidth: 1.5, borderBottomColor: '#09AD8F', marginTop: 30 }} />
          <Text style={{ fontSize: 14, color: 'grey', marginTop: 15 }}>Top use cases:</Text>
          <View style={{ flexDirection: 'row', marginTop: 20 }}>
            <Feather name="check" size={15} color="#09AD8F" />
            <Text style={{ fontSize: 14, marginLeft: 5 }}>Skill Sharing</Text>
          </View>
          <View style={{ flexDirection: 'row', marginTop: 10 }}>
            <Feather name="check" size={15} color="#09AD8F" />
            <Text style={{ fontSize: 14, marginLeft: 5 }}>Mentorship and Coaching</Text>
          </View>
          <View style={{ flexDirection: 'row', marginTop: 10 }}>
            <Feather name="check" size={15} color="#09AD8F" />
            <Text style={{ fontSize: 14, marginLeft: 5 }}>Thought Leadership</Text>
          </View>
          <View style={{ flexDirection: 'row', marginTop: 10 }}>
            <Feather name="check" size={15} color="#09AD8F" />
            <Text style={{ fontSize: 14, marginLeft: 5 }}>Earn Compensation</Text>
          </View>
          <TouchableOpacity style={styles.signupButton}>
            <Text style={styles.signupButtonText}>Sign Up</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
    
    <View style={[styles.signupBox, { height: isBExpanded ? 'auto' : 200 }]}>
      <TouchableOpacity onPress={toggleBExpanded}>
        <View style={{ flexDirection: 'row' }}>
          <Image
            source={require('../assets/44.png')}
            style={styles.signupimg}
          />
          <Text style={{ fontSize: 18, fontWeight: 'bold', marginLeft: 5, marginTop: 7 }}>
          Sign up as a business
          </Text>
          <Image
                  source={require('../assets/arrow-down.png')}
                  style={styles.adown}
                />
        </View>
        <Text style={{ fontSize: 14, color: 'grey', marginTop: 5 }}>
        Transform your workforce with guidance
        </Text>
        {!isBExpanded && (
          <Text style={{ fontSize: 14, color: 'grey', marginTop: 20 }}>
            Sign up now to access a curated network of industry-leading mentors and coaches to empower your team with personalized professional development journey.
          </Text>
        )}
      </TouchableOpacity>
      {isBExpanded && (
        <>
         <Text style={{ fontSize: 14, color: 'grey', marginTop: 20 }}>
         Sign up now to access a curated network of industry-leading mentors and coaches to empower your team with personalized professional development journey.
          </Text>
          <View style={{ borderBottomWidth: 1.5, borderBottomColor: '#09AD45', marginTop: 30 }} />
          <Text style={{ fontSize: 14, color: 'grey', marginTop: 15 }}>Top use cases:</Text>
          <View style={{flexDirection: 'row', marginTop: 20}} >
    < Feather name="check" size={15} color="#09AD45" />
                <Text style={{ fontSize: 14, marginLeft: 5}}>Skill Enhancement</Text>
</View>
<View style={{flexDirection: 'row', marginTop: 10}} >
    < Feather name="check" size={15} color="#09AD45" />
                <Text style={{ fontSize: 14, marginLeft: 5}}>Performance Management</Text>
</View>
<View style={{flexDirection: 'row', marginTop: 10}} >
    < Feather name="check" size={15} color="#09AD45" />
                <Text style={{ fontSize: 14, marginLeft: 5}}>Expert-Led Coaching</Text>
</View>
<View style={{flexDirection: 'row', marginTop: 10}} >
    < Feather name="check" size={15} color="#09AD45" />
                <Text style={{ fontSize: 14, marginLeft: 5}}>Feedback and Evaluation</Text>
</View>
          <TouchableOpacity style={styles.signupButton}>
            <Text style={styles.signupButtonText}>Sign Up</Text>
          </TouchableOpacity>
        </>
      )}
    </View>

      
      <Text style={{ fontSize: 22, textAlign: 'center', fontWeight: "bold", marginTop: 50 }}>Back your employees to succeed with anglequest.com</Text>
      <Text style={{ fontSize: 16, textAlign: 'center', fontWeight: "600", marginTop: 10 }}>No credit card needed* pay as you use</Text>
                <Image
                  source={require('../assets/landingco3.png')}
                  style={styles.shadowimage}
                />
            
            <Footer /> 

            <View style={styles.footer}>
        
      <Text style={styles.followUsText}>FOLLOW US ON</Text>
      <View style={styles.iconsRow}>
        <FontAwesome name="twitter" size={24} color="black" style={styles.icon} />
        <FontAwesome name="instagram" size={24} color="black" style={styles.icon} />
        <FontAwesome name="linkedin" size={24} color="black" style={styles.icon} />
      </View>
    
      <View style={styles.sectionRow}>
      <View style={{flexDirection: 'column'}}>
      <View style={styles.section}>
          <Text style={styles.sectionTitle}>PRODUCTS</Text>
          <Text style={styles.sectionItem}>Individual</Text>
          <Text style={styles.sectionItem}>Experts</Text>
          <Text style={styles.sectionItem}>Businesses</Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>WHY ANGLEQUEST</Text>
          <Text style={styles.sectionItem}>Pricing</Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>CONTACT US</Text>
          <Text style={styles.sectionItem}>anglequest@gmail.com</Text>
        </View>
        </View>
      
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>RESOURCES</Text>
          <Text style={styles.sectionItem}>Documentation</Text>
          <Text style={styles.sectionItem}>FAQ</Text>
          <Text style={styles.sectionItem}>Terms & Privacy Policy</Text>
        </View>
        
    
</View>
</View>
</View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={ModalVisible}
        onRequestClose={handleCloseModal}
      >
        <View style={styles.modalContent}>
          <OpenModal onClose={handleCloseModal} />
        </View>
      </Modal>
      </ScrollView>
      <BottomTab navigation={navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {},
  modalContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
  },
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F6F6F6',
  },
  header: {
    fontSize: 16,
    marginTop: 70,
    marginBottom: 5,
    fontWeight: 'bold',
    color: 'red',
    textAlign: 'center',
  },
  buttonplus: {
    backgroundColor: '#135837',
    padding: 15,
    borderRadius: 10,
    marginTop: 40,
    width: 250,
  },
  buttonTextplus: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  image: {
    marginTop: 50,
    width: 500,
    height: 150,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'darkgreen',
    marginTop: 30,
    textAlign: 'center',
  },
  landingimage: {
    marginTop: 40,
    width: 400,
    height: 200,
    alignSelf: 'center'
  },
  landingimage2: {
    marginTop: 40,
    width: 500,
    height: 300,
  },
  innerimage: {
    marginTop: 20,
    width: 270,
    height: 100,
  },
  whiteBox: {
    width: "90%",
    height: 750,
    marginLeft: 20,
    marginRight: 20,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: "center",
    borderRadius: 10,
    backgroundColor: 'white',
  marginTop: 100,
  borderColor: 'grey',
    borderWidth: 1,
    padding: 10
  },
  recommended: {
    marginTop: 40,
    marginLeft: 20,
    width: 50,
    height: 50,
  },
  recommended2: {
    marginTop: -65,
    width: 50,
    height: 50,
    alignSelf: 'center'
  },
  recommended3: {
    marginTop: -70,
    width: 50,
    height: 50,
    alignSelf: 'center'
  },
  tryarrow: {
    marginLeft: 20,
    width: 10,
    height: 10,
  },
  recommended4: {
    marginLeft: 20,
    width: 40,
    height: 40,
  },
  check: {
    width: 20,
    height: 20,
  },
  joinButton: {
    backgroundColor: '#135837',
    padding: 10,
    borderRadius: 20,
    width: 150,
    marginTop: 40
  },
  joinButtonText: {
    color: 'white',
    fontWeight: '500',
    textAlign: 'center'
  },
  signupButton: {
    borderWidth: 1,
    alignSelf: 'center',
    padding: 8,
    borderRadius: 20,
    width: 150,
    marginTop: 40
  },
  signupButtonText: {
    color: 'black',
    fontWeight: '500',
    textAlign: 'center'
  },
  signupimg: {
    width: 40,
    height: 40,
  },
  greyBox: {
    width: 380,
    height: 400,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ECEEF8',
  marginTop: 50, marginRight: 20,
borderRadius: 10,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  roundedBox: {
    width: 380,
    height: 400,
    backgroundColor: 'white',
  marginTop: 50, marginRight: 20,
borderRadius: 10,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  signupBox: {
    width: "90%",
    height: 500,
    backgroundColor: 'white',
  marginTop: 50,
    padding: 20,
    shadowColor: '#39FF14',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 4,
  },
  learn: {
    marginLeft: 10,
    width: 10,
    height: 10,
    marginTop: 40
  },
  learn2: {
    marginLeft: 10,
    width: 10,
    height: 10,
    marginTop: 20
  },
  adown: {
    width: 15,
    height: 15,
   position: 'absolute',
   right: 20,
   marginTop: 10
  },
  video: {
    width: 380,
    height: 170,
    resizeMode: 'contain',
    marginLeft: -20,
    marginTop: 25,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10
  },
  shadowimage: {
    marginTop: -40,
      width: 400,
      height: 400,
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
      alignSelf: 'center',
      marginTop: 20
    },
    section: {
      flexDirection: 'column',
      marginLeft: 30,
      marginTop: 20
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
    dot: {
      backgroundColor: 'rgba(0,0,0,.2)',
      width: 15,
      height: 15,
      borderRadius: 7.5,
      marginLeft: 7,
      marginRight: 7,
      marginTop: 3,
      marginBottom: 3,
    },
    activeDot: {
      backgroundColor: 'green',
      width: 15,
      height: 15,
      borderRadius: 7.5,
      marginLeft: 7,
      marginRight: 7,
      marginTop: 3,
      marginBottom: 3,
    },
});

export default MyComponent;
