import {Dish} from "../models/dishes";
import {dishPostSchema} from "../schemas/dish.schema";
import {StatusCodes} from "http-status-codes";

export const createDishController = async (req, res) => {
    const { name, price, restaurantId, description, tags, imageUrl } = dishPostSchema.parse(req.body);

    const newDish = await Dish.create({
        name,
        price,
        restaurantId,
        description,
        tags,
        imageUrl
    });

    res.status(StatusCodes.CREATED).json(newDish);
};

export const getAllDishesController = async (req, res) => {
    const dishes = await Dish.find();

    res.status(StatusCodes.OK).json(dishes);
}

export const getDishController = async (req, res) => {
    const { dishId } = req.params;

    const dish = await Dish.findById(dishId);
    if (!dish) {
        res.status(StatusCodes.NOT_FOUND).json({
            message: 'Dish not found',
        });
        return;
    }

    res.status(StatusCodes.OK).json(dish);
};

export const getRestaurantDishesController = async (req, res) => {
    const { restaurantId } = req.params;

    const dishes = await Dish.find({
        restaurantId: restaurantId
    });

    res.status(StatusCodes.OK).json(dishes);
};