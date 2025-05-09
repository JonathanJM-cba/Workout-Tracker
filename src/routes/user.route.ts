import express from "express";
import { Router } from "express";
import { registerUser } from "../controllers/user.controller";
import { registerUserValidator } from "../validators/user.validator";
const router: Router = express.Router();

router.post("/register", registerUserValidator, registerUser);

export default router;
