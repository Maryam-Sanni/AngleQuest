import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import OpenModal from './Growth-plan-guide';
import OpenModal1 from './BioProfile';
import OpenModal2 from './Interview-guide';
import OpenModal3 from './Skill-analysis-guide';
import OpenModal4 from '../components/Create-hub';
import { useNavigate } from 'react-router-dom';

const ProfilePage = ({ onClose }) => {
  const [activeSection, setActiveSection] = useState(null);
  const navigate = useNavigate();
  

  const sections = [
    { id: 1, title: "Personal Information" },
    { id: 2, title: "Skill Analysis Guide" },
    { id: 3, title: "Growth Plan Guide" },
    { id: 4, title: "Create a new Hub" },
    { id: 5, title: "Interview Guide" },
  ];

  const handleSectionClick = (section) => {
    setActiveSection(section);
  };
 
  return (
    <View style={styles.container}>
      <View style={styles.sidebar}>
        {sections.map((section) => (
          <TouchableOpacity
            key={section.id}
            style={[
              styles.sidebarItem,
              activeSection === section.title && styles.activeSidebarItem, // Apply active style
            ]}
            onPress={() => handleSectionClick(section.title)}
          >
            <Text
              style={[
                styles.sidebarText,
                activeSection === section.title && styles.activeSidebarText, // Apply active text style
              ]}
            >
              {section.title}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.content}>
        <TouchableOpacity onPress={onClose} style={styles.closeButton}>
          <Text
            style={{
              fontSize: 18,
              color: 'red',
              fontWeight: 'bold',
              fontFamily: "Roboto-Light",
            }}
          >
            ✕
          </Text>
        </TouchableOpacity>
        
{activeSection === "Growth Plan Guide" && (
          <View style={styles.modalContainer}>
            <OpenModal />
          </View>
        )}

        {activeSection === "Interview Guide" && (
          <View style={styles.modalContainer}>
            <OpenModal2 />
          </View>
        )}

        {activeSection === "Skill Analysis Guide" && (
          <View style={styles.modalContainer}>
            <OpenModal3 />
          </View>
        )}

        {activeSection === "Create a new Hub" && (
          <View style={styles.modalContainer}>
            <OpenModal4 />
          </View>
        )}

        {activeSection === "Personal Information" && (
  <View style={styles.modalContainer}>
    <OpenModal1 />
  </View>
        )}

        {!activeSection && (
  <View style={styles.modalContainer}>
    <OpenModal1 />
  </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 1230,
    marginTop: 100,
    flex: 1,
    flexDirection: 'row',
    height: '100vh',
  },
  sidebar: {
    width: '25%',
    backgroundColor: '#f2f2f2',
    padding: 20,
    borderRightWidth: 1,
    borderRightColor: '#ddd',
  },
  sidebarItem: {
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  activeSidebarItem: {
    backgroundColor: '#206C00', 
  },
  sidebarText: {
    fontSize: 16,
    color: '#333',
    marginLeft: 10
  },
  activeSidebarText: {
    color: '#fff', 
    fontWeight: '600', 
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    position: 'relative',
  },
  contentText: {
    fontSize: 20,
    color: '#555',
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 20,
  },
  modalContainer: {
    position: 'absolute',
    top: 30,
    right: 0,
    width: '100%',
    height: '100%',
    backgroundColor: '#fff',
    borderLeftWidth: 1,
    borderLeftColor: '#ddd',
    padding: 20,
  },
});

export default ProfilePage;
