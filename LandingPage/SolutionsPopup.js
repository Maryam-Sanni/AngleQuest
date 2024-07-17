import React from 'react';
import { Modal, TouchableWithoutFeedback, View, Text, StyleSheet } from 'react-native';

const ProductsPopup = ({ visible, onClose }) => {
  const [isHovered, setIsHovered] = React.useState(false);
  const [isNHHovered, setIsNHHovered] = React.useState(false);
  const [isboostHovered, setIsboostHovered] = React.useState(false);
  const [israpidHovered, setIsrapidHovered] = React.useState(false);
  const [isgrowthHovered, setIsgrowthHovered] = React.useState(false);
  const [isjuniorHovered, setIsjuniorHovered] = React.useState(false);
  const [isseniorHovered, setIsseniorHovered] = React.useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    onClose();
  };

  const handleNHMouseEnter = () => {
    setIsNHHovered(true);
  };

  const handleNHMouseLeave = () => {
    setIsNHHovered(false);
  };

  const handleboostMouseEnter = () => {
    setIsboostHovered(true);
  };

  const handleboostMouseLeave = () => {
    setIsboostHovered(false);
  };

  const handlerapidMouseEnter = () => {
    setIsrapidHovered(true);
  };

  const handlerapidMouseLeave = () => {
    setIsrapidHovered(false);
  };

  const handlegrowthMouseEnter = () => {
    setIsgrowthHovered(true);
  };

  const handlegrowthMouseLeave = () => {
    setIsgrowthHovered(false);
  };

  const handlejuniorMouseEnter = () => {
    setIsjuniorHovered(true);
  };

  const handlejuniorMouseLeave = () => {
    setIsjuniorHovered(false);
  };

  const handleseniorMouseEnter = () => {
    setIsseniorHovered(true);
  };

  const handleseniorMouseLeave = () => {
    setIsseniorHovered(false);
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
       style={[isNHHovered && styles.hovered]}
        onMouseEnter={handleNHMouseEnter}
               onMouseLeave={handleNHMouseLeave}
               >
            <Text style={styles.productTitle}>New Hire Support</Text>
            <Text style={styles.productDescription}>
            Simplify onboarding with tailored resources and training to help new employees integrate quickly.
            </Text>
          </View>
          </View>
          <View style={{ flexDirection: 'column', marginLeft: 50 }}>
          <View
       style={[isboostHovered && styles.hovered]}
        onMouseEnter={handleboostMouseEnter}
               onMouseLeave={handleboostMouseLeave}
               >
            <Text style={styles.productTitle}>Boost Under-Performer</Text>
            <Text style={styles.productDescription}>
              Targeted training and expert support to improve employee performance.
            </Text>
          </View>
        </View>
        </View>
        <View style={{ flexDirection: 'row', marginTop: 50 }}>
          <View style={{ flexDirection: 'column' }}>
          <View
       style={[israpidHovered && styles.hovered]}
        onMouseEnter={handlerapidMouseEnter}
               onMouseLeave={handlerapidMouseLeave}
               >
            <Text style={styles.productTitle}>Rapid Upskilling</Text>
            <Text style={styles.productDescription}>
             Intensive mentorship programs to quickly enhance employee skills and productivity.
            </Text>
          </View>
          </View>
          <View style={{ flexDirection: 'column', marginLeft: 50 }}>
          <View
       style={[isgrowthHovered && styles.hovered]}
        onMouseEnter={handlegrowthMouseEnter}
               onMouseLeave={handlegrowthMouseLeave}
               >
            <Text style={styles.productTitle}>Growth Culture</Text>
            <Text style={styles.productDescription}>
              An environment fostered to focus on continuous learning and development for all employees.
            </Text>
          </View>
        </View>
        </View>
        <View style={{ flexDirection: 'row', marginTop: 50 }}>
          <View style={{ flexDirection: 'column' }}>
          <View
       style={[isjuniorHovered && styles.hovered]}
        onMouseEnter={handlejuniorMouseEnter}
               onMouseLeave={handlejuniorMouseLeave}
               >
            <Text style={styles.productTitle}>Junior to Senior Boost</Text>
            <Text style={styles.productDescription}>
             Specialized training and mentorship to elevate Junior employees to senior roles.
            </Text>
          </View>
          </View>
          <View style={{ flexDirection: 'column', marginLeft: 50 }}>
          <View
       style={[isseniorHovered && styles.hovered]}
        onMouseEnter={handleseniorMouseEnter}
               onMouseLeave={handleseniorMouseLeave}
               >
            <Text style={styles.productTitle}>Senior to Architect Boost</Text>
            <Text style={styles.productDescription}>
            Accelerated career progression with structured mentorship and advanced training for senior employees.
            </Text>
          </View>
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
    left: 350,
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
    padding: 10
  },
  hovered: {
    backgroundColor: '#F2FFF2',
    borderRadius: 10
      },
});

export default ProductsPopup;
