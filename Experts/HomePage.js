import React, { useState,  useEffect } from 'react';
import { View, ScrollView, StyleSheet, Text, TouchableOpacity, Image, ImageBackground, Alert  } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Sidebar from '../components/expertssidebar';
import Topbar from '../components/expertstopbar';
import SuggestionModal from '../components/Suggestion';

const HomePage = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation();


  const goToMessages = () => {
    navigation.navigate('Messaging');
  };

  const goToManageHubs = () => {
    navigation.navigate('Manage Hubs');
  };
 
  const goToWithdrawal = () => {
    navigation.navigate('RequestPayout');
  };

  return (
    <ImageBackground
    source={require ('../assets/Home Background.png') }
  style={{ height: '120%', width: '100%',flex: 1}}
>
  <View style={{ height: '70%'}}>
    <Topbar />
    <View style={{ flexDirection: 'row', height: '100%' }}>
      <Sidebar />
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
           <View style={styles.container}>
           <View style={{flexDirection: 'row' }}>
          <Image
       source={require('../assets/sun.png')}
        style={styles.sunicon}
      />
      <Text style={styles.greeting}>Good Day, Joop Melcher</Text>
      </View>
      <Text style={{color: 'green', fontSize: 12, textDecoration: 'underline', marginTop: -15, marginLeft: -300, marginBottom: 20 }}>Share your profile on Linkedln</Text>
      <View style={styles.mainContent}>
        <View style={styles.sideColumn}>
          <View style={styles.greenBorderedBox}>
          <View style={{flexDirection: 'row'}}>
          <Text style={{fontSize: 16, color: 'coral', fontWeight: 'bold', marginTop: 12, marginLeft: 30 }}>Passionate About Lifting Others?</Text>
          <TouchableOpacity style={styles.touchable} onPress={() => setModalVisible(true)}>
          <Text style={styles.touchableText}>Drop Suggestion</Text>
          </TouchableOpacity>
          </View>
          <View style={{flexDirection: 'row' }}>
          <Image
       source={require('../assets/circle.png')}
        style={styles.icon}
      />
          <Text style={{fontSize: 13, color: '#206C00', marginTop: 5, marginLeft: 10 }}>Conduct thorough interview on jobseekers for preparedness </Text>
          </View>
          <View style={{flexDirection: 'row' }}>
          <Image
       source={require('../assets/circle.png')}
        style={styles.icon}
      />
          <Text style={{fontSize: 13, color: '#206C00', marginTop: 5, marginLeft: 10 }}>Review and provide guideance to the growth plan of protegees | Give assessment</Text>
          </View>
          <View style={{flexDirection: 'row' }}>
          <Image
       source={require('../assets/circle.png')}
        style={styles.icon}
      />
          <Text style={{fontSize: 13, color: '#206C00', marginTop: 5, marginLeft: 10 }}>Create coaching hubs and share your knowledge with your protegees</Text>
          </View>
          <Text style={{fontSize: 13, color: 'grey', marginTop: 15, marginLeft: 30 }}>After the good work, you also earn handsomely, lets go!</Text>
          </View>

          <View style={styles.greenBox}>
          <View style={{flexDirection: 'row' }}>
          <Image
       source={require('../assets/star.png')}
        style={styles.staricon}
      />
          <Text style={{fontSize: 14, color: 'black', marginTop: 15, marginLeft: 10, fontWeight: 'bold' }}>Your Calendar</Text>
          </View>
          <View style={{flexDirection: 'row' }}>
          <View style={styles.verticalLine}></View>
          <View style={{flexDirection: 'column' }}>
           <View style={{flexDirection: 'row' }}>
          <Text style={{fontSize: 14, color: 'black', marginTop: 15, marginLeft: 30, fontWeight: 'bold', marginBottom: -5 }}>Upcoming Sessions</Text>
          <View style={{flexDirection: 'column' }}>
          <Text style={{fontSize: 13, color: 'black', marginTop: 15, marginLeft: 200, fontWeight: 'bold', textDecoration: 'underline' }}>5 Confirmations | 1 to go</Text>
          <Text style={{fontSize: 12, color: '#206C00', marginTop: 3, marginLeft: 195, fontWeight: '600' }}>9:30 AM to 10:30 AM | Jun 25</Text>
          
          </View>
           </View>
          <View style={{flexDirection: 'row', marginBottom: 15 }}>
           <Image
              source={{ uri: 'https://cdn.builder.io/api/v1/image/assets/TEMP/96214782d7fee94659d7d6b5a7efe737b14e6f05a42e18dc902e7cdc60b0a37b' }}
              style={{ width: 30, aspectRatio: 1, marginLeft: 30, marginTop: 7,}}
            />
              <Image
              source={{ uri: 'https://cdn.builder.io/api/v1/image/assets/TEMP/96214782d7fee94659d7d6b5a7efe737b14e6f05a42e18dc902e7cdc60b0a37b' }}
              style={{ width: 30, aspectRatio: 1, marginLeft: -2, marginTop: 7,}}
            />
            <Image
              source={{ uri: 'https://cdn.builder.io/api/v1/image/assets/TEMP/96214782d7fee94659d7d6b5a7efe737b14e6f05a42e18dc902e7cdc60b0a37b' }}
              style={{ width: 30, aspectRatio: 1, marginLeft: -2, marginTop: 7,}}
            />
            <Image
              source={{ uri: 'https://cdn.builder.io/api/v1/image/assets/TEMP/96214782d7fee94659d7d6b5a7efe737b14e6f05a42e18dc902e7cdc60b0a37b' }}
              style={{ width: 30, aspectRatio: 1, marginLeft: -2, marginTop: 7,}}
            />
              <View style={{flexDirection: 'row' }}>
<TouchableOpacity style={styles.touchablesession}>
          <Text style={styles.touchableTextsession}>Setting up master data on SAP</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.touchablejoinsession}>
          <Text style={styles.touchableTextjoinsession}>Start</Text>
          </TouchableOpacity>
          </View>
              </View>
            </View>
          </View>

<View style={{flexDirection: 'row' }}>
          <View style={styles.verticalLine}></View>
<View style={styles.greenwhitebox}> 
<Text style={{fontSize: 13, color: '#206C00', marginTop: 15, marginLeft: 20, fontWeight: '600' }}>Create hubs and set your rate</Text>
<View style={{flexDirection: 'row' }}>
<TouchableOpacity style={styles.touchablerate}>
          <Text style={styles.touchableTextrate}>Create Hub</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.touchablerate}>
          <Text style={styles.touchableTextrate}>Growth Plan Rate</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.touchablerate}>
          <Text style={styles.touchableTextrate}>Interview Rate</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.touchablerate}>
          <Text style={styles.touchableTextrate}>Advice Rate</Text>
          </TouchableOpacity>
</View>
</View>
</View>
<View style={{flexDirection: 'row' }}>
          <View style={styles.verticalLine}></View>
<View style={styles.greenwhitebox}> 
<Text style={{fontSize: 13, color: '#206C00', marginTop: 20, marginLeft: 20, fontWeight: '600' }}>New Offer</Text>
<View style={{flexDirection: 'row' }}>
<Text style={{fontSize: 13, color: 'grey', marginTop: 10, marginLeft: 20, textDecoration: 'underline' }}>ASML wanta to enroll 5 SAP FI as your protegees</Text>
<TouchableOpacity style={styles.touchablejoinrate}>
          <Text style={styles.touchableTextjoinrate}>Send a Bid </Text>
          </TouchableOpacity>
          </View>
</View>
</View>
<View style={{flexDirection: 'row' }}>
          <View style={styles.verticalLine}></View>
<View style={styles.greenwhitebox}>
<View style={{flexDirection: 'row', marginBottom: 10}}>
<Text style={{fontSize: 13, color: '#black', marginTop: 15, marginLeft: 20, fontWeight: 'bold' }}>Bids</Text>
<TouchableOpacity style={styles.touchablejoinreview}>
          <Text style={styles.touchableTextjoinreview}>Join</Text>
          </TouchableOpacity>
</View>
<View style={{flexDirection: 'row' }}>
              <Text style={{fontSize: 12, color: 'black', marginTop: 10, marginLeft: 20, fontWeight: 'bold' }}>Total: 5</Text>
              <Text style={{fontSize: 12, color: 'grey', marginTop: 10, marginLeft: 20, fontWeight: 'bold' }}>Won: 5</Text>
              <Text style={{fontSize: 12, color: 'grey', marginTop: 10, marginLeft: 20, fontWeight: 'bold' }}>Loss: 5</Text>
              <Text style={{fontSize: 12, color: 'grey', marginTop: 10, marginLeft: 20, fontWeight: 'bold' }}>In Progress: 5</Text>
              </View>
 </View>
 </View>
 <View style={{flexDirection: 'row' }}>
          <View style={styles.verticalLine}>
          </View>
 <View style={styles.greenwhitebox}>
 <Text style={{fontSize: 13, color: '#black', marginTop: 15, marginLeft: 20, fontWeight: 'bold' }}>Increase youe engagement</Text>
 <View style={{flexDirection: 'row' }}>
              <Text style={{fontSize: 12, color: '#206C00', marginTop: 20, marginLeft: 20, textDecoration: 'underline'}}>Share your rofile on Linkedln</Text>
              <Text style={{fontSize: 12, color: '#206C00', marginTop: 20, marginLeft: 20, textDecoration: 'underline'}}>5 Profile views</Text>
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
          <Text style={{fontSize: 14, color: '#206C00', marginTop: 25, marginLeft: 10,  fontWeight: 'bold' }}>Incoming question...</Text>
          </View>
          <Text style={{fontSize: 12, color: 'grey', marginTop: 10, marginLeft: 35,marginRight: 20  }}>How do i find the t-code for a master data repository in ECAC? And how do I export the data once i can access it?</Text>
          <TouchableOpacity onPress={goToMessages} style={styles.touchablecoach}>
          <Text style={styles.touchableTextcoach}>Respond</Text>
          </TouchableOpacity>
          </View>

          <View style={styles.whiteBox}>
          <View style={{flexDirection: 'row' }}>
          <Image
       source={require('../assets/group.png')}
        style={styles.boxicon}
      /> 
           <Text style={{fontSize: 13, color: '#206C00', marginTop: 25, marginLeft: 10,  fontWeight: 'bold' }}>Next knowledge sharing Session</Text>
           </View>
           <Text style={{fontSize: 12, color: 'grey', marginTop: 10, marginLeft: 25,marginRight: 20  }}>Setting up master data on SAP on XYZ (date) with Joop Melcher</Text>
           <View style={{flexDirection: 'row', marginTop: 8 }}>
<TouchableOpacity onPress={goToManageHubs}  style={styles.touchableall}>
          <Text style={styles.touchableTextall}>See all</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={goToMessages}  style={styles.touchablehub}>
          <Text style={styles.touchableTexthub}>Create hub</Text>
          </TouchableOpacity>
          </View>
          </View>

          <View style={styles.whiteBox}>
          <View style={{flexDirection: 'row' }}>
          <Image
       source={require('../assets/feedback.png')}
        style={styles.boxicon}
      />
          <Text style={{fontSize: 14, color: '#206C00', marginTop: 25, marginLeft: 10,  fontWeight: 'bold' }}>Feedback</Text>
          </View>
          <View style={{flexDirection: 'row' }}>
          <Text style={{fontSize: 13, color: '#206C00', marginTop: 20, marginLeft: 40,  fontWeight: '630', textDecoration: 'underline' }}>Interview Feedback</Text>
          <Text style={{fontSize: 18, color: 'coral', marginTop: 18, marginLeft: 10,  fontWeight: 'bold' }}>0</Text>
          </View>
          <View style={{flexDirection: 'row' }}>
          <Text style={{fontSize: 13, color: '#206C00', marginTop: 10, marginLeft: 40,  fontWeight: '630', textDecoration: 'underline' }}>Growth Plan Review</Text>
          <Text style={{fontSize: 18, color: 'coral', marginTop: 8, marginLeft: 10,  fontWeight: 'bold' }}>0</Text>
          </View>
          </View>

          <View style={styles.whiteBox}>
          <View style={{flexDirection: 'row' }}>
          <Image
       source={require('../assets/money.png')}
        style={styles.boxicon}
      />
          <Text style={{fontSize: 14, color: '#206C00', marginTop: 25, marginLeft: 10,  fontWeight: 'bold' }}>Income Overview</Text>
          </View>
          <Text style={{fontSize: 12, color: 'grey', marginTop: 10, marginLeft: 35,marginRight: 20  }}>You earned $ (XYZ) from session with Joop Melcher</Text>
          <TouchableOpacity onPress={goToWithdrawal} style={styles.touchablecoach}>
          <Text style={styles.touchableTextcoach}>Withdraw Earnings</Text>
          </TouchableOpacity>
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
    marginTop: 150
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
    marginLeft: -300
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
    height: 600,
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
    marginTop: 10,
    marginLeft: 30,
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
  touchablerate: {
    backgroundColor: 'white',
    paddingVertical: 3,
    paddingHorizontal: 10, 
    marginTop: 15,
    marginRight: 5,
    marginLeft: 10,
    borderColor: 'coral',
    borderWidth: 1
  },
  touchableTextrate: {
    color: 'black',
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
    marginLeft: 90,
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
    height: 90,
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
    marginTop: 10,
    marginLeft: 350,
    borderColor: '#CCC',
    borderWidth: 1
  },
  touchableTextjoinreview: {
    color: 'grey',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 12
  },
  touchablejoinrate: {
    backgroundColor: 'white',
    paddingVertical: 3,
    paddingHorizontal: 10, 
    marginTop: 10,
    marginLeft: 70,
    borderColor: '#CCC',
    borderWidth: 1
  },
  touchableTextjoinrate: {
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
