import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const onboardingData = [
  {
    id: '1',
    title: 'Congrats, you have completed the first part.',
    description: 'Now, the second part involves creating profile guide. Since you will be providing your service as a skill analysis expert, growth plan, creating a cohort (hub) to share your expertise and lastly help our users to resolve their issues – we have prepare forms that will enable you to create a guide that will serve as your template for such sessions. Think working smart!',
    image: require("../assets/EmptySch.jpeg")
  },
  {
    id: '2',
    title: 'How can I use AngleQuest',
    description: 'AngleQuest is a tech support tool, enabling experts like you to assist others to reach their goals while making money and having impact.',
    options: [
      {
        name: 'Support Requests',
        explanation: 'Provide solutions to specific challenges users face.'
      },
      {
        name: 'Knowledge Sharing Hub',
        explanation: 'Share insights and resources with the community.'
      },
      {
        name: 'Best Practices',
        explanation: 'Guide others with tried-and-tested strategies.'
      },
      {
        name: 'Skill Analysis',
        explanation: 'Assess and identify areas for improvement.'
      },
      {
        name: 'Growth Plan',
        explanation: 'Develop roadmaps for achieving personal or professional goals.'
      },
      {
        name: 'Interview Sessions',
        explanation: 'Help individuals prepare for job opportunities.'
      }
    ]
  }
];

const Onboarding = ({ onGuide }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);

const handleNext = () => {
  onGuide(); // Call the onFinish function
};

  const handleBack = () => {
    setCurrentSlide((prev) => (prev - 1 + onboardingData.length) % onboardingData.length);
    setSelectedOption(null); // Reset the selected option when moving to the previous slide
  };

  const handleSelectOption = (option) => {
    setSelectedOption(option === selectedOption ? null : option);
  };

  const renderSlide = () => {
    const slide = onboardingData[currentSlide];
    if (slide.id === '2') {
      return (
        <View style={{marginTop: -150}}>
          <Text style={styles.title}>{slide.title}</Text>
          <Text style={styles.description}>{slide.description}</Text>
          <View style={styles.optionsRow}>
            {slide.options.map((item) => (
              <TouchableOpacity
                key={item.name}
                style={[
                  styles.option,
                  selectedOption === item && styles.optionSelected
                ]}
                onPress={() => handleSelectOption(item)}
              >
                <Text
                  style={[
                    styles.optionText,
                    selectedOption === item && styles.optionTextSelected
                  ]}
                >
                  {item.name}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
          {selectedOption && (
            <Text style={styles.explanation}>{selectedOption.explanation}</Text>
          )}
        </View>
      );
    }

    if (slide.id === '1') {
      return (
        <View>
          <Text style={styles.title}>{slide.title}</Text>
          <Text style={styles.description}>{slide.description}</Text>
          <Image source={slide.image} style={styles.image} />
        </View>
      );
    }

    return null;
  };

  const renderProgressBar = () => {
    return (
      <View style={styles.progressBarContainer}>
        {onboardingData.map((_, index) => (
          <View
            key={index}
            style={[
              styles.progressBar,
              index <= currentSlide && styles.progressBarActive
            ]}
          />
        ))}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.slideContainer}>{renderSlide()}</View>
      <View style={styles.navigationContainer}>
        <View style={styles.buttonPlaceholder}>
          {currentSlide > 0 && (
            <TouchableOpacity onPress={handleBack} style={styles.buttonback}>
              <MaterialIcons name="arrow-back" size={16} color="white" />
              <Text style={styles.buttonText}>Back</Text>
            </TouchableOpacity>
          )}
        </View>
        <TouchableOpacity onPress={handleNext} style={styles.button}>
          <Text style={styles.buttonText2}>
            {currentSlide === onboardingData.length - 1 ? 'Next' : 'Proceed'}
          </Text>
          <MaterialIcons name="arrow-forward" size={16} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 16
  },
  slideContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 16,
    width: 600,
    alignSelf: 'center'
  },
  image: {
    width: 250,
    height: 250,
    marginBottom: 16,
    alignSelf: 'center'
  },
  optionsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginLeft: 50,
    marginRight: 50
  },
  option: {
    padding: 12,
    margin: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    backgroundColor: '#fff'
  },
  optionSelected: {
    borderColor: '#4caf50',
    backgroundColor: '#e8f5e9'
  },
  optionText: {
    textAlign: 'center',
    color: '#333'
  },
  optionTextSelected: {
    color: '#4caf50',
    fontWeight: 'bold'
  },
  explanation: {
    marginTop: 16,
    fontSize: 14,
    textAlign: 'center',
    color: '#555'
  },
  progressBarContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 16
  },
  progressBar: {
    height: 8,
    width: 40,
    borderRadius: 4,
    backgroundColor: '#ccc',
    marginHorizontal: 4
  },
  progressBarActive: {
    backgroundColor: '#4caf50'
  },
  navigationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  buttonPlaceholder: {
    flex: 1, // Ensures the placeholder takes equal space as the button
    alignItems: 'flex-start' // Aligns the "Back" button to the left
  },
  button: {
    padding: 12,
    borderRadius: 5,
    backgroundColor: '#4caf50',
    marginHorizontal: 8,
    flexDirection: 'row'
  },
  buttonback: {
    padding: 12,
    borderRadius: 5,
    backgroundColor: 'grey',
    marginHorizontal: 8,
    flexDirection: 'row'
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    marginLeft: 10
  },
  buttonText2: {
    color: '#fff',
    fontWeight: 'bold',
    marginRight: 10
  }
});

export default Onboarding;
