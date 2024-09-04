import React from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';

const Message = ({ userId, message }) => {
    const isCurrentUser = userId === message.user_id;

    return (
        <View style={[styles.container, isCurrentUser ? styles.currentUser : styles.otherUser]}>
            <View style={styles.messageContent}>
                <Text style={[styles.time, isCurrentUser && styles.timeCurrentUser]}>
                    {message.time}
                </Text>
                <Text style={styles.name}>{message.name}</Text>
                <View style={[styles.alert, isCurrentUser ? styles.alertPrimary : styles.alertSecondary]}>
                    <Text style={styles.messageText}>{message.text}</Text>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        marginVertical: 5,
    },
    currentUser: {
        justifyContent: 'flex-end',
    },
    otherUser: {
        justifyContent: 'flex-start',
    },
    messageContent: {
        maxWidth: '75%',
    },
    time: {
        fontSize: 12,
        color: 'grey',
        marginBottom: 2,
    },
    timeCurrentUser: {
        textAlign: 'right',
    },
    name: {
        fontSize: 14,
        color: 'grey',
    },
    alert: {
        padding: 10,
        borderRadius: 5,
    },
    alertPrimary: {
        backgroundColor: '#007bff',
    },
    alertSecondary: {
        backgroundColor: '#e9ecef',
    },
    messageText: {
        color: '#fff',
    },
});

export default Message;
