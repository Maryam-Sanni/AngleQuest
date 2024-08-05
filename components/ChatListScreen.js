import React, { useState, useEffect, useRef } from "react";
import { View, FlatList, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFonts } from "expo-font";
import { useTranslation } from "react-i18next";
import { formatDistanceToNow, format } from 'date-fns';
import { enGB } from 'date-fns/locale';

const defaultAvatar = require("../assets/account.png");

function CustomHeader() {
  const { t } = useTranslation();

  return (
    <View style={styles.headerContainer}>
      <Text style={styles.headerText}>{t("Chats")}</Text>
    </View>
  );
}

function ChatListScreen({ onUserSelect }) {
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
          "https://recruitangle.com/api/expert/getAllExperts",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        console.log("API response:", response.data);
        const result = response.data.allExperts;

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

          // Calculate the start of today and yesterday
          const today = new Date();
          today.setHours(0, 0, 0, 0);

          const yesterday = new Date(today);
          yesterday.setDate(yesterday.getDate() - 1);

          if (messageDate >= today) {
            // Message sent today
            timeFormatted = format(messageDate, 'h:mm a', { locale: enGB });
          } else if (messageDate >= yesterday) {
            // Message sent yesterday
            timeFormatted = 'Yesterday';
          } else {
            // Message sent earlier
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
          };
        });

        // Sort the data by timestamp in descending order
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
            numberOfLines={1} 
            ellipsizeMode="tail"
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
    <View style={styles.container}>
      <CustomHeader />
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headerContainer: {
    padding: 16,
    backgroundColor: '#F8F8F8',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },
  headerText: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 18,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },
  greenBox: {
    backgroundColor: "rgba(225,225,212,0.3)",
  },
  blurBackground: {
    flex: 1,
    backgroundColor: "rgba(255,255,255,0.3)",
  },
});

export default ChatListScreen;
