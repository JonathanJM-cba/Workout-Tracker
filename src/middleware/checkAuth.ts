import { Response, NextFunction } from "express";
import { handleHttpError } from "../utils/handleHttpError";
import { verifyToken } from "../utils/handleToken";
import { User, userModel } from "../entities";
import { JwtPayload } from "jsonwebtoken";
import { AuthenticatedRequest } from "../types/custom-request";

export const checkAuth = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  //Se obtiene el encabezado
  const authorizationHeader = req.headers.authorization;
  try {
    if (!authorizationHeader || !authorizationHeader.startsWith("Bearer "))
      return handleHttpError(res, "ERROR_NO_TOKEN_IN_HEADER", 400);

    //Se obtiene el token
    const token = authorizationHeader.split(" ")[1];
    if (!token) return handleHttpError(res, "ERROR_NO_TOKEN_PROVIDER", 401);
    //Se verifica si el token es válido
    const tokenData: JwtPayload | string = await verifyToken(token);

    if (!tokenData) return handleHttpError(res, "ERROR_TOKEN_IS_INVALID", 401);

    //Se verifica si existe el usuario
    const user: User | null = await userModel.findOne({
      where: { id: tokenData.id },
    });

    if (!user) return handleHttpError(res, "ERROR_USER_NOT_FOUND", 404);

    req.user = {
      id: tokenData.id,
      name: tokenData.name,
      email: tokenData.email,
    };
    next();
  } catch (error) {
    console.log("Error al verificar token: ", error);
    handleHttpError(res, "ERROR_CHECK_AUTH", 500);
  }
};
