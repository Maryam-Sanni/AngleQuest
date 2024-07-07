import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Image, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Sidebar from '../components/sidebar';
import Topbar from '../components/topbar';
import {useFonts} from "expo-font"
import { useTranslation } from 'react-i18next';


function MyComponent() {
    const navigation = useNavigation();
    
    const goToPersonal = () => {
        navigation.navigate('Personal Development');
      };

      const goToTeam = () => {
        navigation.navigate('Team Development');
      };

      const goToOrg = () => {
        navigation.navigate('Organization Development');
      };
      const goToCoach = () => {
        navigation.navigate('Coach Assessment');
      };
      const [fontsLoaded]=useFonts({
        'Roboto-Light':require("../assets/fonts/Roboto-Light.ttf"),
      })
      const {t}=useTranslation()

  return (
    <View style={{ flex: 1}}>
      <Topbar />
      <View style={{ flexDirection: 'row', flex: 1 }}>
        <Sidebar />
        <ScrollView contentContainerStyle={{ flexGrow: 1, maxHeight: 500 }}>
    <View style={{ flex: 1, backgroundColor: "white", marginLeft: 270, marginTop: 50, alignItems: 'center', marginRight: 100   }}>
    <Text style={{ fontSize: 16, color: 'black', fontWeight: 'bold', marginRight: 830,fontFamily:"Roboto-Light" }}>{t("Growth Plan")}</Text>
     <Text style={{ fontSize: 14, color: 'black', marginTop: 5, marginRight: 540,fontFamily:"Roboto-Light" }}>{t("Set a direction by creating a plan and an expert will guide you")}</Text>
     <View style={{ flexDirection: "row", alignItems: "center", marginTop: 20, marginBottom: 20, flexWrap: "wrap"}}>
     <TouchableOpacity onPress={goToPersonal} >
<View style={{ justifyContent: "center", width: 200, height: 100, borderRadius: 5, backgroundColor: "#d3f9d8", marginRight: 38, marginLeft: 20, alignItems: 'center',  }}>
<Image
              source={{ uri: 'https://cdn.builder.io/api/v1/image/assets/TEMP/96214782d7fee94659d7d6b5a7efe737b14e6f05a42e18dc902e7cdc60b0a37b' }}
              style={{ width: 40, aspectRatio: 1, marginBottom: 10  }}
            />
 <Text style={{ fontSize: 14, color: "black", fontFamily:"Roboto-Light"}}>{t("Personal Development")}</Text>
</View>
</TouchableOpacity>

<TouchableOpacity onPress={goToTeam} >
<View style={{ justifyContent: "center", width: 200, height: 100, borderRadius: 5, backgroundColor: "#d3f9d8", marginRight: 38,  alignItems: 'center', borderWidth: 1, borderColor: '#206C00'   }}>
<Image
               source={require ('../assets/team.png') }
              style={{ width: 40, height: 40, marginBottom: 10  }}
            />
<Text style={{ fontSize: 14, color: "black", fontFamily:"Roboto-Light"}}>{t("Team Development")}</Text>
</View>
</TouchableOpacity>

<TouchableOpacity onPress={goToOrg} >
<View style={{ justifyContent: "center", width: 200, height: 100, borderRadius: 5, backgroundColor: "#d3f9d8", marginRight: 38, alignItems: 'center' }}>
<Image
               source={require ('../assets/organization2.png') }
              style={{ width: 40, height: 40, marginBottom: 10  }}
            />
<Text style={{ fontSize: 14, color: "black",fontFamily:"Roboto-Light" }}>{t("Organization Development")}</Text>
</View>
</TouchableOpacity>

<TouchableOpacity onPress={goToCoach} >
<View style={{ justifyContent: "center", width: 200, height: 100, borderRadius: 5, backgroundColor: "#d3f9d8", marginRight: 38, alignItems: 'center'  }}>
<Image
              source={{ uri: 'https://cdn.builder.io/api/v1/image/assets/TEMP/96214782d7fee94659d7d6b5a7efe737b14e6f05a42e18dc902e7cdc60b0a37b' }}
              style={{ width: 40, aspectRatio: 1, marginBottom: 10  }}
            />
<Text style={{ fontSize: 12, color: "black", fontFamily:"Roboto-Light"}}>{t("Coach")} Joop Melcher's {t("Assessment")}</Text>
</View>
</TouchableOpacity>
</View>

 <View style={{ flexDirection: "row", marginBottom: 10}}>
<TouchableOpacity style={styles.buttonDue} >
      <Text style={styles.buttonTextDue}>Due by: 20/Jul/2024</Text>
    </TouchableOpacity>
    <TouchableOpacity style={styles.buttonAcc} >
      <Text style={styles.buttonTextAcc}>{t("Done")} 1/Jan/2024 | {t("Status: Accomplished")}</Text>
    </TouchableOpacity>
    <TouchableOpacity style={styles.buttonAcc} >
      <Text style={styles.buttonTextAcc}>{t("Done")} 31/Mar/2024 | {t("Status: Unccomplished")}</Text>
    </TouchableOpacity>
</View>

<View style={styles.greenBox}> 
<Text style={{ fontSize: 16, color: 'black', fontWeight: 'bold', marginTop: 20, marginLeft: 50,fontFamily:"Roboto-Light" }}>{t("Team Development Objectives")}</Text>

<View style={{ flexDirection: "row", marginBottom: 10}}>
     <Text style={{ fontSize: 14, color: 'black', marginTop: 3, marginLeft: 50,fontFamily:"Roboto-Light"   }}>{t("Capture what you would like to improve on or within the team")}</Text>
     <TouchableOpacity style={styles.buttonNew} >
      <Text style={styles.buttonTextNew}>{t("New")} +</Text>
    </TouchableOpacity>
</View>


 <View style={styles.container}>
      <View style={styles.row}>
        <View style={styles.cell}>
          <Text style={{fontFamily:"Roboto-Light"}}>{t("Role")}</Text>
        </View>
        <View style={styles.cell}>
           <TextInput
            placeholder="SAP FI"
            placeholderTextColor="grey"
            style={styles.input}
          />
        </View>
      </View>
      <View style={styles.row}>
        <View style={styles.cell}>
          <Text style={{fontFamily:"Roboto-Light"}}>{t("Result description")}</Text>
        </View>
        <View style={styles.cell}>
        <TextInput
            placeholder="To be able to find my way around SAP fi"
            placeholderTextColor="grey"
            style={styles.input}
          />
        </View>
      </View>
      <View style={styles.row}>
        <View style={styles.cell}>
          <Text style={{fontFamily:"Roboto-Light"}}>{t("How to achieve")}</Text>
        </View>
        <View style={styles.cell}>
        <TextInput
            placeholder="To be taught how to troubleshoot"
            placeholderTextColor="grey"
            style={styles.input}
          />
        </View>
      </View>
      <View style={styles.row}>
        <View style={styles.cell}>
          <Text style={{fontFamily:"Roboto-Light"}}>{t("What do you need to achieve the objective")}</Text>
        </View>
        <View style={styles.cell}>
          <TextInput
            placeholder="Continous training"
            placeholderTextColor="grey"
            style={styles.input}
          />
        </View>
      </View>
      <View style={styles.row}>
        <View style={styles.cell}>
          <Text style={{fontFamily:"Roboto-Light"}}>{t("Progress/Level")}</Text>
        </View>
        <View style={styles.cell}>
         <TextInput
            placeholder="Beginner"
            placeholderTextColor="grey"
            style={styles.input}
          />
        </View>
      </View>
      <View style={styles.row}>
        <View style={styles.cell}>
          <Text style={{fontFamily:"Roboto-Light"}}>{t("Start Date")}</Text>
        </View>
        <View style={styles.cell}>
        <TextInput
            placeholder="1/April/2024"
            placeholderTextColor="grey"
            style={styles.input}
          />
        </View>
      </View>
      <View style={styles.row}>
        <View style={styles.cell}>
          <Text style={{fontFamily:"Roboto-Light"}}>{t("End Date")}</Text>
        </View>
        <View style={styles.cell}>
        <TextInput
            placeholder="20/Jul/2024"
            placeholderTextColor="grey"
            style={styles.input}
          />
        </View>
      </View>
      <View style={styles.row}>
        <View style={styles.cell}>
          <Text style={{fontFamily:"Roboto-Light"}}>{t("Feedbacks/remarks (from Coach)")}</Text>
        </View>
        <View style={styles.cell}><Text style={{ color: 'grey' }}>{t("Read only field Jobseeker")}</Text>
        </View>
      </View>
    </View>
    </View>

</View>
</ScrollView>
</View></View>
);
}

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    flexDirection: 'column',
    borderWidth: 1,
    borderColor: '#CCC',
    marginRight: 70, 
    marginTop: 10, 
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
  buttonDue: {
    borderWidth: 2,
    borderColor: 'coral',
    padding: 10,
    paddingHorizontal: 40,
    marginTop: 10,
  },
  buttonTextDue: {
    color: 'black',
    fontSize: 14,
    textAlign: 'center',
    fontFamily:"Roboto-Light"
  },
  buttonAcc: {
    borderWidth: 2,
    borderColor: '#CCC',
    padding: 10,
    marginTop: 10,
    marginLeft: 35, 
    paddingHorizontal: 30,
    fontFamily:"Roboto-Light"
  },
  buttonTextAcc: {
    color: 'black',
    fontSize: 14,
    textAlign: 'center',
    fontFamily:"Roboto-Light"
  },
  buttonNew: {
    backgroundColor: 'coral',
    padding: 5,
    marginLeft: 335, 
    paddingHorizontal: 20,
    borderRadius: 3, 
    marginTop: -10
  },
  buttonTextNew: {
    color: 'white',
    fontSize: 14,
    textAlign: 'center',
    fontFamily:"Roboto-Light"
  },
  greenBox: {
    width: 920,
    height: 370,
    backgroundColor: '#E1FFD4',
  },
  input: {
    outline: 'none',
  },
});

export default MyComponent;