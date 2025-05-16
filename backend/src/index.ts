import express from "express";
import { createDatabase } from "./models/db";
import hotelRouter from "./routes/hotelRouter";
import cors from 'cors';
import bookingRouter from "./routes/bookingRouter";

const app = express();

createDatabase();

app.use(cors());

app.use(express.json());

app.use("/hotel", hotelRouter);
app.use("/booking", bookingRouter);

// Otras rutas...

app.listen(3001, () => {
  console.log("Servidor corriendo en puerto 3001");
});
