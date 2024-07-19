import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Image, ScrollView, Picker, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { useTranslation } from 'react-i18next';
import axios from 'axios';

function MyComponent({ onClose }) {
  const navigation = useNavigation();
  const [selectedType, setSelectedType] = useState('Personal');
  const [title, setTitle] = useState('');
  const [role, setRole] = useState('');
  const [resultDescription, setResultDescription] = useState('');
  const [howToAchieve, setHowToAchieve] = useState('');
  const [needs, setNeeds] = useState('');
  const [reviewFrequency, setReviewFrequency] = useState('Weekly');
  const [startingLevel, setStartingLevel] = useState('Beginner');
  const [targetLevel, setTargetLevel] = useState('Beginner');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [status, setStatus] = useState('Active');
  const [fontsLoaded] = useFonts({
    'Roboto-Light': require('../assets/fonts/Roboto-Light.ttf'),
  });
  const { t } = useTranslation();

  const handleSubmit = async () => {
    try {
      const response = await axios.post('https://crispy-spoon-xg65jq45g6r3prpg-8000.app.github.dev/api/jobseeker/create-jobseeker-growth-plan', {
        type: selectedType,
        title,
        role,
        result_description: resultDescription,
        how_to_achieve: howToAchieve,
        needs: needs,
        review_frequency: reviewFrequency,
        starting_level: startingLevel,
        target_level: targetLevel,
        start_date: startDate,
        end_date: endDate,
        status,
        coach: 'Joop Melcher', // Static value, adjust if needed
      });

      console.log('Success:', response.data);
      alert('Success', 'Your plan objective has been submitted.');
      navigation.navigate('Growth Offer');
      onClose();
    } catch (error) {
      console.error('Error:', error);
      alert('Error', 'There was a problem submitting your plan objective.');
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#F8F8F8', alignItems: 'center', marginTop: 40 }}>
      <ScrollView contentContainerStyle={{ flexGrow: 1, maxHeight: 500 }}>
        <View style={styles.greenBox}>
          <View style={styles.header}>
            <Image
              source={{ uri: 'https://cdn.builder.io/api/v1/image/assets/TEMP/1f2d38e99b0016f2bd167d2cfd38ff0d43c9f94a93c84b4e04a02d32658fb401?apiKey=7b9918e68d9b487793009b3aea5b1a32&' }}
              style={styles.logo}
            />
            <Text style={styles.headerText}>{t('Create New Growth Plan Objective')}</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Text style={{ fontSize: 18, color: '#3F5637', fontWeight: 'bold', fontFamily: 'Roboto-Light' }}>✕</Text>
            </TouchableOpacity>
          </View>
          <Text style={{ fontSize: 15, color: 'black', fontWeight: '500', marginTop: 20, marginLeft: 50, fontFamily: 'Roboto-Light' }}>
            {t('Development Objectives')}
          </Text>
          <View style={styles.container}>
            {/* Form fields */}
            <View style={styles.row}>
              <View style={styles.cell}>
                <Text style={{ fontFamily: 'Roboto-Light' }}>{t('Type')}</Text>
              </View>
              <View style={styles.cell}>
                <Picker
                  selectedValue={selectedType}
                  style={styles.picker}
                  onValueChange={(itemValue) => setSelectedType(itemValue)}
                >
                  <Picker.Item label={t('Personal')} value="Personal" />
                  <Picker.Item label={t('Team')} value="Team" />
                  <Picker.Item label={t('Organization')} value="Organization" />
                </Picker>
              </View>
            </View>
            <View style={styles.row}>
              <View style={styles.cell}>
                <Text style={{ fontFamily: 'Roboto-Light' }}>{t('Title')}</Text>
              </View>
              <View style={styles.cell}>
                <TextInput
                  placeholder={t('Become SAP FI Medior expert in 6 months')}
                  placeholderTextColor="grey"
                  style={styles.input}
                  value={title}
                  onChangeText={setTitle}
                />
              </View>
            </View>
            <View style={styles.row}>
              <View style={styles.cell}>
                <Text style={{ fontFamily: 'Roboto-Light' }}>{t('Role')}</Text>
              </View>
              <View style={styles.cell}>
                <TextInput
                  placeholder="SAP FI"
                  placeholderTextColor="grey"
                  style={styles.input}
                  value={role}
                  onChangeText={setRole}
                />
              </View>
            </View>
            <View style={styles.row}>
              <View style={styles.cell}>
                <Text style={{ fontFamily: 'Roboto-Light' }}>{t('Result description')}</Text>
              </View>
              <View style={styles.cell}>
                <TextInput
                  placeholder={t('Example: To be able to find my way around SAP fi...')}
                  placeholderTextColor="grey"
                  multiline
                  style={[styles.input, { height: 50 }]}
                  value={resultDescription}
                  onChangeText={setResultDescription}
                />
              </View>
            </View>
            <View style={styles.row}>
              <View style={styles.cell}>
                <Text style={{ fontFamily: 'Roboto-Light' }}>{t('How to achieve')}</Text>
              </View>
              <View style={styles.cell}>
                <TextInput
                  placeholder={t('Example: To be taught how to troubleshoot, find T\'codes...')}
                  placeholderTextColor="grey"
                  multiline
                  style={[styles.input, { height: 50 }]}
                  value={howToAchieve}
                  onChangeText={setHowToAchieve}
                />
              </View>
            </View>
            <View style={styles.row}>
              <View style={styles.cell}>
                <Text style={{ fontFamily: 'Roboto-Light' }}>{t('What do you need to achieve the objective?')}</Text>
              </View>
              <View style={styles.cell}>
                <TextInput
                  placeholder={t('Continous training, practice and support')}
                  placeholderTextColor="grey"
                  multiline
                  style={[styles.input, { height: 50 }]}
                  value={needs}
                  onChangeText={setNeeds}
                />
              </View>
            </View>
            <View style={styles.row}>
              <View style={styles.cell}>
                <Text style={{ fontFamily: 'Roboto-Light' }}>{t('How often do you want to review with your coach?')}</Text>
              </View>
              <View style={styles.cell}>
                <Picker
                  selectedValue={reviewFrequency}
                  style={styles.picker}
                  onValueChange={(itemValue) => setReviewFrequency(itemValue)}
                >
                  <Picker.Item label={t('Weekly')} value="Weekly" />
                  <Picker.Item label={t('Monthly')} value="Monthly" />
                  <Picker.Item label={t('Quarterly')} value="Quarterly" />
                  <Picker.Item label={t('Biannually')} value="Biannually" />
                  <Picker.Item label={t('Annually')} value="Annually" />
                </Picker>
              </View>
            </View>
            <View style={styles.row}>
              <View style={styles.cell}>
                <Text style={{ fontFamily: 'Roboto-Light' }}>{t('Starting Level')}</Text>
              </View>
              <View style={styles.cell}>
                <Picker
                  selectedValue={startingLevel}
                  style={styles.picker}
                  onValueChange={(itemValue) => setStartingLevel(itemValue)}
                >
                  <Picker.Item label={t('Beginner')} value="Beginner" />
                  <Picker.Item label={t('Junior')} value="Junior" />
                  <Picker.Item label={t('Medior')} value="Medior" />
                  <Picker.Item label={t('Senior')} value="Senior" />
                  <Picker.Item label={t('Professional')} value="Professional" />
                </Picker>
              </View>
            </View>
            <View style={styles.row}>
              <View style={styles.cell}>
                <Text style={{ fontFamily: 'Roboto-Light' }}>{t('Target Level')}</Text>
              </View>
              <View style={styles.cell}>
                <Picker
                  selectedValue={targetLevel}
                  style={styles.picker}
                  onValueChange={(itemValue) => setTargetLevel(itemValue)}
                >
                  <Picker.Item label={t('Beginner')} value="Beginner" />
                  <Picker.Item label={t('Junior')} value="Junior" />
                  <Picker.Item label={t('Medior')} value="Medior" />
                  <Picker.Item label={t('Senior')} value="Senior" />
                  <Picker.Item label={t('Professional')} value="Professional" />
                </Picker>
              </View>
            </View>
            <View style={styles.row}>
              <View style={styles.cell}>
                <Text style={{ fontFamily: 'Roboto-Light' }}>{t('Start Date')}</Text>
              </View>
              <View style={styles.cell}>
                <TextInput
                  placeholder="1/April/2024"
                  placeholderTextColor="grey"
                  style={styles.input}
                  value={startDate}
                  onChangeText={setStartDate}
                />
              </View>
            </View>
            <View style={styles.row}>
              <View style={styles.cell}>
                <Text style={{ fontFamily: 'Roboto-Light' }}>{t('End Date')}</Text>
              </View>
              <View style={styles.cell}>
                <TextInput
                  placeholder="20/Jul/2024"
                  placeholderTextColor="grey"
                  style={styles.input}
                  value={endDate}
                  onChangeText={setEndDate}
                />
              </View>
            </View>
            <View style={styles.row}>
              <View style={styles.cell}>
                <Text style={{ fontFamily: 'Roboto-Light' }}>{t('Status')}</Text>
              </View>
              <View style={styles.cell}>
                <Picker
                  selectedValue={status}
                  style={styles.picker}
                  onValueChange={(itemValue) => setStatus(itemValue)}
                >
                  <Picker.Item label={t('Active')} value="Active" />
                  <Picker.Item label={t('Review')} value="Review" />
                  <Picker.Item label={t('Replan')} value="Replan" />
                  <Picker.Item label={t('Completed')} value="Completed" />
                </Picker>
              </View>
            </View>
            <View style={styles.row}>
              <View style={styles.cell}>
                <Text style={{ fontFamily: 'Roboto-Light' }}>{t('Coach')}</Text>
              </View>
              <View style={styles.cell}>
                <Text style={{ color: 'grey', fontFamily: 'Roboto-Light' }}>Joop Melcher</Text>
              </View>
            </View>
            <View style={styles.row}>
              <View style={styles.cell}>
                <Text style={{ fontFamily: 'Roboto-Light' }}>{t('Feedbacks/remarks (from Coach)')}</Text>
              </View>
              <View style={styles.cell}>
                <Text style={{ color: 'grey', fontFamily: 'Roboto-Light' }}>{t('Read only field Jobseeker')}</Text>
              </View>
            </View>
          </View>
          <TouchableOpacity onPress={handleSubmit} style={styles.buttonplus}>
            <Text style={styles.buttonTextplus}>{t('Next')}</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    borderWidth: 1,
    borderColor: '#CCC',
    marginRight: 70,
    marginTop: 20,
    marginLeft: 50,
  },
  greenBox: {
    width: 920,
    height: '100%',
    backgroundColor: '#F8F8F8',
  },
  row: {
    flexDirection: 'row',
  },
  cell: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#CCC',
    padding: 5,
  },
  picker: {
    height: 20,
    width: '100%',
    backgroundColor: '#F8F8F8',
    borderColor: 'black',
    borderWidth: 1,
    color: 'grey',
    fontSize: 14,
  },
  buttonplus: {
    backgroundColor: 'coral',
    borderRadius: 5,
    padding: 5,
    marginLeft: 750,
    width: 100,
    paddingHorizontal: 20,
    marginTop: 10,
  },
  buttonTextplus: {
    color: 'white',
    fontSize: 14,
    textAlign: 'center',
    fontFamily: 'Roboto-Light',
  },
  input: {
    borderColor: 'black',
    borderWidth: 1,
    padding: 5,
    borderRadius: 5,
    fontSize: 14,
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
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#3F5637',
    fontFamily: 'Roboto-Light',
  },
});

export default MyComponent;
