import React, { useState, useEffect, useRef, useTransition} from 'react';
import { View, Text, ScrollView, StyleSheet, Image, TouchableOpacity, Modal, ImageBackground } from 'react-native';
import Topbar from '../components/Recruiterstopbar';
import Sidebar from '../components/Recruiterssidebar';
import EmployeeStats from '../components/PerformaceStats';
import { useNavigation } from '@react-navigation/native';
import CustomPercentageChart from '../components/PercentageChart';
import {useFonts} from "expo-font"
import { useTranslation } from 'react-i18next';


function MyComponent() { 
    const navigation = useNavigation();

    const [fontsLoaded]=useFonts({
      'Varta-Light':require("../assets/fonts/Varta-Light.ttf"),
"Roboto-Light":require("../assets/fonts/Roboto-Light.ttf")
    })
  const {t}=useTranslation()
    return (
      <ImageBackground
    source={require ('../assets/Background.png') }
  style={{ height: '150%', width: '100%',flex: 1}}
>
        <View style={{ flex: 1 }}>
            <Topbar />
            <View style={{ flexDirection: 'row', flex: 1 }}>
                <Sidebar />
                <ScrollView contentContainerStyle={{ flexGrow: 1, maxHeight: 500 }}>
                    <View style={{ marginLeft: 270 }}>
                    <View style={styles.header}>
            <TouchableOpacity>
              <View style={styles.item}>
              <Image
  source={{ uri: 'https://cdn.builder.io/api/v1/image/assets/TEMP/fa3093fa6656295c8b39535a911908d6555a356fccce78af145fec472c4bd154?apiKey=7b9918e68d9b487793009b3aea5b1a32&' }}
  style={styles.image}
/>
                <Text style={styles.headertext}>Employee Performance</Text>
              </View>
            </TouchableOpacity>
            </View>
    <View style={{ justifyContent: "flex-start", paddingHorizontal: 10, paddingVertical: 10, borderRadius: 5, backgroundColor: 'rgba(211,249,216,0.1)', width: 150, alignItems: 'center', marginTop: 50, marginLeft: 50,  }}>
                    <Text style={{ fontSize: 16, color: "black", alignText: 'center', fontWeight: 'bold',fontFamily:"Roboto-Light" }}>{t("Overall Statistics")}</Text>
                  </View>      

     <View style={styles.container}>
     <View style={styles.box}>
        <Text style = {{fontSize: 15, color: 'black', fontWeight: 'bold', marginBottom: 10,fontFamily:"Roboto-Light" }}>Angle Badge</Text>
        <View style={{flexDirection: 'row' }}>
          <Text style={{fontSize: 14, color: 'black',fontFamily:"Roboto-Light" }}>{t("This is the combined progress of your team")}</Text>
          <View style={{ alignItems: 'center', justifyContent: 'center', marginLeft: 20 }}>
      <CustomPercentageChart percentage={51.3} />
      </View>
    </View>
      </View>

      <View style={styles.box}>
        <Text style = {{fontSize: 15, color: 'black', fontWeight: 'bold', marginBottom: 10,fontFamily:"Roboto-Light" }}>{t("Hub Attendance")}</Text>
        <View style={{flexDirection: 'row' }}>
          <Text style={{fontSize: 14, color: 'black', width: 100,fontFamily:"Roboto-Light"}}>{t("This is the combined hubs attendane of your team")}</Text>
          <View style={{ alignItems: 'center', justifyContent: 'center', marginLeft: 10 }}>
      <CustomPercentageChart percentage={45} />
      </View>
    </View>
      </View>
     
      <View style={styles.box}>
        <Text style = {{fontSize: 15, color: 'black', fontWeight: 'bold', marginBottom: 10,fontFamily:"Roboto-Light" }}>{t("Growth Plan")}</Text>
        <View style={{flexDirection: 'row' }}>
          <Text style={{fontSize: 14, color: 'black',fontFamily:"Roboto-Light" }}>{t("This is the combined growth plan completed")}</Text>
          <View style={{ alignItems: 'center', justifyContent: 'center', marginLeft: 10 }}>
      <CustomPercentageChart percentage={60} />
      </View>
    </View>
      </View>
      
      <View style={styles.box}>
        <Text style = {{fontSize: 15, color: 'black', fontWeight: 'bold', marginBottom: 10,fontFamily:"Roboto-Light" }}>{t("Advice")}</Text>
        <View style={{flexDirection: 'row' }}>
          <Text style={{fontSize: 14, color: 'black', width: 100,fontFamily:"Roboto-Light" }}>{t("This is the combined advice sessions your team had")}</Text>
          <View style={{ alignItems: 'center', justifyContent: 'center', marginLeft: 15 }}>
      <CustomPercentageChart percentage={49} />
      </View>
    </View>
      </View>
</View>

                       
                        <EmployeeStats />
                    </View>
                </ScrollView>
            </View>
        </View>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    modalContent: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        borderRadius: 10
      },
    header: {
        marginLeft: -60,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(225,225,212,0.3)',
        backgroundColor: '#f7fff4',
    },
    item: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginRight: 10, 
    }, 
    headertext: {
      marginLeft: 5,
      fontSize: 14,
      fontWeight: '500',
      marginTop: 5,
      color: '#666',
      fontFamily:"Roboto-Light"
    },
    image: {
      width: 21,
      height: 21,
      marginRight: 5,
      marginTop: 5,
      marginLeft: 100
    },
    container: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        marginLeft: 40, marginRight: 50, marginTop: 20
      },
      box: {
        backgroundColor: '#f7fff4',
        padding: 20,
        borderRadius: 20,
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        width: '22%',
        height: 150,
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
      boximage: {
        width: 30,
        height: 30,
        position: 'absolute',
        left: 130,
        borderRadius: 25
      },
});

export default MyComponent;
