import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { format } from 'date-fns';
import { enGB } from 'date-fns/locale';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { BlurView } from 'expo-blur';
import { useNavigate } from 'react-router-dom';

const defaultAvatar = require("../assets/account.png");

const ScheduledMeetingsTable = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
   const [hubName, setHubName] = useState('');

  const apiUrl = process.env.REACT_APP_API_URL;
  
  const openUser = (userId) => {
    navigate('/chats', { userId });
  };

  const fetchData = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      if (!token) {
        throw new Error("No token found");
      }

      const response = await axios.get(
        `${apiUrl}/api/expert/getAllJobSeekers`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const result = response.data.allJobSeekers || [];
      const chatDataPromises = result.map(item =>
        AsyncStorage.getItem(`lastMessage_${item.id}`)
      );
      const chatData = await Promise.all(chatDataPromises);

      const formattedData = result.map((item, index) => {
        const { lastMessage = "No messages", timestamp = new Date().toISOString() } = chatData[index] ? JSON.parse(chatData[index]) : {};

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
          id: item.id.toString(),
          name: `${item.first_name} ${item.last_name}`,
          avatar: item.avatar_url ? { uri: item.avatar_url } : defaultAvatar,
          message: "Offline",
          time: timeFormatted,
          timestamp: messageDate,
          messageCount: "1", 
          attended: "0", 
          missed: "0",  
          hub: "Hub Members",
        };
      });

      formattedData.sort((a, b) => b.timestamp - a.timestamp);
      setData(formattedData);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching data:", err);
      setError("Failed to fetch data");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const loadFormData = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        if (!token) throw new Error('No token found');

        const response = await axios.get(`${apiUrl}/api/expert/hubs/get`, {
          headers: { Authorization: `Bearer ${token}` }
        });

        if (response.status === 200 && response.data.status === 'success') {
          const data = response.data.NewHub;
          setHubName(data.coaching_hub_name || '');
        } else {
          console.error('Failed to fetch data', response);
        }
      } catch (error) {
        console.error('Failed to load form data', error);
      }
    };

    loadFormData();
  }, []);

  if (loading) {
    return <Text>Loading...</Text>;
  }

  if (error) {
    return <Text>{error}</Text>;
  }

  return (
    <View style={styles.greenBox}>
      <BlurView intensity={100} style={styles.blurBackground}>
        <Text style={styles.title}>Manage {hubName || "No update yet"} Hub</Text>
        <View style={styles.table}>
          <View style={styles.row}>
            <View style={styles.cell2}><Text style={styles.headerText}>Name</Text></View>
            <View style={styles.cell2}><Text style={styles.headerText}> </Text></View>
            <View style={styles.cell2}><Text style={styles.headerText}>Last Seen</Text></View>
            <View style={styles.cell2}><Text style={styles.headerText}>Status</Text></View>
            <View style={styles.cell2}><Text style={styles.headerText}>Attended</Text></View>
            <View style={styles.cell2}><Text style={styles.headerText}>Missed</Text></View>
          </View>

          {data.map((item, index) => (
            <View key={item.id} style={styles.row}>
              <View style={index % 2 === 0 ? styles.cell : styles.cell2}>
                <TouchableOpacity onPress={() => openUser(item.id)}>
                  <View style={{ flexDirection: 'row' }}>
                    <Image source={item.avatar} style={styles.userimage} />
                    <Text style={styles.cellTextname}>{item.name}</Text>
                  </View>
                </TouchableOpacity>
              </View>
               <TouchableOpacity onPress={() => openUser(item.id)}>
              <View style={index % 2 === 0 ? styles.cell : styles.cell2}>
                <Text style={styles.messageCount}>{item.messageCount}</Text>
              </View>
                  </TouchableOpacity>
              <View style={index % 2 === 0 ? styles.cell : styles.cell2}>
                <Text style={styles.cellText}>{item.time}</Text>
              </View>
              <View style={index % 2 === 0 ? styles.cell : styles.cell2}>
                <Text style={styles.cellText}>{item.message}</Text>
              </View>
              <View style={index % 2 === 0 ? styles.cell : styles.cell2}>
                <Text style={styles.cellText}>{item.attended} Sessions</Text>
              </View>
              <View style={index % 2 === 0 ? styles.cell : styles.cell2}>
                <Text style={styles.cellText}>{item.missed} Sessions</Text>
              </View>
            </View>
          ))}
        </View>
      </BlurView>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    marginTop: 20,
    marginLeft: 50,
    color: "black",
    fontWeight: 'bold',
    fontSize: 15,
    textAlign: 'flex-start',
  },
  table: {
    marginRight: 200,
    marginTop: 20,
    marginBottom: 20,
    alignContent: 'center',
    justifyContent: 'space-around',
    marginLeft: 50,
    marginRight: 50
  },
  row: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(225,225,212,0.3)',
  },
  cell: {
    flex: 1,
    backgroundColor: 'none',
    padding: 10,
    alignItems: 'flex-start',
  },
  cell2: {
    flex: 1,
    backgroundColor: 'white', 
    padding: 10,
    alignItems: 'flex-start',
  },
  cellText: {
    textAlign: 'flex-start',
  },
  cellTextname: {
    textAlign: 'flex-start',
    width: 200
  },
  messageCount: {
    width: 18,
    height: 18,
    borderRadius: 10,
    alignContent: 'center',
    alignItems: 'center',
    backgroundColor: '#4CAF50',
    textAlign: 'center',
    marginLeft: 70,
    color: 'white',
    fontWeight: '500',
    fontSize: 13
  },
  messageCountText: {
    color: 'white',
    fontWeight: '500',
    fontSize: 11
  },
  greenBox: {
    width: "90%",
    marginBottom: 20,
    marginLeft: 50, 
    backgroundColor: 'rgba(225,225,212,0.3)',
    marginTop: 50, 
    borderRadius: 20,
    borderColor: 'rgba(255,255,255,0.5)',
    borderWidth: 1,
  },
  blurBackground: {
    borderRadius: 20, 
    backgroundColor: 'rgba(225,225,212,0.3)',
  },
  userimage: {
    width: 30,
    height: 30,
    marginRight: 10,
    marginTop: -5,
    borderRadius: 25
  },
  whiteBox: {
    width: '20%',
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: '#f7fff4',
    borderRadius: 20,
    marginTop: 50,
    borderColor: 'rgba(255,255,255,0.5)',
    borderWidth: 1,
    BlurView: '100%'
  },
});

export default ScheduledMeetingsTable;