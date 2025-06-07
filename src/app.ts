import express, { Request, Response } from "express";
import cors from "cors";
import apiRoute from "./routes";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (_: Request, res: Response) => {
  res.send("Bienvenido a la API de seguimiento de entrenamiento");
});

app.use("/api", apiRoute);

export default app;
