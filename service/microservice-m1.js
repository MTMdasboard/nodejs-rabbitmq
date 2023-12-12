const amqp = require("amqplib");

function processQueueData(numberInput) {
  return new Promise(async (resolve, reject) => {
    try {
      // Подключение к RabbitMQ
      const connection = await amqp.connect("amqp://localhost");
      const channel = await connection.createChannel();
      const queue = "task_queue";
      const responseQueue = "response_queue";

      const correlationId = generateUuid();

      // Опубликование сообщения в очередь
      channel.assertQueue(queue, { durable: true });
      channel.sendToQueue(
        queue,
        Buffer.from(JSON.stringify({ input: numberInput })),
        { persistent: true,
          correlationId: correlationId
        }
      );
      console.log(`[Microservice M1] Отправляет '${numberInput}' в очередь ${queue}`);

      // Создание очереди для ответа от микросервиса M2
      channel.assertQueue(responseQueue, { durable: true, arguments: { 'x-message-ttl': 3600000 }  });

      // Получение ответа от микросервиса M2
      channel.consume(
        responseQueue,
        (msg) => {
          if (msg.properties.correlationId == correlationId) {
            const result = JSON.parse(msg.content.toString());
            console.log(`[Microservice M1] Получает результат из очереди ${responseQueue}: %O`, result.result);

            channel.ack(msg); // Подтверждение получения сообщения

            resolve(result.result);
          }
        },
        { noAck: false }
      );

      // Закрытие соединения с RabbitMQ через 10 секунд
      setTimeout(() => {
        connection.close();
        reject("Timeout: Превышено время ожидания обработки запроса");
      }, 10000);
    } catch (err) {
      console.error(err);
      reject(err);
    }
  });
}

function generateUuid() {
  return Math.random().toString() +
         Math.random().toString() +
         Math.random().toString();
}

module.exports = processQueueData;
