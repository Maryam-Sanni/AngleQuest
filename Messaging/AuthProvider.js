import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Platform } from 'react-native';
import * as SecureStore from 'expo-secure-store';

// Set the base URL for Axios requests
export const api_url = 'http://127.0.0.1:8000/api/';
axios.defaults.baseURL = api_url;

export const AuthContext = React.createContext({});

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [xsrf, setXSRF] = useState(null);
    const [error, setError] = useState(null);
    const [activeRoom, setActiveRoom] = useState({
        id: 0, name: '', image: ''
    });
    const [loading, setLoading] = useState(false);
    const [token, setToken] = useState(null);

    const getToken = async () => {
        if (Platform.OS === 'web') {
            const params = new URLSearchParams(window.location.search);
            return params.get('token');
        } else {
            return await SecureStore.getItemAsync('userToken');
        }
    };

    const getUserDetails = async () => {
        try {
            const authToken = await getToken();
            setToken(authToken);
            const response = await fetch(api_url + 'user', {
                headers: {
                    'Authorization': `Bearer ${authToken}`,
                    'Accept': 'application/json'
                },
            });
            const res = await response.json();
            if (res?.status === 'success') {
                setUser(res.profile);
                // Handle XSRF token for web, if necessary
                if (Platform.OS === 'web') {
                    const xsrfToken = document.getElementById('main')?.dataset.token;
                    setXSRF(xsrfToken);
                }
            }
        } catch (err) {
            setError(err);
            console.log(err);
        }
    };

    useEffect(() => {
        getUserDetails();
    }, []);

    return (
        <AuthContext.Provider
            value={{
                loading,
                setLoading,
                user,
                setUser,
                error,
                token,
                xsrf,
                activeRoom,
                setActiveRoom
            }}>
            {children}
        </AuthContext.Provider>
    );
};
