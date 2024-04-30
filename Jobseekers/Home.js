import React, { useState,  useEffect } from 'react';
import { View, ScrollView, StyleSheet, Text, TouchableOpacity, Image, ImageBackground, Alert  } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Sidebar from '../components/sidebar';
import Topbar from '../components/topbar';
import SuggestionModal from '../components/Suggestion';

const HomePage = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    // This function will be called when the component mounts
    // You can customize the alert message and buttons according to your requirement
    Alert.alert(
      'Complete Your Profile',
      'Please complete your profile to unlock all features.',
      [
        {
          text: 'Complete Profile',
          onPress: () => {
            // Handle navigation to profile completion screen
            navigation.navigate('Basic Details');
          },
        },
        {
          text: 'Later',
          onPress: () => {
            // Handle what to do if user chooses to complete profile later
            // Maybe dismiss the alert or do nothing
          },
        },
      ]
    );
  }, []); // Empty dependency array ensures that this effect runs only once when component mounts

  const goToMessages = () => {
    navigation.navigate('Messages');
  };

  const goToHubs = () => {
    navigation.navigate('Coaching Hubs');
  };
 

  return (
    <ImageBackground
    source={require ('../assets/Home Background.png') }
  style={{ height: '120%', width: '100%' }}
>
  <View style={{ height: '70%'}}>
    <Topbar />
    <View style={{ flexDirection: 'row', height: '100%',  }}>
      <Sidebar />
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
           <View style={styles.container}>
           <View style={{flexDirection: 'row' }}>
          <Image
       source={require('../assets/sun.png')}
        style={styles.sunicon}
      />
      <Text style={styles.greeting}>Good Day, Maryam</Text>
      </View>
      <View style={styles.mainContent}>
        <View style={styles.sideColumn}>
          <View style={styles.greenBorderedBox}>
          <View style={{flexDirection: 'row'}}>
          <Text style={{fontSize: 16, color: 'coral', fontWeight: 'bold', marginTop: 12, marginLeft: 30 }}>On the journey of growth with you</Text>
          <TouchableOpacity style={styles.touchable} onPress={() => setModalVisible(true)}>
          <Text style={styles.touchableText}>Drop Suggestion</Text>
          </TouchableOpacity>
          </View>
          <View style={{flexDirection: 'row' }}>
          <Image
       source={require('../assets/circle.png')}
        style={styles.icon}
      />
          <Text style={{fontSize: 13, color: '#206C00', marginTop: 5, marginLeft: 10 }}>Let our expert prepare you for your next interview</Text>
          </View>
          <View style={{flexDirection: 'row' }}>
          <Image
       source={require('../assets/circle.png')}
        style={styles.icon}
      />
          <Text style={{fontSize: 13, color: '#206C00', marginTop: 5, marginLeft: 10 }}>Create a career growth plan with a coach</Text>
          </View>
          <View style={{flexDirection: 'row' }}>
          <Image
       source={require('../assets/circle.png')}
        style={styles.icon}
      />
          <Text style={{fontSize: 13, color: '#206C00', marginTop: 5, marginLeft: 10 }}>Join coaching hubs for hands on learning with an expert</Text>
          </View>
          <Text style={{fontSize: 13, color: 'grey', marginTop: 15, marginLeft: 30 }}>Let's work together to unleach your best professional self</Text>
          </View>

          <View style={styles.greenBox}>
          <View style={{flexDirection: 'row' }}>
          <Image
       source={require('../assets/star.png')}
        style={styles.staricon}
      />
          <Text style={{fontSize: 14, color: 'black', marginTop: 15, marginLeft: 10, fontWeight: 'bold' }}>Your Journey</Text>
          </View>
          <View style={{flexDirection: 'row' }}>
          <View style={styles.verticalLine}></View>
          <View style={{flexDirection: 'column' }}>
           <View style={{flexDirection: 'row' }}>
          <Text style={{fontSize: 14, color: 'black', marginTop: 15, marginLeft: 30, fontWeight: 'bold', marginBottom: -5 }}>Upcoming knowledge sharing session</Text>
          <View style={{flexDirection: 'column' }}>
          <Text style={{fontSize: 13, color: 'black', marginTop: 15, marginLeft: 40, fontWeight: '600' }}>Confirm attendance | compulsory</Text>
          <Text style={{fontSize: 12, color: '#206C00', marginTop: 3, marginLeft: 75, fontWeight: '600' }}>9:30 AM to 10:30 AM | Jun 25</Text>
          
          </View>
           </View>
          <View style={{flexDirection: 'row', marginBottom: 15 }}>
           <Image
              source={{ uri: 'https://cdn.builder.io/api/v1/image/assets/TEMP/96214782d7fee94659d7d6b5a7efe737b14e6f05a42e18dc902e7cdc60b0a37b' }}
              style={{ width: 30, aspectRatio: 1, marginLeft: 30, marginTop: 7,}}
            />
              <Text style={{fontSize: 12, color: 'grey', marginTop: 12, marginLeft: 10, fontWeight: '600' }}>Joop Melcher</Text>
              <View style={{flexDirection: 'row' }}>
<TouchableOpacity style={styles.touchablesession}>
          <Text style={styles.touchableTextsession}>SAP Configuration</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.touchablejoinsession}>
          <Text style={styles.touchableTextjoinsession}>Join</Text>
          </TouchableOpacity>
          </View>
              </View>
            </View>
          </View>

<View style={{flexDirection: 'row' }}>
          <View style={styles.verticalLine}></View>
<View style={styles.greenwhitebox}> 
<Text style={{fontSize: 13, color: '#206C00', marginTop: 15, marginLeft: 40, fontWeight: '600' }}>Create a career growth plan with a coach</Text>
<Text style={{fontSize: 13, color: 'grey', marginTop: 0, marginLeft: 40  }}>Define the next stage of your career and review it with our expert</Text>
</View>
</View>
<View style={{flexDirection: 'row' }}>
          <View style={styles.verticalLine}></View>
<View style={styles.greenwhitebox}> 
<Text style={{fontSize: 13, color: '#206C00', marginTop: 15, marginLeft: 40, fontWeight: '600' }}>Explore available coaching hubs</Text>
<Text style={{fontSize: 13, color: 'grey', marginTop: 0, marginLeft: 40  }}>Join Knowledge sharing hubs that align with your plan</Text>
</View>
</View>
<View style={{flexDirection: 'row' }}>
          <View style={styles.verticalLine}></View>
<View style={styles.greenwhitebox}>
<View style={{flexDirection: 'row'}}>
<Text style={{fontSize: 13, color: '#black', marginTop: 15, marginLeft: 40, fontWeight: 'bold' }}>Upcoming growth plan review session</Text>
<Text style={{fontSize: 12, color: '#206C00', marginTop: 10, marginLeft: 40, fontWeight: '600' }}>9:30 AM to 10:30 AM | Jun 25</Text>
</View>
<View style={{flexDirection: 'row', marginBottom: 10 }}>
              <Text style={{fontSize: 12, color: 'grey', marginTop: 10, marginLeft: 40, fontWeight: '600' }}>Review with Joop Melcher</Text>
<TouchableOpacity style={styles.touchablejoinreview}>
          <Text style={styles.touchableTextjoinreview}>Join</Text>
          </TouchableOpacity>
          </View>
 </View>
 </View>
        </View>
        </View>
        <View style={styles.whiteBoxesContainer}>
          {/* White boxes will go here */}
          <View style={styles.whiteBox}>
          <View style={{flexDirection: 'row' }}>
          <Image
       source={require('../assets/question.png')}
        style={styles.boxicon}
      />
          <Text style={{fontSize: 14, color: '#206C00', marginTop: 25, marginLeft: 10,  fontWeight: 'bold' }}>Have a question?</Text>
          </View>
          <Text style={{fontSize: 12, color: 'grey', marginTop: 10, marginLeft: 35,marginRight: 20  }}>Send your question and get response on XYZ (data) from coach Joop Melcher</Text>
          <TouchableOpacity onPress={goToMessages} style={styles.touchablecoach}>
          <Text style={styles.touchableTextcoach}>Interact with your coach</Text>
          </TouchableOpacity>
          </View>

          <View style={styles.whiteBox}>
          <View style={{flexDirection: 'row' }}>
          <Image
       source={require('../assets/communicate.png')}
        style={styles.boxicon}
      />
           <Text style={{fontSize: 13, color: '#206C00', marginTop: 25, marginLeft: 10,  fontWeight: 'bold' }}>Next knowledge sharing session</Text>
           </View>
           <Text style={{fontSize: 12, color: 'grey', marginTop: 10, marginLeft: 25,marginRight: 20  }}>Setting up master data on SAP on XYZ (date) with coach Joop Melcher</Text>
           <View style={{flexDirection: 'row', marginTop: 8 }}>
<TouchableOpacity onPress={goToHubs}  style={styles.touchableall}>
          <Text style={styles.touchableTextall}>See all</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={goToHubs}  style={styles.touchablehub}>
          <Text style={styles.touchableTexthub}>Join new hub</Text>
          </TouchableOpacity>
          </View>
          </View>

          <View style={styles.whiteBox}>
          <View style={{flexDirection: 'row' }}>
          <Image
       source={require('../assets/talk.png')}
        style={styles.boxicon}
      />
          <Text style={{fontSize: 14, color: '#206C00', marginTop: 25, marginLeft: 10,  fontWeight: 'bold' }}>Feedbacks</Text>
          </View>
          <View style={{flexDirection: 'row' }}>
          <Text style={{fontSize: 13, color: '#206C00', marginTop: 20, marginLeft: 40,  fontWeight: '630', textDecoration: 'underline' }}> Interview Feedback</Text>
          <Text style={{fontSize: 18, color: 'coral', marginTop: 18, marginLeft: 10,  fontWeight: 'bold' }}>0</Text>
          </View>
          <View style={{flexDirection: 'row' }}>
          <Text style={{fontSize: 13, color: '#206C00', marginTop: 10, marginLeft: 40,  fontWeight: '630', textDecoration: 'underline' }}> Growth Plan Review</Text>
          <Text style={{fontSize: 18, color: 'coral', marginTop: 8, marginLeft: 10,  fontWeight: 'bold' }}>0</Text>
          </View>
          </View>
        </View>
      </View>
    </View>
          
        </ScrollView>
      </View>
      
    
    <SuggestionModal visible={modalVisible} onClose={() => setModalVisible(false)} />
    </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    marginLeft: 100,
  },
  greeting: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    marginTop: 20,
    color: 'black',
  },
  icon: {
    width: 10,
    height: 10,
    marginLeft: 30,
    marginTop: 10
  },
  sunicon: {
    width: 28,
    height: 28,
    marginRight: 10,
    marginTop: 20,
    marginLeft: -450
  },
  boxicon: {
    width: 25,
    height: 25,
    marginLeft: 20,
    marginTop: 20,
  },
  staricon: {
    width: 20,
    height: 20,
    marginLeft: 50,
    marginTop: 15
  },
  mainContent: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  sideColumn: {
    marginRight: 40,
  },
  greenBorderedBox: {
    width: 580,
    height: 150,
    borderWidth: 2,
    borderColor: '#206C00',
    marginBottom: 20,
    borderRadius: 15, 
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.15,
    shadowRadius: 3.84,
    elevation: 5,
  },
  greenBox: {
    width: 580,
    height: 400,
    backgroundColor: '#E1FFD4',
  },
  whiteBoxesContainer: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },
  whiteBox: {
    width: 280,
    height: 150,
    backgroundColor: '#ffffff',
    borderWidth: 2,
    borderColor: '#CCC',
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.20,
    shadowRadius: 3.84,
    elevation: 5,
  },
  touchable: {
    backgroundColor: 'white',
    padding: 3,
    paddingHorizontal: 15, 
    marginTop: 12,
    marginLeft: 120,
    borderColor: 'coral',
    borderWidth: 1
  },
  touchableText: {
    color: 'black',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 12
  },
   touchablecoach: {
    backgroundColor: 'white',
    paddingVertical: 3,
    paddingHorizontal: 5, 
    marginTop: 15,
    marginLeft: 50,
    marginRight: 20,
    borderColor: '#CCC',
    borderWidth: 1
  },
  touchableTextcoach: {
    color: 'black',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 12
  },
   touchableall: {
    backgroundColor: 'white',
    paddingVertical: 3,
    paddingHorizontal: 15, 
    marginTop: 15,
    marginLeft: 50,
    marginRight: 20,
    borderColor: '#CCC',
    borderWidth: 1
  },
  touchableTextall: {
    color: 'black',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 12
  },
   touchablehub: {
    backgroundColor: 'white',
    paddingVertical: 3,
    paddingHorizontal: 12, 
    marginTop: 15,
    marginRight: 20,
    borderColor: '#CCC',
    borderWidth: 1
  },
  touchableTexthub: {
    color: 'black',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 12
  },
  touchablejoinsession: {
    backgroundColor: 'white',
    paddingVertical: 3,
    paddingHorizontal: 15, 
    marginTop: 10,
    marginRight: 15,
    borderColor: '#CCC',
    borderWidth: 1
  },
  touchableTextjoinsession: {
    color: 'grey',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 12
  },
  touchablesession: {
    backgroundColor: 'white',
    paddingVertical: 3,
    paddingHorizontal: 12, 
    marginTop: 10,
    marginRight: 20,
    marginLeft: 160,
    borderColor: '#CCC',
    borderWidth: 1
  },
  touchableTextsession: {
    color: 'black',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 12
  },
   greenwhitebox: {
    width: 480,
    height: 70,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#CCC',
    marginLeft: 35, 
    marginTop: 10, 
    borderRadius: 10, 
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.10,
    shadowRadius: 3.84,
    elevation: 5,
    },
     touchablejoinreview: {
    backgroundColor: 'white',
    paddingVertical: 3,
    paddingHorizontal: 15, 
    marginTop: 5,
    marginLeft: 200,
    borderColor: '#CCC',
    borderWidth: 1
  },
  touchableTextjoinreview: {
    color: 'grey',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 12
  },
    verticalLine: {
    height: 60,
    width: 2,
    backgroundColor: '#CCC',
    marginLeft: 30,
    marginTop: 15
  },
});

export default HomePage;
