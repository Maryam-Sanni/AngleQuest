import React from 'react';
import { View, Text, Image, TouchableOpacity, TextInput } from 'react-native';
import TopBar from '../components/topbar'; // Importing the TopBar component
import Sidebar from '../components/sidebar'; // Importing the Sidebar component
import {useFonts} from "expo-font"
import { useTranslation } from 'react-i18next';

function MyComponent() {
  const [fontsLoaded]=useFonts({
    "Roboto-Light":require("../assets/fonts/Roboto-Light.ttf"),
      })
    const {t}=useTranslation()
  return (
    <View style={{ flex: 1 }}>
      <TopBar />
      <View style={{ flexDirection: 'row', flex: 1, marginRight: 50}}>
        <Sidebar />
        <View style={{ flex: 1, flexDirection: 'row', backgroundColor: '#ffffff' }}>
          <View style={{ flex: 1, paddingHorizontal: 8, paddingTop: 20 }}>
            <View style={{ marginTop: 7 }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                <View style={{ width: '80%' }}>
                  <View style={{ marginBottom: 25 }}>
                    <Text style={{ fontSize: 18, color: '#206C00', fontWeight: 'bold',fontFamily:"Roboto-Light" }}>{t("Add a billing method")}</Text>
                  </View>
                  <View style={{ marginBottom: 6 }}>
                    <Text style={{ fontSize: 14, fontWeight: '500', color: '#000',fontFamily:"Roboto-Light" }}>{t("Card Number")}</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 5, paddingVertical: 10, backgroundColor: '#fff', borderRadius: 4, borderWidth: 1, borderColor: '#ccc' }}>
                      <Image source={{ uri: 'https://cdn.builder.io/api/v1/image/assets/TEMP/99072f4d1f4bdf8ccfa58ea7e57daea8a5358539cb0412a86aac38eaa13dd1d7?apiKey=7b9918e68d9b487793009b3aea5b1a32&' }} style={{ width: 24, height: 24 }} />
                      <TextInput style={{ flex: 1, marginLeft: 5,fontFamily:"Roboto-Light" }} placeholder="1111 2222 3333 4444" />
                    </View>
                  </View>
                  {/* Add other fields similarly */}
                  <View style={{ flexDirection: 'row', marginTop: 20 }}>
                    <View style={{ flex: 1, marginRight: 10 }}>
                      <Text style={{ fontSize: 14, fontWeight: '500', color: '#000',fontFamily:"Roboto-Light" }}>{t("Expiration Month")}</Text>
                      <TextInput style={{ paddingHorizontal: 10, paddingVertical: 10, backgroundColor: '#fff', borderRadius: 4, borderWidth: 1, borderColor: '#ccc',fontFamily:"Roboto-Light" }} placeholder="MM" />
                    </View>
                    <View style={{ flex: 1 }}>
                      <Text style={{ fontSize: 14, fontWeight: '500', color: '#000',fontFamily:"Roboto-Light" }}>{t("Expiration Year")}</Text>
                      <TextInput style={{ paddingHorizontal: 10, paddingVertical: 10, backgroundColor: '#fff', borderRadius: 4, borderWidth: 1, borderColor: '#ccc',fontFamily:"Roboto-Light" }} placeholder="YY" />
                    </View>
                  </View>
                  <View style={{ marginTop: 10 }}>
                    <Text style={{ fontSize: 14, fontWeight: '500', color: '#000',fontFamily:"Roboto-Light" }}>{t("Security Code")}</Text>
                    <TextInput style={{ paddingHorizontal: 10, paddingVertical: 10, backgroundColor: '#fff', borderRadius: 4, borderWidth: 1, borderColor: '#ccc',fontFamily:"Roboto-Light" }} placeholder="3 digits" />
                  </View>
                </View>
              </View>
            </View>
            <View style={{ marginTop: 16 }}>
              <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#206C00', marginTop: 20,fontFamily:"Roboto-Light" }}>{t("Billing Address")}</Text>
              <View style={{ marginTop: 20 }}>
                <Text style={{ fontSize: 14, fontWeight: '500', color: '#000',fontFamily:"Roboto-Light" }}>Country</Text>
                <View style={{ flexDirection: 'row', width: '80%', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 10, paddingVertical: 10, marginTop: 1, backgroundColor: '#fff', borderRadius: 4, borderWidth: 1, borderColor: '#ccc' }}>
                  <Text style={{fontFamily:"Roboto-Light"}}>United Kingdom</Text>
                  <Image source={{ uri: 'https://cdn.builder.io/api/v1/image/assets/TEMP/c48120f6036f7ef806de5cbfcb52c432b190c2134523f70740a76a035b2c31d9?apiKey=7b9918e68d9b487793009b3aea5b1a32&' }} style={{ width: 24, height: 24 }} />
                </View>
              </View>
              <View style={{ marginTop: 20 }}>
                <Text style={{ fontSize: 14, fontWeight: '500', color: '#000',fontFamily:"Roboto-Light" }}>{t("Address Line 1")}</Text>
                <TextInput style={{ paddingHorizontal: 10, paddingVertical: 10, marginTop: 2.5, width: '80%', backgroundColor: '#fff', borderRadius: 4, borderWidth: 1, borderColor: '#ccc',fontFamily:"Roboto-Light" }} placeholder="Street Address" />
              </View>
              <View style={{ marginTop: 20 }}>
                <Text style={{ fontSize: 14, fontWeight: '500', color: '#000',fontFamily:"Roboto-Light" }}>{t("Address Line 2")}</Text>
                <TextInput style={{ paddingHorizontal: 10, paddingVertical: 10, width: '80%', marginTop: 2.5, backgroundColor: '#fff', borderRadius: 4, borderWidth: 1, borderColor: '#ccc',fontFamily:"Roboto-Light" }} placeholder="Street Address" />
              </View>
              <View style={{ flexDirection: 'row', marginTop: 20 }}>
                <View style={{ flex: 1, marginRight: 10 }}>
                  <Text style={{ fontSize: 14, fontWeight: '500', color: '#000',fontFamily:"Roboto-Light" }}>{t("City")}</Text>
                  <TextInput style={{ paddingHorizontal: 10, paddingVertical: 10, width: '60%',  marginTop: 2.5, backgroundColor: '#fff', borderRadius: 4, borderWidth: 1, borderColor: '#ccc',fontFamily:"Roboto-Light" }} placeholder="Enter City" />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={{ fontSize: 14, fontWeight: '500', color: '#000',fontFamily:"Roboto-Light" }}>{t("Postal Code")}</Text>
                  <TextInput style={{ paddingHorizontal: 10, paddingVertical: 10, width: '60%', marginTop: 2.5, backgroundColor: '#fff', borderRadius: 4, borderWidth: 1, borderColor: '#ccc',fontFamily:"Roboto-Light" }} placeholder="00000" />
                </View>
              </View>
            </View>
            <TouchableOpacity style={{ alignSelf: 'flex-end', paddingHorizontal: 20, paddingVertical: 10, marginTop: 25, marginRight: 220, backgroundColor: 'coral', borderRadius: 5 }}>
              <Text style={{ fontSize: 14, fontWeight: '500', color: '#fff', textAlign: 'center',fontFamily:"Roboto-Light" }}>{t("Save Changes")}</Text>
            </TouchableOpacity>
          </View>
          <View style={{ width: '16%', height: 180, borderRadius: 10, marginLeft: 30, marginRight: 30, marginTop: 20, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.25, shadowRadius: 3.84, elevation: 5 }}>
            <View style={{ backgroundColor: 'white', padding: 16, borderRadius: 20, marginTop: 0 }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 5 }}>
                <Image source={{ uri: 'https://cdn.builder.io/api/v1/image/assets/TEMP/9b7a3a6d0178d9e4654db03454de5de060a67e4b91a6fe4d31a059874d384eb2?apiKey=7b9918e68d9b487793009b3aea5b1a32&' }} style={{ width: 15, height: 15, marginRight: 5 }} />
                <Text style={{ fontSize: 12, color: 'black',fontFamily:"Roboto-Light" }}>{t("Account Settings")}</Text>
              </View>
              <View style={{ marginBottom: 10 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 5 }}>
                  <Image source={{ uri: 'https://cdn.builder.io/api/v1/image/assets/TEMP/d2d638a18c02206d9cb09092e754e29b9e7fcec759c21615164f9508890194ba?apiKey=7b9918e68d9b487793009b3aea5b1a32&' }} style={{ width: 15, height: 15, marginRight: 5, marginTop: 15 }} />
                  <Text style={{ fontSize: 12, color: 'black', marginTop: 15,fontFamily:"Roboto-Light" }}>{t("Password")}</Text>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 5 }}>
                  <Image source={{ uri: 'https://cdn.builder.io/api/v1/image/assets/TEMP/17d8150403f80380e2928ef1b9db06fb8c60a50c487a2172f5699a0eb5f88b6d?apiKey=7b9918e68d9b487793009b3aea5b1a32&' }} style={{ width: 15, height: 15, marginRight: 5, marginTop: 15 }} />
                  <Text style={{ fontSize: 12, color: 'black', marginTop: 15,fontFamily:"Roboto-Light" }}>{t("Notification Settings")}</Text>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Image source={{ uri: 'https://cdn.builder.io/api/v1/image/assets/TEMP/d71eb11f8b49b8dc89ac885de39244967a9d43ca35a783ff2b5c8a9c872d336c?apiKey=7b9918e68d9b487793009b3aea5b1a32&' }} style={{ width: 15, height: 15, marginRight: 5, marginTop: 15 }} />
                  <Text style={{ fontSize: 12, color: 'coral', fontWeight: 'bold', marginTop: 15,fontFamily:"Roboto-Light" }}>{t("Billing & Payment")}</Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}

export default MyComponent;
