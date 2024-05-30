import React, { useState } from 'react';
import { View, Text, StyleSheet, Picker } from 'react-native';
import { BlurView } from 'expo-blur';

const ScheduledMeetingsTable = () => {
  

  return (
    <View style={styles.greenBox}>
      <BlurView intensity={100} style={styles.blurBackground}>
      
      <Text style={styles.title}>Assign Managers To Employees</Text>
      <View style={styles.table}>
      <View style={styles.row}>
          <View style={styles.cell}>
          <Text style={{fontWeight: '600', fontSize: 14}}>Name</Text>
          </View>
          <View style={styles.cell}>
          <Text style={{fontWeight: '600', fontSize: 14}}>Specialization</Text>
          </View>
          <View style={styles.cell}>
          <Text style={{fontWeight: '600', fontSize: 14}}>Current Role</Text>
          </View>
          <View style={styles.cell}>
          <Text style={{fontWeight: '600', fontSize: 14}}>Target Level</Text>
          </View>
          <View style={styles.cell}>
          <Text style={{fontWeight: '600', fontSize: 14}}>Manager</Text>
          </View>
          <View style={styles.cell}>
          <Text style={{fontWeight: '600', fontSize: 14}}>Assign New</Text>
          </View>
        </View>
        <View style={styles.row}>
          <View style={styles.cell2}>
            <Text style={styles.cellText}>Larrisa Omreh</Text>
          </View>
          <View style={styles.cell2}> 
            <Text style={styles.cellText}>Power Platform</Text>
          </View>
          <View style={styles.cell2}>
            <Text style={styles.cellText}>Junior power apps developer</Text>
          </View>
          <View style={styles.cell2}>
            <Text style={styles.cellText}>Senior</Text>
          </View>
          <View style={styles.cell2}>
            <Text style={styles.cellText}>Will Cooper</Text>
          </View>
          <View style={styles.cell2}>
          <Picker
  style={styles.picker2} 
>
<Picker.Item label="Choose a manager" value="Choose a manager" />
<Picker.Item label="Monica Jerry" value="Monica Jerry" />
          <Picker.Item label="Will Cooper" value="Will Cooper" />
          <Picker.Item label="John Othega" value="John Othega" />
          <Picker.Item label="Joop Melcher" value="Joop Melcher" />
</Picker>
          </View>
        </View>
        <View style={styles.row}>
          <View style={styles.cell}>
            <Text style={styles.cellText}>Onana Augusta</Text>
          </View>
          <View style={styles.cell}> 
            <Text style={styles.cellText}>SAP FI</Text>
          </View>
          <View style={styles.cell}>
            <Text style={styles.cellText}>Junior Power apps developer</Text>
          </View>
          <View style={styles.cell}>
            <Text style={styles.cellText}>Professional</Text>
          </View>
          <View style={styles.cell}>
            <Text style={styles.cellText}>Joop Melcher</Text>
          </View>
          <View style={styles.cell}>
          <Picker
  style={styles.picker} 
>
<Picker.Item label="Choose a manager" value="Choose a manager" />
<Picker.Item label="Monica Jerry" value="Monica Jerry" />
          <Picker.Item label="Will Cooper" value="Will Cooper" />
          <Picker.Item label="John Othega" value="John Othega" />
          <Picker.Item label="Joop Melcher" value="Joop Melcher" />
</Picker>
          </View>
        </View>
        <View style={styles.row}>
          <View style={styles.cell2}>
            <Text style={styles.cellText}>Oluwatobi Ogunnaike</Text>
          </View>
          <View style={styles.cell2}> 
            <Text style={styles.cellText}>SAP FI</Text>
          </View>
          <View style={styles.cell2}>
            <Text style={styles.cellText}>Junior Power apps developer</Text>
          </View>
          <View style={styles.cell2}>
            <Text style={styles.cellText}>Medior</Text>
          </View>
          <View style={styles.cell2}>
            <Text style={styles.cellText}>Joop Melcher</Text>
          </View>
          <View style={styles.cell2}>
          <Picker
  style={styles.picker2} 
>
<Picker.Item label="Choose a manager" value="Choose a manager" />
<Picker.Item label="Monica Jerry" value="Monica Jerry" />
          <Picker.Item label="Will Cooper" value="Will Cooper" />
          <Picker.Item label="John Othega" value="John Othega" />
          <Picker.Item label="Joop Melcher" value="Joop Melcher" />
</Picker>
          </View>
        </View>
        <View style={styles.row}>
          <View style={styles.cell}>
            <Text style={styles.cellText}>Jerry Bassey</Text>
          </View>
          <View style={styles.cell}> 
            <Text style={styles.cellText}>Power Platform</Text>
          </View>
          <View style={styles.cell}>
            <Text style={styles.cellText}>Senior Power apps developer</Text>
          </View>
          <View style={styles.cell}>
            <Text style={styles.cellText}>Professional</Text>
          </View>
          <View style={styles.cell}>
            <Text style={styles.cellText}>Joop Melcher</Text>
          </View>
          <View style={styles.cell}>
          <Picker
  style={styles.picker} 
>
<Picker.Item label="Choose a manager" value="Choose a manager" />
<Picker.Item label="Monica Jerry" value="Monica Jerry" />
          <Picker.Item label="Will Cooper" value="Will Cooper" />
          <Picker.Item label="John Othega" value="John Othega" />
          <Picker.Item label="Joop Melcher" value="Joop Melcher" />
</Picker>
          </View>
        </View>
        <View style={styles.row}>
          <View style={styles.cell2}>
            <Text style={styles.cellText}>Anthony Okafor</Text>
          </View>
          <View style={styles.cell2}> 
            <Text style={styles.cellText}>SAP FI</Text>
          </View>
          <View style={styles.cell2}>
            <Text style={styles.cellText}>Junior Power apps developer</Text>
          </View>
          <View style={styles.cell2}>
            <Text style={styles.cellText}>Medior</Text>
          </View>
          <View style={styles.cell2}>
            <Text style={styles.cellText}>Joop Melcher</Text>
          </View>
          <View style={styles.cell2}>
          <Picker
  style={styles.picker2} 
>
<Picker.Item label="Choose a manager" value="Choose a manager" />
<Picker.Item label="Monica Jerry" value="Monica Jerry" />
          <Picker.Item label="Will Cooper" value="Will Cooper" />
          <Picker.Item label="John Othega" value="John Othega" />
          <Picker.Item label="Joop Melcher" value="Joop Melcher" />
</Picker>
          </View>
        </View>
        <View style={styles.row}>
          <View style={styles.cell}>
            <Text style={styles.cellText}>Fatimah Hussain</Text>
          </View>
          <View style={styles.cell}> 
            <Text style={styles.cellText}>Power Platform</Text>
          </View>
          <View style={styles.cell}>
            <Text style={styles.cellText}>Senior Power apps developer</Text>
          </View>
          <View style={styles.cell}>
            <Text style={styles.cellText}>Professional</Text>
          </View>
          <View style={styles.cell}>
            <Text style={styles.cellText}>Joop Melcher</Text>
          </View>
          <View style={styles.cell}>
          <Picker
  style={styles.picker} 
>
<Picker.Item label="Choose a manager" value="Choose a manager" />
<Picker.Item label="Monica Jerry" value="Monica Jerry" />
          <Picker.Item label="Will Cooper" value="Will Cooper" />
          <Picker.Item label="John Othega" value="John Othega" />
          <Picker.Item label="Joop Melcher" value="Joop Melcher" />
</Picker>
          </View>
        </View>
        <View style={styles.row}>
          <View style={styles.cell2}>
            <Text style={styles.cellText}>Ethan Phillips</Text>
          </View>
          <View style={styles.cell2}> 
            <Text style={styles.cellText}>SAP FI</Text>
          </View>
          <View style={styles.cell2}>
            <Text style={styles.cellText}>Junior Power apps developer</Text>
          </View>
          <View style={styles.cell2}>
            <Text style={styles.cellText}>Medior</Text>
          </View>
          <View style={styles.cell2}>
            <Text style={styles.cellText}>Joop Melcher</Text>
          </View>
          <View style={styles.cell2}>
          <Picker
  style={styles.picker2} 
>
<Picker.Item label="Choose a manager" value="Choose a manager" />
<Picker.Item label="Monica Jerry" value="Monica Jerry" />
          <Picker.Item label="Will Cooper" value="Will Cooper" />
          <Picker.Item label="John Othega" value="John Othega" />
          <Picker.Item label="Joop Melcher" value="Joop Melcher" />
</Picker>
          </View>
        </View>
        <View style={styles.row}>
          <View style={styles.cell}>
            <Text style={styles.cellText}>Omar Abdullah</Text>
          </View>
          <View style={styles.cell}> 
            <Text style={styles.cellText}>Power Platform</Text>
          </View>
          <View style={styles.cell}>
            <Text style={styles.cellText}>Senior Power apps developer</Text>
          </View>
          <View style={styles.cell}>
            <Text style={styles.cellText}>Professional</Text>
          </View>
          <View style={styles.cell}>
            <Text style={styles.cellText}>Joop Melcher</Text>
          </View>
          <View style={styles.cell}>
          <Picker
  style={styles.picker} 
>
<Picker.Item label="Choose a manager" value="Choose a manager" />
<Picker.Item label="Monica Jerry" value="Monica Jerry" />
          <Picker.Item label="Will Cooper" value="Will Cooper" />
          <Picker.Item label="John Othega" value="John Othega" />
          <Picker.Item label="Joop Melcher" value="Joop Melcher" />
</Picker>
          </View>
        </View>




      </View>
      
      </BlurView>
    </View>
  );
}

const styles = StyleSheet.create({
  modalContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  title: {
    marginTop: 30,
    marginLeft: 50,
    color: "#63EC55",
    fontWeight: 'bold',
    fontSize: 18,
    textAlign: 'flex-start',
  },
  table: {
    marginTop: 20,
    marginBottom: 20,
    alignContent: 'center',
    justifyContent: 'space-around',
    marginLeft: 50, marginRight: 50
  },
  row: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(225,225,212,0.3)',
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
  },
  picker: {
    height: 30,
    width: '100%',
    backgroundColor: 'white',
    borderColor: 'grey',
    borderWidth: 2, 
    color:'black',
    borderRadius: 5,
    fontSize: 14
  },
  picker2: {
    height: 30,
    width: '100%',
    backgroundColor: 'rgba(225,225,212,0.05)',
    borderColor: 'grey',
    borderWidth: 2, 
    color:'black',
    borderRadius: 5,
    fontSize: 14
  },
  greenBox: {
    flex: 1,
   width: 750,
    height: 550, 
    marginTop: 30,
    backgroundColor: 'rgba(125,125,125,0.3)',
    borderRadius: 20,
    borderColor: 'rgba(255,255,255,0.5)',
    borderWidth: 1,
  },
  blurBackground: {
    flex: 1, 
    borderRadius: 20, 
  },
});

export default ScheduledMeetingsTable;
