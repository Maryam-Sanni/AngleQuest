import React, { useState } from 'react';
import { View, Text, Image, ScrollView, Animated, TouchableOpacity, StyleSheet, Modal } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import OpenSchedule from '../Jobseekers/ExpertHub';
import OpenSchedule2 from '../components/JProfile';


function MyComponent({ onClose }) {
  const [scaleAnimations] = useState([...Array(12)].map(() => new Animated.Value(1)));
  const navigation = useNavigation(); 
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisible2, setModalVisible2] = useState(false);

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

  // Sample data for the cards
  const cardData = [
    {
      description: "Here is a description of what your coach does, kindly read the description carefully.",
      expert: "Emily Ray",
      job: "Data Analyst",
       country: "Switzerland",
      interviewfee: "$50",
    },
    {
      description: "Here is a description of what your coach does, kindly read the description carefully.",
      expert: "Monica Jerry",
      job: "UI/UX Designer",
       country: "Canada",
      interviewfee: "$30",
    },
     {
      description: "Here is a description of what your coach does, kindly read the description carefully.",
      expert: "Fisayo Fosudo",
      job: "Java Engineer",
      country: "Nigeria",
      interviewfee: "$25",
    },
    {
      description: "Here is a description of what your coach does, kindly read the description carefully.",
    expert: "John Smith",
    job: "Dev Ops",
     country: "Canada",
    interviewfee: "$50",
  },
   {
    description: "Here is a description of what your coach does, kindly read the description carefully.",
    expert: "Vee Venice",
    job: "SAP FI",
     country: "India",
    interviewfee: "$20",
  },
    {
      description: "Here is a description of what your coach does, kindly read the description carefully.",
      expert: "Will Cooper",
      job: "Backend Dev.",
       country: "United Kingdom",
      interviewfee: "$30",
    },
    {
      description: "Here is a description of what your coach does, kindly read the description carefully.",
    expert: "John Smith",
    job: "Frontend Dev.",
     country: "Netherlands",
    interviewfee: "$50",
  },
   {
    description: "Here is a description of what your coach does, kindly read the description carefully.",
    expert: "Vee Venice",
    job: "SAP FI",
    country: "United Kingdom",
    interviewfee: "$50",
  },
  ];

  const handleCardAnimation = (index, toValue) => {
    Animated.timing(
      scaleAnimations[index],
      {
        toValue,
        duration: 200,
        useNativeDriver: true,
      }
    ).start();
  };


  
  const renderCards = () => {
    return cardData.map((data, index) => (
      <Animated.View
        key={index}
        style={{
          width: '25%',
          paddingHorizontal: 5,
          marginBottom: 20,
          transform: [{ scale: scaleAnimations[index] }],
        }}
        onMouseEnter={() => handleCardAnimation(index, 1.05)}
        onMouseLeave={() => handleCardAnimation(index, 1)}
      >
        {/* Card content */}
        <View
          style={{
            width: '100%',
            height: 300,
            borderRadius: 5,
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
            backgroundColor: "#d3f9d8",
           
          }}
        >
            <TouchableOpacity onPress={handleOpenPress2}> 
          <View style={{ justifyContent: "center", width: '90%', height: 100, borderRadius: 5, backgroundColor: "#F0FFF9", marginRight: 15, marginLeft: 10, marginTop: 20, alignItems: 'center', borderWidth: 1, borderColor: '#206C00' }}>
          <View style={{ flexDirection: 'column', alignItems: 'center' }}>
           <Image
              source={{ uri: 'https://cdn.builder.io/api/v1/image/assets/TEMP/96214782d7fee94659d7d6b5a7efe737b14e6f05a42e18dc902e7cdc60b0a37b' }}
              style={{ width: 50, height: 50, aspectRatio: 1,  marginTop: 10, }}
            />
           
 <Text style={{ fontSize: 14, color: "black", fontWeight: 'bold',  }}>
              {data.expert} 
            </Text>
            <Text style={{ fontSize: 12, color: "#206C00", marginBottom: 10   }}>
              {data.job}
            </Text>
            
            
            
</View>
</View>
</TouchableOpacity>
          <View style={{ flexDirection: "row", alignItems: "center", marginLeft: 18, }}>
            <View style={{ flex: 1 , }}>
            <View style={{ flexDirection: 'row', marginTop: 15, alignItems: 'center', justifyContent: "center"  }}>
           
            <Image
                          source={{ uri: 'https://cdn.builder.io/api/v1/image/assets/TEMP/6bba7edcb3f010b92084265108234b625f6a1e57053bb656b44878ce3a0ec09a?apiKey=7b9918e68d9b487793009b3aea5b1a32&' }}
                          style={{ width: 10, height: 10, aspectRatio: 1, marginTop: 5,  }}
                        />
                        <Text style={{ fontSize: 10, color: '#206C00', marginLeft: 4, marginTop: 2,  }}>{data.country}</Text>
                        </View>
                       
             
              
            </View>
          </View>
          <Text style={{ fontSize: 12, color: "#888", marginTop: 10, marginLeft: 10, }}>{data.description}</Text>
           
            
          <View style={{ flexDirection: 'row', marginTop: 30}}>
                      
          <TouchableOpacity
            style={{
              borderWidth: 1, 
              borderColor: '#206C00', 
              borderRadius: 5,
              backgroundColor: '#F0FFF9',
              paddingHorizontal: 20,
              paddingVertical: 10,
              marginLeft: 10,
              alignSelf: "center",
              justifyContent: 'center',  
            }}
           
          >
            <Text style={{ color: "#206C00",  alignText: 'center', fontSize: 12}}>
            {data.interviewfee}
            </Text>
          </TouchableOpacity>
        
                  
                      <TouchableOpacity style={{ height: 20, width: 20, borderRadius: 15, borderWidth: 1, borderColor: "#4A5568", marginRight: 5, marginLeft: 100, marginTop: 10,   }} />
                    
                
                     
          
          </View>
        </View>
      </Animated.View>
    ));
  };

  return (
    <View style={{  flex: 1, backgroundColor: "#F8F8F8", marginTop: 40, alignItems: 'center' }}>
        <ScrollView contentContainerStyle={{ flexGrow: 1, maxHeight: 500 }}>
        <View style={styles.greenBox}>
        <View style={styles.header}>
          <Image
            source={{ uri: 'https://cdn.builder.io/api/v1/image/assets/TEMP/1f2d38e99b0016f2bd167d2cfd38ff0d43c9f94a93c84b4e04a02d32658fb401?apiKey=7b9918e68d9b487793009b3aea5b1a32&' }} // replace with your logo URL
            style={styles.logo}
          />
          <Text style={styles.headerText}>Experts</Text>
       
        <TouchableOpacity onPress={onClose} style={styles.closeButton}>
          <Text style={{ fontSize: 18, color: '#3F5637', fontWeight: 'bold'}}>
            ✕
          </Text>
        </TouchableOpacity>
        </View> 
          
          <View style={{ flex: 1, alignItems: 'flex-start', marginLeft: 40, marginBottom: 40}}>
          <Text style={{ fontSize: 16, color: "black", alignText: 'flex-start', fontWeight: 'bold', marginTop: 5 }}>Pick your coach</Text>
     <Text style={{ fontSize: 14, color: "black", alignText: 'flex-start', fontWeight: '400' }}>Select an expert that will serve as your coach</Text>
     </View>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginTop: 30, marginLeft: 30, marginRight: 30 }}>
              {renderCards()}
            </View>
            <TouchableOpacity onPress={handleOpenPress} style={styles.buttonplus} >
      <Text style={styles.buttonTextplus}>Continue</Text>
    </TouchableOpacity>
          </View>
          <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={handleCloseModal}
      >
          <View style={styles.modalContent}>
          <OpenSchedule onClose={() => handleCloseModal()} />
          </View>
      </Modal>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible2}
        onRequestClose={handleCloseModal2}
      >
          <View style={styles.modalContent}>
          <OpenSchedule2 onClose={() => handleCloseModal2()} />
          </View>
      </Modal>
        </ScrollView>
       
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
  greenBox: {
    width: 1000,
    height: 700,
    backgroundColor: '#F8F8F8',
    marginTop: 40
  },
  buttonplus: {
    backgroundColor: 'coral',
    padding: 5,
    marginLeft: 820, 
    width: 150,
    paddingHorizontal: 20,
    marginTop: 10,
    marginBottom: 30
  },
  buttonTextplus: {
    color: 'white',
    fontSize: 14,
    textAlign: 'center',
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
    marginBottom: 20
  },
  logo: {
    width: 40,
    height: 40,
    marginRight: 10
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#3F5637'
  }
});

export default MyComponent;