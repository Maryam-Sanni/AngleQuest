import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated, ImageBackground, ScrollView} from 'react-native';
import Topbar from '../components/expertstopbar';
import Sidebar from '../components/expertssidebar';

const TicketsPage = () => {
  const [selectedSeverity, setSelectedSeverity] = useState(null);
  const [isPressed, setIsPressed] = useState([]);

  // Sample ticket data with severity
  const ticketsData = [
    { id: 1, title: 'SAP System Outage', description: 'The SAP system is down and requires immediate attention.', date: '2024-10-20', severity: 'Severe' },
    { id: 2, title: 'Microsoft Teams Access Issue', description: 'Users are unable to access Microsoft Teams for meetings.', date: '2024-10-18', severity: 'Moderate' },
    { id: 3, title: 'Scrum Sprint Planning Delay', description: 'The sprint planning meeting was delayed by a week.', date: '2024-10-15', severity: 'Low' },
    { id: 4, title: 'SAP Data Migration Errors', description: 'Errors encountered during data migration to the new SAP system.', date: '2024-10-20', severity: 'Severe' },
    { id: 5, title: 'Microsoft Excel Formula Issues', description: 'Incorrect results due to broken formulas in the financial report.', date: '2024-10-15', severity: 'Low' },
    { id: 6, title: 'Scrum Retrospective Feedback', description: 'Team feedback regarding the last retrospective session.', date: '2024-10-10', severity: 'Low' },
    { id: 7, title: 'SAP User Training Required', description: 'Additional training needed for users on the new SAP module.', date: '2024-10-20', severity: 'Severe' },
    { id: 8, title: 'Business Analysis Requirement Changes', description: 'Client has updated requirements that need immediate attention.', date: '2024-10-15', severity: 'Moderate' },
    { id: 9, title: 'Microsoft Power BI Dashboard Issues', description: 'Problems with data visualization in Power BI dashboards.', date: '2024-10-10', severity: 'Low' },
  ];

  // Adjust button styles on press
  const handlePressIn = (index) => {
    setIsPressed((prev) => {
      const updated = [...prev];
      updated[index] = true;
      return updated;
    });
  };

  const handlePressOut = (index) => {
    setIsPressed((prev) => {
      const updated = [...prev];
      updated[index] = false;
      return updated;
    });
  };

  return (
    <ImageBackground
    source={require ('../assets/backgroundimg2.png') }
  style={{ height: '100%', width: '100%',flex: 1}}
>
    <View style={{ flex: 1 }}>
      <Topbar />
      <View style={{ flexDirection: 'row', flex: 1 }}>
        <Sidebar />
        <ScrollView contentContainerStyle={{ flexGrow: 1, maxHeight: 500 }}>
    <View style={{marginLeft: 230,  flex: 1,}}>
    <View style={styles.headers}>


</View>
<View style={styles.container}>
      {ticketsData.map((ticket, index) => (
        <Animated.View
          key={ticket.id}
          style={{
            width: '33%',
            paddingHorizontal: 5,
            transform: [{ scale: 1 }],
          }}
        >
          <View style={styles.ticketCard}>
            <View style={styles.header}>
              <View style={styles.severityIndicator(ticket.severity)}></View>
              <Text style={styles.ticketTitle}>{ticket.title}</Text>
            </View>

            <Text style={styles.ticketDescription}>{ticket.description}</Text>
            <Text style={styles.ticketDate}>{ticket.date}</Text>

            <View style={styles.actions}>
              <TouchableOpacity
                onPress={() => {/* Handle view ticket details */}}
                style={styles.viewButton}
              >
                <Text style={styles.buttonText}>View</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPressIn={() => handlePressIn(index)}
                onPressOut={() => handlePressOut(index)}
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
          </View>
        </Animated.View>
      ))}
    </View>
    </View>
    </ScrollView>
    </View>
    </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        flexDirection: 'row',
        flexWrap: 'wrap',
      },
  ticketCard: {
    width: 320,
    height: 200,
    marginBottom: 30,
    padding: 20,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    backgroundColor: "white",
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  headers: {
    marginLeft: -60,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    backgroundColor: '#f7fff4',
    paddingVertical: 25,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  }, 
  severityIndicator: (severity) => ({
    height: 35,
    width: 8,
    backgroundColor: severity === 'Severe' ? 'red' : severity === 'Moderate' ? 'orange' : 'green',
    borderRadius: 5,
    marginRight: 10,
    marginLeft: -20
  }),
  ticketTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
  },
  ticketDescription: {
    fontSize: 14,
    color: '#555',
    height: 55,
    overflow: 'hidden',
    marginBottom: 10,
  },
  ticketDate: {
    fontSize: 12,
    color: '#999',
    marginBottom: 10
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'absolute',
    bottom: 10,
    width: '100%',
    alignSelf: 'center',
  },
  viewButton: {
    backgroundColor: "#F5F5F5",
    borderWidth: 0.5,
    borderColor: 'grey',
    borderRadius: 5,
    width: 120,
    padding: 5,
    marginLeft: 20,
    justifyContent: 'center',
  },
  respondButton: {
    backgroundColor: "#F5F5F5",
    borderWidth: 0.5,
    borderColor: 'grey',
    borderRadius: 5,
    width: 120,
    padding: 5,
    marginRight: 20,
    justifyContent: 'center',
  },
  respondButtonPressed: {
    backgroundColor: 'coral',
    borderColor: 'coral',
  },
  buttonText: {
    color: 'black',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 14,
  },
  respondButtonPressedText: {
    color: '#fff',
  },
});

export default TicketsPage;
