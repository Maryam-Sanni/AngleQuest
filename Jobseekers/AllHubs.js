import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    ScrollView,
    StyleSheet,
    Image,
    Switch,
    Linking,
    TouchableOpacity,
    Modal,
    ImageBackground,
} from "react-native";
import Topbar from "../components/topbar";
import Sidebar from "../components/sidebar";
import PastSessions from "../components/PastSessions";
import HubsAssignments from "../components/HubsAssignments";
import OpenModal from "../Jobseekers/Pickyourhub";
import { useNavigate } from 'react-router-dom';
import { useFonts } from "expo-font";
import { useTranslation } from "react-i18next";
import AsyncStorage from "@react-native-async-storage/async-storage";

function MyComponent() {
    const navigate = useNavigate();
    const [modalVisible, setModalVisible] = useState(false);
    const [hubs, setHubs] = useState([]);
    const [selectedHub, setSelectedHub] = useState(null);
    const [isAttending, setIsAttending] = useState(false);

     const apiUrl = process.env.REACT_APP_API_URL;
    
    const toggleAttendance = () =>
        setIsAttending((previousState) => !previousState);

    const handleOpenPress = () => {
        setModalVisible(true);
    };

    const handleCloseModal = () => {
        setModalVisible(false);
    };

    const handlejoinPress = () => {
        Linking.openURL("https://meet.anglequest.com");
    };

    useEffect(() => {
        const fetchHubs = async () => {
            const token = await AsyncStorage.getItem('token');
            if (!token) {
                console.error('Token not found');
                return;
            }

            try {
                const response = await fetch(`${apiUrl}/api/jobseeker/get-all-jobseeker-hubs`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                const data = await response.json();
                if (data.status === 'success' && data.AllJoinedHubs.length > 0) {
                    setHubs(data.AllJoinedHubs);
                    setSelectedHub(data.AllJoinedHubs[0]);
                } else {
                    setHubs([]);
                    setSelectedHub(null);
                    // Redirect to Coaching Hubs page if no hubs are available
                    navigate('/coaching-hub-new'); // Make sure 'CoachingHubsPage' matches your route name
                }
            } catch (error) {
                console.error('Error fetching hubs:', error);
                setHubs([]);
                setSelectedHub(null);
                // Redirect to Coaching Hubs page on error as well
                navigate('/coaching-hub-new'); // Make sure 'CoachingHubsPage' matches your route name
            }
        };

        fetchHubs();
    }, [navigate]);

    const [fontsLoaded] = useFonts({
        "Roboto-Light": require("../assets/fonts/Roboto-Light.ttf"),
    });
    const { t } = useTranslation();

    if (!selectedHub) {
        return null; // Or you can navigate to another screen here if necessary
    }

    return (
        <ImageBackground
            source={require("../assets/backgroundimg2.png")}
            style={{ height: "100%", width: "100%", flex: 1 }}
        >
            <View style={{ flex: 1 }}>
                <Topbar />
                <View style={{ flexDirection: "row", flex: 1 }}>
                    <Sidebar />
                    <ScrollView
                        contentContainerStyle={{ flexGrow: 1, maxHeight: 500 }}
                    >
                        <View style={{ marginLeft: 270 }}>
                            <View style={styles.header}>
                                <Image
                                    source={{
                                        uri: "https://cdn.builder.io/api/v1/image/assets/TEMP/925cfbb55e82458868f5e0c8cafbdc90d47bec0907e65b77fb918a7ac0dbcfe0?apiKey=7b9918e68d9b487793009b3aea5b1a32&",
                                    }}
                                    style={styles.image}
                                />
                                <Text
                                    style={{
                                        color: "#666",
                                        fontWeight: "600",
                                        marginLeft: 10,
                                        fontSize: 14,
                                        marginTop: 5,
                                        marginRight: 20,
                                    }}
                                >
                                    {t("All Joined Hubs")}:
                                </Text>
                                {hubs.map((hub, index) => {
                                    const isSelected =
                                        hub.id === selectedHub?.id;

                                    return (
                                        <TouchableOpacity
                                            key={hub.id}
                                            onPress={() => setSelectedHub(hub)}
                                        >
                                            <View
                                                style={[
                                                    styles.item,
                                                    isSelected
                                                        ? styles.selectedItem
                                                        : styles.unselectedItem,
                                                ]}
                                            >
                                                <Text
                                                    style={[
                                                        styles.hubText,
                                                        isSelected
                                                            ? styles.selectedText
                                                            : styles.unselectedText,
                                                    ]}
                                                >
                                                     {hub.coaching_hub_name || 'No hub yet'}
                                                </Text>
                                            </View>
                                        </TouchableOpacity>
                                    );
                                })}
                            </View>

                            <TouchableOpacity onPress={handleOpenPress}>
                                <View
                                    style={{
                                        justifyContent: "flex-start",
                                        paddingHorizontal: 10,
                                        paddingVertical: 10,
                                        borderRadius: 5,
                                        borderColor: "#f7fff4",
                                        backgroundColor:
                                            "rgba(211,249,216,0.3)",
                                        width: 150,
                                        alignItems: "center",
                                        marginTop: 20,
                                        marginLeft: 50,
                                        borderWidth: 1,
                                    }}
                                >
                                    <Text
                                        style={{
                                            fontSize: 13,
                                            color: "#f7fff4",
                                            alignText: "center",
                                            fontWeight: "bold",
                                            fontFamily: "Roboto-Light",
                                        }}
                                    >
                                        + {t("New")}
                                    </Text>
                                </View>
                            </TouchableOpacity>

                            <View style={styles.container}>
                                <View style={styles.box}>
                                    <View
                                        style={{
                                            justifyContent: "center",
                                            alignItems: "center",
                                        }}
                                    >
                                        <Text
                                            style={{
                                                fontSize: 18,
                                                color: "black",
                                                fontWeight: "bold",
                                            }}
                                        >
                                            {t("Next Meeting")}
                                        </Text>
                                        <Text
                                            style={{
                                                fontSize: 13,
                                                color: "grey",
                                                marginTop: 10,
                                                fontFamily: "Roboto-Light",
                                            }}
                                        >
                                            {selectedHub.meeting_day || 'No Hub Day'}s
                                        </Text>
                                        <Text
                                            style={{
                                                fontSize: 13,
                                                color: "grey",
                                                marginTop: 5,
                                                fontWeight: "500",
                                                fontFamily: "Roboto-Light",
                                            }}
                                        >
                                            {selectedHub.from || 'No Hub Yet'} - {" "}
                                            {selectedHub.to || 'No Hub Yet'}
                                        </Text>
                                        <TouchableOpacity
                                            style={{
                                                backgroundColor: "none",
                                                padding: 8,
                                                paddingHorizontal: 10,
                                                marginTop: 10,
                                                borderRadius: 5,
                                                marginLeft: 10,
                                                marginRight: 10,
                                                borderWidth: 2,
                                                borderColor: "#206C00",
                                            }}
                                            onPress={handlejoinPress}
                                        >
                                            <Text
                                                style={{
                                                    color: "#206C00",
                                                    textAlign: "center",
                                                    fontSize: 13,
                                                    fontWeight: "600",
                                                    fontFamily: "Roboto-Light",
                                                }}
                                            >
                                                {t("Join Now")}
                                            </Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>

                                <View style={styles.box}>
                                    <Text
                                        style={{
                                            fontSize: 14,
                                            color: "black",
                                            fontWeight: "bold",
                                            marginTop: 5,
                                            marginBottom: 10,
                                            fontFamily: "Roboto-Light",
                                        }}
                                    >
                                        {selectedHub.coaching_hub_name || 'No Hub Yet'}
                                    </Text>
                                    <Text
                                        style={{
                                            fontSize: 12,
                                            marginTop: 5,
                                            color: "black",
                                            fontFamily: "Roboto-Light",
                                        }}
                                    >
                                        {selectedHub.coaching_hub_description || 'No description available'}
                                    </Text>
                                </View>

                                <View style={styles.box}>
                                    <Text
                                        style={{
                                            fontSize: 18,
                                            color: "black",
                                            marginBottom: 10,
                                            fontWeight: "bold",
                                        }}
                                    >
                                        {t("Confirm Attendance")}
                                    </Text>
                                    <View style={styles.switchrow}>
                                        <Switch
                                            trackColor={{
                                                false: "#767577",
                                                true: "#63EC55",
                                            }}
                                            thumbColor={
                                                isAttending
                                                    ? "#206C00"
                                                    : "#f4f3f4"
                                            }
                                            ios_backgroundColor="#3e3e3e"
                                            onValueChange={toggleAttendance}
                                            value={isAttending}
                                        />
                                        <Text style={styles.switchLabel}>
                                            {isAttending
                                                ? t("Yes, I will attend")
                                                : t("No, I will not attend")}
                                        </Text>
                                        <Image
                                            source={require("../assets/teamicon.jpg")}
                                            style={styles.boximage}
                                        />
                                    </View>
                                </View>
                                <View style={styles.box}>
                                    <Text
                                        style={{
                                            fontSize: 14,
                                            color: "black",
                                            fontWeight: "bold",
                                            marginTop: 5,
                                            marginBottom: 5,
                                            fontFamily: "Roboto-Light",
                                        }}
                                    >
                                        {t("Coach")}
                                    </Text>
                                    <View style={{ flexDirection: "row" }}>
                                        <Text
                                            style={{
                                                fontSize: 18,
                                                fontWeight: "bold",
                                                marginTop: 5,
                                                color: "#206C00",
                                                fontFamily: "Roboto-Light",
                                            }}
                                        >
                                            {selectedHub.expert_name || 'No hub yet'}
                                        </Text>
                                    </View>
                                   
                                </View>
                            </View>

                            <Modal
                                animationType="slide"
                                transparent={true}
                                visible={modalVisible}
                                onRequestClose={handleCloseModal}
                            >
                                <View style={styles.modalContent}>
                                    <OpenModal
                                        onClose={() => handleCloseModal()}
                                    />
                                </View>
                            </Modal>
                            <PastSessions />
                           
                            <HubsAssignments />
                          
                        </View>
                    </ScrollView>
                </View>
            </View>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    header: {
        marginLeft: -60,
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "flex-start",
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: "rgba(225,225,212,0.3)",
        backgroundColor: "#f7fff4",
    },
    item: {
        marginBottom: 10, // space between items
    },
    selectedItem: {
        backgroundColor: "#135837",
        borderColor: "#135837",
        borderWidth: 2,
        borderRadius: 5,
        marginRight: 20,
    },
    unselectedItem: {
        backgroundColor: "#fff",
        borderColor: "#135837",
        borderWidth: 2,
        borderRadius: 5,
        marginRight: 20,
    },
    hubText: {
        padding: 5,
        paddingHorizontal: 15,
        fontFamily: "Roboto-Light",
    },
    selectedText: {
        color: "#fff", // white text
    },
    unselectedText: {
        color: "#206C00", // green text
    },
    hubName: {
        color: "#206C00",
        borderColor: "#63EC55",
        borderWidth: 2,
        padding: 5,
        paddingHorizontal: 15,
        borderRadius: 5,
        fontFamily: "Roboto-Light",
        fontSize: 16,
        marginLeft: 10,
        marginTop: 5,
    },
    newHubButton: {
        justifyContent: "flex-start",
        paddingHorizontal: 10,
        paddingVertical: 10,
        borderRadius: 5,
        borderColor: "#f7fff4",
        backgroundColor: "rgba(211,249,216,0.3)",
        width: 150,
        alignItems: "center",
        marginTop: 20,
        marginLeft: 50,
        borderWidth: 1,
    },
    newHubText: {
        fontSize: 13,
        color: "#f7fff4",
        textAlign: "center",
        fontWeight: "bold",
        fontFamily: "Roboto-Light",
    },
    container: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: 50,
        maxWidth: "90%",
        marginLeft: 50,
    },
    box: {
        backgroundColor: "#f7fff4",
        padding: 20,
        borderRadius: 20,
        alignItems: "center",
        justifyContent: "center",
        width: "22%",
        height: 150,
        borderWidth: 2,
        borderColor: "rgba(225,225,212,0.3)",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    nextMeetingTitle: {
        fontSize: 16,
        fontWeight: "bold",
        marginBottom: 10,
        color: "#206C00",
        fontFamily: "Roboto-Light",
    },
    meetingDetail: {
        fontSize: 14,
        color: "#206C00",
        fontFamily: "Roboto-Light",
    },
    joinButton: {
        marginTop: 10,
        backgroundColor: "#206C00",
        paddingVertical: 8,
        paddingHorizontal: 20,
        borderRadius: 5,
    },
    joinText: {
        color: "#f7fff4",
        fontSize: 14,
        fontWeight: "bold",
        fontFamily: "Roboto-Light",
    },
    hubDescriptionTitle: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#206C00",
        marginBottom: 10,
        fontFamily: "Roboto-Light",
    },
    hubDescription: {
        fontSize: 14,
        color: "#206C00",
        textAlign: "center",
        fontFamily: "Roboto-Light",
    },
    modalContent: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    confirmationTitle: {
        fontSize: 14,
        color: "black",
        fontWeight: "bold",
        fontFamily: "Roboto-Light",
    },
    attendanceConfirmation: {
        fontSize: 12,
        marginRight: 10,
        fontWeight: "600",
        fontFamily: "Roboto-Light",
    },
    boximage: {
        width: 30,
        height: 30,
        marginTop: -10,
        marginLeft: 10,
    },
    attendantTitle: {
        fontSize: 14,
        color: "black",
        fontWeight: "bold",
        marginTop: 10,
        fontFamily: "Roboto-Light",
    },
    confirmedCount: {
        fontSize: 16,
        marginRight: 10,
        fontWeight: "bold",
        color: "#206C00",
        fontFamily: "Roboto-Light",
    },
    unconfirmedTitle: {
        fontSize: 14,
        color: "black",
        fontWeight: "bold",
        marginTop: 10,
        fontFamily: "Roboto-Light",
    },
    unconfirmedCount: {
        fontSize: 16,
        fontWeight: "bold",
        color: "red",
        marginTop: 5,
        fontFamily: "Roboto-Light",
    },
    image: {
        width: 20,
        height: 20,
        marginTop: 5,
        tintColor: "#666",
        marginLeft: 100,
    },
    switchrow: {
        flexDirection: "row",
        marginTop: 10,
        alignItems: "center",
    },
    switchLabel: {
        fontSize: 14,
        fontWeight: "bold",
        marginLeft: 10,
        color: "#206C00",
        fontFamily: "Roboto-Light",
    },
});

export default MyComponent;