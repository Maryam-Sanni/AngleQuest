import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import OpenModal from './Growthplanprofile'; // Import your Growth Plan Profile modal
import { useNavigate } from 'react-router-dom';

const ProfilePage = ({ onClose }) => {
  const [activeSection, setActiveSection] = useState(null);
  const navigate = useNavigate();

  const sections = [
    { id: 1, title: "Personal Information" },
    { id: 2, title: "Growth Plan Profile" },
    { id: 3, title: "Interview Profile" },
    { id: 4, title: "Skill Analysis Profile" },
    { id: 5, title: "Create Hub" },
  ];

  const handleSectionClick = (section) => {
    setActiveSection(section);
  };

  const onCe = () => {
    navigate("/home-experts");
  };

  return (
    <View style={styles.container}>
      <View style={styles.sidebar}>
        {sections.map((section) => (
          <TouchableOpacity
            key={section.id}
            style={styles.sidebarItem}
            onPress={() => handleSectionClick(section.title)}
          >
            <Text style={styles.sidebarText}>{section.title}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.content}>
        <TouchableOpacity onPress={onClose} style={styles.closeButton}>
          <Text style={{ fontSize: 18, color: 'red', fontWeight: 'bold', fontFamily: "Roboto-Light" }}>
            ✕
          </Text>
        </TouchableOpacity>
        {activeSection === "Growth Plan Profile" ? (
          // Render the GrowthPlanProfile pop-up component
          <View style={styles.modalContainer}>
            <OpenModal />
          </View>
        ) : activeSection ? (
          <Text style={styles.contentText}>
            {`You clicked on ${activeSection}`}
          </Text>
        ) : (
          <Text style={styles.contentText}>
            Click on any section to display the content here.
          </Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 1250,
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
  sidebarText: {
    fontSize: 16,
    color: '#333',
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
    top: 20,
    right: 20,
  },
  modalContainer: {
    position: 'absolute',
    top: 0,
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
