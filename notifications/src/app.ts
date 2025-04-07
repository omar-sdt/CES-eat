import express from 'express';
import dotenv from 'dotenv';
import {StatusCodes} from "http-status-codes";
import * as http from "node:http";
import {Server} from "socket.io";
import amqp from 'amqplib';

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: '*',
    }
});

app.use(express.json());

const userSockets = new Map();

app.get('/health', (_req, res) => {
    res.status(StatusCodes.OK).json({
        message: 'Hello from a notification API'
    })
});

io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('register', ({ userId }) => {
        console.log(`User ${userId} registered on socket ${socket.id}`);
        userSockets.set(userId, socket.id);
    });

    socket.on('disconnect', () => {
        // Nettoyage : supprimer les userIds liés à ce socket
        for (const [uid, sid] of userSockets.entries()) {
            if (sid === socket.id) {
                userSockets.delete(uid);
                break;
            }
        }
        console.log('Client disconnected:', socket.id);
    });
});

async function connectRabbit() {
    const conn = await amqp.connect('amqp://root:root@localhost');
    const channel = await conn.createChannel();
    await channel.assertExchange('orders', 'topic', { durable: false });

    const q = await channel.assertQueue('', { exclusive: true });
    channel.bindQueue(q.queue, 'orders', 'order.confirmed');

    channel.consume(q.queue, (msg) => {
        const payload = JSON.parse(msg.content.toString());
        const { userId, orderId } = payload;

        const socketId = userSockets.get(userId);
        if (socketId) {
            io.to(socketId).emit('orderConfirmed', {
                message: 'Ta commande est confirmée 🍔',
                orderId
            });
            console.log(`Notification envoyée à ${userId}`);
        } else {
            console.log(`Aucun socket trouvé pour userId: ${userId}`);
        }
    }, { noAck: true });
}

server.listen(process.env.PORT, async () => {
    await connectRabbit();
    return console.log(`Notification Service is listening at http://localhost:${process.env.PORT}`);
});
