import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Message = ({ userId, message }) => {
    return (
        <View
            style={[
                styles.container,
                userId === message.user_id ? styles.alignEnd : styles.alignStart
            ]}
        >
            <View style={styles.messageContainer}>
                <Text style={styles.time}>{message.time}</Text>
                <Text style={styles.name}>{message.name}</Text>
                <View
                    style={[
                        styles.messageBox,
                        userId === message.user_id ? styles.messageBoxPrimary : styles.messageBoxSecondary
                    ]}
                >
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
    alignEnd: {
        justifyContent: 'flex-end',
    },
    alignStart: {
        justifyContent: 'flex-start',
    },
    messageContainer: {
        maxWidth: '80%',
        paddingHorizontal: 10,
    },
    time: {
        fontSize: 12,
        color: 'gray',
        textAlign: 'right',
    },
    name: {
        fontSize: 14,
        color: 'gray',
    },
    messageBox: {
        padding: 10,
        borderRadius: 5,
    },
    messageBoxPrimary: {
        backgroundColor: '#007bff',
    },
    messageBoxSecondary: {
        backgroundColor: '#f8f9fa',
    },
    messageText: {
        color: 'white',  // Change to 'black' if using secondary background color
    }
});

export default Message;
