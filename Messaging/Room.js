import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import {
  GiftedChat,
  Bubble,
  Send,
  InputToolbar,
} from "react-native-gifted-chat";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { api_url, AuthContext } from "./AuthProvider";

const Room = ({ activeRoom }) => {
  const { xsrf } = React.useContext(AuthContext);
  const [messages, setMessages] = useState([]);
  const [token, setToken] = useState("");
  const [userId, setUserId] = useState("");
  const [roomData, setRoomData] = useState({
    id: "",
    name: "Unknown",
    image: "",
  });

  const renderSend = (props) => (
    <Send {...props}>
      <View style={styles.sendButton}>
        <Image
          source={{
            uri: "https://img.icons8.com/?size=100&id=100004&format=png&color=1C1C1C",
          }}
          style={styles.sendButtonIcon}
        />
      </View>
    </Send>
  );

  const renderInputToolbar = (props) => (
    <InputToolbar
      {...props}
      containerStyle={styles.inputToolbar}
      textInputStyle={styles.textInput}
    />
  );

  useEffect(() => {
    const fetchTokenAndUserId = async () => {
      try {
        const storedToken = await AsyncStorage.getItem("token");
        const storedUserId = await AsyncStorage.getItem("user_id");
        if (storedToken) {
          setToken(storedToken);
        }
        if (storedUserId) {
          setUserId(storedUserId);
        }
      } catch (error) {
        console.log("Error fetching token or user ID:", error);
      }
    };

    fetchTokenAndUserId();
  }, []);

  useEffect(() => {
    const fetchRoomData = async () => {
      try {
        const storedRoom = await AsyncStorage.getItem("selectedRoom");
        if (storedRoom) {
          const room = JSON.parse(storedRoom);
          setRoomData(room);
        }
      } catch (error) {
        console.log("Error retrieving room data from storage:", error);
      }
    };

    if (activeRoom) {
      setRoomData({
        id: activeRoom.id,
        name: activeRoom.name,
        image: activeRoom.image || "", // Add fallback for image
      });
      fetchRoomData(); // Fetch room data if needed
    }
  }, [activeRoom]); // Trigger fetch on room change

  const getChatHistory = async () => {
    try {
      if (userId && token) {
        const response = await axios.get(api_url + "chat/get/" + roomData.id, {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        });

        const data = response.data;
        if (data?.status === "success") {
          const formattedMessages = data.history.map((msg) => ({
            _id: msg.id,
            text: msg.text,
            createdAt: new Date(msg.created_at),
            user: {
              _id: msg.user_id,
              name: msg.senderName,
            },
          }));

          setMessages(formattedMessages.reverse());
        }

        // Long polling: Call getChatHistory again to wait for new messages
        getChatHistory();  // Recursively call after receiving a response
      }
    } catch (err) {
      console.log("Error fetching chat history:", err.message);

      // Retry after a delay if there's an error
      setTimeout(() => {
        getChatHistory();
      }, 5000); // Retry after 5 seconds on error
    }
  };

  useEffect(() => {
    if (roomData.id && token) {
      getChatHistory();

      return () => {
        if (window.Echo) {
          window.Echo.leave(`chat.room.${roomData.id}`);
        }
      };
    }
  }, [roomData.id, token]); // Dependencies to re-connect and fetch data on room change

  const onSend = async (newMessages = []) => {
    const messageToSend = newMessages[0].text;
    const formData = new FormData();
    formData.append("room_id", roomData.id);
    formData.append("message", messageToSend);

    try {
      const res = await fetch(api_url + "chat/send", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
          "X-CSRF-TOKEN": xsrf,
        },
        body: formData,
      });
      const data = await res.json();
      if (data?.status === "success") {
        setMessages((previousMessages) =>
          GiftedChat.append(previousMessages, newMessages),
        );
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          {roomData.image ? (
            <Image source={{ uri: roomData.image }} style={styles.image} />
          ) : (
            <View style={styles.imagePlaceholder} />
          )}
          <Text style={styles.roomName}>{roomData.name}</Text>
        </View>
        <View style={styles.chatContainer}>
          <GiftedChat
            messages={messages}
            onSend={(newMessages) => onSend(newMessages)}
            user={{
              _id: userId,
              name: "User",
            }}
            renderBubble={(props) => (
              <Bubble
                {...props}
                wrapperStyle={{
                  right: {
                    backgroundColor: "lightgreen",
                    alignSelf: "flex-end",
                  },
                  left: {
                    backgroundColor: "#f0f0f0",
                  },
                }}
                textStyle={{
                  right: {
                    color: "black",
                  },
                  left: {
                    color: "#000",
                  },
                }}
              />
            )}
            renderSend={renderSend}
            renderInputToolbar={renderInputToolbar}
          />
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#eafaf1",
  },
  header: {
    height: 60,
    backgroundColor: "#F6F6F6",
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  image: {
    width: 40,
    height: 40,
    borderRadius: 25,
    marginRight: 10,
  },
  imagePlaceholder: {
    width: 40,
    height: 40,
    borderRadius: 25,
    backgroundColor: "#ccc",
    marginRight: 10,
  },
  roomName: {
    fontSize: 16,
    fontWeight: "600",
  },
  sendButton: {
    marginRight: 10,
  },
  sendButtonIcon: {
    width: 30,
    height: 30,
  },
  inputToolbar: {
    padding: 5,
    borderTopWidth: 1,
    borderTopColor: "#ddd",
    backgroundColor: "#F6F6F6",
  },
  textInput: {
    paddingHorizontal: 10,
    paddingLeft: 10,
    borderRadius: 5,
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#ddd",
  },
  chatContainer: {
    flex: 1,
  },
});

export default Room;
