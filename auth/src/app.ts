import express from 'express';
import dotenv from 'dotenv';
import {connectDB} from "./lib/mongo";
import authRouter from './routes/auth';
import cors from 'cors';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.get('/health', (req, res) => {
    res.status(200).json({
        status: 'ok',
    })
});

app.use('/auth', authRouter);

const start = async () => {
    await connectDB();

    app.listen(process.env.PORT, () => {
        return console.log(`Express is listening at http://localhost:${process.env.PORT}`);
    });
};

start();