import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const RatingBoardModal = ({ isVisible, onConfirm, onCancel, expertName }) => {
  const [selectedRating, setSelectedRating] = useState(null);
  const { t } = useTranslation();
  const [coach, setCoach] = useState(' ');
  const [data, setData] = useState(null);
  const [token, setToken] = useState("");
  const [id, setId] = useState(null); // Add this line

  useEffect(() => {
    const fetchData = async () => {
      try {
        const retrievedData = await AsyncStorage.getItem('selectedGrowthPlan');
        const storedToken = await AsyncStorage.getItem('token');
        
        if (retrievedData) {
          const parsedData = JSON.parse(retrievedData);
          setData(parsedData);
          setId(parsedData.id); // Store the ID

           // Initialize state variables with retrieved data
          setCoach(parsedData.coach);
        } else {
          console.log('No data found in AsyncStorage.');
        }

        if (storedToken) {
              setToken(storedToken);
            } else {
              console.log('No token found in AsyncStorage.');
            }
          } catch (error) {
            console.error('Failed to retrieve data from AsyncStorage', error);
          }
        };

    fetchData();
  }, []);

  const handleRatingPress = (rating) => {
    setSelectedRating(rating);
  };

  const handleConfirm = async () => {
    if (selectedRating !== null && token) {
      try {
        const response = await axios.post(
          'https://recruitangle.com/api/jobseeker/rate-growth-plan',
          {
            rating: String(selectedRating),
            growth_plan_id: String(data?.id),
            jobseeker_id: data?.user_id
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        // Handle successful response if needed
        console.log('Rating submitted successfully', response.data);
        onConfirm(selectedRating);
      } catch (error) {
        console.error('Error submitting rating', error);
      }
    } else {
      console.log('Rating or token is missing');
    }
    onCancel();
  };

  return (
    <View style={styles.modalContainer}>
      <Text style={styles.headerText}>
        {t("How satisfied are you with the session with ")} <Text style={styles.headerText}>{data?.coach || ''}?</Text>
      </Text> 
      <View style={styles.ratingContainer}>
        {[...Array(10)].map((_, index) => (
          <TouchableOpacity
            key={index + 1}
            style={[
              styles.ratingButton,
              selectedRating === index + 1 && styles.ratingButtonSelected,
            ]}
            onPress={() => handleRatingPress(index + 1)}
          >
            <Text style={styles.ratingText}>{index + 1}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <View style={styles.labelContainer}>
        <Text style={styles.labelText}>{t("Very Dissatisfied")}</Text>
        <Text style={styles.labelText}>{t("Neutral")}</Text>
        <Text style={styles.labelText}>{t("Completely Satisfied")}</Text>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.buttonCancel} onPress={onCancel}>
          <Text style={{color: 'black'}}>{t("Cancel")}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleConfirm}>
          <Text style={styles.buttonText}>{t("Confirm")}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    alignSelf: 'center',
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    width: 700,
    height: 300,
  },
  headerText: {
    fontSize: 18,
    marginBottom: 10,
    textAlign: 'center',
    marginTop: 20,
  },
  ratingContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
    marginTop: 10,
  },
  ratingButton: {
    margin: 5,
    padding: 10,
    borderRadius: 5,
    borderColor: 'grey',
    borderWidth: 1,
    width: 50,
    alignItems: 'center',
  },
  ratingButtonSelected: {
    backgroundColor: '#135837',
  },
  ratingText: {
    color: '#000000',
    fontSize: 18,
  },
  labelContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 20,
    marginBottom: 30,
  },
  labelText: {
    fontSize: 13,
    color: 'grey',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  button: {
    width: 100,
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#135837',
  },
  buttonCancel: {
    width: 100,
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#135837',
    marginHorizontal: 5,
  },
  buttonText: {
    color: '#FFFFFF',
  },
});

export default RatingBoardModal;
