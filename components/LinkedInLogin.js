import React, { useEffect } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Alert, Image } from 'react-native';

const CLIENT_ID = '78qmuikhnbiec4';
const CLIENT_SECRET = 'QhCdLTELCYUe62EQ';
const REDIRECT_URI = 'http://anglequest.com/user/oauth/ln';
const STATE = 'random_string';

const LinkedInLogin = () => {
  const handleLinkedInLogin = () => {
    const authUrl = `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&state=${STATE}&scope=r_liteprofile%20r_emailaddress`;
    window.location.href = authUrl;
  };

  const handleCallback = async (code) => {
    try {
      const response = await fetch('https://www.linkedin.com/oauth/v2/accessToken', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          grant_type: 'authorization_code',
          code,
          redirect_uri: REDIRECT_URI,
          client_id: CLIENT_ID,
          client_secret: CLIENT_SECRET,
        }).toString(),
      });

      if (!response.ok) {
        const errorResponse = await response.json();
        console.error('LinkedIn token exchange failed:', errorResponse);
        Alert.alert('LinkedIn login failed', `Error: ${errorResponse.error_description || 'Unknown error'}`);
        return;
      }

      const data = await response.json();
      console.log('LinkedIn token data:', data);
      Alert.alert('LinkedIn login successful', JSON.stringify(data));
    } catch (error) {
      console.error('LinkedIn token exchange failed:', error);
      Alert.alert('LinkedIn login failed', JSON.stringify(error));
    }
  };

  const extractCodeFromUrl = (url) => {
    const urlParams = new URLSearchParams(new URL(url).search);
    return urlParams.get('code');
  };

  useEffect(() => {
    if (window.location.search) {
      const code = extractCodeFromUrl(window.location.href);
      if (code) {
        handleCallback(code);
      }
    }
  }, []);

  return (
    <TouchableOpacity style={styles.buttonContainer} onPress={handleLinkedInLogin}>
      <Image
        source={{
          uri: 'https://cdn.builder.io/api/v1/image/assets/TEMP/44c39c6507947c98c1b395fecfccacfdba1edd07847eab25a4f629858fa22afa?apiKey=7b9918e68d9b487793009b3aea5b1a32&',
        }}
        style={styles.buttonIcon}
      />
      <Text>Sign up with LinkedIn</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonIcon: {
    width: 24,
    height: 24,
    marginRight: 10,
  },
});

export default LinkedInLogin;
