import React, { useState, useEffect, useRef } from "react";
 import {Animated, View, Text, Image, TextInput, Platform , ScrollView, Picker, Alert, Modal, TouchableOpacity, StyleSheet } from 'react-native';
import { LinearGradient } from "expo-linear-gradient";
import { useNavigate } from "react-router-dom";
import Top from "../components/HomeTop";
import Top2 from "../components/TopExtra";
import Footer from "../components/Footer";
import axios from 'axios';
import OpenModal from './ModalUrgent';
   
 // Main Component
 const DiscussSection = () => {
   const boxData = [
     {
       text: 'SAP',
       imageUrl: 'https://img.icons8.com/?size=100&id=38192&format=png&color=000000',
     },
     {
       text: 'Microsoft Dynamics 365',
       imageUrl: 'https://cloudcti.nl/sites/default/files/styles/logo/public/externals/8265a353c2552505948a221154fb73ce.png',
     },
     {
       text: 'Microsoft Business Central',
       imageUrl: 'https://play-lh.googleusercontent.com/sCuVNpMVCpDReWX5KK7CSqccS6_S2B4DGgt1hW2xNP724kDdKH_KKGN0PxkFwgKBYa0',
     },
     {
       text: 'Microsoft Power Platform',
       imageUrl: 'https://img.icons8.com/?size=100&id=jXuZmZPUKCPS&format=png&color=000000',
     },
     {
       text: 'Scrum',
       imageUrl: 'https://wac-cdn.atlassian.com/dam/jcr:7af87fb7-1d9d-40de-910b-852ad8fe1825/scrum@2x.png',
     },
     {
       text: 'Microsoft F&O',
       imageUrl: 'https://cdn6.aptoide.com/imgs/d/5/6/d56f311244d74f989eb7b7494442d6fd_icon.png',
     },
     {
       text: 'Microsoft Azure',
       imageUrl: 'https://img.icons8.com/?size=100&id=VLKafOkk3sBX&format=png&color=000000',
     },
   ];

   // Data for Steps
   const stepsData = [
     {
       icon: 'https://img.icons8.com/?size=100&id=58864&format=png&color=135837',
       title: 'Skill Gap Analysis',
       description:
         'We start by analyzing your skillset and interest with you to arrive at a technology domain that suits your experience and ambition.',
     },
     {
       icon: 'https://img.icons8.com/?size=100&id=375&format=png&color=135837',
       title: 'Growth Plan',
       description:
         'An expert in the chosen technology domain will draw-up a comprehensive learning plan tailored to your unique story and timeline.',
     },
     {
       icon: 'https://img.icons8.com/?size=100&id=20114&format=png&color=135837',
       title: 'Hub',
       description:
         'We’ll assign an expert with the right temperament and availability to train you with the most relevant skills needed to succeed quickly.',
     },
     {
       icon: 'https://img.icons8.com/?size=100&id=39594&format=png&color=135837',
       title: 'Interview Prep',
       description:
         'During interviews, our expert will conduct a test-interview on you to equip and share ideas to help you shine-through at your interview.',
     },
     {
       icon: 'https://img.icons8.com/?size=100&id=6895&format=png&color=135837',
       title: 'Knowledge Backup',
       description:
         'When you secure a job, we’ll serve as your knowledge backup. Our expert is 24/7 ready to quickly help you on any task.',
     },
   ];
   

    const options = [
      'SAP FI',
      'SAP MM',
      'SAP SD',
      'SAP PP',
      'Microsoft Dynamics Sales',
      'Microsoft Dynamics Customer Service',
      'Microsoft Power Platform Developer',
      'Microsoft Dynamics F&O',
      'Microsoft Dynamics Field Service',
      'Microsoft Dynamics CRM Developer',
      'Microsoft Business Central',
      'Scrum',
      'Business Analysis',
    ];

   const [ModalVisible, setModalVisible] = useState(false);
   const [email, setEmail] = useState('');
   const [date, setDate] = useState('');
      const [dropdownVisible, setDropdownVisible] = useState(false);
      const [selectedOptions, setSelectedOptions] = useState([]);

   const handleChange = (e) => {
     setDate(e.target.value); // This will handle the change in date input
   };

   const toggleOption = (option) => {
     if (selectedOptions.includes(option)) {
       setSelectedOptions(selectedOptions.filter((item) => item !== option)); // Remove the option
     } else {
       setSelectedOptions([...selectedOptions, option]); // Add the option
     }
   };

   const handleOpenPress = () => {
     setModalVisible(true);
   };

   const handleCloseModal = () => {
     setModalVisible(false);
   };
   
   const apiUrl = process.env.REACT_APP_API_URL;
   
   // Function to handle form submission
   const handleSubmit = async () => {
     const data = {
       email: email,
       date: date,
       category: selectedOptions.join(', ') || '',  // Categories selected as a comma-separated string
       urgent: 'No'  // Hardcoded for now, adjust as per requirement
     };

     try {
       const response = await axios.post(`${apiUrl}/api/inquire-tech`, data, {
         headers: {
           'Content-Type': 'application/json',  // Ensure the correct Content-Type is set
         }
       });

       // Check if the response status is OK (status code 200)
       if (response.status === 200) {
         Alert.alert('Success', 'Your request has been submitted!');
       } else {
         Alert.alert('Error', response.data.message || 'Something went wrong');
       }
     } catch (error) {
       console.error(error);  // Log the error for debugging
       Alert.alert('Error', 'Network error: Please try again later');
     }
   };

   const handlePress = () => {
     setIsHovered(false); // Reset hover state when pressed
     handleSubmit(); // Call the submit handler
   };
   
   const [topPosition, setTopPosition] = useState(20); 

   const handleScroll = (event) => {
     const scrollY = event.nativeEvent.contentOffset.y;
     console.log("Scroll Position Y:", scrollY); 

     if (scrollY > 0) { 
       setTopPosition(-30); 
     } else {
       setTopPosition(20); 
     }
   };

const [scales] = useState(boxData.map(() => new Animated.Value(1))); // Create scale animations for each box

const handleMouseEnter = (index) => {
  Animated.timing(scales[index], {
    toValue: 1.2, 
    duration: 200,
    useNativeDriver: true,
  }).start();
};

const handleMouseLeave = (index) => {
  Animated.timing(scales[index], {
    toValue: 1, // Reset size to normal
    duration: 200,
    useNativeDriver: true,
  }).start();
};

   const [isSessionCreated, setIsSessionCreated] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const [isHovered2, setIsHovered2] = useState(false);
   const navigate = useNavigate();

   const handleIndividualSignUp = () => {
     navigate("/sign-up", { state: { signUpOption: 1 } });
   };
   
   return (
     <View style={{ flex: 1, }}>
       <Top2 tint={"dark"} />
           <View style={{ position: 'absolute', top: topPosition, left: 0, right: 0, zIndex: 100 }}>
             <Top value={3} intensity={100} />
           </View>
           <ScrollView
             contentContainerStyle={{ flexGrow: 1 }}
             onScroll={handleScroll}  // Attach scroll listener
             scrollEventThrottle={16} // Frequency of scroll events
           >
              
       <View style={styles.container}>
         <View style={styles.greentop}>
           <View style={{marginLeft: -300}}>
           <Text style={{color: 'white', fontWeight: '600', fontSize: 20}}>Personalized guidance, tailored training, and on the job support – now also available</Text>
           <Text style={{color: 'white', marginTop: 10, fontSize: 17}}>Also want an expert to prepare a step-by-step plan to accelerate your process? Read more about expert growth plan.</Text>
         </View>
         </View>
         {/* Left Card */}
         <View style={{flexDirection: 'row'}}>
           <View style={styles.card}>
             <View style={styles.leftSection}>
               {/* Always Visible Header */}
               <Text style={styles.header}>Discuss your situation with our expert</Text>

               {isSessionCreated ? (
                 // Confirmation Message
                 <View>
                   <Text style={styles.confirmationText}>Congratulations! Session Created</Text>
                   <Text style={styles.noteText}>
                     Note that this session costs $50.
                   </Text>
                   <Text style={styles.paynoteText}>
                    Payment account details will be shared with you via email.
                    </Text>
                 </View>
               ) : (
                 // Booking Form
                 <View>
                   <Text style={styles.subHeader}>Unsure about the technology skill to delve into?</Text>
                   <Text style={styles.listgreen}>
                     ✔ <Text style={styles.listItem}>Discuss with our expert for personalized guidance</Text>
                   </Text>
                   <Text style={styles.listgreen}>
                     ✔ <Text style={styles.listItem}>Quickly gain clarity on the path to follow</Text>
                   </Text>
                   <Text style={styles.listgreen}>
                     ✔ <Text style={styles.listItem}>Feel confident and certain about your next steps</Text>
                   </Text>

                   <View style={styles.form}>
                     {/* Email Input */}
                     <View style={styles.inputGroup}>
                       <Text style={styles.label}>Email</Text>
                       <TextInput
                         placeholder="anglequest@gmail.com"
                         placeholderTextColor="gray"
                         style={styles.input}
                         value={email}
                         onChangeText={setEmail}
                       />
                     </View>
                     
                     <View style={styles.inputGroup}>
                        <Text style={styles.label}>Date</Text>
                       <input 
                         type="date"
                         style={styles.input2}
                         value={date}
                         onChange={handleChange}
                       />
                      </View>

                   <View style={styles.inputGroup}>
                     <Text style={styles.label}>Preference</Text>
                     <View style={styles.selectContainer}>
                       {/* Dropdown Header */}
                       <TouchableOpacity
                         style={styles.dropdownHeader}
                         onPress={() => setDropdownVisible(!dropdownVisible)}
                       >
                         <Text style={styles.dropdownText}>
                           {selectedOptions.length > 0
                             ? selectedOptions.join(', ')
                             : 'Select Options'}
                         </Text>
                       </TouchableOpacity>

                       {/* Dropdown Options */}
                       {dropdownVisible && (
                         <View style={styles.dropdownOverlay}>
                           <ScrollView style={styles.scrollContainer}>
                             {options.map((option, index) => (
                               <TouchableOpacity
                                 key={index}
                                 style={[
                                   styles.option,
                                   selectedOptions.includes(option) && styles.optionSelected,
                                 ]}
                                 onPress={() => toggleOption(option)}
                               >
                                 {/* Checkbox */}
                                 <View style={styles.checkboxContainer}>
                                   <View
                                     style={[
                                       styles.checkbox,
                                       selectedOptions.includes(option) && styles.checkboxSelected,
                                     ]}
                                   >
                                     {selectedOptions.includes(option) && (
                                       <Text style={styles.checkboxCheckmark}>✓</Text>
                                     )}
                                   </View>
                                   <Text
                                     style={[
                                       styles.optionText,
                                       selectedOptions.includes(option) && styles.optionTextSelected,
                                     ]}
                                   >
                                     {option}
                                   </Text>
                                 </View>
                               </TouchableOpacity>
                             ))}
                           </ScrollView>
                           <TouchableOpacity
                             style={styles.doneButton}
                             onPress={() => setDropdownVisible(false)}
                           >
                             <Text style={styles.doneButtonText}>Done</Text>
                           </TouchableOpacity>
                         </View>
                       )}
                     </View>
                   </View>
                   </View>
                   
                   {/* Submit Button */}
                   <TouchableOpacity
                     style={styles.button}
                      onPress={handlePress}
                     onMouseEnter={() => setIsHovered(true)}
                     onMouseLeave={() => setIsHovered(false)}
                   >
                     <LinearGradient
                       colors={isHovered ? ["#FF6347", "#FF4500"] : ["#FF7F50", "#FF6347"]}
                       start={{ x: 0, y: 0 }}
                       end={{ x: 1, y: 0 }}
                       style={styles.gradient}
                     >
                       <Text style={styles.buttonText}>Book an appointment</Text>
                     </LinearGradient>
                   </TouchableOpacity>

                    <TouchableOpacity
                       onPress={handleOpenPress}>
                   <Text style={styles.footerText}>
                     Need to speak to our expert quickly? <Text style={styles.linkText}>Schedule urgently</Text>
                   </Text>
                    </TouchableOpacity>
                 </View>
               )}
             </View>
           </View>

         {/* Right Card */}
         <View style={{flex: 0.7}}>
           <Image source={require('../assets/success.png')} style={styles.successImage} />
         </View>
         </View>

      
          </View>
         <View style={styles.steppedcontainer}>
           {/* Header Section */}
           {/* LineBoxWithText Component */}
            <View style={styles.lineBoxSection}>
              <View style={styles.row}>
                {boxData.map((box, index) => (
                  <Animated.View
                    key={index}
                    style={[styles.smallbox, { transform: [{ scale: scales[index] }] }]}
                    onMouseEnter={Platform.OS === 'web' ? () => handleMouseEnter(index) : null}
                    onMouseLeave={Platform.OS === 'web' ? () => handleMouseLeave(index) : null}
                  >
                    <Image
                      source={{ uri: box.imageUrl }}
                      style={{ width: 50, height: 50 }}
                    />
                    <Text style={styles.smallboxText}>{box.text}</Text>
                  </Animated.View>
                ))}
              </View>
            </View>
           <Text style={styles.heading}>
             Really keen about transitioning and succeeding in a new career?
           </Text>
           <Text style={styles.subHeading}>
             Subscribe to our <Text style={styles.boldText}>Career Growth & Work Support</Text> program. It’s a robust process that covers everything you would need to succeed.
           </Text>

           {/* Steps Section */}
           <View style={styles.stepsContainer}>
             {stepsData.map((step, index) => (
               <View key={index} style={styles.stepBox}>
                 <Image source={{ uri: step.icon }} style={styles.icon} />
                 <Text style={styles.stepTitle}>{step.title}</Text>
                 <Text style={styles.stepDescription}>{step.description}</Text>
                 <View style={styles.circle}>
                   <Text style={styles.stepNumber}>{index + 1}</Text>
                 </View>
               </View>
             ))}
           </View>

           
           
           {/* Button Section */}
           <TouchableOpacity  onPress={handleIndividualSignUp} style={styles.subscribeButton}>
             <Text style={styles.buttonText}>Subscribe to our full-package</Text>
           </TouchableOpacity>
           
         </View>
             <Modal
               animationType="slide"
               transparent={true}
               visible={ModalVisible}
               onRequestClose={handleCloseModal}
             >
               <View style={styles.modalContent}>
                 <OpenModal onClose={handleCloseModal} />
               </View>
             </Modal>
             <Footer />
           </ScrollView>
       </View>
   );
 };

 // Styles
 const styles = StyleSheet.create({
   container: {
     padding: 20,
     backgroundColor: '#e8f5e9',
     alignItems: 'center',
   },
   modalContent: {
     flex: 1,
     justifyContent: "center",
     alignItems: "center",
     backgroundColor: "rgba(0, 0, 0, 0.1)",
   },
   topSection: {
     backgroundColor: 'lightgreen',
     padding: 20,
     borderRadius: 10,
     marginBottom: 20,
   },
   greentop: {
     backgroundColor: '#135837',
     marginTop: 30,
     marginLeft: -20,
     marginRight: -20,
     padding: 20,
     alignItems: 'center',
     alignSelf: 'stretch',
   },
   header: {
     borderTopLeftRadius: 5,
     borderTopRightRadius: 5,
     fontSize: 16,
     color: 'white',
     marginBottom: 10,
     backgroundColor: '#135837',
     marginTop: -20,
     marginLeft: -20,
     marginRight: -20,
     padding: 10,
     textAlign: 'center',
   },
   subHeader: {
     fontSize: 38,
     fontWeight: 'bold',
     marginBottom: 20,
      marginTop: 30,
     marginRight: 20
   },
    listgreen: {
      fontSize: 16,
      color: 'green',
      marginBottom: 7,
    },
   listItem: {
     fontSize: 16,
     color: 'black',
     marginBottom: 7,
   },
   form: {
     marginTop: 25,
     marginBottom: 5,
     flexDirection: 'row'
   },
   inputGroup: {
     marginBottom: 5,
   },
   label: {
     fontSize: 14,
     fontWeight: 'bold',
     marginBottom: 5,
     marginLeft: 5,
   },
   input: {
     borderWidth: 1,
     borderColor: '#ccc',
     padding: 10,
     width: 250,
     borderRadius: 5,
     marginBottom: 10,
     marginRight: 10,
     backgroundColor: '#fff',
   },
    input2: {
      borderWidth: 1,
      borderColor: '#ccc',
      padding: 10,
      width: 130,
      borderRadius: 5,
      marginBottom: 10,
      marginRight: 10,
      backgroundColor: '#fff',
    },
    picker: {
      borderWidth: 1,
      borderColor: '#ccc',
      padding: 10,
      fontSize: 14,
      width: 120,
      borderRadius: 5,
      marginBottom: 10,
      marginRight: 10,
      backgroundColor: '#fff',
    },
   button: {
     borderRadius: 5,
     overflow: "hidden", 
     marginBottom: 40,
     width: 180,
   },
   gradient: {
     padding: 15,
     alignItems: "center",
     justifyContent: "center",
   },
   buttonText: {
     color: "#fff",
     fontWeight: "bold",
   },
   footerText: {
     marginTop: 20,
     fontSize: 16,
      marginBottom: -20,
     backgroundColor: '#f3e5f5',
     borderBottomLeftRadius: 5,
     borderBottomRightRadius: 5,
      marginLeft: -20,
      marginRight: -20,
      padding: 10,
      textAlign: 'center',
   },
   linkText: {
     color: 'black',
     fontSize: 14,
     textDecorationLine: 'underline',
   },
   lineBoxSection: {
     marginTop: -130,
     backgroundColor: 'white',
     borderRadius: 5,
     shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 5,
   },
   row: {
     flexDirection: 'row',
   },
   smallbox: {
     backgroundColor: 'white',
     padding: 20,
     borderRadius: 5,
     width: "14.28%",
     borderRightWidth: 0.1,
     borderRightColor: '#CCC',
     height: 150,
     alignItems: 'center',
     justifyContent: 'center',
     shadowColor: '#000',
           shadowOffset: { width: 0, height: 2 },
           shadowOpacity: 0.1,
           shadowRadius: 4,
           elevation: 5,
   },
   smallboxText: {
     fontSize: 16,
     textAlign: 'center',
     marginTop: 10,
   },
   topsection: {
     flex: 1,
     flexDirection: 'row',
     justifyContent: 'space-between',
     padding: 20,
     backgroundColor: '#f0f9f4',
   },
   card: {
     backgroundColor: 'white',
     width: 620,
     marginTop: 100,
     marginBottom: 120,
     marginLeft: 150,
     borderRadius: 5,
     padding: 20,
     marginHorizontal: 10,
     shadowColor: '#000',
     shadowOffset: { width: 0, height: 2 },
     shadowOpacity: 0.1,
     shadowRadius: 4,
     elevation: 5,
   },
   leftSection: {
     flex: 1,
   },
   successImage: {
     width: 650,
     height: 650,
     resizeMode: 'contain',
     marginLeft: 50,
     marginTop: 50,
   },
   steppedcontainer: {
     backgroundColor: 'white',
     alignItems: 'center',
     padding: 50
   },
   heading: {
     fontSize: 28,
     fontWeight: 'bold',
     textAlign: 'center',
     color: '#333',
     marginBottom: 10,
     marginTop: 70,
   },
   subHeading: {
     fontSize: 20,
     textAlign: 'center',
     color: '#666',
     marginBottom: 20,
   },
   boldText: {
     fontWeight: 'bold',
     color: '#000',
   },
   stepsContainer: {
     flexDirection: 'row',
     marginBottom: 20,
     marginTop: 20,
     alignItems: 'center',
     alignContent: 'center',
     justifyContent: 'center'
   },
   stepBox: {
     width: '12%',
     marginLeft: 15,
     alignItems: 'center',
     marginBottom: 20,
   },
   icon: {
     width: 50,
     height: 50,
     marginBottom: 10,
   },
   stepTitle: {
     fontSize: 18,
     fontWeight: 'bold',
     textAlign: 'center',
     marginBottom: 5,
     color: '#333',
   },
   stepDescription: {
     fontSize: 16,
      textAlign: 'center',
      height: 50,
     color: '#666',
     marginBottom: 10,
   },
   circle: {
     width: 35,
     height: 35,
     borderRadius: 18,
     borderColor: 'black',
     borderWidth: 1,
     alignItems: 'center',
     justifyContent: 'center',
     position: 'absolute',
     bottom: -130,
   },
   stepNumber: {
     color: 'black',
     fontWeight: 'bold',
   },
   subscribeButton: {
     backgroundColor: '#f44336',
     padding: 15,
     borderRadius: 5,
     alignSelf: 'center',
     marginTop: 120
   },
   buttonText: {
     color: '#fff',
     fontWeight: 'bold',
   },
    buttonText2: {
      color: '#FF4500',
      fontWeight: '600',
      fontSize: 18
    },
   underline: {
     textDecorationLine: "underline",
     textDecorationStyle: 'solid',
      textDecorationThickness: 2,
   },
   confirmationText: {
     fontSize: 18,
     fontWeight: "bold",
     marginTop: 20,
   },
    noteText: {
      fontSize: 14,
      marginTop: 10,
    },
   paynoteText: {
     fontSize: 14,
     marginTop: 5,
     color: "gray",
   },
   selectContainer: {
     position: 'relative', 
     width: 160,

   },
   dropdownHeader: {
     padding: 10,
     height: 40,
     backgroundColor: 'white',
     overflow: 'hidden',
     borderWidth: 1,
     borderColor: '#ccc',
     borderRadius: 5,
   },
   dropdownText: {
     fontSize: 14,
     color: '#333',
   },
   dropdownOverlay: {
     position: 'absolute', // Position dropdown over other elements
     top: 45, // Adjust to position directly below the header
      width: 160,
     height: 100,
     left: 0,
     right: 0,
     backgroundColor: '#fff',
     borderWidth: 1,
     borderColor: '#ccc',
     borderRadius: 5,
     zIndex: 1000, // Ensure it stays on top
     shadowColor: '#000',
     shadowOffset: { width: 0, height: 2 },
     shadowOpacity: 0.2,
     shadowRadius: 5,
     elevation: 5, // For Android shadow
   },
   scrollContainer: {
     maxHeight: 160, // Limit height for dropdown
   },
   option: {
     padding: 10,
     borderBottomWidth: 1,
     borderBottomColor: '#ccc',
   },
   optionText: {
     fontSize: 14,
     color: '#333',
   },
   optionTextSelected: {
     color: '#00796b',
   },
   checkboxContainer: {
     flexDirection: 'row',
     alignItems: 'center',
   },
   checkbox: {
     width: 15,
     height: 15,
     borderWidth: 2,
     borderColor: '#00796b',
     borderRadius: 4,
     justifyContent: 'center',
     alignItems: 'center',
     marginRight: 5
   },
   checkboxSelected: {
     backgroundColor: '#00796b',
   },
   checkboxCheckmark: {
     color: 'white',
     fontSize: 14,
   },
   doneButton: {
     padding: 5,
     backgroundColor: '#00796b',
     justifyContent: 'center',
     alignItems: 'center',
   },
   doneButtonText: {
     color: 'white',
     fontSize: 14,
   },
 });

 export default DiscussSection;
