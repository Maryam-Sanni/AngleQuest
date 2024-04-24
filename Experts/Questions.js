import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, TextInput } from "react-native";

function MyComponent() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Questions to Ask</Text>
      {[1, 2, 3, 4, 5].map((index) => (
        <View key={index}>
          <Text style={styles.question}>Question {index}</Text>
          
             <TextInput
              style={styles.inputContainer}
              placeholder="Type your question here"
              placeholderTextColor="#808080"
            />
        
        </View>
      ))}
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Save & Continue</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 8,
    paddingTop: 50,
    paddingBottom: 20,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 10,
    flexDirection: "column",
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000000",
    marginBottom: 16,
    marginRight: 380,
  },
  question: {
    fontSize: 14,
    fontWeight: "bold",
    color: "black",
    marginTop: 15,
  },
  inputContainer: {
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    marginTop: 5,
    fontSize: 14,
    backgroundColor: "#ffffff",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#206C00'",
    width: 500, 
  },
  button: {
    justifyContent: "center",
    alignSelf: "center",
    paddingHorizontal: 4,
    paddingVertical: 10,
    marginTop: 20,
    backgroundColor: "coral",
    borderRadius: 5,
  },
  buttonText: {
    color: "#ffffff",
    fontWeight: "bold",
    fontSize: 14,
  },
});

export default MyComponent;
