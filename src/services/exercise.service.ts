import { Exercise, exerciseModel } from "../entities";

export const getExercises = async (): Promise<Exercise[]> => {
  return await exerciseModel.find();
};
