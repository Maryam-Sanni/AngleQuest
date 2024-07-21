import React from 'react';
import { Modal, TouchableWithoutFeedback, View, Text, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

const ProductsPopup = ({ visible, onClose }) => {
  const [isHovered, setIsHovered] = React.useState(false);
  const [isaboutHovered, setIsaboutHovered] = React.useState(false);
  const [isrvHovered, setIsrvHovered] = React.useState(false);
  const [iscontactHovered, setIscontactHovered] = React.useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    onClose();
  };

  const handleaboutMouseEnter = () => {
    setIsaboutHovered(true);
  };

  const handleaboutMouseLeave = () => {
    setIsaboutHovered(false);
  };

  const handlervMouseEnter = () => {
    setIsrvHovered(true);
  };

  const handlervMouseLeave = () => {
    setIsrvHovered(false);
  };

  const handlecontactMouseEnter = () => {
    setIscontactHovered(true);
  };

  const handlecontactMouseLeave = () => {
    setIscontactHovered(false);
  };

  return (
    <Modal visible={visible} animationType="fade" transparent={true} onRequestClose={onClose}>
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={[styles.modalOverlay, { opacity: visible ? 1 : 0 }]}>
          {/* This view covers the entire screen with semi-transparent background */}
        </View>
      </TouchableWithoutFeedback>
      <View
        style={styles.productsPopupContent}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <View style={{ flexDirection: 'row' }}>
          <TouchableOpacity style={{ flexDirection: 'column', width: 250 }}>
          <View
       style={[isaboutHovered && styles.hovered]}
        onMouseEnter={handleaboutMouseEnter}
               onMouseLeave={handleaboutMouseLeave}
               >
            <Text style={styles.productTitle}>About AngleQuest</Text>
            <Text style={styles.productDescription}>
             AngleQuest is a ...
            </Text>
          </View>
          </TouchableOpacity>
          <TouchableOpacity style={{ flexDirection: 'column', marginLeft: 30, width: 200}}>
          <View
       style={[isrvHovered && styles.hovered]}
        onMouseEnter={handlervMouseEnter}
               onMouseLeave={handlervMouseLeave}
               >
            <Text style={styles.productTitle}>Reviews</Text>
            <Text style={styles.productDescription}>
            Customer Reviews
            </Text>
          </View>
        </TouchableOpacity>
        </View>
        <TouchableOpacity style={{ flexDirection: 'column', marginTop: 30, width: 250 }}>
        <View
       style={[iscontactHovered && styles.hovered]}
        onMouseEnter={handlecontactMouseEnter}
               onMouseLeave={handlecontactMouseLeave}
               >
        <Text style={styles.productTitle}>Contact us</Text>
        <Text style={styles.productDescription}>
          For questions, feedbacks and support send us a mail at <Text style={{textDecorationLine: 'underline'}}> ask@anglequest.com </Text>
        </Text> 
      </View>
      </TouchableOpacity>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    alignItems: 'center'
   },
   productsPopupContent: {
     alignSelf: 'center',
     top: 80,
     marginLeft: 200,
     backgroundColor: '#FFF',
     borderRadius: 10,
     padding: 30,
     zIndex: 100,
     shadowColor: '#000',
         shadowOffset: {
           width: 0,
           height: 0,
         },
         shadowOpacity: 0.25,
         shadowRadius: 3.84,
         elevation: 0,
   },
  productTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'green',
    padding: 10
  },
  productDescription: {
    color: 'grey',
    fontWeight: '600',
    width: 250,
    padding: 10,
    marginTop: -10
  },
  hovered: {
    backgroundColor: '#E8FDE0',
    borderRadius: 10
  },
});

export default ProductsPopup;
