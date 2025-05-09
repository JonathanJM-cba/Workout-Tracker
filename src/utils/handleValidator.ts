import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";

export const validateResults = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    validationResult(req).throw();
    return next();
  } catch (error) {
    //console.log("Ocurrio un error: ", error);
    if (error && typeof error === "object" && "errors" in error) {
      return res.status(400).send({ errors: error.errors });
    }
    return res.status(500).send({ error: "Error desconocido" });
  }
};
