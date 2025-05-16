import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Typography } from '@mui/material';
import Header from '../Header';

const Home = () => {
  const navigate = useNavigate();

  return (
    <>
      <Header />

      <Box
        sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 10, gap: 2,  paddingTop: '70px'  }}
      >
        <Typography variant="h4">Bienvenido a Mogu</Typography>
        <Button variant="contained" onClick={() => navigate('/hotel')}>
          Ver Hoteles
        </Button>
        <Button variant="contained" onClick={() => navigate('/booking')}>
          Ver Reservas
        </Button>
      </Box>
    </>
  );
};

export default Home;
