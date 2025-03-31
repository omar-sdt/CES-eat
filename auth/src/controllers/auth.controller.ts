import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {User} from "../models/user";
import {StatusCodes} from "http-status-codes";
import {authenticateSchema, userLoginSchema, userRegisterSchema} from "../schemas/user.schema";

export const registerController = async (req: Request, res: Response) => {
    const { name, email, password } = userRegisterSchema.parse(req.body);
    const passwordHash = await bcrypt.hash(password, 10);

    const newUser = await User.create({ name, email, passwordHash });

    res.status(StatusCodes.OK).json(newUser);
};

export const loginController = async (req: Request, res: Response) => {
    const { email, password } = userLoginSchema.parse(req.body);

    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
        res.status(StatusCodes.UNAUTHORIZED).json({ message: "Invalid email or password" });
        return;
    }

    // Create a token
    const accessToken = jwt.sign({ email: user.email, exp: Math.floor(Date.now() / 1000) + 60 * 60 }, process.env.ACCESS_JWT_KEY);

    res.status(StatusCodes.OK).json({ accessToken });
};

export const authenticateController = async (req: Request, res: Response) => {
    const authHeader = req.headers.authorization;

    if (!authHeader?.startsWith("Bearer ")) {
        res.sendStatus(StatusCodes.UNAUTHORIZED);
        return;
    }

    const token = authHeader.split(" ")[1];

    try {
        const payload = jwt.verify(token, process.env.ACCESS_JWT_KEY!);
        // Pas besoin de payload dans la réponse, juste status
        res.sendStatus(StatusCodes.OK);
    } catch (e) {
        res.sendStatus(StatusCodes.UNAUTHORIZED);
    }
};