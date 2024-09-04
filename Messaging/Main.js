import React from 'react';
import { AppRegistry, Platform } from 'react-native';
import ChatScopeUI from './ChatScopeUI';
import { AuthProvider } from './AuthProvider';

// Conditionally wrap in ChakraProvider for web only
const Main = () => {
    return (
        <>
            {Platform.OS === 'web' ? (
                <ChakraProvider>
                    <AuthProvider>
                        <ChatScopeUI />
                    </AuthProvider>
                </ChakraProvider>
            ) : (
                <AuthProvider>
                    <ChatScopeUI />
                </AuthProvider>
            )}
        </>
    );
};

// Register the main component for both web and native platforms
AppRegistry.registerComponent('main', () => Main);

// If we're on the web, render the app
if (Platform.OS === 'web') {
    AppRegistry.runApplication('main', {
        initialProps: {},
        rootTag: document.getElementById('main'),
    });
}
