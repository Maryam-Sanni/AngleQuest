import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const WebViewComponent = () => {
    const [uri, setUri] = useState('');

    useEffect(() => {
        const fetchToken = async () => {
            try {
                const token = await AsyncStorage.getItem('token');
                if (token) {
                    setUri(`https://recruitangle.com/chat?token=${token}`);
                } else {
                    console.error('No token found');
                }
            } catch (error) {
                console.error('Failed to fetch token:', error);
            }
        };
        fetchToken();
    }, []);

    if (!uri) return <Text>Loading...</Text>;

    return (
        <iframe
            src={uri}
            style={{ width: '100%', height: '100%', border: 'none' }}
            title="WebView"
        />
    );
};

const App = () => {
    // Check if running in a web environment
    const isWeb = typeof window !== 'undefined' && window.document;

    return (
        <View style={styles.container}>
            {isWeb ? (
                <WebViewComponent />
            ) : (
                <Text>WebView is not supported on this platform</Text>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

export default App;