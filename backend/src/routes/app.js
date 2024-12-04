// src/app.js
const express = require("express");
const cors = require("cors");
const pool = require("../config/db");
const passport = require('../config/passport');
require("dotenv").config();

const app = express();

// Configura CORS
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Luego, configura otros middleware
app.use(express.json());

// Importa las rutas
const userRoutes = require("../routes/userRoutes");

// Usa las rutas
app.use("/api", userRoutes);

// Añade un manejador de errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Internal server error" });
});

// Función para crear tablas y manejar la base de datos
const createTableFunction = async () => {
  try {
    // Creamos la extensión pgcrypto
    await pool.query(`CREATE EXTENSION IF NOT EXISTS "pgcrypto";`);
    console.log("Extensión pgcrypto verificada o creada");

    // Crear o verificar tablas
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        user_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        email VARCHAR(100) NOT NULL UNIQUE,
        password_hash TEXT NOT NULL,
        full_name VARCHAR(50),
        date_of_birth TIMESTAMP NOT NULL
      );
    `);
    console.log("Tabla de usuarios verificada o creada");

    // crear la tabla para el token
await pool.query(`
    CREATE TABLE IF NOT EXISTS refresh_tokens (
      token_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      user_id UUID NOT NULL REFERENCES users(user_id),
      token TEXT NOT NULL,
      expires_at TIMESTAMP NOT NULL,
      created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
    );
    `);
   
  } catch (error) {
    console.error("Error al crear las tablas o la extensión:", error);
  }
};

// Iniciar el servidor
const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await createTableFunction();
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Error al iniciar el servidor:", error);
    process.exit(1);
  }
};
startServer();