const amqp = require("amqplib");

function processQueueData(numberInput) {
  return new Promise(async (resolve, reject) => {
    try {
      // Подключение к RabbitMQ
      const connection = await amqp.connect("amqp://localhost");
      const channel = await connection.createChannel();
      const queue = "task_queue";
      const responseQueue = "response_queue";

      // Опубликование сообщения в очередь
      channel.assertQueue(queue, { durable: true });
      channel.sendToQueue(
        queue,
        Buffer.from(JSON.stringify({ input: numberInput })),
        { persistent: true }
      );
      console.log(`[Microservice M1] Sent '${numberInput}' to the queue`);

      // Создание очереди для ответа от микросервиса M2
      channel.assertQueue(responseQueue, { durable: true });

      // Получение ответа от микросервиса M2
      channel.consume(
        responseQueue,
        (msg) => {
          const result = JSON.parse(msg.content.toString());
          console.log(`[Microservice M1] Received result: %O`, result.result);

          channel.ack(msg); // Подтверждение получения сообщения

          resolve(result.result);
        },
        { noAck: false }
      );

      // Закрытие соединения с RabbitMQ через 10 секунд
      setTimeout(() => {
        connection.close();
        reject("Timeout: No response received");
      }, 10000);
    } catch (err) {
      console.error(err);
      reject(err);
    }
  });
}

module.exports = processQueueData;
