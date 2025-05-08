import { Response } from "express";

/**
 * Función personalizada para el manejor de errores http
 * @param {Response} res - Pasar la respuesta al cliente
 * @param {string} message - Pasar el mensaje http de error
 * @param {number} code - Pasar el código http de error
 */
export const handleHttpError = (
  res: Response,
  message: string,
  code: number
) => {
  res.status(code).json({ error: message });
};
