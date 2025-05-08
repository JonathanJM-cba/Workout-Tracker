import { AppDataSource } from "../config/configDb";
import { Exercise } from "./exercise.entity";
import { User } from "./user.entity";

export const userModel = AppDataSource.getRepository(User);
export const exerciseModel = AppDataSource.getRepository(Exercise);

export { User, Exercise };
