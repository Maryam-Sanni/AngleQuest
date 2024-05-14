import React from "react";
import { View, Text, Image } from "react-native";

function MyComponent() {
  return (
    <View style={{ flex: 1, marginTop: 30, marginLeft: 20, marginRight: 20}}>
     
      <View style={{ flexDirection: "row", marginTop: 4, paddingRight: 2 }}>
        <Text style={{ fontSize: 16, fontWeight: "bold", color: "black" }}>
          Nathan Arthur
        </Text>
        <View
          style={{
            width: 2,
            height: 2,
            backgroundColor: "green",
            borderRadius: 1,
            marginLeft: 2,
          }}
        />
      </View>
      <Text style={{ fontSize: 12, color: "#A0AEC0" }}>Web Developer</Text>
      <View style={{ borderBottomWidth: 1, borderBottomColor: '#ccc', marginTop: 10 }} />
      <Text style={{ marginTop: 10, fontSize: 12, color: "#206C00" }}>
        nathanar77@gmail.com
      </Text>
      <View style={{ borderBottomWidth: 1, borderBottomColor: '#ccc', marginTop: 10 }} />
      <Text style={{ marginTop: 10, fontSize: 14, color: "black" }}>
        15 year(s) experience
      </Text>
      <View style={{ borderBottomWidth: 1, borderBottomColor: '#ccc', marginTop: 10 }} />
      <Text style={{ marginTop: 10, fontSize: 14, color: "#206C00", fontWeight: '600'}}>
        Hard Skills
      </Text>
      <Text style={{ marginTop: 10, fontSize: 12, color: "black" }}>
        • Responsive Design
      </Text>
      <Text style={{ marginTop: 5, fontSize: 12, color: "black" }}>
       • HTML, CSS, JavaScript
      </Text>
      <Text style={{ marginTop: 5, fontSize: 12, color: "black" }}>
        • React & Angular
      </Text>
      <Text style={{ marginTop: 5, fontSize: 12, color: "black" }}>
        • Python & Node.js
      </Text>
      <Text style={{ marginTop: 5, fontSize: 12, color: "black" }}>
        • Web security
      </Text>
      <View style={{ borderBottomWidth: 1, borderBottomColor: '#ccc', marginTop: 10 }} />
      <Text style={{ marginTop: 10, fontSize: 14, color: "#206C00", fontWeight: '600' }}>
        Soft Skills
      </Text>
      <Text style={{ marginTop: 10, fontSize: 12, color: "black" }}>
        • Communication
      </Text>
      <Text style={{ marginTop: 5, fontSize: 12, color: "black" }}>
        • Problem-solving & Critical thinking
      </Text>
      <Text style={{ marginTop: 5, fontSize: 12, color: "black" }}>
        • Time Management
      </Text>
      <Text style={{ marginTop: 5, fontSize: 12, color: "black" }}>
        • Client Management
      </Text>
      <Text style={{ marginTop: 5, fontSize: 12, color: "black" }}>
        • Continuous Learning Mindset
      </Text>
      <View style={{ borderBottomWidth: 1, borderBottomColor: '#ccc', marginTop: 10 }} />
      <Text style={{ marginTop: 10, fontSize: 14, color: "#A0AEC0" }}>
        Received files
      </Text>
      <View style={{ flexDirection: "row", justifyContent: "space-between", paddingHorizontal: 1, marginTop: 10 }}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Image
            source={{
              uri:
                "https://cdn.builder.io/api/v1/image/assets/TEMP/b79c39e1425278a7e41c51ee38aead4f0c299b3e3b1c3700672a00748cf50159?apiKey=7b9918e68d9b487793009b3aea5b1a32&",
            }}
            style={{ width: 35, height: 35, aspectRatio: 1 }}
          />
          <View style={{ marginLeft: 5 }}>
            <Text style={{ color: "#206C00", textDecoration: 'underline' }}>NathanCV.pdf</Text>
            <Text style={{ color: "#A0AEC0", fontSize: 10 }}>293 kb</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

export default MyComponent;