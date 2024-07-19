import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Modal, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Top from './HomeTop';
import OpenModal from './Collectinfo';
import { Video } from 'expo-av';
import { Feather } from '@expo/vector-icons';
import Footer from './Footer';
import { FontAwesome, FontAwesome5 } from '@expo/vector-icons';

const MyComponent = () => {
  const navigation = useNavigation(); // Navigation object
  const [ModalVisible, setModalVisible] = useState(false);

  const handleOpenPress = () => {
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    onClose();
  };

  const goToStart = () => {
    navigation.navigate('Our Story'); // Navigate to 'JoinAs' page
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
        <Text style={{ fontSize: 50, textAlign: 'center', fontWeight: 400, marginTop: 100 }}>Super-charge your team members</Text>
        <Text style={{ fontSize: 50, color: currentColor, textAlign: 'center', fontWeight: 400 }}>
          {currentText}
          <Text style={{ fontSize: 50, color: 'black', textAlign: 'center', fontWeight: 400 }}> career growth and efficiency</Text>
        </Text>
        <Text style={{ fontSize: 24, color: 'grey', marginTop: 30, padding: 10, textAlign: 'center' }}>
          A unique toolkit for team impact management.
        </Text>
        <Text style={{ fontSize: 24, color: 'grey', padding: 10, textAlign: 'center', marginTop: -15 }}>
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
        <Text style={{ fontSize: 30, textAlign: 'center', fontWeight: "bold", marginTop: 100, marginBottom: -60  }}>Begin the journey to career advancement & growth today</Text>
                <Image
                  source={require('../assets/landingco1.gif')}
                  style={styles.landingimage}
                />
                </View>
                  <Text style={{ fontSize: 35, textAlign: 'center', fontWeight: 600, marginTop: 50 }}>Built for</Text>
                  <View style={{flexDirection: 'row'}} >
                <View style={styles.whiteBox1} >
                <Image
                  source={require('../assets/39.png')}
                  style={styles.recommended}
                />
    <Text style={{ fontSize: 20, fontWeight: 'bold', marginTop: -30}}>In-house Teams</Text>
    <Text style={{ fontSize: 14, color: "grey", marginTop: 10, textAlign: 'center',}}>Improve the efficiency of your team and orchestrate their next career milestone.</Text>
    <View style={{flexDirection: 'row', alignItems: 'center'}} >
    <TouchableOpacity>
          <Text style={{ color: '#206C00', textAlign: 'center', fontSize: 18, fontWeight: '600', marginTop: 40}}>TRY IT NOW</Text>
          </TouchableOpacity>
          <Image
                  source={require('../assets/icons8-arrow-right-50.png')}
                  style={styles.tryarrow2}
                />
                </View>
      </View>
      <View style={styles.whiteBox} >
                <Image
                  source={require('../assets/40.png')}
                  style={styles.recommended2}
                />
    <Text style={{ fontSize: 20, fontWeight: 'bold', marginTop: -20}}>Consulting Firms</Text>
    <Text style={{ fontSize: 14, color: "grey", marginTop: 10, textAlign: 'center',}}>A tool that keeps your consultant at their best & enable them to transit to any role easily.</Text>
    <View style={{flexDirection: 'row', alignItems: 'center'}} >
    <TouchableOpacity>
          <Text style={{ color: '#206C00', textAlign: 'center', fontSize: 18, fontWeight: '600', marginTop: 30 }}>TRY IT NOW</Text>
          </TouchableOpacity>
          <Image
                  source={require('../assets/icons8-arrow-right-50.png')}
                  style={styles.tryarrow}
                />
                </View>
      </View>
       <View style={styles.whiteBox} >
                <Image
                  source={require('../assets/45.png')}
                  style={styles.recommended2}
                />
    <Text style={{ fontSize: 20, fontWeight: 'bold', marginTop: -20}}>Recruiting Firms</Text>
    <Text style={{ fontSize: 14, color: "grey", marginTop: 10, textAlign: 'center',}}>A tool that helps you streamline candidates and get the best of your workforce.</Text>
    <View style={{flexDirection: 'row', alignItems: 'center'}} >
    <TouchableOpacity>
          <Text style={{ color: '#206C00', textAlign: 'center', fontSize: 18, fontWeight: '600', marginTop: 30 }}>TRY IT NOW</Text>
          </TouchableOpacity>
          <Image
                  source={require('../assets/icons8-arrow-right-50.png')}
                  style={styles.tryarrow}
                />
                </View>
      </View>
      <View style={styles.whiteBox} >
                <Image
                  source={require('../assets/41.png')}
                  style={styles.recommended3}
                />
    <Text style={{ fontSize: 20, fontWeight: 'bold', marginTop: -20}}>Individual Professionals</Text>
    <Text style={{ fontSize: 14, color: "grey", marginTop: 10, textAlign: 'center',}}>Use AngleQuest to manage your professional growthfrom one level to another.</Text>
    <View style={{flexDirection: 'row', alignItems: 'center'}} >
    <TouchableOpacity>
          <Text style={{ color: '#206C00', textAlign: 'center', fontSize: 18, fontWeight: '600', marginTop: 30}}>TRY IT NOW</Text>
          </TouchableOpacity>
          <Image
                  source={require('../assets/icons8-arrow-right-50.png')}
                  style={styles.tryarrow}
                />
                </View>
      </View>
      </View>
      <View style={{backgroundColor: '#ECEEF8', alignSelf: 'stretch', marginTop: 100}} >
      <View style={{flexDirection: 'row', alignSelf: 'center', marginTop: 50, marginBottom: 100}} >
      <View style={styles.bigwhiteBox} >
      <View style={{flexDirection: 'row', marginTop: 10}} >
                <Image
                  source={require('../assets/39.png')}
                  style={styles.recommended4}
                />
                <View style={{flexDirection: 'column'}} >
    <Text style={{ fontSize: 18, fontWeight: 'bold', marginLeft: 10}}>In-house Teams</Text>
    <Text style={{ fontSize: 14, color: "grey", marginTop: 5, marginLeft: 10, width: 280}}>Back your team to succeed</Text>
    </View>
    </View>
    <Text style={{ fontSize: 20, fontWeight: 'bold', marginTop: 30}}>Streamline your team management to drive growth and monitor success</Text>
    <View style={{borderBottomWidth: 1, borderBottomColor: '#CCC', marginTop: 40}}/>
    <View style={{flexDirection: 'row', marginTop: 50}} >
    <Image
                  source={require('../assets/icons8-check-50.png')}
                  style={styles.check}
                />
                <Text style={{ fontSize: 14, marginLeft: 10}}>Team Expansion</Text>
                <Image
                  source={require('../assets/icons8-check-50.png')}
                  style={[styles.check, {marginLeft: 10}]}/>
                  <Text style={{ fontSize: 14, marginLeft: 10}}>Data-Driven Insigts</Text>
                  <Image
                  source={require('../assets/icons8-check-50.png')}
                  style={[styles.check, {marginLeft: 10}]}/>
                  <Text style={{ fontSize: 14, marginLeft: 10}}>Performance Tracking</Text>
                </View>
    <TouchableOpacity style={styles.joinButton}>
          <Text style={styles.joinButtonText}>Get Started</Text>
        </TouchableOpacity>
        <Image
                  source={require('../assets/1.png')}
                  style={styles.innerimage}
                />
      </View>
      <View style={styles.bigwhiteBox2} >
      <View style={{flexDirection: 'row', marginTop: 10}} >
                <Image
                  source={require('../assets/40.png')}
                  style={styles.recommended4}
                />
                <View style={{flexDirection: 'column'}} >
    <Text style={{ fontSize: 18, fontWeight: 'bold', marginLeft: 10}}>Consulting Firms</Text>
    <Text style={{ fontSize: 14, color: "grey", marginTop: 5, marginLeft: 10, width: 280}}>Keep your team sharpened and prepared</Text>
    </View>
    </View>
    <Text style={{ fontSize: 20, fontWeight: 'bold', marginTop: 30}}>Optimize team readiness and ensure consistent performance</Text>
    <View style={{borderBottomWidth: 1, borderBottomColor: '#CCC', marginTop: 40}}/>
    <View style={{flexDirection: 'row', marginTop: 50}} >
    <Image
                  source={require('../assets/icons8-check-50.png')}
                  style={styles.check}
                />
                <Text style={{ fontSize: 14, marginLeft: 10}}>Continuous Monitoring</Text>
                <Image
                  source={require('../assets/icons8-check-50.png')}
                  style={[styles.check, {marginLeft: 10}]}/>
                  <Text style={{ fontSize: 14, marginLeft: 10}}>Goal Alignment</Text>
                  <Image
                  source={require('../assets/icons8-check-50.png')}
                  style={[styles.check, {marginLeft: 10}]}/>
                  <Text style={{ fontSize: 14, marginLeft: 10}}>Professional Development</Text>
                </View>
    <TouchableOpacity style={styles.joinButton}>
          <Text style={styles.joinButtonText}>Get Started</Text>
        </TouchableOpacity>
        <Image
                  source={require('../assets/2.png')}
                  style={styles.innerimage}
                />
      </View>
      </View>
      </View>
      <View style={{backgroundColor: 'white', padding: 50, alignSelf: 'stretch'}} >
      <View style={{flexDirection: 'row', alignSelf: 'center'}} >
      <Text style={{ fontSize: 35, fontWeight: 'bold', marginRight: 120, color: '#3D3D3D', width: 700, }}>As a professional, grow from one level in your career to next level assuredly!</Text>
      <View style={{flexDirection: 'column'}} >
      <Text style={{ fontSize: 21, color: "grey", marginTop: 5, width: 500, fontWeight: 300}}>Boost your alignment, efficiency and productivity through personalized features tailored to your needs.</Text>
      <TouchableOpacity style={[styles.joinButton, { marginTop: 20}]}>
          <Text style={styles.joinButtonText}>Get Started</Text>
        </TouchableOpacity>
      </View>
</View>
<Image
                  source={require('../assets/3.png')}
                  style={styles.indivimage}
                />
      </View>
      <View style={{backgroundColor: '#ECEEF8', alignSelf: 'stretch'}} >
      <View style={{flexDirection: 'row', alignSelf: 'center', marginBottom: 50}} >
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
      <TouchableOpacity style={styles.roundedBox} >
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
                source={require('../assets/testimonial2.mp4')}
                style={styles.video}
                useNativeControls
              />
      </TouchableOpacity>
      <TouchableOpacity style={styles.roundedBox} >
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
                source={require('../assets/testimonial1.mp4')}
                style={styles.video}
                useNativeControls
              />
             </TouchableOpacity> 
      </View>
      </View>
      <Text style={{ fontSize: 30, textAlign: 'center', fontWeight: "bold", marginTop: 50 }}>End-to-End Product to Elevate Your Growth Journey</Text>
      <Text style={{ fontSize: 20, textAlign: 'center', fontWeight: "600", marginTop: 10, marginBottom: 5 }}>Tailored product designed for professional and business growth</Text>
      <View style={{flexDirection: 'row', marginBottom: 50}} >
      <View style={styles.signupBox} >
      <View style={{flexDirection: 'row'}} >
                <Image
                  source={require('../assets/42.png')}
                  style={styles.signupimg}
                />
    <Text style={{ fontSize: 18, fontWeight: 'bold', marginLeft: 5, marginTop: 7}}>Sign up as an individual</Text>
    </View>
    <Text style={{ fontSize: 14, color: "grey", marginTop: 5}}>Unlock your potential with AngleQuest</Text>
    <Text style={{ fontSize: 14, color: "grey", marginTop: 20}}>Sign up today to access personalized coaching, skill-building resources and career advancement tools tailored just for you.</Text>
    <View style={{borderBottomWidth: 1.5, borderBottomColor: 'purple', marginTop: 30}}/>
    <Text style={{ fontSize: 14, color: "grey", marginTop: 15}}>Top use cases:</Text>
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
      </View>
      <View style={styles.signupBox} >
      <View style={{flexDirection: 'row'}} >
                <Image
                  source={require('../assets/43.png')}
                  style={styles.signupimg}
                />
    <Text style={{ fontSize: 18, fontWeight: 'bold', marginLeft: 5, marginTop: 7}}>Sign up as an expert</Text>
    </View>
    <Text style={{ fontSize: 14, color: "grey", marginTop: 5}}>Empower individuals and earn</Text>
    <Text style={{ fontSize: 14, color: "grey", marginTop: 20}}>Join our platform to share your expertise, guide professionals in their professional journey and earn recognition and compensation.</Text>
    <View style={{borderBottomWidth: 1.5, borderBottomColor: '#09AD8F', marginTop: 30}}/>
    <Text style={{ fontSize: 14, color: "grey", marginTop: 15}}>Top use cases:</Text>
    <View style={{flexDirection: 'row', marginTop: 20}} >
    < Feather name="check" size={15} color="#09AD8F" />
                <Text style={{ fontSize: 14, marginLeft: 5}}>Skill Sharing</Text>
</View>
<View style={{flexDirection: 'row', marginTop: 10}} >
    < Feather name="check" size={15} color="#09AD8F" />
                <Text style={{ fontSize: 14, marginLeft: 5}}>Mentorship and Coaching</Text>
</View>
<View style={{flexDirection: 'row', marginTop: 10}} >
    < Feather name="check" size={15} color="#09AD8F" />
                <Text style={{ fontSize: 14, marginLeft: 5}}>Thought Leadership</Text>
</View>
<View style={{flexDirection: 'row', marginTop: 10}} >
    < Feather name="check" size={15} color="#09AD8F" />
                <Text style={{ fontSize: 14, marginLeft: 5}}>Earn Compensation</Text>
</View>
<TouchableOpacity style={styles.signupButton}>
          <Text style={styles.signupButtonText}>Sign Up</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.signupBox} >
      <View style={{flexDirection: 'row'}} >
                <Image
                  source={require('../assets/44.png')}
                  style={styles.signupimg}
                />
    <Text style={{ fontSize: 18, fontWeight: 'bold', marginLeft: 5, marginTop: 7}}>Sign up as a business</Text>
    </View>
    <Text style={{ fontSize: 14, color: "grey", marginTop: 5}}>Transform your workforce with guidance</Text>
    <Text style={{ fontSize: 14, color: "grey", marginTop: 20}}>Sign up now to access a curated network of industry-leading mentors and coaches to empower your team with personalized professional development journey.</Text>
    <View style={{borderBottomWidth: 1.5, borderBottomColor: '#09AD45', marginTop: 30}}/>
    <Text style={{ fontSize: 14, color: "grey", marginTop: 15}}>Top use cases:</Text>
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
      </View>
      </View>
      <Text style={{ fontSize: 30, textAlign: 'center', fontWeight: "bold", marginTop: 50 }}>Back your employees to succeed with anglequest.com</Text>
      <Text style={{ fontSize: 20, textAlign: 'center', fontWeight: "600", marginTop: 10 }}>No credit card needed* pay as you use</Text>
                <Image
                  source={require('../assets/landingco3.png')}
                  style={styles.shadowimage}
                />
            
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
          <Text style={styles.sectionItem}>ask@anglequest.com</Text>
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
    </View>
  );
};

const styles = StyleSheet.create({
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
    borderRadius: 20,
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
    width: 1000,
    height: 300,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'darkgreen',
    marginTop: 30,
    textAlign: 'center',
  },
  landingimage: {
    width: 1125,
    height: 675,
    alignSelf: 'center'
  },
  shadowimage: {
  marginTop: -40,
    width: 500,
    height: 500,
  },
  innerimage: {
    marginTop: 20,
    width: 540,
    height: 200,
  },
  indivimage: {
    marginTop: 20,
    width: 1000,
    height: 300,
    alignSelf: 'center'
  },
  whiteBox1: {
    width: 300,
    height: 300,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  marginTop: 50,
  borderColor: '#CCC',
    borderWidth: 0,
    borderRightWidth: 1,
    borderLeftWidth: 1,
    padding: 20
  },
  whiteBox: {
    width: 300,
    height: 300,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  marginTop: 50,
  borderColor: '#CCC',
    borderWidth: 0,
    borderRightWidth: 1,
    padding: 20
  },
  bigwhiteBox: {
    width: 580,
    height: 600,
    backgroundColor: 'white',
  marginTop: 50, marginRight: 40,
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  bigwhiteBox2: {
    width: 580,
    height: 600,
    backgroundColor: 'white',
  marginTop: 50,
    padding: 20,
    borderRadius: 10,
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
  signupBox: {
    width: 380,
    height: 500,
    backgroundColor: 'white',
    borderRadius: 10,
  marginTop: 50, marginRight: 20,
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
  recommended2: {
    marginBottom: 20,
    width: 80,
    height: 80,
    alignSelf: 'center'
  },
  recommended: {
    marginBottom: 20,
    width: 80,
    height: 80,
    alignSelf: 'center'
  },
  recommended3: {
    marginBottom: 20,
    width: 80,
    height: 80,
    alignSelf: 'center'
  },
  tryarrow: {
    marginLeft: 20,
    width: 15,
    height: 15,
    marginTop: 30
  },
  tryarrow2: {
    marginLeft: 20,
    width: 15,
    height: 15,
    marginTop: 40
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
  video: {
    width: 380,
    height: 170,
    resizeMode: 'contain',
    marginLeft: -20,
    marginTop: 25,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10
  },
  recommended4: {
    marginLeft: 20,
    width: 40,
    height: 40,
  },
  signupimg: {
    width: 40,
    height: 40,
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
  check: {
    width: 20,
    height: 20,
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
});

export default MyComponent;
