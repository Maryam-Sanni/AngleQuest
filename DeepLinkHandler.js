import React, { useEffect } from 'react';
import { Linking, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const DeepLinkHandler = () => {
  const navigation = useNavigation();

  useEffect(() => {
    const handleDeepLink = async () => {
      let initialUrl = null;
      
      // On iOS and Android, check for initial URL differently
      if (Platform.OS === 'android' || Platform.OS === 'ios') {
        initialUrl = await Linking.getInitialURL();
      } else {
        // Handle localhost specific URL scheme for web testing (e.g., http://localhost:8081)
        initialUrl = Platform.select({
          web: document.location.href,
          default: null,
        });
      }

      if (initialUrl) {
        navigateToScreen(initialUrl);
      }

      const handleUrlOpen = (event) => {
        navigateToScreen(event.url);
      };

      // Add event listener for deep linking
      Linking.addEventListener('url', handleUrlOpen);

      return () => {
        // Clean up event listener when component unmounts
        Linking.removeEventListener('url', handleUrlOpen);
      };
    };

    const navigateToScreen = (url) => {
        console.log('Navigating to URL:', url);
      
        // Extract the path or screen name from the URL
        const route = url.replace(/.*?:\/\//g, '');
        const screen = route.split('/')[0];
      
        console.log('Extracted Screen:', screen);
      
        // Map URLs to screens in your app
        switch (screen) {
          case 'join-recruitangle':
            navigation.navigate('Join Recruitangle');
            break;
          case 'Sign Up':
            navigation.navigate('Sign Up');
            break;
          case 'Verified':
            navigation.navigate('Verified');
            break;
            case 'mobile':
            navigation.navigate('mobile');
            break;
          case 'TermsofService':
            navigation.navigate('TermsofService');
            break;
          case 'PrivacyPolicy':
            navigation.navigate('PrivacyPolicy');
            break;
          default:
            navigation.navigate('Welcome');
            break;
        }
      };

    handleDeepLink();
  }, [navigation]);

  return null; // DeepLinkHandler doesn't render anything
};

export default DeepLinkHandler;
