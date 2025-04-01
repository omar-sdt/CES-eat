import amqp from 'amqplib';
import dotenv from "dotenv";

let channel: amqp.Channel;

dotenv.config()

export const initRabbit = async () => {
    const conn = await amqp.connect(process.env.RABBITMQ_URL || 'amqp://root:root@localhost');
    channel = await conn.createChannel();
    await channel.assertExchange('orders', 'topic', { durable: false });
};

export const publishEvent = (type: string, message: object) => {
    if (!channel) {
        console.error("RabbitMQ not initialized!");
        return;
    }

    channel.publish('orders', type, Buffer.from(JSON.stringify(message)));
};