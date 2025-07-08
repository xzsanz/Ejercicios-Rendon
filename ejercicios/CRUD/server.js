require("dotenv").config();
const express = require("express");
const connectDb = require("./config/db");
const loggerMiddleware = require("./middleware/loggerMiddleware");

const productRoutes = require("./routes/productRoutes");
const authRoutes = require("./routes/authRoutes");

const app = express();

//conexion a la base de datos
connectDb();

// middlewares
app.use(express.json());
app.use(loggerMiddleware);

//rutas 
app.use("/api/productos",productRoutes);
app.use("/api/auth",authRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor corriendo correctamente en el puerto ${PORT}`));