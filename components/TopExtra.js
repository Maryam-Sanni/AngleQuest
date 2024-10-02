import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { BlurView } from 'expo-blur';

const MyComponent = () => {
  const navigate = useNavigate();
  const location = useLocation(); // Get the current location
  const [hovered, setHovered] = useState(null); // Track which button is hovered
  const { i18n, t } = useTranslation();

  // Get the current path to set the active button
  const getActiveButton = () => {
    switch (location.pathname) {
      case '/individual':
        return 'individual';
      case '/business':
        return 'business';
      case '/community':
        return 'community';
      default:
        return null;
    }
  };

  const activeButton = getActiveButton();

  const handleindividual = () => {
    navigate('/individual');
  };

  const handlebusiness = () => {
    navigate('/business');
  };

  const handlecommunity = () => {
    navigate('/community');
  };

  return (
      <View style={styles.container}>
        <BlurView intensity={50} style={styles.blurView}>
        <View style={styles.header}>

          <TouchableOpacity 
            onPress={handleindividual}
            onMouseEnter={() => setHovered('individual')}
            onMouseLeave={() => setHovered(null)}
          >
            <Text style={[styles.text, (hovered === 'individual' || activeButton === 'individual') && styles.hoveredText]}>
             For Individual
            </Text>
          </TouchableOpacity>

          <TouchableOpacity 
            onPress={handlebusiness}
            onMouseEnter={() => setHovered('business')}
            onMouseLeave={() => setHovered(null)}
          >
            <Text style={[styles.text, (hovered === 'business' || activeButton === 'business') && styles.hoveredText]}>
             For Business
            </Text>
          </TouchableOpacity>

          <TouchableOpacity 
            onPress={handlecommunity}
            onMouseEnter={() => setHovered('community')}
            onMouseLeave={() => setHovered(null)}
          >
            <Text style={[styles.text, (hovered === 'community' || activeButton === 'community') && styles.hoveredText]}>
             For Community
            </Text>
          </TouchableOpacity>
        </View>
          </BlurView>
      </View>

  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'flex-start',
    backgroundColor: "black",
    height: 70,
  },
  blurView: {
    height: 70,
    width: "100%",
  },
  header: {
    flexDirection: 'row',
    width: 300,
    padding: 7,
  },
  text: {
    fontSize: 16,
    marginLeft: 40,
    fontWeight: '500',
    color: 'white',
  },
  hoveredText: {
    borderBottomWidth: 5, 
    borderBottomColor: 'white', 
    paddingBottom: 1, 
  },
});

export default MyComponent;
