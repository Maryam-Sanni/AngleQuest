import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

const LineBoxWithText = () => {
  // Array to store different data for each box
  const boxData = [
    {
      text: 'SAP FICO',
      imageUrl: 'https://img.icons8.com/?size=100&id=38192&format=png&color=000000',
    },
    {
      text: 'Microsoft CE',
      imageUrl: 'https://img.icons8.com/?size=100&id=TdZTMv5DI6kp&format=png&color=000000',
    },
    {
      text: 'Microsoft Business Central',
      imageUrl: 'https://img.icons8.com/?size=100&id=TdZTMv5DI6kp&format=png&color=000000',
    },
    {
      text: ' MS Power Platform',
      imageUrl: 'https://img.icons8.com/?size=100&id=jXuZmZPUKCPS&format=png&color=000000',
    },
    {
      text: 'Scrum',
      imageUrl: 'https://img.icons8.com/?size=100&id=oBQdUqMEZHS9&format=png&color=000000',
    },
    {
      text: 'Microsoft F&O',
      imageUrl: 'https://img.icons8.com/?size=100&id=TdZTMv5DI6kp&format=png&color=000000',
    },
    {
      text: 'Microsoft Azure',
      imageUrl: 'https://img.icons8.com/?size=100&id=VLKafOkk3sBX&format=png&color=000000',
    },
    {
      text: 'SAP Production Planning',
      imageUrl: 'https://img.icons8.com/?size=100&id=38192&format=png&color=000000',
    },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.lineBox}>
        <Text style={styles.headerText}>
          We've got you covered, <Text style={{ color: 'darkgreen' }}>from expert advice to solving complex problems.</Text>
        </Text>

        <View style={styles.borderBox}>
          <View style={styles.lineContainer}>
            <Text style={styles.lineText}>Explore the next career path</Text>
            <View style={styles.line} />
          </View>
          <View style={styles.row}>
            {boxData.map((box, index) => (
              <View key={index} style={styles.smallbox}>
                <Image
                  source={{ uri: box.imageUrl }}
                  style={{ width: 50, height: 50 }}
                />
                <Text style={styles.smallboxText}>{box.text}</Text>
              </View>
            ))}
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'stretch',
  },
  lineBox: {
    backgroundColor: '#F6F6F6', 
    padding: 50,
    alignSelf: 'stretch',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 30,
    marginTop: 5,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  lineContainer: {
    position: 'relative',
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -48
  },
  lineText: {
    position: 'absolute',
    backgroundColor: '#F6F6F6',
    paddingHorizontal: 10,
    zIndex: 1,
    fontSize: 16,
  },
  line: {
    position: 'absolute',
    height: 1,
    backgroundColor: 'none',
    width: '100%',
    top: '50%',
  },
  borderBox: {
    borderColor: 'black', 
    borderWidth: 2, 
    padding: 20, 
    borderRadius: 10, 
    marginTop: 50,
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  smallbox: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: 150,
    height: 150,
    margin: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  smallboxText: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 10,
  },
});

export default LineBoxWithText;
