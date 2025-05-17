import express from "express";
import { Router } from "express";
import userRoute from "./user.route";
import exerciseRoute from "./exercise.route";
import workoutRoute from "./workout.route";

const router: Router = express.Router();

router.use("/auth", userRoute);
router.use("/exercises", exerciseRoute);
router.use("/workouts", workoutRoute);

export default router;
