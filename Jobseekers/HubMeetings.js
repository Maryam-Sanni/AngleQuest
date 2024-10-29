import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const MeetingsListPage = () => {
  const [loading, setLoading] = useState(true);
  const [meetingsData, setMeetingsData] = useState([]);
  const [hubId, setHubId] = useState(null);

  useEffect(() => {
    const fetchHubId = async () => {
      try {
        const storedHubId = await AsyncStorage.getItem('hub_id');
        if (storedHubId) setHubId(parseInt(storedHubId, 10));
      } catch (error) {
        console.error("Error fetching hub ID from AsyncStorage:", error);
      }
    };

    const fetchMeetingsData = async () => {
      try {
        const response = await axios.get(`${apiUrl}/api/expert/hubs/all`);
        const { AllHubs } = response.data;

        if (hubId) {
          const filteredHubs = AllHubs.filter(hub => hub.id === hubId);
          setMeetingsData(filteredHubs);
        }
      } catch (error) {
        console.error("Error fetching meeting data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchHubId().then(fetchMeetingsData);
  }, [hubId]);

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <FlatList
        data={meetingsData}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={{ marginBottom: 20 }}>
            <Text style={{ fontWeight: 'bold', fontSize: 18 }}>{item.category}</Text>
            <Text style={{ marginTop: 5 }}>{item.coaching_hub_description}</Text>
            {item.meeting && (
              <View style={{ marginTop: 10 }}>
                <Text style={{ fontWeight: 'bold' }}>Meetings:</Text>
                {Object.values(item.meeting).map((meeting, index) => (
                  <View key={index} style={{ marginTop: 5 }}>
                    <Text>Description: {meeting.description}</Text>
                    <Text>Date: {meeting.date}</Text>
                    <Text>Time: {meeting.time}</Text>
                  </View>
                ))}
              </View>
            )}
          </View>
        )}
        ListEmptyComponent={<Text>No meetings found for the selected hub ID.</Text>}
      />
    </View>
  );
};

export default MeetingsListPage;
