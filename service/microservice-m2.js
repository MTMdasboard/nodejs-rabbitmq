// worker.js

const amqp = require('amqplib');

async function startWorker() {
  try {
    const connection = await amqp.connect('amqp://localhost');
    const channel = await connection.createChannel();
    const queue = 'task_queue';
    const responseQueue = 'response_queue';

    channel.assertQueue(queue, { durable: true });
    channel.prefetch(1);

    console.log(`[Microservice M2] Waiting for messages in ${queue}. To exit, press CTRL+C`);

    channel.consume(queue, async (msg) => {
      const input = JSON.parse(msg.content.toString());
      const doubledNumber = input.input * 2;

      console.log(`[Microservice M2] Received %o`, input);
      console.log(`[Microservice M2] Processed number: ${doubledNumber}`);

      // Имитация задержки обработки задания продолжительностью 5 секунд.
      setTimeout(() => {
        channel.ack(msg);

        // Возвращаем результат в RabbitMQ, чтобы М1 мог отправить пользователю
        channel.assertQueue(responseQueue, { durable: true });
        channel.sendToQueue(responseQueue, Buffer.from(JSON.stringify({ result: doubledNumber })), { persistent: true });
      }, 5000);
    });
  } catch (err) {
    console.error(err);
  }
}

startWorker();
