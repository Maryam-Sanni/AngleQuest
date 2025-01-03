import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';

const onboardingData = [
  {
    id: '1',
    title: 'Welcome to AngleQuest',
    description: 'We are thrilled to have you here!',
    image: require("../assets/happywelcome.png")
  },
  {
    id: '2',
    title: 'What does AngleQuest do?',
    description: 'AngleQuest is a comprehensive and dynamic platform designed to connect experts from various fields and industries with individuals or organizations seeking specialized knowledge and assistance. This platform serves as a bridge, enabling experts to provide valuable insights and solutions in several key areas. First, it facilitates support requests, offering a streamlined process for individuals or businesses to seek advice or solutions to specific challenges they may face. Whether it’s technical troubleshooting, strategic guidance, or emotional support, experts on AngleQuest are equipped to respond efficiently and effectively. Second, AngleQuest is a knowledge-sharing hub, fostering a community where experts can exchange ideas, insights, and resources. This enables continuous learning and collaboration, ensuring that users benefit from a vast pool of collective expertise. Third, the platform promotes organizational best practices, allowing experts to share tried-and-tested strategies that can optimize workflows, improve team dynamics, and enhance productivity. This is particularly valuable for organizations aiming to stay competitive in their respective industries. Moreover, AngleQuest includes features for skill analysis, where experts assess individuals or teams competencies and identify areas for improvement. This helps users better understand their strengths and weaknesses, paving the way for targeted development initiatives. In addition to skill analysis, the platform supports growth plans, enabling experts to create tailored development roadmaps. These plans can guide users toward achieving their personal, professional, or organizational goals by focusing on specific milestones and actionable steps. Finally, AngleQuest provides a venue for interview sessions, where experts can conduct mock interviews, offer feedback, and help individuals prepare for career opportunities. This feature is invaluable for job seekers looking to refine their skills and boost their confidence. Beyond these core functionalities, AngleQuest is a versatile ecosystem that adapts to the evolving needs of its users, ensuring that experts and seekers alike can benefit from meaningful interactions and impactful solutions.'
  },
  {
    id: '3',
    title: 'How can i be productive on AngleQuest?',
    description: 'Please select all the areas you can contribute to as an expert.',
    options: [
      'Support Requests',
      'Knowledge Sharing Hub',
      'Best Practices',
      'Skill Analysis',
      'Growth Plan',
      'Interview Sessions',
    ]
  }
];

const Onboarding = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState([]);

  useEffect(() => {
    // Only set the interval if the current slide is 0 (first slide)
    if (currentSlide === 0) {
      const timer = setInterval(() => {
        setCurrentSlide((prevSlide) => (prevSlide + 1) % onboardingData.length);
      }, 5000);

      // Clear the interval when the component is unmounted or the currentSlide changes
      return () => clearInterval(timer);
    }
  }, [currentSlide]);

  const handleNext = () => {
    setCurrentSlide((prev) => (prev + 1) % onboardingData.length);
  };

  const handleBack = () => {
    setCurrentSlide((prev) => (prev - 1 + onboardingData.length) % onboardingData.length);
  };

  const handleSelectOption = (option) => {
    setSelectedOptions((prev) =>
      prev.includes(option)
        ? prev.filter((item) => item !== option)
        : [...prev, option]
    );
  };

  const renderSlide = () => {
    const slide = onboardingData[currentSlide];
    if (slide.id === '3') {
      return (
        <View>
          <Text style={styles.title}>{slide.title}</Text>
          <Text style={styles.description}>{slide.description}</Text>
          <View style={styles.optionsRow}>
            {slide.options.map((item) => (
              <TouchableOpacity
                key={item}
                style={[
                  styles.option,
                  selectedOptions.includes(item) && styles.optionSelected
                ]}
                onPress={() => handleSelectOption(item)}
              >
                <Text
                  style={[
                    styles.optionText,
                    selectedOptions.includes(item) && styles.optionTextSelected
                  ]}
                >
                  {item}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      );
    }

    if (slide.id === '1') {
      return (
        <View>
          <Text style={styles.title}>{slide.title}</Text>
          <Text style={styles.description}>{slide.description}</Text>
          <Image 
            source={slide.image}
            style={styles.image}
          />
        </View>
      );
    }

    return (
      <View>
        <Text style={styles.title}>{slide.title}</Text>
        <Text style={styles.description}>{slide.description}</Text>
      </View>
    );
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
      {renderProgressBar()}
      <View style={styles.slideContainer}>{renderSlide()}</View>
      <View style={styles.navigationContainer}>
        {currentSlide > 0 && (
          <TouchableOpacity onPress={handleBack} style={styles.buttonback}>
            <MaterialIcons name="arrow-back" size={16} color="white" /> <Text style={styles.buttonText}>Back</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity onPress={handleNext} style={styles.button}>
           <Text style={styles.buttonText2}>
            {currentSlide === onboardingData.length - 1 ? 'Finish' : 'Continue'}
          </Text> <MaterialIcons name="arrow-forward" size={16} color="white" />
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
    marginBottom: 16
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