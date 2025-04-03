import express from 'express';
import dotenv from 'dotenv';
import {connectDB} from "./lib/mongo";
import {validateData} from "./middlewares/validation.middleware";
import {restaurantPostSchema} from "./schemas/restaurant.schema";
import {
    createRestaurantController,
    getAllRestaurantsController,
    getRestaurantController
} from "./controllers/restaurant.controller";
import {dishPostSchema} from "./schemas/dish.schema";
import {
    createDishController,
    getAllDishesController,
    getDishController,
    getRestaurantDishesController
} from "./controllers/dish.controller";
import {orderPostSchema} from "./schemas/order.schema";
import {
    cancelOrder,
    createOrderController,
    getOrderController,
    getOrdersByUser,
    validateOrder
} from "./controllers/order.controller";

dotenv.config();

const app = express();

app.use(express.json());

app.get('/health', (req, res) => {
    res.status(200).json({
        status: 'ok',
    })
});

// Routes /restaurants
app.post('/restaurants', validateData(restaurantPostSchema), createRestaurantController);
app.get('/restaurants', getAllRestaurantsController);
app.get('/restaurant/:restaurantId', getRestaurantController);

// Routes /dishes
app.post('/dish', validateData(dishPostSchema), createDishController);
app.get('/dish/:restaurantId', getRestaurantDishesController);
app.get('/dish/:dishId/view', getDishController);
app.get('/dishes', getAllDishesController);

// Routes /orders
app.post('/order', validateData(orderPostSchema), createOrderController);
app.get('/order/:orderId', getOrderController);
app.put('/order/:orderId/validate', validateOrder);
app.put('/order/:orderId/cancel', cancelOrder);
app.get('/order/:userId/user', getOrdersByUser);


const start = async () => {
    await connectDB();

    app.listen(process.env.PORT, () => {
        return console.log(`Express is listening at http://localhost:${process.env.PORT}`);
    });
};

start();