// src/app.js
const express = require("express");
const cors = require("cors");
const pool = require("../config/db");
const passport = require('../config/passport');
const cookieParser = require('cookie-parser');
require("dotenv").config();

const app = express();

// Configura CORS
app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:5174"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true
  })
);
// Configura el límite de tamaño de la carga útil
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb', extended: true}));

// Luego, configura otros middleware
app.use(cookieParser());


// Añade el middleware de registro aquí
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  next();
});

// Importa las rutas
const userRoutes = require("../routes/userRoutes");

// Usa las rutas
app.use("/api", userRoutes);

// Añade un manejador de errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Internal server error", message: err.message });
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
    console.log("Tabla de usuarios verificada o creada.");

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
    console.log("Tabla de tokens verificada o creada.");
    
    // crear la tabla para la imagen de fondo
await pool.query(`
    CREATE TABLE IF NOT EXISTS user_images (
  image_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL UNIQUE REFERENCES users(user_id),
  image_data BYTEA NOT NULL,
  image_mime_type TEXT NOT NULL,
  is_default BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);
  `)
  console.log("Tabla para la imagen de fondo verificada o creada.");
  
   
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