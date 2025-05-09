import express from "express";
import { Router } from "express";
import { getAllExercises } from "../controllers/exercise.controller";

const router: Router = express.Router();

router.get("/", getAllExercises);

export default router;
