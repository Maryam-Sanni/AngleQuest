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
  CheckBox,
  input, Pressable
} from "react-native";
import { useFonts } from "expo-font";
import { useTranslation } from "react-i18next";
import OpenModal from './Bookcall';
import { MaterialIcons } from '@expo/vector-icons'; 
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LinearGradient } from 'expo-linear-gradient';

function ServiceCard({ title, description, isStartPressed, activeCard, setActiveCard }) {
  const [isHovered, setIsHovered] = useState(false);
  const isActive = activeCard === title; // Check if the card is active

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
  const [activeCard, setActiveCard] = useState('Non-Disclosure agreement');
  const [file, setFile] = React.useState(null);
  const [uploadedFile, setUploadedFile] = useState(null);
    const [selectedPlan, setSelectedPlan] = useState(null);
    const [activePlan, setActivePlan] = useState(null);
      const [selectedSection, setSelectedSection] = useState(null);
      const [activePrice, setActivePrice] = useState('monthly');

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
  const handlePress = async (plan) => {
    try {
      setSelectedPlan(plan); // Set the selected plan
      setSelectedSection(plan.id); // Set the selected section to the plan id
      await saveToAsyncStorage(plan); // Save the selected plan's pricing to AsyncStorage

      // Prepare the subscription data
      const selectedPrice = plan.pricing[activePrice];
      const costWithoutPrefix = selectedPrice.replace(/[^0-9.-]+/g, '');

      const subscriptionData = [
        {
          type: plan.title, // Assuming `plan.name` holds the type of the plan
          amount: costWithoutPrefix, // Numeric amount of the plan
        },
      ];

      // Get token from AsyncStorage
      const token = await AsyncStorage.getItem('token');
      if (!token) {
        console.error('No token found');
        alert('Authentication error. Please log in again.');
        return;
      }

      // Send subscription data to the backend
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/business/upload-business-nda`,
        {
          subscription: subscriptionData,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json', // Ensure correct content type
          },
        }
      );

      console.log('Subscription saved successfully:', response.data);
      alert('Plan selected and subscription saved successfully!');

      // Proceed to the next step
      setCurrentStep(3);
      setActiveCard("Service Level Agreement");
    } catch (error) {
      console.error('Error saving subscription:', error.response?.data || error.message);
      alert('An error occurred while saving the subscription. Please try again.');
    }
  };

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

      // Check if the cost is "No additional cost" and set it to 0
      let costWithoutMonthly = option.cost.replace(' monthly', '').replace('$', '').trim(); // Remove "$" and "monthly"
      if (costWithoutMonthly === "No additional cost") {
        costWithoutMonthly = "0"; // Set the cost to 0 if it's "No additional cost"
      }

      // Save the cost as a numeric value (e.g., "40" instead of "$40 monthly")
      await AsyncStorage.setItem(`${sectionTitle}-cost`, costWithoutMonthly);

      console.log(`Saved cost for ${sectionTitle}: ${costWithoutMonthly}`);

      // Retrieve the saved selected plan cost from AsyncStorage
      const selectedPlanCost = await AsyncStorage.getItem('selectedPlan');

      // Retrieve the option cost from AsyncStorage
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

        // Submit the SLA to the backend
        const token = await AsyncStorage.getItem('token');
        if (!token) {
          console.error('No token found');
          alert('Authentication error. Please log in again.');
          return;
        }

        // API call to submit the SLA cost
        const response = await axios.post(
          `${process.env.REACT_APP_API_URL}/api/business/upload-business-nda`,
          { sla: costWithoutMonthly }, // Send SLA field with total cost
          {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json', // Set appropriate content type
            },
          }
        );

        console.log('SLA submitted successfully:', response.data);
        alert('SLA cost submitted successfully!');
      } else {
        console.error("Option cost or selected plan cost not found in AsyncStorage.");
      }
    } catch (error) {
      console.error("Error in handleSelect:", error);
      alert('An error occurred while handling your selection. Please try again.');
    }
  };


    const [totalPlanCost, setTotalPlanCost] = useState(0); // State to hold the total cost
    const [customAmount, setCustomAmount] = useState("");

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setFile({
        uri: URL.createObjectURL(selectedFile), // Temporary URL for preview
        type: selectedFile.type, // MIME type
        name: selectedFile.name, // File name
        rawFile: selectedFile, // Original file object
      });
    }
  };

  const handleSave = async () => {
    if (!file) {
      console.error('No file selected');
      return;
    }

    try {
      const token = await AsyncStorage.getItem('token');
      if (!token) {
        console.error('No token found');
        return;
      }

      const formData = new FormData();
      formData.append('nda', file.rawFile); // Append the file directly

      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/business/upload-business-nda`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      console.log('NDA uploaded successfully:', response.data);
      alert('File uploaded successfully');
    } catch (error) {
      console.error('Error uploading NDA:', error.response?.data || error.message);
      alert('Error uploading file');
    }
  };



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

  const handleSubmit = async () => {
    if (isChecked) {
      try {
        const token = await AsyncStorage.getItem('token');
        if (!token) {
          console.error('No token found');
          alert('Authentication error. Please log in again.');
          return;
        }

        // Prepare form data
        const formData = new FormData();
        if (file) {
          formData.append('nda', file.rawFile); // Append file directly
        }
        formData.append('agreement', 'Yes'); // Include agreement field

        // Send data to the backend
        const response = await axios.post(
          `${process.env.REACT_APP_API_URL}/api/business/upload-business-nda`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'multipart/form-data',
            },
          }
        );

        console.log('Response from server:', response.data);
        alert('Terms and conditions accepted. Proceeding to the next step.');

        // Proceed to the next step
        setCurrentStep(2);
        setActiveCard("Subscriptions");
      } catch (error) {
        console.error('Error submitting agreement:', error.response?.data || error.message);
        alert('An error occurred while submitting the agreement. Please try again.');
      }
    } else {
      alert('Please agree to the terms and conditions before proceeding.');
    }
  };


  useEffect(() => {
    const fetchNda = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        if (!token) {
          console.error('No token found');
          return;
        }

        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/business/get-business-nda`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.data) {
          // Set the uploaded file details (name or other relevant information)
          setUploadedFile(response.data); // Assuming response contains file information
        }
      } catch (error) {
        console.error('Error fetching NDA document:', error);
      }
    };

    fetchNda();
  }, []);

  const [fontsLoaded] = useFonts({
    "Roboto-Light": require("../assets/fonts/Roboto-Light.ttf"),
  });

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
  
  const sections = [
    {
      title: "Startup",
      options: [
        { title: "Default", details: ["Skill gap analysis (AI & expert)", "Growth plan", "Backup response time - 24hrs", "Coaching hub - 1 hub access", "Best practice access - 30%"], cost: "No additional cost", isDefault: true },
        { title: "Standard", details: ["Skill gap analysis (AI & expert)", "Growth plan", "Backup response time - 12hrs", "Coaching hub - 2 hub access", "Best practice access - 60%"], cost: "$40 monthly" },
        { title: "Advance", details: ["Skill gap analysis (AI & expert)", "Growth plan", "Backup response time - 4hrs", "Coaching hub - Unlimited", "Best practice access - Unlimited"], cost: "$100 monthly" },
      ],
    },
    {
      title: "Professional",
      options: [
        { title: "Default", details: ["Skill gap analysis (AI & expert)", "Growth plan", "Backup response time - 24hrs", "Coaching hub - 1 hub access", "Best practice access - 30%"], cost: "No additional cost", isDefault: true },
        { title: "Standard", details: ["Skill gap analysis (AI & expert)", "Growth plan", "Backup response time - 12hrs", "Coaching hub - 2 hub access", "Best practice access - 60%"], cost: "$40 monthly" },
        { title: "Advance", details: ["Skill gap analysis (AI & expert)", "Growth plan", "Backup response time - 4hrs", "Coaching hub - Unlimited", "Best practice access - Unlimited"], cost: "$100 monthly" },
      ],
    },
    {
      title: "Pro Plus",
      options: [
        { title: "Default", details: ["Skill gap analysis (AI & expert)", "Growth plan", "Backup response time - 24hrs", "Coaching hub - 1 hub access", "Best practice access - 30%"], cost: "No additional cost", isDefault: true },
        { title: "Standard", details: ["Skill gap analysis (AI & expert)", "Growth plan", "Backup response time - 12hrs", "Coaching hub - 2 hub access", "Best practice access - 60%"], cost: "$40 monthly" },
        { title: "Advance", details: ["Skill gap analysis (AI & expert)", "Growth plan", "Backup response time - 4hrs", "Coaching hub - Unlimited", "Best practice access - Unlimited"], cost: "$100 monthly" },
      ],
    },
    {
      title: "Premium",
      options: [
        { title: "Default", details: ["Skill gap analysis (AI & expert)", "Growth plan", "Backup response time - 24hrs", "Coaching hub - 1 hub access", "Best practice access - 30%"], cost: "No additional cost", isDefault: true },
        { title: "Standard", details: ["Skill gap analysis (AI & expert)", "Growth plan", "Backup response time - 12hrs", "Coaching hub - 2 hub access", "Best practice access - 60%"], cost: "$40 monthly" },
        { title: "Advance", details: ["Skill gap analysis (AI & expert)", "Growth plan", "Backup response time - 4hrs", "Coaching hub - Unlimited", "Best practice access - Unlimited"], cost: "$100 monthly" },
      ],
    },
  ];

  const plans = [
      {
        id: "Startup",
        title: "Standard",
        topic:
          "Preserve your expertise effortlessly. Solve high-priority challenges while securing a solid knowledge foundation.",
        description: [
          "1 - 5 subscribed employees",
          "Access to expert support",
          "AI Skill analysis",
          "Monthly strategy growth plan",
          "Knowledge sharing Hub",
        ],
        pricing: {
          monthly: "$3900",
          quarterly: "$85",
          annually: "$75",
        },
        price: "$3,900",
        plan: "5 users pack",
        color: "#FFFFFF",
      },
      {
        id: "Professional",
        title: "Professional",
        topic:
          "Accelerate your career growth with expert-backed strategies designed to amplify your success.",
        description: [
          "6 - 25 subscribed employees",
          "Priority access to expert support",
          "AI Skill analysis",
          "Monthly strategy growth plan",
          "Knowledge sharing Hub",
        ],
        pricing: {
          monthly: "$15500",
          quarterly: "$85",
          annually: "$75",
        },
        price: "$15,500",
        plan: "25 users pack",
        color: "#FFFFFF",
      },
      {
        id: "Premium",
        title: "Premium",
        topic:
          "Accelerate your career growth with expert-backed strategies designed to amplify your success.",
        description: [
          "26 - 50 subscribed employees",
          "Priority access to expert support",
          "AI Skill analysis",
          "Monthly strategy growth plan",
          "Knowledge sharing Hub",
        ],
        pricing: {
          monthly: "$25500",
          quarterly: "$85",
          annually: "$75",
        },
        price: "$25,500",
        plan: "50 users pack",
        color: "#FFFFFF",
      },
      {
        id: "Custom",
        title: "Custom",
        topic:
          "If these plans don't fit, let's create one that suits you, customoze your subscription for a perfect fit, bigger is better.",
        description: [
          "51+ subscribed employees",
          "Priority access to expert support",
          "AI Skill analysis",
          "Monthly strategy growth plan",
          "Knowledge sharing Hub",
        ],
        pricing: {
          monthly: "$25500",
          quarterly: "$170",
          annually: "$150",
        },
        price: "Let's Talk!",
        plan: "Up to 5 users",
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
      heading: t(" "),
      content: (
        <View style={styles.uploadContainer}>
          <Text style={styles.mainHeading2}>
            {t("Non-Disclosure Agreement")}
          </Text>
          <Text style={styles.subHeading2}>
          Upload Non-Disclosure Agreement to Guard Against Sensitive Information
          {'\n'}Your employees will be working with our experts to improve their performance and complete challenging task to meet expectations and deadline. This means their would-be conversations and questions concerning your business and its operations. Other organization using AngleQuest have the companys’ non-disclosure agreement uploaded on our platform for our experts to sign before working with any of their employee.
          </Text>
          {/* Show uploaded file details and option to upload a new NDA */}
  {uploadedFile ? (
    <View style={{ flexDirection: "column" }}>
      <View
        style={{
          marginBottom: -10,
          flexDirection: "row",
          marginLeft: 10,
          marginTop: 10,
        }}
      >
        <Text style={{ fontSize: 18, fontWeight: '600'}}>{t("Uploaded NDA File:")}</Text>
        <Text style={{ fontSize: 18, fontWeight: '600', marginLeft: 5 }}>
          {uploadedFile?.fileName || "N/A"}
        </Text>
      </View>
      <TouchableOpacity
        style={{ flexDirection: "row", marginTop: 20 }}
        onPress={() => setUploadedFile(null)} // Clear the uploaded file to allow uploading a new one
      >
        <Image
          source={{
            uri: "https://img.icons8.com/?size=100&id=367&format=png&color=000000",
          }}
          style={{ width: 20, height: 20, marginLeft: 10 }}
        />
        <Text style={{ marginTop: 1, fontSize: 16, marginLeft: 10 }}>
          {t("Upload a new NDA")}
        </Text>
      </TouchableOpacity>
    </View>
  ) : (
    // Show file input if no file is uploaded or user chooses to upload a new one
    <View >
    <View style={styles.input}>
      <input
        type="file"
        onChange={handleFileChange}
        accept=".pdf,.doc,.docx" // Optional: Restrict file types
      />
       </View>
      <Text style={styles.uploadInfo}>
        {t("Max File Size: 250MB, File type: pdf or word")}
      </Text>
      <TouchableOpacity style={styles.buttonsave} onPress={handleSave}>
            <Text style={styles.buttonsaveText}>{t("Save")}</Text>
          </TouchableOpacity>
   </View>
  )}
        
          
          <TouchableOpacity style={styles.buttondone} onPress={() => {

                       setCurrentStep(1); 
                       setActiveCard("AngleQuest Agreement");
                     }}
                   >
                            <Text style={styles.buttonsaveText}>{t("Next")}</Text>
                          </TouchableOpacity>
        </View>
      ),
    },
    {
      heading: t(" "),
      content: (
        <View style={styles.uploadContainer}>
          <Text style={styles.mainHeading2}>
            {t("AngleQuest Agreement")}
          </Text>
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
        <View style={styles.checkboxContainer}>
          <CheckBox value={isChecked} onValueChange={handleCheckboxToggle} />
          <Text style={styles.checkboxLabel}>I agree to the terms and conditions</Text>
        </View>
       <TouchableOpacity onPress={handleSubmit} style={styles.buttondone}>
                            <Text style={styles.buttonsaveText}>{t("Next")}</Text>
                          </TouchableOpacity>

        </View>
      ),
    },
    {
      heading: t(
        "Orchestrate your team members performance and growth using these services...",
      ),
      content: (
       <View>
                   
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
                 <Text style={styles.planPrice}>{plan.price}</Text>
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
                   <TouchableOpacity onPress={handleOpenPress} style={styles.getStartedButton2}>
                              <Text style={styles.getStartedText2}>Book a call</Text>
                            </TouchableOpacity>
                 )}
               </LinearGradient>
             ) : (
               <View style={[styles.card, { borderRadius: 10 }]}>
                <View style={{flexDirection: 'row'}}>
                 <Text style={styles.planTitle}>{plan.title}</Text><Text style={{fontSize: 12, marginLeft: 5, marginTop: 15, color: 'darkgreen'}}>{plan.plan}</Text>  </View>
                 <Text style={styles.planTopic}>{plan.topic}</Text>
                 <Text style={styles.planPrice}>{plan.price}<Text style={{fontSize: 12, color: 'grey'}}>/year</Text></Text>
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
      heading: t("Service Level Agreement"),
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
      title: t("Non-Disclosure agreement"),
      icon: "https://img.icons8.com/?size=100&id=48354&format=png&color=000000",
    },
    {
      title: t("AngleQuest Agreement"),
      icon: "https://img.icons8.com/?size=100&id=48354&format=png&color=000000",
    },
    {
      title: t("Subscriptions"),
      icon: "https://img.icons8.com/?size=100&id=SazSfIWdDmr2&format=png&color=000000",
    },
    {
      title: t("Service Level Agreement"),
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
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  greenBox: {
    width: 1300,
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
    color: "darkgreen",
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
    width: 360,
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
    backgroundColor: "darkgreen",
    padding: 10,
    width: 100,
    marginLeft: 10,
    borderRadius: 5,
    marginTop: 20,
    marginLeft: 1000,
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
    width: 280,
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
    height: 150
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
  paymentOptions: {
    width: "100%",
    alignItems: "center",
  },
  checkmark:{ 
fontWeight: 200
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
    marginLeft: 10,
    marginRight: 30,
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
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 15,
    marginLeft: 10
  },
  checkboxLabel: {
    marginLeft: 8,
    fontSize: 16,
    color: '#333',
  },
  submitButton: {
    backgroundColor: '#007BFF',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  uploadContainer: {
    marginLeft: 30,
    marginTop: -10
  },
});

export default AngleQuestPage;
