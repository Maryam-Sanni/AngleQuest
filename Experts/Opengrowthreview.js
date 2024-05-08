import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Image, ScrollView } from 'react-native';

function MyComponent({ onClose }) {

  return (
     
    <View style={{ flex: 1, backgroundColor: "#F8F8F8", marginTop: 40, alignItems: 'center'  }}>
         <ScrollView contentContainerStyle={{ flexGrow: 1, maxHeight: 500 }}>
<View style={styles.greenBox}>
<TouchableOpacity onPress={onClose}>
            <Text style={{ fontSize: 18, color:'grey', marginLeft: 850,fontWeight: 'bold', marginTop: -20}}>
                            ✕
                        </Text>
                        </TouchableOpacity>
                        <Text style={{marginLeft: 730, marginTop: 20, marginBottom: -15, width: 200, fontWeight: '600'}}>Uneditable Section</Text>
 <View style={styles.container}>
      <View style={styles.row}>
        <View style={styles.cell}>
          <Text style = {{fontWeight: 'bold'}}>Full Name</Text>
        </View>
        <View style={styles.cell}>
        <Text style={{color: 'grey'}}> Maryam Bakahali</Text>
           
        </View>
      </View>
      <View style={styles.row}>
        <View style={styles.cell}>
          <Text style = {{fontWeight: 'bold'}}>Level</Text>
        </View>
        <View style={styles.cell}>
        <Text style={{color: 'grey'}}>Junior</Text>
        </View>
      </View>
      <View style={styles.row}>
        <View style={styles.cell}>
         <Text style = {{fontWeight: 'bold'}}>Profile</Text>
        </View>
        <View style={styles.cell}>
        <TouchableOpacity>
         <Text style={{color: 'green', textDecoration: 'underline'}}> MaryamBakahaliCV.pdf</Text>
         </TouchableOpacity>
        </View>
      </View>
      <View style={styles.row}>
        <View style={styles.cell}>
         <Text style = {{fontWeight: 'bold'}}>Growth Plan Type</Text>
        </View>
        <View style={styles.cell}>
           <Text style={{color: 'grey'}}>Corporate</Text>
        </View>

      </View>
      
 </View>
 <Text style={{marginLeft: 730, marginTop: 20, marginBottom: -30, width: 200, fontWeight: '600'}}>Uneditable Section</Text>s
       <View style={styles.container}>
      <View style={styles.row}>
        <View style={styles.cell}>
          <Text style = {{fontWeight: 'bold'}}>Result Description</Text>
        </View>
        <View style={styles.cell}>
          <Text style={{color: 'grey'}}>To be able to find my way around SAP FI</Text>
        </View>
        </View>
        <View style={styles.row}>
        <View style={styles.cell}>
          <Text style = {{fontWeight: 'bold'}}>How to achieve</Text>
        </View>
        <View style={styles.cell}>
          <Text style={{color: 'grey'}}>To be taught to troubleshoot, find 'codes, navigate the system</Text>
        </View>
        </View>
    <View style={styles.row}>
        <View style={styles.cell}>
          <Text style = {{fontWeight: 'bold'}}>Anticipated Progress (Target)</Text>
        </View>
        <View style={styles.cell}>
          <Text style={{color: 'grey'}}>I want to be able to lead a a project</Text>
        </View>
        </View>
    <View style={styles.row}>
        <View style={styles.cell}>
          <Text style = {{fontWeight: 'bold'}}>What do you need to achieve this objective?</Text>
        </View>
        <View style={styles.cell}>
          <Text style={{color: 'grey'}}>Continuous training, practice and support</Text>
        </View>
        </View>
 <View style={styles.row}>
        <View style={styles.cell}>
          <Text style = {{fontWeight: 'bold'}}>Progress/Level</Text>
        </View>
        <View style={styles.cell}>
          <Text style={{color: 'grey'}}>Goal Setting Stage</Text>
        </View>
        </View>
 <View style={styles.row}>
        <View style={styles.cell}>
          <Text style = {{fontWeight: 'bold'}}>Goal Timeline</Text>
        </View>
        <View style={styles.cell}>
          <Text style={{color: 'grey'}}>Start Date-End Date</Text>
        </View>
        </View>
        </View>
<Text style={{ marginTop: 20, fontWeight: 'bold', color: 'black', marginLeft: 50 }}> Your Feedback/Remark</Text>
              <View style={{ marginTop: 3.5, padding: 6, paddingTop: 8, paddingBottom: 100, backgroundColor: 'none', borderWidth: 2, borderColor: '#CCC', marginLeft: 50, marginRight: 70 }}>
                <TextInput
                  style={{ padding: 6, marginTop: 2.5, fontSize: 14, fontWeight: 'normal', color: '#6B7280', borderWidth: 1, outline: 'black', borderColor: 'black',}}
                  placeholder="e.g: Your goals and its description are clear and concise. Well done for that. I am satisfied with this set goals and I am more than happy to work with you to the finish line.  See you in our one-one session where I'll share further tips on how to achieve this feat and above all meet you."
                />
                </View>
<View style={{ flexDirection: "row", marginBottom: 10}}>
    <TouchableOpacity style={styles.buttonAcc} >
      <Text style={styles.buttonTextAcc}>Satisfied, Proceed</Text>
    </TouchableOpacity>
    <TouchableOpacity style={styles.buttonAcc2} >
      <Text style={styles.buttonTextAcc2}>Not satisfied, replan</Text>
    </TouchableOpacity>
</View>
 
    </View>
    </ScrollView>
</View>



);
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    borderWidth: 1,
    borderColor: '#CCC',
    marginRight: 70, 
    marginTop: 20, 
    marginLeft: 50 
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
    backgroundColor: '#F8F8F8',
    marginTop: 40
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
});

export default MyComponent;