import { AppDataSource } from "../config/configDb";
import { Exercise } from "./exercise.entity";
import { User } from "./user.entity";
import { Workout } from "./workout.entity";
import { WorkoutExercise } from "./workout.exercise.entity";

export const userModel = AppDataSource.getRepository(User);
export const exerciseModel = AppDataSource.getRepository(Exercise);
export const workoutModel = AppDataSource.getRepository(Workout);
export const workoutsExercisesModel =
  AppDataSource.getRepository(WorkoutExercise);

export { User, Exercise };
