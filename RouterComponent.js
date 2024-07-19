import React from 'react';
import { Routes, Route } from 'react-router-dom';
import TermsofService from './components/TermsofService';
import PrivacyPolicy from './components/Privacy Policy';
import Verified from './Experts/Verified';

const RouterComponent = () => {
  return (
    <Routes>
      <Route path="/TermsofService" element={<TermsofService />} />
      <Route path="/PrivacyPolicy" element={<PrivacyPolicy />} />
      <Route path="/Verified" element={<Verified />} />
      {/* Add more routes as needed */}
    </Routes>
  );
};

export default RouterComponent;
