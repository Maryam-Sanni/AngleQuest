import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import RadioForm from 'react-native-simple-radio-button';
import { useFonts } from 'expo-font';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';

function QuestionnaireModal({ onClose }) {
    const [mainModalVisible, setMainModalVisible] = useState(true);
    const [answers, setAnswers] = useState(Array(10).fill(null));
    const navigation = useNavigation();

    const handleRadioChange = (index, value) => {
        const newAnswers = [...answers];
        newAnswers[index] = value;
        setAnswers(newAnswers);
    };

    const gotoresult = () => {
        navigation.navigate('AI Result');
        onClose();
      };
    
    const [fontsLoaded] = useFonts({
        'Roboto-Light': require('../assets/fonts/Roboto-Light.ttf'),
    });
    const { t } = useTranslation();

    const questions = [
        t('I’ll conduct a personalized skill gap analysis, growth plan, timeline, and references to help you get started!'),
        t('I’ll conduct a personalized skill gap analysis, growthplan, timeline, and references to help you get started!'),
        t('I’ll conduct a personalized skill gap analysis, growthplan, timeline, and references to help you get started!'),
        t('I’ll conduct a personalized skill gap analysis, growthplan, timeline, and references to help you get started!'),
        t('I’ll conduct a personalized skill gap analysis, growthplan, timeline, and references to help you get started!'),
        t('I’ll conduct a personalized skill gap analysis, growthplan, timeline, and references to help you get started!'),
        t('I’ll conduct a personalized skill gap analysis, growthplan, timeline, and references to help you get started!'),
        t('I’ll conduct a personalized skill gap analysis, growthplan, timeline, and references to help you get started!'),
        t('I’ll conduct a personalized skill gap analysis, growthplan, timeline, and references to help you get started!'),
        t('I’ll conduct a personalized skill gap analysis, growthplan, timeline, and references to help you get started!'),
    ];

    const radio_props = [
        { label: t('Yes'), value: 0 },
        { label: t('No'), value: 1 },
    ];

    return (
        <View style={{ flex: 1, backgroundColor: '#F8F8F8', marginTop: 40 }}>
            <View style={styles.modalContent}>
                <View style={styles.header}>
                    <Image
                        source={{ uri: 'https://cdn.builder.io/api/v1/image/assets/TEMP/1f2d38e99b0016f2bd167d2cfd38ff0d43c9f94a93c84b4e04a02d32658fb401?apiKey=7b9918e68d9b487793009b3aea5b1a32&' }} // replace with your logo URL
                        style={styles.logo}
                    />
                    <Text style={styles.headerText}>{t('Questionnaire')}</Text>
                    <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                        <Text style={{ fontSize: 18, color: '#3F5637', fontWeight: 'bold', fontFamily: 'Roboto-Light' }}>
                            ✕
                        </Text>
                    </TouchableOpacity>
                </View>
                <ScrollView contentContainerStyle={styles.scrollViewContent}>
                    <View style={{ flexDirection: 'row'}}> 
                          <Image
                            source={require('../assets/AnglequestAI.png')}
                            style={styles.image}
                          />
                         <Text style={{ fontSize: 20, marginTop: 15, fontWeight: 'bold'}}>AngleQuest AI Gap Analysis Question Questionnaire</Text>
                    </View>
                    <View style={styles.rows}>
                    {questions.map((question, index) => (
                        <View key={index} style={styles.questionContainer}>
                            <Text style={styles.questionText}>{`${index + 1}. ${question}`}</Text>
                            <RadioForm
                                radio_props={radio_props}
                                initial={-1}
                                formHorizontal={true}
                                labelHorizontal={true}
                                buttonColor={'#000'}
                                selectedButtonColor={'#000'}
                                buttonSize={10} // Reduced size
                                labelStyle={styles.radioLabel} // Custom label style
                                animation={true}
                                onPress={(value) => handleRadioChange(index, value)}
                            />
                        </View>
                    ))}
                    </View>
               
                <View style={{ flexDirection: 'row', marginTop: 20 }}>
                    <TouchableOpacity onPress={gotoresult} style={styles.button}>
                        <Text style={styles.buttonText}>{t('Submit')}</Text>
                    </TouchableOpacity>
                </View>
                     </ScrollView>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    modalContent: {
        width: 1000,
        height: '100%',
        backgroundColor: '#F8F8F8',
    },
    closeButton: {
        position: 'absolute',
        top: 20,
        right: 20,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        backgroundColor: 'white',
        borderBottomWidth: 1,
        borderBottomColor: '#CCC',
        marginBottom: 20,
    },
    logo: {
        width: 40,
        height: 40,
        marginRight: 10,
    },
    image: {
        width: 100,
        height: 100,
    marginRight: 10,
        marginLeft: 20,
        marginTop: -10
      },
    headerText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#3F5637',
        fontFamily: 'Roboto-Light',
    },
    scrollViewContent: {
    
    },
    questionContainer: {
        flexDirection: 'row', // Align items in a row
        marginBottom: 20,
        marginLeft: 50,
        marginRight: 50
    },
    questionText: {
        fontSize: 14,
        color: 'black',
        marginRight: 20, // Added margin for spacing
        fontFamily: 'Roboto-Light',
    },
    radioLabel: {
        fontSize: 14, // Reduced font size for labels
        color: 'black',
        marginRight: 10, // Added margin for spacing
        fontFamily: 'Roboto-Light',
    },
    button: {
        backgroundColor: 'coral',
        borderRadius: 5,
        borderWidth: 1,
        borderColor: 'coral',
        padding: 10,
        width: 100,
        alignItems: 'center',
        marginLeft: 850,
        marginBottom: 50,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontFamily: 'Roboto-Light',
    },
     rows: {
        marginTop: 20,
        marginLeft: 50,
        marginRight: 50,
        padding: 20,
         marginBottom: 20,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 2,
        backgroundColor: '#F2F2F2',
        borderColor: '#63EC55'
      },
});

export default QuestionnaireModal;
