import React, { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, Image, StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

const meetingsToDisplay = [
  {
    meeting_id: '1',
    hubCat: 'Tech Talk',
    hubName: 'Frontend Development',
    time: '2024-11-20T14:00:00Z',
    description: 'Join us for an insightful discussion about the latest trends in frontend development.',
    videoUri: require('../assets/testimonial1.mp4'),
    title: 'Testimonial 1',
  },
  {
    meeting_id: '2',
    hubCat: 'Career Development',
    hubName: 'Career Coaching',
    time: '2024-11-22T15:00:00Z',
    description: 'Learn career development tips and strategies.',
    videoUri: require('../assets/testimonial2.mp4'),
    title: 'Testimonial 2',
  },
];

const VideoPlayerSection = () => {
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [isVideoSelected, setIsVideoSelected] = useState(false);

  const onVideoPress = (video) => {
    setSelectedVideo(video);
    setIsVideoSelected(true);
  };

  return (
    <View style={styles.container}>
      <View style={[styles.videoListContainer, isVideoSelected && styles.listShifted]}>
        <FlatList
          data={meetingsToDisplay}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => onVideoPress(item)} style={styles.videoItem}>
              <Image source={item.videoUri} style={styles.thumbnail} />
              <View style={styles.videoDetails}>
                <Text style={styles.videoTitle}>{item.title}</Text>
                <Text style={styles.videoHub}>{item.hubName}</Text>
                <Text style={styles.videoCategory}>{item.hubCat}</Text>
              </View>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item.meeting_id}
        />
      </View>

      <View style={styles.videoPlayerContainer}>
        {isVideoSelected ? (
          <>
            <Text style={styles.selectedVideoTitle}>{selectedVideo.title}</Text>
            <Text style={styles.selectedHubName}>{selectedVideo.hubName}</Text>
            <Text style={styles.selectedCategory}>{selectedVideo.hubCat}</Text>
            <Text style={styles.selectedTime}>Time: {new Date(selectedVideo.time).toLocaleString()}</Text>
            <Text style={styles.selectedDescription}>{selectedVideo.description}</Text>
            {/* Add video player component here (React Native video player or similar) */}
            <Text>Video Player: {selectedVideo.title} will play here</Text>
          </>
        ) : (
          <Text style={styles.selectVideoText}>Select a video to play</Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: '100%',
  },
  videoListContainer: {
    width: '100%',
    backgroundColor: '#f5f5f5',
    padding: 10,
    transition: 'transform 0.3s ease-in-out',
  },
  listShifted: {
    width: width * 0.3, // Compact the list to 30% of the width when a video is selected
    position: 'absolute',
    top: 0,
    right: 0,
  },
  videoItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    flexDirection: 'row',
    alignItems: 'center',
  },
  thumbnail: {
    width: 100,
    height: 60,
    marginRight: 10,
  },
  videoDetails: {
    flex: 1,
  },
  videoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  videoHub: {
    fontSize: 14,
    color: '#888',
  },
  videoCategory: {
    fontSize: 12,
    color: '#888',
  },
  videoPlayerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  selectVideoText: {
    fontSize: 18,
    textAlign: 'center',
  },
  selectedVideoTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  selectedHubName: {
    fontSize: 18,
    marginBottom: 5,
  },
  selectedCategory: {
    fontSize: 16,
    marginBottom: 5,
  },
  selectedTime: {
    fontSize: 14,
    marginBottom: 10,
  },
  selectedDescription: {
    fontSize: 14,
    marginBottom: 15,
  },
});

export default VideoPlayerSection;
