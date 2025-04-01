import express from "express"
import { signup } from "../controllers/auth.controllrs.js";

const router = express.Router();

router.post("/signup", signup)

export default router;