import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, Image, TouchableOpacity, ImageBackground } from 'react-native';
import Topbar from '../components/expertstopbar';
import Sidebar from '../components/expertssidebar';
import BidsinReview from '../components/BidsinReview';
import WonBids from '../components/wonbids';
import LostBids from '../components/lostbids';
import { useNavigation } from '@react-navigation/native';

 
function MyComponent() {
    const navigation = useNavigation();
    const [isBidHovered, setIsBidHovered] = useState(false);
    const [isOfferHovered, setIsOfferHovered] = useState(false);

    const goToOffers= () => {
        navigation.navigate('Offers');
      };

      const goToBids = () => {
        navigation.navigate('Bids');
      };

  return (
    <ImageBackground
    source={require ('../assets/Background.png') }
  style={{ height: '150%', width: '100%',flex: 1}}
>
    <View style={{ flex: 1 }}>
      <Topbar />
      <View style={{ flexDirection: 'row', flex: 1 }}>
        <Sidebar />
        <ScrollView contentContainerStyle={{ flexGrow: 1, maxHeight: 500 }}>
        <View style={{ marginLeft: 270,}}>
          <View style={styles.header}>
            <TouchableOpacity onPress={goToOffers} 
            underlayColor={isOfferHovered ? 'transparent' : 'transparent'}
            onMouseEnter={() => setIsOfferHovered(true)}
            onMouseLeave={() => setIsOfferHovered(false)}> 
              <View style={styles.item}>
              <Image
  source={{ uri: 'https://cdn.builder.io/api/v1/image/assets/TEMP/c07248ef371c4bd3c8109a5c928c2801705dfc3442beb7951f0c489b455700e9?apiKey=7b9918e68d9b487793009b3aea5b1a32&' }}
  style={styles.image}
/>
                <Text style={[styles.headertext, isOfferHovered && { color: 'coral' }]}>Offers</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={goToBids}
            underlayColor={isBidHovered ? 'transparent' : 'transparent'}
            onMouseEnter={() => setIsBidHovered(true)}
            onMouseLeave={() => setIsBidHovered(false)} >
              <View style={styles.item}>
              <Image
  source={{ uri: 'https://cdn.builder.io/api/v1/image/assets/TEMP/4b274aadb26c96bd1bf3bcc2196a290c8aa4dd6f8bea63a98f9be3ea6a8bdec9?apiKey=7b9918e68d9b487793009b3aea5b1a32&' }}
  style={styles.image}
/>
                <Text style={[styles.headertext, isBidHovered && { color: 'coral' }]}>Bids</Text>
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
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  header: {
    marginLeft: -60,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    backgroundColor: 'white',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  item: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  headertext: {
    marginLeft: 5,
    fontSize: 14,
    marginTop: 3, 
    fontWeight: '500',
    color: '#666'
  },
  image: {
    width: 24,
    height: 24,
    marginRight: 5,
    marginLeft: 100
  },
});

export default MyComponent;
