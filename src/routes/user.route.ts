import express from "express";
import { Router } from "express";
import { loginUser, registerUser } from "../controllers/user.controller";
import {
  loginUserValidator,
  registerUserValidator,
} from "../validators/user.validator";
const router: Router = express.Router();

router.post("/register", registerUserValidator, registerUser);

router.post("/login", loginUserValidator, loginUser);
export default router;
