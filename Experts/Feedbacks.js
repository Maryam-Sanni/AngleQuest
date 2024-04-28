import React from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import Topbar from '../components/expertstopbar';
import Sidebar from '../components/expertssidebar';

function MyComponent() {
  return (
    <View style={{flex: 1 }}>
      <Topbar />
      <View style={{ flexDirection: 'row', flex: 1 }}>
        <Sidebar />
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
    <View style={{ flex: 1, paddingHorizontal: 8, paddingTop: 8, paddingBottom: 20, backgroundColor: "white", marginLeft: 230, marginTop: 10}}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%' }}>
        <View style={{ flexDirection: "row", alignItems: "flex-start", paddingHorizontal: 10, marginTop: 20 }}>
          <Text style={{ fontSize: 14, color: "grey" }}>Recent</Text>
        </View>
      </View>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%', marginTop: 20 }}>
        {[...Array(4)].map((_, index) => (
          <View key={index} style={{ width: '25%', paddingHorizontal: 5 }}>
            <View
              style={{
                borderRadius: 10,
                shadowColor: "#000",
                shadowOffset: {
                  width: 0,
                  height: 2,
                },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
                elevation: 5,
                backgroundColor: "#d3f9d8",
                padding: 20,
                marginBottom: 20,
              }}
            >
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Image
                  source={{
                    uri:
                      "https://cdn.builder.io/api/v1/image/assets/TEMP/0636b7ce229379e9fc58b9aae8a30299c92f42aeaa82a7c88df44bfc92fc32c6?apiKey=7b9918e68d9b487793009b3aea5b1a32",
                  }}
                  style={{ width: 50, height: 50, borderRadius: 25, marginRight: 10 }}
                  resizeMode="cover"
                />
                <View style={{ flex: 1 }}>
                  <Text style={{ fontSize: 16, color: "#000" }}>Mr John Smith</Text>
                  <Text style={{ fontSize: 12, color: "#888" }}>
                    Architectural Engineer
                  </Text>
                </View>
              </View>
              <View style={{ marginTop: 20 }}>
                <Text style={{ fontSize: 12, color: "#888" }}>Interview Date</Text>
                <Text style={{ fontSize: 16, color: "#0F996D", marginTop: 5 }}>
                  Tuesday 12/07/2024
                </Text>
                <Text style={{ fontSize: 12, color: "#888", marginTop: 10 }}>
                  Interview Time
                </Text>
                <Text style={{ fontSize: 16, color: "#0F996D", marginTop: 5 }}>
                  09:30pm - 10:30pm (1hr)
                </Text>
              </View>
              <TouchableOpacity
                style={{
                  backgroundColor: "none",
                  borderWidth: 1,
                  borderColor: "coral",
                  borderRadius: 3,
                  paddingHorizontal: 15,
                  paddingVertical: 5,
                  marginTop: 20,
                  alignSelf: "center",
                }}
                onPress={() => console.log("View feedback pressed")}
              >
                <Text style={{ color: "coral", fontWeight: "600" }}>
                  Give Feedback
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
         <View style={{ flexDirection: "row", alignItems: "flex-start", paddingHorizontal: 10, marginTop: 20 }}>
        </View>
      </View>
       <Text style={{ fontSize: 14, color: "grey", marginTop: 5 }}>Older</Text>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%', marginTop: 20 }}>
        {[...Array(4)].map((_, index) => (
          <View key={index} style={{ width: '25%', paddingHorizontal: 5 }}>
            <View
              style={{
                borderRadius: 10,
                shadowColor: "#000",
                shadowOffset: {
                  width: 0,
                  height: 2,
                },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
                elevation: 5,
                backgroundColor: "#d3f9d8",
                padding: 20,
                marginBottom: 20,
              }}
            >
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Image
                  source={{
                    uri:
                      "https://cdn.builder.io/api/v1/image/assets/TEMP/0636b7ce229379e9fc58b9aae8a30299c92f42aeaa82a7c88df44bfc92fc32c6?apiKey=7b9918e68d9b487793009b3aea5b1a32",
                  }}
                  style={{ width: 50, height: 50, borderRadius: 25, marginRight: 10 }}
                  resizeMode="cover"
                />
                <View style={{ flex: 1 }}>
                  <Text style={{ fontSize: 16, color: "#000" }}>Mr John Smith</Text>
                  <Text style={{ fontSize: 12, color: "#888" }}>
                    Architectural Engineer
                  </Text>
                </View>
              </View>
              <View style={{ marginTop: 20 }}>
                <Text style={{ fontSize: 12, color: "#888" }}>Interview Date</Text>
                <Text style={{ fontSize: 16, color: "#0F996D", marginTop: 5 }}>
                  Tuesday 12/07/2024
                </Text>
                <Text style={{ fontSize: 12, color: "#888", marginTop: 10 }}>
                  Interview Time
                </Text>
                <Text style={{ fontSize: 16, color: "#0F996D", marginTop: 5 }}>
                  09:30pm - 10:30pm (1hr)
                </Text>
              </View>
              <TouchableOpacity
                style={{
                  backgroundColor: "coral",
                  borderRadius: 3,
                  paddingHorizontal: 15,
                  paddingVertical: 5,
                  marginTop: 20,
                  alignSelf: "center",
                }}
                onPress={() => console.log("View feedback pressed")}
              >
                <Text style={{ color: "white", fontWeight: "600" }}>
                  View Feedback
                </Text>
              </TouchableOpacity>
            </View>
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
