import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Image, ScrollView } from 'react-native';
import CustomPercentageChart from '../components/PercentageChart';

function MyComponent({ onClose }) {

  return (
     
    <View style={{ flex: 1, backgroundColor: "#F8F8F8", marginTop: 40, alignItems: 'center'  }}>
         <ScrollView contentContainerStyle={{ flexGrow: 1, maxHeight: 500 }}>
<View style={styles.greenBox}>
<View style={styles.header}>
          <Image
            source={{ uri: 'https://cdn.builder.io/api/v1/image/assets/TEMP/1f2d38e99b0016f2bd167d2cfd38ff0d43c9f94a93c84b4e04a02d32658fb401?apiKey=7b9918e68d9b487793009b3aea5b1a32&' }} // replace with your logo URL
            style={styles.logo}
          />
          <Text style={styles.headerText}>Jacob Ncube's Performance</Text>
       
        <TouchableOpacity onPress={onClose} style={styles.closeButton}>
          <Text style={{ fontSize: 18, color: 'grey', fontWeight: 'bold'}}>
            ✕
          </Text>
        </TouchableOpacity>
        </View>
        <View style={styles.container}>
     <View style={styles.box}>
     <Text style = {{fontSize: 15, color: "#206C00", fontWeight: 'bold', marginBottom: 10 }}>Hub Attendance</Text>
        <View style={{flexDirection: 'row' }}>
          <Text style={{fontSize: 14, color: '#333333', width: 100}}>This is Jacob Ncube's hub attendance</Text>
          <View style={{ alignItems: 'center', justifyContent: 'center', marginLeft: 10 }}>
      <CustomPercentageChart percentage={45} />
      </View>
    </View>
      </View>

      <View style={styles.box}>
      <Text style = {{fontSize: 15, color: "#206C00", fontWeight: 'bold', marginBottom: 10 }}>Growth Plan</Text>
        <View style={{flexDirection: 'row' }}>
          <Text style={{fontSize: 14, color: '#333333', }}>This is Jacob Ncube's completed growth plan</Text>
          <View style={{ alignItems: 'center', justifyContent: 'center', marginLeft: 10 }}>
      <CustomPercentageChart percentage={60} />
      </View>
    </View>
      </View>
     
      <View style={styles.box}>
      <Text style = {{fontSize: 15, color: "#206C00", fontWeight: 'bold', marginBottom: 10 }}>Advice</Text>
        <View style={{flexDirection: 'row' }}>
          <Text style={{fontSize: 14, color: '#333333', width: 100 }}>This is the advice sessions Jacob Ncube has had</Text>
          <View style={{ alignItems: 'center', justifyContent: 'center', marginLeft: 15 }}>
      <CustomPercentageChart percentage={49} />
      </View>
    </View>
      </View>
      
   
</View>
 
<View style={styles.container}>
     <View style={styles.box2}>
      <Text style={{ fontSize: 16, color: "#206C00", fontWeight: '500'}}>Total Hub Meetings</Text>
    <Text style={{ fontSize: 24, color: "#206C00", marginTop: 10, fontWeight: 'bold'}}>8</Text>
      </View>
      <View style={styles.box2}>
      <Text style={{ fontSize: 16, color: "#206C00", fontWeight: '500'}}>Growth review Score</Text>
    <Text style={{ fontSize: 24, color: "#206C00", marginTop: 10, fontWeight: 'bold'}}>45</Text>
    <Text style={{ fontSize: 12, color: "#206C00", fontWeight: '500', marginTop: 10}}>By Joop Melchel</Text>
      </View>
      <View style={styles.box2}>
      <Text style={{ fontSize: 16, color: "#206C00", fontWeight: '500'}}>Advice Score</Text>
    <Text style={{ fontSize: 24, color: "#206C00", marginTop: 10, fontWeight: 'bold'}}>45</Text>
    <Text style={{ fontSize: 12, color: "#206C00", fontWeight: '500', marginTop: 10}}>By Joop Melchel</Text>
      </View>
</View>

<View style={styles.container}>
     <View style={styles.box2}>
      <Text style={{ fontSize: 16, color: "#206C00", fontWeight: '500'}}>Sessions Attended</Text>
    <Text style={{ fontSize: 24, color: "#206C00", marginTop: 10, fontWeight: 'bold'}}>8</Text>
      </View>
      <View style={styles.box2}>
      <Text style={{ fontSize: 16, color: "#206C00", fontWeight: '500'}}>Growth plan Clarity</Text>
    <Text style={{ fontSize: 24, color: "#206C00", marginTop: 10, fontWeight: 'bold'}}>0</Text>
      </View>
      <View style={styles.box2}>
      <Text style={{ fontSize: 16, color: "#206C00", fontWeight: '500'}}>Coming Soon</Text>
    <Text style={{ fontSize: 24, color: "#206C00", marginTop: 10, fontWeight: 'bold'}}> </Text>
      </View>
</View>

<View style={styles.container}>
     <View style={styles.box2}>
      <Text style={{ fontSize: 16, color: "#206C00", fontWeight: '500'}}>Sessions Missed</Text>
    <Text style={{ fontSize: 24, color: "#206C00", marginTop: 10, fontWeight: 'bold'}}>3</Text>
      </View>
      <View style={styles.box2}>
      <Text style={{ fontSize: 16, color: "#206C00", fontWeight: '500'}}>Coming Soon</Text>
    <Text style={{ fontSize: 24, color: "#206C00", marginTop: 10, fontWeight: 'bold'}}> </Text>
      </View>
      <View style={styles.box2}>
      <Text style={{ fontSize: 16, color: "#206C00", fontWeight: '500'}}>Coming Soon</Text>
    <Text style={{ fontSize: 24, color: "#206C00", marginTop: 10, fontWeight: 'bold'}}> </Text>
      </View>
</View>


    </View>
    </ScrollView>
</View>



);
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        marginLeft: 100, marginRight: 100, marginTop: 20
      },
  row: {
    flexDirection: 'row',
  },
  cell: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#CCC',
    padding: 5,
  },
  greenBox: {
    width: 920,
    height:620,
    backgroundColor: '#F5F5F5',
  },
  buttonAcc: {
    borderWidth: 2,
    borderColor: '#CCC',
    padding: 10,
    marginTop: 30,
    marginLeft: 500, 
    paddingHorizontal: 20,
  },
  buttonTextAcc: {
    color: 'black',
    fontSize: 14,
    textAlign: 'center',
  },
  buttonAcc2: {
    borderWidth: 2,
    borderColor: '#CCC',
    padding: 10,
    marginTop: 30,
    marginLeft: 30, 
    paddingHorizontal: 20,
  },
  buttonTextAcc2: {
    color: 'black',
    fontSize: 14,
    textAlign: 'center',
  },
  closeButton: {
    position: 'absolute',
    top: 20,
    right: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#CCC',
    marginBottom: 20
  },
  logo: {
    width: 40,
    height: 40,
    marginRight: 10
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#3F5637'
  },
  box: {
    backgroundColor: 'white',
    padding: 20,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    width: '28%',
    height: 150,
  },
  box2: {
    backgroundColor: 'white',
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    width: '28%',
    height: 150,
    borderWidth: 1,
    borderColor: '#206c00'
  },
});

export default MyComponent;