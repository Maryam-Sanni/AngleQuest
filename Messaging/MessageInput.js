import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert } from 'react-native';
import axios from 'axios';

const MessageInput = ({ rootUrl }) => {
    const [message, setMessage] = useState("");

    const messageRequest = async (text) => {
        try {
            await axios.post(`${rootUrl}/message`, { text });
        } catch (err) {
            console.log(err.message);
        }
    };

    const sendMessage = () => {
        if (message.trim() === "") {
            Alert.alert("Please enter a message!");
            return;
        }

        messageRequest(message);
        setMessage("");
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                onChangeText={setMessage}
                autoCompleteType="off"
                placeholder="Message..."
                value={message}
            />
            <Button
                onPress={sendMessage}
                title="Send"
                color="#007bff"
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
    },
    input: {
        flex: 1,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        padding: 10,
        marginRight: 10,
    },
});

export default MessageInput;
