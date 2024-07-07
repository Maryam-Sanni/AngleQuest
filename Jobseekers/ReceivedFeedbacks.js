import React from "react";
import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";
import Sidebar from '../components/sidebar';
import Topbar from '../components/topbar';
import {useFonts} from "expo-font"
import { useTranslation } from "react-i18next";

function MyComponent() {
  const [fontsLoaded]=useFonts({
    'Roboto-Light':require("../assets/fonts/Roboto-Light.ttf"),
  })
  const {t}=useTranslation()

  return (
     <View style={{ height: '90%' }}>
      <Topbar />
      <View style={{ flexDirection: 'row', height: '100%' }}>
        <Sidebar />
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
    <View style={{ flex: 1, paddingHorizontal: 8, paddingTop: 8, paddingBottom: 20, backgroundColor: "white", marginLeft: 230}}>
      <Text style={{ marginTop: 20, fontSize: 18, color: "#206C00", fontWeight: '600',fontFamily:"Roboto-Light" }}>{t("Architectural Engineer")}</Text>
      <View style={{ marginTop: 40 }}>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <View style={{ width: "78%" }}>
            <Text style={{ fontSize: 14, color: "#000",fontFamily:"Roboto-Light" }}>
              <Text style={{ fontWeight: "bold",fontFamily:"Roboto-Light" }}>{t("Candidate's name")}:</Text> Gerald Calgary{"\n\n"}
              <Text style={{ fontWeight: "bold",fontFamily:"Roboto-Light" }}>{t("Position")}:</Text> {t("Architectural Engineer")}{"\n\n"}
              <Text style={{ fontWeight: "bold",fontFamily:"Roboto-Light" }}>{t("Department")}:</Text> Engineering{"\n\n"}
              <Text style={{ fontWeight: "bold",fontFamily:"Roboto-Light" }}>{t("Team")}:</Text> {t("Architectural Team")}{"\n\n"}
              <Text style={{ fontWeight: "bold",fontFamily:"Roboto-Light" }}>{t("Interviewed by")}:</Text>{" "}
              <Text style={{ textDecorationLine: "underline",fontFamily:"Roboto-Light" }}>John Smith</Text>{"\n\n"}
              <Text style={{ fontWeight: "bold",fontFamily:"Roboto-Light" }}>{t("Rating scale")}:</Text>{"\n"}
              1 - Not qualified{"\n"}
              2 - Limited qualification{"\n"}
              3 - Average qualification{"\n"}
              4 - Above average qualification{"\n"}
              5 - Exceptional qualification{"\n\n"}
              <Text style={{ fontWeight: "bold",fontFamily:"Roboto-Light" }}>{t("Question")} 1:</Text> {t("Can you describe your experience with architectural design software and tools?")}{"\n"}
              {t("Rating")}: 4{"\n"}
              {t("Comments: 3 years experience with architectural design software and tools")}{"\n\n"}
              <Text style={{ fontWeight: "bold",fontFamily:"Roboto-Light" }}>{t("Question")} 2:</Text> {t("How do you ensure that your designs meet both aesthetic and functional requirements?")}{"\n"}
              {t("Rating")}: 5{"\n"}
              Comments: Detailed example of application of design that is aesthetically pleasing while being functional.{"\n\n"}
              <Text style={{ fontWeight: "bold",fontFamily:"Roboto-Light" }}>{t("Question")} 3:</Text> {t("Can you provide an example of a challenging project you worked on and how you overcame obstacles during its execution?")}{"\n"}
              {t("Rating")}: 4{"\n"}
              Comments: Well thought out answer that highlight candidate’s problem-solving skills.{"\n"}
              Detailed an experience and showcased conflict management skills.{"\n\n"}
              <Text style={{ fontWeight: "bold",fontFamily:"Roboto-Light" }}>{t("Question")} 4:</Text> {t("How do you stay updated on industry trends, regulations, and best practices in architectural engineering?")}{"\n"}
              {t("Rating")}: 4{"\n"}
              Comments: Detailed answer that aligns with industry regulations and best practices.{"\n\n"}
              <Text style={{ fontWeight: "bold",fontFamily:"Roboto-Light" }}>{t("Question")} 5:</Text> {t("Can you discuss a time when you successfully collaborated with architects, engineers, or other professionals on a project?")}{"\n"}
              {t("Rating")}: 5{"\n"}
              Comments: Communication and teamwork is a priority for candidate as discussed.{"\n\n"}
              <Text style={{ fontWeight: "bold",fontFamily:"Roboto-Light" }}>Overall Rating:</Text> 22{"\n"}
              <Text style={{ fontWeight: "bold",fontFamily:"Roboto-Light" }}>{t("Overall comments")}:</Text> {t("Personable and professional, Moses displayed excellent communication skills.")}
            </Text>
          </View>

          {/* Right Bar */}
           <View style={{ flex: 1, alignItems: 'flex-end', marginTop: -50 }}>
          <View style={{ backgroundColor: 'white', borderRadius: 5, paddingVertical: 12, paddingHorizontal: 40, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.3, shadowRadius: 3, elevation: 1 }}>
            <TouchableOpacity onPress={() => {/* Handle button press */}}>
              <View style={{ backgroundColor: 'coral', borderRadius: 5, paddingVertical: 8, paddingHorizontal: 10, marginTop: 20 }}>
              <Text style={{ fontWeight: 'bold', color: 'white', fontSize: 12, textAlign: 'center',fontFamily:"Roboto-Light" }}>{t("Apply Now")}</Text>
              </View>
            </TouchableOpacity>
            <View style={{ flexDirection: "row", alignItems: "center", paddingHorizontal: 6, paddingVertical: 4, marginTop: 15, marginLeft: 2, width: '100%', fontSize: 14, color: 'white', overflow: 'hidden', borderRadius: 5, borderWidth: 1, borderColor: 'green' }}>
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
              <Text style={{ color: '#a9a9a9', fontSize: 11,fontFamily:"Roboto-Light" }}>{t("Minimum required score for position")}: <Text style={{ fontWeight: 'bold',  textDecorationLine: 'underline', fontSize: 11 }}>20</Text></Text>
              <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 20 }}>
                <Image
                  source={{ uri: 'https://cdn.builder.io/api/v1/image/assets/TEMP/9b7a3a6d0178d9e4654db03454de5de060a67e4b91a6fe4d31a059874d384eb2?apiKey=7b9918e68d9b487793009b3aea5b1a32' }}
                  style={{ width: 15, height: 15, marginRight: 5}}
                />
                <Text style={{ fontSize: 13, color: 'green',fontFamily:"Roboto-Light" }}>$87,000 <Text style={{ fontSize: 13, color: '#a9a9a9',fontFamily:"Roboto-Light" }}>P.A - average</Text></Text>
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 15 }}>
                <Image
                  source={{ uri: 'https://cdn.builder.io/api/v1/image/assets/TEMP/d2d638a18c02206d9cb09092e754e29b9e7fcec759c21615164f9508890194ba?apiKey=7b9918e68d9b487793009b3aea5b1a32&'
 }}
                  style={{ width: 15, height: 15, marginRight: 5 }}
                />
                <Text style={{ fontSize: 13, color: 'black',fontFamily:"Roboto-Light" }}>{t("Intermediate - Expert")}</Text>
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 15 }}>
                <Image
                  source={{ uri: 'https://cdn.builder.io/api/v1/image/assets/TEMP/ef06ed58588d966863b89c771fcc87cc003f65b38920b0404bd6ea3cd8039208?apiKey=7b9918e68d9b487793009b3aea5b1a32' }}
                  style={{ width: 15, height: 15, marginRight: 5 }}
                />
                <Text style={{ fontSize: 13, color: 'black',fontFamily:"Roboto-Light" }}>{t("On-Site/Hybrid")}</Text>
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 15 }}>
                <Image
                  source={{ uri: 'https://cdn.builder.io/api/v1/image/assets/TEMP/17d8150403f80380e2928ef1b9db06fb8c60a50c487a2172f5699a0eb5f88b6d?apiKey=7b9918e68d9b487793009b3aea5b1a32' }}
                  style={{ width: 15, height: 15, marginRight: 5 }}
                />
                 <Text style={{ fontSize: 13, color: 'black',fontFamily:"Roboto-Light" }}>{t("Full-Time & Contract")}</Text>
              </View>
              <View style={{ marginTop: 15 }}>
                 <Text style={{ fontSize: 13, color: 'black',fontFamily:"Roboto-Light" }}>{t("83 available Jobs")}</Text>
                <Text style={{ fontSize: 11, color: '#a9a9a9',fontFamily:"Roboto-Light" }}>{t("73% interview match")}</Text>
                <Text style={{ fontSize: 13, color: 'green', textDecorationLine: 'underline', marginTop: 20, marginBottom: 50,fontFamily:"Roboto-Light" }}>{t("View roles you qualify for")}</Text>
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

export default MyComponent;
