import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import { BlurView } from 'expo-blur';

const ComplaintsPage = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const [complaintFilter, setComplaintFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 5; // Number of complaints to display per page

  // Dummy data for complaints
  const complaints = [
    { id: 1, category: 'SAP', title: 'SAP System Outage', description: 'The SAP system is down and requires immediate attention.', date: '2024-10-20', status: 'unresolved' },
    { id: 2, category: 'Microsoft', title: 'Microsoft Teams Access Issue', description: 'Users are unable to access Microsoft Teams for meetings.', date: '2024-10-18', status: 'resolved'},
    { id: 3, category: 'Scrum', title: 'Scrum Sprint Planning Delay', description: 'The sprint planning meeting was delayed by a week.', date: '2024-10-15', status: 'resolved'},
    { id: 4, category: 'SAP', title: 'SAP Data Migration Errors', description: 'Errors encountered during data migration to the new SAP system.', date: '2024-10-20', status: 'unresolved'},
    { id: 5, category: 'Microsoft', title: 'Microsoft Excel Formula Issues', description: 'Incorrect results due to broken formulas in the financial report.', date: '2024-10-15', status: 'resolved' },
    { id: 6, category: 'Scrum', title: 'Scrum Retrospective Feedback', description: 'Team feedback regarding the last retrospective session.', date: '2024-10-10',  status: 'unresolved' },
    { id: 7, category: 'Scrum', title: 'SAP User Training Required', description: 'Additional training needed for users on the new SAP module.', date: '2024-10-20',  status: 'unresolved' },
    { id: 8, category: 'Business Analysis', title: 'Business Analysis Requirement Changes', description: 'Client has updated requirements that need immediate attention.', date: '2024-10-15',  status: 'unresolved' },
    { id: 9, category: 'Microsoft', title: 'Microsoft Power BI Dashboard Issues', description: 'Problems with data visualization in Power BI dashboards.', date: '2024-10-10',  status: 'unresolved' },
  ];

// Filter complaints based on selected status
  const filteredComplaints = complaints.filter(complaint => 
    complaintFilter === 'all' ? true : complaint.status === complaintFilter
  );

  const totalPages = Math.ceil(filteredComplaints.length / itemsPerPage);

  // Get the current complaints to display based on the page
  const displayedComplaints = filteredComplaints.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  const goToNextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const goToPreviousPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleComplaintSelect = (complaint) => {
    setSelectedComplaint(complaint);
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <BlurView intensity={100} style={styles.blurBackground}>
        <Text style={styles.title}>Tickets</Text>
        
        {/* Filter Buttons */}
        <View style={styles.filterButtons}>
          <TouchableOpacity onPress={() => setComplaintFilter('all')} style={styles.filterButton}>
            <Text style={complaintFilter === 'all' ? styles.activeFilterText : styles.filterText}>All</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setComplaintFilter('resolved')} style={styles.filterButton}>
            <Text style={complaintFilter === 'resolved' ? styles.activeFilterText : styles.filterText}>Resolved</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setComplaintFilter('unresolved')} style={styles.filterButton}>
            <Text style={complaintFilter === 'unresolved' ? styles.activeFilterText : styles.filterText}>Unresolved</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.table}>
          <View style={styles.row3}>
          <View style={styles.cell3}>
          <Text style={[styles.headerText, { marginRight: 100 }]}>Category</Text>
            </View>
            <View style={styles.cell3}>
            <Text style={[styles.headerText, { marginRight: 100 }]}>Topic</Text>
            </View>
            <View style={styles.cell3}>
            <Text style={[styles.headerText, { marginRight: 60 }]}>Description</Text>
            </View>
            <View style={styles.cell3}>
              <Text style={styles.headerText}>Date</Text>
            </View>
            <View style={styles.cell3}>
              <Text style={styles.headerText}>Status</Text>
            </View>
          </View>
          </View>

        {/* Complaints Table */}
        <View style={styles.table}>
          {displayedComplaints.length > 0 ? (
            displayedComplaints.map((complaint, index) => (
              <View
                key={complaint.id}
                style={[styles.row, index % 2 === 0 ? styles.cell : styles.cell2]}
              >
                     <Text style={[styles.row, index % 2 === 0 ? styles.cell : styles.cell2, { marginLeft: 50 }]}>{complaint.category}</Text>
                <Text  style={[styles.row, index % 2 === 0 ? styles.cell : styles.cell2]}>{complaint.title}</Text>
                <Text style={[styles.row, index % 2 === 0 ? styles.cell : styles.cell2, { marginRight: 50 }]}>
  {complaint.description}
</Text>
                <Text  style={[styles.row, index % 2 === 0 ? styles.cell : styles.cell2]}>{complaint.date}</Text>
                <Text style={[
                  styles.statusText,
                  complaint.status === 'resolved'
                    ? styles.resolvedStatus
                    : styles.unresolvedStatus
                ]}>
                  {complaint.status === 'resolved' ? 'Resolved' : 'Unresolved'}
                </Text>
                
              </View>
            ))
          ) : (
            <Text style={styles.noDataText}>No complaints available</Text>
          )}
           <View style={styles.paginationContainer}>
              <TouchableOpacity onPress={goToPreviousPage} disabled={currentPage === 0}>
                <Text style={currentPage === 0 ? styles.disabledButton : styles.button}>{'<'}</Text>
              </TouchableOpacity>
              <Text>{`Page ${currentPage + 1} of ${totalPages}`}</Text>
              <TouchableOpacity onPress={goToNextPage} disabled={currentPage >= totalPages - 1}>
                <Text style={currentPage >= totalPages - 1 ? styles.disabledButton : styles.button}>{'>'}</Text>
              </TouchableOpacity>
            </View>
        </View>

        {/* Modal for Complaint Details */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={handleCloseModal}
        >
          <View style={styles.modalContent}>
            {selectedComplaint && (
              <>
                <Text style={styles.modalTitle}>{selectedComplaint.title}</Text>
                <Text style={styles.modalDescription}>{selectedComplaint.description}</Text>
                <Text>Status: {selectedComplaint.status}</Text>
                <TouchableOpacity onPress={handleCloseModal}>
                  <Text style={styles.closeModalText}>Close</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </Modal>
      </BlurView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    borderRadius: 20,
    marginTop: 50,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  blurBackground: {
    flex: 1,
    borderRadius: 20,
    padding: 15,
  },
  filterButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 15,
  },
  filterButton: {
    padding: 10,
  },
  filterText: {
    fontSize: 16,
    color: 'darkgrey',
  },
  activeFilterText: {
    fontSize: 16,
    color: '#F8F8F8',
    fontWeight: 'bold',
  },
  table: {
    marginTop: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
  },
  cell: {
    flex: 1,
    paddingHorizontal: 5,
    backgroundColor: 'none',
    alignItems: 'center',
    justifyContent: 'center'
  },
  cell2: {
    flex: 1,
    paddingHorizontal: 5,
    backgroundColor: 'white',
     alignItems: 'center',
    justifyContent: 'center'
  },
  cell3: {
    flex: 1,
    padding: 20,
    backgroundColor: 'white',
     alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
  },
  row3: {
    flexDirection: 'row',
  },
  statusText: {
    borderRadius: 5,
    color: 'white',
    width: 100,
    padding: 8,
    height: 30,
    textAlign: 'center',
    marginRight: 50,
  },
  resolvedStatus: {
    backgroundColor: 'lightgreen',
    color: 'green',
    textAlign: 'center',
  },
  unresolvedStatus: {
    backgroundColor: '#FFCDD2',
    color: 'red',
    textAlign: 'center',
  },
  linkText: {
    color: 'black',
  },
  noDataText: {
    textAlign: 'center',
    color: 'gray',
    marginTop: 20,
  },
  modalContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalDescription: {
    fontSize: 16,
    marginBottom: 10,
  },
  closeModalText: {
    marginTop: 20,
    color: '#fff',
  },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
    marginLeft: 50,
    marginRight: 50
  },
  button: {
    fontSize: 18,
    color: 'darkgreen',
  },
  disabledButton: {
    fontSize: 18,
    color: 'gray',
  }, 
  headerText: {
    fontWeight: '600',
    fontSize: 14,
  },
});

export default ComplaintsPage;
