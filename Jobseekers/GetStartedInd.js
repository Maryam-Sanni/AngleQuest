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
  const [activeCard, setActiveCard] = useState('Welcome');
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
    const [selectedRole, setSelectedRole] = useState("specialization");
    const [first_name, setFirstName] = useState('');
      const [selectedOption, setSelectedOption] = useState('CreditOrDebitCard');
      const [fullName, setFullName] = useState('');
      const [phone, setPhone] = useState('');
      const [email, setEmail] = useState('');
      const [billingAddress, setBillingAddress] = useState('');
      const [showSetup, setShowSetup] = useState(false); 
      const scrollViewRef = useRef(null);
      const [showMore, setShowMore] = useState(false);

    const [isChecked, setIsChecked] = useState(false);
     // Get today's date in the format: Monday, YYYY-MM-DD
     const today = new Date().toLocaleDateString('en-US', {
       weekday: 'long',
       year: 'numeric',
       month: '2-digit',
       day: '2-digit',
     });
   
     const handleCheckboxToggle = () => {
       setIsChecked(!isChecked);
     };

  useEffect(() => {
    // Retrieve first_name and last_name from AsyncStorage
    const retrieveData = async () => {
      try {
        const storedFirstName = await AsyncStorage.getItem('first_name');
        const storedLastName = await AsyncStorage.getItem('last_name');
        if (storedFirstName !== null && storedLastName !== null) {
          console.log('Stored first_name:', storedFirstName);
          console.log('Stored last_name:', storedLastName);
          setFirstName(storedFirstName);
        }
      } catch (error) {
        console.error('Error retrieving data from AsyncStorage:', error);
      }
    };

    retrieveData();
  }, []);

  const roles = [
    "SAP FI", "SAP MM", "SAP SD", "SAP PP", 
    "Microsoft Dynamics Sales", "Microsoft Dynamics Field Service", 
    "Microsoft Dynamics Marketing", "Microsoft Dynamics Developer", 
    "Microsoft Business Central", "Microsoft Dynamics F&O"
  ];

  const handleRoleSelection = (role) => {
    console.log('Selected role:', role);  // Debugging line
    setSelectedRole(role);
  };

  const handleContinue = () => {
    if (selectedRole) {
      // Directly set the selectedRole here
      setSelectedRole(selectedRole);

      // Perform any additional actions here, like updating steps or active card
      setCurrentStep(1);  // This will change the step, you can define the steps accordingly
      setActiveCard("Subscription Plans");  // Set the active card to "Subscription Plans"
      
      alert('Your selection has been saved!');
    } else {
      alert('Please select a role first.');
    }
  };
  

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

const handlePress = (selectedPlan) => {
  // Highlight the selected plan
  const updatedPlans = plans.map((plan) =>
    plan.id === selectedPlan.id
      ? { ...plan, color: '#F3E5F5' } // Highlight the selected plan
      : { ...plan, color: '#FFFFFF' } // Reset other plans
  );

  setPlans(updatedPlans); // Update state with selected plan
  setSelectedPlan(selectedPlan); // Set selected plan
  saveToAsyncStorage(selectedPlan); // Save to AsyncStorage

   // Scroll down within the ScrollView by a specific number of pixels
   if (scrollViewRef.current) {
    scrollViewRef.current.scrollTo({
      y: 700,  // Number of pixels to scroll down
      animated: true, // Smooth scroll
    });
  }
};





  const [fontsLoaded] = useFonts({
    "Roboto-Light": require("../assets/fonts/Roboto-Light.ttf"),
  });

  const sections = [
    {
      title: "Knowledge Backup",
      options: [
        { title: "Default", details: ["Backup response time - 24hrs", "Best practice access - 30%"], cost: "No extra cost", isDefault: true },
        { title: "Standard", details: ["Backup response time - 12hrs", "Best practice access - 60%"], cost: "Extra $40 monthly" },
        { title: "Advance", details: ["Backup response time - 4hrs", "Best practice access - Unlimited"], cost: "Extra $100 monthly" },
      ],
    },
    {
      title: "Career Boost",
      options: [
        { title: "Default", details: ["Skill gap analysis (AI & expert)", "Growth plan", "Coaching hub - 1 hub access"], cost: "No extra cost", isDefault: true },
        { title: "Standard", details: ["Skill gap analysis (AI & expert)", "Growth plan", "Coaching hub - 2 hub access"], cost: "Extra $40 monthly" },
        { title: "Advance", details: ["Skill gap analysis (AI & expert)", "Growth plan", "Coaching hub - Unlimited"], cost: "Extra $100 monthly" },
      ],
    },
    {
      title: "Knowledge Backup + Career Boost",
      options: [
        { title: "Default", details: ["Skill gap analysis (AI & expert)", "Growth plan", "Backup response time - 24hrs", "Coaching hub - 1 hub access", "Best practice access - 30%"], cost: "No extra cost", isDefault: true },
        { title: "Standard", details: ["Skill gap analysis (AI & expert)", "Growth plan", "Backup response time - 12hrs", "Coaching hub - 2 hub access", "Best practice access - 60%"], cost: "Extra $40 monthly" },
        { title: "Advance", details: ["Skill gap analysis (AI & expert)", "Growth plan", "Backup response time - 4hrs", "Coaching hub - Unlimited", "Best practice access - Unlimited"], cost: "Extra $100 monthly" },
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
  
  const [plans, setPlans] = useState([
    {
      id: "Knowledge Backup",
      title: "Monthly",
      topic: "Cancel anytime with 1 month notice",
      description: {
        monthly: ["Support request", "Knowledge sharing hub", "Best practices"],
        quarterly: ["Skill Analysis", "Growth Plan", "Hub", "Interview"],
        annually: ["Everything in Knowledge Backup", "Everything in Career Boost"]
      },
      offer: {
        monthly: ["Get A-Level support on your work", "Solve your blockers with top expert", "Complete task in record time",  "Learn from top expert first-hand", "Pick up more challenging task at work and complete it quickly", "Access global best practice" , "Know and apply global best practices to your work and advice others", "Accomplish more in less time", "Meet your SLA with ease", "Take more project on", "Command trust and dependability",  "Create up-to 6 support request monthly"],
        quarterly: ["Have your skills evaluated by expert", "Know the precise gap in your skillset", "Receive a personalized growth plan",  "Establish timeline to grow from one level to another", "Be taught by dedicated expert to close the gap in your skillset", "Get continuous skillset evaluation" , "Identify and focus on the key areas that matter with our expert", "Access live interview with our expert before actual interviews", `Dedicated expert to clarify all concerns and challenges regarding ${selectedRole}`],
        annually: ["Command trust and dependability",  "Create up-to 6 support request monthly", "Have your skills evaluated by expert","Know the precise gap in your skillset", "Receive a personalized growth plan",  "Establish timeline to grow from one level to another", "Be taught by dedicated expert to close the gap in your skillset", "Get continuous skillset evaluation" , "Identify and focus on the key areas that matter with our expert", "Access live interview with our expert before actual interviews", `Dedicated expert to clarify all concerns and challenges regarding ${selectedRole}`, "Get A-Level support on your work", "Solve your blockers with top expert", "Complete task in record time",  "Learn from top expert first-hand", "Pick up more challenging task at work and complete it quickly", "Access global best practice" , "Know and apply global best practices to your work and advice others", "Accomplish more in less time", "Meet your SLA with ease", "Take more project on"]
      },
      explanation: {
        monthly: "Maintain your top performer status by completing your task quickly and professionally with grade-A support from our top expert",
        quarterly: `Expedite your transition from one level of your ${selectedRole} skills to the next.`,
        annually: "This offers the best value and commitment for the long-term with the most benefits."
      },
      pricing: {
        monthly: "$100",
        quarterly: "$100",
        annually: "$175"
      },
      amn: "month", // You can change this based on the duration, as needed.
      color: "#FFFFFF",
    },
    {
      id: "Growth Plan Support",
      title: "Pay as you go",
      topic: "Pay per item you want to resolve",
      description: {
        monthly: ["Support request", "Knowledge sharing hub", "Best practices"],
        quarterly: ["Skill Analysis", "Growth Plan", "Hub", "Interview"],
        annually: ["Everything in Knowledge Backup", "Everything in Career Boost"]
      },
      offer: {
        monthly: ["Get A-Level support on your work", "Solve your blockers with top expert", "Complete task in record time",  "Learn from top expert first-hand", "Pick up more challenging task at work and complete it quickly", "Access global best practice" , "Know and apply global best practices to your work and advice others", "Accomplish more in less time", "Meet your SLA with ease", "Take more project on", "Command trust and dependability",  "Create up-to 6 support request monthly"],
        quarterly: ["Have your skills evaluated by expert", "Know the precise gap in your skillset", "Receive a personalized growth plan",  "Establish timeline to grow from one level to another", "Be taught by dedicated expert to close the gap in your skillset", "Get continuous skillset evaluation" , "Identify and focus on the key areas that matter with our expert", "Access live interview with our expert before actual interviews", "Dedicated expert to clarify all concerns and challenges regarding {0}"],
        annually: ["Command trust and dependability",  "Create up-to 6 support request monthly", "Have your skills evaluated by expert","Know the precise gap in your skillset", "Receive a personalized growth plan",  "Establish timeline to grow from one level to another", "Be taught by dedicated expert to close the gap in your skillset", "Get continuous skillset evaluation" , "Identify and focus on the key areas that matter with our expert", "Access live interview with our expert before actual interviews", "Dedicated expert to clarify all concerns and challenges regarding {0}", "Get A-Level support on your work", "Solve your blockers with top expert", "Complete task in record time",  "Learn from top expert first-hand", "Pick up more challenging task at work and complete it quickly", "Access global best practice" , "Know and apply global best practices to your work and advice others", "Accomplish more in less time", "Meet your SLA with ease", "Take more project on"]
      },
      explanation: {
        monthly: "",
        quarterly: "",
        annually: ""
      },
      pricing: {
        monthly: "$40",
        quarterly: "$40",
        annually: "$65"
      },
      amn: "session",
      color: "#FFFFFF",
    }
  ]);
  

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
      heading: t(" "),
      content: (
        <View>
  <View style={styles.welcomeheader}>
    <View style={styles.whiteBox}>
      <Image 
        source={{ uri: 'https://img.icons8.com/?size=100&id=FUZiNN6aw2Rb&format=png&color=000000' }} 
        style={styles.image}
      />
      <Text style={styles.greetingText}>Hello John, Welcome to Anglequest</Text>
      <Text style={styles.subHeading}>Let's get your account setup. Takes a maximum of 5 minutes.</Text>
      {!showSetup && (
        <TouchableOpacity 
          style={styles.startnowButton} 
          onPress={() => setShowSetup(true)} // Switch to the setup view
        >
          <Text style={styles.continueButtonText}>Start Now</Text>
        </TouchableOpacity>
      )}
    </View>

    {showSetup && (
      <View style={{ flexDirection: 'column', marginLeft: 50 }}>
        <Text style={{ fontSize: 20, fontWeight: '600', width: 600 }}>
          Which of these technologies do you specialize in, or which do you want to transition into?
        </Text>
        <Text style={{ fontSize: 14, color: 'grey', marginTop: 5 }}>Make a selection below</Text>
        <View style={styles.rolesContainer}>
          {roles.map((role, index) => (
            <TouchableOpacity 
              key={index} 
              style={[
                styles.roleButton, 
                selectedRole === role && styles.selectedRole
              ]} 
              onPress={() => handleRoleSelection(role)}
            >
              <Text style={styles.roleText}>{role}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <TouchableOpacity 
          style={[
            styles.continueButton, 
            !selectedRole && styles.disabledButton
          ]} 
          onPress={handleContinue} 
          disabled={!selectedRole} // Disable if no role is selected
        >
          <Text style={styles.continueButtonText}>Continue</Text>
        </TouchableOpacity>
      </View>
    )}
  </View>
</View>

      ),
    },
    {
        heading: t(
          "Choose a service, plan and SLA ",
        ),
        content: (
          <View>
             <View style={styles.navBar}>
        <TouchableOpacity
          style={[styles.navButton, activePrice === 'monthly' && styles.activeNavButton]}
          onPress={() => handlePriceSelect('monthly')}
        >
          <Text style={[styles.navText, activePrice === 'monthly' && styles.activenavText]}>Knowledge Backup</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.navButton, activePrice === 'quarterly' && styles.activeNavButton]}
          onPress={() => handlePriceSelect('quarterly')}
        >
          <Text style={[styles.navText, activePrice === 'quarterly' && styles.activenavText]}>Career Boost</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.navButton2, activePrice === 'annually' && styles.activeNavButton2]}
          onPress={() => handlePriceSelect('annually')}
        >
          <Text style={[styles.navText, activePrice === 'annually' && styles.activenavText]}>Knowledge Backup + Career Boost</Text>
        </TouchableOpacity>
      </View>
      <View style={{width: 850, alignSelf: 'center', alignItems: 'center'}}>
  <Text style={{textAlign: 'center', marginBottom: 20}}>
    {plans.map(plan => {
      if (activePrice === 'monthly') {
        return plan.explanation.monthly;
      } else if (activePrice === 'quarterly') {
        return plan.explanation.quarterly;
      } else {
        return plan.explanation.annually;
      }
    })}
  </Text>
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
          <View style={styles.description}>
          {plan.description[activePrice].map((item, index) => (
            <View key={index} style={styles.descriptionItem}>
              <Image 
                source={{ uri: 'https://img.icons8.com/?size=100&id=82817&format=png&color=000000' }} 
                style={styles.checkIcon} 
              />
              <Text style={styles.descriptionText}>{item}</Text>
            </View>
          ))}
          </View>
          <Text style={styles.planPrice}>
            {plan.pricing[activePrice]} 
            <Text style={{ fontSize: 12, color: 'grey' }}>
            {activePrice === 'monthly' ? `/${plan.amn}` : activePrice === 'quarterly' ? `/${plan.amn}` : `/${plan.amn}`}
            </Text>
          </Text>
          <View style={{ width: '100%', borderBottomWidth: 1, borderBottomColor: '#ccc', marginTop: 15, marginBottom: 15 }} />
          <View
  style={[
    styles.description2,
    {
      height: showMore
        ? activePrice === "monthly"
          ? 420
          : activePrice === "quarterly"
          ? 420
          : 800
        : 190,
    },
  ]}
>
  {plan.offer[activePrice]
    .slice(0, showMore ? plan.offer[activePrice].length : 4)
    .map((item, index) => (
      <View key={index} style={styles.descriptionItem}>
        <Image
          source={{
            uri: "https://img.icons8.com/?size=100&id=J59Mg9rwboHk&format=png&color=000000",
          }}
          style={styles.checkIcon}
        />
        <Text style={styles.descriptionText}> {item}</Text>
      </View>
    ))}
  <TouchableOpacity
    onPress={() => setShowMore((prev) => !prev)}
    style={styles.toggleButton}
  >
    <Text style={styles.toggleButtonText}>
      {showMore ? "See Less" : "See More"}
    </Text>
  </TouchableOpacity>
</View>
          <View style={{ width: '100%', borderBottomWidth: 1, borderBottomColor: '#ccc', marginTop: 10, marginBottom: 10 }} />
          {activePlan === plan.id ? (
            renderPlanDetails(plan)
          ) : (
            <TouchableOpacity
              style={styles.getStartedButton2}
              onPress={() => {
                handlePress(plan);
              }}
            >
              <Text style={styles.getStartedText2}>Selected</Text>
            </TouchableOpacity>
          )}
        </LinearGradient>
      ) : (
        <View style={[styles.card, { borderRadius: 10 }]}>
          <Text style={styles.planTitle}>{plan.title}</Text>
          <Text style={styles.planTopic}>{plan.topic}</Text>
          <View style={styles.description}>
          {plan.description[activePrice].map((item, index) => (
            <View key={index} style={styles.descriptionItem}>
              <Image 
                source={{ uri: 'https://img.icons8.com/?size=100&id=82817&format=png&color=000000' }} 
                style={styles.checkIcon} 
              />
              <Text style={styles.descriptionText}>{item}</Text>
            </View>
          ))}
          </View>
          <Text style={styles.planPrice}>
          {plan.pricing[activePrice]} 
<Text style={{ fontSize: 12, color: 'grey' }}>
  {activePrice === 'monthly' ? `/${plan.amn}` : activePrice === 'quarterly' ? `/${plan.amn}` : `/${plan.amn}`}
</Text>
          </Text>
          <View style={{ width: '100%', borderBottomWidth: 1, borderBottomColor: '#ccc', marginTop: 15, marginBottom: 15 }} />
          <View
  style={[
    styles.description2,
    {
      height: showMore
        ? activePrice === "monthly"
          ? 420
          : activePrice === "quarterly"
          ? 420
          : 800
        : 190,
    },
  ]}
>
  {plan.offer[activePrice]
    .slice(0, showMore ? plan.offer[activePrice].length : 4)
    .map((item, index) => (
      <View key={index} style={styles.descriptionItem}>
        <Image
          source={{
            uri: "https://img.icons8.com/?size=100&id=J59Mg9rwboHk&format=png&color=000000",
          }}
          style={styles.checkIcon}
        />
        <Text style={styles.descriptionText}> {item}</Text>
      </View>
    ))}
  <TouchableOpacity
    onPress={() => setShowMore((prev) => !prev)}
    style={styles.toggleButton}
  >
    <Text style={styles.toggleButtonText}>
      {showMore ? "See Less" : "See More"}
    </Text>
  </TouchableOpacity>
</View>

          <View style={{ width: '100%', borderBottomWidth: 1, borderBottomColor: '#ccc', marginTop: 10, marginBottom: 10 }} />
          {activePlan === plan.id ? (
            renderPlanDetails(plan)
          ) : (
            <TouchableOpacity
              style={styles.getStartedButton}
              onPress={() => {
                handlePress(plan);
              }}
            >
              <Text style={styles.getStartedText}>Select</Text>
            </TouchableOpacity>
          )}
        </View>
      )}
    </View>
  ))}
</View>
<View style={{marginLeft: 70, marginRight: 70, marginTop: 50}}>
  {sections
    .filter((section) => {
      if (activePrice === 'monthly') return section.title === 'Knowledge Backup';
      if (activePrice === 'quarterly') return section.title === 'Career Boost';
      if (activePrice === 'annually') return section.title === 'Knowledge Backup + Career Boost';
      return false;
    })
    .map((section, sectionIndex) => {
      const isFirstOptionSelected =
        !selectedOptions[section.title] && section.options.length > 0;

      return (
        <View
          key={sectionIndex}
          style={{
            marginBottom: 30,
            padding: 20,
            backgroundColor: '#fff',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 10,
            elevation: 3,
          }}
        >
          <Text
            style={{
              fontSize: 22,
              fontWeight: '600',
              color: 'black',
              marginBottom: 40,
              textAlign: 'flex-start',
            }}
          >
            {section.title} SLA
          </Text>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
            {section.options.map((option, optionIndex) => {
              const isSelected =
                selectedOptions[section.title]?.title === option.title ||
                (isFirstOptionSelected && optionIndex === 0);

              if (isFirstOptionSelected && optionIndex === 0) {
                handleSelect(section.title, option);
              }

              return (
                <View key={optionIndex} style={{ alignItems: 'flex-start', width: 320 }}>
                  <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 10 }}>
                    {option.title}
                  </Text>
                  {option.details.map((detail, index) => (
                    <Text key={index} style={{ fontSize: 14, marginBottom: 5 }}>
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
                      await handleSelect(section.title, option);
                    }}
                  >
                    <Text style={{ color: isSelected ? '#fff' : 'darkgrey', fontSize: 18 }}>
                      {isSelected ? 'Selected' : 'Select'}
                    </Text>
                  </TouchableOpacity>
                  <Text
                    style={{
                      fontSize: 14,
                      textAlign: 'center',
                      alignSelf: 'center',
                      marginTop: 10,
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
<TouchableOpacity onPress={async () => {
                            setCurrentStep(2);
                            setActiveCard("AngleQuest Agreement");
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
        
           <View style={styles.borderBox}>
                  <ScrollView style={styles.scrollView}>
                    <Text style={styles.title}>THIS APPLICATION LICENCE AGREEMENT</Text>
                    <Text style={styles.date}>Dated: {today}</Text>
                    <Text style={styles.content}>
                      Welcome to AngleQuest ("the Service"). These Terms and Conditions ("Terms") govern your access and use of our software-as-a-service (SaaS) platform, located www.anglequest.com, operated by AngleQuest ("we," "our," or "us"). By using the Service, you agree to comply with and be bound by these Terms. If you do not agree, please do not use the Service.
                      {'\n'}
                      {'\n'}1. Definitions
                      {'\n'}•	Service: The software-as-a-service application provided by AngleQuest.
                      {'\n'}•	User: Any individual or entity who accesses or uses the Service.
                      {'\n'}•	Account: The user profile created to access the Service.
                      {'\n'}•	Content: Any data, information, text, files, or other materials uploaded, downloaded, or stored using the Service.
                      {'\n'}
  {'\n'}2. Account Registration
  {'\n'}2.1. To use the Service, you must register for an account and provide accurate and complete information.2.2. You are responsible for maintaining the confidentiality of your account credentials.2.3. You agree to notify us immediately if you suspect unauthorized use of your account.
  {'\n'}
  {'\n'}3. Use of the Service

  {'\n'}3.1. The Service is provided solely for your lawful use.3.2. You agree not to:
  {'\n'}•	Reverse engineer, decompile, or attempt to extract the source code of the Service.
  {'\n'}•	Use the Service for any illegal or unauthorized purpose.
  {'\n'}•	Interfere with or disrupt the integrity or performance of the Service.
  {'\n'}
  {'\n'}4. Subscription and Payment
  {'\n'}4.1. The Service may require a subscription to access certain features.4.2. Subscription fees are billed in advance on a monthly basis and are non-refundable.4.3. We reserve the right to change subscription fees with [30 days'] prior notice.
  {'\n'}
  {'\n'}5. User Content
  {'\n'}5.1. You retain ownership of all Content you upload to the Service.5.2. By uploading Content, you grant us a limited license to use, store, and process your Content as necessary to provide the Service.5.3. You are solely responsible for the legality, accuracy, and quality of your Content.
  {'\n'}
  {'\n'}6. Intellectual Property
  {'\n'}6.1. The Service and all associated materials, including logos, software, and content (excluding User Content), are the exclusive property of [Your Company Name].6.2. You are granted a limited, non-exclusive, non-transferable license to use the Service under these Terms.
  {'\n'}
  {'\n'}7. Termination
  {'\n'}7.1. You may terminate your account at any time by contacting us or using the settings in your account.7.2. We reserve the right to suspend or terminate your account for any breach of these Terms or any suspected illegal activity.7.3. Upon termination, you will lose access to the Service, and your Content may be deleted.
  {'\n'}
  {'\n'}8. Disclaimers
  {'\n'}8.1. The Service is provided "as is" without warranties of any kind, either express or implied.8.2. We do not guarantee that the Service will be error-free, secure, or operate uninterrupted.
  {'\n'}
  {'\n'}9. Limitation of Liability
  {'\n'}9.1. To the maximum extent permitted by law, we shall not be liable for any indirect, incidental, special, or consequential damages, including but not limited to loss of profits, data, or use.9.2. Our total liability for any claim related to the Service shall not exceed the amount you paid for the Service in the [12 months] preceding the claim.
  {'\n'}
  {'\n'}10. Privacy
  {'\n'}10.1. By using the Service, you consent to our data collection, use, and disclosure practices as described in our Privacy Policy [insert link].
  {'\n'}
  {'\n'}11. Modifications
  {'\n'}11.1. We reserve the right to update these Terms at any time.11.2. Changes will be effective immediately upon posting, and your continued use of the Service constitutes your acceptance of the modified Terms.
  {'\n'}
  {'\n'}12. Governing Law
  {'\n'}12.1. These Terms shall be governed by and construed in accordance with the laws of [Your Jurisdiction].12.2. Any disputes arising under these Terms shall be subject to the exclusive jurisdiction of the courts of [Your Jurisdiction].
  {'\n'}
  {'\n'}13. Contact Information
  {'\n'}If you have any questions about these Terms, please contact us at:Email: [Insert Email Address]Address: [Insert Company Address]
  {'\n'}
  {'\n'} By accessing or using the Service, you acknowledge that you have read, understood, and agree to be bound by these Terms and Conditions.
                    </Text>
                    </ScrollView>
                  </View>
                   <View style={styles.checkboxContainer}>
                            <CheckBox value={isChecked} onValueChange={handleCheckboxToggle} />
                            <Text style={styles.checkboxText}>I agree to the terms and conditions</Text>
                          </View>
          <TouchableOpacity onPress={async () => {
                            setCurrentStep(3);
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
          
                <View style={{marginLeft: 40, marginRight: 40}}>
                <View style={styles.buttonContainer}>
                          {/* Credit or Debit Card Option */}
                          <TouchableOpacity
                            style={[styles.button, selectedOption === 'CreditOrDebitCard' && styles.selectedButton]}
                            onPress={() => setSelectedOption('CreditOrDebitCard')}
                          >
                            {selectedOption === 'CreditOrDebitCard' && (
                              <Image
                                source={{
                                  uri: 'https://img.icons8.com/?size=100&id=83205&format=png&color=206C00',
                                }}
                                style={{ width: 20, height: 20, alignSelf: 'flex-end', marginTop: -10 }}
                              />
                            )}
                            <Image
                              source={{
                                uri: 'https://img.icons8.com/?size=100&id=22128&format=png&color=000000',
                              }}
                              style={{ width: 50, height: 50, alignSelf: 'center' }}
                            />
                            <Text style={styles.buttonText}>Credit Or Debit Card</Text>
                          </TouchableOpacity>
                
                          {/* Contact Details Option */}
                          <TouchableOpacity
                            style={[styles.button, selectedOption === 'ContactDetails' && styles.selectedButton]}
                            onPress={() => setSelectedOption('ContactDetails')}
                          >
                            {selectedOption === 'ContactDetails' && (
                              <Image
                                source={{
                                  uri: 'https://img.icons8.com/?size=100&id=83205&format=png&color=206C00',
                                }}
                                style={{ width: 20, height: 20, alignSelf: 'flex-end', marginTop: -10 }}
                              />
                            )}
                            <Image
                              source={{
                                uri: 'https://img.icons8.com/?size=100&id=34105&format=png&color=000000',
                              }}
                              style={{ width: 50, height: 50, alignSelf: 'center', marginTop: 10 }}
                            />
                            <Text style={styles.buttonText}>Contact Details</Text>
                          </TouchableOpacity>
                        </View>
                
                        {/* Conditionally Render Form Fields */}
                        {selectedOption === 'CreditOrDebitCard' ? (
                          <View style={styles.formcontainer}>
                            <Text style={styles.label}>Cardholder Name (exactly as printed on card)</Text>
                            <TextInput
                              style={styles.input}
                              placeholder="e.g., John Doe"
                              value={cardName}
                              onChangeText={setCardName}
                            />
                
                            <Text style={styles.label}>Card Number</Text>
                            <TextInput
                              style={styles.input}
                              placeholder="1234 5678 9012 3456"
                              value={cardNumber}
                              onChangeText={setCardNumber}
                              keyboardType="numeric"
                            />
                
                            <Text style={styles.label}>CVV</Text>
                            <TextInput
                              style={styles.input}
                              placeholder="123"
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
                                value={expMonth}
                                onChangeText={setExpMonth}
                                keyboardType="numeric"
                              />
                              <TextInput
                                style={[styles.input, styles.smallInput]}
                                placeholder="YY"
                                value={expYear}
                                onChangeText={setExpYear}
                                keyboardType="numeric"
                              />
                            </View>
                          </View>
                        ) : (
                          <View style={styles.formcontainer}>
                            <Text style={styles.label}>Full Name</Text>
                            <TextInput
                              style={styles.input}
                              placeholder="e.g., John Doe"
                              value={fullName}
                              onChangeText={setFullName}
                            />
                
                            <Text style={styles.label}>Phone</Text>
                            <TextInput
                              style={styles.input}
                              placeholder="e.g., +1 123 456 7890"
                              value={phone}
                              onChangeText={setPhone}
                              keyboardType="phone-pad"
                            />
                
                            <Text style={styles.label}>Email</Text>
                            <TextInput
                              style={styles.input}
                              placeholder="e.g., john.doe@example.com"
                              value={email}
                              onChangeText={setEmail}
                              keyboardType="email-address"
                            />
                
                            <Text style={styles.label}>Billing Address</Text>
                            <TextInput
                              style={styles.input}
                              placeholder="e.g., 123 Main St, City, State"
                              value={billingAddress}
                              onChangeText={setBillingAddress}
                            />
                          </View>
                        )}
                
                        {/* Checkbox */}
                        <View style={styles.checkboxContainer}>
                  <CheckBox
                    value={useExistingAddress}
                    onValueChange={setUseExistingAddress}
                    tintColors={{ true: '#206C00', false: '#DDD' }} // iOS and Android color for true and false states
                  />
                  <Text style={styles.checkboxText}>Use the existing address for this payment method</Text>
                </View>
                
                        <View style={styles.checkboxContainer}>
                  <Switch
                    value={isRecurring}
                    onValueChange={(value) => setIsRecurring(value)}
                    trackColor={{ false: '#DDD', true: '#206C00' }} 
                    thumbColor={isRecurring ? '#206C00' : '#FFF'} 
                  />
                  <Text style={styles.checkboxText}>Make this payment recurring</Text>
                </View>
          
                {/* Submit Button */}
                <TouchableOpacity style={styles.buttonsave}>
            <Text style={styles.buttonsaveText}>{t("Save")}</Text>
          </TouchableOpacity>
            
                <TouchableOpacity style={styles.buttondone}>
            <Text style={styles.buttonsaveText2}>{t("Submit")}</Text>
          </TouchableOpacity>

</View>
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
      title: t("Welcome"),
      icon: "https://img.icons8.com/?size=100&id=SazSfIWdDmr2&format=png&color=000000",
    },
    {
      title: t("Subscription Plans"),
      icon: "https://img.icons8.com/?size=100&id=48354&format=png&color=000000",
    },
    {
      title: t("AngleQuest Agreement"),
      icon: "https://img.icons8.com/?size=100&id=48354&format=png&color=000000",
    },
    {
      title: t("Payment Details"),
      icon: "https://img.icons8.com/?size=100&id=48354&format=png&color=000000",
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
          <ScrollView ref={scrollViewRef} contentContainerStyle={{ flexGrow: 1, maxHeight: 500  }}>
            

            
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
    marginBottom: 10,
    marginTop: 10,
    textAlign: 'center'
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
marginLeft: 1000,
marginTop: 50,
marginBottom: 50,
    borderRadius: 5,
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
    marginTop: 10,
    marginLeft: 20
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
    marginLeft: 50
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
    alignSelf: 'center'
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
    height: 10,
    marginBottom: 20
  },
  description: {
    marginBottom: 20,
    height: 100
  },
  description2: {
    marginBottom: 20,
    height: 750
  },
  descriptionItem: {
    flexDirection: 'row', 
    alignItems: 'center',
    marginBottom: 5,
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
width: 860,
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
  navButton2: {
    padding: 10,
    borderRadius: 20,
    width: 350,
  },
  activeNavButton2: {
    backgroundColor: '#31A353',
    width: 350,
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
  scrollView: {
    marginVertical: 10,
  },
  borderBox: {
    borderWidth: 2,
    borderColor: '#000',
    borderRadius: 10,
    padding: 15,
    backgroundColor: '#fff',
    marginLeft: 50,
    marginRight: 50,
    marginTop: 10,
    height: 300
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  date: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 15,
  },
  content: {
    fontSize: 14,
    lineHeight: 20,
    color: '#333',
  },
  welcomeheader: {
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: 30,
  },
  image: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  whiteBox: {
    backgroundColor: 'white',
    marginLeft: 50,
    height: 350,
    justifyContent: 'center',
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    alignItems: 'center',
  },
  greetingText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  subHeading: {
    fontSize: 16,
    color: '#777',
    marginTop: 10,
    textAlign: 'center',
    width: 450
  },
  rolesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: 600,
    marginTop: 20,
  },
  roleButton: {
    backgroundColor: '#f0f0f0',
    padding: 10,
    margin: 5,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedRole: {
    backgroundColor: 'lightgreen',
  },
  roleText: {
    fontSize: 14,
    color: '#333',
  },
  continueButton: {
    padding: 15,
    marginTop: 30,
    borderRadius: 5,
    width: 100,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#206C00',
  },
  startnowButton: {
    padding: 15,
    marginTop: 30,
    borderRadius: 5,
    width: 120,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#206C00',
  },
  disabledButton: {
    backgroundColor: '#ccc', // Grey background when disabled
  },
  continueButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 20,
    marginBottom: 20,
  },
  button: {
    padding: 20,
    marginRight: 10,
    backgroundColor: 'none',
    borderRadius: 10,
    width: 180,
    borderColor: 'lightgrey',
    borderWidth: 2,
    marginRight: 20
  },
  selectedButton: {
    backgroundColor: 'none',
    borderColor: 'green',
    borderWidth: 3,
  },
  buttonText: {
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
    marginLeft: 50, marginTop: 20
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
  submitButton: {
    backgroundColor: '#206C00',
    padding: 15,
    borderRadius: 5,
  },
  submitButtonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
  },
  toggleButton: {
    marginTop: 10,
    alignSelf: "flex-start",
marginLeft: 15
  },
  toggleButtonText: {
    fontSize: 14,
    color: "grey",
    textDecorationLine: 'underline'
  },
  valueText: { fontSize: 14, fontWeight: '600', marginBottom: 5, marginTop: 25, color: 'grey', textAlign: 'flex-start', alignSelf: 'flex-start' },
  descriptionText: { fontSize: 14, marginBottom: 5, color: '#333', textAlign: 'flex-start', alignSelf: 'flex-start'},
});

export default AngleQuestPage;
