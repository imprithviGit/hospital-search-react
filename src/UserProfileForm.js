import React, { useState } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';

const UserProfileForm = () => {
  const [userInfo, setUserInfo] = useState({});
  const [medicalInfo, setMedicalInfo] = useState({});
  const [emergencyContacts, setEmergencyContacts] = useState([]);
  const [currentStep, setCurrentStep] = useState(1);
  const [isConfirmed, setIsConfirmed] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserInfo((prevInfo) => ({
      ...prevInfo,
      [name]: value,
    }));
  };

  const handleMedicalInputChange = (event) => {
    const { name, value } = event.target;
    setMedicalInfo((prevInfo) => ({
      ...prevInfo,
      [name]: value,
    }));
  };

  const handleEmergencyContactInputChange = (event, index) => {
    const { name, value } = event.target;
    setEmergencyContacts((prevContacts) => {
      const updatedContacts = [...prevContacts];
      updatedContacts[index] = { ...updatedContacts[index], [name]: value };
      return updatedContacts;
    });
  };

  const handleAddEmergencyContact = () => {
    if (emergencyContacts.length < 3) {
      setEmergencyContacts((prevContacts) => [...prevContacts, {}]);
    }
  };

  const handleNextStep = () => {
    setCurrentStep((prevStep) => prevStep + 1);
  };

  const handlePreviousStep = () => {
    setCurrentStep((prevStep) => prevStep - 1);
  };

  const handleSubmit = () => {
    // Handle form submission and saving the user's information
    // e.g., send a request to the server to save the data
    setIsConfirmed(true);
  };

  const handleEditInformation = () => {
    setIsConfirmed(false);
    setCurrentStep(1);
  };

  return (
    <Box maxWidth="md" mx="auto" mt={8} p={4}>
      <Typography variant="h5" gutterBottom>
        Onboarding and Profile Page
      </Typography>
      {currentStep === 1 && (
        <Box>
          {/* Step 1: Basic Personal Information */}
          <Typography variant="h6" gutterBottom>
            Step 1: Basic Personal Information
          </Typography>
          {/* Render input fields for name, email, phone number */}
          <TextField
            label="Name"
            variant="outlined"
            name="name"
            value={userInfo.name || ''}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Email"
            variant="outlined"
            name="email"
            value={userInfo.email || ''}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Phone Number"
            variant="outlined"
            name="phoneNumber"
            value={userInfo.phoneNumber || ''}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
            inputProps={{ pattern: '[0-9]{10}', maxLength: 10 }}
            helperText="Please enter a 10-digit phone number"
          />
        </Box>
      )}
      {currentStep === 2 && (
        <Box>
          {/* Step 2: Medical Information */}
          <Typography variant="h6" gutterBottom>
            Step 2: Medical Information
          </Typography>
          {/* Render input fields for allergies, medications, medical conditions */}
          <TextField
            label="Allergies"
            variant="outlined"
            name="allergies"
            value={medicalInfo.allergies || ''}
            onChange={handleMedicalInputChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Current Medications"
            variant="outlined"
            name="medications"
            value={medicalInfo.medications || ''}
            onChange={handleMedicalInputChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Medical Conditions"
            variant="outlined"
            name="conditions"
            value={medicalInfo.conditions || ''}
            onChange={handleMedicalInputChange}
            fullWidth
            margin="normal"
          />
        </Box>
      )}
      {currentStep === 3 && (
        <Box>
          {/* Step 3: Emergency Contact Information */}
          <Typography variant="h6" gutterBottom>
            Step 3: Emergency Contact Information
          </Typography>
          {/* Render input fields for emergency contact information */}
          {emergencyContacts.map((contact, index) => (
            <Box key={index}>
              <TextField
                label={`Emergency Contact ${index + 1}`}
                variant="outlined"
                name="name"
                value={contact.name || ''}
                onChange={(event) => handleEmergencyContactInputChange(event, index)}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Phone Number"
                variant="outlined"
                name="phoneNumber"
                value={contact.phoneNumber || ''}
                onChange={(event) => handleEmergencyContactInputChange(event, index)}
                fullWidth
                margin="normal"
                inputProps={{ pattern: '[0-9]{10}', maxLength: 10 }}
                helperText="Please enter a 10-digit phone number"
              />
            </Box>
          ))}
          {emergencyContacts.length < 3 && (
            <Button variant="outlined" color="primary" onClick={handleAddEmergencyContact}>
              Add Emergency Contact
            </Button>
          )}
        </Box>
      )}
      {currentStep === 4 && (
        <Box>
          {/* Step 4: Review and Confirm */}
          <Typography variant="h6" gutterBottom>
            Step 4: Review and Confirm
          </Typography>
          {/* Display the summary of entered information */}
          <Typography variant="body1" gutterBottom>
            <strong>Name:</strong> {userInfo.name}
          </Typography>
          <Typography variant="body1" gutterBottom>
            <strong>Email:</strong> {userInfo.email}
          </Typography>
          <Typography variant="body1" gutterBottom>
            <strong>Phone Number:</strong> {userInfo.phoneNumber}
          </Typography>
          <Typography variant="body1" gutterBottom>
            <strong>Allergies:</strong> {medicalInfo.allergies}
          </Typography>
          <Typography variant="body1" gutterBottom>
            <strong>Current Medications:</strong> {medicalInfo.medications}
          </Typography>
          <Typography variant="body1" gutterBottom>
            <strong>Medical Conditions:</strong> {medicalInfo.conditions}
          </Typography>
          {emergencyContacts.map((contact, index) => (
            <Typography variant="body1" gutterBottom key={index}>
              <strong>Emergency Contact {index + 1}:</strong> {contact.name} ({contact.phoneNumber})
            </Typography>
          ))}
          {isConfirmed ? (
            <>
              <Typography variant="body1" gutterBottom>
                Your information has been saved successfully.
              </Typography>
              <Button variant="contained" color="primary" onClick={handleEditInformation}>
                Edit Information
              </Button>
            </>
          ) : (
            <Button variant="contained" color="primary" onClick={handleSubmit}>
              Confirm and Save
            </Button>
          )}
        </Box>
      )}
      {/* Render navigation buttons based on the current step */}
      {currentStep < 4 && (
        <Box mt={4}>
          <Button variant="contained" color="primary" onClick={handleNextStep}>
            Next
          </Button>
        </Box>
      )}
      {currentStep > 1 && (
        <Box mt={2}>
          <Button variant="contained" onClick={handlePreviousStep}>
            Previous
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default UserProfileForm;
