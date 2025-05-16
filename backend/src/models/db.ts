import sqlite3 from "sqlite3";
import path from "path";

const dbPath = path.resolve(__dirname, "../../data.db");
const db = new sqlite3.Database(dbPath);

export function createDatabase() {
  db.serialize(() => {
    db.run("DROP TABLE IF EXISTS booking;");
    db.run("DROP TABLE IF EXISTS hotel;");

    // Tabla hoteles
    db.run(`
      CREATE TABLE hotel (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        hotelId TEXT NOT NULL UNIQUE CHECK (length(hotelId) = 6 AND hotelId GLOB '[A-Z0-9]*'), 
        name TEXT NOT NULL,
        stars INTEGER NOT NULL CHECK (stars BETWEEN 1 AND 5),
        pets BOOLEAN NOT NULL,
        availableRooms INTEGER NOT NULL CHECK (availableRooms >= 1),
        pricePersonNight REAL NOT NULL CHECK (pricePersonNight >= 0.1)
      );
    `);

    // Tabla reservas
    db.run(`
      CREATE TABLE booking (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        bookingId TEXT NOT NULL UNIQUE CHECK (bookingId GLOB '[A-Z][A-Z][0-9][0-9][0-9][0-9]'),
        comments TEXT CHECK (length(comments) <= 150),
        numPeople INTEGER NOT NULL CHECK (numPeople >= 1),
        price REAL NOT NULL,
        checkInDate DATE NOT NULL,
        duration INTEGER NOT NULL,
        hotelId TEXT NOT NULL,
        FOREIGN KEY (hotelId) REFERENCES hotel(hotelId)
      );
    `);
  });
}

export function getDB() {
  return db;
}
