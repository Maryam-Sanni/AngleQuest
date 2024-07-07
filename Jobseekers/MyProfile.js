import React, { useState } from 'react';
import { View, ScrollView, Text, Image, TouchableOpacity, ImageBackground, TextInput, Picker } from 'react-native';
import Sidebar from '../components/sidebar';
import Topbar from '../components/topbar';
import { BlurView } from 'expo-blur';
import AboutEditModal from '../components/AboutEditModal';
import {useFonts} from "expo-font"
import { useTranslation } from 'react-i18next';



export default function Profile() {
  const [about, setAbout] = useState(`Jordan Taylor is an aspiring and beginner frontend developer with a growing passion for creating user-friendly and visually appealing web applications. Currently pursuing a Bachelor's degree in Computer Science from XYZ University, Jordan is continuously enhancing their skills in HTML, CSS, JavaScript, and React.

    Outside of academics, Jordan enjoys exploring new web development technologies, participating in hackathons, and contributing to community coding projects. Jordan is also enthusiastic about design and spends time learning about UI/UX principles to better integrate them into their projects.`);
      const [aboutModalVisible, setAboutModalVisible] = useState(false);

      const handleSaveAbout = (newAbout) => {
        setAbout(newAbout);
      };
      const [fontsLoaded]=useFonts({
        'Roboto-Light':require("../assets/fonts/Roboto-Light.ttf"),
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
        <Text style={{ fontSize: 18, fontWeight: "600", color: 'black', marginBottom: 10,fontFamily:"Roboto-Light" }}>{t("My Profile")}</Text>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Image
                    source={{ uri: 'https://cdn.builder.io/api/v1/image/assets/TEMP/42eb8a1c745d5f4771d12d615bda303b93fe9d7cb8d0941022cdd47c4212a79e?apiKey=7b9918e68d9b487793009b3aea5b1a32&width=200' }}
                    style={{ width: 79, height: 79, borderRadius: 79, marginRight: 20 }}
                    resizeMode="cover"
                  />
                  </View>
                  </View>
                <View style={{ alignItems: 'flex-end', alignSelf: 'flex-start', justifyContent: 'center', marginRight: 20 }}>
                  <Text style={{ fontSize: 16, color: '#206C00', textAlign: 'right', fontWeight: '600',fontFamily:"Roboto-Light" }}>{t("Available Balance")}</Text>
                  <Text style={{ fontSize: 18, fontWeight: '600', marginTop: 5, color: 'black',fontFamily:"Roboto-Light" }}>$22.00</Text>
                  <TouchableOpacity style={{ justifyContent: 'center', alignItems: 'center', paddingVertical: 5, paddingHorizontal: 10, marginTop: 10, backgroundColor: '#f7fff4', borderRadius: 5, borderWidth: 1, borderColor: '#206C00' }}>
                    <Text style={{ fontSize: 12,fontFamily:"Roboto-Light" }}>{t("Preview Profile")}</Text>
                  </TouchableOpacity>
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
                      <Text style={{ fontSize: 14, textAlign: 'justify', fontFamily:"Roboto-Light" }}>{about}</Text>
                
              <View style={{ borderBottomWidth: 1, borderBottomColor: '#CCC', marginTop: 30 }} />
            </View>

         
          <View style={{ marginLeft: 10, marginTop: 20 }}>
              <Text style={{ fontSize: 16, fontWeight: '600', color: '#206C00', marginLeft: 10,fontFamily:"Roboto-Light"}}>{t("First Name")}</Text>
              <TextInput style={styles.text}
               placeholder="Jordan"/>
              </View>
              <View style={{ borderBottomWidth: 1, borderBottomColor: '#ccc', marginTop: 20 }} />
              <View style={{ marginLeft: 10, marginTop: 20 }}>
              <Text style={{ fontSize: 16, fontWeight: '600', color: '#206C00', marginLeft: 10,fontFamily:"Roboto-Light"}}>{t("Last Name")}</Text>
              <TextInput style={styles.text}
               placeholder="Taylor"/>
              </View>
              <View style={{ borderBottomWidth: 1, borderBottomColor: '#ccc', marginTop: 20 }} />
              <View style={{ marginLeft: 10, marginTop: 20 }}>
              <Text style={{ fontSize: 16, fontWeight: '600', color: '#206C00', marginLeft: 10}}>{t("Country")}</Text>
              <TextInput style={styles.text}
               placeholder="United States"/>
              </View>
              <View style={{ borderBottomWidth: 1, borderBottomColor: '#ccc', marginTop: 20 }} />
              <View style={{ marginLeft: 10, marginTop: 20 }}>
              <Text style={{ fontSize: 16, fontWeight: '600', color: '#206C00', marginLeft: 10,fontFamily:"Roboto-Light"}}>{t("State or Province")}</Text>
              <TextInput style={styles.text}
               placeholder="Alabama"/>
              </View>
              <View style={{ borderBottomWidth: 1, borderBottomColor: '#ccc', marginTop: 20 }} />
              <View style={{ marginLeft: 10, marginTop: 20 }}>
              <Text style={{ fontSize: 16, fontWeight: '600', color: '#206C00', marginLeft: 10,fontFamily:"Roboto-Light"}}>{t("Birthday")}</Text>
              <TextInput style={styles.text}
               placeholder="05/09/1994"/>
              </View>
              <View style={{ borderBottomWidth: 1, borderBottomColor: '#ccc', marginTop: 20 }} />
              <View style={{ marginLeft: 10, marginTop: 20 }}>
              <Text style={{ fontSize: 16, fontWeight: '600', color: '#206C00', marginLeft: 10,fontFamily:"Roboto-Light"}}>{t("Gender")}</Text>
              <Picker
                  style={styles.text}
                >
                  <Picker.Item label={t("Male")} value="Male" />
                  <Picker.Item label={t("Female")} value="Female" />
                  <Picker.Item label={t("Others")} value="Others" />
                </Picker>
              </View>

<View style={{ borderBottomWidth: 1, borderBottomColor: '#ccc', marginTop: 20 }} />
                    
   
<TouchableOpacity style={{ justifyContent: 'center', marginLeft: 10, width: 150, paddingHorizontal: 10, paddingVertical: 10, marginTop: 40, marginBottom: 50, backgroundColor: 'coral', borderRadius: 5, }}>
            <Text style={{ fontSize: 14, color: 'white', textAlign: 'center',fontFamily:"Roboto-Light" }}>{t("Save Changes")}</Text>
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