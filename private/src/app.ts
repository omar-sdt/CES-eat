import express from 'express';
import dotenv from 'dotenv';
import {StatusCodes} from "http-status-codes";

dotenv.config();

const app = express();

app.use(express.json());


app.get('/private', (_req, res) => {
    res.status(StatusCodes.OK).json({
        message: 'Hello from a private API'
    })
});

app.listen(process.env.PORT, () => {
    return console.log(`Express is listening at http://localhost:${process.env.PORT}`);
});
