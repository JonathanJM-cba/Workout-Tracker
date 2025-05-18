import express from "express";
import { Router } from "express";
import { checkAuth } from "../middleware/checkAuth";
import {
  createWorkout,
  updateWorkout,
} from "../controllers/workout.controller";
import { createWorkoutValidator } from "../validators/workout.validator";

const router: Router = express.Router();

router.post("/", checkAuth, createWorkoutValidator, createWorkout);

router.put("/:idWorkout", checkAuth, updateWorkout);

export default router;
