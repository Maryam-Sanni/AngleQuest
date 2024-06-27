import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import { BlurView } from 'expo-blur';
import { useNavigation } from '@react-navigation/native';

const ScheduledMeetingsTable = () => {

  const ProgressBar = ({ percentage }) => {
    let progressBarColor;
    if (percentage <= 50) {
      progressBarColor = 'coral'; 
    } else if (percentage <= 80) {
      progressBarColor = '#63EC55'; 
    } else {
      progressBarColor = '#206C00'; 
    }

    return (
      <View style={styles.progressBarContainer}>
        <View style={[styles.progressBar, { width: `${percentage}%`, backgroundColor: progressBarColor }]} />
        <Text style={styles.progressText}>{percentage}%</Text>
      </View>
    );
  };


  return (
    <View style={styles.greenBox}>
      <BlurView intensity={100} style={styles.blurBackground}>
        <View style={styles.table}>
          <View style={styles.row}>
            <View style={styles.cell}>
              <Text style={{ fontWeight: '600', fontSize: 14 }}>Angle Badge</Text>
            </View>
            <View style={styles.cell}>
              <Text style={{ fontWeight: '600', fontSize: 14 }}>Target</Text>
            </View>
            <View style={styles.cell}>
              <Text style={{ fontWeight: '600', fontSize: 14 }}>Growth Plan</Text>
            </View>
            <View style={styles.cell}>
              <Text style={{ fontWeight: '600', fontSize: 14 }}>Career Advice</Text>
            </View>
            <TouchableOpacity style={styles.cell} >
              <Text style={{ fontWeight: '600', fontSize: 14 }}>Hub's Attendance</Text>
           </TouchableOpacity>
          </View>

          <View style={styles.row}>
            <View style={styles.cell2}>
              <ProgressBar percentage={67} />
            </View>
            <View style={styles.cell2}>
              <ProgressBar percentage={78} />
            </View>
            <View style={styles.cell2}>
              <ProgressBar percentage={30} />
            </View>
            <View style={styles.cell2}>
              <ProgressBar percentage={45} />
            </View>
            <TouchableOpacity style={styles.cell2} >
              <ProgressBar percentage={80} />
            </TouchableOpacity>
          </View>

          <Text style={styles.heading}>Target</Text>
      
      <View style={styles.row}>
     <View style={styles.cell}>
          <Text style = {{fontWeight: 'bold' }}>Guide 1</Text>
        </View>
        <View style={[styles.cell, { flex: 8 }]}>
        <ProgressBar percentage={70} />
        </View>
      </View>
      <View style={styles.row}>
     <View style={styles.cell}>
          <Text style = {{fontWeight: 'bold' }}>Guide 2</Text>
        </View>
        <View style={[styles.cell, { flex: 8 }]}>
        <ProgressBar percentage={90} />
        </View>
         </View>
      <View style={styles.row}>
     <View style={styles.cell}>
         <Text style = {{fontWeight: 'bold' }}>Guide 3</Text>
        </View>
        <View style={[styles.cell, { flex: 8 }]}>
        <ProgressBar percentage={60} />
        </View>
      </View>
      <View style={styles.row}>
     <View style={styles.cell}>
         <Text style = {{fontWeight: 'bold' }}>Guide 4</Text>
        </View>
        <View style={[styles.cell, { flex: 8 }]}>
        <ProgressBar percentage={80} />
        </View>
      </View>
      <View style={styles.row}>
     <View style={styles.cell}>
          <Text style = {{fontWeight: 'bold' }}>Guide 5</Text>
        </View>
        <View style={[styles.cell, { flex: 8 }]}>
        <ProgressBar percentage={70} />
        </View>
      </View>     
      <Text style={styles.heading2}>Growth Plan Performance</Text>

<View style={styles.row}>
<View style={styles.cell}>
    <Text style = {{fontWeight: 'bold' }}>Guide 1</Text>
  </View>
  <View style={[styles.cell, { flex: 8 }]}>
  <ProgressBar percentage={75} />
  </View>
</View>
<View style={styles.row}>
<View style={styles.cell}>
    <Text style = {{fontWeight: 'bold' }}>Guide 2</Text>
  </View>
  <View style={[styles.cell, { flex: 8 }]}>
  <ProgressBar percentage={31} />
  </View>
   </View>
<View style={styles.row}>
<View style={styles.cell}>
   <Text style = {{fontWeight: 'bold' }}>Guide 3</Text>
  </View>
  <View style={[styles.cell, { flex: 8 }]}>
  <ProgressBar percentage={63} />
  </View>
</View>
<View style={styles.row}>
<View style={styles.cell}>
   <Text style = {{fontWeight: 'bold' }}>Guide 4</Text>
  </View>
  <View style={[styles.cell, { flex: 8 }]}>
  <ProgressBar percentage={40} />
  </View>
</View>
<View style={styles.row}>
<View style={styles.cell}>
    <Text style = {{fontWeight: 'bold' }}>Guide 5</Text>
  </View>
  <View style={[styles.cell, { flex: 8 }]}>
  <ProgressBar percentage={90} />
  </View>
</View>

  <Text style={styles.heading2}>Career Advice Performance</Text>

  <View style={styles.row}>
<View style={styles.cell}>
    <Text style = {{fontWeight: 'bold' }}>Topic 1</Text>
  </View>
  <View style={[styles.cell, { flex: 8 }]}>
  <ProgressBar percentage={30} />
  </View>
</View>
<View style={styles.row}>
<View style={styles.cell}>
    <Text style = {{fontWeight: 'bold' }}>Topic 2</Text>
  </View>
  <View style={[styles.cell, { flex: 8 }]}>
  <ProgressBar percentage={70} />
  </View>
   </View>
<View style={styles.row}>
<View style={styles.cell}>
   <Text style = {{fontWeight: 'bold' }}>Topic 3</Text>
  </View>
  <View style={[styles.cell, { flex: 8 }]}>
  <ProgressBar percentage={100} />
  </View>
</View>
<View style={styles.row}>
<View style={styles.cell}>
   <Text style = {{fontWeight: 'bold' }}>Topic 4</Text>
  </View>
  <View style={[styles.cell, { flex: 8 }]}>
  <ProgressBar percentage={50} />
  </View>
</View>
<View style={styles.row}>
<View style={styles.cell}>
    <Text style = {{fontWeight: 'bold'}}>Topic 5</Text>
  </View>
  <View style={[styles.cell, { flex: 8 }]}>
  <ProgressBar percentage={90} />
  </View>
</View>

<Text style={styles.heading3}>Hub Performance</Text>

<View style={styles.row}>
<View style={styles.cell}>
<Text style = {{fontWeight: 'bold' }}>Topic 1</Text>
</View>
<View style={[styles.cell, { flex: 8 }]}>
<ProgressBar percentage={50} />
</View>
</View>
<View style={styles.row}>
<View style={styles.cell}>
<Text style = {{fontWeight: 'bold' }}>Topic 2</Text>
</View>
<View style={[styles.cell, { flex: 8 }]}>
<ProgressBar percentage={50} />
</View>
</View>
<View style={styles.row}>
<View style={styles.cell}>
<Text style = {{fontWeight: 'bold' }}>Topic 3</Text>
</View>
<View style={[styles.cell, { flex: 8 }]}>
<ProgressBar percentage={50} />
</View>
</View>
<View style={styles.row}>
<View style={styles.cell}>
<Text style = {{fontWeight: 'bold' }}>Topic 4</Text>
</View>
<View style={[styles.cell, { flex: 8 }]}>
<ProgressBar percentage={50} />
</View>
</View>
<View style={styles.row}>
<View style={styles.cell}>
<Text style = {{fontWeight: 'bold'}}>Topic 5</Text>
</View>
<View style={[styles.cell, { flex: 8 }]}>
<ProgressBar percentage={50} />
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
    color: "black",
    fontWeight: '600',
    fontSize: 16,
    textAlign: 'flex-start',
  },
  table: {
    marginRight: 50,
    marginTop: 20,
    marginBottom: 20,
    alignContent: 'center',
    justifyContent: 'space-around',
    marginLeft: 50,
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
  greenBox: {
    flex: 2,
    width: "90%",
    height: 550,
    marginLeft: 50,
    backgroundColor: 'rgba(225,225,212,0.3)',
    marginTop: 30,
    borderRadius: 20,
    borderColor: 'rgba(255,255,255,0.5)',
    borderWidth: 1,
  },
  blurBackground: {
    flex: 1,
    borderRadius: 20,
  },
  progressBarContainer: {
    width: '100%',
    height: 20,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
    overflow: 'hidden',
    position: 'relative',
  },
  progressBar: {
    height: '100%',
  },
  progressText: {
    position: 'absolute',
    right: 10,
    color: '#000',
  },
  heading: {
    fontWeight: '500', 
    width: 100, 
    fontSize: 16,
      marginTop: 20, 
      marginBottom: 20, 
      backgroundColor: '#F0FFF0',
       padding: 5,
       textAlign: 'center'
  },
  heading2: {
    fontWeight: '500', 
    width: 240, 
    fontSize: 16,
      marginTop: 20, 
      marginBottom: 20, 
      backgroundColor: '#F0FFF0',
       padding: 5,
       textAlign: 'center'
  },
  heading3: {
    fontWeight: '500', 
    width: 180, 
    fontSize: 16,
      marginTop: 20, 
      marginBottom: 20, 
      backgroundColor: '#F0FFF0',
       padding: 5,
       textAlign: 'center'
  },
  input: {
    outline: 'black',
    borderWidth: 1,
    borderColor: 'black',
    width: 400
  },
});

export default ScheduledMeetingsTable;
