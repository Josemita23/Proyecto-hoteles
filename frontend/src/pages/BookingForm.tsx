import React, { useState, useEffect } from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Header from '../Header';

const BookingForm = () => {
    const navigate = useNavigate();
    const { id } = useParams();

    const [hotels, setHotels] = useState<{ hotelId: string; name: string; pricePersonNight: number }[]>([]);
    const [formData, setFormData] = useState({
        bookingId: '',
        comments: '',
        numPeople: 1,
        price: 0,
        checkInDate: '',
        duration: 1,
        hotelId: '',
    });
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        // Cargar hoteles con habitaciones disponibles > 0
        axios.get('http://localhost:3001/hotel')
            .then(response => {
                const availableHotels = response.data.filter((hotel: any) => hotel.availableRooms > 0);
                setHotels(availableHotels);
            })
            .catch(err => {
                console.error('Error al cargar hoteles', err);
            });
    }, []);

    useEffect(() => {
        if (id) {
            axios.get(`http://localhost:3001/booking/${id}`)
                .then(response => {
                    const booking = response.data;
                    setFormData({
                        bookingId: booking.bookingId,
                        comments: booking.comments,
                        numPeople: booking.numPeople,
                        price: booking.price,
                        checkInDate: booking.checkInDate,
                        duration: booking.duration,
                        hotelId: booking.hotelId,
                    });
                })
                .catch(() => setError('Error al cargar los datos de la reserva'));
        }
    }, [id]);

    // Función para truncar a dos decimales
    function truncateToTwoDecimals(num: number) {
        return Math.floor(num * 100) / 100;
    }

    // Calcular precio cada vez que cambian numPeople, hotelId o duration
    useEffect(() => {
        const hotel = hotels.find(h => h.hotelId === formData.hotelId);
        if (hotel && formData.numPeople > 0 && formData.duration > 0) {
            const totalPrice = truncateToTwoDecimals(formData.numPeople * hotel.pricePersonNight * formData.duration);
            setFormData(prev => ({ ...prev, price: totalPrice }));
        } else {
            setFormData(prev => ({ ...prev, price: 0 }));
        }
    }, [formData.numPeople, formData.hotelId, formData.duration, hotels]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        const parsedValue = (name === 'numPeople' || name === 'duration') ? parseInt(value, 10) || 0 : value;
        setFormData(prev => ({
            ...prev,
            [name]: parsedValue,
        }));
    };

    const handleDelete = async () => {
        if (window.confirm('¿Estás seguro de que quieres eliminar esta reserva?')) {
            try {
                await axios.delete(`http://localhost:3001/booking/${id}`);
                navigate('/booking');
            } catch (err) {
                setError('Error al eliminar la reserva');
                console.error(err);
            }
        }
    };

    const handleSubmit = async () => {
        if (formData.bookingId.trim() === '') {
            setError('El ID de la reserva es obligatorio.');
            return;
        }
        if (formData.hotelId === '') {
            setError('Debe seleccionar un hotel.');
            return;
        }
        if (formData.numPeople < 1) {
            setError('El número de personas debe ser al menos 1.');
            return;
        }
        if (formData.duration < 1) {
            setError('La duración debe ser al menos 1 noche.');
            return;
        }
        if (formData.checkInDate === '') {
            setError('Debe seleccionar una fecha de check-in.');
            return;
        }
        try {
            const payload = {
                ...formData,
                numPeople: Number(formData.numPeople),
                duration: Number(formData.duration),
                price: Number(formData.price),
            };

            if (id) {
                await axios.put(`http://localhost:3001/booking/${id}`, payload);
            } else {
                await axios.post('http://localhost:3001/booking', payload);
            }

            navigate('/booking');
        } catch (err) {
            setError('Error al guardar la reserva');
            console.error(err);
        }
    };

    return (
        <>
            <Header />
            <Box sx={{ maxWidth: 500, mx: 'auto', p: 3,  paddingTop: '70px'  }}>
                <Typography variant="h5" gutterBottom>{id ? 'Editar reserva' : 'Añadir nueva reserva'}</Typography>

                <TextField
                    label="ID Reserva"
                    name="bookingId"
                    fullWidth
                    margin="normal"
                    value={formData.bookingId}
                    onChange={handleChange}
                />
                <TextField
                    label="Comentarios"
                    name="comments"
                    fullWidth
                    margin="normal"
                    multiline
                    rows={3}
                    value={formData.comments}
                    onChange={handleChange}
                />
                <TextField
                    label="Número de personas"
                    name="numPeople"
                    type="number"
                    fullWidth
                    margin="normal"
                    inputProps={{ min: 1 }}
                    value={formData.numPeople}
                    onChange={handleChange}
                />
                <TextField
                    label="Precio (€)"
                    name="price"
                    type="number"
                    fullWidth
                    margin="normal"
                    value={formData.price.toFixed(2)}
                    InputProps={{ readOnly: true }}
                />
                <TextField
                    label="Fecha de check-in"
                    name="checkInDate"
                    type="date"
                    fullWidth
                    margin="normal"
                    value={formData.checkInDate}
                    onChange={handleChange}
                    InputLabelProps={{ shrink: true }}
                />
                <TextField
                    label="Duración (noches)"
                    name="duration"
                    type="number"
                    fullWidth
                    margin="normal"
                    inputProps={{ min: 1 }}
                    value={formData.duration}
                    onChange={handleChange}
                />
                <TextField
                    select
                    label="Hotel"
                    name="hotelId"
                    fullWidth
                    margin="normal"
                    value={formData.hotelId}
                    onChange={handleChange}
                    SelectProps={{ native: true }}
                >
                    <option value="">-- Seleccione un hotel --</option>
                    {hotels.map(hotel => (
                        <option key={hotel.hotelId} value={hotel.hotelId}>
                            {hotel.name} ({hotel.hotelId})
                        </option>
                    ))}
                </TextField>

                {error && <Typography color="error">{error}</Typography>}

                <Button variant="contained" color="primary" onClick={handleSubmit} sx={{ mt: 2, mr: 2 }}>
                    Guardar
                </Button>
                {id && (
                    <Button variant="outlined" color="error" onClick={handleDelete} sx={{ mt: 2 }}>
                        Eliminar
                    </Button>
                )}
            </Box>
        </>
    );
};

export default BookingForm;
