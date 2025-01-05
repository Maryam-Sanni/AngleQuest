import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import OpenModal from './Growth-plan-guide';
import OpenModal1 from './BioProfile';
import OpenModal2 from './Interview-guide';
import OpenModal3 from './Skill-analysis-guide';
import OpenModal4 from '../components/Create-hub';
import OpenModal5 from './PaymentDetails';
import OpenModal6 from './RequestGuide';
import OpenModal7 from './Onboard';
import { Button } from "react-native-paper";

const ProfilePage = ({ onClose }) => {
  const [activeSection, setActiveSection] = useState("Welcome Onboard");
  const [showSidebar, setShowSidebar] = useState(false);

  const sections = [
    { id: 1, title: "Skill Analysis Guide" },
    { id: 2, title: "Growth Plan Guide" },
    { id: 3, title: "Create a new Hub" },
    { id: 4, title: "Support Request Guide" },
    { id: 5, title: "Interview Guide" },
  ];

  const handleSectionClick = (section) => {
    setActiveSection(section);

    const showSidebarSections = [
      "Skill Analysis Guide",
      "Growth Plan Guide",
      "Create a new Hub",
      "Support Request Guide",
      "Interview Guide",
    ];

    // Show sidebar only if the clicked section is in the list
    if (showSidebarSections.includes(section)) {
      setShowSidebar(true);
    } else {
      setShowSidebar(false); // Hide the sidebar for other sections
    }
  };

  const toggleSidebar = () => {
    setShowSidebar(true);
    setActiveSection("Skill Analysis Guide"); 
  };

  const handleFinishOnboarding = () => {
    setActiveSection("Personal Information");
  };
  
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Button
          mode="text"
          textColor="#000000"
          style={[
            styles.button,
            activeSection === 'Welcome Onboard' && styles.activeButton,
          ]}
          onPress={() => handleSectionClick("Welcome Onboard")}
        >
          Welcome
        </Button>
        <Button
          mode="text"
          textColor="#000000"
          style={[
            styles.button,
            activeSection === 'Personal Information' && styles.activeButton,
          ]}
          onPress={() => handleSectionClick("Personal Information")}
        >
          Personal Information
        </Button>
       
        <Button
          mode="text"
          textColor="#000000"
          style={[
            styles.button,
            activeSection === 'Skill Analysis Guide' && styles.activeButton,
          ]}
          onPress={toggleSidebar}
        >
         Create Guides
        </Button>
        <Button
          mode="text"
          textColor="#000000"
          style={[
            styles.button,
            activeSection === 'Withdrawal Details' && styles.activeButton,
          ]}
          onPress={() => handleSectionClick("Withdrawal Details")}
        >
          Withdrawal Details
        </Button>
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
      </View>

      <View style={{ flexDirection: 'row', flex: 1 }}>
        {showSidebar && (
          <View style={styles.sidebar}>
            {sections.map((section) => (
              <TouchableOpacity
                key={section.id}
                style={[
                  styles.sidebarItem,
                  activeSection === section.title && styles.activeSidebarItem,
                ]}
                onPress={() => handleSectionClick(section.title)}
              >
                <Text
                  style={[
                    styles.sidebarText,
                    activeSection === section.title && styles.activeSidebarText,
                  ]}
                >
                  {section.title}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        )}

        <View style={styles.content}>
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

          {activeSection === "Withdrawal Details" && (
            <View style={styles.modalContainer}>
              <OpenModal5 />
            </View>
          )}

          {activeSection === "Personal Information" && (
            <View style={styles.modalContainer}>
              <OpenModal1 />
            </View>
          )}

          {activeSection === "Support Request Guide" && (
            <View style={styles.modalContainer}>
              <OpenModal6 />
            </View>
          )}

          {activeSection === "Welcome Onboard" && (
            <View style={styles.modalContainer}>
              <OpenModal7 onFinish={handleFinishOnboarding} />
            </View>
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 1200,
    marginTop: 100,
    paddingTop: 20,
    paddingLeft: 20,
    paddingRight: 20,
    backgroundColor: 'white',
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    padding: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  sidebar: {
    width: '20%',
    backgroundColor: '#f2f2f2',
    padding: 20,
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
    marginLeft: 10,
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
    right: 0,
    width: '100%',
    height: '100%',
    backgroundColor: '#fff',
    padding: 20,
  },
  activeButton: {
    backgroundColor: 'rgba(0, 0, 0, 0.07)',
  },
  button: {
    marginRight: 10,
  },
});

export default ProfilePage;
