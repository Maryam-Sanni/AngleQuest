import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, Image } from 'react-native';

const ScheduledMeetingsTable = () => {
  
  return (
    <View style={styles.greenBox}>
    <View style={{flexDirection: 'row'}}>
    <Text style={styles.title}>Growth Plan Earnings</Text>
    <Text style={{fontSize: 14, fontWeight: '500', marginTop: 30, position: 'absolute', right: 50 }}>Summed earnings:$ 150</Text>
</View>
    <View style={styles.table}>
        <View style={styles.row}>
          <View style={styles.cell}>
            <Text style={{fontSize: 14, fontWeight: '600'}}>Name</Text>
          </View>
          <View style={styles.cell}>
            <Text style={{fontSize: 14, fontWeight: '600'}}>Date and Time</Text>
          </View>
          <View style={styles.cell}>
           <Text style={{fontSize: 14, fontWeight: '600'}}>Type</Text>
          </View>
          <View style={styles.cell}>
            <Text style={{fontSize: 14, fontWeight: '600'}}>Amount ($)</Text>
          </View>
        </View>
        <View style={styles.row}>
          <View style={styles.cell2}>
            <Text style={styles.cellText}>Maryam Bakahli</Text>
          </View>
          <View style={styles.cell2}>
            <Text style={styles.cellText}>5/15/2024 3:00 PM - 4:00 PM</Text>
          </View>
          <View style={styles.cell2}>
            <Text style={styles.cellText}>Individual</Text>
          </View>
          <View style={styles.cell2}>
            <Text style={styles.cellText}>40</Text>
          </View>
          </View>
          <View style={styles.row}>
          <View style={styles.cell}>
            <Text style={styles.cellText}>Adam Shane</Text>
          </View>
          <View style={styles.cell}>
            <Text style={styles.cellText}>5/15/2024 3:00 PM - 4:00 PM</Text>
          </View>
          <View style={styles.cell}>
            <Text style={styles.cellText}>Corporate</Text>
          </View>
          <View style={styles.cell}>
            <Text style={styles.cellText}>50</Text>
          </View>
          </View>
          <View style={styles.row}>
          <View style={styles.cell2}>
            <Text style={styles.cellText}>Patrick King</Text>
          </View>
          <View style={styles.cell2}>
            <Text style={styles.cellText}>5/15/2024 3:00 PM - 3:30 PM</Text>
          </View>
          <View style={styles.cell2}>
            <Text style={styles.cellText}>Individual</Text>
          </View>
          <View style={styles.cell2}>
            <Text style={styles.cellText}>40</Text>
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
    borderBottomColor: '#CCC',
  },
  cell: { 
    flex: 1,
   backgroundColor: 'white',
    padding: 10,
    alignItems: 'flex-start',
  },
  cell2: {
    flex: 1,
   backgroundColor: '#F2F2F2',
    padding: 10, 
    alignItems: 'flex-start',
  },
  cellText: {
    textAlign: 'flex-start',
  },
  
  greenBox: {
    flex: 1,
   width: "90%",
    height: 350,
    paddingBottom: 10,
    marginBottom: 20,
    marginLeft: 50, 
    backgroundColor: '#F2F2F2',
    marginTop: 50, 
  },
});

export default ScheduledMeetingsTable;
