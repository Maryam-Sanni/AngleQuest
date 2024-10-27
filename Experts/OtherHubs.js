import React, { useState, useEffect } from 'react';
import { useFonts } from 'expo-font';
import { useTranslation } from 'react-i18next';
import { View, Text, StyleSheet, TouchableOpacity, Image, ActivityIndicator, ScrollView } from 'react-native';
import axios from 'axios';

function MyComponent({ onClose }) {
    const [clickedItem, setClickedItem] = useState(null);
    const [hubs, setHubs] = useState([]);
    const [loading, setLoading] = useState(true);

    const apiUrl = process.env.REACT_APP_API_URL;
    
    const [fontsLoaded] = useFonts({
        'Roboto-Light': require('../assets/fonts/Roboto-Light.ttf'),
    });

    const { t } = useTranslation();

    useEffect(() => {
        const fetchHubs = async () => {
            try {
                const response = await axios.get(`${apiUrl}/api/expert/hubs/get`);
                setHubs(response.data.hubs);
            } catch (error) {
                console.error("Failed to fetch hubs:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchHubs();
    }, []);

    const handleItemClick = (id) => {
        setClickedItem(clickedItem === id ? null : id);
    };

    if (!fontsLoaded) {
        return <ActivityIndicator size="large" color="#6E9FDF" />;
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
                <Text style={styles.closeText}>✕</Text>
            </TouchableOpacity>
            <Text style={styles.title}>{t("My Training Hubs")}</Text>
            
            {loading ? (
                <ActivityIndicator size="large" color="#6E9FDF" />
            ) : (
                <ScrollView contentContainerStyle={styles.hubsContainer}>
                    {hubs.map((hub) => (
                        <TouchableOpacity key={hub.id} onPress={() => handleItemClick(hub.id)}>
                            <View style={[styles.hubCard, clickedItem === hub.id && styles.hubCardSelected]}>
                                <Image
                                    source={{ uri: 'https://cdn.builder.io/api/v1/image/assets/TEMP/925cfbb55e82458868f5e0c8cafbdc90d47bec0907e65b77fb918a7ac0dbcfe0?apiKey=7b9918e68d9b487793009b3aea5b1a32&' }}
                                    style={styles.icon}
                                />
                                <View style={styles.hubInfo}>
                                    <Text style={styles.hubName}>{hub.name}</Text>
                                    <Text style={styles.hubDetail}>{t(hub.type)} • {hub.members} {t("Members")}</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            )}
            <Text style={styles.note}>{t("Experts can create a maximum of 5 Hubs")}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 40,
        backgroundColor: "white",
        alignItems: 'center',
        marginTop: 100,
        width: 500,
        height: 500
    },
    closeButton: {
        position: 'absolute',
        top: 30,
        right: 20,
    },
    closeText: {
        fontSize: 18,
        color: 'black',
        fontWeight: 'bold',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'black',
        marginBottom: 15,
    },
    hubsContainer: {
        width: '70%',
        alignItems: 'center',
    },
    hubCard: {
        flexDirection: 'row',
        backgroundColor: '#FFFFFF',
        paddingVertical: 10,
        paddingHorizontal: 15,
        marginVertical: 6,
        width: '90%',
        borderRadius: 8,
        alignItems: 'center',
        elevation: 2,
    },
    hubCardSelected: {
        backgroundColor: '#E3F2FD',
    },
    icon: {
        width: 24,
        height: 24,
        marginRight: 10,
    },
    hubInfo: {
        flex: 1,
    },
    hubName: {
        fontSize: 14,
        fontWeight: '600',
        color: '#333',
        fontFamily: 'Roboto-Light',
    },
    hubDetail: {
        fontSize: 12,
        color: '#666',
        fontStyle: 'italic',
        fontFamily: 'Roboto-Light',
    },
    note: {
        fontSize: 12,
        color: '#555',
        fontWeight: '500',
        fontStyle: 'italic',
        marginTop: 15,
        textAlign: 'center',
    },
});

export default MyComponent;
