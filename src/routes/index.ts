import express from "express";
import { Router } from "express";
import userRoute from "./user.route";

const router: Router = express.Router();

router.use("/auth", userRoute);

export default router;
