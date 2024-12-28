import React from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import Top from './top';
import { useFonts } from 'expo-font';
import { useTranslation } from 'react-i18next';

export default function App({ onClose }) {

  const [fontsLoaded]=useFonts({
    'Roboto-Light':require("../assets/fonts/Roboto-Light.ttf"),
  })
const {t}=useTranslation()
  return (
    <View style={{marginTop: 40,  }}>
    
      <ScrollView contentContainerStyle={{ flexGrow: 1, maxHeight: 500  }}>
        <View style={styles.container}>
        <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                     <Text style={{ fontSize: 18, color: '#3F5637', fontWeight: 'bold', fontFamily: "Roboto-Light" }}>
                       ✕
                     </Text>
                   </TouchableOpacity>
          <Text style={styles.title}>{t("TERMS OF SERVICE AND PRIVACY POLICY")}</Text>
          <Text style={styles.content}>
            Welcome to AngleQuest. These Terms of Service outline the rules and regulations for the use of our website and services.
            {'\n\n'}
            By clicking "ACCEPT THE TERMS" , we assume you accept these terms and conditions. Do not continue to use AngleQuest if you do not agree to all of the terms and conditions stated on this page.
            {'\n\n'}
            <Text style={{fontWeight: '600',fontFamily:"Roboto-Light"}}>{t("*. Intellectual Property Rights")} </Text>
            {'\n'}
            Unless otherwise stated, AngleQuest and/or its licensors own the intellectual property rights for all material on our website. All intellectual property rights are reserved.
            {'\n\n'}
                  At AngleQuest, we are committed to protecting the privacy of our users. This Privacy Policy outlines how we collect, use, and safeguard your personal information when you visit our website or use our services.
                  {'\n\n'}
                  <Text style={{fontWeight: '600',fontFamily:"Roboto-Light"}}>{t("1. Information We Collect")}</Text>
                  {'\n'}
                  {t("We collect various types of information to provide and improve our services, including:")}
                  {'\n'}
                  - {t("Personal Information: When you register an account or use our services, we may collect personal information such as your name, email address, contact information, and professional details.")}
                  {'\n'}
                  - {t("Usage Data: We automatically collect information about how you interact with our website and services, including IP addresses, browser types, pages visited, and the dates and times of visits.")}
                  {'\n'}
                  - {t("Cookies and Tracking Technologies: We use cookies and similar tracking technologies to enhance your experience, analyze trends, and administer the website.")}
                  {'\n\n'}
                   <Text style={{fontWeight: '600',fontFamily:"Roboto-Light"}}>{t("2. How We Use Your Information")}</Text>
                  {'\n'}
                  {t("We use the information we collect for various purposes, including:")}
                  {'\n'}
                  - {t("Providing and maintaining our services")}
                  {'\n'}
                  - {t("Personalizing your experience")}
                  {'\n'}
                  - {t("Communicating with you")}
                  {'\n'}
                  - {t("Analyzing usage trends and improving our website and services")}
                  {'\n'}
                  - {t("Protecting against fraud and ensuring the security of our platform")}
                  {'\n\n'}
                  <Text style={{fontWeight: '600',fontFamily:"Roboto-Light"}}>{t("3. Sharing Your Information")}</Text>
                  {'\n'}
                  {t("We may share your information in the following circumstances:")}
                  {'\n'}
                  - {t("With experts and recruiters to facilitate the hiring process")}
                  {'\n'}
                  - {t("With service providers who assist us in operating our website and providing our services")}
                  {'\n'}
                  - {t("When required by law or to protect our rights and safety")}
                  {'\n\n'}
                  <Text style={{fontWeight: '600',fontFamily:"Roboto-Light"}}>{t("4. Your Choices")}</Text>
                  {'\n'}
                  {t("You have the right to access, update, and delete your personal information. You can also choose to opt out of certain types of data collection and marketing communications.")}
                  {'\n\n'}
                  <Text style={{fontWeight: '600',fontFamily:"Roboto-Light"}}>{t("5. Data Security")}</Text>
                  {'\n'}
                  {t("We take reasonable measures to protect your information from unauthorized access, use, or disclosure. However, no method of transmission over the internet or electronic storage is 100% secure.")}
                  {'\n\n'}
                  <Text style={{fontWeight: '600',fontFamily:"Roboto-Light"}}>{t("6. Third-Party Links")}</Text>
                  {'\n'}
                  {t("Our website may contain links to third-party websites or services that are not owned or controlled by us. We are not responsible for the privacy practices or content of these third parties.")}
                  {'\n\n'}
                  <Text style={{fontWeight: '600',fontFamily:"Roboto-Light"}}>{t("7. Children’s Privacy")}</Text>
                  {'\n'}
                  {t("Our services are not intended for children under the age of 18, and we do not knowingly collect personal information from minors.")}
                  {'\n\n'}
                  <Text style={{fontWeight: '600',fontFamily:"Roboto-Light"}}>{t("8. Updates to this Privacy Policy")}</Text>
                  {'\n'}
                  {t("We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page.")}
                  {'\n\n'}
            <Text style={{fontWeight: '600',fontFamily:"Roboto-Light"}}>{t("9. Description of Service")} </Text>
            {'\n'}
            AngleQuest is a platform that connects job seekers with experts and recruiters to streamline the hiring process. We assess skills and qualifications to provide a more objective evaluation of candidates.
            {'\n\n'}
            <Text style={{fontWeight: '600',fontFamily:"Roboto-Light"}}>{t("10. User Accounts")} </Text>
            {'\n'}
            {t("You may need to create an account to access certain features of our website. You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account.")}
            {'\n\n'}
            <Text style={{fontWeight: '600',fontFamily:"Roboto-Light"}}>{t("11. User Responsibilities")} </Text>
            {'\n'}
            You agree to use AngleQuest only for lawful purposes and in accordance with these Terms. You are solely responsible for your interactions with other users and for any content you post or upload to the website.
            {'\n\n'}
            <Text style={{fontWeight: '600',fontFamily:"Roboto-Light"}}>{t("12. User License")} </Text>
            {'\n'}
            {t("You may view, download for caching purposes only, and print pages from our website for your own personal use, subject to the restrictions set out below and elsewhere in these terms and conditions.")}
            {'\n'}
            {t("You must not:")}
            {'\n'}
            - {t("Republish material from our website")}
            - {t("Sell, rent, or sub-license material from our website")}
            - {t("Reproduce, duplicate, or copy material from our website")}
            - {t("Redistribute content from our website")}
            {'\n\n'}
            <Text style={{fontWeight: '600',fontFamily:"Roboto-Light"}}>{t("13. User Content")} </Text> 
            {'\n'}
            {t("Our website allows users to post, link, store, share, and otherwise make available certain information, text, graphics, videos, or other material. You are responsible for the content you post on our website and must ensure that it does not violate any laws or infringe on the rights of others.")}
            {'\n\n'}
            <Text style={{fontWeight: '600',fontFamily:"Roboto-Light"}}>{t("14. Privacy")} </Text>
            {'\n'}
            {t("Your privacy is important to us. Please review our")} 
              <Text style={{fontWeight: '600', color: 'coral', textDecoration: 'underline',fontFamily:"Roboto-Light"}}> {t("Privacy Policy")} </Text>
            {t("to understand how we collect, use, and disclose information about you when you use Recruitangle.")}
            {'\n\n'}
            <Text style={{fontWeight: '600',fontFamily:"Roboto-Light"}}>{t("15. Disclaimer of Warranties")} </Text>
            {'\n'}
            AngleQuest is provided on an "as is" and "as available" basis, without any warranties of any kind, either express or implied. We do not warrant that our website will be uninterrupted or error-free.
            {'\n\n'}
            <Text style={{fontWeight: '600',fontFamily:"Roboto-Light"}}>{t("16. Limitation of Liability")} </Text>
            {'\n'}
            {t("In no event shall Recruitangle, nor any of its officers, directors, and employees, be liable to you for anything arising out of or in any way connected with your use of our website, whether such liability is under contract, tort, or otherwise.")}
            In no event shall AngleQuest, nor any of its officers, directors, and employees, be liable to you for anything arising out of or in any way connected with your use of our website, whether such liability is under contract, tort, or otherwise.
            {'\n\n'}
            <Text style={{fontWeight: '600',fontFamily:"Roboto-Light"}}>{t("17. Governing Law")} </Text>
            {'\n'}
            {t("These terms and conditions are governed by and construed in accordance with the laws applicable in your country of residence, without regard to its conflict of law provisions. You agree that any legal action or proceeding between Recruitangle and you for any purpose concerning these terms or the website shall be brought exclusively in a court of competent jurisdiction in your country of residence")}.
            {'\n\n'}
            <Text style={{fontWeight: '600',fontFamily:"Roboto-Light"}}>{t("18. Indemnification")} </Text>
            {'\n'}
            {t("You agree to indemnify and hold harmless Recruitangle and its affiliates, officers, directors, employees, and agents from and against any claims, liabilities, damages, losses, and expenses, including reasonable attorneys' fees, arising out of or in connection with your use of Recruitangle.")}
            You agree to indemnify and hold harmless AngleQuest and its affiliates, officers, directors, employees, and agents from and against any claims, liabilities, damages, losses, and expenses, including reasonable attorneys' fees, arising out of or in connection with your use of Recruitangle.
            {'\n\n'}
            <Text style={{fontWeight: '600',fontFamily:"Roboto-Light"}}>{t("19. Changes to Terms")} </Text> 
            {'\n'}
            {t("We reserve the right to revise these terms of service at any time without notice. By using this website, you agree to be bound by the current version of these terms of service.")}
            {'\n\n'}
            <Text style={{fontWeight: '600',fontFamily:"Roboto-Light"}}>{t("20. Contact Us")} </Text>
            {'\n'}
            If you have any questions or concerns about these Terms, please contact us via email at 
            <Text style={{fontWeight: '600', color: 'coral', textDecoration: 'underline'}}>ask@anglequest.com</Text>
            or by filling out the contact form on our website 
            <Text style={{fontWeight: '600', color: 'green', textDecoration: 'underline'}}> here.</Text>
            {'\n\n'}
            {t("By using our website, you agree to abide by these Privacy Policy and Terms of Service.")}
          </Text>
                  
                 
             
         
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 800,
    height: 3000,
    backgroundColor: '#fff',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#206C00',
    marginTop: 20,
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
  closeButton: {
    position: 'absolute',
    top: 20,
    right: 20,
  },
});
