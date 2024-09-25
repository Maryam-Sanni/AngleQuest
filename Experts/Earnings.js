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
    <View style={{backgroundColor: '#11412C', flex: 1}}>
    <View style={{ flex: 1 }}>
      <Topbar />
      <View style={{ flexDirection: 'row', flex: 1 }}>
        <Sidebar />
        <ScrollView contentContainerStyle={{ flexGrow: 1, maxHeight: 500 }}>
        <View style={{ marginLeft: 270, backgroundColor: '#11412C'}}>
          <View style={styles.header}>
            <TouchableOpacity onPress={goToOffers} 
            underlayColor={isOfferHovered ? 'transparent' : 'transparent'}
            onMouseEnter={() => setIsOfferHovered(true)}
            onMouseLeave={() => setIsOfferHovered(false)}> 
              <View style={styles.item}>
                <Image source={require('../assets/earnings.png')} style={styles.image} />
                <Text style={[styles.headertext, isOfferHovered && { color: 'coral' }]}>{t("Earnings")}</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={goToBids}
            underlayColor={isBidHovered ? 'transparent' : 'transparent'}
            onMouseEnter={() => setIsBidHovered(true)}
            onMouseLeave={() => setIsBidHovered(false)} >
              <View style={styles.item}>
                <Image source={require('../assets/withdrawal.png')} style={styles.image} />
                <Text style={[styles.headertext, isBidHovered && { color: 'coral' }]}>{t("Withdrawal")}</Text>
              </View>
            </TouchableOpacity>
            
          </View>


          <Text style={{fontSize: 14, fontWeight: '500', marginTop: 10, position: 'absolute', right: 60, color: 'coral',fontFamily:"Roboto-Light" }}>{t("Total Earnings")}: $450</Text>
<HubsEarnings />
<InterviewEarnings />
<GrowthPlanEarnings />
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
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  item: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  headertext: {
    marginLeft: 5,
    fontSize: 14,
    fontWeight: '500',
    color: '#666',
    fontFamily:"Roboto-Light"
  },
  image: {
    width: 24,
    height: 24,
    marginRight: 5,
    marginLeft: 100
  },
});

export default MyComponent;
