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
import { LinearGradient } from 'expo-linear-gradient';

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
  const [activePlan, setActivePlan] = useState(null);
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

 // Function to save selected plan pricing to AsyncStorage
const saveToAsyncStorage = async (plan) => {
  try {
    // Get the selected price based on activePrice (monthly, quarterly, or annually)
    const selectedPrice = plan.pricing[activePrice];

    // Remove the "$" symbol and any other characters (like /month, /quarter, /year)
    const costWithoutPrefix = selectedPrice.replace(/[^0-9.-]+/g, '');

    // Save the numeric value to AsyncStorage
    await AsyncStorage.setItem('selectedPlan', costWithoutPrefix);

    console.log("Plan saved successfully:", costWithoutPrefix);
  } catch (e) {
    console.error("Failed to save the plan to AsyncStorage", e);
  }
};

// Handle button press to select a plan
const handlePress = (plan) => {
  setSelectedPlan(plan); // Set the selected plan
  setSelectedSection(plan.id); // Set the selected section to the plan id
  saveToAsyncStorage(plan); // Save the selected plan's pricing to AsyncStorage
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
  const [customAmount, setCustomAmount] = useState("");
  const [activePrice, setActivePrice] = useState('monthly');
  const [selectedPlanId, setSelectedPlanId] = useState(null);
  
  const plans = [
    {
      id: "Knowledge Backup",
      title: "Knowledge Backup",
      topic:
        "Preserve your expertise effortlessly. Solve high-priority challenges while securing a solid knowledge foundation.",
      description: [
        "Knowledge sharing Hub",
        "Support Request",
        "Professional guidance",
      ],
      pricing: {
        monthly: "$100",
        quarterly: "$85",
        annually: "$75",
      },
      color: "#FFFFFF",
    },
    {
      id: "Growth Plan Support",
      title: "Career Growth Support",
      topic:
        "Accelerate your career growth with expert-backed strategies designed to amplify your success.",
      description: [
        "AI Skill analysis",
        "Monthly strategy growth plan",
        "Knowledge sharing Hub",
      ],
      pricing: {
        monthly: "$100",
        quarterly: "$85",
        annually: "$75",
      },
      price: "$100",
      color: "#FFFFFF",
    },
    {
      id: "Knowledge Backup + Growth Plan Support",
      title: "Pro Plus",
      topic:
        "Unlock unparalleled benefits by combining services for streamlined solutions and career acceleration.",
      description: [
        "Everything in Knowledge Backup & Career Growth Support",
        "Exclusive strategy workshops",
        "Priority access to expert support",
        "Custom solutions tailored to you",
      ],
      pricing: {
        monthly: "$200",
        quarterly: "$170",
        annually: "$150",
      },
      price: "$200",
      color: "#F3E5F5"
    },
  ];

    // Function to handle the price tab selection
    const handlePriceSelect = (priceType) => {
      setActivePrice(priceType);
    };
    
  const renderPlanDetails = (plan) => (
    <View style={styles.paymentOptions}>
      {plan.id !== "custom" ? (
        <View>
          <Text style={styles.planPrice}>{plan.price}</Text>
          <TouchableOpacity style={styles.getStartedButton}>
            <Text style={styles.getStartedText}>
              Enter Your Comfortable Amount
            </Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.customInputContainer}>
          <Text style={styles.customHeader}>Enter Your Custom Amount</Text>
          <TextInput
            style={styles.input}
            placeholder="$ Enter Amount"
            keyboardType="numeric"
            value={customAmount}
            onChangeText={setCustomAmount}
          />
          <TouchableOpacity style={styles.getStartedButton}>
            <Text style={styles.getStartedText}>Book a Call</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
  
  const steps = [
    {
        heading: t(
          "Choose an area where you want AngleQuest to be your professional support",
        ),
        content: (
          <View>
             <View style={styles.navBar}>
        <TouchableOpacity
          style={[styles.navButton, activePrice === 'monthly' && styles.activeNavButton]}
          onPress={() => handlePriceSelect('monthly')}
        >
          <Text style={[styles.navText, activePrice === 'monthly' && styles.activenavText]}>Monthly</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.navButton, activePrice === 'quarterly' && styles.activeNavButton]}
          onPress={() => handlePriceSelect('quarterly')}
        >
          <Text style={[styles.navText, activePrice === 'quarterly' && styles.activenavText]}>Quarterly (save 15%)</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.navButton, activePrice === 'annually' && styles.activeNavButton]}
          onPress={() => handlePriceSelect('annually')}
        >
          <Text style={[styles.navText, activePrice === 'annually' && styles.activenavText]}>Annually (save 25%)</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.plansContainer}>
  {plans.map((plan) => (
    <View key={plan.id}>
      {plan.color === "#F3E5F5" ? (
        <LinearGradient
          colors={['#F3E5F5', '#A5D6A7']} // Apply gradient for matching plans
          style={[styles.card, { borderRadius: 10 }]} // Apply gradient to card
        >
          <Text style={styles.planTitle2}>{plan.title}</Text>
          <Text style={styles.planTopic}>{plan.topic}</Text>
          <Text style={styles.planPrice}>
            {plan.pricing[activePrice]} 
            <Text style={{ fontSize: 12, color: 'grey' }}>
              {activePrice === 'monthly' ? '/month' : activePrice === 'quarterly' ? '/quarter' : '/year'}
            </Text>
          </Text>
          <View style={{ width: '100%', borderBottomWidth: 1, borderBottomColor: '#ccc', marginTop: 15, marginBottom: 15 }} />
          <View style={styles.description}>
            {plan.description.map((item, index) => (
              <View key={index} style={styles.descriptionItem}>
                <Image 
                  source={{ uri: 'https://img.icons8.com/?size=100&id=82817&format=png&color=000000' }} 
                  style={styles.checkIcon} 
                />
                <Text style={styles.descriptionText}>{item}</Text>
              </View>
            ))}
          </View>
          <View style={{ width: '100%', borderBottomWidth: 1, borderBottomColor: '#ccc', marginTop: 10, marginBottom: 10 }} />
          {activePlan === plan.id ? (
            renderPlanDetails(plan)
          ) : (
            <TouchableOpacity
              style={styles.getStartedButton2}
              onPress={() => {
                handlePress(plan);
                saveToAsyncStorage(plan); // Save the selected plan pricing to AsyncStorage
                setCurrentStep(1); 
                setActiveCard("Service Level Agreement");
              }}
            >
              <Text style={styles.getStartedText2}>Get Started</Text>
            </TouchableOpacity>
          )}
        </LinearGradient>
      ) : (
        <View style={[styles.card, { borderRadius: 10 }]}>
          <Text style={styles.planTitle}>{plan.title}</Text>
          <Text style={styles.planTopic}>{plan.topic}</Text>
          <Text style={styles.planPrice}>
            {plan.pricing[activePrice]} 
            <Text style={{ fontSize: 12, color: 'grey' }}>
              {activePrice === 'monthly' ? '/month' : activePrice === 'quarterly' ? '/quarter' : '/year'}
            </Text>
          </Text>
          <View style={{ width: '100%', borderBottomWidth: 1, borderBottomColor: '#ccc', marginTop: 15, marginBottom: 15 }} />
          <View style={styles.description}>
            {plan.description.map((item, index) => (
              <View key={index} style={styles.descriptionItem}>
                <Image 
                  source={{ uri: 'https://img.icons8.com/?size=100&id=82817&format=png&color=000000' }} 
                  style={styles.checkIcon} 
                />
                <Text style={styles.descriptionText}>{item}</Text>
              </View>
            ))}
          </View>
          <View style={{ width: '100%', borderBottomWidth: 1, borderBottomColor: '#ccc', marginTop: 10, marginBottom: 10 }} />
          {activePlan === plan.id ? (
            renderPlanDetails(plan)
          ) : (
            <TouchableOpacity
              style={styles.getStartedButton}
              onPress={() => {
                handlePress(plan);
                saveToAsyncStorage(plan); // Save the selected plan pricing to AsyncStorage
                setCurrentStep(1); 
                setActiveCard("Service Level Agreement");
              }}
            >
              <Text style={styles.getStartedText}>Get Started</Text>
            </TouchableOpacity>
          )}
        </View>
      )}
    </View>
  ))}
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
          <TouchableOpacity onPress={async () => {
                            setCurrentStep(2);
                            setActiveCard("Payment Details");
                          }} style={styles.buttonnext}>
                      <Text style={styles.buttonsaveText}>{t("Next")}</Text>
                    </TouchableOpacity>
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
  buttonnext: {
    backgroundColor: "darkgreen",
    padding: 10,
    width: 100,
    marginLeft: 770,
    borderRadius: 5,
    marginTop: 20,
    marginBottom: 20,
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
  plansContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
  },
  card: {
    padding: 20,
    width: 300,
    borderRadius: 15,
    marginBottom: 20,
    marginRight: 30,
    alignItems: "flex-start",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  planTitle: {
    fontSize: 16,
padding: 10, backgroundColor: '#31A353',
    color: "white",
    marginBottom: 10,
    borderRadius: 10
  },
  planTitle2: {
    fontSize: 16,
padding: 10, backgroundColor: 'white',
    color: "black",
    marginBottom: 10,
    borderRadius: 10
  },
  planPrice: {
    fontSize: 30,
    fontWeight: "600",
    color: "black",
  },
  planTopic: {
    fontSize: 12,
    color: "grey",
    height: 50,
    marginBottom: 20
  },
  description: {
    marginBottom: 20,
    height: 130
  },
  descriptionItem: {
    flexDirection: 'row', 
    alignItems: 'center',
    marginBottom: 10,
  },
  checkIcon: {
    width: 16, 
    height: 16, 
    marginRight: 10, 
  },
  descriptionText: {
    fontSize: 16, 
  },
  getStartedButton: {
    backgroundColor: "white",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginTop: 10,
    borderWidth: 1,
    borderColor: '#CCC',
    alignSelf: "stretch",
    alignItems: "center",
  },
  getStartedText: {
    color: "black",
    fontWeight: "bold",
  },
  getStartedButton2: {
    backgroundColor: "black",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginTop: 10,
    alignSelf: "stretch",
    alignItems: "center",
  },
  getStartedText2: {
    color: "white",
    fontWeight: "bold",
  },
  customInputContainer: {
    marginTop: 15,
    width: "100%",
    alignItems: "center",
  },
  customHeader: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#1B5E20",
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#4CAF50",
    borderRadius: 10,
    padding: 10,
    width: "80%",
    marginBottom: 15,
  },
  paymentOptions: {
    width: "100%",
    alignItems: "center",
  },
  checkmark:{ 
fontWeight: 200
  },
  navBar: {
    flexDirection: 'row',
alignSelf: 'center',
    marginBottom: 20,
    marginTop: 20,
backgroundColor: 'white',
borderRadius: 20,
width: 750,
padding: 5
  },
  navButton: {
    padding: 10,
    borderRadius: 20,
    width: 250,
  },
  activeNavButton: {
    backgroundColor: '#31A353',
    width: 250,
    borderRadius: 20,
  },
  navText: {
    fontSize: 14,
    color: '#000',
    textAlign: 'center'
  },
  activenavText: {
    fontSize: 14,
    color: 'white',
    textAlign: 'center'
  },
  valueText: { fontSize: 14, fontWeight: '600', marginBottom: 5, marginTop: 25, color: 'grey', textAlign: 'flex-start', alignSelf: 'flex-start' },
  descriptionText: { fontSize: 14, marginBottom: 5, color: '#333', textAlign: 'flex-start', alignSelf: 'flex-start'},
});

export default AngleQuestPage;
