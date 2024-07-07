import React from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native';
import Sidebar from './components/sidebar';
import Topbar from './components/topbar';
import {useFonts} from "expo-font"
import { useTranslation } from 'react-i18next';


function MyComponent() {
  const [fontsLoaded]=useFonts({
    'Roboto-Light':require("../assets/fonts/Roboto-Light.ttf"),
  })
  const {t}=useTranslation()

  return (
    <View style={{ flex: 1  }}>
      <Topbar />
      <View style={{ flexDirection: 'row', height: '100%' }}>
        <Sidebar />
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <View style={{ padding: 20 }}>
            <View style={{ flex: 1 }}>
              <View style={{ paddingHorizontal: 8, paddingTop: 8, backgroundColor: 'white', marginLeft: 210, marginRight: 20, flex: 1 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 5 }}>
                  <View style={{ flex: 1 }}>
                    <View>
                      <Text style={{ fontSize: 18, color: 'green', fontWeight: '500',fontFamily:"Roboto-Light" }}>{t("Architectural Engineer")}</Text>
                      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: -20, marginLeft: 300 }}>
                        <Image
                          source={{ uri: 'https://cdn.builder.io/api/v1/image/assets/TEMP/f5692f7a19af6311034a4a0bb33be7e17a8c15c67b4e4dc27e5c70e53dda8474?apiKey=7b9918e68d9b487793009b3aea5b1a32' }}
                          style={{ width: 30, height: 30, marginRight: 2 }}
                        />
                        <Text style={{fontFamily:"Roboto-Light"}}>{t("3 of 5 paid interviews left")}</Text>
                      </View>
                      <Text style={{ marginTop: 1, fontSize: 12, color: 'black',fontFamily:"Roboto-Light" }}>Chang Xi Architectural Design Firm</Text>
                      <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 6 }}>
                        <Image
                          source={{ uri: 'https://cdn.builder.io/api/v1/image/assets/TEMP/64855faef6054d59cd60a7d276b9259de08ba79bbca26164ead8a4cfbedc168f?apiKey=7b9918e68d9b487793009b3aea5b1a32' }}
                          style={{ width: 20, height: 20, marginRight: 2 }}
                        />
                        <Text style={{ marginTop: 1, fontSize: 12, color: 'black',fontFamily:"Roboto-Light" }}>United Kingdom</Text>
                      </View>
                    </View>
                    <View style={{ marginTop: 20 }}>
                      <Text style={{ fontSize: 14, color: 'black',fontFamily:"Roboto-Light" }}>{t("About Us")}:</Text>
                      <Text style={{ fontSize: 14, color: 'black',fontFamily:"Roboto-Light" }}>
                        {t("Chang Xi Architectural Design Firm is a leading architectural design firm specializing in residential, commercial, institutional, sustainable design. We are committed to delivering innovative and sustainable architectural solutions that exceed client expectations.")}
                      </Text>
                      <Text style={{ marginTop: 15, fontSize: 14, color: 'black',fontFamily:"Roboto-Light" }}>{t("Position Overview")}:</Text>
                      <Text style={{ fontSize: 14, color: 'black',fontFamily:"Roboto-Light" }}>
                        {t("We are seeking a highly skilled and motivated architecture engineer to join our dynamic team. The successful candidate will collaborate with architects, engineers, and clients to develop architectural designs that are both functional and aesthetically pleasing. This is an exciting opportunity to contribute to cutting-edge projects and make a significant impact in the architectural field")}.
                      </Text>
                      <Text style={{ marginTop: 15, fontSize: 14, color: 'black',fontFamily:"Roboto-Light" }}>{t("Responsibilities")}:</Text>
                      <Text style={{ fontSize: 14, color: 'black',fontFamily:"Roboto-Light" }}>
                        - {t("Work closely with architects and clients to understand project requirements and objectives.")}
                        {'\n'}
                        - {t("Develop architectural designs and plans using industry-standard CAD software")}.
                        {'\n'}
                        - {t("Conduct structural analysis to ensure designs meet safety and building code requirements.")}
                        {'\n'}
                        - {t("Select appropriate building materials and construction techniques for each project.")}
                        {'\n'}
                        - {t("Prepare technical drawings, specifications, and cost estimates.")}
                        {'\n'}
                        - {t("Provide technical guidance and support to project teams throughout the design and construction phases.")}
                        {'\n'}
                        - {t("Conduct site visits and inspections as needed to monitor progress and resolve technical issues.")}
                      </Text>
                      <Text style={{ marginTop: 15, fontSize: 14, color: 'black',fontFamily:"Roboto-Light" }}>{t("Qualifications")}:</Text>
                      <Text style={{ fontSize: 14, color: 'black',fontFamily:"Roboto-Light" }}>
                        - {t("Bachelor's degree in architectural engineering, civil engineering, or a related field")}.
                        {'\n'}
                        - {t("Professional Engineer (PE) license preferred.")}
                        {'\n'}
                        - {t("Proficiency in CAD software such as AutoCAD, Revit, or similar programs.")}
                        {'\n'}
                        - {t("Strong understanding of structural analysis and building design principles.")}
                        {'\n'}
                        - {t("Excellent problem-solving and analytical skills.")}
                        {'\n'}
                        - {t("Effective communication and teamwork abilities.")}
                        {'\n'}
                        - {t("Experience with sustainable design practices is a plus.")}
                      </Text>
                      <Text style={{ marginTop: 15, fontSize: 14, color: 'black',fontFamily:"Roboto-Light" }}>{t("Benefits")}:</Text>
                      <Text style={{ fontSize: 14, color: 'black' }}>
                        - {t("Competitive salary commensurate with experience.")}
                        {'\n'}
                        - {t("Health, dental, and vision insurance.")}
                        {'\n'}
                        - {t("Retirement savings plan with company match.")}
                        {'\n'}
                        - {t("Opportunities for professional development and growth.")}
                        {'\n'}
                        - {t("Collaborative and inclusive work environment.")}
                      </Text>
                  
                <View style={{ borderBottomWidth: 1, borderBottomColor: '#ccc', marginTop: 30 }} />
                {/*Skills*/}
                     <View style={{ marginLeft: 10, marginTop: 20  }}>
                     <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                     <Text style={{ fontSize: 16, textAlign: 'justify', fontWeight: '500', color: 'green',fontFamily:"Roboto-Light" }}>{t("Skills")}</Text>
                     </View>
                    <View style={{ marginLeft: 5  }}>
                    <View style={styles.container}>
      <View style={styles.row}>
        <Text style={[styles.text, { backgroundColor: '#d3f9d8',fontFamily:"Roboto-Light" }]}>{t("Building Information Modeling")}</Text>
        <Text style={[styles.text, { backgroundColor: '#d3f9d8',fontFamily:"Roboto-Light" }]}>{t("Structural Analysis Software")}</Text>
        <Text style={[styles.text, { backgroundColor: '#d3f9d8',fontFamily:"Roboto-Light" }]}>{t("Construction Documentation")}</Text>
        <Text style={[styles.text, { backgroundColor: '#d3f9d8',fontFamily:"Roboto-Light" }]}>{t("Cost Estimation")}</Text>
        <Text style={[styles.text, { backgroundColor: '#d3f9d8',fontFamily:"Roboto-Light" }]}>{t("AutoCAD")}</Text>
      </View>
    </View>
    </View>
             </View>
              </View>
                  </View>
      

        <View style={{  alignItems: 'flex-end', marginTop: 20, marginLeft: 40   }}>
          <View style={{ backgroundColor: 'white', borderRadius: 8, paddingVertical: 12, paddingHorizontal: 40, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.3, shadowRadius: 3, elevation: 1 }}>
            <TouchableOpacity onPress={() => {/* Handle button press */}}>
              <View style={{ backgroundColor: 'coral', borderRadius: 5, paddingVertical: 8, paddingHorizontal: 10, marginTop: 20 }}>
              <Text style={{ fontWeight: 'bold', color: 'white', fontSize: 12, textAlign: 'center',fontFamily:"Roboto-Light" }}>{t("Apply Now")}</Text>
              </View>
            </TouchableOpacity>
            <View style={{ flexDirection: "row", alignItems: "center", paddingHorizontal: 6, paddingVertical: 4, marginTop: 15, marginLeft: 2, width: '100%', fontSize: 16, color: 'white', overflow: 'hidden', borderRadius: 5, borderWidth: 1, borderColor: 'green' }}>
      <View style={{ flexDirection: "row", justifyContent: "center", marginRight: 2.5}}>
        <Image
          source={{ uri: "https://cdn.builder.io/api/v1/image/assets/TEMP/89b215673c3f0306bbfdbeb8c09e2bc8d54ea8bd8f75bf1607be90505403dedb?apiKey=7b9918e68d9b487793009b3aea5b1a32&" }}
          style={{ width: 15, height: 15, marginLeft: 55, marginRight: 5 }}
          resizeMode="cover"
        />
        <Text style={{ fontSize: 12, color: 'green',fontFamily:"Roboto-Light" }}>{t("Save")}</Text>
      </View>
    </View>
            <View style={{ marginTop: 40, marginLeft: -25 }}>
              <Text style={{ color: '#a9a9a9', fontSize: 11,fontFamily:"Roboto-Light" }}>Minimum required score for position: <Text style={{ fontWeight: 'bold',  textDecorationLine: 'underline', fontSize: 11 }}>18</Text></Text>
              <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 20 }}>
                <Image
                  source={{ uri: 'https://cdn.builder.io/api/v1/image/assets/TEMP/9b7a3a6d0178d9e4654db03454de5de060a67e4b91a6fe4d31a059874d384eb2?apiKey=7b9918e68d9b487793009b3aea5b1a32' }}
                  style={{ width: 15, height: 15, marginRight: 5}}
                />
                <Text style={{ fontSize: 13, color: 'green',fontFamily:"Roboto-Light" }}>$87,000 <Text style={{ fontSize: 13, color: '#a9a9a9' }}>P.A</Text></Text>
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 15 }}>
                <Image
                  source={{ uri: 'https://cdn.builder.io/api/v1/image/assets/TEMP/d2d638a18c02206d9cb09092e754e29b9e7fcec759c21615164f9508890194ba?apiKey=7b9918e68d9b487793009b3aea5b1a32&'
 }}
                  style={{ width: 15, height: 15, marginRight: 5 }}
                />
                <Text style={{ fontSize: 13, color: 'black',fontFamily:"Roboto-Light" }}>{t("Intermediate")}</Text>
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 15 }}>
                <Image
                  source={{ uri: 'https://cdn.builder.io/api/v1/image/assets/TEMP/ef06ed58588d966863b89c771fcc87cc003f65b38920b0404bd6ea3cd8039208?apiKey=7b9918e68d9b487793009b3aea5b1a32' }}
                  style={{ width: 15, height: 15, marginRight: 5 }}
                />
                <Text style={{ fontSize: 13, color: 'black',fontFamily:"Roboto-Light" }}>{t("100% On-Site")}</Text>
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 15 }}>
                <Image
                  source={{ uri: 'https://cdn.builder.io/api/v1/image/assets/TEMP/17d8150403f80380e2928ef1b9db06fb8c60a50c487a2172f5699a0eb5f88b6d?apiKey=7b9918e68d9b487793009b3aea5b1a32' }}
                  style={{ width: 15, height: 15, marginRight: 5 }}
                />
                 <Text style={{ fontSize: 13, color: 'black',fontFamily:"Roboto-Light" }}>{t("Full-Time")}</Text>
              </View>
              <View style={{ marginTop: 15 }}>
                 <Text style={{ fontSize: 13, color: 'black',fontFamily:"Roboto-Light" }}>{t("12 Jobs posted")}</Text>
                <Text style={{ fontSize: 11, color: '#a9a9a9',fontFamily:"Roboto-Light" }}>{t("70% hire rate, 2 open jobs")}</Text>
                <Text style={{ fontSize: 13, color: 'black', marginTop: 15,fontFamily:"Roboto-Light" }}>{t("Company's Website")}</Text>
                <Text style={{ fontSize: 11, color: 'green', textDecorationLine: 'underline', marginBottom: 50,fontFamily:"Roboto-Light" }}>changxidesign.com</Text>
              </View>
            </View>
          </View>
        </View>
           </View>
              </View>
            </View>
          </View>
          </ScrollView>
        </View>
        </View>
     
  );
}

const styles = {
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
    backgroundColor: '#fff',
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
    margin: 5,
    color: 'green',
    fontSize: 12,
    textAlign: 'center',
  },
};

export default MyComponent;