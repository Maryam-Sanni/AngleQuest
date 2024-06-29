import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image, Picker, Modal } from 'react-native';
import OpenModal from './NDASetup';

function MyComponent({ onClose }) {
  const [mainModalVisible, setMainModalVisible] = useState(true);
  const [ModalVisible, setModalVisible] = useState(false);

  const handleOpenPress = () => {
    setMainModalVisible(false);
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    onClose();
  };

  return (
    <>
      <Modal
        animationType="slide"
        transparent={true}
        visible={mainModalVisible}
        onRequestClose={onClose}
      >
        <View style={{ flex: 1, backgroundColor: "rgba(0, 0, 0, 0.5)", marginTop: 40, alignItems: 'center' }}>
          <View style={styles.greenBox}>
          <ScrollView contentContainerStyle={{ flexGrow: 1, maxHeight: 500 }}>
            <View style={styles.header}>
              <Image
                source={{ uri: 'https://cdn.builder.io/api/v1/image/assets/TEMP/1f2d38e99b0016f2bd167d2cfd38ff0d43c9f94a93c84b4e04a02d32658fb401?apiKey=7b9918e68d9b487793009b3aea5b1a32&' }}
                style={styles.logo}
              />
              <Text style={styles.headerText}>Welcome to AngleQuest</Text>
              <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                <Text style={{ fontSize: 18, color: '#3F5637', fontWeight: 'bold' }}>
                  ✕
                </Text>
              </TouchableOpacity>
            </View>

            <Text style={{ color: '#206C00', fontSize: 18, fontWeight: 'bold', marginLeft: 50, marginTop: 3 }}>
                                          Experts will work with your employees on their journey and provide:
                                        </Text>

                                        <View style={{ flexDirection: 'row' }}>
                                        <View style={styles.boxpay}>
        <Text style={{ fontSize: 20, fontWeight: 'bold', marginTop: 10, marginLeft: 10  }}>1. Growth Plan</Text>
            <View style={{ flexDirection: 'row', marginTop: 20 }}>
              <Image
                source={{ uri: 'https://cdn.builder.io/api/v1/image/assets/TEMP/ccb4e9d11761a733c7f0b31358f0adde0677991513c5c76300ef8731486bdcd9?apiKey=7b9918e68d9b487793009b3aea5b1a32' }}
                style={{ width: 24, height: 24, marginRight: 10 }}
                resizeMode="contain"
              />
              <Text style={{ fontSize: 16 }}>Create the next stage plan with you</Text>
            </View>
            <View style={{ flexDirection: 'row', marginTop: 10 }}>
              <Image
                source={{ uri: 'https://cdn.builder.io/api/v1/image/assets/TEMP/ccb4e9d11761a733c7f0b31358f0adde0677991513c5c76300ef8731486bdcd9?apiKey=7b9918e68d9b487793009b3aea5b1a32' }}
                style={{ width: 24, height: 24, marginRight: 5 }}
                resizeMode="contain"
              />
              <Text style={{ fontSize: 16 }}>Periodically reviews your progress</Text>
            </View>
            <View style={{ flexDirection: 'row', marginTop: 10 }}>
              <Image
                source={{ uri: 'https://cdn.builder.io/api/v1/image/assets/TEMP/ccb4e9d11761a733c7f0b31358f0adde0677991513c5c76300ef8731486bdcd9?apiKey=7b9918e68d9b487793009b3aea5b1a32' }}
                style={{ width: 24, height: 24, marginRight: 5 }}
                resizeMode="contain"
              />
              <Text style={{ fontSize: 16 }}>Continuously rates your progress</Text>
            </View>
    </View>

    <View style={styles.boxpay}>
        <Text style={{ fontSize: 20, fontWeight: 'bold', marginTop: 10, marginLeft: 10  }}>2. Hubs</Text>
            <View style={{ flexDirection: 'row', marginTop: 20 }}>
              <Image
                source={{ uri: 'https://cdn.builder.io/api/v1/image/assets/TEMP/ccb4e9d11761a733c7f0b31358f0adde0677991513c5c76300ef8731486bdcd9?apiKey=7b9918e68d9b487793009b3aea5b1a32' }}
                style={{ width: 24, height: 24, marginRight: 10 }}
                resizeMode="contain"
              />
              <Text style={{ fontSize: 16 }}>Monthly hands-on training</Text>
            </View>
            <View style={{ flexDirection: 'row', marginTop: 10 }}>
              <Image
                source={{ uri: 'https://cdn.builder.io/api/v1/image/assets/TEMP/ccb4e9d11761a733c7f0b31358f0adde0677991513c5c76300ef8731486bdcd9?apiKey=7b9918e68d9b487793009b3aea5b1a32' }}
                style={{ width: 24, height: 24, marginRight: 5 }}
                resizeMode="contain"
              />
              <Text style={{ fontSize: 16 }}>Shares knowledge gained with you</Text>
            </View>
            <View style={{ flexDirection: 'row', marginTop: 10 }}>
              <Image
                source={{ uri: 'https://cdn.builder.io/api/v1/image/assets/TEMP/ccb4e9d11761a733c7f0b31358f0adde0677991513c5c76300ef8731486bdcd9?apiKey=7b9918e68d9b487793009b3aea5b1a32' }}
                style={{ width: 24, height: 24, marginRight: 5 }}
                resizeMode="contain"
              />
              <Text style={{ fontSize: 16 }}>Shares tips to apply at works</Text>
            </View>
            </View> 
</View>
            

<View style={{ flexDirection: 'row' }}>
<View style={styles.boxpay}>
        <Text style={{ fontSize: 20, fontWeight: 'bold', marginTop: 10, marginLeft: 10  }}>3. Advice</Text>
            <View style={{ flexDirection: 'row', marginTop: 20 }}>
              <Image
                source={{ uri: 'https://cdn.builder.io/api/v1/image/assets/TEMP/ccb4e9d11761a733c7f0b31358f0adde0677991513c5c76300ef8731486bdcd9?apiKey=7b9918e68d9b487793009b3aea5b1a32' }}
                style={{ width: 24, height: 24, marginRight: 10 }}
                resizeMode="contain"
              />
              <Text style={{ fontSize: 16 }}>One-on-One Career advice</Text>
            </View>
            <View style={{ flexDirection: 'row', marginTop: 10 }}>
              <Image
                source={{ uri: 'https://cdn.builder.io/api/v1/image/assets/TEMP/ccb4e9d11761a733c7f0b31358f0adde0677991513c5c76300ef8731486bdcd9?apiKey=7b9918e68d9b487793009b3aea5b1a32' }}
                style={{ width: 24, height: 24, marginRight: 5 }}
                resizeMode="contain"
              />
              <Text style={{ fontSize: 16 }}>One-on-One Growth advice</Text>
            </View>
            </View> 
            <View style={styles.boxpay}>
        <Text style={{ fontSize: 20, fontWeight: 'bold', marginTop: 10, marginLeft: 10  }}>4. Mentorship & Guidance</Text>
            <View style={{ flexDirection: 'row', marginTop: 20 }}>
              <Image
                source={{ uri: 'https://cdn.builder.io/api/v1/image/assets/TEMP/ccb4e9d11761a733c7f0b31358f0adde0677991513c5c76300ef8731486bdcd9?apiKey=7b9918e68d9b487793009b3aea5b1a32' }}
                style={{ width: 24, height: 24, marginRight: 10 }}
                resizeMode="contain"
              />
              <Text style={{ fontSize: 16 }}>Becomes your buddy</Text>
            </View>
            <View style={{ flexDirection: 'row', marginTop: 10 }}>
              <Image
                source={{ uri: 'https://cdn.builder.io/api/v1/image/assets/TEMP/ccb4e9d11761a733c7f0b31358f0adde0677991513c5c76300ef8731486bdcd9?apiKey=7b9918e68d9b487793009b3aea5b1a32' }}
                style={{ width: 24, height: 24, marginRight: 5 }}
                resizeMode="contain"
              />
              <Text style={{ fontSize: 16 }}>Available to answer questions</Text>
            </View>
           </View>
            </View> 



                <TouchableOpacity onPress={handleOpenPress} style={styles.buttonplus}>
                  <Text style={styles.buttonTextplus}>Proceed</Text>
                </TouchableOpacity>
                </ScrollView>
              </View>
        </View>
      </Modal>

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
    </>
  );
}

const styles = StyleSheet.create({
  modalContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
  },
  container: {
    flexDirection: 'column',
    borderWidth: 1,
    borderColor: '#CCC',
    marginRight: 70,
    marginTop: 20,
    marginLeft: 50,
  },
  greenBox: {
    width: 1000,
    height: "100%",
    backgroundColor: '#F8F8F8',
  },
  picker: {
    height: 40,
    width: 450,
    backgroundColor: 'white',
    borderColor: '#206C00',
    borderWidth: 1,
    color: 'black',
    fontSize: 14,
    marginLeft: 50,
    borderRadius: 5,
  },
  buttonplus: {
    backgroundColor: 'coral',
    padding: 10,
    marginTop: 15,
    marginLeft: 50,
    width: 150,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonTextplus: {
    color: 'white',
    fontSize: 14,
    textAlign: 'center',
  },
  input: {
    height: 45,
    width: 450,
    backgroundColor: 'white',
    borderColor: '#206C00',
    borderWidth: 1,
    color: 'black',
    fontSize: 14,
    marginLeft: 50,
    borderRadius: 5,
    padding: 10,
  },
  closeButton: {
    position: 'absolute',
    top: 20,
    right: 20,
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
    fontSize: 18,
    fontWeight: 'bold',
    color: '#3F5637',
  },
  image: {
    width: 400,
    height: 400,
    marginRight: 30,
  },
  boxpay: {
    backgroundColor: '#f7fff4',
    padding: 20,
    borderRadius: 10,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    width: 350,
    height: 250,
    marginLeft: 50,
    marginTop: 20,
    borderWidth: 2, borderColor: 'rgba(225,225,212,0.3)',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});

export default MyComponent;
