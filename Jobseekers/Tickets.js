import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Picker, Image, Linking,
  ScrollView, Modal, FlatList, Alert
} from 'react-native';
import TopBar from '../components/topbar';
import Sidebar from '../components/sidebar';
import DateTimePickerModal from "../components/DateTimePickerModal";
import { launchImageLibrary } from 'react-native-image-picker';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SupportRequestPage = () => {
  const [currentStep, setCurrentStep] = useState('start'); 
  const [latestRequest, setLatestRequest] = useState(null);
  const [isAcceptedRequestFetched, setIsAcceptedRequestFetched] = useState(false);
  const [isModalVisible2, setIsModalVisible2] = useState(false);
  const [selectedDateTime, setSelectedDateTime] = useState(null);
  const [acceptedRequests, setAcceptedRequests] = useState(null);
   const [assignedContent, setAssignedContent] = useState('waiting');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [textResponse, setTextResponse] = useState('');
  const [voiceResponse, setVoiceResponse] = useState('');
  const [videoSession, setVideoSession] = useState('');
  const [responseType, setResponseType] = useState('');
  const [responseData, setResponseData] = useState({});
  const [jobSeekers, setJobSeekers] = useState([]);
  const [selectedRating, setSelectedRating] = useState(null); 
  const [expertName, setExpertName] = useState('');
  const [date, setDate] = useState('');
  const [attachments, setAttachments] = useState([]);
  const [expertId, setExpertId] = useState(null);
  const ratings = ["excellent", "good", "satisfactory", "poor"];
  const [formData, setFormData] = useState({
    specialization: '',
    title: '',
    description: '',
    preferredMode: '',
    deadline: '',
    videoCallDate: '', 
    name: ''
  });

  // Get user's timezone
  const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  const handleConfirmDateTime = (dateTime) => {
    setSelectedDateTime(dateTime);
    setIsModalVisible2(false);
  };

  const handleCancelModal = () => {
    setIsModalVisible2(false);
  };
  
  const [savedRole, setSavedRole] = useState(""); 

  const apiUrl = process.env.REACT_APP_API_URL;
  
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

  const handleImagePick = () => {
    launchImageLibrary({ mediaType: 'photo' }, (response) => {
      if (response.assets) {
        setAttachments((prev) => [...prev, ...response.assets]);
      }
    });
  };

  const handleSupportRequest = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      if (!token) {
        Alert.alert('Error', 'No authentication token found.');
        return;
      }

      const payload = { specialization: savedRole };
      const response = await axios.post(
        `${apiUrl}/api/jobseeker/support-req`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      console.log('API Response:', response.data);

      const supportData = response.data;
        if (!supportData || !supportData.time) {
          throw new Error('Invalid API response: missing time');
        }

      const { time, user_id } = supportData;

      console.log('Raw Time:', JSON.stringify(time));
      console.log('User ID:', user_id);

      setExpertId(user_id);
      
      const timeEntries = time.split(',').map(entry => entry.trim());
      const daysList = [];
      const timeRanges = [];

      timeEntries.forEach(entry => {
        console.log('Processing Entry:', entry);

        if (!entry.includes(' ')) {
          console.warn('Single day entry without time range:', entry);
          daysList.push(entry);
          return;
        }

        const match = entry.match(/^([A-Za-z,]+)\s*(\d{1,2}:\d{2}\s*[AP]M\s*-\s*\d{1,2}:\d{2}\s*[AP]M)$/);
        if (!match) {
          console.warn('Skipping invalid entry:', entry);
          return;
        }

        const days = match[1].trim();
        const timeRange = match[2].trim();

        console.log('Matched Days:', days);
        console.log('Matched Time Range:', timeRange);

        days.split(',').forEach(day => daysList.push(day.trim()));
        timeRanges.push(timeRange);
      });

      if (!daysList.length || !timeRanges.length) {
        throw new Error('No valid time entries found in API response');
      }

      const formattedDays = daysList.join(' '); // Ensure days are joined by comma
      const selectedUserTimes = timeRanges.join('; '); // Ensure time ranges are joined by semicolon

      console.log('Formatted Days:', formattedDays);
      console.log('Formatted Times:', selectedUserTimes);

      // Save all necessary data to AsyncStorage
      await AsyncStorage.setItem('selectedUserDays', formattedDays);
      await AsyncStorage.setItem('selectedUserTimes', selectedUserTimes);

      Alert.alert('Success', 'Support request submitted and availability stored successfully!');
    } catch (error) {
      console.error('Error:', error);
      Alert.alert('Error', error.message || 'Failed to submit support request or store data.');
    }
  };
 

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Get the token and support_id from AsyncStorage
        const token = await AsyncStorage.getItem('token');
        const supportId = await AsyncStorage.getItem('support_id');

        if (!token || !supportId) {
          console.error('Token or Support ID not found in AsyncStorage.');
          return;
        }

        // Fetch job seekers and accepted requests from the same URL
        const response = await axios.get(`${apiUrl}/api/jobseeker/get-accepted-reqs`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.data && response.data.status === 'success' && Array.isArray(response.data.data)) {
          // Set the job seekers if it's the first fetch
          if (!acceptedRequests) {
            setJobSeekers(response.data.data);  // Assuming you want to set job seekers initially
          }

          // Find the matching request that corresponds to the stored supportId
          const matchingRequest = response.data.data.find(
            (request) => request.id.toString() === supportId
          );

          if (matchingRequest) {
            // Set the accepted requests and other related states
            setAcceptedRequests(response.data.data);
            setAssignedContent('assigned');
            setIsAcceptedRequestFetched(true);
            const name = matchingRequest.expert_name || 'N/A';
            setExpertName(name);
            const date = matchingRequest.deadline || 'N/A';
            setDate(date);

            // Check if prefmode is video and update the current step
            if (matchingRequest.prefmode === 'video') {
              setResponseType('video');
              setCurrentStep('resolution');
            } else {
              setCurrentStep('assigned');
            }

            // Set the form data with matching request details
            setFormData({
              specialization: matchingRequest.specialization || '',
              title: matchingRequest.title || '',
              description: matchingRequest.description || '',
              priority: matchingRequest.priority || '',
              preferredMode: matchingRequest.prefmode || '',
              videoCallDate: matchingRequest.videoCallDate || '',
              deadline: matchingRequest.deadline || '',
            });
          } else {
            console.log('No request found matching the stored support ID.');
          }
        } else {
          console.error('Unexpected response format:', response.data);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []); // Empty dependency array to fetch only once


  useEffect(() => {
    const fetchData = async () => {
      try {
        // Get the token and support_id from AsyncStorage
        const token = await AsyncStorage.getItem('token');
        const supportId = await AsyncStorage.getItem('support_id');

        if (!token || !supportId) {
          console.error('Token or Support ID not found in AsyncStorage.');
          return;
        }

        const response = await axios.get(`${apiUrl}/api/jobseeker/view-responses/${supportId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.data?.status === 'failed' && response.data?.message === 'No responses found for this support request') {
          console.log('No responses found for this support request.');
          setCurrentStep('start');
          return; // Exit early if no responses are found
        }

        const firstResponse = response.data?.data?.[0];

        if (firstResponse) {
          setResponseData(firstResponse);

          // Create a mapping for response types
          const responseTypeMap = {
            text_response: 'text',
            voice_response: 'voice',
            video_session: 'video',
          };

          // Check if any response type exists and set accordingly
          for (const [key, value] of Object.entries(responseTypeMap)) {
            if (firstResponse[key]) {
              setResponseType(value);
              setCurrentStep(value === 'video' ? 'resolution' : 'resolution');
              setTextResponse(firstResponse.text_response);
              break; // Stop once we find a matching response type
            }
          }
        }
      } catch (error) {
        console.error('Error fetching support responses:', error);
        setCurrentStep('start'); // Default to assigned if there's an error
      }
    };

    // Call the fetchData function
    fetchData();
  }, []); // Empty dependency array ensures it runs only once after initial render

  
  // Show or hide the modal
  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  const handleJoinLink = async () => {
    try {
      // Retrieve token from AsyncStorage
      const token = await AsyncStorage.getItem("token");
      const supportId = await AsyncStorage.getItem('support_id');

      if (!token) {
        console.error("Token is missing.");
        alert("Please log in again.");
        return;
      }

      // API Request to get expert accepted requests
      const response = await axios.get(`${apiUrl}/api/jobseeker/get-accepted-reqs`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      // Find the matching request based on supportId
      const meetingRequest = response.data?.data?.find(
        (request) => request.id.toString() === supportId // Use supportId to compare with request.id
      );

      // If matching request is found, open the meeting link
      if (meetingRequest && meetingRequest.meeting_link) {
        Linking.openURL(meetingRequest.meeting_link);
      } else {
        alert("Failed to retrieve the meeting link or request not found.");
      }
    } catch (error) {
      console.error("Error fetching expert accepted requests:", error);
      alert("Failed to join the meeting. Please try again.");
    }
  };

  const handleRatingPress = (index) => {
    setSelectedRating(index); // Update the selected rating
  };

  const sendRating = async () => {
    if (selectedRating === null) {
      Alert.alert("Error", "Please select a rating before submitting.");
      return;
    }

    const token = await AsyncStorage.getItem("token");
    const supportId = await AsyncStorage.getItem("support_id");

    if (!token || !supportId) {
      Alert.alert("Error", "Authentication token or support ID missing.");
      return;
    }

    try {
      const response = await axios.post(
        `${apiUrl}/api/jobseeker/rate-response/${supportId}`,
        { rating: ratings[selectedRating] },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        Alert.alert("Success", `Your rating "${ratings[selectedRating]}" has been submitted.`);
      } else {
        Alert.alert("Error", "Failed to submit rating.");
      }
    } catch (error) {
      console.error("Error submitting rating:", error);
      Alert.alert("Error", "An error occurred while submitting your rating.");
    }
  };
  
  const renderResponse = () => {
    if (responseType === 'text') {
      return (
        <View style={styles.step3}>
          <Text style={styles.header}>Response from {responseData.expert_name || 'Expert'}</Text>
          <Image
            source={{ uri: "https://img.icons8.com/?size=100&id=59757&format=png&color=206C00" }}
            style={{ width: 35, height: 35, marginTop: 20, marginBottom: 20, alignSelf: 'center' }}
          />
          <Image
            source={{ uri: "https://img.icons8.com/?size=100&id=5491&format=png&color=000000" }}
            style={{ width: 90, height: 90, marginBottom: 20, alignSelf: 'center' }}
          />
          <View style={{ flexDirection: 'row', borderWidth: 1, borderRadius: 5, padding: 10, width: 150, alignSelf: 'center' }}>
            <Text style={{ textAlign: 'center', fontSize: 18, fontWeight: '500' }}>Response</Text>
            <Image
              source={{ uri: "https://img.icons8.com/?size=100&id=11204&format=png&color=000000" }}
              style={{ width: 30, height: 30, marginLeft: 5 }}
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
          <TouchableOpacity onPress={toggleModal}>
            <Text style={{textAlign: 'center', fontSize: 20, fontWeight: '500',}}>Click to open</Text>
          </TouchableOpacity>
          <Text style={{fontSize: 16, color: 'white',  marginBottom: 185}}>Your request will be assigned to the first one available</Text>
          <TouchableOpacity onPress={() => setCurrentStep('review')} style={styles.submitButton}>
            <Text style={styles.submitButtonText}>Are you satisfied?</Text>
          </TouchableOpacity>
        </View>
      );
    } else if (responseType === 'voice') {
      return (
        <View style={styles.step3}>
          <Text style={styles.header}>Response from {responseData.expert_name || 'Expert'}</Text>
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

          <Text style={{fontSize: 16, color: 'white',  marginBottom: 165}}>Your request will be assigned to the first one available</Text>
          <TouchableOpacity onPress={() => setCurrentStep('review')}
             style={styles.submitButton}>
            <Text style={styles.submitButtonText}>Are you satisfied?</Text>
          </TouchableOpacity>
        </View>
      );
    } else if (responseType === 'video') {
      return (
        <View style={styles.step3}>
            <Text style={styles.header}>Response from {responseData.expert_name || 'Expert'}</Text>

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
             <Text style={{fontSize: 18, marginBottom: 20, textAlign: 'center', marginLeft: 10, marginRight: 10}}>{expertName || 'Expert'} is ready to join you on the call on {date || 'Date'}</Text>
            <TouchableOpacity onPress={handleJoinLink} style={{ borderWidth: 1, borderRadius: 5, padding: 10, width: 150, alignSelf: 'center'}}>
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

            <Text style={{fontSize: 16, color: 'white',  marginBottom: 195}}>Your request will be assigned to the first one available</Text>
            <TouchableOpacity onPress={() => setCurrentStep('review')}
               style={styles.submitButton}>
              <Text style={styles.submitButtonText}>Are you satisfied?</Text>
            </TouchableOpacity>
        </View>
      );
    }
    return null;
  };

  const formatDate = (date) => new Date(date).toLocaleDateString();
  
  const handleSubmit = async () => {
    try {
      // API URL
      const apiUrl = process.env.REACT_APP_API_URL;

      // Retrieve token and user details from AsyncStorage
      const token = await AsyncStorage.getItem('token');
      const firstName = await AsyncStorage.getItem('first_name');
      const lastName = await AsyncStorage.getItem('last_name');

      if (!token) {
        alert('Authorization token not found. Please log in again.');
        return;
      }

      const name = `${firstName || ''} ${lastName || ''}`.trim();

      // Payload for the API
      const payload = {
        name,
        expert_id: expertId,
        specialization: savedRole,
        title: formData.title,
        description: formData.description,
        prefmode: formData.preferredMode,
        priority: formData.priority,
        deadline: selectedDateTime,
        videoCallDate: formData.videoCallDate || null,
        attachment: '',
      };

      // API Request
      const response = await axios.post(`${apiUrl}/api/jobseeker/merge-request`, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      // Log the full response to check the data
      console.log('Response Data:', response.data);

      // Extract the support ID from the response
      const supportId = response.data?.data?.id;
       const expertName = response.data?.data?.name;

      setExpertName(expertName);
      console.log('Support ID:', supportId);

      if (supportId) {
        // Save the support ID to AsyncStorage
        await AsyncStorage.setItem('support_id', supportId.toString());

        // Update UI and proceed to the assigned step
        setCurrentStep('assigned');
        setAssignedContent('waiting');
      } else {
        alert('Support request created, but no ID was returned.');
      }
    } catch (error) {
      console.error('Error submitting the request:', error);
      alert('Failed to submit the request. Please try again.');
    }
  };

  useEffect(() => {
    if (assignedContent === 'waiting') {
      // Automatically switch content after 5 seconds
      const timer = setTimeout(() => {
        setAssignedContent('assigned');
      }, 5000); // 5 seconds

      // Cleanup timeout to avoid memory leaks
      return () => clearTimeout(timer);
    }
  }, [assignedContent]);
  
      const SupportForm = ({ formData, setFormData }) => {
       

    return (
      <View>
        <Text style={styles.label}>Specialization</Text>
        <TextInput
          style={styles.input}
          value={savedRole}
          editable={false}
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

      <Text style={styles.label}>Attachment (Optional)</Text>
          <TouchableOpacity 
            style={[styles.input, { overflow: 'hidden' }]} 
            onPress={handleImagePick}
          >
            {attachments.length === 0 ? (
              <Text style={{ color: 'black' }}>Add image or document...</Text>
            ) : (
              attachments.map((attachment, index) => (
                <Text key={index} style={{ color: '#555', marginBottom: 5, width: 600, maxHeight: 30, textAlign: 'center' }}>
                  {attachment.name || attachment.uri}
                </Text>
              ))
            )}
        </TouchableOpacity>

        <Text style={styles.label}>Your Preferred Mode of Response</Text>
        <Picker
        selectedValue={formData.preferredMode}
        style={styles.input}
        onValueChange={(value) => {
          setFormData({ ...formData, preferredMode: value, videoCallDate: '' }); // Reset videoCallDate on change
        }}
      >
        <Picker.Item label="Select Mode" value="" />
          <Picker.Item label="Text Response" value="text" />
          <Picker.Item label="Video Call Meeting" value="video" />
      </Picker>

        <Text style={styles.label}>
         Select a date
        </Text>
        <View
          style={styles.input}
        >
          <Text style={{color: 'black' }}>
            {date || 'No deadline set'}
          </Text>
        </View>
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
        <View style={{width: "24%",}}>
              <View style={styles.step0}>
                <Text style={styles.header}>Create Support Request</Text>
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

                            <Text style={styles.label}>Attachment (Optional)</Text>
                            <TouchableOpacity 
                              style={[styles.input, { overflow: 'hidden' }]} 
                              onPress={handleImagePick}
                            >
                                {attachments.length === 0 ? (
                                  <Text style={{ color: 'black' }}>Add image or document...</Text>
                                ) : (
                                  attachments.map((attachment, index) => (
                                    <Text key={index} style={{ color: '#555', marginBottom: 5, width: 600, maxHeight: 30, textAlign: 'center' }}>
                                      {attachment.name || attachment.uri}
                                    </Text>
                                  ))
                                )}
                            </TouchableOpacity>

                            <Text style={styles.label}>Your Preferred Mode of Response</Text>
                            <Picker
                            selectedValue={formData.preferredMode}
                            style={styles.input}
                            onValueChange={(value) => {
                              setFormData({ ...formData, preferredMode: value, videoCallDate: '' }); // Reset videoCallDate on change
                            }}
                          >
                            <Picker.Item label="Select Mode" value="" />
                              <Picker.Item label="Text Response" value="text" />
                              <Picker.Item label="Video Call Meeting" value="video" />
                          </Picker>

                            <Text style={styles.label}>
                             Select a date
                            </Text>
                            <TouchableOpacity
                              style={styles.input}
                              onPress={async () => {
                                // Show the modal first
                                setIsModalVisible2(true);

                                // Make the API call
                                await handleSupportRequest();
                              }}
                            >
                              <Text style={{ color: 'blue', textDecorationLine: 'underline' }}>
                                {selectedDateTime ? selectedDateTime.toLocaleString() : 'Select date and time'}
                              </Text>
                            </TouchableOpacity>
                          </View>
                <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
                  <Text style={styles.submitButtonText}>Submit Request</Text>
                </TouchableOpacity>
               
              </View>    
          <TouchableOpacity style={{ borderWidth: 1, borderRadius: 5, padding: 10, width: 180, marginTop: 20, backgroundColor: 'white', borderColor: '#206C00', marginLeft: '15%'}}  onPress={() => setCurrentStep('all')} 
            >
          <Text style={{textAlign: 'center', fontSize: 14, fontWeight: '500', color: '#206C00'}}>All Requests</Text>
             </TouchableOpacity>
      </View>
            )}

          {/* Assigned to Expert Section */}
          {currentStep === 'assigned' && (
         <View style={{flexDirection: 'row', maxWidth: '50%'}}>
        <View style={styles.step}>
          <Text style={styles.header}>Create Support Request</Text>
          <SupportForm formData={formData} setFormData={setFormData} />
          <TouchableOpacity 
            onPress={() => {
              setCurrentStep('start'); 
              setResponseType('text'); 
            }}
          >
                  <Text style={{fontSize: 16, textAlign: 'center', marginTop: 20, color: 'green',  textDecorationLine: 'underline'}}>Create New Request</Text>
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
                      {expertName || 'Expert'}
                    </Text>
                    <Text style={styles.lightText2}>
                      Has accepted your request
                    </Text>
                    <TouchableOpacity onPress={() => setCurrentStep('resolution')} // Navigate to Resolution
                      >
                           <Text style={{fontSize: 14, marginBottom: 80, marginTop: 20, color: 'white'}}>You will not be able to create a new support request until this has been resolved or has passed deadline.</Text>
                    </TouchableOpacity>
                  </View>
                )}
              </View>
            </View>
          )}

            {/* Resolution Section */}
            {currentStep === 'resolution' && (
              <View style={{ flexDirection: 'row', maxWidth: '75%' }}>
                <View style={styles.step}>
                  <Text style={styles.header}>Create Support Request</Text>
                  <SupportForm formData={formData} setFormData={setFormData} />
                    <TouchableOpacity 
                      onPress={() => {
                        setCurrentStep('start'); 
                        setResponseType('text'); 
                      }}
                    >
                    <Text
                      style={{
                        fontSize: 16,
                        textAlign: 'center',
                        marginTop: 20,
                        color: 'green',
                        textDecorationLine: 'underline',
                      }}
                    >
                      Create New Request
                    </Text>
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
                     {expertName || 'Expert'}
                  </Text>
                  <Text style={styles.lightText2}>Has responded to your request</Text>
                  <Text style={{ fontSize: 16, color: 'white' }}>
                    Your request will be assigned to the first one available
                  </Text>
                </View>
                {/* Render the response dynamically */}
                {renderResponse()}
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
                    <Text style={{textAlign: 'center', fontSize: 20, fontWeight: '500', marginTop: 10}}> {expertName || 'Expert'}</Text>
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

                  <Text style={{fontSize: 16, color: 'white',  marginBottom: 100}}>Your request will be assigned to the first one available</Text>
                  <TouchableOpacity onPress={() => setCurrentStep('review')}
                     style={styles.submitButton}>
                    <Text style={styles.submitButtonText}>Are you satisfied?</Text>
                  </TouchableOpacity>
              </View>
            </View>
              )}

            {/* Resolution Section */}
            {currentStep === 'resolution3' && responseType === 'video' && (
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
                    <Text style={{textAlign: 'center', fontSize: 20, fontWeight: '500', marginTop: 10}}>{expertName || 'Expert'}</Text>
                    <Text style={styles.lightText2}>Has been assigned to your request</Text>
                    <Text style={{fontSize: 16, color: 'white'}}>Your request will be assigned to the first one available</Text>
                  </View>
              <View style={styles.step3}>
                  <Text style={styles.header}>Response from {responseData.expert_name || 'Expert'}</Text>

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
                   <Text style={{fontSize: 18, marginBottom: 20, textAlign: 'center', marginLeft: 10, marginRight: 10}}>Maryam is ready to join you on the call on {responseData.deadline || 'Expert'}</Text>
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

                  <Text style={{fontSize: 16, color: 'white',  marginBottom: 195}}>Your request will be assigned to the first one available</Text>
                  <TouchableOpacity onPress={() => setCurrentStep('review')}
                     style={styles.submitButton}>
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
              <TouchableOpacity 
                onPress={() => {
                  setCurrentStep('start'); 
                  setResponseType('text'); 
                }}
              >
              <Text
                style={{
                  fontSize: 16,
                  textAlign: 'center',
                  marginTop: 20,
                  color: 'green',
                  textDecorationLine: 'underline',
                }}
              >
                Create New Request
              </Text>
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
                <Text style={{textAlign: 'center', fontSize: 20, fontWeight: '500', marginTop: 10}}>{expertName || 'Expert'}</Text>
                <Text style={styles.lightText2}>Has responded to your request</Text>
                <Text style={{fontSize: 16, color: 'white'}}>Your request will be assigned to the first one available</Text>
              </View>
            {renderResponse()}
          <View style={styles.step3}>
              <Text style={styles.header}>Rate {expertName || 'Expert'}'s Response</Text>




            <View style={styles.ratingOptions}>
              {["Excellent", "Good", "Satisfactory", "Poor"].map((label, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.ratingOption,
                    selectedRating === index && styles.selectedRating, // Apply style if selected
                  ]}
                  onPress={() => handleRatingPress(index)} // Handle press event
                >
                  <Text style={styles.emoji}>{["😊", "🙂", "😐", "😞"][index]}</Text>
                  <Text style={styles.ratingText}>{label}</Text>
                </TouchableOpacity>
              ))}
            </View>
           
            

              <TouchableOpacity style={{ borderWidth: 1, borderRadius: 5, padding: 10, width: 200, alignSelf: 'center', marginBottom: 10}}
                onPress={() => {
                    setCurrentStep('start'); 
                    setResponseType('text');
                  }}
                >
                <Text style={{textAlign: 'center', fontSize: 18, fontWeight: '500'}}>Clear request</Text>
                   </TouchableOpacity>
             
            <TouchableOpacity style={{ borderWidth: 1, borderRadius: 5, padding: 10, width: 200, alignSelf: 'center', marginTop: 10, marginBottom: 140}}>
              <Text style={{textAlign: 'center', fontSize: 18, fontWeight: '500'}}>Recreate the request</Text>
                 </TouchableOpacity>
              
            <TouchableOpacity
              style={styles.submitButton}
              onPress={sendRating} // Submit the rating on press
            >
              <Text style={styles.submitButtonText}>Send Rating</Text>
            </TouchableOpacity>
              
          </View>
        </View>
          )}

            {currentStep === 'all' && (
         <View style={styles.tableContainer}>
            <ScrollView>
              <View style={styles.tableHeader}>
                <Text style={[styles.headerCell, { marginLeft: 10 }]}>Specialization</Text>
                <Text style={styles.headerCell}>Title</Text>
                <Text style={styles.headerCell}>Description</Text>
                <Text style={styles.headerCell}>Preferred Mode</Text>
                <Text style={styles.headerCell}>Created At</Text>
                <Text style={styles.headerCell}>Accepted by</Text>
                <Text style={styles.headerCell}>Deadline</Text>
                <Text style={styles.headerCell}> </Text>
              </View>
              <View
                style={{ borderBottomWidth: 1, borderBottomColor: '#ddd', marginTop: 10 }}
              />
              <FlatList
                data={jobSeekers}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                  <View style={styles.tableRow}>
                    <Text style={[styles.cell, { marginLeft: 10 }]}>{item.specialization || '-'}</Text>
                    <Text style={styles.cell}>{item.title || '-'}</Text>
                    <Text style={styles.cell}>{item.description || '-'}</Text>
                    <Text style={styles.cell}>{item.prefmode || '-'}</Text>
                    <Text style={styles.cell}>{formatDate(item.created_at)}</Text>
                     <Text style={styles.cell}>{item.expert_name || '-'}</Text>
                    <Text style={styles.cell}>{item.deadline ? formatDate(item.deadline) : '-'}</Text>
                    <TouchableOpacity onPress={() => setCurrentStep('fetch')} style={styles.cell2}>
                    <Text style={{color: 'green', textDecorationLine: 'underline'}}>Open</Text>
                      </TouchableOpacity>
                  </View>
                )}
              />
            </ScrollView>
        <TouchableOpacity style={{ borderWidth: 1, borderRadius: 5, padding: 10, width: 180, marginTop: 50, backgroundColor: 'white', borderColor: '#206C00'}}               onPress={() => setCurrentStep('start')} // Navigate to Resolution
          >
        <Text style={{textAlign: 'center', fontSize: 14, fontWeight: '500', color: '#206C00'}}>New Support Request</Text>
           </TouchableOpacity>
      </View>
        )}
            
            {/* Review Section */}
              {currentStep === 'fetch' && (
            <View style={{flexDirection: 'column'}}>
              <View style={{flexDirection: 'row', maxWidth: '100%'}}>
              <View style={styles.smallstep0}>
                 <Text style={{fontSize: 16, fontWeight: 'bold' }}>SAP FI</Text>
                 <Text style={{fontSize: 14 }}>Unable to create master data for material posting expense</Text>
                 <Text style={{fontSize: 14, marginTop: 15, fontWeight: '600' }}>21/11/2024</Text>

                <Text style={{fontSize: 14, color: 'white'}}>Your request will be assigned to the first one available</Text>
                
              </View>
                  <View style={styles.smallstep}>
                    <View style={{flexDirection: 'row'}}>
                      

                      <Text style={{fontSize: 18, fontWeight: '600', marginTop: 20}}>Patrick Oche</Text>
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
              </View>
              <View style={styles.smallstep}>
                <View style={{flexDirection: 'row'}}>


                  <Text style={{fontSize: 16, fontWeight: '600', marginTop: 20}}>Replay Anytime</Text>
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
                 <Text style={{fontSize: 14, marginTop: 15, fontWeight: '600' }}>Solved 21/11/2024 2PM</Text>
              </View>
              <View style={styles.smallstep}>     
                   <Text style={styles.emoji}>😐</Text>
                   <Text style={styles.ratingText}>Satisfactory</Text>
              </View>
            </View>
              <TouchableOpacity style={{ borderWidth: 1, borderRadius: 5, padding: 10, width: 180, marginTop: 50, backgroundColor: 'white', borderColor: '#206C00'}}               onPress={() => setCurrentStep('start')} // Navigate to Resolution
                  >
                <Text style={{textAlign: 'center', fontSize: 14, fontWeight: '500', color: '#206C00'}}>New Support Request</Text>
                   </TouchableOpacity>
            </View>
              )}
        </View>
        <DateTimePickerModal
          isVisible={isModalVisible2}
          mode="datetime"
          onConfirm={handleConfirmDateTime}
          onCancel={handleCancelModal}
        />
        <Modal
          visible={isModalVisible}
          animationType="slide"
          transparent={true}
          onRequestClose={toggleModal}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={styles.modalText}>{textResponse || "No response available"}</Text>
              <TouchableOpacity onPress={toggleModal}>
                <Text style={styles.closeButton}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </ScrollView>
    </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    marginLeft: 210
  },
  progressBar: {
    marginTop: 20,
    marginLeft: 20, marginRight: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
      marginBottom: 10,
      shadowColor: '#000',
        shadowOffset: { width: 0, height: 2, }, 
        shadowOpacity: 0.25, 
        shadowRadius: 3.84,
         elevation: 5, 
    },
  progressStep: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
    backgroundColor: 'none',
    marginHorizontal: 5,
  },
  activeStep: {
    backgroundColor: 'rgba(128, 128, 128, 0.1)',
    borderRadius: 30,
  },
  stepText: {
    color: 'black',
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
  submitButton2: {
    backgroundColor: 'grey',
    padding: 10,
    borderRadius: 5,
    width: 200,
    alignItems: 'center',
    marginTop: 20,
    marginLeft: 20
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
  openText: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: '500',
    color: 'blue',
    textDecorationLine: 'underline',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Dark overlay
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '40%',
    alignItems: 'center',
  },
  modalText: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
  },
  closeButton: {
    fontSize: 18,
    color: 'grey',
    textDecorationLine: 'underline',
  },
  selectedRating: {
    backgroundColor: 'lightgreen', 
  },
  emoji: { fontSize: 30 },
  ratingText: { marginLeft: 5, fontSize: 10, fontWeight: "500" },
  tableContainer: {
    flex: 1,
    marginTop: 16,
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: 'white',
    padding: 8,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  tableRow: {
    flexDirection: 'row',
    padding: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    alignItems: 'center',
  },
  highlightRow: {
    backgroundColor: '#e8f5e9', 
  },
  headerCell: {
    fontWeight: 'bold',
    textAlign: 'flex-start',
    flex: 1,
     maxWidth: "12.7%"
  },
  cell: {
    flex: 1,
    textAlign: 'flex-start',
     maxWidth: "12.7%"
  },
  cell2: {
    flex: 1,
    textAlign: 'flex-start',
     maxWidth: "12.7%",
  },
  button: {
    borderRightWidth: 1, 
    borderColor: '#000000',
    paddingHorizontal: 10,
  },
});

export default SupportRequestPage;