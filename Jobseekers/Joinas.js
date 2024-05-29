import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Top from '../components/top';

const Card = ({ imageSrcs, title, onPress }) => {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: imageSrcs[0] }} style={styles.image} />
        <Image source={{ uri: imageSrcs[1] }} style={styles.image} />
      </View>
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  );
};

const MyComponent = () => {
  const navigation = useNavigation(); // Navigation object

  const cardData = [
    {
      imageSrcs: ["https://cdn.builder.io/api/v1/image/assets/TEMP/257662131a5e3fbd93f0782e875f67648348be710a5e1ffe12b65018fa95fb17?apiKey=7b9918e68d9b487793009b3aea5b1a32&", "https://cdn.builder.io/api/v1/image/assets/TEMP/6e418c395062e647058c98c8eae4fe89bdc4d69defd64ac3901ddf5c21063eb5?apiKey=7b9918e68d9b487793009b3aea5b1a32&"],
      title: "Join as a Job Seeker",
    },
    {
      imageSrcs: ["https://cdn.builder.io/api/v1/image/assets/TEMP/99b3007e756695be08006873dab85669181878e7d5f03e8bfe5408316f7f39b8?apiKey=7b9918e68d9b487793009b3aea5b1a32&", "https://cdn.builder.io/api/v1/image/assets/TEMP/6e418c395062e647058c98c8eae4fe89bdc4d69defd64ac3901ddf5c21063eb5?apiKey=7b9918e68d9b487793009b3aea5b1a32&"],
      title: "Join as an Expert",
    },
    {
      imageSrcs: ["https://cdn.builder.io/api/v1/image/assets/TEMP/ee8e3816fa45f767b3023c27dd0f0c4e76d9fd1ce2f8d801b9abd4e845a1a6f5?apiKey=7b9918e68d9b487793009b3aea5b1a32&", "https://cdn.builder.io/api/v1/image/assets/TEMP/6e418c395062e647058c98c8eae4fe89bdc4d69defd64ac3901ddf5c21063eb5?apiKey=7b9918e68d9b487793009b3aea5b1a32&"],
      title: "Join as a Recruiter",
    },
  ];

  const handleCardPress = (title) => {
    if (title === "Join as a Job Seeker") {
      navigation.navigate('Sign Up');  
    } else if (title === "Join as an Expert") {
      navigation.navigate('Create account');
    } else if (title === "Join as a Recruiter") {
      navigation.navigate('Sign Up - Corporate');
    }
    console.log(`Pressed ${title}`);
  };

  const handleSignInPress = () => {
    navigation.navigate('Signin');
  };

  return (
    <View style={{ flex: 1  }}>
      <Top/ >
    <View style={[styles.container, styles.shadow]}>
      <Text style={styles.header}>Join as a Job Seeker, Expert or Recruiter</Text>
      <View style={styles.cardsContainer}>
        {cardData.map((card, index) => (
          <Card
            key={index}
            imageSrcs={card.imageSrcs}
            title={card.title}
            onPress={() => handleCardPress(card.title)}
          />
        ))}
      </View>
      <TouchableOpacity onPress={handleSignInPress}>
        <Text style={styles.signInText}>
          <Text style={styles.signInTextGray}>Already have an account?</Text> Log In
        </Text>
      </TouchableOpacity>
    </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  cardsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  card: {
    width: '30%',
    borderWidth: 1,
    borderColor: '#A3BE95',
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
  },
  imageContainer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  image: {
    width: 30,
    height: 30,
    resizeMode: 'cover',
    marginHorizontal: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  button: {
    backgroundColor: 'coral',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginBottom: 10,
    marginTop: 15
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  signInText: {
    marginTop: 10,
    fontSize: 14,
    textAlign: 'center',
  },
  signInTextGray: {
    marginTop:10,
    color: 'gray',
  },
  shadow: {
    shadowColor: '#0000',
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
