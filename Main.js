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
import JoinCourse from './Jobseekers/CourseVideo';
import AIindv1 from './Jobseekers/SkillanalysisAI';
import AIindv2 from './Jobseekers/AI2';
import AIindv3 from './Jobseekers/AI3';
import AIindv4 from "./Jobseekers/Skillanalysisresult";
import AI from './LandingPage/AI';
import Clientele from './LandingPage/Clientele';
import mobile from './MobileLanding.js/LandingHome';
import mobileAI from './MobileLanding.js/AI';
import GeneralSignin from './components/Signin';
import BlankScreen from './components/BlankScreen';
import Project from './Jobseekers/Scenario Project';
import ExpertAnalysis from './Jobseekers/ExpertAnalysis';
import ExpertRoadmap from './Jobseekers/ExpertAnalysisG';
import AiAnalysis from './Jobseekers/Aianalysis';
import Scenario from './Experts/Scenario';
import MainMessage from './Messaging/ChatScopeUI';
import MainExpertMessage from './Messaging/ExpertsChatScopeUI';
import MyCourse from './Jobseekers/MyCourses';
import ContactSales from "./Screens/ContactSales";
import AIScreen from "./Screens/AIscreen";
import Welcome from "./Screens/LandingHome";
import SignIn2 from "./Screens/SignIn";
import SignUp2 from "./Screens/SignUp";
import Skillanalysis from "./Screens/Skillanalysis";
import Individual from "./Screens/Individual";
import Community from "./Screens/Community";
import Business from "./Screens/Business";
import Pricing from "./Screens/Pricing";
import Reset from './components/ResetPassword';
import Tickets from './Jobseekers/Tickets';
import AllTickets from './Experts/AllTickets';
import Response from './Experts/TicketsResponse';
import PastSessions from './Jobseekers/CourseVideo';
import RateMeeting from './Jobseekers/RatingExpert';
import RateExpert from './Experts/RateMeeting';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';



const App = () => {
  const { width } = Dimensions.get('window');
  const initialRoute = width < 600 ? "/mobile" : "/welcome";

  return (
    <Router>
      <Routes>
        {/* Redirect to initial route */}
        <Route path="*" element={<Navigate to={initialRoute} />} />

         <Route path="/" element={<Navigate to="/welcome" />} />
        <Route path="/welcome" element={<Welcome />} />
        <Route path="/join-recruitangle" element={<JoinAs />} />
        <Route path="/anglequest-ai" element={<AIScreen />} />
        <Route path="/sign-in" element={<SignIn2 />} />
        <Route path="/sign-up" element={<SignUp2 />} />
        <Route path="/contact-sales" element={<ContactSales />} />
        <Route path="/home-experts" element={<Homepage />} />
        <Route path="/home-individuals" element={<Home />} />
        <Route path="/join-courses" element={<JoinCourse />} />
        <Route path="/my-courses" element={<MyCourse />} />
         <Route path="/growth-plan-sessions" element={<AllGrowthPlan />} />
         <Route path="/growth-plan-new" element={<NewGrowthPlan />} />
        <Route path="/growth-plan-offer" element={<GrowthOffer />} />
         <Route path="/growth-plan-payment" element={<growthPaymentPage />} />
         <Route path="/interview-sessions" element={<AllInterviews />} />
        <Route path="/interview-new" element={<NewInterview />} />
        <Route path="/interview-offer" element={<InterviewOffer />} />
         <Route path="/interview-payment" element={<PaymentPage />} />
         <Route path="/coaching-hub-sessions" element={<AllcoachingHubs />} />
        <Route path="/coaching-hub-new" element={<CoachingHubs />} />
         <Route path="/hub-offer" element={<HubOffer />} />
         <Route path="/hub-payment" element={<hubPaymentPage />} />
         <Route path="/skill-analysis-sessions" element={<AdviceSessions />} />
        <Route path="/skill-analysis-new" element={<NewAdvice />} />
        <Route path="/skill-analysis-offer" element={<AdviceOffer />} />
        <Route path="/skill-analysis-payment" element={<PaymentPageadvice />} />
        <Route path="/performance" element={<MyPerformance />} />
        <Route path="/chat" element={<MainMessage />} />
        <Route path="/project" element={<Project />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/account-settings" element={<AccountSettings />} />
        <Route path="/change-password" element={<ResetPassword />} />
        <Route path="/password" element={<Password />} />
         <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/notification-settings" element={<NotificationSettings />} />
        <Route path="/billings-payment" element={<BillingsandPayment />} />
         <Route path="/profile" element={<MyProfile />} />
         <Route path="/ai-result" element={<AIindv4 />} />
        <Route path="/preferences" element={<Offers />} />
         <Route path="/interview" element={<Interview />} />
         <Route path="/growth-plan" element={<GrowthPlan />} />
         <Route path="/skill-analysis" element={<Advice />} />
         <Route path="/hubs" element={<AllHubs />} />
         <Route path="/scenario-project" element={<Scenario />} />
        <Route path="/chats" element={<MainExpertMessage />} />
         <Route path="/expert-profile" element={<Profile />} />
        <Route path="/withdrawal" element={<Withdrawal />} />
        <Route path="/experts-notifications" element={<MyNotifications />} />
        <Route path="/account-setup" element={<AccountSetup />} />
        <Route path="/password-setup" element={<Password />} />
        <Route path="/notification-setup" element={<NotificationSetup />} />
        <Route path="/earnings" element={<Earnings />} />
        <Route path="/all-hubs" element={<MyHubs />} />
         <Route path="/verify-email" element={<VerifyEmail />} />
        <Route path="/verify-mail" element={<Verifymail />} />
        <Route path="/individual" element={<Individual />} />
        <Route path="/community" element={<Community />} />
        <Route path="/business" element={<Business />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/reset-password" element={<Reset  />} />
         <Route path="/expert-analysis" element={<ExpertAnalysis  />} />
         <Route path="/ai-analysis" element={<AiAnalysis  />} />
         <Route path="/expert-roadmap" element={<ExpertRoadmap />} />
         <Route path="/support-request" element={<Tickets />} />
         <Route path="/all-tickets" element={<AllTickets />} />
         <Route path="/response" element={<Response />} />
        <Route path="/past-sessions" element={<PastSessions />} />
        <Route path="/rate-meeting" element={<RateMeeting />} />
        <Route path="/rate-progress" element={<RateExpert />} />
        <Route path="/business-home" element={<HomeRecruit />} />
         <Route path="/employees" element={<Employees />} />
        <Route path="/managers" element={<Managers />} />
        <Route path="/schedules" element={<Schedules />} />
        <Route path="/employee-performance" element={<Performance />} />
        <Route path="/interview-candidates" element={<InterviewCandidates />} />
        <Route path="/booked-interviews" element={<BookedInterview />} />
        <Route path="/coach" element={<Coach />} />
        <Route path="/teams" element={<Teams />} />
        <Route path="/business-subscription" element={<Subscription />} />
        <Route path="/analytics" element={<Analytics />} />
         <Route path="/about-skill-analysis" element={<Skillanalysis />} />
      </Routes>
    </Router>
  );
};

export default App;