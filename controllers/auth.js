import express from "express";
import Usuario from "../models/Usuario.js";
import bcryptjs from "bcryptjs";
import { generarJWT } from "../helpers/jwt.js";

const crearUsuario = async (req, res = express.response) => {
  const { email, password } = req.body;

  try {
    let usuario = await Usuario.findOne({ email });

    if (usuario) {
      return res.status(400).json({
        ok: false,
        msg: "Ya existe un usuario con ese email",
      });
    }

    usuario = new Usuario(req.body);

    // Encriptar la contraseña
    const salt = bcryptjs.genSaltSync(10);
    usuario.password = bcryptjs.hashSync(password, salt);

    await usuario.save();

    // Generar el JWT
    const token = await generarJWT(usuario.id, usuario.name);

    return res.status(201).json({
      ok: true,
      msg: "Registro correcto",
      uid: usuario.id,
      name: usuario.name,
      token,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: "Error inesperado, contacte con el administrador",
    });
  }
};

const loginUsuario = async (req, res = express.response) => {
  const { email, password } = req.body;

  try {
    const usuario = await Usuario.findOne({ email });

    if (!usuario) {
      return res.status(400).json({
        ok: false,
        msg: "El email o la contraseña no son correctos",
      });
    }

    // Confirmar la contraseña
    const validPassword = bcryptjs.compareSync(password, usuario.password);

    if (!validPassword) {
      return res.status(400).json({
        ok: false,
        msg: "Contraseña incorrecta ",
      });
    }

    // Generar el JWT y

    const token = await generarJWT(usuario.id, usuario.name);

    return res.status(200).json({
      ok: true,
      uid: usuario.id,
      name: usuario.name,
      token,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: "Error inesperado, contacte con el administrador",
    });
  }
};

const revalidarUsuario = async (req, res = express.response) => {
  const { uid, name } = req;

  //generar un nuevo Jwt y retornarlo en esta peticion

  const token = await generarJWT(uid, name);

  res.json({
    ok: true,
    uid,
    name,
    token,
  });
};

export { crearUsuario, loginUsuario, revalidarUsuario };
