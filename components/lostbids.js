import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const ScheduledMeetingsTable = () => {
  return (
   <View style={{marginLeft: 50 }}>
      <Text style={styles.title}>Lost bids</Text>
      {/* Body */}
      <View style={styles.table}>
        <View style={styles.row}>
          <View style={styles.cell}>
            <Text style={styles.cellText}>TESLA</Text>
          </View>
          <View style={styles.cell}>
            <Text style={styles.cellText}>3 Candidates</Text>
          </View>
          <View style={styles.cell}>
            <Text style={styles.cellText}>SAP FI</Text>
          </View>
          <View style={styles.cell}>
            <Text style={styles.cellText}>July 2024</Text>
          </View>
          <TouchableOpacity style={styles.cell}>
            <Text style={styles.cellText}>View</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.row}>
          <View style={styles.cell}>
            <Text style={styles.cellText}>MTN</Text>
          </View>
          <View style={styles.cell}>
            <Text style={styles.cellText}>3 Candidates</Text>
          </View>
          <View style={styles.cell}>
            <Text style={styles.cellText}>Power Platform</Text>
          </View>
          <View style={styles.cell}>
            <Text style={styles.cellText}>August 2024</Text>
          </View>
          <TouchableOpacity style={styles.cell}>
            <Text style={styles.cellText}>View</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    marginTop: 30,
    color: "black",
    fontWeight: 'bold',
    fontSize: 15,
    textAlign: 'flex-start',
  },
  table: {
    marginRight: 200,
    marginTop: 10,
    alignContent: 'center',
    marginBottom: 20,
    backgroundColor: '#F8F8F8',
  },
  row: {
    flexDirection: 'row',
  },
  cell: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#CCC',
    padding: 10,
    alignItems: 'center',
  },
  cellText: {
    textAlign: 'center',
  },
});

export default ScheduledMeetingsTable;
