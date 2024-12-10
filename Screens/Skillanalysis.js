 import React from 'react';
 import { View, Text, Image, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

 // Main Component
 const DiscussSection = () => {
   const boxData = [
     {
       text: 'SAP',
       imageUrl: 'https://img.icons8.com/?size=100&id=38192&format=png&color=000000',
     },
     {
       text: 'Microsoft Dynamics 365 CE',
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

   return (
     <View style={styles.container}>
       {/* Top Section */}
       <View style={styles.topSection}>
         <Text style={styles.header}>Discuss your situation with our expert</Text>
         <Text style={styles.subHeader}>Unsure about the technology skill to delve into?</Text>
         <Text style={styles.listItem}>✔ Discuss with our expert for personalized guidance</Text>
         <Text style={styles.listItem}>✔ Quickly gain clarity on the path to follow</Text>
         <Text style={styles.listItem}>✔ Feel confident and certain about your next steps</Text>

         <View style={styles.form}>
           <TextInput placeholder="Email" style={styles.input} />
           <TextInput placeholder="Date" style={styles.input} />
           <TextInput placeholder="Preference" style={styles.input} />
           <TouchableOpacity style={styles.button}>
             <Text style={styles.buttonText}>Book an appointment</Text>
           </TouchableOpacity>
         </View>

         <Text style={styles.footerText}>
           Need to speak to our expert quickly? <Text style={styles.linkText}>Schedule urgently</Text>
         </Text>
       </View>

       {/* LineBoxWithText Component */}
       <View style={styles.lineBoxSection}>
         <View style={styles.row}>
           {boxData.map((box, index) => (
             <View key={index} style={styles.smallBox}>
               <Image source={{ uri: box.imageUrl }} style={styles.icon} />
               <Text style={styles.smallBoxText}>{box.text}</Text>
             </View>
           ))}
         </View>
       </View>
     </View>
   );
 };

 // Styles
 const styles = StyleSheet.create({
   container: {
     flex: 1,
     padding: 20,
     backgroundColor: '#f9f9f9',
   },
   topSection: {
     backgroundColor: 'lightgreen',
     padding: 20,
     borderRadius: 10,
     marginBottom: 20,
   },
   header: {
     fontSize: 20,
     fontWeight: 'bold',
     marginBottom: 10,
   },
   subHeader: {
     fontSize: 18,
     fontWeight: '600',
     marginBottom: 10,
   },
   listItem: {
     fontSize: 14,
     marginBottom: 5,
   },
   form: {
     marginTop: 15,
     marginBottom: 10,
   },
   input: {
     borderWidth: 1,
     borderColor: '#ccc',
     padding: 10,
     borderRadius: 5,
     marginBottom: 10,
     backgroundColor: '#fff',
   },
   button: {
     backgroundColor: '#f50057',
     padding: 12,
     borderRadius: 5,
     alignItems: 'center',
   },
   buttonText: {
     color: '#fff',
     fontWeight: 'bold',
   },
   footerText: {
     marginTop: 10,
     fontSize: 14,
   },
   linkText: {
     color: '#007bff',
     textDecorationLine: 'underline',
   },
   lineBoxSection: {
     marginTop: 20,
   },
   row: {
     flexDirection: 'row',
     flexWrap: 'wrap',
     justifyContent: 'space-between',
   },
   smallBox: {
     width: '30%',
     alignItems: 'center',
     marginVertical: 10,
   },
   icon: {
     width: 50,
     height: 50,
     marginBottom: 5,
   },
   smallBoxText: {
     fontSize: 12,
     textAlign: 'center',
   },
 });

 export default DiscussSection;
