import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import Topbar from '../components/topbar';
import Sidebar from '../components/sidebar';

function MyComponent() {
  const navigation = useNavigation(); // Get the navigation object

  const handleFeedbackPress = () => {
    navigation.navigate('SendFeedback'); // Navigate to the "SendFeedback" page
  };

  const handleViewFeedbackPress = () => {
    navigation.navigate('ViewFeedback'); // Navigate to the "ViewFeedback" page
  };
  
  return (
    <View style={{ height: '85%' }}>
      <Topbar />
      <View style={{ flexDirection: 'row', flex: 1 }}>
        <Sidebar />
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
    <View style={{ flex: 1, paddingTop: 8, paddingBottom: 20, backgroundColor: "white", marginLeft: 230, marginTop: 10}}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between',  }}>
        <View style={{ flexDirection: "row", alignItems: "flex-start", paddingHorizontal: 10, marginTop: 20 }}>
          <Text style={{ fontWeight: "bold", fontSize: 14, color: "#206C00" }}>Received</Text>
          <Text style={{ fontSize: 14, marginLeft: 35 }}>Sent</Text>
        </View>
        <TouchableOpacity
                style={{ marginTop: 7, justifyContent: 'center', paddingHorizontal: 15, paddingVertical: 4, fontSize: 14, fontWeight: 'bold', textAlign: 'center', color: '#FFFFFF', backgroundColor: 'coral', borderRadius: 0 }}
                onPress={handleFeedbackPress} // Call handleFeedbackPress when the button is pressed
              >
                <Text style={{ fontSize: 14, color: "white" }}>Give Feedback</Text>
              </TouchableOpacity>
      </View>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', flexWrap: 'wrap', marginTop: 20, }}>
        {[...Array(6)].map((_, index) => (
          <View key={index} style={{ width: 210 , paddingHorizontal: 5 }}>
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
                marginBottom: 10,
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
                    style={{ backgroundColor: "coral", borderRadius: 3, paddingHorizontal: 10, paddingVertical: 5, marginTop: 20, alignSelf: "center" }}
                    onPress={handleViewFeedbackPress} // Call handleViewFeedbackPress when the "View feedback" button is pressed
                  >
                    <Text style={{ color: "#FFF", fontWeight: "bold" }}>View feedback</Text>
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
