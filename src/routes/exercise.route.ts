import express from "express";
import { Router } from "express";
import {
  createExercise,
  getAllExercises,
} from "../controllers/exercise.controller";
import { createExerciseValidator } from "../validators/exercise.validator";

const router: Router = express.Router();

router.get("/", getAllExercises);

router.post("/", createExerciseValidator, createExercise);

export default router;
