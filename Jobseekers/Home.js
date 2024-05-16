import React, { useState,  useEffect } from 'react';
import { View, ScrollView, StyleSheet, Text, TouchableOpacity, Image, ImageBackground, Alert  } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Sidebar from '../components/sidebar';
import { BlurView } from 'expo-blur';
import Topbar from '../components/topbar';
import SuggestionModal from '../components/Suggestion';
import CustomModal from '../components/CustomModal'; 

const HomePage = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [custommodalVisible, setCustomModalVisible] = useState(false);
  const navigation = useNavigation();

 useEffect(() => {
    // Show the CustomModal when the component mounts
    setCustomModalVisible(true);
  }, []);

  const goToMessages = () => {
    navigation.navigate('Messages');
  };

  const goToHubs = () => {
    navigation.navigate('Coaching Hubs');
  };
 

  return (
    <ImageBackground
    source={require ('../assets/Background.png') }
  style={{ height: '150%', width: '100%',flex: 1}}
>
  <View style={{ flex: 1}}>
    <Topbar />
    <View style={{ flexDirection: 'row', flex: 1  }}>
      <Sidebar />
      <ScrollView contentContainerStyle={{ flexGrow: 1, maxHeight: 500  }}>
           <View style={styles.container}>
           <View style={{flexDirection: 'row' }}>
           <Image
        source={{
          uri:
            "https://cdn.builder.io/api/v1/image/assets/TEMP/1f2d38e99b0016f2bd167d2cfd38ff0d43c9f94a93c84b4e04a02d32658fb401?apiKey=7b9918e68d9b487793009b3aea5b1a32&",
        }}
        style={{ width: 40, height: 40, marginTop: -5}}
      />
      <Text style={styles.greeting}>Good Day, Maryam</Text>
      </View>
      <View style={styles.mainContent}>
      <View style={styles.messageBox}>
      <BlurView intensity={50} style={styles.blurBackground}>
      <View style={{flexDirection: 'row' }}>
          <Image
       source={require('../assets/chat.png')}
        style={styles.boxicon}
      />
          <Text style={{fontSize: 18, color: '#63EC55', marginTop: 25, marginLeft: 10,  fontWeight: 'bold' }}>Chats</Text>
          </View>
          <Text style={{fontSize: 16, color: 'white', marginTop: 20, marginLeft: 15,  fontWeight: 'bold' }}>SAP FI Hub</Text>
          <View style={{flexDirection: 'row', marginTop: 15 }}>
          <Image source={require('../assets/useravatar4.png')} style={styles.image} />
          <View style={{flexDirection: 'column' }}>
            <Text style={{color: 'white', fontWeight: '600', fontSize: 15, }}>Maryam Bakahli</Text>
            <Text style={{color: 'white', fontSize: 12, marginTop: 3}}>Hello, This is Maryam...</Text>
          </View>
          </View>
          <View style={{flexDirection: 'row', marginTop: 10 }}>
          <Image source={require('../assets/useravatar1.png')} style={styles.image} />
          <View style={{flexDirection: 'column' }}>
            <Text style={{color: 'white', fontWeight: '600', fontSize: 15, }}>Maryam Bakahli</Text>
            <Text style={{color: 'white', fontSize: 12, marginTop: 3}}>Hello, This is Maryam...</Text>
          </View>
          </View>
          <Text style={{color: 'white', fontSize: 13, marginTop: 10, textDecoration: 'underline', marginLeft: 140}}>see more</Text>
          <View style={{ borderBottomWidth: 2, borderBottomColor: 'white', marginTop: 10, marginLeft: 20, marginRight: 20 }} />
          
          <Text style={{fontSize: 16, color: 'white', marginTop: 10, marginLeft: 15,  fontWeight: 'bold' }}>Microsoft Azure Hub</Text>
          <View style={{flexDirection: 'row', marginTop: 15 }}>
          <Image source={require('../assets/useravatar4.png')} style={styles.image} />
          <View style={{flexDirection: 'column' }}>
            <Text style={{color: 'white', fontWeight: '600', fontSize: 15, }}>Maryam Bakahli</Text>
            <Text style={{color: 'white', fontSize: 12, marginTop: 3}}>Hello, This is Maryam...</Text>
          </View>
          </View>
          <View style={{flexDirection: 'row', marginTop: 10 }}>
          <Image source={require('../assets/useravatar1.png')} style={styles.image} />
          <View style={{flexDirection: 'column' }}>
            <Text style={{color: 'white', fontWeight: '600', fontSize: 15, }}>Maryam Bakahli</Text>
            <Text style={{color: 'white', fontSize: 12, marginTop: 3}}>Hello, This is Maryam...</Text>
          </View>
          </View>
          <Text style={{color: 'white', fontSize: 13, marginTop: 10, textDecoration: 'underline', marginLeft: 140}}>see more</Text>
          <View style={{ borderBottomWidth: 2, borderBottomColor: 'white', marginTop: 10, marginLeft: 15, marginRight: 15 }} />
          
          <Text style={{fontSize: 16, color: 'white', marginTop: 10, marginLeft: 15,  fontWeight: 'bold' }}>Jr. PowerPoint Hub</Text>
          <View style={{flexDirection: 'row', marginTop: 15 }}>
          <Image source={require('../assets/useravatar4.png')} style={styles.image} />
          <View style={{flexDirection: 'column' }}>
            <Text style={{color: 'white', fontWeight: '600', fontSize: 15, }}>Maryam Bakahli</Text>
            <Text style={{color: 'white', fontSize: 12, marginTop: 3}}>Hello, This is Maryam..</Text>
          </View>
          </View>
          <View style={{flexDirection: 'row', marginTop: 10 }}>
          <Image source={require('../assets/useravatar1.png')} style={styles.image} />
          <View style={{flexDirection: 'column' }}>
            <Text style={{color: 'white', fontWeight: '600', fontSize: 15, }}>Maryam Bakahli</Text>
            <Text style={{color: 'white', fontSize: 12, marginTop: 3}}>Hello, This is Maryam...</Text>
          </View>
          </View>
          <Text style={{color: 'white', fontSize: 13, marginTop: 10, textDecoration: 'underline', marginLeft: 140}}>see more</Text>
          <View style={{ borderBottomWidth: 2, borderBottomColor: 'white', marginTop: 10, marginLeft: 15, marginRight: 15 }} />

          <TouchableOpacity onPress={goToMessages} style={styles.touchablechat} >
          <Text style={styles.touchableText}>See All Chats</Text>
          </TouchableOpacity>
          </BlurView>
          </View>
        <View style={styles.sideColumn}>
        <View style={styles.greenBorderedBox}>
          <BlurView intensity={80} style={styles.blurBackground}>
          <View style={{flexDirection: 'row', marginTop: 20}}>
          <Text style={{fontSize: 18, color: '#63EC55', fontWeight: 'bold', marginTop: 12, marginLeft: 30  }}>On the journey of growth with you</Text>
          <TouchableOpacity style={styles.touchable} onPress={() => setModalVisible(true)}>
          <Text style={styles.touchableText}>Drop Suggestion</Text>
          </TouchableOpacity>
          </View>
          <View style={{flexDirection: 'row', marginTop: 10,}}>
          <Image
       source={require('../assets/mark.png')}
        style={styles.icon}
      />
          <Text style={{fontSize: 13, color: 'white', marginTop: 5, marginLeft: 10, textDecoration: 'underline' }}>Let our expert prepare you for your next interview</Text>
          </View>
          <View style={{flexDirection: 'row', marginTop: 5, }}>
          <Image
       source={require('../assets/mark.png')}
        style={styles.icon}
      />
          <Text style={{fontSize: 13, color: 'white', marginTop: 5, marginLeft: 10, textDecoration: 'underline' }}>Create a career growth plan with a coach</Text>
          </View>
          <View style={{flexDirection: 'row', marginTop: 5, }}>
          <Image
       source={require('../assets/mark.png')}
        style={styles.icon}
      />
          <Text style={{fontSize: 13, color: 'white', marginTop: 5, marginLeft: 10, textDecoration: 'underline' }}>Join coaching hubs for hands on learning with an expert</Text>
          </View>
          <Text style={{fontSize: 13, color: 'grey', marginTop: 15, marginLeft: 30 }}>Let's work together to unleach your best professional self</Text>
          </BlurView>
          </View>

          <View style={styles.greenBox}>
          <BlurView intensity={80} style={styles.blurBackground}>
          
        
          <View style={{flexDirection: 'row' }}>
          <View style={{flexDirection: 'column' }}>
           <View style={{flexDirection: 'row' }}>
          <Text style={{fontSize: 16, color: '#63EC55', marginTop: 15, marginLeft: 30, fontWeight: 'bold', marginBottom: -5 }}>Upcoming knowledge sharing session</Text>
          <View style={{flexDirection: 'column' }}>
          <Text style={{fontSize: 13, color: 'white', marginTop: 15, marginLeft: 40, fontWeight: '600' }}>Confirm attendance | compulsory</Text>
          <Text style={{fontSize: 12, color: 'white', marginTop: 3, marginLeft: 75, fontWeight: '600' }}>9:30 AM to 10:30 AM | Jun 25</Text>
          
          </View>
           </View>
          <View style={{flexDirection: 'row', marginBottom: 15 }}>
           <Image
              source={{ uri: 'https://cdn.builder.io/api/v1/image/assets/TEMP/96214782d7fee94659d7d6b5a7efe737b14e6f05a42e18dc902e7cdc60b0a37b' }}
              style={{ width: 40, height: 40, aspectRatio: 1, marginLeft: 30, marginTop: 7,}}
            />
              <Text style={{fontSize: 12, color: 'white', marginTop: 12, marginLeft: 10, fontWeight: '600' }}>Joop Melcher</Text>
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
<View style={styles.greenwhitebox}> 
<Text style={{fontSize: 16, color: '#63EC55', marginTop: 15, marginLeft: 20, fontWeight: 'bold' }}>Things to do</Text>
<View style={{flexDirection: 'row' }}>
<TouchableOpacity style={styles.touchablerate}>
          <Text style={styles.touchableTextrate}>Target</Text>
          </TouchableOpacity>
<TouchableOpacity style={styles.touchablerate}>
          <Text style={styles.touchableTextrate}>Hubs</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.touchablerate}>
          <Text style={styles.touchableTextrate}>Growth Plan</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.touchablerate}>
          <Text style={styles.touchableTextrate}>Interview</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.touchablerate}>
          <Text style={styles.touchableTextrate}>Advice</Text>
          </TouchableOpacity>
</View>
</View>
</View>

<View style={{flexDirection: 'row' }}>
<View style={styles.greenwhitebox}>
<View style={{flexDirection: 'row'}}>
<Text style={{fontSize: 16, color: '#63EC55', marginTop: 15, marginLeft: 30, fontWeight: 'bold' }}>Upcoming Growth Plan Review </Text>
<Text style={{fontSize: 12, color: 'white', marginTop: 15, marginLeft: 55, fontWeight: '600' }}>9:30 AM to 10:30 AM | Jun 25</Text>
</View>
<View style={{flexDirection: 'row', }}>
<Image
              source={{ uri: 'https://cdn.builder.io/api/v1/image/assets/TEMP/96214782d7fee94659d7d6b5a7efe737b14e6f05a42e18dc902e7cdc60b0a37b' }}
              style={{ width: 30, height: 30,  marginLeft: 30, marginTop: 15,}}
            />
              <Text style={{fontSize: 14, color: 'white', marginTop: 20, marginLeft: 10, fontWeight: '600' }}>Maryam Bakahali</Text>
<TouchableOpacity style={styles.touchablestart}>
          <Text style={styles.touchableTextjoinreview}>Join</Text>
          </TouchableOpacity>
          </View>
          </View>
          </View>
<View style={{flexDirection: 'row' }}>
<View style={styles.greenwhitebox}>
<View style={{flexDirection: 'row'}}>
<Text style={{fontSize: 16, color: '#63EC55', marginTop: 15, marginLeft: 30, fontWeight: 'bold' }}>Upcoming Advice Session</Text>
<Text style={{fontSize: 12, color: 'white', marginTop: 15, marginLeft: 95, fontWeight: '600' }}>9:30 AM to 10:30 AM | Jun 25</Text>
</View>
<View style={{flexDirection: 'row' }}>
<Image
              source={{ uri: 'https://cdn.builder.io/api/v1/image/assets/TEMP/96214782d7fee94659d7d6b5a7efe737b14e6f05a42e18dc902e7cdc60b0a37b' }}
              style={{ width: 30, height: 30,  marginLeft: 30, marginTop: 15,}}
            />
              <Text style={{fontSize: 14, color: 'white', marginTop: 20, marginLeft: 10, fontWeight: '600' }}>Maryam Bakahali</Text>
<TouchableOpacity style={styles.touchablestart}>
          <Text style={styles.touchableTextjoinreview}>Join</Text>
          </TouchableOpacity>
          </View>
          </View>
          </View>
 <View style={{flexDirection: 'row' }}>
          <View style={styles.greenwhitebox}>
<View style={{flexDirection: 'row'}}>
<Text style={{fontSize: 16, color: '#63EC55', marginTop: 15, marginLeft: 30, fontWeight: 'bold' }}>Upcoming Interview Session </Text>
<Text style={{fontSize: 12, color: 'white', marginTop: 15, marginLeft: 75, fontWeight: '600' }}>9:30 AM to 10:30 AM | Jun 25</Text>
</View>
<View style={{flexDirection: 'row', marginBottom: 10 }}>
<Image
              source={{ uri: 'https://cdn.builder.io/api/v1/image/assets/TEMP/96214782d7fee94659d7d6b5a7efe737b14e6f05a42e18dc902e7cdc60b0a37b' }}
              style={{ width: 30, height: 30,  marginLeft: 30, marginTop: 15,}}
            />
              <Text style={{fontSize: 14, color: 'white', marginTop: 20, marginLeft: 10, fontWeight: '600' }}>Maryam Bakahali</Text>
<TouchableOpacity style={styles.touchablestart}>
          <Text style={styles.touchableTextjoinreview}>Join</Text>
          </TouchableOpacity>
          </View>
          </View>
          
          </View>
          </BlurView>
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
          <Text style={{fontSize: 16, color: '#63EC55', marginTop: 25, marginLeft: 10,  fontWeight: 'bold' }}>Have a question?</Text>
          </View>
          <Text style={{fontSize: 12, color: 'white', marginTop: 10, marginLeft: 35,marginRight: 20, marginBottom: 20  }}>Send your question and get response as soon as possible from your coach</Text>
          <TouchableOpacity onPress={goToMessages} style={styles.touchablecoach}>
          <Text style={styles.touchableTextcoach}>Interact with your coach</Text>
          </TouchableOpacity>
          </View>

          <View style={styles.whiteBox}>
          <View style={{flexDirection: 'row' }}>
          <Image
       source={require('../assets/QandA.png')}
        style={styles.boxicon}
      />
           <Text style={{fontSize: 16, color: '#63EC55', marginTop: 25, marginLeft: 10,  fontWeight: 'bold' }}>Next knowledge sharing session</Text>
           </View>
           <Text style={{fontSize: 12, color: 'white', marginTop: 10, marginLeft: 25,marginRight: 20  }}>Setting up master data on SAP on XYZ (date) with coach Joop Melcher</Text>
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
       source={require('../assets/feedback (2).png')}
        style={styles.boxicon}
      />
          <Text style={{fontSize: 16, color: '#63EC55', marginTop: 25, marginLeft: 10,  fontWeight: 'bold' }}>Feedbacks</Text>
          </View>
          <View style={{flexDirection: 'row' }}>
          <Text style={{fontSize: 13, color: 'white', marginTop: 20, marginLeft: 40,  fontWeight: '630', textDecoration: 'underline' }}> Interview Feedback</Text>
          <Text style={{fontSize: 18, color: 'white', marginTop: 18, marginLeft: 10,  fontWeight: 'bold' }}>0</Text>
          </View>
          <View style={{flexDirection: 'row' }}>
          <Text style={{fontSize: 13, color: 'white', marginTop: 10, marginLeft: 40,  fontWeight: '630', textDecoration: 'underline' }}> Growth Plan Review</Text>
          <Text style={{fontSize: 18, color: 'white', marginTop: 8, marginLeft: 10,  fontWeight: 'bold' }}>0</Text>
          
          </View>
          <TouchableOpacity onPress={goToMessages} style={styles.touchablecoach}>
          <Text style={styles.touchableTextcoach}>See all</Text>
          </TouchableOpacity>
          </View>

          <View style={styles.whiteBox}>
          <Text style={{fontSize: 16, color: '#63EC55', marginTop: 25, marginLeft: 20,  fontWeight: 'bold' }}>My Angle Badge</Text>
      
          <Text style={{fontSize: 12, color: 'white', marginTop: 10, marginLeft: 20,marginRight: 20, marginBottom: 20  }}>I set a goal to become a senior power platform developer by thoroughly understanding the platform with my coach.</Text>
          </View>
        </View>
      </View>
    </View>
          
        </ScrollView>
      </View>
      
    
    <SuggestionModal visible={modalVisible} onClose={() => setModalVisible(false)} />
    <CustomModal visible={custommodalVisible} onClose={() => setCustomModalVisible(false)} />
    </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    marginLeft: 210,
    marginTop: 100
  },
  greeting: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 15,
    color: 'white',
    marginLeft: 3
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
    marginTop: 25,
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
    marginRight: 15,
  },
  greenBorderedBox: {
    width: 580,
    height: 200,
    backgroundColor: 'rgba(125,125,125,0.3)',
      borderRadius: 20,
    marginBottom: 20, 
    borderColor: 'rgba(255,255,255,0.5)',
    borderWidth: 1
},
messageBox: {
  width: 220,
  height: 700,
  backgroundColor: 'rgba(125,125,125,0.3)',
    borderRadius: 20,
  marginRight: 15, 
  borderColor: 'rgba(255,255,255,0.5)',
  borderWidth: 1
},
greenBox: {
  width: 580,
  height: 600,
  backgroundColor: 'rgba(225,255,212,0.1)',
  borderRadius: 20,
  marginBottom: 20,
  borderColor: 'rgba(255,255,255,0.5)',
    borderWidth: 1
},
blurBackground: {
  flex: 1, 
  borderRadius: 20, 
},
  whiteBoxesContainer: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },
  greenwhitebox: {
    width: 510,
    height: 100,
    backgroundColor: 'rgba(10,0,0,0.3)',
    marginLeft: 35, 
    marginTop: 10, 
    borderRadius: 20, 
    },
    whiteBox: {
      width: 280,
      height: 200,
      backgroundColor: 'rgba(125,125,125,0.3)',
      borderRadius: 20,
      marginBottom: 15,
      borderColor: 'rgba(255,255,255,0.5)',
      borderWidth: 1
    },
  touchable: {
    padding: 8,
    paddingHorizontal: 20,
    marginTop: 12,
    marginLeft: 100,
    backgroundColor: 'rgba(200,200,125,0.3)',
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  touchableText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 13
  },
  touchablecoach: {
    backgroundColor: 'rgba(200,200,125,0.3)',
    padding: 8,
    paddingHorizontal: 5, 
    marginTop: 25,
    marginLeft: 30,
    marginRight: 20,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  touchableTextcoach: {
    color: 'white',
    textAlign: 'center',
    fontSize: 13
  },
   touchableall: {
    backgroundColor: 'rgba(200,200,125,0.3)',
    padding: 8,
    paddingHorizontal: 20, 
    marginTop: 15,
    marginLeft: 20,
    marginRight: 20,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  touchableTextall: {
    color: 'white',
    textAlign: 'center',
    fontSize: 13
  },
   touchablehub: {
    backgroundColor: 'rgba(200,200,125,0.3)',
    padding: 8,
    paddingHorizontal: 20, 
    marginTop: 15,
    marginRight: 20,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  touchableTexthub: {
    color: 'white',
    textAlign: 'center',
    fontSize: 13
  },
  touchablejoinsession: {
    backgroundColor: 'rgba(200,200,125,0.3)',
    padding: 8,
    paddingHorizontal: 20, 
    marginTop: 10,
    marginRight: 15,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  touchableTextjoinsession: {
    color: 'white',
    textAlign: 'center',
    fontSize: 13
  },
  touchablerate: {
    backgroundColor: 'rgba(200,200,125,0.3)',
    padding: 8,
    paddingHorizontal: 10, 
    marginTop: 15,
    marginLeft: 10,
    width: 90,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  touchableTextrate: {
    color: 'white',
    textAlign: 'center',
    fontSize: 11
  },
  touchablesession: {
    backgroundColor: 'rgba(200,200,125,0.3)',
    padding: 8,
    paddingHorizontal: 20, 
    marginTop: 10,
    marginRight: 10,
    marginLeft: 180,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  touchableTextsession: {
    color: 'white',
    textAlign: 'center',
    fontSize: 13
  },
    touchablestart: {
      backgroundColor: 'rgba(200,200,125,0.3)',
      padding: 8,
      paddingHorizontal: 20, 
      marginTop: 15,
      marginLeft: 240,
      borderRadius: 20,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.1,
      shadowRadius: 2,
      elevation: 2,
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
    color: 'white',
    textAlign: 'center',
    fontSize: 13
  },
    verticalLine: {
    height: 60,
    width: 2,
    backgroundColor: '#CCC',
    marginLeft: 30,
    marginTop: 15
  },
  image: {
    width: 35,
    height: 35,
    marginRight: 10,
    marginLeft: 15,
    borderRadius: 25
  },
});

export default HomePage;
