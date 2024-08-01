import React, { useState, useEffect } from 'react';
import { View, FlatList, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    const loadFonts = async () => {
      // Load your fonts here, and then set fontsLoaded to true
      // e.g., await Font.loadAsync({ 'Roboto-Light': require('../assets/fonts/Roboto-Light.ttf') });
      setFontsLoaded(true);
    };

    loadFonts();
  }, []);

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

        const formattedData = result.map((item) => ({
          id: item.id.toString(), // Ensure id is a string
          name: `${item.first_name} ${item.last_name}`,
          avatar: item.avatar_url ? { uri: item.avatar_url } : require('../assets/account.png'), // Assuming a default avatar
          message: "Sample message",
          time: "Just now",
          messagecount: "0",
        }));

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
    return (
      <View>
        <Text>Loading fonts...</Text>
      </View>
    );
  }

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => onUserSelect(item.id)}>
      <View style={styles.itemContainer}>
        <Image source={item.avatar} style={styles.avatar} />
        <View style={styles.messageContainer}>
          <Text style={styles.userName}>{item.name}</Text>
          <Text style={styles.message}>{item.message}</Text>
        </View>
        <View style={styles.timeAndCount}>
          <Text style={styles.time}>{item.time}</Text>
          {item.messagecount !== '0' && (
            <View style={styles.messageCount}>
              <Text style={styles.messageCountText}>{item.messagecount}</Text>
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
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 24,
    marginRight: 12,
  },
  messageContainer: {
    flex: 1,
  },
  userName: {
    fontWeight: '500',
    fontSize: 16,
  },
  message: {
    color: '#777',
    fontSize: 13,
    marginTop: 7
  },
  timeAndCount: {
    flexDirection: 'column',
    alignItems: 'flex-end',
  },
  time: {
    color: '#777',
    fontSize: 13,
    marginBottom: 5,
  },
  messageCount: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#4CAF50',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 40,
  },
  messageCountText: {
    color: 'white',
    fontWeight: '500',
    fontSize: 10,
    textAlign: 'center',
  },
});

export default ChatListScreen;
