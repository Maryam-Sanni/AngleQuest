import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'; // Ensure you have the correct icon library
import { useNavigate } from "react-router-dom";

const goals = [
  {
    title: "New Career Transition",
    description: "I need professional handholding to quickly transition into a new career.",
    nextOptions: [
      { 
        title: "Skill Analysis", 
        description: [
          "Start with AngleQuest AI analysis", 
          "Meet an expert",
          "Receive skill gap analysis"
        ]
      },
      { 
        title: "Growth", 
        description: [
          "Meet an expert", 
          "Receive a personal growth plan"
        ]
      },
      { 
        title: "Hubs", 
        description: [
          "Join targeted hubs", 
          "Engage in specialized coaching"
        ]
      },
    ],
  },
  {
    title: "On the Job Support",
    description: "I want to get professional support to solve job challenges.",
    nextOptions: [
      { 
        title: "Hubs", 
        description: [
          "Join targeted hubs", 
          "Engage in specialized coaching"
        ]
      },
      { 
        title: "Support Request", 
        description: [
          "Submit specific requests for help", 
          "Receive feedback"
        ]
      },
      { 
        title: "Job Performance Review", // New option
        description: [
          "Receive feedback on current job performance",
          "Get suggestions for improvement"
        ]
      },
    ],
  },
  {
    title: "Coaching to Move from One Level to Another",
    description: "Professional handholding to reach the next level in my career.",
    nextOptions: [
      { 
        title: "Skill Analysis", 
        description: [
          "Start with AngleQuest AI analysis", 
          "Meet an expert",
          "Receive skill gap analysis"
        ]
      },
      { 
        title: "Growth", 
        description: [
          "Meet an expert", 
          "Receive a personal growth plan"
        ]
      },
      { 
        title: "Hubs", 
        description: [
          "Join targeted hubs", 
          "Engage in specialized coaching"
        ]
      },
    ],
  },
];

const GoalSelectionPage = ({ onClose }) => {
  const [selectedGoal, setSelectedGoal] = useState(null);
  const navigate = useNavigate();

  const goToAdvice = () => {
    navigate("/skill-analysis-sessions");
  };

  const goToHubs = () => {
    navigate("/coaching-hub-sessions");
  };
  
  const renderGoals = () => (
    <View>
    <Text style={styles.heading}>
      Which of these best describes what you would like to achieve with AngleQuest?
    </Text>
      <TouchableOpacity onPress={onClose} style={styles.closeButton}>
        <Text style={{ fontSize: 18, color: '#3F5637', fontWeight: 'bold', fontFamily: "Roboto-Light" }}>
          ✕
        </Text>
      </TouchableOpacity>
    <View style={styles.goalContainer}>
      {goals.map((goal, index) => (
        <View key={index} style={styles.goalBoxContainer}>
          <TouchableOpacity
            style={styles.box}
            onPress={() => setSelectedGoal(goal)}
          >
            <Text style={styles.boxTitle}>{goal.title}</Text>
            <View style={{width: 25, height: 25, borderRadius: 15, backgroundColor: 'white', marginTop: 10}} />
          </TouchableOpacity>
          <Text style={styles.box2Description}>{goal.description}</Text>
        </View>
      ))}
    </View>
      </View>
  );

  const renderNextOptions = () => {
    const handleGetStartedPress = () => {
      if (selectedGoal.title === "On the Job Support") {
        goToHubs();
      } else {
        goToAdvice();
      }
    };

    return (
      <View style={styles.optionsContainer}>
        <TouchableOpacity onPress={onClose} style={styles.closeButton}>
          <Text style={{ fontSize: 18, color: '#3F5637', fontWeight: 'bold', fontFamily: "Roboto-Light" }}>
            ✕
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.backIcon} onPress={() => setSelectedGoal(null)}>
          <Icon name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>

        {/* Display the selected goal's title as a heading */}
        <Text style={styles.goalTitleHeading}>{selectedGoal.title}</Text>

        <Text style={styles.subHeading}>
          To understand your unique situation, here is the process we would be following:
        </Text>
        <View style={styles.processFlow}>
         {selectedGoal.nextOptions.map((option, index) => (
            <React.Fragment key={index}>
              <View style={styles.goalBoxContainer}>
                <View style={styles.box}>
                  <Text style={styles.boxTitle}>{option.title}</Text>
                </View>
                {option.description.map((desc, idx) => (
                  <Text key={idx} style={styles.boxDescription}>
                    • {desc}
                  </Text>
                ))}
              </View>
              {index < selectedGoal.nextOptions.length - 1 && (
                <View style={styles.connectorLine} />
              )}
            </React.Fragment>
          ))}
        </View>
        <TouchableOpacity
          onPress={handleGetStartedPress}
          style={styles.getStartedButton}
        >
          <Text style={styles.buttonText}>Get Started</Text>
        </TouchableOpacity>
      </View>
    );
  };



  return (
    <View style={styles.container}>
      {selectedGoal ? renderNextOptions() : renderGoals()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: 'white',
    width: '70%',
    alignSelf: 'center',
    height: 500,
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30,
    marginTop: 100
  },
  goalContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 40,
  },
  goalBoxContainer: {
    alignItems: 'center',
    width: '28%',
    marginBottom: 20,
  },
  optionsContainer: {
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    width: 200,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    padding: 10,
    borderColor: '#ddd',
    backgroundColor: '#b2d8b2',
  },
  boxTitle: {
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
  },
  box2Description: {
    fontSize: 12,
    color: '#555',
    marginTop: 8,
    textAlign: 'center',
    width: 200,
  },
  boxDescription: {
    fontSize: 12,
    color: '#555',
    marginTop: 8,
    textAlign: 'flex-start',
    width: 200,
  },
  processFlow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  connectorLine: {
    width: 120,
    height: 3,
    marginTop: -50,
    backgroundColor: '#000',
  },
  backIcon: {
    position: 'absolute',
    top: 10,
    left: 10,
    zIndex: 1,
  },
  getStartedButton: {
    backgroundColor: 'white',
    padding: 10,
    borderWidth: 2,
    alignItems: 'center',
    marginTop: 40,
    marginRight: 800,
  },
  buttonText: {
    color: 'black',
    fontSize: 16,
  },
  subHeading: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 20,
    marginTop: 50,
    fontWeight: 'bold',
  },
  closeButton: {
    position: 'absolute',
    top: 0,
    right: 20,
  },
});

export default GoalSelectionPage;
