import React, { useState } from "react";
import { View, Image, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { useNavigation } from '@react-navigation/native';
import CollapsedComponent from "./collapsed"; // Import your collapsed component
import { useTranslation } from 'react-i18next';


function MyComponent() {
  const navigation = useNavigation(); // Initialize navigation
  const [clickedItem, setClickedItem] = useState(null);
  const [hoveredItem, setHoveredItem] = useState(null); // Declare hoveredItem state
  const [showMenu, setShowMenu] = useState(true); // State to toggle between menu and collapsed component

  const handleItemHover = (item) => {
    setHoveredItem(item);
  };

  const handleItemClick = (item) => {
    if (item === menuItems[0]) {
      setShowMenu(false); // Directly set showMenu to false if the first menu item is clicked
    } else {
      setClickedItem(clickedItem === item ? null : item);
      // Navigate to respective screens based on menu item clicked
      switch(item.label) {
        case "Home":
          navigation.navigate('Home');
          break;
        case "All Experts":
          navigation.navigate('Experts');
          break;
        case "Growth Plan":
          navigation.navigate('New Growth Plan');
          break;
        case "Interview":
          navigation.navigate('New Interview'); 
          break;
        case "Sessions":
          navigation.navigate('Sessions');
          break;
        case "Advice":
          navigation.navigate('New Advice');
          break;
        case "Hubs":
          navigation.navigate('Coaching Hubs');
          break;
          case "Performance":
          navigation.navigate('My Performance');
          break;
        case "Messages":
          navigation.navigate('Messages');
          break;
        default:
          break;
      }
    }
  };

  const handleLogout = () => {
    // Handle logout action here
    console.log("Logout clicked");
    navigation.navigate('Signin'); // Navigate to the sign-in page
    setClickedItem(null);
  };

  const handleProfileClick = () => {
    // Navigate to MyProfile screen
    navigation.navigate('My Profile');
  };
  const { t } = useTranslation()

  return (
    <View style={[styles.container, !showMenu && { width: 80 }]}>
        <ScrollView contentContainerStyle={{ flexGrow: 1, maxHeight: 500 }}>
      {showMenu ?  ( // Render menu if showMenu is true
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
                <Text style={[styles.text, clickedItem === menuItem && styles.textActive]}>{menuItem.label}</Text>

              </View>
            </TouchableOpacity>
          ))}
          {/* Profile Info */}
          <TouchableOpacity onPress={handleProfileClick}>
          <View style={styles.divider} />
            <View style={styles.profileInfo}>
              <Image
                source={{ uri: 'https://cdn.builder.io/api/v1/image/assets/TEMP/96214782d7fee94659d7d6b5a7efe737b14e6f05a42e18dc902e7cdc60b0a37b' }}
                style={{ width: 40, aspectRatio: 1 }}
              />
              <View style={{ marginLeft: 5 }}>
                <Text style={{ fontSize: 14, color: '#666' }}>John Smith</Text>
              </View>
            </View>
          </TouchableOpacity>
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
              <Text style={{ marginTop: 5, marginBottom: 5, color: clickedItem === "Logout" ? 'coral' : '#666' }}>{t("Logout")}</Text>
              </View>
          </TouchableOpacity>
        </View>
      ) : (
        <CollapsedComponent /> // Render collapsed component if showMenu is false
      )}
      </ScrollView>
    </View>
  );
}
// const H = t("Home");
const menuItems = [
  { icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/0a17d9f0fc56620b27b7178e38a5e0f099f5de7418907c2f2a45cbee9c6764af?apiKey=7b9918e68d9b487793009b3aea5b1a32&" },
  { label: "Home", icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/c2a8bbea82c77b8fb3265f2792b73ef422d464a228510b5a1a07d2d657c4441f?apiKey=7b9918e68d9b487793009b3aea5b1a32&" },
  { label: "All Experts", icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/ed6b330337dad3f4c29dae397b1a587ec9cdb40064dc06f64111e037496f2e8f?apiKey=7b9918e68d9b487793009b3aea5b1a32&" },
  { label: "Growth Plan", icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/dea8538a41a4085f905f7513c46d36613c28b4ada84630149918f4444ac5ecde?apiKey=7b9918e68d9b487793009b3aea5b1a32&" },
  { label: "Interview", icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/d10a8ee7c8c9726e17c1a541282a434772d42408c95ac5f784d03e9befeb6519?apiKey=7b9918e68d9b487793009b3aea5b1a32&" },
  { label: "Advice", icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/d82dc6c35b436a4ac93edec3cb47de416b168131f8e3deb5c4898437d416d25f?apiKey=7b9918e68d9b487793009b3aea5b1a32&" },
  { label: "Hubs", icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/925cfbb55e82458868f5e0c8cafbdc90d47bec0907e65b77fb918a7ac0dbcfe0?apiKey=7b9918e68d9b487793009b3aea5b1a32&" },
  { label: "Sessions", icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/e5fc48985e9bd23839ab4e933835f0a18c6a7586a0ec50e99bc97886e30e1e63?apiKey=7b9918e68d9b487793009b3aea5b1a32&" },
  { label: "Performance", icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/c07248ef371c4bd3c8109a5c928c2801705dfc3442beb7951f0c489b455700e9?apiKey=7b9918e68d9b487793009b3aea5b1a32&" },
  { label: "Messages", icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/9c32b4dde608593e6e524f321c74e924eecd6b9caebc808c0af2d5ec35003c9d?apiKey=7b9918e68d9b487793009b3aea5b1a32&" },
];

const styles = StyleSheet.create({
  container: {
    position: "fixed",
    top: 60,
    bottom: 0,
    marginRight: 30,
    width: 210,
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
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 2,
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
    width: 190.3,
    height: 40,
  },
  menuItemSelected: {
    borderBottomWidth: 0,
    borderRightColor: 'coral',
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 2,
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
    width: 190.3,
    height: 40,
  },
  menuItemContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  text: {
    fontSize: 14,
    marginLeft: 6,
    color: "#666",
  },
  textActive: {
    color: "coral",
  },
  profileInfo: {
    flexDirection: "row",
    paddingHorizontal: 8,
    paddingVertical: 3,
    marginTop: 10,
    alignItems: "center",
    marginRight: -5,
  },
  divider: {
    height: 1,
    backgroundColor: "#f0f0f0",
    width: 170,
    alignSelf: "center",
    marginTop: 10,
  },
  logoutButton: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center"
  },
 
});



export default MyComponent;