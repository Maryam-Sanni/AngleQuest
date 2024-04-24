import React from 'react';
import { View, Text, Image } from 'react-native';
import Sidebar from '../components/expertssidebar';
import Topbar from '../components/expertstopbar';
import { FontAwesome } from '@expo/vector-icons'; 

const UserImage = require('../assets/User.png');

const BookingItem = ({ name, email, date, from, to, status }) => {
  return (
    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderBottomWidth: 1, borderBottomColor: '#CCC', paddingVertical: 8 }}>
      {/* Name with Image */}
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Image style={{ width: 32, height: 32, borderRadius: 16 }} source={UserImage} />
        <View style={{ marginLeft: 20 }}>
          <Text>{name}</Text>
          <Text>{email}</Text>
        </View>
      </View>

      {/* Date */}
      <Text>{date}</Text>

      {/* From */}
      <Text>{from}</Text>

      {/* To */}
      <Text>{to}</Text>

      {/* Status */}
      <View style={{ width: 100, backgroundColor: status.color, borderRadius: 20, padding: 8 }}>
        <Text style={{ color: status.textColor, fontSize: 14, textAlign: 'center' }}>{status.label}</Text>
      </View>

      {/* Ellipse Icon */}
      <FontAwesome name="ellipsis-v" size={20} color="black" />
    </View>
  );
};

export default function YourComponent() {
  const bookings = [
    { name: 'Brie Wills', email: 'briewills14@gmail.com', date: '3rd March, 2024', from: '09:30pm', to: '10:30pm', status: { label: 'Pending', color: '#FFFCE2', textColor: '#FF961A' } },
    { name: 'John Doe', email: 'johndoe@example.com', date: '1st March, 2024', from: '08:00pm', to: '09:00pm', status: { label: 'Confirmed', color: '#EBFFE3', textColor: '#206C00' } },
    { name: 'John Doe', email: 'johndoe@example.com', date: '1st March, 2024', from: '08:00pm', to: '09:00pm', status: { label: 'Confirmed', color: '#EBFFE3', textColor: '#206C00' } },
    { name: 'John Doe', email: 'johndoe@example.com', date: '1st March, 2024', from: '08:00pm', to: '09:00pm', status: { label: 'Pending', color: '#FFFCE2', textColor: '#FF961A' } },
    { name: 'John Doe', email: 'johndoe@example.com', date: '1st March, 2024', from: '08:00pm', to: '09:00pm', status: { label: 'Pending', color: '#FFFCE2', textColor: '#FF961A' } },
    { name: 'John Doe', email: 'johndoe@example.com', date: '1st March, 2024', from: '08:00pm', to: '09:00pm', status: { label: 'Declined', color: '#FFE8E3', textColor: '#C60101' } },
    { name: 'John Doe', email: 'johndoe@example.com', date: '1st March, 2024', from: '08:00pm', to: '09:00pm', status: { label: 'Declined', color: '#FFE8E3', textColor: '#C60101' } },
    // Add more bookings as needed
  ];

  return (
    <View style={{ flex: 1 }}>
      <Topbar />
      <View style={{ flexDirection: 'row', flex: 1 }}>
        <Sidebar />
    <View style={{flex: 1, flexDirection: 'column', marginLeft: 250, marginTop: 10 }}>
    <View style={{ flexDirection: "row", alignItems: "flex-start", paddingHorizontal: 10, marginTop: 20 }}>
              <Text style={{ fontWeight: "bold", fontSize: 14, color: "#206C00" }}>All Bookings</Text>
              <Text style={{ fontSize: 14, marginLeft: 35 }}>Upcoming</Text>
              <Text style={{ fontSize: 14, marginLeft: 35 }}>Declined</Text>
            </View>

            <View style={{ flexDirection: "row", alignItems: "center", marginTop: 20, marginBottom: 20, flexWrap: "wrap" }}>
              <View style={{ justifyContent: "center", paddingHorizontal: 10, paddingVertical: 8, borderRadius: 8, borderWidth: 1, borderColor: "#206C00", backgroundColor: "#d3f9d8" }}>
                <Text style={{ fontSize: 14, color: "#206C00" }}>Civil Engineer</Text>
              </View>
              <View style={{ justifyContent: "center", paddingHorizontal: 10, paddingVertical: 8, borderRadius: 8, borderWidth: 1, borderColor: "#206C00", backgroundColor: "#d3f9d8", marginLeft: 4, marginRight: 4 }}>
                <Text style={{ fontSize: 14, color: "#206C00" }}>Architect</Text>
              </View>
              <View style={{ justifyContent: "center", paddingHorizontal: 10, paddingVertical: 8, borderRadius: 8, borderWidth: 1, borderColor: "#206C00", backgroundColor: "#d3f9d8", marginLeft: 4, marginRight: 4 }}>
                <Text style={{ fontSize: 14, color: "#206C00" }}>Surveyor</Text>
              </View>
              <View style={{ justifyContent: "center", paddingHorizontal: 10, paddingVertical: 8, borderRadius: 8, borderWidth: 1, borderColor: "#206C00", backgroundColor: "#d3f9d8", marginLeft: 4, marginRight: 4 }}>
                <Text style={{ fontSize: 14, color: "#206C00" }}>Constructor</Text>
              </View>
              <View style={{ justifyContent: "center", alignItems: "center", marginLeft: 4, paddingHorizontal: 10, paddingVertical: 8, borderRadius: 8, borderWidth: 1, borderColor: "#206C00", backgroundColor: "#d3f9d8" }}>
                <Text style={{ fontSize: 14, color: "#206C00" }}>+</Text>
              </View>
            </View>
        <View style={{ flex: 1, width: 1000, marginTop: 20 }}>
          {/* Table Header */}
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderBottomWidth: 1, borderBottomColor: '#CCC', paddingBottom: 8 }}>
            <Text style={{ fontWeight: 'bold', flex: 2 }}>Name</Text>
            <Text style={{ fontWeight: 'bold', flex: 1 }}>Date</Text>
            <Text style={{ fontWeight: 'bold', flex: 1 }}>From</Text>
            <Text style={{ fontWeight: 'bold', flex: 1 }}>To</Text>
            <Text style={{ fontWeight: 'bold', flex: 1, marginRight: 25 }}>Status</Text>
          </View>

          {/* Booking Items */}
          {bookings.map((booking, index) => (
            <BookingItem
              key={index}
              name={booking.name}
              email={booking.email}
              date={booking.date}
              from={booking.from}
              to={booking.to}
              status={booking.status}
            />
          ))}
        </View>
      </View>
      </View>
      </View>
  );
}