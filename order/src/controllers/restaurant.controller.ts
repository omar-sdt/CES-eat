import { Request, Response } from "express";
import {restaurantPostSchema} from "../schemas/restaurant.schema";
import {Restaurant} from "../models/restaurant";
import {StatusCodes} from "http-status-codes";
import {Dish} from "../models/dishes";

export const createRestaurantController = async (req: Request, res: Response) => {
    const { name, categories, address, description } = restaurantPostSchema.parse(req.body);

    const newRestaurant = await Restaurant.create({
        name,
        categories,
        address,
        description
    });

    res.status(StatusCodes.CREATED).json(newRestaurant);
};

export const getAllRestaurantsController = async (req: Request, res: Response) => {
    const restaurants = await Restaurant.find();

    res.status(StatusCodes.OK).json(restaurants);
}

export const getRestaurantController = async (req: Request, res: Response) => {
    const { restaurantId } = req.params;

    // Find the restaurant by ID
    const restaurant = await Restaurant.findById(restaurantId);
    // If the restaurant does not exist, return a 404
    if (!restaurant) {
        res.status(StatusCodes.NOT_FOUND).json({
            message: 'Restaurant not found',
        });
        return;
    }

    // Get all dishes for the restaurant
    const dishes = await Dish.find({
        restaurantId: restaurantId
    });

    res.status(StatusCodes.OK).json({
        restaurant,
        dishes,
    });
}