import React from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import Top from './top';
import { useNavigation } from '@react-navigation/native';

export default function App() {
  const navigation = useNavigation();

  const navigateToPrivacyPolicy = () => {
    navigation.navigate('Privacy Policy'); // Navigate to the 'PrivacyPolicy' page
  };

  return (
    <View style={{ flex: 1 }}>
      <Top />
      <ScrollView contentContainerStyle={{ flexGrow: 1, maxHeight: 500  }}>
        <View style={styles.container}>
          <Text style={styles.title}>TERMS OF SERVICE</Text>
          <Text style={styles.content}>
            Welcome to AngleQuest. These Terms of Service outline the rules and regulations for the use of our website and services.
            {'\n\n'}
            By clicking "ACCEPT THE TERMS" , we assume you accept these terms and conditions. Do not continue to use AngleQuest if you do not agree to all of the terms and conditions stated on this page.
            {'\n\n'}
            <Text style={{fontWeight: '600'}}>1. Intellectual Property Rights </Text>
            {'\n'}
            Unless otherwise stated, AngleQuest and/or its licensors own the intellectual property rights for all material on our website. All intellectual property rights are reserved.
            {'\n\n'}
            <Text style={{fontWeight: '600'}}>2. Description of Service </Text>
            {'\n'}
            AngleQuest is a platform that connects job seekers with experts and recruiters to streamline the hiring process. We assess skills and qualifications to provide a more objective evaluation of candidates.
            {'\n\n'}
            <Text style={{fontWeight: '600'}}>3. User Accounts </Text>
            {'\n'}
            You may need to create an account to access certain features of our website. You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account.
            {'\n\n'}
            <Text style={{fontWeight: '600'}}>4. User Responsibilities </Text>
            {'\n'}
            You agree to use AngleQuest only for lawful purposes and in accordance with these Terms. You are solely responsible for your interactions with other users and for any content you post or upload to the website.
            {'\n\n'}
            <Text style={{fontWeight: '600'}}>5. User License </Text>
            {'\n'}
            You may view, download for caching purposes only, and print pages from our website for your own personal use, subject to the restrictions set out below and elsewhere in these terms and conditions.
            {'\n'}
            You must not:
            {'\n'}
            - Republish material from our website
            - Sell, rent, or sub-license material from our website
            - Reproduce, duplicate, or copy material from our website
            - Redistribute content from our website
            {'\n\n'}
            <Text style={{fontWeight: '600'}}>6. User Content </Text> 
            {'\n'}
            Our website allows users to post, link, store, share, and otherwise make available certain information, text, graphics, videos, or other material. You are responsible for the content you post on our website and must ensure that it does not violate any laws or infringe on the rights of others.
            {'\n\n'}
            <Text style={{fontWeight: '600'}}>7. Privacy </Text>
            {'\n'}
            Your privacy is important to us. Please review our 
            <TouchableOpacity onPress={navigateToPrivacyPolicy}> {/* Navigate to PrivacyPolicy page */}
              <Text style={{fontWeight: '600', color: 'coral', textDecoration: 'underline'}}> Privacy Policy </Text>
            </TouchableOpacity>
            to understand how we collect, use, and disclose information about you when you use Recruitangle.
            {'\n\n'}
            <Text style={{fontWeight: '600'}}>8. Disclaimer of Warranties </Text>
            {'\n'}
            AngleQuest is provided on an "as is" and "as available" basis, without any warranties of any kind, either express or implied. We do not warrant that our website will be uninterrupted or error-free.
            {'\n\n'}
            <Text style={{fontWeight: '600'}}>9. Limitation of Liability </Text>
            {'\n'}
            In no event shall AngleQuest, nor any of its officers, directors, and employees, be liable to you for anything arising out of or in any way connected with your use of our website, whether such liability is under contract, tort, or otherwise.
            {'\n\n'}
            <Text style={{fontWeight: '600'}}>10. Governing Law </Text>
            {'\n'}
            These terms and conditions are governed by and construed in accordance with the laws applicable in your country of residence, without regard to its conflict of law provisions. You agree that any legal action or proceeding between Recruitangle and you for any purpose concerning these terms or the website shall be brought exclusively in a court of competent jurisdiction in your country of residence.
            {'\n\n'}
            <Text style={{fontWeight: '600'}}>11. Indemnification </Text>
            {'\n'}
            You agree to indemnify and hold harmless AngleQuest and its affiliates, officers, directors, employees, and agents from and against any claims, liabilities, damages, losses, and expenses, including reasonable attorneys' fees, arising out of or in connection with your use of Recruitangle.
            {'\n\n'}
            <Text style={{fontWeight: '600'}}>12. Changes to Terms </Text> 
            {'\n'}
            We reserve the right to revise these terms of service at any time without notice. By using this website, you agree to be bound by the current version of these terms of service.
            {'\n\n'}
            <Text style={{fontWeight: '600'}}>13. Contact Us </Text>
            {'\n'}
            If you have any questions or concerns about these Terms, please contact us via email at 
            <Text style={{fontWeight: '600', color: 'coral', textDecoration: 'underline'}}> anglequest@gmail.com </Text>
            or by filling out the contact form on our website 
            <Text style={{fontWeight: '600', color: 'green', textDecoration: 'underline'}}> here.</Text>
            {'\n\n'}
            By using our website, you agree to abide by these Terms of Service.
          </Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>ACCEPT THE TERMS</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.Declinebutton}>
              <Text style={styles.DeclinebuttonText}>DECLINE</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#206C00'
  },
  content: {
    fontSize: 16,
    lineHeight: 24,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
    marginBottom: 50,
  },
  button: {
    backgroundColor: 'coral',
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  Declinebutton: {
    backgroundColor: 'none',
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'green'
  },
  DeclinebuttonText: {
    color: 'green',
    fontSize: 14,
    fontWeight: 'bold',
  },
});
