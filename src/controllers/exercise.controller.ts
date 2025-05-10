import { createNewExercise, getExercises } from "../services/exercise.service";
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

export const createExercise = async (req: Request, res: Response) => {
  const { name, description, category, muscleGroup } = req.body;
  try {
    const newExercise = await createNewExercise(
      name,
      description,
      category,
      muscleGroup
    );
    res
      .status(201)
      .json({
        message: "Nuevo ejercicio creado con éxito",
        data: {
          name: newExercise.name,
          description: newExercise.description,
          category: newExercise.category,
          muscleGroup: newExercise.muscleGroup,
        },
      });
  } catch (error) {
    console.log("Error al intentar crear ejercicio: ", error);
    handleHttpError(res, "ERROR_CREATE_EXERCISE", 500);
  }
};
