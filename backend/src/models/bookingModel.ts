import { getDB } from "./db";

export const getAllBookings = (): Promise<any[]> => {
  const db = getDB();
  return new Promise((resolve, reject) => {
    db.all("SELECT * FROM booking", (err, rows) => {
      if (err) reject(err);
      else resolve(rows);
    });
  });
};

export const getBookingById = (id: string): Promise<any> => {
  const db = getDB();
  return new Promise((resolve, reject) => {
    db.get("SELECT * FROM booking WHERE id = ?", [id], (err, row) => {
      if (err) reject(err);
      else resolve(row);
    });
  });
};

export const createBooking = (booking: {
  bookingId: string;
  comments?: string;
  numPeople: number;
  price: number;
  checkInDate: string;
  duration: number;
  hotelId: string;
}): Promise<number> => {
  const db = getDB();
  const { bookingId, comments, numPeople, price, checkInDate, duration, hotelId } = booking;
  return new Promise((resolve, reject) => {
    db.run(
      `INSERT INTO booking (bookingId, comments, numPeople, price, checkInDate, duration, hotelId)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [bookingId, comments || null, numPeople, price, checkInDate, duration, hotelId],
      function (err) {
        if (err) reject(err);
        else resolve(this.lastID);
      }
    );
  });
};

export const updateBooking = (
  id: string,
  booking: {
    bookingId: string;
    comments?: string;
    numPeople: number;
    price: number;
    checkInDate: string;
    duration: number;
    hotelId: string;
  }
): Promise<void> => {
  const db = getDB();
  const { bookingId, comments, numPeople, price, checkInDate, duration, hotelId } = booking;
  return new Promise((resolve, reject) => {
    db.run(
      `UPDATE booking
       SET bookingId = ?, comments = ?, numPeople = ?, price = ?, checkInDate = ?, duration = ?, hotelId = ?
       WHERE id = ?`,
      [bookingId, comments || null, numPeople, price, checkInDate, duration, hotelId, id],
      function (err) {
        if (err) reject(err);
        else if (this.changes === 0) reject(new Error("Reserva no encontrada"));
        else resolve();
      }
    );
  });
};

export const deleteBooking = (id: string): Promise<void> => {
  const db = getDB();
  return new Promise((resolve, reject) => {
    db.run("DELETE FROM booking WHERE id = ?", [id], function (err) {
      if (err) reject(err);
      else if (this.changes === 0) reject(new Error("Reserva no encontrada"));
      else resolve();
    });
  });
};
