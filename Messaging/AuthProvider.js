import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const api_url = 'http://127.0.0.1:8000/api/';
axios.defaults.baseURL = api_url;

export const AuthContext = React.createContext({});

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [xsrf, setXSRF] = useState(null);
    const [error, setError] = useState(null);
    const [activeRoom, setActiveRoom] = useState({ id: 0, name: '', image: '' });
    const [loading, setLoading] = useState(false);
    const [token, setToken] = useState(null); // To store the token from AsyncStorage

    // Function to get token from AsyncStorage
    const getTokenFromStorage = async () => {
        try {
            const storedToken = await AsyncStorage.getItem('token');
            setToken(storedToken);
        } catch (err) {
            console.log('Error getting token from storage:', err);
        }
    };

    // Fetch user details from the API
    const getUserDetails = async () => {
        if (!token) return; // Do nothing if the token is not yet available

        try {
            const response = await axios.get('user', {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Accept': 'application/json'
                }
            });

            if (response.data?.status === 'success') {
                setUser(response.data.profile);
                // Set XSRF token manually if needed (handle based on your backend)
                setXSRF(response.headers['x-xsrf-token']);
            }
        } catch (err) {
            setError(err.message);
            console.log('Error fetching user details:', err);
        }
    };

    useEffect(() => {
        // Fetch the token from AsyncStorage and get user details
        getTokenFromStorage();
    }, []);

    useEffect(() => {
        // Fetch user details once token is retrieved
        if (token) {
            getUserDetails();
        }
    }, [token]);

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
                setActiveRoom,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};
