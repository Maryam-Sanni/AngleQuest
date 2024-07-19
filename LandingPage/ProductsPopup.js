import React from 'react';
import { Modal, TouchableWithoutFeedback, View, Text, StyleSheet } from 'react-native';

const ProductsPopup = ({ visible, onClose }) => {
  const [isHovered, setIsHovered] = React.useState(false);
  const [isAIHovered, setIsAIHovered] = React.useState(false);
  const [isCDPHovered, setIsCDPHovered] = React.useState(false);
  const [isTIHovered, setIsTIHovered] = React.useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    onClose();
  };

  const handleAIMouseEnter = () => {
    setIsAIHovered(true);
  };

  const handleAIMouseLeave = () => {
    setIsAIHovered(false);
  };

  const handleCDPMouseEnter = () => {
    setIsCDPHovered(true);
  };

  const handleCDPMouseLeave = () => {
    setIsCDPHovered(false);
  };

  const handleTIMouseEnter = () => {
    setIsTIHovered(true);
  };

  const handleTIMouseLeave = () => {
    setIsTIHovered(false);
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
       
          <View style={{ flexDirection: 'column' }}>
          <View
       style={[isAIHovered && styles.hovered]}
        onMouseEnter={handleAIMouseEnter}
               onMouseLeave={handleAIMouseLeave}
               >
            <Text style={styles.productTitle}>AngleQuest AI</Text>
            <Text style={styles.productDescription}>
              Proficiency analysis and performance analytics to identify your knowledge gaps and proffer solutions.
            </Text>
          </View>
          </View>
         
          <View style={{ flexDirection: 'column', marginLeft: 50 }}>
          <View
       style={[isCDPHovered && styles.hovered]}
        onMouseEnter={handleCDPMouseEnter}
               onMouseLeave={handleCDPMouseLeave}
               >
            <Text style={styles.productTitle}>AngleQuest CDP</Text>
            <Text style={styles.productDescription}>
              Career Development Platform optimized with resources for employees to explore career paths, set goals, and track professional development.
            </Text>
          </View>
        </View>
        </View>
        <View style={{width: 370, marginTop: 30}}>
        <View
       style={[isTIHovered && styles.hovered]}
        onMouseEnter={handleTIMouseEnter}
               onMouseLeave={handleTIMouseLeave}
               >
        <Text style={styles.productTitle}>AngleQuest Team Impact</Text>
        <Text style={styles.productDescription}>
          Measuring and analyzing the domain knowledge and billable work of your team members, followed with the required personalized training, suggestions, assistance, tracking, reviews, and advice.
        </Text>
        </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  productsPopupContent: {
    position: 'absolute',
    width: '60%',
    left: 210,
    top: 70,
    backgroundColor: '#FFF',
    borderRadius: 5,
    padding: 30,
    zIndex: 100, // Ensure popup is above other content
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
    width: 350,
    padding: 10,
    marginTop: -10
  },
  hovered: {
    backgroundColor: '#E8FDE0',
    borderRadius: 10
  },
});

export default ProductsPopup;
