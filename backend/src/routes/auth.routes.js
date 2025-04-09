import { Router } from "express"
import { login, logout, register } from "../controllers/user.controllers.js";

const router = Router();


router.route("/register").post(register)
router.route("/login").post(login)
router.route("/logout").get(logout)

export default router;