import { In } from "typeorm";
import { AppDataSource } from "../config/configDb";
import { WorkoutDto } from "../dtos/workout.dto";
import {
  exerciseModel,
  workoutModel,
  workoutsExercisesModel,
} from "../entities";
import { Workout } from "../entities/workout.entity";

export const saveExercise = async (
  workoutData: WorkoutDto,
  userId: number | undefined
): Promise<Workout> => {
  if (userId === undefined) throw new Error("ERROR_USER_NOT_FOUND");
  const queryRunner = AppDataSource.createQueryRunner();
  try {
    await queryRunner.connect();
    await queryRunner.startTransaction();
    //0. Se válida que existan los Ids de los ejercicios
    const exerciseIds = workoutData.exercises.map((e) => e.exerciseId);
    const existingExercises = await exerciseModel.count({
      where: { id: In(exerciseIds) },
    });

    if (existingExercises !== exerciseIds.length)
      throw new Error("ERROR_EXERCISE_NOT_FOUND");

    //1. Primero debemos se crear el workout (datos: scheduledDate, note (opcional), idUser)
    const workout = await workoutModel.create({
      scheduledDate: new Date(workoutData.scheduledDate),
      note: workoutData.note || "",
      user: { id: userId },
    });

    const newWorkout = await workoutModel.save(workout);

    //2. Se crea el plan de entrenamiento
    const workoutExercises = workoutData.exercises.map((exercise) => {
      return workoutsExercisesModel.create({
        sets: exercise.sets,
        reps: exercise.reps,
        weightKg: exercise.weightKg || null,
        workout: { id: newWorkout.id },
        exercise: { id: exercise.exerciseId },
      });
    });

    await workoutsExercisesModel.save(workoutExercises);

    await queryRunner.commitTransaction();

    //Se retorna el entrenamiento creado con los ejercicios
    const workoutSave = await workoutModel.findOne({
      where: { id: newWorkout.id },
      relations: ["workoutsExercises", "workoutsExercises.exercise"],
    });

    if (!workoutSave) throw new Error("ERROR_CREATE_WORKOUT");

    return workoutSave;
  } catch (error) {
    await queryRunner.rollbackTransaction();
    console.log("Error al intentar crear un entranamiento: ", error);
    throw error;
  } finally {
    await queryRunner.release();
  }
};
