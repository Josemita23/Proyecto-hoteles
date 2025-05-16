import React, { useEffect, useState } from 'react';
import {Box, Button, List, ListItem, ListItemText, ListItemButton, Typography} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Header from '../Header';

interface Hotel {
  id: number;
  hotelId: string;
  name: string;
  stars: number;
  pets: boolean;
  availableRooms: number;
  pricePersonNight: number;
}

const HotelList = () => {
  const [hotel, setHotel] = useState<Hotel[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchHotel = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get('http://localhost:3001/hotel');
        setHotel(response.data);
      } catch (err) {
        setError('Error al cargar hoteles');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchHotel();
  }, []);

  const handleClick = (id: number) => {
    navigate(`/hotel/${id}`);
  };

  return (
    <>
      <Header />
      <Box sx={{ p: 2,  paddingTop: '70px' }}>
        <Typography variant="h4" gutterBottom>Listado de Hoteles</Typography>

        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate('/hotel/new')}
          sx={{ mb: 2 }}
        >
          Añadir Hotel
        </Button>

        {loading && <Typography>Cargando hoteles...</Typography>}
        {error && <Typography color="error">{error}</Typography>}

        <List>
          {hotel.map(hotel => (
            <ListItem key={hotel.id} disablePadding>
              <ListItemButton onClick={() => handleClick(hotel.id)}>
                <ListItemText
                  primary={hotel.name}
                  secondary={
                    `Hotel ID: ${hotel.hotelId} · Estrellas: ${hotel.stars} · ` +
                    `Mascotas: ${hotel.pets ? 'Sí' : 'No'} · ` +
                    `Habitaciones disponibles: ${hotel.availableRooms} · Precio por persona/noche: ${hotel.pricePersonNight}€`
                  }
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
    </>
  );
};

export default HotelList;
