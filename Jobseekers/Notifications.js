import React, { useState } from 'react';
import { View, Text, Image } from 'react-native';
import Sidebar from '../components/sidebar';
import Topbar from '../components/topbar';

export default function MyComponent() {
  const [marginLeft, setMarginLeft] = useState(220); // Initial marginLeft value


  const reduceMarginLeft = () => {
    setMarginLeft(20); // Update marginLeft value
  };

  const handleMenuToggle = (showMenu) => {
    if (!showMenu) {
      reduceMarginLeft(); // Reduce marginLeft when setShowMenu(false) is called
    }
  };


  return (
    <View style={{ height: '80%' }}>
      <Topbar />
      <View style={{ flexDirection: 'row', flex: 1 }}>
      <Sidebar setShowMenu={handleMenuToggle} /> 
        <View style={{ flex: 1, padding: 20, backgroundColor: "white",  marginLeft}}>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
            <Text style={{ fontSize: 18, fontWeight: 'bold', color: 'black' }}>Notifications</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Image
                source={{ uri: 'https://cdn.builder.io/api/v1/image/assets/TEMP/1185e61deafb3a111149fd6729b0779a7b7fdc599bfe5f2c70c672d29671efa3?apiKey=7b9918e68d9b487793009b3aea5b1a32' }}
                style={{ width: 24, height: 24, marginRight: 5 }}
                resizeMode='contain'
              />
              <Text style={{ fontSize: 12, color: 'green' }}>Mark all as read</Text>
            </View>
          </View>

          {/* Notification items */}

          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20, marginBottom: 10 }}>
            <Text style={{ fontSize: 12, fontWeight: '600', color: 'green' }}>View all</Text>
            <Text style={{ fontSize: 12, marginRight: 10, color: 'grey' }}>Unread</Text>
            <Text style={{ fontSize: 12, color: 'grey', marginRight: 900 }}>Saved</Text>
          </View>

          {/* Notification 1 */}
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>
            <Text style={{ fontSize: 14, fontWeight: '600', color: 'green' }}>You successfully booked an interview</Text>
            <View style={{ width: 6, height: 6, backgroundColor: 'red', borderRadius: 3 }} />
          </View>
          <View style={{ flexDirection: 'row', marginTop: 5 }}>
            <Text style={{ flex: 1, fontSize: 12 }}>You successfully booked an interview session with John Smith for the following date and time Mon, 12th April 2024 from 09:30pm - 10:30pm. See details of the here...</Text>
            <Text style={{ fontSize: 10, alignSelf: 'flex-end' }}>5 min ago</Text>
          </View>

          {/* Notification 2 */}
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 }}>
            <Text style={{ fontSize: 14, fontWeight: '600', color: 'green' }}>You got a feedback</Text>
            <View style={{ width: 6, height: 6, backgroundColor: 'red', borderRadius: 3 }} />
          </View>
          <View style={{ flexDirection: 'row', marginTop: 5 }}>
            <Text style={{ flex: 1, fontSize: 12 }}>John Smith has given you feedback on the interview session that happened on the following date and time Mon, 12th April 2024 from 09:30pm - 10:30pm.</Text>
            <Text style={{ fontSize: 10, alignSelf: 'flex-end' }}>3 hours ago</Text>
          </View>

          {/* Notification 3 */}
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 }}>
            <Text style={{ fontSize: 14, fontWeight: '600', color: 'green' }}>Reminder on upcoming session!</Text>
            <View style={{ width: 6, height: 6, backgroundColor: 'red', borderRadius: 3 }} />
          </View>
          <View style={{ flexDirection: 'row', marginTop: 5 }}>
            <Text style={{ flex: 1, fontSize: 12 }}>Your interview session with Mr John Smith scheduled for Mon, 12th April 2024 from 09:30pm to 10:30pm is about to start. You have 15 minutes left before the session begins.</Text>
            <Text style={{ fontSize: 12, alignSelf: 'flex-end' }}>1 day ago</Text>
          </View>

          {/* Notification 4 */}
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 }}>
            <Text style={{ fontSize: 14, fontWeight: '600', color: 'green' }}>Feedback shared!</Text>
            <View style={{ width: 6, height: 6, backgroundColor: 'red', borderRadius: 3 }} />
          </View>
          <View style={{ flexDirection: 'row', marginTop: 5 }}>
            <Text style={{ flex: 1, fontSize: 12 }}>Your interview feedback with Mr John Smith has been shared with a Recruiter.</Text>
            <Text style={{ fontSize: 10, alignSelf: 'flex-end' }}>3 days ago</Text>
          </View>

          {/* Notification 5 */}
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 }}>
            <Text style={{ fontSize: 14, fontWeight: '600', color: 'green' }}>Congratulations! You’ve been hired</Text>
            <View style={{ width: 6, height: 6, backgroundColor: 'red', borderRadius: 3 }} />
          </View>
          <View style={{ flexDirection: 'row', marginTop: 5 }}>
            <Text style={{ flex: 1, fontSize: 12 }}>Congratulations Moses! You have been selected for the role of an Architectural Engineer at Zulinsky Engineering Agency, Switzerland. Details of your employment have been sent to your mail.</Text>
            <Text style={{ fontSize: 10, alignSelf: 'flex-end' }}>4 days ago</Text>
          </View>

          {/* Notification 6 */}
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 }}>
            <Text style={{ fontSize: 14, fontWeight: '600', color: 'green' }}>Session started</Text>
            <View style={{ width: 6, height: 6, backgroundColor: 'red', borderRadius: 3 }} />
          </View>
          <View style={{ flexDirection: 'row', marginTop: 5 }}>
            <Text style={{ flex: 1, fontSize: 12 }}>Your booked session with Mr John Smith just commenced at 09:30pm and it ends exactly 10:30pm (1hr).</Text>
            <Text style={{ fontSize: 10, alignSelf: 'flex-end' }}>4 days ago</Text>
          </View>

          {/* Notification 7 */}
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 }}>
            <Text style={{ fontSize: 14, fontWeight: '600', color: 'green' }}>Session ended</Text>
            <View style={{ width: 6, height: 6, backgroundColor: 'red', borderRadius: 3 }} />
          </View>
          <View style={{ flexDirection: 'row', marginTop: 5 }}>
            <Text style={{ flex: 1, fontSize: 12 }}>Your booked session with Mr John Smith just ended at 10:30pm (1hr). Click here to leave a feedback.</Text>
            <Text style={{ fontSize: 10, alignSelf: 'flex-end' }}>Tue Nov 13</Text>
          </View>

          {/* Notification 8 */}
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 }}>
            <Text style={{ fontSize: 14, fontWeight: '600', color: 'green' }}>New Job Alert!</Text>
            <View style={{ width: 6, height: 6, backgroundColor: 'red', borderRadius: 3 }} />
          </View>
          <View style={{ flexDirection: 'row', marginTop: 5 }}>
            <Text style={{ flex: 1, fontSize: 12 }}>Exciting opportunity: Architectural Engineer position available at New York Engineering Department in New York, USA. Check out this role now.</Text>
            <Text style={{ fontSize: 10, alignSelf: 'flex-end' }}>Tue Nov 13</Text>
          </View>

        </View>
      </View>
    </View>
  );
}
