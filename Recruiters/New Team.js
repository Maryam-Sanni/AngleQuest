import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Image, Picker, Modal, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { useTranslation } from 'react-i18next';

function MyComponent({ onClose }) {
    const navigation = useNavigation();

    const goToTeams = () => {
      navigation.navigate('Teams');
      onClose();
    };
    const [fontsLoaded]=useFonts({
      "Roboto-Light":require("../assets/fonts/Roboto-Light.ttf")
        })
      const {t}=useTranslation()
    
  return (
        <View style={{ flex: 1, backgroundColor: "#F8F8F8", marginTop: 40, alignItems: 'center' }}>
            <ScrollView contentContainerStyle={{ flexGrow: 1, maxHeight: 500 }}>
          <View style={styles.greenBox}>
            <View style={styles.header}>
              <Image
                source={{ uri: 'https://cdn.builder.io/api/v1/image/assets/TEMP/1f2d38e99b0016f2bd167d2cfd38ff0d43c9f94a93c84b4e04a02d32658fb401?apiKey=7b9918e68d9b487793009b3aea5b1a32&' }}
                style={styles.logo}
              />
              <Text style={styles.headerText}>{t("New Team")}</Text>
              <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                <Text style={{ fontSize: 18, color: '#3F5637', fontWeight: 'bold',fontFamily:"Roboto-Light" }}>
                  ✕
                </Text>
              </TouchableOpacity>
            </View>

            <View style={{ flexDirection: 'row' }}>
              <View style={{ flexDirection: 'column', marginLeft: 20 }}>
                <Text style={{ fontWeight: 'bold', fontSize: 20, marginTop: 5, marginBottom: 20,fontFamily:"Roboto-Light"}}>
                  {t("Create a New Team")}
                </Text>
                <Image
                  source={require('../assets/mang.png')}
                  style={styles.image}
                />
              </View>
              <View style={{ flexDirection: 'column' }}>

              <Text style={{ fontWeight: '500', fontSize: 16, marginLeft: 50, marginTop: 20, marginBottom: 5,fontFamily:"Roboto-Light" }}>
                  {t("Team Name")}
                </Text> 
                <TextInput
                  placeholder=" "
                  style={styles.input}
                />

                <Text style={{ fontWeight: '500', fontSize: 16, marginLeft: 50, marginTop: 20, marginBottom: 5,fontFamily:"Roboto-Light" }}>
                  {t("Team Goals")}
                </Text>
                <TextInput
                  placeholder=" "
                  multiline
                  style={[styles.input, { height: 100 }]}
                />

                <Text style={{ fontWeight: '500', fontSize: 16, marginLeft: 50, marginTop: 20, marginBottom: 5,fontFamily:"Roboto-Light" }}>
                  {t("Specialization")}
                </Text>
                <Picker
                  style={styles.picker}
                >
                  <Picker.Item label="Pick an area of specialization" value="Pick an area of specialization" />
                  <Picker.Item label="Java Engineering" value="Java Engineering" />
                  <Picker.Item label="SAP FI" value="SAP FI" />
                  <Picker.Item label="Microsoft Azure" value="Microsoft Azure" />
                  <Picker.Item label="Dev Ops" value="Dev Ops" />
                  <Picker.Item label="Frontend Development" value="Frontend Development" />
                  <Picker.Item label="Backend Development" value="Backend Development" />
                  <Picker.Item label="Fullstack Development" value="Fullstack Development" />
                  <Picker.Item label="Data Analysis" value="Data Analysis" />
                  <Picker.Item label="UI/UX Design" value="UI/UX Design" />
                </Picker>

                <Text style={{ fontWeight: '500', fontSize: 16, marginLeft: 50, marginTop: 20, marginBottom: 5,fontFamily:"Roboto-Light" }}>
                  {t("Team Lead")}
                </Text>
                <Picker
                  style={styles.picker}
                >
                  <Picker.Item label="Choose a team lead" value="Choose a team lead" />
<Picker.Item label="Monica Jerry" value="Monica Jerry" />
          <Picker.Item label="Will Cooper" value="Will Cooper" />
          <Picker.Item label="John Othega" value="John Othega" />
          <Picker.Item label="Joop Melcher" value="Joop Melcher" />
          <Picker.Item label="Yesuf Gabar" value="Yesuf Gabar" />
</Picker>

                <Text style={{ fontWeight: '500', fontSize: 16, marginLeft: 50, marginTop: 30, marginBottom: 5,fontFamily:"Roboto-Light" }}>
                  {t("Team Target")}
                </Text>
                <Picker
                  style={styles.picker}
                >
                  <Picker.Item label="Junior" value="Junior" />
                  <Picker.Item label="Beginner" value="Beginner" />
                  <Picker.Item label="Medior" value="Medior" />
                  <Picker.Item label="Senior" value="Senior" />
                  <Picker.Item label="Professional" value="Professional" />
                </Picker>

                <TouchableOpacity onPress={goToTeams} style={styles.buttonplus}>
                  <Text style={styles.buttonTextplus}>{t("Create")}</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          </ScrollView>
        </View>
    
  );
}

const styles = StyleSheet.create({
  modalContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
  },
  container: {
    flexDirection: 'column',
    borderWidth: 1,
    borderColor: '#CCC',
    marginRight: 70,
    marginTop: 20,
    marginLeft: 50,
  },
  greenBox: {
    width: 1000,
    height: "100%",
    backgroundColor: '#F8F8F8',
  },
  picker: {
    height: 40,
    width: 450,
    backgroundColor: 'white',
    borderColor: '#206C00',
    borderWidth: 1,
    color: 'black',
    fontSize: 14,
    marginLeft: 50,
    borderRadius: 5,
  },
  buttonplus: {
    backgroundColor: 'coral',
    padding: 5,
    marginTop: 30,
    marginLeft: 400,
    width: 100,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonTextplus: {
    color: 'white',
    fontSize: 14,
    textAlign: 'center',
    fontFamily:'Roboto-Light'
  },
  input: {
    height: 40,
    width: 450,
    backgroundColor: 'white',
    borderColor: '#206C00',
    borderWidth: 1,
    color: 'black',
    fontSize: 14,
    marginLeft: 50,
    borderRadius: 5,
    padding: 10,
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
    marginBottom: 20,
  },
  logo: {
    width: 40,
    height: 40,
    marginRight: 10,
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#3F5637',
    fontFamily:"Roboto-Light"
  },
  image: {
    width: 400,
    height: 400,
    marginRight: 30,
  },
});

export default MyComponent;
