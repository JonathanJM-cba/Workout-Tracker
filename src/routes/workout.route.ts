import express from "express";
import { Router } from "express";
import { checkAuth } from "../middleware/checkAuth";
import { createWorkout } from "../controllers/workout.controller";

const router: Router = express.Router();

router.post("/", checkAuth, createWorkout);

export default router;
