import express from "express";
import { Router } from "express";
import { loginUser, registerUser } from "../controllers/user.controller";
import { registerUserValidator } from "../validators/user.validator";
const router: Router = express.Router();

router.post("/register", registerUserValidator, registerUser);

router.post("/login", loginUser);
export default router;
