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
  ActivityIndicator,
  Alert,
  TextInput, Picker, CheckBox,
  input, Pressable
} from "react-native";
import { useFonts } from "expo-font";
import { useTranslation } from "react-i18next";
import OpenModal from './getstarted';
import { PaystackWebView } from 'react-paystack';
import { Platform } from 'react-native';
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
  const [cardType, setCardType] = useState('User Card');
    const [cardName, setCardName] = useState('');
    const [cardNumber, setCardNumber] = useState('');
    const [cvv, setCvv] = useState('');
    const [expMonth, setExpMonth] = useState('');
    const [expYear, setExpYear] = useState('');
    const [isRecurring, setIsRecurring] = useState(false);
    const [useExistingAddress, setUseExistingAddress] = useState(false);
    const [selectedRole, setSelectedRole] = useState("");
  const [backendRole, setBackendRole] = useState("");
    const [first_name, setFirstName] = useState('');
      const [selectedOption, setSelectedOption] = useState('CreditOrDebitCard');
      const [fullName, setFullName] = useState('');
      const [phone, setPhone] = useState('');
      const [email, setEmail] = useState('');
      const [billingAddress, setBillingAddress] = useState('');
      const [showSetup, setShowSetup] = useState(false); 
      const scrollViewRef = useRef(null);
      const [showMore, setShowMore] = useState(false);
      const [planTitle, setPlanTitle] = useState("");
      const [isLoading, setIsLoading] = useState(false);
  const [createdAt, setCreatedAt] = useState(null);
  const [oneMonthLater, setOneMonthLater] = useState(null);

      const apiUrl = process.env.REACT_APP_API_URL;

  const [cardImages, setCardImages] = useState({
    visa: 'https://img.icons8.com/?size=100&id=11079&format=png&color=F5F5F5',
    mastercard: 'https://img.icons8.com/?size=100&id=11080&format=png&color=F5F5F5',
    amex: 'https://img.icons8.com/?size=100&id=11081&format=png&color=F5F5F5',
    discover: 'https://img.icons8.com/?size=100&id=23670&format=png&color=F5F5F5',
  });

  const getCardType = (number) => {
    const bin = number.slice(0, 6); // Get first 6 digits (BIN/IIN)

    if (bin.startsWith('4')) {
      return 'visa';
    } else if (['51', '52', '53', '54', '55'].includes(bin.slice(0, 2))) {
      return 'mastercard';
    } else if (bin.startsWith('34') || bin.startsWith('37')) {
      return 'amex';
    } else if (bin.startsWith('6011') || bin.startsWith('65')) {
      return 'discover';
    }
    return null; // No match
  };

  useEffect(() => {
    const cardType = getCardType(cardNumber);
    switch (cardType) {
      case 'visa':
        setCardImages({
          visa: 'https://img.icons8.com/?size=100&id=13608&format=png&color=000000',
          mastercard: 'https://img.icons8.com/?size=100&id=11080&format=png&color=F5F5F5',
          amex: 'https://img.icons8.com/?size=100&id=11081&format=png&color=F5F5F5',
          discover: 'https://img.icons8.com/?size=100&id=23670&format=png&color=F5F5F5',
        });
        break;
      case 'mastercard':
        setCardImages({
          visa: 'https://img.icons8.com/?size=100&id=11079&format=png&color=F5F5F5',
          mastercard: 'https://img.icons8.com/?size=100&id=13610&format=png&color=000000',
          amex: 'https://img.icons8.com/?size=100&id=11081&format=png&color=F5F5F5',
          discover: 'https://img.icons8.com/?size=100&id=23670&format=png&color=F5F5F5',
        });
        break;
      case 'amex':
        setCardImages({
          visa: 'https://img.icons8.com/?size=100&id=11079&format=png&color=F5F5F5',
          mastercard: 'https://img.icons8.com/?size=100&id=11080&format=png&color=F5F5F5',
          amex: 'https://img.icons8.com/?size=100&id=13607&format=png&color=000000',
          discover: 'https://img.icons8.com/?size=100&id=23670&format=png&color=F5F5F5',
        });
        break;
      case 'discover':
        setCardImages({
          visa: 'https://img.icons8.com/?size=100&id=11079&format=png&color=F5F5F5',
          mastercard: 'https://img.icons8.com/?size=100&id=11080&format=png&color=F5F5F5',
          amex: 'https://img.icons8.com/?size=100&id=11081&format=png&color=F5F5F5',
          discover: 'https://img.icons8.com/?size=100&id=20798&format=png&color=000000',
        });
        break;
      default:
        setCardImages({
          visa: 'https://img.icons8.com/?size=100&id=11079&format=png&color=F5F5F5',
          mastercard: 'https://img.icons8.com/?size=100&id=11080&format=png&color=F5F5F5',
          amex: 'https://img.icons8.com/?size=100&id=11081&format=png&color=F5F5F5',
          discover: 'https://img.icons8.com/?size=100&id=23670&format=png&color=F5F5F5',
        });
    }
  }, [cardNumber]);
  
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
    const fetchData = async () => {
      try {
        const token = await AsyncStorage.getItem("token");
        if (!token) {
          console.error("Token not found in AsyncStorage");
          return;
        }

        const response = await axios.get(`${apiUrl}/api/jobseeker/get-paystack-payment-details`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.data.status === "success" && response.data.PaystackDetail) {
          // Use the PaystackDetail object directly
          const details = response.data.PaystackDetail;

          // Handle user_detail
          if (details.user_detail) {
            const userDetails = JSON.parse(details.user_detail)[0]; // Assuming it's an array with a single object
            setFullName(userDetails.fullname || "");
            setPhone(userDetails.phone || "");
            setEmail(userDetails.email || "");
            setBillingAddress(userDetails.billing_address || "");
          }

          // Handle card_detail
          if (details.card_detail) {
            const cardDetails = JSON.parse(details.card_detail)[0]; // Assuming it's an array with a single object
            setCardType(cardDetails.card_type || "");
            setCardName(cardDetails.cardholder_name || "");
            setCardNumber(cardDetails.cardnumber || "");
            setCvv(cardDetails.cvv || "");

            // Extract expMonth and expYear from exp_date (e.g., "10/2026")
            if (cardDetails.exp_date) {
              const [month, year] = cardDetails.exp_date.split("/");
              setExpMonth(month || "");
              setExpYear(year || "");
            }
          }
          
          // Set specialization and service details
          if (details.specialization) {
            setSelectedRole(details.specialization); 
            setBackendRole(details.specialization); 
            setShowSetup(true);
          }
          if (details.plan) {
            setSelectedPlan(details.plan); // Set the service
          }

          if (details.agreement === 'Yes') {
            setIsChecked(true); // Set the agreement to true if details.agreement is "Yes"
          }
          
          // Highlight selected plan
          if (details.plan) {
            const selectedPlanId = details.plan === "Monthly" ? "Monthly" : details.plan === "Pay as you go" ? "Pay as you go" : null;

            if (selectedPlanId) {
              setSelectedPlan({ id: selectedPlanId }); // Set the selected plan by ID

              // Update plan colors based on the selected plan
              const updatedPlans = plans.map((plan) =>
                plan.id === selectedPlanId
                  ? { ...plan, color: "#F3E5F5" } // Highlight selected plan
                  : { ...plan, color: "#FFFFFF" } // Reset other plans
              );

              setPlans(updatedPlans); // Update plans state
            }
          }

          // Set the active price based on the service
          if (details.service === "Knowledge Backup") {
            setActivePrice("monthly");
          } else if (details.service === "Career Support") {
            setActivePrice("quarterly");
          } else if (details.service === "Knowledge Backup + Career Support") {
            setActivePrice("annually");
          }
          
          // Update active card and service visibility based on available data
          if (details.specialization) {
            setActiveCard("Subscription Plans");
            setCurrentStep(1);
            services[1].visible = true; // Enable "Subscription Plans"
          }
          if (details.plan) {
            setActiveCard("AngleQuest Agreement");
            setCurrentStep(2);
            services[2].visible = true; // Enable "AngleQuest Agreement"
          }
          if (details.agreement) {
            setActiveCard("Payment Details");
            setCurrentStep(3);
            services[3].visible = true; // Enable "Payment Details"
          }

        } else {
          console.error("No Paystack details found or invalid response structure.");
        }
      } catch (error) {
        console.error("Error fetching payment details:", error.response?.data || error.message);
      }
    };

    fetchData();
  }, []);
  
  const handleNext2 = async () => {
    // Ensure the user has agreed to the terms before proceeding
    if (!isChecked) {
      alert("Please agree to the terms and conditions before proceeding.");
      return;
    }

    try {
      // Get the token from AsyncStorage for authorization
      const token = await AsyncStorage.getItem("token");
      if (!token) {
        console.error("Token not found in AsyncStorage");
        return;
      }

      // Fetch the latest payment details from the API
      const response = await axios.get(`${apiUrl}/api/jobseeker/get-paystack-payment-details`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data.status === "success" && response.data.PaystackDetail) {
        // Extract details from the PaystackDetail object
        const details = response.data.PaystackDetail;

        // Construct the payload with fetched details
        const payload = {
          specialization: details.specialization || "", 
          service: details.service || "", 
          plan: details.plan || "",
          sla: "0" || "", 
          agreement: "Yes", 
        };

        // Make the POST request with the constructed payload
        const postResponse = await fetch(`${apiUrl}/api/jobseeker/edit-paystack-payment-details`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Add token to Authorization header
          },
          body: JSON.stringify(payload),
        });

        if (postResponse.ok) {
          const postData = await postResponse.json();
          console.log("API Response:", postData);
          // Move to the next step in the process
          setCurrentStep(3);
          setActiveCard("Payment Details");
        } else {
          console.error("Failed to save payment details:", postResponse.statusText);
        }
      } else {
        console.error("No Paystack details found or invalid response structure.");
      }
    } catch (error) {
      console.error("Error during API request:", error.response?.data || error.message);
    }
  };


  const handleFinish = async () => {
    setIsLoading(true); // Start the loading state

    try {
      // Get the token from AsyncStorage for authorization
      const token = await AsyncStorage.getItem("token");
      if (!token) {
        Alert.alert("Error", "Authorization token not found.");
        setIsLoading(false);
        return;
      }

      // Fetch the latest payment details from the API
      const response = await axios.get(`${apiUrl}/api/jobseeker/get-paystack-payment-details`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response?.data?.status === "success" && response?.data?.PaystackDetail) {
        const details = response.data.PaystackDetail;

        // Construct the payload
        const payload = {
          specialization: details.specialization || "",
          service: details.service || "",
          plan: details.plan || "",
          sla: "0",
          agreement: details.agreement || "Yes",
          payment_method: "Done",
          payment_detail: "Pay as you go",
          card_detail: [
            {
              card_type: cardType, // Use the state variable for selected card type
              cardholder_name: cardName,
              cardnumber: cardNumber,
              cvv: cvv,
              exp_date: `${expMonth}/${expYear}`, // Combine month and year for expiration date
            },
          ],
        };

        // Post the payment details
        const postResponse = await axios.put(
          `${apiUrl}/api/jobseeker/edit-paystack-payment-details`,
          payload,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (postResponse.status === 201) {
          console.log("Payment details saved successfully:", postResponse.data);
          setCurrentStep(3); // Proceed to the next step
          setActiveCard("Payment Details"); // Update UI
        } else {
          Alert.alert("Error", "Failed to save payment details.");
          console.error("API error:", postResponse.statusText);
        }
      } else {
        Alert.alert("Error", "No payment details found or invalid API response.");
        console.error("API response error:", response.data);
      }
    } catch (error) {
      Alert.alert("Error", error.response?.data?.message || error.message);
      console.error("Error during API request:", error.response?.data || error.message);
    } finally {
      setIsLoading(false); // End the loading state
      onClose();
      window.location.reload();
    }
  };


  const handlePutContinue = async () => {
    if (selectedRole) {
      try {
        // Save the selected role to AsyncStorage
        await AsyncStorage.setItem("selectedRole", selectedRole);

        // Get the token from AsyncStorage
        const token = await AsyncStorage.getItem("token");
        if (!token) {
          console.error("Token not found in AsyncStorage");
          return;
        }

        // Fetch the latest payment details and created_at from the API
        const response = await axios.get(`${apiUrl}/api/jobseeker/get-paystack-payment-details`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response?.data?.status === "success" && response?.data?.PaystackDetail) {
          const details = response.data.PaystackDetail;
          const createdAt = new Date(details.created_at);

          // Calculate the one-month limit
          const oneMonthLater = new Date(createdAt);
          oneMonthLater.setMonth(createdAt.getMonth() + 1);

          const now = new Date();
          if (now < oneMonthLater) {
            // Alert the user and stop further execution
            alert(`You are not allowed to change your specialization until ${oneMonthLater.toDateString()}`);
            return;
          }

          // Construct the payload
          const payload = {
            specialization: selectedRole || "",
            service: details.service || "",
            plan: details.plan || "",
            sla: details.sla || "",
            agreement: details.agreement || "Yes",
            payment_method: "Done", // Set the payment method
          };

          // Make the PUT request to edit payment details
          const postResponse = await axios.put(`${apiUrl}/api/jobseeker/edit-paystack-payment-details`, payload, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          // Handle the response
          console.log("API Response:", postResponse.data);

          // Perform additional actions based on API response if needed
          setCurrentStep(1); // Update step
          setActiveCard("Subscription Plans"); // Update active card
        } else {
          console.error("No Paystack details found or invalid response structure.");
        }
      } catch (error) {
        console.error("Error handling continue action:", error.response?.data || error.message);
      }
    } else {
      console.log("Please select a role first.");
    }
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

  const handleNext = async () => {
    try {
      // Retrieve the token from AsyncStorage
      const token = await AsyncStorage.getItem("token");
  
      // Ensure token is available
      if (!token) {
        console.error("Token not found in AsyncStorage");
        return false; // Exit if there's no token
      }
  
      // Determine the `service` based on `activePrice`
      let service = "";
      if (activePrice === "monthly") {
        service = "Knowledge Backup";
      } else if (activePrice === "quarterly") {
        service = "Career Support";
      } else if (activePrice === "annually") {
        service = "Knowledge Backup + Career Support";
      }
  
      // Retrieve `selectedRole`, `selectedPlan`, and `sla-cost` from AsyncStorage
      const selectedRole = await AsyncStorage.getItem("selectedRole");
      const selectedPlan = JSON.parse(await AsyncStorage.getItem("selectedPlan"));
      const slaCost = await AsyncStorage.getItem("sla-cost"); // SLA cost from `handleSelect`
  
      // Process the SLA cost to remove non-numeric parts (e.g., "$", "monthly", "No additional cost")
      let sla = "0"; // Default to "0" if no valid SLA is found
      if (slaCost) {
        if (slaCost === "No additional cost") {
          sla = "0"; // If it's "No additional cost", set SLA to "0"
        } else {
          // Remove any non-numeric characters like "$", "monthly", etc.
          sla = slaCost.replace(/[^0-9.-]+/g, ""); // Remove everything except digits, dot, and minus sign
          if (sla === "") sla = "0"; // In case the SLA contains only non-numeric characters
        }
      }
  
      // Construct the payload for the API request
      const payload = {
        specialization: selectedRole || "", 
        service: service,
        plan: planTitle || "", 
        sla: "0", 
      };
  
      // Make the POST request to the API with token authentication
      const response = await fetch(`${apiUrl}/api/jobseeker/edit-paystack-payment-details`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Add token to Authorization header
        },
        body: JSON.stringify(payload),
      });
  
      if (response.ok) {
        const data = await response.json();
        console.log("API Response:", data);
        return true; // Return true if the request was successful
      } else {
        console.error("Failed to save payment details:", response.statusText);
        return false; // Return false if the request failed
      }
    } catch (error) {
      console.error("Error during API request:", error);
      return false; // Return false in case of any error
    }
  };

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

  const handleContinue = async () => {
    if (selectedRole) {
      try {
        // Save the selected role to AsyncStorage
        await AsyncStorage.setItem("selectedRole", selectedRole);
  
        // Get the token from AsyncStorage
        const token = await AsyncStorage.getItem("token");
        if (!token) {
          console.error("Token not found in AsyncStorage");
          return;
        }
  
        // Prepare the payload for the API request
        const payload = {
          specialization: selectedRole,
        };
  
        // Make the POST request to the API using Axios
        const response = await axios.post(`${apiUrl}/api/jobseeker/paystack-payment-details`, payload, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Use token in Authorization header
          },
        });
  
        // Handle the response
        console.log("API Response:", response.data);
  
        // Perform additional actions based on API response if needed
        setCurrentStep(1); // Update step
        setActiveCard("Subscription Plans"); // Update active card
      } catch (error) {
        console.error("Error handling continue action:", error.response?.data || error.message);
      }
    } else {
      console.log("Please select a role first.");
    }
  };
  
  const [savedRole, setSavedRole] = useState(""); // State for saved specialization

  // Fetch saved specialization from AsyncStorage
  useEffect(() => {
    const fetchSavedRole = async () => {
      try {
        const role = await AsyncStorage.getItem('selectedRole');
        if (role) {
          setSavedRole(role); // Set saved role for specialization
        }
      } catch (error) {
        console.error('Error fetching saved role:', error);
      }
    };
    fetchSavedRole();
  }, []);

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

  const handlePress = async (selectedPlan) => {
    try {
      // Highlight the selected plan
      const updatedPlans = plans.map((plan) =>
        plan.id === selectedPlan.id
          ? { ...plan, color: '#F3E5F5' } // Highlight the selected plan
          : { ...plan, color: '#FFFFFF' } // Reset other plans
      );

      setPlans(updatedPlans); // Update state with selected plan
      setSelectedPlan(selectedPlan); // Set selected plan
       saveToAsyncStorage(selectedPlan); // Save to AsyncStorage
      setPlanTitle(selectedPlan.title); // Set plan title

      // Save to AsyncStorage
      await AsyncStorage.setItem("planTitle", selectedPlan.title);
      console.log("Selected Plan Title: ", selectedPlan.title);

      // Scroll down within the ScrollView
      if (scrollViewRef?.current) {
        scrollViewRef.current.scrollTo({
          y: 700, // Number of pixels to scroll down
          animated: true, // Smooth scroll
        });
      }
    } catch (error) {
      console.error("Error in handlePress:", error);
    }
  };



  useEffect(() => {
    if (Platform.OS === 'web') {
      const script = document.createElement('script');
      script.src = "https://js.paystack.co/v1/inline.js";
      script.async = true;
      document.head.appendChild(script);

      script.onload = () => {
        console.log('Paystack SDK loaded');
      };

      script.onerror = () => {
        console.error('Failed to load Paystack SDK');
      };
    }
  }, []);
  
   const [paymentDetails, setPaymentDetails] = useState(null);
  const [paystackData, setPaystackData] = useState(null);

  useEffect(() => {
    // Get the total plan cost from AsyncStorage
    const getTotalCost = async () => {
      const cost = await AsyncStorage.getItem('totalPlanCost');
      if (cost) {
        setTotalPlanCost(parseFloat(cost)); // Set the value as numeric
      }
    };
    getTotalCost();
  }, []);

  const paystackPublicKey = "pk_test_9e5da987777240cf8ea5e3dcd2e902f113d1251c"; // Replace with your actual Paystack public key

  // Step 1: Save Card Details and Proceed
  const saveCardDetails = () => {
    if (!cardName || !cardNumber || !cvv || !expMonth || !expYear) {
      Alert.alert('Error', 'Please fill in all credit card details.');
      return;
    }

    const cardInfo = {
      cardName,
      cardNumber,
      cvv,
      expMonth,
      expYear,
    };

    // Save the card details to AsyncStorage (or your backend)
    AsyncStorage.setItem('cardDetails', JSON.stringify(cardInfo));
    Alert.alert('Success', 'Card details saved. Proceed to billing details.');
    setSelectedOption('BillingDetails');
  };

  const initiatePayment = async () => {
    try {
      setIsLoading(true); // Start loading state

      // Retrieve values from AsyncStorage
      const values = await AsyncStorage.multiGet(['first_name', 'last_name', 'email']);

      const firstName = values.find(item => item[0] === 'first_name')[1];
      const lastName = values.find(item => item[0] === 'last_name')[1];
      const email = values.find(item => item[0] === 'email')[1];
      const fullName = `${firstName} ${lastName}`;

      // Get token from AsyncStorage for authorization
      const token = await AsyncStorage.getItem("token");
      if (!token) {
        Alert.alert("Error", "Authorization token not found.");
        setIsLoading(false);
        return;
      }

      // Define the card information to be sent to the backend
      const cardInfo = {
        cvv: cvv,
        exp_date: `${expMonth}/${expYear}`, 
        acc_num: "9505", 
        cardnumber: cardNumber, 
        cardholder_name: cardName,
      };

      // Make the payment request to the backend
      const paymentResponse = await axios.post(`${apiUrl}/api/jobseeker/paystack`, cardInfo, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (paymentResponse?.data?.status === "success") {
        alert("Success, Payment initiated successfully!", "Success");
        console.log("Payment Response:", paymentResponse.data);

        // Update UI or proceed to the next step
        setCurrentStep(3); // Proceed to the next step
        setActiveCard("Payment Details"); // Update active card
      } else {
        alert("Error", "Payment initiation failed.");
        console.error("API Error:", paymentResponse.data);
      }
    } catch (error) {
      alert("Error", error.response?.data?.message || error.message);
      console.error("Error during payment initiation:", error.response?.data || error.message);
    } finally {
      setIsLoading(false); // End the loading state
    }
  };



  // Payment success callback
  const handlePaymentSuccess = (transaction) => {
    console.log('Payment Successful:', transaction);
    Alert.alert('Payment Successful', `Transaction Reference: ${transaction.reference}`);
  };

  // Payment failure callback
  const handlePaymentFailure = (error) => {
    console.error('Payment Failed:', error);
    Alert.alert('Payment Failed', 'An error occurred. Please try again.');
  };

  

  const [fontsLoaded] = useFonts({
    "Roboto-Light": require("../assets/fonts/Roboto-Light.ttf"),
  });

  const sections = [
    {
      title: "Hello",
      options: [
        { title: "Default", details: ["Backup response time - 24hrs", "Best practice access - 30%"], cost: "No extra cost", isDefault: true },
        { title: "Standard", details: ["Backup response time - 12hrs", "Best practice access - 60%"], cost: "Extra $40 monthly" },
        { title: "Advance", details: ["Backup response time - 4hrs", "Best practice access - Unlimited"], cost: "Extra $100 monthly" },
      ],
    },
    {
      title: "Hello 1",
      options: [
        { title: "Default", details: ["Skill gap analysis (AI & expert)", "Growth plan", "Coaching hub - 1 hub access"], cost: "No extra cost", isDefault: true },
        { title: "Standard", details: ["Skill gap analysis (AI & expert)", "Growth plan", "Coaching hub - 2 hub access"], cost: "Extra $40 monthly" },
        { title: "Advance", details: ["Skill gap analysis (AI & expert)", "Growth plan", "Coaching hub - Unlimited"], cost: "Extra $100 monthly" },
      ],
    },
    {
      title: "Hello 2",
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

      // Parse the cost value (handle "No extra cost" and "Extra <amount>")
      let costWithoutExtras = option.cost.replace('Extra', '').replace('No extra cost', '0').trim();
      if (costWithoutExtras === "No extra cost") {
        costWithoutExtras = "0"; // Set cost to "0" if it's "No extra cost"
      }

      // Remove any non-numeric characters to get the pure numeric value
      const numericCost = parseFloat(costWithoutExtras.replace(/[^\d.-]/g, ''));

      // If parsing failed (i.e., the result is NaN), default to 0
      if (isNaN(numericCost)) {
        console.error("Error parsing cost for", sectionTitle, ": Invalid cost format");
        numericCost = 0;
      }

      // Save the sanitized numeric cost to AsyncStorage
      await AsyncStorage.setItem(`${sectionTitle}-cost`, numericCost.toString());

      console.log(`Saved cost for ${sectionTitle}: ${numericCost}`);

      // Retrieve the saved selected plan cost from AsyncStorage
      let selectedPlanCost = await AsyncStorage.getItem('selectedPlan') || "0";
      let optionCost = await AsyncStorage.getItem(`${sectionTitle}-cost`) || "0";

      // Parse costs into numeric values
      const selectedPlanCostValue = parseFloat(selectedPlanCost);
      const optionCostValue = parseFloat(optionCost);

      // Ensure both are valid numbers
      if (isNaN(selectedPlanCostValue) || isNaN(optionCostValue)) {
        console.error("Invalid cost values. Selected Plan Cost:", selectedPlanCost, "Option Cost:", optionCost);
        return;
      }

      // Calculate the total cost
      const totalCost = optionCostValue + selectedPlanCostValue;

      // Save the total combined cost to AsyncStorage
      await AsyncStorage.setItem('totalPlanCost', totalCost.toString());

      setTotalPlanCost(totalCost);

      console.log("Total Plan Cost:", totalCost);
    } catch (error) {
      console.error("Error in handleSelect:", error);
    }
  };

  useEffect(() => {
    const fetchPlanTitle = async () => {
      try {
        const title = await AsyncStorage.getItem("planTitle"); // Retrieve the title
        if (title) {
          setPlanTitle(title); // Set the title in state
          console.log("Retrieved Plan Title:", title);
        } else {
          console.log("No plan title found in AsyncStorage.");
        }
      } catch (error) {
        console.error("Error fetching plan title:", error);
      }
    };

    fetchPlanTitle();
  }, []);
  
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

  const onboardingData = [
    {
      id: '1',
      title: `Hello ${first_name}, welcome to AngleQuest`,
      description: 'Lets get your account setup. Takes a maximum of 5 minutes.',
      image: require("../assets/happywelcome.png"),
    },
    {
      id: '2',
      title: "How can I use AngleQuest?",
      description: "AngleQuest is your go-to tool for learning, growth, and achieving your goals with guidance from experienced experts.",
      options: [
        { name: "Get Support", explanation: "Receive personalized solutions to your specific challenges." },
        { name: "Access Knowledge Hub", explanation: "Explore insights, resources, and valuable information shared by experts." },
        { name: "Learn Best Practices", explanation: "Discover proven strategies to help you succeed." },
        { name: "Skill Assessment", explanation: "Understand your strengths and areas to improve." },
        { name: "Create a Growth Plan", explanation: "Work with experts to design a roadmap for achieving your goals." },
        { name: "Prepare for Interviews", explanation: "Get guidance and practice to excel in job interviews." },
      ],
    },
    {
      id: '3',
      title: "Choose Your Specialization",
      description: "Which of these technologies do you specialize in, or which do you want to transition into? Make a selection below",
      roles: [
        "SAP FI", 
        "SAP MM", 
        "SAP SD", 
        "SAP PP", 
        "Microsoft Dynamics Sales", 
        "Microsoft Dynamics Field Service", 
        "Microsoft Dynamics Marketing", 
        "Microsoft Dynamics Developer", 
        "Microsoft Business Central", 
        "Microsoft Dynamics F&O",
      ],
    },
  ];
  
  const [currentSlide, setCurrentSlide] = useState(0);

  const [selectedSlide, setSelectedSlide] = useState(null);

  const handleForward = () => {
    if (currentSlide === onboardingData.length - 1) {
      if (onFinish) onFinish(); 
    } else {
      setCurrentSlide((prev) => (prev + 1) % onboardingData.length);
      setSelectedSlide(null); // Reset the selected option when moving to the next slide
    }
  };

  const handleBehind = () => {
    setCurrentSlide((prev) => (prev - 1 + onboardingData.length) % onboardingData.length);
    setSelectedSlide(null); // Reset the selected option when moving to the previous slide
  };

  const handleSelectSlide = (Slide) => {
    setSelectedSlide(Slide === selectedSlide ? null : Slide);
  };

  const renderSlide = () => {
    const slide = onboardingData[currentSlide];
    if (slide.id === '2') {
      return (
        <View >
          <Text style={styles.greetingText}>{slide.title}</Text>
          <Text style={styles.subHeading}>{slide.description}</Text>
          <View style={styles.optionsRow}>
            {slide.options.map((item) => (
              <TouchableOpacity
                key={item.name}
                style={[
                  styles.option,
                  selectedSlide === item && styles.optionSelected
                ]}
                onPress={() => handleSelectSlide(item)}
              >
                <Text
                  style={[
                    styles.optionText,
                    selectedSlide === item && styles.optionTextSelected
                  ]}
                >
                  {item.name}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
          {selectedSlide && (
            <Text style={styles.explanation}>{selectedSlide.explanation}</Text>
          )}
        </View>
      );
    }

    if (slide.id === '1') {
      return (
        <View>
          <Text style={styles.greetingText}>{slide.title}</Text>
          <Text style={styles.subHeading}>{slide.description}</Text>
          <Image source={slide.image} style={styles.image} />
        </View>
      );
    }

     if (slide.id === '3') {
        return (
          <View >
            <Text style={styles.greetingText}>{slide.title}</Text>
            <Text style={styles.subHeading}>{slide.description}</Text>
            <View style={styles.rolesContainer}>
              {slide.roles.map((role, index) => (
                <TouchableOpacity 
                  key={index} 
                  style={[
                    styles.roleButton, 
                    selectedRole === role && styles.selectedRole,
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
              onPress={backendRole ? handlePutContinue : handleContinue}
              disabled={!selectedRole} // Disable if no role is selected
            >
              <Text style={styles.continueButtonText}>Save Role</Text>
            </TouchableOpacity>
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
  
  const [plans, setPlans] = useState([
    {
      id: "Monthly",
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
        quarterly: `Expedite your transition from one level of your ${savedRole} skills to the next.`,
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
      id: "Pay as you go",
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
        annually: "$40"
      },
      amn: "service used",
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
          {renderProgressBar()}
          <View style={styles.slideContainer}>{renderSlide()}</View>
          <View style={styles.navigationContainer}>
            <View >
              {currentSlide > 0 && (
                <TouchableOpacity onPress={handleBehind} style={styles.buttonback}>
                  <MaterialIcons name="arrow-back" size={16} color="white" />
                  <Text style={styles.textbu}>Back</Text>
                </TouchableOpacity>
              )}
            </View>
            <TouchableOpacity onPress={handleForward} style={styles.buttonfront}>
              <Text style={styles.textbu}>
                {currentSlide === onboardingData.length - 1 ? 'Next' : 'Continue'}
              </Text>
              <MaterialIcons name="arrow-forward" size={16} color="white" />
            </TouchableOpacity>
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
<View style={{ marginLeft: 70, marginRight: 70, marginTop: 50 }}>
  {/* Check if selectedPlan?.title is "Monthly" */}
  {planTitle === 'Monthly' &&
    sections
      .filter((section) => {
        // Retain activePrice filtering logic
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
<TouchableOpacity
  onPress={async () => {
    // Call handleNext before proceeding with the step change
    const success = await handleNext();
    
    if (success) {
      // Only change the step and card if the API request was successful
      setCurrentStep(2);
      setActiveCard("AngleQuest Agreement");
    } else {
      // Optionally handle failure (e.g., show an error message)
      console.log("Failed to proceed, try again.");
    }
  }}
  style={styles.buttonnext}
>
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
                          <TouchableOpacity
  onPress={async () => {
    // Call handleNext2 function
    await handleNext2(); // Make sure to await the function if it returns a promise

    setCurrentStep(3);
    setActiveCard("Payment Details");
  }}
  style={styles.buttonnext}
>
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
              {planTitle === "Pay as you go" ? (
                <>
                  <Text style={styles.subHeading2}>
                    You will only be charged for the service you use.
                  </Text>
                </>
              ) : (
                <>
                  <Text style={styles.subHeading2}>
                    This is the primary payment method that ${totalPlanCost} will be charged from.
                  </Text>
                </>
              )}
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
                         
                        </View>
                
                       
                            {planTitle === "Pay as you go" ? (
                              <View style={styles.formcontainer}>
                                <Text style={styles.label}>Cardholder Name (exactly as printed on card)</Text>
                                <TextInput
                                  style={styles.input}
                                  placeholder="George Karim"
                                   placeholderTextColor="grey"
                                  value={cardName}
                                  onChangeText={setCardName}
                                />

                                <Text style={styles.label}>Card Number</Text>
                                <TextInput
                                  style={styles.input}
                                  placeholder="1234 5678 9012 3456"
                                   placeholderTextColor="grey"
                                  value={cardNumber}
                                  onChangeText={setCardNumber}
                                  keyboardType="numeric"
                                />
<View style ={{flexDirection: 'row', alignSelf: 'flex-start', marginTop: -15}}>
  <Image source={{ uri: cardImages.visa }} style={{ width: 50, height: 50 }} />
  <Image source={{ uri: cardImages.mastercard }} style={{ width: 50, height: 50 }} />
  <Image source={{ uri: cardImages.amex }} style={{ width: 50, height: 50 }} />
  <Image source={{ uri: cardImages.discover }} style={{ width: 50, height: 50 }} />
</View>
                                <Text style={styles.label}>CVV</Text>
                                <TextInput
                                  style={styles.input}
                                  placeholder="123"
                                  placeholderTextColor="grey"
                                  value={cvv}
                                  onChangeText={(text) => {
                                    const formattedText = text.replace(/[^0-9]/g, '').slice(0, 3);
                                    setCvv(formattedText);
                                  }}
                                  keyboardType="numeric"
                                  maxLength={3} 
                                />

                                {/* Expiration Date */}
                                <Text style={styles.label}>Expiration Date</Text>
                                <View style={styles.row}>
                                  <TextInput
                                    style={[styles.input, styles.smallInput]}
                                    placeholder="MM"
                                     placeholderTextColor="grey"
                                    value={expMonth}
                                    onChangeText={(text) => {
                                      const formattedText = text.replace(/[^0-9]/g, '').slice(0, 2);
                                      setExpMonth(formattedText);
                                    }}
                                    keyboardType="numeric"
                                    maxLength={2} 
                                  />
                                  <TextInput
                                    style={[styles.input, styles.smallInput]}
                                    placeholder="YYYY"
                                     placeholderTextColor="grey"
                                    value={expYear}
                                    onChangeText={(text) => {
                                      const formattedText = text.replace(/[^0-9]/g, '').slice(0, 4);
                                      setExpYear(formattedText);
                                    }}
                                    keyboardType="numeric"
                                    maxLength={4} 
                                  />
                                </View>
                                <TouchableOpacity style={styles.buttonblack}
                                  disabled={isLoading}
                                    onPress={handleFinish}
                                  >
                                    {isLoading ? (
                                      <ActivityIndicator color="white" />
                                    ) : (
                                  <Text style={styles.buttonsaveText}>{t("Save Card Details")}</Text>
                                     )}
                                </TouchableOpacity>
                              </View>
                            ) : (
                              <View style={styles.formcontainer}>
                                <Text style={styles.label}>Cardholder Name (exactly as printed on card)</Text>
                                                                <TextInput
                                                                  style={styles.input}
                                                                  placeholder="George Karim"
                                                                   placeholderTextColor="grey"
                                                                  value={cardName}
                                                                  onChangeText={setCardName}
                                                                />

                                                                <Text style={styles.label}>Card Number</Text>
                                                                <TextInput
                                                                  style={styles.input}
                                                                  placeholder="1234 5678 9012 3456"
                                                                   placeholderTextColor="grey"
                                                                  value={cardNumber}
                                                                  onChangeText={setCardNumber}
                                                                  keyboardType="numeric"
                                                                />
                                <View style ={{flexDirection: 'row', alignSelf: 'flex-start', marginTop: -15}}>
                                  <Image source={{ uri: cardImages.visa }} style={{ width: 50, height: 50 }} />
                                  <Image source={{ uri: cardImages.mastercard }} style={{ width: 50, height: 50 }} />
                                  <Image source={{ uri: cardImages.amex }} style={{ width: 50, height: 50 }} />
                                  <Image source={{ uri: cardImages.discover }} style={{ width: 50, height: 50 }} />
                                </View>
                                                                <Text style={styles.label}>CVV</Text>
                                                                <TextInput
                                                                  style={styles.input}
                                                                  placeholder="123"
                                                                  placeholderTextColor="grey"
                                                                  value={cvv}
                                                                  onChangeText={(text) => {
                                                                    const formattedText = text.replace(/[^0-9]/g, '').slice(0, 3);
                                                                    setCvv(formattedText);
                                                                  }}
                                                                  keyboardType="numeric"
                                                                  maxLength={3} 
                                                                />

                                                                {/* Expiration Date */}
                                                                <Text style={styles.label}>Expiration Date</Text>
                                                                <View style={styles.row}>
                                                                  <TextInput
                                                                    style={[styles.input, styles.smallInput]}
                                                                    placeholder="MM"
                                                                     placeholderTextColor="grey"
                                                                    value={expMonth}
                                                                    onChangeText={(text) => {
                                                                      const formattedText = text.replace(/[^0-9]/g, '').slice(0, 2);
                                                                      setExpMonth(formattedText);
                                                                    }}
                                                                    keyboardType="numeric"
                                                                    maxLength={2} 
                                                                  />
                                                                  <TextInput
                                                                    style={[styles.input, styles.smallInput]}
                                                                    placeholder="YYYY"
                                                                     placeholderTextColor="grey"
                                                                    value={expYear}
                                                                    onChangeText={(text) => {
                                                                      const formattedText = text.replace(/[^0-9]/g, '').slice(0, 4);
                                                                      setExpYear(formattedText);
                                                                    }}
                                                                    keyboardType="numeric"
                                                                    maxLength={4} 
                                                                  />
                                                                </View>
                                <TouchableOpacity style={styles.buttonblack}
                                  disabled={isLoading}
                                    onPress={initiatePayment}
                                  >
                                    {isLoading ? (
                                      <ActivityIndicator color="white" />
                                    ) : (
                                    <Text style={styles.buttonsaveText}>{t("Proceed to Pay")}</Text>
                                     )}
                                </TouchableOpacity>
                               
                              </View>
                                     
                            )}
                  
                      
        
            
          

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
            {paystackData && (
              <PaystackWebView
                paystackKey={paystackPublicKey}
                amount={paystackData.amount}
                email={paystackData.email}
                reference={paystackData.reference}
                onSuccess={handlePaymentSuccess}
                onCancel={handlePaymentFailure}
              />
            )}
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
    backgroundColor: "white",
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
    color: "black",
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
  buttonblack: {
    backgroundColor: "black",
    padding: 12,
    width: 150,
    borderRadius: 5,
    marginTop: 20,
    elevation: 5,
  },
  buttondone: {
    backgroundColor: "darkgreen",
    padding: 10,
    width: 100,
    marginLeft: 1000,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 50,
    marginBottom: 50,
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
backgroundColor: '#F4F4F4',
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
    width: 250,
    height: 250,
    marginTop: 40,
    alignSelf: 'center'
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
    alignSelf: 'center'
  },
  subHeading: {
    fontSize: 16,
    color: '#777',
    marginTop: 10,
    textAlign: 'center',
    alignSelf: 'center',
    width: 450
  },
  rolesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: 700,
    alignSelf: 'center',
    marginTop: 20,
  },
  roleButton: {
    backgroundColor: '#f0f0f0',
    padding: 10,
    margin: 5,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20
  },
  selectedRole: {
    backgroundColor: 'lightgreen',
  },
  roleText: {
    fontSize: 14,
    color: '#333',
  },
  continueButton: {
    padding: 10,
    marginTop: 30,
    borderRadius: 5,
    width: 150,
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
  slideContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  optionsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginLeft: 70,
    marginRight: 70,
    marginTop: 20,
    marginBottom: 150
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
    alignItems: 'center',
    marginLeft: 70, marginRight: 70
  },
  buttonfront: {
    padding: 12,
    borderRadius: 5,
    backgroundColor: '#4caf50',
    flexDirection: 'row'
  },
  buttonback: {
    padding: 12,
    borderRadius: 5,
    backgroundColor: 'grey',
    flexDirection: 'row'
  },
  textbu: {
    color: '#fff',
    fontWeight: 'bold',
    marginLeft: 10,
    marginRight: 10
  },
});

export default AngleQuestPage;
