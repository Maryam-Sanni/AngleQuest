import { useFonts } from 'expo-font';
import React, { useState } from 'react';
import { View, Text, StyleSheet, } from 'react-native';
import { useTranslation } from 'react-i18next';

const ScheduledMeetingsTable = () => {
  const [fontsLoaded]=useFonts({
    'Roboto-Light':require("../assets/fonts/Roboto-Light.ttf"),
  })
  const {t}=useTranslation()

  return (
    <View style={styles.greenBox}>
    <View style={{flexDirection: 'row'}}>
    <Text style={styles.title}>{t("Hub Sessions Earnings")}</Text>
    <Text style={{fontSize: 14, fontWeight: '500', marginTop: 30, position: 'absolute', right: 50,fontFamily:"Roboto-Light" }}>{t("Summed earnings")} :$ 150</Text>
</View>
    <View style={styles.table}>
        <View style={styles.row}>
          <View style={styles.cell}>
           <Text style={{fontSize: 14, fontWeight: '600',fontFamily:"Roboto-Light"}}>{t("Name")}</Text>
          </View>
          <View style={styles.cell}>
           <Text style={{fontSize: 14, fontWeight: '600',fontFamily:"Roboto-Light"}}>{t("Date and Time")}</Text>
          </View>
          <View style={styles.cell}>
           <Text style={{fontSize: 14, fontWeight: '600',fontFamily:"Roboto-Light"}}>{t("Type")}</Text>
          </View>
          <View style={styles.cell}>
           <Text style={{fontSize: 14, fontWeight: '600',fontFamily:"Roboto-Light"}}>{t("Amount")} ($)</Text>
          </View>
        </View>
        <View style={styles.row}>
          <View style={styles.cell2}>
            <Text style={styles.cellText}>Junior SAP FI</Text>
          </View>
          <View style={styles.cell2}>
            <Text style={styles.cellText}>5/15/2024 3:00 PM - 4:00 PM</Text>
          </View>
          <View style={styles.cell2}>
            <Text style={styles.cellText}>{t("Public")}</Text>
          </View>
          <View style={styles.cell2}>
            <Text style={styles.cellText}>50</Text>
          </View>
          </View>
          <View style={styles.row}>
          <View style={styles.cell}>
            <Text style={styles.cellText}>Medior SAP FI</Text>
          </View>
          <View style={styles.cell}>
            <Text style={styles.cellText}>5/15/2024 3:00 PM - 4:00 PM</Text>
          </View>
          <View style={styles.cell}>
            <Text style={styles.cellText}>{t("Public")}</Text>
          </View>
          <View style={styles.cell}>
            <Text style={styles.cellText}>50</Text>
          </View>
          </View>
          <View style={styles.row}>
          <View style={styles.cell2}>
            <Text style={styles.cellText}>Senior SAP FI</Text>
          </View>
          <View style={styles.cell2}>
            <Text style={styles.cellText}>5/15/2024 3:00 PM - 3:30 PM</Text>
          </View>
          <View style={styles.cell2}>
            <Text style={styles.cellText}>{t("Public")}</Text>
          </View>
          <View style={styles.cell2}>
            <Text style={styles.cellText}>50</Text>
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
    height: 350,
    paddingBottom: 10,
    marginBottom: 20,
    marginLeft: 50, 
    borderRadius: 20,
    backgroundColor: 'rgba(225,225,212,0.3)',
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.2)',
    marginTop: 50, 
  },
});
export default ScheduledMeetingsTable;
