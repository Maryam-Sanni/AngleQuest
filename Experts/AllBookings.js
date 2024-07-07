import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import Sidebar from '../components/expertssidebar';
import Topbar from '../components/expertstopbar';
import ConfirmationPopup from '../components/confirmationPopup';
import {useFonts} from "expo-font"
import { useTranslation } from 'react-i18next';

const UserImage = require('../assets/User.png');

const BookingItem = ({ name, email, date, from, to, status }) => {
const [showConfirmation, setShowConfirmation] = useState(false);

  const handleConfirmation = () => {
    // Logic to handle confirmation
    // You can perform necessary actions here
    setShowConfirmation(false); // Close the popup
  };

  const handleDecline = () => {
    // Logic to handle decline
    // You can perform necessary actions here
    setShowConfirmation(false); // Close the popup
  };
  const [fontsLoaded]=useFonts({
    'Roboto-Light':require("../assets/fonts/Roboto-Light.ttf"),
  })

   return (
    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderBottomWidth: 1, borderBottomColor: '#CCC', paddingVertical: 8 }}>
      {/* Name with Image */}
      <View style={{ flexDirection: 'row', alignItems: 'center', width: 180 }}>
        <Image style={{ width: 35, height: 35, borderRadius: 16 }} source={UserImage} />
        <View style={{ marginLeft: 10 }}>
          <Text style={{fontFamily:"Roboto-Light"}}>{name}</Text>
          <Text style={{fontFamily:"Roboto-Light"}}>{email}</Text>
        </View>
      </View>

      {/* Date */}
      <Text>{date}</Text>

      {/* From */}
      <Text>{from}</Text>

      {/* To */}
      <Text>{to}</Text>

      {/* Status */}
      <View style={{ width: 80, backgroundColor: status.color, borderRadius: 20, padding: 5 }}>
        <Text style={{ color: status.textColor, fontSize: 12, textAlign: 'center' }}>{status.label}</Text>
      </View>

       {/* Ellipsis Icon */}
       <TouchableOpacity onPress={() => setShowConfirmation(true)}>
       <Image
       source={require('../assets/ellipsis.png')}
        style={{
          width: 15,
          height: 15,
      }}
      />
      </TouchableOpacity>

      {/* Confirmation Popup */}
      <ConfirmationPopup
        visible={showConfirmation}
        onClose={() => setShowConfirmation(false)}
        onConfirm={handleConfirmation}
        onDecline={handleDecline}
      />
    </View>
  );
};


  export default function YourComponent() {
  const [currentPage, setCurrentPage] = useState(1);
  const [filter, setFilter] = useState('All'); // Initialize filter state
  const bookingsPerPage = 7; // Number of bookings per page

  const bookings = [
    { name: 'Brie Wills', email: 'briewills14@gmail.com', date: '3rd March, 2024', from: '09:30pm', to: '10:30pm', statusLabel: 'Pending' },
    { name: 'Ahmed Hassan', email: 'Ahmed345@gmail.com', date: '1st March, 2024', from: '08:00pm', to: '09:00pm', statusLabel: 'Confirmed' },
    { name: 'Maria Garcia', email: 'Mariae@gmail.com', date: '1st March, 2024', from: '08:00pm', to: '09:00pm', statusLabel: 'Confirmed' },
    { name: 'Wei Chen ', email: 'Wei5chen @yahoo.com', date: '1st March, 2024', from: '08:00pm', to: '09:00pm', statusLabel: 'Pending'},
    { name: 'Isabella Rossi', email: 'sabellarossi@gmail.com', date: '1st March, 2024', from: '08:00pm', to: '09:00pm', statusLabel: 'Confirmed' },
    { name: 'Abdullah Al-Farsi', email: 'abdullahalfarsi@gmail.com', date: '1st March, 2024', from: '08:00pm', to: '09:00pm', statusLabel: 'Declined'},
    { name: 'Sophie Dubois', email: 'sophie1992@gmail.com', date: '1st March, 2024', from: '08:00pm', to: '09:00pm', statusLabel: 'Declined' },
     { name: 'Arjun Patel', email: 'patel10@gmail.com', date: '3rd March, 2024', from: '09:30pm', to: '10:30pm', statusLabel: 'Pending'},
    { name: 'Emily Johnson', email: 'johnsonemily@gmail.com', date: '1st March, 2024', from: '08:00pm', to: '09:00pm', statusLabel: 'Confirmed' },
    { name: 'Juan Martinez', email: 'jumabae@gmail.com', date: '1st March, 2024', from: '08:00pm', to: '09:00pm', statusLabel: 'Confirmed' },
    { name: 'Mia Kim', email: 'miaaaa@gmail.com', date: '1st March, 2024', from: '08:00pm', to: '09:00pm', statusLabel: 'Pending'},
    { name: 'Nkechi Udom', email: 'nkechiudom@gmail.com', date: '1st March, 2024', from: '08:00pm', to: '09:00pm', statusLabel: 'Pending'},
    { name: 'Leila Silva', email: 'leila@gmail.com', date: '1st March, 2024', from: '08:00pm', to: '09:00pm', statusLabel: 'Declined'},
    { name: 'Vladimir Petrov ', email: 'vladimirpetrov@gmail.com', date: '1st March, 2024', from: '08:00pm', to: '09:00pm', statusLabel: 'Declined'},
     { name: 'William Johnson', email: 'wills146@hotmailcom', date: '3rd March, 2024', from: '09:30pm', to: '10:30pm', statusLabel: 'Pending'},
    { name: 'Olivia Smith', email: 'livv@gmail.com', date: '1st March, 2024', from: '08:00pm', to: '09:00pm', statusLabel: 'Confirmed' },
    { name: 'Oladapo Ogundele', email: 'ooguns@gmail.com', date: '1st March, 2024', from: '08:00pm', to: '09:00pm', statusLabel: 'Confirmed' },
    { name: 'Charlotte Taylor', email: 'charlottetaylor@yahoo.com', date: '1st March, 2024', from: '08:00pm', to: '09:00pm', statusLabel: 'Pending'},
    { name: 'Benjamin Wilson', email: 'benwilson@gmail.com', date: '1st March, 2024', from: '08:00pm', to: '09:00pm', statusLabel: 'Pending'},
    { name: 'Amelia Jones', email: 'ameliajones@gmail.com', date: '1st March, 2024', from: '08:00pm', to: '09:00pm', statusLabel: 'Declined'},
    { name: 'Alexander Evans', email: 'theevans@yahoo.com', date: '1st March, 2024', from: '08:00pm', to: '09:00pm', statusLabel: 'Confirmed' },
     { name: 'Emily Davis', email: 'emilydavisills14@hotmail.com', date: '3rd March, 2024', from: '09:30pm', to: '10:30pm', statusLabel: 'Pending'},
    { name: 'Henry White', email: 'jhenry@gmail.com', date: '1st March, 2024', from: '08:00pm', to: '09:00pm', statusLabel: 'Confirmed' },
    { name: 'Ava Clark', email: 'iamava@gmail.com', date: '1st March, 2024', from: '08:00pm', to: '09:00pm', statusLabel: 'Confirmed' },
    { name: 'Samuel Joy', email: 'samuelright@gmail.com', date: '1st March, 2024', from: '08:00pm', to: '09:00pm', statusLabel: 'Pending'},
    { name: 'Mia King', email: 'johndoe@gmail.com', date: '1st March, 2024', from: '08:00pm', to: '09:00pm', statusLabel: 'Pending'},
    { name: 'Oliver Morris', email: 'morris9876@gmail.com', date: '1st March, 2024', from: '08:00pm', to: '09:00pm', statusLabel: 'Declined'},
    { name: 'Chukwudi Nwachukwu', email: 'chukwudi890@gmail.com', date: '1st March, 2024', from: '08:00pm', to: '09:00pm', statusLabel: 'Confirmed' },
     { name: 'Temitope Adebayo', email: 'temi555@gmail.com', date: '3rd March, 2024', from: '09:30pm', to: '10:30pm', statusLabel: 'Pending'},
    { name: 'Kehinde Adekunle', email: 'kehindeadekunle@gmail.com', date: '1st March, 2024', from: '08:00pm', to: '09:00pm', statusLabel: 'Confirmed' },
    { name: 'Oluwakemi Afolayan', email: '0luwakemiafolayan98@gmail.com', date: '1st March, 2024', from: '08:00pm', to: '09:00pm', statusLabel: 'Confirmed' },
    { name: 'Chinonso Onwuka', email: 'chinonsoonwuka@gmail.com', date: '1st March, 2024', from: '08:00pm', to: '09:00pm', statusLabel: 'Pending'},
    { name: 'Jacob Hall', email: 'jacon135@gmail.com', date: '1st March, 2024', from: '08:00pm', to: '09:00pm', statusLabel: 'Pending'},
    { name: 'Noah Harris', email: 'noahharris@gmail.com', date: '1st March, 2024', from: '08:00pm', to: '09:00pm', statusLabel: 'Declined'},
    { name: 'Jacques Laurent', email: 'jacqueslaurent@gmail.com', date: '1st March, 2024', from: '08:00pm', to: '09:00pm', statusLabel: 'Declined'},
     { name: 'Adesola Ogunjimi', email: 'desola2000@gmail.com', date: '3rd March, 2024', from: '09:30pm', to: '10:30pm', statusLabel: 'Pending'},
    { name: 'Ibrahim Abubakar', email: 'ibrahim77@gmail.com', date: '1st March, 2024', from: '08:00pm', to: '09:00pm', statusLabel: 'Confirmed' },
    { name: 'John Doe', email: 'johndoe@gmail.com', date: '1st March, 2024', from: '08:00pm', to: '09:00pm', statusLabel: 'Confirmed' },
    { name: 'Amarachi Ekwueme', email: 'amaraek@gmail.com', date: '1st March, 2024', from: '08:00pm', to: '09:00pm', statusLabel: 'Pending'},
    { name: 'Grace Sullivan', email: 'gracy584@gmail.com', date: '1st March, 2024', from: '08:00pm', to: '09:00pm', statusLabel: 'Pending'},
    { name: 'Noah Robinson', email: 'noahbob@gmail.com', date: '1st March, 2024', from: '08:00pm', to: '09:00pm', statusLabel: 'Confirmed' },
    { name: 'John Hughes', email: 'johnny387@gmail.com', date: '1st March, 2024', from: '08:00pm', to: '09:00pm', statusLabel: 'Confirmed' },
     { name: 'Ethan Phillips', email: 'phillipsh76@gmail.com', date: '3rd March, 2024', from: '09:30pm', to: '10:30pm', statusLabel: 'Pending'},
    { name: 'Oliver Richardson', email: 'richardson22@gmail.com', date: '1st March, 2024', from: '08:00pm', to: '09:00pm', statusLabel: 'Confirmed' },
    { name: 'Ayomide Adekoya', email: 'ayade409@gmail.com', date: '1st March, 2024', from: '08:00pm', to: '09:00pm', statusLabel: 'Confirmed' },
    { name: 'Emeka Okafor', email: 'okaforemeka97@gmail.com', date: '1st March, 2024', from: '08:00pm', to: '09:00pm', statusLabel: 'Pending'},
    { name: 'Oluwatobi Ogunnaike', email: 'tobio189@gmail.com', date: '1st March, 2024', from: '08:00pm', to: '09:00pm', statusLabel: 'Pending'},
    { name: 'Sofia Gonzalez', email: 'sofiag@gmail.com', date: '1st March, 2024', from: '08:00pm', to: '09:00pm', statusLabel: 'Declined'},
    { name: 'Adanna Okafor', email: 'ada4334@gmail.com', date: '1st March, 2024', from: '08:00pm', to: '09:00pm', statusLabel: 'Declined'},
     { name: 'Briject Willy', email: 'briwilly120@gmail.com', date: '3rd March, 2024', from: '09:30pm', to: '10:30pm', statusLabel: 'Pending'},
    { name: 'Aliyah Rahman', email: 'aliyahrahman@gmail.com', date: '1st March, 2024', from: '08:00pm', to: '09:00pm', statusLabel: 'Confirmed' },
    { name: 'Funmilayo Balogun', email: 'balogunfunmi@gmail.com', date: '1st March, 2024', from: '08:00pm', to: '09:00pm', statusLabel: 'Confirmed' },
    { name: 'Nneka Okoli', email: 'nnekaokoli@gmail.com', date: '1st March, 2024', from: '08:00pm', to: '09:00pm', statusLabel: 'Pending'},
    { name: 'Adeola Ogunyele', email: 'adeolaogunleye@gmail.com', date: '1st March, 2024', from: '08:00pm', to: '09:00pm', statusLabel: 'Pending'},
    { name: 'Chioma Okeke', email: 'chiiioma@gmail.com', date: '1st March, 2024', from: '08:00pm', to: '09:00pm', statusLabel: 'Confirmed' },
    { name: 'Osinachi Uzochukwu', email: '0sinachh65@gmail.com', date: '1st March, 2024', from: '08:00pm', to: '09:00pm', statusLabel: 'Declined'},
     { name: 'François Lefèvre', email: 'franccois567@gmail.com', date: '1st March, 2024', from: '08:00pm', to: '09:00pm', statusLabel: 'Pending'},
    { name: 'Layla Hussain', email: 'laylahussain@gmail.com', date: '1st March, 2024', from: '08:00pm', to: '09:00pm', statusLabel: 'Pending'},
    { name: 'Amélie Martin', email: 'martin@gmail.com', date: '1st March, 2024', from: '08:00pm', to: '09:00pm', statusLabel: 'Confirmed' },
    { name: 'Aisha Malik', email: 'aishamalik@gmail.com', date: '1st March, 2024', from: '08:00pm', to: '09:00pm', statusLabel: 'Confirmed' },
     { name: 'Ifeoma Okonkwo', email: 'ifyokonkwo876@yahoo.com', date: '1st March, 2024', from: '08:00pm', to: '09:00pm', statusLabel: 'Pending'},
    { name: 'Omar Abdullah', email: 'omarabdullah620@gmail.com', date: '1st March, 2024', from: '08:00pm', to: '09:00pm', statusLabel: 'Pending'},
    { name: 'Ethan Taylor', email: 'ethantaylor@gmail.com', date: '1st March, 2024', from: '08:00pm', to: '09:00pm', statusLabel: 'Confirmed' },
    { name: 'Ngozi Obi', email: 'obin@gmail.com', date: '1st March, 2024', from: '08:00pm', to: '09:00pm', statusLabel: 'Declined'},
    // Add more bookings as needed
  ];

 // Calculate the index range of bookings to display on the current page
const startIndex = (currentPage - 1) * bookingsPerPage;
const endIndex = Math.min(startIndex + bookingsPerPage, bookings.length);
const displayedBookings = bookings.slice(startIndex, endIndex).filter(booking => {
  if (filter === 'All') return true;
  else if (filter === 'Upcoming') return booking.statusLabel === 'Pending' || booking.statusLabel === 'Confirmed';
  else if (filter === 'Declined') return booking.statusLabel === 'Declined';
});


const getStatusColor = (statusLabel) => {
  switch (statusLabel) {
    case 'Pending':
      return { label: statusLabel, color: '#FFFCE2', textColor: '#FF961A' };
    case 'Confirmed':
      return { label: statusLabel, color: '#EBFFE3', textColor: '#206C00' };
    case 'Declined':
      return { label: statusLabel, color: '#FFE8E3', textColor: '#C60101' };
    default:
      return { label: statusLabel, color: '#FFF', textColor: '#000' }; // Default colors
  }
};

// Function to render bookings
const renderBookings = () => {
  return displayedBookings.map((booking, index) => (
    <BookingItem
      key={index}
      name={booking.name}
      email={booking.email}
      date={booking.date}
      from={booking.from}
      to={booking.to}
       status={getStatusColor(booking.statusLabel)}
    />
  ));
};

  // Function to handle pagination
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

 // Function to handle filter change
  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
    setCurrentPage(1); // Reset page to 1 when filter changes
  };


  // Generate page numbers for pagination
  const totalPages = Math.ceil(bookings.length / bookingsPerPage);
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }
  const [fontsLoaded]=useFonts({
    'Roboto-Light':require("../assets/fonts/Roboto-Light.ttf"),
  })
  const {t}=useTranslation()
  return (
    <View style={{ flex: 1 }}>
      <Topbar />
      <View style={{ flexDirection: 'row', flex: 1 }}>
        <Sidebar />
    <View style={{flex: 1, flexDirection: 'column', marginLeft: 300, marginTop: 5 }}>
    <View style={{ flexDirection: "row", alignItems: "flex-start", paddingHorizontal: 10, marginTop: 15 }}>
              <TouchableOpacity onPress={() => handleFilterChange('All')}><Text style={{ fontWeight: "bold", fontSize: 14, color: "#206C00" }}>{t("All Bookings")}</Text></TouchableOpacity>
            <TouchableOpacity onPress={() => handleFilterChange('Upcoming')}><Text style={{ fontSize: 14, marginLeft: 35,fontFamily:"Roboto-Light" }}>{t("Upcoming")}</Text></TouchableOpacity>
               <TouchableOpacity onPress={() => handleFilterChange('Declined')}><Text style={{ fontSize: 14, marginLeft: 35,fontFamily:"Roboto-Light" }}>{t("Declined")}</Text></TouchableOpacity>
            </View>

            <View style={{ flexDirection: "row", alignItems: "center", marginTop: 15, marginBottom: 20, flexWrap: "wrap" }}>
              <View style={{ justifyContent: "center", paddingHorizontal: 10, paddingVertical: 8, borderRadius: 5, borderWidth: 1, borderColor: "#206C00", backgroundColor: "#d3f9d8" }}>
                <Text style={{ fontSize: 14, color: "#206C00",fontFamily:"Roboto-Light" }}>{t("Civil Engineer")}</Text>
              </View>
              <View style={{ justifyContent: "center", paddingHorizontal: 10, paddingVertical: 8, borderRadius: 5, borderWidth: 1, borderColor: "#206C00", backgroundColor: "#d3f9d8", marginLeft: 4, marginRight: 4 }}>
                <Text style={{ fontSize: 14, color: "#206C00",fontFamily:"Roboto-Light" }}>{t("Architect")}</Text>
              </View>
              <View style={{ justifyContent: "center", paddingHorizontal: 10, paddingVertical: 8, borderRadius: 5, borderWidth: 1, borderColor: "#206C00", backgroundColor: "#d3f9d8", marginLeft: 4, marginRight: 4 }}>
                <Text style={{ fontSize: 14, color: "#206C00" }}>{t("Surveyor")}</Text>
              </View>
              <View style={{ justifyContent: "center", paddingHorizontal: 10, paddingVertical: 8, borderRadius: 5, borderWidth: 1, borderColor: "#206C00", backgroundColor: "#d3f9d8", marginLeft: 4, marginRight: 4 }}>
                <Text style={{ fontSize: 14, color: "#206C00",fontFamily:"Roboto-Light" }}>{t("Constructor")}</Text>
              </View>
              <View style={{ justifyContent: "center", alignItems: "center", marginLeft: 4, paddingHorizontal: 10, paddingVertical: 8, borderRadius: 8, borderWidth: 1, borderColor: "#206C00", backgroundColor: "#d3f9d8" }}>
                <Text style={{ fontSize: 14, color: "#206C00",fontFamily:"Roboto-Light" }}>+</Text>
              </View>
            </View>

       
<View style={{ flex: 1, width: 1000, marginTop: 15 }}>
  {/* Table Header */}
  <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderBottomWidth: 1, borderBottomColor: '#CCC', paddingBottom: 8 }}>
    <Text style={{ fontWeight: 'bold', flex: 2,fontFamily:"Roboto-Light" }}>{t("Name")}</Text>
    <Text style={{ fontWeight: 'bold', flex: 1,fontFamily:"Roboto-Light" }}>{t("Date")}</Text>
    <Text style={{ fontWeight: 'bold', flex: 1,fontFamily:"Roboto-Light" }}>{t("From")}</Text>
    <Text style={{ fontWeight: 'bold', flex: 1,fontFamily:"Roboto-Light" }}>{t("To")}</Text>
    <Text style={{ fontWeight: 'bold', flex: 1, marginRight: 25,fontFamily:"Roboto-Light" }}>{t("Status")}</Text>
  </View>

  {/* Displayed Bookings */}
  {renderBookings()}
</View>

       
      

       <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 10, marginBottom: 20, marginLeft: -520 }}>
  {pageNumbers.map((pageNumber, index) => (
    <TouchableOpacity
      key={index}
      onPress={() => handlePageChange(pageNumber)}
      style={{
        paddingHorizontal: 15, 
        paddingVertical: 5,
        marginHorizontal: 8, 
        borderWidth: pageNumber === currentPage ? 1 : 0,
        borderRadius: pageNumber === currentPage ? 4 : 20,
        borderColor: pageNumber === currentPage ? '#206C00' : '#CCC', 
        backgroundColor: pageNumber === currentPage ? '#d3f9d8' : '#FFF',
      }}>
      <Text style={{ color: pageNumber === currentPage ? '#206C00' : '#CCC',fontFamily:"Roboto-Light" }}>{pageNumber}</Text>
    </TouchableOpacity>
  ))}
</View>



      </View>
      </View>
       </View>
  );
}