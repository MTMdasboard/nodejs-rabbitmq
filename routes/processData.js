const express = require('express');
const router = express.Router();
const amqp = require('amqplib');
const processQueueData = require('../service/microservice-m1');

router.post('/', async (req, res) => {
  try {
    const numberInput = req.body.numberInput;

    // Обработка очереди и ожидание результата
    processQueueData(numberInput)
      .then((result) => {
        // Возвращаем результат пользователю в формате JSON
        res.json({ result });
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send(err.message);
      });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
