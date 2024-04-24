import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const TopExpertCard = ({ name, expertise, rating }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.name}>{name}</Text>
      <Text style={styles.expertise}>{expertise}</Text>
      <Text style={styles.rating}>Rating: {rating}</Text>
    </View>
  );
};

const TopExperts = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Top Rated Experts</Text>
      <View style={styles.cardsContainer}>
        <TopExpertCard name="John Doe" expertise="Machine Learning" rating={4.5} />
        <TopExpertCard name="Jane Smith" expertise="Data Science" rating={4.8} />
        <TopExpertCard name="David Johnson" expertise="Web Development" rating={4.3} />
        <TopExpertCard name="Emily Wilson" expertise="Mobile App Dev" rating={4.6} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: 'white',
    marginLeft: 340,
    marginRight: 100,
    marginTop: 20
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#206C00'
  },
  cardsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  card: {
    marginTop: 10,
    backgroundColor: "#d3f9d8",
    borderRadius: 5,
    padding: 15,
    width: '23%',
    marginBottom: 10,
    marginRight: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#206C00'
  },
  expertise: {
    fontSize: 14,
    color: '#555',
  },
  rating: {
    fontSize: 12,
    color: '#555',
  },
});

export default TopExperts;
