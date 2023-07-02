import React, { useState, useEffect } from 'react';
import Papa from 'papaparse';
import { TextField,Container, Typography, List, ListItem, ListItemText } from '@mui/material';
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
    <Container maxWidth="xl" disableGutters>
      <AppBar position="static" color="primary">
        <Toolbar>
          <HospitalIcon />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, ml: 2 }}>
            Hospital Search
          </Typography>
        </Toolbar>
      </AppBar>
      <Container maxWidth="xl" sx={{ height: 'calc(100vh - 64px)', overflow: 'auto' }}>
        <Box sx={{ maxWidth: 'md', mx: 'auto', p: 2 }}>
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
              marginBottom: '12px',
            }}
          />
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
              marginBottom: '24px',
            }}
          />
        </Box>
        <List sx={{ maxWidth: 'md', mx: 'auto', p: 2 }}>
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
      </Container>
    </Container>
  );
  
};

export default HospitalSearch;
