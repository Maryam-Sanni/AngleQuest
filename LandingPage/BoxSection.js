import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";

const MySection = () => {
   const [visibleBoxIndex, setVisibleBoxIndex] = useState(0);

   // Define your boxes data
   const boxes = [
      {
        title: "AngleQuest AI",
        description: "Ignite your quest for growth by simplifying the process to attain new height using AngleQuest AI"
      },
      {
        title: "Skill Gap Analysis",
        description: "We assess the gap between your current skill set and the skills needed to excel in your career"
      },
      {
        title: "Growth Plan",
        description: "We help identify areas for improvement and provide targeted training to close gaps and boost performance"
      },
      {
        title: "Join a Coaching Hub",
        description: "Connect with like-minded individuals and gain access to a network of peers and experts who share the same goals"
      },
      {
        title: "Scenario Based Project",
        description: "Gain practical experience by working on real-world projects and immerse yourself in the simulated job environment"
      },
      {
        title: "Exam & Interview Preparation",
        description: "Receive guidance from experts in your field to help you prepare for upcoming interviews or exams"
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
            source={require('../assets/Unlock.jpg')}
            style={styles.imageBack}
         />
         <View style={{ flexDirection: 'column' }}>
            <Text style={styles.heading}>Unlock Your Potential</Text>
            <Text style={styles.subheading}>
               At AngleQuest, we are dedicated to helping professionals unlocking their potential by providing top-tier tools and expert guidance to deliver value, impart knowledge, and drive you towards having a fulfilled career
            </Text>

            <View style={{flexDirection: 'row'}}>
            <TouchableOpacity onPress={handlePrevious} disabled={visibleBoxIndex === 0}>
               <Text style={[styles.arrow, visibleBoxIndex === 0 && styles.disabledArrow]}>{'<'}</Text>
            </TouchableOpacity>
            <View style={styles.boxContainer}>
               {/* Render only 3 boxes */}
               {currentBoxes.map((box, index) => (
                  <View key={index} style={styles.box}>
                     <Text style={styles.boxText}>{box.title}</Text>
                     <Text style={styles.boxsubText}>{box.description}</Text>
                     <View style={{ flexDirection: 'row', marginTop: 40 }}>
                        <Text style={styles.boxLText}>Learn More</Text>
                        <Image
                           source={{ uri: 'https://img.icons8.com/?size=100&id=76&format=png&color=206C00' }}
                           style={{ width: 20, height: 20, marginLeft: 5 }}
                        />
                     </View>
                  </View>
               ))}
               <TouchableOpacity onPress={handleNext} disabled={visibleBoxIndex + boxesPerPage >= boxes.length}>
                  <Text style={[styles.arrow, visibleBoxIndex + boxesPerPage >= boxes.length && styles.disabledArrow]}>{'>'}</Text>
               </TouchableOpacity>
            </View>
              
            </View>
           
         </View>
      </View>
   );
};

const styles = StyleSheet.create({
   sectionContainer: {
      padding: 50,
      backgroundColor: '#F0F0F0', // Optional background color for the section
      width: '100%',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 50
   },
   heading: {
      fontSize: 32,
      fontWeight: '600',
      marginBottom: 10,
      textAlign: 'center'
   },
   subheading: {
      fontSize: 18,
      marginBottom: 20,
      width: 600,
      textAlign: 'center',
      alignSelf: 'center'
   },
   boxContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between', 
      marginTop: 10
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
      height: 150
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
      fontSize: 25,
      color: '#206C00',
      marginHorizontal: 20,
      fontWeight: 'bold',
      marginTop: 100
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
      width: 500,
      height: 500,
      marginRight: 50
   },
});

export default MySection;
