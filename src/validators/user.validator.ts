import { check, ValidationChain } from "express-validator";
import { validateResults } from "../utils/handleValidator";
import { Request, Response, NextFunction } from "express";

/*
export const registerUserValidator = [
  check("name")
    .exists()
    .withMessage("El campo name debe existir")
    .notEmpty()
    .withMessage("El campo name no debe estar vacío")
    .isString()
    .withMessage("El campo name debe ser  un string")
    .isLength({ max: 255 })
    .withMessage("El campo name no debe superar los 255 caracteres"),
  check("email")
    .exists()
    .withMessage("El campo email debe existir")
    .notEmpty()
    .withMessage("El campo email no debe estar vacío")
    .isEmail()
    .withMessage("El campo email debe tener un formato de correo")
    .normalizeEmail()
    .isLength({ max: 255 })
    .withMessage("El campo email no debe superar los 255 caracteres"),
  check("password")
    .exists()
    .withMessage("El campo password debe existir")
    .notEmpty()
    .withMessage("El campo password no debe estar vacío")
    .isString()
    .withMessage("El campo password debe ser un string")
    .isLength({ max: 255 })
    .withMessage("El campo password no debe superar los 255 caracteres"),
  (req: Request, res: Response, next: NextFunction) => {
    return validateResults(req, res, next);
  },
];
*/

export const registerUserValidator: (
  | ValidationChain
  | ((req: Request, res: Response, next: NextFunction) => void)
)[] = [
  check("name")
    .exists()
    .withMessage("El campo name debe existir")
    .notEmpty()
    .withMessage("El campo name no debe estar vacío")
    .isString()
    .withMessage("El campo name debe ser un string")
    .isLength({ max: 255 })
    .withMessage("El campo name no debe superar los 255 caracteres"),
  check("email")
    .exists()
    .withMessage("El campo email debe existir")
    .notEmpty()
    .withMessage("El campo email no debe estar vacío")
    .isEmail()
    .withMessage("El campo email debe tener un formato de correo")
    .normalizeEmail()
    .isLength({ max: 255 })
    .withMessage("El campo email no debe superar los 255 caracteres"),
  check("password")
    .exists()
    .withMessage("El campo password debe existir")
    .notEmpty()
    .withMessage("El campo password no debe estar vacío")
    .isString()
    .withMessage("El campo password debe ser un string")
    .isLength({ max: 255 })
    .withMessage("El campo password no debe superar los 255 caracteres"),
  (req: Request, res: Response, next: NextFunction) => {
    return validateResults(req, res, next);
  },
];
