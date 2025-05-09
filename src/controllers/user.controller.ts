import {
  createUser,
  findUserByEmail,
  verifyPassword,
} from "../services/user.service";
import { handleHttpError } from "../utils/handleHttpError";
import { Request, Response } from "express";
import { generateAccessToken } from "../utils/handleToken";

export const registerUser = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;
  try {
    //Se verifica primero si existe un usuario con email recibido
    const user = await findUserByEmail(email);

    if (user) return handleHttpError(res, "ERROR_USER_EXISTS", 400);

    //Caso contrario se procede a crear el usuario
    const newUser = await createUser(name, email, password);

    res.status(201).json({
      message: "Usuario creado con éxito",
      data: { name: newUser.name, email: newUser.email },
    });
  } catch (error) {
    handleHttpError(res, "ERROR_REGISTER_USER", 500);
  }
};

export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    //Se verifica si existe el usuario con el email ingresado
    const user = await findUserByEmail(email);

    if (!user) return handleHttpError(res, "ERROR_USER_NOT_FOUND", 404);

    //Si existe, se verifica la contraseña del mismo
    const isPasswordValid = await verifyPassword(password, user.password);

    if (!isPasswordValid)
      return handleHttpError(res, "ERROR_PASSWORD_INVALID", 401);

    //Si las credenciales son correctas, se procede a generar el acceso_token
    const token = await generateAccessToken(user);

    if (!token) return handleHttpError(res, "ERROR_GENERATE_TOKEN", 400);

    res
      .status(200)
      .json({
        message: "Sesión iniciada con éxito",
        data: { name: user.name, email: user.email, access_token: token },
      });
  } catch (error) {
    console.log("Error al intentar loguear al usuario: ", error);
    handleHttpError(res, "ERROR_LOGIN_USER", 500);
  }
};
