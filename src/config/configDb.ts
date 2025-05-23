import { DataSource } from "typeorm";
import "dotenv/config";
import { Exercise } from "../entities/exercise.entity";
import { User } from "../entities/user.entity";
import { Workout } from "../entities/workout.entity";
import { WorkoutExercise } from "../entities/workout.exercise.entity";

const dbHost = process.env.DB_HOST;
const dbPort = process.env.DB_PORT ? Number(process.env.DB_PORT) : 5432;
const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASSWORD;
const dbName = process.env.DB_NAME;

export const AppDataSource = new DataSource({
  type: "postgres",
  host: dbHost,
  port: dbPort,
  username: dbUser,
  password: dbPassword,
  database: dbName,
  entities: [Exercise, User, Workout, WorkoutExercise],
  synchronize: true,
});

export const dbConnection = async () => {
  try {
    await AppDataSource.initialize();
    console.log(
      "CONECTADO A LA BASE DE DATOS DE REASTREADOR DE ENTRENAMIENTO!"
    );
  } catch (error) {
    console.log("Error al intentar conectarse a la base de datos: ", error);
  }
};
