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

  const handleSubmit = () => {
    setCurrentStep('assigned');
    // Automatically update content after 3 seconds
    setTimeout(() => {
      setAssignedContent('assigned');
    }, 5000);
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
        <Picker
          selectedValue={formData.specialization}
          style={styles.input}
          onValueChange={(value) => setFormData({ ...formData, specialization: value })}
        >
          <Picker.Item label="Select Specialization" value="" />
          <Picker.Item label="SAP" value="SAP" />
          <Picker.Item label="Microsoft" value="Microsoft" />
          <Picker.Item label="Scrum" value="Scrum" />
          <Picker.Item label="Business Analysis" value="Business Analysis" />
        </Picker>

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

        <Text style={styles.label}>Your Preferred Mode of Response</Text>
        <View style={styles.checkboxContainer}>
          <TouchableOpacity
            style={styles.checkbox}
            onPress={() => setFormData({ ...formData, preferredMode: 'text', videoCallDate: '' })}
          >
            {formData.preferredMode === 'text' && <Text style={styles.checkboxText}>✓</Text>}
          </TouchableOpacity>
          <Text style={styles.checkboxLabel}>Text or Voice Note</Text>
          <TouchableOpacity
            style={styles.checkbox}
            onPress={() => setFormData({ ...formData, preferredMode: 'video' })}
          >
            {formData.preferredMode === 'video' && <Text style={styles.checkboxText}>✓</Text>}
          </TouchableOpacity>
          <Text style={styles.checkboxLabel}>Video Call</Text>
        </View>

        {formData.preferredMode === 'video' && (
          <View>
            <Text style={styles.label}>Select a Date for the Video Call</Text>
            <input
              type="date"
              style={styles.input}
              value={formData.VideoCallDate}
              onChange={(event) => setFormData({ ...formData, deadline: event.target.value })}
            />
          </View>
        )}

        <Text style={styles.label}>Deadline (After the time elapses expert will not be picking your request)</Text>
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
                <Text style={styles.header}>Create Support Request</Text>
                <SupportForm formData={formData} setFormData={setFormData} />
                <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
                  <Text style={styles.submitButtonText}>Submit Request</Text>
                </TouchableOpacity>
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
                        uri: "https://img.icons8.com/?size=100&id=6HcDYyk5GfGb&format=png&color=000000",
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
                      Has been assigned to your request
                    </Text>
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
                    uri: "https://img.icons8.com/?size=100&id=6HcDYyk5GfGb&format=png&color=000000",
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
              <Text style={styles.header}>Expert has responded</Text>
              <Image
                source={{
                  uri: "https://img.icons8.com/?size=100&id=904&format=png&color=000000",
                }}
                style={{
                  width: 35,
                  height: 35,
                  marginTop: 20,
                  marginBottom: 20,
                  alignSelf: 'center'
                }}
              />
              <Text style={{fontSize: 16, color: 'white'}}>Your request will be assigned to the first one available</Text>
            </View>
        </View>
          )}

          {/* Review Section */}
          {currentStep === 'review' && (
            <View style={styles.step}>
              <Text style={styles.header}>Review</Text>
              <Text style={styles.bodyText}>Provide feedback for the resolution process.</Text>
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
    height: 600,
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
    height: 600,
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
    height: 600,
    marginLeft: 20,
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
    height: 600,
    marginLeft: 20,
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
    height: 600,
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
});

export default SupportRequestPage;