import React, { useRef } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView } from "react-native";

const MostPopularCertificates = () => {
  const scrollRef = useRef(null);
  const cardWidth = 350; // Width of each card
  const spacing = 20; // Spacing between cards

  const scrollToNext = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        x: scrollRef.current.contentOffset.x + cardWidth + spacing,
        animated: true,
      });
    }
  };

  const scrollToPrev = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        x: scrollRef.current.contentOffset.x - (cardWidth + spacing),
        animated: true,
      });
    }
  };

  return (
    <View style={styles.sectionContainer}>
      <Text style={styles.heading}>Launch New Career</Text>
       <Text style={styles.subheading}>Specialization and Professional Certification</Text>

      <View style={styles.carouselContainer}>
        {/* Left Arrow */}
       

        {/* Scrollable Cards */}
        <ScrollView
          horizontal
          ref={scrollRef}
          showsHorizontalScrollIndicator={false}
          style={{ width: '80%' }}
          contentContainerStyle={{ flexDirection: 'row', alignItems: 'center' }}
        >
          {/* Card 1 */}
          <View style={styles.card}>
            <Image
              source={require("../assets/TG5.png")}
              style={styles.cardImage}
            />
            <View style={{ flexDirection: 'row', marginTop: 5, marginBottom: 5 }}>
              <Image
                source={{ uri: 'https://img.icons8.com/?size=100&id=38192&format=png&color=000000' }}
                style={{ width: 20, height: 20, marginRight: 5 }}
              />
              <Text style={{ fontSize: 14 }}>SAP</Text>
            </View>
            <Text style={styles.cardTitle}>SAP FI</Text>
            <Text style={styles.cardDescription}>Master financial accounting concepts and their application in SAP.</Text>
          </View>

          <View style={styles.card}>
            <Image
              source={require("../assets/TG5.png")}
              style={styles.cardImage}
            />
            <View style={{ flexDirection: 'row', marginTop: 5, marginBottom: 5 }}>
              <Image
                source={{ uri: 'https://img.icons8.com/?size=100&id=22989&format=png&color=000000' }}
                style={{ width: 20, height: 20, marginRight: 5 }}
              />
              <Text style={{ fontSize: 14 }}>Microsoft</Text>
            </View>
            <Text style={styles.cardTitle}>Microsoft Azure</Text>
            <Text style={styles.cardDescription}>Master cloud computing concepts and their real-world applications.</Text>
          </View>

          <View style={styles.card}>
            <Image
              source={require("../assets/TG5.png")}
              style={styles.cardImage}
            />
            <View style={{ flexDirection: 'row', marginTop: 5, marginBottom: 5 }}>
              <Image
                source={{ uri: 'https://img.icons8.com/?size=100&id=22989&format=png&color=000000' }}
                style={{ width: 20, height: 20, marginRight: 5 }}
              />
              <Text style={{ fontSize: 14 }}>Microsoft</Text>
            </View>
            <Text style={styles.cardTitle}>Microsoft Power Platform</Text>
            <Text style={styles.cardDescription}>Build and automate applications, workflows, and analytics with ease.</Text>
          </View>

          <View style={styles.card}>
            <Image
              source={require("../assets/TG5.png")}
              style={styles.cardImage}
            />
            <View style={{ flexDirection: 'row', marginTop: 5, marginBottom: 5 }}>
              <Image
                source={{ uri: 'https://img.icons8.com/?size=100&id=38192&format=png&color=000000' }}
                style={{ width: 20, height: 20, marginRight: 5 }}
              />
              <Text style={{ fontSize: 14 }}>SAP</Text>
            </View>
            <Text style={styles.cardTitle}>
              SAP Production Planning</Text>
            <Text style={styles.cardDescription}>Optimize production processes and manage resources for efficient manufacturing.</Text>
          </View>
          
          <View style={styles.card}>
            <Image
              source={require("../assets/TG5.png")}
              style={styles.cardImage}
            />
            <View style={{ flexDirection: 'row', marginTop: 5, marginBottom: 5 }}>    
                <Image
                   source={{ uri: 'https://img.icons8.com/?size=100&id=22989&format=png&color=000000' }}
                   style={{ width: 20, height: 20, marginRight: 5 }}
                />
              <Text style={{fontSize: 14}}>Microsoft</Text>
             </View>
            <Text style={styles.cardTitle}>Microsoft F&O</Text>
            <Text style={styles.cardDescription}>Build and customize applications on the Salesforce platform for business solutions.</Text>
          </View>
        </ScrollView>

        {/* Right Arrow */}

      </View>
      
    </View>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    padding: 40,
    backgroundColor: '#f9f9f9',
    width: "100%",
    alignItems: 'center',
    marginTop: -100
  },
  heading: {
    fontSize: 32,
    fontWeight: '600',
    marginBottom: 10,
  },
  subheading: {
    fontSize: 16,
    marginBottom: 50,
  },
  carouselContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  arrowButton: {
    padding: 10,
  },
  arrowText: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#206C00',
  },
  card: {
    backgroundColor: '#fff',
    padding: 20,
    marginHorizontal: 10,
    width: 350,
    height: 300,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  cardImage: {
    width: 310,
    height: 120,
    marginBottom: 20,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
  },
  cardDescription: {
    fontSize: 14,
    color: '#555',
    marginBottom: 20,
  },
  learnMoreButton: {
    backgroundColor: 'green',
    marginTop: 20,
    padding: 10,
    borderRadius: 5,
    alignSelf: 'flex-start'
  },
  learnMoreText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default MostPopularCertificates;
