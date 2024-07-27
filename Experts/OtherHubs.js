import React, { useState } from 'react';
import { useFonts } from 'expo-font';
import { useTranslation } from 'react-i18next';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

function MyComponent({ onClose }) {
    const [clickedItem, setClickedItem] = useState(null);

    const handleItemClick = (item) => {
        setClickedItem(clickedItem === item ? null : item);
    };

    const [fontsLoaded] = useFonts({
        'Roboto-Light': require('../assets/fonts/Roboto-Light.ttf'),
    });

    const { t } = useTranslation();

    if (!fontsLoaded) {
        return null; // or some loading indicator
    }

    const hubs = [
        { id: 1, name: 'SAP FI', type: t("Public"), members: 108 },
        { id: 2, name: 'Microsoft Azure', type: t("Public"), members: 16 },
        { id: 3, name: 'Junior Power Point Development', type: t("Public"), members: 21 },
        { id: 4, name: 'Senior Power Point Development', type: t("Private"), members: 10 },
        { id: 5, name: 'Java Programming', type: t("Private"), members: 6 },
    ];

    return (
        <View style={{ flex: 1, backgroundColor: "#F8F8F8", alignItems: 'center', marginVertical: 100 }}>
            <View style={styles.greenBox}>
                <TouchableOpacity onPress={onClose}>
                    <Text style={styles.closeButton}>✕</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                    <View style={styles.row}>
                        <Image
                            source={{ uri: 'https://img.icons8.com/?size=100&id=74QM1bmauc2y&format=png&color=000000' }}
                            style={styles.icon}
                        />
                        <Text style={styles.hubTitle}>{t("My Hubs")}</Text>
                    </View>
                </TouchableOpacity>
                <View style={styles.separator} />
                {hubs.map((hub) => (
                    <TouchableOpacity key={hub.id} onPress={() => handleItemClick(hub.id)}>
                        <View style={styles.row}>
                            <Image
                                source={{ uri: 'https://cdn.builder.io/api/v1/image/assets/TEMP/925cfbb55e82458868f5e0c8cafbdc90d47bec0907e65b77fb918a7ac0dbcfe0?apiKey=7b9918e68d9b487793009b3aea5b1a32&' }}
                                style={styles.icon}
                            />
                            <Text style={[styles.hubName, clickedItem === hub.id && { color: 'coral' }]}>{hub.name}</Text>
                            <Text style={[styles.hubDetail, clickedItem === hub.id && { color: 'coral' }]}>- {hub.type}, {hub.members} {t("Members")}</Text>
                        </View>
                    </TouchableOpacity>
                ))}
                <Text style={styles.note}>{t("Experts can create a maximum of 5 Hubs")}</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    greenBox: {
        width: 460,
        backgroundColor: '#F8F8F8',
        padding: 20,
        borderRadius: 10,
    },
    closeButton: {
        fontSize: 18,
        color: 'grey',
        alignSelf: 'flex-end',
        fontWeight: 'bold',
        marginTop: 20,
        fontFamily: 'Roboto-Light',
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 10,
    },
    icon: {
        width: 18,
        height: 18,
        marginRight: 10,
    },
    hubTitle: {
        fontSize: 16,
        color: 'black',
        fontWeight: 'bold',
        fontFamily: 'Roboto-Light',
    },
    hubName: {
        fontSize: 16,
        color: '#666',
        fontWeight: 'bold',
        fontFamily: 'Roboto-Light',
    },
    hubDetail: {
        fontSize: 14,
        color: '#666',
        fontStyle: 'italic',
        fontFamily: 'Roboto-Light',
    },
    separator: {
        borderBottomWidth: 1,
        borderBottomColor: '#666',
        marginVertical: 15,
    },
    note: {
        fontSize: 14,
        color: 'black',
        fontWeight: '500',
        fontStyle: 'italic',
        marginTop: 20,
        fontFamily: 'Roboto-Light',
    },
});

export default MyComponent;
