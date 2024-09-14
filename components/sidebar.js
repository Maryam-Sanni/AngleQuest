import React, { useState, useEffect } from "react";
import { View, Image, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { useNavigation, useNavigationState } from '@react-navigation/native';
import CollapsedComponent from "./collapsed"; // Import your collapsed component
import { useTranslation } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

function MyComponent() {
  const navigation = useNavigation(); // Initialize navigation
  const [clickedItem, setClickedItem] = useState(null);
  const [hoveredItem, setHoveredItem] = useState(null); // Declare hoveredItem state
  const [showMenu, setShowMenu] = useState(true); // State to toggle between menu and collapsed component
  const [first_name, setFirstName] = useState('');
  const [last_name, setLastName] = useState('');

  // Function to check if interview data is filled
  const checkInterviewData = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      if (!token) {
        Alert.alert("Error", "No token found");
        return false;
      }

      const response = await fetch('https://recruitangle.com/api/jobseeker/get-jobseeker-interview', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();

      if (response.ok && data.status === "success" && data.interview) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.error("Error fetching interview data:", error);
      Alert.alert("Error", "Failed to fetch interview data");
      return false;
    }
  };

  // Function to check if advice data is filled
  const checkSkillAnalysisData = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      if (!token) {
        Alert.alert("Error", "No token found");
        return false;
      }

      const response = await fetch('https://recruitangle.com/api/jobseeker/get-jobseeker-skill-analysis', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();

      if (response.ok && data.status === "success" && data.skillAnalysis) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.error("Error fetching skill analysis data:", error);
      Alert.alert("Error", "Failed to fetch skill analysis data");
      return false;
    }
  };

  // Function to check if advice data is filled
  const checkgrowthPlanData = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      if (!token) {
        Alert.alert("Error", "No token found");
        return false;
      }

      const response = await fetch('https://recruitangle.com/api/jobseeker/get-jobseeker-growthplan', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();

      if (response.ok && data.status === "success" && data.growthPlan) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.error("Error fetching growth Plan data:", error);
      Alert.alert("Error", "Failed to fetch growth Plan data");
      return false;
    }
  };

  const checkHubData = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      if (!token) {
        Alert.alert("Error", "No token found");
        return false;
      }

      const response = await fetch('https://recruitangle.com/api/jobseeker/get-all-jobseeker-hubs', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();

      if (response.ok && data.status === "success" && data.AllJoinedHubs) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.error("Error fetching hub data:", error);
      Alert.alert("Error", "Failed to fetch hub data");
      return false;
    }
  };
  
  const handleItemHover = (item) => {
    setHoveredItem(item);
  };

  const handleItemClick = async (item) => {
    if (item === menuItems[0]) {
      setShowMenu(false); // Directly set showMenu to false if the first menu item is clicked
    } else {
      setClickedItem(clickedItem === item ? null : item);
      // Navigate to respective screens based on menu item clicked
      switch(item.label) {
        case "Home":
          navigation.navigate('Home');
          break;
        case "Courses":
          navigation.navigate('Join Courses');
          break;
        case "Growth Plan":
          const isgrowthPlanDataFilled = await checkgrowthPlanData();
          if (isgrowthPlanDataFilled) {
            navigation.navigate('Growth Plan Sessions');
          } else {
            navigation.navigate('New Growth Plan');
          }
          break;
          case "Interview":
          const isInterviewDataFilled = await checkInterviewData();
          if (isInterviewDataFilled) {
            navigation.navigate('Interview Sessions');
          } else {
            navigation.navigate('New Interview');
          }
          break;
        case "Sessions":
          navigation.navigate('Sessions');
          break;
        case "Skills Analysis":
          const isSkillAnalysisDataFilled = await checkSkillAnalysisData();
          if (isSkillAnalysisDataFilled) {
            navigation.navigate('Advice Sessions');
          } else {
            navigation.navigate('Advice Sessions');
          }
          break;
          case "Hubs":
          const isHubsDataFilled = await checkHubData();
          if (isHubsDataFilled) {
            navigation.navigate('Coaching Hub Sessions');
          } else {
            navigation.navigate('Coaching Hubs');
          }
          break;
          case "Performance":
          navigation.navigate('My Performance');
          break;
          case "AngleQuest AI":
            navigation.navigate('AI Result');
            break;
        case "Chats":
          navigation.navigate('Chat');
          break;
        default:
          break;
          case "Scenario Project":
            navigation.navigate('Project');
            break;
      }
    }
  };

  const handleLogout = () => {
    // Handle logout action here
    console.log("Logout clicked");
    navigation.navigate('Sign in to AngleQuest'); // Navigate to the sign-in page
    setClickedItem(null);
  };

  const handleProfileClick = () => {
    // Navigate to MyProfile screen
    navigation.navigate('My Profile');
  };

  useEffect(() => {
    // Retrieve first_name and last_name from AsyncStorage
    const retrieveData = async () => {
      try {
        const storedFirstName = await AsyncStorage.getItem('first_name');
        const storedLastName = await AsyncStorage.getItem('last_name');
        if (storedFirstName !== null && storedLastName !== null) {
          console.log('Stored first_name:', storedFirstName);
          console.log('Stored last_name:', storedLastName);
          setFirstName(storedFirstName);
          setLastName(storedLastName);
        }
      } catch (error) {
        console.error('Error retrieving data from AsyncStorage:', error);
      }
    };

    retrieveData();
  }, []);

  const { t } = useTranslation()

  const navigationState = useNavigationState((state) => state);

  useEffect(() => {

    const routeName = navigationState?.routes[navigationState.index]?.name;
    const matchedItem = menuItems.find(item => {
      switch(item.label) {
        case "Home": return routeName === 'Home';
        case "Courses": return routeName === 'Join Courses';
          case "Growth Plan":
          return ['New Growth Plan', 'Growth Plan Sessions'].includes(routeName);
          case "Interview":
          return ['New Interview', 'Interview Sessions'].includes(routeName);
        case "Scenario Project": return routeName === 'Project';
        case "Skills Analysis":
        return ['Use AI', 'Use CV', 'Use Questionnaire', 'Advice Sessions', 'AI Result'].includes(routeName);
          case "Hubs":
          return ['Coaching Hubs', 'Coaching Hub Sessions'].includes(routeName);
        case "Performance": return routeName === 'My Performance';
        case "Chats": return routeName === 'Chat';
        default: return false;
      }
    });
    if (matchedItem) {
      setClickedItem(matchedItem);
    }
  }, [navigationState]);

  return (
    <View style={[styles.container, !showMenu && styles.containerExpanded]}>
      {showMenu ? ( // Render menu if showMenu is true
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
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
                   <Text style={[styles.text, clickedItem === menuItem && styles.textActive]}>{t(menuItem.label)}</Text>
                </View>
              </TouchableOpacity>
            ))}
            {/* Profile Info */}
            <TouchableOpacity onPress={handleProfileClick}>
              <View style={styles.divider} />
              <View style={styles.profileInfo}>
                <Image
                  source={require("../assets/account.png")}
                  style={{ width: 40, height: 40, aspectRatio: 1 }}
                />
                <View style={{ marginLeft: 5 }}>
                  <Text style={{ fontSize: 14, color: '#666' }}>{first_name} {last_name}</Text>
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
                  style={{ width: 20, height: 20, marginRight: 6, marginTop: 5, marginBottom: 5 }}
                />
                <Text style={{ marginTop: 5, marginBottom: 5, color: clickedItem === "Logout" ? 'coral' : '#666' }}>{t("Logout")}</Text>
              </View>
            </TouchableOpacity>
          </View>
        </ScrollView>
      ) : (
        <CollapsedComponent /> // Render collapsed component if showMenu is false
      )}
    </View>
  );
}
 
// const H = t("Home");
const menuItems = [
  { icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/0a17d9f0fc56620b27b7178e38a5e0f099f5de7418907c2f2a45cbee9c6764af?apiKey=7b9918e68d9b487793009b3aea5b1a32&" },
  { label: "Home", icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/c2a8bbea82c77b8fb3265f2792b73ef422d464a228510b5a1a07d2d657c4441f?apiKey=7b9918e68d9b487793009b3aea5b1a32&" },
   { label: "Courses", icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/e5fc48985e9bd23839ab4e933835f0a18c6a7586a0ec50e99bc97886e30e1e63?apiKey=7b9918e68d9b487793009b3aea5b1a32&" },
   { label: "Skills Analysis", icon: "https://img.icons8.com/?size=100&id=7964&format=png&color=5B5D55" },
  { label: "Growth Plan", icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/dea8538a41a4085f905f7513c46d36613c28b4ada84630149918f4444ac5ecde?apiKey=7b9918e68d9b487793009b3aea5b1a32&" },
  { label: "Hubs", icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/925cfbb55e82458868f5e0c8cafbdc90d47bec0907e65b77fb918a7ac0dbcfe0?apiKey=7b9918e68d9b487793009b3aea5b1a32&" },

  { label: "Interview", icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/ed6b330337dad3f4c29dae397b1a587ec9cdb40064dc06f64111e037496f2e8f?apiKey=7b9918e68d9b487793009b3aea5b1a32&" },
  { label: "Chats", icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/9c32b4dde608593e6e524f321c74e924eecd6b9caebc808c0af2d5ec35003c9d?apiKey=7b9918e68d9b487793009b3aea5b1a32&" },
  { label: "Scenario Project", icon: "https://img.icons8.com/?size=100&id=53380&format=png&color=5B5D55" },
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
  containerExpanded: {
    width: 80,
    marginTop: 0
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
    height: 30,
    width: 140,
    backgroundColor: '#E3F4DB',
    alignItems: "center",
    padding: 7,
    marginTop: 10,
    borderRadius: 5
  },

});



export default MyComponent; 