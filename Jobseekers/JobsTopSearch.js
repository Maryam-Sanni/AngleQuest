import React from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import Sidebar from '../components/sidebar';
import Topbar from '../components/topbar';

function MyComponent() {
  return (
    <View style={{ flex: 1 }}>
      <Topbar />
      <View style={{ flexDirection: 'row', flex: 1}}>
        <Sidebar />
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
    <View style={{ flex: 1, paddingHorizontal: 22, paddingTop: 8, paddingBottom: 20, backgroundColor: "white", marginLeft: 230, }}>
      <View style={{ flexDirection: "row",  alignItems: "flex-start", paddingHorizontal: 10, marginTop: 20 }}>
        <Text style={{ fontWeight: "bold", fontSize: 14, color: "#206C00" }}>Top Search</Text>
        <Text style={{ fontSize: 14, marginLeft: 35 }}>Most Recent</Text>
        <Text style={{ fontSize: 14, marginLeft: 35 }}>Paid Interviews</Text>
        <Text style={{ fontSize: 14, marginLeft: 35  }}>Saved</Text>
      </View>

      <View style={{ flexDirection: "row", alignItems: "center", marginTop: 20, marginBottom: 20, flexWrap: "wrap" }}>
        <View style={{ justifyContent: "center", paddingHorizontal: 10, paddingVertical: 8, borderRadius: 8, borderWidth: 1, borderColor: "#206C00", backgroundColor: "#d3f9d8" }}>
          <Text style={{ fontSize: 14, color: "#206C00" }}>Civil Engineer</Text>
        </View>
        <View style={{ justifyContent: "center", paddingHorizontal: 10, paddingVertical: 8, borderRadius: 8, borderWidth: 1, borderColor: "#206C00", backgroundColor: "#d3f9d8", marginLeft: 4, marginRight: 4 }}>
          <Text style={{ fontSize: 14, color: "#206C00" }}>Architect</Text>
        </View>
        <View style={{ justifyContent: "center", paddingHorizontal: 10, paddingVertical: 8, borderRadius: 8, borderWidth: 1, borderColor: "#206C00", backgroundColor: "#d3f9d8", marginLeft: 4, marginRight: 4 }}>
          <Text style={{ fontSize: 14, color: "#206C00" }}>Surveyor</Text>
        </View>
        <View style={{ justifyContent: "center", paddingHorizontal: 10, paddingVertical: 8, borderRadius: 8, borderWidth: 1, borderColor: "#206C00", backgroundColor: "#d3f9d8", marginLeft: 4, marginRight: 4 }}>
          <Text style={{ fontSize: 14, color: "#206C00" }}>Constructor</Text>
        </View>
        <View style={{ justifyContent: "center", alignItems: "center", marginLeft: 4,  paddingHorizontal: 10, paddingVertical: 8, borderRadius: 8, borderWidth: 1, borderColor: "#206C00", backgroundColor: "#d3f9d8"}}>
          <Text style={{ fontSize: 14, color: "#206C00" }}>+</Text>
        </View>
      </View>
     <View style={{ marginTop: 8 }}>
  {[...Array(4)].map((_, rowIndex) => (
    <View key={rowIndex} style={{ flexDirection: "row", justifyContent: "space-between", flexWrap: "wrap", marginRight: 30 }}>
      {[...Array(4)].map((_, index) => (
        <View key={index} style={{ flex: 1, marginHorizontal: 5, marginBottom: 10, marginTop: 10 }}>
          <View style={{ justifyContent: "center", alignItems: "flex-start", width: 250, height: 200, paddingHorizontal: 20, paddingVertical: 15, borderRadius: 5, backgroundColor: "#F5FDF1", shadowColor: "#000", shadowOpacity: 0.25, shadowOffset: {width: 0, height: 2}, shadowRadius: 2.84, elevation: 4 }}>
            <Text style={{ fontSize: 18, fontWeight: "bold", color: "#206C00", marginBottom: 20 }}>Architectural Engineer</Text>
            <Text style={{ fontSize: 14, color: "#000", fontWeight: "500" }}>11 Companies</Text>
            <Text style={{ fontSize: 14, color: "#000", marginTop: 5, fontWeight: "500" }}>15 Openings</Text>
            <Text style={{ fontSize: 12, color: "#6B7280", marginTop: 5, fontWeight: 200 }}>34 Qualified Candidates</Text>
            <TouchableOpacity onPress={() => {/* Handle button press */}}>
              <View style={{ backgroundColor: 'coral', borderRadius: 5, paddingVertical: 8, paddingHorizontal: 60, marginTop: 20 }}>
                <Text style={{ fontWeight: 'bold', color: 'white', fontSize: 12, textAlign: 'center' }}>Get Pre-Vetted</Text>
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
