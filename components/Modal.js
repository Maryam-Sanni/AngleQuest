import React from "react";
import {
  Modal,
  TouchableWithoutFeedback,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Pressable, Image
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import Row from "./Row";
import Title from "./Title";

const ProductsMenu = ({ visible, onClose }) => {
  const [isHovered, setIsHovered] = React.useState(false);
  const [isAIHovered, setIsAIHovered] = React.useState(false);
  const [isCDPHovered, setIsCDPHovered] = React.useState(false);
  const [isTIHovered, setIsTIHovered] = React.useState(false);
  const [activeIndex, setActiveIndex] = React.useState(1);
  const [activeItem, setActiveItem] = React.useState(1);

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
  const NavButtons = ({ text, onPress, active }) => {
    return (
      <TouchableOpacity
        style={{
          width: 250,
          height: 44,
          justifyContent: "space-between",
          paddingVertical: 10,
          paddingHorizontal: 20,
          backgroundColor: active ? "#13583740" : "#fff",
          flexDirection: "row",
          borderRadius: 8,
        }}
        onPress={onPress}
      >
        <Text style={{ fontFamily: "Poppins-Regular", fontSize: 16 }}>
          {text}
        </Text>
        <Image
          source={{ uri: 'https://img.icons8.com/?size=100&id=60671&format=png&color=000000' }}
          style={{ width: 20, height: 20 }}
        />
      </TouchableOpacity>
    );
  };

  const SelectedItem = ({ active, onPress, title, desc }) => {
    return (
      <Pressable
        style={{
          gap: 10,
          width: 280,
          backgroundColor: active ? "#13583740" : "#fffff",
          padding: 16,
          borderRadius: 12,
        }}
        onPress={onPress}
      >
        <Title
          textSize={16}
          textWeight={"700"}
          title={title}
        />
        <Title
          textSize={16}
          textWeight={"400"}
          title={desc}
          style={{ maxWidth: 261 }}
        />
      </Pressable>
    );
  };
  return (
    <Modal
      visible={visible}
      animationType="fade"
      transparent={true}
      onRequestClose={onClose}
    >
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
        <Row
          style={{
            width: 1400,
            // marginHorizontal: 50,
            //   marginTop: 50,
            height: 400,
            //  flex: 1,
          }}
        >
          <View
            style={{
              gap: 10,
              margin: 50,
              // shadowColor: "#135837",
              // shadowOffset: {
              //   width: 0,
              //   height: 5,
              // },
              // shadowOpacity: 0.34,
              // shadowRadius: 6.27,
              // elevation: 10,
            }}
          >
            
            <NavButtons
              text={"Individual"}
              onPress={() => setActiveIndex(1)}
              active={activeIndex === 1 ? true : false}
            />
            <NavButtons
              text={"Business"}
              onPress={() => setActiveIndex(2)}
              active={activeIndex === 2 ? true : false}
            />
            <NavButtons
              text={"Community"}
              onPress={() => setActiveIndex(3)}
              active={activeIndex === 3 ? true : false}
            />
          </View>
          {activeIndex === 1 ? (
            <View style={{ margin: 50 }}>
              <Text style={{fontWeight: "500", marginTop: 10, fontSize: 18}}>AngleQuest Team Impact</Text>
               <Text style={{fontWeight: "500", marginTop: 10, fontSize: 18}}>Boost Under-performance</Text>
               <Text style={{fontWeight: "500", marginTop: 10, fontSize: 18}}>Rapid Upskilling</Text>
               <Text style={{fontWeight: "500", marginTop: 10, fontSize: 18}}>New Skill Acquisition</Text>
               <Text style={{fontWeight: "500", marginTop: 10, fontSize: 18}}>Junior to Senior Boost</Text>
               <Text style={{fontWeight: "500", marginTop: 10, fontSize: 18}}>Senior to Architect Boost</Text>
              
            </View>
          ) : activeIndex === 2 ? (
          <View style={{ margin: 50 }}>
            <Text style={{fontWeight: "500", marginTop: 10, fontSize: 18}}>New Hire Support</Text>
             <Text style={{fontWeight: "500", marginTop: 10, fontSize: 18}}>Boost Under-performance</Text>
             <Text style={{fontWeight: "500", marginTop: 10, fontSize: 18}}>Rapid Upskilling</Text>
             <Text style={{fontWeight: "500", marginTop: 10, fontSize: 18}}>New Skill Acquisition</Text>
             <Text style={{fontWeight: "500", marginTop: 10, fontSize: 18}}>Junior to Senior Boost</Text>
             <Text style={{fontWeight: "500", marginTop: 10, fontSize: 18}}>Senior to Architect Boost</Text>

          </View>

          ) : activeIndex === 3 ? (
            <View style={{ margin: 50 }}>
              <Text style={{fontWeight: "500", marginTop: 10, fontSize: 18}}>New Hire Support</Text>
               <Text style={{fontWeight: "500", marginTop: 10, fontSize: 18}}>Boost Under-performance</Text>
               <Text style={{fontWeight: "500", marginTop: 10, fontSize: 18}}>Rapid Upskilling</Text>
               <Text style={{fontWeight: "500", marginTop: 10, fontSize: 18}}>New Skill Acquisition</Text>
               <Text style={{fontWeight: "500", marginTop: 10, fontSize: 18}}>Junior to Senior Boost</Text>
               <Text style={{fontWeight: "500", marginTop: 10, fontSize: 18}}>Senior to Architect Boost</Text>

            </View>
          
          ) : null}
        </Row>
        {/* 
        <View style={{ flexDirection: 'row' }}>

          <TouchableOpacity style={{ flexDirection: 'column' }}>
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
          </TouchableOpacity>

          <TouchableOpacity style={{ flexDirection: 'column', marginLeft: 50 }}>
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
        </TouchableOpacity>
        </View>
        <TouchableOpacity style={{width: 370, marginTop: 30}}>
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
        </TouchableOpacity>
       */}
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    alignItems: "center",
  },
  productsPopupContent: {
    alignSelf: "center",
    top: 120,
    //  marginLeft: -345,
    backgroundColor: "#FFF",
    borderRadius: 10,
    // padding: 30,
    zIndex: 100,
    shadowColor: "#000",
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
    fontWeight: "bold",
    color: "green",
    padding: 10,
  },
  productDescription: {
    color: "grey",
    fontWeight: "600",
    width: 350,
    padding: 10,
    marginTop: -10,
  },
  hovered: {
    backgroundColor: "#E8FDE0",
    borderRadius: 10,
  },
});

export default ProductsMenu;
