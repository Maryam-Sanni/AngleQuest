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
  import Echo from 'laravel-echo';

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
    const [otherUserTyping, setOtherUserTyping] = useState(false);
    const [echoInstance, setEchoInstance] = useState(null);

    // Fetch token and user ID from AsyncStorage
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

    // Initialize Echo instance when token is available
    useEffect(() => {
      if (token) {
        const echo = new Echo({
          broadcaster: 'reverb',
          key: 'qei9avxspe7qcl5sp3dl',
          wsHost: 'ws.recruitangle.com',
          wsPort: 443,
          forceTLS: true,
          encrypted: true,
          disableStats: true,
          authEndpoint: 'https://recruitangle.com/api/broadcasting/auth',
          auth: {
            headers: {
              Authorization: `Bearer ${token}`,
              'X-CSRF-TOKEN': xsrf,
            },
          },
        });

        echo.connector.pusher.connection.bind('error', (err) => {
          console.log('WebSocket Error:', err);
        });

        echo.connector.pusher.connection.bind('connecting', () => {
          console.log('WebSocket connecting...');
        });

        echo.connector.pusher.connection.bind('connected', () => {
          console.log('WebSocket connected');
        });

        echo.connector.pusher.connection.bind('disconnected', () => {
          console.log('WebSocket disconnected');
        });

        echo.connector.pusher.connection.bind('state_change', (state) => {
          console.log('Connection state:', state);
        });

        setEchoInstance(echo);
      }
    }, [token]);

    // Fetch room data and connect WebSocket
    useEffect(() => {
      const fetchRoomData = async () => {
        try {
          const storedRoom = await AsyncStorage.getItem("selectedRoom");
          if (storedRoom) {
            const room = JSON.parse(storedRoom);
            setRoomData(room);
            setMessages([]);
          }
        } catch (error) {
          console.log("Error retrieving room data from storage:", error);
        }
      };

      if (activeRoom) {
        setRoomData({
          id: activeRoom.id,
          name: activeRoom.name,
          image: activeRoom.image || "",
        });
        fetchRoomData();
      }
    }, [activeRoom]);

    useEffect(() => {
      if (roomData.id && token) {
        connectWebSocket();
        getChatHistory();

        return () => {
          // Clean up WebSocket connection when component unmounts or room changes
          if (echoInstance) {
            echoInstance.leave(`chat.room.${roomData.id}`);
          }
        };
      }
    }, [roomData.id, token, echoInstance]);


    const connectWebSocket = () => {
      if (!echoInstance || !roomData.id) return;

      const webSocketChannel = `chat.room.${roomData.id}`;
      const channel = echoInstance.private(webSocketChannel);

      channel.listen('ChatMessageEvent', async (e) => {
        console.log('Received event data:', JSON.stringify(e, null, 2)); // Log event data to debug

        // Fetch updated chat history
        await getChatHistory();
      });

      channel.listenForWhisper('typing', () => {
        console.log(`${roomData.name} is typing.`);
        setOtherUserTyping(true);
      });

      channel.listenForWhisper('typing-end', () => {
        console.log(`${roomData.name} stopped typing.`);
        setOtherUserTyping(false);
      });
    };

    const getChatHistory = async () => {
      try {
        const response = await axios.get(api_url + "chat/get/" + roomData.id, {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        });

        const data = response.data;
        if (data?.status === "success") {
          const formattedMessages = data.history.map((msg) => ({
            _id: msg.id, // Ensure _id is unique
            text: msg.text,
            createdAt: new Date(msg.created_at),
            user: {
              _id: msg.user_id,
              name: msg.senderName,
            },
          }));

          setMessages((prevMessages) =>
            GiftedChat.append(prevMessages, formattedMessages.reverse())
          );
        }
      } catch (err) {
        console.log("Error fetching chat history:", err.message);
      }
    };

    const typing = () => {
      if (!echoInstance || !roomData.id) return;

      const webSocketChannel = `chat.room.${roomData.id}`;
      const channel = echoInstance.private(webSocketChannel);
      channel.whisper('typing');
    };

    const stopTyping = () => {
      if (!echoInstance || !roomData.id) return;

      const webSocketChannel = `chat.room.${roomData.id}`;
      const channel = echoInstance.private(webSocketChannel);
      channel.whisper('typing-end');
    };

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

    const renderFooter = () => {
      if (otherUserTyping) {
        return (
          <View style={styles.typingBubble}>
            <Text style={styles.typingText}>{roomData.name} is typing...</Text>
          </View>
        );
      }
      return null;
    };

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

    
    const renderBubble = (props) => (
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
    );
    
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          {roomData.image ? (
            <Image source={{ uri: roomData.image }} style={styles.image} />
          ) : (
            <View style={styles.imagePlaceholder} />
          )}
          <Text style={styles.roomName}>{roomData.name}</Text>
        </View>
        <View style={{flex: 1, backgroundColor: '#eafaf1'}}>
            <GiftedChat
              messages={messages}
              onSend={(newMessages) => {
                onSend(newMessages);
                typing(); // Notify others that the user is typing
              }}
              user={{
                _id: userId,
                name: "User",
              }}
              renderInputToolbar={renderInputToolbar}
              renderFooter={renderFooter}
              renderSend={renderSend}
              renderBubble={renderBubble}
            />
          </View>
      </View>
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
    typingBubble: {
      backgroundColor: '#f0f0f0',
      borderRadius: 20, 
      padding: 10,
      margin: 10,
      alignSelf: 'flex-start', 
    },
    typingText: {
      color: '#000', 
      fontSize: 14, 
    },
  });

  export default Room;
