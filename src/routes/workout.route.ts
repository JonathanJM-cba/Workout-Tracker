import express from "express";
import { Router } from "express";
import { checkAuth } from "../middleware/checkAuth";
import {
  createWorkout,
  deleteWorkout,
  getAllWorkouts,
  scheduleWorkout,
  updateWorkout,
} from "../controllers/workout.controller";
import {
  createWorkoutValidator,
  scheduleTrainingValidator,
  updateWorkoutValidator,
} from "../validators/workout.validator";

const router: Router = express.Router();

router.post("/", checkAuth, createWorkoutValidator, createWorkout);

router.put("/:idWorkout", checkAuth, updateWorkoutValidator, updateWorkout);

router.delete("/:idWorkout", checkAuth, deleteWorkout);

router.patch(
  "/schedule/:idWorkout",
  checkAuth,
  scheduleTrainingValidator,
  scheduleWorkout
);

router.get("/", checkAuth, getAllWorkouts);

export default router;
