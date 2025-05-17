import express from "express";
import { Router } from "express";
import { checkAuth } from "../middleware/checkAuth";
import { createWorkout } from "../controllers/workout.controller";
import { workoutValidator } from "../validators/workout.validator";

const router: Router = express.Router();

router.post("/", checkAuth, workoutValidator, createWorkout);

export default router;
