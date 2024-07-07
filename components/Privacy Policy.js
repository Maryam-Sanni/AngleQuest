import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';
import Top from './top';
import { useFonts } from 'expo-font';
import { useTranslation } from 'react-i18next';

export default function App() {
  const [fontsLoaded]=useFonts({
    'Roboto-Light':require("../assets/fonts/Roboto-Light.ttf"),
  })
const {t}=useTranslation()
  return (
    <View style={{ flex: 1 }}>
    <Top />
    <ScrollView contentContainerStyle={{ flexGrow: 1, maxHeight: 500  }}>
    <View style={styles.container}>
      <Text style={styles.title}>{t("PRIVACY POLICY")}</Text>
      <Text style={styles.content}>
        {t("At Recruitangle, we are committed to protecting the privacy of our users. This Privacy Policy outlines how we collect, use, and safeguard your personal information when you visit our website or use our services.")}
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
        <Text style={{fontWeight: '600',fontFamily:"Roboto-Light"}}>{t("9. Contact Us")}</Text>
        {'\n'}
        {t("If you have any questions, concerns, or feedback regarding our Privacy Policy or our services, please don’t hesitate to reach out to us. You can contact us via email at <Text style={{textDecoration: 'underline', color: 'coral', fontWeight: '600'}}>recruitangle@gmail.com </Text> or by filling out the contact form on our website <Text style={{fontWeight: '600', color: 'green', textDecoration: 'underline'}}>here.</Text> We aim to respond to all inquiries promptly and strive to address any issues you may have effectively. Thank you for your trust in Recruitangle.")}
        If you have any questions, concerns, or feedback regarding our Privacy Policy or our services, please don’t hesitate to reach out to us. You can contact us via email at <Text style={{textDecoration: 'underline', color: 'coral', fontWeight: '600'}}>AngleQuest@gmail.com </Text> or by filling out the contact form on our website <Text style={{fontWeight: '600', color: 'green', textDecoration: 'underline'}}>here.</Text> We aim to respond to all inquiries promptly and strive to address any issues you may have effectively. Thank you for your trust in AngleQuest.
        {'\n\n'}
        {t("By using our website or services, you agree to the terms of this Privacy Policy.")}
      </Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>{t("ACCEPT THE TERMS")}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.Declinebutton}>
          <Text style={styles.DeclinebuttonText}>{t("DECLINE")}</Text>
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
    color: 'black',
    fontFamily:"Roboto-Light"
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
    fontFamily:"Roboto-Light",
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
    fontFamily:"Roboto-Light"
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
    fontFamily:"Roboto-Light"
  },
});