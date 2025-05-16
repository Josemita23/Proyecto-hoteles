import React from 'react';
import { AppBar, Toolbar, Typography, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();

  const handleLogoClick = () => {
    navigate('/');
  };

  return (
    <AppBar position="fixed">
      <Toolbar>
        <Box
          sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}
          onClick={handleLogoClick}
        >
          <img src="/logo192.png" alt="Logo" style={{ width: 40, marginRight: 16 }} />
          <Typography variant="h6" component="div">
            Mogu App
          </Typography>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
