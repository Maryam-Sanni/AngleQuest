import React from 'react';
import { View, Text, ScrollView, StyleSheet, Image, TouchableOpacity } from 'react-native';
import Topbar from '../components/expertstopbar';
import Sidebar from '../components/expertssidebar';
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
              <TouchableOpacity onPress={goToOffers} >
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

            <View style={{ justifyContent: "flex-end", paddingHorizontal: 10, paddingVertical: 10, borderRadius: 5, backgroundColor: "#d3f9d8", width: 150, alignItems: 'center', marginTop: 10, marginLeft: 730 }}>
              <Text style={{ fontSize: 14, color: "#206C00", alignText: 'center' }}>My Profile</Text>
            </View>

            <ScheduledMeetingsTable />
          </View>
        </ScrollView>
      </View>
    </View>
  );
}

const ScheduledMeetingsTable = () => {
  return (
    <View style={{marginLeft: 50 }}>
      <Text style={styles.title}>Offers</Text>
      <View style={styles.tableheader}>
        <Text style={[styles.tableheaderText, { marginLeft: 25 }]}>Name</Text>
        <Text style={[styles.tableheaderText, { marginLeft: 50 }]}>Number of Candidates</Text>
        <Text style={[styles.tableheaderText, { marginLeft: 40 }]}>Field</Text>
        <Text style={[styles.tableheaderText, { marginLeft: 80 }]}>Start Date</Text>
        <Text style={[styles.tableheaderText, { flex: 0.5 }]}>    </Text>
      </View>
      {/* Body */}
      <View style={styles.table}>
        <View style={styles.row}>
          <View style={styles.cell}>
            <Text style={styles.cellText}>ASML</Text>
          </View>
          <View style={styles.cell}>
            <Text style={styles.cellText}>3 Candidates</Text>
          </View>
          <View style={styles.cell}>
            <Text style={styles.cellText}>SAP FI</Text>
          </View>
          <View style={styles.cell}>
            <Text style={styles.cellText}>July 2024</Text>
          </View>
          <TouchableOpacity style={styles.cell}>
            <Text style={styles.cellText}>Bid</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.row}>
          <View style={styles.cell}>
            <Text style={styles.cellText}>TMC</Text>
          </View>
          <View style={styles.cell}>
            <Text style={styles.cellText}>3 Candidates</Text>
          </View>
          <View style={styles.cell}>
            <Text style={styles.cellText}>Power Platform</Text>
          </View>
          <View style={styles.cell}>
            <Text style={styles.cellText}>August 2024</Text>
          </View>
          <TouchableOpacity style={styles.cell}>
            <Text style={styles.cellText}>Bid</Text>
          </TouchableOpacity>
        </View>
         <View style={styles.row}>
          <View style={styles.cell}>
            <Text style={styles.cellText}>RVL</Text>
          </View>
          <View style={styles.cell}>
            <Text style={styles.cellText}>3 Candidates</Text>
          </View>
          <View style={styles.cell}>
            <Text style={styles.cellText}>SAP FI</Text>
          </View>
          <View style={styles.cell}>
            <Text style={styles.cellText}>July 2024</Text>
          </View>
          <TouchableOpacity style={styles.cell}>
            <Text style={styles.cellText}>Bid</Text>
          </TouchableOpacity>
        </View>
         <View style={styles.row}>
          <View style={styles.cell}>
            <Text style={styles.cellText}>MTN</Text>
          </View>
          <View style={styles.cell}>
            <Text style={styles.cellText}>3 Candidates</Text>
          </View>
          <View style={styles.cell}>
            <Text style={styles.cellText}>Power Platform</Text>
          </View>
          <View style={styles.cell}>
            <Text style={styles.cellText}>August 2024</Text>
          </View>
          <TouchableOpacity style={styles.cell}>
            <Text style={styles.cellText}>Bid</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.row}>
          <View style={styles.cell}>
            <Text style={styles.cellText}>DANGOTE</Text>
          </View>
          <View style={styles.cell}>
            <Text style={styles.cellText}>3 Candidates</Text>
          </View>
          <View style={styles.cell}>
            <Text style={styles.cellText}>SAP FI</Text>
          </View>
          <View style={styles.cell}>
            <Text style={styles.cellText}>July 2024</Text>
          </View>
          <TouchableOpacity style={styles.cell}>
            <Text style={styles.cellText}>Bid</Text>
          </TouchableOpacity>
        </View>
         <View style={styles.row}>
          <View style={styles.cell}>
            <Text style={styles.cellText}>AWL</Text>
          </View>
          <View style={styles.cell}>
            <Text style={styles.cellText}>3 Candidates</Text>
          </View>
          <View style={styles.cell}>
            <Text style={styles.cellText}>Power Platform</Text>
          </View>
          <View style={styles.cell}>
            <Text style={styles.cellText}>August 2024</Text>
          </View>
          <TouchableOpacity style={styles.cell}>
            <Text style={styles.cellText}>Bid</Text>
          </TouchableOpacity>
        </View>
 <View style={styles.row}>
          <View style={styles.cell}>
            <Text style={styles.cellText}>TESLA</Text>
          </View>
          <View style={styles.cell}>
            <Text style={styles.cellText}>3 Candidates</Text>
          </View>
          <View style={styles.cell}>
            <Text style={styles.cellText}>SAP FI</Text>
          </View>
          <View style={styles.cell}>
            <Text style={styles.cellText}>July 2024</Text>
          </View>
          <TouchableOpacity style={styles.cell}>
            <Text style={styles.cellText}>Bid</Text>
          </TouchableOpacity>
        </View>
<View style={styles.row}>
          <View style={styles.cell}>
            <Text style={styles.cellText}>TMC</Text>
          </View>
          <View style={styles.cell}>
            <Text style={styles.cellText}>3 Candidates</Text>
          </View>
          <View style={styles.cell}>
            <Text style={styles.cellText}>Power Platform</Text>
          </View>
          <View style={styles.cell}>
            <Text style={styles.cellText}>August 2024</Text>
          </View>
          <TouchableOpacity style={styles.cell}>
            <Text style={styles.cellText}>Bid</Text>
          </TouchableOpacity>
        </View>
<View style={styles.row}>
          <View style={styles.cell}>
            <Text style={styles.cellText}>ASML</Text>
          </View>
          <View style={styles.cell}>
            <Text style={styles.cellText}>3 Candidates</Text>
          </View>
          <View style={styles.cell}>
            <Text style={styles.cellText}>SAP FI</Text>
          </View>
          <View style={styles.cell}>
            <Text style={styles.cellText}>July 2024</Text>
          </View>
          <TouchableOpacity style={styles.cell}>
            <Text style={styles.cellText}>Bid</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.row}>
<View style={styles.cell}>
            <Text style={styles.cellText}>TMC</Text>
          </View>
          <View style={styles.cell}>
            <Text style={styles.cellText}>3 Candidates</Text>
          </View>
          <View style={styles.cell}>
            <Text style={styles.cellText}>Power Platform</Text>
          </View>
          <View style={styles.cell}>
            <Text style={styles.cellText}>August 2024</Text>
          </View>
          <TouchableOpacity style={styles.cell}>
            <Text style={styles.cellText}>Bid</Text>
          </TouchableOpacity>
        </View>


      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    marginLeft: -60,
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
  title: {
    marginTop: 70,
    color: "black",
    fontWeight: 'bold',
    fontSize: 15,
    textAlign: 'flex-start',
  },
  table: {
    marginRight: 200,
    marginTop: -5,
    alignContent: 'center',
    borderTopWidth: 1,
    borderTopColor: 'coral',
    marginBottom: 20,
    backgroundColor: '#F8F8F8',
  },
  row: {
    flexDirection: 'row',
  },
  cell: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#CCC',
    padding: 10,
    alignItems: 'center',
  },
  cellText: {
    textAlign: 'center',
  },
  tableheader: {
    marginRight: 200,
    marginTop: 10, 
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: 'coral',
    padding: 18,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  tableheaderText: {
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default MyComponent;
