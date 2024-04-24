import React from 'react';
import { View } from 'react-native';
import 'react-native-gesture-handler'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import JoinAs from './Jobseekers/Joinas';
import SignUp from './Jobseekers/SignUp';
import VerifyEmail from './Jobseekers/VerifyEmail';
import ChoosePlan from './Jobseekers/ChoosePlan';
import BasicDetails from './Jobseekers/BasicDetails';
import EduAndWork from './Jobseekers/EduAndWork';
import RolesAndCountries from './Jobseekers/RolesAndCountries';
import SocialsAndAddress from './Jobseekers/SocialsAndAddress';
import Signin from './Jobseekers/Signin';
import Home from './Jobseekers/Home';
import Dashboard from './Jobseekers/Dashboard';
import Jobs from './Jobseekers/JobsTopSearch';
import Experts from './Jobseekers/AllExperts';
import Sessions from './Jobseekers/Allsessions';
import Feedbacks from './Jobseekers/Feedbacks';
import CoachingHubs from './Jobseekers/CoachingHubs';
import Messages from './Jobseekers/Messages';
import Notifications from './Jobseekers/Notifications';
import NotificationSettings from './Jobseekers/NotificationSettings';
import AccountSettings from './Jobseekers/AccountSettings';
import BillingsandPayment from './Jobseekers/Billingsandpayment';
import ResetPassword from './Jobseekers/ResetPassword';
import ForgotPassword from './Jobseekers/ForgotPassword';
import MyProfile from './Jobseekers/MyProfile';
import PaymentDetails from './Jobseekers/PaymentDetails';
import Refer from './Jobseekers/tellafriend';
import GetStarted from './Jobseekers/getstarted';
import ExpertProfile from './Jobseekers/Expertsprofile';
import BookaSession from './Jobseekers/BookaSession';
import SendFeedback from './Jobseekers/SendFeedback';
import ViewFeedback from './Jobseekers/ReceivedFeedbacks';
import Createaccount from './Experts/Experts-SignUp';
import About from './Experts/ExpertsDetails';
import Verifymail from './Experts/Verifymail';
import ContactDetails from './Experts/ContactDetails';
import Homepage from './Experts/HomePage';
import DashBoard from './Experts/Experts-Dashboard';
import AllSessions from './Experts/AllBookings';
import Givefeedback from './Experts/Feedbacks';
import Messaging from './Experts/Messages';
import AccountSetup from './Experts/AccountSetup';
import MyNotifications from './Experts/Notify';
import Password from './Experts/Password';
import NotificationSetup from './Experts/NotificationSetup';
import WithdrawalSetup from './Experts/WithdrawalSetup';
import RequestPayout from './Experts/RequestPayout';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="JoinAs" screenOptions={{ headerShown: false, cardStyle: { backgroundColor: 'white' } }}>
        <Stack.Screen name="Welcome" component={JoinAs} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="VerifyEmail" component={VerifyEmail} />
        <Stack.Screen name="ChoosePlan" component={ChoosePlan} />
        <Stack.Screen name="BasicDetails" component={BasicDetails} />
        <Stack.Screen name="EduAndWork" component={EduAndWork} />
        <Stack.Screen name="RolesAndCountries" component={RolesAndCountries} />
        <Stack.Screen name="SocialsAndAddress" component={SocialsAndAddress} />
        <Stack.Screen name="Signin" component={Signin} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Dashboard" component={Dashboard} />
        <Stack.Screen name="Jobs" component={Jobs} />
        <Stack.Screen name="Experts" component={Experts} />
        <Stack.Screen name="Sessions" component={Sessions} />
        <Stack.Screen name="Feedbacks" component={Feedbacks} />
        <Stack.Screen name="CoachingHubs" component={CoachingHubs} />
        <Stack.Screen name="Messages" component={Messages} />
        <Stack.Screen name="Notifications" component={Notifications} />
        <Stack.Screen name="NotificationSettings" component={NotificationSettings} />
        <Stack.Screen name="AccountSettings" component={AccountSettings} />
        <Stack.Screen name="BillingsandPayment" component={BillingsandPayment} />
        <Stack.Screen name="ResetPassword" component={ResetPassword} />
        <Stack.Screen name="MyProfile" component={MyProfile} />
        <Stack.Screen name="PaymentDetails" component={PaymentDetails} />
        <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
        <Stack.Screen name="Refer" component={Refer} />
        <Stack.Screen name="GetStarted" component={GetStarted} />
        <Stack.Screen name="ExpertProfile" component={ExpertProfile} />
        <Stack.Screen name="BookaSession" component={BookaSession} />
        <Stack.Screen name="SendFeedback" component={SendFeedback} />
        <Stack.Screen name="ViewFeedback" component={ViewFeedback} />
        <Stack.Screen name="Createaccount" component={Createaccount} />
        <Stack.Screen name="About" component={About} />
        <Stack.Screen name="Verifymail" component={Verifymail} />
        <Stack.Screen name="ContactDetails" component={ContactDetails} />
        <Stack.Screen name="Homepage" component={Homepage} />
        <Stack.Screen name="DashBoard" component={DashBoard} />
        <Stack.Screen name="AllSessions" component={AllSessions} />
        <Stack.Screen name="Givefeedback" component={Givefeedback} />
        <Stack.Screen name="Messaging" component={Messaging} />
        <Stack.Screen name="AccountSetup" component={AccountSetup} />
        <Stack.Screen name="MyNotifications" component={MyNotifications} />
        <Stack.Screen name="Password" component={Password} />
        <Stack.Screen name="NotificationSetup" component={NotificationSetup} />
        <Stack.Screen name="WithdrawalSetup" component={WithdrawalSetup} />
        <Stack.Screen name="RequestPayout" component={RequestPayout} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
