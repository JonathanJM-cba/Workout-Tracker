import { getExercises } from "../services/exercise.service";
import { handleHttpError } from "../utils/handleHttpError";
import { Request, Response } from "express";

export const getAllExercises = async (_: Request, res: Response) => {
  try {
    const exercises = await getExercises();
    res.status(200).json(exercises);
  } catch (error) {
    console.log("Error al intentar obtener todos los ejercicios: ", error);
    handleHttpError(res, "ERROR_GET_ALL_EXERCISES", 500);
  }
};
