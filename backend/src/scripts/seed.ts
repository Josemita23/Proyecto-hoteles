import { getDB } from "../models/db";

// Datos de ejemplo para hoteles
const hotel = [
  { hotelId: "A1B2C3", name: "Hotel Paraíso", stars: 4, pets: 1, availableRooms: 50, pricePersonNight: 75.5 },
  { hotelId: "D4E5F6", name: "Hostal Sol", stars: 3, pets: 0, availableRooms: 25, pricePersonNight: 45.0 },
  { hotelId: "G7H8I9", name: "Resort Luna", stars: 5, pets: 1, availableRooms: 15, pricePersonNight: 120.0 },
  { hotelId: "J1K2L3", name: "Motel Estrella", stars: 2, pets: 0, availableRooms: 30, pricePersonNight: 30.0 },
  { hotelId: "M4N5O6", name: "Hotel Oasis", stars: 4, pets: 1, availableRooms: 70, pricePersonNight: 80.0 },
];

// Datos de ejemplo para reservas
const booking = [
  { bookingId: "AB1234", comments: "Llegada tarde", numPeople: 2, price: 151.0, checkInDate: "2025-05-20", duration: 2, hotelId: "A1B2C3" },
  { bookingId: "CD5678", comments: "Habitación con vista", numPeople: 1, price: 45.0, checkInDate: "2025-05-22", duration: 1, hotelId: "D4E5F6" },
  { bookingId: "EF9012", comments: "Pet friendly", numPeople: 4, price: 480.0, checkInDate: "2025-07-15", duration: 4, hotelId: "G7H8I9" },
  { bookingId: "GH3456", comments: "Cerca de la piscina", numPeople: 1, price: 30.0, checkInDate: "2025-06-02", duration: 1, hotelId: "J1K2L3" },
  { bookingId: "IJ7890", comments: "Reserva con desayuno", numPeople: 3, price: 240.0, checkInDate: "2025-08-09", duration: 3, hotelId: "M4N5O6" },
];

function seed() {
  const db = getDB();

  db.serialize(() => {
    // Insertar hoteles
    const insertHotel = db.prepare(`INSERT INTO hotel (hotelId, name, stars, pets, availableRooms, pricePersonNight)
                                    VALUES (?, ?, ?, ?, ?, ?)`);
    for (const h of hotel) {
      insertHotel.run(h.hotelId, h.name, h.stars, h.pets, h.availableRooms, h.pricePersonNight);
    }
    insertHotel.finalize();

    // Insertar reservas
    const insertBooking = db.prepare(`INSERT INTO booking (bookingId, comments, numPeople, price, checkInDate, duration, hotelId)
                                      VALUES (?, ?, ?, ?, ?, ?, ?)`);
    for (const b of booking) {
      insertBooking.run(b.bookingId, b.comments, b.numPeople, b.price, b.checkInDate, b.duration, b.hotelId);
    }
    insertBooking.finalize();

    console.log("Datos insertados correctamente.");
  });
}

seed();
