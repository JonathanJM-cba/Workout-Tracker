import "dotenv/config";
import express, { Request, Response } from "express";
import cors from "cors";
import { dbConnection } from "./config/configDb";

const app = express();

const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get("/", (_: Request, res: Response) => {
  res.send("Bienvenido a la API de seguimiento de entrenamiento");
});

app.listen(port, () => {
  console.log(`Servidor corriendo en localhost://${port}`);
});

dbConnection();
