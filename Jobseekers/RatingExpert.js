import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import StarRating from "react-native-star-rating-widget";
import Top from '../components/top';
import { useNavigate } from 'react-router-dom';

const MeetingRating = () => {
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState("");
  const navigate = useNavigate();

  const handleSubmit = () => {
    if (rating === 0) {
      alert("Please provide a star rating!");
      return;
    }
    console.log("Rating Submitted:", rating);
    console.log("Feedback:", feedback);
  };

  const handleCancel = () => {
     navigate("/sign-in");
      };

  return (
    <View style={{ flex: 1 }}>
      <Top />
       <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
       <View style={styles.contained}>
    <View style={styles.container}>
      <Text style={styles.heading}>The meeting ended, how was it?</Text>
      <Text style={styles.subheading}>
        Please rate the meeting and share additional feedback you may have. Feedbacks will be visible to only organizers.
      </Text>

      <View style={styles.profileCircle}>
        <Text style={styles.profileText}>YO</Text>
      </View>
      <Text style={styles.organizerHead}>Yemisi Oche</Text>
      <Text style={styles.organizerText}>Meeting Lead Organizer</Text>

      <StarRating
        rating={rating}
        onChange={setRating}
        color="#FFD700"
        emptyColor="#D3D3D3"
      />

      <TextInput
        style={styles.textInput}
        placeholder="Additional comments (optional)"
        value={feedback}
        onChangeText={setFeedback}
        multiline
      />

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.cancelButton} onPress={handleCancel}>
          <Text style={styles.buttonText}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
      </View>
      </View>
    </View>
    </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { backgroundColor: "#fff", flex: 1, alignItems: 'center', justifyContent: 'center' },
  heading: { fontSize: 20, fontWeight: "bold", marginBottom: 10 },
  subheading: { fontSize: 14, color: "#555", marginBottom: 20, width: 450, textAlign: 'center' },
  profileCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "lightgreen",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },
  profileText: { fontSize: 20, fontWeight: "bold", color: "green" },
  organizerHead: { fontSize: 18, fontWeight: "bold", marginBottom: 5 },
  organizerText: { fontSize: 14, fontWeight: "500", color: "#777", marginBottom: 30 },
  textInput: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
    padding: 10,
    height: 150,
    width: 500,
    textAlignVertical: "top",
    marginBottom: 50,
    marginTop: 10,
  },
  buttonContainer: { flexDirection: "row", justifyContent: "space-between" },
  submitButton: { backgroundColor: "#206C00", padding: 10, borderRadius: 5, width: 100, marginLeft: 10 },
  cancelButton: { backgroundColor: "lightgrey", padding: 10, borderRadius: 5, width: 100 },
  buttonText: { color: "#fff", fontWeight: "bold", textAlign: 'center' },
  contained: {
    backgroundColor: 'white',
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    padding: 30,
    // Shadow for iOS
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    // Shadow for Android
    elevation: 5,
  },
});

export default MeetingRating;
