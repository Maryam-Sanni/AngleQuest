import React, { useState } from 'react';
import { View, Text, StyleSheet,  ImageBackground, Modal, TextInput, ScrollView, Image, TouchableOpacity } from 'react-native';
import { Button, Checkbox, Switch } from 'react-native-paper';
import Topbar from '../components/Recruiterstopbar';
import Sidebar from '../components/Recruiterssidebar';

const BillingsAndPayment = () => {
  const [selectedTab, setSelectedTab] = useState('Plan Management');
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [newPaymentDetails, setNewPaymentDetails] = useState({ cardNumber: '', expiry: '', cvv: '' });
   const [activeTab, setActiveTab] = useState('Plan Management');

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setSelectedTab(tab);
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
                  source={{ uri: 'https://img.icons8.com/?size=100&id=tkQlwN0B9yKL&format=png&color=000000' }}
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
              source={{ uri: 'https://img.icons8.com/?size=100&id=fLj9nlDRbcCO&format=png&color=000000' }}
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
              source={{ uri: 'https://img.icons8.com/?size=100&id=95090&format=png&color=000000' }}
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
              source={{ uri: 'https://img.icons8.com/?size=100&id=38712&format=png&color=000000' }}
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
                <TouchableOpacity style={styles.newButton} onPress={() => alert('Add new Work Delivery Support')}>
                  <Text style={styles.newButtonText}>+ New</Text>
                </TouchableOpacity>
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
                  <TouchableOpacity style={styles.newButton} onPress={() => alert('Add new Work Delivery Support')}>
                    <Text style={styles.newButtonText}>+ New</Text>
                  </TouchableOpacity>
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
                  <TouchableOpacity style={styles.newButton} onPress={() => alert('Add new Work Delivery Support')}>
                    <Text style={styles.newButtonText}>+ New</Text>
                  </TouchableOpacity>
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

      {selectedTab === 'Billings Management' && (
        <View style={styles.tabContent}>
          <Text style={styles.heading}>Billings Management</Text>
          <Text>Accumulated Usage Cost: $300</Text>
          <Button title="Pay Now" onPress={() => alert('Payment successful!')} />
          <Text>Saved Card Details:</Text>
          <Text>**** **** **** 1234</Text>
          <Button title="Add New Payment Option" onPress={() => setShowPaymentModal(true)} />
          <Text>Contact Details: support@example.com</Text>
        </View>
      )}

      {selectedTab === 'Payment History' && (
        <View style={styles.tabContent}>
          <Text style={styles.heading}>Payment History</Text>
          <View style={styles.historyItem}>
            <Text>Date: 01 Dec 2024</Text>
            <Text>Amount: $150</Text>
            <Text>Breakdown: $80 (Work Delivery Support) + $70 (Career Growth Support)</Text>
          </View>
          <View style={styles.historyItem}>
            <Text>Date: 01 Nov 2024</Text>
            <Text>Amount: $300</Text>
            <Text>Breakdown: $150 (Work Delivery + Career Growth Support)</Text>
          </View>
        </View>
      )}

      {selectedTab === 'Subscription Plan' && (
        <View style={styles.tabContent}>
          <Text style={styles.heading}>Subscription Plan</Text>
          <View style={styles.planBox}>
            <Text>Basic Plan</Text>
            <Text>1-10 employees</Text>
          </View>
          <View style={styles.planBox}>
            <Text>Standard Plan</Text>
            <Text>11-20 employees</Text>
          </View>
          <View style={styles.planBox}>
            <Text>Professional Plan</Text>
            <Text>21+ employees</Text>
          </View>
          <Text style={styles.serviceBoxTitle}>Services</Text>
          <View style={styles.serviceBox}>
            <Text>Work Delivery Support</Text>
            <Text>$80/month</Text>
            <Text>Benefits: Project assistance, collaboration tools.</Text>
          </View>
          <View style={styles.serviceBox}>
            <Text>Career Growth Support</Text>
            <Text>$100/month</Text>
            <Text>Benefits: Training, skill development programs.</Text>
          </View>
          <View style={styles.serviceBox}>
            <Text>Work Delivery + Career Growth Support</Text>
            <Text>$150/month</Text>
            <Text>Benefits: Comprehensive team and personal growth support.</Text>
          </View>
        </View>
      )}

      <Modal visible={showPaymentModal} transparent={true} animationType="slide">
        <View style={styles.modalContainer}>
          <Text style={styles.modalHeading}>Add New Payment Option</Text>
          <TextInput
            style={styles.input}
            placeholder="Card Number"
            value={newPaymentDetails.cardNumber}
            onChangeText={(text) => setNewPaymentDetails({ ...newPaymentDetails, cardNumber: text })}
          />
          <TextInput
            style={styles.input}
            placeholder="Expiry Date"
            value={newPaymentDetails.expiry}
            onChangeText={(text) => setNewPaymentDetails({ ...newPaymentDetails, expiry: text })}
          />
          <TextInput
            style={styles.input}
            placeholder="CVV"
            secureTextEntry
            value={newPaymentDetails.cvv}
            onChangeText={(text) => setNewPaymentDetails({ ...newPaymentDetails, cvv: text })}
          />
          <Button title="Save" onPress={() => setShowPaymentModal(false)} />
          <Button title="Cancel" onPress={() => setShowPaymentModal(false)} />
        </View>
      </Modal>
    </ScrollView>
    </View>
    </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor: 'white', marginLeft: 210 },
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
      padding: 15,
      borderWidth: 1, borderColor: 'grey',
      marginBottom: 20,
      borderRadius: 8,
      alignItems: 'flex-start',
      height: 150
    },
    serviceTitle: { fontSize: 16, fontWeight: 'bold', marginBottom: 10 },
    emojiRow: { flexDirection: 'row', marginBottom: 10 },
  valueText: { fontSize: 14, fontWeight: 'bold', marginBottom: 20 },
    descriptionText: { fontSize: 14, marginBottom: 5, color: '#333', },
  heading: { fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
  planInform: { marginTop: 10, flexDirection: 'row',  padding: 10, borderWidth: 1, borderColor: 'grey', marginBottom: 20},
  planInfo: {fontSize: 18, color: 'black', fontWeight: 'bold', },
  pricingInfo: {fontSize: 14, color: 'green', position: 'absolute', right: 20, textDecorationLine: 'underline' },
  historyItem: { padding: 10, backgroundColor: '#fff', marginBottom: 10, borderRadius: 8 },
  serviceBox: { padding: 15, backgroundColor: '#f0f0f0', marginBottom: 10, borderRadius: 8 },
  serviceBoxTitle: { fontSize: 18, fontWeight: 'bold', marginTop: 20, marginBottom: 10 },
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
});

export default BillingsAndPayment;