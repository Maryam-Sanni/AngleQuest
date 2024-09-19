import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const apiUrl = process.env.REACT_APP_API_URL;

export const api_url = `${apiUrl}/api/`;
axios.defaults.baseURL = api_url;

export const AuthContext = React.createContext({});

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [xsrf, setXSRF] = useState(null);
    const [error, setError] = useState(null);
    const [activeRoom, setActiveRoom] = useState({ id: 0, name: '', image: '' });
    const [loading, setLoading] = useState(false);
    const [token, setToken] = useState(null);
    const [chatDetails, setChatDetails] = useState({
        roomId: null,
        personName: null,
        personAvatar: null,
    });

    const setChatInfo = async (roomId, personName, personAvatar) => {
        const details = { roomId, personName, personAvatar };
        setChatDetails(details);
        try {
            await AsyncStorage.setItem('chatDetails', JSON.stringify(details));
        } catch (err) {
            console.log('Error saving chat details to storage:', err);
        }
    };

    const loadChatDetails = async () => {
        try {
            const storedDetails = await AsyncStorage.getItem('chatDetails');
            if (storedDetails) {
                setChatDetails(JSON.parse(storedDetails));
            }
        } catch (err) {
            console.log('Error loading chat details from storage:', err);
        }
    };

    const getTokenFromStorage = async () => {
        try {
            const storedToken = await AsyncStorage.getItem('token');
            setToken(storedToken);
        } catch (err) {
            console.log('Error getting token from storage:', err);
        }
    };

    const getUserDetails = async () => {
        if (!token) return;

        try {
            const response = await axios.get('user', {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Accept': 'application/json'
                }
            });

            if (response.data?.status === 'success') {
                setUser(response.data.profile);
                setXSRF(response.headers['x-xsrf-token']);
            }
        } catch (err) {
            setError(err.message);
            console.log('Error fetching user details:', err);
        }
    };

    useEffect(() => {
        getTokenFromStorage();
        loadChatDetails();
    }, []);

    useEffect(() => {
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
                chatDetails,
                setChatInfo,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};
