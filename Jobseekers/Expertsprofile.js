import React from 'react';
import { View, ScrollView, Text, Image, TouchableOpacity } from 'react-native';
import Sidebar from '../components/sidebar';
import Topbar from '../components/topbar';

function DateTimeRange({ days, timeRange }) {
  return (
    <View style={{ flexDirection: 'row', marginTop: 5, borderWidth: 1, borderRadius: 3, borderColor: 'green' }}>
      <Text style={{ color: 'green', backgroundColor: 'lightgreen', borderRightWidth: 1, borderColor: 'green'}}>{days}</Text>
      <Text style={{ marginLeft: 5, marginTop: 3, color: 'green' }}>{timeRange}</Text>
    </View>
  );
}

export default function Profile() {
  return (
    <View style={{ height: '90%' }}>
      <Topbar />
      <View style={{ flexDirection: 'row', height: '100%' }}>
        <Sidebar />
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <View style={{ marginLeft: 230, flex: 1 }}>
            <View style={{ padding: 20 }}>
              <View style={{ flexDirection: "row", justifyContent: "space-between", paddingHorizontal: 5 }}>
                <View style={{ flex: 1, alignSelf: "flex-start" }}>
                  <Text style={{ fontSize: 18, fontWeight: "bold", marginTop: 20, marginBottom: 10 }}>Expert Profile</Text>
                  <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                    <Image
                      source={require("../assets/User.png")}
                      style={{ width: 100, height: 100, borderRadius: 50, marginTop: 20 }}
                    />
                    <View style={{ marginTop: 40, marginRight: 260 }}>
                      <Text style={{ fontSize: 16, fontWeight: "bold" }}>John Smith</Text>
                      <View style={{ flexDirection: "row", alignItems: "center", marginTop: 3.5 }}>
                        <Image
                          source={{ uri: 'https://cdn.builder.io/api/v1/image/assets/TEMP/00e648efb83f97ef0794d800368a6ad24636e8f2ce415b2e1c45f6156d62607e?apiKey=7b9918e68d9b487793009b3aea5b1a32&' }}
                          style={{ width: 15, height: 15 }}
                        />
                        <Text style={{ marginLeft: 5, fontSize: 12 }}>Architectural Engineer</Text>
                      </View>
                      <View style={{ flexDirection: "row", alignItems: "center", marginTop: 1 }}>
                        <Image
                          source={{ uri: 'https://cdn.builder.io/api/v1/image/assets/TEMP/850489e67e110e1e378aa7319abe9ae108ac518609ed527f0cc3ad25b9c266cf?apiKey=7b9918e68d9b487793009b3aea5b1a32&' }}
                          style={{ width: 15, height: 15 }}
                        />
                        <Text style={{ marginLeft: 5, fontSize: 12 }}>London, United Kingdom</Text>
                      </View>
                      <Text style={{ marginTop: 3, fontStyle: "italic", color: "#32CD32" }}>Online</Text>
                      {/* Date and time range */}
                      <DateTimeRange days=" Mon - Fri " timeRange="09:00pm - 11:00pm GMT+2 " />
                      <DateTimeRange days=" Sat           " timeRange="10:00am - 01:00pm GMT+2  " />
                    </View>
                  </View>
                </View>
                <View style={{ flex: 1, alignSelf: "flex-end", marginTop: 30 }}>
                  <View style={{ alignItems: "flex-end", width: 120, marginLeft: 375 }}>
                    <Text style={{ alignSelf: "flex-end", fontSize: 18, fontWeight: "bold" }}>$25/hr</Text>
                    <Image
                      source={{ uri: 'https://cdn.builder.io/api/v1/image/assets/TEMP/062a4b916dc84a95b4866d498eb1782b06b6566947808ad4f57d366b7f59bd20?apiKey=7b9918e68d9b487793009b3aea5b1a32&' }}
                      style={{ alignSelf: "center", marginTop: 2, width: "70%", aspectRatio: 5, marginLeft: 40 }}
                    />
                  </View>
                  <View style={{ flexDirection: "row", marginTop: 10 }}>
                    <TouchableOpacity style={{ justifyContent: "center", alignItems: "center", paddingHorizontal: 8, paddingVertical: 5, borderColor: "green", borderWidth: 1, borderRadius: 5, marginLeft: 280 }}>
                      <Text style={{ color: "green" }}>Career Advice</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ justifyContent: "center", alignItems: "center", paddingHorizontal: 8, paddingVertical: 5, backgroundColor: "coral", borderRadius: 5, marginLeft: 10 }}>
                      <Text style={{ color: "white" }}>Book Interview</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>

            {/* Profile Description */}
            <View style={{ marginTop: 10, paddingHorizontal: 10, marginRight: 30 }}>
              <Text style={{ fontSize: 16, textAlign: 'justify', marginTop: 10, color: 'green', fontWeight: '500' }}>About</Text>
              {/* Content */}
            </View>

            {/* Employment History */}
            <View style={{ marginRight: 50, marginTop: -35, marginBottom: 70 }}>
              {/* Content */}
            </View>

            {/* Skills */}
            <View style={{ marginRight: 50, marginTop: 20 }}>
              {/* Content */}
            </View>

            {/* Certifications */}
            <View style={{ marginRight: 50, marginTop: 20 }}>
              {/* Content */}
            </View>

            {/* Other Experience */}
            <View style={{ marginRight: 50, marginTop: 20 }}>
              {/* Content */}
            </View>

            {/* Expectations */}
            <View style={{ marginRight: 50, marginTop: 20 }}>
              {/* Content */}
            </View>
          </View>
        </ScrollView>
      </View>
    </View>
  );
}
