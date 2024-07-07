import React, { useEffect } from 'react';
import { Dimensions, Linking } from 'react-native';
import Main from './Main';
import './i18n'; // Assuming this is your i18n setup

const App = () => {
  useEffect(() => {
    const { width } = Dimensions.get('window');
    if (width < 600) {
      Linking.openURL('https://mobile.anglequest.com/');
    }
  }, []);
  
  return (
    <Main />
  );
}

export default App;
