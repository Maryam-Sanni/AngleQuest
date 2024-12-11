import React, { useState } from 'react';
import { View, Text, StyleSheet,  ImageBackground, Modal, TextInput, ScrollView, Image, TouchableOpacity } from 'react-native';
import { Button, Checkbox, Switch } from 'react-native-paper';
import Topbar from '../components/Recruiterstopbar';
import Sidebar from '../components/Recruiterssidebar';
import OpenModal from './New Employee';
import OpenModal2 from './PaymentCard';

const BillingsAndPayment = () => {
  const [selectedTab, setSelectedTab] = useState('Plan Management');
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [newPaymentDetails, setNewPaymentDetails] = useState({ cardNumber: '', expiry: '', cvv: '' });
   const [activeTab, setActiveTab] = useState('Plan Management');
  const [ModalVisible, setModalVisible] = useState(false);
   const [ModalVisible2, setModalVisible2] = useState(false);

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
        <Button
          mode="text"
          textColor="#000000"
          style={[
            styles.button,
            activeTab === 'Subscription Plan' && styles.activeButton,
          ]}
          onPress={() => handleTabChange('Subscription Plan')}
          icon={() => (
            <Image
              source={{ uri: 'https://img.icons8.com/?size=100&id=7479&format=png&color=000000' }}
              style={{ width: 20, height: 20 }}
            />
          )}
        >
          Subscription Plan
        </Button>
      </View>

      {selectedTab === 'Plan Management' && (
        <View style={styles.tabContent}>
          <View style={styles.planInform}>
           <Text style={styles.planInfo}>Standard Plan</Text>
            <Image 
              source={{ uri: 'https://img.icons8.com/?size=100&id=85185&format=png&color=000000' }} 
              style={{ width: 20, height: 20, marginLeft: 5 }} 
            />
            <Image 
              source={{ uri: 'https://img.icons8.com/?size=100&id=85185&format=png&color=000000' }} 
              style={{ width: 20, height: 20, marginLeft: 5 }} 
            />
            <Image 
              source={{ uri: 'https://img.icons8.com/?size=100&id=85185&format=png&color=000000' }} 
              style={{ width: 20, height: 20, marginLeft: 5 }} 
            />
            <Text style={styles.pricingInfo}>Learn more about our pricing</Text>
          </View>
          <View style={styles.tabRow}>
             <View style={{flexDirection: 'column',  width: '32%', marginRight: "2%"}}>
            <View style={styles.planBox}>
              <Text style={styles.serviceTitle}>Work Delivery Support</Text>
              <View style={styles.emojiRow}>
                {Array.from({ length: 3 }).map((_, index) => (
                  <Image
                    key={index}
                    source={{ uri: 'https://img.icons8.com/?size=100&id=676&format=png&color=1A1A1A' }}
                    style={{ width: 20, height: 20 }}
                  />
                ))}
                <Text style={{marginLeft: 5, fontSize: 16}}>3 employees</Text>        
              </View>
              <Text style={styles.valueText}>
                Features
               </Text>
              <Text style={styles.descriptionText}>
                • Support for project delivery and team collaboration.
              </Text>
               <Text style={styles.descriptionText}>
                 • Support for project delivery and team collaboration.
               </Text>
                <TouchableOpacity style={styles.newButton} onPress={handleOpenPress}>
                  <Text style={styles.newButtonText}>+ New</Text>
                </TouchableOpacity>
            </View>
              
             </View>
            <View style={{flexDirection: 'column', width: '32%', marginRight: "2%"}}>
            <View style={styles.planBox}>
              <Text style={styles.serviceTitle}>Career Growth Support</Text>
              <View style={styles.emojiRow}>
                {Array.from({ length: 5 }).map((_, index) => (
                  <Image
                    key={index}
                    source={{ uri: 'https://img.icons8.com/?size=100&id=676&format=png&color=1A1A1A' }}
              style={{ width: 20, height: 20 }}
                    />
                  ))}
                  <Text style={{marginLeft: 5, fontSize: 16}}>5 employees</Text>
                </View>
              <Text style={styles.valueText}>
                 Features
               </Text>
              <Text style={styles.descriptionText}>
                • Personalized training and development plans.
              </Text>
              <Text style={styles.descriptionText}>
                • Personalized training and development plans.
              </Text>
                  <TouchableOpacity style={styles.newButton} onPress={handleOpenPress}>
                    <Text style={styles.newButtonText}>+ New</Text>
                  </TouchableOpacity>
              </View>
                
            </View>
            <View style={{flexDirection: 'column', width: '32%',}}>
            <View style={styles.planBox}>
              <Text style={styles.serviceTitle}>Work Delivery + Career Growth Support</Text>
              <View style={styles.emojiRow}>
                {Array.from({ length: 3 }).map((_, index) => (
                  <Image
                    key={index}
                    source={{ uri: 'https://img.icons8.com/?size=100&id=676&format=png&color=1A1A1A' }}
              style={{ width: 20, height: 20 }}
                    />
                  ))}
                  <Text style={{marginLeft: 5, fontSize: 16}}>3 employees</Text>
                </View>
              <Text style={styles.valueText}>
                 Features
               </Text>
              <Text style={styles.descriptionText}>
                 • Comprehensive service for team and individual growth.
              </Text>
              <Text style={styles.descriptionText}>
                 • Comprehensive service for team and individual growth.
              </Text>
                  <TouchableOpacity style={styles.newButton} onPress={handleOpenPress}>
                    <Text style={styles.newButtonText}>+ New</Text>
                  </TouchableOpacity>
              </View>
                
          </View>
          </View>
         
        </View>
      )}

      {selectedTab === 'Billings Management' && (
        <View style={styles.tabContent}>
         

          {/* Row: Accumulated Usage Cost and Payment Options */}
          <View style={styles.billingRow}>
            <View style={styles.accumulatedCostContainer}>
               <Text style={styles.savedCardTitle}>Accumulated Usage Cost</Text>
              <Text style={styles.accumulatedCost}>$300</Text>
              <TouchableOpacity 
                style={styles.payButton} 
                onPress={() => alert('Payment successful!')}>
                <Text style={styles.buttonText}>Pay Now</Text>
              </TouchableOpacity>
            </View>

            {/* Saved Card Details and New Payment Option */}
            <View style={styles.cardSection}>
             
              <Text style={styles.savedCardTitle}>Saved Card Details:</Text>
              <View style={{flexDirection: 'row', marginTop: 10}}>
               <Image source={{ uri: 'https://img.icons8.com/?size=100&id=13610&format=png&color=000000' }} style={styles.cardIcon} />
              <Text style={{marginTop: 20, fontSize: 18, marginLeft: 10}}>**** **** **** 1234</Text>
              </View>
              <TouchableOpacity onPress={handleOpenPress2}>
                <Text style={styles.addCardButton}>Add New Payment Option</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Contact Details */}
          <View style={styles.contactDetails}>
             <Text style={{fontSize: 16, marginBottom: 15, fontWeight: 'bold'}}>Contact Details</Text>
            <Text style={styles.contactLabel}>Full Name: John Doe</Text>
            <Text style={styles.contactLabel}>Email: john.doe@example.com</Text>
            <Text style={styles.contactLabel}>Phone: +1 234 567 890</Text>
            <Text style={styles.contactLabel}>Billing Address: 123 Main St, City, Country</Text>
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
              <Text style={styles.tableHeaderItem}>Status</Text>
            </View>
            <View style={styles.tableRow}>
              <Text style={styles.tableRowItem}>INV283199546</Text>
              <Text style={styles.tableRowItem}>01 Dec 2024</Text>
              <Text style={styles.tableRowItem}>01 Dec 2024</Text>
              <Text style={styles.tableRowItem}>$300</Text>
              <Text style={styles.tableRowItemPaid}>Paid</Text>
            </View>
            <View style={styles.tableRow}>
              <Text style={styles.tableRowItem}>INV283199547</Text>
              <Text style={styles.tableRowItem}>01 Nov 2024</Text>
              <Text style={styles.tableRowItem}>01 Nov 2024</Text>
              <Text style={styles.tableRowItem}>$450</Text>
              <Text style={styles.tableRowItemPaid}>Paid</Text>
            </View>
          </View>

          {/* Payment Breakdown Section */}
          <Text style={styles.sectionHeading}>Payment Breakdown</Text>
          <View style={styles.breakdownSection}>
            <Text style={{marginBottom: 5}}>Work Delivery Support: 3 x $80 = $240/monthly</Text>
            <Text style={{marginBottom: 5}}>Career Growth Plan: 5 x $100 = $500/monthly</Text>
            <Text style={{marginBottom: 5}}>Work Delivery + Career Growth Support: 3 x $150 = $450/monthly</Text>
            <Text style={{marginBottom: 5}}>Monthly Total: $1,190</Text>
            <Text style={styles.billableTotal}>
              Actual Billable Total = $1,190 - $119 (10% Discount as Standard Plan Holder) = $1,071
            </Text>
          </View>
        </View>
      )}


      {selectedTab === 'Subscription Plan' && (
        <View style={styles.tabContent}>
          <Text style={styles.sectionHeading}>Subscription Plan</Text>
          <View style={styles.tabRow}>
          <View style={styles.cardContainer}>
            <View style={styles.planHeader}>
              <View style={styles.circle} />
              <Text style={styles.planTitle}>Basic Plan</Text>
            </View>
            <View style={styles.planDetails}>
              <Text style={styles.bulletPoint}>• Under 10 subscribed users</Text>
              <Text style={styles.bulletPoint}>• 0% Discount</Text>
            </View>
           
          </View>

          {/* Standard Plan */}
          <View style={[styles.cardContainer, styles.currentPlan]}>
            <View style={styles.planHeader}>
              <View style={[styles.circle, { backgroundColor: 'green' }]} />
              <Text style={styles.planTitle}>Standard Plan</Text>
            </View>
            <View style={styles.planDetails}>
              <Text style={styles.bulletPoint}>• Between 11 and 20 users</Text>
              <Text style={styles.bulletPoint}>• 10% Discount</Text>
            </View>
            <View style={styles.currentBadge}>
              <Text style={styles.currentBadgeText}>Current Plan</Text>
            </View>
          </View>

          {/* Professional Plan */}
          <View style={styles.cardContainer}>
            <View style={styles.planHeader}>
              <View style={[styles.circle, { backgroundColor: 'purple' }]} />
              <Text style={styles.planTitle}>Professional Plan</Text>
            </View>
            <View style={styles.planDetails}>
              <Text style={styles.bulletPoint}>• 21 users and above</Text>
              <Text style={styles.bulletPoint}>• 15% Discount</Text>
            </View>
          </View>
          </View>
          <Text style={styles.serviceBoxTitle}>Services</Text>
          <View style={styles.tabRow}>
             <View style={{flexDirection: 'column',  width: '32%', marginRight: "2%"}}>
            <View style={styles.planBox2}>
              <Text style={styles.serviceTitle}>Work Delivery Support</Text>
                <Text style={{fontSize: 14}}>Improve your employee's performance by
                50% using AngleQuest Work Delivery support
                to quickly deliver excellent result</Text>
              <Text style={styles.seviceamount}>$80/month</Text>
            </View>
               <Text style={styles.valueText}>
                Proposed Values
               </Text>
            <Text style={styles.descriptionText}>
              Support for project delivery and team collaboration.
            </Text>
               <Text style={styles.descriptionText}>
                 Support for project delivery and team collaboration.
               </Text>
             </View>
            <View style={{flexDirection: 'column', width: '32%', marginRight: "2%"}}>
            <View style={styles.planBox2}>
              <Text style={styles.serviceTitle}>Career Growth Support</Text>
              <Text style={{fontSize: 14}}>Improve your employee's performance by
                50% using AngleQuest Work Delivery support
                to quickly deliver excellent result</Text>
              <Text style={styles.seviceamount}>$100/month</Text>
              </View>
                 <Text style={styles.valueText}>
                  Proposed Values
                 </Text>
            <Text style={styles.descriptionText}>
              Personalized training and development plans.
            </Text>
              <Text style={styles.descriptionText}>
                Personalized training and development plans.
              </Text>
            </View>
            <View style={{flexDirection: 'column', width: '32%',}}>
            <View style={styles.planBox2}>
              <Text style={styles.serviceTitle2}>Work Delivery + Career Growth Support</Text>
                    <Text style={styles.seviceamount}>$150/month</Text>
              </View>
                 <Text style={styles.valueText}>
                  Proposed Values
                 </Text>
            <Text style={styles.descriptionText}>
              Comprehensive service for team and individual growth.
            </Text>
              <Text style={styles.descriptionText}>
                Comprehensive service for team and individual growth.
              </Text>
          </View>
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
      height: 250,
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
    serviceTitle: { fontSize: 16, fontWeight: 'bold', marginBottom: 10 },
  serviceTitle2: { fontSize: 20, fontWeight: 'bold', marginBottom: 10 },
    emojiRow: { flexDirection: 'row', marginBottom: 10 },
  valueText: { fontSize: 12, fontWeight: 'bold', marginBottom: 5, marginTop: 10 },
    descriptionText: { fontSize: 12, marginBottom: 5, color: '#333', },
  billingheading: { fontSize: 18, fontWeight: '500', marginTop: 20, marginLeft: 20, marginBottom: 10 },
  heading: { fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
  planInform: { marginTop: 10, flexDirection: 'row',  padding: 10, borderWidth: 1, borderColor: 'grey', marginBottom: 20},
  planInfo: {fontSize: 18, color: 'black', fontWeight: 'bold', },
  pricingInfo: {fontSize: 14, color: 'green', position: 'absolute', right: 20, textDecorationLine: 'underline' },
  historyItem: { padding: 10, backgroundColor: '#fff', marginBottom: 10, borderRadius: 8 },
  serviceBox: { padding: 15, backgroundColor: '#f0f0f0', marginBottom: 10, borderRadius: 8 },
  serviceBoxTitle: { fontSize: 16, fontWeight: 'bold', marginTop: 30, marginBottom: 10 },
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
  },
  activeButton: {
    backgroundColor: 'rgba(0, 0, 0, 0.07)',
  },
  billingRow: {
    flexDirection: 'row',
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
    paddingLeft: 5,
  },
  cardIcon: {
    width: 60,
    height: 60,
    marginBottom: 10,
  },
  savedCardTitle: {
    fontSize: 16,
    color: '#444',
    marginBottom: 5,
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
    marginTop: 8
  },
  contactDetails: {
    marginTop: 20,
  },
  contactLabel: {
    fontSize: 14,
    color: '#444',
    marginBottom: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
    textAlign: 'center',
  },
  cardSection: {
    flex: 1,
    marginLeft: 16,
  },
  savedCardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  contactDetails: {
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    paddingTop: 16,
    marginTop: 16,
  },
  invoiceTable: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    marginBottom: 16,
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#f5f5f5',
    padding: 8,
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
    padding: 8,
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
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    marginTop: 10,
  },
  breakdownSection: {
    padding: 8,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
  },
  billableTotal: {
    marginTop: 8,
    fontWeight: 'bold',
    fontSize: 14,
  },
  seviceamount: {
    position: 'absolute',
    right: 20,
    bottom: 10,
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
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  planDetails: {
    marginBottom: 16,
  },
  bulletPoint: {
    fontSize: 14,
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
  currentPlan: {
    borderWidth: 2,
    borderColor: 'green',
  },
  currentBadge: {
    backgroundColor: '#206C00',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 5,
    alignSelf: 'flex-start',
  },
  currentBadgeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
});

export default BillingsAndPayment;