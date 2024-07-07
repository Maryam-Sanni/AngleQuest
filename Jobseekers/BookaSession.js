import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, TextInput, ScrollView } from "react-native";
import DateTimePickerModal from "../components/DateTimePickerModal";
import Sidebar from '../components/sidebar';
import Topbar from '../components/topbar';
import { useFonts } from 'expo-font';
import { useTranslation } from 'react-i18next';


const MyComponent = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedDateTime, setSelectedDateTime] = useState(null);
  const [selectedServices, setSelectedServices] = useState([]);

  const handleConfirmDateTime = (dateTime) => {
    setSelectedDateTime(dateTime);
    setIsModalVisible(false);
  };

  const handleCancelModal = () => {
    setIsModalVisible(false);
  };

  const toggleService = (service) => {
    if (selectedServices.includes(service)) {
      setSelectedServices(selectedServices.filter(item => item !== service));
    } else {
      setSelectedServices([...selectedServices, service]);
    }
  };
  const [fontsLoaded]=useFonts({
    "Roboto-Light":require("../assets/fonts/Roboto-Light.ttf"),
      })
      const {t}=useTranslation()

  return (
    <View style={{ flex: 1 }}>
      <Topbar />
      <View style={{ flexDirection: 'row', flex: 1 }}>
        <Sidebar />
        <ScrollView contentContainerStyle={{ flexGrow: 1, maxHeight: 500 }}>
          <View style={{ flex: 1, alignItems: "center", paddingHorizontal: 8, paddingTop: 8, paddingBottom: 20, backgroundColor: "white", marginLeft: 230, marginTop: 30 }}>
            <View style={{ alignSelf: "stretch", paddingRight: 5, maxWidth: "100%" }}>
              <Text style={{ fontSize: 18, color: "green", marginBottom: 20, fontWeight: 'bold',fontFamily:"Roboto-Light" }}>{t("Book Session with Expert")}</Text>
              {/* Weekdays */}
              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <View style={{ flex: 1, marginRight: 5 }}>
                <TouchableOpacity onPress={() => setIsModalVisible(true)}>
                    <View style={{ justifyContent: "center", alignItems: "flex-start", padding: 5, borderRadius: 5, backgroundColor: "#A2BE95", marginBottom: 10, marginRight: -70 }}>
                      <Text style={{ fontSize: 14, color: "white", fontWeight: 'bold', marginBottom: 10, marginLeft: 5, marginTop: 10, fontFamily:"Roboto-Light" }}>{t("Pick a schedule")}</Text>
                      <View style={{ flexDirection: "row", alignItems: "center", marginLeft: 5 }}>
                        {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day, index) => (
                          <View key={index} style={{ justifyContent: "center", alignItems: "center", padding: 5, borderRadius: 5, borderColor: "white", borderWidth: 1, marginRight: 5, marginBottom: 5 }}>
                            <Text style={{ color: "white", fontFamily:"Roboto-Light" }}>{day}</Text>
                          </View>
                        ))}
                      </View>
                      <View style={{ marginTop: 10, flexDirection: "row", justifyContent: "space-between" }}>
                        <View style={{ flexDirection: "row", alignItems: "center", marginLeft: 5}}>
                          <Text style={{ fontSize: 12, color: "white", marginRight: 5,    fontFamily:"Roboto-Light" }}>From:</Text>
                          <Text style={{ fontSize: 10, color: "green", borderColor: '#CEF1BF', backgroundColor: '#CEF1BF', paddingHorizontal: 15, paddingVertical: 5, borderWidth: 1, borderRadius: 5, marginRight: 5,fontFamily:"Roboto-Light" }}>07:30</Text>
                        </View>
                        <Text style={{ fontSize: 10, color: "green", borderColor: '#CEF1BF', backgroundColor: '#CEF1BF', paddingHorizontal: 8, paddingVertical: 5, borderWidth: 1, borderRadius: 5, marginRight: 5,fontFamily:"Roboto-Light"  }}>am</Text>
                        <Text style={{ fontSize: 10, color: "green", borderColor: '#CEF1BF', backgroundColor: '#CEF1BF', paddingHorizontal: 5, paddingVertical: 5, borderWidth: 1, borderRadius: 5, marginRight: 5,fontFamily:"Roboto-Light"  }}>^</Text>
                        <Text style={{ fontSize: 12, color: "white", marginLeft: 25, marginRight: 5, marginTop: 5,fontFamily:"Roboto-Light" }}>To:</Text>
                        <Text style={{ fontSize: 10, color: "green", borderColor: '#CEF1BF', backgroundColor: '#CEF1BF', paddingHorizontal: 15, paddingVertical: 5, borderWidth: 1, borderRadius: 5, marginRight: 5,fontFamily:"Roboto-Light"  }}>07:30</Text>
                        <Text style={{ fontSize: 10, color: "green", borderColor: '#CEF1BF', backgroundColor: '#CEF1BF', paddingHorizontal: 8, paddingVertical: 5, borderWidth: 1, borderRadius: 5, marginRight: 5,fontFamily:"Roboto-Light" }}>am</Text>
                        <Text style={{ fontSize: 10, color: "green", borderColor: '#CEF1BF', backgroundColor: '#CEF1BF', paddingHorizontal: 5, paddingVertical: 5, borderWidth: 1, borderRadius: 5, marginRight: 5,fontFamily:"Roboto-Light"  }}>^</Text>
                      </View>
                      <View style={{ justifyContent: "center", alignItems: "center", padding: 25, marginLeft: 155, marginTop: -25 }}>
                        
                      </View>
                    </View>
                  </TouchableOpacity>
             
                </View>
                {/* Available Day & Time */}
                <View style={{ flex: 1, marginLeft: 150 }}>
                  <Text style={{ fontSize: 14, color: "#206C00", fontWeight: 'bold', marginBottom: 10,fontFamily:"Roboto-Light" }}>{t("Expert is Available")}:</Text>
                  <View style={styles.scheduleContainer}>
                    <View style={styles.schedule}>
                      <Text style={styles.scheduleDay}>Mon-Fri</Text>
                      <Text style={styles.scheduleTime}>09:00am-11:00pm GMT+2</Text>
                    </View>
                  </View>
                  <View style={styles.scheduleContainer}>
                    <View style={styles.schedule}>
                      <Text style={styles.scheduleDay2}>Sat-Sun</Text>
                      <Text style={styles.scheduleTime2}>10:00am-04:00pm GMT+2</Text>
                    </View>
                  </View>
                </View>
                {/* Service Needed */}
                <View style={{ flex: 1, marginLeft: 100 }}>
                  <Text style={{ fontSize: 14, color: "#206C00", fontWeight: 'bold', marginBottom: 20,fontFamily:"Roboto-Light" }}>{t("Selected Service")}</Text>
                  {["Career Advice", "Interview Session", "Growth Plan Session"].map((service, index) => (
                    <View key={index} style={{ flexDirection: "row", alignItems: "center", marginBottom: 20 }}>
                      <TouchableOpacity onPress={() => toggleService(service)} style={{ height: 15, width: 15, borderRadius: 10, borderWidth: 1, borderColor: "#4A5568", marginRight: 5, backgroundColor: selectedServices.includes(service) ? "#A2BE95" : "transparent" }} />
                      <Text style={{fontFamily:"Roboto-Light"}}>{service}</Text>
                    </View>
                  ))}
                </View>
              </View>
            </View>
            {/* Payment */}
            <View style={{ flexDirection: "row", justifyContent: "space-between", alignSelf: "stretch", paddingVertical: 20, marginTop: 30, backgroundColor: "#F8F8FF", borderRadius: 5, maxWidth: "100%" }}>
              {selectedDateTime && (
        <Text style={{ marginLeft: 15, fontSize: 14, color: "black", flexShrink: 1,fontFamily:"Roboto-Light"}}>{t("Payment for session with Mr John Smith scheduled for: {selectedDateTime}")}</Text>
      )}
              <Text style={{ fontSize: 15, color: "#20C600", fontWeight: 'bold', marginRight: 50, alignSelf: "flex-start",fontFamily:"Roboto-Light" }}>$25.00</Text>
            </View>
            <TouchableOpacity style={{ justifyContent: "center", alignItems: "center", paddingVertical: 10, marginTop: 25, backgroundColor: "coral", borderRadius: 5, width: "100%", maxWidth: 250 }}>
              <Text style={{ fontSize: 14, color: "white", fontWeight: 'bold',fontFamily:"Roboto-Light" }}>{t("Pay with Billing Info")}</Text>
            </TouchableOpacity>
            <Text style={{ marginTop: 10, fontSize: 16, fontWeight: "bold", color: "black",fontFamily:"Roboto-Light" }}>{t("Or")}</Text>
            {/* Card Number */}
            <View style={{ marginTop: 20, width: "100%", maxWidth: 890 }}>
              <Text style={{ fontSize: 14, fontWeight: "bold", color: "black",fontFamily:"Roboto-Light" }}>Card Number</Text>
              <View style={{ flexDirection: "row", alignItems: "center", padding: 10, marginTop: 5, backgroundColor: "white", borderRadius: 5, borderWidth: 1, borderColor: "grey" }}>
                <TextInput style={{ color: 'grey', flex: 1, fontSize: 12, outline: 'none',fontFamily:"Roboto-Light" }} placeholder="1111 2222 3333 4444" />
              </View>
            </View>
            {/* First and Last Name */}
            <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 20, width: "100%", maxWidth: 900 }}>
              <View style={{ flex: 1, paddingRight: 8, marginRight: 80 }}>
                <Text style={{ fontSize: 14, fontWeight: "bold", color: "black",fontFamily:"Roboto-Light" }}>{t("First Name")}</Text>
                <TextInput style={{ color: 'grey', padding: 10, marginTop: 1, fontSize: 12, backgroundColor: "white", borderRadius: 5, borderWidth: 1, borderColor: "grey",fontFamily:"Roboto-Light" }} placeholder="Enter First Name" />
              </View>
              <View style={{ flex: 1, paddingRight: 9 }}>
                <Text style={{ fontSize: 14, fontWeight: "bold", color: "black",fontFamily:"Roboto-Light" }}>{t("Last Name")}</Text>
                <TextInput style={{ color:'grey', padding: 10, marginTop: 1, fontSize: 12, backgroundColor: "white", borderRadius: 5, borderWidth: 1, borderColor: "grey",fontFamily:"Roboto-Light"}} placeholder="Enter Last Name" />
              </View>
            </View>
            {/* Expiry Date and Security Code */}
            <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 20, width: "100%", maxWidth: 900 }}>
              <View style={{ flex: 1, paddingRight: 8, marginRight: 80 }}>
                <Text style={{ fontSize: 14, fontWeight: "bold", color: "black",fontFamily:"Roboto-Light" }}>{t("Expiration Month/Year")}</Text>
                <TextInput style={{ color:'grey', padding: 10, marginTop: 5, fontSize: 12, backgroundColor: "white", borderRadius: 5, borderWidth: 1, borderColor: "grey",fontFamily:"Roboto-Light" }} placeholder="MM/YY" />
              </View>
              <View style={{ flex: 1, paddingRight: 9 }}>
                <Text style={{ fontSize: 14, fontWeight: "bold", color: "black",fontFamily:"Roboto-Light" }}>{t("Security Code")}</Text>
                <TextInput style={{ color: 'grey', padding: 10, marginTop: 5, fontSize: 12, backgroundColor: "white", borderRadius: 5, borderWidth: 1, borderColor: "grey",fontFamily:"Roboto-Light" }} placeholder="3 digits" />
              </View>
            </View>
            {/* Book Session Button */}
            <TouchableOpacity style={{ justifyContent: "center", alignItems: "center", paddingVertical: 8, marginTop: 20, marginBottom: 20, backgroundColor: "coral", borderRadius: 5, width: "100%", maxWidth: 200 }}>
              <Text style={{ fontSize: 16, color: "white", fontWeight: 'bold',fontFamily:"Roboto-Light" }}>{t("Book Session")}</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
      <DateTimePickerModal
        isVisible={isModalVisible}
        onConfirm={handleConfirmDateTime}
        onCancel={handleCancelModal}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  scheduleContainer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  schedule: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  scheduleDay: {
    color: '#206C00',
    marginRight: 5,
    borderColor: '#206C00',
    backgroundColor: '#CEF1BF',
    borderWidth: 1,
    borderBottomWidth: 0,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 0,
    fontFamily:"Roboto-Light"
  },
  scheduleTime: {
    color: 'black',
    marginLeft: -5,
    borderRightWidth: 1,
    borderColor: '#206C00',
    borderRadius: 0,
    borderTopWidth: 1, 
    backgroundColor: 'white',
    paddingHorizontal: 18,
    paddingVertical: 5,
    fontFamily:"Roboto-Light"
  },
  scheduleDay2: {
    marginTop: -20,
    color: '#206C00',
    marginRight: 5,
    borderColor: '#206C00',
    backgroundColor: '#CEF1BF',
    borderWidth: 1,
    paddingHorizontal: 10.5,
    paddingVertical: 5,
    borderRadius: 0,
    fontFamily:"Roboto-Light"
  },
  scheduleTime2: {
    marginTop: -20,
    color: 'black',
    marginLeft: -5,
    borderRightWidth: 1,
    borderColor: '#206C00',
    borderRadius: 0,
    borderTopWidth: 1, 
    borderBottomWidth: 1,
    backgroundColor: 'white',
    paddingHorizontal: 18.5,
    paddingVertical: 5,
    fontFamily:"Roboto-Light"
  },
});

export default MyComponent;
