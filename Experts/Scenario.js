import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Image,
  TouchableOpacity,
  Modal,
  ImageBackground,
  Picker,
} from "react-native";
import Topbar from "../components/expertstopbar";
import Sidebar from "../components/expertssidebar";
import { useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import { useFonts } from "expo-font";
import OpenModal from "../Experts/NewProject";

function MyComponent() {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);

  const [fontsLoaded] = useFonts({
    "Roboto-Light": require("../assets/fonts/Roboto-Light.ttf"),
  });
  const { t } = useTranslation();

  const handleOpenPress = () => {
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  return (
    <ImageBackground
      source={require("../assets/backgroundimg2.png")}
      style={{ height: "150%", width: "100%", flex: 1 }}
    >
      <View style={{ flex: 1 }}>
        <Topbar />
        <View style={{ flexDirection: "row", flex: 1 }}>
          <Sidebar />
          <ScrollView contentContainerStyle={{ flexGrow: 1, maxHeight: 500 }}>
            <View style={{ marginLeft: 210 }}>
              <View style={styles.header}>
                <TouchableOpacity>
                  <View style={styles.item}>
                    <Image
                      source={{
                        uri: "https://img.icons8.com/?size=100&id=53380&format=png&color=5B5D55",
                      }}
                      style={styles.image}
                    />
                    <Text style={styles.headertext}>{t("Scenario Project")}</Text>
                  </View>
                </TouchableOpacity>
              </View>

              <View style={styles.container}>
                <Text style={styles.title}>
                  {t("Scenario Project for your Team Members")}
                </Text>
                <Text
                  style={{
                    color: "white",
                    fontSize: 16,
                    marginTop: 5,
                    textAlign: "flex-start",
                  }}
                >
                  {t("This is a guided scenario based project")}
                </Text>
                <Text
                  style={{
                    color: "coral",
                    fontSize: 24,
                    fontWeight: "600",
                    marginTop: 5,
                    textAlign: "left",
                  }}
                >
                  {t("Hi There, Scenario project is coming soon!")}
                </Text>
                 <View style={{flexDirection: 'row'}}>
                <View style={styles.viewbox}>
                  <View style={{justifyContent: 'center', alignItems: 'center'}}>
                  <Text style={{ fontSize: 14, color: "black", fontWeight: '600',fontFamily:"Roboto-Light"}}>{t("Hub Members")}</Text>
                <Text style={{ fontSize: 13, color: "grey", marginTop: 10,fontFamily:"Roboto-Light"}}>Unassigned to scenario project</Text>
                    <TouchableOpacity style={{  backgroundColor: 'coral', padding: 10, paddingHorizontal: 10, marginTop: 20, borderRadius: 5, marginLeft: 10, marginRight: 10 }} >
                       <Text style={{ color: 'white', textAlign: 'center', fontSize: 13, fontWeight: '600',fontFamily:"Roboto-Light"}}>{t("View")}</Text>
                      </TouchableOpacity>
                      </View>
                       </View>

                   <View style={styles.viewbox2}>
                     <View style={{justifyContent: 'center', alignItems: 'center'}}>
                       <Text style={{ fontSize: 14, color: "black", fontWeight: '600',fontFamily:"Roboto-Light"}}>{t("Hub Members")}</Text>
                       <Text style={{ fontSize: 13, color: "grey", marginTop: 10,fontFamily:"Roboto-Light"}}>Assigned to scenario project</Text>
                   <TouchableOpacity style={{  backgroundColor: 'coral', padding: 10, paddingHorizontal: 10, marginTop: 20, borderRadius: 5, marginLeft: 10, marginRight: 10 }} >
                         <Text style={{ color: 'white', textAlign: 'center', fontSize: 13, fontWeight: '600',fontFamily:"Roboto-Light"}}>{t("View")}</Text>
                         </TouchableOpacity>
                         </View>
                          </View>
                 </View>
                <View style={styles.box}>
                  <View style={{ flexDirection: "column" }}>
                    <View style={{ flexDirection: "row" }}>
                      <View style={styles.longbox}>
                        <Text
                          style={{
                            fontSize: 20,
                            fontWeight: "600",
                            marginTop: 5,
                          }}
                        >
                          {t("Awaiting Your Action")}
                        </Text>
                        <Text
                          style={{
                            color: "grey",
                            fontSize: 14,
                            marginTop: 40,
                            textAlign: "center",
                          }}
                        >
                          {t("You are all caught up in your tasks")}
                        </Text>
                      </View>
                      <View style={styles.notifbox}>
                        <View style={{ flexDirection: "row" }}>
                          <Text
                            style={{
                              color: "#206C00",
                              fontSize: 18,
                              fontWeight: 500,
                            }}
                          >
                            {t("Notifications")}
                          </Text>
                          <Text
                            style={{
                              fontSize: 14,
                              marginLeft: 90,
                              fontWeight: "300",
                            }}
                          >
                            1 of 3 &#8592; &#8594;
                          </Text>
                        </View>
                        <View style={{flexDirection: 'row'}}>
                        <Image
                         source={require('../assets/Untitled design (2).png')}
                          style={{marginTop: 10, height: 130}}
                        />
                          <Text
                            style={{
                              fontSize: 16,
                              fontWeight: 600,
                              marginLeft: 20,
                              marginTop: 10,
                            }}
                          >
                           Notifications from...
                            <Text
                              style={{
                                fontSize: 14,
                                 fontWeight: 400,
                              }}
                            >
                             Hub Chat
                            </Text>
                          </Text>
                        </View>
                      </View>
                    </View>
                    <View style={{ flexDirection: "row" }}>
                      <View style={styles.longbox2}>
                        <Text
                          style={{
                            fontSize: 20,
                            fontWeight: "600",
                            marginTop: 5,
                          }}
                        >
                          {t("Timely Suggestions")}
                        </Text>
                        <View style={styles.linebox}>
                          <Text
                            style={{
                              color: "#206C00",
                              fontSize: 18,
                              fontWeight: 500,
                            }}
                          >
                            {t("Project Stand Up")}
                          </Text>
                          <View style={{ flexDirection: "row" }}>
                            <Text
                              style={{
                                color: "grey",
                                fontSize: 14,
                                marginTop: 10,
                              }}
                            >
                              {t(
                                "Discuss your aspirations, career interests and stay aligned on your priorities",
                              )}
                            </Text>
                            <TouchableOpacity
                              style={{
                                width: 70,
                                height: 30,
                                borderRadius: 5,
                                marginLeft: 40,
                                backgroundColor: "coral",
                                justifyContent: "center",
                              }}
                            >
                              <Text
                                style={{
                                  color: "white",
                                  fontSize: 14,
                                  textAlign: "center",
                                }}
                              >
                                {t("Join")}
                              </Text>
                            </TouchableOpacity>
                          </View>
                        </View>
                      </View>
                      <View style={styles.leanbox}>
                       
                      </View>
                    </View>
                    <View style={{ flexDirection: "row" }}>
                      <View style={styles.bigbox}>
                        <Text
                          style={{
                            fontSize: 20,
                            fontWeight: "600",
                            marginTop: 5,
                          }}
                        >
                          {t("Recommended Roles for you")}
                        </Text>

                        <View style={{flexDirection: 'row'}}>
                            <Image
                         source={require('../assets/Untitled design.png')}
                          style={{marginTop: 10}}
                        />
                          <Image
                           source={require('../assets/Untitled design (1).png')}
                            style={{marginTop: 10, marginLeft: 20}}
                          />
                        </View>
                         <View style={{flexDirection: 'row'}}>
                        <View style={styles.smallbox}>
                            <Text
                              style={{
                                color: "#206C00",
                                fontSize: 16,
                                marginTop: 10,
                              }}
                            >
                              SAP Junior Consultant - Finance
                            </Text>
                          <Text
                            style={{
                              fontWeight: 500,
                              fontSize: 14,
                              marginTop: 5,
                            }}
                          >
                            Some subheading goes here
                          </Text>
                          <TouchableOpacity
                            style={{
                              width: 100,
                              height: 30,
                              borderRadius: 5,
                              backgroundColor: "coral",
                              justifyContent: "center",
                              marginTop: 10
                            }}
                            onPress={handleOpenPress}
                          >
                            <Text
                              style={{
                                color: "white",
                                fontSize: 14,
                                textAlign: "center",
                              }}
                            >
                              {t("Assign")}
                            </Text>
                          </TouchableOpacity>
                          </View>
                        <View style={styles.smallbox}>
                          <Text
                            style={{
                              color: "#206C00",
                              fontSize: 16,
                              marginTop: 10,
                            }}
                          >
                            SAP Junior Consultant - Materials Management
                          </Text>
                          <Text
                            style={{
                              fontWeight: 500,
                              fontSize: 14,
                              marginTop: 5,
                            }}
                          >
                            Some subheading goes here
                          </Text>
                          <TouchableOpacity
                            style={{
                              width: 100,
                              height: 30,
                              borderRadius: 5,
                              backgroundColor: "coral",
                              justifyContent: "center",
                              marginTop: 10
                            }}
                            onPress={handleOpenPress}
                          >
                            <Text
                              style={{
                                color: "white",
                                fontSize: 14,
                                textAlign: "center",
                              }}
                            >
                              {t("Assign")}
                            </Text>
                          </TouchableOpacity>
                        </View>
                         </View>
                      </View>
                     
                    </View>
                  </View>
                </View>
              </View>
            </View>
            <Modal
              animationType="slide"
              transparent={true}
              visible={modalVisible}
              onRequestClose={handleCloseModal}
            >
              <View style={styles.modalContent}>
                <OpenModal onClose={() => handleCloseModal()} />
              </View>
            </Modal>
          </ScrollView>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  modalContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    borderRadius: 10,
  },
  header: {
    marginLeft: -60,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(225,225,212,0.3)",
    backgroundColor: "#f7fff4",
  },
  item: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginRight: 10,
  },
  headertext: {
    marginLeft: 5,
    fontSize: 14,
    fontWeight: "500",
    marginTop: 7,
    color: "#666",
    fontFamily: "Roboto-Light",
  },
  image: {
    width: 21,
    height: 21,
    marginRight: 5,
    marginTop: 5,
    marginLeft: 100,
  },
  container: {
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 30,
    marginRight: 30,
    marginTop: 40,
  },
  box: {
    backgroundColor: "rgba(225,255,212,0.1)",
    marginTop: 20,
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
    width: 1100,
  },
  longbox: {
    backgroundColor: "#f7fff4",
    width: 700,
    height: 150,
    borderRadius: 10,
    padding: 20,
    borderColor: "rgba(255,255,255,0.5)",
    borderWidth: 1,
  },
  longbox2: {
    backgroundColor: "#f7fff4",
    width: 700,
    height: 200,
    borderRadius: 10,
    padding: 20,
    marginTop: -10,
    borderColor: "rgba(255,255,255,0.5)",
    borderWidth: 1,
  },
  linebox: {
    borderColor: "#206C00",
    borderWidth: 1,
    width: 660,
    borderRadius: 5,
    padding: 20,
    marginTop: 10,
    height: 110,
  },
  notifbox: {
    backgroundColor: "#f7fff4",
    width: 350,
    height: 200,
    borderRadius: 10,
    marginLeft: 30,
    borderColor: "rgba(255,255,255,0.5)",
    borderWidth: 1,
    padding: 20,
  },
  leanbox: {
    backgroundColor: "white",
    width: 350,
    height: 200,
    marginLeft: 30,
    marginTop: 40,
    borderColor: "black",
    borderWidth: 2,
    padding: 20,
  },
  bigbox: {
    backgroundColor: "#f7fff4",
    width: 700,
    height: 470,
    borderRadius: 10,
    marginTop: -10,
    padding: 20,
    borderColor: "rgba(255,255,255,0.5)",
    borderWidth: 1,
  },
  smallbox: {
    backgroundColor: "white",
    width: 325,
    height: 150,
    marginRight: 10,
    marginTop: 30,
    padding: 20,
    borderColor: 'green',
    borderWidth: 1,
  },
  viewbox: {
    backgroundColor: '#f7fff4',
    marginTop: 50,
    padding: 20,
    borderRadius: 20,
    alignItems: 'center',
      justifyContent: 'center',
    width: 250,
    marginLeft: -520,
    marginRight: 20,
    height: 150,
    borderWidth: 2, borderColor: 'rgba(225,225,212,0.3)',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  viewbox2: {
    backgroundColor: '#f7fff4',
    marginTop: 50,
    padding: 20,
    borderRadius: 20,
    alignItems: 'center',
      justifyContent: 'center',
    width: 250,
    marginRight: 20,
    height: 150,
    borderWidth: 2, borderColor: 'rgba(225,225,212,0.3)',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  picker: {
    height: 40,
    width: 150,
    borderColor: "#206C00",
    borderWidth: 1,
    color: "black",
    fontSize: 14,
    marginLeft: 10,
    borderRadius: 5,
  },
  PDF: {
    height: 40,
    width: 180,
    backgroundColor: "coral",
    borderColor: "coral",
    borderWidth: 1,
    color: "black",
    fontSize: 14,
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    right: 60,
    borderRadius: 5,
    marginTop: 50,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    textAlign: "flex-start",
    color: "white",
    marginTop: 5,
  },
  title2: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    color: "coral",
    marginTop: 5,
  },
  chartContainer: {
    flexDirection: "row",
    alignItems: "flex-end",
  },
  yAxis: {
    justifyContent: "space-between",
    marginRight: 10,
    height: 200,
  },
  yAxisLabel: {
    fontSize: 12,
  },
  chartArea: {
    flexDirection: "row",
    alignItems: "flex-end",
  },
  barsContainer: {
    flexDirection: "row",
    alignItems: "flex-end",
    height: 200,
    justifyContent: "space-around",
  },
  barContainer: {
    alignItems: "center",
    justifyContent: "flex-end",
    width: 40,
    marginHorizontal: 10, // Add spacing between bars
  },
  bar: {
    width: "100%",
    backgroundColor: "#206C00",
  },
  label: {
    marginTop: 5,
    fontSize: 12,
  },
  GchartContainer: {
    flexDirection: "column",
    alignItems: "flex-start",
  },
  GxAxis: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 50,
    marginTop: 5,
  },
  GxAxisLabel: {
    fontSize: 12,
    marginHorizontal: 30,
  },
  GchartArea: {
    flexDirection: "row",
    alignItems: "flex-end",
  },
  GgroupContainer: {
    flexDirection: "column",
    alignItems: "flex-end",
    marginVertical: 5,
    marginHorizontal: 10,
  },
  GgroupLabel: {
    fontSize: 14,
    marginBottom: 5,
    marginHorizontal: 30,
  },
  GgroupBars: {
    flexDirection: "row", // Change to 'row' to align items in a row
    alignItems: "flex-end",
    justifyContent: "space-around",
  },
  GbarContainer: {
    flexDirection: "column", // Change to 'column' to align items vertically
    alignItems: "flex-end",
    marginHorizontal: 2, // Add spacing between bars
  },
  Gbar: {
    width: 12,
    height: "100%",
    marginBottom: 5,
  },
  GgroupLabel: {
    fontSize: 14,
    marginBottom: 5,
  },
  GxAxis: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 50,
    marginTop: 5,
  },
  GxAxisLabel: {
    fontSize: 14,
    marginHorizontal: 22,
  },
  GyAxis: {
    alignItems: "flex-end",
    justifyContent: "space-between",
    height: 200, // Height of the chart area
    marginRight: 10,
  },
  GyAxisLabel: {
    fontSize: 12,
  },
  dataContainer: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
    paddingHorizontal: 0, // Removed horizontal padding
    paddingTop: 10,
    paddingBottom: 20,
  },
  line: {
    flexDirection: "row",
    alignItems: "flex-end",
    position: "absolute",
    marginBottom: 40,
    width: "100%",
    height: "50%",
    zIndex: 0,
  },
  dataPoint: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#006400",
    position: "absolute",
    zIndex: 1,
  },
  connector: {
    position: "absolute",
    height: 2,
    backgroundColor: "#006400",
    zIndex: -1,
  },
  labelsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    paddingHorizontal: 0,
    marginTop: 0,
  },
  Llabel: {
    fontSize: 12,
    textAlign: "center",
  },
  resultContainer: {
    marginTop: 16,
  },
  resultText: {
    fontSize: 16,
    marginVertical: 4,
  },
});

export default MyComponent;
