import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated, ImageBackground, ScrollView, Picker, Modal, Image } from 'react-native';
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

 

  const openModal = (title) => {
    setCurrentTicketTitle(title); // Set the current ticket title
    setModalVisible(true); // Open the modal
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
                   <Text style={{fontSize: 20, color: 'white', fontWeight: 'bold' }}>SAP FI</Text>
                  <Image
                      source={{
                        uri: "https://img.icons8.com/?size=100&id=55908&format=png&color=FFFFFF",
                      }}
                      style={{
                        width: 30,
                        height: 30,
                        position: 'absolute',
                        right: 10
                      }}
                    />
                  </View>
                  
                   <Text style={{fontSize: 18, marginTop: 15, fontWeight: '600', color: 'white' }}>Bilal Husain</Text>
                   <Text style={{fontSize: 16, color: 'white', marginTop: 5, }}>Material posting expense not...</Text>
                   <View style={{flexDirection: 'row', marginTop: 10}}>
                   <Text style={{fontSize: 17, fontWeight: '600',}}>Deadline: 25/11/2024 - 2PM</Text>
                     <Image
                         source={{
                           uri: "https://img.icons8.com/?size=100&id=k1xXzD3NEvLF&format=png&color=FFFFFF",
                         }}
                         style={{
                           width: 30,
                           height: 30,
                           position: 'absolute',
                           right: 10
                         }}
                       />
                     </View>
                 

                </View>
                    <View style={styles.smallstepB}>
                      <View style={{flexDirection: 'row'}}>
                       <Text style={{fontSize: 20, color: 'white', fontWeight: 'bold' }}>SAP FI</Text>
                      <Image
                          source={{
                            uri: "https://img.icons8.com/?size=100&id=55908&format=png&color=FFFFFF",
                          }}
                          style={{
                            width: 30,
                            height: 30,
                            position: 'absolute',
                            right: 10
                          }}
                        />
                      </View>

                       <Text style={{fontSize: 18, marginTop: 15, fontWeight: '600', color: 'white' }}>Mike Ross</Text>
                       <Text style={{fontSize: 16, color: 'white', marginTop: 5, }}>Material posting expense not...</Text>
                       <View style={{flexDirection: 'row', marginTop: 10}}>
                       <Text style={{fontSize: 17, color: 'white', fontWeight: '600',}}>Deadline: 25/11/2024 - 5PM</Text>
                         <Image
                             source={{
                               uri: "https://img.icons8.com/?size=100&id=M0nvDJhT5w5g&format=png&color=FFFFFF",
                             }}
                             style={{
                               width: 30,
                               height: 30,
                               position: 'absolute',
                               right: 10
                             }}
                           />
                         </View>
                    </View>
                    
                    <View style={styles.smallstepV}>
                      <View style={{flexDirection: 'row'}}>
                       <Text style={{fontSize: 20, color: 'white', fontWeight: 'bold' }}>SAP FI</Text>
                      <Image
                          source={{
                            uri: "https://img.icons8.com/?size=100&id=55908&format=png&color=FFFFFF",
                          }}
                          style={{
                            width: 30,
                            height: 30,
                            position: 'absolute',
                            right: 10
                          }}
                        />
                      </View>

                       <Text style={{fontSize: 18, marginTop: 15, fontWeight: '600', color: 'white' }}>Racheal Zain</Text>
                       <Text style={{fontSize: 16, color: 'white', marginTop: 5, }}>Material posting expense not...</Text>
                       <View style={{flexDirection: 'row', marginTop: 10}}>
                       <Text style={{fontSize: 17, color: 'black', fontWeight: '600',}}>Deadline: 25/11/2024 - 9AM</Text>
                         <Image
                             source={{
                               uri: "https://img.icons8.com/?size=100&id=11402&format=png&color=FFFFFF",
                             }}
                             style={{
                               width: 30,
                               height: 30,
                               position: 'absolute',
                               right: 10
                             }}
                           />
                         </View>
                    </View>
                  </View>

                  <View style={{flexDirection: 'column', width: '24%', marginRight: 10, marginLeft: 20}}>
                  <View style={styles.smallstep}>
                    <View style={{flexDirection: 'row'}}>
                       <Text style={{fontSize: 20, color: 'grey', fontWeight: 'bold' }}>Adalain Huter</Text>
                      <Image
                          source={{
                            uri: "https://img.icons8.com/?size=100&id=55908&format=png&color=FFFFFF",
                          }}
                          style={{
                            width: 30,
                            height: 30,
                            position: 'absolute',
                            right: 10
                          }}
                        />
                      </View>
                     <Text style={{fontSize: 16, color: 'grey', marginTop: 20, }}>Material posting expense not...</Text>
                       <Text style={{fontSize: 18, marginTop: 5, fontWeight: '600', color: 'black' }}>Deadline: 25/11/2024 - 2PM</Text>
                       <View style={{flexDirection: 'row', marginTop: 25, backgroundColor: 'grey', padding: 10, marginLeft: -20, marginRight: -20}}>
                       <Text style={{fontSize: 16}}>Preferred Text - Start Typing</Text>
                         <Image
                             source={{
                               uri: "https://img.icons8.com/?size=100&id=k1xXzD3NEvLF&format=png&color=FFFFFF",
                             }}
                             style={{
                               width: 30,
                               height: 30,
                               position: 'absolute',
                               right: 10
                             }}
                           />
                         </View>
                      </View>

                    <View style={styles.smallstep}>
                      <View style={{flexDirection: 'row'}}>
                         <Text style={{fontSize: 20, color: 'grey', fontWeight: 'bold' }}>Susan Ambrose</Text>
                        <Image
                            source={{
                              uri: "https://img.icons8.com/?size=100&id=55908&format=png&color=FFFFFF",
                            }}
                            style={{
                              width: 30,
                              height: 30,
                              position: 'absolute',
                              right: 10
                            }}
                          />
                        </View>
                       <Text style={{fontSize: 16, color: 'grey', marginTop: 20, }}>Material posting expense not...</Text>
                         <Text style={{fontSize: 18, marginTop: 5, fontWeight: '600', color: 'black' }}>Deadline: 25/11/2024 - 3PM</Text>
                         <View style={{flexDirection: 'row', marginTop: 25, backgroundColor: 'black', padding: 10, marginLeft: -20, marginRight: -20}}>
                         <Text style={{fontSize: 16, color: 'white'}}>Preferred Voice - Start Recording</Text>
                           <Image
                               source={{
                                 uri: "https://img.icons8.com/?size=100&id=M0nvDJhT5w5g&format=png&color=FFFFFF",
                               }}
                               style={{
                                 width: 30,
                                 height: 30,
                                 position: 'absolute',
                                 right: 10
                               }}
                             />
                           </View>
                        </View>
                    
                    <View style={styles.smallstep}>
                      <View style={{flexDirection: 'row'}}>
                         <Text style={{fontSize: 20, color: 'grey', fontWeight: 'bold' }}>Adalain Huter</Text>
                        <Image
                            source={{
                              uri: "https://img.icons8.com/?size=100&id=55908&format=png&color=FFFFFF",
                            }}
                            style={{
                              width: 30,
                              height: 30,
                              position: 'absolute',
                              right: 10
                            }}
                          />
                        </View>
                       <Text style={{fontSize: 16, color: 'grey', marginTop: 20, }}>Material posting expense not...</Text>
                         <Text style={{fontSize: 18, marginTop: 5, fontWeight: '600', color: 'black' }}>Deadline: 25/11/2024 - 2PM</Text>
                         <View style={{flexDirection: 'row', marginTop: 25, backgroundColor: '#B6D0E2', padding: 10, marginLeft: -20, marginRight: -20}}>
                         <Text style={{fontSize: 16}}>Preferred Video - Join Call(4pm)</Text>
                           <Image
                               source={{
                                 uri: "https://img.icons8.com/?size=100&id=11402&format=png&color=FFFFFF",
                               }}
                               style={{
                                 width: 30,
                                 height: 30,
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
                       <Text style={{fontSize: 20, color: 'black', fontWeight: '600', marginTop: 30 }}>Deadline State</Text>
                      <Image
                          source={{
                            uri: "https://img.icons8.com/?size=100&id=jZGjc3FZtRYv&format=png&color=000000",
                          }}
                          style={{
                            width: 100,
                            height: 100,
                            position: 'absolute',
                            right: 10
                          }}
                        />
                      
                    
                         </View>
                    <Text style={{backgroundColor: 'red', color: 'white', fontSize: 18, padding: 5, width: 100, textAlign: 'center',                                position: 'absolute',
                                  right: 30, marginTop: 75}}>DEADLINE
                    </Text>
                      </View>

                    <View style={styles.smallstep1}>
                      <View style={{flexDirection: 'row'}}>
                         <Text style={{fontSize: 20, color: 'black', fontWeight: '600', marginTop: 30 }}>On time State</Text>
                        <Image
                            source={{
                              uri: "https://img.icons8.com/?size=100&id=13026&format=png&color=000000",
                            }}
                            style={{
                              width: 100,
                              height: 100,
                              position: 'absolute',
                              right: 10
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
       <ResponseModal visible={modalVisible} onClose={() => setModalVisible(false)} title={currentTicketTitle} /> {/* Render the modal */}
    </View>
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
    height: 180,
    justifyContent: 'center',
    marginBottom: 10,
    borderWidth: 1,
    borderColor: 'green',
    backgroundColor: "grey",
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
    height: 180,
    justifyContent: 'center',
    marginBottom: 10,
    marginTop: 10,
    borderWidth: 1,
    borderColor: 'green',
    backgroundColor: "black",
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
    height: 180,
    justifyContent: 'center',
    marginBottom: 10,
    marginTop: 10,
    borderWidth: 1,
    borderColor: 'green',
    backgroundColor: "#B6D0E2",
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
    height: 180,
    marginBottom: 20,
  borderWidth: 1,
    borderColor: 'green',
    backgroundColor: "#FFDBBB",
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
        height: 180,
        marginBottom: 20,
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
      smallstep2: {
        width: "24%", 
      marginLeft: 15,
        height: 180,
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
  activeStep: {
    backgroundColor: '#3F5637',
  },
  stepText: {
    color: '#fff',
  },
});

export default TicketsPage;
