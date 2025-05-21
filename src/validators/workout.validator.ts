import { Response, Request, NextFunction } from "express";
import { check, ValidationChain } from "express-validator";
import { validateResults } from "../utils/handleValidator";
import { WorkoutStatus } from "../types/workout.type";

const workoutStates: WorkoutStatus[] = ["pendiente", "completado"];

export const createWorkoutValidator: (
  | ValidationChain
  | ((req: Request, res: Response, next: NextFunction) => void)
)[] = [
  check("scheduledDate")
    .exists()
    .withMessage("El campo scheduledDate debe existir")
    .notEmpty()
    .withMessage("El campo scheduledDate no debe estar vacío")
    .isISO8601()
    .withMessage(
      "El campo scheduledDate debe ser una fecha válida en formato ISO8601 (YYYY-MM-DDTHH:MM:SSZ)"
    ),
  check("note")
    .optional()
    .isString()
    .withMessage("El campo note debe ser un string")
    .isLength({ max: 255 })
    .withMessage("El campo note no debe superar los 255 caracteres"),
  check("exercises")
    .exists()
    .withMessage("El array de exercises debe existir")
    .isArray({ min: 1 })
    .withMessage("El array de exercises debe tener al menos un ejercicio"),
  check("exercises.*.exerciseId")
    .exists()
    .withMessage(
      "El campo exerciseId debe existir dentro del array de ejercicios"
    )
    .notEmpty()
    .withMessage("El campo exerciseId no debe estar vacío")
    .isInt({ min: 1 })
    .withMessage("El campo exerciseId debe ser un entero positivo"),
  check("exercises.*.sets")
    .exists()
    .withMessage("El campo sets dentro del array debe existir")
    .notEmpty()
    .withMessage("El campo sets no debe estar vacío")
    .isInt()
    .withMessage("El campo sets debe ser un entero"),
  check("exercises.*.reps")
    .exists()
    .withMessage("El campo reps dentro del array de ejercicios debe existir")
    .notEmpty()
    .withMessage("El campo reps no debe estar vacío")
    .isInt({ min: 1 })
    .withMessage("El campo reps debe ser un entero positivo"),
  check("exercises.*.weightKg")
    .optional()
    .isFloat({ min: 0 })
    .withMessage(
      "El campo weightKg dentro del array de ejercicios debe ser númerico positivo"
    ),
  (req: Request, res: Response, next: NextFunction) => {
    return validateResults(req, res, next);
  },
];

export const updateWorkoutValidator: (
  | ValidationChain
  | ((req: Request, res: Response, next: NextFunction) => void)
)[] = [
  check("scheduledDate")
    .exists()
    .withMessage("El campo scheduledDate debe existir")
    .notEmpty()
    .withMessage("El campo scheduledDate no debe estar vacío")
    .isISO8601()
    .withMessage(
      "El campo scheduledDate debe ser una fecha válida en formato ISO8601 (YYYY-MM-DDTHH:MM:SSZ)"
    ),
  check("note")
    .optional()
    .isString()
    .withMessage("El campo note debe ser un string")
    .isLength({ max: 255 })
    .withMessage("El campo note no debe superar los 255 caracteres"),
  check("state")
    .exists()
    .withMessage("El campo state debe existir")
    .notEmpty()
    .withMessage("El campo state no debe estar vacío")
    .isIn(workoutStates)
    .withMessage(
      `El valor del campo state debe ser algunos de los siguientes: ${workoutStates.join(
        ", "
      )}`
    ),
  check("exercises")
    .exists()
    .withMessage("El array de exercises debe existir")
    .isArray({ min: 1 })
    .withMessage("El array de exercises debe tener al menos un ejercicio"),
  check("exercises.*.exerciseId")
    .exists()
    .withMessage(
      "El campo exerciseId debe existir dentro del array de ejercicios"
    )
    .notEmpty()
    .withMessage("El campo exerciseId no debe estar vacío")
    .isInt({ min: 1 })
    .withMessage("El campo exerciseId debe ser un entero positivo"),
  check("exercises.*.sets")
    .exists()
    .withMessage("El campo sets dentro del array debe existir")
    .notEmpty()
    .withMessage("El campo sets no debe estar vacío")
    .isInt()
    .withMessage("El campo sets debe ser un entero"),
  check("exercises.*.reps")
    .exists()
    .withMessage("El campo reps dentro del array de ejercicios debe existir")
    .notEmpty()
    .withMessage("El campo reps no debe estar vacío")
    .isInt({ min: 1 })
    .withMessage("El campo reps debe ser un entero positivo"),
  check("exercises.*.weightKg")
    .optional()
    .isFloat({ min: 0 })
    .withMessage(
      "El campo weightKg dentro del array de ejercicios debe ser númerico positivo"
    ),
  (req: Request, res: Response, next: NextFunction) => {
    return validateResults(req, res, next);
  },
];

export const scheduleTrainingValidator: (
  | ValidationChain
  | ((req: Request, res: Response, next: NextFunction) => void)
)[] = [
  check("scheduleDate")
    .exists()
    .withMessage("El campo scheduleDate debe existir")
    .notEmpty()
    .withMessage("El campo scheduleDate no debe estar vacío")
    .isISO8601()
    .withMessage(
      "El campo scheduledDate debe ser una fecha válida en formato ISO8601 (YYYY-MM-DDTHH:MM:SSZ)"
    ),
  (req: Request, res: Response, next: NextFunction) => {
    return validateResults(req, res, next);
  },
];
