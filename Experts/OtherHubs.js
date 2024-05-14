import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Image, ScrollView } from 'react-native';


 
function MyComponent({ onClose }) {
    const [clicked, setClicked] = useState(false);

    const handleItemClick = () => {
      setClicked(!clicked);
    };
  return (
    
               
    <View style={{ flex: 1, backgroundColor: "#F8F8F8", marginTop: 100, alignItems: 'center', marginBottom: 100 }}>
<View style={styles.greenBox}>
<TouchableOpacity onPress={onClose}>
            <Text style={{ fontSize: 18, color:'grey', marginLeft: 425, fontWeight: 'bold', marginTop: -20}}>
                            ✕
                        </Text>
                        </TouchableOpacity>
                        <TouchableOpacity>
                    <View style={{ flexDirection: 'row', marginBottom: 5, marginTop: 10, marginLeft: 20}}>
                    <Image
       source={require('../assets/group.png')}
        style={{ width: 18, height: 18, marginRight: 10, }}/>     
                        <Text style={{ fontSize: 14, color: '#206C00', fontWeight: '500'}}>My Hubs</Text>
                        </View>
                        </TouchableOpacity >
                        <View style={{ borderBottomWidth: 1, borderBottomColor: '#A2BE95', flex: 1, marginBottom: 15 }} />
                        <TouchableOpacity >
                    <View style={{ flexDirection: 'row', marginBottom: 15, marginTop: 10, marginLeft: 20}}>
                    <Image
       source={require('../assets/hubs.png')}
        style={{ width: 18, height: 18, marginRight: 10, }}/>     
                        <Text style={{ fontSize: 14, color: '#206C00', fontWeight: '500', }}>SAP FI</Text>
                        <Text style={{ fontSize: 14, color: '#206C00', fontStyle: 'italic'}}>- Public</Text>
                        <Text style={{ fontSize: 14, color: '#206C00',}}>, 108 Members</Text>
                        </View>
                        </TouchableOpacity>
                        <TouchableOpacity>
                    <View style={{ flexDirection: 'row', marginBottom: 15, marginTop: 10, marginLeft: 20}}>
                    <Image
       source={require('../assets/hubs.png')}
        style={{ width: 18, height: 18, marginRight: 10, }}/>     
                        <Text style={{ fontSize: 14, color: '#206C00', fontWeight: '500'}}>Microsoft Azure</Text>
                        <Text style={{ fontSize: 14, color: '#206C00', fontStyle: 'italic'}}>- Public</Text>
                        <Text style={{ fontSize: 14, color: '#206C00',}}>, 16 Members</Text>
                        </View>
                        </TouchableOpacity>
                        <TouchableOpacity>
                    <View style={{ flexDirection: 'row', marginBottom: 15, marginTop: 10, marginLeft: 20}}>
                    <Image
       source={require('../assets/hubs.png')}
        style={{ width: 18, height: 18, marginRight: 10, }}/>     
                        <Text style={{ fontSize: 14, color: '#206C00', fontWeight: '500'}}>Junior Power Point Development</Text>
                        <Text style={{ fontSize: 14, color: '#206C00', fontStyle: 'italic'}}>- Public</Text>
                        <Text style={{ fontSize: 14, color: '#206C00',}}>, 21 Members</Text>
                        </View>
                        </TouchableOpacity>
                        <TouchableOpacity>
                    <View style={{ flexDirection: 'row', marginBottom: 15, marginTop: 10, marginLeft: 20}}>
                    <Image
       source={require('../assets/hubs.png')}
        style={{ width: 18, height: 18, marginRight: 10, }}/>     
                        <Text style={{ fontSize: 14, color: '#206C00', fontWeight: '500'}}>Senior Power Point Development</Text>
                        <Text style={{ fontSize: 14, color: '#206C00', fontStyle: 'italic'}}>- Private</Text>
                        <Text style={{ fontSize: 14, color: '#206C00',}}>, 10 Members</Text>
                        </View>
                        </TouchableOpacity>
                        <TouchableOpacity>
                    <View style={{ flexDirection: 'row', marginBottom: 15, marginTop: 10, marginLeft: 20}}>
                    <Image
       source={require('../assets/hubs.png')}
        style={{ width: 18, height: 18, marginRight: 10, }}/>     
                        <Text style={{ fontSize: 14, color: '#206C00', fontWeight: '500'}}>Java Programming</Text>
                        <Text style={{ fontSize: 14, color: '#206C00', fontStyle: 'italic'}}>- Private</Text>
                        <Text style={{ fontSize: 14, color: '#206C00',}}>, 6 Members</Text>
                        </View>
                        </TouchableOpacity>
                        <Text style={{ fontSize: 14, color: 'black', fontWeight: '500', marginTop: 20, fontStyle: 'italic', marginLeft: 20}}>Experts can create a maximum of 5 Hubs</Text>

    </View>
</View>


);
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    borderWidth: 1,
    borderColor: '#CCC',
    marginRight: 70, 
    marginTop: 10, 
    marginLeft: 50 
  },
  greenBox: {
    width: 460,
    height: 200,
    backgroundColor: '#F8F8F8',
    marginTop: 40,
    marginBottom: 40
  },
  input: {
    outline: 'none',
  },
  
});

export default MyComponent;