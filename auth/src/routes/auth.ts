import express from "express";
import {
    authenticateController,
    getUserController,
    loginController,
    registerController
} from "../controllers/auth.controller";
import {validateData} from "../middlewares/validation.middleware";
import {userLoginSchema, userRegisterSchema} from "../schemas/user.schema";


const router = express.Router();

// POST /register
router.post('/register', validateData(userRegisterSchema), registerController);
router.post('/login', validateData(userLoginSchema), loginController);
router.get('/authenticate', authenticateController);
router.get('/user', getUserController);

export default router;