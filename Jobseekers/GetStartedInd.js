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
    const [selectedRole, setSelectedRole] = useState(null);
    const [first_name, setFirstName] = useState('');
      const [selectedOption, setSelectedOption] = useState('CreditOrDebitCard');
      const [fullName, setFullName] = useState('');
      const [phone, setPhone] = useState('');
      const [email, setEmail] = useState('');
      const [billingAddress, setBillingAddress] = useState('');

    // Get today's date in the format: Monday, YYYY-MM-DD
  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });

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
    setSelectedRole(role);
  };

  const handleContinue = () => {
    if (selectedRole) {
      setCurrentStep(1);  // This will change the step, you can define the steps accordingly
      setActiveCard("Subscription Plans");  // Set the active card to "Subscription Plans"
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
  // Update the colors dynamically based on the selected plan
  const updatedPlans = plans.map((plan) =>
    plan.id === selectedPlan.id
      ? { ...plan, color: '#F3E5F5' } // Highlight the selected plan
      : { ...plan, color: '#FFFFFF' } // Reset the color for other plans
  );

  setPlans(updatedPlans); // Update the state with the new plan colors
  setSelectedPlan(selectedPlan); // Set the selected plan
  setSelectedSection(selectedPlan.id); // Update the selected section
  saveToAsyncStorage(selectedPlan); // Save the selected plan to AsyncStorage
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
      title: "Career Boost",
      options: [
        { title: "Default", details: ["Skill gap analysis (AI & expert)", "Growth plan", "Coaching hub - 1 hub access"], cost: "No additional cost", isDefault: true },
        { title: "Standard", details: ["Skill gap analysis (AI & expert)", "Growth plan", "Coaching hub - 2 hub access"], cost: "$40 monthly" },
        { title: "Advance", details: ["Skill gap analysis (AI & expert)", "Growth plan", "Coaching hub - Unlimited"], cost: "$100 monthly" },
      ],
    },
    {
      title: "Knowledge Backup + Career Boost",
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
  
  const [plans, setPlans] = useState([
    {
      id: "Knowledge Backup",
      title: "Monthly",
      topic:
        "Preserve your expertise effortlessly. Solve high-priority challenges while securing a solid knowledge foundation.",
      description: ["Knowledge sharing Hub", "Support Request"],
      pricing: {
        monthly: "$100",
        quarterly: "$185",
        annually: "$250",
      },
      amn: "month",
      color: "#F3E5F5",
    },
    {
      id: "Growth Plan Support",
      title: "Pay as you go",
      topic:
        "Accelerate your career growth with expert-backed strategies designed to amplify your success.",
      description: [
        "AI Skill analysis",
        "Monthly strategy growth plan",
        "Knowledge sharing Hub",
      ],
      pricing: {
        monthly: "$30",
        quarterly: "$35",
        annually: "$55",
      },
      amn: "session",
      color: "#FFFFFF",
    },
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
          <Text style={styles.greetingText}>Hello {first_name}, Welcome to Anglequest</Text>
          <Text style={styles.subHeading}>Start by letting us what specialization you want anglequest to curate for you</Text>
        </View>
   

        <View style={{flexDirection: 'column', marginLeft: 50}}>
        <Text style={{fontSize: 20, fontWeight: 600, }}>My Specialization is:</Text>
        <Text style={{fontSize: 14, color: 'grey' }}>Make a selection below</Text>
      <View style={styles.rolesContainer}>
        {roles.map((role, index) => (
          <TouchableOpacity 
            key={index} 
            style={[styles.roleButton, selectedRole === role && styles.selectedRole]} 
            onPress={() => handleRoleSelection(role)}
          >
            <Text style={styles.roleText}>{role}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <TouchableOpacity 
        style={[styles.continueButton, !selectedRole && styles.disabledButton]} 
        onPress={handleContinue} 
        disabled={!selectedRole}  // Disable if no role is selected
      >
        <Text style={styles.continueButtonText}>Continue</Text>
      </TouchableOpacity>

      </View>

      </View>
     
 

        </View>
      ),
    },
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
            {activePrice === 'monthly' ? `/${plan.amn}` : activePrice === 'quarterly' ? `/${plan.amn}` : `/${plan.amn}`}
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
          <Text style={styles.planPrice}>
          {plan.pricing[activePrice]} 
<Text style={{ fontSize: 12, color: 'grey' }}>
  {activePrice === 'monthly' ? `/${plan.amn}` : activePrice === 'quarterly' ? `/${plan.amn}` : `/${plan.amn}`}
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
                            setActiveCard("Service Level Agreement");
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
                      BETWEEN:
                      {'\n'}AngleQuest (the “Vendor”)
                      {'\n'}– AND –
                      {'\n'}[Insert name] or [Insert company name] (the “Licensee”)
                      {'\n'}BACKGROUND:
                      {'\n'}The Vendor wishes to licence application Application to the Licensee and the Licensee desires to use the
                      application licence under the terms and conditions stated below.
                      {'\n'}IN CONSIDERATION OF the provisions contained in this Agreement and for other good and valuable consideration, the receipt and sufficiency of which is acknowledged, the parties agree as follows:
                      {'\n'}
                      {'\n'}Licence
                      {'\n'}1. Under this Agreement the Vendor grants to the Licensee a non-exclusive and non-transferable licence (the “Licence”) to use AngleQuest (the “Application”).
                      {'\n'}2. “Application” includes the executable computer programs and any related printed, electronic and online documentation and any other files that may accompany the product.
                      {'\n'}3. Title, copyright, intellectual property rights and distribution rights of the Application remain exclusively with the Vendor. Intellectual property rights include the look and feel of the Application. This Agreement constitutes a licence for use only and is not in any way a transfer of ownership rights to the Application.
                      {'\n'}4. The Application may be used from the web and mobile. An account can only owned and used by only one user.
                      {'\n'}5. The rights and obligations of this Agreement are personal rights granted to the Licensee only. The Licensee may not transfer or assign any of the rights or obligations granted under this Agreement to any other person or legal entity. The Licensee may not make available the Application for use by one or more third parties except her employees only.
                      {'\n'}6. The Application may not be modified, reverse-engineered, or de-compiled in any manner through current or future available technologies.
                      {'\n'}7. Failure to comply with any of the terms under the Licence section will be considered a material breach of this Agreement.
                      {'\n'}
                      {'\n'}Licence Fee
                      {'\n'}8. The subscription price of [Insert amount] paid by the Licensee will constitute the entire licence fee and is the full consideration for this Agreement.
                      {'\n'}
                      {'\n'}Limitation of Liability
          {'\n'}9. The Application is provided by the Vendor and accepted by the Licensee “as is”. Liability of the Vendor will be limited to a maximum of the original purchase price of the Application. The Vendor will not be liable for any general, special, incidental or consequential damages including, but not limited to, loss of production, loss of profits, loss of revenue, loss of data, or any other business or economic disadvantage suffered by the Licensee arising out of the use or failure to use the Application.
          {'\n'}10. The Vendor makes no warranty expressed or implied regarding the fitness of the Application for a particular purpose or that the Application will be suitable or appropriate for the specific requirements of the Licensee.
          {'\n'}11. The Vendor does not warrant that use of the Application will be uninterrupted or error-free. The Licensee accepts that Application in general is prone to bugs and flaws within an acceptable level as determined in the industry.
          {'\n'}
          {'\n'}Warrants and Representations
          {'\n'}12. The Vendor warrants and represents that it is the copyright holder of the Application. The Vendor warrants and represents that granting the licence to use this Application is not in violation of any other agreement, copyright or applicable statute.
          Acceptance
          {'\n'}13. All terms, conditions and obligations of this Agreement will be deemed to be accepted by the Licensee (“Acceptance”) upon execution of this Agreement.
          {'\n'}
          {'\n'}
          {'\n'}Term
          {'\n'}15. The term of this Agreement will begin on Acceptance and is perpetual.
          {'\n'}
          {'\n'}Termination
          {'\n'}16. This Agreement will be terminated and the Licence forfeited where the Licensee has failed to comply with any of the terms of this Agreement or is in breach of this Agreement. On termination of this Agreement for any reason, the Licensee will promptly delete her account from the Application and all its users account will be blocked.
          {'\n'}
          {'\n'}Force Majeure
          {'\n'}17. The Vendor will be free of liability to the Licensee where the Vendor is prevented from executing its obligations under this Agreement in whole or in part due to Force Majeure, such as earthquake, typhoon, flood, fire, and war or any other unforeseen and uncontrollable event where the Vendor has taken any and all appropriate action to mitigate such an event.
          Governing Law
          {'\n'}18. The Parties to this Agreement submit to the jurisdiction of the courts of Netherlands for the enforcement of this Agreement or any arbitration award or decision arising from this Agreement. This Agreement will be enforced or construed according to the laws of the Netherlands.
          {'\n'}
          {'\n'}Miscellaneous
          {'\n'}19. This Agreement can only be modified in writing signed by both the Vendor and the Licensee.
          {'\n'}20. This Agreement does not create or imply any relationship in agency or partnership between the Vendor and the Licensee.
          {'\n'}21. Headings are inserted for the convenience of the parties only and are not to be considered when interpreting this Agreement. Words in the singular mean and include the plural and vice versa. Words in the masculine gender include the feminine gender and vice versa. Words in the neuter gender include the masculine gender and the feminine gender and vice versa.
          {'\n'}22. If any term, covenant, condition or provision of this Agreement is held by a court of competent jurisdiction to be invalid, void or unenforceable, it is the parties’ intent that such provision be reduced in scope by the court only to the extent deemed necessary by that court to render the provision reasonable and enforceable and the remainder of the provisions of this Agreement will in no way be affected, impaired or invalidated as a result.
          {'\n'}23. This Agreement contains the entire agreement between the parties. All understandings have been included in this Agreement. Representations which may have been made by any party to this Agreement may in some way be inconsistent with this final written Agreement. All such statements are declared to be of no value in this Agreement. Only the written terms of this Agreement will bind the parties.
          {'\n'}24. This Agreement and the terms and conditions contained in this Agreement apply to and are binding upon the Vendor’s successors and assigns.
          {'\n'}
          {'\n'}Notices
          {'\n'}25. All notices to the parties under this Agreement are to be provided at the following addresses, or at such addresses as may be later provided in writing: ask@anglequest.com. And the provided email of the Licensee during signup will be used by AngleQuest. 
                    </Text>
                    </ScrollView>
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
      title: t("Service Level Agreement"),
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
    backgroundColor: 'green',
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
  valueText: { fontSize: 14, fontWeight: '600', marginBottom: 5, marginTop: 25, color: 'grey', textAlign: 'flex-start', alignSelf: 'flex-start' },
  descriptionText: { fontSize: 14, marginBottom: 5, color: '#333', textAlign: 'flex-start', alignSelf: 'flex-start'},
});

export default AngleQuestPage;
