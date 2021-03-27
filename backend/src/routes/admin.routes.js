import { Router } from "express";
import { deleteUser } from "../controllers/admin.controllers";
import { isAuth } from "../middlewares/authentication";

const router = Router();

router.delete("/users/:id", isAuth, deleteUser);

export default router;
