import React from 'react';
import { View, Text, Image, TextInput, TouchableOpacity } from 'react-native';
import Sidebar from '../components/sidebar';
import Topbar from '../components/topbar';

// Require the local image
const userImage = require('../assets/User.png');

function MyComponent() {
  return (
    <View style={{ flex: 1 }}>
      <Topbar />
      <View style={{ flexDirection: 'row', flex: 1 }}>
        <Sidebar />
        <View style={{ paddingHorizontal: 8, paddingVertical: 16, backgroundColor: 'white', marginLeft: 220, marginTop: 30 }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', maxWidth: '100%', paddingHorizontal: 5 }}>
            <View style={{ flex: 1, marginRight: 5, maxWidth: '78%' }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
                <Text style={{ fontSize: 13, fontWeight: 'bold', color: 'black', marginRight: 5 }}>Expert’s Name</Text>
                <View style={{ padding: 6, width: 300, backgroundColor: 'white', borderRadius: 0, borderWidth: 1, borderColor: '#206C00', marginLeft: 55 }}>
                  <Text style={{ fontSize: 12, color: '#206C00' }}>Mike Owens</Text>
                </View>
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
                <Text style={{ fontSize: 13, fontWeight: 'bold', color: 'black', marginRight: 5 }}>Occupation</Text>
                <View style={{ padding: 6, width: 300, backgroundColor: 'white', borderRadius: 0, borderWidth: 1, borderColor: '#206C00', marginLeft: 72 }}>
                  <Text style={{ fontSize: 12, color: '#206C00' }}>Architectural Engineer</Text>
                </View>
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
                <Text style={{ fontSize: 13, fontWeight: 'bold', color: 'black', marginRight: 5 }}>Session Date & Time</Text>
                <View style={{ padding: 6, width: 300, backgroundColor: 'white', borderRadius: 0, borderWidth: 1, borderColor: '#206C00', marginLeft: 17 }}>
                  <View style={{ flexDirection: 'row' }}>
                    <Text style={{ fontSize: 12, color: '#206C00' }}>12/02/2024</Text>
                    <Text style={{ fontSize: 12, color: '#206C00', marginLeft: 10 }}>09:00PM - 10:00PM</Text>
                  </View>
                </View>
              </View>
              <View style={{ marginBottom: 10 }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
                <Text style={{ fontSize: 13, fontWeight: 'bold', color: 'black', marginRight: 103 }}>Ratings</Text>
                <Image source={{ uri: 'https://cdn.builder.io/api/v1/image/assets/TEMP/062a4b916dc84a95b4866d498eb1782b06b6566947808ad4f57d366b7f59bd20?apiKey=7b9918e68d9b487793009b3aea5b1a32' }} style={{ width: 75, height: 12 }} />
              </View>
              </View>
              <Text style={{ marginTop: 10, fontSize: 13, fontWeight: 'bold', color: 'black' }}>Feedback</Text>
              <View style={{ marginTop: 3.5, padding: 6, paddingTop: 8, paddingBottom: 150, backgroundColor: '#F4F4F4', borderRadius: 5, marginLeft: -3 }}>
                <TextInput
                  style={{ padding: 6, marginTop: 2.5, fontSize: 12, fontWeight: 'normal', color: '#6B7280', borderWidth: 1, outline: 'none', borderColor: '#F4F4F4', borderRadius: 5 }}
                  placeholder="Leave a Fededback..."
                />
              </View>
              <TouchableOpacity style={{ marginTop: 20, marginLeft: 400, backgroundColor: 'coral', borderRadius: 5 }}>
                <Text style={{ fontSize: 12, color: 'white', paddingVertical: 10, textAlign: 'center' }}>Send Feedback</Text>
              </TouchableOpacity>
            </View>
            <View style={{ flex: 1, marginLeft: 5, maxWidth: '22%' }}>
              {/* Wrapping content in a shadowed card */}
              <View style={{ marginRight: 100, marginLeft: 50, marginTop: 0, padding: 20, backgroundColor: 'white', width: 250, borderRadius: 10, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.25, shadowRadius: 3.84, elevation: 5 }}>
                <Image source={userImage} style={{ width: 100, height: 100, borderRadius: 82.5 }} />
                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 8 }}>
                  <Text style={{ fontSize: 14, fontWeight: 'bold', marginRight: 5 }}>Mike Owens</Text>
                  <View style={{ width: 8, height: 8, backgroundColor: '#22C55E', borderRadius: 4 }} />
                </View>
                <Text style={{ fontSize: 12, color: '#9CA3AF' }}>Fullstack Developer</Text>
                <View style={{ borderBottomWidth: 1, borderBottomColor: '#ccc', marginTop: 10, marginLeft: 5, marginRight: 5 }} />
                <Text style={{ marginTop: 10, fontSize: 10, color: '#6B7280' }}>ahmadyusu7@gmail.com</Text>
                <Text style={{ fontSize: 12, marginTop: 5 }}>15 year(s) experience</Text>
                <Text style={{ marginTop: 5, fontSize: 14, fontWeight: 'bold', color: '#206C00' }}>Hard Skills</Text>
                <Text style={{ marginTop: 2, fontSize: 12 }}>Responsive Design</Text>
                <Text style={{ fontSize: 12 }}>HTML, CSS, JavaScript</Text>
                <Text style={{ fontSize: 12 }}>React & Angular</Text>
                <Text style={{ fontSize: 12 }}>Python & Node.js</Text>
                <Text style={{ fontSize: 12 }}>Web security</Text>
                <Text style={{ marginTop: 5, fontSize: 14, fontWeight: 'bold', color: '#206C00' }}>Soft Skills</Text>
                <Text style={{ marginTop: 2, fontSize: 12 }}>Communication</Text>
                <Text style={{ fontSize: 12 }}>Problem-solving & Critical thinking</Text>
                <Text style={{ fontSize: 12 }}>Time Management</Text>
                <Text style={{ fontSize: 12 }}>Client Management</Text>
                <Text style={{ fontSize: 12 }}>Continuous Learning Mindset</Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}

export default MyComponent;
