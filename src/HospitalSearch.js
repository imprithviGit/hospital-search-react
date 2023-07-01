import React, { useState, useEffect } from 'react';
import Papa from 'papaparse';
import { TextField, Button, Container, Grid, Typography, List, ListItem, ListItemText } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import HospitalIcon from '@mui/icons-material/LocalHospital';
import { AppBar, Toolbar } from '@mui/material';
import Box from '@mui/material/Box';

const HospitalSearch = ({ goToUserProfileForm }) => {
  const [hospitals, setHospitals] = useState([]);
  const [filteredHospitals, setFilteredHospitals] = useState([]);
  const [searchName, setSearchName] = useState('');
  const [searchArea, setSearchArea] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/Hospitals_DB.csv');
        const csvText = await response.text();
        const { data } = Papa.parse(csvText, { header: true });
        console.log('Parsed data:', data);
        setHospitals(data);
        setFilteredHospitals(data);
      } catch (error) {
        console.error('Error fetching hospital data:', error);
      }
    };

    fetchData();
  }, []);

  const handleSearchNameChange = (event) => {
    setSearchName(event.target.value);
  };

  const handleSearchAreaChange = (event) => {
    setSearchArea(event.target.value);
  };

  useEffect(() => {
    const filtered = hospitals.filter(
      (hospital) =>
        hospital.Name.toLowerCase().startsWith(searchName.toLowerCase()) &&
        hospital.Area.toLowerCase().startsWith(searchArea.toLowerCase())
    );
    setFilteredHospitals(filtered);
  }, [searchName, searchArea, hospitals]);

  return (
    <Container maxWidth="md">
      <AppBar position="static" color="primary">
        <Toolbar>
          <HospitalIcon />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, ml: 2 }}>
            Hospital Search
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        height="100vh"
        backgroundImage={`url(${process.env.PUBLIC_URL}/hospital-background.jpg)`}
        backgroundSize="cover"
        backgroundPosition="center"
        filter="brightness(20%)" // Adjust the brightness value as desired
      >
        <Box
          mt={4}
          p={2}
          bgcolor="white"
          borderRadius="8px"
          maxWidth="600px"
          width="100%"
          position="relative"
          zIndex="1"
          overflow="auto"
        >
          <Grid container spacing={2} justifyContent="center">
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Search by Name"
                variant="outlined"
                value={searchName}
                onChange={handleSearchNameChange}
                InputProps={{
                  startAdornment: <SearchIcon />,
                }}
                InputLabelProps={{
                  shrink: true,
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderColor: 'black',
                    borderWidth: '2px',
                  },
                  '& .MuiOutlinedInput-input': {
                    paddingTop: '12px',
                    paddingBottom: '12px',
                    fontSize: '16px',
                  },
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Search by Area"
                variant="outlined"
                value={searchArea}
                onChange={handleSearchAreaChange}
                InputProps={{
                  startAdornment: <SearchIcon />,
                }}
                InputLabelProps={{
                  shrink: true,
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderColor: 'black',
                    borderWidth: '2px',
                  },
                  '& .MuiOutlinedInput-input': {
                    paddingTop: '12px',
                    paddingBottom: '12px',
                    fontSize: '16px',
                  },
                }}
              />
            </Grid>
          </Grid>
          <List>
            {filteredHospitals.map((hospital, index) => (
              <ListItem
                key={index}
                sx={{
                  border: '2px solid red',
                  borderRadius: '8px',
                  p: 2,
                  cursor: 'pointer',
                  '&:hover': {
                    transform: 'translateY(-2px)',
                    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
                  },
                }}
              >
                <ListItemText primary={hospital.Name} secondary={`${hospital.Address}, ${hospital.Area}`} />
              </ListItem>
            ))}
          </List>
          <Box mt={4} display="flex" justifyContent="center">
            <Button variant="contained" color="primary" size="large" onClick={goToUserProfileForm}>
              Complete Onboarding
            </Button>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default HospitalSearch;
