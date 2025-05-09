import jwt from "jsonwebtoken";
import "dotenv/config";
import { User } from "../entities";

const accessTokenKey: string = process.env.ACCESS_TOKEN_KEY || "llavemaestra";

/**
 * Función para generar access token
 * @param {User} user - Pasar el objeto usuario
 * @returns {string | null} - Retorna el token | retorna null en caso de que no se genero el token
 */
export const generateAccessToken = async (
  user: User
): Promise<string | null> => {
  try {
    const token: string = await jwt.sign(
      {
        id: user.id,
        name: user.name,
        email: user.email,
      },
      accessTokenKey,
      {
        expiresIn: "1h",
      }
    );
    return token;
  } catch (error) {
    console.log("Error al generar token de acceso: ", error);
    return null;
  }
};
