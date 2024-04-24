import React from 'react';
import { View, Text, Image, TextInput, TouchableOpacity } from 'react-native';

// Define ReferralLink component
const ReferralLink = ({ link }) => {
  return (
    <View style={{ flexGrow: 1, flexShrink: 0, fontSize: 14, fontWeight: '500', maxWidth: '100%', alignItems: 'center' }}>
      <Text style={{ color: 'black', maxWidth: '100%' }}>
        You can also share your personal referral link by copying and sending it or sharing it on your social media
      </Text>
      <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 3 }}>
        <View style={{ padding: 10, backgroundColor: 'white', borderRadius: 5, borderWidth: 1, borderColor: '#C8C8C8', maxWidth: '80%' }}>
          <Text>{link}</Text>
        </View>
      </View>
    </View>
  );
};

// Define SocialMediaIcon component
const SocialMediaIcon = ({ src, alt, extraIcon }) => {
  return (
    <View style={{ justifyContent: 'center', alignItems: 'center', padding: 5, marginRight: 10, width: 40, height: 40, backgroundColor: 'white', borderRadius: 20, shadowColor: '#000', shadowOpacity: 0.3, shadowRadius: 4, shadowOffset: { width: 0, height: 2 } }}>
      <Image source={{ uri: src }} style={{ width: 20, height: 20 }} />
      {extraIcon && (
        <Image source={{ uri: extraIcon.src }} style={{ width: 5, height: 5, marginTop: 3 }} />
      )}
    </View>
  );
};

// Define socialMediaIcons array
const socialMediaIcons = [
  { src: "https://cdn.builder.io/api/v1/image/assets/TEMP/68a88ce4f47e9996b23274220ecbde5fd24af73f8ed277ba347ee66b1135f326?apiKey=7b9918e68d9b487793009b3aea5b1a32&", alt: "LinkedIn icon", className: "w-5 aspect-[1.11]" , color: 'coral' },
  { src: "https://cdn.builder.io/api/v1/image/assets/TEMP/75f8c2756ed9958ae6f6a22585c02edb606889ac295d40edb49f3922db26c104?apiKey=7b9918e68d9b487793009b3aea5b1a32&", alt: "Twitter icon", className: "w-5 aspect-square" },
  {
    src: "https://cdn.builder.io/api/v1/image/assets/TEMP/089b64cb0df941e65fb4b5211d50826f414ad9d70c96d20206cd4ec95fda7418?apiKey=7b9918e68d9b487793009b3aea5b1a32&",
    alt: "Facebook icon",
    className: "w-5 aspect-square fill-red-400",

  },
];

const MyComponent = () => {
  return (
    <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
      <View style={{ paddingTop: 40, paddingRight: 20, paddingBottom: 200, paddingLeft: 40, borderRadius: 30, backgroundColor: '#FFFFFF' }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end', maxWidth: '100%' }}>
          <TouchableOpacity style={{ justifyContent: 'center', alignItems: 'center', paddingHorizontal: 10, backgroundColor: 'white', borderRadius: 15, height: 30, width: 30, shadowColor: '#000', shadowOpacity: 0.3, shadowRadius: 4, shadowOffset: { width: 0, height: 2 } }}>
            {/* No reference to close icon */}
          </TouchableOpacity>
        </View>
        <Text style={{ marginTop: 66, fontSize: 24, fontWeight: 'bold', color: 'black', textAlign: 'center' }}>Refer a Friend to Recruitangle</Text>
        <Image source={require('../assets/friends.png')} style={{ marginTop: 10, alignSelf: 'center', width: 200, height: 200 }} />
        <View style={{ marginTop: 20, maxWidth: 1010}}>
          <Text style={{ fontSize: 16, fontWeight: 'bold', color: 'black' }}>Invite your friends</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
           <View style={{ flexGrow: 1, flexShrink: 0, fontSize: 14, fontWeight: '500', maxWidth: '80%' }}>
              <Text style={{ color: 'black', maxWidth: '100%' }}>Enter your friends' e-mail addresses and send them invitations to join Recruitangle</Text>
              <TextInput placeholder="Enter e-mail address(es)" style={{ padding: 10, marginTop: 5, fontSize: 14, borderWidth: 1, borderRadius: 5, borderColor: '#C8C8C8', maxwidth: '80%', marginRight: 20 }} />
            </View>
            <TouchableOpacity style={{ padding: 10, marginTop: 24, backgroundColor: '#FF7F50', borderRadius: 5, marginRight: 20 }}>
              <Text style={{ color: 'white', fontSize: 14, fontWeight: 'bold' }}>Send Invitations</Text>
            </TouchableOpacity>
          </View>
          <Text style={{ marginTop:           30, fontSize: 16, fontWeight: 'bold', color: 'black' }}>Share the referral link</Text>
          <Text style={{ color: 'black', maxWidth: '100%', marginTop: 15 }}> You can also share your personal referral link by copying and sending it or sharing it on your social media </Text>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
            <View style={{ flex: 1 }}>
              <TextInput
                value={"https://www.recruitangle.com/tell-a-friend/uAD6jkl0M"}
                style={{ padding: 10, backgroundColor: 'white', borderRadius: 5, borderWidth: 1, borderColor: '#C8C8C8', maxwidth: '100%' }}
                editable={false}
              />
            </View>
            <TouchableOpacity style={{ padding: 10, backgroundColor: '#FF7F50', borderRadius: 5, marginLeft: 20 }}>
              <Text style={{ color: 'white', fontSize: 14, fontWeight: 'bold', width: 120, textAlign: 'center', }}>Copy Link</Text>
            </TouchableOpacity>
            <View style={{ flexDirection: 'row', alignItems: 'center', maxWidth: '1%', marginLeft: 10 }}>
              {socialMediaIcons.map((icon, index) => (
                <SocialMediaIcon key={index} src={icon.src} alt={icon.alt} extraIcon={icon.extraIcon} />
              ))}
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default MyComponent;
