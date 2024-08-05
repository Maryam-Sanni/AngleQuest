import React, { useState, useEffect, useRef } from "react";
import { View, FlatList, Text, TouchableOpacity, Image, ScrollView, StyleSheet } from "react-native";
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
      <View style={{ backgroundColor: '#F8F8F8' }}>
        <Text
          style={{
            fontSize: 22,
            fontWeight: "bold",
            textAlign: "flex-start",
            borderBottomWidth: 1,
            borderBottomColor: '#E5E5E5',
            padding: 18,
          }}
        >
          {t("Chats")}
        </Text>
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

  const renderItem = ({ item }) => (
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

  return (
    <View>
      <CustomHeader
        onPressAllChats={handlePressAllChats}
        onPressHub={handlePressHub}
        selectedHub={selectedHub}
        scrollViewRef={scrollViewRef}
      />
      <FlatList
        data={filteredData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
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
});

export default ChatListScreen;
