import React, { useEffect, useState } from 'react';
import { Box, Button, List, ListItem, ListItemText, ListItemButton, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Header from '../Header';

interface Booking {
  id: number;
  bookingId: string;
  comments?: string | null;
  numPeople: number;
  price: number;
  checkInDate: string;
  duration: number;
  hotelId: string;
}

const BookingList = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchBookings = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get('http://localhost:3001/booking');
        setBookings(response.data);
      } catch (err) {
        setError('Error al cargar reservas');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  const handleClick = (id: number) => {
    navigate(`/booking/${id}`);
  };

  return (
    <>
      <Header />
      <Box sx={{ p: 2,  paddingTop: '70px'  }}>
        <Typography variant="h4" gutterBottom>Listado de Reservas</Typography>

        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate('/booking/new')}
          sx={{ mb: 2 }}
        >
          Añadir Reserva
        </Button>

        {loading && <Typography>Cargando reservas...</Typography>}
        {error && <Typography color="error">{error}</Typography>}

        <List>
          {bookings.map(booking => (
            <ListItem key={booking.id} disablePadding>
              <ListItemButton onClick={() => handleClick(booking.id)}>
                <ListItemText
                  primary={`Reserva ID: ${booking.bookingId} - Hotel ID: ${booking.hotelId}`}
                  secondary={
                    `Personas: ${booking.numPeople} · ` +
                    `Precio: ${booking.price.toFixed(2)}€ · ` +
                    `Check-In: ${new Date(booking.checkInDate).toLocaleDateString()} · ` +
                    `Duración: ${booking.duration} noches` +
                    (booking.comments ? ` · Comentarios: ${booking.comments}` : '')
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

export default BookingList;
