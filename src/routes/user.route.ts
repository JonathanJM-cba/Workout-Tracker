import express from "express";
import { Router } from "express";
import { registerUser } from "../controllers/user.controller";
const router: Router = express.Router();

router.post("/register", registerUser);

export default router;
