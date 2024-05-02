import React from 'react';
import { View, Text, ScrollView, StyleSheet, Image, TouchableOpacity } from 'react-native';
import Topbar from '../components/expertstopbar';
import Sidebar from '../components/expertssidebar';
import BidsinReview from '../components/BidsinReview';
import WonBids from '../components/wonbids';
import LostBids from '../components/lostbids';
import { useNavigation } from '@react-navigation/native';

 
function MyComponent() {
    const navigation = useNavigation();

    const goToOffers= () => {
        navigation.navigate('Offers');
      };

      const goToBids = () => {
        navigation.navigate('Bids');
      };

  return (
    <View style={{ flex: 1 }}>
      <Topbar />
      <View style={{ flexDirection: 'row', flex: 1 }}>
        <Sidebar />
        <ScrollView contentContainerStyle={{ flexGrow: 1, maxHeight: 500 }}>
        <View style={{ marginLeft: 270, backgroundColor: 'white'}}>
          <View style={styles.header}>
            <TouchableOpacity onPress={goToOffers}  >
              <View style={styles.item}>
                <Image source={require('../assets/expertsoffers.png')} style={styles.image} />
                <Text style={styles.headertext}>Offers</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={goToBids} >
              <View style={styles.item}>
                <Image source={require('../assets/expertsbids.png')} style={styles.image} />
                <Text style={styles.headertext}>Bids</Text>
              </View>
            </TouchableOpacity>
            
          </View>


 
<BidsinReview />
<WonBids />
<LostBids />
</View>
          
          
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    marginLeft: -100,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headertext: {
    marginLeft: 5,
    fontSize: 14,
    fontWeight: '500'
  },
  image: {
    width: 24,
    height: 24,
    marginRight: 5,
  },
});

export default MyComponent;
