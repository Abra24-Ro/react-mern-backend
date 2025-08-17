import express from "express";
import dotenv from "dotenv";
import auth from "./routes/auth.js";
import events from "./routes/events.js";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import dbConnection from "./database/config.js";
import cors from "cors";

dotenv.config();

// Definir __dirname en ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Crear el servidor de express
const app = express();

// Base de datos
dbConnection();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

// Rutas principales
app.use("/api/auth", auth);
app.use("/api/events", events);

// SPA fallback
// SPA fallback (funciona en Express 5)
app.get(/^(?!\/api).*/, (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});


// Puerto
const port = process.env.PORT || 4000;

// Escuchar peticiones
app.listen(port, () => {
  console.log(`🚀 Servidor corriendo en el puerto ${port}`);
});
