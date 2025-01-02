import React, { useState, useEffect } from "react";
import { View, Image, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import CollapsedComponent from "./collapsed"; // Import your collapsed component
import { useTranslation } from 'react-i18next';
import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigate, useLocation } from 'react-router-dom';
import OpenModal from "../Experts/Updateprofiles";

function MyComponent() {
  const navigate = useNavigate();
   const location = useLocation();
  const [clickedItem, setClickedItem] = useState(null);
  const [hoveredItem, setHoveredItem] = useState(null); 
  const [showMenu, setShowMenu] = useState(true);
  const [first_name, setFirstName] = useState('');
  const [last_name, setLastName] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [filteredMenuItems, setFilteredMenuItems] = useState([]);

  const handleOpenPress = () => {
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };
  
  const apiUrl = process.env.REACT_APP_API_URL;

  const handleItemClick = async (item) => {
    
      setClickedItem(clickedItem === item ? null : item);
      // Navigate to respective screens based on menu item clicked
      switch(item.label) {
        case "Home":
         navigate('/home-individuals');
          break;
        case "Courses":
         navigate('/join-courses');
          break;
        case "Growth Plan":
             navigate('/growth-plan-sessions');
          break;
          case "Interview":
               navigate('/interview-sessions');
          break;
        case "Skills Analysis":
             navigate('/skill-analysis-sessions');
          break;
          case "Hubs":
             navigate('/coaching-hub-sessions');
          break;
          case "Performance":
          navigate('/performance');
          break;
          case "Support Request":
            navigate('/support-request');
            break;
        case "Chats":
          navigate('/chat');
          break;
        default:
          break;
          case "Scenario Project":
            navigate('/project');
            break;
    }
  };

  const handleLogout = () => {
    navigate('/sign-in');
  };

  const handleProfileClick = () => {
    // Navigate to MyProfile screen
    navigate('/profile');
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

  useEffect(() => {
    const fetchPaymentDetails = async () => {
      try {
        const token = await AsyncStorage.getItem("token");
        if (!token) {
          console.error("Token not found");
          return;
        }

        const response = await axios.get(`${apiUrl}/api/jobseeker/get-paystack-payment-details`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const paystackDetails = response?.data?.PaystackDetail;

        if (Array.isArray(paystackDetails) && paystackDetails.length > 0) {
          const lastService = paystackDetails[paystackDetails.length - 1]?.service;

          // Filter menu items based on the service
          let filteredItems = [];
          switch (lastService) {
            case "Career Support":
              filteredItems = menuItems.filter(item =>
                ["Home", "Skills Analysis", "Growth Plan", "Hubs"].includes(item.label)
              );
              break;
            case "Knowledge Backup":
              filteredItems = menuItems.filter(item =>
                ["Home", "Hubs", "Support Request"].includes(item.label)
              );
              break;
            case "Knowledge Backup + Career Support":
              filteredItems = menuItems; // Show everything
              break;
            default:
              filteredItems = []; // Show nothing if no valid service is found
          }

          setFilteredMenuItems(filteredItems);
        } else {
          console.warn("No payment details found");
        }
      } catch (error) {
        console.error("Error fetching payment details:", error.response?.data || error.message);
      }
    };

    fetchPaymentDetails();
  }, [apiUrl]);

  const { t } = useTranslation()

  useEffect(() => {
    const currentPath = location.pathname; // Get the full path
    const matchedItem = menuItems.find(item => {
      switch(item.label) {
        case "Home": return currentPath === '/home-individuals';
        case "Courses": return ['/my-courses', '/join-courses'].includes(currentPath);
        case "Growth Plan": return ['/growth-plan-new', '/growth-plan-sessions', '/expert-roadmap'].includes(currentPath);
        case "Interview": return ['/interview-new', '/interview-sessions'].includes(currentPath);
        case "Scenario Project": return currentPath === '/project';
        case "Skills Analysis": return ['/skill-analysis-sessions', '/ai-result', '/expert-analysis', '/ai-analysis', '/skill-analysis-new'].includes(currentPath);
        case "Hubs": return ['/coaching-hub-new', '/coaching-hub-sessions'].includes(currentPath);
        case "Performance": return currentPath === '/performance';
        case "Chats": return currentPath === '/chat';
          case "Support Request": return currentPath === '/support-request';
        default: return false;
      }
    });

    if (matchedItem) {
      setClickedItem(matchedItem);
    }
  }, [location, menuItems]);

  return (
    <View style={[styles.container, !showMenu && styles.containerExpanded]}>
      {showMenu ? ( // Render menu if showMenu is true
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <View style={styles.contentContainer}>
            {/* Menu Items */}
            <View style={{marginTop: 50}}>
            {filteredMenuItems.map((menuItem, index) => (
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
            </View>
            {/* Profile Info */}
            <TouchableOpacity >
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
  { label: "Home", icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/c2a8bbea82c77b8fb3265f2792b73ef422d464a228510b5a1a07d2d657c4441f?apiKey=7b9918e68d9b487793009b3aea5b1a32&" },
   { label: "Skills Analysis", icon: "https://img.icons8.com/?size=100&id=7964&format=png&color=5B5D55" },
  { label: "Growth Plan", icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/dea8538a41a4085f905f7513c46d36613c28b4ada84630149918f4444ac5ecde?apiKey=7b9918e68d9b487793009b3aea5b1a32&" },
  { label: "Hubs", icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/925cfbb55e82458868f5e0c8cafbdc90d47bec0907e65b77fb918a7ac0dbcfe0?apiKey=7b9918e68d9b487793009b3aea5b1a32&" },
  { label: "Support Request", icon: "https://img.icons8.com/?size=100&id=51413&format=png&color=5B5D55" },
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
  modalContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.1)",
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
    fontSize: 16,
    marginLeft: 6,
    color: "black",
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