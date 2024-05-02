import React, { useState } from "react";
import { View, Image, StyleSheet, TouchableOpacity } from "react-native";
import Sidebar from "./expertssidebar";

function MyComponent() {
  const [clickedItem, setClickedItem] = useState(null);
  const [hoveredItem, setHoveredItem] = useState(null);

  const handleItemHover = (item) => {
    setHoveredItem(item);
  };

  const handleItemClick = (item) => {
    setClickedItem(clickedItem === item ? null : item);
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
  { icon: "../assets/offers.png" },
  { icon: "../assets/schedules.png" },
  { icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/e5fc48985e9bd23839ab4e933835f0a18c6a7586a0ec50e99bc97886e30e1e63?apiKey=7b9918e68d9b487793009b3aea5b1a32&" },
  { icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/d82dc6c35b436a4ac93edec3cb47de416b168131f8e3deb5c4898437d416d25f?apiKey=7b9918e68d9b487793009b3aea5b1a32&" },
  { icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/925cfbb55e82458868f5e0c8cafbdc90d47bec0907e65b77fb918a7ac0dbcfe0?apiKey=7b9918e68d9b487793009b3aea5b1a32&" },
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