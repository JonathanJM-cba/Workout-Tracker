import { Response } from "express";
import { handleHttpError } from "../utils/handleHttpError";
import { WorkoutDto } from "../dtos/workout.dto";
import { saveExercise } from "../services/workout.service";
import { AuthenticatedRequest } from "../types/custom-request";

export const createWorkout = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  const { scheduledDate, note, exercises } = req.body;
  const id = req.user?.id;
  try {
    const workoutData: WorkoutDto = {
      scheduledDate: new Date(scheduledDate),
      note: note ? note : "",
      exercises: exercises.map((exercise: any) => ({
        exerciseId: Number(exercise.exerciseId),
        sets: Number(exercise.sets),
        reps: Number(exercise.reps),
        weightKg: exercise.weightKg ? Number(exercise.weightKg) : null,
      })),
    };

    const newWorkout = await saveExercise(workoutData, id);

    res
      .status(201)
      .json({ message: "Entrenamiento creado con éxito", data: newWorkout });
  } catch (error) {
    if (error instanceof Error) {
      switch (error.message) {
        case "ERROR_USER_NOT_FOUND":
          handleHttpError(res, "ERROR_USER_NOT_FOUND", 401);
          break;
        case "ERROR_EXERCISE_NOT_FOUND":
          handleHttpError(res, "ERROR_EXERCISE_NOT_FOUND", 404);
          break;
        default:
          handleHttpError(res, "ERROR_CREATE_EXERCISE", 500);
          break;
      }
    }
  }
};
