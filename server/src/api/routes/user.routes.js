import { Router } from "express";
import { createUser } from "../controllers/user.controllers.js";
import { validateUser } from "../middlewares/middlewares.js";

const router = Router();

router.post("/",validateUser,createUser);

export default router;