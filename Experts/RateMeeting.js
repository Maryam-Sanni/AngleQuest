import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, TextInput } from "react-native";
import Top from "../components/top";

const ExpertRating = () => {
  const [rating, setRating] = useState(null);
  const [goalStatus, setGoalStatus] = useState(null);
  const [feedback, setFeedback] = useState("");

  const resetRating = () => {
    setRating(null);
    setGoalStatus(null);
    setFeedback("");
  };

  const handleSubmit = () => {
    if (!rating) {
      alert("Please select a meeting rating!");
      return;
    }
    if (!goalStatus) {
      alert("Please select your training goal status!");
      return;
    }

    console.log("Rating:", rating);
    console.log("Goal Status:", goalStatus);
    console.log("Feedback:", feedback);
  };

  return (
    <View style={{ flex: 1 }}>
      <Top />
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <View style={styles.contained}>
          <View style={styles.container}>
            {!rating ? (
              <>
                <Text style={styles.heading}>
                  How would you rate this meeting you just concluded?
                </Text>
                <View style={styles.ratingOptions}>
                  {["Excellent", "Good", "Satisfactory", "Poor"].map((label, index) => (
                    <TouchableOpacity
                      key={index}
                      style={styles.ratingOption}
                      onPress={() => setRating(label)}
                    >
                      <Text style={styles.emoji}>{["😊", "🙂", "😐", "😞"][index]}</Text>
                      <Text style={styles.ratingText}>{label}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </>
            ) : (
              <>
                <Text style={styles.heading2}>
                  Are you on track to reaching your goals?
                </Text>
                <Text style={styles.selectedRating}>Selected Rating: {rating}</Text>
                <View style={styles.checkboxContainer}>
                  {[
                    { label: "On Track", color: "green" },
                    { label: "Some Concerns", color: "orange" },
                    { label: "Behind", color: "red" },
                  ].map((option, index) => (
                    <TouchableOpacity
                      key={index}
                      style={styles.checkboxOption}
                      onPress={() => {
                        setGoalStatus(option.label);
                        setFeedback(""); // Clear previous feedback
                      }}
                    >
                      <View
                        style={[
                          styles.checkbox,
                          { backgroundColor: goalStatus === option.label ? option.color : "white" },
                          { borderColor: option.color },
                        ]}
                      >
                        {goalStatus === option.label && <Text style={styles.checkmark}>✔</Text>}
                      </View>
                      <Text style={styles.checkboxLabel}>{option.label}</Text>
                    </TouchableOpacity>
                  ))}
                </View>

                {goalStatus && (
                  <View style={styles.feedbackContainer}>
                    <Text style={styles.feedbackPrompt}>
                      {goalStatus === "On Track" && "What could you have done better?"}
                      {goalStatus === "Some Concerns" && "What are your concerns?"}
                      {goalStatus === "Behind" && "What is wrong?"}
                    </Text>
                    <TextInput
                      style={styles.textInput}
                      value={feedback}
                      onChangeText={setFeedback}
                      placeholder="Type your feedback here..."
                      multiline
                    />
                  </View>
                )}

                <View style={styles.buttonContainer}>
                  <TouchableOpacity style={styles.goBackButton} onPress={resetRating}>
                    <Text style={styles.buttonText}>Go Back</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
                    <Text style={styles.buttonText}>Submit</Text>
                  </TouchableOpacity>
                </View>
              </>
            )}
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    width: 500,
    backgroundColor: "#fff",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  heading: { fontSize: 20, fontWeight: "bold", marginBottom: 20, textAlign: "center" },
  heading2: { fontSize: 20, fontWeight: "bold", marginBottom: 20, alignSelf: 'flex-start'},
  ratingOptions: { flexDirection: "row", flexWrap: "wrap", justifyContent: "center" },
  ratingOption: {
    alignItems: "center",
    justifyContent: "center",
    borderColor: 'lightgrey',
    borderWidth: 0.5,
    borderRadius: 10,
    flexDirection: "row",
    padding: 10,
    width: 180,
    margin: 10,
    shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    },
  emoji: { fontSize: 30 },
  ratingText: { marginLeft: 5, fontSize: 16, fontWeight: "600" },
  selectedRating: { fontSize: 15, color: "#555", marginBottom: 20, marginTop: -10, alignSelf: 'flex-start' },
  checkboxContainer: { marginBottom: 20, alignSelf: 'flex-start' },
  checkboxOption: { flexDirection: "row", alignItems: "center", marginVertical: 5 },
  checkbox: {
    width: 24,
    height: 24,
    borderWidth: 2,
    marginRight: 10,
    borderRadius: 3,
    alignItems: "center",
    justifyContent: "center",
  },
  checkmark: { fontSize: 16, color: "white" },
  checkboxLabel: { fontSize: 16 },
  feedbackContainer: { marginBottom: 20, width: "100%" },
  feedbackPrompt: { fontSize: 16, fontWeight: "bold", marginBottom: 10 },
  textInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
    height: 100,
    textAlignVertical: "top",
  },
  buttonContainer: { flexDirection: "row", justifyContent: "space-between",  marginTop: 20 },
  goBackButton: {
    backgroundColor: "lightgrey",
    padding: 10,
    borderRadius: 5,
    width: 100,
  },
  submitButton: {
    backgroundColor: "#206C00",
    padding: 10,
    borderRadius: 5,
    width: 100,
    marginLeft: 10,
  },
  buttonText: { color: "#fff", fontWeight: "bold", textAlign: "center" },
  contained: {
    backgroundColor: "white",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    padding: 30,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});

export default ExpertRating;
