import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, Image, TouchableOpacity, Modal } from 'react-native';
import Topbar from '../components/expertstopbar';
import Sidebar from '../components/expertssidebar';
import Transactions from '../components/Transactions';
import OpenModal from '../Experts/OpenWithdraw';
import { useNavigation } from '@react-navigation/native';

 
function MyComponent() {
    const navigation = useNavigation();
    const [isBidHovered, setIsBidHovered] = useState(false);
    const [isOfferHovered, setIsOfferHovered] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);

    const handleOpenPress = () => {
      setModalVisible(true);
    };
  
    const handleCloseModal = () => {
      setModalVisible(false);
    };

    const goToOffers= () => {
        navigation.navigate('Earnings');
      };

      const goToBids = () => {
        navigation.navigate('Withdrawal');
      };

  return (
    <View style={{ flex: 1 }}>
      <Topbar />
      <View style={{ flexDirection: 'row', flex: 1 }}>
        <Sidebar />
        <ScrollView contentContainerStyle={{ flexGrow: 1, maxHeight: 500 }}>
        <View style={{ marginLeft: 270, backgroundColor: 'white'}}>
          <View style={styles.header}>
            <TouchableOpacity onPress={goToOffers} 
            underlayColor={isOfferHovered ? 'transparent' : 'transparent'}
            onMouseEnter={() => setIsOfferHovered(true)}
            onMouseLeave={() => setIsOfferHovered(false)}> 
              <View style={styles.item}>
                <Image source={require('../assets/earnings.png')} style={styles.image} />
                <Text style={[styles.headertext, isOfferHovered && { color: 'coral' }]}>Earnings</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={goToBids}
            underlayColor={isBidHovered ? 'transparent' : 'transparent'}
            onMouseEnter={() => setIsBidHovered(true)}
            onMouseLeave={() => setIsBidHovered(false)} >
              <View style={styles.item}>
                <Image source={require('../assets/withdrawal.png')} style={styles.image} />
                <Text style={[styles.headertext, isBidHovered && { color: 'coral' }]}>Withdrawal</Text>
              </View>
            </TouchableOpacity>
            
          </View>
          <TouchableOpacity onPress={handleOpenPress} >
    <View style={{ justifyContent: "flex-start", paddingHorizontal: 10, paddingVertical: 10, borderRadius: 5, borderColor: "coral", backgroundColor: "coral", width: 150, alignItems: 'center', marginTop: 20, marginLeft: 50, borderWidth: 1 }}>
                    <Text style={{ fontSize: 13, color: "white", alignText: 'center', fontWeight: '600' }}>Request Withdrawal</Text>
                  </View>
     </TouchableOpacity>

          
        <Text style={{fontSize: 14, fontWeight: '500', marginTop: 10, position: 'absolute', right: 60, color: 'coral' }}>Total Balance: $1180</Text>
 
        <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={handleCloseModal}
      >
          <View style={styles.modalContent}>
            <OpenModal onClose={() => handleCloseModal()} />
          </View>
      </Modal>
 <Transactions />

<View style={{ marginTop: 20, marginHorizontal: 5, marginLeft: 50 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Image
              source={{ uri: 'https://cdn.builder.io/api/v1/image/assets/TEMP/bd6743481c726e33bcb35466888d1e3911e6448a2e87aa46de6fd902c814c762?' }}
              style={{ width: 80, height: 20, marginRight: 50, marginTop: -40 }}
            />
            <View style={{ flex: 1 }}>
              <Text style={{ fontSize: 15, fontWeight: '600', marginBottom: 10 }}>Paypal</Text>
               <Text style={{ fontSize: 13, marginBottom: 5 }}>$2.00 USD per withdrawal</Text>
               <Text style={{ fontSize: 13, marginBottom: 5 }}>Paypal may charge additional fee per transaction (sending and withdrawing)</Text>
            </View>
            <TouchableOpacity style={{ position: 'absolute', right: 80, paddingHorizontal: 15, paddingVertical: 8,  borderRadius: 5, borderWidth: 1, borderColor: "coral", marginRight: -10 }}>
              <Text style={{ color: 'coral', fontSize: 14 }}>Set up</Text>
            </TouchableOpacity>
          </View>
        </View>
             <View style={{ marginTop: 20, marginLeft: 50, }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
            <Image
             source={require('../assets/payoneerlogo.png')}
              style={{ width: 110, height: 21, marginRight: 25, marginTop: -40 }}
            />
            <View style={{ flex: 1 }}>
              <Text style={{ fontSize: 15, fontWeight: '600' }}>Payoneer</Text>
              <Text style={{ fontSize: 13, marginBottom: 5 }}>$2.00 USD per withdrawal</Text>
              <Text style={{ fontSize: 13, marginBottom: 5 }}>Payoneer charges additional fees to withdraw funds. Create a Payoneer account <TouchableOpacity style={{ color: '#32CD32' }}>here</TouchableOpacity></Text>
            </View>
            <TouchableOpacity style={{ position: 'absolute', right: 80, paddingHorizontal: 15, paddingVertical: 8,  borderRadius: 5, borderWidth: 1, borderColor: "coral", marginRight: -5 }}>
              <Text style={{ color: 'coral', fontSize: 14  }}>Set up</Text>
            </TouchableOpacity>
          </View>
        </View>   
               <View style={{ marginTop: 8, marginHorizontal: 5, marginLeft: 50, marginBottom: 50}}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Image
              source={{ uri: 'https://cdn.builder.io/api/v1/image/assets/TEMP/f8fcfecb3d17bd589f01cbad97bd1c71693401d4530ffd86ee9536cd1effb618?' }}
              style={{ width: 35, height: 35, marginRight: 95, marginTop: -20 }}
            />
            <View style={{ flex: 1 }}>
              <Text style={{ fontSize: 15, fontWeight: '600', marginBottom: 5 }}>Wire Transfer</Text>
               <Text style={{ fontSize: 13, marginBottom: 5 }}>$25.00 USD per wire to any bank</Text>
             <Text style={{ fontSize: 13, marginBottom: 5 }}>Up to 7 business days to receive funds</Text>
            </View>
            <TouchableOpacity style={{  position: 'absolute', right: 80, paddingHorizontal: 15, paddingVertical: 8,  borderRadius: 5, borderWidth: 1, borderColor: "coral", marginRight: -10 }}>
              <Text style={{ color: 'coral', fontSize: 14  }}>Set up</Text>
            </TouchableOpacity>
          </View>
        </View>       
             
</View>
          
          
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
    modalContent: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        borderRadius: 10
      },
  header: {
    marginLeft: -60,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    backgroundColor: 'white',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  item: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  headertext: {
    marginLeft: 5,
    fontSize: 14,
    fontWeight: '500',
    color: '#666'
  },
  image: {
    width: 24,
    height: 24,
    marginRight: 5,
    marginLeft: 100
  },
});

export default MyComponent;
