import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated, ImageBackground, ScrollView, Picker, Modal } from 'react-native';
import Topbar from '../components/expertstopbar';
import Sidebar from '../components/expertssidebar';
import ResponseModal from '../Experts/TicketsResponse';

const TicketsPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedSeverity, setSelectedSeverity] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [isPressed, setIsPressed] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
   const [currentTicketTitle, setCurrentTicketTitle] = useState(''); 

  const ticketsData = [
    { id: 1, title: 'SAP System Outage', description: 'The SAP system is down and requires immediate attention.', date: '2024-10-20', severity: 'Severe', category: 'SAP', status: 'unresolved' },
    { id: 2, title: 'Microsoft Teams Access Issue', description: 'Users are unable to access Microsoft Teams for meetings.', date: '2024-10-18', severity: 'Moderate', category: 'Microsoft', status: 'resolved' },
    { id: 3, title: 'Scrum Sprint Planning Delay', description: 'The sprint planning meeting was delayed by a week.', date: '2024-10-15', severity: 'Low', category: 'Scrum', status: 'unresolved' },
    { id: 4, title: 'SAP Data Migration Errors', description: 'Errors encountered during data migration to the new SAP system.', date: '2024-10-20', severity: 'Severe', category: 'SAP', status: 'resolved' },
      { id: 5, title: 'Microsoft Excel Formula Issues', description: 'Incorrect results due to broken formulas in the financial report.', date: '2024-10-15', severity: 'Low', category: 'Microsoft', status: 'unresolved' },
      { id: 6, title: 'Scrum Retrospective Feedback', description: 'Team feedback regarding the last retrospective session.', date: '2024-10-10', severity: 'Low', category: 'Scrum', status: 'resolved' },
      { id: 7, title: 'SAP User Training Required', description: 'Additional training needed for users on the new SAP module.', date: '2024-10-20', severity: 'Low', category: 'SAP', status: 'unresolved' },
      { id: 8, title: 'Business Analysis Requirement Changes', description: 'Client has updated requirements that need immediate attention.', date: '2024-10-15', severity: 'Moderate', category: 'Business Analysis', status: 'unresolved' },
      { id: 9, title: 'Microsoft Power BI Dashboard Issues', description: 'Problems with data visualization in Power BI dashboards.', date: '2024-10-10', severity: 'Low', category: 'Microsoft', status: 'resolved' },
  ];

  // Filter tickets based on selected criteria
  const filteredTickets = ticketsData.filter(ticket => 
    (selectedCategory === '' || ticket.category === selectedCategory) &&
    (selectedSeverity === '' || ticket.severity === selectedSeverity) &&
    (selectedStatus === '' || ticket.status === selectedStatus)
  );

  const handlePressIn = (index) => {
    setIsPressed(prev => {
      const updated = [...prev];
      updated[index] = true;
      return updated;
    });
  };

  const handlePressOut = (index) => {
    setIsPressed(prev => {
      const updated = [...prev];
      updated[index] = false;
      return updated;
    });
  };

  const openModal = (title) => {
    setCurrentTicketTitle(title); // Set the current ticket title
    setModalVisible(true); // Open the modal
  };
  
  return (
    <ImageBackground source={require('../assets/backgroundimg2.png')} style={styles.background}>
      <View style={{ flex: 1 }}>
        <Topbar />
        <View style={styles.mainContainer}>
          <Sidebar />
          <View style={styles.content}>
            <View style={styles.filterContainer}>
              <Picker selectedValue={selectedCategory} style={styles.picker} onValueChange={value => setSelectedCategory(value)}>
                <Picker.Item label="All Category" value="" />
                <Picker.Item label="SAP" value="SAP" />
                <Picker.Item label="Microsoft" value="Microsoft" />
                <Picker.Item label="Scrum" value="Scrum" />
                <Picker.Item label="Business Analysis" value="Business Analysis" />
              </Picker>
              <Picker selectedValue={selectedSeverity} style={styles.picker} onValueChange={value => setSelectedSeverity(value)}>
                <Picker.Item label="All Severity" value="" />
                <Picker.Item label="Severe" value="Severe" />
                <Picker.Item label="Moderate" value="Moderate" />
                <Picker.Item label="Low" value="Low" />
              </Picker>
              <Picker selectedValue={selectedStatus} style={styles.picker} onValueChange={value => setSelectedStatus(value)}>
                <Picker.Item label="All Status" value="" />
                <Picker.Item label="Resolved" value="resolved" />
                <Picker.Item label="Unresolved" value="unresolved" />
              </Picker>
            </View>
            <ScrollView contentContainerStyle={styles.ticketContainer}>
              {filteredTickets.map((ticket, index) => (
                <Animated.View key={ticket.id} style={styles.ticketCard}>
                  <View style={styles.header}>
                    <View style={styles.severityIndicator(ticket.severity)} />
                    <Text style={styles.ticketTitle}>{ticket.title}</Text>
                  </View>
                  <Text style={styles.ticketDescription}>{ticket.description}</Text>
                  <Text style={styles.ticketDate}>{ticket.date}</Text>
                  <View style={styles.actions}>
                    <TouchableOpacity onPress={() => {/* Handle view details */}} style={styles.viewButton}>
                      <Text style={styles.buttonText}>View</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPressIn={() => handlePressIn(index)}
                      onPressOut={() => handlePressOut(index)}
                      onPress={() => openModal(ticket.title)} // Open the modal with the ticket title
                      style={[
                        styles.respondButton,
                        isPressed[index] && styles.respondButtonPressed,
                      ]}
                    >
                      <Text style={isPressed[index] ? styles.respondButtonPressedText : styles.buttonText}>
                        Respond
                      </Text>
                    </TouchableOpacity>
                  </View>
                </Animated.View>
              ))}
            </ScrollView>
          </View>
        </View>
      </View>
       <ResponseModal visible={modalVisible} onClose={() => setModalVisible(false)} title={currentTicketTitle} /> {/* Render the modal */}
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    height: '100%',
    width: '100%',
    flex: 1,
  },
  mainContainer: {
    flexDirection: 'row',
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 20,
    marginLeft: 230
  },
  filterContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    justifyContent: 'space-between',
  },
  picker: {
    flex: 1,
    height: 50,
    marginHorizontal: 5,
    backgroundColor: '#F5F5F5',
  },
  ticketContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  ticketCard: {
    width: '48%',
    padding: 15,
    marginBottom: 20,
    borderRadius: 10,
    backgroundColor: 'white',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  severityIndicator: (severity) => ({
    height: 8,
    width: 8,
    borderRadius: 4,
    backgroundColor: severity === 'Severe' ? 'red' : severity === 'Moderate' ? 'green' : 'orange',
    marginRight: 10,
  }),
  ticketTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  ticketDescription: {
    fontSize: 14,
    color: '#555',
    marginBottom: 10,
  },
  ticketDate: {
    fontSize: 12,
    color: '#999',
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  viewButton: {
    backgroundColor: "#f0f0f0",
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  respondButton: {
    backgroundColor: "#f0f0f0",
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  respondButtonPressed: {
    backgroundColor: 'coral',
  },
  buttonText: {
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  respondButtonPressedText: {
    color: 'white',
  },
});

export default TicketsPage;
