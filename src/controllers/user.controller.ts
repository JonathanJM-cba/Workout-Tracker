import { createUser, findUserByEmail } from "../services/user.service";
import { handleHttpError } from "../utils/handleHttpError";
import { Request, Response } from "express";

export const registerUser = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;
  try {
    //Se verifica primero si existe un usuario con email recibido
    const user = await findUserByEmail(email);

    if (user) return handleHttpError(res, "ERROR_USER_EXISTS", 400);

    //Caso contrario se procede a crear el usuario
    const newUser = await createUser(name, email, password);

    res
      .status(201)
      .json({
        message: "Usuario creado con éxito",
        data: { name: newUser.name, email: newUser.email },
      });
  } catch (error) {
    handleHttpError(res, "ERROR_REGISTER_USER", 500);
  }
};
