import React, { useState } from 'react';
import { View, ScrollView, Text, Image, TouchableOpacity, ImageBackground, Modal, TextInput, Picker } from 'react-native';
import Sidebar from '../components/Recruiterssidebar';
import Topbar from '../components/Recruiterstopbar';
import { BlurView } from 'expo-blur';
import AboutEditModal from '../components/AboutEditModal';
import { useFonts } from 'expo-font';
import { useTranslation } from 'react-i18next';


export default function Profile() {
  const [about, setAbout] = useState(`Pretzel Ent. is a dynamic business specializing in connecting companies with top-tier technology talent. With over 10 years of experience in the industry, Pretzel Ent. has built a reputation for providing expert staffing services for a wide range of tech roles, including software developers, cloud architects, data scientists, and cybersecurity specialists.

    Our team is dedicated to understanding the unique needs of each client, ensuring the perfect match between employers and tech professionals. Outside of our core services, Pretzel Ent. is committed to fostering a vibrant tech community through hosting industry events, workshops, and networking opportunities. We also support local tech initiatives and educational programs to inspire the next generation of technology leaders.`);
      const [aboutModalVisible, setAboutModalVisible] = useState(false);

      const handleSaveAbout = (newAbout) => {
        setAbout(newAbout);
      };
 
  const handleChooseImage = (event) => {
    const selectedImage = event.target.files[0];
    const imageUrl = URL.createObjectURL(selectedImage);
    setProfileImage(imageUrl);
  };
  const [fontsLoaded]=useFonts({
"Roboto-Light":require("../assets/fonts/Roboto-Light.ttf")
  })

const {t}=useTranslation()

  return (
    <ImageBackground
    source={require ('../assets/Background.png') }
  style={{ height: '110%', width: '100%',flex: 1}}
>
<BlurView intensity={70} style={{flex:1}}>
    <View style={{ flex: 1 }}>
      <Topbar />
      <View style={{ flexDirection: 'row', flex: 1 }}>
        <Sidebar />
         <ScrollView contentContainerStyle={{ flexGrow: 1, maxHeight: 500 }}>
         <View style={styles.glassBox}>
         <View style={styles.pagecontainer}>
          <View style={{ padding: 20 }}>
            <View style={{ flex: 1 }}>
              {/* Profile Card */}
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 50 }}>
              <View style={{ flex: 1, alignSelf: "flex-start" }}>
        <Text style={{ fontSize: 18, fontWeight: "bold", color: '#206C00', marginBottom: 10,fontFamily:"Roboto-Light" }}>{t("Business Profile")}</Text>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <Image source={require('../assets/tmc.png')}
                    style={{ width: 79, height: 79, borderRadius: 79, marginRight: 20 }}
                    resizeMode="cover"
                  />
                  </View>
                  </View>
                
              </View>
            </View>
          </View>

          {/* Profile Description */}
          <View style={{ marginTop: 20, marginRight: 30 }}>
            <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20}}>
                      <Text style={{ fontSize: 16, textAlign: 'justify', fontWeight: '600', color: '#206C00', fontFamily:"Roboto-Light" }}>
                        {t("About")} </Text> 
                        <TouchableOpacity onPress={() => setAboutModalVisible(true)} style={{ marginLeft: 10 }}>
                        <Image
            source={{ uri: 'https://cdn.builder.io/api/v1/image/assets/TEMP/6326875147d814303309b6b133e12c983f42b31e7c4e6b223f7fbc169c262b88?apiKey=7b9918e68d9b487793009b3aea5b1a32&' }}
            style={{ width: 20, height: 20 }} // adjust width and height as needed
            resizeMode="cover" // or any other resizeMode that suits your need
          />
                        </TouchableOpacity> 
                       </View>
                      <Text style={{ fontSize: 14, textAlign: 'justify', fontFamily: "Roboto-Light" }}>{t("about")}t</Text>
                
              <View style={{ borderBottomWidth: 1, borderBottomColor: '#CCC', marginTop: 30 }} />
            </View>

         
          <View style={{ marginLeft: 10, marginTop: 20 }}>
              <Text style={{ fontSize: 16, fontWeight: '600', color: '#206C00', marginLeft: 10,fontFamily: "Roboto-Light"}}>{t("Business Name")}</Text>
              <TextInput style={styles.text}
               placeholder="Pretzel Enterrprise"/>
              </View>
              <View style={{ borderBottomWidth: 1, borderBottomColor: '#ccc', marginTop: 20 }} />
              <View style={{ marginLeft: 10, marginTop: 20 }}>
              <Text style={{ fontSize: 16, fontWeight: '600', color: '#206C00', marginLeft: 10,fontFamily: "Roboto-Light"}}>{t("Business Email")}</Text>
              <TextInput style={styles.text}
               placeholder="pretzel@hotmail.com"/>
              </View>
              <View style={{ borderBottomWidth: 1, borderBottomColor: '#ccc', marginTop: 20 }} />
              <View style={{ marginLeft: 10, marginTop: 20 }}>
              <Text style={{ fontSize: 16, fontWeight: '600', color: '#206C00', marginLeft: 10,fontFamily: "Roboto-Light"}}>{t("Address")}</Text>
              <TextInput style={styles.text}
               placeholder="2576 Elmore Rd Wetumpka"/>
              </View>
              <View style={{ borderBottomWidth: 1, borderBottomColor: '#ccc', marginTop: 20 }} />
              <View style={{ marginLeft: 10, marginTop: 20 }}>
              <Text style={{ fontSize: 16, fontWeight: '600', color: '#206C00', marginLeft: 10,fontFamily: "Roboto-Light"}}>{t("Country")}</Text>
              <TextInput style={styles.text}
               placeholder="United States"/>
              </View>
              <View style={{ borderBottomWidth: 1, borderBottomColor: '#ccc', marginTop: 20 }} />
              <View style={{ marginLeft: 10, marginTop: 20 }}>
              <Text style={{ fontSize: 16, fontWeight: '600', color: '#206C00', marginLeft: 10,fontFamily: "Roboto-Light"}}>{t("State or Province")}</Text>
              <TextInput style={styles.text}
               placeholder="Alabama"/>
              </View>
              <View style={{ borderBottomWidth: 1, borderBottomColor: '#ccc', marginTop: 20 }} />
              <View style={{ marginLeft: 10, marginTop: 20 }}>
              <Text style={{ fontSize: 16, fontWeight: '600', color: '#206C00', marginLeft: 10,fontFamily: "Roboto-Light"}}>{t("Phone No")}</Text>
              <TextInput style={styles.text}
               placeholder="334-xxx-xxxx"/>
              </View>
              <View style={{ borderBottomWidth: 1, borderBottomColor: '#ccc', marginTop: 20 }} />
              <View style={{ marginLeft: 10, marginTop: 20 }}>
              <Text style={{ fontSize: 16, fontWeight: '600', color: '#206C00', marginLeft: 10,fontFamily: "Roboto-Light"}}>{t("Company Type")}</Text>
              <Picker
                  style={styles.text}
                >
                  <Picker.Item label="Enterprise" value="Enterprise" />
                  <Picker.Item label="Startup" value="Startup" />
                  <Picker.Item label="Recruitment" value="Recruitment" />
                  <Picker.Item label="Consulting" value="Consulting" />
                  <Picker.Item label="SME" value="SME" />
                </Picker>
                </View>
              <View style={{ borderBottomWidth: 1, borderBottomColor: '#ccc', marginTop: 20 }} />
              <View style={{ marginLeft: 10, marginTop: 20 }}>
              <Text style={{ fontSize: 16, fontWeight: '600', color: '#206C00', marginLeft: 10,fontFamily: "Roboto-Light"}}>{t("Upload NDA")}</Text>
              <View style={styles.text}>
              <input
                type="file"
                accept="image/*"
                onChange={handleChooseImage}
              />
              </View>
              </View>

<View style={{ borderBottomWidth: 1, borderBottomColor: '#ccc', marginTop: 20 }} />
                    
<TouchableOpacity style={{ justifyContent: 'center', marginLeft: 10, width: 150, paddingHorizontal: 10, paddingVertical: 10, marginTop: 40, marginBottom: 50, backgroundColor: 'coral', borderRadius: 5, }}>
            <Text style={{ fontSize: 14, color: 'white', textAlign: 'center',fontFamily: "Roboto-Light" }}>{t("Save Changes")}</Text>
          </TouchableOpacity>
  
               
          <AboutEditModal
            visible={aboutModalVisible}
            about={about}
            onClose={() => setAboutModalVisible(false)}
            onSave={handleSaveAbout}
          />
                  </View>
              </View>
            </ScrollView>
          </View>
        </View>
      </BlurView>
    </ImageBackground>
  );
}

const styles = {
  pagecontainer: {
    backgroundColor: '#f7fff4',
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    padding: 20, 
    marginTop: 30,
    marginLeft: 30,
    marginRight: 30,
    marginBottom: 30,
    borderWidth: 2, 
    borderColor: 'rgba(225,225,212,0.3)',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
 glassBox: {
  backgroundColor: 'rgba(225,255,212,0.3)',
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    marginTop: 30,
    marginLeft: 240,
    marginRight: 30,
    marginBottom: 30,
  }, 
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
    marginTop: 5
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-start', 
  },
  text: {
    borderRadius: 20,
    padding: 10,
    marginTop: 5,
    backgroundColor: 'rgba(225,255,212,0.3)',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    width: 200,
    fontSize: 14,
    outline: 'none',
    borderWidth: 0,
  },
};