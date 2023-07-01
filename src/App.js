import React, { useState } from 'react';
import './App.css';
import OnboardingPage from './OnboardingPage';
import HospitalSearch from './HospitalSearch';
import UserProfileForm from './UserProfileForm';

function App() {
  const [showOnboarding, setShowOnboarding] = useState(true);
  const [showUserProfileForm, setShowUserProfileForm] = useState(false);

  const handleGoToHospitalSearch = () => {
    setShowOnboarding(false);
    setShowUserProfileForm(false);
  };

  const handleGoToUserProfileForm = () => {
    setShowOnboarding(false);
    setShowUserProfileForm(true);
  };

  return (
    <div
      className="App"
      style={{
      //  backgroundImage: `url(${process.env.PUBLIC_URL}/background.jpg)`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {showOnboarding && !showUserProfileForm && (
        <OnboardingPage goToHospitalSearch={handleGoToHospitalSearch} />
      )}
      {!showOnboarding && !showUserProfileForm && (
        <HospitalSearch goToUserProfileForm={handleGoToUserProfileForm} />
      )}
      {showUserProfileForm && <UserProfileForm />}
    </div>
  );
}

export default App;
