import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Sidebar from '../components/sidebar';
import Topbar from '../components/topbar';

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

  return (
    <View style={{ height: '100%'}}>
      <Topbar />
      <View style={{ flexDirection: 'row' }}>
        <Sidebar />
    <View style={{ flex: 1, backgroundColor: "white", marginLeft: 250, marginTop: 40  }}>
    <Text style={{ fontSize: 16, color: 'black', fontWeight: 'bold' }}>Growth Plan</Text>
     <Text style={{ fontSize: 14, color: 'black', marginTop: 5 }}>Set a direction by creating a plan and an expert will guide you</Text>
     <View style={{ flexDirection: "row", alignItems: "center", marginTop: 20, marginBottom: 20, flexWrap: "wrap"}}>
     <TouchableOpacity onPress={goToPersonal}  >
<View style={{ justifyContent: "center", width: 200, height: 100, borderRadius: 5, backgroundColor: "#d3f9d8", marginRight: 40, alignItems: 'center' }}>
<Image
              source={{ uri: 'https://cdn.builder.io/api/v1/image/assets/TEMP/96214782d7fee94659d7d6b5a7efe737b14e6f05a42e18dc902e7cdc60b0a37b' }}
              style={{ width: 40, aspectRatio: 1, marginBottom: 10  }}
            />
 <Text style={{ fontSize: 14, color: "black", }}>Personal Development</Text>
</View>
</TouchableOpacity>

<TouchableOpacity onPress={goToTeam} >
<View style={{ justifyContent: "center", width: 200, height: 100, borderRadius: 5, backgroundColor: "#d3f9d8", marginRight: 40,  alignItems: 'center'  }}>
<Image
               source={require ('../assets/team.png') }
              style={{ width: 40, height: 40, marginBottom: 10  }}
            />
<Text style={{ fontSize: 14, color: "black", }}>Team Development</Text>
</View>
</TouchableOpacity>

<TouchableOpacity onPress={goToOrg} >
<View style={{ justifyContent: "center", width: 200, height: 100, borderRadius: 5, backgroundColor: "#d3f9d8", marginRight: 40, alignItems: 'center', borderWidth: 1, borderColor: '#206C00' }}>
<Image
               source={require ('../assets/organization2.png') }
              style={{ width: 40, height: 40, marginBottom: 10  }}
            />
<Text style={{ fontSize: 14, color: "black", }}>Organization Development</Text>
</View>
</TouchableOpacity>

<TouchableOpacity onPress={goToCoach} >
<View style={{ justifyContent: "center", width: 200, height: 100, borderRadius: 5, backgroundColor: "#d3f9d8", marginRight: 40, alignItems: 'center'  }}>
<Image
              source={{ uri: 'https://cdn.builder.io/api/v1/image/assets/TEMP/96214782d7fee94659d7d6b5a7efe737b14e6f05a42e18dc902e7cdc60b0a37b' }}
              style={{ width: 40, aspectRatio: 1, marginBottom: 10  }}
            />
<Text style={{ fontSize: 12, color: "black", }}>Coach Joop Melcher's Assessment</Text>
</View>
</TouchableOpacity>
</View>

 <View style={{ flexDirection: "row", marginBottom: 10}}>
<TouchableOpacity style={styles.buttonDue} >
      <Text style={styles.buttonTextDue}>Due by: 20/Jul/2024</Text>
    </TouchableOpacity>
    <TouchableOpacity style={styles.buttonAcc} >
      <Text style={styles.buttonTextAcc}>Done 1/Jan/2024 | Status: Accomplished</Text>
    </TouchableOpacity>
    <TouchableOpacity style={styles.buttonAcc} >
      <Text style={styles.buttonTextAcc}>Done 31/Mar/2024 | Status: Unccomplished</Text>
    </TouchableOpacity>
</View>

<View style={styles.greenBox}> 
<Text style={{ fontSize: 16, color: 'black', fontWeight: 'bold', marginTop: 20, marginLeft: 50 }}>Organization Development Objectives</Text>

<View style={{ flexDirection: "row", marginBottom: 10}}>
     <Text style={{ fontSize: 14, color: 'black', marginTop: 3, marginLeft: 50   }}>Capture what you would like to improve on within the organization</Text>
     <TouchableOpacity style={styles.buttonNew} >
      <Text style={styles.buttonTextNew}>New +</Text>
    </TouchableOpacity>
</View>


 <View style={styles.container}>
      <View style={styles.row}>
        <View style={styles.cell}>
          <Text>Role</Text>
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
          <Text>Result description</Text>
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
          <Text>How to achieve</Text>
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
          <Text>What do you need to achieve the objective</Text>
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
          <Text>Progress/Level</Text>
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
          <Text>Start Date</Text>
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
          <Text>End Date</Text>
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
          <Text>Feedbacks/remarks (from Coach)</Text>
        </View>
        <View style={styles.cell}><Text style={{ color: 'grey' }}>Read only field Jobseeker</Text>
        </View>
      </View>
    </View>
    </View>

</View>
</View> </View>
);
}

const styles = StyleSheet.create({
  container: {
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
  },
  buttonAcc: {
    borderWidth: 2,
    borderColor: '#CCC',
    padding: 10,
    marginTop: 10,
    marginLeft: 35, 
    paddingHorizontal: 30,
  },
  buttonTextAcc: {
    color: 'black',
    fontSize: 14,
    textAlign: 'center',
  },
  buttonNew: {
    backgroundColor: 'coral',
    padding: 5,
    marginLeft: 350, 
    paddingHorizontal: 20,
    borderRadius: 3, 
    marginTop: -10
  },
  buttonTextNew: {
    color: 'white',
    fontSize: 14,
    textAlign: 'center',
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