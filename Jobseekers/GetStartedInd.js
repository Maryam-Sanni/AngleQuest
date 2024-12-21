import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  ScrollView,
  Image,
  Animated,
  TextInput, Switch, CheckBox,
  input, Pressable
} from "react-native";
import { useFonts } from "expo-font";
import { useTranslation } from "react-i18next";
import OpenModal from './getstarted';
import axios from 'axios';
import { MaterialIcons } from '@expo/vector-icons'; 
import AsyncStorage from '@react-native-async-storage/async-storage';

function ServiceCard({ title, description, isStartPressed, activeCard, setActiveCard }) {
  const [isHovered, setIsHovered] = useState(false);
  const isActive = activeCard === title;

    // Create an animated value for width
    const animatedWidth = new Animated.Value(isStartPressed ? 360 : 560); // Adjust initial width

    // Animate width change when isStartPressed changes
    useEffect(() => {
      Animated.timing(animatedWidth, {
        toValue: isStartPressed ? 360 : 560, // Set to smaller width when pressed
        duration: 300, // Duration of the animation
        useNativeDriver: false, // Disable native driver for width
      }).start();
    }, [isStartPressed]); // Re-run the animation when isStartPressed changes

    return (
      <Animated.View
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
          style={[
            styles.serviceCard,
            (isHovered || isActive) && styles.hoverCard
        ]}
      >
        <Text
          style={[
            styles.serviceTitle,
            (isHovered || isActive) && styles.hoverTitle, // Apply hoverTitle for hover or active
          ]}
        >
          {title}
        </Text>
      </Animated.View>
  );
}

function AngleQuestPage({ onClose }) {
  const [fadeAnim] = useState(new Animated.Value(0));
  const { t } = useTranslation();
  const [currentStep, setCurrentStep] = useState(0);
  const [ModalVisible, setModalVisible] = useState(false);
  const [isStartPressed, setIsStartPressed] = useState(false);
  const [activeCard, setActiveCard] = useState('Subscriptions');
  const [file, setFile] = useState(null);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [selectedSection, setSelectedSection] = useState(null);
    const [cardName, setCardName] = useState('');
    const [cardNumber, setCardNumber] = useState('');
    const [cvv, setCvv] = useState('');
    const [expMonth, setExpMonth] = useState('');
    const [expYear, setExpYear] = useState('');
    const [isRecurring, setIsRecurring] = useState(false);
    const [useExistingAddress, setUseExistingAddress] = useState(false);

 // Function to save selected plan to AsyncStorage without prefix or suffix
const saveToAsyncStorage = async (plan) => {
  try {
    // Extract the numeric part from the plan cost (removing "$" and " Monthly" or " Annually")
    const costWithoutPrefix = plan.replace(/[^0-9.-]+/g, ''); // This removes everything except numbers and decimal point

    // Save the numeric value to AsyncStorage
    await AsyncStorage.setItem('selectedPlan', costWithoutPrefix);

    console.log("Plan saved successfully:", costWithoutPrefix);
  } catch (e) {
    console.error("Failed to save the plan to AsyncStorage", e);
  }
};

  // Handle button press to select a plan
// Handle button press to select a plan
const handlePress = (plan, sectionTitle) => {
    setSelectedPlan(plan);
    setSelectedSection(sectionTitle);  // Set the selected section here
    saveToAsyncStorage(plan);
  };

  const [fontsLoaded] = useFonts({
    "Roboto-Light": require("../assets/fonts/Roboto-Light.ttf"),
  });

  const sections = [
    {
      title: "Knowledge Backup",
      options: [
        { title: "Default", details: ["Backup response time - 24hrs", "Best practice access - 30%"], cost: "No additional cost", isDefault: true },
        { title: "Standard", details: ["Backup response time - 12hrs", "Best practice access - 60%"], cost: "$40 monthly" },
        { title: "Advance", details: ["Backup response time - 4hrs", "Best practice access - Unlimited"], cost: "$100 monthly" },
      ],
    },
    {
      title: "Growth Plan Support",
      options: [
        { title: "Default", details: ["Skill gap analysis (AI & expert)", "Growth plan", "Coaching hub - 1 hub access"], cost: "No additional cost", isDefault: true },
        { title: "Standard", details: ["Skill gap analysis (AI & expert)", "Growth plan", "Coaching hub - 2 hub access"], cost: "$40 monthly" },
        { title: "Advance", details: ["Skill gap analysis (AI & expert)", "Growth plan", "Coaching hub - Unlimited"], cost: "$100 monthly" },
      ],
    },
    {
      title: "Knowledge Backup + Growth Plan Support",
      options: [
        { title: "Default", details: ["Skill gap analysis (AI & expert)", "Growth plan", "Backup response time - 24hrs", "Coaching hub - 1 hub access", "Best practice access - 30%"], cost: "No additional cost", isDefault: true },
        { title: "Standard", details: ["Skill gap analysis (AI & expert)", "Growth plan", "Backup response time - 12hrs", "Coaching hub - 2 hub access", "Best practice access - 60%"], cost: "$40 monthly" },
        { title: "Advance", details: ["Skill gap analysis (AI & expert)", "Growth plan", "Backup response time - 4hrs", "Coaching hub - Unlimited", "Best practice access - Unlimited"], cost: "$100 monthly" },
      ],
    },
  ];

  const [selectedOptions, setSelectedOptions] = useState({});

  useEffect(() => {
    // Load previously selected options from AsyncStorage
    const loadSelectedOptions = async () => {
      const storedOptions = await AsyncStorage.getItem('selectedOptions');
      if (storedOptions) {
        setSelectedOptions(JSON.parse(storedOptions));
      }
    };

    loadSelectedOptions();
  }, []);

  const handleSelect = async (sectionTitle, option) => {
    try {
      // Update the selection for the section
      setSelectedOptions((prevState) => {
        const updatedOptions = { ...prevState, [sectionTitle]: option };
  
        // Save the updated selected options to AsyncStorage
        AsyncStorage.setItem('selectedOptions', JSON.stringify(updatedOptions));
  
        return updatedOptions;
      });
  
      // Check if the cost is "No additional cost", and set it to 0
      let costWithoutMonthly = option.cost.replace(' monthly', '').replace('$', '').trim(); // Remove "$" and "monthly"
      if (costWithoutMonthly === "No additional cost") {
        costWithoutMonthly = "0"; // Set the cost to 0 if it's "No additional cost"
      }
  
      // Save the cost as a numeric value (for example, "40" instead of "$40 monthly")
      await AsyncStorage.setItem(`${sectionTitle}-cost`, costWithoutMonthly);
  
      console.log(`Saved cost for ${sectionTitle}: ${costWithoutMonthly}`);
  
      // Retrieve the saved selected plan cost from AsyncStorage
      const selectedPlanCost = await AsyncStorage.getItem('selectedPlan');
  
      // Retrieve the option cost from AsyncStorage (already saved)
      const optionCost = await AsyncStorage.getItem(`${sectionTitle}-cost`);
  
      // Ensure both costs are available for calculation
      if (optionCost && selectedPlanCost) {
        // Convert the string values to floats for proper calculation
        const optionCostValue = parseFloat(optionCost);
        const selectedPlanCostValue = parseFloat(selectedPlanCost);
  
        // Calculate the total combined cost
        const totalCost = optionCostValue + selectedPlanCostValue;
  
        // Save the total combined cost to AsyncStorage
        await AsyncStorage.setItem('totalPlanCost', totalCost.toString());
  
        setTotalPlanCost(totalCost);
  
        console.log("Total Plan Cost:", totalCost);
      } else {
        console.error("Option cost or selected plan cost not found in AsyncStorage.");
      }
    } catch (error) {
      console.error("Error in handleSelect:", error);
    }
  };
  
  const handleChooseImage = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const handleOpenPress = () => {
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  const saveSelectedSupport = async (selectedText) => {
    try {
      await AsyncStorage.setItem('selectedSupport', selectedText);
      console.log('Saved successfully:', selectedText);
    } catch (error) {
      console.error('Error saving to AsyncStorage:', error);
    }
  };
  
  const [totalPlanCost, setTotalPlanCost] = useState(0); // State to hold the total cost

  
  const steps = [
    {
        heading: t(
          "Choose an area where you want AngleQuest to be your professional support",
        ),
        content: (
          <View>
            <View style={{ flexDirection: "row" }}>
              <View
                style={{
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Image
                  source={{
                    uri: "https://img.icons8.com/?size=100&id=gcYV3SPHW03K&format=png&color=000000",
                  }}
                  style={{
                    width: 70,
                    height: 70,
                    marginTop: 20,
                    marginBottom: 5,
                    alignSelf: "center",
                  }}
                />
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: 600,
                    textAlign: "center",
                    width: 300,
                  }}
                >
                  Knowledge Backup
                </Text>
                <Text
                  style={{
                    fontSize: 14,
                    textAlign: "center",
                    width: 250,
                    height: 100,
                    marginTop: 5,
                  }}
                >
                  Start delivering effortlessly at work. Take up
and solve high priority challenges to stamp
your excellence. AngleQuest serve as your
knowledge backup. 24/7 support from
dedicated expert. Access all best practices.
                </Text>
                <View style ={{flexDirection: 'row', marginTop: 5}}>
                <Image
                  source={{
                    uri: "https://cdn.builder.io/api/v1/image/assets/TEMP/925cfbb55e82458868f5e0c8cafbdc90d47bec0907e65b77fb918a7ac0dbcfe0?apiKey=7b9918e68d9b487793009b3aea5b1a32&",
                  }}
                  style={{
                    width: 25,
                    height: 25,
                    marginTop: 5,
                    marginRight: 10,
                    alignSelf: "center",
                  }}
                />
                 <Image
                  source={{
                    uri: "https://img.icons8.com/?size=100&id=eoReSiKCoyw3&format=png&color=5B5D55",
                  }}
                  style={{
                    width: 25,
                    height: 25,
                    marginTop: 5,
                    marginRight: 10,
                    alignSelf: "center",
                  }}
                />
                 <Image
                  source={{
                    uri: "https://img.icons8.com/?size=100&id=51413&format=png&color=5B5D55",
                  }}
                  style={{
                    width: 25,
                    height: 25,
                    marginTop: 5,
                    alignSelf: "center",
                  }}
                />
                </View>
                <Text
                  style={{
                    fontSize: 14,
                    color: 'grey',
                    textAlign: "center",
                    width: 250,
                    marginTop: 25,
                  }}
                >
                 Subscribe
                </Text>
                <View style={styles.buttonGroup}>
        <TouchableOpacity
          style={[
            styles.buttonG,
            selectedPlan === '$100 Monthly' ? styles.selectedButton : null,
          ]}
          onPress={() => {
            handlePress('$100 Monthly', 'Knowledge Backup'); 
            setCurrentStep(1); 
            setActiveCard("Service Level Agreement");
          }}
        >
          <Text
            style={[
              styles.buttonText,
              selectedPlan === '$100 Monthly' ? styles.selectedText : null,
            ]}
          >
            $100 Monthly
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.buttonG,
            selectedPlan === '$85 Quarterly' ? styles.selectedButton : null,
          ]}
          onPress={() => { handlePress('$85 Quarterly', 'Knowledge Backup'); 
            setCurrentStep(1);
            setActiveCard("Service Level Agreement"); 
          }}
        >
          <Text
            style={[
              styles.buttonText,
              selectedPlan === '$85 Quarterly' ? styles.selectedText : null,
            ]}
          >
            $85 Quarterly
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.buttonG2,
            selectedPlan === '$75 Annually' ? styles.selectedButton : null,
          ]}
          onPress={() => { handlePress('$75 Annually', 'Knowledge Backup'); 
            setCurrentStep(1); 
            setActiveCard("Service Level Agreement");
          }}
        >
          <Text
            style={[
              styles.buttonText,
              selectedPlan === '$75 Annually' ? styles.selectedText : null,
            ]}
          >
            $75 Annually
          </Text>
        </TouchableOpacity>
        </View>
         <Text style={styles.valueText}>
                         Benefits
                        </Text>
                       <Text style={styles.descriptionText}>
                       Support for project delivery.
                       </Text>
                        <Text style={styles.descriptionText}>
                        Support for project delivery.
                        </Text>
              </View>
  
              <View
                style={{
                  flexDirection: "column",
                  marginLeft: 10,
                  justifyContent: "center",
                  alignItems: "center",
                  
                }}
              >
                <Image
                  source={{
                    uri: "https://img.icons8.com/?size=100&id=pF2OfcFGInLa&format=png&color=000000",
                  }}
                  style={{
                    width: 70,
                    height: 70,
                    marginTop: 20,
                    marginBottom: 5,
                    alignSelf: "center",
                  }}
                />
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: 600,
                    textAlign: "center",
                    width: 300,
                  }}
                >
                  Career Growth Support
                </Text>
                <Text
                  style={{
                    fontSize: 14,
                    textAlign: "center",
                    width: 250,
                     height: 103,
                    marginTop: 5,
                  }}
                >
                 Enjoy hyper career growth support from
                 top practicing experts who are committed 
                </Text>
                <View style ={{flexDirection: 'row', marginTop: 5}}>
                <Image
                  source={{
                    uri: "https://img.icons8.com/?size=100&id=7964&format=png&color=5B5D55",
                  }}
                  style={{
                    width: 25,
                    height: 25,
                    marginTop: 5,
                    marginRight: 10,
                    alignSelf: "center",
                  }}
                />
                 <Image
                  source={{
                    uri: "https://cdn.builder.io/api/v1/image/assets/TEMP/dea8538a41a4085f905f7513c46d36613c28b4ada84630149918f4444ac5ecde?apiKey=7b9918e68d9b487793009b3aea5b1a32&",
                  }}
                  style={{
                    width: 25,
                    height: 25,
                    marginTop: 5,
                    marginRight: 10,
                    alignSelf: "center",
                  }}
                />
                 <Image
                  source={{
                    uri: "https://cdn.builder.io/api/v1/image/assets/TEMP/925cfbb55e82458868f5e0c8cafbdc90d47bec0907e65b77fb918a7ac0dbcfe0?apiKey=7b9918e68d9b487793009b3aea5b1a32&",
                  }}
                  style={{
                    width: 25,
                    height: 25,
                    marginTop: 5,
                    alignSelf: "center",
                  }}
                />
                </View>
                <Text
                  style={{
                    fontSize: 14,
                    color: 'grey',
                    textAlign: "center",
                    width: 250,
                    marginTop: 25,
                  }}
                >
                 Subscribe
                </Text>
                <View style={styles.buttonGroup}>
        <TouchableOpacity
          style={[
            styles.buttonG,
            selectedPlan === '$100 Monthly' ? styles.selectedButton : null,
          ]}
          onPress={() => {handlePress('$100 Monthly', 'Growth Plan Support'); 
            setCurrentStep(1); 
            setActiveCard("Service Level Agreement");
          }}
        >
          <Text
            style={[
              styles.buttonText,
              selectedPlan === '$100 Monthly' ? styles.selectedText : null,
            ]}
          >
            $100 Monthly
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.buttonG,
            selectedPlan === '$85 Quarterly' ? styles.selectedButton : null,
          ]}
          onPress={() => { handlePress('$85 Quarterly', 'Growth Plan Support'); 
            setCurrentStep(1); 
            setActiveCard("Service Level Agreement");
          }}
        >
          <Text
            style={[
              styles.buttonText,
              selectedPlan === '$85 Quarterly' ? styles.selectedText : null,
            ]}
          >
            $85 Quarterly
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.buttonG2,
            selectedPlan === '$75 Annually' ? styles.selectedButton : null,
          ]}
          onPress={() => { handlePress('$75 Annually', 'Growth Plan Support'); 
            setCurrentStep(1); 
            setActiveCard("Service Level Agreement");
          }}
        >
          <Text
            style={[
              styles.buttonText,
              selectedPlan === '$75 Annually' ? styles.selectedText : null,
            ]}
          >
            $75 Annually
          </Text>
        </TouchableOpacity>
        </View>
         <Text style={styles.valueText}>
                         Benefits
                        </Text>
                       <Text style={styles.descriptionText}>
                       Support for project delivery.
                       </Text>
                        <Text style={styles.descriptionText}>
                        Support for project delivery.
                        </Text>
              </View>
  
              <View
                style={{
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Image
                  source={{
                    uri: "https://img.icons8.com/?size=100&id=GhVeCGvvJ9sM&format=png&color=000000",
                  }}
                  style={{
                    width: 70,
                    height: 70,
                    marginTop: 20,
                    marginBottom: 5,
                    alignSelf: "center",
                  }}
                />
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: 600,
                    textAlign: "center",
                    width: 300,
                  }}
                >
                  Knowledge Backup
                </Text>
                <Text
                  style={{
                    fontSize: 26,
                    fontWeight: 600,
                    textAlign: "center",
                    width: 300,
                  }}
                >
                  +
                </Text>
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: 600,
                    textAlign: "center",
                    width: 300,
                     height: 77,
                  }}
                >
                  Career Growth Support
                </Text>
                <View style ={{flexDirection: 'row', marginTop: 5}}>
                <Image
                  source={{
                    uri: "https://img.icons8.com/?size=100&id=7964&format=png&color=5B5D55",
                  }}
                  style={{
                    width: 25,
                    height: 25,
                    marginTop: 5,
                    marginRight: 10,
                    alignSelf: "center",
                  }}
                />
                 <Image
                  source={{
                    uri: "https://cdn.builder.io/api/v1/image/assets/TEMP/dea8538a41a4085f905f7513c46d36613c28b4ada84630149918f4444ac5ecde?apiKey=7b9918e68d9b487793009b3aea5b1a32&",
                  }}
                  style={{
                    width: 25,
                    height: 25,
                    marginTop: 5,
                    marginRight: 10,
                    alignSelf: "center",
                  }}
                />
                 <Image
                  source={{
                    uri: "https://cdn.builder.io/api/v1/image/assets/TEMP/925cfbb55e82458868f5e0c8cafbdc90d47bec0907e65b77fb918a7ac0dbcfe0?apiKey=7b9918e68d9b487793009b3aea5b1a32&",
                  }}
                  style={{
                    width: 25,
                    height: 25,
                    marginTop: 5,
                    marginRight: 10,
                    alignSelf: "center",
                  }}
                />
                 <Image
                  source={{
                    uri: "https://img.icons8.com/?size=100&id=51413&format=png&color=5B5D55",
                  }}
                  style={{
                    width: 25,
                    height: 25,
                    marginTop: 5,
                    marginRight: 10,
                    alignSelf: "center",
                  }}
                />
                 <Image
                  source={{
                    uri: "https://img.icons8.com/?size=100&id=eoReSiKCoyw3&format=png&color=5B5D55",
                  }}
                  style={{
                    width: 25,
                    height: 25,
                    marginTop: 5,
                    alignSelf: "center",
                  }}
                />
                </View>
                <Text
                  style={{
                    fontSize: 14,
                    color: 'grey',
                    textAlign: "center",
                    width: 250,
                    marginTop: 25,
                  }}
                >
                 Subscribe
                </Text>
                <View style={styles.buttonGroup}>
        <TouchableOpacity
          style={[
            styles.buttonG,
            selectedPlan === '$200 Monthly' ? styles.selectedButton : null,
          ]}
          onPress={() => { handlePress('$200 Monthly', 'Knowledge Backup + Growth Plan Support'); 
            setCurrentStep(1); 
            setActiveCard("Service Level Agreement");
          }}
        >
          <Text
            style={[
              styles.buttonText,
              selectedPlan === '$200 Monthly' ? styles.selectedText : null,
            ]}
          >
            $200 Monthly
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.buttonG,
            selectedPlan === '$170 Quarterly' ? styles.selectedButton : null,
          ]}
          onPress={() =>{ handlePress('$170 Quarterly', 'Knowledge Backup + Growth Plan Support'); 
            setCurrentStep(1); 
            setActiveCard("Service Level Agreement");
          }}
        >
          <Text
            style={[
              styles.buttonText,
              selectedPlan === '$170 Quarterly' ? styles.selectedText : null,
            ]}
          >
           $170 Quarterly
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.buttonG2,
            selectedPlan === '$150 Annually' ? styles.selectedButton : null,
          ]}
          onPress={() =>{ handlePress('$150 Annually', 'Knowledge Backup + Growth Plan Support'); 
            setCurrentStep(1); 
            setActiveCard("Service Level Agreement");
          }}
        >
          <Text
            style={[
              styles.buttonText,
              selectedPlan === '$150 Annually' ? styles.selectedText : null,
            ]}
          >
            $150 Annually
          </Text>
        </TouchableOpacity>
        </View>
         <Text style={styles.valueText}>
                         Benefits
                        </Text>
                       <Text style={styles.descriptionText}>
                       Support for project delivery.
                       </Text>
                        <Text style={styles.descriptionText}>
                        Support for project delivery.
                        </Text>
              </View>
            </View>
            
          </View>
        ),
      },
    {
      heading: t(" "),
      content: (
        <View style={styles.optionCard}>
        {sections
          .filter((section) => section.title === selectedSection) // Filter sections to match selectedSection
          .map((section, sectionIndex) => {
            // Check if there's already a selected option for this section, if not select the first option
            const isFirstOptionSelected =
              !selectedOptions[section.title] && section.options.length > 0;
  
            return (
              <View
                key={sectionIndex}
                style={{
                  marginBottom: 30,
                  padding: 20,
                  backgroundColor: '#fff',
                  borderRadius: 10,
                  elevation: 3,
                }}
              >
                <Text
                  style={{
                    fontSize: 24,
                    fontWeight: 'bold',
                    color: '#206C00',
                    marginBottom: 20,
                    textAlign: 'left',
                  }}
                >
                  {section.title}
                </Text>
                <View style={{ flexDirection: 'row' }}>
                  {section.options.map((option, optionIndex) => {
                    // If this is the first option and no option is selected, set it as selected by default
                    const isSelected =
                      selectedOptions[section.title]?.title === option.title ||
                      (isFirstOptionSelected && optionIndex === 0);
  
                    // Automatically select the first option if no option has been selected yet
                    if (isFirstOptionSelected && optionIndex === 0) {
                      handleSelect(section.title, option);
                    }
  
                    return (
                      <View key={optionIndex} style={{ alignItems: 'flex-start', width: 320 }}>
                        <Text
                          style={{
                            fontSize: 18,
                            fontWeight: 'bold',
                            marginBottom: 10,
                            textAlign: 'flex-start',
                          }}
                        >
                          {option.title}
                        </Text>
                        {option.details.map((detail, index) => (
                          <Text key={index} style={{ fontSize: 14, textAlign: 'left', marginBottom: 5 }}>
                            • {detail}
                          </Text>
                        ))}
  
                        <TouchableOpacity
                          style={{
                            marginTop: 30,
                            backgroundColor: isSelected ? '#4CAF50' : '#F0F0F0',
                            paddingVertical: 10,
                            paddingHorizontal: 25,
                            borderRadius: 5,
                            width: 280,
                            flexDirection: 'row',
                            justifyContent: 'center',
                            alignItems: 'center',
                          }}
                          onPress={async () => {
                            // Call the handleSelect function to save selected option
                            await handleSelect(section.title, option);
                        
                            // Move to the next step
                            setCurrentStep(2);
                            setActiveCard("Payment Details");
                          }}
                        >
                          <Text
                            style={{
                              color: 'darkgrey',
                              fontSize: 18,
                              textAlign: 'center',
                            }}
                          >
                            {isSelected ? (
                              <>
                                <MaterialIcons name="check" size={18} color="#fff" />
                                {' '}
                              </>
                            ) : (
                              'Select'
                            )}
                          </Text>
                        </TouchableOpacity>
  
                        <Text
                          style={{
                            fontSize: 14,
                            textAlign: 'center',
                            marginTop: 10,
                            alignSelf: 'center',
                            color: 'grey',
                          }}
                        >
                          {option.cost}
                        </Text>
                      </View>
                    );
                  })}
                </View>
              </View>
            );
          })}
      </View>
),
    },
    {
      heading: t(" "),
      content: (
        <View>
            <View style={styles.Paymentheader}>
          <Text style={styles.mainHeading2}>Payment Method</Text>
          <Text style={styles.subHeading2}>
                    This is the primary payment method that ${totalPlanCost} will be charged from.
                  </Text>
                </View>
          
                {/* Buttons */}
                <View style={styles.PaymentbuttonContainer}>
                  <TouchableOpacity style={[styles.Paymentbutton, styles.PaymentselectedButton]}>
                    <Image
                      source={{ uri: 'https://img.icons8.com/?size=100&id=83205&format=png&color=206C00' }}
                      style={{width: 20, height: 20, alignSelf: 'flex-end', marginTop: -10}}
                    />
                    <Image
                      source={{ uri: 'https://img.icons8.com/?size=100&id=22128&format=png&color=000000' }}
                      style={{width: 50, height: 50, alignSelf: 'center'}}
                    />
                    <Text style={styles.PaymentbuttonText}>Credit Or Debit Card</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.Paymentbutton}>
                    <Image
                      source={{ uri: 'https://img.icons8.com/?size=100&id=59872&format=png&color=000000' }}
                      style={{width: 50, height: 50, alignSelf: 'center', marginTop: 10}}
                    />
                    <Text style={styles.PaymentbuttonText}>Change Payment</Text>
                  </TouchableOpacity>
                </View>
          
                {/* Form Fields */}
                 <View style={styles.formcontainer}>
                <Text style={styles.label}>Cardholder Name (exactly as printed on card)</Text>
                <TextInput
                  style={styles.input}
                  placeholder="e.g., Elijah Mateo"
                  placeholderTextColor={"grey"}
                  value={cardName}
                  onChangeText={setCardName}
                />
          
                <Text style={styles.label}>Card Number</Text>
                <TextInput
                  style={styles.input}
                  placeholder="1234 5678 9012 3456"
                  placeholderTextColor={"grey"}
                  value={cardNumber}
                  onChangeText={setCardNumber}
                  keyboardType="numeric"
                />
           <View style ={{flexDirection: 'row', marginBottom: 20, marginTop: -10}}>
                <Image
                  source={{
                    uri: "https://img.icons8.com/?size=100&id=1431&format=png&color=808080",
                  }}
                  style={{
                    width: 40,
                    height: 40,
                    marginRight: 2,
                    alignSelf: "center",
                  }}
                />
                 <Image
                  source={{
                    uri: "https://img.icons8.com/?size=100&id=1429&format=png&color=808080",
                  }}
                  style={{
                    width: 40,
                    height: 40,
                    marginRight: 2,
                    alignSelf: "center",
                  }}
                />
                 <Image
                  source={{
                    uri: "https://img.icons8.com/?size=100&id=1433&format=png&color=808080",
                  }}
                  style={{
                    width: 40,
                    height: 40,
                    alignSelf: "center",
                  }}
                />
                </View>
                <Text style={styles.label}>CVV</Text>
                <TextInput
                  style={styles.input}
                  placeholder="123"
                  placeholderTextColor={"grey"}
                  value={cvv}
                  onChangeText={setCvv}
                  keyboardType="numeric"
                />
          
                {/* Expiration Date */}
                <Text style={styles.label}>Expiration Date</Text>
                <View style={styles.row}>
                  <TextInput
                    style={[styles.input, styles.smallInput]}
                    placeholder="MM"
                    placeholderTextColor={"grey"}
                    value={expMonth}
                    onChangeText={setExpMonth}
                    keyboardType="numeric"
                  />
                  <TextInput
                    style={[styles.input, styles.smallInput]}
                    placeholder="YY"
                    placeholderTextColor={"grey"}
                    value={expYear}
                    onChangeText={setExpYear}
                    keyboardType="numeric"
                  />
                </View>
          
                 </View>
                
                {/* Checkbox */}
                <View style={styles.checkboxContainer}>
                  <CheckBox
                    value={useExistingAddress}
                    onValueChange={setUseExistingAddress}
                  />
                  <Text style={styles.checkboxText}>Use the existing address for this payment method</Text>
                </View>
          
                  <View style={styles.checkboxContainer}>
                    <Switch
                      value={isRecurring}
                      onValueChange={(value) => setIsRecurring(value)}
                    />
                    <Text style={styles.checkboxText}>Make this payment recurring</Text>
                  </View>
          
                {/* Captcha */}
                <View style={styles.captchaContainer}>
                  <Image
                    source={{ uri: 'https://www.gstatic.com/recaptcha/api2/logo_48.png' }}
                    style={styles.captchaImage}
                  />
                  <Text style={styles.captchaText}>Privacy - Terms</Text>
                </View>
          
                {/* Submit Button */}
                <TouchableOpacity style={styles.buttonsave}>
            <Text style={styles.buttonsaveText}>{t("Save")}</Text>
          </TouchableOpacity>
            
                <TouchableOpacity style={styles.buttondone}>
            <Text style={styles.buttonsaveText2}>{t("Submit")}</Text>
          </TouchableOpacity>

        </View>
      ),
    },
    {
        heading: t("AngleQuest Agreement"),
        content: (
          <View>
            <Text style={styles.subHeading}>
              {t("Create your members individually or simply upload an excel document to add all members at once.")}
            </Text>
  
  
          </View>
        ),
      },
    
   
  ];

  React.useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, []);

  const services = [
    {
      title: t("Subscriptions"),
      icon: "https://img.icons8.com/?size=100&id=48354&format=png&color=000000",
    },
    {
      title: t("Service Level Agreement"),
      icon: "https://img.icons8.com/?size=100&id=48354&format=png&color=000000",
    },
    {
      title: t("Payment Details"),
      icon: "https://img.icons8.com/?size=100&id=48354&format=png&color=000000",
    },
    {
      title: t("AngleQuest Agreement"),
      icon: "https://img.icons8.com/?size=100&id=SazSfIWdDmr2&format=png&color=000000",
    },
  ];

  return (
    <View style={styles.container}>
        <View style={styles.greenBox}>
          <View style={styles.header}>
            <Image
              source={{
                uri: "https://cdn.builder.io/api/v1/image/assets/TEMP/1f2d38e99b0016f2bd167d2cfd38ff0d43c9f94a93c84b4e04a02d32658fb401?apiKey=7b9918e68d9b487793009b3aea5b1a32&",
              }}
              style={styles.logo}
            />
            <Text style={styles.headerText}>
              {t("Agreements & Subscription")}
            </Text>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Text style={styles.closeButtonText}>✕</Text>
            </TouchableOpacity>
          </View>
          <ScrollView contentContainerStyle={{ flexGrow: 1, maxHeight: 500 }}>
            

            
            <View style={styles.servicesContainer}>
              {services.map((service, index) => (
                // Only render services that are visible
                service.visible !== false && (
                  <TouchableOpacity
                    key={index}
                    onPress={() => {
                      setCurrentStep(index);
                      setActiveCard(service.title); 
                    }}
                  >
                    <ServiceCard title={service.title} isStartPressed={isStartPressed} 
                      activeCard={activeCard}
                      setActiveCard={setActiveCard}/>
                  </TouchableOpacity>
                )
              ))}
            </View>

            <View style={styles.content}>
              <Text style={styles.mainHeading}>
                {steps[currentStep].heading}
              </Text>
              {steps[currentStep].content}
            </View>
            <Modal
              animationType="slide"
              transparent={true}
              visible={ModalVisible}
              onRequestClose={handleCloseModal}
            >
              <View style={styles.modalContent}>
                <OpenModal onClose={handleCloseModal} />
              </View>
            </Modal>
          </ScrollView>
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
  modalContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.1)",
  },
  container: {
    flex: 1,
    alignItems: "center",
    marginTop: 40,
  },
  overlay: {
    flex: 1,
    width: "90%",
    justifyContent: "center",
    alignItems: "center",
  },
  greenBox: {
    width: 1200,
    height: "90%",
    backgroundColor: "#F8F8F8",
    borderRadius: 15,
    elevation: 10,
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
    fontSize: 22,
    fontWeight: "bold",
    color: "black",
  },
  closeButton: {
    position: "absolute",
    right: 10,
  },
  closeButtonText: {
    fontSize: 18,
    color: "#3F5637",
    fontWeight: "bold",
  },
  content: {
    paddingHorizontal: 10,
    alignItems: "center",
  },
  mainHeading: {
    fontSize: 22,
    fontWeight: "bold",
    color: "green",
    marginBottom: 10,
    marginTop: 10,
  },
  subHeading: {
    fontSize: 16,
    textAlign: "center",
    color: "black",
    marginBottom: 30,
    marginLeft: 100,
    marginRight: 100,
  },
  mainHeading2: {
    fontSize: 22,
    fontWeight: "bold",
    color: "green",
    textAlign: "flex-start",
    marginBottom: 10,
    marginLeft: 10,
  },
  subHeading2: {
    fontSize: 16,
    textAlign: "flex-start",
    color: "black",
    marginBottom: 30,
    marginLeft: 10,
    marginRight: 100,
  },
  servicesContainer: {
    flexDirection: "row",
    padding: 10,
    marginLeft: 20,
    marginRight: 20,
     backgroundColor: "white",
    marginBottom: 10,
    shadowColor: '#000',
      shadowOffset: { width: 0, height: 2, }, 
      shadowOpacity: 0.25, 
      shadowRadius: 3.84,
       elevation: 5, 
  },
  startPressed: {
    width: 400,
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
    height: 100,
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "lightgreen",
    borderRadius: 10,
    marginBottom: 20,
    marginLeft: 10,
    marginRight: 10,
    elevation: 5,
  },
  serviceCard: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 30,
    marginLeft: 10,
    marginRight: 10,
    elevation: 5,
  },
  icon: {
    width: 25,
    height: 25,
  },
  hoverCard: {
    backgroundColor: "rgba(128, 128, 128, 0.1)",
borderRadius: 30
  },
  serviceTitle: {
    fontSize: 14,
    textAlign: "center",
  },
  hoverTitle: {
    color: "black",
    fontSize: 14,
  },
  serviceDescription: {
    fontSize: 14,
    color: "#3F5637",
  },
  hoverDescription: {
    color: "white",
    fontSize: 16,
  },
  uploadInfo: {
    marginTop: 10,
    fontSize: 14,
    color: "gray",
    marginLeft: 10,
  },
  button: {
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "black",
    paddingVertical: 10,
    paddingHorizontal: 5,
    width: 200,
    borderRadius: 5,
    marginTop: 30,
    elevation: 5,
  },
  buttonsave: {
    backgroundColor: "darkgreen",
    padding: 10,
    width: 100,
    marginLeft: 10,
    borderRadius: 5,
    marginTop: 20,
    elevation: 5,
  },
  buttondone: {
    backgroundColor: "#F8F8F8",
    padding: 10,
    width: 100,
    marginLeft: 1000,
    borderRadius: 5,
    marginTop: 100,
    elevation: 5,
  },
  buttonText: {
    color: "black",
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "center",
  },
  buttonsaveText: {
    color: "white",
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "center",
  },
  buttonsaveText2: {
    color: "#F8F8F8",
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "center",
  },
  input: {
    height: 45,
    width: 350,
    backgroundColor: "white",
    borderColor: "#206C00",
    borderWidth: 1,
    color: "black",
    fontSize: 14,
    marginLeft: 10,
    borderRadius: 5,
    padding: 10,
    marginTop: 20,
  },
  buttonind: {
    backgroundColor: "white",
    borderColor: "#206C00",
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    padding: 10,
    width: 350,
    marginTop: 20,
    marginLeft: 10,
    height: 45,
    borderRadius: 5,
  },
  buttontextind: {
color: 'black',
    textAlign: 'center'
  },
  buttonGroup: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#CCCCCC',
    borderRadius: 5,
    overflow: 'hidden',
    marginTop: 5,
    width: 360,
    marginRight: 10
  },
  buttonG: {
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F0F0F0',
    borderRightWidth: 1,
    borderRightColor: '#CCC',
  },
  buttonG2: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F0F0F0',

  },
  buttonText: {
    fontSize: 14,
    color: '#333333',
  },
  formcontainer: {
    backgroundColor: 'white',
    padding: 30,
    marginTop: 30,
    marginBottom: 30
  },
  Paymentheader: {
    marginBottom: 10,
    marginTop: 10
  },
  PaymentbuttonContainer: {
    flexDirection: 'row',
    marginTop: 20,
    marginBottom: 20,
  },
  Paymentbutton: {
    padding: 20,
    marginRight: 10,
    backgroundColor: 'none',
    borderRadius: 10,
    width: 180,
    borderColor: 'lightgrey',
    borderWidth: 2,
    marginRight: 20
  },
  PaymentselectedButton: {
    backgroundColor: 'none',
    borderColor: 'green',
    borderWidth: 3,
  },
  PaymentbuttonText: {
    textAlign: 'center',
    fontSize: 16,
    marginTop: 5
  },
 label: {
    marginBottom: 5,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  input: {
    backgroundColor: 'white',
    borderColor: '#DDD',
    borderWidth: 1,
    padding: 10,
    marginBottom: 15,
    borderRadius: 5,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  smallInput: {
    width: '45%',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  checkboxText: {
    marginLeft: 10,
    fontSize: 14,
    color: '#333',
  },
  captchaContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  captchaImage: {
    width: 30,
    height: 30,
    marginRight: 10,
  },
  captchaText: {
    fontSize: 12,
    color: '#555',
  },
  PaymentsubmitButton: {
    backgroundColor: '#3F5637',
    padding: 15,
    borderRadius: 5,
  },
  PaymentsubmitButtonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
  },
  optionCard: {
    width: 1000,
    margin: 5,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    backgroundColor: '#fdfdfd',
    alignItems: 'center',
  },
  valueText: { fontSize: 14, fontWeight: '600', marginBottom: 5, marginTop: 25, color: 'grey', textAlign: 'flex-start', alignSelf: 'flex-start' },
  descriptionText: { fontSize: 14, marginBottom: 5, color: '#333', textAlign: 'flex-start', alignSelf: 'flex-start'},
});

export default AngleQuestPage;
