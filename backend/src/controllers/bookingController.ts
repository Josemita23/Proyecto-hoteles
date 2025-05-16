import { Request, Response } from "express";
import * as BookingModel from "../models/bookingModel";

export const getAllBookings = async (req: Request, res: Response) => {
  try {
    const bookings = await BookingModel.getAllBookings();
    res.json(bookings);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const getBookingById = async (req: Request, res: Response) => {
  try {
    const booking = await BookingModel.getBookingById(req.params.id);
    if (!booking) return res.status(404).json({ error: "Reserva no encontrada" });
    res.json(booking);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const createBooking = async (req: Request, res: Response) => {
  const { bookingId, comments, numPeople, price, checkInDate, duration, hotelId } = req.body;

  if (!bookingId || numPeople == null || price == null || !checkInDate || duration == null || !hotelId) {
    return res.status(400).json({ error: "Faltan campos obligatorios" });
  }

  try {
    const id = await BookingModel.createBooking({ bookingId, comments, numPeople, price, checkInDate, duration, hotelId });
    res.status(201).json({ id });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const updateBooking = async (req: Request, res: Response) => {
  const id = req.params.id;
  const { bookingId, comments, numPeople, price, checkInDate, duration, hotelId } = req.body;

  if (!bookingId || numPeople == null || price == null || !checkInDate || duration == null || !hotelId) {
    return res.status(400).json({ error: "Faltan campos obligatorios" });
  }

  try {
    await BookingModel.updateBooking(id, { bookingId, comments, numPeople, price, checkInDate, duration, hotelId });
    res.json({ message: "Reserva actualizada correctamente" });
  } catch (err: any) {
    if (err.message === "Reserva no encontrada") {
      res.status(404).json({ error: err.message });
    } else {
      res.status(500).json({ error: err.message });
    }
  }
};

export const deleteBooking = async (req: Request, res: Response) => {
  try {
    await BookingModel.deleteBooking(req.params.id);
    res.status(204).end();
  } catch (err: any) {
    if (err.message === "Reserva no encontrada") {
      res.status(404).json({ error: err.message });
    } else {
      res.status(500).json({ error: err.message });
    }
  }
};
