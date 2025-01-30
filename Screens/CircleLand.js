import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";

const BackupUI = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>We Know You Are Inspired to Succeed!</Text>
      <Text style={styles.subHeader}>
        We are driven by the singular mission of meeting your need for a backup
        when it gets so tough and straining even as an experienced or junior professional.
      </Text>

      <View style={styles.contentContainer}>
        <View style={styles.leftTextContainer}>
          <Text style={styles.leftText}>Boost your employers confidence in you by delivering consistently</Text>
          <Text style={styles.leftText}>Close your knowledge gap by constantly solving issues with experts</Text>
          <Text style={styles.leftText}>Solve every task like a pro by adopting our best practice guide</Text>
        </View>

        <View style={styles.gridContainer}>
          <View style={styles.box}><Text style={styles.boxText}>{'\u2022'} Expert Backup</Text></View>
          <View style={styles.box}><Text style={styles.boxText}>{'\u2022'} Best Practices</Text></View>
           </View>
        
          <View style={styles.circleContainer}>
            <View style={styles.quadrantContainer}>
              <View style={[styles.quadrant, styles.topLeft]}>
                <Text style={styles.circleText1}>Co-solve Impediments</Text>
              </View>
              <View style={[styles.quadrant, styles.topRight]}>
                <Text style={styles.circleText2}>Tailored to You</Text>
              </View>
             
              <View style={[styles.quadrant, styles.bottomLeft]}>
                <Text style={styles.circleText3}>Meet Standard</Text>
              </View>
              <View style={[styles.quadrant, styles.bottomRight]}>
                <Text style={styles.circleText4}>Knowledge Sharing</Text>
              </View>
            </View>
            <View style={styles.horizontalLine} />
            <Image
              source={{
                uri: "https://img.icons8.com/?size=100&id=25224&format=png&color=FFFFFF",
              }}
              style={{ width: 50, height: 50 }}
            />
            <View style={styles.verticalLine} />
          </View>

           <View style={styles.gridContainer}>
          <View style={styles.box2}><Text style={styles.boxText}>{'\u2022'} AI Agent</Text></View>
          <View style={styles.box2}><Text style={styles.boxText}>{'\u2022'} Hubs</Text></View>
          
        </View>
      </View>

      <Text style={styles.footer}>Expert | AI Agent | Best Practices | Hubs </Text>  

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white', 
    padding: 50,
    alignSelf: 'stretch',
    alignItems: 'center',
    marginBottom: -50,
    marginTop: 50
  },
  header: {
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
  },
  subHeader: {
    fontSize: 22,
    width: 800,
    textAlign: "center",
    marginVertical: 10,
  },
  contentContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 20,
  },
  leftTextContainer: {
    width: "25%",
    marginRight: 100
  },
  leftText: {
    fontSize: 18,
    marginBottom: 30,
  },
  gridContainer: {
    flexDirection: "column",
  },
  box: {
    width: 200,
    height: 120,
    marginRight: -60,
    borderWidth: 3,
    borderRadius: 10,
    borderColor: "#063b40",
    alignItems: "center",
    padding: 10,
    justifyContent: "center",
    marginVertical: 50,
  },
  box2: {
    width: 180,
    height: 120,
    marginLeft: -60,
    borderWidth: 3,
    borderRadius: 10,
    borderColor: "#063b40",
    alignItems: "center",
    padding: 10,
    justifyContent: "center",
    marginVertical: 50,
  },
  boxText: {
    fontSize: 20,
    textAlign: "center",
  },
  circleContainer: {
    width: 350,
    height: 350,
    borderRadius: 180,
    backgroundColor: '#063b40',
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
  },
  quadrantContainer: {
    width: "100%",
    height: "100%",
    position: "absolute",
  },
  quadrant: {
    position: "absolute",
    width: "50%",
    height: "50%",
    alignItems: "center",
    justifyContent: "center",
    padding: 5,
  },
  topLeft: {
    top: 0,
    left: 0,
  },
  topRight: {
    top: 0,
    right: 0,
  },
  bottomLeft: {
    bottom: 0,
    left: 0,
  },
  bottomRight: {
    bottom: 0,
    right: 0,
  },
  horizontalLine: {
    position: "absolute",
    width: "100%",
    height: 8,
    backgroundColor: "white",
  },
  verticalLine: {
    position: "absolute",
    height: "100%",
    width: 8,
    backgroundColor: "white",
  },
  circleText1: {
    fontSize: 16,
    textAlign: "center",
    marginLeft: 20,
    marginTop: 50,
    width: 100,
    color: 'white'
  },
  circleText2: {
    fontSize: 16,
    textAlign: "center",
    marginLeft: -30,
    marginTop: 50,
    width: 100,
    color: 'white'
  },
  circleText3: {
    fontSize: 16,
    textAlign: "center",
    marginLeft: 20,
    marginBottom: 50,
    width: 100,
    color: 'white'
  },
  circleText4: {
    fontSize: 16,
    textAlign: "center",
    marginLeft: -30,
    marginBottom: 50,
    width: 100,
    color: 'white'
  },
  footer: {
    marginTop: 40,
    fontSize: 22,
    fontWeight: 500,
  },
});

export default BackupUI;
