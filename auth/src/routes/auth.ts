import express from "express";
import {authenticateController, loginController, registerController} from "../controllers/auth.controller";
import {validateData} from "../middlewares/validation.middleware";
import {userLoginSchema, userRegisterSchema} from "../schemas/user.schema";


const router = express.Router();

// POST /register
router.post('/register', validateData(userRegisterSchema), registerController);
router.post('/login', validateData(userLoginSchema), loginController);
router.get('/authenticate', authenticateController);

export default router;