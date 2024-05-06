import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Image } from 'react-native';

function MyComponent({ onClose }) {
  return (
    <View style={{ flex: 1, backgroundColor: "#F8F8F8", marginTop: 40, alignItems: 'center'  }}>
<View style={styles.greenBox}>
<TouchableOpacity onPress={onClose}>
            <Text style={{ fontSize: 18, color:'grey', marginLeft: 850,fontWeight: 'bold', marginTop: -20}}>
                            ✕
                        </Text>
                        </TouchableOpacity>
 <View style={styles.container}>
 <View style={styles.row}>
        <View style={styles.cell}>
          <Text style = {{fontWeight: 'bold'}}>Full Name</Text>
        </View>
        <View style={styles.cell}>
        <Text style = {{ color: 'grey'}}>Cheil Maarsen</Text>
        </View>
      </View>
      <View style={styles.row}>
        <View style={styles.cell}>
          <Text style = {{fontWeight: 'bold'}}>Role</Text>
        </View>
        <View style={styles.cell}>
        <Text style = {{ color: 'grey'}}>Junior Platform Developer</Text>
        </View>
      </View>
      <View style={styles.row}>
        <View style={styles.cell}>
          <Text style = {{fontWeight: 'bold'}}>Level</Text>
        </View>
        <View style={styles.cell}>
        <Text style = {{ color: 'grey'}}>Junior</Text>
        </View>
      </View>
      
         
      
      
    </View>
     


     <View style={styles.container}>
      <View style={styles.row}>
        <View style={styles.cell}>
          <Text style = {{fontWeight: 'bold'}}>Topic 1</Text>
        </View>
        <View style={[styles.cell, { flex: 5 }]}>
        <Text style={{color: 'grey'}}>3 Ways to Optimize a model driven app to optimize its performance</Text>
        </View>
        <View style={[styles.cell, { flex: 2 }]}>
           <Text style={{color: 'grey'}}>Covered</Text>
        </View>
      </View>
      <View style={styles.row}>
        <View style={styles.cell}>
          <Text style = {{fontWeight: 'bold'}}>Topic 2</Text>
        </View>
        <View style={[styles.cell, { flex: 5 }]}>
        <Text style={{color: 'grey'}}>3 Ways to Optimize a model driven app to optimize its performance</Text>
        </View>
        <View style={[styles.cell, { flex: 2 }]}>
           <Text style={{color: 'grey'}}>Covered</Text>
        </View>
      </View>
      <View style={styles.row}>
        <View style={styles.cell}>
         <Text style = {{fontWeight: 'bold'}}>Topic 3</Text>
        </View>
        <View style={[styles.cell, { flex: 5 }]}>
        <Text style={{color: 'grey'}}>3 Ways to Optimize a canvas app to optimize its performance</Text>
        </View>
        <View style={[styles.cell, { flex: 2 }]}>
           <Text style={{color: 'grey'}}>Skipped</Text>
        </View>
      </View>
      <View style={styles.row}>
        <View style={styles.cell}>
         <Text style = {{fontWeight: 'bold'}}>Topic 4</Text>
        </View>
        <View style={[styles.cell, { flex: 5 }]}>
        <Text style={{color: 'grey'}}>3 Ways to Optimize a power automate to optimize its performance</Text>
        </View>
        <View style={[styles.cell, { flex: 2 }]}>
           <Text style={{color: 'grey'}}>Covered</Text>
        </View>
      </View>
      <View style={styles.row}>
        <View style={styles.cell}>
          <Text style = {{fontWeight: 'bold'}}>Topic 5</Text>
        </View>
        <View style={[styles.cell, { flex: 5 }]}>
        <Text style={{color: 'grey'}}>3 Ways to Optimize AI builder bot to optimize its performance</Text>
        </View>
        <View style={[styles.cell, { flex: 2 }]}>
           <Text style={{color: 'grey'}}>Skipped</Text>
        </View>
      </View>
      <View style={styles.row}>
        <View style={styles.cell}>
          <Text style = {{fontWeight: 'bold'}}>Topic 6</Text>
        </View>
        <View style={[styles.cell, { flex: 5 }]}>
        <Text style={{color: 'grey'}}>3 Ways to Optimize a canvas app to optimize its performance</Text>
        </View>
        <View style={[styles.cell, { flex: 2 }]}>
          <Text style={{color: 'grey'}}>Covered</Text>
        </View>
      </View>
      </View>




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
    marginTop: 30, 
    marginLeft: 50 
  },
  row: {
    flexDirection: 'row',
  },
  cell: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#CCC',
    padding: 5,
  },
  greenBox: {
    width: 920,
    height:600,
    backgroundColor: '#F8F8F8',
    marginTop: 40
  },
  input: {
    outline: 'none',
  },
  
});

export default MyComponent;