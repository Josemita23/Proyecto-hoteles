import React, { useState, useEffect } from 'react';
import { Box, Button, TextField, Typography, Checkbox, FormControlLabel } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Header from '../Header';

const HotelForm = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [formData, setFormData] = useState({
        hotelId: '',
        name: '',
        stars: 1,
        pets: false,
        availableRooms: 0,
        pricePersonNight: 0,
    });

    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (id) {
            axios.get(`http://localhost:3001/hotel/${id}`)
                .then(response => {
                    const hotel = response.data;
                    setFormData({
                        hotelId: hotel.hotelId,
                        name: hotel.name,
                        stars: hotel.stars,
                        pets: !!hotel.pets,
                        availableRooms: hotel.availableRooms,
                        pricePersonNight: hotel.pricePersonNight,
                    });
                })
                .catch(error => {
                    setError('Error al cargar los datos del hotel');
                    console.error(error);
                });
        }
    }, [id]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const handleDelete = async () => {
        if (window.confirm('¿Estás seguro de que quieres eliminar este hotel?')) {
            try {
                await axios.delete(`http://localhost:3001/hotel/${id}`);
                navigate('/hotel');
            } catch (err) {
                setError('Error al eliminar el hotel');
                console.error(err);
            }
        }
    };

    const handleSubmit = async () => {
        if (!/^[A-Z0-9]{6}$/.test(formData.hotelId)) {
            setError('El ID del hotel debe tener exactamente 6 caracteres alfanuméricos en mayúsculas.');
            return;
        }
        if (formData.name.trim() === '') {
            setError('El nombre del hotel es obligatorio.');
            return;
        }
        if (formData.stars < 1 || formData.stars > 5) {
            setError('Las estrellas deben estar entre 1 y 5.');
            return;
        }
        if (formData.availableRooms < 1) {
            setError('Las habitaciones disponibles no pueden ser menos que 0.');
            return;
        }
        if (formData.pricePersonNight < 0.1) {
            setError('El precio por persona/noche debe ser al menos 0.1€.');
            return;
        }
        try {
            const payload = {
                ...formData,
                stars: Number(formData.stars),
                availableRooms: Number(formData.availableRooms),
                pricePersonNight: Number(formData.pricePersonNight),
            };

            if (id) {
                await axios.put(`http://localhost:3001/hotel/${id}`, payload);
            } else {
                await axios.post('http://localhost:3001/hotel', payload);
            }

            navigate('/hotel');
        } catch (err: any) {
            setError('Error al guardar el hotel');
            console.error(err);
        }

    };

    return (
        <>
            <Header />
            <Box sx={{ maxWidth: 500, mx: 'auto', p: 3,  paddingTop: '70px'  }}>
                <Typography variant="h5" gutterBottom>{id ? 'Editar hotel' : 'Añadir nuevo hotel'}</Typography>

                <TextField label="Hotel ID" name="hotelId" fullWidth margin="normal" value={formData.hotelId} onChange={handleChange} />
                <TextField label="Nombre" name="name" fullWidth margin="normal" value={formData.name} onChange={handleChange} />
                <TextField label="Estrellas" name="stars" type="number" fullWidth margin="normal" value={formData.stars} onChange={handleChange} />
                <FormControlLabel
                    control={<Checkbox checked={formData.pets} onChange={handleChange} name="pets" />}
                    label="Se permiten mascotas"
                />
                <TextField label="Habitaciones disponibles" name="availableRooms" type="number" fullWidth margin="normal" value={formData.availableRooms} onChange={handleChange} />
                <TextField label="Precio por persona/noche (€)" name="pricePersonNight" type="number" fullWidth margin="normal" value={formData.pricePersonNight} onChange={handleChange} />

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

export default HotelForm;
