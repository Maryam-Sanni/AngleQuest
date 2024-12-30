import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Picker, Image,
  ScrollView,
} from 'react-native';
import TopBar from '../components/topbar';
import Sidebar from '../components/sidebar';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SupportRequestPage = () => {
  const [currentStep, setCurrentStep] = useState('start'); 
   const [assignedContent, setAssignedContent] = useState('waiting');
  const [formData, setFormData] = useState({
    specialization: '',
    title: '',
    description: '',
    preferredMode: '',
    deadline: '',
    videoCallDate: '', // New field for video call date
  });

  const [savedRole, setSavedRole] = useState(""); // State for saved specialization

  // Fetch saved specialization from AsyncStorage
  useEffect(() => {
    const fetchSavedRole = async () => {
      try {
        const role = await AsyncStorage.getItem('selectedRole');
        if (role) {
          setSavedRole(role); // Set saved role for specialization
        }
      } catch (error) {
        console.error('Error fetching saved role:', error);
      }
    };
    fetchSavedRole();
  }, []);

  const handleSubmit = async () => {
    try {
      // API URL
      const apiUrl = process.env.REACT_APP_API_URL;
  
      // Retrieve token from AsyncStorage
      const token = await AsyncStorage.getItem('token');
      const firstName = await AsyncStorage.getItem('first_name');
      const lastName = await AsyncStorage.getItem('last_name');
  
      if (!token) {
        alert('Authorization token not found. Please log in again.');
        return;
      }
  
      // Payload
      const payload = {
        name: firstName + ' ' + lastName,
        specialization: savedRole,
        title: formData.title,
        description: formData.description,
        prefmode: formData.preferredMode,
        priority: formData.priority,
        deadline: formData.deadline,
        videoCallDate: formData.videoCallDate || null,
        attachment: '',
      };
  
      // API Request
      await axios.post(`${apiUrl}/api/jobseeker/support-req`, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
  
      // Update UI and proceed to assigned step
      setCurrentStep('assigned');
      setTimeout(() => {
        setAssignedContent('assigned');
      }, 5000);
    } catch (error) {
      console.error('Error submitting the request:', error);
      alert('Failed to submit the request. Please try again.');
    }
  };

  useEffect(() => {
    if (currentStep === 'assigned' && assignedContent === 'waiting') {
      // You can add additional side effects here if needed
    }
  }, [currentStep, assignedContent]);
  
  const SupportForm = ({ formData, setFormData }) => {
    return (
      <View>
        <Text style={styles.label}>Specialization</Text>
        <TextInput
        style={styles.input}
        value={savedRole} 
        editable={false}
        onChangeText={(text) => setFormData({ ...formData, specialization: text })}
      />
  
        <Text style={styles.label}>Title</Text>
        <TextInput
        style={styles.input}
        placeholder="Enter title"
        value={formData.title}
        onChangeText={(text) => setFormData({ ...formData, title: text })}
      />
  
        <Text style={styles.label}>Description</Text>
        <TextInput
        style={[styles.input, styles.textArea]}
        placeholder="Enter description"
        multiline
        numberOfLines={4}
        value={formData.description}
        onChangeText={(text) => setFormData({ ...formData, description: text })}
      />
  
        <Text style={styles.label}>Priority</Text>
        <Picker
          selectedValue={formData.priority}
          style={styles.input}
          onValueChange={(value) => setFormData({ ...formData, priority: value })}
        >
          <Picker.Item label="Select Priority" value="" />
          <Picker.Item label="Prioritize" value="Prioritize" />
          <Picker.Item label="Can Wait" value="Can Wait" />
        </Picker>
  
        <Text style={styles.label}>Your Preferred Mode of Response</Text>
        <Picker
        selectedValue={formData.preferredMode}
        style={styles.input}
        onValueChange={(value) => {
          setFormData({ ...formData, preferredMode: value, videoCallDate: '' }); // Reset videoCallDate on change
        }}
      >
        <Picker.Item label="Select Mode" value="" />
        <Picker.Item label="Text" value="text" />
        <Picker.Item label="Voice Note" value="voice" />
        <Picker.Item label="Video Call" value="video" />
      </Picker>

      {/* Video Call Date Picker - Only if Video Mode is selected */}
      {formData.preferredMode === 'video' && (
        <View>
          <Text style={styles.label}>Select a Date for the Video Call</Text>
          <input
            type="date"
            style={styles.input}
            value={formData.videoCallDate}
            onChange={(event) => setFormData({ ...formData, videoCallDate: event.target.value })}
          />
        </View>
      )}
  
        <Text style={styles.label}>
          Deadline (After the time elapses, the expert will not pick your request)
        </Text>
        <input
          type="date"
          style={styles.input}
          value={formData.deadline}
          onChange={(event) => setFormData({ ...formData, deadline: event.target.value })}
        />
      </View>
    );
  };

  
  return (
      <View style={{ flex: 1}}>
        <TopBar />
        <View style={{flex:1  }}>
          <Sidebar />
      {/* Progress Bar */}
          <View style={styles.container}>
      <View style={styles.progressBar}>
        <View style={[styles.progressStep, currentStep === 'start' && styles.activeStep]}>
          <Text style={styles.stepText}>Start</Text>
        </View>
        <View style={[styles.progressStep, currentStep === 'assigned' && styles.activeStep]}>
          <Text style={styles.stepText}>Assigned to Expert</Text>
        </View>
        <View style={[styles.progressStep, currentStep === 'resolution' && styles.activeStep]}>
          <Text style={styles.stepText}>Resolution</Text>
        </View>
        <View style={[styles.progressStep, currentStep === 'review' && styles.activeStep]}>
          <Text style={styles.stepText}>Review</Text>
        </View>
      </View>

      {/* Main Content Wrapper */}
      <ScrollView contentContainerStyle={styles.content}>
          <View style={styles.stepsContainer}>
            {/* Start Section */}
            {currentStep === 'start' && (
              <View style={styles.step0}>
                        <ScrollView>
                <Text style={styles.header}>Create Support Request</Text>
                <SupportForm formData={formData} setFormData={setFormData} />
                <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
                  <Text style={styles.submitButtonText}>Submit Request</Text>
                </TouchableOpacity>
                </ScrollView>
              </View>
            )}

          {/* Assigned to Expert Section */}
          {currentStep === 'assigned' && (
         <View style={{flexDirection: 'row', maxWidth: '50%'}}>
        <View style={styles.step}>
          <Text style={styles.header}>Create Support Request</Text>
          <SupportForm formData={formData} setFormData={setFormData} />
          <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
            <Text style={styles.submitButtonText}>Submit Request</Text>
          </TouchableOpacity>
        </View>
        {/* Dynamically Update Assigned Content */}
              <View style={styles.step2}>
                {assignedContent === 'waiting' ? (
                  <View>
                    <Text style={styles.header}>Waiting to assign your request</Text>
                    <Image
                      source={{
                        uri: "https://img.icons8.com/?size=100&id=zbvgwuDKSxIf&format=png&color=000000",
                      }}
                      style={{
                        width: 70,
                        height: 70,
                        marginTop: 20,
                        marginBottom: 20,
                        alignSelf: 'center',
                      }}
                    />
                    <Text style={styles.bodyText}>
                      Finding an expert that meets your request
                    </Text>
                    <Text style={{ textAlign: 'center', fontSize: 40, fontWeight: 'bold', marginTop: 10 }}>
                      ...
                    </Text>
                    <Text style={styles.lightText}>
                      Your request will be assigned to the first one available
                    </Text>
                  </View>
                ) : (
                  <View>
                    <Text style={styles.header}>Found an expert for you!</Text>
                    <Image
                      source={{
                        uri: "https://img.icons8.com/?size=100&id=59757&format=png&color=206C00",
                      }}
                      style={{
                        width: 35,
                        height: 35,
                        marginTop: 20,
                        marginBottom: 20,
                        alignSelf: 'center',
                      }}
                    />
                    <Image
                      source={{
                        uri: "https://img.icons8.com/?size=100&id=5491&format=png&color=000000",
                      }}
                      style={{
                        width: 90,
                        height: 90,
                        marginBottom: 20,
                        alignSelf: 'center',
                      }}
                    />
                    <Text
                      style={{
                        textAlign: 'center',
                        fontSize: 20,
                        fontWeight: '500',
                        marginTop: 10,
                      }}
                    >
                      Maryam Bakhali
                    </Text>
                    <Text style={styles.lightText2}>
                      Has accepted your request
                    </Text>
                    <TouchableOpacity onPress={() => setCurrentStep('resolution')} // Navigate to Resolution
                      >
                           <Text style={{fontSize: 14, marginBottom: 80, marginTop: 20}}>You will not be able to create a new support request until this has been resolved or has passed deadline.</Text>
                    </TouchableOpacity>
                  </View>
                )}
              </View>
            </View>
          )}

          {/* Resolution Section */}
          {currentStep === 'resolution' && (
        <View style={{flexDirection: 'row', maxWidth: '75%'}}>
          <View style={styles.step}>
            <Text style={styles.header}>Create Support Request</Text>
            <SupportForm formData={formData} setFormData={setFormData} />
            <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
              <Text style={styles.submitButtonText}>Submit Request</Text>
            </TouchableOpacity>
          </View>
              <View style={styles.step2}>
                <Text style={styles.header}>Found an expert for you!</Text>
                <Image
                  source={{
                    uri: "https://img.icons8.com/?size=100&id=59757&format=png&color=206C00",
                  }}
                  style={{
                    width: 35,
                    height: 35,
                    marginTop: 20,
                    marginBottom: 20,
                    alignSelf: 'center'
                  }}
                />
                <Image
                  source={{
                    uri: "https://img.icons8.com/?size=100&id=5491&format=png&color=000000",
                  }}
                  style={{
                    width: 90,
                    height: 90,
                    marginBottom: 20,
                    alignSelf: 'center'
                  }}
                />
                <Text style={{textAlign: 'center', fontSize: 20, fontWeight: '500', marginTop: 10}}>Maryam Bakhali</Text>
                <Text style={styles.lightText2}>Has been assigned to your request</Text>
                <Text style={{fontSize: 16, color: 'white'}}>Your request will be assigned to the first one available</Text>
              </View>
            <View style={styles.step3}>
              <Text style={styles.header}>Response from Maryam</Text>
          <Image
              source={{
                uri: "https://img.icons8.com/?size=100&id=59757&format=png&color=206C00",
              }}
              style={{
                width: 35,
                height: 35,
                marginTop: 20,
                marginBottom: 20,
                alignSelf: 'center'
              }}
            />
            <Image
              source={{
                uri: "https://img.icons8.com/?size=100&id=5491&format=png&color=000000",
              }}
              style={{
                width: 90,
                height: 90,
                marginBottom: 20,
                alignSelf: 'center'
              }}
            />
               <View style={{flexDirection: 'row', borderWidth: 1, borderRadius: 5, padding: 10, width: 150, alignSelf: 'center'}}>
            <Text style={{textAlign: 'center', fontSize: 18, fontWeight: '500'}}>Response</Text>
                 <Image
                   source={{
                     uri: "https://img.icons8.com/?size=100&id=11204&format=png&color=000000",
                   }}
                   style={{
                     width: 30,
                     height: 30,
                     marginLeft: 5,
                   }}
                 />
               </View>
              <Image
                 source={{
                   uri: "https://img.icons8.com/?size=100&id=23540&format=png&color=000000",
                 }}
                 style={{
                   width: 35,
                   height: 35,
                   alignSelf: 'center',
                   marginTop: 5
                 }}
               />
                <Text style={{textAlign: 'center', fontSize: 20, fontWeight: '500',}}>Click to open</Text>

              <TouchableOpacity onPress={() => setCurrentStep('resolution2')} // Navigate to Resolution
                >
                     <Text style={{fontSize: 16, color: 'white',  marginBottom: 100}}>Your request will be assigned to the first one available</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.submitButton}>
                <Text style={styles.submitButtonText}>Are you satisfied?</Text>
              </TouchableOpacity>
          </View>
        </View>
          )}

            {/* Resolution Section */}
              {currentStep === 'resolution2' && (
            <View style={{flexDirection: 'row', maxWidth: '75%'}}>
              <View style={styles.step}>
                <Text style={styles.header}>Create Support Request</Text>
                <SupportForm formData={formData} setFormData={setFormData} />
                <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
                  <Text style={styles.submitButtonText}>Submit Request</Text>
                </TouchableOpacity>
              </View>
                  <View style={styles.step2}>
                    <Text style={styles.header}>Found an expert for you!</Text>
                    <Image
                      source={{
                        uri: "https://img.icons8.com/?size=100&id=59757&format=png&color=206C00",
                      }}
                      style={{
                        width: 35,
                        height: 35,
                        marginTop: 20,
                        marginBottom: 20,
                        alignSelf: 'center'
                      }}
                    />
                    <Image
                      source={{
                        uri: "https://img.icons8.com/?size=100&id=5491&format=png&color=000000",
                      }}
                      style={{
                        width: 90,
                        height: 90,
                        marginBottom: 20,
                        alignSelf: 'center'
                      }}
                    />
                    <Text style={{textAlign: 'center', fontSize: 20, fontWeight: '500', marginTop: 10}}>Maryam Bakhali</Text>
                    <Text style={styles.lightText2}>Has been assigned to your request</Text>
                    <Text style={{fontSize: 16, color: 'white'}}>Your request will be assigned to the first one available</Text>
                  </View>
                <View style={styles.step3}>
                  <Text style={styles.header}>Response from Maryam</Text>
              <Image
                  source={{
                    uri: "https://img.icons8.com/?size=100&id=59757&format=png&color=206C00",
                  }}
                  style={{
                    width: 35,
                    height: 35,
                    marginTop: 20,
                    marginBottom: 20,
                    alignSelf: 'center'
                  }}
                />
                <Image
                  source={{
                    uri: "https://img.icons8.com/?size=100&id=5491&format=png&color=000000",
                  }}
                  style={{
                    width: 90,
                    height: 90,
                    marginBottom: 20,
                    alignSelf: 'center'
                  }}
                />
                     <Image
                       source={{
                         uri: "https://img.icons8.com/?size=100&id=9387&format=png&color=000000",
                       }}
                       style={{
                         width: 70,
                         height: 70,
                         alignSelf: 'center'
                       }}
                     />
                  <Image
                     source={{
                       uri: "https://img.icons8.com/?size=100&id=23540&format=png&color=000000",
                     }}
                     style={{
                       width: 35,
                       height: 35,
                       alignSelf: 'center',
                       marginTop: 5
                     }}
                   />
                    <Text style={{textAlign: 'center', fontSize: 20, fontWeight: '500',}}>Click to listen</Text>

                  <TouchableOpacity onPress={() => setCurrentStep('resolution3')} // Navigate to Resolution
                    >
                         <Text style={{fontSize: 16, color: 'white',  marginBottom: 90}}>Your request will be assigned to the first one available</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.submitButton}>
                    <Text style={styles.submitButtonText}>Are you satisfied?</Text>
                  </TouchableOpacity>
              </View>
            </View>
              )}

            {/* Resolution Section */}
              {currentStep === 'resolution3' && (
            <View style={{flexDirection: 'row', maxWidth: '75%'}}>
              <View style={styles.step}>
                <Text style={styles.header}>Create Support Request</Text>
                <SupportForm formData={formData} setFormData={setFormData} />
                <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
                  <Text style={styles.submitButtonText}>Submit Request</Text>
                </TouchableOpacity>
              </View>
                  <View style={styles.step2}>
                    <Text style={styles.header}>Found an expert for you!</Text>
                    <Image
                      source={{
                        uri: "https://img.icons8.com/?size=100&id=59757&format=png&color=206C00",
                      }}
                      style={{
                        width: 35,
                        height: 35,
                        marginTop: 20,
                        marginBottom: 20,
                        alignSelf: 'center'
                      }}
                    />
                    <Image
                      source={{
                        uri: "https://img.icons8.com/?size=100&id=5491&format=png&color=000000",
                      }}
                      style={{
                        width: 90,
                        height: 90,
                        marginBottom: 20,
                        alignSelf: 'center'
                      }}
                    />
                    <Text style={{textAlign: 'center', fontSize: 20, fontWeight: '500', marginTop: 10}}>Maryam Bakhali</Text>
                    <Text style={styles.lightText2}>Has been assigned to your request</Text>
                    <Text style={{fontSize: 16, color: 'white'}}>Your request will be assigned to the first one available</Text>
                  </View>
                <View style={styles.step3}>
                  <Text style={styles.header}>Response from Maryam</Text>
              
                <Image
                  source={{
                    uri: "https://img.icons8.com/?size=100&id=2L3pGQnCYHCG&format=png&color=000000",
                  }}
                  style={{
                    width: 90,
                    height: 90,
                    marginBottom: 20,
                    marginTop: 10,
                    alignSelf: 'center'
                  }}
                />
                   <Text style={{fontSize: 18, marginBottom: 20, textAlign: 'center', marginLeft: 10, marginRight: 10}}>Maryam is ready to join you on the call on 22-11-2024 2PM WAT</Text>
                  <TouchableOpacity style={{ borderWidth: 1, borderRadius: 5, padding: 10, width: 150, alignSelf: 'center'}}>
                    <Text style={{textAlign: 'center', fontSize: 18, fontWeight: '500'}}>Join Meeting</Text>
                       </TouchableOpacity>
                  <Image
                     source={{
                       uri: "https://img.icons8.com/?size=100&id=23540&format=png&color=000000",
                     }}
                     style={{
                       width: 35,
                       height: 35,
                       alignSelf: 'center',
                       marginTop: 5
                     }}
                   />
                    <Text style={{textAlign: 'center', fontSize: 20, fontWeight: '500',}}>Click to join</Text>

                  <TouchableOpacity onPress={() => setCurrentStep('review')} // Navigate to Resolution
                    >
                         <Text style={{fontSize: 16, color: 'white',  marginBottom: 100}}>Your request will be assigned to the first one available</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.submitButton}>
                    <Text style={styles.submitButtonText}>Are you satisfied?</Text>
                  </TouchableOpacity>
              </View>
            </View>
              )}
            
          {/* Review Section */}
          {currentStep === 'review' && (
        <View style={{flexDirection: 'row', maxWidth: '100%'}}>
          <View style={styles.step}>
            <Text style={styles.header}>Create Support Request</Text>
            <SupportForm formData={formData} setFormData={setFormData} />
            <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
              <Text style={styles.submitButtonText}>Submit Request</Text>
            </TouchableOpacity>
          </View>
              <View style={styles.step2}>
                <Text style={styles.header}>Found an expert for you!</Text>
                <Image
                  source={{
                    uri: "https://img.icons8.com/?size=100&id=59757&format=png&color=206C00",
                  }}
                  style={{
                    width: 35,
                    height: 35,
                    marginTop: 20,
                    marginBottom: 20,
                    alignSelf: 'center'
                  }}
                />
                <Image
                  source={{
                    uri: "https://img.icons8.com/?size=100&id=5491&format=png&color=000000",
                  }}
                  style={{
                    width: 90,
                    height: 90,
                    marginBottom: 20,
                    alignSelf: 'center'
                  }}
                />
                <Text style={{textAlign: 'center', fontSize: 20, fontWeight: '500', marginTop: 10}}>Maryam Bakhali</Text>
                <Text style={styles.lightText2}>Has been assigned to your request</Text>
                <Text style={{fontSize: 16, color: 'white'}}>Your request will be assigned to the first one available</Text>
              </View>
            <View style={styles.step3}>
              <Text style={styles.header}>Response from Maryam</Text>

            <Image
              source={{
                uri: "https://img.icons8.com/?size=100&id=2L3pGQnCYHCG&format=png&color=000000",
              }}
              style={{
                width: 90,
                height: 90,
                marginBottom: 20,
                marginTop: 10,
                alignSelf: 'center'
              }}
            />
               <Text style={{fontSize: 18, marginBottom: 20, textAlign: 'center', marginLeft: 10, marginRight: 10}}>Maryam is ready to join you on the call on 22-11-2024 2PM WAT</Text>
              <TouchableOpacity style={{ borderWidth: 1, borderRadius: 5, padding: 10, width: 150, alignSelf: 'center'}}>
                <Text style={{textAlign: 'center', fontSize: 18, fontWeight: '500'}}>Join Meeting</Text>
                   </TouchableOpacity>
              <Image
                 source={{
                   uri: "https://img.icons8.com/?size=100&id=23540&format=png&color=000000",
                 }}
                 style={{
                   width: 35,
                   height: 35,
                   alignSelf: 'center',
                   marginTop: 5
                 }}
               />
                <Text style={{textAlign: 'center', fontSize: 20, fontWeight: '500',}}>Click to join</Text>

                     <Text style={{fontSize: 16, color: 'white',  marginBottom: 100}}>Your request will be assigned to the first one available</Text>
          
              <TouchableOpacity onPress={() => setCurrentStep('fetch')} style={styles.submitButton}>
                <Text style={styles.submitButtonText}>Are you satisfied?</Text>
              </TouchableOpacity>
          </View>
          <View style={styles.step3}>
              <Text style={styles.header}>Response from Maryam</Text>




            <View style={styles.ratingOptions}>
              {["Excellent", "Good", "Satisfactory", "Poor"].map((label, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.ratingOption}
                >
                  <Text style={styles.emoji}>{["😊", "🙂", "😐", "😞"][index]}</Text>
                  <Text style={styles.ratingText}>{label}</Text>
                </TouchableOpacity>
              ))}
            </View>
            

              <TouchableOpacity style={{ borderWidth: 1, borderRadius: 5, padding: 10, width: 200, alignSelf: 'center', marginBottom: 10}}>
                <Text style={{textAlign: 'center', fontSize: 18, fontWeight: '500'}}>Clear request</Text>
                   </TouchableOpacity>
             
            <TouchableOpacity style={{ borderWidth: 1, borderRadius: 5, padding: 10, width: 200, alignSelf: 'center', marginTop: 10}}>
              <Text style={{textAlign: 'center', fontSize: 18, fontWeight: '500'}}>Recreate the request</Text>
                 </TouchableOpacity>
              
                     <Text style={{fontSize: 16, color: 'white'}}>Your request will be assigned to the first one available</Text>
              
          </View>
        </View>
          )}

            {/* Review Section */}
              {currentStep === 'fetch' && (
            <View style={{flexDirection: 'column', maxWidth: '100%'}}>
              <View style={{flexDirection: 'row', maxWidth: '100%'}}>
              <View style={styles.smallstep0}>
                 <Text style={{fontSize: 20, fontWeight: 'bold' }}>SAP FI</Text>
                 <Text style={{fontSize: 16 }}>Unable to create master data for material posting expense</Text>
                 <Text style={{fontSize: 18, marginTop: 15, fontWeight: '600' }}>21/11/2024</Text>

                <Text style={{fontSize: 16, color: 'white'}}>Your request will be assigned to the first one available</Text>
                
              </View>
                  <View style={styles.smallstep}>
                    <View style={{flexDirection: 'row'}}>
                      

                      <Text style={{fontSize: 24, fontWeight: '600', marginTop: 20}}>Maryam Bakhali</Text>
                      <Image
                        source={{
                          uri: "https://img.icons8.com/?size=100&id=5491&format=png&color=000000",
                        }}
                        style={{
                          width: 70,
                          height: 70,
                          marginLeft: 20,
                        }}
                      />
                    </View>
                    
                    <Text style={{fontSize: 16, color: 'white'}}>Your request will be assigned to the first one availableYour request will be assigned to the first one available</Text>
                    

                  
              </View>
              <View style={styles.smallstep}>
                <View style={{flexDirection: 'row'}}>


                  <Text style={{fontSize: 24, fontWeight: '600', marginTop: 20}}>Replay Anytime</Text>
                  <Image
                    source={{
                      uri: "https://img.icons8.com/?size=100&id=103566&format=png&color=000000",
                    }}
                    style={{
                      width: 70,
                      height: 70,
                      marginLeft: 20,
                    }}
                  />
                </View>
                 <Text style={{fontSize: 18, marginTop: 15, fontWeight: '600' }}>Solved 21/11/2024 2PM</Text>



               

              </View>
              <View style={styles.smallstep}>
                  
                 <View style={styles.ratingOption}
                >

                   <Text style={styles.emoji}>😐</Text>
                   <Text style={styles.ratingText}>Satisfactory</Text>
                   
                 </View>


              </View>
            </View>
              <TouchableOpacity style={{ borderWidth: 1, borderRadius: 5, padding: 10, width: 250, marginTop: 50, backgroundColor: 'white', borderColor: '#206C00'}}               onPress={() => setCurrentStep('start')} // Navigate to Resolution
                  >
                <Text style={{textAlign: 'center', fontSize: 18, fontWeight: '500', color: '#206C00'}}>+ Create Support Request</Text>
                   </TouchableOpacity>
            </View>
              )}
        </View>
      </ScrollView>
    </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4f4',
    marginLeft: 210
  },
  progressBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    backgroundColor: '#e0e0e0',
  },
  progressStep: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
    backgroundColor: '#c0c0c0',
    marginHorizontal: 5,
    borderRadius: 5,
  },
  activeStep: {
    backgroundColor: '#3F5637',
  },
  stepText: {
    color: '#fff',
  },
  content: {
    padding: 20,
  },
  stepsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    flexWrap: 'wrap',
  },
  step0: {
    width: "24%", 
    height: 700,
    marginRight: 10,
    marginBottom: 10,
    backgroundColor: "#FFF",
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
  step: {
    flex: 1,
    width: "24%", 
    height: 700,
    overflow: 'hidden',
    marginRight: 10,
    marginBottom: 10,
    backgroundColor: "#FFF",
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
  step2: {
     flex: 1,
    width: "24%", 
    height: 700,
    marginLeft: 10,
    marginBottom: 10,
    backgroundColor: "#FFF",
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
  step3: {
     flex: 1,
    width: "24%", 
    height: 700,
    marginLeft: 10,
    marginBottom: 10,
    backgroundColor: "#FFF",
    marginLeft: 20,
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
  step4: {
     flex: 1,
    width: "24%", 
    height: 700,
    marginBottom: 10,
    backgroundColor: "none",
    marginLeft: 20,
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
  smallstep0: {
    flex: 1,
    width: "24%", 
    height: 200,
    justifyContent: 'center',
    marginRight: 10,
    marginBottom: 10,
    backgroundColor: "#FFF",
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
     flex: 1,
    width: "24%", 
    justifyContent: 'center',
     alignItems: 'center',
    height: 200,
    marginBottom: 10,
    backgroundColor: "white",
    marginLeft: 20,
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
  header: {
    fontSize: 18,
    textAlign: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#206C00', 
    paddingBottom: 5,
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
    backgroundColor: '#fff',
  },
  textArea: {
    height: 100,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 5,
  },
  checkboxText: {
    fontSize: 16,
  },
  checkboxLabel: {
    marginRight: 15,
  },
  submitButton: {
    backgroundColor: '#206C00',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20
  },
  submitButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  bodyText: {
    fontSize: 16,
    textAlign: 'center',
    fontWeight: '600'    
  },
  lightText: {
    fontSize: 16,
    textAlign: 'center',  
    marginTop: 20
  },
  lightText2: {
    fontSize: 16,
    textAlign: 'center',  
    marginTop: 5
  },
  ratingOptions: { flexDirection: "row", flexWrap: "wrap", justifyContent: "center", marginTop: 70, marginBottom: 40 },
  ratingOption: {
    alignItems: "center",
    justifyContent: "center",
    borderColor: 'lightgrey',
    borderWidth: 0.5,
    borderRadius: 10,
    flexDirection: "row",
    padding: 10,
    width: '40%',
    margin: 10,
    shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    },
  emoji: { fontSize: 30 },
  ratingText: { marginLeft: 5, fontSize: 15, fontWeight: "500" },
});

export default SupportRequestPage;