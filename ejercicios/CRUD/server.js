require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDb = require("./config/db");
const loggerMiddleware = require("./middleware/loggerMiddleware");

const productRoutes = require("./routes/productRoutes");
const authRoutes = require("./routes/authRoutes");

const app = express();

connectDb();

// Middlewares
app.use(cors({
  origin: '*', 
  methods: ['GET', 'POST'],
}));
app.use(express.json());
app.use(loggerMiddleware);

// Rutas
app.use("/api/productos", productRoutes);
app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 5000;
app.listen(5000, '0.0.0.0', () => {
  console.log(`Servidor corriendo en el puerto 5000`);
});
