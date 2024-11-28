import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated, ImageBackground, ScrollView, Picker, Modal, Image } from 'react-native';
import Topbar from '../components/expertstopbar';
import Sidebar from '../components/expertssidebar';
import OpenModal from '../Experts/TicketsResponse';
import OpenModal2 from '../Experts/TicketsResponse2';

const TicketsPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedSeverity, setSelectedSeverity] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [isPressed, setIsPressed] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisible2, setModalVisible2] = useState(false);
   const [currentTicketTitle, setCurrentTicketTitle] = useState(''); 

 

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
  
  return (
    <View style={styles.container}>
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
            </View>
            <View style={styles.progressBar}>
              <View style={styles.progressStep}>
                <Text style={styles.stepText}>New Request</Text>
              </View>
               <View style={styles.progressStep}>
                <Text style={styles.stepText}>Hot Fixes (Due in 4 hours) </Text>
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
                  <View style={{flexDirection: 'column', width: '24%'}}>
                <View style={styles.smallstep0}>
                  <View style={{flexDirection: 'row'}}>

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
                                                padding: 10
                                              }}
                                            />

                                           <Text style={{fontSize: 20, fontWeight: 'bold', marginTop: 5 }}>Bilal Husain</Text>

                                          </View>
                                             <View style={{flexDirection: 'row', marginTop: 10}}>
                                               <View style={{flexDirection: 'column'}}>
                                                  <Text style={{fontSize: 14 }}>Service</Text>
                                           <Text style={{fontSize: 18, fontWeight: '600', }}>SAP FI</Text>
                                               </View>
                                               <View style={{flexDirection: 'column', marginLeft: 60}}>
                                                 <Text style={{fontSize: 14 }}>Deadline</Text>
                                               <Text style={{fontSize: 18, fontWeight: '600', }}>25/11/2024 - 2PM</Text>
                                               </View>

                                             </View>

                                           <Text style={{fontSize: 16, marginTop: 5, marginBottom: 15 }}>Material posting expense not...</Text>


                                              <View style={{flexDirection: 'row',     alignSelf: 'center',}}>
                                                <TouchableOpacity style={styles.submitButton}>
                                                  <Text style={{color: 'black', fontSize: 16, textAlign: 'center'}}>Decline</Text>
                                                </TouchableOpacity>
                                                <TouchableOpacity onPress={handleOpenPress} style={styles.submitButton1}>
                                                   <View style={{flexDirection: 'row'}}>
                                                  <Text style={{color: 'black', fontSize: 16, textAlign: 'center'}}>Accept</Text>
                                                     <Image
                                                          source={{
                                                            uri: "https://img.icons8.com/?size=100&id=QWY6uhBxcr1I&format=png&color=000000",
                                                          }}
                                                          style={{
                                                            width: 20,
                                                            height: 20,
                                                        marginLeft: 10
                                                          }}
                                                        />
                                                      </View>
                                                </TouchableOpacity>
                                              </View>
                
                </View>
                    <View style={styles.smallstepB}>
                      <View style={{flexDirection: 'row'}}>

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
                            padding: 10
                          }}
                        />

                                             <Text style={{fontSize: 20, fontWeight: 'bold', marginTop: 5 }}>Mike Ross</Text>

                                            </View>
                                               <View style={{flexDirection: 'row', marginTop: 10}}>
                                                 <View style={{flexDirection: 'column'}}>
                                                    <Text style={{fontSize: 14 }}>Service</Text>
                                             <Text style={{fontSize: 18, fontWeight: '600', }}>SAP FI</Text>
                                                 </View>
                                                 <View style={{flexDirection: 'column', marginLeft: 60}}>
                                                   <Text style={{fontSize: 14 }}>Deadline</Text>
                                                 <Text style={{fontSize: 18, fontWeight: '600', }}>25/11/2024 - 5PM</Text>
                                                 </View>

                                               </View>

                                             <Text style={{fontSize: 16, marginTop: 5, marginBottom: 15 }}>Material posting expense not...</Text>


                                                <View style={{flexDirection: 'row',     alignSelf: 'center',}}>
                                                  <TouchableOpacity style={styles.submitButton}>
                                                    <Text style={{color: 'black', fontSize: 16, textAlign: 'center'}}>Decline</Text>
                                                  </TouchableOpacity>
                                                  <TouchableOpacity onPress={handleOpenPress} style={styles.submitButton2}>
                                                     <View style={{flexDirection: 'row'}}>
                                                    <Text style={{color: 'black', fontSize: 16, textAlign: 'center'}}>Accept</Text>
                                                       <Image
                                                            source={{
                                                              uri: "https://img.icons8.com/?size=100&id=M0nvDJhT5w5g&format=png&color=000000",
                                                            }}
                                                            style={{
                                                              width: 20,
                                                              height: 20,
                                                          marginLeft: 10
                                                            }}
                                                          />
                                                        </View>
                                                  </TouchableOpacity>
                                                </View>
                    </View>
                    
                    <View style={styles.smallstepV}>
                      <View style={{flexDirection: 'row'}}>

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
                            padding: 10
                          }}
                        />
                        
                       <Text style={{fontSize: 20, fontWeight: 'bold', marginTop: 5 }}>Racheal Zain</Text>
                     
                      </View>
                         <View style={{flexDirection: 'row', marginTop: 10}}>
                           <View style={{flexDirection: 'column'}}>
                              <Text style={{fontSize: 14 }}>Service</Text>
                       <Text style={{fontSize: 18, fontWeight: '600', }}>SAP FI</Text>
                           </View>
                           <View style={{flexDirection: 'column', marginLeft: 60}}>
                             <Text style={{fontSize: 14 }}>Deadline</Text>
                           <Text style={{fontSize: 18, fontWeight: '600', }}>25/11/2024 - 9AM</Text>
                           </View>
                          
                         </View>
                         
                       <Text style={{fontSize: 16, marginTop: 5, marginBottom: 15 }}>Material posting expense not...</Text>
                       
                         
                          <View style={{flexDirection: 'row',     alignSelf: 'center',}}>
                            <TouchableOpacity style={styles.submitButton}>
                              <Text style={{color: 'black', fontSize: 16, textAlign: 'center'}}>Decline</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={handleOpenPress2} style={styles.submitButton3}>
                               <View style={{flexDirection: 'row'}}>
                              <Text style={{color: 'black', fontSize: 16, textAlign: 'center'}}>Accept</Text>
                                 <Image
                                      source={{
                                        uri: "https://img.icons8.com/?size=100&id=11402&format=png&color=000000",
                                      }}
                                      style={{
                                        width: 20,
                                        height: 20,
                                    marginLeft: 10
                                      }}
                                    />
                                  </View>
                            </TouchableOpacity>
                          </View>
                    </View>
                  </View>

                  <View style={{flexDirection: 'column', width: '24%', marginRight: 10, marginLeft: 20}}>
                  <View style={styles.smallstep}>
                    <View style={{flexDirection: 'row'}}>
                       <Text style={{fontSize: 20, color: 'black', fontWeight: 'bold' }}>Adalain Huter</Text>
                     
                      </View>
                     <Text style={{fontSize: 16, color: 'grey', marginTop: 20, }}>Material posting expense not...</Text>
                       <Text style={{fontSize: 18, marginTop: 5, fontWeight: '600', color: 'black' }}>Deadline: 25/11/2024 - 2PM</Text>
                       <View style={{flexDirection: 'row',marginTop: 46, borderBottomLeftRadius: 10, borderBottomRightRadius: 10, backgroundColor: '#FFDBBB', padding: 10, marginLeft: -20, marginRight: -20}}>
                       <Text style={{fontSize: 16}}>Preferred Text - Start Typing</Text>
                         <Image
                             source={{
                               uri: "https://img.icons8.com/?size=100&id=QWY6uhBxcr1I&format=png&color=000000",
                             }}
                             style={{
                               width: 25,
                               height: 25,
                               position: 'absolute',
                               right: 10
                             }}
                           />
                         </View>
                      </View>

                    <View style={styles.smallstep}>
                      <View style={{flexDirection: 'row'}}>
                         <Text style={{fontSize: 20, color: 'black', fontWeight: 'bold' }}>Susan Ambrose</Text>
                        
                        </View>
                       <Text style={{fontSize: 16, color: 'grey', marginTop: 20, }}>Material posting expense not...</Text>
                         <Text style={{fontSize: 18, marginTop: 5, fontWeight: '600', color: 'black' }}>Deadline: 25/11/2024 - 3PM</Text>
                         <View style={{flexDirection: 'row', marginTop: 46, borderBottomLeftRadius: 10, borderBottomRightRadius: 10, backgroundColor: '#c1e1c1', padding: 10, marginLeft: -20, marginRight: -20}}>
                         <Text style={{fontSize: 16, color: 'black'}}>Preferred Voice - Start Recording</Text>
                           <Image
                               source={{
                                 uri: "https://img.icons8.com/?size=100&id=M0nvDJhT5w5g&format=png&color=000000",
                               }}
                               style={{
                                 width: 25,
                                 height: 25,
                                 position: 'absolute',
                                 right: 10
                               }}
                             />
                           </View>
                        </View>
                    
                    <View style={styles.smallstep}>
                      <View style={{flexDirection: 'row'}}>
                         <Text style={{fontSize: 20, color: 'black', fontWeight: 'bold' }}>Adalain Huter</Text>
                       
                        </View>
                       <Text style={{fontSize: 16, color: 'grey', marginTop: 20, }}>Material posting expense not...</Text>
                         <Text style={{fontSize: 18, marginTop: 5, fontWeight: '600', color: 'black' }}>Deadline: 25/11/2024 - 2PM</Text>
                         <View style={{flexDirection: 'row', marginTop: 46, borderBottomLeftRadius: 10, borderBottomRightRadius: 10, backgroundColor: '#B6D0E2', padding: 10, marginLeft: -20, marginRight: -20}}>
                         <Text style={{fontSize: 16}}>Preferred Video - Join Call(4pm)</Text>
                           <Image
                               source={{
                                 uri: "https://img.icons8.com/?size=100&id=11402&format=png&color=FFFFFF",
                               }}
                               style={{
                                 width: 25,
                                 height: 25,
                                 position: 'absolute',
                                 right: 10
                               }}
                             />
                           </View>
                        </View>
                    
                  </View>

                  <View style={{flexDirection: 'column', width: '24%'}}>
                  <View style={styles.smallstep1}>
                    <View style={{flexDirection: 'row'}}>
                       <Text style={{fontSize: 20, color: 'black', fontWeight: '600' }}>Deadline State</Text>
                      <Image
                          source={{
                            uri: "https://img.icons8.com/?size=100&id=jZGjc3FZtRYv&format=png&color=000000",
                          }}
                          style={{
                            width: 80,
                            height: 80,
                            position: 'absolute',
                            right: 20,
                              top: -30
                          }}
                        />
                      <Text style={{backgroundColor: 'red', color: 'white', fontSize: 18, padding: 5, width: 100, textAlign: 'center',                                position: 'absolute',
                                    right: 10, marginTop: 37}}>DEADLINE
                      </Text>
                    
                         </View>
                    
                      </View>

                    <View style={styles.smallstep1}>
                      <View style={{flexDirection: 'row'}}>
                         <Text style={{fontSize: 20, color: 'black', fontWeight: '600' }}>On time State</Text>
                        <Image
                            source={{
                              uri: "https://img.icons8.com/?size=100&id=13026&format=png&color=000000",
                            }}
                            style={{
                              width: 80,
                              height: 80,
                              position: 'absolute',
                              right: 20,
                              top: -20
                            }}
                          />


                           </View>
                      
                        </View>

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
    marginLeft: 200
  },
  picker: {
    height: 50,
    width: 300,
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
    marginBottom: 20,
  borderWidth: 1,
    borderColor: 'red',
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
      marginLeft: 10,
        height: 200,
        marginBottom: 20,
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
        backgroundColor: "#e0e0e0",
        padding: 20,
      },
  container: {
    flex: 1,
    backgroundColor: '#e0e0e0',
  },
  progressBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#e0e0e0',
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
  progressStep2: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
    backgroundColor: 'darkred',
    marginHorizontal: 7,
    borderRadius: 5,
  },
  progressStep3: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
    backgroundColor: 'coral',
    marginHorizontal: 7,
    borderRadius: 5,
  },
  progressStep4: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
    backgroundColor: 'green',
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
    width: 150,
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
    width: 150,
    borderRadius: 5,
    alignItems: 'center',
    padding: 10,
    marginLeft: 15,
    justifyContent: 'center'
  },
});

export default TicketsPage;
