import express from "express";
import dotenv from "dotenv";
import auth from "./routes/auth.js";
import events from "./routes/events.js";

import dbConnection from "./database/config.js";
import cors from "cors";

dotenv.config();

//crear el servidor de express

const app = express();

//Base de datos
dbConnection();

//cors

app.use(cors());
// escuchar

//Directorio publico

app.use(express.static("public"));

app.use(express.json());

//Todo?: rutas atuh // crear / login / register / refresh / logout / renew

app.use("/api/auth", auth);
app.use("/api/events", events);

//puerto
const port = process.env.PORT || process.env.PORT;

//escuchar
app.listen(port, () => {
  console.log(`Servidor corriendo en el puerto ${port}`);
});
