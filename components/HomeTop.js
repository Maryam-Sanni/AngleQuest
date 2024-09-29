import React, { useState, useEffect } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { BlurView } from "expo-blur";
import { useTranslation } from "react-i18next";
import ProductsPopup from "./Modal";
import SolutionsPopup from "../LandingPage/SolutionsPopup";
import MorePopup from "../LandingPage/MorePopup";
import MainButtons from "../LandingPage/MainButton";
import HButton from "./HButton";
import { useNavigate } from 'react-router-dom';

const PickerItem = ({ label, icon, onPress }) => (
  <TouchableOpacity style={styles.pickerItem} onPress={onPress}>
    <Image source={icon} style={styles.pickerItemIcon} />
    <Text style={styles.pickerItemText}>{label}</Text>
  </TouchableOpacity>
);

const MyComponent = ({ value, tint, intensity }) => {
  const navigate = useNavigate();
  const [showLanguagePicker, setShowLanguagePicker] = useState(false);
  const { i18n, t } = useTranslation();
  const [modalVisible, setModalVisible] = useState(false); // For handling the modal visibility
  const [showMenu, setShowMenu] = useState(false); // For handling the modal visibility
  const [showProductsPopup, setShowProductsPopup] = useState(false);
  const [showSolutionsPopup, setShowSolutionsPopup] = useState(false);
  const [showMorePopup, setShowMorePopup] = useState(false);
  const [activeIndex, setActiveIndex] = useState(value);
  const [topPosition, setTopPosition] = useState(45);

  useEffect(() => {
    const handleScroll = () => {
      // Check how far the page has been scrolled
      if (window.scrollY > 50) {
        setTopPosition(0); // Move the top bar to the very top
      } else {
        setTopPosition(45); // Keep the top bar in its initial position
      }
    };

    // Add the scroll event listener
    window.addEventListener("scroll", handleScroll);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  
  const handleProductsHover = () => {
  //  setShowMenu(true);
    setShowProductsPopup(true);
  };

  const handleProductsClose = () => {
    setShowProductsPopup(false);
  };

  const handleSolutionsHover = () => {
    setShowSolutionsPopup(true);
  };

  const handleSolutionsclose = () => {
    setShowSolutionsPopup(false);
  };

  const handleMoreHover = () => {
    setShowMorePopup(true);
  };

  const handleMoreclose = () => {
    setShowMorePopup(false);
  };

  const handleLogin = () => {
     navigate('/sign-in');
  };

  const handleContact = () => {
     navigate('/contact-sales');
  };

  const navigateToSignUp = () => {
    navigate("/sign-up");
  };

  const handlebackPress = () => {
    navigate("/welcome");
  };
  
  const languages = [
    { code: "en", label: "English", icon: require("../assets/english.png") },
    { code: "nl", label: "Dutch", icon: require("../assets/dutch.png") },
    { code: "es", label: "Spanish", icon: require("../assets/spanish.png") },
    { code: "fr", label: "French", icon: require("../assets/french.png") },
    { code: "de", label: "German", icon: require("../assets/german.png") },
    { code: "zh", label: "Mandarin", icon: require("../assets/mandarin.png") },
    { code: "hi", label: "Hindi", icon: require("../assets/hindi.png") },
    { code: "ar", label: "Arabic", icon: require("../assets/arabic.png") },
    { code: "bn", label: "Bengali", icon: require("../assets/bengali.png") },
    {
      code: "pt",
      label: "Portuguese",
      icon: require("../assets/portuguese.png"),
    },
  ];

  const toggleLanguageSwitcher = () => {
    setShowLanguagePicker(!showLanguagePicker);
  };

  const onChangeLang = (lang_code) => {
    i18n.changeLanguage(lang_code);
    setShowLanguagePicker(false);
  };

  const selectedLanguage = languages.find(
    (lang) => lang.code === i18n.language
  );

  return (
     <View style={[styles.container, { top: topPosition }]}>
      <BlurView
        intensity={intensity ? intensity : 100}
        tint={tint}
        style={styles.header}
      >
        <View style={styles.left}>
          <TouchableOpacity  onPress={handlebackPress}>
          <Image
            source={{
              uri: "https://cdn.builder.io/api/v1/image/assets/TEMP/1f2d38e99b0016f2bd167d2cfd38ff0d43c9f94a93c84b4e04a02d32658fb401?apiKey=7b9918e68d9b487793009b3aea5b1a32&",
            }}
            style={styles.logo}
          />
          </TouchableOpacity>
          <HButton //onPress={handleProductsHover}
            title={"Products"}
            textColor={"black"}
            dropdown
            onPress={handleProductsHover}
          />
          <HButton
            title={"AngleQuest AI"}
          />
          <HButton // onPress={handleAIPress}
            title={"About Us"}
          />
        </View>
        <View style={styles.right}>
          <HButton title={"Log In"} onPress={handleLogin} />
          <MainButtons
            title={"Contact Sales"}
            outlined={activeIndex !== 2 ? true : false}
            gradient={activeIndex === 2 ? true : false}
            onPress={handleContact}
            fontSize={16}
            borderRadius={8}
            width={170}
            bgColor={""}
          />
           <TouchableOpacity onPress={navigateToSignUp}>
          <MainButtons
            title={"Get Started"}
            borderRadius={8}
            fontSize={16}
            width={170}
            bgColor={""}
            outlined={activeIndex !== 3 ? true : false}
            gradient={activeIndex === 3 ? true : false}
            onPress={() => {
              handleNav(3); 
              navigateToSignUp(); 
            }}
            icon={<Image
              source={{ uri: 'https://img.icons8.com/?size=100&id=85463&format=png&color=FFFFFF' }}
              style={{ width: 15, height: 15 }}
            />}
          />
           </TouchableOpacity>
        </View>
      </BlurView>
      {/* {showMenu&&<View>
        <Text>fghjhgfghj</Text>
      </View>} */}
      <ProductsPopup
        visible={showProductsPopup}
        onClose={() => setShowProductsPopup(false)}
      />
      <SolutionsPopup
        visible={showSolutionsPopup}
        onClose={() => setShowSolutionsPopup(false)}
      />
      <MorePopup
        visible={showMorePopup}
        onClose={() => setShowMorePopup(false)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
marginTop: -20,
    backgroundColor: "#F6F6F6",
    transition: "top 0.1s ease", 
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    justifyContent: "space-between",
    alignItems: "center",
    height: 75,
  },
  right: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingRight: 50,
  },
  left: {
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
    paddingLeft: 50,
  },
  logo: {
    width: 40,
    height: 40,
    marginRight: 5,
  },
  headerText: {
    fontSize: 22,
    fontWeight: "bold",
    color: "darkgreen",
  },
  languageButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 5,
    borderColor: "white",
    position: "absolute",
    right: 257,
  },
  languageIcon: {
    width: 24,
    height: 24,
    marginRight: 5,
  },
  languageButtonText: {
    color: "black",
    fontSize: 16,
    fontWeight: 500,
  },
  joinButton: {
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "coral",
    padding: 10,
    position: "absolute",
    right: 70,
    borderRadius: 5,
  },
  joinButtonText: {
    color: "coral",
    fontWeight: "bold",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  languageModalContent: {
    position: "absolute",
    width: "20%",
    right: 10,
    top: 10,
    backgroundColor: "#FFF",
    borderRadius: 5,
    padding: 20,
  },
  pickerItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
  },
  pickerItemIcon: {
    width: 30,
    height: 30,
    marginRight: 10,
  },
  pickerItemText: {
    fontSize: 18,
  },
  arrowdown: {
    width: 20,
    height: 20,
    // marginRight: 30,
  },
  topicons: {
    width: 20,
    height: 20,
    marginLeft: 30,
  },
  megaphone: {
    width: 25,
    height: 25,
    //position: "absolute",
    //right: 343,
  },
  search: {
    width: 24,
    height: 24,
    // position: "absolute",
    //  right: 393,
  },
});

export default MyComponent;
