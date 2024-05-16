import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Image, ScrollView } from 'react-native';
 

 const WorkExperience = ({ onClose,
  company,
  setCompany,
  positionHeld,
  setPositionHeld,
  companyFrom,
  setCompanyFrom,
  companyTo,
  setCompanyTo,
  handleSaveEmployment
}) => {

  return (
       <View style={{ flex: 1, backgroundColor: "#F2F2F2", marginLeft: 230, marginTop: 40, alignItems: 'center'  }}>
<View style={styles.greenBox}>
<TouchableOpacity onPress={onClose}>
            <Text style={{ fontSize: 18, color:'grey', marginLeft: 850,fontWeight: 'bold', marginTop: 20}}>
                            ✕
                        </Text>
                        </TouchableOpacity>
    <View style={{ padding: 10 }}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Employment History</Text>
        <TouchableOpacity>
        <Text style={styles.addEmploymentText}>+ Add Another Employment</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.employmentContainer}>
        <Text style={styles.labelText}>Company Name</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Company Name"
          value={company}
          onChangeText={setCompany}
        />
        <Text style={[styles.labelText, styles.marginTop20]}>Position Held</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Position Held"
          value={positionHeld}
          onChangeText={setPositionHeld}
        />
        <Text style={[styles.labelText, styles.marginTop20]}>Description</Text>
        <TextInput
          style={styles.input}
          placeholder="Describe your role there"
          multiline
          value={positionHeld}
          onChangeText={setPositionHeld}
        />
        <View style={[styles.row, styles.marginTop20]}>
          <Text style={styles.labelText}>From</Text>
          <Text style={[styles.labelText, styles.marginRight200]}>To</Text>
        </View>
        <View style={[styles.row, styles.marginTop5]}>
          <TextInput
            style={[styles.input, styles.flex1, styles.marginRight5, styles.padding6]}
            placeholder="DD/MM/YYYY"
            value={companyFrom}
            onChangeText={setCompanyFrom}
          />
          <TextInput
            style={[styles.input, styles.flex1, styles.marginLeft25]}
            placeholder="DD/MM/YYYY"
            value={companyTo}
            onChangeText={setCompanyTo}
          />
        </View>
        <TouchableOpacity
          style={styles.saveButton}
          onPress={handleSaveEmployment}
        >
          <Text style={styles.saveButtonText}>Save</Text>
        </TouchableOpacity>
      </View>
    </View>
    </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 30
  },
  headerText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
    marginLeft: 10
  },
  addEmploymentText: {
    fontSize: 12,
    fontWeight: 'normal',
    color: '#206C00',
    marginRight: 20
  },
  employmentContainer: {
    padding: 8,
    marginTop: 15,
    borderRadius: 5,
    backgroundColor: 'white'
  },
  labelText: {
    fontSize: 14,
    fontWeight: '500',
    color: 'black'
  },
  input: {
    padding: 10,
    marginTop: 5,
    fontWeight: 'normal',
    color: '#6B7280',
    borderWidth: 1,
    borderColor: '#206C00',
    borderRadius: 5
  },
  marginTop20: {
    marginTop: 20
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  marginRight200: {
    marginRight: 200
  },
  marginTop5: {
    marginTop: 5
  },
  flex1: {
    flex: 1
  },
  marginRight5: {
    marginRight: 5
  },
  padding6: {
    padding: 6
  },
  marginLeft25: {
    marginLeft: 25
  },
  saveButton: {
    alignItems: 'center',
    marginTop: 20,
    padding: 10,
    backgroundColor: 'coral',
    borderRadius: 5
  },
  saveButtonText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: 'white'
  },
  greenBox: {
    width: 920,
    height:850,
    backgroundColor: '#F8F8F8',
  },
});

export default WorkExperience;