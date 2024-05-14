import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, Image } from 'react-native';

const ScheduledMeetingsTable = () => {
  
  return (
    <View style={styles.greenBox}>
    
    <Text style={styles.title}>Transactions</Text>
    
    <View style={styles.table}>
        <View style={styles.row}>
          <View style={styles.cell}>
           <Text style={{fontSize: 14, fontWeight: '600'}}>Date</Text>
          </View>
          <View style={styles.cell}>
           <Text style={{fontSize: 14, fontWeight: '600'}}>Amount ($)</Text>
          </View>
          <View style={styles.cell}>
           <Text style={{fontSize: 14, fontWeight: '600'}}>Receiver</Text>
          </View>
          <View style={styles.cell}>
           <Text style={{fontSize: 14, fontWeight: '600'}}>Account Number</Text>
          </View>
          <View style={styles.cell}>
           <Text style={{fontSize: 14, fontWeight: '600'}}>Status</Text>
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
            <Text style={styles.cellText}>Pending</Text>
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
            <Text style={styles.cellText}>Stripe</Text>
          </View>
          <View style={styles.cell}>
            <Text style={styles.cellText}>11-11-334</Text>
          </View>
          <View style={styles.cell}>
            <Text style={styles.cellText}>Completed</Text>
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
            <Text style={styles.cellText}>Stripe</Text>
          </View>
          <View style={styles.cell2}>
            <Text style={styles.cellText}>01-09-444</Text>
          </View>
          <View style={styles.cell2}>
            <Text style={styles.cellText}>Completed</Text>
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
    height:250,
    paddingBottom: 10,
    marginBottom: 20,
    marginLeft: 50, 
    backgroundColor: '#F2F2F2',
    marginTop: 50, 
  },
  userimage: {
    width: 30,
    height: 30,
    marginRight: 10,
    marginTop: -5,
    borderRadius: 25
  },
});

export default ScheduledMeetingsTable;
