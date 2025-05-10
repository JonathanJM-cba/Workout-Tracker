import { Exercise, exerciseModel } from "../entities";
import { ExerciseCategory, MuscleGroup } from "../types/exercise.type";

export const getExercises = async (): Promise<Exercise[]> => {
  return await exerciseModel.find();
};

export const createNewExercise = async (
  name: string,
  description: string,
  category: ExerciseCategory,
  muscleGroup: MuscleGroup
): Promise<Exercise> => {
  const newExercise = await exerciseModel.create({
    name,
    description,
    category,
    muscleGroup,
  });
  return await exerciseModel.save(newExercise);
};
