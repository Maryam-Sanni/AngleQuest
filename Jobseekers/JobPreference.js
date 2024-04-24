import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';

function MyComponent() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.headingContainer}>
        <Text style={[styles.heading, styles.coral]}>Job Preferences</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.subheading}>Add Preferred Roles</Text>
        <Text>Add a maximum of 5 job roles you are available for</Text>
        <View style={styles.rolesContainer}>
          <Text style={styles.role}>Microsoft Azure</Text>
          <Text style={styles.role}>+</Text>
          {/* Add more roles here */}
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.infoIcon}>?</Text>
          <Text style={styles.infoText}>Get recommended to Recruiters searching for your role and get notified when jobs are posted</Text>
        </View>
      </View>
      <View style={styles.section}>
        <Text style={styles.subheading}>Add Preferred Countries</Text>
        <Text>Add a maximum of 5 countries you are available to work</Text>
        <View style={styles.countriesContainer}>
          <Text style={styles.country}>United Kingdom</Text>
          <Text style={styles.country}>Netherlands</Text>
            <Text style={styles.role}>+</Text>
          
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.infoIcon}>?</Text>
          <Text style={styles.infoText}>See jobs posted from these countries that match your preferred job roles</Text>
        </View>
      </View>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Save & Continue</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingVertical: 30,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    marginLeft: 300,
    marginRight: 300
  },
  headingContainer: {
    marginBottom: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  section: {
    marginBottom: 20,
  },
  subheading: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  coral: {
    color: 'coral',
  },
  rolesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 15
  },
  role: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    backgroundColor: '#d3f9d8',
    color: '#206C00',
    borderRadius: 50,
    marginRight: 10,
    marginBottom: 10,
  },
  countriesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 15,
  },
  country: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    backgroundColor: '#d3f9d8',
    color: '#206C00',
    borderRadius: 50,
    marginRight: 10,
    marginBottom: 10,
  },
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 0,
    marginTop: 5
  },
  infoIcon: {
    fontSize: 18,
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: '#d3f9d8',
    borderRadius: 50,
  },
  infoText: {
    flex: 1,
    marginLeft: 10,
  },
  button: {
    backgroundColor: 'coral',
    borderRadius: 5,
    padding: 10,
    alignItems: 'center',
    marginTop: 15
  },
  buttonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold'
  },
});

export default MyComponent;
