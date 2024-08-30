import React, { useState, useEffect, useRef } from "react";
import { View, FlatList, Text, TouchableOpacity, Image, StyleSheet, Button } from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFonts } from "expo-font";
import { useTranslation } from "react-i18next";
import { format } from 'date-fns';
import { enGB } from 'date-fns/locale';

const defaultAvatar = require("../assets/account.png");

function CustomHeader({ onIconPress, isExpertsList }) {
  const { t } = useTranslation();

  return (
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
  );
}

function ChatListScreen({ onUserSelect }) {
  const [data, setData] = useState([]);
  const [expertsData, setExpertsData] = useState([]);
  const [isExpertsList, setIsExpertsList] = useState(false); // Track whether showing experts list

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

  const fetchExpertsData = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      if (token) {
        const response = await axios.get(
          "https://recruitangle.com/api/expert/getAllExperts",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setExpertsData(response.data.allExperts);
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
      <View style={styles.itemContainer}>
        <Image
          source={item.avatar}
          style={styles.itemAvatar}
        />
        <View style={{ flex: 1 }}>
          <Text style={styles.itemName}>{item.name}</Text>
          <Text style={styles.itemMessage} numberOfLines={1} ellipsizeMode="tail">
            {item.message}
          </Text>
        </View>
        <View style={{ flexDirection: "column" }}>
          <Text style={styles.itemTime}>{item.time}</Text>
          {item.messagecount !== "0" && (
            <View style={styles.messageCountContainer}>
              <Text style={styles.messageCount}>{item.messagecount}</Text>
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
    <View style={styles.container}>
      <CustomHeader
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
  container: {
    backgroundColor: '#fff',
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
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 18,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },
  itemAvatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    marginRight: 12,
  },
  itemName: {
    fontWeight: "bold",
    fontSize: 16,
  },
  itemMessage: {
    color: "#777",
    fontSize: 13,
    marginTop: 7,
  },
  itemTime: {
    color: "#777",
    fontSize: 13,
    marginBottom: 5,
    fontFamily: "Roboto-Light",
  },
  messageCountContainer: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: "#4CAF50",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 40,
  },
  messageCount: {
    color: "white",
    fontWeight: "500",
    fontSize: 10,
    fontFamily: "Roboto-Light",
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
