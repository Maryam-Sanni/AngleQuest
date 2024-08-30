import React, { useState, useEffect, useRef } from "react";
import { View, FlatList, Text, TouchableOpacity, Image, ScrollView, StyleSheet, Modal, Button } from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFonts } from "expo-font";
import { useTranslation } from "react-i18next";
import { formatDistanceToNow, format } from 'date-fns';
import { enGB } from 'date-fns/locale';

const defaultAvatar = require("../assets/account.png");

function CustomHeader({
  onPressAllChats,
  onPressHub,
  selectedHub,
  scrollViewRef,
  onIconPress,
  isExpertsList
}) {
  const scrollLeft = () => {
    scrollViewRef.current.scrollTo({ x: 0, y: 0, animated: true });
  };

  const scrollRight = () => {
    scrollViewRef.current.scrollToEnd({ animated: true });
  };

  const [fontsLoaded] = useFonts({
    "Roboto-Light": require("../assets/fonts/Roboto-Light.ttf"),
  });
  const { t } = useTranslation();
  
 
  
  return (
    <View style={{ width: "100%", backgroundColor: "white" }}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>{t("Chats")}</Text>
        {!isExpertsList && (
          <TouchableOpacity onPress={onIconPress} style={styles.iconButton}>
            <Image
              source={{ uri: "https://img.icons8.com/?size=100&id=A2t8GCGbC2PY&format=png&color=000000" }}
              style={styles.icon}
            />
          </TouchableOpacity>
        )}
        {isExpertsList && (
          <TouchableOpacity onPress={() => onIconPress(false)} style={styles.iconButton}>
            <Text style={styles.closeIcon}>✕</Text>
          </TouchableOpacity>
        )}
      </View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{ flexDirection: "row" }}
        ref={scrollViewRef}
      >
        <View style={{ flexDirection: "row", marginBottom: 20, marginTop: 10}}>
          <TouchableOpacity onPress={onPressAllChats}>
            <View
              style={{
                justifyContent: "flex-start",
                paddingHorizontal: 10,
                paddingVertical: 10,
                borderRadius: 20,
                borderColor: selectedHub === null ? "#153C2A" : "#63EC55",
                backgroundColor: selectedHub === null ? "#153C2A" : null,
                alignItems: "center",
                marginTop: 10,
                marginLeft: 10,
                borderWidth: 1,
                marginBottom: 5,
              }}
            >
              <Text
                style={{
                  fontSize: 14,
                  color: selectedHub === null ? "white" : "#153C2A",
                  textAlign: "center",
                  fontWeight: "600",
                }}
              >
                {t("All Chats")}
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={onPressHub}>
            <View
              style={{
                justifyContent: "flex-start",
                paddingHorizontal: 10,
                paddingVertical: 10,
                borderRadius: 20,
                borderColor: selectedHub === "Hub Members" ? "#153C2A" : "#63EC55",
                backgroundColor: selectedHub === "Hub Members" ? "#153C2A" : null,
                alignItems: "center",
                marginTop: 10,
                marginLeft: 15,
                borderWidth: 1,
                marginBottom: 5,
              }}
            >
              <Text
                style={{
                  fontSize: 14,
                  color: selectedHub === "Hub Members" ? "white" : "#153C2A",
                  textAlign: "center",
                  fontWeight: "600",
                }}
              >
                {t("Hub Members")}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

function ChatListScreen({ navigation, onUserSelect }) {
  const [selectedHub, setSelectedHub] = useState(null);
  const [data, setData] = useState([]);
  const scrollViewRef = useRef(null);
  const [expertsData, setExpertsData] = useState([]);
  const [isExpertsList, setIsExpertsList] = useState(false);

  const [fontsLoaded] = useFonts({
    "Roboto-Light": require("../assets/fonts/Roboto-Light.ttf"),
  });

  const fetchData = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      console.log("Token retrieved:", token);

      if (token) {
        const response = await axios.get(
          "https://recruitangle.com/api/expert/getAllJobSeekers",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        console.log("API response:", response.data);
        const result = response.data.allJobSeekers;

        // Retrieve all last messages and timestamps in parallel
        const chatDataPromises = result.map(item =>
          AsyncStorage.getItem(`lastMessage_${item.id}`)
        );
        const chatData = await Promise.all(chatDataPromises);

        // Process and format data
        const formattedData = result.map((item, index) => {
          const { lastMessage = "No messages", timestamp = new Date().toISOString() } = chatData[index] ? JSON.parse(chatData[index]) : {};

          // Determine the time format
          const now = new Date();
          const messageDate = new Date(timestamp);
          let timeFormatted = '';

          const today = new Date();
          today.setHours(0, 0, 0, 0);

          const yesterday = new Date(today);
          yesterday.setDate(yesterday.getDate() - 1);

          if (messageDate >= today) {
            timeFormatted = format(messageDate, 'h:mm a', { locale: enGB });
          } else if (messageDate >= yesterday) {
            timeFormatted = 'Yesterday';
          } else {
            timeFormatted = format(messageDate, 'MMM dd, yyyy', { locale: enGB });
          }

          return {
            id: item.id.toString(), // Ensure id is a string
            name: `${item.first_name} ${item.last_name}`,
            avatar: item.avatar_url ? { uri: item.avatar_url } : defaultAvatar,
            message: lastMessage,
            time: timeFormatted,
            timestamp: messageDate, // Include timestamp for sorting
            messagecount: "0",
            hub: "Hub Members",
          };
        });

       
        formattedData.sort((a, b) => b.timestamp - a.timestamp);

        setData(formattedData);
      } else {
        console.log("No token found");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    if (fontsLoaded) {
      fetchData();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return <View><Text>Loading fonts...</Text></View>;
  }

  const filteredData = selectedHub
    ? data.filter((user) => user.hub === selectedHub)
    : data;

  const handlePressAllChats = () => {
    setSelectedHub(null);
  };

  const handlePressHub = () => {
    setSelectedHub("Hub Members");
  };

  const fetchExpertsData = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      if (token) {
        const response = await axios.get(
          "https://recruitangle.com/api/expert/getAllJobSeekers",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setExpertsData(response.data.allJobSeekers);
        setIsExpertsList(true);
      } else {
        console.log("No token found");
      }
    } catch (error) {
      console.error("Error fetching experts data:", error);
    }
  };

  useEffect(() => {
    if (!isExpertsList && fontsLoaded) {
      fetchData();
    }
  }, [fontsLoaded, isExpertsList]);
  
  if (!fontsLoaded) {
    return <View><Text>Loading fonts...</Text></View>;
  }
  
  const renderChatItem = ({ item }) => (
    <TouchableOpacity onPress={() => onUserSelect(item.id)}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          padding: 16,
          borderBottomWidth: 1,
          borderBottomColor: "#E5E5E5",
          width: "100%",
          backgroundColor: "white",
        }}
      >
        <Image
          source={item.avatar}
          style={{ width: 36, height: 36, borderRadius: 18, marginRight: 12 }}
        />
        <View style={{ flex: 1 }}>
          <Text
            style={{
              fontWeight: "bold",
              fontSize: 16,
            }}
          >
            {item.name}
          </Text>
          <Text
            style={{ color: "#777", fontSize: 13, marginTop: 7 }}
            numberOfLines={1}  // Limit to 1 line
            ellipsizeMode="tail"  // Show "..." at the end if the text is too long
          >
            {item.message}
          </Text>
        </View>
        <View style={{ flexDirection: "column" }}>
          <Text
            style={{
              color: "#777",
              fontSize: 13,
              marginBottom: 5,
              fontFamily: "Roboto-Light",
            }}
          >
            {item.time}
          </Text>
          {item.messagecount !== "0" && (
            <View
              style={{
                width: 16,
                height: 16,
                borderRadius: 8,
                backgroundColor: "#4CAF50",
                justifyContent: "center",
                alignItems: "center",
                marginLeft: 40,
              }}
            >
              <Text
                style={{
                  color: "white",
                  fontWeight: "500",
                  fontSize: 10,
                  fontFamily: "Roboto-Light",
                }}
              >
                {item.messagecount}
              </Text>
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderExpertItem = ({ item }) => (
    <View style={styles.modalItemContainer}>
      <Image
        source={item.avatar_url ? { uri: item.avatar_url } : defaultAvatar}
        style={styles.modalItemAvatar}
      />
      <Text style={styles.modalItemText}>{item.first_name} {item.last_name}</Text>
    </View>
  );

  return (
    <View>
      <CustomHeader
        onPressAllChats={handlePressAllChats}
        onPressHub={handlePressHub}
        selectedHub={selectedHub}
        scrollViewRef={scrollViewRef}
      onIconPress={() => isExpertsList ? setIsExpertsList(false) : fetchExpertsData()}
        isExpertsList={isExpertsList}
      />
      {isExpertsList && <Text style={styles.heading}>New Chat</Text>}
      <FlatList
        data={isExpertsList ? expertsData : data}
        renderItem={isExpertsList ? renderExpertItem : renderChatItem}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  greenBox: {
    backgroundColor: "rgba(225,225,212,0.3)",
  },
  blurBackground: {
    flex: 1,
    backgroundColor: "rgba(255,255,255,0.3)",
  },
  headerContainer: {
    padding: 16,
    backgroundColor: '#F8F8F8',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerText: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  iconButton: {
    padding: 10,
  },
  icon: {
    width: 24,
    height: 24,
  },
  closeIcon: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  modalItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  modalItemAvatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    marginRight: 12,
  },
  modalItemText: {
    fontSize: 16,
  },
  heading: {
    fontSize: 18,
    padding: 16,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
    color: 'grey'
  },
});

export default ChatListScreen;
