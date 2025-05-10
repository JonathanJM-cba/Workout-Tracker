import { Request, Response, NextFunction } from "express";
import { check, ValidationChain } from "express-validator";
import { validateResults } from "../utils/handleValidator";
import { ExerciseCategory, MuscleGroup } from "../types/exercise.type";

const exercisesCategories: ExerciseCategory[] = [
  "cardio",
  "fuerza",
  "flexibilidad",
];
const muscleGroups: MuscleGroup[] = [
  "brazos",
  "core",
  "espalda",
  "full-body",
  "pecho",
  "piernas",
];

export const createExerciseValidator:
  | ValidationChain
  | ((req: Request, res: Response, next: NextFunction) => void)[] = [
  check("name")
    .exists()
    .withMessage("El campo name debe existir")
    .notEmpty()
    .withMessage("El campo name no debe estar vacío")
    .isString()
    .withMessage("El campo name debe ser un string")
    .isLength({ max: 255 })
    .withMessage("El campo name no debe superar los 255 caracteres"),
  check("description")
    .exists()
    .withMessage("El campo description debe existir")
    .notEmpty()
    .withMessage("El campo description no debe estar vacío")
    .isString()
    .withMessage("El campo description no debe ser un string")
    .isLength({ max: 255 })
    .withMessage("El campo description no debe superar los 255 caracteres"),
  check("category")
    .exists()
    .withMessage("El campo category debe existir")
    .notEmpty()
    .withMessage("El campo category no debe estar vacío")
    .isIn(exercisesCategories)
    .withMessage(
      `El valor de category debe ser algunos de los siguientes: ${exercisesCategories.join(
        ", "
      )}`
    ),
  check("muscleGroup")
    .exists()
    .withMessage("El campo muscleGroup debe existir")
    .notEmpty()
    .withMessage("El campo muscleGroup no debe estar vacío")
    .isIn(muscleGroups)
    .withMessage(
      `El valor del muscleGroup debe ser algunos de los siguientes: ${muscleGroups.join(
        ", "
      )}`
    ),
  (req: Request, res: Response, next: NextFunction) => {
    return validateResults(req, res, next);
  },
];
