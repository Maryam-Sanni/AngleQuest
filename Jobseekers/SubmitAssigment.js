import React, { useState, useEffect } from 'react'; 
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Image, ScrollView, Picker } from 'react-native';
import { useFonts } from 'expo-font';
import { useTranslation } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import CustomAlert from '../components/CustomAlert';
import { MaterialIcons } from '@expo/vector-icons';


function MyComponent({ onClose }) {
  const [guides, setGuides] = useState([]);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [remark, setRemark] = useState('');
  const [rating, setRating] = useState('Replan');
   const [completed, setCompleted] = useState('Yes');
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState('')     
  const [isVisible, setIsVisible] = useState(true); 
   const [data, setData] = useState(null);
  const [isChecked, setIsChecked] = useState(false);

  const [fontsLoaded]=useFonts({
    "Roboto-Light":require("../assets/fonts/Roboto-Light.ttf"),
        })
        const {t}=useTranslation()

  const handlePress = () => {

    onClose();
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const retrievedData = await AsyncStorage.getItem('selectedAssignment');
        if (retrievedData) {
          const parsedData = JSON.parse(retrievedData);
          setData(parsedData); 
        } else {
          console.log('No data found in AsyncStorage.');
        }
      } catch (error) {
        console.error('Failed to retrieve data from AsyncStorage', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const loadFormData = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        if (!token) throw new Error('No token found');

        const response = await axios.get('https://recruitangle.com/api/expert/growthplan/get', {
          headers: { Authorization: `Bearer ${token}` }
        });

        if (response.status === 200 && response.data.status === 'success') {
          const data = response.data.growthPlan;
          setGuides(data.guides || []);
        } else {
          console.error('Failed to fetch data', response);
        }
      } catch (error) {
        console.error('Failed to load form data', error);
      }
    };

const retrieveExpertName = async () => {
  try {
    const storedFirstName = await AsyncStorage.getItem('first_name');
    const storedLastName = await AsyncStorage.getItem('last_name');
    if (storedFirstName && storedLastName) {
      setFirstName(storedFirstName);
      setLastName(storedLastName);
    }
  } catch (error) {
    console.error('Error retrieving data from AsyncStorage:', error);
  }
};

loadFormData();
retrieveExpertName();
}, []);

const handleGuideChange = (index, field, value) => {
const newGuides = [...guides];
newGuides[index] = { ...newGuides[index], [field]: value };
setGuides(newGuides);
};

const handleMarkAsCompleted = async () => {
  if (!remark || !guides || !rating ) {
    setAlertMessage(t('Please fill all fields'));
    setAlertVisible(true);
    return;
  }

  setIsChecked(!isChecked);

try {
  const token = await AsyncStorage.getItem('token');
  if (!token) throw new Error('No token found');

  const payload = {
     jobseeker_id: data?.user_id, // Convert jobseeker_id to a string
    growth_plan_id: String(data?.id),
    coach: data?.name,
    remark: remark,
    expert_name: `${firstName} ${lastName}`,
    rating: rating,
    completed: completed,
    title: data?.title,
    role: data?.role,
    date: data?.date_time,
    performance_rating: rating,
    descriptions: guides.map(guide => ({
      description: guide.guide,
      percentage: guide.percentage,
    })),
  };

  const response = await axios.post('https://recruitangle.com/api/expert/feedback-growthPlan', payload, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (response.status === 201 && response.data.status === 'success') {
    console.log('Marked as completed successfully');
  } else {
    console.error('Failed to mark as completed', response);
  }
} catch (error) {
  console.error('Error marking as completed', error);
}

};

  const hideAlert = () => {
    setAlertVisible(false);
  };

  if (!isVisible) {
    return null; // Return null to unmount the parent component
  }

  return ( 
    <View style={{ flex: 1, backgroundColor: "#F8F8F8", marginTop: 40, alignItems: 'center',  }}>
    <ScrollView contentContainerStyle={{ flexGrow: 1, maxHeight: 500 }}>

<View style={styles.greenBox}>
<View style={styles.header}>
          <Image
            source={{ uri: 'https://cdn.builder.io/api/v1/image/assets/TEMP/1f2d38e99b0016f2bd167d2cfd38ff0d43c9f94a93c84b4e04a02d32658fb401?apiKey=7b9918e68d9b487793009b3aea5b1a32&' }} // replace with your logo URL
            style={styles.logo}
          />
          <Text style={styles.headerText}>{t("Submit Assignment")}</Text>

        <TouchableOpacity onPress={onClose} style={styles.closeButton}>
          <Text style={{ fontSize: 18, color: '#3F5637', fontWeight: 'bold',fontFamily:"Roboto-Light"}}>
            ✕
          </Text>
        </TouchableOpacity>
        </View>
                        <Text style={{marginLeft: 730, marginTop: 20, marginBottom: -15, width: 200, fontWeight: '600'}}>{t("Uneditable Section")}</Text>
 <View style={styles.container}>
      <View style={styles.row}>
        <View style={styles.cell}>
          <Text style = {{fontWeight: 'bold',fontFamily:"Roboto-Light"}}>{t("Topic")}</Text>
        </View>
        <View style={styles.cell}>
        <Text style={{color: 'grey',fontFamily:"Roboto-Light"}}>{data?.topic}</Text>

        </View>
      </View>
      <View style={styles.row}>
        <View style={styles.cell}>
          <Text style = {{fontWeight: 'bold',fontFamily:"Roboto-Light"}}>{t("Due Date")}</Text>
        </View>
        <View style={styles.cell}>
        <Text style={{color: 'grey',fontFamily:"Roboto-Light"}}>{data?.assignment_due}</Text>
        </View>
      </View>
      <View style={styles.row}>
        <View style={styles.cell2}>
          <Text style = {{fontWeight: 'bold',fontFamily:"Roboto-Light"}}>{t("Description")}</Text>
        </View>
        <View style={styles.cell2}>
          <Text style={{color: 'grey',fontFamily:"Roboto-Light"}}>{data?.description}</Text>
        </View>
        </View>




 </View>
  

<Text style={{ marginTop: 50, fontWeight: 'bold', color: 'black', marginLeft: 50  }}> {t("Complete Your Assignment")}</Text>
              <View style={{ marginLeft: 50, marginRight: 70, marginTop: 5 }}>
                <TextInput
                  style={{ padding: 6, fontSize: 14, fontWeight: 'normal', color: 'black', borderWidth: 1, outline: 'black', borderColor: 'black', height: 300  }}
                  placeholder="Azure Virtual Machines are one of the core offerings in Microsoft's cloud computing platform, providing scalable computing resources on demand. VMs allow you to run various operating systems, including Windows and Linux, and host different workloads like applications, databases, and development environments"
                  value={data?.remark}
                  placeholderTextColor="grey"
                   multiline={true}
                  onChangeText={text => setRemark(text)}
                />
                </View>




  <View style={{flexDirection: 'row'}}>
   

    <TouchableOpacity style={styles.buttonAcc} >
      <Text style={styles.buttonTextAcc}>{t("Submit")}</Text>
    </TouchableOpacity>

  </View>


    </View>
    </ScrollView>
      <CustomAlert
        visible={alertVisible}
        title={t("Alert")}
        message={alertMessage}
        onConfirm={hideAlert}
      />
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
  checkcontainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    marginLeft: 40
  },
    text: {
      fontSize: 16,
      color: 'gray',
    },
    textChecked: {
      color: 'green',
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
  cell2: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#CCC',
    padding: 5,
    height: 100
  },
  greenBox: {
    width: 920,
    height:850,
    backgroundColor: '#F8F8F8',
  },
  picker: {
    height: 20,
    width: '100%',
    backgroundColor: '#F8F8F8',
    borderColor: '#F8F8F8',
    color:'grey',
    fontSize: 14,
    outline: 'black',
    borderWidth: 1,
    borderColor: 'black',
  },
  buttonAcc: {
   backgroundColor: 'coral',
    padding: 10,
    marginTop: 30,
    marginLeft: 700, 
    marginRight: 70,
    width: 150,
    paddingHorizontal: 5,
    marginBottom: 20,
    borderRadius: 5
  },
  buttoncomplete: {
   backgroundColor: 'darkgreen',
    padding: 10,
    marginTop: 30,
    marginLeft: 50, 
    paddingHorizontal: 5,
    marginBottom: 20,
    borderRadius: 5,
     width: 150,
  },
  buttonTextAcc: {
    color: 'white',
    fontSize: 14,
    textAlign: 'center',
    fontFamily:"Roboto-Light"
  },
  input: {
    outline: 'none',
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
    fontSize: 18,
    fontWeight: 'bold',
    color: '#3F5637',
    fontFamily:"Roboto-Light"
  }
});

export default MyComponent;