import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';

const MySection = () => {
   const [visibleBoxIndex, setVisibleBoxIndex] = useState(0);

   // Define your boxes data
   const boxes = [
      {
        title: "AngleQuest AI",
        description: "AI powered personalised growth plan, domain expert led gap analysis, study maps, courses and certifications."
      },
      {
        title: "Skill Gap Analysis",
        description: "We assess the gap between your current skill set and the skills needed to excel in your role or meet your organization's objectives."
      },
      {
        title: "Growth Plan",
        description: "We help identify areas for improvement and provide targeted training to close gaps and boost performance."
      },
      {
        title: "Join a Hub",
        description: "Connect with like-minded individuals and gain access to a network of peers and experts who share the same goals."
      },
      {
        title: "Scenario Based Project",
        description: "Gain practical experience by working on real-world projects and immerse yourself in the simulated job environment."
      },
      {
        title: "Exam & Interview Preparation",
        description: "Receive guidance from experts in your field to help you prepare for upcoming interviews or exams."
      }
    ];

   // Show only 3 boxes at a time
   const boxesPerPage = 3;
   const currentBoxes = boxes.slice(visibleBoxIndex, visibleBoxIndex + boxesPerPage);

   // Handle next and previous actions
   const handleNext = () => {
      if (visibleBoxIndex + boxesPerPage < boxes.length) {
         setVisibleBoxIndex(visibleBoxIndex + boxesPerPage);
      }
   };

   const handlePrevious = () => {
      if (visibleBoxIndex - boxesPerPage >= 0) {
         setVisibleBoxIndex(visibleBoxIndex - boxesPerPage);
      }
   };

   return (
      <View style={styles.sectionContainer}>
         <Image
            source={require('../assets/createPfp.png')}
            style={styles.imageBack}
         />
         <View style={{ flexDirection: 'column' }}>
            <Text style={styles.heading}>Unlock Your Potential with Precision Growth Solutions</Text>
            <Text style={styles.subheading}>
               Empower your career or team with Skill Gap Analysis, personalized Growth Plans, and a comprehensive Hub for continuous development. Tailored to individuals and businesses seeking measurable success.
            </Text>

            <View style={styles.boxContainer}>
               {/* Render the current 3 boxes */}
               {currentBoxes.map((box, index) => (
                  <View key={index} style={styles.box}>
                     <Text style={styles.boxText}>{box.title}</Text>
                     <Text style={styles.boxsubText}>{box.description}</Text>
                     <View style={{ flexDirection: 'row', marginTop: 40 }}>
                        <Text style={styles.boxLText}>Learn More</Text>
                        <Image
                           source={{ uri: 'https://img.icons8.com/?size=100&id=59811&format=png&color=206C00' }}
                           style={{ width: 20, height: 20, marginLeft: 5 }}
                        />
                     </View>
                  </View>
               ))}
            </View>

            {/* Previous and Next arrows */}
            <View style={styles.arrowContainer}>
               <TouchableOpacity onPress={handlePrevious} disabled={visibleBoxIndex === 0}>
                  <Text style={[styles.arrow, visibleBoxIndex === 0 && styles.disabledArrow]}>{'<'}</Text>
               </TouchableOpacity>
               <TouchableOpacity onPress={handleNext} disabled={visibleBoxIndex + boxesPerPage >= boxes.length}>
                  <Text style={[styles.arrow, visibleBoxIndex + boxesPerPage >= boxes.length && styles.disabledArrow]}>{'>'}</Text>
               </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.button}>
               <LinearGradient
                  colors={['#135837', '#29BE77']} // Gradient colors (green shades)
                  style={styles.gradient}
               >
                  <Text style={styles.buttonText}>Get Started</Text>
               </LinearGradient>
            </TouchableOpacity>
         </View>
      </View>
   );
};

const styles = StyleSheet.create({
   sectionContainer: {
      padding: 50,
      backgroundColor: '#f0f0f0', // Optional background color for the section
      width: '100%',
      flexDirection: 'row',
      alignItems: 'center',
   },
   heading: {
      fontSize: 32,
      fontWeight: '600',
      marginBottom: 10,
   },
   subheading: {
      fontSize: 18,
      marginBottom: 20,
      width: 600,
   },
   boxContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between', // Ensures boxes are spaced apart
   },
   box: {
      marginHorizontal: 10,
      backgroundColor: 'white',
      padding: 20,
      borderRadius: 10,
      width: 250,
      height: 250,
      borderColor: 'black',
      borderWidth: 0.5,
      boxShadow: '0px 20px 40px rgba(85, 107, 47, 0.2)', 
   },
   boxText: {
      fontSize: 18,
      fontWeight: '500',
   },
   boxsubText: {
      fontSize: 16,
      marginTop: 20,
   },
   boxLText: {
      fontSize: 18,
      color: '#206C00',
      fontWeight: '600',
   },
   arrowContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 20,
   },
   arrow: {
      fontSize: 24,
      color: '#206C00',
      marginHorizontal: 20,
      fontWeight: 'bold',
   },
   disabledArrow: {
      color: '#cccccc', // Greyed out color when disabled
   },
   button: {
      width: 200,
      marginTop: 50,
   },
   gradient: {
      padding: 10,
      borderRadius: 5,
      alignItems: 'center', // Center the button text
   },
   buttonText: {
      color: 'white',
      fontSize: 16,
   },
   imageBack: {
      width: 700,
      height: 700,
      marginRight: '5%',
      marginLeft: -50,
      marginTop: -50,
      marginBottom: -50,
   },
});

export default MySection;
