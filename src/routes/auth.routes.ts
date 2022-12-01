import { Router } from "express";
import { login, register, user } from "../controllers/auth.controller";
import { isAuthenticated } from "../libs/isAuthenticated";

const router: Router = Router();

router.post('/register', register);
router.post('/login', login);
router.get('/user', isAuthenticated, user);

export default router;