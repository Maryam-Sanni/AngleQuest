import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useNavigate } from 'react-router-dom';
import { useFonts } from 'expo-font';
import { useTranslation } from 'react-i18next';

const Settings = ({ onClose }) => {
    const navigate = useNavigate();

    // Track hover state for each section individually
    const [hoveredSection, setHoveredSection] = useState(null);

    const goToAccountSettings = () => {
        navigate('/account-settings');
        onClose();
      };

      const goToResetPassword = () => {
        navigate('/reset-password');
        onClose();
      };

      const goToNotificationSettings = () => {
        navigate('/notification-settings');
        onClose();
      };

      const goToBillingsAndPayment = () => {
        navigate('/billings-payment');
        onClose();
      };

    const [fontsLoaded] = useFonts({
        'Roboto-Light': require("../assets/fonts/Roboto-Light.ttf"),
    });

    const { t } = useTranslation();

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                <Text style={styles.closeButtonText}>✕</Text>
            </TouchableOpacity>

            <TouchableOpacity
                onPress={goToAccountSettings}
                style={styles.accountSettings}
                onMouseEnter={() => setHoveredSection('accountSettings')} 
                onMouseLeave={() => setHoveredSection(null)}
            >
                <View style={styles.accountSettingsContent}>
                    <Image
                        source={{ uri: 'https://img.icons8.com/?size=100&id=7odR6nBarM9M&format=png&color=000000' }}
                        style={[styles.icon, hoveredSection === 'accountSettings' && { tintColor: 'green' }]} // Apply green color on hover
                    />
                    <Text style={[styles.accountSettingsText, hoveredSection === 'accountSettings' && { color: 'green' }]}>
                        {t("Account Settings")}
                    </Text>
                </View>
            </TouchableOpacity>

            <TouchableOpacity
                onPress={goToNotificationSettings}
                style={styles.accountSettings}
                onMouseEnter={() => setHoveredSection('notificationSettings')} 
                onMouseLeave={() => setHoveredSection(null)}
            >
                <View style={styles.accountSettingsContent}>
                    <Image
                        source={{ uri: 'https://img.icons8.com/?size=100&id=82754&format=png&color=000000' }}
                        style={[styles.icon, hoveredSection === 'notificationSettings' && { tintColor: 'green' }]} // Apply green color on hover
                    />
                    <Text style={[styles.accountSettingsText, hoveredSection === 'notificationSettings' && { color: 'green' }]}>
                        {t("Notification Settings")}
                    </Text>
                </View>
            </TouchableOpacity>

            <TouchableOpacity
                onPress={goToResetPassword}
                style={styles.accountSettings}
                onMouseEnter={() => setHoveredSection('resetPassword')} 
                onMouseLeave={() => setHoveredSection(null)}
            >
                <View style={styles.accountSettingsContent}>
                    <Image
                        source={{ uri: 'https://img.icons8.com/?size=100&id=23206&format=png&color=000000' }}
                        style={[styles.icon, hoveredSection === 'resetPassword' && { tintColor: 'green' }]} // Apply green color on hover
                    />
                    <Text style={[styles.accountSettingsText, hoveredSection === 'resetPassword' && { color: 'green' }]}>
                        {t("Password")}
                    </Text>
                </View>
            </TouchableOpacity>

            <TouchableOpacity
                onPress={goToBillingsAndPayment}
                style={styles.accountSettings}
                onMouseEnter={() => setHoveredSection('billingsAndPayment')} 
                onMouseLeave={() => setHoveredSection(null)}
            >
                <View style={styles.accountSettingsContent}>
                    <Image
                        source={{ uri: 'https://img.icons8.com/?size=100&id=wdfmkgweCGDk&format=png&color=000000' }}
                        style={[styles.icon, hoveredSection === 'billingsAndPayment' && { tintColor: 'green' }]} // Apply green color on hover
                    />
                    <Text style={[styles.accountSettingsText, hoveredSection === 'billingsAndPayment' && { color: 'green' }]}>
                        {t("Earnings & Withdrawal")}
                    </Text>
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
        position: 'relative', 
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
        color: 'black',
        fontWeight: 'bold',
    },
    accountSettings: {
        marginTop: 20,
    },
    accountSettingsContent: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    icon: {
        width: 25,
        height: 25,
        marginRight: 10,
    },
    accountSettingsText: {
        fontSize: 16,
        color: 'black',
        fontWeight: '500',
    },
});

export default Settings;
