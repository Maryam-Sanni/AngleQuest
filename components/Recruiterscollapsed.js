import React, { useState } from "react";
import { View, Image, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from '@react-navigation/native';
import Sidebar from "./Recruiterssidebar";

function MyComponent() {
  const navigation = useNavigation(); // Initialize navigation
  const [clickedItem, setClickedItem] = useState(null);
  const [hoveredItem, setHoveredItem] = useState(null);

  const handleItemHover = (item) => {
    setHoveredItem(item);
  };

  const handleItemClick = (item) => {
    setClickedItem(clickedItem === item ? null : item);
  
    switch (item) {
      case menuItems[1]:
        // Navigate to HomePage
        navigation.navigate('Home - Corporate');
        break;
      case menuItems[2]:
        // Navigate to Dashboard
        navigation.navigate('');
        break;
      case menuItems[3]:
        // Navigate to Experts
        navigation.navigate('');
        break;
        case menuItems[4]:
          // Navigate to Sessions
          navigation.navigate(' ');
          break;
          case menuItems[5]:
          // Navigate to Feedbacks
          navigation.navigate(' ');
          break;
          case menuItems[6]:
          // Navigate to Messages
          navigation.navigate(' ');
          break;
          case menuItems[7]:
            // Navigate to Messages
            navigation.navigate(' ');
            break;
      default:
        break;
    }
  };

  const handleLogout = () => {
    // Handle logout action here
    console.log("Logout clicked");
    setClickedItem(null);
  };

  // Conditionally render sidebar components if the first icon is clicked
  if (clickedItem === menuItems[0]) {
    return <Sidebar />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        {/* Menu Items */}
        {menuItems.map((menuItem, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.menuItem,
              hoveredItem === menuItem && styles.menuItemHovered,
              clickedItem === menuItem && styles.menuItemSelected
            ]}
            onMouseEnter={() => handleItemHover(menuItem)}
            onMouseLeave={() => handleItemHover(null)}
            onPress={() => handleItemClick(menuItem)}
          >
            <View style={styles.menuItemContent}>
              <Image
                source={{ uri: menuItem.icon }}
                style={{ width: 20, height: 20, marginRight: 6 }}
              />
            </View>
          </TouchableOpacity>
        ))}
        {/* Profile Info */}
        <View style={styles.divider} />
        <View style={styles.profileInfo}>
          <Image
            source={{ uri: 'https://cdn.builder.io/api/v1/image/assets/TEMP/96214782d7fee94659d7d6b5a7efe737b14e6f05a42e18dc902e7cdc60b0a37b' }}
            style={{ width: 40, aspectRatio: 1, marginLeft: -10 }}
          />
        </View>
        <View style={styles.divider} />
        {/* Logout */}
        <TouchableOpacity
          style={styles.menuItem}
          onPress={handleLogout}
        >
          <View style={styles.logoutButton}>
            <Image
              source={{ uri: "https://cdn.builder.io/api/v1/image/assets/TEMP/8619284eda5dda6f5d7db1f24b673d86816adddc50319ac5f1954048b0054972?apiKey=7b9918e68d9b487793009b3aea5b1a32&" }}
              style={{ width: 20, height: 20, marginRight: 6, marginTop: 5, marginBottom: 5}}
            />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const menuItems = [
  { icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/0a17d9f0fc56620b27b7178e38a5e0f099f5de7418907c2f2a45cbee9c6764af?apiKey=7b9918e68d9b487793009b3aea5b1a32&" },
  { icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/c2a8bbea82c77b8fb3265f2792b73ef422d464a228510b5a1a07d2d657c4441f?apiKey=7b9918e68d9b487793009b3aea5b1a32&" },
  { icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/fa3093fa6656295c8b39535a911908d6555a356fccce78af145fec472c4bd154?apiKey=7b9918e68d9b487793009b3aea5b1a32&" },
  { icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/55120fdad0942a072dd9c4983820860f2be5dfe081dd7a9dc2fbf948476d5ae7?apiKey=7b9918e68d9b487793009b3aea5b1a32&" },
  { icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/813d5a4a25e7ea2bc6111724f9da82bc8321c028e79ecedafab3cf526363dfe1?apiKey=7b9918e68d9b487793009b3aea5b1a32&" },
  { icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/af1777ff9219d90e26a5672ec04ed421d4904eb9122e2f1feb8f1b61f8b63b75?apiKey=7b9918e68d9b487793009b3aea5b1a32&" },
  { icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/d10a8ee7c8c9726e17c1a541282a434772d42408c95ac5f784d03e9befeb6519?apiKey=7b9918e68d9b487793009b3aea5b1a32&" },
  { icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/c07248ef371c4bd3c8109a5c928c2801705dfc3442beb7951f0c489b455700e9?apiKey=7b9918e68d9b487793009b3aea5b1a32&" },
  { icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/9c32b4dde608593e6e524f321c74e924eecd6b9caebc808c0af2d5ec35003c9d?apiKey=7b9918e68d9b487793009b3aea5b1a32&" },
];

const styles = StyleSheet.create({
  container: {
    position: "fixed",
    top: 60,
    bottom: 0,
    marginRight: 30,
    width: 80,
    backgroundColor: "#f7fff4",
    zIndex: 999,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  contentContainer: {
    padding: 20,
    backgroundColor: "#f7fff4",
    borderRadius: 0,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    flexGrow: 1
  },
  menuItem: {
    padding: 10,
    marginTop: 7,
    backgroundColor: "#f7fff4",
    borderRadius: 0,
    borderWidth: 0,
    height: 40,
    borderColor: "transparent",
  },
  menuItemHovered: {
    backgroundColor: '#EEFFF8',
    borderBottomWidth: 0,
    borderRightColor: 'coral',
  },
  menuItemSelected: {
    borderBottomWidth: 0,
  },
  menuItemContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  profileInfo: {
    flexDirection: "row",
    paddingHorizontal: 8,
    paddingVertical: 3,
    marginTop: 10,
    alignItems: "center",
    marginRight: 5,
  },
  divider: {
    height: 1,
    backgroundColor: "#f0f0f0",
    width: 60,
    alignSelf: "center",
    marginTop: 20,
  },
  logoutButton: {
    flexDirection: "row",
    justifyContent: "flex-start",
  },
});

export default MyComponent;