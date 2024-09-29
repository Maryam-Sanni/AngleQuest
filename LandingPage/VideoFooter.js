import React, { useRef } from "react";
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Video } from 'expo-av';

const VideoBackgroundSection = () => {
  const videoRef = useRef(null);
  
  return (
    <View style={styles.container}>
      <Video
        resizeMode="cover"
        videoStyle={{ width: "100%", height: 1024 }} // Can be a URL or a local file.
        source={require("../assets/background.mp4")}
        ref={videoRef}
        isLooping
        shouldPlay
        isMuted
        style={styles.backgroundVideo}
      />
      <View style={styles.overlay}>
        <Text style={styles.description}>Welcome to anglequest</Text>
        <Text style={styles.title}>The foundation of everything we do is built on ensuring your success. 
          Every step is carefully designed with your achievement in mind.
</Text>

        <Pressable style={styles.button} onPress={() => alert('Button Pressed!')}>
          <Text style={styles.buttonText}>Sign up</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    width: "150%",
    height: 400
  },
  backgroundVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: "100%",
  },
  overlay: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    padding: 20,
    width: "100%",
    height: 400
  },
  title: {
    fontSize: 32,
    color: '#fff',
    fontWeight: '600',
    marginBottom: 20,
    textAlign: 'center',
    maxWidth: 1000
  },
  description: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
    marginBottom: 5,
  },
  button: {
    backgroundColor: '#135837',
    padding: 15,
    borderRadius: 5,
    width: 150
  },
  buttonText: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
  },
});

export default VideoBackgroundSection;
