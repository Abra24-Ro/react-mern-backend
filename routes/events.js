/**
 *? Rutas de eventos
 *? host + /api/events
 */

import { Router } from "express";
import {
  createEventos,
  deleteEventos,
  getEventos,
  updateEventos,
} from "../controllers/events.js";
import { validarJWT } from "../middlewares/validar-jwt.js";
import { check } from "express-validator";
import { validarCampos } from "../middlewares/validar-campos.js";
import { isDate } from "../helpers/isDate.js";

const router = Router();

router.use(validarJWT);

//Obtener eventos

router.get("/", getEventos);

//Crear un nuevo evento

router.post(
  "/",
  [
    check("title", "El titulo es obligatorio").not().isEmpty(),
    check("start", "La fecha de inicio es obligatoria").custom(isDate),
    check("end", "La fecha de finalizacion es obligatoria").custom(isDate),

    validarCampos,
  ],
  createEventos
);

//Actualizar un evento

router.put("/:id", updateEventos);

//Borrar un evento

router.delete("/:id", deleteEventos);

export default router;
