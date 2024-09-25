import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useNavigate } from 'react-router-dom';
import { useFonts } from 'expo-font';
import { useTranslation } from 'react-i18next';

const Settings = ({ onClose }) => {
       const navigate = useNavigate();

    const goToAccountSettings = () => {
        navigate('/account-setup');
        onClose();
      };
    
      const goToResetPassword = () => {
        navigate('/assword');
        onClose();
      };
    
      const goToNotificationSettings = () => {
        navigate('/notification-setup');
        onClose();
      };
    
      const goToBillingsAndPayment = () => {
        navigate('/earnings');
        onClose();
      };
    
      const [fontsLoaded]=useFonts({
        'Roboto-Light':require("../assets/fonts/Roboto-Light.ttf"),
      })
const {t}=useTranslation()
    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                <Text style={styles.closeButtonText}>✕</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={goToAccountSettings} style={styles.accountSettings}>
                <View style={styles.accountSettingsContent}>
                    <Image
                        source={{ uri: 'https://cdn.builder.io/api/v1/image/assets/TEMP/9b7a3a6d0178d9e4654db03454de5de060a67e4b91a6fe4d31a059874d384eb2?apiKey=7b9918e68d9b487793009b3aea5b1a32&' }}
                        style={styles.icon}
                    />
                    <Text style={styles.accountSettingsText}>{t("Account Settings")}</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={goToNotificationSettings} style={styles.accountSettings}>
                <View style={styles.accountSettingsContent}>
                    <Image
                        source={{ uri: 'https://cdn.builder.io/api/v1/image/assets/TEMP/17d8150403f80380e2928ef1b9db06fb8c60a50c487a2172f5699a0eb5f88b6d?apiKey=7b9918e68d9b487793009b3aea5b1a32&' }}
                        style={styles.icon}
                    />
                    <Text style={styles.accountSettingsText}>{t("Notification Settings")}</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={goToResetPassword} style={styles.accountSettings}>
                <View style={styles.accountSettingsContent}>
                    <Image
                        source={{ uri: 'https://cdn.builder.io/api/v1/image/assets/TEMP/d2d638a18c02206d9cb09092e754e29b9e7fcec759c21615164f9508890194ba?apiKey=7b9918e68d9b487793009b3aea5b1a32&' }}
                        style={styles.icon}
                    />
                    <Text style={styles.accountSettingsText}>{t("Password")}</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={goToBillingsAndPayment} style={styles.accountSettings}>
                <View style={styles.accountSettingsContent}>
                    <Image
                        source={{ uri: 'https://cdn.builder.io/api/v1/image/assets/TEMP/d71eb11f8b49b8dc89ac885de39244967a9d43ca35a783ff2b5c8a9c872d336c?apiKey=7b9918e68d9b487793009b3aea5b1a32&' }}
                        style={styles.icon}
                    />
                    <Text style={styles.accountSettingsText}>{t("Billings & Payment")}</Text>
                </View>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#ddd',
        position: 'relative', // Ensures the close button is positioned correctly
    },
    closeButton: {
        position: 'absolute',
        top: 10,
        right: 10,
        padding: 5,
        zIndex: 1,
    },
    closeButtonText: {
        fontSize: 18,
        color: '#3F5637',
        fontWeight: 'bold',
        fontFamily:"Roboto-Light"
    },
    accountSettings: {
        marginTop: 20,
    },
    accountSettingsContent: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    icon: {
        width: 15,
        height: 15,
        marginRight: 5,
    },
    accountSettingsText: {
        fontSize: 14,
        color: '#666',
        fontWeight: '500',
        fontFamily:"Roboto-Light"
    },
});

export default Settings;
