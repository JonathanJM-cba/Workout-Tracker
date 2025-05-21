import { In } from "typeorm";
import { AppDataSource } from "../config/configDb";
import { UpdateWorkoutDto, WorkoutDto } from "../dtos/workout.dto";
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

export const updatedWorkout = async (
  workoutData: UpdateWorkoutDto,
  workoutId: number,
  userId: number | null
): Promise<Workout> => {
  const queryRunner = await AppDataSource.createQueryRunner();
  try {
    queryRunner.connect();
    queryRunner.startTransaction();

    //0. Se verifica si existe un entrenamiento con el id ingresado
    const workout = await workoutModel.findOne({
      where: { id: workoutId },
      relations: ["user"],
    });

    if (!workout) throw new Error("ERROR_WORKOUT_NOT_FOUND");
    //1. Se actualizan los datos del entrenamiento

    //2. Se verifica si pertenece al usuario que lo creo
    if (workout?.user.id !== userId)
      throw new Error("ERROR_NO_UPDATE_WORKOUT_PERMISSION");

    await workoutModel.update(
      {
        id: workoutId,
      },
      {
        scheduledDate: workoutData.scheduledDate,
        note: workoutData.note ? workoutData.note : workout.note,
        state: workoutData.state,
      }
    );

    //3. Se eliminan y se crean los nuevos ejercicios para el entrenamiento. Se utiliza el enfoque DELETE -> INSERT
    await deleteWorkoutExercises(workoutId);

    //Se crean los nuevo registros
    const newWorkoutExercises = workoutData.exercises.map((exercise) => {
      return workoutsExercisesModel.create({
        sets: exercise.sets,
        reps: exercise.reps,
        weightKg: exercise.weightKg ? exercise.weightKg : null,
        workout: { id: workoutId },
        exercise: { id: exercise.exerciseId },
      });
    });

    //Se insertan los nuevos registros
    await workoutsExercisesModel.insert(newWorkoutExercises);

    await queryRunner.commitTransaction();

    //Se retorna el entrenamiento actualizado
    const newWorkout = await workoutModel.findOne({
      where: { id: workoutId },
      relations: ["workoutsExercises", "workoutsExercises.exercise"],
    });

    if (!newWorkout) throw new Error("ERROR_UPDATE_WORKOUT");

    return newWorkout;
  } catch (error) {
    await queryRunner.rollbackTransaction();
    throw error;
  } finally {
    await queryRunner.release();
  }
};

const deleteWorkoutExercises = async (workoutId: number) => {
  await workoutsExercisesModel.delete({
    workout: { id: workoutId },
  });
};

export const deletedWorkout = async (workoutId: number, userId: number) => {
  const queryRunner = AppDataSource.createQueryRunner();
  try {
    await queryRunner.connect();
    await queryRunner.startTransaction();

    //0. Se verifica si existe el entrenamiento mediante el ID recibido
    const workout = await workoutModel.findOne({
      where: { id: workoutId },
      relations: ["user"],
    });

    if (!workout) throw new Error("ERROR_WORKOUT_NOT_FOUND");

    //1. Se verifica si el entrenamiento a eliminar fue creado por el usuario correcto
    if (workout.user.id !== userId)
      throw new Error("ERROR_NO_DELETE_PERMISSION");

    //2. Caso contrario se elimina el entrenamiento
    await workoutModel.delete({
      id: workout.id,
    });

    await queryRunner.commitTransaction();
  } catch (error) {
    await queryRunner.rollbackTransaction();
    throw error;
  } finally {
    await queryRunner.release();
  }
};

export const scheduleTraining = async (
  workoutId: number,
  scheduleDate: Date,
  userId: number
): Promise<Workout> => {
  const queryRunner = AppDataSource.createQueryRunner();
  try {
    await queryRunner.connect();
    await queryRunner.startTransaction();

    //0. Se verifica la existencia del entrenamiento
    const workout = await workoutModel.findOne({
      where: { id: workoutId },
      relations: ["user"],
    });

    if (!workout) throw new Error("ERROR_WORKOUT_NOT_FOUND");

    //1. Se verifica si el entrenamiento pertenece al usuario que lo creo
    if (workout.user.id !== userId)
      throw new Error("ERROR_NO_SCHEDULE_TRAINING_PERMISSION");

    //2. Se actualiza la fecha del entrenamiento
    await workoutModel.update(
      {
        id: workout.id,
      },
      {
        scheduledDate: scheduleDate,
      }
    );

    await queryRunner.commitTransaction();

    const training = await workoutModel.findOne({
      where: { id: workout.id },
      relations: ["workoutsExercises", "workoutsExercises.exercise"],
    });

    if (!training) throw new Error("ERROR_SCHEDULE_TRAINING");

    return training;
  } catch (error) {
    await queryRunner.rollbackTransaction();
    throw error;
  } finally {
    await queryRunner.release();
  }
};
