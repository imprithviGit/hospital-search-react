import React, { useState } from 'react';
import { Button, Box, Typography } from '@mui/material';
import UserProfileForm from './UserProfileForm';

const OnboardingPage = ({ goToHospitalSearch }) => {
  const [showUserProfileForm, setShowUserProfileForm] = useState(false);

  const handleCompleteOnboarding = () => {
    setShowUserProfileForm(true);
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="100vh"
     // background="url('background.jpg')"
      backgroundSize="cover"
      backgroundPosition="center"
    >
      {showUserProfileForm ? (
        <UserProfileForm goToHospitalSearch={goToHospitalSearch} />
      ) : (
        <>
          <Typography variant="h4" gutterBottom>
            Delhi Hospitals
          </Typography>
          <Button variant="contained" color="primary" onClick={handleCompleteOnboarding} size="large" mt={4}>
            Complete Onboarding
          </Button>
          <Box mt={2}>
            <Button variant="contained" color="primary" onClick={goToHospitalSearch} size="large">
              Hospital Search
            </Button>
          </Box>
        </>
      )}
    </Box>
  );
};

export default OnboardingPage;
