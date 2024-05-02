import React from 'react';
import { View, Text, ScrollView, StyleSheet, Image, TouchableOpacity } from 'react-native';
import Topbar from '../components/expertstopbar';
import Sidebar from '../components/expertssidebar';
import ScheduledMeetingsTable from '../components/ScheduledMeetingsTable';
import AwaitingFeedbacks from '../components/AwaitingFeedbacks';
import CompletedFeedbacks from '../components/CompletedFeedbacks';
import { useNavigation } from '@react-navigation/native';

 
function MyComponent() {
    const navigation = useNavigation();

    const goToInterview = () => {
        navigation.navigate('Interview');
      };

      const goToGrowth = () => {
        navigation.navigate('Growth Plan');
      };

      const goToAdvice = () => {
        navigation.navigate('Advice');
      };

  return (
    <View style={{ flex: 1 }}>
      <Topbar />
      <View style={{ flexDirection: 'row', flex: 1 }}>
        <Sidebar />
        <ScrollView contentContainerStyle={{ flexGrow: 1, maxHeight: 500 }}>
        <View style={{ marginLeft: 270, backgroundColor: 'white'}}>
          <View style={styles.header}>
            <TouchableOpacity onPress={goToInterview} >
              <View style={styles.item}>
                <Image source={require('../assets/expertsinterview.png')} style={styles.image} />
                <Text style={styles.headertext}>Interviews</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={goToGrowth}  >
              <View style={styles.item}>
                <Image source={require('../assets/expertsgrowth.png')} style={styles.image} />
                <Text style={styles.headertext}>Growth Plan</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={goToAdvice}  >
              <View style={styles.item}>
                <Image source={require('../assets/expertsadvice.png')} style={styles.image} />
                <Text style={styles.headertext}>Advice</Text>
              </View>
            </TouchableOpacity>
          </View>

<View style={{ justifyContent: "flex-end", paddingHorizontal: 10, paddingVertical: 10, borderRadius: 5, backgroundColor: "#d3f9d8", width: 120, alignItems: 'center', marginTop: 10, marginLeft: 750 }}>
                <Text style={{ fontSize: 14, color: "#206C00", alignText: 'center' }}>Interview Profile</Text>
              </View>
 
<ScheduledMeetingsTable />
<AwaitingFeedbacks />
<CompletedFeedbacks />
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
    marginLeft: -95
  },
});

export default MyComponent;
