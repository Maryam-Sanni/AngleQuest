import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, Image, TouchableOpacity } from 'react-native';
import Topbar from '../components/expertstopbar';
import Sidebar from '../components/expertssidebar';
import HubsEarnings from '../components/HubSessionsEarnings';
import InterviewEarnings from '../components/InterviewEarnings';
import GrowthPlanEarnings from '../components/GrowthPlanEarnings';
import AdviceEarnings from '../components/AdviceEarnings';
import { useNavigate } from 'react-router-dom';
import {useFonts} from "expo-font"
import { useTranslation } from 'react-i18next';


 
function MyComponent() {
  const navigate = useNavigate();
    const [isBidHovered, setIsBidHovered] = useState(false);
    const [isOfferHovered, setIsOfferHovered] = useState(false);

    const goToOffers= () => {
        navigate('/earnings');
      };

      const goToBids = () => {
        navigate('/withdrawal');
      };
      const [fontsLoaded]=useFonts({
        'Roboto-Light':require("../assets/fonts/Roboto-Light.ttf"),
      })
      const {t}=useTranslation()

  return (
    <View style={{backgroundColor: 'white', flex: 1}}>
    <View style={{ flex: 1 }}>
      <Topbar />
      <View style={{ flexDirection: 'row', flex: 1 }}>
        <Sidebar />
        <ScrollView contentContainerStyle={{ flexGrow: 1, maxHeight: 500 }}>
        <View style={{ marginLeft: 270, backgroundColor: 'white'}}>
          <View style={styles.header}>
           
            <Text style={styles.headertext}>Payment and Withdrawal</Text>
          </View>


       
          <AdviceEarnings />



</View>
          
          
        </ScrollView>
      </View>
    </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    marginLeft: -60,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    backgroundColor: 'white',
    paddingVertical: 30,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  item: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  headertext: {
    marginLeft: 50,
    fontSize: 18,
    fontWeight: 'bold',
  },
  image: {
    width: 24,
    height: 24,
    marginRight: 5,
    marginLeft: 100
  },
});

export default MyComponent;
