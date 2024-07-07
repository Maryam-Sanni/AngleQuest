import React from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
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
    <View style={{ height: '60%',}}>
      <Topbar />
      <View style={{ flexDirection: 'row', flex: 1}}>
        <Sidebar />
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
    <View style={{ flex: 1, paddingHorizontal: 22, paddingTop: 8, paddingBottom: 20, backgroundColor: "white", marginLeft: 230, }}>
      <View style={{ flexDirection: "row",  alignItems: "flex-start", paddingHorizontal: 10, marginTop: 20 }}>
        <Text style={{ fontWeight: "bold", fontSize: 14, color: "#206C00",fontFamily:"Roboto-Light" }}>{t("Top Search")}</Text>
        <Text style={{ fontSize: 14, marginLeft: 35,fontFamily:"Roboto-Light" }}>{t("Most Recent")}</Text>
        <Text style={{ fontSize: 14, marginLeft: 35,fontFamily:"Roboto-Light" }}>{t("Paid Interviews")}</Text>
        <Text style={{ fontSize: 14, marginLeft: 35,fontFamily:"Roboto-Light"  }}>{t("Saved")}</Text>
      </View>

      <View style={{ flexDirection: "row", alignItems: "center", marginTop: 20, marginBottom: 20, flexWrap: "wrap" }}>
        <View style={{ justifyContent: "center", paddingHorizontal: 10, paddingVertical: 8, borderRadius: 8, borderWidth: 1, borderColor: "#206C00", backgroundColor: "#d3f9d8" }}>
          <Text style={{ fontSize: 14, color: "#206C00",fontFamily:"Roboto-Light" }}>{t("Civil Engineer")}</Text>
        </View>
        <View style={{ justifyContent: "center", paddingHorizontal: 10, paddingVertical: 8, borderRadius: 8, borderWidth: 1, borderColor: "#206C00", backgroundColor: "#d3f9d8", marginLeft: 4, marginRight: 4 }}>
          <Text style={{ fontSize: 14, color: "#206C00",fontFamily:"Roboto-Light" }}>{t("Architect")}</Text>
        </View>
        <View style={{ justifyContent: "center", paddingHorizontal: 10, paddingVertical: 8, borderRadius: 8, borderWidth: 1, borderColor: "#206C00", backgroundColor: "#d3f9d8", marginLeft: 4, marginRight: 4 }}>
          <Text style={{ fontSize: 14, color: "#206C00",fontFamily:"Roboto-Light" }}>{t("Surveyor")}</Text>
        </View>
        <View style={{ justifyContent: "center", paddingHorizontal: 10, paddingVertical: 8, borderRadius: 8, borderWidth: 1, borderColor: "#206C00", backgroundColor: "#d3f9d8", marginLeft: 4, marginRight: 4 }}>
          <Text style={{ fontSize: 14, color: "#206C00",fontFamily:"Roboto-Light" }}>{t("Constructor")}</Text>
        </View>
        <View style={{ justifyContent: "center", alignItems: "center", marginLeft: 4,  paddingHorizontal: 10, paddingVertical: 8, borderRadius: 8, borderWidth: 1, borderColor: "#206C00", backgroundColor: "#d3f9d8"}}>
          <Text style={{ fontSize: 14, color: "#206C00",fontFamily:"Roboto-Light" }}>+</Text>
        </View>
      </View>
     <View style={{ marginTop: 8 }}>
  {[...Array(4)].map((_, rowIndex) => (
    <View key={rowIndex} style={{ flexDirection: "row", justifyContent: "space-between", flexWrap: "wrap", marginRight: 30 }}>
      {[...Array(4)].map((_, index) => (
        <View key={index} style={{ flex: 1, marginHorizontal: 5, marginBottom: 10, marginTop: 10 }}>
          <View style={{ justifyContent: "center", alignItems: "flex-start", width: 250, height: 200, paddingHorizontal: 20, paddingVertical: 15, borderRadius: 5, backgroundColor: "#F5FDF1", shadowColor: "#000", shadowOpacity: 0.25, shadowOffset: {width: 0, height: 2}, shadowRadius: 2.84, elevation: 4 }}>
            <Text style={{ fontSize: 18, fontWeight: "bold", color: "#206C00", marginBottom: 20,fontFamily:"Roboto-Light" }}>{t("Architectural Engineer")}</Text>
            <Text style={{ fontSize: 14, color: "#000", fontWeight: "500",fontFamily:"Roboto-Light" }}>11 {t("Companies")}</Text>
            <Text style={{ fontSize: 14, color: "#000", marginTop: 5, fontWeight: "500",fontFamily:"Roboto-Light" }}>15 {t("Openings")}</Text>
            <Text style={{ fontSize: 12, color: "#6B7280", marginTop: 5, fontWeight: 200,fontFamily:"Roboto-Light" }}>34 {t("Qualified Candidates")}</Text>
            <TouchableOpacity onPress={() => {/* Handle button press */}}>
              <View style={{ backgroundColor: 'coral', borderRadius: 5, paddingVertical: 8, paddingHorizontal: 60, marginTop: 20 }}>
                <Text style={{ fontWeight: 'bold', color: 'white', fontSize: 12, textAlign: 'center',fontFamily:"Roboto-Light" }}>{t("Get Pre-Vetted")}</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      ))}
    </View>
  ))}
</View>
    </View>
     </ScrollView>
      </View>
    </View>
  );
}

export default MyComponent;
