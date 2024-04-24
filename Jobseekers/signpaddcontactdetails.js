import React from 'react';
import { View, Text, TextInput, Image, StyleSheet } from 'react-native';

function InputField({ label, placeholder }) {
  return (
    <View style={styles.inputContainer}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        placeholder={placeholder}
        style={styles.input}
      />
    </View>
  );
}

function SocialField({ label, placeholder, icon }) {
  return (
    <View style={styles.inputContainer}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.socialContainer}>
        <TextInput
          placeholder={placeholder}
          style={styles.socialInput}
        />
        <Image
          source={{ uri: icon }}
          style={styles.icon}
        />
      </View>
    </View>
  );
}

function MyComponent() {
  const socialFields = [
    { label: "Enter LinkedIn Username", placeholder: "Enter LinkedIn Username", icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/718cd7a99a79d819848fca77498558fb7b0f95281d91ddbc2430cfe74dfa9704?apiKey=7b9918e68d9b487793009b3aea5b1a32&" },
    { label: "Enter X Username", placeholder: "Enter X Username", icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/ac9d590b14f1588cc57ef296c6dbcc30b6efaff202dfdc45be9fa784173052cc?apiKey=7b9918e68d9b487793009b3aea5b1a32&" },
    { label: "Enter Facebook Username", placeholder: "Enter Facebook Username", icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/d57b8ffa677d2d0b59eb66c602f9999810667296be2be6344c0d9af133177684?apiKey=7b9918e68d9b487793009b3aea5b1a32&" },
    { label: "Enter Instagram Username", placeholder: "Enter Instagram Username", icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/b1794ec836b0315f7d5c4ec97b6c2c1859bc7dfcd638a542a16afe8083e57cf9?apiKey=7b9918e68d9b487793009b3aea5b1a32&" },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
       
        <Text style={styles.sectionTitle}>Contact Details</Text>
        <View style={styles.inputGroup}>
          <InputField label="Email Address" placeholder="Enter Email Address" />
          <InputField label="Mobile Number" placeholder="Enter Mobile Number" />
        </View>
        <View style={styles.inputGroup}>
          <SocialField label={socialFields[0].label} placeholder={socialFields[0].placeholder} icon={socialFields[0].icon} />
          <SocialField label={socialFields[1].label} placeholder={socialFields[1].placeholder} icon={socialFields[1].icon} />
        </View>
        <View style={styles.inputGroup}>
          <SocialField label={socialFields[2].label} placeholder={socialFields[2].placeholder} icon={socialFields[2].icon} />
          <SocialField label={socialFields[3].label} placeholder={socialFields[3].placeholder} icon={socialFields[3].icon} />
        </View>
        <Text style={styles.sectionTitle}>Address</Text>
        <TextInput
          placeholder="Street Address"
          style={styles.input}
        />
        <TextInput
          placeholder="Street Address Line 2"
          style={styles.input}
        />
        <View style={styles.inputGroup}>
          <TextInput
            placeholder="City"
            style={styles.halfInput}
          />
          <TextInput
            placeholder="Region"
            style={styles.halfInput}
          />
        </View>
        <View style={styles.inputGroup}>
          <TextInput
            placeholder="Postal / Zip Code"
            style={styles.input}
          />
          <View style={styles.countryInput}>
            <Text>United Kingdom</Text>
            <Image
              source={{ uri: 'https://cdn.builder.io/api/v1/image/assets/TEMP/c48120f6036f7ef806de5cbfcb52c432b190c2134523f70740a76a035b2c31d9?apiKey=7b9918e68d9b487793009b3aea5b1a32&' }}
              style={styles.countryIcon}
            />
          </View>
        </View>
             <View style={styles.saveButtonContainer}>
  <Text style={styles.saveButton}>Save & Continue</Text>
</View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: '#FFFFF',
  },
  innerContainer: {
    flex: 1,
    maxWidth: 1273,
    width: '100%',
  },
   title: {
    alignSelf: 'center',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
 
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'coral'
  },
  inputGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
    marginTop: 10,
  },
  inputContainer: {
    flex: 1,
    maxWidth: '48%',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#A0AEC0',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  socialContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative', // Use relative positioning for proper icon placement
  },
  socialInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#A0AEC0',
    borderRadius: 5,
    textAlign: 'left',
    padding: 10,
    paddingLeft: 10,
    marginBottom: 10,
  },
  icon: {
     position: 'absolute', // Position the icon absolutely
    right: 10, // Adjust as needed to align the icon to the right
    width: 20,
    height: 20,
    marginBottom: 12,
  },
  halfInput: {
  flexDirection: 'row',
    flex: 1, 
    alignItems: 'center',
    maxWidth: '49%',
    borderWidth: 1,
    borderColor: '#A0AEC0',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  countryInput: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#A0AEC0',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    marginLeft: 20,
  },
  countryIcon: {
    width: 30,
    height: 30,
    marginLeft: 10,
  },
  // In the styles object:

saveButtonContainer: {
  alignSelf: 'center',
  marginTop: 20,
  width: '30%',
},

saveButton: {
  fontSize: 16,
  fontWeight: 'bold',
  color: 'white',
  backgroundColor: 'coral',
  borderRadius: 5,
  padding: 15,
  textAlign: 'center',
},
});

export default MyComponent;

