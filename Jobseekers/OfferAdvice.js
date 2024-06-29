import React, { useState } from 'react';
import { View, Text, StyleSheet, ImageBackground, ScrollView, TouchableOpacity, Modal, Image } from 'react-native';
import Sidebar from '../components/sidebar';
import Topbar from '../components/topbar';
import { BlurView } from 'expo-blur';
import { useNavigation } from '@react-navigation/native';

const App = () => {
    const navigation = useNavigation();

    const goToPlans = () => {
        navigation.navigate('Advice Payment');
      };

    return (
        <ImageBackground
            source={require('../assets/Background.png')}
            style={{ height: '110%', width: '100%', flex: 1 }}
        >
            <BlurView intensity={70} style={{ flex: 1 }}>
                <View style={{ flex: 1 }}>
                    <Topbar />
                    <View style={{ flexDirection: 'row', flex: 1 }}>
                        <Sidebar />
                        <ScrollView contentContainerStyle={{ flexGrow: 1, maxHeight: 500 }}>
                            <View style={styles.glassBox}>
                                <View style={styles.pagecontainer}>
                                    <View style={{ flex: 1 }}>
                                    <Text style={{ color: '#206C00', fontSize: 20, fontWeight: 'bold', marginLeft: 50, marginTop: 3 }}>
                                          Emily Ray will work with you on the journey, and do the following with you:
                                        </Text>

                                        <View style={styles.box}>
                                        <View style={styles.arrowContainer}>
            <View style={styles.arrow} />
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <View style={styles.boxpay}>
        <Text style={{ fontSize: 20, fontWeight: 'bold', marginTop: 10, marginLeft: 10  }}>1. Growth Plan</Text>
            <View style={{ flexDirection: 'row', marginTop: 20 }}>
              <Image
                source={{ uri: 'https://cdn.builder.io/api/v1/image/assets/TEMP/ccb4e9d11761a733c7f0b31358f0adde0677991513c5c76300ef8731486bdcd9?apiKey=7b9918e68d9b487793009b3aea5b1a32' }}
                style={{ width: 24, height: 24, marginRight: 10 }}
                resizeMode="contain"
              />
              <Text style={{ fontSize: 16 }}>Create the next stage plan with you</Text>
            </View>
            <View style={{ flexDirection: 'row', marginTop: 10 }}>
              <Image
                source={{ uri: 'https://cdn.builder.io/api/v1/image/assets/TEMP/ccb4e9d11761a733c7f0b31358f0adde0677991513c5c76300ef8731486bdcd9?apiKey=7b9918e68d9b487793009b3aea5b1a32' }}
                style={{ width: 24, height: 24, marginRight: 5 }}
                resizeMode="contain"
              />
              <Text style={{ fontSize: 16 }}>Periodically reviews your progress</Text>
            </View>
            <View style={{ flexDirection: 'row', marginTop: 10 }}>
              <Image
                source={{ uri: 'https://cdn.builder.io/api/v1/image/assets/TEMP/ccb4e9d11761a733c7f0b31358f0adde0677991513c5c76300ef8731486bdcd9?apiKey=7b9918e68d9b487793009b3aea5b1a32' }}
                style={{ width: 24, height: 24, marginRight: 5 }}
                resizeMode="contain"
              />
              <Text style={{ fontSize: 16 }}>Continuously rates your progress</Text>
            </View>
    </View>
    <View style={styles.boxpay}>
        <Text style={{ fontSize: 20, fontWeight: 'bold', marginTop: 10, marginLeft: 10  }}>2. Hubs</Text>
            <View style={{ flexDirection: 'row', marginTop: 20 }}>
              <Image
                source={{ uri: 'https://cdn.builder.io/api/v1/image/assets/TEMP/ccb4e9d11761a733c7f0b31358f0adde0677991513c5c76300ef8731486bdcd9?apiKey=7b9918e68d9b487793009b3aea5b1a32' }}
                style={{ width: 24, height: 24, marginRight: 10 }}
                resizeMode="contain"
              />
              <Text style={{ fontSize: 16 }}>Monthly hands-on training</Text>
            </View>
            <View style={{ flexDirection: 'row', marginTop: 10 }}>
              <Image
                source={{ uri: 'https://cdn.builder.io/api/v1/image/assets/TEMP/ccb4e9d11761a733c7f0b31358f0adde0677991513c5c76300ef8731486bdcd9?apiKey=7b9918e68d9b487793009b3aea5b1a32' }}
                style={{ width: 24, height: 24, marginRight: 5 }}
                resizeMode="contain"
              />
              <Text style={{ fontSize: 16 }}>Shares knowledge gained with you</Text>
            </View>
            <View style={{ flexDirection: 'row', marginTop: 10 }}>
              <Image
                source={{ uri: 'https://cdn.builder.io/api/v1/image/assets/TEMP/ccb4e9d11761a733c7f0b31358f0adde0677991513c5c76300ef8731486bdcd9?apiKey=7b9918e68d9b487793009b3aea5b1a32' }}
                style={{ width: 24, height: 24, marginRight: 5 }}
                resizeMode="contain"
              />
              <Text style={{ fontSize: 16 }}>Shares tips to apply at works</Text>
            </View>
            </View> 
</View>
<View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginLeft: 10, marginRight: 10 }}>
<View style={styles.boxpay}>
        <Text style={{ fontSize: 20, fontWeight: 'bold', marginTop: 10, marginLeft: 10  }}>3. Advice</Text>
            <View style={{ flexDirection: 'row', marginTop: 20 }}>
              <Image
                source={{ uri: 'https://cdn.builder.io/api/v1/image/assets/TEMP/ccb4e9d11761a733c7f0b31358f0adde0677991513c5c76300ef8731486bdcd9?apiKey=7b9918e68d9b487793009b3aea5b1a32' }}
                style={{ width: 24, height: 24, marginRight: 10 }}
                resizeMode="contain"
              />
              <Text style={{ fontSize: 16 }}>One-on-One Career advice</Text>
            </View>
            <View style={{ flexDirection: 'row', marginTop: 10 }}>
              <Image
                source={{ uri: 'https://cdn.builder.io/api/v1/image/assets/TEMP/ccb4e9d11761a733c7f0b31358f0adde0677991513c5c76300ef8731486bdcd9?apiKey=7b9918e68d9b487793009b3aea5b1a32' }}
                style={{ width: 24, height: 24, marginRight: 5 }}
                resizeMode="contain"
              />
              <Text style={{ fontSize: 16 }}>One-on-One Growth advice</Text>
            </View>
            </View> 
            <View style={styles.boxpay}>
        <Text style={{ fontSize: 20, fontWeight: 'bold', marginTop: 10, marginLeft: 10  }}>4. Mentorship & Guidance</Text>
            <View style={{ flexDirection: 'row', marginTop: 20 }}>
              <Image
                source={{ uri: 'https://cdn.builder.io/api/v1/image/assets/TEMP/ccb4e9d11761a733c7f0b31358f0adde0677991513c5c76300ef8731486bdcd9?apiKey=7b9918e68d9b487793009b3aea5b1a32' }}
                style={{ width: 24, height: 24, marginRight: 10 }}
                resizeMode="contain"
              />
              <Text style={{ fontSize: 16 }}>Becomes your buddy</Text>
            </View>
            <View style={{ flexDirection: 'row', marginTop: 10 }}>
              <Image
                source={{ uri: 'https://cdn.builder.io/api/v1/image/assets/TEMP/ccb4e9d11761a733c7f0b31358f0adde0677991513c5c76300ef8731486bdcd9?apiKey=7b9918e68d9b487793009b3aea5b1a32' }}
                style={{ width: 24, height: 24, marginRight: 5 }}
                resizeMode="contain"
              />
              <Text style={{ fontSize: 16 }}>Available to answer questions</Text>
            </View>
           
            </View> 
         
        
      </View>
    
      <View style={styles.arrowContainer2}>
            <View style={styles.arrowLeft} />
        </View>
                                            </View>
                                            </View>
                                          
                                            
                                            <TouchableOpacity onPress={goToPlans} style={styles.buttonplus}>
                                                <Text style={styles.buttonTextplus}>Next</Text>
                                            </TouchableOpacity>
                                           
                                         
                                     
                                        
                                  
                                </View>
                            </View>
                        </ScrollView>
                    </View>
                </View>
            </BlurView>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    modalContent: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        borderRadius: 10
    },
    pagecontainer: {
        backgroundColor: '#f7fff4',
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
        padding: 20,
        marginTop: 30,
        marginLeft: 30,
        marginRight: 30,
        marginBottom: 30,
        borderWidth: 2,
        borderColor: 'rgba(225,225,212,0.3)',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    glassBox: {
        backgroundColor: 'rgba(225,255,212,0.3)',
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
        marginTop: 30,
        marginLeft: 240,
        marginRight: 30,
        marginBottom: 30,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        marginTop: 50,
    },
    box: {
    padding: 30,
        marginTop: 30,
        alignItems: 'center',
        borderWidth: 2,
        borderColor: '#63EC55',
        marginLeft: 30,
        marginRight: 30,
    },
    touchableOpacity: {
        height: 18,
        width: 18,
        borderRadius: 15,
        borderWidth: 1,
        borderColor: "#4A5568",
        marginRight: 5,
        marginLeft: 30,
    },
    buttonplus: {
        backgroundColor: 'coral',
        borderRadius: 5,
        padding: 10,
        width: 100,
        marginBottom: 30,
        marginTop: 20,
        marginLeft: 30,
    },
    buttonTextplus: {
        color: 'white',
        fontSize: 14,
        textAlign: 'center',
    },
    arrowContainer: {
    position: 'absolute',
    top: 0,
    left: '40%',
    transform: [{ translateY: -10 }],
  },
  arrowContainer2: {
    position: 'absolute',
    bottom: -10,
    left: '80%',
    transform: [{ translateX: -10 }],
  },
  arrow: {
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderTopWidth: 10,
    borderBottomWidth: 10,
    borderLeftWidth: 15,
    borderTopColor: 'transparent',
    borderBottomColor: 'transparent',
    borderLeftColor: '#63EC55',
  },
  arrowLeft: {
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderTopWidth: 10,
    borderBottomWidth: 10,
    borderRightWidth: 15,
    borderTopColor: 'transparent',
    borderBottomColor: 'transparent',
    borderRightColor: '#63EC55',
},
boxpay: {
  backgroundColor: '#f7fff4',
  padding: 20,
  borderRadius: 10,
  alignItems: 'flex-start',
  justifyContent: 'flex-start',
  width: 350,
  height: 250,
  marginLeft: 20,
  marginTop: 20,
  borderWidth: 2, borderColor: 'rgba(225,225,212,0.3)',
  shadowColor: '#000',
  shadowOffset: {
    width: 0,
    height: 2,
  },
  shadowOpacity: 0.25,
  shadowRadius: 3.84,
  elevation: 5,
},
});

export default App;
