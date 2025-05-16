import { Request, Response } from "express";
import * as HotelModel from "../models/hotelModel";

export const getAllHotels = async (req: Request, res: Response) => {
  try {
    const hotels = await HotelModel.getAllHotels();
    res.json(hotels);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const getHotelById = async (req: Request, res: Response) => {
  try {
    const hotel = await HotelModel.getHotelById(req.params.id);
    if (!hotel) return res.status(404).json({ error: "Hotel no encontrado" });
    res.json(hotel);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const createHotel = async (req: Request, res: Response) => {
  const { hotelId, name, stars, pets, availableRooms, pricePersonNight } = req.body;

  if (!hotelId || !name || stars == null || pets == null || availableRooms == null || pricePersonNight == null) {
    return res.status(400).json({ error: "Faltan campos obligatorios" });
  }

  try {
    const id = await HotelModel.createHotel({ hotelId, name, stars, pets, availableRooms, pricePersonNight });
    res.status(201).json({ id });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const updateHotel = async (req: Request, res: Response) => {
  const id = req.params.id;
  const { hotelId, name, stars, pets, availableRooms, pricePersonNight } = req.body;

  if (!hotelId || !name || stars == null || pets == null || availableRooms == null || pricePersonNight == null) {
    return res.status(400).json({ error: "Faltan campos obligatorios" });
  }

  try {
    await HotelModel.updateHotel(id, { hotelId, name, stars, pets, availableRooms, pricePersonNight });
    res.json({ message: "Hotel actualizado correctamente" });
  } catch (err: any) {
    if (err.message === "Hotel no encontrado") {
      res.status(404).json({ error: err.message });
    } else {
      res.status(500).json({ error: err.message });
    }
  }
};

export const deleteHotel = async (req: Request, res: Response) => {
  try {
    await HotelModel.deleteHotel(req.params.id);
    res.status(204).end();
  } catch (err: any) {
    if (err.message === "Hotel no encontrado") {
      res.status(404).json({ error: err.message });
    } else {
      res.status(500).json({ error: err.message });
    }
  }
};
