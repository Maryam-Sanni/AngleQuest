import React, { useState } from 'react';
import { View, Text, TextInput, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Top from '../components/top';
import { useFonts } from 'expo-font';
import { useTranslation } from 'react-i18next';


function MyComponent() {
  const navigation = useNavigation();

  const [about, setAbout] = useState('');
  const [degree, setDegree] = useState('');
  const [university, setUniversity] = useState('');
  const [degreeFrom, setDegreeFrom] = useState('');
  const [degreeTo, setDegreeTo] = useState('');
  const [company, setCompany] = useState('');
  const [positionHeld, setPositionHeld] = useState('');
  const [companyFrom, setCompanyFrom] = useState('');
  const [companyTo, setCompanyTo] = useState('');

  const handleSaveEducation = () => {
    console.log('About:', about);
    console.log('Degree:', degree);
    console.log('University:', university);
    console.log('Degree From:', degreeFrom);
    console.log('Degree To:', degreeTo);
  };

  const handleSaveEmployment = () => {
    console.log('Company:', company);
    console.log('Position Held:', positionHeld);
    console.log('Company From:', companyFrom);
    console.log('Company To:', companyTo);
  };

  const handleSaveAndContinue = () => {
    navigation.navigate('Job Preferences');
  };

  const handlePreviousPage = () => {
    navigation.navigate('Basic Details'); // Navigating to the "Basic Details" page
  };
  const [fontsLoaded]=useFonts({
    "Roboto-Light":require("../assets/fonts/Roboto-Light.ttf"),
      })
      const {t}=useTranslation()

  return (
    <View style={{ height: '68%' }}>
    <Top/ >
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'white', marginLeft: 400, marginRight: 400 }}>
    <View style={{ flexDirection: 'row', marginTop: 5, marginBottom: 10, alignItems: 'center', justifyContent: 'center', }}>
                <View style={{
                  width: 30,
                  height: 30,
                  borderRadius: 40,
                  backgroundColor: '#FFEBCC',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                  <Text style={{ color: 'white', fontSize: 16,fontFamily:"Roboto-Light"  }}>1</Text>
                </View>
                <View style={{ width: 60, height: 2, backgroundColor: '#FFEBCC', marginTop: 4, marginLeft: 5 }} />
                <View style={{
                  width: 30,
                  height: 30,
                  borderRadius: 40,
                  backgroundColor: 'coral',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginLeft: 5,
                }}>
                  <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold',fontFamily:"Roboto-Light"   }}>2</Text>
                </View>
                <View style={{ width: 60, height: 2, backgroundColor: '#FFEBCC', marginTop: 4, marginLeft: 5 }} />
                <View style={{
                  width: 30,
                  height: 30,
                  borderRadius: 40,
                  backgroundColor: '#FFEBCC',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginLeft: 5,
                }}>
                  <Text style={{ color: 'white', fontSize: 16,fontFamily:"Roboto-Light"   }}>3</Text>
                </View>
                <View style={{ width: 60, height: 2, backgroundColor: '#FFEBCC', marginTop: 4, marginLeft: 5 }} />
                <View style={{
                  width: 30,
                  height: 30,
                  borderRadius: 40,
                  backgroundColor: '#FFEBCC',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginLeft: 5,
                }}>
                  <Text style={{ color: 'white', fontSize: 18,fontFamily:"Roboto-Light"   }}>4</Text>
                </View>
              </View>
        <Text style={{ marginLeft: -300, marginTop: 20, marginBottom: 10, fontSize: 18, fontWeight: 'bold', color: 'coral',fontFamily:"Roboto-Light"   }}>{t("Education & Work Experience")}</Text>
        <View style={{ width: '100%', maxWidth: 1000 }}>
          <Text style={{ marginTop: 10, fontSize: 14, fontWeight: '600', color: 'black',fontFamily:"Roboto-Light"   }}>{t("About")}</Text>
          <View style={{ marginTop: 3.5, padding: 6, paddingTop: 8, paddingBottom: 60, backgroundColor: '#F4F4F4', borderRadius: 5 }}>
            <TextInput
              style={{ padding: 6, marginTop: 2.5, fontSize: 12, fontWeight: 'normal', color: '#6B7280', borderWidth: 1, outline: 'none', borderColor: '#F4F4F4', borderRadius: 5,fontFamily:"Roboto-Light"   }}
              placeholder="Type here"
              value={about}
              onChangeText={setAbout}
            />
          </View>

          {/* Education */}
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 14 }}>
            <Text style={{ fontSize: 14, fontWeight: '600', color: 'black',fontFamily:"Roboto-Light"   }}>{t("Education")}</Text>
            <Text style={{ fontSize: 12, fontWeight: 'normal', color: '#206C00',fontFamily:"Roboto-Light"   }}>+ {t("Add Another Education")}</Text>
          </View>
          <View style={{ padding: 10, marginTop: 3.5, borderRadius: 5, backgroundColor: 'white' }}>
            <Text style={{ fontSize: 12, fontWeight: 'normal', color: 'black',fontFamily:"Roboto-Light"   }}>{t("Degree")}</Text>
            <TextInput
              style={{ padding: 10, marginTop: 2.5, fontSize: 12, fontWeight: 'normal', color: '#6B7280', borderWidth: 1, borderColor: 'black', borderRadius: 5,fontFamily:"Roboto-Light"   }}
              placeholder="Enter Degree"
              value={degree}
              onChangeText={setDegree}
            />
            <Text style={{ fontSize: 12, fontWeight: 'normal', color: 'black', marginTop: 10,fontFamily:"Roboto-Light"   }}>{t("University")}</Text>
            <TextInput
              style={{ padding: 10, marginTop: 2.5, fontSize: 12, fontWeight: 'normal', color: 'grey', borderWidth: 1, borderColor: 'black', borderRadius: 5,fontFamily:"Roboto-Light"   }}
              placeholder="Enter University"
              value={university}
              onChangeText={setUniversity}
            />
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>
              <Text style={{ fontSize: 10, fontWeight: 'normal', color: 'black',fontFamily:"Roboto-Light"   }}>{t("From")}</Text>
              <Text style={{ fontSize: 10, fontWeight: 'normal', color: 'black', marginRight: 275,fontFamily:"Roboto-Light"   }}>{t("To")}</Text>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 5 }}>
              <TextInput
                style={{ padding: 10, flex: 1, marginRight: 5, fontSize: 12, fontWeight: 'normal', color: '#6B7280', borderWidth: 1, borderColor: 'black', borderRadius: 5,fontFamily:"Roboto-Light"   }}
                placeholder="DD/MM/YYYY"
                value={degreeFrom}
                onChangeText={setDegreeFrom}
              />
              <TextInput
                style={{ padding: 10, flex: 1, marginLeft: 5, fontSize: 12, fontWeight: 'normal', color: '#6B7280', borderWidth: 1, borderColor: 'black', borderRadius: 5,fontFamily:"Roboto-Light"   }}
                placeholder="DD/MM/YYYY"
                value={degreeTo}
                onChangeText={setDegreeTo}
              />
            </View>
            <TouchableOpacity
              style={{ marginRight: 400, alignItems: 'center', marginTop: 20, padding: 10, backgroundColor: 'coral', borderRadius: 5 }}
              onPress={handleSaveEducation}
            >
              <Text style={{ fontSize: 12, fontWeight: 'bold', color: 'white',fontFamily:"Roboto-Light"   }}>{t("Save")}</Text>
            </TouchableOpacity>
          </View>

          {/* Employment */}
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 14 }}>
            <Text style={{ fontSize: 14, fontWeight: '600', color: 'black',fontFamily:"Roboto-Light"   }}>{t("Work Experience")}</Text>
            <Text style={{ fontSize: 12, fontWeight: 'normal', color: '#206C00',fontFamily:"Roboto-Light"   }}>+ {t("Add Another Employment")}</Text>
          </View>
          <View style={{ padding: 8, marginTop: 3.5, borderRadius: 5, backgroundColor: 'white' }}>
            <Text style={{ fontSize: 12, fontWeight: 'normal', color: 'black',fontFamily:"Roboto-Light"   }}>{("Company Name")}</Text>
            <TextInput
              style={{ padding: 10, marginTop: 2.5, fontSize: 12, fontWeight: 'normal', color: '#6B7280', borderWidth: 1, borderColor: 'black', borderRadius: 5,fontFamily:"Roboto-Light"   }}
              placeholder="Enter Company Name"
              value={company}
              onChangeText={setCompany}
            />
            <Text style={{ fontSize: 12, fontWeight: 'normal', color: 'black', marginTop: 10,fontFamily:"Roboto-Light"   }}>{t("Position Held")}</Text>
            <TextInput
              style={{ padding: 10, marginTop: 2.5, fontSize: 12, fontWeight: 'normal', color: '#6B7280', borderWidth: 1, borderColor: 'black', borderRadius: 5,fontFamily:"Roboto-Light"   }}
              placeholder="Enter Position Held"
              value={positionHeld}
              onChangeText={setPositionHeld}
            />
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>
              <Text style={{ fontSize: 10, fontWeight: 'normal', color: 'black',fontFamily:"Roboto-Light"   }}>{t("From")}</Text>
              <Text style={{ fontSize: 10, fontWeight: 'normal', color: 'black', marginRight: 265,fontFamily:"Roboto-Light"   }}>{t("To")}</Text>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 5 }}>
              <TextInput
                style={{ padding: 6, flex: 1, marginRight: 5, fontSize: 12, fontWeight: 'normal', color: '#6B7280', borderWidth: 1, borderColor: 'black', borderRadius: 5,fontFamily:"Roboto-Light" }}
                placeholder="DD/MM/YYYY"
                value={companyFrom}
                onChangeText={setCompanyFrom}
              />
              <TextInput
                style={{ padding: 10, flex: 1, marginLeft: 25, fontSize: 12, fontWeight: 'normal', color: '#6B7280', borderWidth: 1, borderColor: 'black', borderRadius: 5,fontFamily:"Roboto-Light" }}
                placeholder="DD/MM/YYYY"
                value={companyTo}
                onChangeText={setCompanyTo}
              />
            </View>
            <TouchableOpacity
              style={{ alignItems: 'center', marginTop: 20, padding: 10, marginRight: 400, backgroundColor: 'coral', borderRadius: 5 }}
              onPress={handleSaveEmployment}
            >
              <Text style={{ fontSize: 12, fontWeight: 'bold', color: 'white',fontFamily:"Roboto-Light" }}>{t("Save")}</Text>
            </TouchableOpacity>
          </View>

          {/* Save & Continue Button */}
          <View style={{ flexDirection: 'row', marginTop: 10, marginBottom: 10, justifyContent: 'space-between', paddingHorizontal: 20 }}>
            <TouchableOpacity
              style={{
                backgroundColor: '#d3f9d8',
                borderRadius: 10,
                paddingVertical: 10,
                paddingHorizontal: 20,
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
                elevation: 5,
                marginLeft: -10
              }}
             onPress={handlePreviousPage}
            >
              <Text style={{ fontSize: 14, fontWeight: 'bold', color: '#206C00',fontFamily:"Roboto-Light" }}>{t("Previous Page")}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                backgroundColor: 'coral',
                borderRadius: 10,
                paddingVertical: 10,
                paddingHorizontal: 20,
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
                elevation: 5,
                marginLeft: 60,
                marginRight:-10
              }}
              onPress={handleSaveAndContinue}
            >
              <Text style={{ fontSize: 14, fontWeight: 'bold', color: 'white',fontFamily:"Roboto-Light" }}>{t("Save & Continue")}</Text>
            </TouchableOpacity>
          </View>
        </View>
        </View>
      </ScrollView>
    </View>
    
  );
}

export default MyComponent;
