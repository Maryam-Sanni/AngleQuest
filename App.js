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
import TermsofService from './components/TermsofService';
import PrivacyPolicy from './components/Privacy Policy';
import ManageHubs from './Experts/ManageHub';
import Profile from './Experts/MyProfile';
import RejectSession from './Experts/RejectSession';
import JobseekersProfile from './Experts/JobseekerProfile';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="JoinAs" screenOptions={{ headerShown: false, cardStyle: { backgroundColor: 'white' } }}>
        <Stack.Screen name="Welcome" component={JoinAs} />
        <Stack.Screen name="Sign Up" component={SignUp} />
        <Stack.Screen name="Verify Email" component={VerifyEmail} />
        <Stack.Screen name="Choose Plan" component={ChoosePlan} />
        <Stack.Screen name="Basic Details" component={BasicDetails} />
        <Stack.Screen name="Experience" component={EduAndWork} />
        <Stack.Screen name="Job Preferences" component={RolesAndCountries} />
        <Stack.Screen name="Socials and address" component={SocialsAndAddress} />
        <Stack.Screen name="Signin" component={Signin} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Dashboard" component={Dashboard} />
        <Stack.Screen name="Jobs" component={Jobs} />
        <Stack.Screen name="Experts" component={Experts} />
        <Stack.Screen name="Sessions" component={Sessions} />
        <Stack.Screen name="Feedbacks" component={Feedbacks} />
        <Stack.Screen name="Coaching Hubs" component={CoachingHubs} />
        <Stack.Screen name="Messages" component={Messages} />
        <Stack.Screen name="Notifications" component={Notifications} />
        <Stack.Screen name="Notification Settings" component={NotificationSettings} />
        <Stack.Screen name="Account Settings" component={AccountSettings} />
        <Stack.Screen name="Billings and Payment" component={BillingsandPayment} />
        <Stack.Screen name="Reset Password" component={ResetPassword} />
        <Stack.Screen name="My Profile" component={MyProfile} />
        <Stack.Screen name="Payment Details" component={PaymentDetails} />
        <Stack.Screen name="Forgot Password" component={ForgotPassword} />
        <Stack.Screen name="Refer" component={Refer} />
        <Stack.Screen name="GetStarted" component={GetStarted} />
        <Stack.Screen name="ExpertProfile" component={ExpertProfile} />
        <Stack.Screen name="BookaSession" component={BookaSession} />
        <Stack.Screen name="SendFeedback" component={SendFeedback} />
        <Stack.Screen name="ViewFeedback" component={ViewFeedback} />
        <Stack.Screen name="Create account" component={Createaccount} />
        <Stack.Screen name="Basic Details-Experts" component={About} />
        <Stack.Screen name="Verify mail" component={Verifymail} />
        <Stack.Screen name="Contact Details" component={ContactDetails} />
        <Stack.Screen name="Home - Experts" component={Homepage} />
        <Stack.Screen name="Dashboard - Experts" component={DashBoard} />
        <Stack.Screen name="All Sessions" component={AllSessions} />
        <Stack.Screen name="Give feedback" component={Givefeedback} />
        <Stack.Screen name="Messaging" component={Messaging} />
        <Stack.Screen name="Account Setup" component={AccountSetup} />
        <Stack.Screen name="MyNotifications" component={MyNotifications} />
        <Stack.Screen name="Password" component={Password} />
        <Stack.Screen name="Notification Setup" component={NotificationSetup} />
        <Stack.Screen name="Withdrawal Setup" component={WithdrawalSetup} />
        <Stack.Screen name="RequestPayout" component={RequestPayout} />
        <Stack.Screen name="Terms of Service" component={TermsofService} />
        <Stack.Screen name="Privacy Policy" component={PrivacyPolicy} />
        <Stack.Screen name="Manage Hubs" component={ManageHubs} />
        <Stack.Screen name="Reject Session" component={RejectSession} />
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="Jobseekers Profile" component={JobseekersProfile} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
