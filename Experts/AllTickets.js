import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated, ImageBackground, ScrollView, Picker, Modal, Image } from 'react-native';
import Topbar from '../components/expertstopbar';
import Sidebar from '../components/expertssidebar';
import OpenModal from '../Experts/TicketsResponse';
import OpenModal2 from '../Experts/TicketsResponse2';
import OpenModal3 from '../Experts/TicketsResponse3';

// Function to calculate the difference in days
const getRemainingDays = (deadline) => {
  const currentDate = new Date();
  const deadlineDate = new Date(deadline);
  const diffTime = deadlineDate - currentDate;
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24)); // Returns the remaining days
};

const TicketsPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedSeverity, setSelectedSeverity] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [isPressed, setIsPressed] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisible2, setModalVisible2] = useState(false);
  const [modalVisible3, setModalVisible3] = useState(false);
   const [currentTicketTitle, setCurrentTicketTitle] = useState('');

  const requests = [
    {
      id: 1,
      name: "Bilal Husain",
      service: "SAP FI",
      category: "SAP", // New category field
      deadline: "2024-11-25T14:00:00",
      description: "Material posting expense not processed correctly.",
      status: "New Request",
      deadlineStatus: "Deadline State", // "Deadline State" or "On Time State"
      preference: "Text", // Can be "Text", "Voice", or "Video"
    },
    {
      id: 2,
      name: "Mike Ross",
      service: "Microsoft Excel",
      category: "Microsoft",
      deadline: "2024-11-26T17:00:00",
      description: "Bug in invoice generation.",
      status: "New Request",
      deadlineStatus: "Deadline State",
      preference: "Voice", // Can be "Text", "Voice", or "Video"
    },
    {
      id: 3,
      name: "Racheal Zain",
      service: "Business Analysis",
      category: "Business Analysis",
      deadline: "2024-12-01T09:00:00",
      description: "Expense analysis report pending.",
      status: "New Request",
      deadlineStatus: "On Time State",
      preference: "Video", // Can be "Text", "Voice", or "Video"
    },
    {
      id: 4,
      name: "Susan Ambrose",
      service: "Scrum",
      category: "Scrum",
      deadline: "2024-12-05T15:00:00",
      description: "Sprint planning is overdue.",
      status: "New Request",
      deadlineStatus: "On Time State",
      preference: "Voice", // Can be "Text", "Voice", or "Video"
    },
    {
      id: 5,
      name: "Adalain Huter",
      service: "SAP FI",
      category: "SAP",
      deadline: "2025-01-30T12:00:00",
      description: "Material posting issue needs fixing.",
      status: "New Request",
      deadlineStatus: "Deadline State",
      preference: "Text", // Can be "Text", "Voice", or "Video"
    },
    {
      id: 6,
      name: "John Doe",
      service: "Microsoft Power BI",
      category: "Microsoft",
      deadline: "2024-12-31T10:00:00",
      description: "Data visualization not reflecting properly.",
      status: "New Request",
      deadlineStatus: "On Time State",
      preference: "Video", // Can be "Text", "Voice", or "Video"
    },
  ];

  const [activeRequests, setActiveRequests] = useState(requests);
  const [acceptedRequests, setAcceptedRequests] = useState([]);
  
  // Handle accept logic
  const handleAccept = (requestId) => {
    const acceptedRequest = activeRequests.find(request => request.id === requestId);
    setAcceptedRequests(prevState => [...prevState, acceptedRequest]);
    setActiveRequests(prevState => prevState.filter(request => request.id !== requestId));
  };
  
  // Handle decline logic
  const handleDecline = (requestId) => {
    setActiveRequests(prevState => prevState.filter(request => request.id !== requestId));
  };
  
  // Filter the activeRequests based on selectedCategory
  const filteredRequests = selectedCategory
    ? activeRequests.filter((request) => request.category === selectedCategory)
    : activeRequests;
  

  const getColorByPreference = (preference) => {
    switch (preference) {
      case 'Text':
        return '#FFDBBB';
      case 'Voice':
        return '#c1e1c1';
      case 'Video':
        return '#B6D0E2';
      default:
        return '#FFFFFF';
    }
  };
  
  const handleOpenPress = () => {
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  const handleOpenPress2 = () => {
    setModalVisible2(true);
  };

  const handleCloseModal2 = () => {
    setModalVisible2(false);
  };
  
  const handleOpenPress3 = () => {
    setModalVisible3(true);
  };

  const handleCloseModal3 = () => {
    setModalVisible3(false);
  };

  return (
    <View style={styles.container}>
      <View style={{ flex: 1 }}>
        <Topbar />
        <View style={styles.mainContainer}>
          <Sidebar />
          <View style={styles.content}>
            <View style={styles.filterContainer}>
              <Picker
                selectedValue={selectedCategory}
                style={styles.picker}
                onValueChange={(value) => setSelectedCategory(value)}
              >
                <Picker.Item label="All Category" value="" />
                <Picker.Item label="SAP" value="SAP" />
                <Picker.Item label="Microsoft" value="Microsoft" />
                <Picker.Item label="Scrum" value="Scrum" />
                <Picker.Item label="Business Analysis" value="Business Analysis" />
              </Picker>
            </View>
            <View style={styles.progressBar}>
              <View style={styles.progressStep}>
                <Text style={styles.stepText}>New Request</Text>
              </View>
               <View style={styles.progressStep}>
                <Text style={styles.stepText}>To do</Text>
              </View>
               <View style={styles.progressStep}>
                <Text style={styles.stepText}>Status</Text>
              </View>
               <View style={styles.progressStep}>
                <Text style={styles.stepText}>Rating</Text>
              </View>
            </View>
            <ScrollView contentContainerStyle={styles.ticketContainer}>
              <View style={{flexDirection: 'column', maxWidth: '100%'}}>
                <View style={{flexDirection: 'row', maxWidth: '100%'}}>
                  <View style={{ flexDirection: 'column', width: '24%', marginRight: 5, marginLeft: 5 }}>
                    {filteredRequests.map((request) => (
                      <View key={request.id}>
                        <View style={styles.smallstep0}>
                          <View style={{ flexDirection: 'row' }}>
                            <Image
                              source={{
                                uri: "https://img.icons8.com/?size=100&id=JfOkE4KGyx7r&format=png&color=000000",
                              }}
                              style={{
                                width: 40,
                                height: 40,
                                marginRight: 10,
                                borderRadius: 20,
                                borderWidth: 1,
                                padding: 10,
                              }}
                            />
                            <Text style={{ fontSize: 18, fontWeight: 'bold', marginTop: 5 }}>{request.name}</Text>
                          </View>
                          <View style={{ flexDirection: 'column', marginTop: 10 }}>
                            <View style={{ flexDirection: 'column' }}>
                            
                              <Text style={{ fontSize: 14, fontWeight: '600' }}>{request.service}</Text>
                            </View>
                            
                          <Text style={{ fontSize: 14, marginTop: 5, marginBottom: 5 }}>
                            {request.description}
                          </Text>
                           
                                
                                <Text style={{ fontSize: 14, fontWeight: '600', marginBottom: 10 }}>
                                  {new Date(request.deadline).toLocaleDateString()} - {new Date(request.deadline).toLocaleTimeString()}
                                </Text>
                              </View>

                          <View style={{ flexDirection: 'row',}}>
                            <TouchableOpacity style={styles.submitButton} onPress={() => handleDecline(request.id)}>
                              <View style={{ flexDirection: 'row' }}>
                                <Text style={{ color: 'black', fontSize: 16, textAlign: 'center' }}>Decline</Text>
                                <Image
                                  source={{
                                    uri: "https://img.icons8.com/?size=100&id=10267&format=png&color=000000",
                                  }}
                                  style={{
                                    width: 20,
                                    height: 20,
                                    marginLeft: 10,
                                  }}
                                />
                              </View>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.submitButton1} onPress={() => handleAccept(request.id)}>
                              <View style={{ flexDirection: 'row' }}>
                                <Text style={{ color: 'black', fontSize: 16, textAlign: 'center' }}>Accept</Text>
                                <Image
                                  source={{
                                    uri: "https://img.icons8.com/?size=100&id=60010&format=png&color=000000",
                                  }}
                                  style={{
                                    width: 20,
                                    height: 20,
                                    marginLeft: 10,
                                  }}
                                />
                              </View>
                            </TouchableOpacity>
                          </View>

                          
                        </View>
                      </View>
                    ))}
                  </View>
              

                  <View style={{flexDirection: 'column', width: '24%', marginRight: 10, marginLeft: 10}}>
                    {acceptedRequests.map((request) => (
                      <View key={request.id}>
                  <View style={styles.smallstep}>
                    <View style={{flexDirection: 'row'}}>
                       <Text style={{fontSize: 18, color: 'black', fontWeight: 'bold' }}>{request.name}</Text>
                     
                      </View>
                     <Text style={{fontSize: 14, color: 'grey', marginTop: 20, }}>{request.description}</Text>
                       <Text style={{fontSize: 14, marginTop: 5, fontWeight: '600', color: 'black' }}>Deadline: {new Date(request.deadline).toLocaleDateString()} - {new Date(request.deadline).toLocaleTimeString()}</Text>
                    <TouchableOpacity
                      style={{
                        flexDirection: 'row',
                        position: 'absolute',
                        bottom: 0,
                        width: "100%",
                        borderBottomLeftRadius: 10,
                        borderBottomRightRadius: 10,
                        backgroundColor: getColorByPreference(request.preference),
                        padding: 10,
                        marginLeft: -20,
                        marginRight: -20,
                      }}
                      onPress={() => {
                        if (request.preference === "Text" ) {
                          handleOpenPress(request); // Calls handleOpenPress if preference is Text
                        } else if (request.preference === "Voice") {
                          handleOpenPress3(request); // Calls handleOpenPress3 if preference is Voice
                        } else if (request.preference === "Video") {
                          handleOpenPress2(request); // Calls handleOpenPress2 if preference is Video
                        }
                      }}
                    >
                     <Image
    source={{
      uri: request.preference === "Text"
        ? "https://img.icons8.com/?size=100&id=55907&format=png&color=000000"
        : request.preference === "Voice"
        ? "https://img.icons8.com/?size=100&id=16071&format=png&color=000000"
        : "https://img.icons8.com/?size=100&id=11374&format=png&color=000000",
    }}
    style={{
      width: 20,
      height: 20,
position: 'absolute',
right: 10
    }}
  />
  <Text style={{ fontSize: 15, textAlign: 'center' }}>
    {request.preference === "Text"
      ? "Preffered Text - Start Typing"
      : request.preference === "Voice"
      ? "Preffered Voice - Start Recording"
      : "Preffered Video - Join Call"}
  </Text>
                    </TouchableOpacity>
                      </View>
                      </View>
                        ))}
                      
                    
                    
                  </View>

                  <View style={{flexDirection: 'column', width: '24%'}}>
                    {acceptedRequests.map((request) => {
                      const remainingDays = getRemainingDays(request.deadline);
                      const isDeadlineState = remainingDays <= 2;
                      const isOnTimeState = remainingDays > 2;

                      return (
                        <View key={request.id}>
                          {/* Show "Deadline State" if deadline is within 2 days */}
                          {isDeadlineState && (
                            <View style={styles.smallstep1}>
                              <View style={{ flexDirection: 'row' }}>
                                <Text style={{ fontSize: 20, color: 'black', fontWeight: '600' }}>
                                  Deadline State
                                </Text>
                                <Image
                                  source={{
                                    uri: "https://img.icons8.com/?size=100&id=jZGjc3FZtRYv&format=png&color=000000",
                                  }}
                                  style={{
                                    width: 80,
                                    height: 80,
                                    position: 'absolute',
                                    right: 20,
                                    top: -30,
                                  }}
                                />
                                <Text
                                  style={{
                                    backgroundColor: 'red',
                                    color: 'white',
                                    fontSize: 18,
                                    padding: 5,
                                    width: 100,
                                    textAlign: 'center',
                                    position: 'absolute',
                                    right: 10,
                                    marginTop: 37,
                                  }}
                                >
                                  DEADLINE
                                </Text>
                              </View>
                            </View>
                          )}

                          {/* Show "On Time State" if deadline is more than 2 days away */}
                          {isOnTimeState && (
                            <View style={styles.smallstep1}>
                              <View style={{ flexDirection: 'row' }}>
                                <Text style={{ fontSize: 20, color: 'black', fontWeight: '600' }}>
                                  On Time State
                                </Text>
                                <Image
                                  source={{
                                    uri: "https://img.icons8.com/?size=100&id=13026&format=png&color=000000",
                                  }}
                                  style={{
                                    width: 80,
                                    height: 80,
                                    position: 'absolute',
                                    right: 20,
                                    top: -20,
                                  }}
                                />
                              </View>
                            </View>
                          )}
                              </View>
                            );
                          })}
                  

                  </View>
                  <View style={styles.smallstep2}>
                    
                  </View>
              </View>
                
              </View>
            </ScrollView>
          </View>
        </View>
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={handleCloseModal}
      >
        <View style={styles.modalContent}>
          <OpenModal onClose={handleCloseModal} />
        </View>
      </Modal>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible2}
        onRequestClose={handleCloseModal2}
      >
        <View style={styles.modalContent}>
          <OpenModal2 onClose={handleCloseModal2} />
        </View>
      </Modal>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible3}
        onRequestClose={handleCloseModal3}
      >
        <View style={styles.modalContent}>
          <OpenModal3 onClose={handleCloseModal3} />
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  modalContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 10
  },
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
    marginLeft: 200,
    backgroundColor: '#F5F5F5'
  },
  picker: {
    height: 50,
    width: "24%",
    marginHorizontal: 5,
    backgroundColor: 'white',
    marginBottom: 30
  },
  smallstep0: {
    width: "100%", 
    height: 200,
    justifyContent: 'center',
    marginBottom: 10,
    borderWidth: 1,
    borderColor: 'green',
    backgroundColor: "white",
    padding: 20,
  borderRadius: 10,
  shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  smallstepB: {
    width: "100%", 
    height: 200,
    justifyContent: 'center',
    marginBottom: 10,
    marginTop: 10,
    borderWidth: 1,
    borderColor: 'green',
    backgroundColor: "white",
    padding: 20,
  borderRadius: 10,
  shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  smallstepV: {
    width: "100%", 
    height: 200,
    justifyContent: 'center',
    marginBottom: 10,
    marginTop: 10,
    borderWidth: 1,
    borderColor: 'green',
    backgroundColor: "white",
    padding: 20,
  borderRadius: 10,
  shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  smallstep: {
    width: "100%", 
    height: 200,
    marginBottom: 10,
  borderWidth: 1,
    borderColor: 'green',
    backgroundColor: "white",
    padding: 20,
  borderRadius: 10,
  shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
      smallstep1: {
        width: "100%", 
      marginLeft: 5,
        height: 200,
        marginBottom: 10,
      borderWidth: 1,
        borderColor: 'green',
        backgroundColor: "white",
        justifyContent: 'center',
        padding: 20,
      borderRadius: 10,
      shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
      },
      smallstep2: {
        width: "24%", 
      marginLeft: 15,
        height: 200,
        marginBottom: 10,
        backgroundColor: "#F5F5F5",
        padding: 20,
      },
  container: {
    flex: 1,
    backgroundColor: '#e0e0e0',
  },
  progressBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#F5F5F5',
    marginBottom: 10,
  },
  progressStep: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
    backgroundColor: '#206C00',
    marginHorizontal: 7,
    borderRadius: 5,
  },
  activeStep: {
    backgroundColor: '#3F5637',
  },
  stepText: {
    color: '#fff',
  },
  submitButton: {
    backgroundColor: 'lightgrey',
    width: '50%',
    borderRadius: 5,
    alignItems: 'center',
    padding: 10,
    justifyContent: 'center'
  },
  submitButton3: {
    backgroundColor: '#B6D0E2',
    width: 150,
    borderRadius: 5,
    alignItems: 'center',
    padding: 10,
    marginLeft: 15,
    justifyContent: 'center'
  },
  submitButton2: {
    backgroundColor: '#c1e1c1',
    width: 150,
    borderRadius: 5,
    alignItems: 'center',
    padding: 10,
    marginLeft: 15,
    justifyContent: 'center'
  },
  submitButton1: {
    backgroundColor: '#FFDBBB',
    width: '50%',
    borderRadius: 5,
    alignItems: 'center',
    padding: 10,
    marginLeft: 10 ,
    marginRight: 10,
    justifyContent: 'center'
  },
});

export default TicketsPage;
