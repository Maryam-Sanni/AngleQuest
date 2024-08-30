import React, { useEffect, useRef, useState } from 'react';
import 'react-native-gesture-handler'
import { Dimensions, Platform, Linking } from 'react-native';
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
import CoachingHubs from './Jobseekers/Hub';
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
import ExpertSignin from './Experts/Signin';
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
import Profile from './Experts/MyProfile';
import RejectSession from './Experts/RejectSession';
import JobseekersProfile from './Experts/JobseekerProfile';
import PersonalDev from './Jobseekers/PersonalDev';
import TeamDev from './Jobseekers/TeamDev';
import OrgDev from './Jobseekers/OrgDev';
import CoachReview from './Jobseekers/CoachReview';
import Interview from './Experts/Interview';
import GrowthPlan from './Experts/GrowthPlan';
import Advice from './Experts/Advice';
import Offers from './Experts/Offers';
import Bids from './Experts/Bids';
import MyHubs from './Experts/MyHubs';
import AllHubs from './Experts/AllHubs';
import Createhubform from './components/Createhubform';
import Earnings from './Experts/Earnings';
import Withdrawal from './Experts/Withdrawal';
import NewGrowthPlan from './Jobseekers/GrowthPlan';
import AllGrowthPlan from './Jobseekers/AllGrowthPlans';
import NewInterview from './Jobseekers/Interview';
import AllInterviews from './Jobseekers/AllInterviews';
import PaymentPage from './Jobseekers/PaymentPage'; 
import growthPaymentPage from './Jobseekers/PaymentPageGrowth';
import hubPaymentPage from './Jobseekers/PaymentPageHubs';
import AllcoachingHubs from './Jobseekers/AllHubs';
import NewAdvice from './Jobseekers/Advice';
import PaymentPageadvice from './Jobseekers/PaymentPageAdvice';
import AdviceSessions from './Jobseekers/AdviceSessions';
import PaymentOffer from './Jobseekers/PaymentOffer';
import SkipOffer from './Jobseekers/SkipOffer';
import HomeRecruit from './Recruiters/Home';
import Begin from './Recruiters/Begin';
import VerifyAccount from './Recruiters/VerifyAccount';
import Employees from './Recruiters/Employees';
import Managers from './Recruiters/Managers';
import Schedules from './Recruiters/Schedules';
import Performance from './Recruiters/Performance';
import InterviewCandidates from './Recruiters/StartInterviews';
import BookedInterview from './Recruiters/InterviewPage';
import Coach from './Recruiters/Coach';
import Teams from './Recruiters/Teams';
import Subscription from './Recruiters/Subscription';
import Analytics from './Recruiters/Analytics';
import HomeManager from './Coach/Home';
import EmployeeManager from './Coach/Employees';
import EmployeePerformance from './Coach/Performance';
import Meetings from './Coach/AllMeetings';
import AllMessages from './Coach/Messages';
import Targets from './Coach/Targets';
import AccountSet from './Recruiters/AccountSetup';
import NotificationsSet from './Recruiters/NotificationSetup';
import PasswordSet from './Recruiters/Password';
import BusinessProfile from './Recruiters/MyProfile';
import MyPerformance from './Jobseekers/Performance';
import AdviceOffer from './Jobseekers/OfferAdvice';
import GrowthOffer from './Jobseekers/OfferGrowth';
import InterviewOffer from './Jobseekers/OfferInterview';
import HubOffer from './Jobseekers/OfferHub';
import JoinCourse from './Jobseekers/JoinCourses';
import AIindv1 from './Jobseekers/SkillanalysisAI';
import AIindv2 from './Jobseekers/AI2';
import AIindv3 from './Jobseekers/AI3';
import AIindv4 from "./Jobseekers/Skillanalysisresult";
import Welcome from './LandingPage/LandingHome';
import AI from './LandingPage/AI';
import Clientele from './LandingPage/Clientele';
import mobile from './MobileLanding.js/LandingHome';
import mobileAI from './MobileLanding.js/AI';
import GeneralSignin from './components/Signin';
import BlankScreen from './components/BlankScreen';

const Stack = createStackNavigator();

const App = () => {
  const { width } = Dimensions.get('window');
  const initialRouteName = width < 600 ? 'mobile' : 'Welcome'; 

  return (
    <NavigationContainer>
    <Stack.Navigator initialRouteName={initialRouteName} screenOptions={{ headerShown: false, cardStyle: { backgroundColor: 'white' } }}>
        <Stack.Screen name="Join Recruitangle" component={JoinAs} />
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
        <Stack.Screen name="Sign in" component={ExpertSignin} />
        <Stack.Screen name="ExpertProfile" component={ExpertProfile} />
        <Stack.Screen name="BookaSession" component={BookaSession} />
        <Stack.Screen name="SendFeedback" component={SendFeedback} />
        <Stack.Screen name="ViewFeedback" component={ViewFeedback} />
        <Stack.Screen name="Create account" component={Createaccount} />
        <Stack.Screen name="Basic Details-Experts" component={About} />
        <Stack.Screen name="Verify mail" component={Verifymail} />
        <Stack.Screen name="TermsofService" component={TermsofService} />
        <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicy} />
        <Stack.Screen name="Contact Details" component={ContactDetails} />
        <Stack.Screen name="Home - Experts" component={Homepage} />
        <Stack.Screen name="Dashboard - Experts" component={DashBoard} />
        <Stack.Screen name="All Sessions" component={AllSessions} />
        <Stack.Screen name="Give feedback" component={Givefeedback} />
        <Stack.Screen name="Messaging" component={Messaging} />
        <Stack.Screen name="Account Setup" component={AccountSetup} />
        <Stack.Screen name="My Notifications" component={MyNotifications} />
        <Stack.Screen name="Password" component={Password} />
        <Stack.Screen name="Notification Setup" component={NotificationSetup} />
        <Stack.Screen name="Withdrawal Setup" component={WithdrawalSetup} />
        <Stack.Screen name="RequestPayout" component={RequestPayout} />
        <Stack.Screen name="Reject Session" component={RejectSession} />
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="Jobseekers Profile" component={JobseekersProfile} />
        <Stack.Screen name="Personal Development" component={PersonalDev} />
        <Stack.Screen name="Team Development" component={TeamDev} />
        <Stack.Screen name="Organization Development" component={OrgDev} />
        <Stack.Screen name="Coach Assessment" component={CoachReview} />
        <Stack.Screen name="Interview" component={Interview} />
        <Stack.Screen name="Growth Plan" component={GrowthPlan} />
        <Stack.Screen name="Advice" component={Advice} />
        <Stack.Screen name="Offers" component={Offers} />
        <Stack.Screen name="Bids" component={Bids} />
        <Stack.Screen name="All Hubs" component={MyHubs} />
        <Stack.Screen name="Manage Hubs" component={AllHubs} />
        <Stack.Screen name="Create Hub" component={Createhubform} />
        <Stack.Screen name="Earnings" component={Earnings} />
        <Stack.Screen name="Withdrawal" component={Withdrawal} />
        <Stack.Screen name="New Growth Plan" component={NewGrowthPlan} />
        <Stack.Screen name="Growth Plan Sessions" component={AllGrowthPlan} />
        <Stack.Screen name="New Interview" component={NewInterview} />
        <Stack.Screen name="Interview Sessions" component={AllInterviews} />
        <Stack.Screen name="Interview Payment" component={PaymentPage} />
        <Stack.Screen name="Growth Plan Payment" component={growthPaymentPage} />
        <Stack.Screen name="Hubs Payment" component={hubPaymentPage} />
        <Stack.Screen name="Coaching Hub Sessions" component={AllcoachingHubs} />
        <Stack.Screen name="New Advice" component={NewAdvice} />
        <Stack.Screen name="Advice Payment" component={PaymentPageadvice} />
        <Stack.Screen name="Advice Sessions" component={AdviceSessions} />
        <Stack.Screen name="Your Offer" component={PaymentOffer} />
        <Stack.Screen name="Skip Offer" component={SkipOffer} />
        <Stack.Screen name="Home - Corporate" component={HomeRecruit} />
        <Stack.Screen name="Sign Up - Corporate" component={Begin} />
        <Stack.Screen name="Verify Account" component={VerifyAccount} />
        <Stack.Screen name="Employees" component={Employees} />
        <Stack.Screen name="Managers" component={Managers} />
        <Stack.Screen name="Schedules" component={Schedules} />
        <Stack.Screen name="Performance" component={Performance} />
        <Stack.Screen name="Interview Candidates" component={InterviewCandidates} />
        <Stack.Screen name="Booked Interviews" component={BookedInterview} />
        <Stack.Screen name="Coach" component={Coach} />
        <Stack.Screen name="Teams" component={Teams} />
        <Stack.Screen name="Subscription" component={Subscription} />
        <Stack.Screen name="Home - Manager" component={HomeManager} />
        <Stack.Screen name="Manage Employees" component={EmployeeManager} />
        <Stack.Screen name="Manage Performance" component={EmployeePerformance} />
        <Stack.Screen name="Meetings" component={Meetings} />
        <Stack.Screen name="All Messages" component={AllMessages} />
        <Stack.Screen name="Targets" component={Targets} />
        <Stack.Screen name="Analytics" component={Analytics} />
        <Stack.Screen name="Account Set" component={AccountSet} />
        <Stack.Screen name="Notifications Set" component={NotificationsSet} />
        <Stack.Screen name="Password Set" component={PasswordSet} />
        <Stack.Screen name="Business Profile" component={BusinessProfile} />
        <Stack.Screen name="My Performance" component={MyPerformance} />
        <Stack.Screen name="Advice Offer" component={AdviceOffer} />
        <Stack.Screen name="Growth Offer" component={GrowthOffer} />
        <Stack.Screen name="Interview Offer" component={InterviewOffer} />
        <Stack.Screen name="Hub Offer" component={HubOffer} />
        <Stack.Screen name="Welcome" component={Welcome} />
        <Stack.Screen name="AngleQuest Client Testimonials" component={Clientele} />
        <Stack.Screen name="mobile" component={mobile} />
        <Stack.Screen name="AI" component={AI} />
        <Stack.Screen name="Use AI" component={AIindv1} />
      <Stack.Screen name="Use CV" component={AIindv2} />
      <Stack.Screen name="Use Questionnaire" component={AIindv3} />
      <Stack.Screen name="AI Result" component={AIindv4} />
        <Stack.Screen name="Anglequest AI" component={mobileAI} />
        <Stack.Screen name="Sign in to AngleQuest" component={GeneralSignin} />
       <Stack.Screen name="anglequest" component={BlankScreen} />
      <Stack.Screen name="Join Courses" component={JoinCourse} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};



export default App;