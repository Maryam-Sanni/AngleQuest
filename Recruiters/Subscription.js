import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet,  ImageBackground, Modal, TextInput, FlatList, Alert, ScrollView, Image, TouchableOpacity } from 'react-native';
import { Button, Checkbox, Switch } from 'react-native-paper';
import Topbar from '../components/Recruiterstopbar';
import Sidebar from '../components/Recruiterssidebar';
import OpenModal from './New Employee';
import OpenModal2 from './PaymentCard';
import { MaterialIcons } from '@expo/vector-icons';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const BillingsAndPayment = () => {
  const [selectedTab, setSelectedTab] = useState('Plan Management');
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [newPaymentDetails, setNewPaymentDetails] = useState({ cardNumber: '', expiry: '', cvv: '' });
   const [activeTab, setActiveTab] = useState('Plan Management');
  const [ModalVisible, setModalVisible] = useState(false);
   const [ModalVisible2, setModalVisible2] = useState(false);
  const [profile, setProfile] = useState(null); 
  const [userName, setUserName] = useState(''); 
  const [userEmail, setUserEmail] = useState('')
  const [phone, setPhone] = useState(''); 
  const [cardDetails, setCardDetails] = useState(null);
  const [paymentHistory, setPaymentHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Retrieve values from AsyncStorage
        const values = await AsyncStorage.multiGet(['first_name', 'last_name', 'email']);
        
        // Find values or set defaults if not available
        const firstName = values.find(item => item[0] === 'first_name')?.[1] || '';
        const lastName = values.find(item => item[0] === 'last_name')?.[1] || '';
        const email = values.find(item => item[0] === 'email')?.[1] || '';

        // Update the state with the retrieved values
        setUserName(`${firstName} ${lastName}`);
        setUserEmail(email);
      } catch (error) {
        console.error('Failed to fetch user data from AsyncStorage', error);
      }
    };

    fetchUserData();
  }, []); // Empty dependency array means it runs only once when the component mounts


   const apiUrl = process.env.REACT_APP_API_URL;


  // Fallback in case both AsyncStorage and API request fail
  const displayName = userName || "No name yet";
  const displayEmail = userEmail || "No email yet";
  const avatarLetter = displayName.charAt(0).toUpperCase();


  // Fetch Payment History from API
  useEffect(() => {
    const fetchPaymentHistory = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        if (!token) {
          Alert.alert('Error', 'No authentication token found.');
          return;
        }

        const response = await axios.get(`${apiUrl}/api/business/payment-history`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const { payments } = response.data; // Assuming the response has the 'payments' field

        if (payments) {
          setPaymentHistory(payments);
        } else {
          Alert.alert('Error', 'No payment history available.');
        }
      } catch (error) {
        console.error('Error fetching payment history:', error);
        Alert.alert('Error', 'Failed to fetch payment history.');
      } finally {
        setLoading(false);
      }
    };

    fetchPaymentHistory();
  }, []);

  useEffect(() => {
    const fetchCardDetails = async () => {
      try {
        // Retrieve the token from AsyncStorage
        const token = await AsyncStorage.getItem('token');

        if (!token) {
          throw new Error('No authentication token found');
        }

        // Make the API request with authentication
        const response = await fetch(`${apiUrl}/api/expert/card-details`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`, // Attach the token
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setCardDetails(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCardDetails();
  }, []); // Runs once when the component mounts

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setSelectedTab(tab);
  };

  const handleOpenPress = () => {
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  const handleOpenPress2 = () => {
    setModalVisible2(true);
  };

  const handleCloseModal2 = () => {
    setModalVisible2(false);
  };
  
  const [plans, setPlans] = useState([
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
      price: "$325",
      plan: "5 users plan",
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
        monthly: "$1,200",
        quarterly: "$85",
        annually: "$75",
      },
      price: "$1,200",
      plan: "25 users plan",
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
        monthly: "$2,000",
        quarterly: "$85",
        annually: "$75",
      },
      price: "$2,000",
      plan: "50 users plan",
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
      price: "Custom",
      plan: "unlimited users plan",
      color: "#F3E5F5"
    },
  ]);
  const [currentPlan, setCurrentPlan] = useState(plans[0]);
  const [showAllPlans, setShowAllPlans] = useState(false);

  const [sla, setSLA] = useState(0);
  const [numberOfUsers, setNumberOfUsers] = useState(0);
  const [createdDate, setCreatedDate] = useState("");
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = await AsyncStorage.getItem("token");
        if (!token) {
          console.error("No token found");
          return;
        }

        const response = await axios.get(`${apiUrl}/api/business/get-business-nda`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = response.data?.BNDA;
        if (data?.subscription_type) {
          // Map SLA values
          const slaValue = parseInt(data.sla, 10);
          const slaMapping = {
            0: "Default",
            40: "Standard",
            100: "Advanced",
          };

          setSLA(slaMapping[slaValue] || "Unknown");

          // Set number of users based on subscription type
          const usersMapping = {
            Standard: 5,
            Professional: 25,
            Premium: 50,
          };

          setNumberOfUsers(usersMapping[data.subscription_type] || 0);

          // Set the active plan based on subscription type
          const updatedPlans = plans.map((plan) => {
            const isActive = plan.title === data.subscription_type;
            if (isActive) {
              setCurrentPlan(plan); // Update the current plan to the active one
            }
            return { ...plan, active: isActive };
          });

          setPlans(updatedPlans);

          // Format and set created date
          const formattedDate = new Date(data.created_at).toLocaleDateString();
          setCreatedDate(formattedDate);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [apiUrl, plans]);
  
  const handleChangePlan = (selectedPlan) => {
    // Reorder plans to make the selected plan first
    const reorderedPlans = [selectedPlan, ...plans.filter(plan => plan.id !== selectedPlan.id)];
    setPlans(reorderedPlans);
    setCurrentPlan(selectedPlan);
    setShowAllPlans(false);
  };

  return (
    <ImageBackground
    source={require ('../assets/backgroundimg2.png') }
    style={{ height: '100%', width: '100%',flex: 1}}
    >
    <View style={{ flex: 1}}>
    <Topbar />
    <View style={{ flexDirection: 'row', flex: 1  }}>
      <Sidebar />
    <ScrollView style={styles.container}>
      <View style={styles.header}>
            <Button
              mode="text"
              textColor="#000000"
              style={[
                styles.button,
                activeTab === 'Plan Management' && styles.activeButton,
              ]}
              onPress={() => handleTabChange('Plan Management')}
              icon={() => (
                <Image
                  source={{ uri: 'https://img.icons8.com/?size=100&id=41170&format=png&color=000000' }}
                  style={{ width: 20, height: 20 }}
                />
              )}
            >
              Plan Management
            </Button>
        <Button
          mode="text"
          textColor="#000000"
          style={[
            styles.button,
            activeTab === 'Billings Management' && styles.activeButton,
          ]}
          onPress={() => handleTabChange('Billings Management')}
          icon={() => (
            <Image
              source={{ uri: 'https://img.icons8.com/?size=100&id=215&format=png&color=000000' }}
              style={{ width: 20, height: 20 }}
            />
          )}
        >
          Billings Management
        </Button>
        <Button
          mode="text"
          textColor="#000000"
          style={[
            styles.button,
            activeTab === 'Payment History' && styles.activeButton,
          ]}
          onPress={() => handleTabChange('Payment History')}
          icon={() => (
            <Image
              source={{ uri: 'https://img.icons8.com/?size=100&id=111486&format=png&color=000000' }}
              style={{ width: 20, height: 20 }}
            />
          )}
        >
          Payment History
        </Button>
       
      </View>

      {selectedTab === 'Plan Management' && (
  <View style={styles.tabContent}>
    {/* Plan Information */}
    <View style={styles.planInform}>
      <Text style={styles.planInfo}>{currentPlan.title}</Text>
      <Image
        source={{ uri: 'https://img.icons8.com/?size=100&id=85185&format=png&color=000000' }}
        style={{ width: 22, height: 22, marginLeft: 10 }}
      />
      <Image
        source={{ uri: 'https://img.icons8.com/?size=100&id=85185&format=png&color=000000' }}
        style={{ width: 22, height: 22, marginLeft: 5 }}
      />
      <Image
        source={{ uri: 'https://img.icons8.com/?size=100&id=85185&format=png&color=000000' }}
        style={{ width: 22, height: 22, marginLeft: 5 }}
      />
      <Text style={styles.pricingInfo}>Learn more about our pricing</Text>
    </View>

   

    {/* Plan Details */}
    <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
    {showAllPlans ? (
    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
      {plans.map((item) => (
        <View key={item.id} style={[styles.card, { width: 300, marginHorizontal: 10, borderRadius: 10 }]}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={styles.planTitle}>{item.title}</Text>
            <Text style={{ fontSize: 12, marginLeft: 5, marginTop: 3, color: 'darkgreen' }}>
              {item.plan}
            </Text>
          </View>
          <Text style={styles.planTopic}>{item.topic}</Text>
          <Text style={styles.planPrice}>
            {item.price}
            <Text style={{ fontSize: 12, color: 'grey' }}>/month</Text>
          </Text>
          <View style={{ width: '100%', borderBottomWidth: 1, borderBottomColor: '#ccc', marginVertical: 15 }} />
          <View style={styles.description}>
            {item.description.map((desc, index) => (
              <View key={index} style={styles.descriptionItem}>
                <Image
                  source={{
                    uri: 'https://img.icons8.com/?size=100&id=82817&format=png&color=000000',
                  }}
                  style={styles.checkIcon}
                />
                <Text style={styles.descriptionText}>{desc}</Text>
              </View>
            ))}
          </View>
          <View style={{ width: '100%', borderBottomWidth: 1, borderBottomColor: '#ccc', marginVertical: 15 }} />
          <TouchableOpacity
            style={styles.getStartedButton2}
            onPress={() => handleChangePlan(item)}
          >
            <Text style={styles.getStartedText2}>
              {currentPlan.id === item.id ? 'Current Plan' : 'Select Plan'}
            </Text>
          </TouchableOpacity>
        </View>
      ))}
    </ScrollView>
  ) : (
        <View style={[styles.card, { borderRadius: 10 }]}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={styles.planTitle}>{currentPlan.title}</Text>
            <Text style={{ fontSize: 12, marginLeft: 5, marginTop: 3, color: 'darkgreen' }}>
              {currentPlan.plan}
            </Text>
          </View>
          <Text style={styles.planTopic}>{currentPlan.topic}</Text>
          <Text style={styles.planPrice}>
            {currentPlan.price}
            <Text style={{ fontSize: 12, color: 'grey' }}>/month</Text>
          </Text>
                           <View style={{ width: '100%', borderBottomWidth: 1, borderBottomColor: '#ccc', marginTop: 15, marginBottom: 15 }} />
          <View style={styles.description}>
            {currentPlan.description.map((desc, index) => (
              <View key={index} style={styles.descriptionItem}>
                <Image
                  source={{
                    uri: 'https://img.icons8.com/?size=100&id=82817&format=png&color=000000',
                  }}
                  style={styles.checkIcon}
                />
                <Text style={styles.descriptionText}>{desc}</Text>
              </View>
            ))}
          </View>
                           <View style={{ width: '100%', borderBottomWidth: 1, borderBottomColor: '#ccc', marginTop: 15, marginBottom: 15 }} />
          <TouchableOpacity
            style={styles.getStartedButton3}
            onPress={() => setShowAllPlans(true)}
          >
            <Text style={styles.getStartedText2}>Change Plan</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  </View>
)}


      {selectedTab === 'Billings Management' && (
        <View style={styles.tabContent}>
    

          {/* Row: Accumulated Usage Cost and Payment Options */}
          <View style={styles.billingRow}>

                           <Text style={styles.savedCardTitle}>Standard Plan</Text>  
                           <Text style={{ fontSize: 15, color: 'grey', width: 800, marginBottom: 10}}>You will no longer be able to add users when the user count for your subscription is filled, please change your plan to accomodate the number of users you will like to subscribe</Text> 
                           <Text style={{position: 'absolute', right: 22, fontSize: 16}}>{numberOfUsers} user(s) remaining</Text>

        

          <View style={{backgroundColor: '#F0F0F0', padding: 20, borderRadius: 10, marginTop: 10}}>
          <View style={{flexDirection: 'row', marginTop: 10}}>
                <View style={styles.cardInfo}>
                <Image source={{ uri: 'https://img.icons8.com/?size=100&id=lWWE908jTJ3m&format=png&color=000000' }} style={styles.cardIcon} />
                                         <View style={{flexDirection: 'column', marginLeft: 10}}>
                                         <Text style={styles.cardNumber}>**** **** **** 3241 (Primary)</Text>
                                         <Text style={styles.expiryDate}>Expires on 01/2026</Text>
                                         </View>
                                       </View>
              <TouchableOpacity style={{position: 'absolute', right: 5}} onPress={handleOpenPress2}>
                <Text style={styles.addCardButton}>Change card details</Text>
              </TouchableOpacity>
              </View>
            </View>

          </View>

         

           

          {/* Contact Details */}
          <View style={styles.contactDetails}>
             <Text style={{fontSize: 19, marginBottom: 15, fontWeight: 'bold'}}>Contact Details</Text>
             <View style={{flexDirection: 'row', marginTop: 10}}>
             <Text style={{backgroundColor: 'lightgreen', fontSize: 20, fontWeight: '600', padding: 10, textAlign: 'center', borderRadius: 5, width: 50, height: 45}}>{avatarLetter}</Text>
             <View style={{flexDirection: 'column'}}>
            <Text style={styles.contactLabel1}>{displayName}</Text>
            <View style={styles.contactRow}>
        <MaterialIcons name="email" size={20} color="#444" />
        <Text style={styles.contactLabel}>{displayEmail}</Text>
      </View>

      {/* Phone */}
      <View style={styles.contactRow}>
        <MaterialIcons name="phone" size={20} color="#444" />
        <Text style={styles.contactLabel}>{phone || 'No phone available'}</Text>
      </View>
      
            </View>
            </View>
          </View>
        </View>
      )}



      {selectedTab === 'Payment History' && (
        <View style={styles.tabContent}>
          <Text style={styles.sectionHeading}>Payment History</Text>

          {/* Invoice Table */}
          <View style={styles.invoiceTable}>
            <View style={styles.tableHeader}>
              <Text style={styles.tableHeaderItem}>Invoice Number</Text>
              <Text style={styles.tableHeaderItem}>Invoice Date</Text>
              <Text style={styles.tableHeaderItem}>Due Date</Text>
              <Text style={styles.tableHeaderItem}>Amount</Text>
              <Text style={styles.tableHeaderItem}>Type</Text>
              <Text style={styles.tableHeaderItem}>Status</Text>
            </View>

            {/* If there are no transactions, display "No transactions yet" */}
            {paymentHistory.length === 0 ? (
              <View style={styles.noTransactions}>
                <Text>No transactions yet</Text>
              </View>
            ) : (
              // Map over paymentHistory array to render table rows
              !loading ? (
                paymentHistory.map((payment, index) => (
                  <View style={styles.tableRow} key={index}>
                    <Text style={styles.tableRowItem}>{payment.invoiceNumber}</Text>
                    <Text style={styles.tableRowItem}>{payment.invoiceDate}</Text>
                    <Text style={styles.tableRowItem}>{payment.dueDate}</Text>
                    <Text style={styles.tableRowItem}>${payment.amount}</Text>
                    <Text style={styles.tableRowItem}>{payment.type}</Text>
                    <Text style={payment.status === 'Paid' ? styles.tableRowItemPaid : styles.tableRowItem}>
                      {payment.status}
                    </Text>
                  </View>
                ))
              ) : (
                <Text>Loading...</Text>
              )
            )}
          </View>

         
        
        </View>
      )}


      

      <Modal
        animationType="slide"
        transparent={true}
        visible={ModalVisible2}
        onRequestClose={handleCloseModal2}
      >
        <View style={styles.modalContent}>
          <OpenModal2 onClose={handleCloseModal2} />
        </View>
      </Modal>
    </ScrollView>
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
    </View>
    </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor: 'white', marginLeft: 210 },
  modalContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.1)",
  },
  header: {
    flexDirection: 'row',
    padding: 10,
    marginBottom: 10,
    shadowColor: '#000',
      shadowOffset: { width: 0, height: 2, }, 
      shadowOpacity: 0.25, 
      shadowRadius: 3.84,
       elevation: 5, 
  },
  tabContent: { marginVertical: 10},
  tabRow: { flexDirection: 'row' },
    planBox: {
      marginBottom: 20,
      borderWidth: 1,
      borderColor: 'grey',
      alignItems: 'flex-start',
      height: 170,
      borderRadius: 12,
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
        padding: 16,
    },
  planBox2: {
    marginBottom: 20,
    borderWidth: 1,
    borderColor: 'grey',
    alignItems: 'flex-start',
    height: 150,
    borderRadius: 12,
      backgroundColor: '#fff',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
      padding: 16,
  },
  cardContainer: {
    width: '32%',
    height: 200,
    marginRight: '2%',
    borderRadius: 12,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    padding: 16,
  },
    serviceTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
  serviceTitle2: { fontSize: 20, fontWeight: 'bold', marginBottom: 10 },
    emojiRow: { flexDirection: 'row', marginBottom: 10 },
  valueText: { fontSize: 16, fontWeight: 'bold', marginBottom: 15, marginTop: 10 },
    descriptionText: { fontSize: 14, marginBottom: 5, color: '#333', },
  billingheading: { fontSize: 18, fontWeight: '500', marginTop: 20, marginLeft: 20, marginBottom: 10 },
  heading: { fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
  planInform: { marginTop: 10, flexDirection: 'row',  padding: 10, borderWidth: 1, borderColor: 'grey', marginBottom: 20},
  planInfo: {fontSize: 22, color: 'black', fontWeight: 'bold', },
  pricingInfo: {fontSize: 14, color: 'green', position: 'absolute', right: 20, textDecorationLine: 'underline' },
  historyItem: { padding: 10, backgroundColor: '#fff', marginBottom: 10, borderRadius: 8 },
  serviceBox: { padding: 15, backgroundColor: '#f0f0f0', marginBottom: 10, borderRadius: 8 },
  serviceBoxTitle: { fontSize: 19, fontWeight: 'bold', marginTop: 50, marginBottom: 10 },
  modalContainer: { flex: 1, justifyContent: 'center', backgroundColor: 'white', padding: 20 },
  modalHeading: { fontSize: 18, marginBottom: 20, color: '#fff' },
  input: { backgroundColor: '#fff', padding: 10, marginBottom: 10, borderRadius: 5 },
  newButton: {
    position: 'absolute',
    right: 20,
    bottom: 10,
    paddingVertical: 8,
    paddingHorizontal: 15,
    backgroundColor: 'white',
    borderRadius: 5,
  },
  newButtonText: {
    color: 'green',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 16
  },
  activeButton: {
    backgroundColor: 'rgba(0, 0, 0, 0.07)',
  },
  button: {
   marginRight: 10,
  },
  billingRow: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    marginBottom: 20,
    borderWidth: 1,
    borderRadius: 10,
    padding: 20,
  },
  accumulatedCostContainer: {
    flex: 1,
  },
  accumulatedCost: {
    fontSize: 18,
    width: 100,
    backgroundColor: '#F8F8F8',
     marginTop: 10,
      padding: 10,
    textAlign: 'center',
    color: 'black',
    marginBottom: 10,
    marginLeft: 30
  },
  payButton: {
    backgroundColor: '#4CAF50',
    width: 100,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: 'center',
    marginLeft: 30,
    marginTop: 10
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  cardSection: {
    flex: 1,
    alignItems: 'flex-end',
marginRight: 20
  },
  cardIcon: {
    width: 60,
    height: 60,
   marginTop: -10
  },
  cardDetails: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: -30,
  },
  addCardButton: {
    fontSize: 14,
    color: 'green',
    textDecorationLine: 'underline',
    marginTop: 8,
    marginRight: 45
  },
  contactDetails: {
    marginTop: 20,
  },
  contactLabel: {
    fontSize: 15,
    color: '#444',
    marginLeft: 5
  },
  contactRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    marginLeft: 10
  },
  contactLabel1: {
    fontSize: 17,
    fontWeight: 600,
    marginBottom: 8,
    marginLeft: 10
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
    textAlign: 'center',
  },
  savedCardTitle: {
    fontSize: 19,
    fontWeight: 'bold',
    marginBottom: 4,
    marginRight: 45
  },
  contactDetails: {
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 8,
    padding: 16,
    marginTop: 16,
  },
  invoiceTable: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    marginBottom: 25
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#f5f5f5',
    padding: 10,
  },
  tableHeaderItem: {
    flex: 1,
    fontWeight: 'bold',
    fontSize: 14,
    textAlign: 'center',
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    padding: 10,
  },
  tableRowItem: {
    flex: 1,
    fontSize: 14,
    textAlign: 'center',
  },
  tableRowItemPaid: {
    flex: 1,
    fontSize: 14,
    textAlign: 'center',
    color: 'green',
    fontWeight: 'bold',
  },
  sectionHeading: {
    fontSize: 19,
    fontWeight: 'bold',
    marginBottom: 10,
    marginTop: 10,
  },
  breakdownSection: {
    marginBottom: 20,
    borderWidth: 1, borderColor: '#ccc', borderRadius: 8,
    paddingTop: 20
  },
  breakdownText: {
    marginBottom: 5,
    fontSize: 15,
    paddingBottom: 10, 
    marginLeft: 10
  },
  billableTotal: {
    fontSize: 15,
    fontWeight: 'bold',
    paddingBottom: 10, 
    marginLeft: 10
  },
  seviceamount: {
    position: 'absolute',
    right: 20,
    bottom: 10,
    fontSize: 16
  },
  planHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  circle: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: 'blue',
    marginRight: 8,
  },
  planTitle: {
    fontSize: 22,
    fontWeight: '600',
    color: '#333',
  },
  planDetails: {
    marginBottom: 16,
  },
  bulletPoint: {
    fontSize: 16,
    color: '#555',
    marginBottom: 4,
  },
  selectPlanButton: {
    backgroundColor: '#008000',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignSelf: 'stretch',
    alignItems: 'center',
  },
  selectPlanButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  cardplan: {
    width: '32%',
    height: 200,
    marginRight: '2%',
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 12,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    padding: 16,
  },
  currentPlan: {
    borderWidth: 2,
    borderColor: 'green',
  },
  currentBadge: {
    backgroundColor: '#206C00',
    padding: 10,
    alignSelf: 'stretch',
    marginTop: 47,
    marginLeft: -16,
    marginRight: -16,
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12
  },
  currentBadgeText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center'
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
    backgroundColor: "green",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginTop: 10,
    alignSelf: "stretch",
    alignItems: "center",
  },
  getStartedButton3: {
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
  cardInfo: {
    marginBottom: 12,
    width: "70%",
    padding: 10,
     borderRadius: 5,
    flexDirection: 'row',
  },
  cardBrand: {
    fontSize: 17,
    fontWeight: 'bold',
  },
  cardNumber: {
    fontSize: 15,
    color: '#555',
    marginVertical: 4,
  },
  expiryDate: {
    fontSize: 15,
    color: '#555',
  },
});

export default BillingsAndPayment;