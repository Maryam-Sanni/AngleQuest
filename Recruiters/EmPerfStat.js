import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Image, ScrollView, Picker } from 'react-native';

function MyComponent({ onClose }) {

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
        <View style={{flexDirection: 'row'}} >
        <Text style={styles.heading2}>Performance Statistics</Text>
        <TouchableOpacity style={styles.PDF} >
<Text style = {{fontSize: 15, color: 'white',}}>Download PDF</Text>
        </TouchableOpacity>
        </View>
        <View style={styles.table}>
          <View style={styles.row}>
            <View style={styles.cell}>
              <Text style={{ fontWeight: '600', fontSize: 14 }}>Name</Text>
            </View>
            <View style={styles.cell}>
              <Text style={{ fontWeight: '600', fontSize: 14 }}>Angle Badge</Text>
            </View>
            <View style={styles.cell}>
              <Text style={{ fontWeight: '600', fontSize: 14 }}>Hub's Attendance</Text>
            </View>
            <View style={styles.cell}>
              <Text style={{ fontWeight: '600', fontSize: 14 }}>Growth Plan</Text>
            </View>
            <View style={styles.cell}>
              <Text style={{ fontWeight: '600', fontSize: 14 }}>Advice</Text>
            </View>
            <View style={styles.cell}>
              <Text style={{ fontWeight: '600', fontSize: 14 }}>Overall Performance</Text>
            </View>
          </View>
          <View style={styles.row}>
            <View style={styles.cell2}>
                <Text style={styles.cellText}>Jacob Ncube</Text>
            </View>
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
            <View style={styles.cell2}>
            <ProgressBar percentage={55} />
            </View>
            </View>
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
    </View>
    </ScrollView>
</View>



);
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        justifyContent: 'space-around',
        marginLeft: 20, marginRight: 20,
      },
      table: {
        marginBottom: 20,
        alignContent: 'center',
        justifyContent: 'space-around',
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
    width: 920,
    height:620,
    backgroundColor: '#F5F5F5',
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
  PDF: {
    height: 40,
    width: 150,
    backgroundColor: 'coral',
    borderColor: 'coral',
    borderWidth: 1, 
    color:'black',
    fontSize: 14,
    alignItems: 'center',
    justifyContent: 'center',
   position: 'absolute',
   right: 5,
    borderRadius: 5, marginLeft: 10, marginTop: 10
  },
});

export default MyComponent;