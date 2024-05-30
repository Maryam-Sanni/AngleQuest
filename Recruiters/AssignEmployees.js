import React, { useState } from 'react';
import { View, Text, StyleSheet, Picker, TouchableOpacity } from 'react-native';
import { BlurView } from 'expo-blur';

const ScheduledMeetingsTable = () => {
  

  return (
    <View style={styles.greenBox}>
      <BlurView intensity={100} style={styles.blurBackground}>
      
      <Text style={styles.title}>Assign Employees To Managers</Text>
      <View style={styles.table}>
      <View style={styles.row}>
          <View style={styles.cell}>
          <Text style={{fontWeight: '600', fontSize: 14}}>Name</Text>
          </View>
          <View style={styles.cell}>
          <Text style={{fontWeight: '600', fontSize: 14}}>Email</Text>
          </View>
          <View style={styles.cell}>
          <Text style={{fontWeight: '600', fontSize: 14}}>Team</Text>
          </View>
          <View style={styles.cell}>
          <Text style={{fontWeight: '600', fontSize: 14}}>Role</Text>
          </View>
          <View style={styles.cell}>
          <Text style={{fontWeight: '600', fontSize: 14}}>Assign Employee</Text>
          </View>
          <TouchableOpacity style={styles.cell}>
            <Text style={{fontWeight: '600', fontSize: 14}}>Assigned Employees</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.row}>
          <View style={styles.cell2}>
            <Text style={styles.cellText}>Kenyatta Ohbahi</Text>
          </View>
          <View style={styles.cell2}> 
            <Text style={styles.cellText}>atta@gmail.com</Text>
          </View>
          <View style={styles.cell2}>
            <Text style={styles.cellText}>CEPPA</Text>
          </View>
          <View style={styles.cell2}>
          <Text style={styles.cellText}>Power apps developer</Text>
          </View>
          <View style={styles.cell2}>
          <Picker
  style={styles.picker2} 
>
<Picker.Item label="Add employee" value="" />
<Picker.Item label="Isabella Rossi" value="Isabella Rossi" />
          <Picker.Item label="Nkechi Udom" value="Nkechi Udom" />
          <Picker.Item label="Charlotte Taylor" value="Charlotte Taylor" />
          <Picker.Item label="Jacob Hall" value="Jacob Hall" />
          <Picker.Item label="Grace Sullivan" value="Grace Sullivan" />
          <Picker.Item label="Jacques Laurent" value="Jacques Laurent" />
          <Picker.Item label="Ibrahim Abubakar" value="Ibrahim Abubakar" />
</Picker>
          </View>
          <TouchableOpacity style={styles.cell2}>
          <Text style={styles.open}>View</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.row}>
          <View style={styles.cell}>
            <Text style={styles.cellText}>Onana Humbrey</Text>
          </View>
          <View style={styles.cell}> 
            <Text style={styles.cellText}>hubrey2@yahoo.com</Text>
          </View>
          <View style={styles.cell}>
            <Text style={styles.cellText}>SAP</Text>
          </View>
          <View style={styles.cell}>
          <Text style={styles.cellText}>Power apps developer</Text>
          </View>
          <View style={styles.cell}>
          <Picker
  style={styles.picker} 
>
<Picker.Item label="Add employee" value="" />
<Picker.Item label="Isabella Rossi" value="Isabella Rossi" />
          <Picker.Item label="Nkechi Udom" value="Nkechi Udom" />
          <Picker.Item label="Charlotte Taylor" value="Charlotte Taylor" />
          <Picker.Item label="Jacob Hall" value="Jacob Hall" />
          <Picker.Item label="Grace Sullivan" value="Grace Sullivan" />
          <Picker.Item label="Jacques Laurent" value="Jacques Laurent" />
          <Picker.Item label="Ibrahim Abubakar" value="Ibrahim Abubakar" />
</Picker>
          </View>
          <TouchableOpacity style={styles.cell}>
          <Text style={styles.open}>View</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.row}>
          <View style={styles.cell2}>
            <Text style={styles.cellText}>Anthony King</Text>
          </View>
          <View style={styles.cell2}> 
            <Text style={styles.cellText}>tony@gmail.com</Text>
          </View>
          <View style={styles.cell2}>
            <Text style={styles.cellText}>MORR</Text>
          </View>
          <View style={styles.cell2}>
          <Text style={styles.cellText}>Power apps developer</Text>
          </View>
          <View style={styles.cell2}>
          <Picker
  style={styles.picker2} 
>
<Picker.Item label="Add employee" value="" />
<Picker.Item label="Isabella Rossi" value="Isabella Rossi" />
          <Picker.Item label="Nkechi Udom" value="Nkechi Udom" />
          <Picker.Item label="Charlotte Taylor" value="Charlotte Taylor" />
          <Picker.Item label="Jacob Hall" value="Jacob Hall" />
          <Picker.Item label="Grace Sullivan" value="Grace Sullivan" />
          <Picker.Item label="Jacques Laurent" value="Jacques Laurent" />
          <Picker.Item label="Ibrahim Abubakar" value="Ibrahim Abubakar" />
</Picker>
          </View>
          <TouchableOpacity style={styles.cell2}>
          <Text style={styles.open}>View</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.row}>
          <View style={styles.cell}>
            <Text style={styles.cellText}>Jerry Bassey</Text>
          </View>
          <View style={styles.cell}> 
            <Text style={styles.cellText}>basswy@gmail.com</Text>
          </View>
          <View style={styles.cell}>
            <Text style={styles.cellText}>PRO</Text>
          </View>
          <View style={styles.cell}>
          <Text style={styles.cellText}>Power apps developer</Text>
          </View>
          <View style={styles.cell}>
          <Picker
  style={styles.picker} 
>
<Picker.Item label="Add employee" value="" />
<Picker.Item label="Isabella Rossi" value="Isabella Rossi" />
          <Picker.Item label="Nkechi Udom" value="Nkechi Udom" />
          <Picker.Item label="Charlotte Taylor" value="Charlotte Taylor" />
          <Picker.Item label="Jacob Hall" value="Jacob Hall" />
          <Picker.Item label="Grace Sullivan" value="Grace Sullivan" />
          <Picker.Item label="Jacques Laurent" value="Jacques Laurent" />
          <Picker.Item label="Ibrahim Abubakar" value="Ibrahim Abubakar" />
</Picker>
          </View>
          <TouchableOpacity style={styles.cell}>
          <Text style={styles.open}>View</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.row}>
          <View style={styles.cell2}>
            <Text style={styles.cellText}>Jacob Hughes</Text>
          </View>
          <View style={styles.cell2}> 
            <Text style={styles.cellText}>J764@gmail.com</Text>
          </View>
          <View style={styles.cell2}>
            <Text style={styles.cellText}>MORR</Text>
          </View>
          <View style={styles.cell2}>
          <Text style={styles.cellText}>Power apps developer</Text>
          </View>
          <View style={styles.cell2}>
          <Picker
  style={styles.picker2} 
>
<Picker.Item label="Add employee" value="" />
<Picker.Item label="Isabella Rossi" value="Isabella Rossi" />
          <Picker.Item label="Nkechi Udom" value="Nkechi Udom" />
          <Picker.Item label="Charlotte Taylor" value="Charlotte Taylor" />
          <Picker.Item label="Jacob Hall" value="Jacob Hall" />
          <Picker.Item label="Grace Sullivan" value="Grace Sullivan" />
          <Picker.Item label="Jacques Laurent" value="Jacques Laurent" />
          <Picker.Item label="Ibrahim Abubakar" value="Ibrahim Abubakar" />
</Picker>
          </View>
          <TouchableOpacity style={styles.cell2}>
          <Text style={styles.open}>View</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.row}>
          <View style={styles.cell}>
            <Text style={styles.cellText}>Noah Robinson</Text>
          </View>
          <View style={styles.cell}> 
            <Text style={styles.cellText}>noah99@yahoo.com</Text>
          </View>
          <View style={styles.cell}>
            <Text style={styles.cellText}>SAP</Text>
          </View>
          <View style={styles.cell}>
          <Text style={styles.cellText}>Power apps developer</Text>
          </View>
          <View style={styles.cell}>
          <Picker
  style={styles.picker} 
>
<Picker.Item label="Add employee" value="" />
<Picker.Item label="Isabella Rossi" value="Isabella Rossi" />
          <Picker.Item label="Nkechi Udom" value="Nkechi Udom" />
          <Picker.Item label="Charlotte Taylor" value="Charlotte Taylor" />
          <Picker.Item label="Jacob Hall" value="Jacob Hall" />
          <Picker.Item label="Grace Sullivan" value="Grace Sullivan" />
          <Picker.Item label="Jacques Laurent" value="Jacques Laurent" />
          <Picker.Item label="Ibrahim Abubakar" value="Ibrahim Abubakar" />
</Picker>
          </View>
          <TouchableOpacity style={styles.cell}>
          <Text style={styles.open}>View</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.row}>
          <View style={styles.cell2}>
            <Text style={styles.cellText}>Aliyah Rahman</Text>
          </View>
          <View style={styles.cell2}> 
            <Text style={styles.cellText}>lih@gmail.com</Text>
          </View>
          <View style={styles.cell2}>
            <Text style={styles.cellText}>MORR</Text>
          </View>
          <View style={styles.cell2}>
          <Text style={styles.cellText}>Power apps developer</Text>
          </View>
          <View style={styles.cell2}>
          <Picker
  style={styles.picker2} 
>
<Picker.Item label="Add employee" value="" />
<Picker.Item label="Isabella Rossi" value="Isabella Rossi" />
          <Picker.Item label="Nkechi Udom" value="Nkechi Udom" />
          <Picker.Item label="Charlotte Taylor" value="Charlotte Taylor" />
          <Picker.Item label="Jacob Hall" value="Jacob Hall" />
          <Picker.Item label="Grace Sullivan" value="Grace Sullivan" />
          <Picker.Item label="Jacques Laurent" value="Jacques Laurent" />
          <Picker.Item label="Ibrahim Abubakar" value="Ibrahim Abubakar" />
</Picker>
          </View>
          <TouchableOpacity style={styles.cell2}>
          <Text style={styles.open}>View</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.row}>
          <View style={styles.cell}>
            <Text style={styles.cellText}>Amélie Martin</Text>
          </View>
          <View style={styles.cell}> 
            <Text style={styles.cellText}>amiie@gmail.com</Text>
          </View>
          <View style={styles.cell}>
            <Text style={styles.cellText}>SAP</Text>
          </View>
          <View style={styles.cell}>
          <Text style={styles.cellText}>Power apps developer</Text>
          </View>
          <View style={styles.cell}>
          <Picker
  style={styles.picker} 
>
<Picker.Item label="Add employee" value="" />
<Picker.Item label="Isabella Rossi" value="Isabella Rossi" />
          <Picker.Item label="Nkechi Udom" value="Nkechi Udom" />
          <Picker.Item label="Charlotte Taylor" value="Charlotte Taylor" />
          <Picker.Item label="Jacob Hall" value="Jacob Hall" />
          <Picker.Item label="Grace Sullivan" value="Grace Sullivan" />
          <Picker.Item label="Jacques Laurent" value="Jacques Laurent" />
          <Picker.Item label="Ibrahim Abubakar" value="Ibrahim Abubakar" />
</Picker>
          </View>
          <TouchableOpacity style={styles.cell}>
          <Text style={styles.open}>View</Text>
          </TouchableOpacity>
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
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  blurBackground: {
    flex: 1, 
    borderRadius: 20, 
  },
  open: {
    color: "black",
     fontSize: 14,
      borderColor: "#63EC55", 
      borderWidth: 2, 
      padding: 5, 
      paddingHorizontal: 15, 
      borderRadius: 5
},
});

export default ScheduledMeetingsTable;
