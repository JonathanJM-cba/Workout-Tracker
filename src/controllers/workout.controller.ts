import { Response } from "express";
import { handleHttpError } from "../utils/handleHttpError";
import { UpdateWorkoutDto, WorkoutDto } from "../dtos/workout.dto";
import {
  deletedWorkout,
  listWorkouts,
  saveExercise,
  scheduleTraining,
  updatedWorkout,
} from "../services/workout.service";
import { AuthenticatedRequest } from "../types/custom-request";

export const createWorkout = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  const { scheduledDate, note, exercises } = req.body;
  const id = req.user?.id;
  try {
    //Se verifica que la fecha de programación del entrenamiento no sea menor a la fecha actual
    const workoutDate = new Date(scheduledDate);
    const currentDate = new Date();

    workoutDate.setMilliseconds(0);
    currentDate.setMilliseconds(0);

    if (workoutDate <= currentDate)
      return handleHttpError(res, "ERROR_TRAINING_DATE_MUST_BE_FUTURE", 400);

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
          return handleHttpError(res, "ERROR_USER_NOT_FOUND", 401);
        case "ERROR_EXERCISE_NOT_FOUND":
          return handleHttpError(res, "ERROR_EXERCISE_NOT_FOUND", 404);
        default:
          return handleHttpError(res, "ERROR_CREATE_EXERCISE", 500);
      }
    }
  }
};

export const updateWorkout = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  const { scheduledDate, note, state, exercises } = req.body;
  const { idWorkout } = req.params;
  const userId = req.user?.id;
  try {
    const workoutDate = new Date(scheduledDate);
    const currentDate = new Date();

    workoutDate.setMilliseconds(0);
    currentDate.setMilliseconds(0);

    if (workoutDate <= currentDate)
      return handleHttpError(res, "ERROR_TRAINING_DATE_MUST_BE_FUTURE", 400);
    const workoutData: UpdateWorkoutDto = {
      scheduledDate: workoutDate,
      note: note ? note : "",
      state: state,
      exercises: exercises.map((ex: any) => ({
        exerciseId: Number(ex.exerciseId),
        sets: Number(ex.sets),
        reps: Number(ex.reps),
        weightKg: ex.weightKg ? Number(ex.weightKg) : null,
      })),
    };
    const workout = await updatedWorkout(
      workoutData,
      Number(idWorkout),
      Number(userId)
    );

    res
      .status(200)
      .json({ message: "Entrenamiento actualizado con éxito", data: workout });
  } catch (error) {
    if (error instanceof Error) {
      switch (error.message) {
        case "ERROR_WORKOUT_NOT_FOUND":
          handleHttpError(res, "ERROR_WORKOUT_NOT_FOUND", 404);
          break;
        case "ERROR_NO_UPDATE_WORKOUT_PERMISSION":
          handleHttpError(res, "ERROR_NO_UPDATE_WORKOUT_PERMISSION", 403);
          break;
        default:
          //console.log("Error al crear el entrenamiento: ", error);
          handleHttpError(res, "ERROR_UPDATE_WORKOUT", 500);
          break;
      }
    }
  }
};

export const deleteWorkout = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  const { idWorkout } = req.params;
  const userId = req.user?.id;
  try {
    if (!userId) return handleHttpError(res, "ERROR_USER_NOT_FOUND", 404);

    await deletedWorkout(Number(idWorkout), userId);

    res.status(204).json({ message: "Entrenamiento eliminado con éxito" });
  } catch (error) {
    if (error instanceof Error) {
      switch (error.message) {
        case "ERROR_WORKOUT_NOT_FOUND":
          handleHttpError(res, "ERROR_WORKOUT_NOT_FOUND", 403);
          break;
        case "ERROR_NO_DELETE_PERMISSION":
          handleHttpError(res, "ERROR_NO_DELETE_PERMISSION", 403);
          break;
        default:
          console.log("Error al intentar eliminar entrenamiento: ", error);
          handleHttpError(res, "ERROR_DELETE_WORKOUT", 500);
          break;
      }
    }
  }
};

export const scheduleWorkout = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  const { scheduleDate } = req.body;
  const userId = req.user?.id;
  const { idWorkout } = req.params;
  try {
    const workoutDate = new Date(scheduleDate);
    const currentDate = new Date();

    workoutDate.setMilliseconds(0);
    currentDate.setMilliseconds(0);

    if (workoutDate <= currentDate)
      return handleHttpError(res, "ERROR_TRAINING_DATE_MUST_BE_FUTURE", 400);

    //Se consume el servicio
    const training = await scheduleTraining(
      Number(idWorkout),
      workoutDate,
      Number(userId)
    );

    res
      .status(200)
      .json({ message: "Entrenamiento programado con éxito", data: training });
  } catch (error) {
    if (error instanceof Error) {
      switch (error.message) {
        case "ERROR_WORKOUT_NOT_FOUND":
          handleHttpError(res, "ERROR_WORKOUT_NOT_FOUND", 404);
          break;
        case "ERROR_NO_SCHEDULE_TRAINING_PERMISSION":
          handleHttpError(res, "ERROR_NO_SCHEDULE_TRAINING_PERMISSION", 403);
          break;
        default:
          console.log(
            "Error al intentar programar entrenamiento: ",
            error.message
          );
          handleHttpError(res, "ERROR_SCHEDULE_TRAINING", 500);
          break;
      }
    }
  }
};

export const getAllWorkouts = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  const userId = req.user?.id;
  try {
    const workouts = await listWorkouts(Number(userId));

    res.status(200).json(workouts);
  } catch (error) {
    handleHttpError(res, "ERROR_GET_ALL_WORKOUTS", 500);
  }
};
