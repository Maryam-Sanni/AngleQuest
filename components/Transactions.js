import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useFonts } from 'expo-font';
import { useTranslation } from 'react-i18next';

const ScheduledMeetingsTable = () => {
  const [fontsLoaded]=useFonts({
    'Roboto-Light':require("../assets/fonts/Roboto-Light.ttf"),
  })
const {t}=useTranslation()
  return (
    <View style={styles.greenBox}>
    <Text style={styles.title}>{t("Transactions")}</Text>
    
    <View style={styles.table}>
        <View style={styles.row}>
          <View style={styles.cell}>
           <Text style={{fontSize: 14, fontWeight: '600',fontFamily:"Roboto-Light"}}>{t("Date")}</Text>
          </View>
          <View style={styles.cell}>
           <Text style={{fontSize: 14, fontWeight: '600',fontFamily:"Roboto-Light"}}>{t("Amount")} ($)</Text>
          </View>
          <View style={styles.cell}>
           <Text style={{fontSize: 14, fontWeight: '600',fontFamily:"Roboto-Light"}}>{t("Receiver")}</Text>
          </View>
          <View style={styles.cell}>
           <Text style={{fontSize: 14, fontWeight: '600',fontFamily:"Roboto-Light"}}>{t("Account Number")}</Text>
          </View>
          <View style={styles.cell}>
           <Text style={{fontSize: 14, fontWeight: '600',fontFamily:"Roboto-Light"}}>{t("Status")}</Text>
          </View>
        </View>
        <View style={styles.row}>
          <View style={styles.cell2}>
            <Text style={styles.cellText}>5/9/2024</Text>
          </View>
          <View style={styles.cell2}>
            <Text style={styles.cellText}>100</Text>
          </View>
          <View style={styles.cell2}>
            <Text style={styles.cellText}>Stripe</Text>
          </View>
          <View style={styles.cell2}>
            <Text style={styles.cellText}>00-00-56</Text>
          </View>
          <View style={styles.cell2}>
            <Text style={styles.cellText}>{t("Pending")}</Text>
          </View>
          </View>
          <View style={styles.row}>
          <View style={styles.cell}>
            <Text style={styles.cellText}>2/22/2024</Text>
          </View>
          <View style={styles.cell}>
            <Text style={styles.cellText}>100</Text>
          </View>
          <View style={styles.cell}>
            <Text style={styles.cellText}>{t("Stripe")}</Text>
          </View>
          <View style={styles.cell}>
            <Text style={styles.cellText}>11-11-334</Text>
          </View>
          <View style={styles.cell}>
            <Text style={styles.cellText}>{t("Completed")}</Text>
          </View>
          </View>
          <View style={styles.row}>
          <View style={styles.cell2}>
            <Text style={styles.cellText}>2/21/2024</Text>
          </View>
          <View style={styles.cell2}>
            <Text style={styles.cellText}>100</Text>
          </View>
          <View style={styles.cell2}>
            <Text style={styles.cellText}>{t("Stripe")}</Text>
          </View>
          <View style={styles.cell2}>
            <Text style={styles.cellText}>01-09-444</Text>
          </View>
          <View style={styles.cell2}>
            <Text style={styles.cellText}>{t("Completed")}</Text>
          </View>
          </View>
        </View>
      </View>
    
  );
}

const styles = StyleSheet.create({
  title: {
    marginTop: 30,
    marginLeft: 50,
    color: "black",
    fontWeight: 'bold',
    fontSize: 15,
    textAlign: 'flex-start',
  },
  table: {
    marginRight: 200,
    marginTop: 20,
    marginBottom: 20,
    alignContent: 'center',
    justifyContent: 'space-around',
    marginLeft: 50, marginRight: 50
  },
  row: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.2)',
  },
  cell: { 
    flex: 1,
   backgroundColor: 'white',
    padding: 10,
    alignItems: 'flex-start',
  },
  cell2: {
    flex: 1,
   backgroundColor: 'none',
    padding: 10, 
    alignItems: 'flex-start',
  },
  cellText: {
    textAlign: 'flex-start',
    fontFamily:"Roboto-Light"
  },
  
  greenBox: {
    flex: 1,
   width: "90%",
    height:250,
    paddingBottom: 10,
    marginBottom: 20,
    marginLeft: 50, 
    borderRadius: 20,
    backgroundColor: 'rgba(225,225,212,0.3)',
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.2)',
    marginTop: 50,
  },
  userimage: {
    width: 30,
    height: 30,
    marginRight: 10,
    marginTop: -5,
    borderRadius: 25
  },
  blurBackground: {
    flex: 1, 
    borderRadius: 20, 
  },
});

export default ScheduledMeetingsTable;
