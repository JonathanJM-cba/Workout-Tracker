import express from "express";
import { Router } from "express";
import {
  createExercise,
  getAllExercises,
} from "../controllers/exercise.controller";

const router: Router = express.Router();

router.get("/", getAllExercises);

router.post("/", createExercise);

export default router;
