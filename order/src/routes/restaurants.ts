import express from "express";
import {validateData} from "../middlewares/validation.middleware";
import {restaurantPostSchema} from "../schemas/restaurant.schema";
import {createRestaurantController} from "../controllers/restaurant.controller";

const router = express.Router();

// POST /restaurants
router.post('/create', validateData(restaurantPostSchema), createRestaurantController);

export default router;