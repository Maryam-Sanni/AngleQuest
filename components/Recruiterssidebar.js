import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from 'react-router-dom';
import { View, Image, Text, StyleSheet, Modal, TouchableOpacity, ScrollView } from "react-native";
import CollapsedComponent from "./Recruiterscollapsed"; 
import { useTranslation } from 'react-i18next';
 import OpenModal from '../Recruiters/businessprofile';
import AsyncStorage from '@react-native-async-storage/async-storage';

function MyComponent() {
  const [clickedItem, setClickedItem] = useState(null);
  const [hoveredItem, setHoveredItem] = useState(null); 
  const [showMenu, setShowMenu] = useState(true);
  const [messageCountText, setMessageCountText] = useState('0'); 
  const [modalVisible, setModalVisible] = useState(false);
  const [first_name, setFirstName] = useState('');
  const [last_name, setLastName] = useState(''); 

  const navigate = useNavigate();

  const handleItemHover = (item) => {
    setHoveredItem(item);
  };

  const handleItemClick = (item) => {
    if (item === menuItems[7]) {
      setShowMenu(false); // Hide the menu if the first menu item is clicked
    } else {
      setClickedItem(clickedItem === item ? null : item);
      // Navigate to respective screens based on menu item clicked
      switch(item.label) {
        case "Home":
          navigate('/business-home');
          break;
        case "Offers":
          navigate('');
          break;
        case "Interviews":
         navigate('/interview-candidates');
          break;
          case "Employees":
         navigate('/employees');
          break;
        case "Managers":
        navigate('/managers');
          break;
          case "Schedules":
          navigate('/schedules');
          break;
          case "Performance":
         navigate('/employee-performance');
          break;
          case "Coach":
        navigate('/coach');
          break;
          case "Teams":
      navigate('/teams');
          break;
          case "Analytics":
         navigate('/analytics');
          break;
        case "Subscription":
        navigate('/business-subscription');
          break;
        default:
          break;
      }
    }
  };

  const handleLogout = () => {
    // Handle logout action here
    console.log("Logout clicked");
    navigate('/sign-in'); // Navigate to the sign-in page
    setClickedItem(null);
  };

  const handleProfileClick = () => {
    // Navigate to MyProfile screen
    navigate('/business-profile');
  };

  const handleOpenPress = () => {
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };
  
  useEffect(() => {
    const currentPath = location.pathname; // Get the full path
    const matchedItem = menuItems.find(item => {
      switch(item.label) {
        case "Home": return currentPath === '/business-home';
         case "Employees": return currentPath === '/employees';
           case "Subscription": return currentPath === '/business-subscription';
        default: return false;
      }
    });

    if (matchedItem) {
      setClickedItem(matchedItem);
    }
  }, [location, menuItems]);
  
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
  
  const {t}=useTranslation()

  return (
    <View style={[styles.container, !showMenu && { width: 80 }]}>
      {showMenu ?  (
        <View style={styles.contentContainer}>
          {/* Menu Items */}
           <View style={{marginTop: 50}}>
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
          
          <TouchableOpacity onPress={handleOpenPress}>
          <View style={styles.divider} />
          <View style={styles.profileInfo}>
            <Image
              source={{ uri: 'https://cdn.builder.io/api/v1/image/assets/TEMP/96214782d7fee94659d7d6b5a7efe737b14e6f05a42e18dc902e7cdc60b0a37b' }}
              style={{ width: 40, aspectRatio: 1 }}
            />
            <View style={{ marginLeft: 5 }}>
              <Text style={{ fontSize: 14, color: '#666' }}>{first_name}</Text>
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
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={handleCloseModal}
          >
            <View style={styles.modalContent}>
              <OpenModal onClose={() => handleCloseModal()} />
            </View>
          </Modal>
        </View>
      ) : (
        <CollapsedComponent /> 
      )}
    </View>
    
  );
}

const menuItems = [
  { label: "Home", icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/c2a8bbea82c77b8fb3265f2792b73ef422d464a228510b5a1a07d2d657c4441f?apiKey=7b9918e68d9b487793009b3aea5b1a32&" },
  { label: "Employees", icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/fa3093fa6656295c8b39535a911908d6555a356fccce78af145fec472c4bd154?apiKey=7b9918e68d9b487793009b3aea5b1a32&" },

  { label: "Subscription", icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/4b274aadb26c96bd1bf3bcc2196a290c8aa4dd6f8bea63a98f9be3ea6a8bdec9?apiKey=7b9918e68d9b487793009b3aea5b1a32&" },
];

const styles = StyleSheet.create({
  container: {
    position: "fixed",
    top: 60,
    bottom: 0,
    marginRight: 30,
    width: 210,
    backgroundColor: "white",
    zIndex: 999,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between'
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
    backgroundColor: '#f7fff4',
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
    marginTop: 20,
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
  messageCount: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#4CAF50',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 70
  },
  messageCountText: {
    color: 'white',
    fontWeight: '500',
    fontSize: 11,
    fontFamily:"Roboto-Light" 
  },
});

export default MyComponent;
