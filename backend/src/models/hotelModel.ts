import { getDB } from "./db";

export const getAllHotels = (): Promise<any[]> => {
  const db = getDB();
  return new Promise((resolve, reject) => {
    db.all("SELECT * FROM hotel", (err, rows) => {
      if (err) reject(err);
      else resolve(rows);
    });
  });
};

export const getHotelById = (id: string): Promise<any> => {
  const db = getDB();
  return new Promise((resolve, reject) => {
    db.get("SELECT * FROM hotel WHERE id = ?", [id], (err, row) => {
      if (err) reject(err);
      else resolve(row);
    });
  });
};

export const createHotel = (hotel: {
  hotelId: string;
  name: string;
  stars: number;
  pets: boolean;
  availableRooms: number;
  pricePersonNight: number;
}): Promise<number> => {
  const db = getDB();
  const { hotelId, name, stars, pets, availableRooms, pricePersonNight } = hotel;
  return new Promise((resolve, reject) => {
    db.run(
      `INSERT INTO hotel (hotelId, name, stars, pets, availableRooms, pricePersonNight)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [hotelId, name, stars, pets ? 1 : 0, availableRooms, pricePersonNight],
      function (err) {
        if (err) reject(err);
        else resolve(this.lastID);
      }
    );
  });
};

export const updateHotel = (
  id: string,
  hotel: {
    hotelId: string;
    name: string;
    stars: number;
    pets: boolean;
    availableRooms: number;
    pricePersonNight: number;
  }
): Promise<void> => {
  const db = getDB();
  const { hotelId, name, stars, pets, availableRooms, pricePersonNight } = hotel;
  return new Promise((resolve, reject) => {
    db.run(
      `UPDATE hotel
       SET hotelId = ?, name = ?, stars = ?, pets = ?, availableRooms = ?, pricePersonNight = ?
       WHERE id = ?`,
      [hotelId, name, stars, pets ? 1 : 0, availableRooms, pricePersonNight, id],
      function (err) {
        if (err) reject(err);
        else if (this.changes === 0) reject(new Error("Hotel no encontrado"));
        else resolve();
      }
    );
  });
};

export const deleteHotel = (id: string): Promise<void> => {
  const db = getDB();
  return new Promise((resolve, reject) => {
    db.run("DELETE FROM hotel WHERE id = ?", [id], function (err) {
      if (err) reject(err);
      else if (this.changes === 0) reject(new Error("Hotel no encontrado"));
      else resolve();
    });
  });
};
