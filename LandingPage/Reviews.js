import React from "react";
import { View, Text, StyleSheet, Image, ScrollView } from "react-native";

const reviewsData = [
  {
    id: 1,
    name: "Alice Smith",
    review: "After graduating with a bachelor's degree in accounting, I started my career in the banking sector but soon felt unfulfilled. This platform helped me successfully transition into my dream role, and today, I'm a certified SAP Finance Consultant. I now love both my work and my life.",
    image: require("../assets/laptopGuy.png"),
  },
  {
    id: 2,
    name: "John Raymond",
    review: "I never had the chance to pursue a higher education and spent years working in low-paying jobs. Deep down, I knew I was capable of more but felt lost on how to begin. This platform gave me the support and direction I needed, walking me through every step of the journey. Today, I'm proud to say I'm a certified Business Analyst, and my career has taken a completely new, fulfilling path.",
    image: require("../assets/TG5.png"),
  },
  {
    id: 3,
    name: "Patricia Emmanuel",
    review: "When I started my new job, it wasn’t what I expected—the processes were far more complex and unfamiliar than what I was used to. I needed help to succeed in my role. Thanks to this platform, I worked closely with a dedicated expert who guided me every step of the way. With support from experts and scenario projects, I was able to perform confidently without losing the excitement of my new job.",
    image: require("../assets/laptopGuy.png"),
  },
];

const CommunityReviews = () => {
  return (
    <View style={styles.sectionContainer}>
      <Text style={styles.heading}>Hear what others have to say</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {reviewsData.map((review) => (
          <View key={review.id} style={styles.card}>
            <View style={styles.profileImageContainer}>
              <Image source={review.image} style={styles.profileImage} />
            </View>
            <Text style={styles.userName}>{review.name}</Text>
            <Text style={styles.userReview}>{review.review}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    padding: 20,
    alignItems: 'center',
    marginBottom: 50,
    marginTop: 50
  },
  heading: {
    fontSize: 28,
    fontWeight: '500',
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    marginHorizontal: 10,
    alignItems: 'center',
    width: 250, // Card width
  },
  profileImageContainer: {
    width: 160,  // Width of the circular background
    height: 160, // Height of the circular background
    borderRadius: 80, // Half of the width/height to make it circular
    backgroundColor: 'white', // Black circular background
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75, // Circular image
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  userReview: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
  },
});

export default CommunityReviews;
