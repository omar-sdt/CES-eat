import { Request, Response } from "express";
import {orderPostSchema} from "../schemas/order.schema";
import {Order} from "../models/order";
import {StatusCodes} from "http-status-codes";
import {publishEvent} from "../lib/rabbit";

export const createOrderController = async (req: Request, res: Response) => {
    const { userId, dishes, restaurantId, totalAmount, deliveryAddress } = orderPostSchema.parse(req.body);

    const newOrder = await Order.create({
        userId,
        dishes,
        restaurantId,
        totalAmount,
        deliveryAddress
    });

    res.status(StatusCodes.CREATED).json(newOrder);
};

export const getOrderController = async (req: Request, res: Response) => {
    const { orderId } = req.params;

    const order = await Order.findById(orderId);

    if (!order) {
        res.status(StatusCodes.NOT_FOUND).json({
            message: 'Order not found',
        });
        return;
    }
}

export const validateOrder = async (req: Request, res: Response) => {
    const { orderId } = req.params;

    const order = await Order.findById(orderId);

    if (!order) {
        res.status(StatusCodes.NOT_FOUND).json({
            message: 'Order not found',
        });
        return;
    }

    order.status = 'confirmed';
    await order.save();

    publishEvent('order.confirmed', {
        userId: order.userId.toString()
    });

    res.status(StatusCodes.OK).json(order);
}

export const cancelOrder = async (req: Request, res: Response) => {
    const { orderId } = req.params;

    const order = await Order.findById(orderId);

    if (!order) {
        res.status(StatusCodes.NOT_FOUND).json({
            message: 'Order not found',
        });
        return;
    }

    order.status = 'cancelled';

    await order.save();

    res.status(StatusCodes.OK).json(order);
}

export const getOrdersByUser = async (req: Request, res: Response) => {
    const { userId } = req.params;

    const orders = await Order.find({ userId });

    res.status(StatusCodes.OK).json(orders);
}
